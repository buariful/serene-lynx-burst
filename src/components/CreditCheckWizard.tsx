import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  CreditCard, 
  User, 
  FileText, 
  CheckCircle, 
  AlertCircle, 
  Loader2,
  ArrowLeft,
  ArrowRight,
  Shield,
  Lock
} from 'lucide-react';
import PaymentForm from './PaymentForm';
import PersonalInfoForm from './PersonalInfoForm';
import CreditCheckStatus from './CreditCheckStatus';
import CreditReportDisplay from './CreditReportDisplay';
import { 
  creditCheckService, 
  PersonalInfo, 
  ConsentInfo, 
  CreditReport,
  CreditCheckStatus as StatusType
} from '@/services/creditCheckService';
import { paymentService, PaymentResponse } from '@/services/paymentService';

// Mock payment for development

type WizardStep = 'payment' | 'personal-info' | 'processing' | 'report';

interface CreditCheckWizardProps {
  onComplete?: (report: CreditReport) => void;
  onCancel?: () => void;
  completedReport?: CreditReport | null;
  onBackToMain?: () => void;
}

const CreditCheckWizard: React.FC<CreditCheckWizardProps> = ({
  onComplete,
  onCancel,
  completedReport,
  onBackToMain,
}) => {
  const [currentStep, setCurrentStep] = useState<WizardStep>('payment');
  const [paymentResponse, setPaymentResponse] = useState<PaymentResponse | null>(null);
  const [personalInfo, setPersonalInfo] = useState<PersonalInfo | null>(null);
  const [consent, setConsent] = useState<ConsentInfo | null>(null);
  const [reportId, setReportId] = useState<string | null>(null);
  const [status, setStatus] = useState<StatusType | null>(null);
  const [creditReport, setCreditReport] = useState<CreditReport | null>(completedReport || null);
  const [error, setError] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  // Update creditReport when completedReport prop changes
  useEffect(() => {
    if (completedReport) {
      setCreditReport(completedReport);
      setCurrentStep('report');
    }
  }, [completedReport]);

  const steps = [
    { id: 'payment', title: 'Payment', icon: CreditCard },
    { id: 'personal-info', title: 'Personal Info', icon: User },
    { id: 'processing', title: 'Processing', icon: Loader2 },
    { id: 'report', title: 'Report', icon: FileText },
  ];

  const currentStepIndex = steps.findIndex(step => step.id === currentStep);
  const progress = ((currentStepIndex + 1) / steps.length) * 100;

  useEffect(() => {
    // Cleanup function to stop polling when component unmounts
    return () => {
      creditCheckService.stopStatusPolling();
    };
  }, []);

  // Monitor status changes and auto-transition to report when completed
  useEffect(() => {
    console.log('Status effect triggered:', { 
      status: status?.status, 
      currentStep, 
      reportId,
      progress: status?.progress 
    });
    
    if (status?.status === 'completed' && currentStep === 'processing' && reportId) {
      console.log('Transitioning to report page...');
      const handleCompletion = async () => {
        try {
          const report = await creditCheckService.retrieveReport(reportId);
          if (report.success && report.report) {
            setCreditReport(report.report);
            setCurrentStep('report');
            setIsProcessing(false);
            // Call onComplete to notify parent component
            onComplete?.(report.report);
          } else {
            setError(report.error || 'Failed to retrieve report');
          }
        } catch (error) {
          setError(error instanceof Error ? error.message : 'Failed to retrieve report');
        }
      };
      
      handleCompletion();
    }
  }, [status?.status, currentStep, reportId, onComplete]);

  const handlePaymentSuccess = async (response: PaymentResponse) => {
    setPaymentResponse(response);
    setCurrentStep('personal-info');
  };

  const handlePaymentError = (error: string) => {
    setError(error);
    // Stay on payment step to allow retry
  };

  const handlePersonalInfoComplete = async (info: PersonalInfo, consentInfo: ConsentInfo) => {
    setPersonalInfo(info);
    setConsent(consentInfo);
    setCurrentStep('processing');
    setIsProcessing(true);

    try {
      // Initiate credit check
      const checkResponse = await creditCheckService.initiateCreditCheck(
        paymentResponse!.transactionId!,
        info,
        consentInfo
      );

      if (!checkResponse.success || !checkResponse.reportId) {
        throw new Error(checkResponse.error || 'Failed to initiate credit check');
      }

      setReportId(checkResponse.reportId);

      // Start status polling
      creditCheckService.startStatusPolling(
        checkResponse.reportId,
        (statusUpdate) => {
          console.log('Status update received:', statusUpdate);
          setStatus(statusUpdate);
        },
        (report) => {
          console.log('Report completed via polling:', report);
          setCreditReport(report);
          setCurrentStep('report');
          setIsProcessing(false);
          // Call onComplete to notify parent component
          onComplete?.(report);
        },
        (error) => {
          console.error('Polling error:', error);
          setError(error);
          setIsProcessing(false);
        }
      );

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to start credit check';
      setError(errorMessage);
      setIsProcessing(false);
    }
  };

  const handlePersonalInfoBack = () => {
    setCurrentStep('payment');
  };

  const handleRetry = () => {
    setError(null);
    if (currentStep === 'payment') {
      // Reset payment form
      setPaymentResponse(null);
    } else if (currentStep === 'processing') {
      // Retry credit check
      if (personalInfo && consent && paymentResponse) {
        handlePersonalInfoComplete(personalInfo, consent);
      }
    }
  };

  const handleCancel = () => {
    creditCheckService.stopStatusPolling();
    onCancel?.();
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 'payment':
        return (
          <div className="space-y-6">
            <div className="text-center">
              <CreditCard className="w-16 h-16 mx-auto text-blue-600 dark:text-blue-400 mb-4" />
              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">Credit Check Payment</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Complete your payment to proceed with the credit check
              </p>
              
              <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg mb-6">
                <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">$90</div>
                <p className="text-gray-600 dark:text-gray-400">One-time payment for credit check report</p>
              </div>
            </div>

            <PaymentForm
              amount={90}
              currency="CAD"
              description="Credit Check Report"
              onPaymentSuccess={handlePaymentSuccess}
              onPaymentError={handlePaymentError}
              onCancel={handleCancel}
            />
          </div>
        );

      case 'personal-info':
        return (
          <div className="space-y-6">
            <div className="text-center">
              <User className="w-16 h-16 mx-auto text-green-600 dark:text-green-400 mb-4" />
              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">Personal Information</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Please provide your personal information for the credit check
              </p>
            </div>

            <PersonalInfoForm
              onComplete={handlePersonalInfoComplete}
              onBack={handlePersonalInfoBack}
            />
          </div>
        );

      case 'processing':
        return (
          <div className="space-y-6">
            <div className="text-center">
              <Loader2 className="w-16 h-16 mx-auto text-blue-600 dark:text-blue-400 mb-4 animate-spin" />
              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">Processing Credit Check</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                We are processing your credit check. This may take a few minutes.
              </p>
            </div>

            {reportId && status && (
              <CreditCheckStatus
                reportId={reportId}
                status={status}
                onStatusUpdate={setStatus}
                onComplete={async () => {
                  // Manual completion handler for the "View Report" button
                  try {
                    const report = await creditCheckService.retrieveReport(reportId);
                    if (report.success && report.report) {
                      setCreditReport(report.report);
                      setCurrentStep('report');
                      setIsProcessing(false);
                      // Call onComplete to notify parent component
                      onComplete?.(report.report);
                    } else {
                      setError(report.error || 'Failed to retrieve report');
                    }
                  } catch (error) {
                    setError(error instanceof Error ? error.message : 'Failed to retrieve report');
                  }
                }}
                onError={(error) => setError(error)}
              />
            )}
          </div>
        );

      case 'report':
        return (
          <div className="space-y-6">
            <div className="text-center">
              <CheckCircle className="w-16 h-16 mx-auto text-green-600 dark:text-green-400 mb-4" />
              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">Credit Report Ready</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Your credit check has been completed successfully
              </p>
            </div>

            {creditReport && (
              <CreditReportDisplay
                report={creditReport}
                onPrint={() => window.print()}
                onDownload={async () => {
                  try {
                    // The CreditReportDisplay component will handle PDF generation
                    // This is just a fallback if needed
                    const link = document.createElement('a');
                    link.href = '#';
                    link.download = `credit-report-${creditReport.id}.pdf`;
                    link.click();
                  } catch (error) {
                    console.error('PDF download failed:', error);
                  }
                }}
                onShare={() => {
                  if (navigator.share) {
                    navigator.share({
                      title: 'Credit Report',
                      text: 'Check out my credit report',
                      url: window.location.href,
                    });
                  } else {
                    navigator.clipboard.writeText(window.location.href);
                  }
                }}
              />
            )}

            {/* Back to Main Button */}
            <div className="flex justify-center pt-6">
              <Button
                onClick={onBackToMain}
                variant="outline"
                className="px-8"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Main Page
              </Button>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Credit Check</h1>
            <p className="text-gray-600 dark:text-gray-400">Complete your credit check in a few simple steps</p>
          </div>
          
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-green-600 dark:text-green-400" />
            <span className="text-sm text-green-600 dark:text-green-400 font-medium">Secure & Private</span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
            <span>Step {currentStepIndex + 1} of {steps.length}</span>
            <span>{Math.round(progress)}% complete</span>
          </div>
          <Progress value={progress} className="w-full" />
        </div>

        {/* Step Indicators */}
        <div className="flex justify-between mt-4">
          {steps.map((step, index) => {
            const Icon = step.icon;
            const isActive = step.id === currentStep;
            const isCompleted = index < currentStepIndex;
            
            return (
              <div
                key={step.id}
                className={`flex flex-col items-center gap-2 ${
                  isActive ? 'text-blue-600 dark:text-blue-400' : isCompleted ? 'text-green-600 dark:text-green-400' : 'text-gray-400 dark:text-gray-500'
                }`}
              >
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  isActive ? 'bg-blue-100 dark:bg-blue-900/20' : isCompleted ? 'bg-green-100 dark:bg-green-900/20' : 'bg-gray-100 dark:bg-gray-700'
                }`}>
                  {isCompleted ? (
                    <CheckCircle className="w-5 h-5" />
                  ) : (
                    <Icon className="w-5 h-5" />
                  )}
                </div>
                <span className="text-xs font-medium">{step.title}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Error Display */}
      {error && (
        <Alert variant="destructive" className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            {error}
            <Button
              variant="outline"
              size="sm"
              onClick={handleRetry}
              className="ml-4"
            >
              Try Again
            </Button>
          </AlertDescription>
        </Alert>
      )}

      {/* Main Content */}
      <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
        <CardContent className="pt-6">
          {renderStepContent()}
        </CardContent>
      </Card>

      {/* Footer */}
      <div className="mt-8 text-center text-sm text-gray-500 dark:text-gray-400">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Lock className="w-4 h-4" />
          <span>Your information is encrypted and secure</span>
        </div>
        <p>We do not store your personal data permanently</p>
      </div>
    </div>
  );
};

export default CreditCheckWizard; 