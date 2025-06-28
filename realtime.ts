import { WebSocket, WebSocketServer } from 'ws';
import { Server } from 'http';
import { storage } from './storage';

interface LiveMatchUpdate {
  matchId: number;
  homeScore: number;
  awayScore: number;
  currentMinute: number;
  status: string;
  events?: MatchEvent[];
}

interface MatchEvent {
  id: number;
  matchId: number;
  minute: number;
  type: 'goal' | 'yellow_card' | 'red_card' | 'substitution' | 'penalty';
  playerId?: number;
  playerName: string;
  playerNameAr: string;
  teamId: number;
  description: string;
  descriptionAr: string;
}

export class RealtimeService {
  private wss: WebSocketServer;
  private clients: Set<WebSocket> = new Set();
  private matchUpdates: Map<number, NodeJS.Timeout> = new Map();

  constructor(server: Server) {
    this.wss = new WebSocketServer({ 
      server,
      path: '/ws'
    });
    
    this.wss.on('connection', this.handleConnection.bind(this));
    this.startLiveMatchSimulation();
  }

  private handleConnection(ws: WebSocket) {
    this.clients.add(ws);
    console.log(`[websocket] Client connected. Total: ${this.clients.size}`);
    
    ws.on('close', () => {
      this.clients.delete(ws);
      console.log(`[websocket] Client disconnected. Total: ${this.clients.size}`);
    });

    ws.on('message', (data) => {
      try {
        const message = JSON.parse(data.toString());
        this.handleMessage(ws, message);
      } catch (error) {
        console.error('[websocket] Invalid message:', error);
      }
    });

    // Send initial live matches data
    this.sendLiveMatches(ws);
  }

  private async handleMessage(ws: WebSocket, message: any) {
    switch (message.type) {
      case 'subscribe':
        // Subscribe to specific match updates
        break;
      case 'get_live_matches':
        await this.sendLiveMatches(ws);
        break;
    }
  }

  private async sendLiveMatches(ws: WebSocket) {
    try {
      const liveMatches = await storage.getMatchesByStatus('live');
      ws.send(JSON.stringify({
        type: 'live_matches',
        data: liveMatches
      }));
    } catch (error) {
      console.error('[websocket] Error sending live matches:', error);
    }
  }

  private broadcastToAll(message: any) {
    const data = JSON.stringify(message);
    this.clients.forEach(client => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(data);
      }
    });
  }

  private async startLiveMatchSimulation() {
    // Simulate live match updates every 30 seconds
    setInterval(async () => {
      try {
        const liveMatches = await storage.getMatchesByStatus('live');
        
        for (const match of liveMatches) {
          await this.simulateMatchUpdate(match);
        }
      } catch (error) {
        console.error('[realtime] Error in match simulation:', error);
      }
    }, 30000); // Update every 30 seconds
  }

  private async simulateMatchUpdate(match: any) {
    // Simulate realistic match progression
    const currentMinute = match.currentMinute || 0;
    const newMinute = Math.min(currentMinute + Math.floor(Math.random() * 3) + 1, 95);
    
    let newHomeScore = match.homeScore;
    let newAwayScore = match.awayScore;
    let status = match.status;
    let events: MatchEvent[] = [];

    // Random chance for goals (5% per update)
    if (Math.random() < 0.05 && newMinute < 90) {
      const scoringTeam = Math.random() < 0.5 ? 'home' : 'away';
      if (scoringTeam === 'home') {
        newHomeScore++;
        events.push({
          id: Date.now(),
          matchId: match.id,
          minute: newMinute,
          type: 'goal',
          playerName: 'Player Name',
          playerNameAr: 'اسم اللاعب',
          teamId: match.homeTeamId,
          description: 'Goal scored!',
          descriptionAr: 'هدف!'
        });
      } else {
        newAwayScore++;
        events.push({
          id: Date.now(),
          matchId: match.id,
          minute: newMinute,
          type: 'goal',
          playerName: 'Player Name',
          playerNameAr: 'اسم اللاعب',
          teamId: match.awayTeamId,
          description: 'Goal scored!',
          descriptionAr: 'هدف!'
        });
      }
    }

    // End match at 90+ minutes
    if (newMinute >= 90 && Math.random() < 0.3) {
      status = 'finished';
    }

    // Update match in database
    await storage.updateMatch(match.id, {
      homeScore: newHomeScore,
      awayScore: newAwayScore,
      currentMinute: newMinute,
      status: status
    });

    // Broadcast update to all clients
    const update: LiveMatchUpdate = {
      matchId: match.id,
      homeScore: newHomeScore,
      awayScore: newAwayScore,
      currentMinute: newMinute,
      status: status,
      events: events
    };

    this.broadcastToAll({
      type: 'match_update',
      data: update
    });

    console.log(`[realtime] Updated match ${match.id}: ${newHomeScore}-${newAwayScore} (${newMinute}')`);
  }

  public async broadcastMatchUpdate(matchId: number, update: Partial<LiveMatchUpdate>) {
    this.broadcastToAll({
      type: 'match_update',
      data: { matchId, ...update }
    });
  }
}