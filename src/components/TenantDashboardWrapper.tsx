import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, User2, Menu, X, Building2, Briefcase, FileText } from "lucide-react";
import Header from "@/components/Header";
import DashboardHeader from "@/components/DashboardHeader";
import { IoIosLogOut } from "react-icons/io";
import { useTranslation } from "react-i18next";

const TenantDashboardWrapper: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const location = useLocation();
  const { t } = useTranslation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const sidebarItems = [
    { label: t('navigation.dashboard'), icon: Home, path: "/tenant/dashboard" },
    { label: t('navigation.jobs'), icon: Briefcase, path: "/tenant/jobs" },
    { label: t('navigation.rentalServices'), icon: Building2, path: "/tenant/rental-services" },
    { label: t('navigation.marketplace'), icon: FileText, path: "/tenant/marketplace" },
    { label: t('navigation.account'), icon: User2, path: "/tenant/account" },
    { label: t('navigation.logout'), icon: IoIosLogOut, path: "/login" },
  ];

  return (
    <>
      <DashboardHeader />
      {/* Mobile sidebar toggle button */}
      <div className="md:hidden flex items-center px-4 py-2 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 sticky top-0">
        <button
          aria-label="Open sidebar"
          className="text-gray-700 dark:text-gray-200 focus:outline-none"
          onClick={() => setSidebarOpen(true)}
        >
          <Menu className="h-6 w-6" />
        </button>
        <span className="ml-4 font-semibold text-lg text-blue-600 dark:text-blue-400">{t("navigation.dashboard")}</span>
      </div>
      {/* Sidebar overlay for mobile */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 bg-black bg-opacity-40 md:hidden" onClick={() => setSidebarOpen(false)}>
          <aside
            className="absolute left-0 top-0 h-full w-64 bg-white dark:bg-gray-800 shadow-lg p-6"
            onClick={e => e.stopPropagation()}
          >
            <button
              aria-label="Close sidebar"
              className="self-end mb-4 text-gray-700 dark:text-gray-200"
              onClick={() => setSidebarOpen(false)}
            >
              <X className="h-6 w-6" />
            </button>
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
                    onClick={() => setSidebarOpen(false)}
                  >
                    <item.icon className="w-4 h-4" />
                    {item.label}
                  </Link>
                );
              })}
            </nav>
          </aside>
        </div>
      )}
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 md:flex">
        {/* Sidebar for desktop */}
        <aside className="hidden md:block w-56 p-6 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700">
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
        <main className="flex-1 bg-gray-50 dark:bg-gray-900 md:p-8">{children}</main>
      </div>
    </>
  );
};

export default TenantDashboardWrapper;
