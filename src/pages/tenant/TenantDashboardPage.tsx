import DashboardHeader from "@/components/DashboardHeader";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

const sidebarItems = [
  { key: "dashboard", label: "Dashboard" },
  { key: "jobs", label: "Applied Jobs" },
  // { key: "orders", label: "Buying Orders" },
  { key: "rentals", label: "Rental Services" },
  { key: "profile", label: "Profile" },
  { key: "marketplace", label: "Marketplace", route: "/tenant/marketplace" },
  { key: "logout", label: "Logout", route: "/login" },
];

const Dashboard = () => {
  const navigate = useNavigate();
  return (
    <div className="p-6 min-h-screen bg-gray-50 space-y-8">
      {/* Welcome Section */}
      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="text-3xl font-bold">Welcome back, John 👋</h2>
        <p className="text-gray-600 mt-2">
          Here's a snapshot of your current activity and suggestions tailored
          for you.
        </p>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-blue-100 p-6 rounded-xl shadow">
          <h3 className="text-lg font-medium">Applied Jobs</h3>
          <p className="text-3xl font-bold mt-2">4</p>
        </div>
        <div className="bg-green-100 p-6 rounded-xl shadow">
          <h3 className="text-lg font-medium">Active Rentals</h3>
          <p className="text-3xl font-bold mt-2">1</p>
        </div>
        <div className="bg-yellow-100 p-6 rounded-xl shadow">
          <h3 className="text-lg font-medium">Upcoming Lease End</h3>
          <p className="text-3xl font-bold mt-2">30 days</p>
        </div>
        <div className="bg-purple-100 p-6 rounded-xl shadow">
          <h3 className="text-lg font-medium">Unread Messages</h3>
          <p className="text-3xl font-bold mt-2">2</p>
        </div>
      </div>

      {/* Notifications */}
      <div className="bg-white rounded-xl shadow p-6">
        <h3 className="text-xl font-semibold mb-4">Recent Notifications</h3>
        <ul className="space-y-2 text-gray-700">
          <li>✅ Your lease for Greenwood Villa has been approved.</li>
          <li>📬 You received a message from Mercy Hospital.</li>
          <li>📅 Reminder: Your lease ends in 30 days. Renew now.</li>
        </ul>
      </div>

      {/* Suggested Opportunities */}
      <div className="bg-white rounded-xl shadow p-6">
        <h3 className="text-xl font-semibold mb-4">Suggested Opportunities</h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="border p-4 rounded-xl hover:shadow transition">
            <h4 className="font-semibold">Rental at Oak Apartments</h4>
            <p className="text-gray-600">2 Bed • $1200/mo • Downtown</p>
          </div>
          <div className="border p-4 rounded-xl hover:shadow transition">
            <h4 className="font-semibold">Job: Nursing Assistant</h4>
            <p className="text-gray-600">Mercy hospitals • Full Time</p>
          </div>
          <div className="border p-4 rounded-xl hover:shadow transition">
            <h4 className="font-semibold">Rental at Lakeview Residences</h4>
            <p className="text-gray-600">1 Bed • $950/mo • Lakeside</p>
          </div>
        </div>
      </div>

      {/* Call to Actions */}
      <div className="flex flex-col sm:flex-row gap-4">
        <button
          onClick={() => navigate("/tenant/marketplace")}
          className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold shadow"
        >
          🔍 Find More Jobs
        </button>
        <button
          onClick={() => navigate("/tenant/marketplace")}
          className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-semibold shadow"
        >
          🏠 Explore Rentals
        </button>
      </div>
    </div>
  );
};

const AppliedJobsPage = () => {
  const navigate = useNavigate();
  const jobs = [
    {
      id: 1,
      title: "Nurse",
      hospital: "City Hospital",
      date: "2025-06-10",
      status: "Under Review",
      type: "Full-time",
      location: "Toronto",
      salary: "$3200/mo",
    },
    {
      id: 2,
      title: "Lab Technician",
      hospital: "HealthCare Plus",
      date: "2025-06-08",
      status: "Accepted",
      type: "Part-time",
      location: "Ottawa",
      salary: "$1800/mo",
    },
    {
      id: 3,
      title: "Caregiver",
      hospital: "Mercy Hospital",
      date: "2025-06-05",
      status: "Rejected",
      type: "Contract",
      location: "Vancouver",
      salary: "$2500/mo",
    },
    {
      id: 4,
      title: "Medical Assistant",
      hospital: "Saint Mary Clinic",
      date: "2025-06-01",
      status: "Under Review",
      type: "Full-time",
      location: "Montreal",
      salary: "$3000/mo",
    },
  ];

  return (
    <div className="p-6 min-h-screen bg-gray-50 space-y-6">
      <div className="bg-white p-6 rounded-xl shadow">
        <h2 className="text-3xl font-bold mb-2">Applied Jobs</h2>
        <p className="text-gray-600">
          Here's a list of the jobs you've applied to with their current status
          and details.
        </p>
      </div>

      <div className="space-y-4">
        {jobs.map((job) => (
          <div
            key={job.id}
            className="bg-white p-6 rounded-xl shadow flex flex-col md:flex-row md:items-center justify-between gap-4"
          >
            <div>
              <h3 className="text-xl font-semibold">
                {job.title} at {job.hospital}
              </h3>
              <p className="text-sm text-gray-600">Applied on {job.date}</p>
              <p className="text-sm text-gray-600 mt-1">
                {job.type} • {job.location} • {job.salary}
              </p>
            </div>
            <div className="flex flex-col md:items-end">
              <span
                className={`px-3 py-1 rounded-full text-sm font-medium ${
                  job.status === "Accepted"
                    ? "bg-green-100 text-green-800"
                    : job.status === "Rejected"
                    ? "bg-red-100 text-red-700"
                    : "bg-yellow-100 text-yellow-800"
                }`}
              >
                {job.status}
              </span>
              <button
                onClick={() => navigate("/hospital/product/2")}
                className="mt-3 text-blue-600 hover:underline text-sm"
              >
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const TenantRentalServicePage = () => {
  const rental = {
    property: "Greenwood Villa",
    address: "123 Maple St, Toronto",
    leaseStart: "2025-01-01",
    leaseEnd: "2025-12-31",
    rent: "$1500/mo",
    landlord: "John Smith",
    contact: "john.smith@email.com",
  };

  const rentHistory = [
    { month: "May 2025", amount: "$1500", status: "Paid", date: "2025-05-01" },
    {
      month: "April 2025",
      amount: "$1500",
      status: "Paid",
      date: "2025-04-01",
    },
    {
      month: "March 2025",
      amount: "$1500",
      status: "Paid",
      date: "2025-03-01",
    },
  ];

  const maintenance = [
    { id: 1, issue: "Leaky faucet", date: "2025-06-01", status: "Resolved" },
    {
      id: 2,
      issue: "Broken window",
      date: "2025-06-10",
      status: "In Progress",
    },
  ];

  const documents = [
    { name: "Lease Agreement", status: "Signed" },
    { name: "Move-in Checklist", status: "Unsigned" },
  ];

  return (
    <div className="p-6 min-h-screen bg-gray-50 space-y-8">
      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="text-3xl font-bold mb-2">Rental Service</h2>
        <p className="text-gray-600">
          Overview of your current rental and related activity.
        </p>
      </div>

      {/* Active Rental Info */}
      <div className="bg-white p-6 rounded-xl shadow">
        <h3 className="text-xl font-semibold mb-4">Active Rental</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <p>
            <strong>Property:</strong> {rental.property}
          </p>
          <p>
            <strong>Address:</strong> {rental.address}
          </p>
          <p>
            <strong>Lease Period:</strong> {rental.leaseStart} to{" "}
            {rental.leaseEnd}
          </p>
          <p>
            <strong>Rent:</strong> {rental.rent}
          </p>
          <p>
            <strong>Landlord:</strong> {rental.landlord}
          </p>
          <p>
            <strong>Contact:</strong> {rental.contact}
          </p>
        </div>
        <button
          className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          onClick={() =>
            toast.success("Maintenance request sent successfully!")
          }
        >
          Request Maintenance
        </button>
      </div>

      {/* Rent Payment History */}
      <div className="bg-white p-6 rounded-xl shadow">
        <h3 className="text-xl font-semibold mb-4">Rent Payment History</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full text-left">
            <thead>
              <tr>
                <th className="py-2 px-4">Month</th>
                <th className="py-2 px-4">Amount</th>
                <th className="py-2 px-4">Status</th>
                <th className="py-2 px-4">Paid On</th>
              </tr>
            </thead>
            <tbody>
              {rentHistory.map((item, idx) => (
                <tr key={idx} className="border-t">
                  <td className="py-2 px-4">{item.month}</td>
                  <td className="py-2 px-4">{item.amount}</td>
                  <td className="py-2 px-4 text-green-600">{item.status}</td>
                  <td className="py-2 px-4">{item.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Maintenance */}
      <div className="bg-white p-6 rounded-xl shadow">
        <h3 className="text-xl font-semibold mb-4">Maintenance Requests</h3>
        <ul className="space-y-3">
          {maintenance.map((m) => (
            <li key={m.id} className="flex justify-between">
              <div>
                <p className="font-medium">{m.issue}</p>
                <p className="text-sm text-gray-500">Requested on {m.date}</p>
              </div>
              <div>
                <span
                  className={`px-3 py-1 inline-block rounded-full text-sm ${
                    m.status === "Resolved"
                      ? "bg-green-100 text-green-800"
                      : "bg-yellow-100 text-yellow-800"
                  }`}
                >
                  {m.status}
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Documents */}
      <div className="bg-white p-6 rounded-xl shadow">
        <h3 className="text-xl font-semibold mb-4">Lease Documents</h3>
        <ul className="space-y-3">
          {documents.map((doc, idx) => (
            <li key={idx} className="flex justify-between items-center">
              <span>{doc.name}</span>
              <div className="flex items-center gap-3">
                <span
                  className={`text-sm ${
                    doc.status === "Signed" ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {doc.status}
                </span>
                {/* <button className="text-blue-600 hover:underline text-sm">
                  Download
                </button> */}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

const paymentHistory = [
  { id: 1, item: "June Rent", date: "2024-06-01", amount: "$2,200.00" },
  { id: 2, item: "Security Deposit", date: "2024-05-05", amount: "$1,000.00" },
  { id: 3, item: "May Rent", date: "2024-05-01", amount: "$2,200.00" },
];

const userProfile = {
  name: "Alex Tenant",
  email: "alex.tenant@example.com",
  phone: "+1 555-222-3333",
  avatarUrl: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
  address: {
    street: "123 Main St",
    city: "Toronto",
    province: "ON",
    postalCode: "M5V 2N2",
  },
};

const TenantDashboardPage = () => {
  const [activeTab, setActiveTab] = useState("dashboard");

  const handleDownload = () => {
    // URL to a dummy PDF file
    const pdfUrl =
      "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf";
    const link = document.createElement("a");
    link.href = pdfUrl;
    link.download = "dummy-invoice.pdf"; // The name for the downloaded file
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const navigate = useNavigate();

  const handleTabKeyPress = (key: string, route?: string) => {
    setActiveTab(key);
    if (route) {
      navigate(route);
    }
  };

  return (
    <>
      <DashboardHeader />
      <div className="min-h-screen bg-gray-50 flex">
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
                onClick={() => handleTabKeyPress(item.key, item.route)}
              >
                {item.label}
              </button>
            ))}
          </nav>
        </aside>
        {/* Main Content */}
        <main className="flex-1 p-8">
          {activeTab === "dashboard" && <Dashboard />}
          {activeTab === "jobs" && <AppliedJobsPage />}
          {activeTab === "rentals" && <TenantRentalServicePage />}
          {activeTab === "billing" && (
            <>
              <h2 className="text-3xl font-bold mb-2">Billing & Payments</h2>
              <p className="text-gray-600 mb-6">
                Review your payment history and download invoices.
              </p>
              <div className="bg-white border rounded-lg shadow-sm">
                <ul className="divide-y divide-gray-200">
                  {paymentHistory.map((payment) => (
                    <li
                      key={payment.id}
                      className="p-4 flex justify-between items-center"
                    >
                      <div>
                        <p className="font-semibold">{payment.item}</p>
                        <p className="text-sm text-gray-500">
                          Paid on {payment.date}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">{payment.amount}</p>
                        <button
                          className="text-sm text-blue-600 hover:underline"
                          onClick={handleDownload}
                        >
                          Download Invoice
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </>
          )}
          {activeTab === "profile" && (
            <>
              <h2 className="text-3xl font-bold mb-6">My Profile</h2>
              <div className="bg-white border rounded-lg shadow-sm p-8 max-w-2xl">
                <div className="flex items-start space-x-6">
                  <img
                    src={userProfile.avatarUrl}
                    alt="User Avatar"
                    className="w-24 h-24 rounded-full border-4 border-gray-200"
                  />
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-gray-800">
                      {userProfile.name}
                    </h3>
                    <p className="text-sm text-gray-500">{userProfile.email}</p>
                    <p className="text-sm text-gray-500">{userProfile.phone}</p>
                  </div>
                  <Button variant="outline">Edit Profile</Button>
                </div>
                <div className="mt-8 border-t pt-6">
                  <h4 className="text-lg font-semibold text-gray-700 mb-4">
                    Address
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-gray-500">Street</p>
                      <p className="font-medium text-gray-800">
                        {userProfile.address.street}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-500">City</p>
                      <p className="font-medium text-gray-800">
                        {userProfile.address.city}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-500">Province</p>
                      <p className="font-medium text-gray-800">
                        {userProfile.address.province}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-500">Postal Code</p>
                      <p className="font-medium text-gray-800">
                        {userProfile.address.postalCode}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </main>
      </div>
    </>
  );
};

export default TenantDashboardPage;
