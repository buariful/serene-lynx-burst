import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useTranslation } from 'react-i18next';

const FAQPage = () => {
  const { t } = useTranslation();
  
  return (
    <div className="bg-[hsl(var(--background))] text-[hsl(var(--foreground))]">
      <Header />
      <div className="bg-gray-50 dark:bg-[hsl(var(--background))] min-h-screen py-10 px-4">
        <div className="max-w-2xl mx-auto bg-white dark:bg-[hsl(var(--card))] rounded shadow p-6 border-[hsl(var(--border))]">
          <h1 className="text-2xl font-bold mb-4 text-blue-700 dark:text-blue-400">
            {t('faqPage.title')}
          </h1>
          <div className="mb-4">
            <h2 className="font-semibold text-lg mb-1 text-[hsl(var(--foreground))]">
              {t('faqPage.questions.howToListProperty.question')}
            </h2>
            <p className="text-gray-700 dark:text-[hsl(var(--muted-foreground))] text-sm mb-3">
              {t('faqPage.questions.howToListProperty.answer')}
            </p>
            <h2 className="font-semibold text-lg mb-1 text-[hsl(var(--foreground))]">
              {t('faqPage.questions.howToContactLandlord.question')}
            </h2>
            <p className="text-gray-700 dark:text-[hsl(var(--muted-foreground))] text-sm mb-3">
              {t('faqPage.questions.howToContactLandlord.answer')}
            </p>
            <h2 className="font-semibold text-lg mb-1 text-[hsl(var(--foreground))]">
              {t('faqPage.questions.isInformationSecure.question')}
            </h2>
            <p className="text-gray-700 dark:text-[hsl(var(--muted-foreground))] text-sm mb-3">
              {t('faqPage.questions.isInformationSecure.answer')}
            </p>
            <h2 className="font-semibold text-lg mb-1 text-[hsl(var(--foreground))]">
              {t('faqPage.questions.howToVerifyIdentity.question')}
            </h2>
            <p className="text-gray-700 dark:text-[hsl(var(--muted-foreground))] text-sm mb-3">
              {t('faqPage.questions.howToVerifyIdentity.answer')}{" "}
              <a
                href="/landlord-verify"
                className="text-blue-700 dark:text-blue-400 hover:underline"
              >
                {t('faqPage.questions.howToVerifyIdentity.linkText')}
              </a>{" "}
              {t('faqPage.questions.howToVerifyIdentity.answerEnd')}
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default FAQPage;
