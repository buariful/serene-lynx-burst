import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from 'react-i18next';

const initialAds = [
  {
    id: 1,
    title: "Sample Ad Title",
    status: "Inactive",
    image:
      "http://img.freepik.com/free-vector/house-rent-concept-background_23-2147779983.jpg",
    datePosted: "2024-06-01",
    dateAdded: "2024-05-28",
  },
  // Add more ads as needed
];

const MyAdsPage = () => {
  const [ads, setAds] = useState(initialAds);
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleDelete = (id: number) => {
    setAds((prev) => prev.filter((ad) => ad.id !== id));
  };

  return (
    <div className="max-w-2xl mx-auto py-8 px-4 bg-gray-50 dark:bg-gray-900 min-h-screen">
      <h1 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">{t('hospital.myAds.title')}</h1>
      {/* Table Header */}
      <div className="flex items-center px-2 py-2 bg-gray-100 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 rounded-t text-xs font-semibold text-gray-700 dark:text-gray-300">
        <div className="w-24 flex-shrink-0">{t('hospital.myAds.image')}</div>
        <div className="flex-1 min-w-0">{t('hospital.myAds.title')}</div>
        <div className="w-28 text-left">{t('hospital.myAds.datePosted')}</div>
        <div className="w-28 text-left">{t('hospital.myAds.dateAdded')}</div>
        <div className="w-20 text-left">{t('hospital.myAds.status')}</div>
        <div className="w-16 text-left">{t('hospital.myAds.action')}</div>
      </div>
      <ul className="space-y-2">
        {ads.map((ad) => (
          <li
            key={ad.id}
            className="flex items-center bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-2 py-2 last:rounded-b cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700"
            onClick={() =>
              navigate(`/hospital/device-details/${ad.id}`, {
                state: { hideBuy: true },
              })
            }
          >
            <img
              src={ad.image}
              alt={ad.title}
              className="w-24 h-20 object-cover rounded border border-gray-200 dark:border-gray-600 flex-shrink-0"
            />
            <div className="flex-1 min-w-0 px-2">
              <h4 className="font-medium text-gray-800 dark:text-gray-200 truncate mb-1">
                {ad.title}
              </h4>
            </div>
            <div className="w-28 text-xs text-gray-500 dark:text-gray-400 px-2">
              {ad.datePosted}
            </div>
            <div className="w-28 text-xs text-gray-500 dark:text-gray-400 px-2">
              {ad.dateAdded}
            </div>
            <div className="w-20 px-2">
              <span className="bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-300 text-xs px-2 py-1 rounded inline-block">
                {ad.status}
              </span>
            </div>
            <div className="w-16 px-2">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleDelete(ad.id);
                }}
                className="text-xs text-red-600 dark:text-red-400 hover:underline px-2 py-1 rounded border border-red-100 dark:border-red-900 hover:bg-red-50 dark:hover:bg-red-900/20"
              >
                {t('hospital.myAds.delete')}
              </button>
            </div>
          </li>
        ))}
        {ads.length === 0 && (
          <li className="text-center text-gray-400 dark:text-gray-500 text-sm py-8 bg-white dark:bg-gray-800 rounded-b border border-gray-200 dark:border-gray-700">
            {t('hospital.myAds.noAdsFound')}
          </li>
        )}
      </ul>
    </div>
  );
};

export default MyAdsPage;
