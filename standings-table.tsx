import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield } from "lucide-react";
import { formatArabicNumber } from "@/lib/arabic-utils";

interface EnrichedStanding {
  id: number;
  tournamentId: number;
  teamId: number;
  position: number;
  played: number;
  won: number;
  drawn: number;
  lost: number;
  points: number;
  goalsFor: number;
  goalsAgainst: number;
  team: {
    id: number;
    name: string;
    nameAr: string;
    country: string;
  };
}

interface StandingsTableProps {
  tournamentId: number;
  title: string;
  subtitle?: string;
}

export default function StandingsTable({ tournamentId, title, subtitle }: StandingsTableProps) {
  const { data: standings, isLoading } = useQuery<EnrichedStanding[]>({
    queryKey: [`/api/standings-enriched/${tournamentId}`],
  });

  if (isLoading) {
    return (
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="animate-pulse bg-gray-200 h-6 w-48"></CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="animate-pulse bg-gray-200 h-12 rounded"></div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!standings || standings.length === 0) {
    return (
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-500 text-center py-8">لا توجد بيانات ترتيب متاحة</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-bold">{title}</CardTitle>
          {subtitle && <span className="text-sm text-gray-500">{subtitle}</span>}
        </div>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-xs text-gray-500 border-b">
                <th className="text-right pb-2">#</th>
                <th className="text-right pb-2">الفريق</th>
                <th className="text-center pb-2">ل</th>
                <th className="text-center pb-2">ف</th>
                <th className="text-center pb-2">خ</th>
                <th className="text-center pb-2">النقاط</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {standings.map((standing, index) => (
                <tr
                  key={standing.id}
                  className={`border-b border-gray-100 ${
                    index < 2 ? "bg-green-50" : ""
                  }`}
                >
                  <td className="py-3">
                    <span
                      className={`font-bold ${
                        index === 0
                          ? "text-primary"
                          : index === 1
                          ? "text-secondary"
                          : ""
                      }`}
                    >
                      {formatArabicNumber(standing.position)}
                    </span>
                  </td>
                  <td className="py-3">
                    <div className="flex items-center">
                      <div className="w-6 h-6 bg-blue-100 rounded-full ml-3 flex items-center justify-center">
                        <Shield className="h-3 w-3 text-blue-600" />
                      </div>
                      <span className="font-medium">{standing.team?.nameAr}</span>
                    </div>
                  </td>
                  <td className="py-3 text-center">{formatArabicNumber(standing.won)}</td>
                  <td className="py-3 text-center">{formatArabicNumber(standing.drawn)}</td>
                  <td className="py-3 text-center">{formatArabicNumber(standing.lost)}</td>
                  <td className="py-3 text-center font-bold">
                    {formatArabicNumber(standing.points)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}
