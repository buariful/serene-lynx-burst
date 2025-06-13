import React from 'react';
import { Home } from 'lucide-react';
import { Hospital } from '@/types/hospital';

interface HospitalCardProps {
  hospital: Hospital;
}

const HospitalCard: React.FC<HospitalCardProps> = ({ hospital }) => {
  return (
    <div className="flex flex-col items-center text-center p-4">
      <div className="w-24 h-24 md:w-28 md:h-28 bg-blue-100 rounded-full flex items-center justify-center mb-3 relative shadow-md">
        <Home className="w-10 h-10 md:w-12 md:h-12 text-blue-600" />
        <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-blue-700 font-bold text-2xl md:text-3xl">
          M
        </span>
      </div>
      <h3 className="font-semibold text-gray-700 text-sm md:text-base">{hospital.name}</h3>
    </div>
  );
};

export default HospitalCard;