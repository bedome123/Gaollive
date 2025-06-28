import { tournaments, teams, matches, standings, type Tournament, type Team, type Match, type Standing, type InsertTournament, type InsertTeam, type InsertMatch, type InsertStanding } from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";

export interface IStorage {
  // Tournaments
  getTournaments(): Promise<Tournament[]>;
  getTournamentById(id: number): Promise<Tournament | undefined>;
  createTournament(tournament: InsertTournament): Promise<Tournament>;

  // Teams
  getTeams(): Promise<Team[]>;
  getTeamById(id: number): Promise<Team | undefined>;
  createTeam(team: InsertTeam): Promise<Team>;

  // Matches
  getMatches(): Promise<Match[]>;
  getMatchesByStatus(status: string): Promise<Match[]>;
  getMatchesByTournament(tournamentId: number): Promise<Match[]>;
  getMatchById(id: number): Promise<Match | undefined>;
  createMatch(match: InsertMatch): Promise<Match>;
  updateMatch(id: number, updates: Partial<Match>): Promise<Match | undefined>;

  // Standings
  getStandingsByTournament(tournamentId: number): Promise<Standing[]>;
  createStanding(standing: InsertStanding): Promise<Standing>;
}

export class MemStorage implements IStorage {
  private tournaments: Map<number, Tournament>;
  private teams: Map<number, Team>;
  private matches: Map<number, Match>;
  private standings: Map<number, Standing>;
  private currentTournamentId: number;
  private currentTeamId: number;
  private currentMatchId: number;
  private currentStandingId: number;

  constructor() {
    this.tournaments = new Map();
    this.teams = new Map();
    this.matches = new Map();
    this.standings = new Map();
    this.currentTournamentId = 1;
    this.currentTeamId = 1;
    this.currentMatchId = 1;
    this.currentStandingId = 1;

    this.initializeData();
  }

  private initializeData() {
    // Initialize tournaments
    const tournamentsData = [
      { id: 1, name: "UEFA Champions League", nameAr: "دوري أبطال أوروبا", type: "cup", country: "Europe", season: "2024-25", isActive: true },
      { id: 2, name: "Premier League", nameAr: "الدوري الإنجليزي الممتاز", type: "league", country: "England", season: "2024-25", isActive: true },
      { id: 3, name: "La Liga", nameAr: "الدوري الإسباني", type: "league", country: "Spain", season: "2024-25", isActive: true },
      { id: 4, name: "Serie A", nameAr: "الدوري الإيطالي", type: "league", country: "Italy", season: "2024-25", isActive: true },
      { id: 5, name: "Bundesliga", nameAr: "الدوري الألماني", type: "league", country: "Germany", season: "2024-25", isActive: true },
      { id: 6, name: "Ligue 1", nameAr: "الدوري الفرنسي", type: "league", country: "France", season: "2024-25", isActive: true },
      { id: 7, name: "UEFA Europa League", nameAr: "الدوري الأوروبي", type: "cup", country: "Europe", season: "2024-25", isActive: true },
      { id: 8, name: "FIFA World Cup 2026", nameAr: "كأس العالم ٢٠٢٦", type: "international", country: "International", season: "2026", isActive: true },
      { id: 9, name: "FIFA Club World Cup", nameAr: "كأس العالم للأندية", type: "international", country: "International", season: "2025", isActive: true },
      { id: 10, name: "CAF Champions League", nameAr: "دوري أبطال أفريقيا", type: "cup", country: "Africa", season: "2024-25", isActive: true },
      { id: 11, name: "AFC Champions League", nameAr: "دوري أبطال آسيا", type: "cup", country: "Asia", season: "2024-25", isActive: true },
      { id: 12, name: "CONMEBOL Copa Libertadores", nameAr: "كوبا ليبرتادوريس", type: "cup", country: "South America", season: "2024", isActive: true },
    ];

    tournamentsData.forEach(t => {
      this.tournaments.set(t.id, t);
      this.currentTournamentId = Math.max(this.currentTournamentId, t.id + 1);
    });

    // Initialize teams
    const teamsData = [
      { id: 1, name: "Real Madrid", nameAr: "ريال مدريد", country: "Spain", logo: "" },
      { id: 2, name: "Manchester City", nameAr: "مانشستر سيتي", country: "England", logo: "" },
      { id: 3, name: "Barcelona", nameAr: "برشلونة", country: "Spain", logo: "" },
      { id: 4, name: "Liverpool", nameAr: "ليفربول", country: "England", logo: "" },
      { id: 5, name: "Arsenal", nameAr: "آرسنال", country: "England", logo: "" },
      { id: 6, name: "Chelsea", nameAr: "تشيلسي", country: "England", logo: "" },
      { id: 7, name: "Bayern Munich", nameAr: "بايرن ميونخ", country: "Germany", logo: "" },
      { id: 8, name: "AC Milan", nameAr: "ميلان", country: "Italy", logo: "" },
      { id: 9, name: "Manchester United", nameAr: "مانشستر يونايتد", country: "England", logo: "" },
      { id: 10, name: "Napoli", nameAr: "نابولي", country: "Italy", logo: "" },
      { id: 11, name: "PSG", nameAr: "باريس سان جيرمان", country: "France", logo: "" },
      { id: 12, name: "Inter Milan", nameAr: "إنتر ميلان", country: "Italy", logo: "" },
      { id: 13, name: "Borussia Dortmund", nameAr: "بوروسيا دورتموند", country: "Germany", logo: "" },
      { id: 14, name: "Atletico Madrid", nameAr: "أتلتيكو مدريد", country: "Spain", logo: "" },
      { id: 15, name: "Juventus", nameAr: "يوفنتوس", country: "Italy", logo: "" },
      { id: 16, name: "Tottenham", nameAr: "توتنهام", country: "England", logo: "" },
      { id: 17, name: "Newcastle United", nameAr: "نيوكاسل يونايتد", country: "England", logo: "" },
      { id: 18, name: "Brighton", nameAr: "برايتون", country: "England", logo: "" },
      { id: 19, name: "West Ham United", nameAr: "وست هام يونايتد", country: "England", logo: "" },
      { id: 20, name: "Aston Villa", nameAr: "أستون فيلا", country: "England", logo: "" },
    ];

    teamsData.forEach(t => {
      this.teams.set(t.id, t);
      this.currentTeamId = Math.max(this.currentTeamId, t.id + 1);
    });

    // Initialize matches
    const now = new Date();
    const matchesData = [
      {
        id: 1,
        tournamentId: 1,
        homeTeamId: 1,
        awayTeamId: 7,
        homeScore: 2,
        awayScore: 1,
        status: "live",
        matchDate: new Date(now.getTime() - 78 * 60000),
        currentMinute: 78,
        streamUrl: "https://live-streaming.koralive.com/stream1"
      },
      {
        id: 2,
        tournamentId: 2,
        homeTeamId: 4,
        awayTeamId: 2,
        homeScore: 1,
        awayScore: 2,
        status: "live",
        matchDate: new Date(now.getTime() - 67 * 60000),
        currentMinute: 67,
        streamUrl: "https://live-streaming.koralive.com/stream2"
      },
      {
        id: 3,
        tournamentId: 3,
        homeTeamId: 3,
        awayTeamId: 14,
        homeScore: 0,
        awayScore: 1,
        status: "live",
        matchDate: new Date(now.getTime() - 23 * 60000),
        currentMinute: 23,
        streamUrl: "https://live-streaming.koralive.com/stream3"
      },
      {
        id: 4,
        tournamentId: 1,
        homeTeamId: 8,
        awayTeamId: 11,
        homeScore: 3,
        awayScore: 2,
        status: "live",
        matchDate: new Date(now.getTime() - 45 * 60000),
        currentMinute: 45,
        streamUrl: "https://live-streaming.koralive.com/stream4"
      },
      {
        id: 5,
        tournamentId: 4,
        homeTeamId: 15,
        awayTeamId: 12,
        homeScore: 1,
        awayScore: 0,
        status: "live",
        matchDate: new Date(now.getTime() - 32 * 60000),
        currentMinute: 32,
        streamUrl: "https://live-streaming.koralive.com/stream5"
      },
      {
        id: 6,
        tournamentId: 2,
        homeTeamId: 5,
        awayTeamId: 6,
        homeScore: 0,
        awayScore: 0,
        status: "upcoming",
        matchDate: new Date(now.getTime() + 3 * 60 * 60000),
        currentMinute: null,
        streamUrl: null
      },
      {
        id: 7,
        tournamentId: 3,
        homeTeamId: 1,
        awayTeamId: 3,
        homeScore: 0,
        awayScore: 0,
        status: "upcoming",
        matchDate: new Date(now.getTime() + 6 * 60 * 60000),
        currentMinute: null,
        streamUrl: null
      },
      {
        id: 8,
        tournamentId: 8,
        homeTeamId: 1,
        awayTeamId: 3,
        homeScore: 0,
        awayScore: 0,
        status: "upcoming",
        matchDate: new Date(now.getTime() + 24 * 60 * 60000),
        currentMinute: null,
        streamUrl: null
      },
      {
        id: 9,
        tournamentId: 10,
        homeTeamId: 8,
        awayTeamId: 12,
        homeScore: 0,
        awayScore: 0,
        status: "upcoming",
        matchDate: new Date(now.getTime() + 48 * 60 * 60000),
        currentMinute: null,
        streamUrl: null
      },
    ];

    matchesData.forEach(m => {
      this.matches.set(m.id, m);
      this.currentMatchId = Math.max(this.currentMatchId, m.id + 1);
    });

    // Initialize standings
    const standingsData = [
      // Premier League
      { id: 1, tournamentId: 2, teamId: 4, position: 1, played: 16, won: 12, drawn: 3, lost: 1, points: 39, goalsFor: 45, goalsAgainst: 15 },
      { id: 2, tournamentId: 2, teamId: 2, position: 2, played: 16, won: 11, drawn: 3, lost: 2, points: 36, goalsFor: 42, goalsAgainst: 18 },
      { id: 3, tournamentId: 2, teamId: 5, position: 3, played: 16, won: 10, drawn: 4, lost: 2, points: 34, goalsFor: 38, goalsAgainst: 20 },
      { id: 4, tournamentId: 2, teamId: 6, position: 4, played: 16, won: 9, drawn: 4, lost: 3, points: 31, goalsFor: 35, goalsAgainst: 22 },
      { id: 5, tournamentId: 2, teamId: 9, position: 5, played: 16, won: 8, drawn: 5, lost: 3, points: 29, goalsFor: 30, goalsAgainst: 25 },
      { id: 6, tournamentId: 2, teamId: 16, position: 6, played: 16, won: 7, drawn: 6, lost: 3, points: 27, goalsFor: 32, goalsAgainst: 28 },
      
      // La Liga
      { id: 7, tournamentId: 3, teamId: 1, position: 1, played: 15, won: 13, drawn: 1, lost: 1, points: 40, goalsFor: 35, goalsAgainst: 8 },
      { id: 8, tournamentId: 3, teamId: 3, position: 2, played: 15, won: 11, drawn: 2, lost: 2, points: 35, goalsFor: 38, goalsAgainst: 15 },
      { id: 9, tournamentId: 3, teamId: 14, position: 3, played: 15, won: 9, drawn: 4, lost: 2, points: 31, goalsFor: 28, goalsAgainst: 18 },
      
      // Serie A
      { id: 10, tournamentId: 4, teamId: 12, position: 1, played: 14, won: 11, drawn: 2, lost: 1, points: 35, goalsFor: 32, goalsAgainst: 8 },
      { id: 11, tournamentId: 4, teamId: 15, position: 2, played: 14, won: 9, drawn: 3, lost: 2, points: 30, goalsFor: 25, goalsAgainst: 12 },
      { id: 12, tournamentId: 4, teamId: 8, position: 3, played: 14, won: 8, drawn: 4, lost: 2, points: 28, goalsFor: 28, goalsAgainst: 15 },
      { id: 13, tournamentId: 4, teamId: 10, position: 4, played: 14, won: 8, drawn: 2, lost: 4, points: 26, goalsFor: 30, goalsAgainst: 20 },
      
      // Bundesliga
      { id: 14, tournamentId: 5, teamId: 7, position: 1, played: 13, won: 10, drawn: 2, lost: 1, points: 32, goalsFor: 35, goalsAgainst: 12 },
      { id: 15, tournamentId: 5, teamId: 13, position: 2, played: 13, won: 8, drawn: 3, lost: 2, points: 27, goalsFor: 28, goalsAgainst: 15 },
    ];

    standingsData.forEach(s => {
      this.standings.set(s.id, s);
      this.currentStandingId = Math.max(this.currentStandingId, s.id + 1);
    });
  }

  async getTournaments(): Promise<Tournament[]> {
    return Array.from(this.tournaments.values());
  }

  async getTournamentById(id: number): Promise<Tournament | undefined> {
    return this.tournaments.get(id);
  }

  async createTournament(tournament: InsertTournament): Promise<Tournament> {
    const id = this.currentTournamentId++;
    const newTournament: Tournament = { 
      ...tournament, 
      id,
      country: tournament.country ?? null,
      isActive: tournament.isActive ?? true
    };
    this.tournaments.set(id, newTournament);
    return newTournament;
  }

  async getTeams(): Promise<Team[]> {
    return Array.from(this.teams.values());
  }

  async getTeamById(id: number): Promise<Team | undefined> {
    return this.teams.get(id);
  }

  async createTeam(team: InsertTeam): Promise<Team> {
    const id = this.currentTeamId++;
    const newTeam: Team = { 
      ...team, 
      id,
      logo: team.logo ?? null
    };
    this.teams.set(id, newTeam);
    return newTeam;
  }

  async getMatches(): Promise<Match[]> {
    return Array.from(this.matches.values());
  }

  async getMatchesByStatus(status: string): Promise<Match[]> {
    return Array.from(this.matches.values()).filter(match => match.status === status);
  }

  async getMatchesByTournament(tournamentId: number): Promise<Match[]> {
    return Array.from(this.matches.values()).filter(match => match.tournamentId === tournamentId);
  }

  async getMatchById(id: number): Promise<Match | undefined> {
    return this.matches.get(id);
  }

  async createMatch(match: InsertMatch): Promise<Match> {
    const id = this.currentMatchId++;
    const newMatch: Match = { 
      ...match, 
      id,
      tournamentId: match.tournamentId ?? null,
      homeTeamId: match.homeTeamId ?? null,
      awayTeamId: match.awayTeamId ?? null,
      homeScore: match.homeScore ?? 0,
      awayScore: match.awayScore ?? 0,
      currentMinute: match.currentMinute ?? null,
      streamUrl: match.streamUrl ?? null
    };
    this.matches.set(id, newMatch);
    return newMatch;
  }

  async updateMatch(id: number, updates: Partial<Match>): Promise<Match | undefined> {
    const match = this.matches.get(id);
    if (!match) return undefined;
    
    const updatedMatch = { ...match, ...updates };
    this.matches.set(id, updatedMatch);
    return updatedMatch;
  }

  async getStandingsByTournament(tournamentId: number): Promise<Standing[]> {
    return Array.from(this.standings.values())
      .filter(standing => standing.tournamentId === tournamentId)
      .sort((a, b) => a.position - b.position);
  }

  async createStanding(standing: InsertStanding): Promise<Standing> {
    const id = this.currentStandingId++;
    const newStanding: Standing = { 
      ...standing, 
      id,
      tournamentId: standing.tournamentId ?? null,
      teamId: standing.teamId ?? null,
      played: standing.played ?? 0,
      won: standing.won ?? 0,
      drawn: standing.drawn ?? 0,
      lost: standing.lost ?? 0,
      points: standing.points ?? 0,
      goalsFor: standing.goalsFor ?? 0,
      goalsAgainst: standing.goalsAgainst ?? 0
    };
    this.standings.set(id, newStanding);
    return newStanding;
  }
}

// Database Storage Implementation
export class DatabaseStorage implements IStorage {
  async getTournaments(): Promise<Tournament[]> {
    return await db.select().from(tournaments);
  }

  async getTournamentById(id: number): Promise<Tournament | undefined> {
    const [tournament] = await db.select().from(tournaments).where(eq(tournaments.id, id));
    return tournament || undefined;
  }

  async createTournament(tournament: InsertTournament): Promise<Tournament> {
    const [newTournament] = await db
      .insert(tournaments)
      .values(tournament)
      .returning();
    return newTournament;
  }

  async getTeams(): Promise<Team[]> {
    return await db.select().from(teams);
  }

  async getTeamById(id: number): Promise<Team | undefined> {
    const [team] = await db.select().from(teams).where(eq(teams.id, id));
    return team || undefined;
  }

  async createTeam(team: InsertTeam): Promise<Team> {
    const [newTeam] = await db
      .insert(teams)
      .values(team)
      .returning();
    return newTeam;
  }

  async getMatches(): Promise<Match[]> {
    return await db.select().from(matches);
  }

  async getMatchesByStatus(status: string): Promise<Match[]> {
    return await db.select().from(matches).where(eq(matches.status, status));
  }

  async getMatchesByTournament(tournamentId: number): Promise<Match[]> {
    return await db.select().from(matches).where(eq(matches.tournamentId, tournamentId));
  }

  async getMatchById(id: number): Promise<Match | undefined> {
    const [match] = await db.select().from(matches).where(eq(matches.id, id));
    return match || undefined;
  }

  async createMatch(match: InsertMatch): Promise<Match> {
    const [newMatch] = await db
      .insert(matches)
      .values(match)
      .returning();
    return newMatch;
  }

  async updateMatch(id: number, updates: Partial<Match>): Promise<Match | undefined> {
    const [updatedMatch] = await db
      .update(matches)
      .set(updates)
      .where(eq(matches.id, id))
      .returning();
    return updatedMatch || undefined;
  }

  async getStandingsByTournament(tournamentId: number): Promise<Standing[]> {
    return await db.select().from(standings).where(eq(standings.tournamentId, tournamentId));
  }

  async createStanding(standing: InsertStanding): Promise<Standing> {
    const [newStanding] = await db
      .insert(standings)
      .values(standing)
      .returning();
    return newStanding;
  }
}

export const storage = new DatabaseStorage();
