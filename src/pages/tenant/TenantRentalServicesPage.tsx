import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Calendar,
  MapPin,
  DollarSign,
  User,
  Mail,
  Phone,
  FileText,
  CheckCircle,
  Clock,
  AlertCircle,
  Download,
  Eye,
  Plus,
  Wrench,
  Home
} from "lucide-react";
import TenantDashboardWrapper from "@/components/TenantDashboardWrapper";

const TenantRentalServicesPage = () => {
  const { t, i18n } = useTranslation();
  const [activeTab, setActiveTab] = useState("overview");
  
  // Debug language changes
  useEffect(() => {
    console.log('TenantRentalServicesPage - Current language:', i18n.language);
    console.log('TenantRentalServicesPage - Test translation:', t('tenantrentalService.title'));
  }, [i18n.language, t]);

  const rental = {
    property: "Greenwood Villa",
    address: "123 Maple St, Toronto, ON",
    leaseStart: "2025-01-01",
    leaseEnd: "2025-12-31",
    rent: "$1,500",
    deposit: "$1,500",
    landlord: "John Smith",
    contact: "john.smith@email.com",
    phone: "+1 (416) 123-4567",
    propertyType: "2 Bedroom Apartment",
    amenities: ["Parking", "Laundry", "Conveyance", "Gym Access"],
    nextPayment: "2025-06-01",
    paymentMethod: "Direct Deposit"
  };

  const rentHistory = [
    { month: "May 2025", amount: "$1,500", status: "Paid", date: "2025-05-25", method: "Direct Deposit", receipt: "receipt_20255.pdf" },
    { month: "April 2025", amount: "$1,500", status: "Paid", date: "2025-04-20", method: "Direct Deposit", receipt: "receipt_20254.pdf" },
    { month: "March 2025", amount: "$1,500", status: "Paid", date: "2025-03-15", method: "Direct Deposit", receipt: "receipt_20253.pdf" },
    { month: "February 2025", amount: "$1,500", status: "Paid", date: "2025-02-18", method: "Direct Deposit", receipt: "receipt_2025pdf" },
  ];

  const maintenance = [
    { id: 1, issue: "Leaky kitchen faucet", description: "Water dripping from kitchen faucet handle", date: "2025-05-10", status: "Resolved", priority: "Medium", assignedTo: "Mike Johnson", completedDate: "2025-05-20", cost: "$0" },
    { id: 2, issue: "Broken bedroom window lock", description: "Window lock mechanism not working properly", date: "2025-10-01", status: "In Progress", priority: "High", assignedTo: "Sarah Wilson", estimatedCompletion: "2025-05-20" },
    { id: 3, issue: "HVAC filter replacement", description: "Air filter needs replacement", date: "2025-02-28", status: "Scheduled", priority: "Low", assignedTo: "HVAC Services", scheduledDate: "2025-05-25" },
  ];

  const documents = [
    { name: "Lease Agreement", status: "Signed", date: "2025-01-01", size: "2.3MB", type: "PDF" },
    { name: "Move-in Checklist", status: "Signed", date: "2025-01-01", size: "1.1MB", type: "PDF" },
    { name: "Rental Insurance Policy", status: "Pending", date: "2025-01-15", size: "3.2MB", type: "PDF" },
    { name: "Building Rules & Regulations", status: "Available", date: "2025-01-01", size: "0.8MB", type: "PDF" },
  ];

  const handleDownloadReceipt = (receipt: string) => {
    // Simulate PDF download
    const link = document.createElement("a");
    link.href = `https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf`;
    link.download = receipt;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success("Receipt downloaded successfully!");
  };

  const handleRequestMaintenance = () => {
    toast.success("Maintenance request submitted successfully!");
  };

  const handleDownloadDocument = (docName: string) => {
    const link = document.createElement("a");
    link.href = `https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf`;
    link.download = `${docName}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success(`${docName} downloaded successfully!`);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Paid": return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      case "Resolved": return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      case "In Progress": return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
      case "Scheduled": return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200";
      case "Pending": return "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200";
      case "Available": return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200";
      default: return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High": return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
      case "Medium": return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
      case "Low": return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      default: return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200";
    }
  };

  const tabs = [
    { id: "overview", label: "Overview", icon: Home },
    { id: "payments", label: "Payments", icon: DollarSign },
    { id: "maintenance", label: "Maintenance", icon: Wrench },
    { id: "documents", label: "Documents", icon: FileText },
  ];

  return (
    <TenantDashboardWrapper>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4 sm:p-6 max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-2">{t('tenantrentalService.title')}</h1>
          <p className="text-gray-600 dark:text-gray-400">{t('tenantrentalService.description')}</p>
        </div>

        {/* Tabs */}
        <div className="mb-6">
          <div className="flex flex-wrap gap-2 border-b border-gray-200 dark:border-gray-700">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-t-lg transition-colors ${
                    activeTab === tab.id
                      ? "bg-white dark:bg-gray-800 text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400"
                      : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Overview Tab */}
        {activeTab === "overview" && (
          <div className="space-y-6">
            {/* Property Info Card */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Home className="w-5 h-5" />
                  {t('tenantrentalService.activeRental')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Home className="w-4 h-4 text-gray-500" />
                      <span className="font-medium">{rental.property}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-gray-500" />
                      <span className="text-sm text-gray-600 dark:text-gray-400">{rental.address}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-gray-500" />
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        {rental.leaseStart} - {rental.leaseEnd}
                      </span>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <DollarSign className="w-4 h-4 text-gray-500" />
                      <span className="font-medium">Rent: {rental.rent}/month</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <DollarSign className="w-4 h-4 text-gray-500" />
                      <span className="text-sm text-gray-600 dark:text-gray-400">Deposit: {rental.deposit}</span>
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      Next Payment: {rental.nextPayment}
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4 text-gray-500" />
                      <span className="font-medium">{rental.landlord}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-gray-500" />
                      <span className="text-sm text-gray-600 dark:text-gray-400">{rental.contact}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-gray-500" />
                      <span className="text-sm text-gray-600 dark:text-gray-400">{rental.phone}</span>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                  <h4 className="font-medium mb-3">Amenities</h4>
                  <div className="flex flex-wrap gap-2">
                    {rental.amenities.map((amenity, index) => (
                      <Badge key={index} variant="secondary">
                        {amenity}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="mt-6 flex flex-col sm:flex-row gap-3">
                  <Button onClick={handleRequestMaintenance} className="flex items-center gap-2">
                    <Plus className="w-4 h-4" />
                    Request Maintenance
                  </Button>
                  <Button variant="outline" className="flex items-center gap-2">
                    <Phone className="w-4 h-4" />
                    Contact Landlord
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-green-100 dark:bg-green-900">
                      <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Current Status</p>
                      <p className="font-semibold text-green-600 dark:text-green-400">Active</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-100 dark:bg-blue-900">
                      <DollarSign className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Monthly Rent</p>
                      <p className="font-semibold">{rental.rent}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-yellow-100 dark:bg-yellow-900">
                      <Clock className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Days Remaining</p>
                      <p className="font-semibold">180</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-purple-100 dark:bg-purple-900">
                      <FileText className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Documents</p>
                      <p className="font-semibold">{documents.length}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {/* Payments Tab */}
        {activeTab === "payments" && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="w-5 h-5" />
                  {t('tenantrentalService.rentPaymentHistory')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200 dark:border-gray-700">
                        <th className="text-left py-3 text-medium text-gray-900 dark:text-white">Month</th>
                        <th className="text-left py-3 text-medium text-gray-900 dark:text-white">Amount</th>
                        <th className="text-left py-3 text-medium text-gray-900 dark:text-white">Status</th>
                        <th className="text-left py-3 text-medium text-gray-900 dark:text-white">Date</th>
                        <th className="text-left py-3 text-medium text-gray-900 dark:text-white">Method</th>
                        <th className="text-left py-3 text-medium text-gray-900 dark:text-white">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {rentHistory.map((item, idx) => (
                        <tr key={idx} className="border-b border-gray-100 dark:border-gray-800 even:bg-gray-50 dark:hover:bg-gray-800">
                          <td className="py-3 px-4 text-gray-900 dark:text-white">{item.month}</td>
                          <td className="py-3 text-medium text-gray-900 dark:text-white">{item.amount}</td>
                          <td className="py-3 px-4">
                            <Badge className={getStatusColor(item.status)}>
                              {item.status}
                            </Badge>
                          </td>
                          <td className="py-3 px-4 text-gray-600 dark:text-gray-400">{item.date}</td>
                          <td className="py-3 px-4 text-gray-600 dark:text-gray-400">{item.method}</td>
                          <td className="py-3 px-4">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDownloadReceipt(item.receipt)}
                              className="flex items-center gap-1"
                            >
                              <Download className="w-4 h-4" />
                              Receipt
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          )}

        {/* Maintenance Tab */}
          {activeTab === "maintenance" && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {t('tenantrentalService.maintenanceRequests')}
                </h3>
                <Button onClick={handleRequestMaintenance} className="flex items-center gap-2">
                  <Plus className="w-4 h-4" />
                  New Request
                </Button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {maintenance.map((m) => (
                  <Card key={m.id}>
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-base">{m.issue}</CardTitle>
                        <Badge className={getStatusColor(m.status)}>
                          {m.status}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{m.description}</p>
                      
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-500 dark:text-gray-400">Priority:</span>
                          <Badge className={getPriorityColor(m.priority)} variant="outline">
                            {m.priority}
                          </Badge>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-500 dark:text-gray-400">Assigned to:</span>
                          <span className="text-gray-900 dark:text-white">{m.assignedTo}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-500 dark:text-gray-400">Requested:</span>
                          <span className="text-gray-900 dark:text-white">{m.date}</span>                   </div>
                      {m.completedDate && (
                          <div className="flex justify-between">
                            <span className="text-gray-500 dark:text-gray-400">Completed:</span>
                            <span className="text-gray-900 dark:text-white">{m.completedDate}</span>
                          </div>
                        )}
                        {m.estimatedCompletion && (
                          <div className="flex justify-between">
                            <span className="text-gray-500 dark:text-gray-400">Estimated:</span>
                            <span className="text-gray-900 dark:text-white">{m.estimatedCompletion}</span>
                          </div>
                        )}
                        {m.cost && (
                          <div className="flex justify-between">
                            <span className="text-gray-500 dark:text-gray-400">Cost:</span>
                            <span className="text-gray-900 dark:text-white">{m.cost}</span>                   </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Documents Tab */}
        {activeTab === "documents" && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  {t('tenantrentalService.leaseDocuments')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                {documents.map((doc, idx) => (
                    <div key={idx} className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800">
                      <div className="flex items-center gap-4">
                        <div className="p-2 bg-blue-100 dark:bg-blue-900">
                          <FileText className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900 dark:text-white">{doc.name}</h4>                   <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                            <span>{doc.type}</span>
                            <span>{doc.size}</span>
                            <span>{doc.date}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge className={getStatusColor(doc.status)}>
                          {doc.status}
                        </Badge>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDownloadDocument(doc.name)}
                          className="flex items-center gap-1"
                        >
                          <Download className="w-4 h-4" />
                          Download
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
    </TenantDashboardWrapper>
  );
};

export default TenantRentalServicesPage; 