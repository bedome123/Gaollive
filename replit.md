# Football Live Streaming Platform (كورة لايف)

## Overview

This is a full-stack web application for streaming live football matches with support for Arabic language (RTL). The platform displays tournaments, teams, matches, and standings with live streaming capabilities. It's built as a single-page application with a modern tech stack optimized for Arabic football content.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter (lightweight client-side routing)
- **State Management**: TanStack Query (React Query) for server state
- **UI Framework**: Shadcn/ui components with Radix UI primitives
- **Styling**: Tailwind CSS with custom Arabic/RTL support
- **Build Tool**: Vite for development and bundling

### Backend Architecture
- **Runtime**: Node.js with Express.js
- **Language**: TypeScript with ES modules
- **API Pattern**: RESTful API with JSON responses
- **Development Server**: TSX for TypeScript execution
- **Production Build**: ESBuild for server bundling

### Database Architecture
- **ORM**: Drizzle ORM with PostgreSQL dialect
- **Schema**: Type-safe database schemas with Zod validation
- **Migration Strategy**: Drizzle Kit for schema management
- **Database Provider**: Neon Database (serverless PostgreSQL)

## Key Components

### Data Models
- **Tournaments**: Multi-language support (Arabic/English), seasonal data
- **Teams**: Team information with logos and country associations
- **Matches**: Live match data with streaming URLs and real-time updates
- **Standings**: League table calculations with comprehensive statistics

### Frontend Components
- **Header**: Navigation with Arabic RTL support and mobile responsive design
- **Live Matches**: Real-time match display with streaming integration
- **Tournament Cards**: Visual tournament browsing with category filtering
- **Video Player**: Custom video player for live stream playback
- **Standings Table**: League table with Arabic number formatting

### API Endpoints
- `GET /api/tournaments` - Tournament listings
- `GET /api/teams` - Team information
- `GET /api/matches` - Match data with status filtering
- `GET /api/standings/:tournamentId` - League standings

## Data Flow

1. **Client Request**: React components make API calls through TanStack Query
2. **API Processing**: Express routes handle requests and interact with storage layer
3. **Data Storage**: Drizzle ORM manages database operations with type safety
4. **Response Formatting**: Arabic/English data returned with proper RTL formatting
5. **UI Rendering**: Components render with Arabic number formatting and RTL layout

## External Dependencies

### Core Dependencies
- **@neondatabase/serverless**: Serverless PostgreSQL connection
- **drizzle-orm**: Type-safe database operations
- **@tanstack/react-query**: Server state management
- **wouter**: Lightweight routing solution
- **connect-pg-simple**: PostgreSQL session storage

### UI Dependencies
- **@radix-ui/***: Headless UI component primitives
- **tailwindcss**: Utility-first CSS framework
- **class-variance-authority**: Component variant management
- **date-fns**: Date manipulation utilities

### Development Dependencies
- **tsx**: TypeScript execution for development
- **esbuild**: Fast JavaScript bundler for production
- **vite**: Frontend build tool and dev server

## Deployment Strategy

### Development Environment
- **Dev Server**: Vite dev server with HMR for frontend
- **Backend**: TSX execution with auto-reload
- **Database**: Neon Database with connection pooling
- **Port Configuration**: Port 5000 for unified development

### Production Build
- **Frontend Build**: Vite builds to `dist/public`
- **Backend Build**: ESBuild bundles server to `dist/index.js`
- **Static Serving**: Express serves built frontend assets
- **Database**: Production Neon Database instance

### Deployment Configuration
- **Target**: Replit Autoscale deployment
- **Build Command**: `npm run build`
- **Start Command**: `npm run start`
- **Environment**: NODE_ENV=production with DATABASE_URL

## Changelog

- June 25, 2025: Initial setup with comprehensive tournament coverage
- June 25, 2025: Enhanced with World Cup 2026, Champions League (Europe/Asia/Africa), major European leagues
- June 25, 2025: Expanded to 12+ tournaments including international competitions
- June 25, 2025: Added comprehensive team database with 20+ teams
- June 25, 2025: Implemented live streaming URLs and enhanced match data
- June 25, 2025: Optimized for Arabic RTL layout and professional broadcasting appearance
- June 25, 2025: Integrated PostgreSQL database for persistent data storage
- June 25, 2025: Added real-time WebSocket infrastructure for live match updates
- June 25, 2025: Implemented advanced video player with multiple quality options
- June 25, 2025: Created admin panel for content management and live updates
- June 25, 2025: Added streaming analytics dashboard with viewer statistics
- June 25, 2025: Enhanced with CDN integration and adaptive streaming capabilities

## User Preferences

Preferred communication style: Simple, everyday language.
Project Goal: Real professional sports streaming platform for broadcasting major tournaments.
Target Deployment: Live streaming website for actual tournament broadcasting.
Budget Consideration: Looking for free deployment options due to budget constraints.

## Free Deployment Options

### Recommended Free Platforms:
1. **Vercel** - Best for this project type, free PostgreSQL support
2. **Railway** - Good for full-stack apps, free PostgreSQL included  
3. **Netlify** - Great for frontend, can connect to external APIs
4. **Render** - Full-stack deployment with free PostgreSQL

### Database Options (Free):
- Neon Database (PostgreSQL) - 1GB free
- Supabase (PostgreSQL) - 500MB free with API
- PlanetScale (MySQL) - 1GB free