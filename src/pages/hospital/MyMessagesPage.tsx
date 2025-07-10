import React from "react";
import { useTranslation } from 'react-i18next';

const MyMessagesPage: React.FC = () => {
  const { t } = useTranslation();
  return <h1 className="text-2xl font-bold p-6">{t('hospital.myMessages.title')}</h1>;
};

export default MyMessagesPage;
