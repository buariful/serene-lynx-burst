import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useTranslation } from 'react-i18next';

const PrivacyPage = () => {
  const { t } = useTranslation();
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />
      <div className="min-h-screen py-10 px-4">
        <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 border border-gray-200 dark:border-gray-700">
          <h1 className="text-3xl font-bold mb-6 text-blue-700 dark:text-blue-400">
            {t('privacyPage.title')}
          </h1>
          <p className="mb-6 text-gray-700 dark:text-gray-300 text-base leading-relaxed">
            {t('privacyPage.welcome')}
          </p>
          
          <div className="space-y-8">
            <section>
              <h2 className="text-xl font-semibold mb-3 text-gray-800 dark:text-gray-200">
                {t('privacyPage.informationCollection')}
              </h2>
              <p className="text-gray-700 dark:text-gray-300 text-base leading-relaxed">
                {t('privacyPage.informationCollectionDesc')}
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold mb-3 text-gray-800 dark:text-gray-200">
                {t('privacyPage.informationUse')}
              </h2>
              <p className="text-gray-700 dark:text-gray-300 text-base leading-relaxed">
                {t('privacyPage.informationUseDesc')}
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold mb-3 text-gray-800 dark:text-gray-200">
                {t('privacyPage.informationSharing')}
              </h2>
              <p className="text-gray-700 dark:text-gray-300 text-base leading-relaxed">
                {t('privacyPage.informationSharingDesc')}
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold mb-3 text-gray-800 dark:text-gray-200">
                {t('privacyPage.dataSecurity')}
              </h2>
              <p className="text-gray-700 dark:text-gray-300 text-base leading-relaxed">
                {t('privacyPage.dataSecurityDesc')}
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold mb-3 text-gray-800 dark:text-gray-200">
                {t('privacyPage.cookies')}
              </h2>
              <p className="text-gray-700 dark:text-gray-300 text-base leading-relaxed">
                {t('privacyPage.cookiesDesc')}
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold mb-3 text-gray-800 dark:text-gray-200">
                {t('privacyPage.contact')}
              </h2>
              <p className="text-gray-700 dark:text-gray-300 text-base leading-relaxed">
                {t('privacyPage.contactDesc')}{" "}
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

export default PrivacyPage;
