import React from 'react';
import { Property } from '@/types/property';
import { Button } from '@/components/ui/button';
import { BedDouble, Bath, ParkingCircle, Building, WashingMachine } from 'lucide-react'; // Changed Elevator to Building

interface SearchResultPropertyCardProps {
  property: Property;
  onHover?: (id: string | null) => void; // For map interaction
  onClick?: (id: string) => void; // For map interaction
}

const amenityIcons: { [key: string]: React.ElementType } = {
  Elevator: Building, // Using Building icon for Elevator
  Laundry: WashingMachine,
  Parking: ParkingCircle,
};

const SearchResultPropertyCard: React.FC<SearchResultPropertyCardProps> = ({ property, onHover, onClick }) => {
  return (
    <div 
      className="bg-white rounded-lg shadow-md overflow-hidden flex border border-gray-200 hover:shadow-lg transition-shadow duration-200 cursor-pointer"
      onMouseEnter={() => onHover && onHover(property.id)}
      onMouseLeave={() => onHover && onHover(null)}
      onClick={() => onClick && onClick(property.id)}
    >
      {/* Left Column (40%): Image */}
      <div className="w-2/5 flex-shrink-0">
        <img 
          src={property.imageUrl || 'https://via.placeholder.com/300x200?text=No+Image'} 
          alt={property.address} 
          className="w-full h-full object-cover" 
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
        <p className="text-sm font-bold text-blue-600 mb-2">
          ${property.price.toLocaleString()} {property.currency}/month
        </p>
        <Button 
          variant="primary" 
          size="sm" 
          className="w-full bg-blue-600 hover:bg-blue-700 text-white text-xs h-8"
          onClick={(e) => {
            e.stopPropagation(); // Prevent card click if button is clicked
            console.log("Check availability for:", property.id);
          }}
        >
          Check Availability
        </Button>
      </div>
    </div>
  );
};

export default SearchResultPropertyCard;