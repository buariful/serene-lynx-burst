import React from "react";
import { useTranslation } from 'react-i18next';

const MyMessagesPage: React.FC = () => {
  const { t } = useTranslation();
  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen p-6">
      <h1 className="text-2xl font-bold text-gray-800 dark:text-white">{t('hospital.myMessages.title')}</h1>
    </div>
  );
};

export default MyMessagesPage;
