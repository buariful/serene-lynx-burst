import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Search, MapPin, UserPlus } from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from 'react-i18next';

const ActionCards = () => {
  const { t } = useTranslation();
  const cardData = [
    {
      icon: <Search className="h-8 w-8 sm:h-10 sm:w-10 text-blue-600 mb-3 sm:mb-4" />,
      title: "Search by Hospital",
      description: "Explore listings by hospital, neighborhood, or even near specific medical institutions.",
      link: "/apartment",
      linkText: "Start Searching",
    },
    {
      icon: <MapPin className="h-8 w-8 sm:h-10 sm:w-10 text-green-600 mb-3 sm:mb-4" />,
      title: "Search by Medical School",
      description: "Visually find properties near medical schools using our interactive map search.",
      link: "/apartment",
      linkText: "View Map",
    },
    {
      icon: <UserPlus className="h-8 w-8 sm:h-10 sm:w-10 text-purple-600 mb-3 sm:mb-4" />,
      title: t('actionCards.listProperty'),
      description: t('actionCards.listPropertyDesc'),
      link: "/register",
      linkText: t('actionCards.listPropertyBtn'),
    },
  ];
  return (
    <section className="py-8 md:py-12 lg:py-16 bg-gray-50 dark:bg-slate-800">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8 md:mb-10 lg:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 dark:text-white px-2">
            {t('actionCards.mainTitle')}
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-gray-600 dark:text-gray-300 mt-2 px-2">
            {t('actionCards.mainDesc')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {cardData.map((card, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden flex flex-col transition-all duration-300 hover:shadow-2xl"
            >
              <div className="p-4 sm:p-6 flex flex-col flex-grow">
                <div className="flex justify-center mb-3">{card.icon}</div>
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white text-center mb-2 px-2">
                  {card.title}
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 text-center mb-4 flex-grow px-2">
                  {card.description}
                </p>
                <div className="mt-auto text-center">
                  <Button
                    asChild
                    variant="link"
                    className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 px-0 text-sm sm:text-base"
                  >
                    <Link to={card.link}>
                      {card.linkText} <ArrowRight className="h-3 w-3 sm:h-4 sm:w-4 ml-1" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ActionCards;
