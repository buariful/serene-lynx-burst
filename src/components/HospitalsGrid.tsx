import React from 'react';
import HospitalCard from './HospitalCard';
import { Hospital } from '@/types/hospital';

const hospitalsData: Hospital[] = [
  { id: '1', name: 'Airdrie Community Health Centre' },
  { id: '2', name: 'Alberta Children’s Hospital' },
  { id: '3', name: 'Alberta Hip and Knee Clinic' },
  { id: '4', name: 'Alberta Hospital Edmonton' },
  { id: '5', name: 'Banff Mineral Springs Hospital' },
  { id: '6', name: 'Barrhead Healthcare Centre' },
  { id: '7', name: 'Bassano Health Centre' },
  { id: '8', name: 'Beaverlodge Municipal Hospital' },
];

const HospitalsGrid = () => {
  return (
    <section className="py-12 md:py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
          {hospitalsData.map((hospital) => (
            <HospitalCard key={hospital.id} hospital={hospital} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HospitalsGrid;