import React, { useState, useEffect, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, MapPin, Building2, Home, Clock, TrendingUp } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from 'react-i18next';

// Mock search suggestions data
const SEARCH_SUGGESTIONS: SearchSuggestion[] = [
  // Popular cities
  { id: 1, text: "Toronto, ON", type: "city", icon: MapPin },
  { id: 2, text: "Vancouver, BC", type: "city", icon: MapPin },
  { id: 3, text: "Montreal, QC", type: "city", icon: MapPin },
  { id: 4, text: "Calgary, AB", type: "city", icon: MapPin },
  { id: 5, text: "Ottawa, ON", type: "city", icon: MapPin },
  
  // Popular neighborhoods
  { id: 6, text: "Downtown Toronto", type: "neighborhood", icon: Building2 },
  { id: 7, text: "West End Vancouver", type: "neighborhood", icon: Building2 },
  { id: 8, text: "Old Montreal", type: "neighborhood", icon: Building2 },
  { id: 9, text: "Beltline Calgary", type: "neighborhood", icon: Building2 },
  { id: 10, text: "Centretown Ottawa", type: "neighborhood", icon: Building2 },
  
  // Property types
  { id: 11, text: "Apartments", type: "property", icon: Home },
  { id: 12, text: "Condos", type: "property", icon: Home },
  { id: 13, text: "Houses", type: "property", icon: Home },
  { id: 14, text: "Rooms", type: "property", icon: Home },
  { id: 15, text: "Basements", type: "property", icon: Home },
  
  // Popular addresses from existing data
  { id: 16, text: "1944 Yonge Street, Davisville, Toronto", type: "address", icon: MapPin },
  { id: 17, text: "700 King Street West, Fashion District, Toronto", type: "address", icon: MapPin },
  { id: 18, text: "25 Telegram Mews, CityPlace, Toronto", type: "address", icon: MapPin },
  { id: 19, text: "123 Queen Street East, Moss Park, Toronto", type: "address", icon: MapPin },
  { id: 20, text: "500 University Avenue, Discovery District, Toronto", type: "address", icon: MapPin },
];

interface SearchSuggestion {
  id: number;
  text: string;
  type: 'city' | 'neighborhood' | 'property' | 'address' | 'recent';
  icon: React.ComponentType<{ className?: string }>;
}

const HeroSection = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState<SearchSuggestion[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [isFocused, setIsFocused] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const navigate = useNavigate();
  const { t } = useTranslation();
  const inputRef = useRef<HTMLInputElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);

  // Load recent searches from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('recentSearches');
    if (saved) {
      try {
        setRecentSearches(JSON.parse(saved));
      } catch (error) {
        console.error('Error loading recent searches:', error);
      }
    }
  }, []);

  // Save recent searches to localStorage
  const saveRecentSearch = (search: string) => {
    const updated = [search, ...recentSearches.filter(s => s !== search)].slice(0, 5);
    setRecentSearches(updated);
    localStorage.setItem('recentSearches', JSON.stringify(updated));
  };

  // Filter suggestions based on search term
  useEffect(() => {
    if (searchTerm.trim().length === 0) {
      // Show recent searches first, then popular suggestions
      const recentSuggestions = recentSearches.map((search, index) => ({
        id: -index - 1, // Negative IDs for recent searches
        text: search,
        type: 'recent' as const,
        icon: Clock
      }));
      
      const popularSuggestions = SEARCH_SUGGESTIONS.slice(0, 8 - recentSuggestions.length);
      setSuggestions([...recentSuggestions, ...popularSuggestions]);
    } else {
      const filtered = SEARCH_SUGGESTIONS.filter(suggestion =>
        suggestion.text.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setSuggestions(filtered.slice(0, 8));
    }
    setSelectedIndex(-1);
  }, [searchTerm, recentSearches]);

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!showSuggestions || suggestions.length === 0) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex(prev => 
          prev < suggestions.length - 1 ? prev + 1 : 0
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex(prev => 
          prev > 0 ? prev - 1 : suggestions.length - 1
        );
        break;
      case 'Enter':
        e.preventDefault();
        if (selectedIndex >= 0 && selectedIndex < suggestions.length) {
          handleSuggestionClick(suggestions[selectedIndex]);
        } else {
          handleSearchSubmit(e);
        }
        break;
      case 'Escape':
        setShowSuggestions(false);
        setSelectedIndex(-1);
        inputRef.current?.blur();
        break;
    }
  };

  // Handle suggestion click
  const handleSuggestionClick = (suggestion: SearchSuggestion) => {
    setSearchTerm(suggestion.text);
    setShowSuggestions(false);
    setSelectedIndex(-1);
    saveRecentSearch(suggestion.text);
    navigate("/apartment", { state: { searchTerm: suggestion.text } });
  };

  // Handle input focus
  const handleFocus = () => {
    setIsFocused(true);
    setShowSuggestions(true);
  };

  // Handle input blur
  const handleBlur = () => {
    // Delay hiding suggestions to allow for clicks
    setTimeout(() => {
      setIsFocused(false);
      setShowSuggestions(false);
      setSelectedIndex(-1);
    }, 200);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      console.log("Search term:", searchTerm);
      setShowSuggestions(false);
      setSelectedIndex(-1);
      saveRecentSearch(searchTerm);
      navigate("/apartment", { state: { searchTerm } });
    }
  };

  // Get icon for suggestion type
  const getSuggestionIcon = (suggestion: SearchSuggestion) => {
    if (suggestion.type === 'recent') return Clock;
    if (suggestion.type === 'city' || suggestion.type === 'address') return MapPin;
    if (suggestion.type === 'neighborhood') return Building2;
    if (suggestion.type === 'property') return Home;
    return TrendingUp;
  };

  // Get suggestion label
  const getSuggestionLabel = (type: string) => {
    switch (type) {
      case 'recent': return 'Recent';
      case 'city': return 'City';
      case 'neighborhood': return 'Neighborhood';
      case 'property': return 'Property Type';
      case 'address': return 'Address';
      default: return type;
    }
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
            className="flex flex-col sm:flex-row gap-2 relative"
          >
            <div className="relative flex-grow">
              <Input
                ref={inputRef}
                type="search"
                placeholder={t('hero.searchPlaceholder')}
                className="h-12 text-base flex-grow pr-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={handleKeyDown}
                onFocus={handleFocus}
                onBlur={handleBlur}
                autoComplete="off"
                aria-label="Search for properties"
                aria-expanded={showSuggestions}
                aria-haspopup="listbox"
                aria-controls="search-suggestions"
                role="combobox"
              />
              
              {/* Search suggestions dropdown */}
              {showSuggestions && suggestions.length > 0 && (
                <div
                  ref={suggestionsRef}
                  id="search-suggestions"
                  className="absolute top-full left-0 right-0 mt-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-50 max-h-64 overflow-y-auto"
                  role="listbox"
                >
                  {suggestions.map((suggestion, index) => {
                    const IconComponent = getSuggestionIcon(suggestion);
                    return (
                      <button
                        key={suggestion.id}
                        type="button"
                        className={`w-full px-4 py-3 text-left hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center gap-3 ${
                          index === selectedIndex 
                            ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400' 
                            : 'text-gray-900 dark:text-gray-100'
                        }`}
                        onClick={() => handleSuggestionClick(suggestion)}
                        role="option"
                        aria-selected={index === selectedIndex}
                      >
                        <IconComponent className="h-4 w-4 text-gray-500 dark:text-gray-400 flex-shrink-0" />
                        <span className="flex-1">{suggestion.text}</span>
                        <span className="text-xs text-gray-500 dark:text-gray-400 capitalize">
                          {getSuggestionLabel(suggestion.type)}
                        </span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
            
            <Button
              type="submit"
              size="lg"
              className="bg-blue-600 hover:bg-blue-700 h-12"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              ) : (
                <>
                  <Search className="h-5 w-5 mr-2 sm:hidden" />
                  <span className="sm:hidden">{t('common.search')}</span>
                  <span className="hidden sm:inline">{t('common.search')}</span>
                </>
              )}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
