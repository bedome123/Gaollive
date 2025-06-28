import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Play, BarChart3 } from "lucide-react";
import VideoPlayer from "./video-player";
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

export default function HeroSection() {
  const { data: matches, isLoading } = useQuery<EnrichedMatch[]>({
    queryKey: ["/api/matches-enriched?status=live"],
  });

  if (isLoading || !matches || matches.length === 0) {
    return (
      <section className="relative bg-gradient-to-l from-primary to-secondary text-white">
        <div className="absolute inset-0 video-overlay"></div>
        <div className="absolute inset-0 opacity-20">
          <img 
            src="https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080" 
            alt="Football stadium" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="text-4xl lg:text-6xl font-bold mb-6">
              لا توجد مباريات مباشرة حالياً
            </h1>
            <p className="text-xl text-white/90 mb-8">تابع المباريات القادمة</p>
          </div>
        </div>
      </section>
    );
  }

  const featuredMatch = matches[0];

  return (
    <section className="relative bg-gradient-to-l from-primary to-secondary text-white">
      <div className="absolute inset-0 video-overlay"></div>
      <div className="absolute inset-0 opacity-20">
        <img 
          src="https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080" 
          alt="Football stadium" 
          className="w-full h-full object-cover"
        />
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Match Info */}
          <div className="text-center lg:text-right">
            <div className="flex items-center justify-center lg:justify-end mb-4">
              <span className="live-indicator bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium mr-3">
                <span className="inline-block w-2 h-2 bg-white rounded-full mr-1 animate-pulse"></span>
                {getMatchStatus(featuredMatch.status)}
              </span>
              <span className="text-white/80">{featuredMatch.tournament?.nameAr}</span>
            </div>
            
            <h1 className="text-4xl lg:text-6xl font-bold mb-6">
              {featuredMatch.homeTeam?.nameAr}{" "}
              <span className="text-accent mx-4">
                {formatScore(featuredMatch.homeScore, featuredMatch.awayScore)}
              </span>{" "}
              {featuredMatch.awayTeam?.nameAr}
            </h1>
            
            <p className="text-xl text-white/90 mb-8">
              {featuredMatch.currentMinute ? formatMatchTime(featuredMatch.currentMinute) : ""} - الشوط الثاني
            </p>
            
            <div className="flex items-center justify-center lg:justify-end space-x-reverse space-x-4">
              <Button className="bg-accent hover:bg-accent/90 text-white">
                <Play className="ml-2 h-4 w-4" />
                شاهد المباراة
              </Button>
              <Button variant="outline" className="border-white/30 text-white hover:bg-white/10">
                <BarChart3 className="ml-2 h-4 w-4" />
                إحصائيات المباراة
              </Button>
            </div>
          </div>
          
          {/* Video Player */}
          <div className="relative">
            <VideoPlayer
              src="https://images.unsplash.com/photo-1574629810360-7efbbe195018?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=450"
              poster="https://images.unsplash.com/photo-1574629810360-7efbbe195018?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=450"
              currentTime={featuredMatch.currentMinute || 0}
              duration={90}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
