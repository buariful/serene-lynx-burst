import React, { useState, useEffect } from "react";
import PropertyCard from "./PropertyCard";
import { Property } from "@/types/property";
import { useTranslation } from 'react-i18next';
import { MapPin, Loader2 } from "lucide-react";
import { locationService, UserLocation } from "@/services/locationService";

// Extended property data with location information
interface ExtendedProperty extends Property {
  city: string;
  province: string;
  lat: number;
  lng: number;
  distance?: number;
}

// Extended property data with Ontario locations
const ontarioProperties: ExtendedProperty[] = [
  {
    id: 1,
    imageUrl: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=400&auto=format&fit=crop",
    address: "4080 Yonge Street, North York, Toronto",
    city: "Toronto",
    province: "ON",
    beds: 1,
    baths: 1,
    price: 1245,
    currency: "CAD",
    lat: 43.7615,
    lng: -79.4111,
  },
  {
    id: 2,
    imageUrl: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?q=80&w=400&auto=format&fit=crop",
    address: "123 Queen Street West, Downtown, Toronto",
    city: "Toronto",
    province: "ON",
    beds: 2,
    baths: 2,
    price: 2100,
    currency: "CAD",
    lat: 43.6532,
    lng: -79.3832,
  },
  {
    id: 3,
    imageUrl: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?q=80&w=400&auto=format&fit=crop",
    address: "789 Bank Street, Centretown, Ottawa",
    city: "Ottawa",
    province: "ON",
    beds: 3,
    baths: 2,
    price: 2200,
    currency: "CAD",
    lat: 45.4215,
    lng: -75.6972,
  },
  {
    id: 4,
    imageUrl: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=400&auto=format&fit=crop",
    address: "456 Hurontario Street, Downtown, Mississauga",
    city: "Mississauga",
    province: "ON",
    beds: 1,
    baths: 1,
    price: 1800,
    currency: "CAD",
    lat: 43.5890,
    lng: -79.6441,
  },
  {
    id: 5,
    imageUrl: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=400&auto=format&fit=crop",
    address: "321 Main Street, Downtown, Hamilton",
    city: "Hamilton",
    province: "ON",
    beds: 2,
    baths: 1,
    price: 1600,
    currency: "CAD",
    lat: 43.2557,
    lng: -79.8711,
  },
  {
    id: 6,
    imageUrl: "https://images.unsplash.com/photo-1592595896551-fed1334a653f?q=80&w=400&auto=format&fit=crop",
    address: "654 Dundas Street, Downtown, London",
    city: "London",
    province: "ON",
    beds: 1,
    baths: 1,
    price: 1400,
    currency: "CAD",
    lat: 42.9849,
    lng: -81.2453,
  },
  {
    id: 7,
    imageUrl: "https://images.unsplash.com/photo-1480074568708-e7b720bb3f09?q=80&w=400&auto=format&fit=crop",
    address: "987 University Avenue, Waterloo",
    city: "Waterloo",
    province: "ON",
    beds: 2,
    baths: 2,
    price: 1900,
    currency: "CAD",
    lat: 43.4643,
    lng: -80.5204,
  },
  {
    id: 8,
    imageUrl: "https://images.unsplash.com/photo-1516455590571-18256e5bb9ff?q=80&w=400&auto=format&fit=crop",
    address: "147 Lakeshore Road, Downtown, Burlington",
    city: "Burlington",
    province: "ON",
    beds: 3,
    baths: 2,
    price: 2400,
    currency: "CAD",
    lat: 43.3255,
    lng: -79.7990,
  },
];

const FeaturedRentals = () => {
  const { t } = useTranslation();
  const [userLocation, setUserLocation] = useState<UserLocation | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [displayedProperties, setDisplayedProperties] = useState<ExtendedProperty[]>([]);

  // Detect user location on component mount
  useEffect(() => {
    const detectLocation = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        const location = await locationService.detectLocation();
        setUserLocation(location);
        
        console.log('Detected location:', location);
      } catch (error) {
        console.error('Location detection failed:', error);
        setError('Unable to detect your location');
        setUserLocation({
          city: 'Toronto',
          province: 'ON',
          lat: 43.6532,
          lng: -79.3832
        });
      } finally {
        setIsLoading(false);
      }
    };

    detectLocation();
  }, []);

  // Filter properties based on user location
  useEffect(() => {
    if (userLocation) {
      const nearbyProperties = ontarioProperties
        .map(property => ({
          ...property,
          distance: locationService.calculateDistance(
            userLocation.lat,
            userLocation.lng,
            property.lat,
            property.lng
          )
        }))
        .sort((a, b) => (a.distance || 0) - (b.distance || 0))
        .slice(0, 4); // Show 4 closest properties

      setDisplayedProperties(nearbyProperties);
      
      console.log('Nearby properties:', nearbyProperties.map(p => ({
        city: p.city,
        distance: p.distance?.toFixed(1) + ' km'
      })));
    }
  }, [userLocation]);

  if (isLoading) {
    return (
      <section className="py-12 md:py-16 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
            <span className="ml-2 text-gray-600 dark:text-gray-400">
              Finding rentals near you...
            </span>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 md:py-16 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white mb-2">
            {t('featuredRentals.title')} 
            <span className="text-blue-600 dark:text-blue-400"> Ontario</span>
          </h2>
          {userLocation && (
            <div className="flex items-center justify-center text-gray-600 dark:text-gray-400">
              <MapPin className="h-4 w-4 mr-1" />
              <span>Near {userLocation.city}, {userLocation.province}</span>
              {userLocation.accuracy && (
                <span className="ml-2 text-xs">
                  (±{Math.round(userLocation.accuracy)}m accuracy)
                </span>
              )}
            </div>
          )}
          {error && (
            <p className="text-sm text-red-600 dark:text-red-400 mt-2">
              {error} - Showing popular Ontario rentals
            </p>
          )}
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {displayedProperties.map((property) => (
            <PropertyCard
              id={property.id}
              key={property.id}
              property={property}
            />
          ))}
        </div>
        
        {displayedProperties.length === 0 && (
          <div className="text-center text-gray-600 dark:text-gray-400">
            <p>No rentals found near your location. Showing popular Ontario rentals.</p>
          </div>
        )}
        
        {/* Debug information in development */}
        {/* {process.env.NODE_ENV === 'development' && userLocation && (
          <div className="mt-8 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
            <h3 className="text-sm font-semibold mb-2">Debug Info:</h3>
            <p className="text-xs text-gray-600 dark:text-gray-400">
              Location: {userLocation.city}, {userLocation.province} ({userLocation.lat.toFixed(4)}, {userLocation.lng.toFixed(4)})
            </p>
            <p className="text-xs text-gray-600 dark:text-gray-400">
              Properties shown: {displayedProperties.length}
            </p>
            {displayedProperties.length > 0 && (
              <p className="text-xs text-gray-600 dark:text-gray-400">
                Closest: {displayedProperties[0].city} ({displayedProperties[0].distance?.toFixed(1)} km)
              </p>
            )}
          </div>
        )} */}
      </div>
    </section>
  );
};

export default FeaturedRentals;
