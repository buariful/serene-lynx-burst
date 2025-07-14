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
  return (
    <div className="p-6 text-white text-xs bg-gray-900">
      <h1 className="text-xl font-bold mb-4">Search by Medical Schools</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 ">
        {/* Popular Locations Column */}
        <div>
          <h2 className="font-semibold mb-3">Popular Locations</h2>
          <ul className="space-y-2">
            {popularMedicalShcools?.map((item, index) => (
              <li key={item + index} className="w-full ">
                <Link
                  to="/apartment"
                  className="hover:text-blue-300 hover:underline text-xs"
                >
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Canada Column */}
        <div className="">
          <h2 className="font-semibold mb-3">Canada (6E2)</h2>
          <Accordion
            type="single"
            collapsible
            className="w-full bg-transparent text-white"
          >
            {provinceMedicalSchools.map((province) => (
              <AccordionItem value={province.name} key={province.name}>
                <AccordionTrigger className="text-white hover:text-blue-300">
                  {province.name}
                </AccordionTrigger>
                <AccordionContent>
                  <ul className="pl-4 max-h-[80px] overflow-auto">
                    {province.children.map((schools) => (
                      <li key={schools}>
                        <Link
                          to="/apartment"
                          className="hover:text-blue-300 hover:underline text-xs"
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
