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
    <div className="max-w-md mx-auto py-10 px-4">
      <h1 className="text-xl font-bold mb-6 text-center">{t('hospital.myProfile.title')}</h1>
      <div className="flex flex-col items-center bg-white border rounded shadow-sm p-6">
        <img
          src={user.image}
          alt={user.name}
          className="w-24 h-24 rounded-full object-cover border mb-4"
        />
        <div className="text-lg font-semibold mb-1">{user.name}</div>
        <div className="text-gray-600 text-sm mb-1">{user.email}</div>
        <div className="text-gray-600 text-sm mb-4">{user.phone}</div>
        <button className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold py-2 px-6 rounded">
          {t('hospital.myProfile.editProfile')}
        </button>
      </div>
    </div>
  );
};

export default MyProfilePage;
