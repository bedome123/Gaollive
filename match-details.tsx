import { useParams } from "wouter";
import { useQuery } from "@tanstack/react-query";
import Header from "@/components/header";
import VideoPlayerAdvanced from "@/components/video-player-advanced";
import StreamAnalytics from "@/components/stream-analytics";
import Footer from "@/components/footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Shield, Clock, MapPin, BarChart3, Play } from "lucide-react";
import { formatScore, formatMatchTime, getMatchStatus } from "@/lib/arabic-utils";

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

export default function MatchDetails() {
  const { id } = useParams<{ id: string }>();
  const matchId = parseInt(id || "0");

  const { data: match, isLoading } = useQuery<EnrichedMatch>({
    queryKey: [`/api/matches/${matchId}`],
    enabled: !!matchId,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="animate-pulse">
            <div className="bg-gray-200 h-8 w-64 mb-4"></div>
            <div className="bg-gray-200 h-96 rounded-lg mb-8"></div>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-gray-200 h-64 rounded-lg"></div>
              <div className="bg-gray-200 h-64 rounded-lg"></div>
            </div>
          </div>
        </div>
      </TabsContent>

            <TabsContent value="analytics">
              <StreamAnalytics matchId={match.id} />
            </TabsContent>
          </Tabs>
        </div>
        <Footer />
      </div>
    );
  }

  if (!match) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center py-12">
            <p className="text-gray-500">المباراة غير موجودة</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Match Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${
              match.status === "live" 
                ? "bg-red-500 text-white live-indicator"
                : match.status === "upcoming"
                ? "bg-blue-500 text-white"
                : "bg-gray-500 text-white"
            }`}>
              {match.status === "live" && (
                <span className="inline-block w-2 h-2 bg-white rounded-full ml-1 animate-pulse"></span>
              )}
              {getMatchStatus(match.status)}
            </span>
            <span className="text-gray-500 text-sm mr-3">{match.tournament?.nameAr}</span>
          </div>
          
          <h1 className="text-4xl lg:text-6xl font-bold mb-4">
            {match.homeTeam?.nameAr}{" "}
            <span className="text-primary mx-4">
              {formatScore(match.homeScore, match.awayScore)}
            </span>{" "}
            {match.awayTeam?.nameAr}
          </h1>
          
          {match.currentMinute && (
            <p className="text-xl text-gray-600">
              {formatMatchTime(match.currentMinute)} - الشوط الثاني
            </p>
          )}
        </div>

        {/* Video Player */}
        {match.status === "live" && (
          <div className="mb-8">
            <VideoPlayer
              src="https://images.unsplash.com/photo-1574629810360-7efbbe195018?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=450"
              poster="https://images.unsplash.com/photo-1574629810360-7efbbe195018?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=450"
              currentTime={match.currentMinute || 0}
              duration={90}
            />
          </div>
        )}

        {/* Match Details */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Teams */}
          <Card>
            <CardHeader>
              <CardTitle>الفرق</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-blue-100 rounded-full ml-4 flex items-center justify-center">
                      <Shield className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <div className="font-bold">{match.homeTeam?.nameAr}</div>
                      <div className="text-sm text-gray-500">{match.homeTeam?.country}</div>
                    </div>
                  </div>
                  <div className="text-2xl font-bold text-primary">
                    {match.homeScore}
                  </div>
                </div>
                
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-red-100 rounded-full ml-4 flex items-center justify-center">
                      <Shield className="h-6 w-6 text-red-600" />
                    </div>
                    <div>
                      <div className="font-bold">{match.awayTeam?.nameAr}</div>
                      <div className="text-sm text-gray-500">{match.awayTeam?.country}</div>
                    </div>
                  </div>
                  <div className="text-2xl font-bold text-primary">
                    {match.awayScore}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Match Info */}
          <Card>
            <CardHeader>
              <CardTitle>معلومات المباراة</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center">
                  <Clock className="h-5 w-5 text-gray-400 ml-3" />
                  <div>
                    <div className="font-medium">وقت المباراة</div>
                    <div className="text-sm text-gray-500">
                      {new Date(match.matchDate).toLocaleString('ar-EG')}
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <MapPin className="h-5 w-5 text-gray-400 ml-3" />
                  <div>
                    <div className="font-medium">البطولة</div>
                    <div className="text-sm text-gray-500">{match.tournament?.nameAr}</div>
                  </div>
                </div>
                
                {match.currentMinute && (
                  <div className="flex items-center">
                    <Clock className="h-5 w-5 text-gray-400 ml-3" />
                    <div>
                      <div className="font-medium">الوقت الحالي</div>
                      <div className="text-sm text-gray-500">
                        {formatMatchTime(match.currentMinute)}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}
