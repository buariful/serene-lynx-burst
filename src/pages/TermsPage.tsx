import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const TermsPage = () => (
  <div>
    <Header />
    <div className="bg-gray-50 min-h-screen py-10 px-4">
      <div className="max-w-2xl mx-auto bg-white rounded shadow p-6">
        <h1 className="text-2xl font-bold mb-4 text-blue-700">
          Terms & Conditions
        </h1>
        <p className="mb-4 text-gray-700 text-sm">
          Welcome to our website. By accessing or using our service, you agree
          to be bound by the following terms and conditions. Please read them
          carefully.
        </p>
        <h2 className="font-semibold text-lg mt-6 mb-2">
          1. Acceptance of Terms
        </h2>
        <p className="text-gray-700 text-sm mb-2">
          By using this site, you agree to comply with and be legally bound by
          these terms. If you do not agree, please do not use our service.
        </p>
        <h2 className="font-semibold text-lg mt-6 mb-2">2. Use of Service</h2>
        <p className="text-gray-700 text-sm mb-2">
          You agree to use the service only for lawful purposes and in
          accordance with all applicable laws and regulations.
        </p>
        <h2 className="font-semibold text-lg mt-6 mb-2">
          3. Intellectual Property
        </h2>
        <p className="text-gray-700 text-sm mb-2">
          All content, trademarks, and data on this site are the property of
          their respective owners. You may not reproduce, distribute, or create
          derivative works without permission.
        </p>
        <h2 className="font-semibold text-lg mt-6 mb-2">
          4. Limitation of Liability
        </h2>
        <p className="text-gray-700 text-sm mb-2">
          We are not liable for any damages or losses resulting from your use of
          this site or service.
        </p>
        <h2 className="font-semibold text-lg mt-6 mb-2">5. Changes to Terms</h2>
        <p className="text-gray-700 text-sm mb-2">
          We reserve the right to update these terms at any time. Continued use
          of the service constitutes acceptance of the new terms.
        </p>
        <h2 className="font-semibold text-lg mt-6 mb-2">6. Contact</h2>
        <p className="text-gray-700 text-sm">
          If you have any questions about these terms, please contact us at{" "}
          <a
            href="mailto:support@yourdomain.com"
            className="text-blue-700 hover:underline"
          >
            support@yourdomain.com
          </a>
          .
        </p>
      </div>
    </div>
    <Footer />
  </div>
);

export default TermsPage;
