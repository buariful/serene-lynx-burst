import React from "react";
import { Outlet } from "react-router-dom";
import HospitalDashboardWrapper from "@/components/HospitalDashboardWrapper";

const HospitalLayout: React.FC = () => {
  return (
    <HospitalDashboardWrapper>
      <Outlet />
    </HospitalDashboardWrapper>
  );
};

export default HospitalLayout;
