import { pgTable, text, serial, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const tournaments = pgTable("tournaments", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  nameAr: text("name_ar").notNull(),
  type: text("type").notNull(), // "league", "cup", "international"
  country: text("country"),
  season: text("season").notNull(),
  isActive: boolean("is_active").default(true),
});

export const teams = pgTable("teams", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  nameAr: text("name_ar").notNull(),
  country: text("country").notNull(),
  logo: text("logo"),
});

export const matches = pgTable("matches", {
  id: serial("id").primaryKey(),
  tournamentId: integer("tournament_id").references(() => tournaments.id),
  homeTeamId: integer("home_team_id").references(() => teams.id),
  awayTeamId: integer("away_team_id").references(() => teams.id),
  homeScore: integer("home_score").default(0),
  awayScore: integer("away_score").default(0),
  status: text("status").notNull(), // "upcoming", "live", "finished"
  matchDate: timestamp("match_date").notNull(),
  currentMinute: integer("current_minute"),
  streamUrl: text("stream_url"),
});

export const standings = pgTable("standings", {
  id: serial("id").primaryKey(),
  tournamentId: integer("tournament_id").references(() => tournaments.id),
  teamId: integer("team_id").references(() => teams.id),
  position: integer("position").notNull(),
  played: integer("played").default(0),
  won: integer("won").default(0),
  drawn: integer("drawn").default(0),
  lost: integer("lost").default(0),
  points: integer("points").default(0),
  goalsFor: integer("goals_for").default(0),
  goalsAgainst: integer("goals_against").default(0),
});

export const insertTournamentSchema = createInsertSchema(tournaments);
export const insertTeamSchema = createInsertSchema(teams);
export const insertMatchSchema = createInsertSchema(matches);
export const insertStandingSchema = createInsertSchema(standings);

export type Tournament = typeof tournaments.$inferSelect;
export type Team = typeof teams.$inferSelect;
export type Match = typeof matches.$inferSelect;
export type Standing = typeof standings.$inferSelect;

export type InsertTournament = z.infer<typeof insertTournamentSchema>;
export type InsertTeam = z.infer<typeof insertTeamSchema>;
export type InsertMatch = z.infer<typeof insertMatchSchema>;
export type InsertStanding = z.infer<typeof insertStandingSchema>;
