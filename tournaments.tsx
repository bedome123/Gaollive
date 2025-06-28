import Header from "@/components/header";
import TournamentCards from "@/components/tournament-cards";
import Footer from "@/components/footer";

export default function TournamentsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">البطولات والدوريات</h1>
          <p className="text-gray-600">تصفح جميع البطولات والدوريات المتاحة</p>
        </div>
        
        <TournamentCards />
      </div>
      
      <Footer />
    </div>
  );
}
