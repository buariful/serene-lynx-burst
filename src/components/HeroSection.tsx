import React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';

const HeroSection = () => {
  return (
    <div
      className="relative bg-cover bg-center py-32 md:py-48"
      style={{ backgroundImage: "url('https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=2070&auto=format&fit=crop')" }} // A generic housing background
    >
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="relative container mx-auto px-4 text-center z-10">
        <h1 className="text-4xl md:text-6xl font-bold text-white">
          It's Time to Move
        </h1>
        <p className="mt-4 text-lg md:text-xl text-gray-200 max-w-2xl mx-auto">
          Thousands of apartments, houses, and condos for rent across Canada.
        </p>
        <div className="mt-8 max-w-xl mx-auto">
          <form className="flex flex-col sm:flex-row gap-2">
            <Input
              type="search"
              placeholder="Search City, Neighbourhood, Address, or Ad #"
              className="h-12 text-base flex-grow"
            />
            <Button type="submit" size="lg" className="bg-blue-600 hover:bg-blue-700 h-12">
              <Search className="h-5 w-5 mr-2 sm:hidden" />
              <span className="sm:hidden">Search</span>
              <span className="hidden sm:inline">Search</span>
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;