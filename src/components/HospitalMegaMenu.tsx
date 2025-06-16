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
      <div className="w-full md:w-1/2 p-4 md:border-r md:border-gray-700"> {/* Use a darker border for dark mode */}
        <h3 className="font-semibold text-base mb-2 text-gray-900 dark:text-white">Canada</h3>
        <ul className="max-h-[300px] md:max-h-[350px] overflow-y-auto pr-2"> {/* Adjusted max-h slightly */}
          {canadianProvincesAndTerritories.map(province => (
            <li key={province}>
              <Link
                to={`/hospitals/ca/${generateSlug(province)}`}
                className="block py-0.5 text-sm text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                {province}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* United States Column */}
      <div className="w-full md:w-1/2 p-4">
        <h3 className="font-semibold text-base mb-2 text-gray-900 dark:text-white">United States</h3>
        <ul className="max-h-[300px] md:max-h-[350px] overflow-y-auto pr-2"> {/* Adjusted max-h slightly */}
          {usStatesAndTerritories.map(state => (
            <li key={state}>
              <Link
                to={`/hospitals/us/${generateSlug(state)}`}
                className="block py-0.5 text-sm text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
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