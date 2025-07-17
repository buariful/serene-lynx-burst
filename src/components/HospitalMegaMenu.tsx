import React from "react";
import { Link } from "react-router-dom";

const canadaHospitals = [
  {
    name: "Toronto General hospitals (University Health Network)",
    location: "Toronto, ON",
  },
  { name: "Mount Sinai Hospital", location: "Toronto, ON" },
  { name: "Sunnybrook Health Sciences Centre", location: "Toronto, ON" },
  { name: "The Ottawa Hospital", location: "Ottawa, ON" },
  { name: "Vancouver General Hospital", location: "Vancouver, BC" },
  {
    name: "Royal Victoria hospitals (McGill University Health Centre)",
    location: "Montreal, QC",
  },
  { name: "Jewish General Hospital", location: "Montreal, QC" },
  { name: "Foothills Medical Centre", location: "Calgary, AB" },
  {
    name: "Queen Elizabeth II Health Sciences Centre",
    location: "Halifax, NS",
  },
  { name: "St. Paul's Hospital", location: "Vancouver, BC" },
  { name: "Hamilton General Hospital", location: "Hamilton, ON" },
  { name: "London Health Sciences Centre", location: "London, ON" },
  // Add more Canadian hospitals as needed
];

const HospitalMegaMenu: React.FC = () => {
  return (
    <div className="w-full p-3 bg-white dark:bg-gray-900">
      <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 text-center lg:text-left">
        Search by Hospital
      </h2>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-2">
        {canadaHospitals.map((hospital) => (
          <Link
            key={hospital.name}
            to={`/hospital-list?category=hospital&name=${encodeURIComponent(
              hospital.name
            )}&city=${encodeURIComponent(
              hospital.location.split(", ")[0]
            )}&province=${encodeURIComponent(
              hospital.location.split(", ")[1]
            )}`}
            className="block py-1 px-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-300 hover:bg-gray-50 dark:hover:bg-gray-800 rounded transition-colors duration-150 focus:outline-none focus:ring-1 focus:ring-blue-500"
          >
            <h3 className="font-medium text-sm leading-tight">{hospital.name}</h3>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{hospital.location}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default HospitalMegaMenu;
