import React, { useState } from "react";
import DashboardHeader from "@/components/DashboardHeader";
import Footer from "@/components/Footer";

const appliedJobs = [
  { id: 1, title: "ICU Nurse", status: "Pending", date: "2024-06-01" },
  {
    id: 2,
    title: "Cardiology Consultant",
    status: "Interview",
    date: "2024-05-28",
  },
];

const buyingOrders = [
  { id: 1, item: "Medical Textbook", status: "Shipped", date: "2024-06-02" },
  { id: 2, item: "Stethoscope", status: "Delivered", date: "2024-05-30" },
];

const rentalServices = [
  {
    id: 1,
    property: "123 Main St, Toronto",
    status: "Active",
    start: "2024-05-01",
    end: "2025-05-01",
  },
  {
    id: 2,
    property: "456 Oak Ave, Vancouver",
    status: "Ended",
    start: "2023-04-01",
    end: "2024-04-01",
  },
];

const sidebarItems = [
  { key: "dashboard", label: "Dashboard" },
  { key: "jobs", label: "Applied Jobs" },
  { key: "orders", label: "Buying Orders" },
  { key: "rentals", label: "Rental Services" },
  { key: "profile", label: "Profile" },
];

const TenantDashboardPage = () => {
  const [activeTab, setActiveTab] = useState("dashboard");

  return (
    <>
      <DashboardHeader />
      <div className="min-h-screen bg-[#f7f9fa] flex">
        {/* Sidebar */}
        <aside className="w-56 p-6 bg-white border-r flex flex-col">
          <nav className="flex flex-col gap-2">
            {sidebarItems.map((item) => (
              <button
                key={item.key}
                className={`text-left px-4 py-2 rounded font-medium text-sm transition ${
                  activeTab === item.key
                    ? "bg-blue-600 text-white shadow"
                    : "text-[#7a9ca5] hover:bg-blue-50 hover:text-blue-600"
                }`}
                onClick={() => setActiveTab(item.key)}
              >
                {item.label}
              </button>
            ))}
          </nav>
        </aside>
        {/* Main Content */}
        <main className="flex-1 p-8">
          {activeTab === "dashboard" && (
            <>
              <h1 className="text-2xl font-bold mb-6">Tenant Dashboard</h1>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <div className="bg-blue-50 border rounded p-4 text-center">
                  <div className="text-2xl font-bold text-blue-700">
                    {appliedJobs.length}
                  </div>
                  <div className="text-xs text-gray-600">Applied Jobs</div>
                </div>
                <div className="bg-green-50 border rounded p-4 text-center">
                  <div className="text-2xl font-bold text-green-700">
                    {buyingOrders.length}
                  </div>
                  <div className="text-xs text-gray-600">Buying Orders</div>
                </div>
                <div className="bg-yellow-50 border rounded p-4 text-center">
                  <div className="text-2xl font-bold text-yellow-700">
                    {rentalServices.length}
                  </div>
                  <div className="text-xs text-gray-600">Rental Services</div>
                </div>
              </div>
            </>
          )}

          {activeTab === "jobs" && (
            <>
              <h2 className="text-xl font-bold mb-4">Applied Jobs</h2>
              <div className="bg-white border rounded">
                <div className="flex px-4 py-2 bg-gray-100 text-xs font-semibold text-gray-700 rounded-t">
                  <div className="flex-1">Title</div>
                  <div className="w-24">Status</div>
                  <div className="w-32">Date</div>
                </div>
                <ul>
                  {appliedJobs.map((job) => (
                    <li
                      key={job.id}
                      className="flex items-center px-4 py-2 border-t text-sm"
                    >
                      <div className="flex-1 truncate">{job.title}</div>
                      <div className="w-24">
                        <span
                          className={`px-2 py-1 rounded text-xs ${
                            job.status === "Interview"
                              ? "bg-green-100 text-green-700"
                              : "bg-gray-200 text-gray-500"
                          }`}
                        >
                          {job.status}
                        </span>
                      </div>
                      <div className="w-32 text-xs text-gray-500">
                        {job.date}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </>
          )}

          {activeTab === "orders" && (
            <>
              <h2 className="text-xl font-bold mb-4">Buying Orders</h2>
              <div className="bg-white border rounded">
                <div className="flex px-4 py-2 bg-gray-100 text-xs font-semibold text-gray-700 rounded-t">
                  <div className="flex-1">Item</div>
                  <div className="w-24">Status</div>
                  <div className="w-32">Date</div>
                </div>
                <ul>
                  {buyingOrders.map((order) => (
                    <li
                      key={order.id}
                      className="flex items-center px-4 py-2 border-t text-sm"
                    >
                      <div className="flex-1 truncate">{order.item}</div>
                      <div className="w-24">
                        <span
                          className={`px-2 py-1 rounded text-xs ${
                            order.status === "Delivered"
                              ? "bg-green-100 text-green-700"
                              : "bg-gray-200 text-gray-500"
                          }`}
                        >
                          {order.status}
                        </span>
                      </div>
                      <div className="w-32 text-xs text-gray-500">
                        {order.date}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </>
          )}

          {activeTab === "rentals" && (
            <>
              <h2 className="text-xl font-bold mb-4">Rental Services</h2>
              <div className="bg-white border rounded">
                <div className="flex px-4 py-2 bg-gray-100 text-xs font-semibold text-gray-700 rounded-t">
                  <div className="flex-1">Property</div>
                  <div className="w-24">Status</div>
                  <div className="w-32">Start</div>
                  <div className="w-32">End</div>
                </div>
                <ul>
                  {rentalServices.map((rental) => (
                    <li
                      key={rental.id}
                      className="flex items-center px-4 py-2 border-t text-sm"
                    >
                      <div className="flex-1 truncate">{rental.property}</div>
                      <div className="w-24">
                        <span
                          className={`px-2 py-1 rounded text-xs ${
                            rental.status === "Active"
                              ? "bg-green-100 text-green-700"
                              : "bg-gray-200 text-gray-500"
                          }`}
                        >
                          {rental.status}
                        </span>
                      </div>
                      <div className="w-32 text-xs text-gray-500">
                        {rental.start}
                      </div>
                      <div className="w-32 text-xs text-gray-500">
                        {rental.end}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </>
          )}

          {activeTab === "profile" && (
            <>
              <h2 className="text-xl font-bold mb-4">My Profile</h2>
              <div className="bg-white border rounded p-6 max-w-md">
                <div className="font-medium text-gray-800 mb-2">
                  Alex Tenant
                </div>
                <div className="text-xs text-gray-500 mb-1">
                  alex.tenant@example.com
                </div>
                <div className="text-xs text-gray-500 mb-4">
                  +1 555-222-3333
                </div>
                <button className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold py-2 px-6 rounded">
                  Edit Profile
                </button>
              </div>
            </>
          )}
        </main>
      </div>
      <Footer />
    </>
  );
};

export default TenantDashboardPage;
