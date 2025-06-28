import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Bell, BellOff, Shield } from "lucide-react";
import { useState } from "react";
import { formatMatchDate, formatArabicNumber } from "@/lib/arabic-utils";

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

export default function UpcomingFixtures() {
  const [reminders, setReminders] = useState<Set<number>>(new Set());
  const { data: matches, isLoading } = useQuery<EnrichedMatch[]>({
    queryKey: ["/api/matches-enriched?status=upcoming"],
  });

  const toggleReminder = (matchId: number) => {
    setReminders(prev => {
      const newReminders = new Set(prev);
      if (newReminders.has(matchId)) {
        newReminders.delete(matchId);
      } else {
        newReminders.add(matchId);
      }
      return newReminders;
    });
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    const hours = formatArabicNumber(date.getHours());
    const minutes = formatArabicNumber(date.getMinutes()).padStart(2, '٠');
    return `${hours}:${minutes}`;
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <Card key={i} className="h-24 animate-pulse bg-gray-200" />
        ))}
      </div>
    );
  }

  if (!matches || matches.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">لا توجد مباريات قادمة</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {matches.map((match) => {
        const matchDate = new Date(match.matchDate);
        const isReminderSet = reminders.has(match.id);
        
        return (
          <Card key={match.id} className="bg-gray-50 hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-reverse space-x-6">
                  <div className="text-center">
                    <div className="text-sm text-gray-500 mb-1">
                      {formatTime(match.matchDate)}
                    </div>
                    <div className="text-xs text-gray-400">
                      {formatMatchDate(matchDate)}
                    </div>
                  </div>
                  <div className="flex items-center space-x-reverse space-x-8">
                    <div className="text-center">
                      <div className="w-10 h-10 bg-red-100 rounded-full mx-auto mb-2 flex items-center justify-center">
                        <Shield className="h-5 w-5 text-red-600" />
                      </div>
                      <span className="font-medium text-sm">{match.homeTeam?.nameAr}</span>
                    </div>
                    <div className="text-gray-400 font-bold">ضد</div>
                    <div className="text-center">
                      <div className="w-10 h-10 bg-blue-100 rounded-full mx-auto mb-2 flex items-center justify-center">
                        <Shield className="h-5 w-5 text-blue-600" />
                      </div>
                      <span className="font-medium text-sm">{match.awayTeam?.nameAr}</span>
                    </div>
                  </div>
                </div>
                <div className="text-left">
                  <div className="text-sm text-gray-500 mb-1">{match.tournament?.nameAr}</div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => toggleReminder(match.id)}
                    className={`text-sm font-medium ${
                      isReminderSet ? "text-accent" : "text-primary hover:text-secondary"
                    }`}
                  >
                    {isReminderSet ? (
                      <>
                        <BellOff className="ml-1 h-4 w-4" />
                        إلغاء التذكير
                      </>
                    ) : (
                      <>
                        <Bell className="ml-1 h-4 w-4" />
                        تذكيرني
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
