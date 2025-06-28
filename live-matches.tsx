import Header from "@/components/header";
import LiveMatches from "@/components/live-matches";
import Footer from "@/components/footer";

export default function LiveMatchesPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">المباريات المباشرة</h1>
          <p className="text-gray-600">شاهد جميع المباريات المباشرة الآن</p>
        </div>
        
        <LiveMatches />
      </div>
      
      <Footer />
    </div>
  );
}
