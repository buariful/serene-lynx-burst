import React from 'react';
import PropertyCard from './PropertyCard';
import { Property } from '@/types/property';

const placeholderProperties: Property[] = [
  { id: '1', imageUrl: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=400&auto=format&fit=crop', address: '4080 Chemin de la Côte-Sainte-Catherine, Montreal', beds: 1, baths: 1, price: 1245, currency: 'CAD' },
  { id: '2', imageUrl: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?q=80&w=400&auto=format&fit=crop', address: '123 Main Street, Toronto', beds: 2, baths: 2, price: 2100, currency: 'CAD' },
  { id: '3', imageUrl: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?q=80&w=400&auto=format&fit=crop', address: '789 Pacific Avenue, Vancouver', beds: 3, baths: 2, price: 3200, currency: 'CAD' },
  { id: '4', imageUrl: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=400&auto=format&fit=crop', address: '456 Elm Street, Calgary', beds: 1, baths: 1, price: 1500, currency: 'CAD' },
];

const FeaturedRentals = ({ city = "Montreal" }: { city?: string }) => {
  return (
    <section className="py-12 md:py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-8 text-center">
          Rentals Near <span className="text-blue-600">{city}</span>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {placeholderProperties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedRentals;