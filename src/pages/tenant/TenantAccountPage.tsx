import React, { useState, useEffect } from "react";
import { useTranslation } from 'react-i18next';
import { Button } from "@/components/ui/button";
import TenantDashboardWrapper from "@/components/TenantDashboardWrapper";

const TenantAccountPage = () => {
  const { t, i18n } = useTranslation();

  // Debug language changes
  useEffect(() => {
    console.log('TenantAccountPage - Current language:', i18n.language);
    console.log('TenantAccountPage - Test translation:', t('tenantaccount.title'));
  }, [i18n.language, t]);

  const handleDownload = () => { // URL to a dummy PDF file
    const pdfUrl =
      'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf';
    const link = document.createElement("a");
    link.href = pdfUrl;
    link.download = 'dummy-invoice.pdf'; // The name for the downloaded file
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const paymentHistory = [
    { id: 1, item: "June Rent", date: "202406-1", amount: "$2" },
    { id: 2, item: "Deposit", date: "202405-5", amount: "$1,000" },
    { id: 3, item: "May Rent", date: "202451", amount: "$2" },
  ];

  const userProfile = {
    name: "Alex Tenant",
    email: "alex.tenant@example.com",
    phone: "+1223333",
    avatarUrl: "https://i.pravatar.cc/150?8126704",
    address: {
      street: "123Main St",
      city: "Toronto",
      province: "ON",
      postalCode: "M52",
    },
  };

  return (
    <TenantDashboardWrapper>
      <div className="p-4 sm:p-6 lg:h-screen bg-gray-50 dark:bg-[hsl(var(--background))] space-y-6 sm:space-y-8">
        <h2 className="text-2xl md:text-3xl font-bold mb-6 text-[hsl(var(--foreground))]">{t('tenantaccount.title')}</h2>
        <div className="bg-white dark:bg-[hsl(var(--card))] border rounded-lg shadow-sm p-4 max-w-2xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-start space-y-4 sm:space-y-0">
            <img
              src={userProfile.avatarUrl}
              alt="User Avatar"
              className="w-20 h-20 sm:h-24 rounded-full border-4 border-gray-200 md:mx-0"
            />
            <div className="flex-1 text-center md:text-left">
              <h3 className="text-xl md:text-2xl font-bold text-[hsl(var(--foreground))]">{userProfile.name}</h3>
              <p className="text-sm text-gray-500 dark:text-[hsl(var(--muted-foreground))]">{userProfile.email}</p>
              <p className="text-sm text-gray-500 dark:text-[hsl(var(--muted-foreground))]">{userProfile.phone}</p>
            </div>
            <Button variant="outline" className="w-full md:w-auto">{t('common.edit')}{t('navigation.profile')}</Button>
          </div>
        </div>
        <div className="mt-8">
          <h4 className="text-lg font-semibold text-gray-700 dark:text-[hsl(var(--foreground))] mb-4">{t('tenantaccount.address')}</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-gray-500 dark:text-[hsl(var(--muted-foreground))]">{t('tenantaccount.street')}</p>
              <p className="font-medium text-[hsl(var(--foreground))]">{userProfile.address.street}</p>
            </div>
            <div>
              <p className="text-gray-500 dark:text-[hsl(var(--muted-foreground))]">{t('tenantaccount.city')}</p>
              <p className="font-medium text-[hsl(var(--foreground))]">{userProfile.address.city}</p>
            </div>
            <div>
              <p className="text-gray-500 dark:text-[hsl(var(--muted-foreground))]">{t('tenantaccount.province')}</p>
              <p className="font-medium text-[hsl(var(--foreground))]">{userProfile.address.province}</p>
            </div>
            <div>
              <p className="text-gray-500 dark:text-[hsl(var(--muted-foreground))]">{t('tenantaccount.postalCode')}</p>
              <p className="font-medium text-[hsl(var(--foreground))]">{userProfile.address.postalCode}</p>
            </div>
          </div>
        </div>
      </div>
      {/* Billing Section */}
      <div className="bg-white dark:bg-[hsl(var(--card))] border rounded-lg shadow-sm p-4 sm:p-8">
        <h3 className="text-xl md:text-2xl font-bold mb-6 text-[hsl(var(--foreground))]">{t('tenantbilling.title')}</h3>
        <p className="text-gray-600 dark:text-[hsl(var(--muted-foreground))] mb-6">{t('tenantbilling.description')}</p>
        <div className="space-y-4">
          {paymentHistory.map((payment) => (
            <div
              key={payment.id}
              className="p-4 flex flex-col md:flex-row md:justify-between md:items-center gap-2 border border-gray-200 rounded-lg"
            >
              <div>
                <p className="font-semibold text-[hsl(var(--foreground))]">{payment.item}</p>
                <p className="text-sm text-gray-500 dark:text-[hsl(var(--muted-foreground))">
                  {t('tenantbilling.paidOn')} {payment.date}
                </p>
              </div>
              <div className="text-right">
                <p className="font-semibold text-[hsl(var(--foreground))]">{payment.amount}</p>
                <button
                  className="text-sm text-blue-600 hover:underline"
                  onClick={handleDownload}
                >
                  {t('tenantbilling.downloadInvoice')}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </TenantDashboardWrapper>
  );
};

export default TenantAccountPage;
