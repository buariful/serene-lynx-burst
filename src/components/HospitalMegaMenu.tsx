import React from 'react';
import { Link } from 'react-router-dom';

const canadianProvincesAndTerritories = [
  "Alberta", "British Columbia", "Manitoba", "New Brunswick",
  "Newfoundland and Labrador", "Northwest Territories", "Nova Scotia", "Nunavut", "Ontario",
  "Prince Edward Island", "Quebec", "Saskatchewan", "Yukon"
];

const usStatesAndTerritories = [
  "Alabama", "Alaska", "American Samoa", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", "Delaware",
  "District of Columbia", "Florida", "Georgia", "Guam", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa",
  "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota", "Mississippi",
  "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey", "New Mexico", "New York",
  "North Carolina", "North Dakota", "Northern Mariana Islands", "Ohio", "Oklahoma", "Oregon", "Pennsylvania", "Puerto Rico",
  "Rhode Island", "South Carolina", "South Dakota", "Tennessee", "Texas", "Utah", "Vermont", "Virgin Islands of the United States",
  "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming"
];

const HospitalMegaMenu = () => {
  const generateSlug = (name: string) => name.toLowerCase().replace(/\s+/g, '-');

  return (
    <div className="flex flex-col md:flex-row">
      {/* Canada Column */}
      <div className="w-full md:w-1/2 pt-4 px-6 pb-6 md:border-r md:border-slate-700">
        <h3 className="text-white font-semibold text-lg mb-3 text-center">Canada</h3>
        <ul className="max-h-[350px] overflow-y-auto space-y-0.5 pr-2">
          {canadianProvincesAndTerritories.map(province => (
            <li key={province}>
              <Link
                to={`/hospitals/ca/${generateSlug(province)}`}
                className="block py-1 text-gray-300 hover:text-white text-sm transition-colors duration-150"
              >
                {province}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* United States Column */}
      <div className="w-full md:w-1/2 pt-4 px-6 pb-6">
        <h3 className="text-white font-semibold text-lg mb-3 text-center">United States</h3>
        <ul className="max-h-[350px] overflow-y-auto space-y-0.5 pr-2">
          {usStatesAndTerritories.map(state => (
            <li key={state}>
              <Link
                to={`/hospitals/us/${generateSlug(state)}`}
                className="block py-1 text-gray-300 hover:text-white text-sm transition-colors duration-150"
              >
                {state}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default HospitalMegaMenu;