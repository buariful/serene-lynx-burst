import React, { useState } from "react";
import { Link } from "react-router-dom";

const hospitalsByProvince = {
  "Ontario": [
    "Toronto General Hospital (University Health Network)",
    "Mount Sinai Hospital",
    "Sunnybrook Health Sciences Centre",
    "The Ottawa Hospital",
    "Hamilton General Hospital",
    "London Health Sciences Centre",
    "St. Michael's Hospital",
    "North York General Hospital",
    "Scarborough Health Network",
    "Trillium Health Partners",
    "William Osler Health System",
    "Halton Healthcare Services",
    "Niagara Health System",
    "Kingston Health Sciences Centre",
    "Health Sciences North",
    "Thunder Bay Regional Health Sciences Centre",
    "Windsor Regional Hospital",
    "Grand River Hospital",
    "Cambridge Memorial Hospital",
    "Guelph General Hospital"
  ],
  "British Columbia": [
    "Vancouver General Hospital",
    "St. Paul's Hospital",
    "Royal Columbian Hospital",
    "Surrey Memorial Hospital",
    "Burnaby Hospital",
    "Richmond Hospital",
    "New Westminster Hospital",
    "Eagle Ridge Hospital",
    "Ridge Meadows Hospital",
    "Peace Arch Hospital",
    "Langley Memorial Hospital",
    "Abbotsford Regional Hospital",
    "Chilliwack General Hospital",
    "Royal Inland Hospital",
    "Kelowna General Hospital",
    "Penticton Regional Hospital",
    "Kootenay Boundary Regional Hospital",
    "East Kootenay Regional Hospital",
    "Vernon Jubilee Hospital",
    "Shuswap Lake General Hospital"
  ],
  "Quebec": [
    "Royal Victoria Hospital (McGill University Health Centre)",
    "Jewish General Hospital",
    "Montreal General Hospital",
    "Centre hospitalier de l'Université de Montréal",
    "Hôpital Maisonneuve-Rosemont",
    "Hôpital du Sacré-Cœur de Montréal",
    "Centre hospitalier universitaire Sainte-Justine",
    "Hôpital de Verdun",
    "Hôpital de LaSalle",
    "Hôpital de Lachine",
    "Centre hospitalier de St. Mary",
    "Hôpital de Gatineau",
    "Centre hospitalier de l'Université Laval",
    "Hôpital de l'Enfant-Jésus",
    "Hôpital Saint-François d'Assise",
    "Institut universitaire de cardiologie et de pneumologie de Québec",
    "Centre hospitalier universitaire de Sherbrooke",
    "Hôpital Fleurimont",
    "Hôpital Hôtel-Dieu de Sherbrooke",
    "Centre hospitalier de l'Université de Sherbrooke"
  ],
  "Alberta": [
    "Foothills Medical Centre",
    "Rockyview General Hospital",
    "Peter Lougheed Centre",
    "South Health Campus",
    "Alberta Children's Hospital",
    "University of Alberta Hospital",
    "Royal Alexandra Hospital",
    "Grey Nuns Community Hospital",
    "Misericordia Community Hospital",
    "Sturgeon Community Hospital",
    "Fort Saskatchewan Community Hospital",
    "WestView Health Centre",
    "Red Deer Regional Hospital Centre",
    "Medicine Hat Regional Hospital",
    "Chinook Regional Hospital",
    "Grande Prairie Regional Hospital",
    "Northern Lights Regional Health Centre",
    "Queen Elizabeth II Hospital",
    "Lethbridge Regional Hospital",
    "Cardston Health Centre"
  ]
};

const HospitalMegaMenu: React.FC = () => {
  const [showAllHospitals, setShowAllHospitals] = useState(false);

  // Get initial 16 hospitals (4 from each province)
  const getInitialHospitals = () => {
    const initialHospitals: Array<{name: string, province: string}> = [];
    Object.entries(hospitalsByProvince).forEach(([province, hospitals]) => {
      hospitals.slice(0, 4).forEach(hospital => {
        initialHospitals.push({ name: hospital, province });
      });
    });
    return initialHospitals;
  };

  // Get all hospitals for expanded view
  const getAllHospitals = () => {
    const allHospitals: Array<{name: string, province: string}> = [];
    Object.entries(hospitalsByProvince).forEach(([province, hospitals]) => {
      hospitals.forEach(hospital => {
        allHospitals.push({ name: hospital, province });
      });
    });
    return allHospitals;
  };

  const displayHospitals = showAllHospitals ? getAllHospitals() : getInitialHospitals();
  
  // Split hospitals into 4 columns
  const column1 = displayHospitals.slice(0, Math.ceil(displayHospitals.length / 4));
  const column2 = displayHospitals.slice(Math.ceil(displayHospitals.length / 4), Math.ceil(displayHospitals.length / 4) * 2);
  const column3 = displayHospitals.slice(Math.ceil(displayHospitals.length / 4) * 2, Math.ceil(displayHospitals.length / 4) * 3);
  const column4 = displayHospitals.slice(Math.ceil(displayHospitals.length / 4) * 3);

  const totalHospitals = Object.values(hospitalsByProvince).reduce((sum, hospitals) => sum + hospitals.length, 0);
  const remainingHospitals = totalHospitals - 16;

  // Group hospitals by province for display
  const groupHospitalsByProvince = (hospitals: Array<{name: string, province: string}>) => {
    const grouped: {[key: string]: string[]} = {};
    hospitals.forEach(hospital => {
      if (!grouped[hospital.province]) {
        grouped[hospital.province] = [];
      }
      grouped[hospital.province].push(hospital.name);
    });
    return grouped;
  };

  const groupedHospitals = groupHospitalsByProvince(displayHospitals);
  const provinces = Object.keys(groupedHospitals);

  return (
    <div className="w-full p-3 bg-white dark:bg-gray-900">
      <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 text-center">
        Search by Hospital
      </h2>
      
      <div className="max-h-96 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600 scrollbar-track-gray-100 dark:scrollbar-track-gray-800">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Column 1 */}
          <div className="space-y-4">
            {provinces.slice(0, Math.ceil(provinces.length / 4)).map((province) => (
              <div key={province} className="space-y-2">
                <h3 className="font-semibold text-sm text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-700 pb-1 sticky top-0 bg-white dark:bg-gray-900 z-10">
                  {province}
                </h3>
                {groupedHospitals[province].map((hospital) => (
                  <Link
                    key={`${province}-${hospital}`}
                    to={`/hospital-list?category=hospital&name=${encodeURIComponent(hospital)}&province=${encodeURIComponent(province)}`}
                    className="block py-1 px-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-300 hover:bg-gray-50 dark:hover:bg-gray-800 rounded transition-colors duration-150 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  >
                    <h4 className="font-medium text-xs leading-tight">{hospital}</h4>
                  </Link>
                ))}
              </div>
            ))}
          </div>

          {/* Column 2 */}
          <div className="space-y-4">
            {provinces.slice(Math.ceil(provinces.length / 4), Math.ceil(provinces.length / 4) * 2).map((province) => (
              <div key={province} className="space-y-2">
                <h3 className="font-semibold text-sm text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-700 pb-1 sticky top-0 bg-white dark:bg-gray-900 z-10">
                  {province}
                </h3>
                {groupedHospitals[province].map((hospital) => (
                  <Link
                    key={`${province}-${hospital}`}
                    to={`/hospital-list?category=hospital&name=${encodeURIComponent(hospital)}&province=${encodeURIComponent(province)}`}
                    className="block py-1 px-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-300 hover:bg-gray-50 dark:hover:bg-gray-800 rounded transition-colors duration-150 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  >
                    <h4 className="font-medium text-xs leading-tight">{hospital}</h4>
                  </Link>
                ))}
              </div>
            ))}
          </div>

          {/* Column 3 */}
          <div className="space-y-4">
            {provinces.slice(Math.ceil(provinces.length / 4) * 2, Math.ceil(provinces.length / 4) * 3).map((province) => (
              <div key={province} className="space-y-2">
                <h3 className="font-semibold text-sm text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-700 pb-1 sticky top-0 bg-white dark:bg-gray-900 z-10">
                  {province}
                </h3>
                {groupedHospitals[province].map((hospital) => (
                  <Link
                    key={`${province}-${hospital}`}
                    to={`/hospital-list?category=hospital&name=${encodeURIComponent(hospital)}&province=${encodeURIComponent(province)}`}
                    className="block py-1 px-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-300 hover:bg-gray-50 dark:hover:bg-gray-800 rounded transition-colors duration-150 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  >
                    <h4 className="font-medium text-xs leading-tight">{hospital}</h4>
                  </Link>
                ))}
              </div>
            ))}
          </div>

          {/* Column 4 */}
          <div className="space-y-4">
            {provinces.slice(Math.ceil(provinces.length / 4) * 3).map((province) => (
              <div key={province} className="space-y-2">
                <h3 className="font-semibold text-sm text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-700 pb-1 sticky top-0 bg-white dark:bg-gray-900 z-10">
                  {province}
                </h3>
                {groupedHospitals[province].map((hospital) => (
                  <Link
                    key={`${province}-${hospital}`}
                    to={`/hospital-list?category=hospital&name=${encodeURIComponent(hospital)}&province=${encodeURIComponent(province)}`}
                    className="block py-1 px-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-300 hover:bg-gray-50 dark:hover:bg-gray-800 rounded transition-colors duration-150 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  >
                    <h4 className="font-medium text-xs leading-tight">{hospital}</h4>
                  </Link>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Load More Button */}
      {!showAllHospitals && remainingHospitals > 0 && (
        <div className="text-center mt-4">
          <button
            onClick={() => setShowAllHospitals(true)}
            className="text-blue-600 dark:text-blue-300 text-sm hover:underline focus:outline-none focus:ring-1 focus:ring-blue-500 font-medium"
          >
            Load More ({remainingHospitals} more hospitals)
          </button>
        </div>
      )}

      {/* Show Less Button */}
      {showAllHospitals && (
        <div className="text-center mt-4">
          <button
            onClick={() => setShowAllHospitals(false)}
            className="text-blue-600 dark:text-blue-300 text-sm hover:underline focus:outline-none focus:ring-1 focus:ring-blue-500 font-medium"
          >
            Show Less
          </button>
        </div>
      )}
    </div>
  );
};

export default HospitalMegaMenu;
