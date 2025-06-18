import React from "react";
import LandlordDashboardWrapper from "@/components/LandlordDashboardWrapper";
import { Pencil } from "lucide-react";

const DraftsPage: React.FC = () => (
  <LandlordDashboardWrapper>
    <div className="flex flex-col items-center justify-center min-h-screen p-8">
      <Pencil className="w-16 h-16 text-[#2563eb] mb-4" />
      <h2 className="text-2xl font-bold mb-2 text-[#2563eb]">No Drafts</h2>
      <p className="text-slate-600 dark:text-slate-300">
        You have no drafts at this time.
      </p>
    </div>
  </LandlordDashboardWrapper>
);

export default DraftsPage;
