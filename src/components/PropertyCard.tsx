import React from "react";
import { Property } from "@/types/property";
import { Button } from "@/components/ui/button";
import { BedDouble, Bath } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface PropertyCardProps {
  property: Property;
  id: number;
}

const PropertyCard: React.FC<PropertyCardProps> = ({ property, id }) => {
  const navigate = useNavigate();
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden flex flex-col border border-gray-200 dark:border-gray-700">
      <img
        src={property.imageUrl}
        alt={property.address}
        className="w-full h-48 object-cover"
      />
      <div className="p-4 flex flex-col flex-grow">
        <h3
          className="text-sm font-semibold text-gray-800 dark:text-white mb-1 truncate"
          title={property.address}
        >
          {property.address}
        </h3>
        <div className="flex items-center text-xs text-gray-600 dark:text-gray-400 mb-2 space-x-3">
          <span className="flex items-center">
            <BedDouble className="w-3 h-3 mr-1" /> {property.beds} Bed
          </span>
          <span className="flex items-center">
            <Bath className="w-3 h-3 mr-1" /> {property.baths} Bath
          </span>
        </div>
        <p className="text-base font-bold text-blue-600 dark:text-blue-400 mb-3">
          ${property.price.toLocaleString()} {property.currency}/month
        </p>
        <Button
          variant="outline"
          size="sm"
          className="w-full mt-auto border-blue-600 dark:border-blue-400 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-blue-700 dark:hover:text-blue-300"
          onClick={() => {
            navigate(`/toronto/${property.address}`);
            window.scrollTo({ top: 0, behavior: "auto" });
          }}
        >
          Details
        </Button>
      </div>
    </div>
  );
};

export default PropertyCard;
