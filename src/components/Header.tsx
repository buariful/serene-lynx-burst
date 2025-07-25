import React, { useState } from "react";
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
import { useLanguageContext } from "@/components/LanguageProvider";
import { useTheme } from "@/hooks/useTheme";

type NavLinkItem = { type: "link"; href: string; label: string };
type MegaMenuItem = {
  type: "megaMenu";
  id: string;
  label: string;
  component: React.ElementType;
};

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { t, currentLanguage, changeLanguage } = useLanguageContext();
  const { theme, toggleTheme } = useTheme();

  // Debug translations
  console.log('Header - Current language:', currentLanguage);
  console.log('Header - Test translation:', t('header.medicalSchools'));
  console.log('Header - Languages translation:', t('languages.en'));

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

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
    { type: "link", href: "/tenant/dashboard", label: t('header.tenants') },
    { type: "link", href: "/contact-us", label: t('header.contactUs') },
  ];

  // Fix 1: Define a type for the button action
  // Define a type for the button action
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  type DrawerButtonAction = (
    navigate: ReturnType<typeof useNavigate>,
    closeMenu: () => void
  ) => void;

  const drawerMenuItems = [
    {
      type: "button" as const,
      label: t('header.postARental'),
      action: (
        navigate: ReturnType<typeof useNavigate>,
        closeMenu: () => void
      ) => {
        // navigate("/landlord/post-rental");
        navigate("/login");
        closeMenu();
      },
    },
    {
      type: "button" as const,
      label: t('header.login'),
      action: (
        navigate: ReturnType<typeof useNavigate>,
        closeMenu: () => void
      ) => {
        navigate("/login");
        closeMenu();
      },
    },
    {
      type: "button" as const,
      label: t('header.createAccount'),
      action: (
        navigate: ReturnType<typeof useNavigate>,
        closeMenu: () => void
      ) => {
        navigate("/register");
        closeMenu();
      },
    },
    { type: "separator" as const },
    {
      type: "link" as const,
      label: t('header.medicalSchools'),
      href: "/apartment",
    },
    // {
    //   type: "link" as const,
    //   label: "Hospital",
    //   href: "/hospitals",
    // },
    {
      type: "link" as const,
      label: t('header.landlords'),
      href: "/landloard/landlord-page",
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
    {
      type: "link" as const,
      label: t('header.creditCheck'),
      href: "/credit-check",
    },
    { type: "link" as const, label: t('header.about'), href: "/about" },
    { type: "link" as const, label: t('header.faq'), href: "/faq" },
    { type: "link" as const, label: t('header.blog'), href: "/blog" },
    // {
    //   type: "link" as const,
    //   label: "Job Board",
    //   href: "/job-board",
    // },
    // {
    //   type: "link" as const,
    //   label: "Medical Rentals",
    //   href: "/medical-rentals",
    // },
    // {
    //   type: "link" as const,
    //   label: "Search Near Me",
    //   href: "/search-near-me",
    // },
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
    <header className="bg-[hsl(var(--background))] text-[hsl(var(--foreground))] dark:bg-[hsl(var(--background))] dark:text-[hsl(var(--foreground))] shadow-sm sticky top-0 z-50">
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
                  className="w-screen max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl p-0 mt-2 shadow-2xl rounded-md border-gray-700 bg-slate-900"
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

          <div className="flex items-center space-x-2 flex-shrink-0">
            <div className="hidden md:flex items-center space-x-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-sm text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                  >
                    <Globe className="h-4 w-4 mr-1" /> {currentLanguage.toUpperCase()}{" "}
                    <ChevronDown className="h-4 w-4 ml-1 opacity-75" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="dark:bg-gray-800 dark:border-gray-700">
                  <DropdownMenuItem
                    onSelect={() => changeLanguage('en')}
                    className="dark:hover:bg-gray-700"
                  >
                    {t('languages.en')}
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onSelect={() => changeLanguage('fr')}
                    className="dark:hover:bg-gray-700"
                  >
                    {t('languages.fr')}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <Button
                // Fix 2: Use a valid variant and custom className for styling
                variant="default"
                className="bg-blue-600 hover:bg-blue-700 text-white text-sm h-9"
                onClick={() => navigate("/login")}
              >
                {t('header.postARental')}
              </Button>
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
                  className="h-9 w-9 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
                >
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="w-[300px] sm:w-[320px] p-0 flex flex-col dark:bg-gray-900 dark:border-gray-800"
              >
                <SheetHeader className="p-4 border-b dark:border-gray-700">
                  <SheetTitle>
                    <Logo />
                  </SheetTitle>
                </SheetHeader>
                <div className="flex-grow overflow-y-auto p-4">
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
                      if (item.type === "button" && item.action) {
                        const actionFn = item.action;
                        return (
                          <Button
                            key={item.label}
                            variant={
                              item.label === "Post a Rental"
                                ? "default"
                                : "ghost"
                            }
                            className={`w-full justify-start text-left h-auto py-2.5 px-3 text-sm rounded-md ${
                              item.label === t('header.postARental')
                                ? "bg-blue-600 hover:bg-blue-700 text-white"
                                : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                            }`}
                            onClick={() => actionFn(navigate, closeMobileMenu)}
                          >
                            {item.label}
                          </Button>
                        );
                      }
                      if (item.type === "link" && item.href) {
                        return (
                          <Link
                            key={item.href}
                            to={item.href}
                            className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 py-2.5 px-3 text-sm rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 flex items-center"
                            onClick={closeMobileMenu}
                          >
                            {item.label}
                          </Link>
                        );
                      }
                      return null;
                    })}
                  </nav>

                  <div className="mt-auto border-t border-gray-200 dark:border-gray-700 pt-4 flex flex-col gap-2">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full justify-start text-sm dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
                        >
                          <Globe className="h-4 w-4 mr-2" /> {t(`languages.${currentLanguage}`)}{" "}
                          <ChevronDown className="h-4 w-4 ml-auto opacity-75" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent
                        side="top"
                        align="start"
                        className="w-[calc(100%-2rem)] ml-4 mr-4 mb-1 dark:bg-gray-800 dark:border-gray-700"
                      >
                        <DropdownMenuItem
                          onSelect={() => {
                            changeLanguage('en');
                            closeMobileMenu();
                          }}
                          className="dark:hover:bg-gray-700"
                        >
                          {t('languages.en')}
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onSelect={() => {
                            changeLanguage('fr');
                            closeMobileMenu();
                          }}
                          className="dark:hover:bg-gray-700"
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
                      className="h-9 w-9 self-start"
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

export default Header;
