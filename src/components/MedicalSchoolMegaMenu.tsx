import React from 'react';
import { Link } from 'react-router-dom';

const canadianProvinces = [
  "Alberta", "British Columbia", "Manitoba", "New Brunswick",
  "Newfoundland and Labrador", "Northwest Territories", "Nova Scotia", "Nunavut", "Ontario",
  "Prince Edward Island", "Quebec", "Saskatchewan", "Yukon"
];

const MedicalSchoolMegaMenu = () => {
  const generateSlug = (name: string) => name.toLowerCase().replace(/\s+/g, '-');

  return (
    <div className="w-full p-4"> {/* Updated: Added w-full */}
      <h2 className="text-xl font-semibold text-white mb-4 text-center md:text-left">
        Search by Medical School Location
      </h2>
      {/* Updated: Changed ul to div and applied grid styling */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-2">
        {canadianProvinces.map(province => (
          <Link
            key={province}
            to={`/medical-schools/ca/${generateSlug(province)}`}
            // Updated: Applied styling similar to HospitalMegaMenu links
            className="block py-1 text-gray-300 hover:text-white hover:underline rounded-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
          >
            {/* Wrapped province name in h3 for consistent styling */}
            <h3 className="font-medium text-sm">{province}</h3>
            {/* You could add a secondary line here if needed, e.g., "View Schools" */}
            {/* <p className="text-xs text-gray-400">View Schools</p> */}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default MedicalSchoolMegaMenu;