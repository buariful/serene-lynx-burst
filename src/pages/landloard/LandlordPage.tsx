import Footer from "@/components/Footer";
import Header from "@/components/Header";
import React from "react";
import { Link } from "react-router-dom";

const featuredListings = [
  {
    id: 1,
    title: "Modern 2BR Condo in Downtown Toronto",
    location: "Toronto, ON",
    price: "$2,400/mo",
  },
  {
    id: 2,
    title: "Spacious 1BR Apartment near UBC",
    location: "Vancouver, BC",
    price: "$1,900/mo",
  },
  {
    id: 3,
    title: "Family Home in Ottawa South",
    location: "Ottawa, ON",
    price: "$2,800/mo",
  },
];

const LandlordPage = () => {
  return (
    <div>
      <Header />
      <div className="bg-gray-50 min-h-screen">
        {/* Hero Section */}
        <section className="bg-blue-700 text-white py-16 px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">
            Find Your Next Tenant with Ease
          </h1>
          <p className="text-lg mb-6">
            List your property and connect with thousands of qualified renters
            across Canada.
          </p>
          <Link
            to="/landlord/post-rental"
            className="bg-white text-blue-700 font-semibold px-6 py-3 rounded shadow hover:bg-blue-100 transition"
          >
            Post a Rental
          </Link>
        </section>

        {/* Search Bar */}
        <section className="max-w-2xl mx-auto -mt-8 mb-12 px-4">
          <form className="bg-white rounded shadow p-4 flex gap-2">
            <input
              type="text"
              placeholder="Search by city, address, or postal code"
              className="flex-1 px-3 py-2 border rounded focus:outline-none"
            />
            <button
              type="submit"
              className="bg-blue-700 text-white px-5 py-2 rounded hover:bg-blue-800 transition"
            >
              Search
            </button>
          </form>
        </section>

        {/* Featured Listings */}
        <section className="max-w-5xl mx-auto mb-16 px-4">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">
            Featured Rentals
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {featuredListings.map((listing) => (
              <div
                key={listing.id}
                className="bg-white rounded shadow p-4 flex flex-col"
              >
                <div className="h-40 bg-gray-200 rounded mb-4" />{" "}
                {/* Placeholder for image */}
                <h3 className="font-semibold text-lg mb-2">{listing.title}</h3>
                <p className="text-gray-600 mb-1">{listing.location}</p>
                <p className="text-blue-700 font-bold mb-3">{listing.price}</p>
                <Link
                  to="/search-results"
                  className="mt-auto text-blue-700 hover:underline"
                >
                  View Details
                </Link>
              </div>
            ))}
          </div>
        </section>

        {/* Info Section */}
        <section className="max-w-4xl mx-auto mb-20 px-4">
          <h2 className="text-xl font-bold mb-4 text-gray-800">
            Why List with Us?
          </h2>
          <ul className="list-disc pl-6 text-gray-700 space-y-2">
            <li>
              Reach a large audience of medical professionals and students.
            </li>
            <li>Easy-to-use listing tools and dashboard.</li>
            <li>Secure messaging and application process.</li>
            <li>Dedicated support for landlords.</li>
          </ul>
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default LandlordPage;
