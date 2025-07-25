import DashboardHeader from "@/components/DashboardHeader";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { useTranslation } from 'react-i18next';
import TenantDashboardWrapper from "@/components/TenantDashboardWrapper";

const Dashboard = () => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  
  // Debug language changes
  useEffect(() => {
    console.log('Dashboard - Current language:', i18n.language);
    console.log('Dashboard - Test translation:', t('tenantdashboard.welcomeBack'));
  }, [i18n.language, t]);

  return (
    <div className="p-4 md:p-6 min-h-screen bg-gray-50 dark:bg-[hsl(var(--background))] space-y-6">
      {/* Welcome Section */}
      <div className="bg-white dark:bg-[hsl(var(--card))] rounded-xl shadow p-4 md:p-6 border-[hsl(var(--border))]">
        <h2 className="text-2xl md:text-3xl font-bold text-[hsl(var(--foreground))]">{t('tenantdashboard.welcomeBack')}</h2>
        <p className="text-gray-600 dark:text-[hsl(var(--muted-foreground))] mt-2">
          {t('tenantdashboard.welcomeDesc')}
        </p>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        <div className="bg-blue-100 dark:bg-blue-900 p-4 md:p-6 rounded-xl shadow">
          <h3 className="text-base md:text-lg font-medium text-[hsl(var(--foreground))]">{t('tenantdashboard.appliedJobs')}</h3>
          <p className="text-2xl md:text-3xl font-bold mt-2 text-[hsl(var(--foreground))]">4</p>
        </div>
        <div className="bg-green-100 dark:bg-green-900 p-4 md:p-6 rounded-xl shadow">
          <h3 className="text-base md:text-lg font-medium text-[hsl(var(--foreground))]">{t('tenantdashboard.activeRentals')}</h3>
          <p className="text-2xl md:text-3xl font-bold mt-2 text-[hsl(var(--foreground))]">1</p>
        </div>
        <div className="bg-yellow-100 dark:bg-yellow-900 p-4 md:p-6 rounded-xl shadow">
          <h3 className="text-base md:text-lg font-medium text-[hsl(var(--foreground))]">{t('tenantdashboard.upcomingLeaseEnd')}</h3>
          <p className="text-2xl md:text-3xl font-bold mt-2 text-[hsl(var(--foreground))]">30 days</p>
        </div>
        <div className="bg-purple-100 dark:bg-purple-900 p-4 md:p-6 rounded-xl shadow">
          <h3 className="text-base md:text-lg font-medium text-[hsl(var(--foreground))]">{t('tenantdashboard.unreadMessages')}</h3>
          <p className="text-2xl md:text-3xl font-bold mt-2 text-[hsl(var(--foreground))]">2</p>
        </div>
      </div>

      {/* Notifications */}
      <div className="bg-white dark:bg-[hsl(var(--card))] rounded-xl shadow p-4 md:p-6 border-[hsl(var(--border))]">
        <h3 className="text-lg md:text-xl font-semibold mb-4 text-[hsl(var(--foreground))]">{t('tenantdashboard.recentNotifications')}</h3>
        <ul className="space-y-2 text-gray-700 dark:text-[hsl(var(--muted-foreground))]">
          <li>{t('tenantdashboard.leaseApproved')}</li>
          <li>{t('tenantdashboard.messageReceived')}</li>
          <li>{t('tenantdashboard.leaseReminder')}</li>
        </ul>
      </div>

      {/* Suggested Opportunities */}
      <div className="bg-white dark:bg-[hsl(var(--card))] rounded-xl shadow p-4 md:p-6 border-[hsl(var(--border))]">
        <h3 className="text-lg md:text-xl font-semibold mb-4 text-[hsl(var(--foreground))]">{t('tenantdashboard.suggestedOpportunities')}</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="border border-[hsl(var(--border))] p-4 rounded-xl hover:shadow transition cursor-pointer" onClick={() => navigate("/tenant/marketplace")}>
            <h4 className="font-semibold text-[hsl(var(--foreground))]">{t('tenantdashboard.rentalAtOak')}</h4>
            <p className="text-gray-600 dark:text-[hsl(var(--muted-foreground))]">2 Bed • $1200/mo • Downtown</p>
          </div>
          <div className="border border-[hsl(var(--border))] p-4 rounded-xl hover:shadow transition cursor-pointer" onClick={() => navigate("/tenant/marketplace")}>
            <h4 className="font-semibold text-[hsl(var(--foreground))]">{t('tenantdashboard.jobNursingAssistant')}</h4>
            <p className="text-gray-600 dark:text-[hsl(var(--muted-foreground))]">Mercy hospitals • Full Time</p>
          </div>
          <div className="border border-[hsl(var(--border))] p-4 rounded-xl hover:shadow transition cursor-pointer" onClick={() => navigate("/tenant/marketplace")}>
            <h4 className="font-semibold text-[hsl(var(--foreground))]">{t('tenantdashboard.rentalAtLakeview')}</h4>
            <p className="text-gray-600 dark:text-[hsl(var(--muted-foreground))]">1 Bed • $950/mo • Lakeside</p>
          </div>
        </div>
      </div>

      {/* Call to Actions */}
      <div className="flex flex-col sm:flex-row gap-4">
        <button
          onClick={() => navigate("/tenant/marketplace")}
          className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold shadow transition"
        >
          {t('tenantdashboard.findMoreJobs')}
        </button>
        <button
          onClick={() => navigate("/tenant/marketplace")}
          className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-semibold shadow transition"
        >
          {t('tenantdashboard.exploreRentals')}
        </button>
      </div>
    </div>
  );
};

const AppliedJobsPage = () => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  
  // Debug language changes
  useEffect(() => {
    console.log('AppliedJobsPage - Current language:', i18n.language);
    console.log('AppliedJobsPage - Test translation:', t('tenantappliedJobs.title'));
  }, [i18n.language, t]);

  const jobs = [
    {
      id: 1,
      title: "Nurse",
      hospital: "City Hospital",
      date: "2025-06-10",
      status: "Under Review",
      type: "Full-time",
      location: "Toronto",
      salary: "$3200/mo",
    },
    {
      id: 2,
      title: "Lab Technician",
      hospital: "HealthCare Plus",
      date: "2025-06-08",
      status: "Accepted",
      type: "Part-time",
      location: "Ottawa",
      salary: "$1800/mo",
    },
    {
      id: 3,
      title: "Caregiver",
      hospital: "Mercy Hospital",
      date: "2025-06-05",
      status: "Rejected",
      type: "Contract",
      location: "Vancouver",
      salary: "$2500/mo",
    },
    {
      id: 4,
      title: "Medical Assistant",
      hospital: "Saint Mary Clinic",
      date: "2025-06-01",
      status: "Under Review",
      type: "Full-time",
      location: "Montreal",
      salary: "$3000/mo",
    },
  ];

  return (
    <div className="p-4 md:p-6 min-h-screen bg-gray-50 dark:bg-[hsl(var(--background))] space-y-4">
      <div className="bg-white dark:bg-[hsl(var(--card))] p-4 md:p-6 rounded-xl shadow">
        <h2 className="text-2xl md:text-3xl font-bold mb-2 text-[hsl(var(--foreground))]">{t('tenantappliedJobs.title')}</h2>
        <p className="text-gray-600 dark:text-[hsl(var(--muted-foreground))">
          {t('tenantappliedJobs.description')}
        </p>
      </div>

      <div className="space-y-4">
        {jobs.map((job) => (
          <div
            key={job.id}
            className="bg-white dark:bg-[hsl(var(--card))] p-4 md:p-6 rounded-xl shadow flex flex-col md:flex-row md:items-center justify-between gap-4"
          >
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
                  job.status === "Accepted"
                    ? "bg-green-100 text-green-800"
                    : job.status === "Rejected"
                    ? "bg-red-100 text-red-700"
                    : "bg-yellow-100 text-yellow-800"
                }`}
              >
                {job.status === "Under Review" ? t('tenantappliedJobs.underReview') : 
                 job.status === "Accepted" ? t('tenantappliedJobs.accepted') : 
                 t('tenantappliedJobs.rejected')}
              </span>
              <button
                onClick={() => navigate("/hospital/product/2")}
                className="mt-3 text-blue-600 hover:underline text-sm"
              >
                {t('tenantappliedJobs.viewDetails')}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const TenantRentalServicePage = () => {
  const { t, i18n } = useTranslation();
  
  // Debug language changes
  useEffect(() => {
    console.log('TenantRentalServicePage - Current language:', i18n.language);
    console.log('TenantRentalServicePage - Test translation:', t('tenantrentalService.title'));
  }, [i18n.language, t]);

  const rental = {
    property: "Greenwood Villa",
    address: "123 Maple St, Toronto",
    leaseStart: "2025-01-01",
    leaseEnd: "2025-12-31",
    rent: "$1500/mo",
    landlord: "John Smith",
    contact: "john.smith@email.com",
  };

  const rentHistory = [
    { month: "May 2025", amount: "$1500", status: "Paid", date: "2025-05-01" },
    {
      month: "April 2025",
      amount: "$1500",
      status: "Paid",
      date: "2025-04-01",
    },
    {
      month: "March 2025",
      amount: "$1500",
      status: "Paid",
      date: "2025-03-01",
    },
  ];

  const maintenance = [
    { id: 1, issue: "Leaky faucet", date: "2025-06-01", status: "Resolved" },
    {
      id: 2,
      issue: "Broken window",
      date: "2025-06-10",
      status: "In Progress",
    },
  ];

  const documents = [
    { name: "Lease Agreement", status: "Signed" },
    { name: "Move-in Checklist", status: "Unsigned" },
  ];

  return (
    <div className="p-4 md:p-6 min-h-screen bg-gray-50 dark:bg-[hsl(var(--background))] space-y-6">
      <div className="bg-white dark:bg-[hsl(var(--card))] rounded-xl shadow p-4 md:p-6">
        <h2 className="text-2xl md:text-3xl font-bold mb-2 text-[hsl(var(--foreground))]">{t('tenantrentalService.title')}</h2>
        <p className="text-gray-600 dark:text-[hsl(var(--muted-foreground))">
          {t('tenantrentalService.description')}
        </p>
      </div>

      {/* Active Rental Info */}
      <div className="bg-white dark:bg-[hsl(var(--card))] p-4 md:p-6 rounded-xl shadow">
        <h3 className="text-lg md:text-xl font-semibold mb-4 text-[hsl(var(--foreground))]">{t('tenantrentalService.activeRental')}</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <p>
            <strong>{t('tenantrentalService.property')}:</strong> {rental.property}
          </p>
          <p>
            <strong>{t('common.address')}:</strong> {rental.address}
          </p>
          <p>
            <strong>{t('tenantrentalService.leasePeriod')}:</strong> {rental.leaseStart} to{" "}
            {rental.leaseEnd}
          </p>
          <p>
            <strong>{t('tenantrentalService.rent')}:</strong> {rental.rent}
          </p>
          <p>
            <strong>{t('tenantrentalService.landlord')}:</strong> {rental.landlord}
          </p>
          <p>
            <strong>{t('tenantrentalService.contact')}:</strong> {rental.contact}
          </p>
        </div>
        <button
          className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          onClick={() =>
            toast.success("Maintenance request sent successfully!")
          }
        >
          {t('tenantrentalService.requestMaintenance')}
        </button>
      </div>

      {/* Rent Payment History */}
      <div className="bg-white dark:bg-[hsl(var(--card))] p-4 md:p-6 rounded-xl shadow">
        <h3 className="text-lg md:text-xl font-semibold mb-4 text-[hsl(var(--foreground))]">{t('tenantrentalService.rentPaymentHistory')}</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full text-left">
            <thead>
              <tr>
                <th className="py-2 px-4 text-[hsl(var(--foreground))]">{t('tenantrentalService.month')}</th>
                <th className="py-2 px-4 text-[hsl(var(--foreground))]">{t('tenantrentalService.amount')}</th>
                <th className="py-2 px-4 text-[hsl(var(--foreground))]">{t('tenantrentalService.status')}</th>
                <th className="py-2 px-4 text-[hsl(var(--foreground))]">{t('tenantrentalService.paidOn')}</th>
              </tr>
            </thead>
            <tbody>
              {rentHistory.map((item, idx) => (
                <tr key={idx} className="border-t">
                  <td className="py-2 px-4 text-[hsl(var(--foreground))]">{item.month}</td>
                  <td className="py-2 px-4 text-[hsl(var(--foreground))]">{item.amount}</td>
                  <td className="py-2 px-4 text-green-600 dark:text-green-400">{item.status}</td>
                  <td className="py-2 px-4 text-[hsl(var(--foreground))]">{item.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Maintenance */}
      <div className="bg-white dark:bg-[hsl(var(--card))] p-4 md:p-6 rounded-xl shadow">
        <h3 className="text-lg md:text-xl font-semibold mb-4 text-[hsl(var(--foreground))]">{t('tenantrentalService.maintenanceRequests')}</h3>
        <ul className="space-y-3">
          {maintenance.map((m) => (
            <li key={m.id} className="flex justify-between">
              <div>
                <p className="font-medium text-[hsl(var(--foreground))]">{m.issue}</p>
                <p className="text-sm text-gray-500 dark:text-[hsl(var(--muted-foreground))]">{t('tenantrentalService.requestedOn')} {m.date}</p>
              </div>
              <div>
                <span
                  className={`px-3 py-1 inline-block rounded-full text-sm ${
                    m.status === "Resolved"
                      ? "bg-green-100 text-green-800"
                      : "bg-yellow-100 text-yellow-800"
                  }`}
                >
                  {m.status === "Resolved" ? t('tenantrentalService.resolved') : t('tenantrentalService.inProgress')}
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Documents */}
      <div className="bg-white dark:bg-[hsl(var(--card))] p-4 md:p-6 rounded-xl shadow">
        <h3 className="text-lg md:text-xl font-semibold mb-4 text-[hsl(var(--foreground))]">{t('tenantrentalService.leaseDocuments')}</h3>
        <ul className="space-y-3">
          {documents.map((doc, idx) => (
            <li key={idx} className="flex justify-between items-center">
              <span className="text-[hsl(var(--foreground))]">{doc.name}</span>
              <div className="flex items-center gap-3">
                <span
                  className={`text-sm ${
                    doc.status === "Signed" ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {doc.status === "Signed" ? t('tenantrentalService.signed') : t('tenantrentalService.unsigned')}
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

const paymentHistory = [
  { id: 1, item: "June Rent", date: "2024-06-01", amount: "$2,200.00" },
  { id: 2, item: "Security Deposit", date: "2024-05-05", amount: "$1,000.00" },
  { id: 3, item: "May Rent", date: "2024-05-01", amount: "$2,200.00" },
];

const userProfile = {
  name: "Alex Tenant",
  email: "alex.tenant@example.com",
  phone: "+1 555-222-3333",
  avatarUrl: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
  address: {
    street: "123 Main St",
    city: "Toronto",
    province: "ON",
    postalCode: "M5V 2N2",
  },
};

const TenantDashboardPage = () => {
  const { t, i18n } = useTranslation();

  // Debug language changes
  useEffect(() => {
    console.log('TenantDashboardPage - Current language:', i18n.language);
    console.log('TenantDashboardPage - Test translation:', t('navigation.dashboard'));
  }, [i18n.language, t]);

  return (
    <TenantDashboardWrapper>
      <Dashboard />
    </TenantDashboardWrapper>
  );
};

export default TenantDashboardPage;
