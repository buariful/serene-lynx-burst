import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

// Placeholder components (to be created or expanded)
const PostPropertyForm = () => {
  const { t } = useTranslation();
  return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700">
      <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">{t('doctor.propertyManagement.postNewPropertyTitle')}</h2>
      <p className="text-gray-600 dark:text-gray-300">{t('doctor.propertyManagement.postNewPropertyDesc')}</p>
      {/* TODO: Implement form based on src/components/doctor/PostPropertyForm.tsx */}
      <Button className="mt-4 bg-blue-600 hover:bg-blue-700 text-white">{t('doctor.propertyManagement.submitProperty')}</Button>
    </div>
  );
};

const ManagePropertyListings = () => {
  const { t } = useTranslation();
  return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700">
      <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">{t('doctor.propertyManagement.managePropertyListingsTitle')}</h2>
      <p className="text-gray-600 dark:text-gray-300">{t('doctor.propertyManagement.managePropertyListingsDesc')}</p>
      {/* TODO: Implement table based on src/components/doctor/ManagePropertyListings.tsx */}
    </div>
  );
};


const PropertyManagementPage: React.FC = () => {
  const { t } = useTranslation();
  return (
    <div className="space-y-6 bg-gray-50 dark:bg-gray-900 min-h-screen p-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">{t('doctor.propertyManagement.title')}</h1>
        <Link to="/doctor/properties/new">
          <Button className="bg-blue-600 hover:bg-blue-700 text-white">
            <PlusCircle className="mr-2 h-5 w-5" /> {t('doctor.propertyManagement.postNewProperty')}
          </Button>
        </Link>
      </div>

      <Tabs defaultValue="manage-listings" className="w-full">
        <TabsList className="grid w-full grid-cols-2 md:w-1/2 bg-gray-200 dark:bg-gray-700">
          <TabsTrigger value="manage-listings" className="text-gray-700 dark:text-gray-300 data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800 data-[state=active]:text-gray-900 dark:data-[state=active]:text-white">{t('doctor.propertyManagement.manageListings')}</TabsTrigger>
          <TabsTrigger value="post-new" className="text-gray-700 dark:text-gray-300 data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800 data-[state=active]:text-gray-900 dark:data-[state=active]:text-white">{t('doctor.propertyManagement.postNewTab')}</TabsTrigger>
        </TabsList>
        <TabsContent value="manage-listings" className="mt-4">
          <ManagePropertyListings />
        </TabsContent>
        <TabsContent value="post-new" className="mt-4">
          {/* This tab content could directly render the form or a component that does */}
          <PostPropertyForm />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PropertyManagementPage;