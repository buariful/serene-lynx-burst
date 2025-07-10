import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useTranslation } from 'react-i18next';

const PrivacyPage = () => {
  const { t } = useTranslation();
  return (
    <div>
      <Header />
      <div className="bg-gray-50 min-h-screen py-10 px-4">
        <div className="max-w-2xl mx-auto bg-white rounded shadow p-6">
          <h1 className="text-2xl font-bold mb-4 text-blue-700">
            {t('privacyPage.title')}
          </h1>
          <p className="mb-4 text-gray-700 text-sm">
            {t('privacyPage.welcome')}
          </p>
          <h2 className="font-semibold text-lg mt-6 mb-2">
            {t('privacyPage.informationCollection')}
          </h2>
          <p className="text-gray-700 text-sm mb-2">
            {t('privacyPage.informationCollectionDesc')}
          </p>
          <h2 className="font-semibold text-lg mt-6 mb-2">
            {t('privacyPage.informationUse')}
          </h2>
          <p className="text-gray-700 text-sm mb-2">
            {t('privacyPage.informationUseDesc')}
          </p>
          <h2 className="font-semibold text-lg mt-6 mb-2">
            {t('privacyPage.informationSharing')}
          </h2>
          <p className="text-gray-700 text-sm mb-2">
            {t('privacyPage.informationSharingDesc')}
          </p>
          <h2 className="font-semibold text-lg mt-6 mb-2">{t('privacyPage.dataSecurity')}</h2>
          <p className="text-gray-700 text-sm mb-2">
            {t('privacyPage.dataSecurityDesc')}
          </p>
          <h2 className="font-semibold text-lg mt-6 mb-2">{t('privacyPage.cookies')}</h2>
          <p className="text-gray-700 text-sm mb-2">
            {t('privacyPage.cookiesDesc')}
          </p>
          <h2 className="font-semibold text-lg mt-6 mb-2">{t('privacyPage.contact')}</h2>
          <p className="text-gray-700 text-sm">
            {t('privacyPage.contactDesc')}{" "}
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

export default PrivacyPage;
