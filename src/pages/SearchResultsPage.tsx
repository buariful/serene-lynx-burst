import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import InteractiveMap from '@/components/InteractiveMap';
import SearchResultPropertyCard from '@/components/SearchResultPropertyCard';
import { Property } from '@/types/property';
import { MadeWithDyad } from '@/components/made-with-dyad';

// Sample data - replace with actual data fetching
const sampleProperties: Property[] = [
  { id: '101', imageUrl: 'https://images.unsplash.com/photo-1501183638710-841dd1904471?q=80&w=300&auto=format&fit=crop', address: '1944 Yonge Street, Toronto, ON', beds: 1, baths: 1, price: 2200, currency: 'CAD', amenities: ['Elevator', 'Laundry', 'Parking'], lat: 43.6977, lng: -79.3973 },
  { id: '102', imageUrl: 'https://images.unsplash.com/photo-1572120360610-d971b9d7767c?q=80&w=300&auto=format&fit=crop', address: '700 King Street West, Toronto, ON', beds: 2, baths: 2, price: 3500, currency: 'CAD', amenities: ['Gym', 'Pool', 'Concierge'], lat: 43.6445, lng: -79.4015 },
  { id: '103', imageUrl: 'https://images.unsplash.com/photo-1592595896551-fed1334a653f?q=80&w=300&auto=format&fit=crop', address: '25 Telegram Mews, Toronto, ON', beds: 1, baths: 1, price: 2450, currency: 'CAD', amenities: ['Rooftop Deck', 'Pet Friendly'], lat: 43.6410, lng: -79.3954 },
  { id: '104', imageUrl: 'https://images.unsplash.com/photo-1560185007-c5ca91ba2960?q=80&w=300&auto=format&fit=crop', address: '123 Queen Street East, Toronto, ON', beds: 3, baths: 2, price: 4200, currency: 'CAD', amenities: ['Balcony', 'Hardwood Floors', 'Parking'], lat: 43.6525, lng: -79.3718 },
  { id: '105', imageUrl: 'https://images.unsplash.com/photo-1480074568708-e7b720bb3f09?q=80&w=300&auto=format&fit=crop', address: '500 University Avenue, Toronto, ON', beds: 2, baths: 1, price: 2900, currency: 'CAD', amenities: ['Laundry', 'Utilities Included'], lat: 43.6565, lng: -79.3890 },
];

const SearchResultsPage = () => {
  const location = useLocation();
  const [searchTerm, setSearchTerm] = useState('');
  const [properties, setProperties] = useState<Property[]>(sampleProperties);
  const [highlightedPropertyId, setHighlightedPropertyId] = useState<string | null>(null);

  useEffect(() => {
    if (location.state && location.state.searchTerm) {
      setSearchTerm(location.state.searchTerm);
      // Here you would typically fetch properties based on the searchTerm
      // For now, we're just using sampleProperties
      console.log("Search term received:", location.state.searchTerm);
    }
  }, [location.state]);

  const handleCardHover = (id: string | null) => {
    setHighlightedPropertyId(id);
    // This would interact with the map to highlight the corresponding marker
  };

  const handleCardClick = (id: string) => {
    console.log("Card clicked, potentially pan/zoom map to property:", id);
    // This would interact with the map to focus on the property
  };
  
  const handleMarkerClick = (id: string) => {
    console.log("Marker clicked, potentially scroll to card:", id);
    // This would scroll the property list to the corresponding card
    const cardElement = document.getElementById(`property-card-${id}`);
    if (cardElement) {
      cardElement.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
    setHighlightedPropertyId(id);
  };


  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow flex flex-col md:flex-row">
        {/* Left Column (60% width): Interactive map */}
        <div className="w-full md:w-3/5 h-[400px] md:h-auto md:sticky md:top-[calc(var(--header-height,68px))] md:max-h-[calc(100vh-var(--header-height,68px))]">
          {/* Pass properties and interaction handlers to the map */}
          <InteractiveMap 
            // properties={properties} 
            // highlightedPropertyId={highlightedPropertyId}
            // onMarkerClick={handleMarkerClick}
          />
        </div>

        {/* Right Column (40% width): Scrollable grid of property cards */}
        <div className="w-full md:w-2/5 p-4 md:overflow-y-auto md:max-h-[calc(100vh-var(--header-height,68px))]">
          <h1 className="text-2xl font-bold mb-4">
            Search Results {searchTerm ? `for "${searchTerm}"` : ''}
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {properties.map((property) => (
              <div key={property.id} id={`property-card-${property.id}`}>
                <SearchResultPropertyCard 
                  property={property} 
                  onHover={handleCardHover}
                  onClick={handleCardClick}
                />
              </div>
            ))}
          </div>
          {properties.length === 0 && (
            <p>No properties found matching your search criteria.</p>
          )}
        </div>
      </main>
      <Footer />
      <div className="bg-slate-900">
        <MadeWithDyad />
      </div>
    </div>
  );
};

export default SearchResultsPage;