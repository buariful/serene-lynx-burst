"use client";

import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetClose } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu, X, ChevronDown, Search, User, Briefcase, GraduationCap, Building, MapPin, Stethoscope, MessageSquare, LogIn, UserPlus, LayoutDashboard } from 'lucide-react';
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger, navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";
import HospitalMegaMenu from './HospitalMegaMenu'; // Assuming this is correctly pathed
import MedicalSchoolMegaMenu from './MedicalSchoolMegaMenu'; // Assuming this is correctly pathed
import { cn } from "@/lib/utils";

const Logo = () => (
  <Link to="/" className="flex items-center space-x-2">
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-blue-600">
      <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
    <span className="font-bold text-xl text-gray-800 dark:text-white">MedConnect</span>
  </Link>
);


const navLinks = [
  {
    label: "Find Doctors",
    href: "/search-doctors",
    icon: Search,
    description: "Search for doctors by specialty, location, and more.",
  },
  {
    label: "Hospitals",
    href: "#", // Main link for dropdown
    icon: Building,
    description: "Explore hospitals and their services.",
    isMegaMenu: true,
    megaMenuType: 'hospital',
  },
  {
    label: "Medical Schools",
    href: "#", // Main link for dropdown
    icon: GraduationCap,
    description: "Discover medical schools across Canada.",
    isMegaMenu: true,
    megaMenuType: 'medical-school',
  },
  {
    label: "Residency Programs",
    href: "/residency-programs",
    icon: Briefcase,
    description: "Find residency programs and application details.",
  },
  {
    label: "Provinces & Territories",
    href: "/provinces-territories",
    icon: MapPin,
    description: "Information about healthcare in Canadian provinces.",
  },
  {
    label: "Health Resources",
    href: "/health-resources",
    icon: Stethoscope,
    description: "Access valuable health information and tools.",
  },
  {
    label: "Forum",
    href: "/forum",
    icon: MessageSquare,
    description: "Connect with the community and discuss health topics.",
  },
];

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a"> & { title: string }
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = "ListItem"

const Header: React.FC = () => {
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const drawerMenuItems = [
    ...navLinks.filter(link => !link.isMegaMenu), // Add regular links
    // Manually add mega menu parent links if needed, or specific sub-links
    { label: "Search Hospitals", href: "/search-results?category=hospital", icon: Building }, // Example direct link
    { label: "Search Med Schools", href: "/medical-schools", icon: GraduationCap }, // Example direct link
    { type: 'separator' as const },
    { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { label: "Login", href: "/login", icon: LogIn },
    { label: "Sign Up", href: "/signup", icon: UserPlus },
  ];


  return (
    <header className={`sticky top-0 z-50 w-full transition-all duration-300 ${isScrolled ? 'bg-white/90 dark:bg-gray-900/90 backdrop-blur-md shadow-md' : 'bg-white dark:bg-gray-900'}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Logo />
          <div className="hidden lg:flex items-center space-x-1">
            <NavigationMenu>
              <NavigationMenuList>
                {navLinks.map((link) => (
                  <NavigationMenuItem key={link.label}>
                    {link.isMegaMenu ? (
                      <>
                        <NavigationMenuTrigger className="bg-transparent hover:bg-gray-100 dark:hover:bg-gray-800">
                          {link.icon && <link.icon className="h-4 w-4 mr-2" />}
                          {link.label}
                        </NavigationMenuTrigger>
                        <NavigationMenuContent 
                          className="bg-gray-800 dark:bg-gray-800 border-gray-700 dark:border-gray-700"
                          // Force render and position correctly if needed
                          // style={{ position: 'absolute', left: 0, top: '100%' }}
                        >
                          {link.megaMenuType === 'hospital' && <HospitalMegaMenu />}
                          {link.megaMenuType === 'medical-school' && <MedicalSchoolMegaMenu />}
                        </NavigationMenuContent>
                      </>
                    ) : (
                      <Link to={link.href} className={navigationMenuTriggerStyle() + " bg-transparent hover:bg-gray-100 dark:hover:bg-gray-800"}>
                        {link.icon && <link.icon className="h-4 w-4 mr-2" />}
                        {link.label}
                      </Link>
                    )}
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
            <div className="w-px h-6 bg-gray-300 dark:bg-gray-700 mx-2"></div>
            <Button variant="ghost" size="sm" asChild className="hover:bg-gray-100 dark:hover:bg-gray-800">
              <Link to="/login">
                <LogIn className="h-4 w-4 mr-1" /> Login
              </Link>
            </Button>
            <Button variant="default" size="sm" asChild>
              <Link to="/signup">
                Sign Up
              </Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-full max-w-xs sm:max-w-sm bg-white dark:bg-gray-900 p-0 flex flex-col">
                <SheetHeader className="p-4 border-b dark:border-gray-700">
                  <div className="flex justify-between items-center">
                    <SheetTitle><Logo /></SheetTitle>
                    <SheetClose asChild>
                      <Button variant="ghost" size="icon" className="text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800">
                        <X className="h-5 w-5" />
                        <span className="sr-only">Close menu</span>
                      </Button>
                    </SheetClose>
                  </div>
                </SheetHeader>
                <div className="flex-grow overflow-y-auto p-4">
                  <nav className="flex flex-col space-y-1">
                    {drawerMenuItems.map((item, index) => {
                      if (item.type === 'separator') {
                        return <hr key={`sep-${index}`} className="my-2 border-gray-200 dark:border-gray-700" />;
                      }
                      return (
                        <SheetClose asChild key={item.label}>
                          <Link
                            to={item.href}
                            className={`flex items-center rounded-md px-3 py-2 text-base font-medium transition-colors
                              ${location.pathname === item.href
                                ? 'bg-blue-50 text-blue-600 dark:bg-blue-900/50 dark:text-blue-300'
                                : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-gray-50'
                              }`}
                          >
                            {/* Removed icon from here */}
                            <span>{item.label}</span>
                          </Link>
                        </SheetClose>
                      );
                    })}
                  </nav>
                </div>
                <div className="p-4 border-t dark:border-gray-700 space-y-2">
                    <Button variant="outline" className="w-full" asChild>
                        <Link to="/login"><LogIn className="h-4 w-4 mr-2" />Login</Link>
                    </Button>
                    <Button className="w-full" asChild>
                        <Link to="/signup"><UserPlus className="h-4 w-4 mr-2" />Sign Up</Link>
                    </Button>
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