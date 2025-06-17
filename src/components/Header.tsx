"use client";

import React, { useState, Fragment } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, Transition, Popover } from '@headlessui/react';
import { ChevronDownIcon, MenuIcon as HamburgerMenuIcon, XIcon } from '@heroicons/react/solid'; // Changed to solid for consistency
import { Search, Briefcase, GraduationCap, Newspaper, Hospital, Map, Users, Info, MessageSquare, Home } from 'lucide-react'; // Added Home for consistency

import HospitalMegaMenu from './HospitalMegaMenu';
import MedicalSchoolMegaMenu from './MedicalSchoolMegaMenu';
import ProvinceMegaMenu from './ProvinceMegaMenu'; // Assuming this exists or will be created

// Define a type for navigation items
interface NavItem {
  name: string;
  href: string;
  icon?: React.ElementType; // Icon component
  current?: boolean;
  dropdown?: boolean;
  megaMenu?: React.ReactNode;
  dropdownItems?: NavItem[]; // For nested dropdowns
}

const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navigationItems: NavItem[] = [
    { name: 'Home', href: '/', icon: Home },
    {
      name: 'Search Doctors',
      href: '#', // Placeholder as it's a dropdown
      icon: Search,
      dropdown: true,
      megaMenu: <HospitalMegaMenu />,
    },
    {
      name: 'Medical Schools',
      href: '#', // Placeholder
      icon: GraduationCap,
      dropdown: true,
      megaMenu: <MedicalSchoolMegaMenu />,
    },
    {
      name: 'Residency Programs',
      href: '#', // Placeholder
      icon: Briefcase, // Changed from BriefcaseMedical to Briefcase
      dropdown: true,
      megaMenu: <ProvinceMegaMenu /> // Assuming this will list provinces for residency programs
    },
    { name: 'News', href: '/news', icon: Newspaper },
    { name: 'Hospitals', href: '/hospitals', icon: Hospital }, // Simple link, mega menu is for search
    { name: 'Provinces & Territories', href: '/provinces', icon: Map },
    { name: 'About Us', href: '/about', icon: Info },
    { name: 'Contact', href: '/contact', icon: MessageSquare },
    { name: 'Community', href: '/community', icon: Users },
  ];


  return (
    <header className="bg-gray-900 text-white sticky top-0 z-50 shadow-lg">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="text-2xl font-bold tracking-tight">
              CanadaDr.ca
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex lg:items-center lg:space-x-2 xl:space-x-3">
            {navigationItems.map((item) =>
              item.megaMenu ? (
                <Popover key={item.name} className="relative">
                  {({ open }) => (
                    <>
                      <Popover.Button
                        className={`
                          ${open ? 'text-blue-400 bg-gray-800' : ''}
                          px-3 py-2.5 rounded-md text-sm font-medium hover:text-blue-400 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 flex items-center transition-colors
                          ${location.pathname === item.href || (item.href !== '/' && location.pathname.startsWith(item.href)) ? 'text-blue-400 bg-gray-800' : 'text-gray-300'}
                        `}
                      >
                        {item.icon && <item.icon className="mr-2 h-5 w-5 flex-shrink-0" aria-hidden="true" />}
                        <span>{item.name}</span>
                        <ChevronDownIcon
                          className={`${open ? 'transform rotate-180 text-blue-400' : 'text-gray-400'} ml-1.5 h-5 w-5 transition-transform duration-150`}
                          aria-hidden="true"
                        />
                      </Popover.Button>
                      <Transition
                        as={Fragment}
                        enter="transition ease-out duration-200"
                        enterFrom="opacity-0 translate-y-1"
                        enterTo="opacity-100 translate-y-0"
                        leave="transition ease-in duration-150"
                        leaveFrom="opacity-100 translate-y-0"
                        leaveTo="opacity-0 translate-y-1"
                      >
                        <Popover.Panel className="absolute left-1/2 z-20 mt-3 w-screen max-w-md -translate-x-1/2 transform px-4 sm:px-0 lg:max-w-xl xl:max-w-2xl">
                          <div className="overflow-hidden rounded-lg shadow-2xl ring-1 ring-black ring-opacity-5">
                            <div className="relative bg-gray-800 text-white">
                              {item.megaMenu}
                            </div>
                          </div>
                        </Popover.Panel>
                      </Transition>
                    </>
                  )}
                </Popover>
              ) : item.dropdownItems ? (
                // Standard Dropdown (example, not used by current mega menus)
                <Menu as="div" key={item.name} className="relative">
                  {({ open }) => (
                    <>
                      <Menu.Button className={`
                        ${open ? 'text-blue-400 bg-gray-800' : ''}
                        px-3 py-2.5 rounded-md text-sm font-medium hover:text-blue-400 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 flex items-center transition-colors
                        ${location.pathname === item.href || (item.href !== '/' && location.pathname.startsWith(item.href)) ? 'text-blue-400 bg-gray-800' : 'text-gray-300'}
                      `}>
                        {item.icon && <item.icon className="mr-2 h-5 w-5 flex-shrink-0" aria-hidden="true" />}
                        <span>{item.name}</span>
                        <ChevronDownIcon className={`${open ? 'transform rotate-180 text-blue-400' : 'text-gray-400'} ml-1.5 h-5 w-5 transition-transform duration-150`} aria-hidden="true" />
                      </Menu.Button>
                      <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                      >
                        <Menu.Items className="absolute right-0 z-20 mt-2 w-56 origin-top-right rounded-md bg-white dark:bg-gray-800 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                          <div className="py-1">
                            {item.dropdownItems.map((subItem) => (
                              <Menu.Item key={subItem.href}>
                                {({ active }) => (
                                  <Link
                                    to={subItem.href}
                                    className={`${active ? 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white' : 'text-gray-700 dark:text-gray-300'}
                                      group flex items-center px-4 py-2 text-sm`}
                                  >
                                    {subItem.icon && <subItem.icon className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500 dark:group-hover:text-gray-300" />}
                                    {subItem.name}
                                  </Link>
                                )}
                              </Menu.Item>
                            ))}
                          </div>
                        </Menu.Items>
                      </Transition>
                    </>
                  )}
                </Menu>
              ) : (
                // Regular Link
                <Link
                  key={item.href}
                  to={item.href}
                  className={`
                    px-3 py-2.5 rounded-md text-sm font-medium hover:text-blue-400 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 flex items-center transition-colors
                    ${location.pathname === item.href || (item.href === '/' && location.pathname === '/') || (item.href !== '/' && location.pathname.startsWith(item.href)) ? 'text-blue-400 bg-gray-800' : 'text-gray-300'}
                  `}
                  aria-current={location.pathname === item.href ? 'page' : undefined}
                >
                  {item.icon && <item.icon className="mr-2 h-5 w-5 flex-shrink-0" aria-hidden="true" />}
                  {item.name}
                </Link>
              )
            )}
          </nav>

          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              <HamburgerMenuIcon className="block h-7 w-7" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <Transition.Root show={mobileMenuOpen} as={Fragment}>
        <div className="lg:hidden" role="dialog" aria-modal="true">
          <Transition.Child
            as={Fragment}
            enter="duration-150 ease-out"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="duration-150 ease-in"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-900 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="flex min-h-full items-start justify-end p-4 text-center sm:items-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="duration-150 ease-out"
                enterFrom="opacity-0 translate-x-full sm:translate-x-0 sm:scale-95"
                enterTo="opacity-100 translate-x-0 sm:scale-100"
                leave="duration-150 ease-in"
                leaveFrom="opacity-100 translate-x-0 sm:scale-100"
                leaveTo="opacity-0 translate-x-full sm:translate-x-0 sm:scale-95"
              >
                <div className="relative transform overflow-hidden rounded-lg bg-white dark:bg-gray-800 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                  <div className="flex items-center justify-between px-4 pt-5 pb-4 sm:px-6 sm:pb-4 border-b border-gray-200 dark:border-gray-700">
                    <h3 className="text-lg font-medium leading-6 text-gray-900 dark:text-white">Menu</h3>
                    <button
                      type="button"
                      className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <span className="sr-only">Close menu</span>
                      <XIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>
                  <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                    {navigationItems.map((item) => {
                      // Logic for handling dropdowns in mobile - simplified for now
                      if (item.dropdown || item.megaMenu) {
                        // Could implement an accordion or simple list for mobile dropdowns
                        // For now, just a link that could lead to a page or be non-interactive
                        return (
                          <Link
                            key={item.href} // Using href for key, assuming it's unique or use item.name
                            to={item.href === '#' ? location.pathname : item.href} // Prevent navigation for '#'
                            onClick={() => {
                              if (item.href !== '#') setMobileMenuOpen(false);
                              // Potentially toggle a sub-menu here if we had one
                            }}
                            className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 py-2.5 px-3 text-sm rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 flex items-center"
                          >
                            {/* Icon removed from here */}
                            {item.name}
                            {(item.dropdown || item.megaMenu) && (
                              <ChevronDownIcon className="ml-auto h-5 w-5 text-gray-400" />
                            )}
                          </Link>
                        );
                      }
                      // Regular link
                      return (
                        <Link
                          key={item.href}
                          to={item.href}
                          onClick={() => setMobileMenuOpen(false)}
                          className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 py-2.5 px-3 text-sm rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 flex items-center"
                          aria-current={location.pathname === item.href ? 'page' : undefined}
                        >
                          {/* Icon removed from here */}
                          {item.name}
                        </Link>
                      );
                    })}
                  </div>
                </div>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Transition.Root>
    </header>
  );
};

export default Header;