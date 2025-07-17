import React, { useState, useEffect } from "react";
import { useTranslation } from 'react-i18next';
import { Button } from "@/components/ui/button";
import TenantDashboardWrapper from "@/components/TenantDashboardWrapper";
// Add a simple modal implementation
import { Dialog, DialogContent, DialogTitle, DialogHeader, DialogFooter } from "@/components/ui/dialog";

const TenantAccountPage = () => {
  const { t, i18n } = useTranslation();

  // Debug language changes
  useEffect(() => {
    console.log('TenantAccountPage - Current language:', i18n.language);
    console.log('TenantAccountPage - Test translation:', t('tenantaccount.title'));
  }, [i18n.language, t]);

  const [editOpen, setEditOpen] = useState(false);
  const [profile, setProfile] = useState({
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
  });
  const [editForm, setEditForm] = useState({
    name: profile.name,
    email: profile.email,
    phone: profile.phone,
  });

  const handleDownload = () => {
    // Use a valid PDF URL
    const pdfUrl = 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf';
    const link = document.createElement('a');
    link.href = pdfUrl;
    link.download = `invoice-${new Date().toISOString().split('T')[0]}.pdf`;
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const paymentHistory = [
    { id: 1, item: "June Rent", date: "202406-1", amount: "$2" },
    { id: 2, item: "Deposit", date: "202405-5", amount: "$1,000" },
    { id: 3, item: "May Rent", date: "202451", amount: "$2" },
  ];

  // Modal handlers
  const openEditModal = () => {
    setEditForm({
      name: profile.name,
      email: profile.email,
      phone: profile.phone,
    });
    setEditOpen(true);
  };
  const closeEditModal = () => setEditOpen(false);
  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };
  const handleEditSave = () => {
    setProfile({ ...profile, ...editForm });
    setEditOpen(false);
  };

  return (
    <TenantDashboardWrapper>
      <div className="p-4 sm:p-6 lg:h-screen bg-gray-50 dark:bg-[hsl(var(--background))] space-y-6 sm:space-y-8">
        <h2 className="text-2xl md:text-3xl font-bold mb-6 text-[hsl(var(--foreground))]">{t('tenantaccount.title')}</h2>
        <div className="bg-white dark:bg-[hsl(var(--card))] border rounded-lg shadow-sm p-4 max-w-2xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-start space-y-4 sm:space-y-0">
            <img
              src={profile.avatarUrl}
              alt="User Avatar"
              className="w-20 h-20 sm:h-24 rounded-full border-4 border-gray-200 md:mx-0"
            />
            <div className="flex-1 text-center md:text-left">
              <h3 className="text-xl md:text-2xl font-bold text-[hsl(var(--foreground))]">{profile.name}</h3>
              <p className="text-sm text-gray-500 dark:text-[hsl(var(--muted-foreground))]">{profile.email}</p>
              <p className="text-sm text-gray-500 dark:text-[hsl(var(--muted-foreground))]">{profile.phone}</p>
            </div>
            <Button variant="outline" className="w-full md:w-auto" onClick={openEditModal}>{t('common.edit')}{t('navigation.profile')}</Button>
          </div>
        </div>
        <div className="mt-8">
          <h4 className="text-lg font-semibold text-gray-700 dark:text-[hsl(var(--foreground))] mb-4">{t('tenantaccount.address')}</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-gray-500 dark:text-[hsl(var(--muted-foreground))]">{t('tenantaccount.street')}</p>
              <p className="font-medium text-[hsl(var(--foreground))]">{profile.address.street}</p>
            </div>
            <div>
              <p className="text-gray-500 dark:text-[hsl(var(--muted-foreground))]">{t('tenantaccount.city')}</p>
              <p className="font-medium text-[hsl(var(--foreground))]">{profile.address.city}</p>
            </div>
            <div>
              <p className="text-gray-500 dark:text-[hsl(var(--muted-foreground))]">{t('tenantaccount.province')}</p>
              <p className="font-medium text-[hsl(var(--foreground))]">{profile.address.province}</p>
            </div>
            <div>
              <p className="text-gray-500 dark:text-[hsl(var(--muted-foreground))]">{t('tenantaccount.postalCode')}</p>
              <p className="font-medium text-[hsl(var(--foreground))]">{profile.address.postalCode}</p>
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
                <p className="text-sm text-gray-500 dark:text-[hsl(var(--muted-foreground))]">
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
      {/* Edit Profile Modal */}
      <Dialog open={editOpen} onOpenChange={setEditOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t('common.edit')}{t('navigation.profile')}</DialogTitle>
          </DialogHeader>
          <form
            onSubmit={e => {
              e.preventDefault();
              handleEditSave();
            }}
            className="space-y-4"
          >
            <div>
              <label className="block text-sm font-medium mb-1">Name</label>
              <input
                type="text"
                name="name"
                value={editForm.name}
                onChange={handleEditChange}
                className="w-full border rounded px-3 py-2"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={editForm.email}
                onChange={handleEditChange}
                className="w-full border rounded px-3 py-2"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Phone</label>
              <input
                type="text"
                name="phone"
                value={editForm.phone}
                onChange={handleEditChange}
                className="w-full border rounded px-3 py-2"
                required
              />
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={closeEditModal}>Cancel</Button>
              <Button type="submit">Save</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </TenantDashboardWrapper>
  );
};

export default TenantAccountPage;
