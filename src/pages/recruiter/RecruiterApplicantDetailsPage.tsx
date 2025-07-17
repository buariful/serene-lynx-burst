import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  ArrowLeft,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Briefcase,
  GraduationCap,
  Star,
  Download,
  Eye,
  MessageSquare,
  CheckCircle,
  XCircle,
  Clock,
  ExternalLink
} from "lucide-react";
import { useTranslation } from 'react-i18next';
import { showSuccess, showError } from '@/utils/toast';
import RecruiterDashboardWrapper from '@/components/RecruiterDashboardWrapper';
// Mock data - in real app this would come from API
const applicantDetails = {
  id: 1,
  name: "Dr. Alice Smith",
  email: "alice.smith@email.com",
  phone: "+1-555123567",
  jobTitle: "Cardiology Consultant",
  jobId: 1,
  company: "Toronto General Hospital",
  appliedDate: "20240620",
  status: "New",
  experience: "8 years",
  education: "MD, Cardiology",
  location: "Toronto, ON",
  avatar: "https://images.unsplash.com/photo-14947910875526161286?w=150&h=150&fit=crop&crop=face",
  rating: 4.8,
  resumeUrl: "https://msnlabs.com/img/resume-sample.pdf",
  coverLetter: `Dear Hiring Manager,

I am writing to express my strong interest in the Cardiology Consultant position at Toronto General Hospital. With over 8 years of experience in cardiology and a passion for patient care, I believe I would be an excellent addition to your team.

**Professional Experience:**
I have been practicing cardiology for the past 8 years, specializing in interventional cardiology and cardiac imaging. My experience includes performing complex cardiac procedures, managing acute cardiac conditions, and providing comprehensive patient care.

**Key Qualifications:**
- Board certified in Cardiology
- Extensive experience in cardiac catheterization and angioplasty
- Proficient in echocardiography and stress testing
- Strong track record of patient outcomes
- Experience in teaching medical students and residents

**Why I'm Interested:**
Toronto General Hospital's reputation for excellence in cardiac care and commitment to innovation aligns perfectly with my professional goals. I am excited about the opportunity to contribute to your team and continue providing high-quality care to patients.

I look forward to discussing how my skills and experience can benefit your cardiology department.

Best regards,
Dr. Alice Smith`,
  skills: [
    "Interventional Cardiology",
    "Cardiac Catheterization",
    "Echocardiography",
    "Stress Testing",
    "Patient Care",
    "Medical Education",
    "Research",
    "Team Leadership"
  ],
  certifications: [
    "Board Certified in Cardiology",
    "Advanced Cardiac Life Support (ACLS)",
    "Basic Life Support (BLS)",
    "Medical License - Ontario"
  ],
  workHistory: [
    {
      position: "Cardiologist",
      company: "Mount Sinai Hospital",
      duration: "2019 - Present",
      description: "Provide comprehensive cardiac care including diagnostic procedures and treatments."
    },
    {
      position: "Cardiology Fellow",
      company: "University Health Network",
      duration: "2016 - 2019",
      description: "Completed cardiology fellowship with focus on interventional procedures."
    },
    {
      position: "Internal Medicine Resident",
      company: "Toronto General Hospital",
      duration: "2013 - 2016",
      description: "Completed internal medicine residency with excellent evaluations."
    }
  ]
};

const RecruiterApplicantDetailsPage = () => {
  const { id } = useParams();
  const [status, setStatus] = useState(applicantDetails.status);
  const { t } = useTranslation();

  const handleStatusChange = (newStatus: string) => {
    setStatus(newStatus);
    showSuccess(t('recruiter.applicantDetails.statusUpdated'));
  };

  const handleContact = (type: 'email' | 'phone') => {
    const contactInfo = type === 'email' ? applicantDetails.email : applicantDetails.phone;
    navigator.clipboard.writeText(contactInfo);
    showSuccess(t('recruiter.applicantDetails.contactInfoCopied'));
  };

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

  return (
    <RecruiterDashboardWrapper>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-4">
            <Link to="/recruiter/applicants">
              <Button variant="outline" size="sm" className="flex items-center gap-2">
                <ArrowLeft className="w-4 h-4" />
                {t('recruiter.applicantDetails.backToApplicants')}
              </Button>
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-gray-800 dark:text-white">{applicantDetails.name}</h1>
              <p className="text-gray-600 dark:text-gray-400">{applicantDetails.jobTitle} - {applicantDetails.company}</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleContact('email')}
              className="flex items-center gap-2"
            >
              <Mail className="w-4 h-4" />
              {t('recruiter.applicantDetails.email')}
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleContact('phone')}
              className="flex items-center gap-2"
            >
              <Phone className="w-4 h-4" />
              {t('recruiter.applicantDetails.call')}
            </Button>
            <Button variant="outline" size="sm" className="flex items-center gap-2">
              <MessageSquare className="w-4 h-4" />
              {t('recruiter.applicantDetails.message')}
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Applicant Info */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl">{t('recruiter.applicantDetails.applicantInformation')}</CardTitle>
                  <Badge className={getStatusColor(status)}>
                    {status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-start gap-4">
                  <Avatar className="w-20 h-20">
                    <AvatarImage src={applicantDetails.avatar} alt={applicantDetails.name} />
                    <AvatarFallback className="text-xl">
                      {applicantDetails.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 space-y-3">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                        <Mail className="w-4 h-4" />
                        <span>{applicantDetails.email}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                        <Phone className="w-4 h-4" />
                        <span>{applicantDetails.phone}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                        <MapPin className="w-4 h-4" />
                        <span>{applicantDetails.location}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                        <Calendar className="w-4 h-4" />
                        <span>{t('recruiter.applicantDetails.applied')} {applicantDetails.appliedDate}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                        <Briefcase className="w-4 h-4" />
                        <span>{applicantDetails.experience} {t('recruiter.applicantDetails.experience')}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                        <GraduationCap className="w-4 h-4" />
                        <span>{applicantDetails.education}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="font-medium">{applicantDetails.rating}/5.0</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Cover Letter */}
            <Card>
              <CardHeader>
                <CardTitle>{t('recruiter.applicantDetails.coverLetter')}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="prose dark:prose-invert max-w-none">
                  {applicantDetails.coverLetter.split('\n\n').map((paragraph, index) => (
                    <p key={index} className="mb-4 text-gray-700 dark:text-gray-300">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Skills */}
            <Card>
              <CardHeader>
                <CardTitle>{t('recruiter.applicantDetails.skills')}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {applicantDetails.skills.map((skill, index) => (
                    <Badge key={index} variant="secondary">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Certifications */}
            <Card>
              <CardHeader>
                <CardTitle>{t('recruiter.applicantDetails.certifications')}</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {applicantDetails.certifications.map((cert, index) => (
                    <li key={index} className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      {cert}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Work History */}
            <Card>
              <CardHeader>
                <CardTitle>{t('recruiter.applicantDetails.workHistory')}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {applicantDetails.workHistory.map((job, index) => (
                    <div key={index} className="border-l-4 border-blue-500 pl-4">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium text-gray-800 dark:text-white">{job.position}</h4>
                        <span className="text-sm text-gray-500 dark:text-gray-400">{job.duration}</span>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">{job.company}</p>
                      <p className="text-sm text-gray-700 dark:text-gray-300">{job.description}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Status Management */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">{t('recruiter.applicantDetails.statusManagement')}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Button
                    variant={status === 'New' ? 'default' : 'outline'}
                    size="sm"
                    className="w-full justify-start"
                    onClick={() => handleStatusChange('New')}
                  >
                    <Clock className="w-4 h-4 mr-2" />
                    {t('recruiter.applicantDetails.new')}
                  </Button>
                  <Button
                    variant={status === 'Reviewed' ? 'default' : 'outline'}
                    size="sm"
                    className="w-full justify-start"
                    onClick={() => handleStatusChange('Reviewed')}
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    {t('recruiter.applicantDetails.reviewed')}
                  </Button>
                  <Button
                    variant={status === 'Interviewed' ? 'default' : 'outline'}
                    size="sm"
                    className="w-full justify-start"
                    onClick={() => handleStatusChange('Interviewed')}
                  >
                    <MessageSquare className="w-4 h-4 mr-2" />
                    {t('recruiter.applicantDetails.interviewed')}
                  </Button>
                  <Button
                    variant={status === 'Hired' ? 'default' : 'outline'}
                    size="sm"
                    className="w-full justify-start"
                    onClick={() => handleStatusChange('Hired')}
                  >
                    <CheckCircle className="w-4 h-4 mr-2" />
                    {t('recruiter.applicantDetails.hired')}
                  </Button>
                  <Button
                    variant={status === 'Rejected' ? 'default' : 'outline'}
                    size="sm"
                    className="w-full justify-start"
                    onClick={() => handleStatusChange('Rejected')}
                  >
                    <XCircle className="w-4 h-4 mr-2" />
                    {t('recruiter.applicantDetails.rejected')}
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">{t('recruiter.applicantDetails.quickActions')}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full justify-start"
                    onClick={() => window.open(applicantDetails.resumeUrl, '_blank')}
                  >
                    <Download className="w-4 h-4 mr-2" />
                    {t('recruiter.applicantDetails.downloadResume')}
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full justify-start"
                    onClick={() => window.open(applicantDetails.resumeUrl, '_blank')}
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    {t('recruiter.applicantDetails.viewResume')}
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full justify-start"
                  >
                    <MessageSquare className="w-4 h-4 mr-2" />
                    {t('recruiter.applicantDetails.sendMessage')}
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full justify-start"
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    {t('recruiter.applicantDetails.viewProfile')}
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Notes */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">{t('recruiter.applicantDetails.notes')}</CardTitle>
              </CardHeader>
              <CardContent>
                <textarea
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  rows={4} placeholder={t('recruiter.applicantDetails.addNotes')}
                />
                <Button className="w-full mt-2">
                  {t('recruiter.applicantDetails.saveNotes')}
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </RecruiterDashboardWrapper>
  );
};

export default RecruiterApplicantDetailsPage; 