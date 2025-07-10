import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch"; // Assuming Switch component exists
import { useTranslation } from 'react-i18next';

const DoctorSettingsPage: React.FC = () => {
  // Placeholder state for settings
  const [settings, setSettings] = React.useState({
    emailNotifications: true,
    smsNotifications: false,
    darkMode: false, // Assuming a global theme context would handle this
  });
  const { t } = useTranslation();

  const handleSwitchChange = (settingName: keyof typeof settings) => {
    setSettings((prev) => ({ ...prev, [settingName]: !prev[settingName] }));
    // TODO: Add API call to save settings
    console.log("Settings updated:", {
      ...settings,
      [settingName]: !settings[settingName],
    });
  };

  const handlePasswordChange = () => {
    console.log("Change password clicked");
    // TODO: Implement password change modal/form
    alert("Password change functionality to be implemented.");
  };

  return (
    <div className="space-y-6 bg-gray-50 dark:bg-gray-900 min-h-screen p-6">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
        {t('doctor.settings.title')}
      </h1>

      <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
        <CardHeader className="bg-white dark:bg-gray-800">
          <CardTitle className="text-gray-800 dark:text-white">{t('doctor.settings.notificationSettings')}</CardTitle>
          <CardDescription className="text-gray-600 dark:text-gray-400">
            {t('doctor.settings.notificationDesc')}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 bg-white dark:bg-gray-800">
          <div className="flex items-center justify-between">
            <Label
              htmlFor="emailNotifications"
              className="flex flex-col space-y-1 text-gray-700 dark:text-gray-300"
            >
              <span>{t('doctor.settings.emailNotifications')}</span>
              <span className="font-normal leading-snug text-gray-500 dark:text-gray-400">
                {t('doctor.settings.emailNotificationsDesc')}
              </span>
            </Label>
            <Switch
              id="emailNotifications"
              checked={settings.emailNotifications}
              onCheckedChange={() => handleSwitchChange("emailNotifications")}
            />
          </div>
          <div className="flex items-center justify-between">
            <Label
              htmlFor="smsNotifications"
              className="flex flex-col space-y-1 text-gray-700 dark:text-gray-300"
            >
              <span>{t('doctor.settings.smsNotifications')}</span>
              <span className="font-normal leading-snug text-gray-500 dark:text-gray-400">
                {t('doctor.settings.smsNotificationsDesc')}
              </span>
            </Label>
            <Switch
              id="smsNotifications"
              checked={settings.smsNotifications}
              onCheckedChange={() => handleSwitchChange("smsNotifications")}
            />
          </div>
        </CardContent>
      </Card>

      <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
        <CardHeader className="bg-white dark:bg-gray-800">
          <CardTitle className="text-gray-800 dark:text-white">{t('doctor.settings.accountSecurity')}</CardTitle>
          <CardDescription className="text-gray-600 dark:text-gray-400">
            {t('doctor.settings.accountSecurityDesc')}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 bg-white dark:bg-gray-800">
          <div>
            <Button variant="outline" onClick={handlePasswordChange} className="border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
              {t('doctor.settings.changePassword')}
            </Button>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              {t('doctor.settings.passwordNote')}
            </p>
          </div>
          {/* TODO: Add Two-Factor Authentication setup here */}
        </CardContent>
      </Card>

      {/* Placeholder for Dark Mode toggle, assuming it's handled globally */}
      {/* <Card>
        <CardHeader>
          <CardTitle>Appearance</CardTitle>
          <CardDescription>Customize the look and feel of the portal.</CardDescription>
        </CardHeader>
        <CardContent>
           <div className="flex items-center justify-between">
            <Label htmlFor="darkModeToggle" className="flex flex-col space-y-1">
              <span>Dark Mode</span>
               <span className="font-normal leading-snug text-muted-foreground">
                Toggle dark mode for the portal. (Global setting)
              </span>
            </Label>
            <Switch
              id="darkModeToggle"
              checked={settings.darkMode} // This would typically come from a theme context
              onCheckedChange={() => {
                // This would dispatch an action to a theme context
                setSettings(prev => ({...prev, darkMode: !prev.darkMode}));
                alert("Dark mode toggle is a global setting, simulation only.");
              }} 
            />
          </div>
        </CardContent>
      </Card> */}
    </div>
  );
};

export default DoctorSettingsPage;
