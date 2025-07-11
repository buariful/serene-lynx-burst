import React from "react";
import Header from "@/components/Header";
import { Link, useLocation } from "react-router-dom";
import {
  Building2,
  Bell,
  Pencil,
  AlertCircle,
  Heart,
  User2,
} from "lucide-react";
import DashboardHeader from "./DashboardHeader";
import { IoIosLogOut } from "react-icons/io";
import { useTranslation } from 'react-i18next';

const LandlordDashboardWrapper: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const location = useLocation();
  const { t } = useTranslation();

  const sidebarItems = [
    { label: t('navigation.listings'), icon: Building2, path: "/landlord/dashboard" },
    { label: t('navigation.notifications'), icon: Bell, path: "/landlord/notifications" },
    { label: t('navigation.drafts'), icon: Pencil, path: "/landlord/drafts" },
    { label: t('navigation.alerts'), icon: AlertCircle, path: "/landlord/alerts" },
    { label: t('navigation.favourites'), icon: Heart, path: "/landlord/favourites" },
    { label: t('navigation.account'), icon: User2, path: "/landlord/account" },
    { label: t('navigation.logout'), icon: IoIosLogOut, path: "/login" },
  ];
  return (
    <>
      <DashboardHeader />
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="container flex">
          {/* Sidebar */}
          <aside className="w-56 p-6 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700">
            <nav className="flex flex-col gap-1">
              {sidebarItems.map((item) => {
                const isActive = location.pathname.startsWith(item.path);
                return (
                  <Link
                    key={item.label}
                    to={item.path}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-full font-medium text-base transition
                    ${
                      isActive
                        ? "bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 shadow"
                        : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-blue-600 dark:hover:text-blue-400"
                    }`}
                  >
                    <item.icon className="w-4 h-4" />
                    {item.label}
                  </Link>
                );
              })}
            </nav>
          </aside>
          {/* Main Content */}
          <main className="flex-1 bg-gray-50 dark:bg-gray-900">{children}</main>
        </div>
      </div>
    </>
  );
};

export default LandlordDashboardWrapper;
