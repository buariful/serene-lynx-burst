import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Briefcase, Stethoscope, PlusCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const DoctorDashboardPage: React.FC = () => {
  const { t } = useTranslation();
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white">{t('doctor.dashboard.title')}</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Quick Stats/Overview Cards - Placeholder */}
        <Card>
          <CardHeader>
            <CardTitle>{t('doctor.dashboard.activeListings')}</CardTitle>
            <CardDescription>{t('doctor.dashboard.activeListingsDesc')}</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">5</p> {/* Placeholder */}
            <Link to="/doctor/properties">
              <Button variant="link" className="px-0">{t('doctor.dashboard.viewListings')}</Button>
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{t('doctor.dashboard.pendingApplications')}</CardTitle>
            <CardDescription>{t('doctor.dashboard.pendingApplicationsDesc')}</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">3</p> {/* Placeholder */}
            {/* <Link to="/doctor/applications">
              <Button variant="link" className="px-0">{t('doctor.dashboard.reviewApplications')}</Button>
            </Link> */}
             <p className="text-sm text-gray-500 mt-2">{t('doctor.dashboard.linkToBeImplemented')}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{t('doctor.dashboard.listedDevices')}</CardTitle>
            <CardDescription>{t('doctor.dashboard.listedDevicesDesc')}</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">12</p> {/* Placeholder */}
            <Link to="/doctor/devices">
              <Button variant="link" className="px-0">{t('doctor.dashboard.manageDevices')}</Button>
            </Link>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <div className="flex items-center space-x-3">
              <Briefcase className="h-8 w-8 text-blue-600" />
              <div>
                <CardTitle className="text-xl">{t('doctor.dashboard.propertyManagement')}</CardTitle>
                <CardDescription>{t('doctor.dashboard.propertyManagementDesc')}</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <Link to="/doctor/properties/new">
              <Button className="w-full bg-blue-600 hover:bg-blue-700">
                <PlusCircle className="mr-2 h-5 w-5" /> {t('doctor.dashboard.postNewProperty')}
              </Button>
            </Link>
            <Link to="/doctor/properties">
              <Button variant="outline" className="w-full">
                {t('doctor.dashboard.viewMyListings')}
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <div className="flex items-center space-x-3">
              <Stethoscope className="h-8 w-8 text-green-600" />
              <div>
                <CardTitle className="text-xl">{t('doctor.dashboard.medicalDeviceHub')}</CardTitle>
                <CardDescription>{t('doctor.dashboard.medicalDeviceHubDesc')}</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <Link to="/doctor/devices/new">
              <Button className="w-full bg-green-600 hover:bg-green-700">
                <PlusCircle className="mr-2 h-5 w-5" /> {t('doctor.dashboard.listNewDevice')}
              </Button>
            </Link>
            <Link to="/doctor/devices/browse">
              <Button variant="outline" className="w-full">
                {t('doctor.dashboard.browseAvailableDevices')}
              </Button>
            </Link>
             <Link to="/doctor/devices">
              <Button variant="outline" className="w-full mt-2">
                {t('doctor.dashboard.manageMyDeviceListings')}
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DoctorDashboardPage;