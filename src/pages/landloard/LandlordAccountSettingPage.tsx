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
    alert("Profile information saved!");
  };

  const handleChangePassword = () => {
    setIsPasswordDialogOpen(true);
  };

  const handlePasswordChangeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordError("");
    if (!currentPassword || !newPassword || !confirmPassword) {
      setPasswordError("All fields are required.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setPasswordError("New passwords do not match.");
      return;
    }
    // Simulate password change
    alert("Password changed successfully!");
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
    alert("Email preferences saved!");
  };

  return (
    <LandlordDashboardWrapper>
      <div className="space-y-8 max-w-4xl mx-auto p-4 md:p-0">
        <header className="mb-6">
          <h1 className="text-3xl font-bold text-slate-800 dark:text-slate-100">
            Account Settings
          </h1>
          <p className="text-lg text-blue-600 dark:text-blue-400 font-medium mt-1">
            {email}
          </p>
        </header>

        {/* Profile Section */}
        <Card className="shadow-md border-slate-200 dark:border-slate-700 dark:bg-slate-800">
          <CardHeader>
            <div className="flex items-center space-x-3">
              <User className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              <div>
                <CardTitle className="text-xl font-semibold text-slate-800 dark:text-slate-100">
                  Profile
                </CardTitle>
                <CardDescription className="text-slate-600 dark:text-slate-400">
                  Manage your personal information.
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-1.5">
                <Label
                  htmlFor="name"
                  className="text-slate-700 dark:text-slate-300"
                >
                  Name
                </Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="rounded-md border-slate-300 dark:bg-slate-700 dark:border-slate-600 dark:text-slate-200"
                />
              </div>
              <div className="space-y-1.5">
                <Label
                  htmlFor="email-profile"
                  className="text-slate-700 dark:text-slate-300"
                >
                  Email
                </Label>
                <Input
                  id="email-profile"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="rounded-md border-slate-300 dark:bg-slate-700 dark:border-slate-600 dark:text-slate-200"
                />
              </div>
            </div>
            <div className="space-y-1.5">
              <Label
                htmlFor="phone"
                className="text-slate-700 dark:text-slate-300"
              >
                Phone
              </Label>
              <Input
                id="phone"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="rounded-md border-slate-300 dark:bg-slate-700 dark:border-slate-600 dark:text-slate-200"
              />
            </div>
          </CardContent>
          <CardFooter className="border-t dark:border-slate-700 px-6 py-4">
            <Button
              onClick={handleProfileSave}
              className="ml-auto bg-blue-600 hover:bg-blue-700 text-white"
            >
              <Save className="mr-2 h-4 w-4" /> Save Profile
            </Button>
          </CardFooter>
        </Card>

        {/* Security Section */}
        <Card className="shadow-md border-slate-200 dark:border-slate-700 dark:bg-slate-800">
          <CardHeader>
            <div className="flex items-center space-x-3">
              <Shield className="h-6 w-6 text-green-600 dark:text-green-400" />
              <div>
                <CardTitle className="text-xl font-semibold text-slate-800 dark:text-slate-100">
                  Security
                </CardTitle>
                <CardDescription className="text-slate-600 dark:text-slate-400">
                  Manage your account security.
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Dialog
              open={isPasswordDialogOpen}
              onOpenChange={setIsPasswordDialogOpen}
            >
              <DialogTrigger asChild>
                <Button
                  variant="outline"
                  onClick={handleChangePassword}
                  className="dark:text-slate-300 dark:border-slate-600 dark:hover:bg-slate-700"
                >
                  <Edit3 className="mr-2 h-4 w-4" /> Change Password
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[400px] dark:bg-slate-800 dark:border-slate-700">
                <DialogHeader>
                  <DialogTitle className="dark:text-slate-100">
                    Change Password
                  </DialogTitle>
                </DialogHeader>
                <form
                  onSubmit={handlePasswordChangeSubmit}
                  className="space-y-4"
                >
                  <div>
                    <Label
                      htmlFor="current-password"
                      className="dark:text-slate-200"
                    >
                      Current Password
                    </Label>
                    <Input
                      id="current-password"
                      type="password"
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      className="dark:bg-slate-700 dark:border-slate-600 dark:text-slate-200"
                      autoComplete="current-password"
                    />
                  </div>
                  <div>
                    <Label
                      htmlFor="new-password"
                      className="dark:text-slate-200"
                    >
                      New Password
                    </Label>
                    <Input
                      id="new-password"
                      type="password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="dark:bg-slate-700 dark:border-slate-600 dark:text-slate-200"
                      autoComplete="new-password"
                    />
                  </div>
                  <div>
                    <Label
                      htmlFor="confirm-password"
                      className="dark:text-slate-200"
                    >
                      Confirm New Password
                    </Label>
                    <Input
                      id="confirm-password"
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="dark:bg-slate-700 dark:border-slate-600 dark:text-slate-200"
                      autoComplete="new-password"
                    />
                  </div>
                  {passwordError && (
                    <div className="text-red-600 text-sm">{passwordError}</div>
                  )}
                  <DialogFooter>
                    <DialogClose asChild>
                      <Button
                        type="button"
                        variant="ghost"
                        className="dark:text-slate-300"
                      >
                        Cancel
                      </Button>
                    </DialogClose>
                    <Button
                      type="submit"
                      className="bg-blue-600 hover:bg-blue-700 text-white"
                    >
                      Change Password
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
                <CardTitle className="text-xl font-semibold text-slate-800 dark:text-slate-100">
                  Email Preferences
                </CardTitle>
                <CardDescription className="text-slate-600 dark:text-slate-400">
                  Choose when to receive emails from us.
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {emailPreferences.map((pref, index) => (
              <React.Fragment key={pref.id}>
                <div className="flex items-center justify-between space-x-4 py-3">
                  <div className="flex flex-col">
                    <Label
                      htmlFor={pref.id}
                      className="font-medium text-slate-700 dark:text-slate-200"
                    >
                      {pref.label}
                    </Label>
                    <span className="text-sm text-slate-500 dark:text-slate-400">
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
          <CardFooter className="border-t dark:border-slate-700 px-6 py-4">
            <Button
              onClick={handleEmailPreferencesSave}
              className="ml-auto bg-blue-600 hover:bg-blue-700 text-white"
            >
              <Save className="mr-2 h-4 w-4" /> Save Preferences
            </Button>
          </CardFooter>
        </Card>

        {/* Optional: Dark Mode Toggle Placeholder */}
        <Card className="shadow-md border-slate-200 dark:border-slate-700 dark:bg-slate-800">
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
        </Card>
      </div>
    </LandlordDashboardWrapper>
  );
};

export default LandlordAccountSettingsPage;
