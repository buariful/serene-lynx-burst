import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  User,
  Mail,
  Phone,
  Building2,
  MapPin,
  Globe,
  Camera,
  Save,
  Edit,
  X
} from "lucide-react";
import { useTranslation } from 'react-i18next';
import { showSuccess, showError } from '@/utils/toast';
import RecruiterDashboardWrapper from '@/components/RecruiterDashboardWrapper';

const RecruiterProfilePage = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@recruiter.com",
    phone: "+1-5556543",
    company: "MedicalStaffing Solutions Inc.",
    position: "Senior Recruiter",
    location: "Toronto, ON",
    website: "https://medicalstaffing.com",
    bio: "Experienced healthcare recruiter with over 8 years of experience in connecting talented medical professionals with leading healthcare institutions across Canada.",
    avatar: "https://images.unsplash.com/photo-1472996457855658f44?w=150=150fit=crop&crop=face",
  });
  const { t } = useTranslation();

  const handleInputChange = (field: string, value: string) => {
    setProfile(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = () => {
    // In real app, this would be an API call
    showSuccess(t('recruiter.profile.profileUpdated'));
    setIsEditing(false);
  };

  const handleCancel = () => {
    // Reset to original values
    setProfile({
      firstName: "John",
      lastName: "Doe",
      email: "john.doe@recruiter.com",
      phone: "+1-5556543",
      company: "MedicalStaffing Solutions Inc.",
      position: "Senior Recruiter",
      location: "Toronto, ON",
      website: "https://medicalstaffing.com",
      bio: "Experienced healthcare recruiter with over 8 years of experience in connecting talented medical professionals with leading healthcare institutions across Canada.",
      avatar: "https://images.unsplash.com/photo-1472996457855658f44?w=150=150fit=crop&crop=face",
    });
    setIsEditing(false);
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setProfile(prev => ({
          ...prev,
          avatar: result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <RecruiterDashboardWrapper>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
              {t('recruiter.profile.title')}
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              {t('recruiter.profile.subtitle')}
            </p>
          </div>
          <div className="flex gap-2">
            {isEditing ? (
              <>
                <Button onClick={handleSave} className="flex items-center gap-2">
                  <Save className="w-4 h-4" />
                  {t('recruiter.profile.save')}
                </Button>
                <Button variant="outline" onClick={handleCancel} className="flex items-center gap-2">
                  <X className="w-4 h-4" />
                  {t('recruiter.profile.cancel')}
                </Button>
              </>
            ) : (
              <Button onClick={() => setIsEditing(true)} className="flex items-center gap-2">
                <Edit className="w-4 h-4" />
                {t('recruiter.profile.edit')}
              </Button>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile Card */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle className="text-lg">{t('recruiter.profile.profilePhoto')}</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <div className="relative inline-block">
                <Avatar className="w-32 h-32">
                  <AvatarImage src={profile.avatar} alt={`${profile.firstName} ${profile.lastName}`} />
                  <AvatarFallback className="text-2xl">
                    {profile.firstName[0]}{profile.lastName[0]}
                  </AvatarFallback>
                </Avatar>
                {isEditing && (
                  <label className="absolute bottom-0 right-0 bg-blue-600 text-white rounded-full p-2 cursor-pointer hover:bg-blue-700">
                    <Camera className="w-4 h-4" />
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleAvatarChange}
                      className="hidden"
                    />
                  </label>
                )}
              </div>
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
                {profile.firstName} {profile.lastName}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">{profile.position}</p>
              <p className="text-gray-500 dark:text-gray-500 text-sm">{profile.company}</p>
            </CardContent>
          </Card>

          {/* Details Card */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="text-lg">{t('recruiter.profile.personalInformation')}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* Basic Information */}
                <div>
                  <h4 className="text-md font-medium text-gray-800 dark:text-white mb-4">
                    {t('recruiter.profile.basicInformation')}
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName">{t('recruiter.profile.firstName')}</Label>
                      <Input
                        id="firstName"
                        value={profile.firstName}
                        onChange={(e) => handleInputChange('firstName', e.target.value)}
                        disabled={!isEditing}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName">{t('recruiter.profile.lastName')}</Label>
                      <Input
                        id="lastName"
                        value={profile.lastName}
                        onChange={(e) => handleInputChange('lastName', e.target.value)}
                        disabled={!isEditing}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">{t('recruiter.profile.email')}</Label>
                      <Input
                        id="email"
                        type="email"
                        value={profile.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        disabled={!isEditing}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">{t('recruiter.profile.phone')}</Label>
                      <Input
                        id="phone"
                        value={profile.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        disabled={!isEditing}
                        className="mt-1"
                      />
                    </div>
                  </div>
                </div>

                {/* Professional Information */}
                <div>
                  <h4 className="text-md font-medium text-gray-800 dark:text-white mb-4">
                    {t('recruiter.profile.professionalInformation')}
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="company">{t('recruiter.profile.company')}</Label>
                      <Input
                        id="company"
                        value={profile.company}
                        onChange={(e) => handleInputChange('company', e.target.value)}
                        disabled={!isEditing}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="position">{t('recruiter.profile.position')}</Label>
                      <Input
                        id="position"
                        value={profile.position}
                        onChange={(e) => handleInputChange('position', e.target.value)}
                        disabled={!isEditing}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="location">{t('recruiter.profile.location')}</Label>
                      <Input
                        id="location"
                        value={profile.location}
                        onChange={(e) => handleInputChange('location', e.target.value)}
                        disabled={!isEditing}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="website">{t('recruiter.profile.website')}</Label>
                      <Input
                        id="website"
                        value={profile.website}
                        onChange={(e) => handleInputChange('website', e.target.value)}
                        disabled={!isEditing}
                        className="mt-1"
                      />
                    </div>
                  </div>
                </div>

                {/* Bio */}
                <div>
                  <Label htmlFor="bio">{t('recruiter.profile.bio')}</Label>
                  <Textarea
                    id="bio"
                    value={profile.bio}
                    onChange={(e) => handleInputChange('bio', e.target.value)}
                    disabled={!isEditing}
                    rows={4}
                    className="mt-1"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Statistics Card */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">{t('recruiter.profile.statistics')}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-blue-50 dark:bg-blue-900">
                <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">24</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">{t('recruiter.profile.jobsPosted')}</div>
              </div>
              <div className="text-center p-4 bg-green-50 dark:bg-green-900">
                <div className="text-2xl font-bold text-green-600 dark:text-green-400">156</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">{t('recruiter.profile.applicationsReceived')}</div>
              </div>
              <div className="text-center p-4 bg-purple-50 dark:bg-purple-900">
                <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">18</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">{t('recruiter.profile.successfulHires')}</div>
              </div>
              <div className="text-center p-4 bg-orange-50 dark:bg-orange-900">
                <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">4.8</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">{t('recruiter.profile.rating')}</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </RecruiterDashboardWrapper>
  );
};

export default RecruiterProfilePage; 