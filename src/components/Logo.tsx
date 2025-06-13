import React from 'react';
import { Link } from 'react-router-dom';

const Logo = () => {
  return (
    <Link to="/" className="text-2xl font-bold text-blue-600 hover:text-blue-700">
      Rentals.ca
    </Link>
  );
};

export default Logo;