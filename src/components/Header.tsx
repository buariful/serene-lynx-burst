"use client";

import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Search, Menu, X, ChevronDown, MapPin, Stethoscope, Building } from 'lucide-react';
import SpecialityMegaMenu from './SpecialityMegaMenu';
import LocationMegaMenu from './LocationMegaMenu';
import HospitalMegaMenu from './HospitalMegaMenu';

const Header: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  const navLinks = [
    { name: 'Doctors', path: '/doctors', icon: <Stethoscope className="mr-2 h-5 w-5" />, megaMenu: <SpecialityMegaMenu /> },
    { name: 'Hospitals', path: '/hospitals', icon: <Building className="mr-2 h-5 w-5" />, megaMenu: <HospitalMegaMenu /> },
    { name: 'Locations', path: '/locations', icon: <MapPin className="mr-2 h-5 w-5" />, megaMenu: <LocationMegaMenu /> },
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search-results?query=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery(''); // Clear search input after navigation
    }
  };

  useEffect(() => {
    setIsMobileMenuOpen(false); // Close mobile menu on route change
  }, [location.pathname]);

  return (
    <header className="bg-slate-900 text-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-blue-400 hover:text-blue-300 transition-colors">
          DocConnect
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-2 lg:space-x-4">
          {navLinks.map((link) => (
            <Popover key={link.name}>
              <PopoverTrigger asChild>
                <Button
                  variant="ghost"
                  className="text-white hover:bg-slate-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium flex items-center"
                >
                  {link.icon}
                  {link.name}
                  <ChevronDown className="ml-1 h-4 w-4" />
                </Button>
              </PopoverTrigger>
              <PopoverContent
                className="w-[75vw] p-0 mt-2 shadow-2xl rounded-md border-gray-700 bg-slate-900" // Set to 75% of viewport width
                sideOffset={8}
                align="center" // Centers the popover relative to the trigger
              >
                {link.megaMenu}
              </PopoverContent>
            </Popover>
          ))}
        </nav>

        {/* Search Bar - Desktop */}
        <form onSubmit={handleSearch} className="hidden md:flex items-center ml-4">
          <div className="relative">
            <Input
              type="search"
              placeholder="Search doctors, hospitals..."
              className="bg-slate-800 border-gray-700 placeholder-gray-400 text-white rounded-full pl-10 pr-4 py-2 text-sm focus:ring-blue-500 focus:border-blue-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          </div>
          <Button type="submit" variant="ghost" size="sm" className="ml-2 text-white hover:bg-slate-700">
            Search
          </Button>
        </form>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-white hover:bg-slate-700"
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-slate-800 absolute w-full shadow-xl pb-4">
          <nav className="flex flex-col space-y-2 px-4 pt-2">
            {navLinks.map((link) => (
              <Popover key={`mobile-${link.name}`}>
                <PopoverTrigger asChild>
                  <Button
                    variant="ghost"
                    className="text-white hover:bg-slate-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium flex items-center justify-between w-full"
                  >
                    <div className="flex items-center">
                      {link.icon}
                      {link.name}
                    </div>
                    <ChevronDown className="ml-1 h-4 w-4" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent
                  className="w-screen max-w-full p-0 mt-1 shadow-lg rounded-md border-gray-700 bg-slate-800"
                  sideOffset={5}
                  align="start"
                >
                  {link.megaMenu}
                </PopoverContent>
              </Popover>
            ))}
          </nav>
          {/* Search Bar - Mobile */}
          <form onSubmit={handleSearch} className="mt-4 px-4">
            <div className="relative">
              <Input
                type="search"
                placeholder="Search..."
                className="bg-slate-700 border-gray-600 placeholder-gray-400 text-white rounded-full pl-10 pr-4 py-2 text-sm w-full focus:ring-blue-500 focus:border-blue-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            </div>
            <Button type="submit" variant="ghost" className="w-full mt-2 text-white bg-blue-600 hover:bg-blue-700">
              Search
            </Button>
          </form>
        </div>
      )}
    </header>
  );
};

export default Header;