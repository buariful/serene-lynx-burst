import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useTranslation } from 'react-i18next';

const LandlordVerifyPage = () => {
  const { t } = useTranslation();
  
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />
      <div className="min-h-screen py-10 px-4">
        <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-200 dark:border-gray-700">
          <h1 className="text-2xl font-bold mb-4 text-blue-700 dark:text-blue-400">
            {t('landlordVerifyPage.title')}
          </h1>
          <p className="mb-6 text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
            {t('landlordVerifyPage.description')}
          </p>
          
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-3 text-gray-800 dark:text-gray-200">
              {t('landlordVerifyPage.benefits.title')}
            </h2>
            <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 text-sm space-y-2">
              <li>{t('landlordVerifyPage.benefits.confidence')}</li>
              <li>{t('landlordVerifyPage.benefits.scams')}</li>
              <li>{t('landlordVerifyPage.benefits.badge')}</li>
            </ul>
          </div>
          
          <button className="bg-blue-700 hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors duration-200 font-semibold shadow-md hover:shadow-lg">
            {t('landlordVerifyPage.submit')}
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default LandlordVerifyPage;
