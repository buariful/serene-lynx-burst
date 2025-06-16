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
import { Menu, ChevronDown, Globe, Bell } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

// Navbar: Center-aligned navigation links for desktop
const desktopNavLinks = [
  { href: '/landlords', label: 'Landlords' },
  { href: '/rent-report', label: 'RentReport' },
  { href: '/blog', label: 'Blog' },
];

// Drawer Menu: Comprehensive list of items
// Includes desktop nav links for mobile view, plus other drawer-specific items
const drawerMenuItems = [
  // Actions first
  { type: 'button' as const, label: "Post a Rental", action: (navigate: Function, closeMenu: Function) => { navigate('/post-rental'); closeMenu(); } },
  { type: 'button' as const, label: "Login", action: (navigate: Function, closeMenu: Function) => { navigate('/login'); closeMenu(); } },
  { type: 'button' as const, label: "Create Account", action: (navigate: Function, closeMenu: Function) => { navigate('/register'); closeMenu(); } },
  { type: 'separator' as const },
  // Navigation links (including those from desktop nav for mobile)
  { type: 'link' as const, label: 'Landlords', href: '/landlords' },
  { type: 'link' as const, label: 'RentReport', href: '/rent-report' },
  { type: 'link' as const, label: 'Blog', href: '/blog' },
  { type: 'link' as const, label: "Alerts", href: "/alerts", icon: Bell },
  { type: 'link' as const, label: "FAQs", href: "/faq" },
  // Note: 'Rent Report' and 'Landlords' are already covered above from desktopNavLinks
  { type: 'link' as const, label: "About", href: "/about" },
  { type: 'link' as const, label: "Careers", href: "/careers" },
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

          {/* Center: Navigation Links (Desktop Only) */}
          <nav className="hidden md:flex flex-grow justify-center space-x-6">
            {desktopNavLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className="text-gray-600 hover:text-blue-600 text-sm font-medium"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right Side: Actions & Drawer Trigger (All Screens) */}
          <div className="flex items-center space-x-2 flex-shrink-0">
            {/* Desktop-specific items (language, post rental) */}
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
            </div>
            
            {/* Drawer Menu Trigger (Visible on all screens) */}
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                {/* Removed md:hidden to make it visible on all screens */}
                <Button variant="outline" size="icon" className="h-9 w-9">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[320px] p-0 flex flex-col">
                <SheetHeader className="p-4 border-b">
                  <SheetTitle>
                    <Logo />
                  </SheetTitle>
                </SheetHeader>
                <div className="flex-grow overflow-y-auto p-4">
                  <nav className="flex flex-col space-y-1">
                    {drawerMenuItems.map((item, index) => {
                      if (item.type === 'separator') {
                        return <hr key={`sep-${index}`} className="my-2"/>;
                      }
                      if (item.type === 'button' && item.action) {
                        const actionFn = item.action;
                        return (
                          <Button
                            key={item.label}
                            variant={item.label === "Post a Rental" ? "primary" : "ghost"}
                            className={`w-full justify-start text-left h-auto py-2.5 ${item.label === "Post a Rental" ? "bg-blue-600 hover:bg-blue-700 text-white" : "text-gray-700 hover:bg-gray-100"}`}
                            onClick={() => actionFn(navigate, closeMobileMenu)}
                          >
                            {item.icon && <item.icon className="h-4 w-4 mr-2" />}
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
                            {item.icon && <item.icon className="h-4 w-4 mr-2" />}
                            {item.label}
                          </Link>
                        );
                      }
                      return null;
                    })}
                  </nav>
                  
                  <div className="mt-auto border-t pt-4">
                     <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="outline" className="w-full justify-start text-sm">
                            <Globe className="h-4 w-4 mr-2" /> English <ChevronDown className="h-4 w-4 ml-auto" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent side="top" align="start">
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