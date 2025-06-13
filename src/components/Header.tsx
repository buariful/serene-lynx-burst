import React, { useState } from 'react';
import Logo from './Logo';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, Search, ChevronDown, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface Region {
  name: string;
  href: string;
}

interface CountryColumn {
  countryName: string;
  regions: Region[];
}

interface MegaMenuData {
  title: string;
  columns: CountryColumn[];
}

const megaMenuData: MegaMenuData = {
  title: "Search by hospital",
  columns: [
    {
      countryName: "Canada",
      regions: [
        { name: "Alberta", href: "/hospitals/ca/ab" },
        { name: "British Columbia", href: "/hospitals/ca/bc" },
        { name: "Manitoba", href: "/hospitals/ca/mb" },
        { name: "New Brunswick", href: "/hospitals/ca/nb" },
        { name: "Newfoundland and Labrador", href: "/hospitals/ca/nl" },
        { name: "Nova Scotia", href: "/hospitals/ca/ns" },
        { name: "Ontario", href: "/hospitals/ca/on" },
        { name: "Prince Edward Island", href: "/hospitals/ca/pe" },
        { name: "Quebec", href: "/hospitals/ca/qc" },
        { name: "Saskatchewan", href: "/hospitals/ca/sk" },
      ],
    },
    {
      countryName: "United States",
      regions: [
        { name: "Alabama", href: "/hospitals/us/al" },
        { name: "Alaska", href: "/hospitals/us/ak" },
        { name: "Arizona", href: "/hospitals/us/az" },
        { name: "Arkansas", href: "/hospitals/us/ar" },
        { name: "California", href: "/hospitals/us/ca" },
        { name: "Colorado", href: "/hospitals/us/co" },
        { name: "Connecticut", href: "/hospitals/us/ct" },
        // Add more states as needed for a full list
      ],
    },
    {
      countryName: "Extended US Territories",
      regions: [
        { name: "American Samoa", href: "/hospitals/us-territories/as" },
        { name: "Guam", href: "/hospitals/us-territories/gu" },
        { name: "Northern Mariana Islands", href: "/hospitals/us-territories/mp" },
        { name: "Puerto Rico", href: "/hospitals/us-territories/pr" },
        { name: "U.S. Virgin Islands", href: "/hospitals/us-territories/vi" },
      ],
    },
  ],
};

interface NavLinkItem {
  href: string;
  label: string;
  isMegaMenu?: boolean;
  megaMenuData?: MegaMenuData;
}

const navLinks: NavLinkItem[] = [
  { href: '/medical-schools', label: 'Medical Schools' },
  { href: '/hospitals', label: 'Hospitals', isMegaMenu: true, megaMenuData: megaMenuData },
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
          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            <nav className="flex space-x-1">
              {navLinks.map((link) =>
                link.isMegaMenu && link.megaMenuData ? (
                  <HoverCard key={link.href} openDelay={100} closeDelay={50}>
                    <HoverCardTrigger asChild>
                      <Link
                        to={link.href}
                        className="text-gray-600 hover:text-blue-600 px-3 py-2 text-sm rounded-md hover:bg-gray-100 transition-colors"
                      >
                        {link.label}
                      </Link>
                    </HoverCardTrigger>
                    <HoverCardContent
                      className="w-screen max-w-4xl bg-slate-800 text-white p-6 shadow-xl rounded-lg mt-2"
                      sideOffset={18} // Adjust to position below the header
                      align="start"
                    >
                      <h3 className="text-lg font-bold mb-4">{link.megaMenuData.title}</h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-4">
                        {link.megaMenuData.columns.map((column) => (
                          <div key={column.countryName}>
                            <h4 className="font-semibold text-base mb-2 text-slate-300">{column.countryName}</h4>
                            <ul className="space-y-1">
                              {column.regions.map((region) => (
                                <li key={region.name}>
                                  <Link
                                    to={region.href}
                                    className="block text-sm text-slate-100 hover:text-blue-300 hover:underline"
                                  >
                                    {region.name}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </HoverCardContent>
                  </HoverCard>
                ) : (
                  <Link
                    key={link.href}
                    to={link.href}
                    className="text-gray-600 hover:text-blue-600 px-3 py-2 text-sm rounded-md hover:bg-gray-100 transition-colors"
                  >
                    {link.label}
                  </Link>
                )
              )}
            </nav>
          </div>

          {/* Right side controls */}
          <div className="flex items-center space-x-2">
            <div className="hidden md:flex items-center relative">
              <Input type="search" placeholder="Search..." className="pr-10 text-sm h-9" />
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="text-sm h-9">
                  <Globe className="h-4 w-4 mr-1" /> English <ChevronDown className="h-4 w-4 ml-1" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>English</DropdownMenuItem>
                <DropdownMenuItem>Español</DropdownMenuItem>
                <DropdownMenuItem>Français</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button variant="outline" className="text-sm h-9">Login</Button>
            <Button className="text-sm bg-blue-600 hover:bg-blue-700 h-9">Join Us</Button>
            
            {/* Mobile Menu Trigger */}
            <div className="lg:hidden">
              <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
                <SheetTrigger asChild>
                  <Button variant="outline" size="icon" className="h-9 w-9">
                    <Menu className="h-5 w-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[300px] sm:w-[330px] p-4">
                  <div className="mt-6">
                    <div className="md:hidden mb-6">
                      <Input type="search" placeholder="Search..." className="w-full text-sm" />
                    </div>
                    <nav className="flex flex-col space-y-1">
                      {navLinks.map((link) =>
                        link.isMegaMenu && link.megaMenuData ? (
                          <Accordion key={link.href} type="single" collapsible className="w-full -mx-2">
                            <AccordionItem value="hospitals-mega-menu" className="border-b-0">
                              <AccordionTrigger className="text-gray-700 hover:text-blue-600 text-base hover:no-underline py-2 px-2 rounded-md hover:bg-gray-100">
                                {link.label}
                              </AccordionTrigger>
                              <AccordionContent className="pl-3 pr-1 pb-0">
                                <h3 className="font-semibold text-sm mb-2 mt-1 text-gray-600">{link.megaMenuData.title}</h3>
                                {link.megaMenuData.columns.map((column) => (
                                  <Accordion key={column.countryName} type="single" collapsible className="w-full mt-1">
                                    <AccordionItem value={column.countryName} className="border-b-0">
                                      <AccordionTrigger className="text-sm font-medium text-gray-500 hover:no-underline py-1.5 px-1 rounded-md hover:bg-gray-50">
                                        {column.countryName}
                                      </AccordionTrigger>
                                      <AccordionContent className="pl-3 pb-0">
                                        {column.regions.map((region) => (
                                          <Link
                                            key={region.name}
                                            to={region.href}
                                            className="block py-1.5 text-xs text-gray-500 hover:text-blue-600 rounded-md px-1 hover:bg-gray-50"
                                            onClick={() => setIsMobileMenuOpen(false)}
                                          >
                                            {region.name}
                                          </Link>
                                        ))}
                                      </AccordionContent>
                                    </AccordionItem>
                                  </Accordion>
                                ))}
                              </AccordionContent>
                            </AccordionItem>
                          </Accordion>
                        ) : (
                          <Link
                            key={link.href}
                            to={link.href}
                            className="text-gray-700 hover:text-blue-600 text-base block py-2 px-2 rounded-md hover:bg-gray-100"
                            onClick={() => setIsMobileMenuOpen(false)}
                          >
                            {link.label}
                          </Link>
                        )
                      )}
                    </nav>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
        {/* Responsive condensed nav links below main header on small screens, above lg */}
        <div className="lg:hidden mt-3 border-t pt-2">
            <nav className="flex flex-wrap gap-x-3 gap-y-1.5">
              {navLinks.slice(0,4).map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className="text-gray-600 hover:text-blue-600 text-xs"
                >
                  {link.label}
                </Link>
              ))}
               <Link
                  to="/all-categories" // Example link, or could trigger a modal/dropdown
                  className="text-blue-600 hover:text-blue-700 text-xs font-medium"
                >
                  More...
                </Link>
            </nav>
          </div>
      </div>
    </header>
  );
};

export default Header;