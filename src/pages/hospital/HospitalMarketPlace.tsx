import DashboardHeader from "@/components/DashboardHeader";
import Footer from "@/components/Footer";
import HospitalHeader from "@/components/HospitalHeader";
import { useState, useRef } from "react";
import React from "react";
import { useNavigate } from "react-router-dom";

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
      className="border rounded overflow-hidden hover:shadow-sm transition-shadow w-48 min-w-0 cursor-pointer hover:ring-2 hover:ring-blue-400"
      onClick={() => navigate(`/hospital/product/${product.id}`)}
      role="button"
      tabIndex={0}
      onKeyPress={(e) => {
        if (e.key === "Enter") navigate(`/hospital/product/${product.id}`);
      }}
    >
      <div className="h-24 bg-gray-200">
        <img
          src={IMAGE_URLS[imageIndex % IMAGE_URLS.length]}
          alt={product.title}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-2">
        <h3 className="font-bold text-xs mb-1 truncate">{product.title}</h3>
        <p className="text-gray-600 text-[10px] mb-1 truncate">
          {product.description}
        </p>
        <div className="flex justify-between flex-col">
          <span className="text-gray-500 text-[10px] truncate">
            {product.location}
          </span>
          <span
            className={`font-semibold ${
              product.price === "Please Contact"
                ? "text-blue-600"
                : "text-green-600"
            } text-xs`}
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
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const profileMenuRef = useRef<HTMLDivElement>(null);

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

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-lg font-semibold mb-2 text-gray-500">
            Canada's most trusted and loved marketplace
          </h1>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-center gap-3 mb-8 w-full">
          <input
            type="text"
            placeholder="Search for anything..."
            className="p-2 border rounded flex-1 min-w-0 md:max-w-xs"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <div className="flex flex-col w-full md:w-auto">
            <label className="block text-xs font-medium mb-1 md:mb-0 md:sr-only">
              Location
            </label>
            <select
              className="p-2 border rounded md:min-w-[140px]"
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
            >
              <option value="All">All Locations</option>
              {LOCATIONS.map((location) => (
                <option key={location} value={location}>
                  {location}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col w-full md:w-auto">
            <label className="block text-xs font-medium mb-1 md:mb-0 md:sr-only">
              Category
            </label>
            <select
              className="p-2 border rounded md:min-w-[140px]"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="All">All Categories</option>
              {CATEGORIES.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Recommended Section */}
        <h2 className="text-[#3e4153] text-[18px] mb-4">Recommended for you</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3 mb-8">
          {filteredProducts.map((product, idx) => (
            <ProductCard key={product.id} product={product} imageIndex={idx} />
          ))}
        </div>

        {/* Popular listings in Real Estate */}
        <h2 className="text-[#3e4153] text-[18px] mb-4">
          Popular listings in Real Estate
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3 mb-8">
          {SAMPLE_PRODUCTS.filter((p) => p.category === "Vehicles")
            .slice(0, 3)
            .map((product, idx) => (
              <ProductCard
                key={product.id}
                product={product}
                imageIndex={idx + 1}
              />
            ))}
        </div>

        {/* Popular listings in Autos */}
        <h2 className="text-[#3e4153] text-[18px] mb-4">
          Popular listings in Autos
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3 mb-8">
          {SAMPLE_PRODUCTS.filter((p) => p.category === "Vehicles")
            .slice(0, 4)
            .map((product, idx) => (
              <ProductCard
                key={product.id}
                product={product}
                imageIndex={idx + 1}
              />
            ))}
        </div>

        {/* All Listings */}
        <h2 className="text-[#3e4153] text-[18px] mb-4">Homepage Gallery</h2>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3 mb-8">
          {filteredProducts.map((product, idx) => (
            <ProductCard key={product.id} product={product} imageIndex={idx} />
          ))}
          {/* Your Ad Here placeholder */}
          <div className="border rounded p-2 flex flex-col items-center justify-center bg-gray-50 w-48 min-w-0">
            <div className="text-gray-500 mb-1 text-xs">Your Ad here</div>
            <button className="text-blue-600 hover:underline text-xs">
              See All
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
