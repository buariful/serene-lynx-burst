import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Users, 
  Briefcase, 
  Calendar, 
  Eye, 
  Mail, 
  Phone,
  Search,
  Filter,
  Star,
  MapPin,
  GraduationCap
} from "lucide-react";
import { useTranslation } from 'react-i18next';
import { showSuccess } from '@/utils/toast';
import RecruiterDashboardWrapper from '@/components/RecruiterDashboardWrapper';
// Mock data - in real app this would come from API
const applications = [
  { id: 1, name: "Dr. Alice Smith", email: "alice.smith@email.com", phone: "+1-555123567", jobTitle: "Cardiology Consultant", jobId: 1, company: "Toronto General Hospital", appliedDate: "2024-06-01", status: "New", experience: "8 years", education: "MD, Cardiology", location: "Toronto, ON", avatar: "https://images.unsplash.com/photo-1494790108755-26161286?w=150&h=150&fit=crop&crop=face", rating: 4.8, resumeUrl: "https://msnlabs.com/img/resume-sample.pdf", coverLetter: "I am excited to apply for the Cardiology Consultant position..." },
  { id: 2, name: "Dr. Bob Lee", email: "bob.lee@email.com", phone: "+1-555987543", jobTitle: "Cardiology Consultant", jobId: 1, company: "Toronto General Hospital", appliedDate: "2024-06-02", status: "Reviewed", experience: "12 years", education: "MD, Internal Medicine", location: "Vancouver, BC", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd72282?w=150&h=150&fit=crop&crop=face", rating: 4.6, resumeUrl: "https://msnlabs.com/img/resume-sample.pdf", coverLetter: "With over a decade of experience in cardiology..." },
  { id: 3, name: "Nurse Carol White", email: "carol.white@email.com", phone: "+1-555456890", jobTitle: "ICU Nurse", jobId: 2, company: "Vancouver General Hospital", appliedDate: "2024-05-21", status: "Interviewed", experience: "5 years", education: "BSN, Nursing", location: "Vancouver, BC", avatar: "https://images.unsplash.com/photo-1438761681033-6461ad8d80?w=150&h=150&fit=crop&crop=face", rating: 4.9, resumeUrl: "https://msnlabs.com/img/resume-sample.pdf", coverLetter: "I have extensive experience in critical care nursing..." },
  { id: 4, name: "Dr. David Chen", email: "david.chen@email.com", phone: "+1-555321547", jobTitle: "Emergency Medicine Physician", jobId: 3, company: "Montreal General Hospital", appliedDate: "2024-06-06", status: "New", experience: "6 years", education: "MD, Emergency Medicine", location: "Montreal, QC", avatar: "https://images.unsplash.com/photo-1472996457855-658f44?w=150&h=150&fit=crop&crop=face", rating: 4.7, resumeUrl: "https://msnlabs.com/img/resume-sample.pdf", coverLetter: "I am passionate about emergency medicine..." },
];

const RecruiterApplicantsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [jobFilter, setJobFilter] = useState("all");
  const { t } = useTranslation();

  const filteredApplications = applications.filter(app => {
    const matchesSearch = app.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         app.jobTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         app.company.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || app.status.toLowerCase() === statusFilter;
    const matchesJob = jobFilter === "all" || app.jobId.toString() === jobFilter;
    
    return matchesSearch && matchesStatus && matchesJob;
  });

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'new':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
      case 'reviewed':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      case 'interviewed':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300';
      case 'hired':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'rejected':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
    }
  };

  const handleContact = (email: string, phone: string) => {
    showSuccess(t('recruiter.applicants.contactInfoCopied'));
  };

  const uniqueJobs = Array.from(new Set(applications.map(app => ({ id: app.jobId, title: app.jobTitle, company: app.company }))));

  return (
    <RecruiterDashboardWrapper>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
              {t('recruiter.applicants.title')}
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              {t('recruiter.applicants.subtitle', { count: applications.length })}
            </p>
          </div>
        </div>

        {/* Filters */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">{t('recruiter.applicants.filters')}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4"/>
                <input
                  type="text"
                  placeholder={t('recruiter.applicants.searchPlaceholder')}
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
                <option value="all">{t('recruiter.applicants.allStatuses')}</option>
                <option value="new">{t('recruiter.applicants.new')}</option>
                <option value="reviewed">{t('recruiter.applicants.reviewed')}</option>
                <option value="interviewed">{t('recruiter.applicants.interviewed')}</option>
                <option value="hired">{t('recruiter.applicants.hired')}</option>
                <option value="rejected">{t('recruiter.applicants.rejected')}</option>
              </select>

              {/* Job Filter */}
              <select
                value={jobFilter}
                onChange={(e) => setJobFilter(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">{t('recruiter.applicants.allJobs')}</option>
                {uniqueJobs.map(job => (
                  <option key={job.id} value={job.id}>
                    {job.title} - {job.company}
                  </option>
                ))}
              </select>
            </div>
          </CardContent>
        </Card>

        {/* Applications Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredApplications.map((app) => (
            <Card key={app.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar className="w-12 h-12">
                      <AvatarImage src={app.avatar} alt={app.name} />
                      <AvatarFallback>{app.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-lg text-gray-800 dark:text-white">
                        {app.name}
                      </CardTitle>
                      <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 mt-1">
                        <Briefcase className="w-4 h-4" />
                        <span>{app.jobTitle}</span>
                      </div>
                    </div>
                  </div>
                  <Badge className={getStatusColor(app.status)}>
                    {app.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="grid grid-cols-2">
                    <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                      <Calendar className="w-4 h-4" />
                      <span>{app.appliedDate}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                      <MapPin className="w-4 h-4" />
                      <span>{app.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                      <GraduationCap className="w-4 h-4" />
                      <span>{app.education}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                      <Star className="w-4 h-4" />
                      <span>{app.rating}/5.0</span>
                    </div>
                  </div>

                  <p className="text-gray-600 dark:text-gray-30 text-sm line-clamp-2">
                    {app.coverLetter}
                  </p>

                  <div className="flex items-center justify-between pt-3 border-t border-gray-200 dark:border-gray-700">
                    <div className="flex gap-2">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="flex items-center gap-1"
                        onClick={() => handleContact(app.email, app.phone)}
                      >
                        <Mail className="w-4 h-4" />
                        {t('recruiter.applicants.contact')}
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="flex items-center gap-1"
                        onClick={() => window.open(app.resumeUrl, '_blank')}
                      >
                        <Eye className="w-4 h-4" />
                        {t('recruiter.applicants.viewResume')}
                      </Button>
                    </div>
                    <Link to={`/recruiter/applicants/${app.id}`}>
                      <Button variant="default" size="sm">
                        {t('recruiter.applicants.viewDetails')}
                      </Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredApplications.length === 0 && (
          <Card>
            <CardContent className="text-center py-12">
              <Users className="w-12 h-12 text-gray-400 mx-auto mb-4"/>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                {t('recruiter.applicants.noApplicationsFound')}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                {t('recruiter.applicants.noApplicationsDescription')}
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </RecruiterDashboardWrapper>
  );
};

export default RecruiterApplicantsPage; 