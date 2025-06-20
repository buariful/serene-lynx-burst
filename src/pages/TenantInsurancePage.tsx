import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const TenantInsurancePage = () => (
  <div>
    <Header />
    <div className="bg-gray-50 min-h-screen py-10 px-4">
      <div className="max-w-2xl mx-auto bg-white rounded shadow p-6">
        <h1 className="text-2xl font-bold mb-4 text-blue-700">
          Tenant Insurance
        </h1>
        <p className="mb-4 text-gray-700 text-sm">
          Protect your belongings and enjoy peace of mind with tenant insurance.
          Get coverage for your personal property, liability, and more.
        </p>
        <ul className="list-disc pl-6 text-gray-700 text-sm mb-4">
          <li>Affordable plans for every renter</li>
          <li>Coverage for theft, fire, and water damage</li>
          <li>Personal liability protection</li>
        </ul>
        <button className="bg-blue-700 text-white px-6 py-2 rounded hover:bg-blue-800 transition font-semibold">
          Get a Quote
        </button>
      </div>
    </div>
    <Footer />
  </div>
);

export default TenantInsurancePage;
