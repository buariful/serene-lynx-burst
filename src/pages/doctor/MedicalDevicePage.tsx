import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from '@/components/ui/button';
import { PlusCircle, Search } from 'lucide-react';
import { Link } from 'react-router-dom';

// Placeholder components (to be created or expanded)
const PostDeviceForm = () => (
  <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow">
    <h2 className="text-xl font-semibold mb-4">List New Medical Device</h2>
    <p className="text-gray-600 dark:text-gray-300">Form to add device name, type, usage, documents, images will be here. (TODO)</p>
    {/* TODO: Implement form based on src/components/doctor/PostDeviceForm.tsx */}
    <Button className="mt-4">Submit Device</Button>
  </div>
);

const ManageDeviceListings = () => (
  <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow">
    <h2 className="text-xl font-semibold mb-4">Manage My Device Listings</h2>
    <p className="text-gray-600 dark:text-gray-300">Table/grid of listed devices with actions will be here. (TODO)</p>
    {/* TODO: Implement table for device listings */}
  </div>
);

const BrowseMedicalDevices = () => (
  <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow">
    <h2 className="text-xl font-semibold mb-4">Browse Medical Devices</h2>
    <p className="text-gray-600 dark:text-gray-300">Category cards, device list, detailed view, rent/buy options will be here. (TODO)</p>
    {/* TODO: Implement based on src/components/doctor/BrowseMedicalDevices.tsx */}
  </div>
);

const MedicalDevicePage: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Medical Device Hub</h1>
        <div>
          <Link to="/doctor/devices/new" className="mr-2">
            <Button className="bg-green-600 hover:bg-green-700">
              <PlusCircle className="mr-2 h-5 w-5" /> List New Device
            </Button>
          </Link>
          <Link to="/doctor/devices/browse">
            <Button variant="outline">
              <Search className="mr-2 h-5 w-5" /> Browse Devices
            </Button>
          </Link>
        </div>
      </div>

      <Tabs defaultValue="manage-my-devices" className="w-full">
        <TabsList className="grid w-full grid-cols-3 md:w-auto md:inline-grid">
          <TabsTrigger value="manage-my-devices">My Device Listings</TabsTrigger>
          <TabsTrigger value="list-new-device">List New Device</TabsTrigger>
          <TabsTrigger value="browse-devices">Browse Devices</TabsTrigger>
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