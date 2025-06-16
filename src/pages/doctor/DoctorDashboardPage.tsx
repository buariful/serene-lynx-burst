import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Briefcase, Stethoscope, PlusCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const DoctorDashboardPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Doctor Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Quick Stats/Overview Cards - Placeholder */}
        <Card>
          <CardHeader>
            <CardTitle>Active Listings</CardTitle>
            <CardDescription>Your current property rentals.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">5</p> {/* Placeholder */}
            <Link to="/doctor/properties">
              <Button variant="link" className="px-0">View Listings</Button>
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Pending Applications</CardTitle>
            <CardDescription>Tenant applications awaiting review.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">3</p> {/* Placeholder */}
            {/* <Link to="/doctor/applications">
              <Button variant="link" className="px-0">Review Applications</Button>
            </Link> */}
             <p className="text-sm text-gray-500 mt-2">(Link to be implemented)</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Listed Devices</CardTitle>
            <CardDescription>Medical devices you've listed.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">12</p> {/* Placeholder */}
            <Link to="/doctor/devices">
              <Button variant="link" className="px-0">Manage Devices</Button>
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
                <CardTitle className="text-xl">Property Management</CardTitle>
                <CardDescription>Manage your rental listings and applications.</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <Link to="/doctor/properties/new">
              <Button className="w-full bg-blue-600 hover:bg-blue-700">
                <PlusCircle className="mr-2 h-5 w-5" /> Post New Property
              </Button>
            </Link>
            <Link to="/doctor/properties">
              <Button variant="outline" className="w-full">
                View My Listings
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <div className="flex items-center space-x-3">
              <Stethoscope className="h-8 w-8 text-green-600" />
              <div>
                <CardTitle className="text-xl">Medical Device Hub</CardTitle>
                <CardDescription>List, manage, or browse medical devices.</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <Link to="/doctor/devices/new">
              <Button className="w-full bg-green-600 hover:bg-green-700">
                <PlusCircle className="mr-2 h-5 w-5" /> List New Device
              </Button>
            </Link>
            <Link to="/doctor/devices/browse">
              <Button variant="outline" className="w-full">
                Browse Available Devices
              </Button>
            </Link>
             <Link to="/doctor/devices">
              <Button variant="outline" className="w-full mt-2">
                Manage My Device Listings
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DoctorDashboardPage;