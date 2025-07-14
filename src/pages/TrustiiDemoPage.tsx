import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { AlertCircle, Settings, FileText, Search, CreditCard, CheckCircle, Shield, Building2 } from 'lucide-react';
import { TrustiiInquiryForm } from '@/components/TrustiiInquiryForm';
import { TrustiiInquiryRetriever } from '@/components/TrustiiInquiryRetriever';
import { useTrustiiConfig } from '@/hooks/useTrustii';
import { showSuccess, showError } from '@/utils/toast';
import CreditCheckWizard from '@/components/CreditCheckWizard';
import { CreditReport } from '@/services/creditCheckService';
import { useTranslation } from 'react-i18next';

/**
 * Demo page showcasing Trustii integration
 */
const TrustiiDemoPage: React.FC = () => {
  const { isConfigured, hasApiKey, baseUrl } = useTrustiiConfig();
  const [activeTab, setActiveTab] = useState('create');
  const [lastInquiryId, setLastInquiryId] = useState<string | null>(null);
  const [showCreditCheck, setShowCreditCheck] = useState(false);
  const [completedReport, setCompletedReport] = useState<CreditReport | null>(null);
  const [showCompletedReport, setShowCompletedReport] = useState(false);
  const { t } = useTranslation();

  const handleInquirySuccess = (inquiryId: string) => {
    setLastInquiryId(inquiryId);
    setActiveTab('retrieve');
    showSuccess(t('trustii.form.inquiryCreatedSuccessWithId', { id: inquiryId }));
  };

  const handleInquiryError = (error: string) => {
    showError(t('trustii.form.failedToCreateInquiry', { error }));
  };

  const handleInquiryFound = (inquiryId: string) => {
    showSuccess(t('trustii.form.inquiryRetrievedSuccess'));
  };

  const handleCreditCheckComplete = (report: CreditReport) => {
    setCompletedReport(report);
    setShowCompletedReport(true);
    showSuccess('Credit check completed successfully!');
  };

  const handleCreditCheckCancel = () => {
    setShowCreditCheck(false);
    setShowCompletedReport(false);
    setCompletedReport(null);
  };

  const handleViewReport = () => {
    setShowCompletedReport(true);
    setShowCreditCheck(true);
  };

  const handleBackToMain = () => {
    setShowCreditCheck(false);
    setShowCompletedReport(false);
    setCompletedReport(null);
  };

  if (!isConfigured) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
        <div className="max-w-4xl mx-auto px-4">
          <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-red-600 dark:text-red-400">
                <AlertCircle className="h-5 w-5" />
                {t('trustii.demo.configurationRequired')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Alert variant="destructive" className="bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription className="text-red-800 dark:text-red-200">
                  {t('trustii.demo.configurationError')}
                </AlertDescription>
              </Alert>
              
              <div className="mt-4 space-y-2">
                <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded-lg">
                  <code className="text-sm text-gray-900 dark:text-gray-100">
                    VITE_TRUSTII_API_KEY=your_api_key_here
                  </code>
                </div>
                <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded-lg">
                  <code className="text-sm text-gray-900 dark:text-gray-100">
                    VITE_TRUSTII_API_BASE_URL=https://api.trustii.co/hr/v1
                  </code>
                </div>
              </div>

              <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                <h4 className="font-medium text-blue-800 dark:text-blue-200 mb-2">{t('trustii.demo.configurationStatus')}</h4>
                <div className="space-y-1 text-sm">
                  <div className="text-gray-700 dark:text-gray-300">
                    {t('trustii.demo.apiKey')}: <Badge variant={hasApiKey ? "default" : "destructive"}>{hasApiKey ? t('trustii.demo.configured') : t('trustii.demo.missing')}</Badge>
                  </div>
                  <div className="text-gray-700 dark:text-gray-300">
                    {t('trustii.demo.baseUrl')}: <span className="font-mono text-gray-900 dark:text-gray-100">{baseUrl}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // Show credit check wizard if active
  if (showCreditCheck) {
    return (
      <CreditCheckWizard
        onComplete={handleCreditCheckComplete}
        onCancel={handleCreditCheckCancel}
        completedReport={showCompletedReport ? completedReport : undefined}
        onBackToMain={handleBackToMain}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header with TransUnion/Equifax Logo */}
        <div className="text-center mb-8 relative">
          {/* TransUnion/Equifax Logo in top right */}
          <div className="absolute top-0 right-0 flex items-center gap-2">
            <div className="bg-white dark:bg-gray-800 p-2 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400">
                <span className="font-semibold text-blue-600 dark:text-blue-400">TransUnion</span>
                <span className="text-gray-400">|</span>
                <span className="font-semibold text-green-600 dark:text-green-400">Equifax</span>
              </div>
            </div>
          </div>
          
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
            {t('trustii.demo.title')}
          </h1>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            {t('trustii.demo.description')}
          </p>
        </div>

        {/* Configuration Status */}
        <Card className="mb-6 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-gray-900 dark:text-gray-100">
              <Settings className="h-5 w-5" />
              {t('trustii.demo.configurationStatus')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <div className="text-sm text-gray-600 dark:text-gray-400">{t('trustii.demo.apiStatus')}</div>
                <Badge variant="default" className="bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-200">
                  {t('trustii.demo.connected')}
                </Badge>
              </div>
              <div className="space-y-1">
                <div className="text-sm text-gray-600 dark:text-gray-400">{t('trustii.demo.baseUrl')}</div>
                <div className="text-sm font-mono text-gray-900 dark:text-gray-100">{baseUrl}</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Credit Check CTA */}
        <Card className="mb-6 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border-blue-200 dark:border-blue-800">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-2">
                  Need a Credit Check?
                </h3>
                <p className="text-blue-700 dark:text-blue-300 mb-4">
                  Get your comprehensive credit report with detailed analysis and insights.
                </p>
                <div className="flex items-center gap-4 text-sm text-blue-600 dark:text-blue-400">
                  <span className="flex items-center gap-1">
                    <CheckCircle className="w-4 h-4" />
                    Instant results
                  </span>
                  <span className="flex items-center gap-1">
                    <Shield className="w-4 h-4" />
                    Secure & private
                  </span>
                  <span className="flex items-center gap-1">
                    <FileText className="w-4 h-4" />
                    Detailed report
                  </span>
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-blue-900 dark:text-blue-100 mb-2">$90</div>
                <p className="text-blue-700 dark:text-blue-300 text-sm mb-4">One-time payment</p>
                <Button 
                  onClick={() => setShowCreditCheck(true)}
                  className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 w-full"
                >
                  <CreditCard className="w-4 h-4 mr-2" />
                  Start Credit Check
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Completed Credit Check Success Message */}
        {completedReport && !showCreditCheck && (
          <Card className="mb-6 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border-green-200 dark:border-green-800">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-green-900 dark:text-green-100 mb-2">
                    Credit Check Completed Successfully!
                  </h3>
                  <p className="text-green-700 dark:text-green-300 mb-4">
                    Your credit report is ready. You can view it again or start a new credit check.
                  </p>
                  <div className="flex items-center gap-4 text-sm text-green-600 dark:text-green-400">
                    <span className="flex items-center gap-1">
                      <CheckCircle className="w-4 h-4" />
                      Score: {completedReport.score}
                    </span>
                    <span className="flex items-center gap-1">
                      <FileText className="w-4 h-4" />
                      Report ID: {completedReport.id}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="space-y-2">
                    <Button 
                      onClick={handleViewReport}
                      className="bg-green-600 hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600 w-full"
                    >
                      <FileText className="w-4 h-4 mr-2" />
                      View Report
                    </Button>
                    <Button 
                      variant="outline"
                      onClick={() => {
                        setCompletedReport(null);
                        setShowCompletedReport(false);
                      }}
                      className="w-full border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                    >
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Dismiss
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 bg-gray-100 dark:bg-gray-800">
            <TabsTrigger value="create" className="flex items-center gap-2 data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700 data-[state=active]:text-gray-900 dark:data-[state=active]:text-gray-100 text-gray-700 dark:text-gray-300">
              <Building2 className="h-4 w-4" />
              {t('trustii.form.createInquiry')}
            </TabsTrigger>
            <TabsTrigger value="retrieve" className="flex items-center gap-2 data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700 data-[state=active]:text-gray-900 dark:data-[state=active]:text-gray-100 text-gray-700 dark:text-gray-300">
              <Search className="h-4 w-4" />
              {t('trustii.retriever.retrieve')}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="create" className="space-y-6">
            <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
              <CardHeader>
                <CardTitle className="text-gray-900 dark:text-gray-100">{t('trustii.form.createNewRequest')}</CardTitle>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {t('trustii.form.createDescription')}
                </p>
              </CardHeader>
              <CardContent>
                <TrustiiInquiryForm
                  onSuccess={handleInquirySuccess}
                  onError={handleInquiryError}
                />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="retrieve" className="space-y-6">
            <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
              <CardHeader>
                <CardTitle className="text-gray-900 dark:text-gray-100">{t('trustii.retriever.title')}</CardTitle>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {t('trustii.retriever.description')}
                </p>
                {lastInquiryId && (
                  <div className="mt-2 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                    <p className="text-sm text-blue-800 dark:text-blue-200">
                      <strong>{t('trustii.demo.lastCreatedInquiry')}</strong> {lastInquiryId}
                    </p>
                    <Button
                      variant="outline"
                      size="sm"
                      className="mt-2 border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                      onClick={() => {
                        navigator.clipboard.writeText(lastInquiryId);
                        showSuccess(t('trustii.form.inquiryIdCopied'));
                      }}
                    >
                      {t('trustii.demo.copyId')}
                    </Button>
                  </div>
                )}
              </CardHeader>
              <CardContent>
                <TrustiiInquiryRetriever onInquiryFound={handleInquiryFound} />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Features Overview */}
        <Card className="mt-8 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
          <CardHeader>
            <CardTitle className="text-gray-900 dark:text-gray-100">{t('trustii.demo.verificationFeatures')}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="text-center p-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-700">
                <div className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-2">{t('trustii.demo.employment')}</div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {t('trustii.demo.employmentDesc')}
                </p>
              </div>
              <div className="text-center p-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-700">
                <div className="text-2xl font-bold text-green-600 dark:text-green-400 mb-2">{t('trustii.demo.identity')}</div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {t('trustii.demo.identityDesc')}
                </p>
              </div>
              <div className="text-center p-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-700">
                <div className="text-2xl font-bold text-red-600 dark:text-red-400 mb-2">{t('trustii.demo.criminal')}</div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {t('trustii.demo.criminalDesc')}
                </p>
              </div>
              <div className="text-center p-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-700">
                <div className="text-2xl font-bold text-purple-600 dark:text-purple-400 mb-2">{t('trustii.demo.education')}</div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {t('trustii.demo.educationDesc')}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* API Documentation Link */}
        <Card className="mt-6 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                {t('trustii.demo.apiDocumentation')}
              </p>
              <a
                href="https://docs.trustii.co/hr/docs/api/inquiries"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 underline"
              >
                {t('trustii.demo.apiDocumentationLink')}
              </a>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TrustiiDemoPage; 