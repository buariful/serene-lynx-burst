import React from "react";
import LandlordDashboardWrapper from "@/components/LandlordDashboardWrapper";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Building2 } from "lucide-react";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

const PropertyDetailsPage: React.FC = () => {
  const { id } = useParams();
  const { t } = useTranslation();
  
  // Placeholder: In a real app, fetch property details by id
  return (
    <LandlordDashboardWrapper>
      <div className="max-w-2xl mx-auto mt-12">
        <Card className="shadow-md border-slate-200 dark:border-slate-700 dark:bg-slate-800">
          <CardHeader>
            <div className="flex items-center space-x-3">
              <Building2 className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              <CardTitle className="text-xl font-semibold text-slate-800 dark:text-slate-100">
                {t('landlord.propertyDetails.title')}
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4 mt-4">
            <div className="text-slate-700 dark:text-slate-200">
              <strong>{t('landlord.propertyDetails.propertyId')}</strong> {id}
            </div>
            <div className="text-slate-600 dark:text-slate-300">
              {t('landlord.propertyDetails.placeholderText')} {id} {t('landlord.propertyDetails.placeholderText')}.
            </div>
          </CardContent>
        </Card>
      </div>
    </LandlordDashboardWrapper>
  );
};

export default PropertyDetailsPage;
