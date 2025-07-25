import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Shield, User, Mail, Bell, Edit3, Save } from "lucide-react";
import LandlordDashboardWrapper from "@/components/LandlordDashboardWrapper";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { useTranslation } from "react-i18next";

interface EmailPreference {
  id: string;
  label: string;
  description: string;
  enabled: boolean;
}

const initialEmailPreferences: EmailPreference[] = [
  {
    id: "alerts",
    label: "Alerts",
    description: "New listings based on your criteria.",
    enabled: true,
  },
  {
    id: "listingLeads",
    label: "Listing Leads",
    description: "User-submitted property leads.",
    enabled: true,
  },
  {
    id: "listingApprovals",
    label: "Listing Approvals",
    description: "Notifications for your approved listings.",
    enabled: true,
  },
  {
    id: "monthlyReports",
    label: "Monthly Reports",
    description: "Views, leads, and conversion metrics.",
    enabled: false,
  },
  {
    id: "listingExpiring",
    label: "Listing Expiring",
    description: "Reminders for inactive or expiring listings.",
    enabled: true,
  },
];

const LandlordAccountSettingsPage: React.FC = () => {
  const { t } = useTranslation();
  const [name, setName] = useState("Current Landlord Name"); // Placeholder
  const [email, setEmail] = useState("manaknightdigitaldev@gmail.com"); // Given email
  const [phone, setPhone] = useState("(647) 849-6002"); // Placeholder

  const [emailPreferences, setEmailPreferences] = useState<EmailPreference[]>(
    initialEmailPreferences
  );

  // Change Password Dialog State
  const [isPasswordDialogOpen, setIsPasswordDialogOpen] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleProfileSave = () => {
    console.log("Profile saved:", { name, email, phone });
    alert(t('landlord.accountSettings.profileSaved'));
  };

  const handleChangePassword = () => {
    setIsPasswordDialogOpen(true);
  };

  const handlePasswordChangeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordError("");
    if (!currentPassword || !newPassword || !confirmPassword) {
      setPasswordError(t('landlord.accountSettings.allFieldsRequired'));
      return;
    }
    if (newPassword !== confirmPassword) {
      setPasswordError(t('landlord.accountSettings.passwordsDontMatch'));
      return;
    }
    // Simulate password change
    alert(t('landlord.accountSettings.passwordChanged'));
    setIsPasswordDialogOpen(false);
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  const handleEmailPreferenceChange = (id: string) => {
    setEmailPreferences((prev) =>
      prev.map((pref) =>
        pref.id === id ? { ...pref, enabled: !pref.enabled } : pref
      )
    );
  };

  const handleEmailPreferencesSave = () => {
    console.log("Email preferences saved:", emailPreferences);
    alert(t('landlord.accountSettings.preferencesSaved'));
  };

  return (
    <LandlordDashboardWrapper>
      <div className="space-y-8 mt-8 mb-14 mx-auto p-4 md:p-0">
        <header className="mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-slate-800 dark:text-slate-100">
            {t('landlord.accountSettings.title')}
          </h1>
          <p className="text-base md:text-lg text-blue-600 dark:text-blue-400 font-medium mt-1 break-all">
            {email}
          </p>
        </header>

        {/* Profile Section */}
        <Card className="shadow-md border-slate-200 dark:border-slate-700 dark:bg-slate-800">
          <CardHeader>
            <div className="flex items-center space-x-3">
              <User className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              <div>
                <CardTitle className="text-lg md:text-xl font-semibold text-slate-800 dark:text-slate-100">
                  {t('landlord.accountSettings.profile')}
                </CardTitle>
                <CardDescription className="text-slate-600 dark:text-slate-400 text-sm md:text-base">
                  {t('landlord.accountSettings.profileDesc')}
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-1.5">
                <Label htmlFor="name" className="text-slate-700 dark:text-slate-300 text-sm md:text-base">
                  {t('landlord.accountSettings.name')}
                </Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="rounded-md border-slate-300 dark:bg-slate-700 dark:border-slate-600 dark:text-slate-200 text-sm md:text-base"
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="email-profile" className="text-slate-700 dark:text-slate-300 text-sm md:text-base">
                  {t('landlord.accountSettings.email')}
                </Label>
                <Input
                  id="email-profile"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="rounded-md border-slate-300 dark:bg-slate-700 dark:border-slate-600 dark:text-slate-200 text-sm md:text-base"
                />
              </div>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="phone" className="text-slate-700 dark:text-slate-300 text-sm md:text-base">
                {t('landlord.accountSettings.phone')}
              </Label>
              <Input
                id="phone"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="rounded-md border-slate-300 dark:bg-slate-700 dark:border-slate-600 dark:text-slate-200 text-sm md:text-base"
              />
            </div>
          </CardContent>
          <CardFooter className="border-t dark:border-slate-700 px-6 py-4 flex flex-col md:flex-row gap-3 md:gap-0 md:justify-end">
            <Button
              onClick={handleProfileSave}
              className="bg-blue-600 hover:bg-blue-700 text-white w-full md:w-auto"
            >
              <Save className="mr-2 h-4 w-4" /> {t('landlord.accountSettings.saveProfile')}
            </Button>
          </CardFooter>
        </Card>

        {/* Security Section */}
        <Card className="shadow-md border-slate-200 dark:border-slate-700 dark:bg-slate-800">
          <CardHeader>
            <div className="flex items-center space-x-3">
              <Shield className="h-6 w-6 text-green-600 dark:text-green-400" />
              <div>
                <CardTitle className="text-lg md:text-xl font-semibold text-slate-800 dark:text-slate-100">
                  {t('landlord.accountSettings.security')}
                </CardTitle>
                <CardDescription className="text-slate-600 dark:text-slate-400 text-sm md:text-base">
                  {t('landlord.accountSettings.securityDesc')}
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Dialog open={isPasswordDialogOpen} onOpenChange={setIsPasswordDialogOpen}>
              <DialogTrigger asChild>
                <Button
                  variant="outline"
                  onClick={handleChangePassword}
                  className="dark:text-slate-300 dark:border-slate-600 dark:hover:bg-slate-700 w-full md:w-auto"
                >
                  <Edit3 className="mr-2 h-4 w-4" /> {t('landlord.accountSettings.changePassword')}
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[400px] dark:bg-slate-800 dark:border-slate-700">
                <DialogHeader>
                  <DialogTitle className="dark:text-slate-100">
                    {t('landlord.accountSettings.changePassword')}
                  </DialogTitle>
                </DialogHeader>
                <form onSubmit={handlePasswordChangeSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="current-password" className="dark:text-slate-200 text-sm md:text-base">
                      {t('landlord.accountSettings.currentPassword')}
                    </Label>
                    <Input
                      id="current-password"
                      type="password"
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      className="dark:bg-slate-700 dark:border-slate-600 dark:text-slate-200 text-sm md:text-base"
                      autoComplete="current-password"
                    />
                  </div>
                  <div>
                    <Label htmlFor="new-password" className="dark:text-slate-200 text-sm md:text-base">
                      {t('landlord.accountSettings.newPassword')}
                    </Label>
                    <Input
                      id="new-password"
                      type="password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="dark:bg-slate-700 dark:border-slate-600 dark:text-slate-200 text-sm md:text-base"
                      autoComplete="new-password"
                    />
                  </div>
                  <div>
                    <Label htmlFor="confirm-password" className="dark:text-slate-200 text-sm md:text-base">
                      {t('landlord.accountSettings.confirmNewPassword')}
                    </Label>
                    <Input
                      id="confirm-password"
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="dark:bg-slate-700 dark:border-slate-600 dark:text-slate-200 text-sm md:text-base"
                      autoComplete="new-password"
                    />
                  </div>
                  {passwordError && (
                    <div className="text-red-600 text-sm md:text-base">{passwordError}</div>
                  )}
                  <DialogFooter className="flex flex-col md:flex-row gap-3 md:gap-0 md:justify-end">
                    <DialogClose asChild>
                      <Button type="button" variant="ghost" className="dark:text-slate-300 w-full md:w-auto">
                        {t('common.cancel')}
                      </Button>
                    </DialogClose>
                    <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white w-full md:w-auto">
                      {t('landlord.accountSettings.changePassword')}
                    </Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </CardContent>
        </Card>

        {/* Email Preferences Section */}
        <Card className="shadow-md border-slate-200 dark:border-slate-700 dark:bg-slate-800">
          <CardHeader>
            <div className="flex items-center space-x-3">
              <Mail className="h-6 w-6 text-orange-600 dark:text-orange-400" />
              <div>
                <CardTitle className="text-lg md:text-xl font-semibold text-slate-800 dark:text-slate-100">
                  {t('landlord.accountSettings.emailPreferences')}
                </CardTitle>
                <CardDescription className="text-slate-600 dark:text-slate-400 text-sm md:text-base">
                  {t('landlord.accountSettings.emailPreferencesDesc')}
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {emailPreferences.map((pref, index) => (
              <React.Fragment key={pref.id}>
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-2 sm:space-y-0 sm:space-x-4 py-3">
                  <div className="flex flex-col">
                    <Label htmlFor={pref.id} className="font-medium text-slate-700 dark:text-slate-200 text-sm md:text-base">
                      {pref.label}
                    </Label>
                    <span className="text-xs md:text-sm text-slate-500 dark:text-slate-400">
                      {pref.description}
                    </span>
                  </div>
                  <Switch
                    id={pref.id}
                    checked={pref.enabled}
                    onCheckedChange={() => handleEmailPreferenceChange(pref.id)}
                    className="data-[state=checked]:bg-blue-600 dark:data-[state=checked]:bg-blue-500"
                  />
                </div>
                {index < emailPreferences.length - 1 && (
                  <Separator className="dark:bg-slate-700" />
                )}
              </React.Fragment>
            ))}
          </CardContent>
          <CardFooter className="border-t dark:border-slate-700 px-6 py-4 flex flex-col md:flex-row gap-3 md:gap-0 md:justify-end">
            <Button
              onClick={handleEmailPreferencesSave}
              className="bg-blue-600 hover:bg-blue-700 text-white w-full md:w-auto"
            >
              <Save className="mr-2 h-4 w-4" /> {t('landlord.accountSettings.savePreferences')}
            </Button>
          </CardFooter>
        </Card>

        {/* Optional: Dark Mode Toggle Placeholder */}
        {/* <Card className="shadow-md border-slate-200 dark:border-slate-700 dark:bg-slate-800">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-slate-800 dark:text-slate-100">
              Appearance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <Label
                htmlFor="darkModeToggle"
                className="text-slate-700 dark:text-slate-300"
              >
                Dark Mode
              </Label>
              <Switch
                id="darkModeToggle"
                disabled
                onCheckedChange={() =>
                  alert("Dark mode toggle to be implemented globally.")
                }
              />
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Global dark mode setting (feature placeholder).
            </p>
          </CardContent>
        </Card> */}
      </div>
    </LandlordDashboardWrapper>
  );
};

export default LandlordAccountSettingsPage;
