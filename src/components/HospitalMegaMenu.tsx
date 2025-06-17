import React from 'react';
import { Link } from 'react-router-dom';

const canadaHospitals = [
  { name: "Toronto General Hospital (University Health Network)", location: "Toronto, ON" },
  { name: "Mount Sinai Hospital", location: "Toronto, ON" },
  { name: "Sunnybrook Health Sciences Centre", location: "Toronto, ON" },
  { name: "The Ottawa Hospital", location: "Ottawa, ON" },
  { name: "Vancouver General Hospital", location: "Vancouver, BC" },
  { name: "Royal Victoria Hospital (McGill University Health Centre)", location: "Montreal, QC" },
  { name: "Jewish General Hospital", location: "Montreal, QC" },
  { name: "Foothills Medical Centre", location: "Calgary, AB" },
  { name: "Queen Elizabeth II Health Sciences Centre", location: "Halifax, NS" },
  { name: "St. Paul's Hospital", location: "Vancouver, BC" },
  { name: "Hamilton General Hospital", location: "Hamilton, ON" },
  { name: "London Health Sciences Centre", location: "London, ON" },
  // Add more Canadian hospitals as needed
];

const HospitalMegaMenu: React.FC = () => {
  return (
    <div className="w-full p-4"> {/* Overall padding for the content area, now full-width */}
      <h2 className="text-xl font-semibold text-white mb-4 text-center md:text-left">
        Search by hospital
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-2"> {/* Adjusted gap for list */}
        {canadaHospitals.map((hospital) => (
          <Link
            key={hospital.name}
            to={`/search-results?category=hospital&name=${encodeURIComponent(hospital.name)}&city=${encodeURIComponent(hospital.location.split(', ')[0])}&province=${encodeURIComponent(hospital.location.split(', ')[1])}`}
            className="block py-1 text-gray-300 hover:text-white hover:underline rounded-sm focus:outline-none focus:ring-1 focus:ring-blue-500" // Simplified list item styling
          >
            <h3 className="font-medium text-sm">{hospital.name}</h3> {/* Adjusted text size */}
            {/* Location can be hidden or kept, let's keep it for now but smaller */}
            <p className="text-xs text-gray-400">{hospital.location}</p> 
          </Link>
        ))}
      </div>
    </div>
  );
};

export default HospitalMegaMenu;