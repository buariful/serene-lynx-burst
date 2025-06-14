import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import InteractiveMap from '@/components/InteractiveMap';
import SearchResultPropertyCard from '@/components/SearchResultPropertyCard';
import { Property } from '@/types/property';
import { MadeWithDyad } from '@/components/made-with-dyad';

// Sample data - replace with actual data fetching
// Added more diverse coordinates for Toronto
const sampleProperties: Property[] = [
  { id: '101', imageUrl: 'https://images.unsplash.com/photo-1501183638710-841dd1904471?q=80&w=300&auto=format&fit=crop', address: '1944 Yonge Street, Davisville, Toronto', beds: 1, baths: 1, price: 2200, currency: 'CAD', amenities: ['Elevator', 'Laundry', 'Parking'], lat: 43.6977, lng: -79.3973 },
  { id: '102', imageUrl: 'https://images.unsplash.com/photo-1572120360610-d971b9d7767c?q=80&w=300&auto=format&fit=crop', address: '700 King Street West, Fashion District, Toronto', beds: 2, baths: 2, price: 3500, currency: 'CAD', amenities: ['Gym', 'Pool', 'Concierge'], lat: 43.6445, lng: -79.4015 },
  { id: '103', imageUrl: 'https://images.unsplash.com/photo-1592595896551-fed1334a653f?q=80&w=300&auto=format&fit=crop', address: '25 Telegram Mews, CityPlace, Toronto', beds: 1, baths: 1, price: 2450, currency: 'CAD', amenities: ['Rooftop Deck', 'Pet Friendly'], lat: 43.6410, lng: -79.3954 },
  { id: '104', imageUrl: 'https://images.unsplash.com/photo-1560185007-c5ca91ba2960?q=80&w=300&auto=format&fit=crop', address: '123 Queen Street East, Moss Park, Toronto', beds: 3, baths: 2, price: 4200, currency: 'CAD', amenities: ['Balcony', 'Hardwood Floors'], lat: 43.6525, lng: -79.3718 },
  { id: '105', imageUrl: 'https://images.unsplash.com/photo-1480074568708-e7b720bb3f09?q=80&w=300&auto=format&fit=crop', address: '500 University Avenue, Discovery District, Toronto', beds: 2, baths: 1, price: 2900, currency: 'CAD', amenities: ['Laundry', 'Utilities Included'], lat: 43.6565, lng: -79.3890 },
  { id: '106', imageUrl: 'https://images.unsplash.com/photo-1516455590571-18256e5bb9ff?q=80&w=300&auto=format&fit=crop', address: '88 Harbour St, Harbourfront, Toronto', beds: 1, baths: 1, price: 2800, currency: 'CAD', amenities: ['Pool', 'Gym', 'Lake View'], lat: 43.6400, lng: -79.3787 },
  { id: '107', imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=300&auto=format&fit=crop', address: '20 Blue Jays Way, Entertainment District, Toronto', beds: 2, baths: 2, price: 3800, currency: 'CAD', amenities: ['Concierge', 'Parking', 'Modern'], lat: 43.6426, lng: -79.3910 },
];

const SearchResultsPage = () => {
  const location = useLocation();
  const [searchTerm, setSearchTerm] = useState('');
  const [properties, setProperties] = useState<Property[]>(sampleProperties);
  const [highlightedCardId, setHighlightedCardId] = useState<string | null>(null);
  const cardRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  useEffect(() => {
    if (location.state && location.state.searchTerm) {
      setSearchTerm(location.state.searchTerm);
      // TODO: Fetch properties based on searchTerm
      console.log("Search term received:", location.state.searchTerm);
    }
  }, [location.state]);

  const handleMarkerClick = (id: string) => {
    console.log("Marker clicked, scrolling to card:", id);
    setHighlightedCardId(id);
    const cardElement = cardRefs.current[id];
    if (cardElement) {
      cardElement.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
    // Optionally remove highlight after a delay
    setTimeout(() => {
        if (highlightedCardId === id) setHighlightedCardId(null);
    }, 3000);
  };

  const handleCardHover = (id: string | null) => {
    // For future use: could highlight map marker on card hover
    // console.log("Card hover:", id);
  };
  
  const handleCardClick = (id: string) => {
    // For future use: could focus map on card click
    console.log("Card clicked:", id);
    setHighlightedCardId(id); // Highlight card on click as well
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow flex flex-col md:flex-row" style={{ '--header-height': '68px' } as React.CSSProperties}>
        {/* Left Column (60% width): Interactive map */}
        <div className="w-full md:w-3/5 h-[50vh] md:h-auto md:sticky md:top-[var(--header-height)] md:max-h-[calc(100vh-var(--header-height))]">
          <InteractiveMap 
            properties={properties} 
            onMarkerClick={handleMarkerClick}
            highlightedPropertyId={highlightedCardId} // Pass for potential marker highlighting
          />
        </div>

        {/* Right Column (40% width): Scrollable list of property cards */}
        <div className="w-full md:w-2/5 p-4 md:overflow-y-auto md:max-h-[calc(100vh-var(--header-height))]">
          <h1 className="text-2xl font-bold mb-4">
            Search Results {searchTerm ? `for "${searchTerm}"` : ''}
          </h1>
          <div className="grid grid-cols-1 gap-4"> {/* Changed to single column */}
            {properties.map((property) => (
              <div 
                key={property.id} 
                id={`property-card-${property.id}`}
                ref={el => cardRefs.current[property.id] = el}
              >
                <SearchResultPropertyCard 
                  property={property} 
                  onHover={handleCardHover}
                  onClick={() => handleCardClick(property.id)}
                  isHighlighted={highlightedCardId === property.id}
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