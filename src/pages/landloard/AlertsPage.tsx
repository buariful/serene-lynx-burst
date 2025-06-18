import React from "react";
import LandlordDashboardWrapper from "@/components/LandlordDashboardWrapper";
import { AlertCircle } from "lucide-react";

const AlertsPage: React.FC = () => (
  <LandlordDashboardWrapper>
    <div className="flex flex-col items-center justify-center min-h-screen p-8">
      <AlertCircle className="w-16 h-16 text-[#2563eb] mb-4" />
      <h2 className="text-2xl font-bold mb-2 text-[#2563eb]">No Alerts</h2>
      <p className="text-slate-600 dark:text-slate-300">
        You have no alerts at this time.
      </p>
    </div>
  </LandlordDashboardWrapper>
);

export default AlertsPage;
