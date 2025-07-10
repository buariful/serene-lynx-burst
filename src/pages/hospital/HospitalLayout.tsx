import React from "react";
import { Outlet } from "react-router-dom";
import HospitalDashboardWrapper from "@/components/HospitalDashboardWrapper";

const HospitalLayout: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <HospitalDashboardWrapper>
        <Outlet />
      </HospitalDashboardWrapper>
    </div>
  );
};

export default HospitalLayout;
