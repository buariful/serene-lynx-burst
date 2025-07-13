import React from "react";
import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <Link to="/" className="flex items-center">
      {/* Ensure logo.png is in the public folder */}
      <img 
        src="/logo.png" 
        alt="Rentals.ca Logo" 
        className="h-8 w-auto dark:bg-white dark:p-1 dark:rounded" 
      />
      {/* Adjust height as needed, h-8 is 32px */}
    </Link>
  );
};
export const LogoWhite = () => {
  return (
    <Link to="/" className="flex items-center">
      {/* Ensure logo.png is in the public folder */}
      <img
        src="/logo_white.png"
        alt="Rentals.ca Logo"
        className="h-8 w-auto"
      />{" "}
      {/* Adjust height as needed, h-8 is 32px */}
    </Link>
  );
};

export default Logo;
