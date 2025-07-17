import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  ArrowLeft, 
  Edit, 
  Trash2, 
  Eye, 
  Users, 
  Calendar, 
  MapPin, 
  Building2, 
  DollarSign,
  Share2,
  Heart,
  MessageSquare,
  Phone,
  Mail,
  ExternalLink
} from "lucide-react";
import { useTranslation } from 'react-i18next';
import { showSuccess, showError } from '@/utils/toast';
import RecruiterDashboardWrapper from '@/components/RecruiterDashboardWrapper';
// Mock data - in real app this would come from API
const jobDetails = {
  id:1,
  title: "Cardiology Consultant",
  company: "Toronto General Hospital",
  type: "full-time",
  location: "Toronto, ON",
  salary: 12000,
  description: `We are seeking an experienced Cardiology Consultant to join our prestigious cardiology department at Toronto General Hospital. This is a full-time position offering excellent opportunities for professional growth and development.

**Key Responsibilities:**
- Provide comprehensive cardiology consultations and treatments
- Perform diagnostic procedures including echocardiograms, stress tests, and cardiac catheterizations
- Collaborate with multidisciplinary teams to develop treatment plans
- Participate in clinical research and quality improvement initiatives
- Mentor medical students and residents
- Maintain accurate patient records and documentation

**Requirements:**
- Medical degree from an accredited institution
- Board certification in Cardiology
- Minimum 5 years of clinical experience
- Valid medical license in Ontario
- Excellent communication and interpersonal skills
- Commitment to patient-centered care

**Benefits:**
- Competitive salary with comprehensive benefits package
- Professional development opportunities
- State-of-the-art facilities and equipment
- Collaborative work environment
- Generous vacation and leave policies`,
  requirements: [
    "Medical degree from an accredited institution",
    "Board certification in Cardiology",
    "Minimum 5 years of clinical experience",
    "Valid medical license in Ontario",
    "Excellent communication and interpersonal skills",
    "Commitment to patient-centered care"
  ],
  benefits: [
    "Competitive salary with comprehensive benefits package",
    "Professional development opportunities",
    "State-of-the-art facilities and equipment",
    "Collaborative work environment",
    "Generous vacation and leave policies"
  ],
  image: "https://images.unsplash.com/photo-1519125323398-675db638?auto=format&fit=crop&w=400&q=80", 
  status: "Open", 
  datePosted: "2024-06-01",
  applications: 12,
  views: 245, 
  recruiter: {
    name: "Dr. Sarah Johnson",
    email: "sarah.johnson@torontogeneral.ca",    phone: "+1-416-123-4567",
    avatar: "https://images.unsplash.com/photo-1494790108755-26161286?w=150&h=150&fit=crop&crop=face", 
    position: "Senior Recruiter"
  }
};

const RecruiterJobDetailsPage = () => {
  const { id } = useParams();
  const [isLiked, setIsLiked] = useState(false);
  const { t } = useTranslation();

  const handleDelete = () => {
    if (window.confirm(t('recruiter.jobDetails.confirmDelete'))) {
      showSuccess(t('recruiter.jobDetails.jobDeleted'));
      // In real app, this would navigate back to jobs list
    }
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    showSuccess(t('recruiter.jobDetails.linkCopied'));
  };

  const formatSalary = (salary: number) => {
    return new Intl.NumberFormat('en-CA', {
      style: 'currency',
      currency: 'CAD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0 
    }).format(salary);
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
          <div className="flex items-center gap-4">
            <Link to="/recruiter/jobs">
              <Button variant="outline" size="sm" className="flex items-center gap-2">
                <ArrowLeft className="w-4 h-4"/>
                {t('recruiter.jobDetails.backToJobs')}
              </Button>
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
                {jobDetails.title}
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                {jobDetails.company}
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => setIsLiked(!isLiked)}
              className={`flex items-center gap-2 ${isLiked ? 'text-red-600' : ''}`}
            >
              <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
              {t('recruiter.jobDetails.save')}
            </Button>
            <Button variant="outline" size="sm" onClick={handleShare} className="flex items-center gap-2">
              <Share2 className="w-4 h-4"/>
              {t('recruiter.jobDetails.share')}
            </Button>
            <Link to={`/recruiter/jobs/${id}/edit`}>
              <Button variant="outline" size="sm" className="flex items-center gap-2">
                <Edit className="w-4 h-4"/>
                {t('recruiter.jobDetails.edit')}
              </Button>
            </Link>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleDelete}
              className="flex items-center gap-2 text-red-600 hover:text-red-700"
            >
              <Trash2 className="w-4 h-4"/>
              {t('recruiter.jobDetails.delete')}
            </Button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Job Image */}
          {jobDetails.image && (
            <Card>
              <CardContent className="p-0">
                <img
                  src={jobDetails.image}
                  alt={jobDetails.company}
                  className="w-full h-48 object-cover rounded-t-lg"
                />
              </CardContent>
            </Card>
          )}

          {/* Job Details */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl">{t('recruiter.jobDetails.jobDetails')}</CardTitle>
                <div className="flex gap-2">
                  <Badge className={getStatusColor(jobDetails.status)}>
                    {jobDetails.status}
                  </Badge>
                  <Badge className={getTypeColor(jobDetails.type)}>
                    {jobDetails.type.replace('-', ' ')}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                  <MapPin className="w-4 h-4" />
                  <span>{jobDetails.location}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                  <DollarSign className="w-4 h-4" />
                  <span>{formatSalary(jobDetails.salary)}/year</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                  <Calendar className="w-4 h-4" />
                  <span>{t('recruiter.jobDetails.posted')} {jobDetails.datePosted}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                  <Users className="w-4 h-4" />
                  <span>{jobDetails.applications} {t('recruiter.jobDetails.applications')}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Description */}
          <Card>
            <CardHeader>
              <CardTitle>{t('recruiter.jobDetails.description')}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="prose dark:prose-invert max-w-none">
                {jobDetails.description.split('\n\n').map((paragraph, index) => (
                  <p key={index} className="mb-4 text-gray-700 dark:text-gray-300">
                    {paragraph}
                  </p>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Requirements */}
          <Card>
            <CardHeader>
              <CardTitle>{t('recruiter.jobDetails.requirements')}</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {jobDetails.requirements.map((requirement, index) => (
                  <li key={index} className="flex items-start gap-2 text-gray-700 dark:text-gray-300">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></span>
                    {requirement}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Benefits */}
          <Card>
            <CardHeader>
              <CardTitle>{t('recruiter.jobDetails.benefits')}</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {jobDetails.benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start gap-2 text-gray-700 dark:text-gray-300">
                    <span className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></span>
                    {benefit}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Recruiter Info */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">{t('recruiter.jobDetails.contactRecruiter')}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-3 mb-4">
                <Avatar className="w-12 h-12">
                  <AvatarImage src={jobDetails.recruiter.avatar} alt={jobDetails.recruiter.name} />
                  <AvatarFallback>{jobDetails.recruiter.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <div>
                  <h4 className="font-medium text-gray-800 dark:text-white">{jobDetails.recruiter.name}</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{jobDetails.recruiter.position}</p>
                </div>
              </div>
              <div className="space-y-2">
                <Button variant="outline" size="sm" className="w-full justify-start">
                  <Mail className="w-4 h-4 mr-2"/>
                  {jobDetails.recruiter.email}
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start">
                  <Phone className="w-4 h-4 mr-2"/>
                  {jobDetails.recruiter.phone}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Statistics */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">{t('recruiter.jobDetails.statistics')}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 dark:text-gray-400">{t('recruiter.jobDetails.views')}</span>
                  <span className="font-medium text-gray-800 dark:text-white">{jobDetails.views}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 dark:text-gray-400">{t('recruiter.jobDetails.applications')}</span>
                  <span className="font-medium text-gray-800 dark:text-white">{jobDetails.applications}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 dark:text-gray-400">{t('recruiter.jobDetails.daysPosted')}</span>
                  <span className="font-medium text-gray-800 dark:text-white">
                    {Math.floor((Date.now() - new Date(jobDetails.datePosted).getTime()) / (1000 * 60 * 60 * 24))}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">{t('recruiter.jobDetails.quickActions')}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Link to={`/recruiter/applicants?jobId=${id}`}>
                  <Button className="w-full justify-start">
                    <Users className="w-4 h-4 mr-2"/>                   {t('recruiter.jobDetails.viewApplications')}
                  </Button>
                </Link>
                <Button variant="outline" className="w-full justify-start">
                  <MessageSquare className="w-4 h-4 mr-2"/>
                  {t('recruiter.jobDetails.contactApplicants')}
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <ExternalLink className="w-4 h-4 mr-2"/>
                  {t('recruiter.jobDetails.viewPublicPage')}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </RecruiterDashboardWrapper>
  );
};

export default RecruiterJobDetailsPage; 