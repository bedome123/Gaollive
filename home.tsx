import Header from "@/components/header";
import HeroSection from "@/components/hero-section";
import TournamentCards from "@/components/tournament-cards";
import LiveMatches from "@/components/live-matches";
import UpcomingFixtures from "@/components/upcoming-fixtures";
import StandingsTable from "@/components/standings-table";
import Footer from "@/components/footer";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section */}
      <HeroSection />
      
      {/* Tournament Categories */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">البطولات والدوريات العالمية</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              تابع مباريات كأس العالم ٢٠٢٦، دوري أبطال أوروبا وآسيا وأفريقيا، والدوريات الأوروبية الكبرى
            </p>
          </div>
          <TournamentCards />
        </div>
      </section>
      
      {/* Live Matches Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">المباريات المباشرة</h2>
              <p className="text-gray-600">شاهد المباريات الآن</p>
            </div>
            <Button variant="ghost" className="text-primary hover:text-secondary font-medium">
              عرض الكل <ArrowLeft className="mr-2 h-4 w-4" />
            </Button>
          </div>
          <LiveMatches />
        </div>
      </section>
      
      {/* Upcoming Fixtures */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">المباريات القادمة</h2>
              <p className="text-gray-600">لا تفوت أهم المباريات</p>
            </div>
            <div className="flex space-x-reverse space-x-4">
              <Button size="sm" className="bg-primary text-white">اليوم</Button>
              <Button variant="ghost" size="sm" className="text-gray-600 hover:text-primary">غداً</Button>
              <Button variant="ghost" size="sm" className="text-gray-600 hover:text-primary">هذا الأسبوع</Button>
            </div>
          </div>
          <UpcomingFixtures />
        </div>
      </section>
      
      {/* Tournament Standings */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">جداول الترتيب</h2>
            <p className="text-gray-600">تابع ترتيب الفرق في أهم البطولات</p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-8">
            <StandingsTable 
              tournamentId={2} 
              title="الدوري الإنجليزي" 
              subtitle="الجولة ١٦" 
            />
            <StandingsTable 
              tournamentId={1} 
              title="دوري أبطال أوروبا" 
              subtitle="المجموعة أ" 
            />
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
}
