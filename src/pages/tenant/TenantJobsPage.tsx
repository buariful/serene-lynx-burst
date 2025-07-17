import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import TenantDashboardWrapper from "@/components/TenantDashboardWrapper";

const TenantJobsPage = () => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  
  // Debug language changes
  useEffect(() => {
    console.log('TenantJobsPage - Current language:', i18n.language);
    console.log('TenantJobsPage - Test translation:', t('tenantappliedJobs.title'));
  }, [i18n.language, t]);

  const jobs = [
    {
      id: 1,
      title: "Nurse, Hospital: City Hospital",
      date: "2025-10",
      status: "Under Review",
      type: "Full-time",
      location: "Toronto",
      salary: "$320mo",
    },
    {
      id: 2,
      title: "LabTechnician, Hospital: HealthCare Plus",
      date: "2025-8",
      status: "Accepted",
      type: "Part-time",
      location: "Ottawa",
      salary: "$180mo",
    },
    {
      id: 3,
      title: "Caregiver, Hospital: Mercy Hospital",
      date: "2025-5",
      status: "Rejected",
      type: "Contract",
      location: "Vancouver",
      salary: "$250mo",
    },
    {
      id: 4,
      title: "Medical Assistant, Hospital: Saint Mary Clinic",
      date: "2025-1",
      status: "Under Review",
      type: "Full-time",
      location: "Montreal",
      salary: "$3000mo",
    },
  ];

  return (
    <TenantDashboardWrapper>
      <div className="p-4 md:p-6 min-h-screen bg-gray-50 dark:bg-[hsl(var(--background))] space-y-4 space-y-6">
        <div className="bg-white dark:bg-[hsl(var(--card))] p-4 md:p-6 rounded-xl shadow">
          <h2 className="text-2xl md:text-3xl font-bold mb-2 text-[hsl(var(--foreground))]">{t('tenantappliedJobs.title')}</h2>
          <p className="text-gray-600 dark:text-[hsl(var(--muted-foreground))">
            {t('tenantappliedJobs.description')}
          </p>
        </div>

        <div className="space-y-4">         {jobs.map((job) => (
            <div
              key={job.id}
              className="bg-white dark:bg-[hsl(var(--card))] p-4 md:p-6 rounded-xl shadow flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h3 className="text-lg md:text-xl font-semibold text-[hsl(var(--foreground))]">
                  {job.title} at {job.hospital}
                </h3>
                <p className="text-sm text-gray-600 dark:text-[hsl(var(--muted-foreground))]">{t('tenantappliedJobs.appliedOn')} {job.date}</p>
                <p className="text-sm text-gray-600 dark:text-[hsl(var(--muted-foreground))] mt-1">
                  {job.type} • {job.location} • {job.salary}
                </p>
              </div>
              <div className="flex flex-col md:items-end">
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    job.status === "Under Review"
                      ? "bg-yellow-100 text-yellow-800"
                      : job.status === "Accepted"
                      ? "bg-green-100"
                      : "bg-red-100"
                  }`}
                >
                  {job.status === "Under Review" ? t('tenantappliedJobs.underReview') : 
                   job.status === "Accepted" ? t('tenantappliedJobs.accepted') : 
                   t('tenantappliedJobs.rejected')}
                </span>
                <button
                  onClick={() => navigate('/hospital/product/2')}
                  className="mt-3 text-blue-600 hover:underline text-sm"
                >
                  {t('tenantappliedJobs.viewDetails')}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </TenantDashboardWrapper>
  );
};

export default TenantJobsPage; 