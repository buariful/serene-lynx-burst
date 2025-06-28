import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import DashboardHeader from "@/components/DashboardHeader";
import Footer from "@/components/Footer";

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
      "Provide patient care and support in a busy hospital environment.",
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
  const navigate = useNavigate();

  // Filtered items
  const filteredRentals =
    selectedCategory === "All" || selectedCategory === "Jobs"
      ? RENTALS
      : RENTALS.filter((r) => r.category === selectedCategory);
  const filteredJobs =
    selectedCategory === "All" || selectedCategory === "Jobs" ? JOBS : [];

  return (
    <>
      <DashboardHeader />
      <div className="max-w-7xl mx-auto px-4 py-8 flex min-h-[80vh]">
        {/* Sidebar for categories */}
        <aside className="w-48 mr-6 flex-shrink-0">
          <div className="bg-white border rounded shadow-sm p-2 sticky top-4">
            <h3 className="font-semibold mb-2 text-[#3e4153]">Categories</h3>
            <ul className="space-y-1">
              {RENTAL_CATEGORIES.map((category) => (
                <li key={category}>
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
                </li>
              ))}
            </ul>
          </div>
        </aside>
        <div className="flex-1">
          <h2 className="text-[#3e4153] text-2xl font-semibold mb-6">
            {selectedCategory === "Jobs"
              ? "Jobs"
              : selectedCategory === "All"
              ? "All Listings"
              : selectedCategory}
          </h2>
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
            <div className="text-center text-gray-400 py-8">
              No listings found in this category.
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
  return (
    <div
      className="border rounded overflow-hidden hover:shadow-sm transition-shadow cursor-pointer hover:ring-2 hover:ring-blue-400"
      onClick={() => navigate(`/toronto/${encodeURIComponent(rental.address)}`)}
      role="button"
      tabIndex={0}
      onKeyPress={(e) => {
        if (e.key === "Enter")
          navigate(`/toronto/${encodeURIComponent(rental.address)}`);
      }}
    >
      <div className="h-32 bg-gray-200">
        <img
          src={rental.image}
          alt={rental.title}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-1">
        <h3 className="font-bold text-sm mb-1 truncate">{rental.title}</h3>
        <p className="text-gray-600 text-xs mb-1 truncate">{rental.address}</p>
        <div className="flex flex-col gap-0.5 mt-1">
          <span className="text-xs text-gray-500">
            {rental.beds} beds • {rental.baths} bath
          </span>
          <span className="text-xs font-semibold text-green-600">
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
      className="border rounded overflow-hidden hover:shadow-sm transition-shadow cursor-pointer hover:ring-2 hover:ring-blue-400"
      onClick={() => navigate(`/tenant/job-details/${job.id}`)}
      role="button"
      tabIndex={0}
      onKeyPress={(e) => {
        if (e.key === "Enter") navigate(`/tenant/job-details/${job.id}`);
      }}
    >
      <div className="h-32 bg-gray-200">
        <img
          src={
            "https://img.freepik.com/free-vector/job-interview-concept-illustration_114360-24598.jpg?semt=ais_hybrid&w=740"
          }
          alt={job.title}
          className="w-full h-full object-cover"
        />
      </div>
      {/* https://img.freepik.com/free-vector/job-interview-concept-illustration_114360-24598.jpg?semt=ais_hybrid&w=740 */}
      {/* <div className="h-32 bg-blue-100 flex items-center justify-center">
        <span className="text-blue-700 font-bold text-lg">{job.title}</span>
      </div> */}
      <div className="p-1">
        <h3 className="font-bold text-sm mb-1 truncate">{job.title}</h3>
        <p className=" text-xs mb-1 truncate">
          {job.company}, {job.location}
        </p>

        <div className="flex flex-col gap-0.5 mt-1">
          <span className="text-xs text-gray-500">{job.type}</span>
          <span className="text-xs font-semibold text-blue-700">
            {job.salary}
          </span>
        </div>
      </div>
    </div>
  );
}
