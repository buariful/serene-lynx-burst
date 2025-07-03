import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Building2,
  Bell,
  Pencil,
  AlertCircle,
  Heart,
  User2,
  Search,
  ChevronDown,
  Plus,
} from "lucide-react";
import LandlordDashboardWrapper from "@/components/LandlordDashboardWrapper";

const sidebarItems = [
  { label: "Listings", icon: Building2, path: "/landlord/dashboard" },
  { label: "Notifications", icon: Bell, path: "/landlord/notifications" },
  { label: "Drafts", icon: Pencil, path: "/landlord/drafts" },
  { label: "Alerts", icon: AlertCircle, path: "/landlord/alerts" },
  { label: "Favourites", icon: Heart, path: "/landlord/favourites" },
  { label: "Account", icon: User2, path: "/landlord/account" },
];

const tabs = ["All", "Active", "Pending", "Disabled"];

const dummyListings = [
  {
    id: 1,
    address: "123 Main St, Toronto",
    price: "$2,200/mo · 2 Bed · 2 Bath",
    priceValue: 2200,
    status: "Active",
    statusColor: "text-green-600 bg-green-100",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSRbcrj53mGyk-u4JwrIb6z1RBAeCpxR78gfQ&s",
  },
  {
    id: 2,
    address: "456 King St, Vancouver",
    price: "$1,800/mo · 1 Bed · 1 Bath",
    priceValue: 1800,
    status: "Pending",
    statusColor: "text-yellow-700 bg-yellow-100",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTWwZGWnpdqGGBcZm1jkl1v4KboQYjjNhb9Ag&s",
  },
  {
    id: 3,
    address: "789 Queen St, Montreal",
    price: "$2,500/mo · 3 Bed · 2 Bath",
    priceValue: 2500,
    status: "Disabled",
    statusColor: "text-gray-600 bg-gray-100",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQd0P-8jGLtQjo5Xcy0YxABxzwUQ5Fwgs0ATQ&s",
  },
];

const sortOptions = [
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "address-asc", label: "Address: A-Z" },
  { value: "address-desc", label: "Address: Z-A" },
];

export default function LandlordDashboardPage() {
  const [activeTab, setActiveTab] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("price-asc");

  let filteredListings = dummyListings;
  if (activeTab !== "All") {
    filteredListings = filteredListings.filter((l) => l.status === activeTab);
  }
  if (searchTerm.trim() !== "") {
    filteredListings = filteredListings.filter((l) =>
      l.address.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }
  if (sortBy === "price-asc") {
    filteredListings = [...filteredListings].sort(
      (a, b) => a.priceValue - b.priceValue
    );
  } else if (sortBy === "price-desc") {
    filteredListings = [...filteredListings].sort(
      (a, b) => b.priceValue - a.priceValue
    );
  } else if (sortBy === "address-asc") {
    filteredListings = [...filteredListings].sort((a, b) =>
      a.address.localeCompare(b.address)
    );
  } else if (sortBy === "address-desc") {
    filteredListings = [...filteredListings].sort((a, b) =>
      b.address.localeCompare(a.address)
    );
  }

  return (
    <LandlordDashboardWrapper>
      <div className="flex min-h-screen">
        {/* Sidebar */}
        {/* <aside className="w-56 p-6">
          <nav className="flex flex-col gap-1">
            {sidebarItems.map((item) => (
              <Link
                key={item.label}
                to={item.path}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-full font-medium text-base transition text-[#7a9ca5] hover:bg-white/80 hover:text-[#2563eb]`}
              >
                <item.icon className="w-4 h-4" />
                {item.label}
              </Link>
            ))}
          </nav>
        </aside> */}

        {/* Main Content */}
        <main className="flex-1 p-8">
          {/* Title and Tabs */}
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-bold text-[#2563eb] flex items-center gap-2">
              <Building2 className="w-6 h-6" />
              Listings
            </h1>
            <div className="flex gap-6 ml-6 border-b border-[#e3e8ee] flex-1">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  className={`pb-1.5 text-base font-medium transition border-b-2 ${
                    activeTab === tab
                      ? "border-[#2563eb] text-[#2563eb]"
                      : "border-transparent text-[#7a9ca5] hover:text-[#2563eb]"
                  }`}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {/* Search and Sort */}
          <div className="flex items-center gap-3 mt-8">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#7a9ca5] w-4 h-4" />
              <input
                type="text"
                placeholder="Search by Address"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-3 py-2.5 rounded-full border border-[#e3e8ee] bg-white text-[#2563eb] focus:outline-none text-sm"
              />
            </div>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-5 py-2.5 rounded-full bg-[#e3e8ee] text-[#2563eb] font-medium text-sm border-none focus:ring-2 focus:ring-blue-200"
            >
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          {/* Dummy Listing Items */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredListings.map((listing) => (
              <div
                key={listing.id}
                className="bg-white rounded-lg shadow border border-[#e3e8ee] p-4 flex flex-col"
              >
                <img
                  src={listing.image}
                  alt={listing.address}
                  className="w-full h-40 object-cover rounded mb-3"
                />
                <div className="font-semibold text-lg text-[#2563eb] mb-1">
                  {listing.address}
                </div>
                <div className="text-[#7a9ca5] mb-1">{listing.price}</div>
                <div
                  className={`text-xs font-medium rounded px-2 py-1 w-max mb-2 ${listing.statusColor}`}
                >
                  {listing.status}
                </div>
                <Link
                  to={`/landlord/property/${listing.id}`}
                  className="mt-auto text-[#2563eb] hover:underline text-sm font-medium"
                >
                  View Details
                </Link>
              </div>
            ))}
          </div>

          {/* Post a Rental */}
          <div className="mt-6 bg-white border-2 border-dashed border-[#b6d6e2] rounded-lg flex flex-col items-center justify-center py-8">
            {/* Illustration placeholder */}
            <svg height="48" viewBox="0 0 400 48" fill="none">
              <rect width="400" height="48" fill="#e3e8ee" />
              {/* You can add your own SVG illustration here */}
            </svg>
            <Link
              // to="/landlord/post-rental"
              to="/login"
              className="mt-3 flex items-center gap-1.5 px-6 py-2.5 bg-[#2563eb] text-white rounded-full font-semibold text-base shadow hover:bg-[#1d4fd7] transition"
            >
              <Plus className="w-4 h-4" />
              Post a Rental
            </Link>
          </div>
        </main>
      </div>
    </LandlordDashboardWrapper>
  );
}
