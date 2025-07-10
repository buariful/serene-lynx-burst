import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from '@/components/ui/button';
import { PlusCircle, Search } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

// Placeholder components (to be created or expanded)
const PostDeviceForm = () => {
  const { t } = useTranslation();
  return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4">{t('doctor.medicalDevice.listNewDeviceTitle')}</h2>
      <p className="text-gray-600 dark:text-gray-300">{t('doctor.medicalDevice.listNewDeviceDesc')}</p>
      {/* TODO: Implement form based on src/components/doctor/PostDeviceForm.tsx */}
      <Button className="mt-4">{t('doctor.medicalDevice.submitDevice')}</Button>
    </div>
  );
};

const ManageDeviceListings = () => {
  const { t } = useTranslation();
  return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4">{t('doctor.medicalDevice.manageDeviceListingsTitle')}</h2>
      <p className="text-gray-600 dark:text-gray-300">{t('doctor.medicalDevice.manageDeviceListingsDesc')}</p>
      {/* TODO: Implement table for device listings */}
    </div>
  );
};

const BrowseMedicalDevices = () => {
  const { t } = useTranslation();
  return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4">{t('doctor.medicalDevice.browseMedicalDevicesTitle')}</h2>
      <p className="text-gray-600 dark:text-gray-300">{t('doctor.medicalDevice.browseMedicalDevicesDesc')}</p>
      {/* TODO: Implement based on src/components/doctor/BrowseMedicalDevices.tsx */}
    </div>
  );
};

const MedicalDevicePage: React.FC = () => {
  const { t } = useTranslation();
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">{t('doctor.medicalDevice.title')}</h1>
        <div>
          <Link to="/doctor/devices/new" className="mr-2">
            <Button className="bg-green-600 hover:bg-green-700">
              <PlusCircle className="mr-2 h-5 w-5" /> {t('doctor.medicalDevice.listNewDevice')}
            </Button>
          </Link>
          <Link to="/doctor/devices/browse">
            <Button variant="outline">
              <Search className="mr-2 h-5 w-5" /> {t('doctor.medicalDevice.browseDevices')}
            </Button>
          </Link>
        </div>
      </div>

      <Tabs defaultValue="manage-my-devices" className="w-full">
        <TabsList className="grid w-full grid-cols-3 md:w-auto md:inline-grid">
          <TabsTrigger value="manage-my-devices">{t('doctor.medicalDevice.myDeviceListings')}</TabsTrigger>
          <TabsTrigger value="list-new-device">{t('doctor.medicalDevice.listNewDeviceTab')}</TabsTrigger>
          <TabsTrigger value="browse-devices">{t('doctor.medicalDevice.browseDevicesTab')}</TabsTrigger>
        </TabsList>
        <TabsContent value="manage-my-devices" className="mt-4">
          <ManageDeviceListings />
        </TabsContent>
        <TabsContent value="list-new-device" className="mt-4">
          <PostDeviceForm />
        </TabsContent>
        <TabsContent value="browse-devices" className="mt-4">
          <BrowseMedicalDevices />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MedicalDevicePage;