import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import RecruiterDashboardWrapper from "@/components/RecruiterDashboardWrapper";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart, Share, Briefcase, Users, TrendingUp, Clock } from "lucide-react";
// Mock data - in real app this would come from API
const jobs = [
  {
    id: 1,
    title: "Cardiology Consultant",
    company: "Toronto General Hospital",
    type: "full-time",
    status: "Open",
    date: "2024-06-01",
    applications: 12,
  },
  {
    id: 2,
    title: "ICU Nurse",
    company: "Vancouver General Hospital",
    type: "contract",
    status: "Closed",
    date: "2024-05-20",
    applications: 8,
  },
  {
    id: 3,
    title: "Emergency Medicine Physician",
    company: "Montreal General Hospital",
    type: "part-time",
    status: "Open",
    date: "2024-06-05",
    applications: 5,
  },
];

const RecruiterDashboardPage = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  // Stats
  const totalJobs = jobs.length;
  const totalApplications = jobs.reduce(
    (acc, job) => acc + job.applications,
    0
  );
  const openJobs = jobs.filter((job) => job.status === "Open").length;
  const closedJobs = jobs.filter((job) => job.status === "Closed").length;

  return (
    <RecruiterDashboardWrapper>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
            {t('recruiter.dashboard.title')}
          </h1>
          <Button variant="default" onClick={() => navigate('/recruiter/post-job')}>
            {t('recruiter.dashboard.postJob')}
          </Button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-blue-700 dark:text-blue-400">
                {totalJobs}
              </div>
              <div className="text-xs text-gray-600 dark:text-gray-400">{t('recruiter.dashboard.jobsPosted')}</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-blue-700 dark:text-blue-400">
                {totalApplications}
              </div>
              <div className="text-xs text-gray-600 dark:text-gray-400">{t('recruiter.dashboard.totalApplications')}</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-blue-700 dark:text-blue-400">
                {openJobs}
              </div>
              <div className="text-xs text-gray-600 dark:text-gray-400">{t('recruiter.dashboard.openJobs')}</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-blue-700 dark:text-blue-400">
                {closedJobs}
              </div>
              <div className="text-xs text-gray-600 dark:text-gray-400">{t('recruiter.dashboard.closedJobs')}</div>
            </CardContent>
          </Card>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>{t('recruiter.dashboard.yourJobs')}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {jobs.map((job) => (
                <div
                  key={job.id}
                  className="flex flex-col md:flex-row md:items-center md:justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg"
                >
                  <div>
                    <div className="font-bold text-lg text-gray-800 dark:text-white">{job.title}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                      {t('recruiter.dashboard.posted')}: {job.date}
                    </div>
                    <div className="inline-block px-2 py-1 text-xs rounded bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 font-semibold mb-2">
                      {job.status}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      onClick={() => navigate(`/recruiter/jobs/${job.id}`)}
                    >
                      {t('recruiter.dashboard.view')}
                    </Button>
                    <Button
                      variant="secondary"
                      onClick={() => navigate(`/recruiter/jobs/${job.id}/edit`)}
                    >
                      {t('recruiter.dashboard.edit')}
                    </Button>
                    <Button
                      variant="default"
                      onClick={() => navigate('/recruiter/applicants')}
                    >
                      {t('recruiter.dashboard.viewApplications')}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </RecruiterDashboardWrapper>
  );
};

export default RecruiterDashboardPage;
