import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useTranslation } from 'react-i18next';

const LandlordVerifyPage = () => {
  const { t } = useTranslation();
  return (
    <div>
      <Header />
      <div className="bg-gray-50 min-h-screen py-10 px-4">
        <div className="max-w-2xl mx-auto bg-white rounded shadow p-6">
          <h1 className="text-2xl font-bold mb-4 text-blue-700">
            {t('landlordVerifyPage.title')}
          </h1>
          <p className="mb-4 text-gray-700 text-sm">
            {t('landlordVerifyPage.description')}
          </p>
          <ul className="list-disc pl-6 text-gray-700 text-sm mb-4">
            <li>Increase tenant confidence in your listings</li>
            <li>Reduce risk of rental scams</li>
            <li>Get a verified badge on your profile</li>
          </ul>
          <button className="bg-blue-700 text-white px-6 py-2 rounded hover:bg-blue-800 transition font-semibold">
            {t('landlordVerifyPage.submit')}
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default LandlordVerifyPage;
