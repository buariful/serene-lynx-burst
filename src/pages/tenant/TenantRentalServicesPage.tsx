import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import TenantDashboardWrapper from "@/components/TenantDashboardWrapper";

const TenantRentalServicesPage = () => {
  const { t, i18n } = useTranslation();
  
  // Debug language changes
  useEffect(() => {
    console.log('TenantRentalServicesPage - Current language:', i18n.language);
    console.log('TenantRentalServicesPage - Test translation:', t('tenantrentalService.title'));
  }, [i18n.language, t]);

  const rental = {
    property: "Greenwood Villa",
    address: "123 Maple St, Toronto, ON",
    leaseStart: "2025-11",
    leaseEnd: "2025-12",
    rent: "$1500",
    landlord: "John Smith",
    contact: "john.smith@email.com",
  };

  const rentHistory = [
    { month: "May 2025", amount: "$150", status: "Paid", date: "2025-05-25" },
    { month: "April 2025", amount: "$150", status: "Paid", date: "2025-04-20" },
    { month: "March 2025", amount: "$150", status: "Paid", date: "2025-03-15" },
  ];

  const maintenance = [
    { id: 1, issue: "Leaky faucet", date: "2025-05-10", status: "Resolved" },
    { id: 2, issue: "Broken window", date: "2025-10-01", status: "InProgress" },
  ];

  const documents = [
    { name: "Lease Agreement", status: "Signed" },
    { name: "Move-in Checklist", status: "Unsigned" },
  ];

  return (
    <TenantDashboardWrapper>
      <div className="p-4 md:p-6 n-h-screen bg-gray-50 dark:bg-[hsl(var(--background))] space-y-6 space-y-8">
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
              <strong>{t('tenantrentalService.leasePeriod')}:</strong> {rental.leaseStart} to {rental.leaseEnd}
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
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
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
              <li key={m.id} className="flex flex-col md:flex-row md:justify-between gap-2">
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
              <li key={idx} className="flex flex-col md:flex-row md:justify-between md:items-center gap-2">
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
    </TenantDashboardWrapper>
  );
};

export default TenantRentalServicesPage; 