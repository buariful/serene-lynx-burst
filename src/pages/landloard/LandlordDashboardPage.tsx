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
import { useTranslation } from "react-i18next";

const sidebarItems = [
  { label: "Listings", icon: Building2, path: "/landlord/dashboard" },
  { label: "Notifications", icon: Bell, path: "/landlord/notifications" },
  { label: "Drafts", icon: Pencil, path: "/landlord/drafts" },
  { label: "Alerts", icon: AlertCircle, path: "/landlord/alerts" },
  { label: "Favourites", icon: Heart, path: "/landlord/favourites" },
  { label: "Account", icon: User2, path: "/landlord/account" },
];

const dummyListings = [
  {
    id: 1,
    address: "123 Main St, Toronto",
    price: "$2,200/mo · 2 Bed · 2 Bath",
    priceValue: 2200,
    status: "Active",
    statusColor: "text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-900",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSRbcrj53mGyk-u4JwrIb6z1RBAeCpxR78gfQ&s",
  },
  {
    id: 2,
    address: "456 King St, Vancouver",
    price: "$1,800/mo · 1 Bed · 1 Bath",
    priceValue: 1800,
    status: "Pending",
    statusColor: "text-yellow-700 dark:text-yellow-400 bg-yellow-100 dark:bg-yellow-900",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTWwZGWnpdqGGBcZm1jkl1v4KboQYjjNhb9Ag&s",
  },
  {
    id: 3,
    address: "789 Queen St, Montreal",
    price: "$2,500/mo · 3 Bed · 2 Bath",
    priceValue: 2500,
    status: "Disabled",
    statusColor: "text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-700",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQd0P-8jGLtQjo5Xcy0YxABxzwUQ5Fwgs0ATQ&s",
  },
];

export default function LandlordDashboardPage() {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("price-asc");

  const tabs = [
    t('landlord.dashboard.tabs.all'),
    t('landlord.dashboard.tabs.active'),
    t('landlord.dashboard.tabs.pending'),
    t('landlord.dashboard.tabs.disabled')
  ];

  const sortOptions = [
    { value: "price-asc", label: t('landlord.dashboard.sortOptions.priceAsc') },
    { value: "price-desc", label: t('landlord.dashboard.sortOptions.priceDesc') },
    { value: "address-asc", label: t('landlord.dashboard.sortOptions.addressAsc') },
    { value: "address-desc", label: t('landlord.dashboard.sortOptions.addressDesc') },
  ];

  let filteredListings = dummyListings;
  if (activeTab !== t('landlord.dashboard.tabs.all')) {
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
        {/* Main Content */}
        <main className="flex-1 p-8">
          {/* Title and Tabs */}
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-bold text-blue-600 dark:text-blue-400 flex items-center gap-2">
              <Building2 className="w-6 h-6" />
              {t('landlord.dashboard.title')}
            </h1>
            <div className="flex gap-6 ml-6 border-b border-gray-200 dark:border-gray-700 flex-1">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  className={`pb-1.5 text-base font-medium transition border-b-2 ${
                    activeTab === tab
                      ? "border-blue-600 dark:border-blue-400 text-blue-600 dark:text-blue-400"
                      : "border-transparent text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400"
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
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder={t('landlord.dashboard.searchPlaceholder')}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-3 py-2.5 rounded-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 text-sm"
              />
            </div>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-5 py-2.5 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 font-medium text-sm border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
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
                className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700 p-4 flex flex-col"
              >
                <img
                  src={listing.image}
                  alt={listing.address}
                  className="w-full h-40 object-cover rounded mb-3"
                />
                <div className="font-semibold text-lg text-blue-600 dark:text-blue-400 mb-1">
                  {listing.address}
                </div>
                <div className="text-gray-500 dark:text-gray-400 mb-1">{listing.price}</div>
                <div
                  className={`text-xs font-medium rounded px-2 py-1 w-max mb-2 ${listing.statusColor}`}
                >
                  {listing.status}
                </div>
                <Link
                  to={`/landlord/property/${listing.id}`}
                  className="mt-auto text-blue-600 dark:text-blue-400 hover:underline text-sm font-medium"
                >
                  {t('landlord.dashboard.viewDetails')}
                </Link>
              </div>
            ))}
          </div>

          {/* Post a Rental */}
          <div className="mt-6 bg-white dark:bg-gray-800 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg flex flex-col items-center justify-center py-8">
            {/* Illustration placeholder */}
            <svg height="48" viewBox="0 0 400 48" fill="none">
              <rect width="400" height="48" fill="currentColor" className="text-gray-300 dark:text-gray-600" />
              {/* You can add your own SVG illustration here */}
            </svg>
            <Link
              // to="/landlord/post-rental"
              to="/login"
              className="mt-3 flex items-center gap-1.5 px-6 py-2.5 bg-blue-600 dark:bg-blue-500 text-white rounded-full font-semibold text-base shadow hover:bg-blue-700 dark:hover:bg-blue-600 transition"
            >
              <Plus className="w-4 h-4" />
              {t('landlord.dashboard.postRental')}
            </Link>
          </div>
        </main>
      </div>
    </LandlordDashboardWrapper>
  );
}
