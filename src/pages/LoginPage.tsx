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
import { FaGoogle, FaFacebook } from "react-icons/fa";
import { useTranslation } from "react-i18next";

type UserRole = "landlord" | "tenant" | "hospital" | "recruiter" | "";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<UserRole>("");
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password || !role) {
      showError("Please fill in all fields and select a role.");
      return;
    }
    console.log("Login attempt with:", { email, password, role });
    // TODO: Implement actual login logic here (e.g., API call)

    showSuccess("Login successful! Redirecting...");
    setTimeout(() => {
      if (role === "landlord") {
        navigate("/landlord/dashboard");
      } else if (role === "hospital") {
        navigate("/hospital/dashboard");
      } else if (role === "tenant") {
        navigate("/tenant/dashboard");
      } else if (role === "recruiter") {
        navigate("/recruiter/dashboard");
      } else {
        navigate("/");
      }
    }, 1500);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">
            {t("loginPage.title")}
          </CardTitle>
          <CardDescription>{t("loginPage.description")}</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">{t("loginPage.email")}</Label>
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
              <Label htmlFor="password">{t("loginPage.password")}</Label>
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
              <Label htmlFor="role">{t("loginPage.loginAs")}</Label>
              <Select
                value={role}
                onValueChange={(value) => setRole(value as UserRole)}
                required
              >
                <SelectTrigger id="role">
                  <SelectValue placeholder={t("loginPage.selectRole")} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="landlord">
                    {t("loginPage.landlord")}
                  </SelectItem>
                  <SelectItem value="tenant">
                    {t("loginPage.tenant")}
                  </SelectItem>
                  <SelectItem value="hospital">
                    {t("loginPage.hospital")}
                  </SelectItem>
                  <SelectItem value="recruiter">
                    {t("loginPage.recruiter")}
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700"
            >
              {t("loginPage.login")}
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
          <Link
            to="/forgot-password"
            className="text-sm text-blue-600 hover:underline"
          >
            {t("loginPage.forgotPassword")}
          </Link>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {t("loginPage.noAccount")}{" "}
            <Link
              to="/register"
              className="font-medium text-blue-600 hover:underline"
            >
              {t("loginPage.signUp")}
            </Link>
          </p>
          {/* <MadeWithDyad /> */}
        </CardFooter>
      </Card>
    </div>
  );
};

export default LoginPage;
