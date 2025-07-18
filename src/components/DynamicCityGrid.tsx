import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";

interface DynamicCityGridProps {
  title: string;
  subtitle: string;
  cities: { name: string; href: string }[];
  gridCols?: string; // e.g. "grid-cols-2 md:grid-cols-4"
  showLoadMore?: boolean;
  initialDisplayCount?: number;
}

const DynamicCityGrid: React.FC<DynamicCityGridProps> = ({
  title,
  subtitle,
  cities,
  gridCols = "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5",
  showLoadMore = false,
  initialDisplayCount = 16,
}) => {
  const { t } = useTranslation();
  const [displayCount, setDisplayCount] = useState(initialDisplayCount);

  const displayedCities = cities.slice(0, displayCount);
  const hasMore = cities.length > displayCount;

  // Group cities into rows of 5 for better layout control
  const groupCitiesIntoRows = (cities: { name: string; href: string }[]) => {
    const rows = [];
    for (let i = 0; i < cities.length; i += 5) {
      rows.push(cities.slice(i, i + 5));
    }
    return rows;
  };

  const cityRows = groupCitiesIntoRows(displayedCities);

  const handleLoadMore = () => {
    setDisplayCount((prev) => Math.min(prev + 16, cities.length));
  };

  // Function to truncate text with ellipsis
  const truncateText = (text: string, maxLength: number = 30) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + "...";
  };

  return (
    <section className="py-8 md:py-12">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 dark:text-white mb-2 px-2">
          {title}
        </h2>
        <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mb-6 md:mb-8 max-w-xl mx-auto px-2">
          {subtitle}
        </p>
        <div className="flex justify-center mb-6 md:mb-8">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4 md:gap-6 w-full mx-auto">
            {displayedCities.map((city) => (
              <Link key={city.name} to={city.href} className="block group">
                <Button
                  variant="outline"
                  className="w-full h-14 sm:h-16 text-sm sm:text-base font-medium hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:border-blue-500 dark:hover:border-blue-400 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 px-3 sm:px-4 transition-all duration-200 shadow-sm hover:shadow-md"
                  title={city.name}
                >
                  <div className="flex flex-col items-center space-y-1">
                    <span className="font-semibold text-gray-800 dark:text-gray-200">
                      {truncateText(
                        city.name,
                        window.innerWidth < 640
                          ? 15
                          : window.innerWidth < 768
                          ? 18
                          : 20
                      )}
                    </span>
                  </div>
                </Button>
              </Link>
            ))}
          </div>
        </div>
        {showLoadMore && hasMore && (
          <Button
            onClick={handleLoadMore}
            variant="outline"
            className="px-4 sm:px-6 md:px-8 py-2 sm:py-3 text-sm sm:text-base hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:border-blue-500 dark:hover:border-blue-400"
          >
            <span className="hidden sm:inline">
              Load More Hospitals ({cities.length - displayCount} remaining)
            </span>
            <span className="sm:hidden">
              Load More ({cities.length - displayCount})
            </span>
          </Button>
        )}
      </div>
    </section>
  );
};

export default DynamicCityGrid;
