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
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white">{t('doctor.profile.title')}</h1>
      <Card>
        <CardHeader>
          <CardTitle>{t('doctor.profile.profileInformation')}</CardTitle>
          <CardDescription>{t('doctor.profile.profileDesc')}</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex items-center space-x-4">
              <Avatar className="h-24 w-24">
                <AvatarImage src={profile.avatarUrl} alt={profile.name} />
                <AvatarFallback>{profile.name.substring(0,2).toUpperCase()}</AvatarFallback>
              </Avatar>
              <div>
                <Label htmlFor="avatarUrl">{t('doctor.profile.avatarUrl')}</Label>
                <Input 
                  id="avatarUrl" 
                  name="avatarUrl"
                  type="text" 
                  value={profile.avatarUrl} 
                  onChange={handleInputChange} 
                  placeholder="https://example.com/avatar.png"
                />
                 <p className="text-xs text-gray-500 mt-1">{t('doctor.profile.uploadImageNote')}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">{t('doctor.profile.fullName')}</Label>
                <Input id="name" name="name" value={profile.name} onChange={handleInputChange} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">{t('doctor.profile.emailAddress')}</Label>
                <Input id="email" name="email" type="email" value={profile.email} onChange={handleInputChange} />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="specialty">{t('doctor.profile.specialty')}</Label>
              <Input id="specialty" name="specialty" value={profile.specialty} onChange={handleInputChange} />
            </div>
            {/* Add more fields as needed: phone, address, bio, credentials upload etc. */}
            <Button type="submit" className="bg-blue-600 hover:bg-blue-700">{t('doctor.profile.saveChanges')}</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default DoctorProfilePage;