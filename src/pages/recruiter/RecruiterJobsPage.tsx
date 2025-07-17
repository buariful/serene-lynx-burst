import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Briefcase, 
  Building2, 
  Users, 
  Eye, 
  Edit, 
  Trash2,
  Plus,
  Search,
  Filter,
  Calendar
} from "lucide-react";
import { useTranslation } from 'react-i18next';
import { showSuccess, showError } from '@/utils/toast';
import RecruiterDashboardWrapper from '@/components/RecruiterDashboardWrapper';
// Mock data - in real app this would come from API
const jobs = [
  {
    id: 1,
    title: "Cardiology Consultant",
    company: "Toronto General Hospital",
    type: "full-time",
    location: "Toronto, ON",
    salary: 120000,
    description: "Seeking an experienced cardiology consultant to join our team.",
    image: "https://images.unsplash.com/photo-1519125323398-675db638?auto=format&fit=crop&w=400&q=80",
    status: "Open",
    date: "2024-06-01",
    applications: 12,
    views: 245,
  },
  {
    id: 2,
    title: "ICU Nurse",
    company: "Vancouver General Hospital",
    type: "contract",
    location: "Vancouver, BC",
    salary: 45000,
    description: "ICU nurse needed for a 6-month contract.",
    image: "https://images.unsplash.com/photo-1519125323398-675db638?auto=format&fit=crop&w=400&q=80",
    status: "Closed",
    date: "2024-05-20",
    applications: 8,
    views: 189,
  },
  {
    id: 3,
    title: "Emergency Medicine Physician",
    company: "Montreal General Hospital",
    type: "part-time",
    location: "Montreal, QC",
    salary: 180000,
    description: "Emergency medicine physician for weekend shifts.",
    image: "https://images.unsplash.com/photo-1559757148-50d3c56?auto=format&fit=crop&w=400&q=80",
    status: "Open",
    date: "2024-06-05",
    applications: 5,
    views: 156,
  },
  {
    id: 4,
    title: "Medical Laboratory Technologist",
    company: "Calgary Health Services",
    type: "full-time",
    location: "Calgary, AB",
    salary: 65000,
    description: "Experienced lab technologist for our busy medical laboratory.",
    image: "https://images.unsplash.com/photo-157609116399-112d251?auto=format&fit=crop&w=400&q=80",
    status: "Open",
    date: "2024-06-03",
    applications: 15,
    views: 312,
  },
];

const RecruiterJobsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const { t } = useTranslation();

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.company.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || job.status.toLowerCase() === statusFilter;
    const matchesType = typeFilter === "all" || job.type === typeFilter;
    
    return matchesSearch && matchesStatus && matchesType;
  });

  const handleDeleteJob = (jobId: number) => {
    if (window.confirm(t('recruiter.jobs.confirmDelete'))) {
      // In real app, this would be an API call
      showSuccess(t('recruiter.jobs.jobDeleted'));
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'open':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'closed':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      case 'draft':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'full-time':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
      case 'part-time':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300';
      case 'contract':
        return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
    }
  };

  return (
    <RecruiterDashboardWrapper>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
              {t('recruiter.jobs.title')}
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              {t('recruiter.jobs.subtitle', { count: jobs.length })}
            </p>
          </div>
          <Link to="/recruiter/post-job">
            <Button className="flex items-center gap-2">
              <Plus className="w-4 h-4" />
              {t('recruiter.jobs.postNewJob')}
            </Button>
          </Link>
        </div>

        {/* Filters */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">{t('recruiter.jobs.filters')}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder={t('recruiter.jobs.searchPlaceholder')}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Status Filter */}
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">{t('recruiter.jobs.allStatuses')}</option>
                <option value="open">{t('recruiter.jobs.open')}</option>
                <option value="closed">{t('recruiter.jobs.closed')}</option>
                <option value="draft">{t('recruiter.jobs.draft')}</option>
              </select>

              {/* Type Filter */}
              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">{t('recruiter.jobs.allTypes')}</option>
                <option value="full-time">{t('recruiter.jobs.fullTime')}</option>
                <option value="part-time">{t('recruiter.jobs.partTime')}</option>
                <option value="contract">{t('recruiter.jobs.contract')}</option>
              </select>
            </div>
          </CardContent>
        </Card>

        {/* Jobs Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredJobs.map((job) => (
            <Card key={job.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge className={getStatusColor(job.status)}>
                        {job.status}
                      </Badge>
                      <Badge className={getTypeColor(job.type)}>
                        {job.type.replace('-', ' ')}
                      </Badge>
                    </div>
                    <CardTitle className="text-lg text-gray-800 dark:text-white">
                      {job.title}
                    </CardTitle>
                    <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 mt-1">
                      <Building2 className="w-4 h-4" />
                      <span>{job.company}</span>
                    </div>
                  </div>
                  {job.image && (
                    <img
                      src={job.image}
                      alt={job.company}
                      className="w-16 rounded-lg object-cover"
                    />
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-2">
                    {job.description}
                  </p>
                  
                  <div className="grid grid-cols-2">
                    <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                      <Calendar className="w-4 h-4" />
                      <span>{job.date}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                      <Users className="w-4 h-4" />
                      <span>{job.applications} {t('recruiter.jobs.applications')}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-gray-200 dark:border-gray-700">
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      {t('recruiter.jobs.views', { count: job.views })}
                    </div>
                    <div className="flex gap-2">
                      <Link to={`/recruiter/jobs/${job.id}`}>
                        <Button variant="outline" size="sm" className="flex items-center gap-1">
                          <Eye className="w-4 h-4" />
                          {t('recruiter.jobs.view')}
                        </Button>
                      </Link>
                      {job.status === 'Open' && (
                        <Link to={`/recruiter/jobs/${job.id}/edit`}>
                          <Button variant="outline" size="sm" className="flex items-center gap-1">
                            <Edit className="w-4 h-4" />
                            {t('recruiter.jobs.edit')}
                          </Button>
                        </Link>
                      )}
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="flex items-center gap-1 text-red-600 hover:text-red-700"
                        onClick={() => handleDeleteJob(job.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                        {t('recruiter.jobs.delete')}
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredJobs.length === 0 && (
          <Card>
            <CardContent className="text-center py-12">
              <Briefcase className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                {t('recruiter.jobs.noJobsFound')}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                {t('recruiter.jobs.noJobsDescription')}
              </p>
              <Link to="/recruiter/post-job">
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  {t('recruiter.jobs.postFirstJob')}
                </Button>
              </Link>
            </CardContent>
          </Card>
        )}
      </div>
    </RecruiterDashboardWrapper>
  );
};

export default RecruiterJobsPage; 