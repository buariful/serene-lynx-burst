import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useTranslation } from 'react-i18next';

const AboutPage = () => {
  const { t } = useTranslation();
  
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />
      <div className="min-h-screen py-10 px-4">
        <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 border border-gray-200 dark:border-gray-700">
          <h1 className="text-3xl font-bold mb-6 text-blue-700 dark:text-blue-400">
            {t('aboutPage.title')}
          </h1>
          
          <p className="mb-6 text-gray-700 dark:text-gray-300 text-base leading-relaxed">
            {t('aboutPage.description')}
          </p>
          
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
              Why Choose Us?
            </h2>
            <ul className="space-y-3 text-gray-700 dark:text-gray-300 text-base">
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 bg-blue-600 dark:bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                <span>{t('aboutPage.trustedByThousands')}</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 bg-blue-600 dark:bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                <span>{t('aboutPage.specializedInMedical')}</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 bg-blue-600 dark:bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                <span>{t('aboutPage.secureAndUserFriendly')}</span>
              </li>
            </ul>
          </div>
          
          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6 border border-blue-200 dark:border-blue-800">
            <p className="text-gray-700 dark:text-gray-300 text-base">
              {t('aboutPage.haveQuestions')}{" "}
              <a 
                href="/contact-us" 
                className="text-blue-700 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium transition-colors hover:underline"
              >
                {t('aboutPage.contactUs')}
              </a>{" "}
              {t('aboutPage.anytime')}.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AboutPage;
