import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

export async function registerRoutes(app: Express): Promise<Server> {
  // Get all tournaments
  app.get("/api/tournaments", async (req, res) => {
    try {
      const tournaments = await storage.getTournaments();
      res.json(tournaments);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch tournaments" });
    }
  });

  // Get tournament by ID
  app.get("/api/tournaments/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const tournament = await storage.getTournamentById(id);
      if (!tournament) {
        return res.status(404).json({ error: "Tournament not found" });
      }
      res.json(tournament);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch tournament" });
    }
  });

  // Get all teams
  app.get("/api/teams", async (req, res) => {
    try {
      const teams = await storage.getTeams();
      res.json(teams);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch teams" });
    }
  });

  // Get team by ID
  app.get("/api/teams/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const team = await storage.getTeamById(id);
      if (!team) {
        return res.status(404).json({ error: "Team not found" });
      }
      res.json(team);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch team" });
    }
  });

  // Get all matches
  app.get("/api/matches", async (req, res) => {
    try {
      const { status, tournament } = req.query;
      let matches;
      
      if (status) {
        matches = await storage.getMatchesByStatus(status as string);
      } else if (tournament) {
        matches = await storage.getMatchesByTournament(parseInt(tournament as string));
      } else {
        matches = await storage.getMatches();
      }
      
      res.json(matches);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch matches" });
    }
  });

  // Get match by ID
  app.get("/api/matches/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const match = await storage.getMatchById(id);
      if (!match) {
        return res.status(404).json({ error: "Match not found" });
      }
      res.json(match);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch match" });
    }
  });

  // Get standings by tournament
  app.get("/api/standings/:tournamentId", async (req, res) => {
    try {
      const tournamentId = parseInt(req.params.tournamentId);
      const standings = await storage.getStandingsByTournament(tournamentId);
      res.json(standings);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch standings" });
    }
  });

  // Get enriched data (matches with team and tournament info)
  app.get("/api/matches-enriched", async (req, res) => {
    try {
      const { status } = req.query;
      let matches;
      
      if (status) {
        matches = await storage.getMatchesByStatus(status as string);
      } else {
        matches = await storage.getMatches();
      }
      
      const teams = await storage.getTeams();
      const tournaments = await storage.getTournaments();
      
      const enrichedMatches = matches.map(match => ({
        ...match,
        homeTeam: teams.find(t => t.id === match.homeTeamId),
        awayTeam: teams.find(t => t.id === match.awayTeamId),
        tournament: tournaments.find(t => t.id === match.tournamentId),
      }));
      
      res.json(enrichedMatches);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch enriched matches" });
    }
  });

  // Get enriched standings
  app.get("/api/standings-enriched/:tournamentId", async (req, res) => {
    try {
      const tournamentId = parseInt(req.params.tournamentId);
      const standings = await storage.getStandingsByTournament(tournamentId);
      const teams = await storage.getTeams();
      
      const enrichedStandings = standings.map(standing => ({
        ...standing,
        team: teams.find(t => t.id === standing.teamId),
      }));
      
      res.json(enrichedStandings);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch enriched standings" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
