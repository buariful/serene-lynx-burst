import React from 'react';
import { Property } from '@/types/property';
import { Button } from '@/components/ui/button';
import { BedDouble, Bath } from 'lucide-react';

interface PropertyCardProps {
  property: Property;
}

const PropertyCard: React.FC<PropertyCardProps> = ({ property }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col">
      <img src={property.imageUrl} alt={property.address} className="w-full h-48 object-cover" />
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-sm font-semibold text-gray-800 mb-1 truncate" title={property.address}>
          {property.address}
        </h3>
        <div className="flex items-center text-xs text-gray-600 mb-2 space-x-3">
          <span className="flex items-center"><BedDouble className="w-3 h-3 mr-1" /> {property.beds} Bed</span>
          <span className="flex items-center"><Bath className="w-3 h-3 mr-1" /> {property.baths} Bath</span>
        </div>
        <p className="text-base font-bold text-blue-600 mb-3">
          ${property.price.toLocaleString()} {property.currency}/month
        </p>
        <Button variant="outline" size="sm" className="w-full mt-auto border-blue-600 text-blue-600 hover:bg-blue-50 hover:text-blue-700">
          Ask for Availability
        </Button>
      </div>
    </div>
  );
};

export default PropertyCard;