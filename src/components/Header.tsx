// "use client";

// import React, { useState, Fragment } from "react";
// import { Link, useLocation } from "react-router-dom";
// import { Menu, Transition, Popover } from "@headlessui/react";
// import {
//   Search,
//   Briefcase,
//   GraduationCap,
//   Newspaper,
//   Hospital,
//   Map,
//   Users,
//   Info,
//   MessageSquare,
//   Home,
// } from "lucide-react"; // Added Home for consistency

// import HospitalMegaMenu from "./HospitalMegaMenu";
// import MedicalSchoolMegaMenu from "./MedicalSchoolMegaMenu";
// import ProvinceMegaMenu from "./ProvinceMegaMenu"; // Assuming this exists or will be created

// // Define a type for navigation items
// interface NavItem {
//   name: string;
//   href: string;
//   icon?: React.ElementType; // Icon component
//   current?: boolean;
//   dropdown?: boolean;
//   megaMenu?: React.ReactNode;
//   dropdownItems?: NavItem[]; // For nested dropdowns
// }

// const Header: React.FC = () => {
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
//   const location = useLocation();

//   const navigationItems: NavItem[] = [
//     { name: "Home", href: "/", icon: Home },
//     {
//       name: "Search Doctors",
//       href: "#", // Placeholder as it's a dropdown
//       icon: Search,
//       dropdown: true,
//       megaMenu: <HospitalMegaMenu />,
//     },
//     {
//       name: "Medical Schools",
//       href: "#", // Placeholder
//       icon: GraduationCap,
//       dropdown: true,
//       megaMenu: <MedicalSchoolMegaMenu />,
//     },
//     {
//       name: "Residency Programs",
//       href: "#", // Placeholder
//       icon: Briefcase, // Changed from BriefcaseMedical to Briefcase
//       dropdown: true,
//       megaMenu: <ProvinceMegaMenu />, // Assuming this will list provinces for residency programs
//     },
//     { name: "News", href: "/news", icon: Newspaper },
//     { name: "Hospitals", href: "/hospitals", icon: Hospital }, // Simple link, mega menu is for search
//     { name: "Provinces & Territories", href: "/provinces", icon: Map },
//     { name: "About Us", href: "/about", icon: Info },
//     { name: "Contact", href: "/contact", icon: MessageSquare },
//     { name: "Community", href: "/community", icon: Users },
//   ];

//   return (
//     <header className="bg-gray-900 text-white sticky top-0 z-50 shadow-lg">
//       <div className="container mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex items-center justify-between h-20">
//           {/* Logo */}
//           <div className="flex-shrink-0">
//             <Link to="/" className="text-2xl font-bold tracking-tight">
//               CanadaDr.ca
//             </Link>
//           </div>

//           {/* Desktop Navigation */}
//           <nav className="hidden lg:flex lg:items-center lg:space-x-2 xl:space-x-3">
//             {navigationItems.map((item) =>
//               item.megaMenu ? (
//                 <Popover key={item.name} className="relative">
//                   {({ open }) => (
//                     <>
//                       <Popover.Button
//                         className={`
//                           ${open ? "text-blue-400 bg-gray-800" : ""}
//                           px-3 py-2.5 rounded-md text-sm font-medium hover:text-blue-400 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 flex items-center transition-colors
//                           ${
//                             location.pathname === item.href ||
//                             (item.href !== "/" &&
//                               location.pathname.startsWith(item.href))
//                               ? "text-blue-400 bg-gray-800"
//                               : "text-gray-300"
//                           }
//                         `}
//                       >
//                         {item.icon && (
//                           <item.icon
//                             className="mr-2 h-5 w-5 flex-shrink-0"
//                             aria-hidden="true"
//                           />
//                         )}
//                         <span>{item.name}</span>
//                         <span aria-hidden="true">▼</span>
//                       </Popover.Button>
//                       <Transition
//                         as={Fragment}
//                         enter="transition ease-out duration-200"
//                         enterFrom="opacity-0 translate-y-1"
//                         enterTo="opacity-100 translate-y-0"
//                         leave="transition ease-in duration-150"
//                         leaveFrom="opacity-100 translate-y-0"
//                         leaveTo="opacity-0 translate-y-1"
//                       >
//                         <Popover.Panel className="absolute left-1/2 z-20 mt-3 w-screen max-w-md -translate-x-1/2 transform px-4 sm:px-0 lg:max-w-xl xl:max-w-2xl">
//                           <div className="overflow-hidden rounded-lg shadow-2xl ring-1 ring-black ring-opacity-5">
//                             <div className="relative bg-gray-800 text-white">
//                               {item.megaMenu}
//                             </div>
//                           </div>
//                         </Popover.Panel>
//                       </Transition>
//                     </>
//                   )}
//                 </Popover>
//               ) : item.dropdownItems ? (
//                 // Standard Dropdown (example, not used by current mega menus)
//                 <Menu as="div" key={item.name} className="relative">
//                   {({ open }) => (
//                     <>
//                       <Menu.Button
//                         className={`
//                         ${open ? "text-blue-400 bg-gray-800" : ""}
//                         px-3 py-2.5 rounded-md text-sm font-medium hover:text-blue-400 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 flex items-center transition-colors
//                         ${
//                           location.pathname === item.href ||
//                           (item.href !== "/" &&
//                             location.pathname.startsWith(item.href))
//                             ? "text-blue-400 bg-gray-800"
//                             : "text-gray-300"
//                         }
//                       `}
//                       >
//                         {item.icon && (
//                           <item.icon
//                             className="mr-2 h-5 w-5 flex-shrink-0"
//                             aria-hidden="true"
//                           />
//                         )}
//                         <span>{item.name}</span>
//                         <span aria-hidden="true">▼</span>
//                       </Menu.Button>
//                       <Transition
//                         as={Fragment}
//                         enter="transition ease-out duration-100"
//                         enterFrom="transform opacity-0 scale-95"
//                         enterTo="transform opacity-100 scale-100"
//                         leave="transition ease-in duration-75"
//                         leaveFrom="transform opacity-100 scale-100"
//                         leaveTo="transform opacity-0 scale-95"
//                       >
//                         <Menu.Items className="absolute right-0 z-20 mt-2 w-56 origin-top-right rounded-md bg-white dark:bg-gray-800 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
//                           <div className="py-1">
//                             {item.dropdownItems.map((subItem) => (
//                               <Menu.Item key={subItem.href}>
//                                 {({ active }) => (
//                                   <Link
//                                     to={subItem.href}
//                                     className={`${
//                                       active
//                                         ? "bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white"
//                                         : "text-gray-700 dark:text-gray-300"
//                                     }
//                                       group flex items-center px-4 py-2 text-sm`}
//                                   >
//                                     {subItem.icon && (
//                                       <subItem.icon className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500 dark:group-hover:text-gray-300" />
//                                     )}
//                                     {subItem.name}
//                                   </Link>
//                                 )}
//                               </Menu.Item>
//                             ))}
//                           </div>
//                         </Menu.Items>
//                       </Transition>
//                     </>
//                   )}
//                 </Menu>
//               ) : (
//                 // Regular Link
//                 <Link
//                   key={item.href}
//                   to={item.href}
//                   className={`
//                     px-3 py-2.5 rounded-md text-sm font-medium hover:text-blue-400 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 flex items-center transition-colors
//                     ${
//                       location.pathname === item.href ||
//                       (item.href === "/" && location.pathname === "/") ||
//                       (item.href !== "/" &&
//                         location.pathname.startsWith(item.href))
//                         ? "text-blue-400 bg-gray-800"
//                         : "text-gray-300"
//                     }
//                   `}
//                   aria-current={
//                     location.pathname === item.href ? "page" : undefined
//                   }
//                 >
//                   {item.icon && (
//                     <item.icon
//                       className="mr-2 h-5 w-5 flex-shrink-0"
//                       aria-hidden="true"
//                     />
//                   )}
//                   {item.name}
//                 </Link>
//               )
//             )}
//           </nav>

//           {/* Mobile Menu Button */}
//           <div className="lg:hidden">
//             <button
//               type="button"
//               onClick={() => setMobileMenuOpen(true)}
//               className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
//               aria-expanded="false"
//             >
//               <span className="sr-only">Open main menu</span>
//               <span aria-hidden="true">▼</span>
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Mobile Menu */}
//       <Transition.Root show={mobileMenuOpen} as={Fragment}>
//         <div className="lg:hidden" role="dialog" aria-modal="true">
//           <Transition.Child
//             as={Fragment}
//             enter="duration-150 ease-out"
//             enterFrom="opacity-0"
//             enterTo="opacity-100"
//             leave="duration-150 ease-in"
//             leaveFrom="opacity-100"
//             leaveTo="opacity-0"
//           >
//             <div className="fixed inset-0 bg-gray-900 bg-opacity-75 transition-opacity" />
//           </Transition.Child>

//           <div className="fixed inset-0 z-50 overflow-y-auto">
//             <div className="flex min-h-full items-start justify-end p-4 text-center sm:items-center sm:p-0">
//               <Transition.Child
//                 as={Fragment}
//                 enter="duration-150 ease-out"
//                 enterFrom="opacity-0 translate-x-full sm:translate-x-0 sm:scale-95"
//                 enterTo="opacity-100 translate-x-0 sm:scale-100"
//                 leave="duration-150 ease-in"
//                 leaveFrom="opacity-100 translate-x-0 sm:scale-100"
//                 leaveTo="opacity-0 translate-x-full sm:translate-x-0 sm:scale-95"
//               >
//                 <div className="relative transform overflow-hidden rounded-lg bg-white dark:bg-gray-800 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
//                   <div className="flex items-center justify-between px-4 pt-5 pb-4 sm:px-6 sm:pb-4 border-b border-gray-200 dark:border-gray-700">
//                     <h3 className="text-lg font-medium leading-6 text-gray-900 dark:text-white">
//                       Menu
//                     </h3>
//                     <button
//                       type="button"
//                       className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
//                       onClick={() => setMobileMenuOpen(false)}
//                     >
//                       <span className="sr-only">Close menu</span>
//                       <span aria-hidden="true">▼</span>
//                     </button>
//                   </div>
//                   <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
//                     {navigationItems.map((item) => {
//                       // Logic for handling dropdowns in mobile - simplified for now
//                       if (item.dropdown || item.megaMenu) {
//                         // Could implement an accordion or simple list for mobile dropdowns
//                         // For now, just a link that could lead to a page or be non-interactive
//                         return (
//                           <Link
//                             key={item.href} // Using href for key, assuming it's unique or use item.name
//                             to={
//                               item.href === "#" ? location.pathname : item.href
//                             } // Prevent navigation for '#'
//                             onClick={() => {
//                               if (item.href !== "#") setMobileMenuOpen(false);
//                               // Potentially toggle a sub-menu here if we had one
//                             }}
//                             className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 py-2.5 px-3 text-sm rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 flex items-center"
//                           >
//                             {/* Icon removed from here */}
//                             {item.name}
//                             {(item.dropdown || item.megaMenu) && (
//                               <span aria-hidden="true">▼</span>
//                             )}
//                           </Link>
//                         );
//                       }
//                       // Regular link
//                       return (
//                         <Link
//                           key={item.href}
//                           to={item.href}
//                           onClick={() => setMobileMenuOpen(false)}
//                           className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 py-2.5 px-3 text-sm rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 flex items-center"
//                           aria-current={
//                             location.pathname === item.href ? "page" : undefined
//                           }
//                         >
//                           {/* Icon removed from here */}
//                           {item.name}
//                         </Link>
//                       );
//                     })}
//                   </div>
//                 </div>
//               </Transition.Child>
//             </div>
//           </div>
//         </div>
//       </Transition.Root>
//     </header>
//   );
// };

// export default Header;

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
    type: "button" as const,
    label: "Post a Rental",
    action: (
      navigate: ReturnType<typeof useNavigate>,
      closeMenu: () => void
    ) => {
      navigate("/landlord/post-rental");
      closeMenu();
    },
  },
  {
    type: "button" as const,
    label: "Login",
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
    label: "Create Account",
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
              <Button
                // Fix 2: Use a valid variant and custom className for styling
                variant="default"
                className="bg-blue-600 hover:bg-blue-700 text-white text-sm h-9"
                onClick={() => navigate("/landlord/post-rental")}
              >
                Post a Rental
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
                              item.label === "Post a Rental"
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

export default Header;
