import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Briefcase,
  MapPin,
  Calendar,
  DollarSign,
  Clock,
  CheckCircle,
  XCircle,
  Eye,
  Filter,
  Search
} from "lucide-react";
import TenantDashboardWrapper from "@/components/TenantDashboardWrapper";

const TenantJobsPage = () => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  
  // Debug language changes
  useEffect(() => {
    console.log('TenantJobsPage - Current language:', i18n.language);
    console.log('TenantJobsPage - Test translation:', t('tenantappliedJobs.title'));
  }, [i18n.language, t]);

  const jobs = [
    {
      id: 1,
      title: "Registered Nurse",
      hospital: "City Hospital",
      date: "2025-10",
      status: "Under Review",
      type: "Full-time",
      location: "Toronto, ON",
      salary: "$3,200/mo",
      description: "Provide patient care and support in a busy hospital environment.",
      requirements: ["RN License", "2+ years experience", "BLS Certification"],
      appliedDate: "2025-1-8",
    },
    {
      id: 2,
      title: "Lab Technician",
      hospital: "HealthCare Plus",
      date: "2025-8",
      status: "Accepted",
      type: "Part-time",
      location: "Ottawa, ON",
      salary: "$2,800/mo",
      description: "Assist in laboratory tests and sample processing.",
      requirements: ["MLT Certification", "1 year experience"],
      appliedDate: "2025-1-5",
    },
    {
      id: 3,
      title: "Caregiver",
      hospital: "Mercy Hospital",
      date: "2025-5",
      status: "Rejected",
      type: "Contract",
      location: "Vancouver, BC",
      salary: "$2,200/mo",
      description: "Provide compassionate care for elderly clients.",
      requirements: ["First Aid Certification", "Patience and empathy"],
      appliedDate: "2025-1-2",
    },
    {
      id: 4,
      title: "Medical Assistant",
      hospital: "Saint Mary Clinic",
      date: "2025-1",
      status: "Under Review",
      type: "Full-time",
      location: "Montreal, QC",
      salary: "$3,000/mo",
      description: "Support physicians with patient care and administrative tasks.",
      requirements: ["Medical Assistant Diploma", "CPR Certification"],
      appliedDate: "2024-28",
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Under Review": return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
      case "Accepted": return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      case "Rejected": return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
      default: return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Under Review": return <Clock className="w-4 h-4" />;
      case "Accepted": return <CheckCircle className="w-4 h-4" />;
      case "Rejected": return <XCircle className="w-4 h-4" />;
      default: return <Clock className="w-4" />;
    }
  };

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.hospital.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || job.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <TenantDashboardWrapper>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4 md:p-6 max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-2">
            {t('tenantappliedJobs.title')}
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            {t('tenantappliedJobs.description')}
          </p>
        </div>

        {/* Search and Filter */}
        <div className="mb-6 space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search jobs, hospitals, or locations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Status</option>
              <option value="Under Review">Under Review</option>
              <option value="Accepted">Accepted</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-full">
                  <Briefcase className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Total Applications</p>
                  <p className="font-semibold text-lg">{jobs.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-yellow-100 dark:bg-yellow-900 rounded-full">
                  <Clock className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Under Review</p>
                  <p className="font-semibold text-lg">{jobs.filter(j => j.status === "Under Review").length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-100 dark:bg-green-900 rounded-full">
                  <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Accepted</p>
                  <p className="font-semibold text-lg">{jobs.filter(j => j.status === "Accepted").length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Jobs List */}
        <div className="space-y-4">
          {filteredJobs.length === 0 ? (
            <Card>
              <CardContent className="p-8 text-center">
                <Briefcase className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No jobs found</h3>
                <p className="text-gray-600 dark:text-gray-400">Try adjusting your search or filter criteria.</p>
              </CardContent>
            </Card>
          ) : (
            filteredJobs.map((job) => (
              <Card key={job.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex flex-col lg:flex-row lg:items-start gap-4">
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                            {job.title}
                          </h3>
                          <p className="text-blue-600 dark:text-blue-400">
                            {job.hospital}
                          </p>
                        </div>
                        <Badge className={`flex items-center gap-1 ${getStatusColor(job.status)}`}>
                          {getStatusIcon(job.status)}
                          {job.status}
                        </Badge>
                      </div>
                      
                      <p className="text-gray-600 dark:text-gray-400 mb-3">
                        {job.description}
                      </p>
                      
                      <div className="flex flex-wrap items-center gap-4 text-sm text-gray-50 dark:text-gray-400 mb-3">
                        <div className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          {job.location}
                        </div>
                        <div className="flex items-center gap-1">
                          <Briefcase className="w-4 h-4" />
                          {job.type}
                        </div>
                        <div className="flex items-center gap-1">
                          <DollarSign className="w-4 h-4" />
                          {job.salary}
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-1 text-sm text-gray-50 dark:text-gray-400">
                        <Calendar className="w-4 h-4" />
                        Applied on {job.appliedDate}
                      </div>
                    </div>
                    
                    <div className="flex flex-col gap-2">
                      <Button
                        onClick={() => navigate(`/tenant/job-details/${job.id}`)}
                        className="flex items-center gap-2 text-blue-600 hover:underline text-sm"
                      >
                        <Eye className="w-4 h-4" />
                        View Details
                      </Button>
                      {job.status === "Accepted" && (
                        <Button variant="outline" className="flex items-center gap-2 text-blue-600 hover:underline text-sm">
                          <Calendar className="w-4 h-4" />
                          Schedule Interview
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </TenantDashboardWrapper>
  );
};

export default TenantJobsPage; 