import React from "react";
import LandlordDashboardWrapper from "@/components/LandlordDashboardWrapper";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Building2 } from "lucide-react";
import { useParams } from "react-router-dom";

const PropertyDetailsPage: React.FC = () => {
  const { id } = useParams();
  // Placeholder: In a real app, fetch property details by id
  return (
    <LandlordDashboardWrapper>
      <div className="max-w-2xl mx-auto mt-12">
        <Card className="shadow-md border-slate-200 dark:border-slate-700 dark:bg-slate-800">
          <CardHeader>
            <div className="flex items-center space-x-3">
              <Building2 className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              <CardTitle className="text-xl font-semibold text-slate-800 dark:text-slate-100">
                Property Details
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4 mt-4">
            <div className="text-slate-700 dark:text-slate-200">
              <strong>Property ID:</strong> {id}
            </div>
            <div className="text-slate-600 dark:text-slate-300">
              This is a placeholder for property details. In a real app, you
              would fetch and display all relevant information for property ID{" "}
              {id} here.
            </div>
          </CardContent>
        </Card>
      </div>
    </LandlordDashboardWrapper>
  );
};

export default PropertyDetailsPage;
