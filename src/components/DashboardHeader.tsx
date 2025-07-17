import React, { useState, useRef, useEffect } from "react";
import Logo from "./Logo";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Menu,
  ChevronDown,
  Globe,
  Briefcase,
  Map,
  Shield,
  UserCheck,
  Search,
  FileText,
  Lock,
  Sun,
  Moon,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import HospitalMegaMenu from "./HospitalMegaMenu";
import MedicalSchoolMegaMenu from "./MedicalSchoolMegaMenu"; // Import the new menu
import { useTranslation } from 'react-i18next';
import { useTheme } from "@/hooks/useTheme";

type NavLinkItem = { type: "link"; href: string; label: string };
type MegaMenuItem = {
  type: "megaMenu";
  id: string;
  label: string;
  component: React.ElementType;
};

const DashboardHeader = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const { theme, toggleTheme } = useTheme();
  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  // Debug language changes
  useEffect(() => {
    console.log('DashboardHeader - Current language:', i18n.language);
    console.log('DashboardHeader - Test translation:', t('header.medicalSchools'));
  }, [i18n.language, t]);

  const handleLanguageChange = (language: string) => {
    console.log('DashboardHeader - Changing language to:', language);
    console.log('DashboardHeader - Current language before change:', i18n.language);
    i18n.changeLanguage(language);
    console.log('DashboardHeader - Language change initiated');
  };

  const getCurrentLanguageLabel = () => {
    return i18n.language === 'fr' ? 'FR' : 'EN';
  };

  const getCurrentLanguageFullName = () => {
    return i18n.language === 'fr' ? 'Français' : 'English';
  };

  // Fix 1: Define a type for the button action
  // Define a type for the button action
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  type DrawerButtonAction = (
    navigate: ReturnType<typeof useNavigate>,
    closeMenu: () => void
  ) => void;

  const desktopNavLinks: MegaMenuItem[] = [
    // Simplified to always use MegaMenuItem type for consistency
    {
      type: "megaMenu",
      id: "medical-schools-mega-menu",
      label: t('header.medicalSchools'),
      component: MedicalSchoolMegaMenu,
    },
    {
      type: "megaMenu",
      id: "hospitals-mega-menu",
      label: t('header.hospitals'),
      component: HospitalMegaMenu,
    },
    // Convert other links to a compatible type or handle them differently if they don't use mega menus
    // For now, let's assume Landlords and Contact Us might become mega menus or simple links.
    // To keep them as simple links for now, we'd need to adjust the mapping logic or type.
    // Let's make them simple links for this update.
  ];

  // Simple links for items that are not mega menus
  const simpleDesktopNavLinks: NavLinkItem[] = [
    { type: "link", href: "/landlords", label: t('header.landlords') },
    { type: "link", href: "/contact-us", label: t('header.contactUs') },
  ];

  const drawerMenuItems = [
    {
      type: "link" as const,
      label: t('header.medicalSchools'),
      href: "/medical-schools",
    },
    {
      type: "link" as const,
      label: t('header.hospitals'),
      href: "/hospitals",
    },
    {
      type: "link" as const,
      label: t('header.landlords'),
      href: "/landlords",
    },
    {
      type: "link" as const,
      label: t('header.contactUs'),
      href: "/contact-us",
    },
    { type: "separator" as const },
    {
      type: "link" as const,
      label: t('header.tenantInsurance'),
      href: "/tenant-insurance",
    },
    {
      type: "link" as const,
      label: t('header.tenantNotice'),
      href: "/tenant-notice",
    },
    {
      type: "link" as const,
      label: t('header.landlordVerifyIdentity'),
      href: "/landlord-verify",
    },
    { type: "link" as const, label: t('header.about'), href: "/about" },
    { type: "link" as const, label: t('header.faq'), href: "/faq" },
    { type: "link" as const, label: t('header.blog'), href: "/blog" },
    {
      type: "link" as const,
      label: t('header.jobBoard'),
      href: "/job-board",
    },
    {
      type: "link" as const,
      label: t('header.medicalRentals'),
      href: "/medical-rentals",
    },
    {
      type: "link" as const,
      label: t('header.searchNearMe'),
      href: "/search-near-me",
    },
    {
      type: "link" as const,
      label: t('header.searchByMap'),
      href: "/apartment",
    },
    { type: "separator" as const },
    {
      type: "link" as const,
      label: t('header.termsConditions'),
      href: "/terms",
    },
    {
      type: "link" as const,
      label: t('header.privacyPolicy'),
      href: "/privacy",
    },
  ];

  return (
    <header className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 shadow-sm sticky top-0 z-50 border-b border-gray-200 dark:border-gray-700">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex-shrink-0">
            <Logo />
          </div>

          <nav className="hidden md:flex flex-grow justify-center space-x-6 items-center">
            {desktopNavLinks.map((item) => (
              <Popover key={item.id}>
                <PopoverTrigger asChild>
                  <Button
                    variant="ghost"
                    className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 text-sm font-medium flex items-center px-1"
                  >
                    {item.label}
                    <ChevronDown className="h-4 w-4 ml-1 opacity-75" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent
                  className="w-screen max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl p-0 mt-2 shadow-2xl rounded-md border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800"
                  sideOffset={8}
                  align="center"
                >
                  <item.component />
                </PopoverContent>
              </Popover>
            ))}
            {simpleDesktopNavLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 text-sm font-medium px-1"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Profile Avatar Dropdown using DropdownMenu */}
          <div className="flex items-center space-x-2 flex-shrink-0">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="w-9 h-9 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center border border-gray-300 dark:border-gray-600 hover:ring-2 hover:ring-blue-400 transition focus:outline-none"
                  aria-label="Open profile menu"
                >
                  <span className="text-xl">👤</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                <DropdownMenuItem asChild className="text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">
                  <Link to="/dashboard">{t('navigation.dashboard')}</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">
                  <Link to="/profile">{t('navigation.profile')}</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">
                  <Link to="/settings">{t('navigation.settings')}</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">
                  <Link to="/login">{t('navigation.logout')}</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <div className="hidden md:flex items-center space-x-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-sm text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    <Globe className="h-4 w-4 mr-1" /> {getCurrentLanguageLabel()}{" "}
                    <ChevronDown className="h-4 w-4 ml-1 opacity-75" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                  <DropdownMenuItem
                    onSelect={() => handleLanguageChange('en')}
                    className="text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    {t('languages.en')}
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onSelect={() => handleLanguageChange('fr')}
                    className="text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    {t('languages.fr')}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              
              <Button
                variant="ghost"
                size="icon"
                aria-label="Toggle theme"
                onClick={toggleTheme}
                className="h-9 w-9"
              >
                {theme === "dark" ? (
                  <Sun className="h-5 w-5" />
                ) : (
                  <Moon className="h-5 w-5" />
                )}
              </Button>
            </div>

            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-9 w-9 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="w-[300px] sm:w-[320px] p-0 flex flex-col bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 gap-0"
              >
                <SheetHeader className="p-4 border-b border-gray-200 dark:border-gray-700">
                  <SheetTitle className="text-gray-900 dark:text-gray-100">
                    <Logo />
                  </SheetTitle>
                </SheetHeader>
                <div className="flex-grow overflow-y-auto px-4">
                  <nav className="flex flex-col space-y-1">
                    {drawerMenuItems.map((item, index) => {
                      if (item.type === "separator") {
                        return (
                          <hr
                            key={`sep-${index}`}
                            className="my-2 border-gray-200 dark:border-gray-700"
                          />
                        );
                      }

                      if (item.type === "link" && item.href) {
                        return (
                          <Link
                            key={item.href}
                            to={item.href}
                            className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 py-2.5 px-3 text-sm rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center"
                            onClick={closeMobileMenu}
                          >
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
                        <Button
                          variant="outline"
                          className="w-full justify-start text-sm border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                        >
                          <Globe className="h-4 w-4 mr-2" /> {getCurrentLanguageFullName()}{" "}
                          <ChevronDown className="h-4 w-4 ml-auto opacity-75" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent
                        side="top"
                        align="start"
                        className="w-[calc(100%-2rem)] ml-4 mr-4 mb-1 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
                      >
                        <DropdownMenuItem
                          onSelect={() => {
                            handleLanguageChange('en');
                            closeMobileMenu();
                          }}
                          className="text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                        >
                          {t('languages.en')}
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onSelect={() => {
                            handleLanguageChange('fr');
                            closeMobileMenu();
                          }}
                          className="text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                        >
                          {t('languages.fr')}
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                    
                    <Button
                      variant="ghost"
                      size="icon"
                      aria-label="Toggle theme"
                      onClick={toggleTheme}
                      className="h-9 w-9 self-start mt-2"
                    >
                      {theme === "dark" ? (
                        <Sun className="h-5 w-5" />
                      ) : (
                        <Moon className="h-5 w-5" />
                      )}
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

export default DashboardHeader;
