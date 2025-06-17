import React from 'react';
import { Link } from 'react-router-dom';

// Placeholder specialities - replace with actual data
const specialities = [
  { name: "Cardiology", slug: "cardiology" },
  { name: "Dermatology", slug: "dermatology" },
  { name: "Neurology", slug: "neurology" },
  { name: "Pediatrics", slug: "pediatrics" },
  { name: "Oncology", slug: "oncology" },
  { name: "Orthopedics", slug: "orthopedics" },
  { name: "Psychiatry", slug: "psychiatry" },
  { name: "Radiology", slug: "radiology" },
];

const SpecialityMegaMenu: React.FC = () => {
  return (
    <div className="w-full p-4">
      <h2 className="text-xl font-semibold text-white mb-4 text-center md:text-left">
        Search by Medical Speciality
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-x-4 gap-y-2">
        {specialities.map((speciality) => (
          <Link
            key={speciality.slug}
            to={`/search-results?category=speciality&value=${speciality.slug}`}
            className="block py-1 text-gray-300 hover:text-white hover:underline rounded-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
          >
            <h3 className="font-medium text-sm">{speciality.name}</h3>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SpecialityMegaMenu;