import React from "react";
import { Link } from "react-router-dom";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "./ui/accordion";

const popularMedicalShcools = [
  "Western University Schulich Schools of Medicine",
  "McMaster University",
  "University of Ottawa",
  "University of Calgary",
  "McGill University",
  "University of Alberta",
  "University of Manitoba",
  "Dalhousie Medical Schools-Halifax and New Brunswick Campus",
];

const provinceMedicalSchools = [
  {
    name: "Alberta",
    children: [
      "University of Alberta",
      "University of Calgary",
      "University of Alberta - Calgary Campus",
    ],
  },
  {
    name: "British Columbia",
    children: [
      "University of British Columbia",
      "UBC – Island Medical Program (UVic)",
      "UBC – Northern Medical Program (UNBC)",
      "UBC – Southern Medical Program (UBCO)",
    ],
  },
  {
    name: "Manitoba",
    children: ["University of Manitoba"],
  },
  {
    name: "New Brunswick",
    children: [
      "Dalhousie Medicine New Brunswick",
      "Université de Moncton – NB Campus",
    ],
  },
  {
    name: "Newfoundland and Labrador",
    children: ["Memorial University of Newfoundland"],
  },
  {
    name: "Nova Scotia",
    children: [
      "Dalhousie University",
      "Dalhousie University – Cape Breton Site",
    ],
  },
  {
    name: "Ontario",
    children: [
      "University of Toronto",
      "McMaster University",
      "Western University",
      "Queen's University",
      "University of Ottawa",
      "Northern Ontario Schools of Medicine (NOSM) – Laurentian University",
      "Northern Ontario Schools of Medicine (NOSM) – Lakehead University",
      "Toronto Metropolitan University (proposed medical schools in Brampton)",
    ],
  },
  {
    name: "Prince Edward Island",
    children: [
      "UPEI Faculty of Medicine",
      "Memorial University – PEI Collaborative Program",
    ],
  },
  {
    name: "Quebec",
    children: [
      "McGill University",
      "Université de Montréal",
      "Université Laval",
      "Université de Sherbrooke",
      "McGill University – Outaouais Campus",
      "Université de Montréal – Mauricie Campus",
    ],
  },
  {
    name: "Saskatchewan",
    children: [
      "University of Saskatchewan",
      "University of Saskatchewan – Regina Campus",
    ],
  },
];

const CanadianLocationsMegamenu = () => {
  // Split provinces into left and right columns
  const leftProvinces = provinceMedicalSchools.slice(0, 5);
  const rightProvinces = provinceMedicalSchools.slice(5);

  return (
    <div className="p-3 text-gray-900 dark:text-white text-xs bg-white dark:bg-gray-900">
      <h1 className="text-lg font-bold mb-3">Search by Medical Schools</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Popular Locations Column */}
        <div className="lg:col-span-1">
          <h2 className="font-semibold mb-2 text-sm">Popular Locations</h2>
          <ul className="space-y-1">
            {popularMedicalShcools?.map((item, index) => (
              <li key={item + index} className="w-full">
                <Link
                  to="/apartment"
                  className="hover:text-blue-600 dark:hover:text-blue-300 hover:underline text-xs text-gray-700 dark:text-gray-300 block py-0.5"
                >
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Left Provinces Column */}
        <div className="lg:col-span-1">
          <h2 className="font-semibold mb-2 text-sm">Provinces</h2>
          <Accordion
            type="single"
            collapsible
            className="w-full bg-transparent text-gray-900 dark:text-white"
          >
            {leftProvinces.map((province) => (
              <AccordionItem value={province.name} key={province.name}>
                <AccordionTrigger className="text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-300 text-xs py-1">
                  {province.name}
                </AccordionTrigger>
                <AccordionContent>
                  <ul className="pl-3 space-y-0.5 max-h-24 overflow-auto">
                    {province.children.map((schools) => (
                      <li key={schools}>
                        <Link
                          to="/apartment"
                          className="hover:text-blue-600 dark:hover:text-blue-300 hover:underline text-xs text-gray-700 dark:text-gray-300 block py-0.5"
                        >
                          {schools}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        {/* Right Provinces Column */}
        <div className="lg:col-span-1">
          <h2 className="font-semibold mb-2 text-sm">More Provinces</h2>
          <Accordion
            type="single"
            collapsible
            className="w-full bg-transparent text-gray-900 dark:text-white"
          >
            {rightProvinces.map((province) => (
              <AccordionItem value={province.name} key={province.name}>
                <AccordionTrigger className="text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-300 text-xs py-1">
                  {province.name}
                </AccordionTrigger>
                <AccordionContent>
                  <ul className="pl-3 space-y-0.5 max-h-24 overflow-auto">
                    {province.children.map((schools) => (
                      <li key={schools}>
                        <Link
                          to="/apartment"
                          className="hover:text-blue-600 dark:hover:text-blue-300 hover:underline text-xs text-gray-700 dark:text-gray-300 block py-0.5"
                        >
                          {schools}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </div>
  );
};

export default CanadianLocationsMegamenu;
