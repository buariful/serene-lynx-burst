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
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import HospitalMegaMenu from "./HospitalMegaMenu";
import MedicalSchoolMegaMenu from "./MedicalSchoolMegaMenu"; // Import the new menu

type NavLinkItem = { type: "link"; href: string; label: string };
type MegaMenuItem = {
  type: "megaMenu";
  id: string;
  label: string;
  component: React.ElementType;
};

const desktopNavLinks: MegaMenuItem[] = [
  // Simplified to always use MegaMenuItem type for consistency
  {
    type: "megaMenu",
    id: "medical-schools-mega-menu",
    label: "Medical School",
    component: MedicalSchoolMegaMenu,
  },
  {
    type: "megaMenu",
    id: "hospitals-mega-menu",
    label: "Hospital",
    component: HospitalMegaMenu,
  },
  // Convert other links to a compatible type or handle them differently if they don't use mega menus
  // For now, let's assume Landlords and Contact Us might become mega menus or simple links.
  // To keep them as simple links for now, we'd need to adjust the mapping logic or type.
  // Let's make them simple links for this update.
];

// Simple links for items that are not mega menus
const simpleDesktopNavLinks: NavLinkItem[] = [
  { type: "link", href: "/landlords", label: "Landlords" },
  { type: "link", href: "/contact-us", label: "Contact Us" },
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
    type: "link" as const,
    label: "Medical School",
    href: "/medical-schools",
  },
  {
    type: "link" as const,
    label: "Hospital",
    href: "/hospitals",
  },
  {
    type: "link" as const,
    label: "Landlords",
    href: "/landlords",
  },
  {
    type: "link" as const,
    label: "Contact Us",
    href: "/contact-us",
  },
  { type: "separator" as const },
  {
    type: "link" as const,
    label: "Tenant Insurance",
    href: "/tenant-insurance",
  },
  {
    type: "link" as const,
    label: "Landlord Verify Identity",
    href: "/landlord-verify",
  },
  { type: "link" as const, label: "About", href: "/about" },
  { type: "link" as const, label: "FAQ", href: "/faq" },
  { type: "link" as const, label: "Blog", href: "/blog" },
  {
    type: "link" as const,
    label: "Job Board",
    href: "/job-board",
  },
  {
    type: "link" as const,
    label: "Medical Rentals",
    href: "/medical-rentals",
  },
  {
    type: "link" as const,
    label: "Search Near Me",
    href: "/search-near-me",
  },
  {
    type: "link" as const,
    label: "Search by Map",
    href: "/search-results",
  },
  { type: "separator" as const },
  {
    type: "link" as const,
    label: "Terms & Conditions",
    href: "/terms",
  },
  {
    type: "link" as const,
    label: "Privacy Policy",
    href: "/privacy",
  },
];

const DashboardHeader = () => {
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
                    <Globe className="h-4 w-4 mr-1" /> EN{" "}
                    <ChevronDown className="h-4 w-4 ml-1 opacity-75" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="dark:bg-gray-800 dark:border-gray-700">
                  <DropdownMenuItem
                    onSelect={() => console.log("Lang: EN")}
                    className="dark:hover:bg-gray-700"
                  >
                    English
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onSelect={() => console.log("Lang: FR")}
                    className="dark:hover:bg-gray-700"
                  >
                    Français
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
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
                className="w-[300px] sm:w-[320px] p-0 flex flex-col dark:bg-gray-900 dark:border-gray-800 gap-0"
              >
                <SheetHeader className="p-4 border-b dark:border-gray-700">
                  <SheetTitle>
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

                  <div className="mt-auto border-t border-gray-200 dark:border-gray-700 pt-4">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full justify-start text-sm dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
                        >
                          <Globe className="h-4 w-4 mr-2" /> English{" "}
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
                            console.log("Lang: EN");
                            closeMobileMenu();
                          }}
                          className="dark:hover:bg-gray-700"
                        >
                          English
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onSelect={() => {
                            console.log("Lang: FR");
                            closeMobileMenu();
                          }}
                          className="dark:hover:bg-gray-700"
                        >
                          Français
                        </DropdownMenuItem>
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

export default DashboardHeader;
