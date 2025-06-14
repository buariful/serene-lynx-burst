import React from 'react';
import { Property } from '@/types/property';
import { Button } from '@/components/ui/button';
import { BedDouble, Bath, ParkingCircle, Building, WashingMachine } from 'lucide-react';

interface SearchResultPropertyCardProps {
  property: Property;
  // onHover?: (id: string | null) => void; // Removed
  // onClick?: (id: string) => void; // Removed
  // isHighlighted?: boolean; // Removed
}

const amenityIcons: { [key: string]: React.ElementType } = {
  Elevator: Building,
  Laundry: WashingMachine,
  Parking: ParkingCircle,
};

const SearchResultPropertyCard: React.FC<SearchResultPropertyCardProps> = ({ property }) => {
  return (
    <div 
      className={`bg-white rounded-lg shadow-md overflow-hidden flex border border-gray-200 hover:shadow-lg transition-all duration-200 cursor-pointer`}
      // onMouseEnter, onMouseLeave, onClick related to map interaction removed
    >
      {/* Left Column (40%): Image */}
      <div className="w-2/5 flex-shrink-0">
        <img 
          src={property.imageUrl || 'https://via.placeholder.com/300x200?text=No+Image'} 
          alt={property.address} 
          className="w-full h-40 object-cover"
        />
      </div>

      {/* Right Column (60%): Details */}
      <div className="w-3/5 p-3 flex flex-col justify-between">
        <div>
          <h3 className="text-sm font-semibold text-gray-800 mb-1 truncate" title={property.address}>
            {property.address}
          </h3>
          <div className="flex items-center text-xs text-gray-600 mb-1 space-x-2">
            <span className="flex items-center"><BedDouble className="w-3 h-3 mr-1" /> {property.beds} Bed</span>
            <span className="flex items-center"><Bath className="w-3 h-3 mr-1" /> {property.baths} Bath</span>
          </div>
          {property.amenities && property.amenities.length > 0 && (
            <div className="text-xs text-gray-500 mb-2 flex flex-wrap items-center gap-x-2 gap-y-1">
              {property.amenities.slice(0, 3).map(amenity => {
                const IconComponent = amenityIcons[amenity];
                return (
                  <span key={amenity} className="flex items-center">
                    {IconComponent && <IconComponent className="w-3 h-3 mr-0.5" />}
                    {amenity}
                  </span>
                );
              })}
            </div>
          )}
        </div>
        
        <div className="mt-auto">
            <p className="text-sm font-bold text-blue-600 mb-2">
            ${property.price.toLocaleString()} {property.currency}/month
            </p>
            <div className="flex justify-end">
                <Button 
                variant="primary" 
                size="sm" 
                className="bg-blue-600 hover:bg-blue-700 text-white text-xs h-8 font-bold"
                onClick={(e) => {
                    e.stopPropagation(); 
                    console.log("Check availability for:", property.id);
                    // This button's functionality is independent of map highlighting
                }}
                >
                Check Availability
                </Button>
            </div>
        </div>
      </div>
    </div>
  );
};

export default SearchResultPropertyCard;