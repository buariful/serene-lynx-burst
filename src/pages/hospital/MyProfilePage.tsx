import React, { useState } from "react";
import { useTranslation } from 'react-i18next';
import { Edit, Camera, Save, X, MapPin, Phone, Mail, Building, Calendar, Shield, Settings, Bell, Key, User, CreditCard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

interface UserProfile {
  name: string;
  email: string;
  phone: string;
  image: string;
  role: string;
  department: string;
  hospital: string;
  location: string;
  joinDate: string;
  bio: string;
  specialties: string[];
  certifications: string[];
  notifications: {
    email: boolean;
    push: boolean;
    sms: boolean;
    marketing: boolean;
  };
  privacy: {
    profileVisible: boolean;
    contactVisible: boolean;
    activityVisible: boolean;
  };
}

const MyProfilePage = () => {
  const { t } = useTranslation();
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState('profile');
  
  const [profile, setProfile] = useState<UserProfile>({
    name: "Dr. John Doe",
    email: "john.doe@example.com",
    phone: "+1 5553-4567",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    role: "Senior Radiologist",
    department: "Radiology",
    hospital: "Toronto General Hospital",
    location: "Toronto, ON, Canada",
    joinDate: "2020-03-15",
    bio: "Experienced radiologist with over 8 years of practice in diagnostic imaging. Specialized in MRI and CT scan interpretation with a focus on emergency radiology.",
    specialties: ["MRI Interpretation", "CT Scan Analysis", "Emergency Radiology", "National Procedures"],
    certifications: ["Board Certified Radiologist", "MRI Safety Officer", "Advanced Cardiac Life Support"],
    notifications: {
      email: true,
      push: true,
      sms: false,
      marketing: false,
    },
    privacy: {
      profileVisible: true,
      contactVisible: true,
      activityVisible: false,
    }
  });

  const [editForm, setEditForm] = useState(profile);

  const handleSave = () => {
    setProfile(editForm);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditForm(profile);
    setIsEditing(false);
  };

  const handleInputChange = (field: string, value: string | boolean) => {
    setEditForm(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleNotificationChange = (type: keyof typeof profile.notifications, value: boolean) => {
    setEditForm(prev => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [type]: value
      }
    }));
  };

  const handlePrivacyChange = (type: keyof typeof profile.privacy, value: boolean) => {
    setEditForm(prev => ({
      ...prev,
      privacy: {
        ...prev.privacy,
        [type]: value
      }
    }));
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {    year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen">
      <div className=" mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{t('myProfile.title')}</h1>
          <p className="text-gray-600 dark:text-gray-400">Manage your profile information and preferences</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Card */}
          <div className="lg:col-span-1">
            <Card className="sticky top-8">
              <CardContent className="p-6">
                <div className="text-center">
                  <div className="relative inline-block mb-4">
                    <Avatar className="w-24 h-24">
                      <AvatarImage src={profile.image} alt={profile.name} />
                      <AvatarFallback className="text-2xl">{profile.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    {isEditing && (
                      <Button
                        size="sm"
                        variant="secondary"
                        className="absolute -bottom-2 right-2 rounded-full w-8 h-8 p-0"
                      >
                        <Camera className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                  
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-1">
                    {isEditing ? editForm.name : profile.name}
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400 mb-2">
                    {isEditing ? editForm.role : profile.role}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                    {isEditing ? editForm.department : profile.department}
                  </p>
                  
                  <div className="space-y-3 text-left">
                    <div className="flex items-center text-sm">
                      <Building className="w-4 h-4 mr-2 text-gray-400" />
                      <span className="text-gray-600 dark:text-gray-400">
                        {isEditing ? editForm.hospital : profile.hospital}
                      </span>
                    </div>
                    <div className="flex items-center text-sm">
                      <MapPin className="w-4 h-4 mr-2 text-gray-400" />
                      <span className="text-gray-600 dark:text-gray-400">
                        {isEditing ? editForm.location : profile.location}
                      </span>
                    </div>
                    <div className="flex items-center text-sm">
                      <Calendar className="w-4 h-4 mr-2 text-gray-400" />
                      <span className="text-gray-600 dark:text-gray-400">
                        Joined {formatDate(profile.joinDate)}
                      </span>
                    </div>
                  </div>
                  
                  {!isEditing && (
                    <Button
                      onClick={() => setIsEditing(true)}
                      className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white"
                    >
                      <Edit className="w-4 h-4 mr-2" /> Edit Profile
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="profile" className="flex items-center">
                  <User className="w-4 h-4 mr-2" /> Profile
                </TabsTrigger>
                <TabsTrigger value="notifications" className="flex items-center">
                  <Bell className="w-4 h-4 mr-2" /> Notifications
                </TabsTrigger>
                <TabsTrigger value="privacy" className="flex items-center">
                  <Shield className="w-4 h-4 mr-2" /> Privacy
                </TabsTrigger>
                <TabsTrigger value="security" className="flex items-center">
                  <Key className="w-4 h-4 mr-2" /> Security
                </TabsTrigger>
              </TabsList>

              {/* Profile Tab */}
              <TabsContent value="profile" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <User className="w-5 h-5 mr-2" /> Personal Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="name">Full Name</Label>
                        <Input
                          id="name"
                          value={isEditing ? editForm.name : profile.name}
                          onChange={(e) => handleInputChange('name', e.target.value)}
                          disabled={!isEditing}
                        />
                      </div>
                      <div>
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          value={isEditing ? editForm.email : profile.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                          disabled={!isEditing}
                        />
                      </div>
                      <div>
                        <Label htmlFor="phone">Phone</Label>
                        <Input
                          id="phone"
                          value={isEditing ? editForm.phone : profile.phone}
                          onChange={(e) => handleInputChange('phone', e.target.value)}
                          disabled={!isEditing}
                        />
                      </div>
                      <div>
                        <Label htmlFor="role">Role</Label>
                        <Input
                          id="role"
                          value={isEditing ? editForm.role : profile.role}
                          onChange={(e) => handleInputChange('role', e.target.value)}
                          disabled={!isEditing}
                        />
                      </div>
                    </div>
                    
                    <div>
                      <Label htmlFor="bio">Bio</Label>
                      <Textarea
                        id="bio"
                        value={isEditing ? editForm.bio : profile.bio}
                        onChange={(e) => handleInputChange('bio', e.target.value)}
                        disabled={!isEditing}
                        rows={4}
                      />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Specialties</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {profile.specialties.map((specialty, index) => (
                        <Badge key={index} variant="secondary">
                          {specialty}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Certifications</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {profile.certifications.map((cert, index) => (
                        <div key={index} className="flex items-center text-sm">
                          <Shield className="w-4 h-4 mr-2 text-green-500" />
                          {cert}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {isEditing && (
                  <div className="flex space-x-3">
                    <Button onClick={handleSave} className="bg-blue-600 hover:bg-blue-700 text-white">
                      <Save className="w-4 h-4 mr-2" /> Save Changes
                    </Button>
                    <Button onClick={handleCancel} variant="outline">
                      <X className="w-4 h-4 mr-2" /> Cancel
                    </Button>
                  </div>
                )}
              </TabsContent>

              {/* Notifications Tab */}
              <TabsContent value="notifications" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Bell className="w-5 h-5 mr-2" /> Notification Preferences
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <Label className="text-base font-medium">Email Notifications</Label>
                          <p className="text-sm text-gray-500">Receive notifications via email</p>
                        </div>
                        <Switch
                          checked={editForm.notifications.email}
                          onCheckedChange={(checked) => handleNotificationChange('email', checked)}
                        />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <Label className="text-base font-medium">Push Notifications</Label>
                          <p className="text-sm text-gray-500">push notifications in app</p>
                        </div>
                        <Switch
                          checked={editForm.notifications.push}
                          onCheckedChange={(checked) => handleNotificationChange('push', checked)}
                        />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <Label className="text-base font-medium">SMS Notifications</Label>
                          <p className="text-sm text-gray-500">Receive notifications via SMS</p>
                        </div>
                        <Switch
                          checked={editForm.notifications.sms}
                          onCheckedChange={(checked) => handleNotificationChange('sms', checked)}
                        />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <Label className="text-base font-medium">Marketing Communications</Label>
                          <p className="text-sm text-gray-500">Receive marketing and promotional emails</p>
                        </div>
                        <Switch
                          checked={editForm.notifications.marketing}
                          onCheckedChange={(checked) => handleNotificationChange('marketing', checked)}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Privacy Tab */}
              <TabsContent value="privacy" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Shield className="w-5 h-5 mr-2" /> Privacy Settings
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <Label className="text-base font-medium">Profile Visibility</Label>
                          <p className="text-sm text-gray-500">Allow others to see your profile</p>
                        </div>
                        <Switch
                          checked={editForm.privacy.profileVisible}
                          onCheckedChange={(checked) => handlePrivacyChange('profileVisible', checked)}
                        />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <Label className="text-base font-medium">Contact Information</Label>
                          <p className="text-sm text-gray-500">Allow contact details to other users</p>
                        </div>
                        <Switch
                          checked={editForm.privacy.contactVisible}
                          onCheckedChange={(checked) => handlePrivacyChange('contactVisible', checked)}
                        />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <Label className="text-base font-medium">Activity Status</Label>
                          <p className="text-sm text-gray-500">Show when you're online</p>
                        </div>
                        <Switch
                          checked={editForm.privacy.activityVisible}
                          onCheckedChange={(checked) => handlePrivacyChange('activityVisible', checked)}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Security Tab */}
              <TabsContent value="security" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Key className="w-5 h-5 mr-2" /> Security Settings
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <Button variant="outline" className="w-full justify-start">
                        <Key className="w-4 h-4 mr-2" /> Change Password
                      </Button>
                      
                      <Button variant="outline" className="w-full justify-start">
                        <Shield className="w-4 h-4 mr-2" /> Two-Factor Authentication
                      </Button>
                      
                      <Button variant="outline" className="w-full justify-start">
                        <CreditCard className="w-4 h-4 mr-2" /> Payment Methods
                      </Button>
                      
                      <Button variant="outline" className="w-full justify-start">
                        <Settings className="w-4 h-4 mr-2" /> Account Settings
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfilePage;
