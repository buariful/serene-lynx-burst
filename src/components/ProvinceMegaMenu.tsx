import React from 'react';
import { Link } from 'react-router-dom';

const canadianProvincesAndTerritories = [
  "Alberta", "British Columbia", "Manitoba", "New Brunswick",
  "Newfoundland and Labrador", "Northwest Territories", "Nova Scotia", "Nunavut", "Ontario",
  "Prince Edward Island", "Quebec", "Saskatchewan", "Yukon"
];

const ProvinceMegaMenu: React.FC = () => {
  const generateSlug = (name: string) => name.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');

  return (
    <div className="w-full p-4">
      <h2 className="text-xl font-semibold text-white mb-4 text-center md:text-left">
        Residency Programs by Province/Territory
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-2">
        {canadianProvincesAndTerritories.map(province => (
          <Link
            key={province}
            to={`/residency-programs/ca/${generateSlug(province)}`}
            className="block py-1 text-gray-300 hover:text-white hover:underline rounded-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
          >
            <h3 className="font-medium text-sm">{province}</h3>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ProvinceMegaMenu;