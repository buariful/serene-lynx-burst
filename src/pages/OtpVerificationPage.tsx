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
import { ArrowLeft, CheckCircle, Clock, RefreshCw } from "lucide-react";

const OtpVerificationPage = () => {
  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [email, setEmail] = useState<string | null>(null);
  
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { t } = useTranslation();

  useEffect(() => {
    const emailFromUrl = searchParams.get("email");
    setEmail(emailFromUrl);
    
    if (!emailFromUrl) {
      showError("Email is required for OTP verification.");
      navigate("/forgot-password");
      return;
    }

    // Start countdown for resend OTP (30 seconds)
    setCountdown(30);
  }, [searchParams, navigate]);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  const validateOtp = (otp: string): boolean => {
    return /^\d{6}$/.test(otp);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!otp.trim()) {
      showError(t("otpVerificationPage.otpRequired"));
      return;
    }

    if (!validateOtp(otp)) {
      showError(t("otpVerificationPage.invalidOtp"));
      return;
    }

    setIsLoading(true);
    
    try {
      // TODO: Implement actual API call to verify OTP
      console.log("Verifying OTP:", otp, "for email:", email);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // For demo purposes, accept any 6-digit OTP
      if (validateOtp(otp)) {
        setIsVerified(true);
        showSuccess(t("otpVerificationPage.otpVerified"));
        
        // Navigate to set new password page after 2 seconds
        setTimeout(() => {
          navigate(`/reset-password?email=${email}&otp=${otp}`);
        }, 2000);
      } else {
        showError(t("otpVerificationPage.otpExpired"));
      }
    } catch (error) {
      console.error("Error verifying OTP:", error);
      showError("Failed to verify OTP. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOtp = async () => {
    if (countdown > 0) return;
    
    setIsLoading(true);
    
    try {
      // TODO: Implement actual API call to resend OTP
      console.log("Resending OTP to:", email);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setCountdown(30);
      showSuccess(t("otpVerificationPage.resendOtpSuccess"));
    } catch (error) {
      console.error("Error resending OTP:", error);
      showError(t("otpVerificationPage.resendOtpError"));
    } finally {
      setIsLoading(false);
    }
  };

  if (isVerified) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-100 dark:bg-green-900">
              <CheckCircle className="h-6 w-6 text-green-600 dark:text-green-400" />
            </div>
            <CardTitle className="text-2xl font-bold text-green-600 dark:text-green-400">
              {t("otpVerificationPage.otpVerified")}
            </CardTitle>
            <CardDescription className="text-gray-600 dark:text-gray-400">
              {t("otpVerificationPage.otpVerifiedDescription")}
            </CardDescription>
          </CardHeader>
          <CardFooter className="flex justify-center">
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600 mr-2"></div>
              <span className="text-sm text-gray-600 dark:text-gray-400">
                Redirecting...
              </span>
            </div>
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
            <Link to="/forgot-password">
              <ArrowLeft className="h-4 w-4 mr-2" />
              {t("otpVerificationPage.backToForgotPassword")}
            </Link>
          </Button>
          <CardTitle className="text-2xl font-bold">
            {t("otpVerificationPage.title")}
          </CardTitle>
          <CardDescription>
            {t("otpVerificationPage.description")}
          </CardDescription>
          {email && (
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
              {t("otpVerificationPage.otpSentTo")} <span className="font-medium">{email}</span>
            </p>
          )}
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="otp">{t("otpVerificationPage.enterOtp")}</Label>
              <Input
                id="otp"
                type="text"
                placeholder={t("otpVerificationPage.otpPlaceholder")}
                value={otp}
                onChange={(e) => {
                  // Only allow numbers and limit to 6 digits
                  const value = e.target.value.replace(/\D/g, '').slice(0, 6);
                  setOtp(value);
                }}
                required
                disabled={isLoading}
                className="w-full text-center text-lg tracking-widest"
                maxLength={6}
              />
            </div>
            <Button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700"
              disabled={isLoading || otp.length !== 6}
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  {t("common.loading")}
                </div>
              ) : (
                t("otpVerificationPage.verifyOtp")
              )}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col items-center space-y-2">
          <div className="text-center">
            {countdown > 0 ? (
              <div className="flex items-center justify-center text-sm text-gray-600 dark:text-gray-400">
                <Clock className="h-4 w-4 mr-1" />
                {t("otpVerificationPage.countdownText")} {countdown} {t("otpVerificationPage.seconds")}
              </div>
            ) : (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleResendOtp}
                disabled={isLoading}
                className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
              >
                <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
                {t("otpVerificationPage.resendOtp")}
              </Button>
            )}
          </div>
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

export default OtpVerificationPage; 