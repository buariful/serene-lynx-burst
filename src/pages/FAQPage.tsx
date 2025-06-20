import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const FAQPage = () => (
  <div>
    <Header />
    <div className="bg-gray-50 min-h-screen py-10 px-4">
      <div className="max-w-2xl mx-auto bg-white rounded shadow p-6">
        <h1 className="text-2xl font-bold mb-4 text-blue-700">
          Frequently Asked Questions
        </h1>
        <div className="mb-4">
          <h2 className="font-semibold text-lg mb-1">
            How do I list my property?
          </h2>
          <p className="text-gray-700 text-sm mb-3">
            Click on 'Post a Rental' and follow the steps to add your property
            details, photos, and contact information.
          </p>
          <h2 className="font-semibold text-lg mb-1">
            How do I contact a landlord?
          </h2>
          <p className="text-gray-700 text-sm mb-3">
            Use the contact form on the property listing page to send a message
            directly to the landlord.
          </p>
          <h2 className="font-semibold text-lg mb-1">
            Is my information secure?
          </h2>
          <p className="text-gray-700 text-sm mb-3">
            Yes, we use industry-standard security measures to protect your
            data.
          </p>
          <h2 className="font-semibold text-lg mb-1">
            How do I verify my identity as a landlord?
          </h2>
          <p className="text-gray-700 text-sm mb-3">
            Visit the{" "}
            <a
              href="/landlord-verify"
              className="text-blue-700 hover:underline"
            >
              Landlord Verify
            </a>{" "}
            page to start the verification process.
          </p>
        </div>
      </div>
    </div>
    <Footer />
  </div>
);

export default FAQPage;
