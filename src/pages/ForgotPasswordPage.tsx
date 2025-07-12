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
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { showSuccess, showError } from "@/utils/toast";
import { useTranslation } from "react-i18next";
import { ArrowLeft, Mail } from "lucide-react";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { t } = useTranslation();

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email.trim()) {
      showError(t("forgotPasswordPage.emailRequired"));
      return;
    }

    if (!validateEmail(email)) {
      showError(t("forgotPasswordPage.invalidEmail"));
      return;
    }

    setIsLoading(true);
    
    try {
      // TODO: Implement actual API call to send reset email
      console.log("Sending reset email to:", email);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      showSuccess(t("forgotPasswordPage.resetLinkSent"));
      
      // Navigate to OTP verification page
      setTimeout(() => {
        navigate(`/verify-otp?email=${encodeURIComponent(email)}`);
      }, 1000);
    } catch (error) {
      console.error("Error sending reset email:", error);
      showError("Failed to send reset email. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

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
              {t("forgotPasswordPage.backToLogin")}
            </Link>
          </Button>
          <CardTitle className="text-2xl font-bold">
            {t("forgotPasswordPage.title")}
          </CardTitle>
          <CardDescription>
            {t("forgotPasswordPage.description")}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">{t("forgotPasswordPage.email")}</Label>
              <Input
                id="email"
                type="email"
                placeholder={t("forgotPasswordPage.emailPlaceholder")}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={isLoading}
                className="w-full"
              />
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
                t("forgotPasswordPage.sendResetLink")
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

export default ForgotPasswordPage; 