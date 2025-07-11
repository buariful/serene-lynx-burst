import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Search, MapPin, UserPlus } from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from 'react-i18next';

const ActionCards = () => {
  const { t } = useTranslation();
  const cardData = [
    {
      icon: <Search className="h-10 w-10 text-blue-600 mb-4" />,
      title: t('actionCards.searchByLocation'),
      description: t('actionCards.searchByLocationDesc'),
      link: "/apartment",
      linkText: t('actionCards.searchByLocationBtn'),
    },
    {
      icon: <MapPin className="h-10 w-10 text-green-600 mb-4" />,
      title: t('actionCards.browseByMap'),
      description: t('actionCards.browseByMapDesc'),
      link: "/apartment",
      linkText: t('actionCards.browseByMapBtn'),
    },
    {
      icon: <UserPlus className="h-10 w-10 text-purple-600 mb-4" />,
      title: t('actionCards.listProperty'),
      description: t('actionCards.listPropertyDesc'),
      link: "/landlord/post-rental",
      linkText: t('actionCards.listPropertyBtn'),
    },
  ];
  return (
    <section className="py-12 md:py-16 bg-gray-50 dark:bg-slate-800">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10 md:mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white">
            {t('actionCards.mainTitle')}
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mt-2 text-lg">
            {t('actionCards.mainDesc')}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {cardData.map((card, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden flex flex-col transition-all duration-300 hover:shadow-2xl"
            >
              {/* img tag removed */}
              <div className="p-6 flex flex-col flex-grow">
                <div className="flex justify-center mb-3">{card.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white text-center mb-2">
                  {card.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm text-center mb-4 flex-grow">
                  {card.description}
                </p>
                <div className="mt-auto text-center">
                  <Button
                    asChild
                    variant="link"
                    className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 px-0"
                  >
                    <Link to={card.link}>
                      {card.linkText} <ArrowRight className="h-4 w-4 ml-1" />
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
