import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import DashboardHeader from "@/components/DashboardHeader";
import Footer from "@/components/Footer";
import { Search } from "lucide-react";
import { useTranslation } from 'react-i18next';

const RENTAL_CATEGORIES = [
  "All",
  "Apartments",
  "Rooms",
  "Houses",
  "Condos",
  "Basements",
  "Shared Accommodation",
  "Other Rentals",
  "Jobs",
];

const RENTALS = [
  {
    id: 1,
    title: "Downtown Apartment",
    address: "123 King St, Toronto",
    price: "$1,500/mo",
    beds: 2,
    baths: 1,
    image:
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80",
    description: "Modern 2-bedroom apartment in the heart of Toronto.",
    category: "Apartments",
  },
  {
    id: 2,
    title: "Cozy Room in Shared House",
    address: "456 Queen St, Toronto",
    price: "$700/mo",
    beds: 1,
    baths: 1,
    image:
      "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80",
    description: "Furnished room available in a friendly shared house.",
    category: "Rooms",
  },
  {
    id: 3,
    title: "Family House",
    address: "789 Bloor St, Toronto",
    price: "$2,200/mo",
    beds: 3,
    baths: 2,
    image:
      "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=400&q=80",
    description: "Spacious 3-bedroom house with backyard.",
    category: "Houses",
  },
];

const JOBS = [
  {
    id: 156,
    title: "Registered Nurse",
    company: "Mercy Hospital",
    location: "Toronto, ON",
    salary: "$3,200/mo",
    type: "Full-time",
    description:
      "Provide patient care and support in a busy hospitalsenvironment.",
    category: "Jobs",
  },
  {
    id: 157,
    title: "Lab Technician",
    company: "HealthCare Plus",
    location: "Ottawa, ON",
    salary: "$2,800/mo",
    type: "Part-time",
    description: "Assist in laboratory tests and sample processing.",
    category: "Jobs",
  },
];

export default function TenantMarketplacePage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [activeTab, setActiveTab] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("price-asc");
  const navigate = useNavigate();
  const { t } = useTranslation();

  const sortOptions = [
    { value: "price-asc", label: t('tenant.marketplace.sortOptions.priceAsc') },
    { value: "price-desc", label: t('tenant.marketplace.sortOptions.priceDesc') },
    { value: "title-asc", label: t('tenant.marketplace.sortOptions.titleAsc') },
    { value: "title-desc", label: t('tenant.marketplace.sortOptions.titleDesc') },
  ];

  // Tabs: All, Rentals, Jobs
  const tabs = ["All", "Rentals", "Jobs"];

  // Filtered items
  let filteredRentals = RENTALS;
  let filteredJobs = JOBS;
  if (activeTab === "Rentals") {
    filteredJobs = [];
  } else if (activeTab === "Jobs") {
    filteredRentals = [];
  }
  if (selectedCategory !== "All") {
    filteredRentals = filteredRentals.filter(
      (r) => r.category === selectedCategory
    );
    filteredJobs = filteredJobs.filter((j) => j.category === selectedCategory);
  }
  if (searchTerm.trim() !== "") {
    filteredRentals = filteredRentals.filter(
      (r) =>
        r.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        r.address.toLowerCase().includes(searchTerm.toLowerCase())
    );
    filteredJobs = filteredJobs.filter(
      (j) =>
        j.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (j.company &&
          j.company.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  }
  if (sortBy === "price-asc") {
    filteredRentals = [...filteredRentals].sort((a, b) => {
      const aPrice = parseInt(a.price.replace(/[^0-9]/g, ""), 10);
      const bPrice = parseInt(b.price.replace(/[^0-9]/g, ""), 10);
      return aPrice - bPrice;
    });
  } else if (sortBy === "price-desc") {
    filteredRentals = [...filteredRentals].sort((a, b) => {
      const aPrice = parseInt(a.price.replace(/[^0-9]/g, ""), 10);
      const bPrice = parseInt(b.price.replace(/[^0-9]/g, ""), 10);
      return bPrice - aPrice;
    });
  } else if (sortBy === "title-asc") {
    filteredRentals = [...filteredRentals].sort((a, b) =>
      a.title.localeCompare(b.title)
    );
    filteredJobs = [...filteredJobs].sort((a, b) =>
      a.title.localeCompare(b.title)
    );
  } else if (sortBy === "title-desc") {
    filteredRentals = [...filteredRentals].sort((a, b) =>
      b.title.localeCompare(a.title)
    );
    filteredJobs = [...filteredJobs].sort((a, b) =>
      b.title.localeCompare(a.title)
    );
  }

  return (
    <>
      <DashboardHeader />
      <div className="max-w-7xl mx-auto px-4 py-8 flex min-h-[80vh] bg-gray-50 dark:bg-gray-900">
        {/* Sidebar for categories */}
        <aside className="w-48 mr-6 flex-shrink-0">
          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm p-4 sticky top-4">
            <h3 className="font-semibold mb-3 text-gray-800 dark:text-gray-200">
              {t('tenant.marketplace.categories')}
            </h3>
            <ul className="space-y-1">
              {RENTAL_CATEGORIES.map((category) => (
                <li key={category}>
                  <button
                    className={`w-full text-left px-3 py-2 rounded-md transition-colors text-sm ${
                      selectedCategory === category
                        ? "bg-blue-600 text-white dark:bg-blue-500"
                        : "hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
                    }`}
                    onClick={() => setSelectedCategory(category)}
                  >
                    {category === "All" && t('tenant.marketplace.categoryNames.all')}
                    {category === "Apartments" && t('tenant.marketplace.categoryNames.apartments')}
                    {category === "Rooms" && t('tenant.marketplace.categoryNames.rooms')}
                    {category === "Houses" && t('tenant.marketplace.categoryNames.houses')}
                    {category === "Condos" && t('tenant.marketplace.categoryNames.condos')}
                    {category === "Basements" && t('tenant.marketplace.categoryNames.basements')}
                    {category === "Shared Accommodation" && t('tenant.marketplace.categoryNames.sharedAccommodation')}
                    {category === "Other Rentals" && t('tenant.marketplace.categoryNames.otherRentals')}
                    {category === "Jobs" && t('tenant.marketplace.categoryNames.jobs')}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </aside>

        <div className="flex-1">
          {/* Tabs */}
          <div className="flex items-center gap-4 mb-6">
            <h2 className="text-2xl font-bold text-blue-600 dark:text-blue-400 flex items-center gap-2">
              {t('tenant.marketplace.title')}
            </h2>
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
                  {tab === "All" && t('tenant.marketplace.tabs.all')}
                  {tab === "Rentals" && t('tenant.marketplace.tabs.rentals')}
                  {tab === "Jobs" && t('tenant.marketplace.tabs.jobs')}
                </button>
              ))}
            </div>
          </div>
          {/* Search and Sort */}
          <div className="flex items-center gap-3 mb-8">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 w-4 h-4" />
              <input
                type="text"
                placeholder={t('tenant.marketplace.searchPlaceholder')}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-3 py-2.5 rounded-full border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 text-sm"
              />
            </div>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-5 py-2.5 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 font-medium text-sm border border-gray-200 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:outline-none"
            >
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
          {/* Listings Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
            {/* Jobs */}
            {filteredJobs.map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
            {/* Rentals */}
            {filteredRentals.map((rental) => (
              <RentalCard key={rental.id} rental={rental} />
            ))}
          </div>
          {filteredJobs.length === 0 && filteredRentals.length === 0 && (
            <div className="text-center text-gray-500 dark:text-gray-400 py-8">
              {t('tenant.marketplace.noListingsFound')}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}

function RentalCard({ rental }: { rental: (typeof RENTALS)[number] }) {
  const navigate = useNavigate();
  const { t } = useTranslation();
  return (
    <div
      className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden hover:shadow-lg transition-shadow cursor-pointer hover:ring-2 hover:ring-blue-400 dark:hover:ring-blue-500 bg-white dark:bg-gray-800"
      onClick={() => navigate(`/toronto/${encodeURIComponent(rental.address)}`)}
      role="button"
      tabIndex={0}
      onKeyPress={(e) => {
        if (e.key === "Enter")
          navigate(`/toronto/${encodeURIComponent(rental.address)}`);
      }}
    >
      <div className="h-32 bg-gray-200 dark:bg-gray-700">
        <img
          src={rental.image}
          alt={rental.title}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-4">
        <h3 className="font-bold text-sm mb-1 truncate text-gray-900 dark:text-gray-100">{rental.title}</h3>
        <p className="text-gray-600 dark:text-gray-400 text-xs mb-2 truncate">{rental.address}</p>
        <div className="flex flex-col gap-1">
          <span className="text-xs text-gray-500 dark:text-gray-400">
            {rental.beds} {t('tenant.marketplace.beds')} • {rental.baths} {t('tenant.marketplace.bath')}
          </span>
          <span className="text-xs font-semibold text-green-600 dark:text-green-400">
            {rental.price}
          </span>
        </div>
      </div>
    </div>
  );
}

function JobCard({ job }: { job: (typeof JOBS)[number] }) {
  const navigate = useNavigate();
  return (
    <div
      className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden hover:shadow-lg transition-shadow cursor-pointer hover:ring-2 hover:ring-blue-400 dark:hover:ring-blue-500 bg-white dark:bg-gray-800"
      onClick={() => navigate(`/tenant/job-details/${job.id}`)}
      role="button"
      tabIndex={0}
      onKeyPress={(e) => {
        if (e.key === "Enter") navigate(`/tenant/job-details/${job.id}`);
      }}
    >
      <div className="h-32 bg-gray-200 dark:bg-gray-700">
        <img
          src={
            "https://img.freepik.com/free-vector/job-interview-concept-illustration_114360-24598.jpg?semt=ais_hybrid&w=740"
          }
          alt={job.title}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-4">
        <h3 className="font-bold text-sm mb-1 truncate text-gray-900 dark:text-gray-100">{job.title}</h3>
        <p className="text-gray-600 dark:text-gray-400 text-xs mb-2 truncate">
          {job.company}, {job.location}
        </p>

        <div className="flex flex-col gap-1">
          <span className="text-xs text-gray-500 dark:text-gray-400">{job.type}</span>
          <span className="text-xs font-semibold text-blue-700 dark:text-blue-400">
            {job.salary}
          </span>
        </div>
      </div>
    </div>
  );
}
