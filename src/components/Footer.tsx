import React from "react";
import { Link } from "react-router-dom";
import { LogoWhite } from "./Logo"; // Assuming Logo is updated to "Scrubhub.ca"
import { useTranslation } from 'react-i18next';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const { t } = useTranslation();
  const footerLinks = {
    company: [
      { label: t('footer.links.aboutUs'), href: "/about" },
      { label: t('footer.links.blog'), href: "/blog" },
      // { label: t('footer.links.careers'), href: "/careers" },
      { label: t('footer.links.contactUs'), href: "/contact-us" },
      { label: t('footer.carrer'), href: "/job-board" },
      { label: t('footer.creditCheckReport'), href: "/credit-check-report" },
    ],
    tenants: [
      // { label: t('footer.links.rentReport'), href: "/rent-report" },
      { label: t('footer.links.faqsForTenants'), href: "/faq" },
      // { label: t('footer.links.avoidScams'), href: "/avoid-scams" },
      { label: t('footer.links.searchRentals'), href: "/tenant/marketplace" },
      { label: "Search Medical Equipment", href: "/medical-equipment" },
    ],
    landlords: [
      { label: t('footer.links.postARental'), href: "/login" },
      { label: "Post Medical Equipment", href: "/post-medical-equipment" },
      { label: t('footer.links.pricing'), href: "/landlords" },
      { label: t('footer.links.landlordResources'), href: "/landlords" },
      { label: t('footer.links.faqsForLandlords'), href: "/faq" },
    ],
    cities: [
      // Column 1
      { label: t('footer.links.torontoRentals'), href: "/toronto/rental" },
      { label: t('footer.links.vancouverRentals'), href: "/toronto/rental" },
      { label: t('footer.links.montrealRentals'), href: "/toronto/rental" },
      { label: t('footer.links.calgaryRentals'), href: "/toronto/rental" },
      // Column 2
      // { label: t('footer.links.edmontonRentals'), href: "/rentals/edmonton" },
      // { label: t('footer.links.ottawaRentals'), href: "/rentals/ottawa" },
      // { label: t('footer.links.winnipegRentals'), href: "/rentals/winnipeg" },
      // { label: t('footer.links.quebecCityRentals'), href: "/rentals/quebec-city" },
      // // Column 3
      // { label: t('footer.links.hamiltonRentals'), href: "/rentals/hamilton" },
      // { label: t('footer.links.londonRentals'), href: "/rentals/london" },
      // { label: t('footer.links.victoriaRentals'), href: "/rentals/victoria" },
      // { label: t('footer.links.halifaxRentals'), href: "/rentals/halifax" },
    ],
  };

  return (
    <footer className="bg-[hsl(var(--footer-bg))] text-[hsl(var(--footer-text))] pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* Logo & Company Info (spans more on smaller screens or is first) */}
          <div className="md:col-span-2 lg:col-span-1 mb-6 md:mb-0">
            <LogoWhite />{" "}
            {/* Make sure Logo component text color is adaptable or white here */}
            <p className="mt-3 text-sm text-[hsl(var(--footer-text))]">{t('footer.homeForRentals')}</p>
          </div>

          {/* Link Sections */}
          <div>
            <h5 className="font-semibold text-[hsl(var(--footer-link-hover))] mb-3">{t('footer.company')}</h5>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <Link to={link.href} className="hover:text-[hsl(var(--footer-link-hover))] text-sm">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h5 className="font-semibold text-[hsl(var(--footer-link-hover))] mb-3">{t('footer.forTenants')}</h5>
            <ul className="space-y-2">
              {footerLinks.tenants.map((link, index) => (
                <li key={link.label}>
                  <Link to={link.href} className="hover:text-[hsl(var(--footer-link-hover))] text-sm">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h5 className="font-semibold text-[hsl(var(--footer-link-hover))] mb-3">{t('footer.forLandlords')}</h5>
            <ul className="space-y-2">
              {footerLinks.landlords.map((link) => (
                <li key={link.label}>
                  <Link to={link.href} className="hover:text-[hsl(var(--footer-link-hover))] text-sm">
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
            <h5 className="font-semibold text-[hsl(var(--footer-link-hover))] mb-3">{t('footer.popularCities')}</h5>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-x-4">
              {" "}
              {/* For cities, maybe 1 col on lg */}
              {footerLinks.cities.slice(0, 4).map(
                (
                  link // Example: show first 4 directly
                ) => (
                  <div key={link.label} className="mb-1">
                    <Link to={link.href} className="hover:text-[hsl(var(--footer-link-hover))] text-sm">
                      {link.label}
                    </Link>
                  </div>
                )
              )}
              {/* You might want a "More cities" link here */}
            </div>
          </div>
        </div>

        <div className="border-t border-[hsl(var(--footer-border))] pt-8 text-center md:text-left">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm mb-4 md:mb-0 text-[hsl(var(--footer-text))]">
              &copy; {currentYear} Scrubhub.ca. {t('footer.allRightsReserved')} A{" "}
              <a
                href="https://scrubhub.ca"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-[hsl(var(--footer-link-hover))]"
              >
                Scrubhub.ca
              </a>{" "}
              {t('footer.networkSite')}
            </p>
            <div className="flex space-x-4">
              <Link to="/terms" className="text-sm hover:text-[hsl(var(--footer-link-hover))]">
                {t('footer.terms')}
              </Link>
              <Link to="/privacy" className="text-sm hover:text-[hsl(var(--footer-link-hover))]">
                {t('footer.privacy')}
              </Link>
            </div>
          </div>
          <p className="text-xs mt-4 text-[hsl(var(--footer-muted))] text-center">
            {t('footer.disclaimer')}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
