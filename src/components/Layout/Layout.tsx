import React, { PropsWithChildren } from "react";
import DashboardHeader from "../DashboardHeader";
import Footer from "../Footer";

export default function Layout({ children }: PropsWithChildren) {
  return (
    <>
      <DashboardHeader />
      {children}
      <Footer />
    </>
  );
}
