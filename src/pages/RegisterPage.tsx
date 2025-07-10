import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MadeWithDyad } from "@/components/made-with-dyad";
import { showSuccess, showError } from "@/utils/toast";
import { FaFacebook, FaGoogle } from "react-icons/fa";
import { useTranslation } from "react-i18next";

type UserRole = "landlord" | "tenant" | "hospital" | "recruiter" | "";

const RegisterPage = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState<UserRole>("");
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email || !password || !confirmPassword || !role) {
      showError("Please fill in all fields and select a role.");
      return;
    }
    if (password !== confirmPassword) {
      showError("Passwords do not match.");
      return;
    }
    console.log("Registration attempt with:", {
      fullName,
      email,
      password,
      role,
    });
    // TODO: Implement actual registration logic here
    showSuccess("Registration successful! Please login.");
    setTimeout(() => {
      if (role === "tenant") {
        navigate("/tenant/dashboard");
      } else {
        navigate("/login");
      }
    }, 1500);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">
            {t("registerPage.title")}
          </CardTitle>
          <CardDescription>{t("registerPage.description")}</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleRegister} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="fullName">{t("registerPage.fullName")}</Label>
              <Input
                id="fullName"
                type="text"
                placeholder="John Doe"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">{t("registerPage.email")}</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">{t("registerPage.password")}</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">
                {t("registerPage.confirmPassword")}
              </Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="role">{t("registerPage.iamA")}</Label>
              <Select
                value={role}
                onValueChange={(value) => setRole(value as UserRole)}
                required
              >
                <SelectTrigger id="role">
                  <SelectValue placeholder={t("registerPage.selectRole")} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="landlord">
                    {t("registerPage.landlord")}
                  </SelectItem>
                  <SelectItem value="tenant">
                    {t("registerPage.tenant")}
                  </SelectItem>
                  <SelectItem value="hospital">
                    {t("registerPage.hospital")}
                  </SelectItem>
                  <SelectItem value="recruiter">
                    {t("registerPage.recruiter")}
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700"
            >
              {t("registerPage.register")}
            </Button>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 w-full">
              <Button
                type="button"
                variant="outline"
                className="flex-1 min-w-0 mt-2 flex items-center justify-center gap-2 border border-gray-300 break-words whitespace-normal"
                onClick={() => {
                  showSuccess("Google login successful! Redirecting...");
                  setTimeout(() => {
                    navigate("/hospital/dashboard");
                  }, 1500);
                }}
              >
                <FaGoogle className="text-blue-500" />{" "}
                {t("loginPage.loginWithGoogle")}
              </Button>

              <Button
                type="button"
                variant="outline"
                className="flex-1 min-w-0 mt-2 flex items-center justify-center gap-2 border border-gray-300 break-words whitespace-normal"
                onClick={() => {
                  showSuccess("Facebook login successful! Redirecting...");
                  setTimeout(() => {
                    navigate("/hospital/dashboard");
                  }, 1500);
                }}
              >
                <FaFacebook className="text-blue-500" />{" "}
                {t("loginPage.loginWithFacebook")}
              </Button>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col items-center space-y-2">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {t("registerPage.haveAccount")}{" "}
            <Link
              to="/login"
              className="font-medium text-blue-600 hover:underline"
            >
              {t("registerPage.login")}
            </Link>
          </p>
          {/* <MadeWithDyad /> */}
        </CardFooter>
      </Card>
    </div>
  );
};

export default RegisterPage;
