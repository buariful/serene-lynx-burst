import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useTranslation } from 'react-i18next';

const TermsPage = () => {
  const { t } = useTranslation();
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />
      <div className="min-h-screen py-10 px-4">
        <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 border border-gray-200 dark:border-gray-700">
          <h1 className="text-3xl font-bold mb-6 text-blue-700 dark:text-blue-400">
            {t('termsPage.title')}
          </h1>
          <p className="mb-6 text-gray-700 dark:text-gray-300 text-base leading-relaxed">
            {t('termsPage.welcome')}
          </p>
          
          <div className="space-y-8">
            <section>
              <h2 className="text-xl font-semibold mb-3 text-gray-800 dark:text-gray-200">
                {t('termsPage.acceptanceOfTerms')}
              </h2>
              <p className="text-gray-700 dark:text-gray-300 text-base leading-relaxed">
                {t('termsPage.acceptanceDesc')}
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold mb-3 text-gray-800 dark:text-gray-200">
                {t('termsPage.useOfService')}
              </h2>
              <p className="text-gray-700 dark:text-gray-300 text-base leading-relaxed">
                {t('termsPage.useOfServiceDesc')}
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold mb-3 text-gray-800 dark:text-gray-200">
                {t('termsPage.intellectualProperty')}
              </h2>
              <p className="text-gray-700 dark:text-gray-300 text-base leading-relaxed">
                {t('termsPage.intellectualPropertyDesc')}
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold mb-3 text-gray-800 dark:text-gray-200">
                {t('termsPage.limitationOfLiability')}
              </h2>
              <p className="text-gray-700 dark:text-gray-300 text-base leading-relaxed">
                {t('termsPage.limitationOfLiabilityDesc')}
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold mb-3 text-gray-800 dark:text-gray-200">
                {t('termsPage.changesToTerms')}
              </h2>
              <p className="text-gray-700 dark:text-gray-300 text-base leading-relaxed">
                {t('termsPage.changesToTermsDesc')}
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold mb-3 text-gray-800 dark:text-gray-200">
                {t('termsPage.contact')}
              </h2>
              <p className="text-gray-700 dark:text-gray-300 text-base leading-relaxed">
                {t('termsPage.contactDesc')}{" "}
                <a
                  href="mailto:support@yourdomain.com"
                  className="text-blue-700 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium transition-colors hover:underline"
                >
                  support@yourdomain.com
                </a>
                .
              </p>
            </section>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default TermsPage;
