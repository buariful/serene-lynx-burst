import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Building,
  Home,
  Building2,
  Warehouse,
  ArrowRight,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom"; // For potential back navigation or logo link
import LandlordDashboardWrapper from "@/components/LandlordDashboardWrapper";
import InteractiveMap from "@/components/InteractiveMap";
import { useTranslation } from "react-i18next";

const propertyTypes = [
  { id: "apartment", label: "Apartment", icon: Building },
  { id: "house", label: "House", icon: Home },
  { id: "condo", label: "Condo", icon: Building2 },
  { id: "commercial", label: "Commercial", icon: Warehouse },
];
const apartmentTypes = [
  { id: "studio", label: "Studio" },
  { id: "1bed", label: "1 Bedroom" },
  { id: "2bed", label: "2 Bedroom" },
  { id: "3bed", label: "3 Bedroom" },
  { id: "4bed", label: "4+ Bedroom" },
  { id: "penthouse", label: "Penthouse" },
  { id: "loft", label: "Loft" },
  { id: "basement", label: "Basement" },
];
const houseTypes = [
  { id: "detached", label: "Detached" },
  { id: "semi-detached", label: "Semi-Detached" },
  { id: "townhouse", label: "Townhouse" },
  { id: "duplex", label: "Duplex" },
  { id: "triplex", label: "Triplex" },
  { id: "bungalow", label: "Bungalow" },
  { id: "cottage", label: "Cottage" },
  { id: "mansion", label: "Mansion" },
];

const LandlordPostRentalPage: React.FC = () => {
  const { t } = useTranslation();
  const [selectedPropertyType, setSelectedPropertyType] = useState<
    string | null
  >(null);
  const [selectedApartmentType, setSelectedApartmentType] = useState<
    string | null
  >(null);
  const [selectedHouseType, setSelectedHouseType] = useState<string | null>(
    null
  );
  const [address, setAddress] = useState("");
  const [unit, setUnit] = useState("");

  const handlePropertyTypeSelect = (typeId: string) => {
    setSelectedPropertyType(typeId);
  };
  const navigate = useNavigate();
  const handleNext = () => {
    navigate("/landlord/property-details");
  };

  const handleApartmentTypeSelect = (typeId: string) => {
    setSelectedApartmentType(typeId);
  };

  const handleHouseTypeSelect = (typeId: string) => {
    setSelectedHouseType(typeId);
  };

  return (
    <LandlordDashboardWrapper>
      <div className="min-h-screen bg-slate-50 dark:bg-slate-900 p-4 md:p-8">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Section 1: Property Type */}
          <Card className="shadow-lg border-slate-200 dark:border-slate-700 dark:bg-slate-800">
            <CardHeader>
              <CardTitle className="text-2xl font-semibold text-slate-800 dark:text-slate-100">
                {t('landlord.postRental.propertyType')}
              </CardTitle>
              <CardDescription className="text-slate-600 dark:text-slate-400">
                {t('landlord.postRental.propertyTypeDesc')}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {propertyTypes.map((type) => (
                  <Button
                    key={type.id}
                    variant={
                      selectedPropertyType === type.id ? "default" : "outline"
                    }
                    className={`h-auto py-4 flex flex-col items-center justify-center space-y-2 transition-all duration-200 rounded-lg
                    ${
                      selectedPropertyType === type.id
                        ? "bg-blue-600 hover:bg-blue-700 text-white border-blue-600"
                        : "border-slate-300 hover:border-blue-500 hover:bg-blue-50 dark:border-slate-600 dark:hover:border-blue-500 dark:hover:bg-slate-700 dark:text-slate-300"
                    }`}
                    onClick={() => handlePropertyTypeSelect(type.id)}
                  >
                    <type.icon
                      className={`h-8 w-8 mb-1 ${
                        selectedPropertyType === type.id
                          ? "text-white"
                          : "text-blue-600 dark:text-blue-400"
                      }`}
                    />
                    <span
                      className={`font-medium ${
                        selectedPropertyType === type.id
                          ? "text-white"
                          : "text-slate-700 dark:text-slate-200"
                      }`}
                    >
                      {type.label}
                    </span>
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Section 2: Apartment Type */}

          {selectedPropertyType === "apartment" && (
            <Card className="shadow-lg border-slate-200 dark:border-slate-700 dark:bg-slate-800">
              <CardHeader>
                <CardTitle className="text-2xl font-semibold text-slate-800 dark:text-slate-100">
                  {t('landlord.postRental.apartmentType')}
                </CardTitle>
                <CardDescription className="text-slate-600 dark:text-slate-400">
                  {t('landlord.postRental.apartmentTypeDesc')}
                </CardDescription>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {apartmentTypes.map((type) => (
                    <Button
                      key={type.id}
                      variant="outline"
                      className={`px-2 py-1 text-xs rounded font-medium flex items-center justify-center transition-all duration-200
                        ${
                          selectedApartmentType === type.id
                            ? "bg-blue-600 hover:bg-blue-700 text-white border-blue-600"
                            : "border-slate-300 hover:border-blue-500 hover:bg-blue-50 dark:border-slate-600 dark:hover:border-blue-500 dark:hover:bg-slate-700 dark:text-slate-300"
                        }`}
                      onClick={() => handleApartmentTypeSelect(type.id)}
                    >
                      <span className="font-medium">{type.label}</span>
                    </Button>
                  ))}
                </div>
              </CardHeader>
            </Card>
          )}

          {/* Section 3: House Type */}

          {selectedPropertyType === "house" && (
            <Card className="shadow-lg border-slate-200 dark:border-slate-700 dark:bg-slate-800">
              <CardHeader>
                <CardTitle className="text-2xl font-semibold text-slate-800 dark:text-slate-100">
                  {t('landlord.postRental.houseType')}
                </CardTitle>
                <CardDescription className="text-slate-600 dark:text-slate-400">
                  {t('landlord.postRental.houseTypeDesc')}
                </CardDescription>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {houseTypes.map((type) => (
                    <Button
                      key={type.id}
                      variant="outline"
                      className={`px-2 py-1 text-xs rounded font-medium flex items-center justify-center transition-all duration-200
                        ${
                          selectedHouseType === type.id
                            ? "bg-blue-600 hover:bg-blue-700 text-white border-blue-600"
                            : "border-slate-300 hover:border-blue-500 hover:bg-blue-50 dark:border-slate-600 dark:hover:border-blue-500 dark:hover:bg-slate-700 dark:text-slate-300"
                        }`}
                      onClick={() => handleHouseTypeSelect(type.id)}
                    >
                      <span className="font-medium">{type.label}</span>
                    </Button>
                  ))}
                </div>
              </CardHeader>
            </Card>
          )}

          {/* Section 2: Property Location */}
          <Card className="shadow-lg border-slate-200 dark:border-slate-700 dark:bg-slate-800">
            <CardHeader>
              <CardTitle className="text-2xl font-semibold text-slate-800 dark:text-slate-100">
                {t('landlord.postRental.propertyLocation')}
              </CardTitle>
              <CardDescription className="text-slate-600 dark:text-slate-400">
                {t('landlord.postRental.propertyLocationDesc')}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-grow space-y-1">
                  <label
                    htmlFor="address"
                    className="text-sm font-medium text-slate-700 dark:text-slate-300"
                  >
                    {t('landlord.postRental.addressRequired')}
                  </label>
                  <Input
                    id="address"
                    type="text"
                    placeholder={t('landlord.postRental.addressPlaceholder')}
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    required
                    className="rounded-md border-slate-300 dark:bg-slate-700 dark:border-slate-600 dark:text-slate-200"
                  />
                </div>
                <div className="sm:w-1/3 space-y-1">
                  <label
                    htmlFor="unit"
                    className="text-sm font-medium text-slate-700 dark:text-slate-300"
                  >
                    {t('landlord.postRental.unit')}
                  </label>
                  <Input
                    id="unit"
                    type="text"
                    placeholder={t('landlord.postRental.unitPlaceholder')}
                    value={unit}
                    onChange={(e) => setUnit(e.target.value)}
                    className="rounded-md border-slate-300 dark:bg-slate-700 dark:border-slate-600 dark:text-slate-200"
                  />
                </div>
              </div>

              <div className="my-6">
                <InteractiveMap properties={[]} onMarkerClick={() => {}} />
              </div>
            </CardContent>
          </Card>

          {/* Navigation Button */}
          <div className="flex justify-end pt-4">
            <Button
              size="lg"
              className="bg-green-600 hover:bg-green-700 text-white rounded-md px-6 py-3 text-base"
              onClick={handleNext}
              disabled={!selectedPropertyType || !address} // Example disabled state
              type="button"
            >
              {t('landlord.postRental.nextPropertyDetails')} <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </LandlordDashboardWrapper>
  );
};

export default LandlordPostRentalPage;
