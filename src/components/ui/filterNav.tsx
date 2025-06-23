import React from "react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "./drawer";
import { Button } from "./button";
import { IoIosArrowForward } from "react-icons/io";
import { LuSettings2 } from "react-icons/lu";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./accordion";
import { FaCheck } from "react-icons/fa";

function FilterNav({ selectedCategory, setSelectedCategory }) {
  const CATEGORIES = [
    "Vehicles",
    "Pets",
    "Jobs",
    "Real Estate",
    "Electronics",
    "Home & Garden",
    "Services",
  ];

  const [selectedJobType, setSelectedJobType] = React.useState<string[]>([]);
  const [selectedJobOfferedBy, setSelectedJobOfferedBy] = React.useState<
    string[]
  >([]);

  const jobTypes = [
    "Full-Time",
    "Part-Time",
    "Contract",
    "Temporary",
    "Please Contact",
  ];

  const jobOfferedByItems = ["Individual", "Professional Employer"];

  const handleSelectJobType = (jobType: string) => {
    if (selectedJobType.includes(jobType)) {
      setSelectedJobType(selectedJobType.filter((item) => item !== jobType));
    } else {
      const copyJobType = [...selectedJobType];
      copyJobType.push(jobType);
      setSelectedJobType(copyJobType);
    }
  };

  const handleSelectJobOfferedBy = (offeredBy: string) => {
    if (selectedJobOfferedBy.includes(offeredBy)) {
      setSelectedJobOfferedBy(
        selectedJobOfferedBy.filter((item) => item !== offeredBy)
      );
    } else {
      const copyJobOfferedBy = [...selectedJobOfferedBy];
      copyJobOfferedBy.push(offeredBy);
      setSelectedJobOfferedBy(copyJobOfferedBy);
    }
  };

  const handleClearFilter = () => {
    setSelectedCategory("All");
    setSelectedJobOfferedBy([]);
    setSelectedJobType([]);
  };

  return (
    <div className="mb-4 p-2  rounded-md shadow-sm gap-3 bg-white flex items-center ">
      {/* <form onSubmit={handleSearch} className="flex-1 flex gap-2">
      <input
        type="text"
        placeholder="Search for anything..."
        className="p-2 border rounded flex-1 min-w-0"
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
      />
      <Button type="submit">Search</Button>
    </form> */}

      <Drawer direction="right">
        <div className="flex gap-2">
          <DrawerTrigger asChild>
            <Button
              variant="outline"
              className=" rounded-full flex items-center gap-3"
            >
              <span>Price</span>
              <IoIosArrowForward />
            </Button>
          </DrawerTrigger>
          <DrawerTrigger asChild>
            <Button
              variant="outline"
              className=" rounded-full flex items-center gap-3"
            >
              <span>Price Type</span>
              <IoIosArrowForward />
            </Button>
          </DrawerTrigger>

          <DrawerTrigger asChild>
            <Button
              variant="outline"
              className=" rounded-full flex items-center gap-3"
            >
              <span>Job Type</span>
              <IoIosArrowForward />
            </Button>
          </DrawerTrigger>
          <DrawerTrigger asChild>
            <Button
              variant="outline"
              className="bg-blue-500 hover:bg-blue-600 hover:text-white text-white rounded-full flex items-center gap-1"
            >
              <LuSettings2 />
              <span>All Filters</span>
            </Button>
          </DrawerTrigger>
        </div>
        <DrawerContent className="h-full w-96">
          <DrawerHeader>
            <DrawerTitle>Filters</DrawerTitle>
          </DrawerHeader>
          <div className="p-4">
            <Accordion type="single" collapsible defaultValue="categories">
              <AccordionItem value="categories">
                <AccordionTrigger>
                  <div className="justify-start">Categories</div>
                </AccordionTrigger>
                <AccordionContent>
                  <ul className="space-y-1">
                    {CATEGORIES.map((category) => (
                      <li key={category} className="pl-2 py-1">
                        <DrawerClose asChild>
                          <button
                            className={`w-full text-left px-2 py-1 rounded transition-colors ${
                              selectedCategory === category
                                ? "bg-blue-600 text-white"
                                : "hover:bg-gray-100 text-gray-700"
                            }`}
                            onClick={() => setSelectedCategory(category)}
                          >
                            {category}
                          </button>
                        </DrawerClose>
                      </li>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>

              {/* price type */}
              <AccordionItem value="price-type">
                <AccordionTrigger>Price Type</AccordionTrigger>
                <AccordionContent>
                  <ul className="space-y-1">
                    {["Free", "Contact", "Swap/Trade"].map((jobType) => (
                      <li key={jobType} className="pl-2 py-1">
                        <div className="flex gap-2 items-center">
                          <input
                            type="radio"
                            name={"jobType"}
                            id={jobType}
                            className="h-4 w-4"
                          />
                          <label
                            htmlFor={jobType}
                            className="hover:cursor-pointer text-gray-700"
                          >
                            {jobType}
                          </label>
                        </div>
                      </li>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>

              {/* offer type */}
              <AccordionItem value="price-type">
                <AccordionTrigger>Offer Type</AccordionTrigger>
                <AccordionContent>
                  <ul className="space-y-1">
                    {["Offering", "Wanted"].map((offeringType) => (
                      <li key={offeringType} className="pl-2 py-1">
                        <div className="flex gap-2 items-center">
                          <input
                            type="radio"
                            name={"offeringType"}
                            id={offeringType}
                            className="h-4 w-4"
                          />
                          <label
                            htmlFor={offeringType}
                            className="hover:cursor-pointer text-gray-700"
                          >
                            {offeringType}
                          </label>
                        </div>
                      </li>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>

              {/* job type */}
              <AccordionItem value="job-type">
                <AccordionTrigger>Job Type</AccordionTrigger>
                <AccordionContent>
                  <ul className="flex items-center flex-wrap gap-2">
                    {jobTypes.map((jobType) => (
                      <li key={jobType} className="pl-2 py-1">
                        <Button
                          variant="outline"
                          className={`${
                            selectedJobType?.includes(jobType)
                              ? "text-blue-500 flex items-center gap-1 bg-blue-200 border-blue-500"
                              : ""
                          }`}
                          onClick={() => {
                            handleSelectJobType(jobType);
                          }}
                        >
                          {selectedJobType?.includes(jobType) ? (
                            <FaCheck />
                          ) : null}{" "}
                          {jobType}
                        </Button>
                      </li>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>

              {/* offered by */}
              <AccordionItem value="job-type">
                <AccordionTrigger>Job Offered By</AccordionTrigger>
                <AccordionContent>
                  <ul className="flex items-center flex-wrap gap-2">
                    {jobOfferedByItems.map((offeredBy) => (
                      <li key={offeredBy} className="pl-2 py-1">
                        <Button
                          variant="outline"
                          className={`${
                            selectedJobOfferedBy?.includes(offeredBy)
                              ? "text-blue-500 flex items-center gap-1 bg-blue-200 border-blue-500"
                              : ""
                          }`}
                          onClick={() => {
                            handleSelectJobOfferedBy(offeredBy);
                          }}
                        >
                          {selectedJobOfferedBy?.includes(offeredBy) ? (
                            <FaCheck />
                          ) : null}{" "}
                          {offeredBy}
                        </Button>
                      </li>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
          <DrawerFooter>
            <DrawerClose asChild>
              <div className="flex items-center gap-2 justify-between">
                <button
                  onClick={handleClearFilter}
                  className="text-blue-500 hover:underline font-medium"
                >
                  Clear Filters
                </button>
                <Button>Apply</Button>
              </div>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  );
}
export { FilterNav };
