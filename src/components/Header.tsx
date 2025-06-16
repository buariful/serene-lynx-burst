import React, { useState } from 'react';
import Logo from './Logo';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Menu, ChevronDown, Globe, Briefcase, Map, Shield, UserCheck, Search, FileText, Lock } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import HospitalMegaMenu from './HospitalMegaMenu';

type NavLinkItem = { type: 'link'; href: string; label: string };
type MegaMenuItem = { type: 'megaMenu'; id: string; label: string };

const desktopNavLinks: (NavLinkItem | MegaMenuItem)[] = [
  { type: 'link', href: '/medical-schools', label: 'Medical School' },
  { type: 'megaMenu', id: 'hospitals-mega-menu', label: 'Hospital' },
  { type: 'link', href: '/landlords', label: 'Landlords' },
  { type: 'link', href: '/contact-us', label: 'Contact Us' },
];

const drawerMenuItems = [
  { type: 'button' as const, label: "Post a Rental", action: (navigate: Function, closeMenu: Function) => { navigate('/post-rental'); closeMenu(); } },
  { type: 'button' as const, label: "Login", action: (navigate: Function, closeMenu: Function) => { navigate('/login'); closeMenu(); } },
  { type: 'button' as const, label: "Create Account", action: (navigate: Function, closeMenu: Function) => { navigate('/register'); closeMenu(); } },
  { type: 'separator' as const },
  { type: 'link' as const, label: 'Medical School', href: '/medical-schools' },
  { type: 'link' as const, label: 'Hospital', href: '/hospitals' },
  { type: 'link' as const, label: 'Landlords', href: '/landlords' },
  { type: 'link' as const, label: 'Contact Us', href: '/contact-us' },
  { type: 'separator' as const },
  { type: 'link' as const, label: 'Tenant Insurance', href: '/tenant-insurance', icon: Shield },
  { type: 'link' as const, label: 'Landlord Verify Identity', href: '/landlord-verify', icon: UserCheck },
  { type: 'link' as const, label: 'About', href: '/about' },
  { type: 'link' as const, label: 'FAQ', href: '/faq' },
  { type: 'link' as const, label: 'Blog', href: '/blog' },
  { type: 'link' as const, label: 'Job Board', href: '/job-board', icon: Briefcase },
  { type: 'link' as const, label: 'Medical Rentals', href: '/medical-rentals' },
  { type: 'link' as const, label: 'Search Near Me', href: '/search-near-me', icon: Search },
  { type: 'link' as const, label: 'Search by Map', href: '/search-results', icon: Map },
  { type: 'separator' as const },
  { type: 'link' as const, label: 'Terms & Conditions', href: '/terms', icon: FileText },
  { type: 'link' as const, label: 'Privacy Policy', href: '/privacy', icon: Lock },
];

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <header className="bg-white dark:bg-gray-900 shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex-shrink-0">
            <Logo />
          </div>

          <nav className="hidden md:flex flex-grow justify-center space-x-6 items-center">
            {desktopNavLinks.map((link) => {
              if (link.type === 'megaMenu' && link.id === 'hospitals-mega-menu') {
                return (
                  <Popover key={link.id}>
                    <PopoverTrigger asChild>
                      <Button
                        variant="ghost"
                        className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 text-sm font-medium flex items-center px-1"
                      >
                        {link.label}
                        <ChevronDown className="h-4 w-4 ml-1 opacity-75" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent 
                      className="w-screen max-w-md sm:max-w-lg md:max-w-2xl lg:max-w-3xl p-0 mt-2 shadow-2xl rounded-md border-gray-700 bg-slate-900" // Using slate-900 for a very dark background, removed light mode bg
                      sideOffset={8}
                      align="center" // Try to center the popover under the trigger
                    >
                      <HospitalMegaMenu />
                    </PopoverContent>
                  </Popover>
                );
              }
              if (link.type === 'link') {
                return (
                  <Link
                    key={link.href}
                    to={link.href}
                    className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 text-sm font-medium px-1"
                  >
                    {link.label}
                  </Link>
                );
              }
              return null;
            })}
          </nav>

          <div className="flex items-center space-x-2 flex-shrink-0">
            <div className="hidden md:flex items-center space-x-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="text-sm text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800">
                    <Globe className="h-4 w-4 mr-1" /> EN <ChevronDown className="h-4 w-4 ml-1 opacity-75" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="dark:bg-gray-800 dark:border-gray-700">
                  <DropdownMenuItem onSelect={() => console.log("Lang: EN")} className="dark:hover:bg-gray-700">English</DropdownMenuItem>
                  <DropdownMenuItem onSelect={() => console.log("Lang: FR")} className="dark:hover:bg-gray-700">Français</DropdownMenuItem>
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

            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="h-9 w-9 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[320px] p-0 flex flex-col dark:bg-gray-900 dark:border-gray-800">
                <SheetHeader className="p-4 border-b dark:border-gray-700">
                  <SheetTitle>
                    <Logo />
                  </SheetTitle>
                </SheetHeader>
                <div className="flex-grow overflow-y-auto p-4">
                  <nav className="flex flex-col space-y-1">
                    {drawerMenuItems.map((item, index) => {
                      if (item.type === 'separator') {
                        return <hr key={`sep-${index}`} className="my-2 border-gray-200 dark:border-gray-700"/>;
                      }
                      if (item.type === 'button' && item.action) {
                        const actionFn = item.action;
                        return (
                          <Button
                            key={item.label}
                            variant={item.label === "Post a Rental" ? "primary" : "ghost"}
                            className={`w-full justify-start text-left h-auto py-2.5 px-3 text-sm rounded-md ${item.label === "Post a Rental" ? "bg-blue-600 hover:bg-blue-700 text-white" : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"}`}
                            onClick={() => actionFn(navigate, closeMobileMenu)}
                          >
                            {item.icon && <item.icon className="h-4 w-4 mr-2 flex-shrink-0" />}
                            {item.label}
                          </Button>
                        );
                      }
                      if (item.type === 'link' && item.href) {
                        return (
                          <Link
                            key={item.href}
                            to={item.href}
                            className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 py-2.5 px-3 text-sm rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 flex items-center"
                            onClick={closeMobileMenu}
                          >
                            {item.icon && <item.icon className="h-4 w-4 mr-2 flex-shrink-0" />}
                            {item.label}
                          </Link>
                        );
                      }
                      return null;
                    })}
                  </nav>

                  <div className="mt-auto border-t border-gray-200 dark:border-gray-700 pt-4">
                     <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="outline" className="w-full justify-start text-sm dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800">
                            <Globe className="h-4 w-4 mr-2" /> English <ChevronDown className="h-4 w-4 ml-auto opacity-75" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent side="top" align="start" className="w-[calc(100%-2rem)] ml-4 mr-4 mb-1 dark:bg-gray-800 dark:border-gray-700">
                          <DropdownMenuItem onSelect={() => { console.log("Lang: EN"); closeMobileMenu(); }} className="dark:hover:bg-gray-700">English</DropdownMenuItem>
                          <DropdownMenuItem onSelect={() => { console.log("Lang: FR"); closeMobileMenu(); }} className="dark:hover:bg-gray-700">Français</DropdownMenuItem>
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