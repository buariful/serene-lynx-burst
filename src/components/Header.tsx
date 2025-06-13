import React, { useState } from 'react';
import Logo from './Logo';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, Search, ChevronDown, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';

const navLinks = [
  { href: '/medical-schools', label: 'Medical Schools' },
  { href: '/hospitals', label: 'Hospitals' },
  { href: '/medical-housing', label: 'Medical Housing' },
  { href: '/pricing', label: 'Pricing' },
  { href: '/faq', label: 'FAQ' },
  { href: '/blog', label: 'Blog' },
  { href: '/about-us', label: 'About Us' },
  { href: '/tenant-want-ads', label: 'Tenant Want Ads' },
];

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <Logo />
          <div className="hidden lg:flex items-center space-x-4">
            <nav className="flex space-x-3">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className="text-gray-600 hover:text-blue-600 px-2 py-1 text-sm"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
          <div className="flex items-center space-x-2">
            <div className="hidden md:flex items-center relative">
              <Input type="search" placeholder="Search..." className="pr-10" />
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="text-sm">
                  <Globe className="h-4 w-4 mr-1" /> English <ChevronDown className="h-4 w-4 ml-1" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>English</DropdownMenuItem>
                <DropdownMenuItem>Español</DropdownMenuItem>
                <DropdownMenuItem>Français</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button variant="outline" className="text-sm">Login</Button>
            <Button className="text-sm bg-blue-600 hover:bg-blue-700">Join Us</Button>
            <div className="lg:hidden">
              <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
                <SheetTrigger asChild>
                  <Button variant="outline" size="icon">
                    <Menu className="h-6 w-6" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                  <nav className="flex flex-col space-y-4 mt-8">
                    {navLinks.map((link) => (
                      <Link
                        key={link.href}
                        to={link.href}
                        className="text-gray-700 hover:text-blue-600 text-lg"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {link.label}
                      </Link>
                    ))}
                     <div className="md:hidden mt-4">
                        <Input type="search" placeholder="Search..." className="w-full" />
                    </div>
                  </nav>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
        <div className="lg:hidden mt-2">
            <nav className="flex flex-wrap gap-x-3 gap-y-1">
              {navLinks.slice(0,4).map((link) => ( // Show a few prominent links
                <Link
                  key={link.href}
                  to={link.href}
                  className="text-gray-600 hover:text-blue-600 text-xs"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
      </div>
    </header>
  );
};

export default Header;