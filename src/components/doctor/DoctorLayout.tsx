import React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Home, Briefcase, Stethoscope, LogOut, Settings, User } from 'lucide-react'; // Added User for Profile
import Logo from '@/components/Logo'; // Assuming Logo component exists

const DoctorLayout: React.FC = () => {
  const location = useLocation();

  const navItems = [
    { path: '/doctor/dashboard', label: 'Dashboard', icon: Home },
    { path: '/doctor/properties', label: 'Property Management', icon: Briefcase },
    { path: '/doctor/devices', label: 'Medical Devices', icon: Stethoscope },
    { path: '/doctor/profile', label: 'Profile', icon: User }, // Added Profile
    { path: '/doctor/settings', label: 'Settings', icon: Settings },
  ];

  // TODO: Implement actual logout logic
  const handleLogout = () => {
    console.log("Logout clicked");
    // navigate('/login'); 
  };

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
      {/* Sidebar */}
      <aside className="w-64 bg-white dark:bg-gray-800 shadow-md flex flex-col">
        <div className="p-4 border-b dark:border-gray-700">
          <Logo />
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Doctor Portal</p>
        </div>
        <nav className="flex-grow p-4 space-y-2">
          {navItems.map((item) => (
            <Link key={item.path} to={item.path}>
              <Button
                variant={location.pathname.startsWith(item.path) ? 'secondary' : 'ghost'}
                className="w-full justify-start"
              >
                <item.icon className="mr-2 h-5 w-5" />
                {item.label}
              </Button>
            </Link>
          ))}
        </nav>
        <div className="p-4 border-t dark:border-gray-700">
          <Button variant="ghost" className="w-full justify-start" onClick={handleLogout}>
            <LogOut className="mr-2 h-5 w-5" />
            Logout
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-6">
        <Outlet /> {/* Nested routes will render here */}
      </main>
    </div>
  );
};

export default DoctorLayout;