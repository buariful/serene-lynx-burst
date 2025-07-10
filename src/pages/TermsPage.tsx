import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useTranslation } from 'react-i18next';

const TermsPage = () => {
  const { t } = useTranslation();
  return (
    <div>
      <Header />
      <div className="bg-gray-50 min-h-screen py-10 px-4">
        <div className="max-w-2xl mx-auto bg-white rounded shadow p-6">
          <h1 className="text-2xl font-bold mb-4 text-blue-700">
            {t('termsPage.title')}
          </h1>
          <p className="mb-4 text-gray-700 text-sm">
            {t('termsPage.welcome')}
          </p>
          <h2 className="font-semibold text-lg mt-6 mb-2">
            {t('termsPage.acceptanceOfTerms')}
          </h2>
          <p className="text-gray-700 text-sm mb-2">
            {t('termsPage.acceptanceDesc')}
          </p>
          <h2 className="font-semibold text-lg mt-6 mb-2">{t('termsPage.useOfService')}</h2>
          <p className="text-gray-700 text-sm mb-2">
            {t('termsPage.useOfServiceDesc')}
          </p>
          <h2 className="font-semibold text-lg mt-6 mb-2">
            {t('termsPage.intellectualProperty')}
          </h2>
          <p className="text-gray-700 text-sm mb-2">
            {t('termsPage.intellectualPropertyDesc')}
          </p>
          <h2 className="font-semibold text-lg mt-6 mb-2">
            {t('termsPage.limitationOfLiability')}
          </h2>
          <p className="text-gray-700 text-sm mb-2">
            {t('termsPage.limitationOfLiabilityDesc')}
          </p>
          <h2 className="font-semibold text-lg mt-6 mb-2">{t('termsPage.changesToTerms')}</h2>
          <p className="text-gray-700 text-sm mb-2">
            {t('termsPage.changesToTermsDesc')}
          </p>
          <h2 className="font-semibold text-lg mt-6 mb-2">{t('termsPage.contact')}</h2>
          <p className="text-gray-700 text-sm">
            {t('termsPage.contactDesc')}{" "}
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
};

export default TermsPage;
