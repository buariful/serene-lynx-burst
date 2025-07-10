import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'; // Assuming Avatar component exists
import { useTranslation } from 'react-i18next';

const DoctorProfilePage: React.FC = () => {
  // Placeholder state for profile data
  const [profile, setProfile] = React.useState({
    name: 'Dr. Emily Carter', // Placeholder
    email: 'emily.carter@example.com', // Placeholder
    specialty: 'Cardiology', // Placeholder
    avatarUrl: 'https://via.placeholder.com/150/007bff/FFFFFF?Text=EC', // Placeholder
  });
  const { t } = useTranslation();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfile(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Profile updated:", profile);
    // TODO: Add API call to save profile
    alert("Profile updated (simulation)!");
  };

  return (
    <div className="space-y-6 bg-gray-50 dark:bg-gray-900 min-h-screen p-6">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white">{t('doctor.profile.title')}</h1>
      <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
        <CardHeader className="bg-white dark:bg-gray-800">
          <CardTitle className="text-gray-800 dark:text-white">{t('doctor.profile.profileInformation')}</CardTitle>
          <CardDescription className="text-gray-600 dark:text-gray-400">{t('doctor.profile.profileDesc')}</CardDescription>
        </CardHeader>
        <CardContent className="bg-white dark:bg-gray-800">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex items-center space-x-4">
              <Avatar className="h-24 w-24">
                <AvatarImage src={profile.avatarUrl} alt={profile.name} />
                <AvatarFallback className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white">{profile.name.substring(0,2).toUpperCase()}</AvatarFallback>
              </Avatar>
              <div>
                <Label htmlFor="avatarUrl" className="text-gray-700 dark:text-gray-300">{t('doctor.profile.avatarUrl')}</Label>
                <Input 
                  id="avatarUrl" 
                  name="avatarUrl"
                  type="text" 
                  value={profile.avatarUrl} 
                  onChange={handleInputChange} 
                  placeholder="https://example.com/avatar.png"
                  className="bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white"
                />
                 <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{t('doctor.profile.uploadImageNote')}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-gray-700 dark:text-gray-300">{t('doctor.profile.fullName')}</Label>
                <Input 
                  id="name" 
                  name="name" 
                  value={profile.name} 
                  onChange={handleInputChange}
                  className="bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-700 dark:text-gray-300">{t('doctor.profile.emailAddress')}</Label>
                <Input 
                  id="email" 
                  name="email" 
                  type="email" 
                  value={profile.email} 
                  onChange={handleInputChange}
                  className="bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="specialty" className="text-gray-700 dark:text-gray-300">{t('doctor.profile.specialty')}</Label>
              <Input 
                id="specialty" 
                name="specialty" 
                value={profile.specialty} 
                onChange={handleInputChange}
                className="bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white"
              />
            </div>
            {/* Add more fields as needed: phone, address, bio, credentials upload etc. */}
            <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white">{t('doctor.profile.saveChanges')}</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default DoctorProfilePage;