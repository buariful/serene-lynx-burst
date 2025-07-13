import React from "react";
import { useTranslation } from 'react-i18next';

const user = {
  name: "John Doe",
  email: "john.doe@example.com",
  phone: "+1 555-123-4567",
  image: "https://randomuser.me/api/portraits/men/32.jpg",
};

const MyProfilePage = () => {
  const { t } = useTranslation();
  return (
    <div className="max-w-md mx-auto py-10 px-4 bg-gray-50 dark:bg-gray-900 min-h-screen">
      <h1 className="text-xl font-bold mb-6 text-center text-gray-800 dark:text-white">{t('myProfile.title')}</h1>
      <div className="flex flex-col items-center bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded shadow-sm p-6">
        <img
          src={user.image}
          alt={user.name}
          className="w-24 h-24 rounded-full object-cover border border-gray-200 dark:border-gray-600 mb-4"
        />
        <div className="text-lg font-semibold mb-1 text-gray-800 dark:text-white">{user.name}</div>
        <div className="text-gray-600 dark:text-gray-400 text-sm mb-1">{user.email}</div>
        <div className="text-gray-600 dark:text-gray-400 text-sm mb-4">{user.phone}</div>
        <button className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold py-2 px-6 rounded">
          {t('myProfile.editProfile')}
        </button>
      </div>
    </div>
  );
};

export default MyProfilePage;
