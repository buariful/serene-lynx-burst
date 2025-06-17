import React from 'react';
import { Link } from 'react-router-dom';

// Placeholder locations - replace with actual data structure and links
const provinces = [
  { name: "Alberta", slug: "ab" },
  { name: "British Columbia", slug: "bc" },
  { name: "Manitoba", slug: "mb" },
  { name: "New Brunswick", slug: "nb" },
  { name: "Newfoundland and Labrador", slug: "nl" },
  { name: "Nova Scotia", slug: "ns" },
  { name: "Ontario", slug: "on" },
  { name: "Prince Edward Island", slug: "pe" },
  { name: "Quebec", slug: "qc" },
  { name: "Saskatchewan", slug: "sk" },
];

const majorCities = [
    { name: "Toronto", province: "ON", slug: "toronto" },
    { name: "Montreal", province: "QC", slug: "montreal" },
    { name: "Vancouver", province: "BC", slug: "vancouver" },
    { name: "Calgary", province: "AB", slug: "calgary" },
    { name: "Ottawa", province: "ON", slug: "ottawa" },
    { name: "Edmonton", province: "AB", slug: "edmonton" },
];

const LocationMegaMenu: React.FC = () => {
  return (
    <div className="w-full p-6">
      <h2 className="text-xl font-semibold text-white mb-6 text-center md:text-left">
        Search by Location
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h3 className="text-lg font-medium text-white mb-3">Provinces</h3>
          <div className="grid grid-cols-2 gap-x-4 gap-y-2">
            {provinces.map((province) => (
              <Link
                key={province.slug}
                to={`/search-results?location_type=province&province=${province.slug}`}
                className="block py-1 text-gray-300 hover:text-white hover:underline text-sm"
              >
                {province.name}
              </Link>
            ))}
          </div>
        </div>
        <div>
          <h3 className="text-lg font-medium text-white mb-3">Major Cities</h3>
          <div className="grid grid-cols-2 gap-x-4 gap-y-2">
            {majorCities.map((city) => (
              <Link
                key={city.slug}
                to={`/search-results?location_type=city&city=${city.slug}&province=${city.province.toLowerCase()}`}
                className="block py-1 text-gray-300 hover:text-white hover:underline text-sm"
              >
                {city.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocationMegaMenu;