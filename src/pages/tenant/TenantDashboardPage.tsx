import React from "react";
import { Building2 } from "lucide-react";
import TenantDashboardWrapper from "@/components/TenantDashboardWrapper";

const TenantDashboardPage: React.FC = () => {
  return (
    <TenantDashboardWrapper>
      <div className="flex flex-col items-center justify-center min-h-screen p-8">
        <Building2 className="w-16 h-16 text-[#2563eb] mb-4" />
        <h1 className="text-3xl font-bold text-[#2563eb] mb-2">
          Tenant Dashboard
        </h1>
        <p className="text-slate-600 dark:text-slate-300 text-lg">
          Welcome, Tenant! Your dashboard will show your rentals, applications,
          and more.
        </p>
      </div>
    </TenantDashboardWrapper>
  );
};

export default TenantDashboardPage;
