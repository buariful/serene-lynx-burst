import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const SearchNearMePage = () => (
  <div>
    <Header />
    <div className="bg-gray-50 min-h-screen py-10 px-4">
      <div className="max-w-2xl mx-auto bg-white rounded shadow p-6">
        <h1 className="text-2xl font-bold mb-4 text-blue-700">
          Search Rentals Near Me
        </h1>
        <p className="mb-6 text-gray-700 text-sm">
          Find rental properties close to your current location. Enable location
          services in your browser to get started.
        </p>
        <div className="bg-blue-100 border border-blue-300 rounded p-8 text-center text-blue-700">
          {/* Placeholder for map or location-based search */}
          <span className="block mb-2">
            [Map or location-based search coming soon]
          </span>
          <button className="bg-blue-700 text-white px-6 py-2 rounded hover:bg-blue-800 transition font-semibold">
            Enable Location
          </button>
        </div>
      </div>
    </div>
    <Footer />
  </div>
);

export default SearchNearMePage;
