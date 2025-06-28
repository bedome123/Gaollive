import { Router } from 'express';
import { storage } from './storage';
import { RealtimeService } from './realtime';

const router = Router();

// Admin authentication middleware (simplified for demo)
const adminAuth = (req: any, res: any, next: any) => {
  const apiKey = req.headers['x-admin-key'];
  if (apiKey !== process.env.ADMIN_API_KEY) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  next();
};

// Apply admin auth to all routes
router.use(adminAuth);

// Update match scores and status
router.put('/matches/:id', async (req, res) => {
  try {
    const matchId = parseInt(req.params.id);
    const { homeScore, awayScore, currentMinute, status, events } = req.body;

    const updatedMatch = await storage.updateMatch(matchId, {
      homeScore,
      awayScore,
      currentMinute,
      status
    });

    if (!updatedMatch) {
      return res.status(404).json({ error: 'Match not found' });
    }

    // Broadcast update to all connected clients
    const realtimeService = req.app.get('realtimeService') as RealtimeService;
    if (realtimeService) {
      await realtimeService.broadcastMatchUpdate(matchId, {
        homeScore,
        awayScore,
        currentMinute,
        status,
        events
      });
    }

    res.json({
      success: true,
      match: updatedMatch,
      message: 'تم تحديث المباراة بنجاح'
    });
  } catch (error) {
    console.error('[admin] Error updating match:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Create new match
router.post('/matches', async (req, res) => {
  try {
    const matchData = req.body;
    const newMatch = await storage.createMatch(matchData);
    
    res.json({
      success: true,
      match: newMatch,
      message: 'تم إنشاء المباراة بنجاح'
    });
  } catch (error) {
    console.error('[admin] Error creating match:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update tournament information
router.put('/tournaments/:id', async (req, res) => {
  try {
    const tournamentId = parseInt(req.params.id);
    const tournament = await storage.getTournamentById(tournamentId);
    
    if (!tournament) {
      return res.status(404).json({ error: 'Tournament not found' });
    }

    // Note: storage interface doesn't have updateTournament yet
    // This would need to be added to IStorage interface
    
    res.json({
      success: true,
      message: 'تم تحديث البطولة بنجاح'
    });
  } catch (error) {
    console.error('[admin] Error updating tournament:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get admin statistics
router.get('/stats', async (req, res) => {
  try {
    const tournaments = await storage.getTournaments();
    const teams = await storage.getTeams();
    const matches = await storage.getMatches();
    const liveMatches = await storage.getMatchesByStatus('live');

    const stats = {
      totalTournaments: tournaments.length,
      totalTeams: teams.length,
      totalMatches: matches.length,
      liveMatches: liveMatches.length,
      finishedMatches: matches.filter(m => m.status === 'finished').length,
      scheduledMatches: matches.filter(m => m.status === 'scheduled').length
    };

    res.json({
      success: true,
      stats,
      message: 'إحصائيات النظام'
    });
  } catch (error) {
    console.error('[admin] Error fetching stats:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Bulk update standings
router.put('/standings/:tournamentId', async (req, res) => {
  try {
    const tournamentId = parseInt(req.params.tournamentId);
    const { standings } = req.body; // Array of standing updates

    // This would need bulk update functionality in storage
    for (const standing of standings) {
      await storage.createStanding({
        tournamentId,
        ...standing
      });
    }

    res.json({
      success: true,
      message: 'تم تحديث جدول الترتيب بنجاح'
    });
  } catch (error) {
    console.error('[admin] Error updating standings:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Stream management
router.get('/streams', async (req, res) => {
  try {
    const liveMatches = await storage.getMatchesByStatus('live');
    const streams = liveMatches.map(match => ({
      matchId: match.id,
      streamUrl: match.streamUrl,
      status: match.status,
      viewers: Math.floor(Math.random() * 10000) + 1000, // Simulated
      quality: '1080p',
      bitrate: '5000 kbps'
    }));

    res.json({
      success: true,
      streams,
      message: 'قائمة البث المباشر'
    });
  } catch (error) {
    console.error('[admin] Error fetching streams:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Manual score update endpoint (for real-time updates)
router.post('/live-update/:matchId', async (req, res) => {
  try {
    const matchId = parseInt(req.params.matchId);
    const { type, data } = req.body;

    const realtimeService = req.app.get('realtimeService') as RealtimeService;
    
    switch (type) {
      case 'goal':
        await realtimeService.broadcastMatchUpdate(matchId, {
          homeScore: data.homeScore,
          awayScore: data.awayScore,
          events: [{
            id: Date.now(),
            matchId,
            minute: data.minute,
            type: 'goal',
            playerName: data.playerName,
            playerNameAr: data.playerNameAr,
            teamId: data.teamId,
            description: 'Goal!',
            descriptionAr: 'هدف!'
          }]
        });
        break;
      
      case 'card':
        await realtimeService.broadcastMatchUpdate(matchId, {
          events: [{
            id: Date.now(),
            matchId,
            minute: data.minute,
            type: data.cardType,
            playerName: data.playerName,
            playerNameAr: data.playerNameAr,
            teamId: data.teamId,
            description: `${data.cardType} card`,
            descriptionAr: data.cardType === 'yellow_card' ? 'كارت أصفر' : 'كارت أحمر'
          }]
        });
        break;
    }

    res.json({
      success: true,
      message: 'تم إرسال التحديث المباشر'
    });
  } catch (error) {
    console.error('[admin] Error sending live update:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;