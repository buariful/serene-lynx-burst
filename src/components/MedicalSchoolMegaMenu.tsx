import React from "react";
import { Link } from "react-router-dom";

const medicalSchools = [
  // Column 1
  "University of Toronto",
  "McMaster University", 
  "Western University",
  "Queen's University",
  
  // Column 2
  "University of Ottawa",
  "McGill University",
  "University of British Columbia",
  "University of Alberta",
  
  // Column 3
  "University of Calgary",
  "University of Manitoba",
  "Dalhousie University",
  "Memorial University of Newfoundland",
  
  // Column 4
  "Université de Montréal",
  "Université Laval",
  "University of Saskatchewan",
  "Northern Ontario School of Medicine"
];

const MedicalSchoolMegaMenu: React.FC = () => {
  // Split schools into 4 columns
  const column1 = medicalSchools.slice(0, 4);
  const column2 = medicalSchools.slice(4, 8);
  const column3 = medicalSchools.slice(8, 12);
  const column4 = medicalSchools.slice(12, 16);

  return (
    <div className="w-full p-3 bg-white dark:bg-gray-900">
      <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 text-center">
        Search by Medical Schools
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Column 1 */}
        <div className="space-y-2">
          {column1.map((school) => (
            <Link
              key={school}
              to={`/apartment?category=medical-school&name=${encodeURIComponent(school)}`}
              className="block py-1 px-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-300 hover:bg-gray-50 dark:hover:bg-gray-800 rounded transition-colors duration-150 focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              <h3 className="font-medium text-sm leading-tight">{school}</h3>
            </Link>
          ))}
        </div>

        {/* Column 2 */}
        <div className="space-y-2">
          {column2.map((school) => (
            <Link
              key={school}
              to={`/apartment?category=medical-school&name=${encodeURIComponent(school)}`}
              className="block py-1 px-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-300 hover:bg-gray-50 dark:hover:bg-gray-800 rounded transition-colors duration-150 focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              <h3 className="font-medium text-sm leading-tight">{school}</h3>
            </Link>
          ))}
        </div>

        {/* Column 3 */}
        <div className="space-y-2">
          {column3.map((school) => (
            <Link
              key={school}
              to={`/apartment?category=medical-school&name=${encodeURIComponent(school)}`}
              className="block py-1 px-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-300 hover:bg-gray-50 dark:hover:bg-gray-800 rounded transition-colors duration-150 focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              <h3 className="font-medium text-sm leading-tight">{school}</h3>
            </Link>
          ))}
        </div>

        {/* Column 4 */}
        <div className="space-y-2">
          {column4.map((school) => (
            <Link
              key={school}
              to={`/apartment?category=medical-school&name=${encodeURIComponent(school)}`}
              className="block py-1 px-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-300 hover:bg-gray-50 dark:hover:bg-gray-800 rounded transition-colors duration-150 focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              <h3 className="font-medium text-sm leading-tight">{school}</h3>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MedicalSchoolMegaMenu;
