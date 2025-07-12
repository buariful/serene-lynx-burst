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
import { useState, useEffect } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { showSuccess, showError } from "@/utils/toast";
import { useTranslation } from "react-i18next";
import { ArrowLeft, CheckCircle, Eye, EyeOff } from "lucide-react";

const SetNewPasswordPage = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [email, setEmail] = useState<string | null>(null);
  const [otp, setOtp] = useState<string | null>(null);
  const [isValid, setIsValid] = useState(true);
  
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { t } = useTranslation();

  useEffect(() => {
    const emailFromUrl = searchParams.get("email");
    const otpFromUrl = searchParams.get("otp");
    
    setEmail(emailFromUrl);
    setOtp(otpFromUrl);
    
    // TODO: Validate email and OTP with backend
    if (!emailFromUrl || !otpFromUrl) {
      setIsValid(false);
      showError("Invalid reset link. Please try again.");
    }
  }, [searchParams]);

  const validatePassword = (password: string): boolean => {
    return password.length >= 8;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newPassword.trim()) {
      showError(t("setNewPasswordPage.passwordRequired"));
      return;
    }

    if (!validatePassword(newPassword)) {
      showError(t("setNewPasswordPage.passwordTooShort"));
      return;
    }

    if (!confirmPassword.trim()) {
      showError(t("setNewPasswordPage.confirmPasswordRequired"));
      return;
    }

    if (newPassword !== confirmPassword) {
      showError(t("setNewPasswordPage.passwordsDontMatch"));
      return;
    }

    if (!email || !otp) {
      showError("Invalid reset link. Please try again.");
      return;
    }

    setIsLoading(true);
    
    try {
      // TODO: Implement actual API call to reset password
      console.log("Resetting password for email:", email, "with OTP:", otp);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setIsSuccess(true);
      showSuccess(t("setNewPasswordPage.passwordResetSuccess"));
      
      // Redirect to login after 3 seconds
      setTimeout(() => {
        navigate("/login");
      }, 3000);
    } catch (error) {
      console.error("Error resetting password:", error);
      showError("Failed to reset password. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  if (!isValid) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-100 dark:bg-red-900">
              <ArrowLeft className="h-6 w-6 text-red-600 dark:text-red-400" />
            </div>
            <CardTitle className="text-2xl font-bold text-red-600 dark:text-red-400">
              Invalid Reset Link
            </CardTitle>
            <CardDescription className="text-gray-600 dark:text-gray-400">
              The password reset link is invalid or has expired.
            </CardDescription>
          </CardHeader>
          <CardFooter className="flex justify-center">
            <Button
              asChild
              className="w-full bg-blue-600 hover:bg-blue-700"
            >
              <Link to="/forgot-password">
                Request New Reset Link
              </Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  if (isSuccess) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-100 dark:bg-green-900">
              <CheckCircle className="h-6 w-6 text-green-600 dark:text-green-400" />
            </div>
            <CardTitle className="text-2xl font-bold text-green-600 dark:text-green-400">
              {t("setNewPasswordPage.passwordResetSuccess")}
            </CardTitle>
            <CardDescription className="text-gray-600 dark:text-gray-400">
              {t("setNewPasswordPage.passwordResetSuccessDescription")}
            </CardDescription>
          </CardHeader>
          <CardFooter className="flex justify-center">
            <Button
              asChild
              className="w-full bg-blue-600 hover:bg-blue-700"
            >
              <Link to="/login">
                {t("setNewPasswordPage.backToLogin")}
              </Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <Button
            variant="ghost"
            size="sm"
            asChild
            className="absolute left-4 top-4 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100"
          >
            <Link to="/login">
              <ArrowLeft className="h-4 w-4 mr-2" />
              {t("setNewPasswordPage.backToLogin")}
            </Link>
          </Button>
          <CardTitle className="text-2xl font-bold">
            {t("setNewPasswordPage.title")}
          </CardTitle>
          <CardDescription>
            {t("setNewPasswordPage.description")}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="newPassword">{t("setNewPasswordPage.newPassword")}</Label>
              <div className="relative">
                <Input
                  id="newPassword"
                  type={showPassword ? "text" : "password"}
                  placeholder={t("setNewPasswordPage.passwordPlaceholder")}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                  disabled={isLoading}
                  className="w-full pr-10"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4 text-gray-500" />
                  ) : (
                    <Eye className="h-4 w-4 text-gray-500" />
                  )}
                </Button>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">{t("setNewPasswordPage.confirmPassword")}</Label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder={t("setNewPasswordPage.confirmPasswordPlaceholder")}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  disabled={isLoading}
                  className="w-full pr-10"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-4 w-4 text-gray-500" />
                  ) : (
                    <Eye className="h-4 w-4 text-gray-500" />
                  )}
                </Button>
              </div>
            </div>
            <Button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  {t("common.loading")}
                </div>
              ) : (
                t("setNewPasswordPage.resetPassword")
              )}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex justify-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {t("loginPage.noAccount")}{" "}
            <Link
              to="/register"
              className="font-medium text-blue-600 hover:underline dark:text-blue-400"
            >
              {t("loginPage.signUp")}
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default SetNewPasswordPage; 