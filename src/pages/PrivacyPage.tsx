import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const PrivacyPage = () => (
  <div>
    <Header />
    <div className="bg-gray-50 min-h-screen py-10 px-4">
      <div className="max-w-2xl mx-auto bg-white rounded shadow p-6">
        <h1 className="text-2xl font-bold mb-4 text-blue-700">
          Privacy Policy
        </h1>
        <p className="mb-4 text-gray-700 text-sm">
          Your privacy is important to us. This policy explains how we collect,
          use, and protect your personal information when you use our service.
        </p>
        <h2 className="font-semibold text-lg mt-6 mb-2">
          1. Information We Collect
        </h2>
        <p className="text-gray-700 text-sm mb-2">
          We may collect personal information such as your name, email address,
          and usage data when you use our site.
        </p>
        <h2 className="font-semibold text-lg mt-6 mb-2">
          2. How We Use Information
        </h2>
        <p className="text-gray-700 text-sm mb-2">
          We use your information to provide and improve our services,
          communicate with you, and comply with legal obligations.
        </p>
        <h2 className="font-semibold text-lg mt-6 mb-2">
          3. Sharing of Information
        </h2>
        <p className="text-gray-700 text-sm mb-2">
          We do not sell or rent your personal information. We may share
          information with trusted partners who assist us in operating our
          service, as required by law.
        </p>
        <h2 className="font-semibold text-lg mt-6 mb-2">4. Data Security</h2>
        <p className="text-gray-700 text-sm mb-2">
          We implement reasonable security measures to protect your data from
          unauthorized access, alteration, or disclosure.
        </p>
        <h2 className="font-semibold text-lg mt-6 mb-2">5. Your Rights</h2>
        <p className="text-gray-700 text-sm mb-2">
          You have the right to access, update, or delete your personal
          information. Contact us at{" "}
          <a
            href="mailto:support@yourdomain.com"
            className="text-blue-700 hover:underline"
          >
            support@yourdomain.com
          </a>{" "}
          for assistance.
        </p>
        <h2 className="font-semibold text-lg mt-6 mb-2">
          6. Changes to This Policy
        </h2>
        <p className="text-gray-700 text-sm mb-2">
          We may update this privacy policy from time to time. Please review it
          periodically for changes.
        </p>
        <h2 className="font-semibold text-lg mt-6 mb-2">7. Contact</h2>
        <p className="text-gray-700 text-sm">
          If you have any questions about this policy, please contact us at{" "}
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

export default PrivacyPage;
