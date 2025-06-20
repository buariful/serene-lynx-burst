import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const AboutPage = () => (
  <div>
    <Header />
    <div className="bg-gray-50 min-h-screen py-10 px-4">
      <div className="max-w-2xl mx-auto bg-white rounded shadow p-6">
        <h1 className="text-2xl font-bold mb-4 text-blue-700">About Us</h1>
        <p className="mb-4 text-gray-700 text-sm">
          Welcome to our platform! We connect medical professionals, students,
          and landlords with quality rental properties across Canada. Our
          mission is to make finding and listing rentals easy, secure, and
          community-focused.
        </p>
        <ul className="list-disc pl-6 text-gray-700 text-sm mb-4">
          <li>Trusted by thousands of users</li>
          <li>Specialized in medical community housing</li>
          <li>Secure and user-friendly platform</li>
        </ul>
        <p className="text-gray-700 text-sm">
          Have questions?{" "}
          <a href="/contact-us" className="text-blue-700 hover:underline">
            Contact us
          </a>{" "}
          anytime.
        </p>
      </div>
    </div>
    <Footer />
  </div>
);

export default AboutPage;
