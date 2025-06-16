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
    <div className="p-4"> {/* Overall padding for the content area */}
      <h2 className="text-xl font-semibold text-white mb-4 text-center md:text-left">
        Search by hospital
      </h2>
      <div className="flex flex-col md:flex-row">
        {/* Canada Column */}
        <div className="w-full md:w-1/2 md:pr-3"> {/* Padding right for separator space */}
          <h3 className="font-bold text-white mb-2 text-sm">Canada</h3>
          <ul className="space-y-0.5 max-h-[280px] md:max-h-[320px] overflow-y-auto pr-1"> {/* Tighter spacing, reduced max-height slightly */}
            {canadianProvincesAndTerritories.map(province => (
              <li key={province}>
                <Link
                  to={`/hospitals/ca/${generateSlug(province)}`}
                  className="block py-1 text-xs text-gray-300 hover:text-white transition-colors"
                >
                  {province}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Vertical Separator */}
        <div className="hidden md:block w-px bg-gray-700 mx-1"></div> {/* Light separator for dark bg */}

        {/* United States Column */}
        <div className="w-full md:w-1/2 mt-4 md:mt-0 md:pl-3"> {/* Padding left for separator space */}
          <h3 className="font-bold text-white mb-2 text-sm">United States</h3>
          <ul className="space-y-0.5 max-h-[280px] md:max-h-[320px] overflow-y-auto pr-1"> {/* Tighter spacing */}
            {usStatesAndTerritories.map(state => (
              <li key={state}>
                <Link
                  to={`/hospitals/us/${generateSlug(state)}`}
                  className="block py-1 text-xs text-gray-300 hover:text-white transition-colors"
                >
                  {state}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default HospitalMegaMenu;