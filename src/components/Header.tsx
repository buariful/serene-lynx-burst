import React, { useState } from 'react';
import Logo from './Logo';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Menu, ChevronDown, Globe, Bell } from 'lucide-react'; // Removed UserCircle as it's not used on desktop
import { Link, useNavigate } from 'react-router-dom';

// Navbar: Center-aligned navigation links
const navLinks = [
  { href: '/landlords', label: 'Landlords' },
  { href: '/rent-report', label: 'RentReport' }, // Assuming a page for RentReport
  { href: '/blog', label: 'Blog' },
];

// Drawer Menu: Vertical list of items
const drawerMenuItems = [
  // Actions first, as they are prominent
  { type: 'button', label: "Post a Rental", action: (navigate: Function, closeMenu: Function) => { navigate('/post-rental'); closeMenu(); } },
  { type: 'button', label: "Login", action: (navigate: Function, closeMenu: Function) => { navigate('/login'); closeMenu(); } },
  { type: 'button', label: "Create Account", action: (navigate: Function, closeMenu: Function) => { navigate('/register'); closeMenu(); } },
  { type: 'separator' },
  // Navigation links
  { type: 'link', label: "Alerts", href: "/alerts" },
  { type: 'link', label: "FAQs", href: "/faq" },
  { type: 'link', label: "Rent Report", href: "/rent-report" },
  { type: 'link', label: "Landlords", href: "/landlords" },
  { type: 'link', label: "About", href: "/about" },
  { type: 'link', label: "Careers", href: "/careers" },
];

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Left Side: Logo */}
          <div className="flex-shrink-0">
            <Logo />
          </div>

          {/* Center: Navigation Links (Desktop) */}
          <nav className="hidden md:flex flex-grow justify-center space-x-6">
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

          {/* Right Side: Actions (Desktop) & Mobile Menu Trigger */}
          <div className="flex items-center space-x-2 flex-shrink-0">
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
              {/* User profile dropdown removed from desktop */}
            </div>
            
            {/* Mobile Menu Trigger (Drawer) */}
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="md:hidden h-9 w-9">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[320px] p-0 flex flex-col">
                <SheetHeader className="p-4 border-b">
                  <SheetTitle>
                    <Logo /> {/* Or just "Menu" if logo is too much here */}
                  </SheetTitle>
                </SheetHeader>
                <div className="flex-grow overflow-y-auto p-4">
                  <nav className="flex flex-col space-y-1">
                    {drawerMenuItems.map((item, index) => {
                      if (item.type === 'separator') {
                        return <hr key={`sep-${index}`} className="my-2"/>;
                      }
                      if (item.type === 'button' && item.action) {
                        const actionFn = item.action; // Capture for closure
                        return (
                          <Button
                            key={item.label}
                            variant={item.label === "Post a Rental" ? "primary" : "ghost"}
                            className={`w-full justify-start text-left h-auto py-2.5 ${item.label === "Post a Rental" ? "bg-blue-600 hover:bg-blue-700 text-white" : "text-gray-700 hover:bg-gray-100"}`}
                            onClick={() => actionFn(navigate, closeMobileMenu)}
                          >
                            {item.label === "Alerts" && <Bell className="h-4 w-4 mr-2" />}
                            {item.label}
                          </Button>
                        );
                      }
                      if (item.type === 'link' && item.href) {
                        return (
                          <Link
                            key={item.href}
                            to={item.href}
                            className="text-gray-700 hover:text-blue-600 py-2.5 px-3 text-sm rounded-md hover:bg-gray-100 flex items-center"
                            onClick={closeMobileMenu}
                          >
                            {item.label === "Alerts" && <Bell className="h-4 w-4 mr-2" />}
                            {item.label}
                          </Link>
                        );
                      }
                      return null;
                    })}
                  </nav>
                  
                  {/* Language Toggle at the bottom of the drawer */}
                  <div className="mt-auto border-t pt-4">
                     <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="outline" className="w-full justify-start text-sm">
                            <Globe className="h-4 w-4 mr-2" /> English <ChevronDown className="h-4 w-4 ml-auto" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent side="top" align="start"> {/* Opens upwards */}
                          <DropdownMenuItem onSelect={() => { console.log("Lang: EN"); closeMobileMenu(); }}>English</DropdownMenuItem>
                          <DropdownMenuItem onSelect={() => { console.log("Lang: FR"); closeMobileMenu(); }}>Français</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
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