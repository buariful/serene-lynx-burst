import React from "react";
import HospitalHeader from "./HospitalHeader";

const HospitalDashboardWrapper: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <HospitalHeader />
      <main className="pt-16 bg-gray-50 dark:bg-gray-900">
        {children}
      </main>
    </div>
  );
};

export default HospitalDashboardWrapper;
