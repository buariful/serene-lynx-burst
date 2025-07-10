import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useTranslation } from 'react-i18next';

const jobs = [
  {
    titleKey: "jobBoardPage.jobs.registeredNurse.title",
    location: "Toronto, ON",
    typeKey: "jobBoardPage.jobs.registeredNurse.type",
    posted: "2024-06-01",
  },
  {
    titleKey: "jobBoardPage.jobs.medicalOfficeAssistant.title",
    location: "Toronto, ON",
    typeKey: "jobBoardPage.jobs.medicalOfficeAssistant.type",
    posted: "2024-05-28",
  },
  {
    titleKey: "jobBoardPage.jobs.residentPhysician.title",
    location: "London, ON",
    typeKey: "jobBoardPage.jobs.residentPhysician.type",
    posted: "2024-05-25",
  },
];

const JobBoardPage = () => {
  const { t } = useTranslation();
  
  return (
    <div>
      <Header />
      <div className="bg-gray-50 min-h-screen py-10 px-4">
        <div className="max-w-3xl mx-auto bg-white rounded shadow p-6">
          <h1 className="text-2xl font-bold mb-4 text-blue-700">{t('jobBoardPage.title')}</h1>
          <p className="mb-6 text-gray-700 text-sm">
            {t('jobBoardPage.description')}
          </p>
          <div className="grid gap-6">
            {jobs.map((job, idx) => (
              <div key={idx} className="border-b pb-4">
                <h2 className="font-semibold text-lg text-blue-700 mb-1">
                  {t(job.titleKey)}
                </h2>
                <p className="text-xs text-gray-400 mb-1">
                  {job.location} &middot; {t(job.typeKey)} &middot; {t('jobBoardPage.posted')} {job.posted}
                </p>
                <a href="#" className="text-blue-700 hover:underline text-sm">
                  {t('jobBoardPage.viewDetails')}
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default JobBoardPage;
