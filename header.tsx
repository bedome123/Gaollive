import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Search, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Header() {
  const [location] = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const navItems = [
    { href: "/", label: "الرئيسية" },
    { href: "/live", label: "المباريات المباشرة" },
    { href: "/tournaments", label: "الدوريات" },
    { href: "/standings", label: "الجدول" },
    { href: "/news", label: "الأخبار" },
  ];

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/">
            <div className="flex items-center cursor-pointer">
              <div className="bg-primary text-white px-3 py-2 rounded-lg">
                <span className="text-xl">⚽</span>
                <span className="mr-2 font-bold text-lg">كورة لايف</span>
              </div>
            </div>
          </Link>
          
          {/* Navigation Links - Desktop */}
          <div className="hidden md:flex items-center space-x-reverse space-x-8">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href}>
                <span
                  className={`font-medium cursor-pointer ${
                    location === item.href
                      ? "text-primary"
                      : "text-gray-600 hover:text-primary"
                  }`}
                >
                  {item.label}
                </span>
              </Link>
            ))}
          </div>
          
          {/* Search - Desktop */}
          <div className="hidden md:flex items-center">
            <div className="relative">
              <Input
                type="text"
                placeholder="البحث عن المباريات..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-64 pr-10"
              />
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            </div>
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
        
        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t">
              {navItems.map((item) => (
                <Link key={item.href} href={item.href}>
                  <div
                    className={`block px-3 py-2 rounded-md text-base font-medium cursor-pointer ${
                      location === item.href
                        ? "text-primary bg-primary/10"
                        : "text-gray-600 hover:text-primary hover:bg-gray-50"
                    }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.label}
                  </div>
                </Link>
              ))}
              <div className="px-3 py-2">
                <div className="relative">
                  <Input
                    type="text"
                    placeholder="البحث عن المباريات..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pr-10"
                  />
                  <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
