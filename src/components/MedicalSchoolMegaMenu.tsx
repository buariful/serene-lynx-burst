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
    <div className="p-4"> {/* Overall padding */}
      <h2 className="text-xl font-semibold text-white mb-4 text-center md:text-left">
        Search by Medical School Location
      </h2>
      <div className="w-full">
        <h3 className="font-bold text-white mb-2 text-sm">Canada</h3>
        <ul className="space-y-0.5 max-h-[280px] md:max-h-[320px] overflow-y-auto pr-1">
          {canadianProvinces.map(province => (
            <li key={province}>
              <Link
                to={`/medical-schools/ca/${generateSlug(province)}`} // Adjusted link path
                className="block py-1 text-xs text-gray-300 hover:text-white transition-colors"
              >
                {province}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MedicalSchoolMegaMenu;