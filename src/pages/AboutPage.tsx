import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useTranslation } from 'react-i18next';

const AboutPage = () => {
  const { t } = useTranslation();
  
  return (
    <div>
      <Header />
      <div className="bg-gray-50 min-h-screen py-10 px-4">
        <div className="max-w-2xl mx-auto bg-white rounded shadow p-6">
          <h1 className="text-2xl font-bold mb-4 text-blue-700">{t('aboutPage.title')}</h1>
          <p className="mb-4 text-gray-700 text-sm">
            {t('aboutPage.description')}
          </p>
          <ul className="list-disc pl-6 text-gray-700 text-sm mb-4">
            <li>{t('aboutPage.trustedByThousands')}</li>
            <li>{t('aboutPage.specializedInMedical')}</li>
            <li>{t('aboutPage.secureAndUserFriendly')}</li>
          </ul>
          <p className="text-gray-700 text-sm">
            {t('aboutPage.haveQuestions')}{" "}
            <a href="/contact-us" className="text-blue-700 hover:underline">
              {t('aboutPage.contactUs')}
            </a>{" "}
            {t('aboutPage.anytime')}.
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AboutPage;
