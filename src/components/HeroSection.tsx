import React from 'react';

const HeroSection = () => {
  return (
    <div
      className="relative bg-cover bg-center py-32 md:py-48"
      style={{ backgroundImage: "url('https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=1932&auto=format&fit=crop')" }} // Placeholder image
    >
      <div className="absolute inset-0 bg-black opacity-40"></div>
      <div className="relative container mx-auto px-4 text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-white uppercase tracking-wider">
          HOSPITALS IN ALBERTA CANADA
        </h1>
        <p className="mt-4 text-lg md:text-xl text-gray-200">
          hospitals in Alberta Canada
        </p>
      </div>
    </div>
  );
};

export default HeroSection;