import React from 'react';
import { Link } from 'react-router-dom';

const canadianProvincesAndTerritories = [
  "Alberta", "British Columbia", "Manitoba", "New Brunswick",
  "Newfoundland and Labrador", "Nova Scotia", "Ontario",
  "Prince Edward Island", "Quebec", "Saskatchewan",
  "Northwest Territories", "Nunavut", "Yukon"
];

const usStates = [
  "Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", "Delaware",
  "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky",
  "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota", "Mississippi",
  "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey", "New Mexico",
  "New York", "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon", "Pennsylvania",
  "Rhode Island", "South Carolina", "South Dakota", "Tennessee", "Texas", "Utah", "Vermont",
  "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming"
];

const HospitalMegaMenu = () => {
  const generateSlug = (name: string) => name.toLowerCase().replace(/\s+/g, '-');

  return (
    <div className="flex flex-col md:flex-row">
      {/* Canada Column */}
      <div className="w-full md:w-1/2 p-4 md:border-r md:border-gray-200 dark:md:border-gray-700">
        <h3 className="font-semibold text-lg mb-3 text-gray-800 dark:text-gray-200">Canada</h3>
        <ul className="space-y-1 max-h-[300px] md:max-h-[400px] overflow-y-auto pr-2">
          {canadianProvincesAndTerritories.map(province => (
            <li key={province}>
              <Link
                to={`/hospitals/ca/${generateSlug(province)}`}
                className="block p-2 text-sm rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                {province}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* United States Column */}
      <div className="w-full md:w-1/2 p-4">
        <h3 className="font-semibold text-lg mb-3 text-gray-800 dark:text-gray-200">United States</h3>
        <ul className="space-y-1 max-h-[300px] md:max-h-[400px] overflow-y-auto pr-2">
          {usStates.map(state => (
            <li key={state}>
              <Link
                to={`/hospitals/us/${generateSlug(state)}`}
                className="block p-2 text-sm rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
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