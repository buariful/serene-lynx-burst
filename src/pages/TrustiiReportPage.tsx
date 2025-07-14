import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Loader2, 
  CheckCircle, 
  AlertCircle, 
  FileText, 
  Download, 
  Share2, 
  Printer,
  Clock,
  User,
  Shield,
  CreditCard,
  Globe,
  Calendar,
  Phone,
  Mail,
  ArrowLeft
} from 'lucide-react';
import { useTrustii } from '@/hooks/useTrustii';
import { showSuccess, showError } from '@/utils/toast';
import { useTranslation } from 'react-i18next';

const getStatusColor = (status: string) => {
  switch (status) {
    case 'Completed':
      return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-200';
    case 'Submitted':
      return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-200';
    case 'InProgress':
      return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-200';
    case 'Pending':
      return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-200';
    case 'Suspended':
      return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-200';
    default:
      return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-200';
  }
};

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'Completed':
      return <CheckCircle className="h-4 w-4" />;
    case 'Submitted':
      return <FileText className="h-4 w-4" />;
    case 'InProgress':
      return <Clock className="h-4 w-4" />;
    case 'Pending':
      return <Clock className="h-4 w-4" />;
    case 'Suspended':
      return <AlertCircle className="h-4 w-4" />;
    default:
      return <Clock className="h-4 w-4" />;
  }
};

/**
 * Page for displaying shared Trustii reports
 */
const TrustiiReportPage: React.FC = () => {
  const { inquiryId } = useParams<{ inquiryId: string }>();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { retrieveInquiry, loading, error, retrievedInquiry } = useTrustii();
  const [shareUrl, setShareUrl] = useState<string>('');

  useEffect(() => {
    if (inquiryId) {
      retrieveInquiry(inquiryId).catch(() => {
        // Error will be handled by the hook
      });
    }
  }, [inquiryId, retrieveInquiry]);

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    if (!retrievedInquiry) return;
    
    const reportData = {
      inquiry: retrievedInquiry,
      report: retrievedInquiry.report,
      generatedAt: new Date().toISOString(),
    };
    
    const blob = new Blob([JSON.stringify(reportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `trustii-report-${retrievedInquiry.id}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleShare = () => {
    if (!retrievedInquiry) return;
    
    const shareUrl = `${window.location.origin}/trustii-report/${retrievedInquiry.id}`;
    setShareUrl(shareUrl);
    
    if (navigator.share) {
      navigator.share({
        title: 'Trustii Verification Report',
        text: `Verification report for ${retrievedInquiry.name}`,
        url: shareUrl,
      });
    } else {
      navigator.clipboard.writeText(shareUrl);
      showSuccess('Share URL copied to clipboard!');
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
        <div className="max-w-4xl mx-auto px-4">
          <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
            <CardContent className="pt-6">
              <div className="flex items-center justify-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
                <span className="ml-3 text-lg">Loading report...</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
        <div className="max-w-4xl mx-auto px-4">
          <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-red-600 dark:text-red-400">
                <AlertCircle className="h-5 w-5" />
                Report Not Found
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Alert variant="destructive" className="bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription className="text-red-800 dark:text-red-200">
                  {error}
                </AlertDescription>
              </Alert>
              
              <div className="mt-6 flex gap-3">
                <Button onClick={() => navigate('/trustii-demo')} variant="outline">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Demo
                </Button>
                <Button onClick={() => window.location.reload()}>
                  Try Again
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (!retrievedInquiry) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="mb-6">
          <Button 
            onClick={() => navigate('/trustii-demo')} 
            variant="outline" 
            className="mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Demo
          </Button>
          
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
              Trustii Verification Report
            </h1>
            <p className="text-gray-600 dark:text-gray-300">
              Comprehensive background verification results
            </p>
          </div>
        </div>

        <div className="space-y-6">
          {/* Report Header */}
          <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2 text-gray-900 dark:text-gray-100">
                    <FileText className="h-5 w-5" />
                    Verification Report
                  </CardTitle>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    Inquiry ID: {retrievedInquiry.id}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className={getStatusColor(retrievedInquiry.status)}>
                    {getStatusIcon(retrievedInquiry.status)}
                    {retrievedInquiry.status}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-gray-500" />
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-gray-100">{retrievedInquiry.name}</p>
                    <p className="text-xs text-gray-500">Subject</p>
                  </div>
                </div>
                
                {retrievedInquiry.email && (
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-gray-500" />
                    <div>
                      <p className="text-sm font-medium text-gray-900 dark:text-gray-100">{retrievedInquiry.email}</p>
                      <p className="text-xs text-gray-500">Email</p>
                    </div>
                  </div>
                )}
                
                {retrievedInquiry.phoneNumber && (
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-gray-500" />
                    <div>
                      <p className="text-sm font-medium text-gray-900 dark:text-gray-100">{retrievedInquiry.phoneNumber}</p>
                      <p className="text-xs text-gray-500">Phone</p>
                    </div>
                  </div>
                )}
                
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-gray-500" />
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-gray-100">{formatDate(retrievedInquiry.createdAt)}</p>
                    <p className="text-xs text-gray-500">Created</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Services */}
          <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-gray-900 dark:text-gray-100">
                <Shield className="h-5 w-5" />
                Verification Services
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {retrievedInquiry.services.map((service) => (
                  <Badge key={service} variant="outline" className="justify-start">
                    {service === 'identity' && <User className="h-3 w-3 mr-1" />}
                    {service === 'credit' && <CreditCard className="h-3 w-3 mr-1" />}
                    {(service === 'criminal_quebec' || service === 'criminal_canada') && <Shield className="h-3 w-3 mr-1" />}
                    {service === 'online_reputation' && <Globe className="h-3 w-3 mr-1" />}
                    {service.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                  </Badge>
                ))}
              </div>
              
              {retrievedInquiry.creditStatus !== 'NotIncluded' && (
                <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <p className="text-sm font-medium text-blue-800 dark:text-blue-200">
                    Credit Status: {retrievedInquiry.creditStatus}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Report Details */}
          {retrievedInquiry.report && (
            <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-gray-900 dark:text-gray-100">
                  <FileText className="h-5 w-5" />
                  Report Details
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                        {retrievedInquiry.report.summary.total_checks}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Total Checks</p>
                    </div>
                    <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                      <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                        {retrievedInquiry.report.summary.passed_checks}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Passed</p>
                    </div>
                    <div className="text-center p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
                      <p className="text-2xl font-bold text-red-600 dark:text-red-400">
                        {retrievedInquiry.report.summary.failed_checks}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Failed</p>
                    </div>
                  </div>
                  
                  <div className="text-center">
                    <Badge 
                      className={
                        retrievedInquiry.report.summary.overall_status === 'pass' 
                          ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-200'
                          : retrievedInquiry.report.summary.overall_status === 'fail'
                          ? 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-200'
                          : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-200'
                      }
                    >
                      Overall Status: {retrievedInquiry.report.summary.overall_status.toUpperCase()}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Action Buttons */}
          <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
            <CardContent className="pt-6">
              <div className="flex flex-col sm:flex-row gap-3">
                <Button onClick={handlePrint} variant="outline" className="flex-1">
                  <Printer className="h-4 w-4 mr-2" />
                  Print Report
                </Button>
                <Button onClick={handleDownload} variant="outline" className="flex-1">
                  <Download className="h-4 w-4 mr-2" />
                  Download JSON
                </Button>
                <Button onClick={handleShare} variant="outline" className="flex-1">
                  <Share2 className="h-4 w-4 mr-2" />
                  Share Report
                </Button>
              </div>
              
              {shareUrl && (
                <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <p className="text-sm text-blue-800 dark:text-blue-200 mb-2">
                    Share URL:
                  </p>
                  <div className="flex gap-2">
                    <input 
                      value={shareUrl} 
                      readOnly 
                      className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 text-sm"
                    />
                    <Button
                      size="sm"
                      onClick={() => {
                        navigator.clipboard.writeText(shareUrl);
                        showSuccess('URL copied to clipboard!');
                      }}
                    >
                      Copy
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default TrustiiReportPage; 