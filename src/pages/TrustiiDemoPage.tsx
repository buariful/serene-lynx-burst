import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { AlertCircle, Settings, FileText, Search } from 'lucide-react';
import { TrustiiInquiryForm } from '@/components/TrustiiInquiryForm';
import { TrustiiInquiryRetriever } from '@/components/TrustiiInquiryRetriever';
import { useTrustiiConfig } from '@/hooks/useTrustii';
import { showSuccess, showError } from '@/utils/toast';

/**
 * Demo page showcasing Trustii integration
 */
const TrustiiDemoPage: React.FC = () => {
  const { isConfigured, hasApiKey, baseUrl } = useTrustiiConfig();
  const [activeTab, setActiveTab] = useState('create');
  const [lastInquiryId, setLastInquiryId] = useState<string | null>(null);

  const handleInquirySuccess = (inquiryId: string) => {
    setLastInquiryId(inquiryId);
    setActiveTab('retrieve');
    showSuccess(`Inquiry created successfully! ID: ${inquiryId}`);
  };

  const handleInquiryError = (error: string) => {
    showError(`Failed to create inquiry: ${error}`);
  };

  const handleInquiryFound = (inquiryId: string) => {
    showSuccess(`Inquiry retrieved successfully!`);
  };

  if (!isConfigured) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-red-600">
                <AlertCircle className="h-5 w-5" />
                Trustii Configuration Required
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  Trustii API is not properly configured. Please set the following environment variables:
                </AlertDescription>
              </Alert>
              
              <div className="mt-4 space-y-2">
                <div className="bg-gray-100 p-3 rounded-lg">
                  <code className="text-sm">
                    VITE_TRUSTII_API_KEY=your_api_key_here
                  </code>
                </div>
                <div className="bg-gray-100 p-3 rounded-lg">
                  <code className="text-sm">
                    VITE_TRUSTII_API_BASE_URL=https://api.trustii.co/verif
                  </code>
                </div>
              </div>

              <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                <h4 className="font-medium text-blue-800 mb-2">Configuration Status:</h4>
                <div className="space-y-1 text-sm">
                  <div>API Key: <Badge variant={hasApiKey ? "default" : "destructive"}>{hasApiKey ? 'Configured' : 'Missing'}</Badge></div>
                  <div>Base URL: <span className="font-mono">{baseUrl}</span></div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Trustii Human Resources Verification
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Comprehensive background verification system for employment screening, 
            identity verification, criminal background checks, and education verification.
          </p>
        </div>

        {/* Configuration Status */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              Configuration Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <div className="text-sm text-gray-600">API Status</div>
                <Badge variant="default" className="bg-green-100 text-green-800">
                  Connected
                </Badge>
              </div>
              <div className="space-y-1">
                <div className="text-sm text-gray-600">Base URL</div>
                <div className="text-sm font-mono">{baseUrl}</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="create" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Create Inquiry
            </TabsTrigger>
            <TabsTrigger value="retrieve" className="flex items-center gap-2">
              <Search className="h-4 w-4" />
              Retrieve Results
            </TabsTrigger>
          </TabsList>

          <TabsContent value="create" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Create New Verification Request</CardTitle>
                <p className="text-sm text-gray-600">
                  Fill out the form below to initiate a comprehensive background verification.
                  This will create a new inquiry that will be processed by Trustii.
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
            <Card>
              <CardHeader>
                <CardTitle>Retrieve Verification Results</CardTitle>
                <p className="text-sm text-gray-600">
                  Enter an inquiry ID to retrieve the verification results and detailed report.
                </p>
                {lastInquiryId && (
                  <div className="mt-2 p-3 bg-blue-50 rounded-lg">
                    <p className="text-sm text-blue-800">
                      <strong>Last Created Inquiry ID:</strong> {lastInquiryId}
                    </p>
                    <Button
                      variant="outline"
                      size="sm"
                      className="mt-2"
                      onClick={() => {
                        // This would typically copy to clipboard
                        navigator.clipboard.writeText(lastInquiryId);
                        showSuccess('Inquiry ID copied to clipboard');
                      }}
                    >
                      Copy ID
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
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Verification Features</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="text-center p-4 border rounded-lg">
                <div className="text-2xl font-bold text-blue-600 mb-2">Employment</div>
                <p className="text-sm text-gray-600">
                  Verify employment history, positions, dates, and salary information
                </p>
              </div>
              <div className="text-center p-4 border rounded-lg">
                <div className="text-2xl font-bold text-green-600 mb-2">Identity</div>
                <p className="text-sm text-gray-600">
                  Confirm personal information and address verification
                </p>
              </div>
              <div className="text-center p-4 border rounded-lg">
                <div className="text-2xl font-bold text-red-600 mb-2">Criminal</div>
                <p className="text-sm text-gray-600">
                  Comprehensive criminal background checks and record searches
                </p>
              </div>
              <div className="text-center p-4 border rounded-lg">
                <div className="text-2xl font-bold text-purple-600 mb-2">Education</div>
                <p className="text-sm text-gray-600">
                  Verify educational credentials, degrees, and graduation dates
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* API Documentation Link */}
        <Card className="mt-6">
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-sm text-gray-600 mb-2">
                For detailed API documentation, visit:
              </p>
              <a
                href="https://docs.trustii.co/verif/docs/api/human-resources"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 underline"
              >
                Trustii Human Resources API Documentation
              </a>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TrustiiDemoPage; 