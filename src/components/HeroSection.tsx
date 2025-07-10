import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from 'react-i18next';

const HeroSection = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Search term:", searchTerm);
    // Navigate to search results page, optionally passing search term
    // For now, just navigating. We can pass searchTerm via state or query params later.
    navigate("/apartment", { state: { searchTerm } });
  };

  return (
    <div
      className="relative bg-cover bg-center py-32 md:py-48"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=2070&auto=format&fit=crop')",
      }}
    >
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="relative container mx-auto px-4 text-center z-10">
        <h1 className="text-4xl md:text-6xl font-bold text-white">
          {t('hero.title')}
        </h1>
        <p className="mt-4 text-lg md:text-xl text-gray-200 max-w-2xl mx-auto">
          {t('hero.subtitle')}
        </p>
        <div className="mt-8 max-w-xl mx-auto">
          <form
            onSubmit={handleSearchSubmit}
            className="flex flex-col sm:flex-row gap-2"
          >
            <Input
              type="search"
              placeholder={t('hero.searchPlaceholder')}
              className="h-12 text-base flex-grow"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Button
              type="submit"
              size="lg"
              className="bg-blue-600 hover:bg-blue-700 h-12"
            >
              <Search className="h-5 w-5 mr-2 sm:hidden" />
              <span className="sm:hidden">{t('common.search')}</span>
              <span className="hidden sm:inline">{t('common.search')}</span>
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
