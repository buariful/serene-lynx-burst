import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Search, MapPin, UserPlus } from "lucide-react";
import { Link } from "react-router-dom";

const cardData = [
  {
    icon: <Search className="h-10 w-10 text-blue-600 mb-4" />,
    title: "Search by Location",
    description:
      "Explore listings by city, neighborhood, or even near specific medical institutions.",
    link: "/search-results",
    linkText: "Start Searching",
    // imgSrc removed
  },
  {
    icon: <MapPin className="h-10 w-10 text-green-600 mb-4" />,
    title: "Browse by Map",
    description:
      "Visually find properties in your desired area using our interactive map search.",
    link: "/search-results",
    linkText: "View Map",
    // imgSrc removed
  },
  {
    icon: <UserPlus className="h-10 w-10 text-purple-600 mb-4" />,
    title: "List Your Property",
    description:
      "Reach qualified tenants in the medical community by listing your rental with us.",
    link: "/landlord/post-rental",
    linkText: "Become a Landlord",
    // imgSrc removed
  },
];

const ActionCards = () => {
  return (
    <section className="py-12 md:py-16 bg-gray-50 dark:bg-slate-800">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10 md:mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white">
            Find Your Ideal Rental
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mt-2 text-lg">
            Whether you're searching for a place or listing one, we've got you
            covered.
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
