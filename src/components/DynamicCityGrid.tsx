import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useTranslation } from 'react-i18next';

interface DynamicCityGridProps {
  title: string;
  subtitle: string;
  cities: { name: string; href: string }[];
  gridCols?: string; // e.g. "grid-cols-2 md:grid-cols-4"
}

const DynamicCityGrid: React.FC<DynamicCityGridProps> = ({
  title,
  subtitle,
  cities,
  gridCols = "grid-cols-2 md:grid-cols-4",
}) => {
  const { t } = useTranslation();
  return (
    <section className="py-12 md:py-16">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white mb-2">
          {title}
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-xl mx-auto">{t('dynamicCityGrid.subtitle')}</p>
        <div className={`flex flex-wrap justify-center gap-4 md:gap-6`}>
          {cities.map((city) => (
            <Link key={city.name} to={city.href}>
              <Button
                variant="outline"
                className="w-full h-12 text-base hover:bg-gray-100 dark:hover:bg-gray-700 hover:border-blue-500 dark:hover:border-blue-400 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300"
              >
                {city.name}
              </Button>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DynamicCityGrid;
