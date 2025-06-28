import { Facebook, Twitter, Instagram, Youtube } from "lucide-react";

export default function Footer() {
  const quickLinks = [
    "المباريات المباشرة",
    "جدول المباريات",
    "النتائج",
    "الأخبار",
    "الإحصائيات"
  ];

  const tournaments = [
    "كأس العالم ٢٠٢٦",
    "دوري أبطال أوروبا",
    "دوري أبطال آسيا",
    "دوري أبطال أفريقيا",
    "الدوريات الأوروبية"
  ];

  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Logo & Description */}
          <div className="md:col-span-2">
            <div className="flex items-center mb-4">
              <div className="bg-primary text-white px-3 py-2 rounded-lg ml-3">
                <span className="text-xl">⚽</span>
              </div>
              <span className="text-2xl font-bold">كورة لايف</span>
            </div>
            <p className="text-gray-400 mb-6 max-w-md">
              منصتك المفضلة لمشاهدة جميع المباريات من أهم الدوريات والبطولات العالمية بجودة عالية ومجاناً
            </p>
            <div className="flex space-x-reverse space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Facebook className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Twitter className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Instagram className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Youtube className="h-6 w-6" />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-4">روابط سريعة</h3>
            <ul className="space-y-2 text-gray-400">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a href="#" className="hover:text-white transition-colors">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Tournaments */}
          <div>
            <h3 className="text-lg font-bold mb-4">البطولات</h3>
            <ul className="space-y-2 text-gray-400">
              {tournaments.map((tournament, index) => (
                <li key={index}>
                  <a href="#" className="hover:text-white transition-colors">
                    {tournament}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; ٢٠٢٣ كورة لايف. جميع الحقوق محفوظة.</p>
        </div>
      </div>
    </footer>
  );
}
