import DashboardHeader from "@/components/DashboardHeader";
import Footer from "@/components/Footer";
import HospitalHeader from "@/components/HospitalHeader";
import Card2 from "@/components/ui/Card2";
import { useState, useRef, useEffect } from "react";
import React from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { IoIosArrowForward } from "react-icons/io";
import { LuSettings2 } from "react-icons/lu";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { FaArrowRight, FaCheck } from "react-icons/fa";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { FilterNav } from "@/components/ui/filterNav";

type Product = {
  id: string;
  title: string;
  description: string;
  location: string;
  price: string;
  category: string;
  image: string;
};

const LOCATIONS = [
  "Canada",
  "Alberta",
  "British Columbia",
  "Manitoba",
  "New Brunswick",
  "Newfoundland",
  "Nova Scotia",
  "Ontario",
  "Prince Edward Island",
  "Quebec",
  "Saskatchewan",
  "Territories",
];

const CATEGORIES = [
  "Vehicles",
  "Pets",
  "Jobs",
  "Real Estate",
  "Electronics",
  "Home & Garden",
  "Services",
];

const SAMPLE_PRODUCTS: Product[] = [
  {
    id: "1",
    title: "Econoline ford 36...",
    description: "m'autoriser",
    location: "Canada",
    price: "$6,900",
    category: "Vehicles",
    image: "https://via.placeholder.com/150?text=Truck",
  },
  {
    id: "2",
    title: "American bulldogs",
    description: "puppies for sale!",
    location: "Canada",
    price: "$800",
    category: "Pets",
    image: "https://via.placeholder.com/150?text=Dog",
  },
  {
    id: "3",
    title: "Fermentation Technician",
    description: "Rapid...",
    location: "Canada",
    price: "Please Contact",
    category: "Jobs",
    image: "https://via.placeholder.com/150?text=Job",
  },
  {
    id: "4",
    title: "2014 Caterpillar D7E",
    description: "LGP Crawler Doze...",
    location: "Canada",
    price: "$1,234",
    category: "Vehicles",
    image: "https://via.placeholder.com/150?text=Bulldozer",
  },
  {
    id: "5",
    title: "Morkie puppies",
    description: "Bear Mountain",
    location: "Canada",
    price: "$875",
    category: "Pets",
    image: "https://via.placeholder.com/150?text=Puppy",
  },
  {
    id: "6",
    title: "Indian cooking",
    description: "looking for Indian cooking and other...",
    location: "Mississauga / Peel Re...",
    price: "Please Contact",
    category: "Services",
    image: "https://via.placeholder.com/150?text=Food",
  },
  {
    id: "7",
    title: "Econoline ford 36...",
    description: "m'autoriser",
    location: "Canada",
    price: "$6,900",
    category: "Vehicles",
    image: "https://via.placeholder.com/150?text=Truck",
  },
  {
    id: "8",
    title: "American bulldogs",
    description: "puppies for sale!",
    location: "Canada",
    price: "$800",
    category: "Pets",
    image: "https://via.placeholder.com/150?text=Dog",
  },
];

const IMAGE_URLS = [
  "http://img.freepik.com/free-vector/house-rent-concept-background_23-2147779983.jpg",
  "https://img.freepik.com/free-vector/house-rent-abstract-concept-vector-illustration-booking-house-online-best-rental-property-real-estate-service-accommodation-marketplace-rental-listing-monthly-rent-abstract-metaphor_335657-1954.jpg?semt=ais_hybrid&w=740",
];

function ProductCard({
  product,
  imageIndex = 0,
}: {
  product: Product;
  imageIndex?: number;
}) {
  const navigate = useNavigate();
  return (
    <div
      className="border rounded overflow-hidden hover:shadow-sm transition-shadow w-40 min-w-0 cursor-pointer hover:ring-2 hover:ring-blue-400"
      onClick={() => navigate(`/hospital/product/${product.id}`)}
      role="button"
      tabIndex={0}
      onKeyPress={(e) => {
        if (e.key === "Enter") navigate(`/hospital/product/${product.id}`);
      }}
    >
      <div className="h-20 bg-gray-200">
        <img
          src={IMAGE_URLS[imageIndex % IMAGE_URLS.length]}
          alt={product.title}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-1">
        <h3 className="font-bold text-sm mb-1 truncate">{product.title}</h3>
        <p className="text-gray-600 text-sm mb-1 truncate">
          {product.description}
        </p>
        <div className="flex justify-between flex-col">
          <span className="text-gray-500 text-sm truncate">
            {product.location}
          </span>
          <span
            className={`font-semibold ${
              product.price === "Please Contact"
                ? "text-blue-600"
                : "text-green-600"
            } text-sm`}
          >
            {product.price}
          </span>
        </div>
      </div>
    </div>
  );
}

export default function HospitalMarketplacePage() {
  const [selectedLocation, setSelectedLocation] = useState<string>("Canada");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [showSidebar, setShowSidebar] = useState<boolean>(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const profileMenuRef = useRef<HTMLDivElement>(null);
  const [searchInput, setSearchInput] = useState<string>("");
  const [searchParams] = useSearchParams();
  const q = searchParams.get("q");

  // Show sidebar if a category is selected (not 'All') or search is active
  useEffect(() => {
    if (selectedCategory !== "All" || searchQuery.trim() !== "") {
      setShowSidebar(true);
    } else {
      setShowSidebar(false);
    }
  }, [selectedCategory, searchQuery]);

  const isSearchActive = searchQuery.trim() !== "";

  // Close dropdown on outside click
  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        profileMenuRef.current &&
        !profileMenuRef.current.contains(event.target as Node)
      ) {
        setShowProfileMenu(false);
      }
    }
    if (showProfileMenu) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showProfileMenu]);

  const handleSearch = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setSearchQuery(searchInput);
  };

  const handleBackToMain = () => {
    setSearchQuery("");
    setSearchInput("");
    setSelectedCategory("All");
  };

  const filteredProducts = SAMPLE_PRODUCTS.filter((product) => {
    const matchesLocation =
      selectedLocation === "All" || product.location.includes(selectedLocation);
    const matchesCategory =
      selectedCategory === "All" || product.category === selectedCategory;
    const matchesSearch =
      product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesLocation && matchesCategory && matchesSearch;
  });

  return (
    <>
      {/* <DashboardHeader /> */}
      <HospitalHeader />

      <div className="max-w-7xl mx-auto px-4 py-8 flex min-h-[80vh]">
        {/* Sidebar for categories */}
        <aside className="w-48 mr-6 flex-shrink-0">
          <div className="bg-white border rounded shadow-sm p-2 sticky top-4">
            <h3 className=" font-semibold mb-2 text-[#3e4153]">Categories</h3>
            <ul className="space-y-1">
              <li>
                <button
                  className={`w-full text-left px-2 py-1 rounded  transition-colors ${
                    selectedCategory === "All"
                      ? "bg-blue-600 text-white"
                      : "hover:bg-gray-100 text-gray-700"
                  }`}
                  onClick={() => setSelectedCategory("All")}
                >
                  All Categories
                </button>
              </li>
              {CATEGORIES.map((category) => (
                <li key={category}>
                  <button
                    className={`w-full text-left px-2 py-1 rounded  transition-colors ${
                      selectedCategory === category
                        ? "bg-blue-600 text-white"
                        : "hover:bg-gray-100 text-gray-700"
                    }`}
                    onClick={() => setSelectedCategory(category)}
                  >
                    {category}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </aside>

        <div className={showSidebar ? "flex-1" : "w-full"}>
          {/* Compact Nav/Filter Bar */}
          <h2 className="text-[#3e4153] text-2xl  font-semibold">
            {q ? q : "Jobs"} in Canada
          </h2>

          <FilterNav
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />

          {/* Header */}
          {/* <div className="text-center mb-8">
            <h1 className="text-xl font-semibold mb-2 text-gray-500">
              Canada's most trusted and loved marketplace
            </h1>
          </div> */}

          {/* If searching, only show search results and a back button */}
          {isSearchActive ? (
            <>
              <div className="mb-4 flex justify-between items-center">
                <span className="text-xs text-gray-500">
                  Showing search results for:{" "}
                  <span className="font-semibold">{searchQuery}</span>
                </span>
                <button
                  onClick={handleBackToMain}
                  className="text-xs text-blue-600 border border-blue-100 rounded px-3 py-1 hover:bg-blue-50 ml-2"
                >
                  Back to Main Page
                </button>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3  gap-5 mb-10">
                {filteredProducts.length > 0 ? (
                  filteredProducts.map((product, idx) => (
                    <Card2 key={product.id} />
                  ))
                ) : (
                  <div className="col-span-full text-center text-gray-400 py-8">
                    No results found.
                  </div>
                )}
              </div>
            </>
          ) : (
            <>
              {/* Only display all filtered items in a single grid, no section titles */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mb-4">
                {filteredProducts.map((product, idx) => (
                  <Card2 key={product.id} />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}
