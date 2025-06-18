import React from "react";
import { Link } from "react-router-dom";
import Logo from "./Logo"; // Assuming Logo is updated to "Rentals.ca"

const footerLinks = {
  company: [
    { label: "About Us", href: "/about" },
    { label: "Blog", href: "/blog" },
    { label: "Careers", href: "/careers" },
    { label: "Contact Us", href: "/contact" },
  ],
  tenants: [
    { label: "RentReport™", href: "/rent-report" },
    { label: "FAQs for Tenants", href: "/faq-tenants" },
    { label: "Avoid Scams", href: "/avoid-scams" },
    { label: "Search Rentals", href: "/rent" },
  ],
  landlords: [
    { label: "Post a Rental", href: "/landlord/post-rental" },
    { label: "Pricing", href: "/pricing-landlords" },
    { label: "Landlord Resources", href: "/landlord-resources" },
    { label: "FAQs for Landlords", href: "/faq-landlords" },
  ],
  cities: [
    // Column 1
    { label: "Toronto Rentals", href: "/rentals/toronto" },
    { label: "Vancouver Rentals", href: "/rentals/vancouver" },
    { label: "Montreal Rentals", href: "/rentals/montreal" },
    { label: "Calgary Rentals", href: "/rentals/calgary" },
    // Column 2
    { label: "Edmonton Rentals", href: "/rentals/edmonton" },
    { label: "Ottawa Rentals", href: "/rentals/ottawa" },
    { label: "Winnipeg Rentals", href: "/rentals/winnipeg" },
    { label: "Quebec City Rentals", href: "/rentals/quebec-city" },
    // Column 3
    { label: "Hamilton Rentals", href: "/rentals/hamilton" },
    { label: "London Rentals", href: "/rentals/london" },
    { label: "Victoria Rentals", href: "/rentals/victoria" },
    { label: "Halifax Rentals", href: "/rentals/halifax" },
  ],
};

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-800 text-slate-300 pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* Logo & Company Info (spans more on smaller screens or is first) */}
          <div className="md:col-span-2 lg:col-span-1 mb-6 md:mb-0">
            <Logo />{" "}
            {/* Make sure Logo component text color is adaptable or white here */}
            <p className="mt-3 text-sm">Canada's home for rental properties.</p>
          </div>

          {/* Link Sections */}
          <div>
            <h5 className="font-semibold text-white mb-3">Company</h5>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <Link to={link.href} className="hover:text-white text-sm">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h5 className="font-semibold text-white mb-3">For Tenants</h5>
            <ul className="space-y-2">
              {footerLinks.tenants.map((link) => (
                <li key={link.label}>
                  <Link to={link.href} className="hover:text-white text-sm">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h5 className="font-semibold text-white mb-3">For Landlords</h5>
            <ul className="space-y-2">
              {footerLinks.landlords.map((link) => (
                <li key={link.label}>
                  <Link to={link.href} className="hover:text-white text-sm">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Cities Section - Spans across remaining space or its own column */}
          <div className="lg:col-span-1">
            {" "}
            {/* On large screens, it takes 1 of 5 cols. Adjust as needed. */}
            <h5 className="font-semibold text-white mb-3">Popular Cities</h5>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-x-4">
              {" "}
              {/* For cities, maybe 1 col on lg */}
              {footerLinks.cities.slice(0, 4).map(
                (
                  link // Example: show first 4 directly
                ) => (
                  <div key={link.label} className="mb-1">
                    <Link to={link.href} className="hover:text-white text-sm">
                      {link.label}
                    </Link>
                  </div>
                )
              )}
              {/* You might want a "More cities" link here */}
            </div>
          </div>
        </div>

        <div className="border-t border-slate-700 pt-8 text-center md:text-left">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm mb-4 md:mb-0">
              &copy; {currentYear} Rentals.ca. All rights reserved. A{" "}
              <a
                href="https://gotarent.com"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-white"
              >
                gotarent.com
              </a>{" "}
              network site.
            </p>
            <div className="flex space-x-4">
              <Link to="/terms" className="text-sm hover:text-white">
                Terms & Conditions
              </Link>
              <Link to="/privacy" className="text-sm hover:text-white">
                Privacy Policy
              </Link>
            </div>
          </div>
          <p className="text-xs mt-4 text-slate-400 text-center">
            Disclaimer: Rentals.ca is not responsible for the accuracy of
            information provided by landlords or users. Always verify
            information independently and take precautions to avoid scams.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
