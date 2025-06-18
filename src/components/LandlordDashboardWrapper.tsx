import React from "react";
import Header from "@/components/Header";

const LandlordDashboardWrapper: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-[#f7f9fa]">{children}</div>
    </>
  );
};

export default LandlordDashboardWrapper;
