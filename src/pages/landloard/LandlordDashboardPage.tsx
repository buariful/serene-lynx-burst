import React from "react";
import { Link } from "react-router-dom";
import {
  Building2,
  Bell,
  Pencil,
  AlertCircle,
  Heart,
  User2,
  Search,
  ChevronDown,
  Plus,
} from "lucide-react";
import LandlordDashboardWrapper from "@/components/LandlordDashboardWrapper";

const sidebarItems = [
  { label: "Listings", icon: Building2, active: true },
  { label: "Notifications", icon: Bell },
  { label: "Drafts", icon: Pencil },
  { label: "Alerts", icon: AlertCircle },
  { label: "Favourites", icon: Heart },
  { label: "Account", icon: User2 },
];

const tabs = ["All", "Active", "Pending", "Disabled"];

export default function LandlordDashboardPage() {
  return (
    <LandlordDashboardWrapper>
      <div className="flex min-h-screen">
        {/* Sidebar */}
        <aside className="w-56 p-6">
          <nav className="flex flex-col gap-1">
            {sidebarItems.map((item) => (
              <button
                key={item.label}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-full font-medium text-base transition ${
                  item.active
                    ? "bg-white text-[#2563eb] shadow"
                    : "text-[#7a9ca5] hover:bg-white/80 hover:text-[#2563eb]"
                }`}
              >
                <item.icon className="w-4 h-4" />
                {item.label}
              </button>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8">
          {/* Title and Tabs */}
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-bold text-[#2563eb] flex items-center gap-2">
              <Building2 className="w-6 h-6" />
              Listings
            </h1>
            <div className="flex gap-6 ml-6 border-b border-[#e3e8ee] flex-1">
              {tabs.map((tab, idx) => (
                <button
                  key={tab}
                  className={`pb-1.5 text-base font-medium transition ${
                    idx === 0
                      ? "border-b-2 border-[#2563eb] text-[#2563eb]"
                      : "text-[#7a9ca5] hover:text-[#2563eb]"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {/* Search and Sort */}
          <div className="flex items-center gap-3 mt-8">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#7a9ca5] w-4 h-4" />
              <input
                type="text"
                placeholder="Search by Address"
                className="w-full pl-10 pr-3 py-2.5 rounded-full border border-[#e3e8ee] bg-white text-[#2563eb] focus:outline-none text-sm"
              />
            </div>
            <button className="flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-[#e3e8ee] text-[#2563eb] font-medium text-sm">
              Sort By
              <ChevronDown className="w-4 h-4" />
            </button>
          </div>

          {/* Post a Rental */}
          <div className="mt-6 bg-white border-2 border-dashed border-[#b6d6e2] rounded-lg flex flex-col items-center justify-center py-8">
            {/* Illustration placeholder */}
            <svg height="48" viewBox="0 0 400 48" fill="none">
              <rect width="400" height="48" fill="#e3e8ee" />
              {/* You can add your own SVG illustration here */}
            </svg>
            <Link
              to="/landlord/post-rental"
              className="mt-3 flex items-center gap-1.5 px-6 py-2.5 bg-[#2563eb] text-white rounded-full font-semibold text-base shadow hover:bg-[#1d4fd7] transition"
            >
              <Plus className="w-4 h-4" />
              Post a Rental
            </Link>
          </div>
        </main>
      </div>
    </LandlordDashboardWrapper>
  );
}
