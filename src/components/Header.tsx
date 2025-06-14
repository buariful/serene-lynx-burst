import React, { useState } from 'react';
import Logo from './Logo';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Menu, ChevronDown, UserCircle, Bell, Globe } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

// Updated main navigation links for desktop
const navLinks = [
  { href: '/medical-schools', label: 'Medical School' },
  { href: '/hospitals', label: 'Hospital' },
  { href: '/landlords', label: 'Landlords' },
  { href: '/contact', label: 'Contact Us' },
];

// Updated items for the mobile drawer menu
const drawerMenuItems = [
  { label: "Tenant Insurance", href: "/tenant-insurance" },
  { label: "Landlord Verify Identity", href: "/verify-identity" },
  { label: "About", href: "/about" },
  { label: "FAQ", href: "/faq" },
  { label: "Blog", href: "/blog" },
  { label: "Job Board", href: "/job-board" },
  { label: "Medical Rentals", href: "/medical-rentals" },
  { label: "Search Near Me", href: "/search-near-me" },
  { label: "Search by Map", href: "/search-by-map" },
  { label: "Terms & Conditions", href: "/terms" },
  { label: "Privacy Policy", href: "/privacy" },
];

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Left Side */}
          <div className="flex items-center space-x-6">
            <Logo />
            <nav className="hidden md:flex space-x-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className="text-gray-600 hover:text-blue-600 text-sm font-medium"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Right Side */}
          <div className="flex items-center space-x-2">
            <div className="hidden md:flex items-center space-x-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="text-sm">
                    <Globe className="h-4 w-4 mr-1" /> EN <ChevronDown className="h-4 w-4 ml-1" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onSelect={() => console.log("Lang: EN")}>English</DropdownMenuItem>
                  <DropdownMenuItem onSelect={() => console.log("Lang: FR")}>Français</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <Button 
                variant="primary" 
                className="bg-blue-600 hover:bg-blue-700 text-white text-sm h-9"
                onClick={() => navigate('/post-rental')}
              >
                Post a Rental
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="icon" className="h-9 w-9">
                    <UserCircle className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => navigate('/login')}>Login</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate('/register')}>Create Account</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => navigate('/alerts')}>
                    <Bell className="h-4 w-4 mr-2" /> Alerts
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            
            {/* Mobile Menu Trigger (Drawer) */}
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="md:hidden h-9 w-9"> {/* Hide on md and up */}
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[300px] sm:w-[320px] p-0 flex flex-col">
                <SheetHeader className="p-4 border-b">
                  <SheetTitle>
                    <Logo />
                  </SheetTitle>
                </SheetHeader>
                <div className="flex-grow overflow-y-auto p-4">
                  <Accordion type="multiple" className="w-full">
                    <AccordionItem value="main-menu">
                      <AccordionTrigger className="text-base font-semibold hover:no-underline">
                        Menu
                      </AccordionTrigger>
                      <AccordionContent>
                        <nav className="flex flex-col space-y-1 pl-2">
                          {drawerMenuItems.map((item) => (
                            <Link
                              key={item.href}
                              to={item.href}
                              className="text-gray-700 hover:text-blue-600 py-1.5 text-sm rounded-md hover:bg-gray-100"
                              onClick={() => setIsMobileMenuOpen(false)}
                            >
                              {item.label}
                            </Link>
                          ))}
                        </nav>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                  
                  {/* Mobile specific auth buttons and actions */}
                  <div className="mt-6 space-y-2 border-t pt-4">
                     <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="outline" className="w-full justify-start text-sm">
                            <Globe className="h-4 w-4 mr-2" /> English <ChevronDown className="h-4 w-4 ml-auto" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent side="bottom" align="start">
                          <DropdownMenuItem>English</DropdownMenuItem>
                          <DropdownMenuItem>Français</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    <Button 
                      variant="primary" 
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                      onClick={() => { navigate('/post-rental'); setIsMobileMenuOpen(false); }}
                    >
                      Post a Rental
                    </Button>
                    <Button variant="outline" className="w-full" onClick={() => { navigate('/login'); setIsMobileMenuOpen(false); }}>Login</Button>
                    <Button variant="outline" className="w-full" onClick={() => { navigate('/register'); setIsMobileMenuOpen(false); }}>Create Account</Button>
                    <Button variant="outline" className="w-full justify-start" onClick={() => { navigate('/alerts'); setIsMobileMenuOpen(false); }}>
                      <Bell className="h-4 w-4 mr-2" /> Alerts
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;