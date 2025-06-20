// import React from 'react';
// import { Link } from 'react-router-dom';

// const canadianProvinces = [
//   "Alberta", "British Columbia", "Manitoba", "New Brunswick",
//   "Newfoundland and Labrador", "Northwest Territories", "Nova Scotia", "Nunavut", "Ontario",
//   "Prince Edward Island", "Quebec", "Saskatchewan", "Yukon"
// ];

// const MedicalSchoolMegaMenu = () => {
//   const generateSlug = (name: string) => name.toLowerCase().replace(/\s+/g, '-');

//   return (
//     <div className="w-full p-4"> {/* Updated: Added w-full */}
//       <h2 className="text-xl font-semibold text-white mb-4 text-center md:text-left">
//         Search by Medical School Location
//       </h2>
//       {/* Updated: Changed ul to div and applied grid styling */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-2">
//         {canadianProvinces.map(province => (
//           <Link
//             key={province}
//             to={`/medical-schools/ca/${generateSlug(province)}`}
//             // Updated: Applied styling similar to HospitalMegaMenu links
//             className="block py-1 text-gray-300 hover:text-white hover:underline rounded-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
//           >
//             {/* Wrapped province name in h3 for consistent styling */}
//             <h3 className="font-medium text-sm">{province}</h3>
//             {/* You could add a secondary line here if needed, e.g., "View Schools" */}
//             {/* <p className="text-xs text-gray-400">View Schools</p> */}
//           </Link>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default MedicalSchoolMegaMenu;

import React from "react";
import { Link } from "react-router-dom";

const CanadianLocationsMegamenu = () => {
  return (
    <div className="p-6 text-white text-xs">
      <h1 className="text-xl font-bold mb-4">Search by location</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Popular Locations Column */}
        <div>
          <h2 className="font-semibold mb-3">Popular Locations</h2>
          <ul className="space-y-2">
            <li>
              <Link
                to="/search-results"
                className="hover:text-white hover:underline text-xs"
              >
                Toronto, ON
              </Link>
            </li>
            <li>
              <Link
                to="/search-results"
                className="hover:text-white hover:underline text-xs"
              >
                Hamilton, ON
              </Link>
            </li>
            <li>
              <Link
                to="/search-results"
                className="hover:text-white hover:underline text-xs"
              >
                Vancouver, BC
              </Link>
            </li>
            <li>
              <Link
                to="/search-results"
                className="hover:text-white hover:underline text-xs"
              >
                London, ON
              </Link>
            </li>
            <li>
              <Link
                to="/search-results"
                className="hover:text-white hover:underline text-xs"
              >
                Kelowna, BC
              </Link>
            </li>
            <li>
              <Link
                to="/search-results"
                className="hover:text-white hover:underline text-xs"
              >
                Ottawa, ON
              </Link>
            </li>
          </ul>
        </div>

        {/* Canada Column */}
        <div>
          <h2 className="font-semibold mb-3">Canada (6E2)</h2>
          <ul className="space-y-2">
            <li>
              <Link
                to="/search-results"
                className="hover:text-white hover:underline text-xs"
              >
                Alberta (5E)
              </Link>
            </li>
            <li>
              <Link
                to="/search-results"
                className="hover:text-white hover:underline text-xs"
              >
                British Columbia (220)
              </Link>
            </li>
            <li>
              <Link
                to="/search-results"
                className="hover:text-white hover:underline text-xs"
              >
                Manitoba (4)
              </Link>
            </li>
            <li>
              <Link
                to="/search-results"
                className="hover:text-white hover:underline text-xs"
              >
                New Brunswick (2)
              </Link>
            </li>
            <li>
              <Link
                to="/search-results"
                className="hover:text-white hover:underline text-xs"
              >
                Newfoundland and Labrador (2)
              </Link>
            </li>
            <li>
              <Link
                to="/search-results"
                className="hover:text-white hover:underline text-xs"
              >
                Nova Scotia (109)
              </Link>
            </li>
            <li>
              <Link
                to="/search-results"
                className="hover:text-white hover:underline text-xs"
              >
                Ontario (443)
              </Link>
            </li>
            <li>
              <Link
                to="/search-results"
                className="hover:text-white hover:underline text-xs"
              >
                Prince Edward Island (1)
              </Link>
            </li>
            <li>
              <Link
                to="/search-results"
                className="hover:text-white hover:underline text-xs"
              >
                Quebec (15)
              </Link>
            </li>
            <li>
              <Link
                to="/search-results"
                className="hover:text-white hover:underline text-xs"
              >
                Saskatchewan (1)
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CanadianLocationsMegamenu;
