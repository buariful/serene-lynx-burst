import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useTranslation } from 'react-i18next';

const SearchNearMePage = () => {
  const { t } = useTranslation();
  
  return (
    <div>
      <Header />
      <div className="bg-gray-50 min-h-screen py-10 px-4">
        <div className="max-w-2xl mx-auto bg-white rounded shadow p-6">
          <h1 className="text-2xl font-bold mb-4 text-blue-700">
            {t('searchNearMePage.title')}
          </h1>
          <p className="mb-6 text-gray-700 text-sm">
            {t('searchNearMePage.description')}
          </p>
          <div className="bg-blue-100 border border-blue-300 rounded p-8 text-center text-blue-700">
            {/* Placeholder for map or location-based search */}
            <span className="block mb-2">
              {t('searchNearMePage.mapComingSoon')}
            </span>
            <button className="bg-blue-700 text-white px-6 py-2 rounded hover:bg-blue-800 transition font-semibold">
              {t('searchNearMePage.enableLocation')}
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SearchNearMePage;
