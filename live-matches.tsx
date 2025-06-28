import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Play, Shield, Wifi, Users } from "lucide-react";
import { formatScore, formatMatchTime, getMatchStatus } from "@/lib/arabic-utils";
import { useWebSocket } from "@/hooks/use-websocket";
import { useEffect, useState } from "react";

interface EnrichedMatch {
  id: number;
  tournamentId: number;
  homeTeamId: number;
  awayTeamId: number;
  homeScore: number;
  awayScore: number;
  status: string;
  matchDate: string;
  currentMinute: number;
  streamUrl: string;
  homeTeam: {
    id: number;
    name: string;
    nameAr: string;
    country: string;
  };
  awayTeam: {
    id: number;
    name: string;
    nameAr: string;
    country: string;
  };
  tournament: {
    id: number;
    name: string;
    nameAr: string;
    type: string;
  };
}

export default function LiveMatches() {
  const { data: initialMatches, isLoading } = useQuery<EnrichedMatch[]>({
    queryKey: ["/api/matches-enriched"],
  });

  const [matches, setMatches] = useState<EnrichedMatch[]>([]);
  const [connectionStatus, setConnectionStatus] = useState<'connecting' | 'connected' | 'disconnected'>('connecting');
  
  const { lastMessage, readyState, sendMessage } = useWebSocket('/ws');

  // Initialize matches from API
  useEffect(() => {
    if (initialMatches) {
      setMatches(initialMatches);
    }
  }, [initialMatches]);

  // Handle WebSocket connection status
  useEffect(() => {
    switch (readyState) {
      case WebSocket.CONNECTING:
        setConnectionStatus('connecting');
        break;
      case WebSocket.OPEN:
        setConnectionStatus('connected');
        sendMessage({ type: 'get_live_matches' });
        break;
      case WebSocket.CLOSED:
        setConnectionStatus('disconnected');
        break;
    }
  }, [readyState, sendMessage]);

  // Handle incoming WebSocket messages
  useEffect(() => {
    if (!lastMessage) return;

    switch (lastMessage.type) {
      case 'match_update':
        const update = lastMessage.data;
        setMatches(prevMatches => 
          prevMatches.map(match => 
            match.id === update.matchId 
              ? { 
                  ...match, 
                  homeScore: update.homeScore ?? match.homeScore,
                  awayScore: update.awayScore ?? match.awayScore,
                  currentMinute: update.currentMinute ?? match.currentMinute,
                  status: update.status ?? match.status
                }
              : match
          )
        );
        break;
      
      case 'live_matches':
        if (lastMessage.data) {
          setMatches(lastMessage.data);
        }
        break;
    }
  }, [lastMessage]);

  if (isLoading) {
    return (
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(3)].map((_, i) => (
          <Card key={i} className="h-64 animate-pulse bg-gray-200" />
        ))}
      </div>
    );
  }

  if (!matches || matches.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">لا توجد مباريات مباشرة حالياً</p>
      </div>
    );
  }

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {matches.map((match) => (
        <Card
          key={match.id}
          className="match-card hover:shadow-lg transition-shadow border border-gray-200"
        >
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <span className="live-indicator bg-red-500 text-white px-2 py-1 rounded-full text-xs">
                <span className="inline-block w-2 h-2 bg-white rounded-full ml-1 animate-pulse"></span>
                {getMatchStatus(match.status)}
              </span>
              <span className="text-gray-500 text-sm">{match.tournament?.nameAr}</span>
            </div>
            
            <div className="text-center mb-4">
              <div className="flex items-center justify-between mb-2">
                <div className="text-center flex-1">
                  <div className="w-12 h-12 bg-blue-100 rounded-full mx-auto mb-2 flex items-center justify-center">
                    <Shield className="h-6 w-6 text-blue-600" />
                  </div>
                  <span className="font-medium text-sm">{match.homeTeam?.nameAr}</span>
                </div>
                <div className="px-4">
                  <div className="text-2xl font-bold text-primary">
                    {formatScore(match.homeScore, match.awayScore)}
                  </div>
                  <div className="text-xs text-gray-500">
                    {match.currentMinute ? formatMatchTime(match.currentMinute) : ""}
                  </div>
                </div>
                <div className="text-center flex-1">
                  <div className="w-12 h-12 bg-red-100 rounded-full mx-auto mb-2 flex items-center justify-center">
                    <Shield className="h-6 w-6 text-red-600" />
                  </div>
                  <span className="font-medium text-sm">{match.awayTeam?.nameAr}</span>
                </div>
              </div>
            </div>
            
            <Button className="w-full bg-primary hover:bg-secondary text-white">
              <Play className="ml-2 h-4 w-4" />
              شاهد المباراة
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
