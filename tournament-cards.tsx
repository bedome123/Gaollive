import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Trophy, Crown, Medal, Globe } from "lucide-react";

interface Tournament {
  id: number;
  name: string;
  nameAr: string;
  type: string;
  country: string;
  season: string;
  isActive: boolean;
}

const getTournamentIcon = (type: string) => {
  switch (type) {
    case "cup":
      return Trophy;
    case "league":
      return Crown;
    case "international":
      return Globe;
    default:
      return Medal;
  }
};

const getTournamentColor = (id: number) => {
  const colors = [
    "from-blue-500 to-blue-600",
    "from-purple-500 to-purple-600", 
    "from-orange-500 to-red-500",
    "from-green-500 to-green-600"
  ];
  return colors[id % colors.length];
};

export default function TournamentCards() {
  const { data: tournaments, isLoading } = useQuery<Tournament[]>({
    queryKey: ["/api/tournaments"],
  });

  if (isLoading) {
    return (
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[...Array(4)].map((_, i) => (
          <Card key={i} className="h-48 animate-pulse bg-gray-200" />
        ))}
      </div>
    );
  }

  if (!tournaments || tournaments.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">لا توجد بطولات متاحة حالياً</p>
      </div>
    );
  }

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
      {tournaments.map((tournament, index) => {
        const Icon = getTournamentIcon(tournament.type);
        const colorClass = getTournamentColor(tournament.id);
        
        return (
          <Card
            key={tournament.id}
            className={`tournament-card bg-gradient-to-b ${colorClass} text-white cursor-pointer hover:shadow-xl transition-all duration-300`}
          >
            <CardContent className="p-6 text-center">
              <Icon className="h-10 w-10 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">{tournament.nameAr}</h3>
              <p className="text-white/80 text-sm mb-4">
                {tournament.type === "league" ? "دوري" : tournament.type === "cup" ? "كأس" : "بطولة دولية"}
              </p>
              <div className="bg-white/20 rounded-lg p-3">
                <span className="text-sm">الموسم</span>
                <div className="font-bold">{tournament.season}</div>
                <div className="text-xs text-white/80">
                  {tournament.country}
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
