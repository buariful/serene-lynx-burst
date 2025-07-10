import Footer from "@/components/Footer";
import Header from "@/components/Header";
import CityMap from "@/components/ui/cityMap";
import NavSearchFilter from "@/components/ui/navSearchFilter";
import { Property } from "@/types/property";
import React, { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { useTranslation } from 'react-i18next';

import InteractiveMap from "@/components/InteractiveMap";
import SearchResultPropertyCard from "@/components/SearchResultPropertyCard";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";
import PropertyCard2 from "@/components/PropertyCard2";

// Sample data
const sampleProperties: Property[] = [
  {
    id: 101,
    imageUrl:
      "https://media.architecturaldigest.com/photos/67bcc8747dfc89b75d51a6ab/16:9/w_2580,c_limit/Kishani%20Perera_Point%20Dume%20Project_Photographer%20Anthony%20Barcelo.jpg",
    // "https://images.rentals.ca/property-pictures/medium/oshawa-on/852001/apartment-533581394.jpg",

    address: "1944 Yonge Street, Davisville, Toronto",
    beds: 1,
    baths: 1,
    price: 2200,
    currency: "CAD",
    amenities: ["Elevator", "Laundry", "Parking"],
    lat: 43.6977,
    lng: -79.3973,
  },
  {
    id: 102,
    imageUrl:
      "https://www.moderngardenrooms.com/wp-content/uploads/2022/03/garden-room-bedroom-3-scaled.jpg",

    address: "700 King Street West, Fashion District, Toronto",
    beds: 2,
    baths: 2,
    price: 3500,
    currency: "CAD",
    amenities: ["Gym", "Pool", "Concierge"],
    lat: 43.6445,
    lng: -79.4015,
  },
  {
    id: 103,
    imageUrl:
      "https://images.unsplash.com/photo-1501183638710-841dd1904471?q=80&w=300&auto=format&fit=crop",
    address: "25 Telegram Mews, CityPlace, Toronto",
    beds: 1,
    baths: 1,
    price: 2450,
    currency: "CAD",
    amenities: ["Rooftop Deck", "Pet Friendly"],
    lat: 43.641,
    lng: -79.3954,
  },
  {
    id: 104,
    imageUrl:
      "https://www.bhg.com/thmb/H9VV9JNnKl-H1faFXnPlQfNprYw=/1799x0/filters:no_upscale():strip_icc()/white-modern-house-curved-patio-archway-c0a4a3b3-aa51b24d14d0464ea15d36e05aa85ac9.jpg",
    address: "123 Queen Street East, Moss Park, Toronto",
    beds: 3,
    baths: 2,
    price: 4200,
    currency: "CAD",
    amenities: ["Balcony", "Hardwood Floors"],
    lat: 43.6525,
    lng: -79.3718,
  },
  {
    id: 105,
    imageUrl:
      "https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg",
    address: "500 University Avenue, Discovery District, Toronto",
    beds: 2,
    baths: 1,
    price: 2900,
    currency: "CAD",
    amenities: ["Laundry", "Utilities Included"],
    lat: 43.6565,
    lng: -79.389,
  },
  {
    id: 106,
    imageUrl:
      "https://images.unsplash.com/photo-1516455590571-18256e5bb9ff?q=80&w=300&auto=format&fit=crop",
    address: "88 Harbour St, Harbourfront, Toronto",
    beds: 1,
    baths: 1,
    price: 2800,
    currency: "CAD",
    amenities: ["Pool", "Gym", "Lake View"],
    lat: 43.64,
    lng: -79.3787,
  },
  {
    id: 107,
    imageUrl:
      "https://dongardner.com/cdn/shop/articles/706-front-1.jpg?v=1713538108&width=1100",
    address: "20 Blue Jays Way, Entertainment District, Toronto",
    beds: 2,
    baths: 2,
    price: 3800,
    currency: "CAD",
    amenities: ["Concierge", "Parking", "Modern"],
    lat: 43.6426,
    lng: -79.391,
  },
];

const ApartmentPage: React.FC = () => {
  const location = useLocation();
  const [searchTerm, setSearchTerm] = useState("");
  const [properties, setProperties] = useState<Property[]>(sampleProperties);
  const [expandedPropertyId, setExpandedPropertyId] = useState<number | null>(
    null
  );
  const cardRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
  const { t } = useTranslation();

  useEffect(() => {
    if (location.state && location.state.searchTerm) {
      setSearchTerm(location.state.searchTerm);
      console.log("Search term received:", location.state.searchTerm);
    }
  }, [location.state]);

  return (
    <div className="">
      <Header />
      <NavSearchFilter />
      <main
        className="flex-grow flex flex-col md:flex-row h-[calc(100vh-68px)]"
        style={{ "--header-height": "68px" } as React.CSSProperties}
      >
        <div className="w-full md:w-1/2 h-full md:sticky md:top-[var(--header-height)] md:max-h-none">
          <CityMap />
        </div>

        <div className="w-full md:w-1/2 p-4 h-full overflow-y-auto">
          {expandedPropertyId ? (
            <PropertyCard2
              property={properties.find((p) => p.id === expandedPropertyId)!}
              showDetails={true}
              onAddressClick={() => setExpandedPropertyId(null)}
            />
          ) : (
            <>
              {[0, 1, 2, 3].map((i) => (
                <div className="mb-8" key={i}>
                  <Carousel opts={{ loop: true }}>
                    <CarouselContent>
                      {properties.map((property) => (
                        <CarouselItem key={property.id} className="basis-full">
                          <div className="w-full p-2">
                            <PropertyCard2
                              property={property}
                              onAddressClick={() =>
                                setExpandedPropertyId(property.id)
                              }
                            />
                          </div>
                        </CarouselItem>
                      ))}
                    </CarouselContent>
                  </Carousel>
                </div>
              ))}
              {properties.length === 0 && (
                <p>{t('apartmentPage.noPropertiesFound')}</p>
              )}
            </>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ApartmentPage;
