import React from "react";
import LandlordDashboardWrapper from "@/components/LandlordDashboardWrapper";
import { Bell } from "lucide-react";
import { useTranslation } from "react-i18next";

const NotificationsPage: React.FC = () => {
  const { t } = useTranslation();
  
  return (
    <LandlordDashboardWrapper>
      <div className="flex flex-col items-center justify-center min-h-screen p-8">
        <Bell className="w-16 h-16 text-[#2563eb] mb-4" />
        <h2 className="text-2xl font-bold mb-2 text-[#2563eb]">
          {t('landlord.emptyStates.noNotifications')}
        </h2>
        <p className="text-slate-600 dark:text-slate-300">
          {t('landlord.emptyStates.noNotificationsDesc')}
        </p>
      </div>
    </LandlordDashboardWrapper>
  );
};

export default NotificationsPage;
