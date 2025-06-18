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

const sidebarItems = [
  { label: "Listings", icon: Building2, path: "/landlord/dashboard" },
  { label: "Notifications", icon: Bell, path: "/landlord/notifications" },
  { label: "Drafts", icon: Pencil, path: "/landlord/drafts" },
  { label: "Alerts", icon: AlertCircle, path: "/landlord/alerts" },
  { label: "Favourites", icon: Heart, path: "/landlord/favourites" },
  { label: "Account", icon: User2, path: "/landlord/account" },
];

const LandlordDashboardWrapper: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const location = useLocation();
  return (
    <>
      <Header />
      <div className="min-h-screen bg-[#f7f9fa] flex">
        {/* Sidebar */}
        <aside className="w-56 p-6">
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
                        ? "bg-white text-[#2563eb] shadow"
                        : "text-[#7a9ca5] hover:bg-white/80 hover:text-[#2563eb]"
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
        <main className="flex-1">{children}</main>
      </div>
    </>
  );
};

export default LandlordDashboardWrapper;
