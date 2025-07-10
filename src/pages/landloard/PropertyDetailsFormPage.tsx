import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Toggle } from "@/components/ui/toggle";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Sparkles,
  Thermometer,
  Wifi,
  Droplets,
  Tv2,
  PlugZap, // Utilities
  Briefcase,
  GraduationCap,
  Users,
  Building,
  Repeat,
  Plane, // Categories
  CalendarDays,
  Dog,
  Sofa,
  Clock,
  FileText,
  ArrowRight,
  ArrowLeft, // General & Icons
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import LandlordDashboardWrapper from "@/components/LandlordDashboardWrapper";
import { useTranslation } from "react-i18next";

const utilityOptions = [
  { id: "not-included", label: "Not Included", icon: PlugZap },
  { id: "cable", label: "Cable", icon: Tv2 },
  { id: "heating", label: "Heating", icon: Thermometer },
  { id: "hydro", label: "Hydro/Electricity", icon: Sparkles },
  { id: "internet", label: "Internet/WiFi", icon: Wifi },
  { id: "satellite", label: "Satellite TV", icon: Tv2 },
  { id: "water", label: "Water", icon: Droplets },
];

const categoryOptions = [
  { id: "corporate", label: "Corporate Housing", icon: Briefcase },
  { id: "student", label: "Student Housing", icon: GraduationCap },
  { id: "senior", label: "Senior Housing", icon: Users },
  { id: "coop", label: "Co-op Housing", icon: Building },
  { id: "sublet", label: "Sublet", icon: Repeat },
  { id: "vacation", label: "Vacation", icon: Plane },
];

const yearBuiltOptions = () => {
  const currentYear = new Date().getFullYear();
  const years = [];
  for (let i = currentYear; i >= currentYear - 100; i--) {
    years.push({ value: i.toString(), label: i.toString() });
  }
  return years;
};

const PropertyDetailsFormPage: React.FC = () => {
  const { t } = useTranslation();
  const [selectedUtilities, setSelectedUtilities] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [yearBuilt, setYearBuilt] = useState<string>("");
  const [petFriendly, setPetFriendly] = useState<string | undefined>(undefined);
  const [furnished, setFurnished] = useState<string | undefined>(undefined);
  const [shortTerm, setShortTerm] = useState<string | undefined>(undefined);
  const [leaseTerm, setLeaseTerm] = useState<string>("1year");
  const [parkingType, setParkingType] = useState<string>("No Parking");

  const handleToggleMultiSelect = (
    selectedItems: string[],
    setter: React.Dispatch<React.SetStateAction<string[]>>,
    value: string
  ) => {
    if (selectedItems.includes(value)) {
      setter(selectedItems.filter((item) => item !== value));
    } else {
      setter([...selectedItems, value]);
    }
  };

  const navigate = useNavigate();

  const handleSubmit = () => {
    console.log({
      selectedUtilities,
      selectedCategories,
      yearBuilt,
      petFriendly,
      furnished,
      shortTerm,
      leaseTerm,
      parkingType,
    });
    navigate("/landlord/listing-details");
  };

  return (
    <LandlordDashboardWrapper>
      <div className="min-h-screen bg-slate-50 dark:bg-slate-900 p-4 md:p-8">
        <div className="max-w-3xl mx-auto space-y-8">
          <header className="mb-8">
            <h1 className="text-3xl font-bold text-slate-800 dark:text-slate-100">
              {t('landlord.propertyDetailsForm.title')}
            </h1>
            <p className="text-slate-600 dark:text-slate-400 mt-1">
              {t('landlord.propertyDetailsForm.subtitle')}
            </p>
          </header>

          {/* Utilities Included */}
          <Card className="shadow-md border-slate-200 dark:border-slate-700 dark:bg-slate-800">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-slate-800 dark:text-slate-100">
                {t('landlord.propertyDetailsForm.utilitiesIncluded')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-3">
                {utilityOptions.map((util) => (
                  <Toggle
                    key={util.id}
                    variant="outline"
                    pressed={selectedUtilities.includes(util.id)}
                    onPressedChange={() =>
                      handleToggleMultiSelect(
                        selectedUtilities,
                        setSelectedUtilities,
                        util.id
                      )
                    }
                    className="data-[state=on]:bg-blue-500 data-[state=on]:text-white data-[state=on]:border-blue-500 
                             border-slate-300 hover:bg-slate-100 dark:border-slate-600 dark:hover:bg-slate-700 
                             dark:data-[state=on]:bg-blue-600 dark:data-[state=on]:border-blue-600
                             rounded-full px-4 py-2 text-sm h-auto"
                  >
                    <util.icon className="mr-2 h-4 w-4" />
                    {util.label}
                  </Toggle>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Categories */}
          <Card className="shadow-md border-slate-200 dark:border-slate-700 dark:bg-slate-800">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-slate-800 dark:text-slate-100">
                {t('landlord.propertyDetailsForm.categories')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-3">
                {categoryOptions.map((cat) => (
                  <Toggle
                    key={cat.id}
                    variant="outline"
                    pressed={selectedCategories.includes(cat.id)}
                    onPressedChange={() =>
                      handleToggleMultiSelect(
                        selectedCategories,
                        setSelectedCategories,
                        cat.id
                      )
                    }
                    className="data-[state=on]:bg-blue-100 data-[state=on]:border-blue-500 data-[state=on]:text-blue-700
                             border-slate-300 hover:bg-slate-100 dark:border-slate-600 dark:hover:bg-slate-700
                             dark:data-[state=on]:bg-blue-900 dark:data-[state=on]:border-blue-500 dark:data-[state=on]:text-blue-300
                             rounded-full px-4 py-2 text-sm h-auto"
                  >
                    <cat.icon className="mr-2 h-4 w-4" />
                    {cat.label}
                  </Toggle>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Year Built */}
          <Card className="shadow-md border-slate-200 dark:border-slate-700 dark:bg-slate-800">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-slate-800 dark:text-slate-100">
                {t('landlord.propertyDetailsForm.yearBuilt')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Select value={yearBuilt} onValueChange={setYearBuilt}>
                <SelectTrigger className="w-full md:w-1/2 rounded-md border-slate-300 dark:bg-slate-700 dark:border-slate-600 dark:text-slate-200">
                  <CalendarDays className="mr-2 h-4 w-4 text-slate-500 dark:text-slate-400" />
                  <SelectValue placeholder={t('landlord.propertyDetailsForm.selectYear')} />
                </SelectTrigger>
                <SelectContent className="dark:bg-slate-800 dark:border-slate-700">
                  {yearBuiltOptions().map((year) => (
                    <SelectItem
                      key={year.value}
                      value={year.value}
                      className="dark:text-slate-200 dark:hover:bg-slate-700"
                    >
                      {year.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </CardContent>
          </Card>

          {/* Toggle Questions */}
          <Card className="shadow-md border-slate-200 dark:border-slate-700 dark:bg-slate-800">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-slate-800 dark:text-slate-100">
                {t('landlord.propertyDetailsForm.additionalDetails')}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {[
                {
                  id: "petFriendly",
                  label: t('landlord.propertyDetailsForm.petFriendly'),
                  icon: Dog,
                  value: petFriendly,
                  setter: setPetFriendly,
                },
                {
                  id: "furnished",
                  label: t('landlord.propertyDetailsForm.furnished'),
                  icon: Sofa,
                  value: furnished,
                  setter: setFurnished,
                },
                {
                  id: "shortTerm",
                  label: t('landlord.propertyDetailsForm.shortTerm'),
                  icon: Clock,
                  value: shortTerm,
                  setter: setShortTerm,
                },
              ].map((q) => (
                <div key={q.id}>
                  <Label className="text-base font-medium text-slate-700 dark:text-slate-300 flex items-center mb-2">
                    <q.icon className="mr-2 h-5 w-5 text-slate-500 dark:text-slate-400" />{" "}
                    {q.label}
                  </Label>
                  <RadioGroup
                    value={q.value}
                    onValueChange={q.setter}
                    className="flex gap-3"
                  >
                    <RadioGroupItem
                      value="yes"
                      id={`${q.id}-yes`}
                      className="sr-only"
                    />
                    <Label
                      htmlFor={`${q.id}-yes`}
                      className={`flex-1 cursor-pointer rounded-full border px-4 py-2 text-sm text-center transition-colors
                                ${
                                  q.value === "yes"
                                    ? "bg-blue-500 text-white border-blue-500 dark:bg-blue-600 dark:border-blue-600"
                                    : "border-slate-300 hover:bg-slate-100 dark:border-slate-600 dark:hover:bg-slate-700 dark:text-slate-300"
                                }`}
                    >
                      {t('landlord.propertyDetailsForm.yes')}
                    </Label>
                    <RadioGroupItem
                      value="no"
                      id={`${q.id}-no`}
                      className="sr-only"
                    />
                    <Label
                      htmlFor={`${q.id}-no`}
                      className={`flex-1 cursor-pointer rounded-full border px-4 py-2 text-sm text-center transition-colors
                                ${
                                  q.value === "no"
                                    ? "bg-blue-500 text-white border-blue-500 dark:bg-blue-600 dark:border-blue-600"
                                    : "border-slate-300 hover:bg-slate-100 dark:border-slate-600 dark:hover:bg-slate-700 dark:text-slate-300"
                                }`}
                    >
                      {t('landlord.propertyDetailsForm.no')}
                    </Label>
                  </RadioGroup>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Lease Term */}
          <Card className="shadow-md border-slate-200 dark:border-slate-700 dark:bg-slate-800">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-slate-800 dark:text-slate-100">
                {t('landlord.propertyDetailsForm.leaseTerm')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <RadioGroup
                value={leaseTerm}
                onValueChange={setLeaseTerm}
                className="flex flex-col sm:flex-row gap-3"
              >
                {[
                  { id: "1year", label: t('landlord.propertyDetailsForm.oneYear') },
                  { id: "monthly", label: t('landlord.propertyDetailsForm.monthly') },
                  { id: "negotiable", label: t('landlord.propertyDetailsForm.negotiable') },
                ].map((term) => (
                  <div key={term.id} className="flex-1">
                    <RadioGroupItem
                      value={term.id}
                      id={`lease-${term.id}`}
                      className="sr-only"
                    />
                    <Label
                      htmlFor={`lease-${term.id}`}
                      className={`block cursor-pointer rounded-full border px-4 py-2 text-sm text-center transition-colors
                                ${
                                  leaseTerm === term.id
                                    ? "bg-blue-500 text-white border-blue-500 dark:bg-blue-600 dark:border-blue-600"
                                    : "border-slate-300 hover:bg-slate-100 dark:border-slate-600 dark:hover:bg-slate-700 dark:text-slate-300"
                                }`}
                    >
                      {term.label}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </CardContent>
          </Card>

          {/* Parking type */}
          <Card className="shadow-md border-slate-200 dark:border-slate-700 dark:bg-slate-800">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-slate-800 dark:text-slate-100">
                {t('landlord.propertyDetailsForm.parkingType')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <RadioGroup
                value={parkingType}
                onValueChange={setParkingType}
                className="flex flex-col sm:flex-row gap-3"
              >
                {[
                  { id: "No Parking", label: t('landlord.propertyDetailsForm.noParking') },
                  { id: "Garage", label: t('landlord.propertyDetailsForm.garage') },
                  { id: "Driveway", label: t('landlord.propertyDetailsForm.driveway') },
                  { id: "Underg", label: t('landlord.propertyDetailsForm.underg') },
                  { id: "Street", label: t('landlord.propertyDetailsForm.street') },
                ].map((term) => (
                  <div key={term.id} className="flex-1">
                    <RadioGroupItem
                      value={term.id}
                      id={`lease-${term.id}`}
                      className="sr-only"
                    />
                    <Label
                      htmlFor={`lease-${term.id}`}
                      className={`block cursor-pointer rounded-full border px-4 py-2 text-sm text-center transition-colors
                                ${
                                  parkingType === term.id
                                    ? "bg-blue-500 text-white border-blue-500 dark:bg-blue-600 dark:border-blue-600"
                                    : "border-slate-300 hover:bg-slate-100 dark:border-slate-600 dark:hover:bg-slate-700 dark:text-slate-300"
                                }`}
                    >
                      {term.label}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </CardContent>
          </Card>

          {/* Navigation Button */}
          <div className="flex justify-between items-center pt-4">
            <Button
              variant="outline"
              onClick={() => navigate("/landlord/post-rental")}
              className="dark:text-slate-300 dark:border-slate-600 dark:hover:bg-slate-700"
            >
              <ArrowLeft className="mr-2 h-4 w-4" /> {t('common.back')}
            </Button>

            <Button
              size="lg"
              className="bg-green-600 hover:bg-green-700 text-white rounded-md px-6 py-3 text-base"
              onClick={handleSubmit}
            >
              {t('landlord.propertyDetailsForm.saveContinue')} <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </LandlordDashboardWrapper>
  );
};

export default PropertyDetailsFormPage;
