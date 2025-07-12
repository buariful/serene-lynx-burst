import React, { useState, useRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Download, 
  Printer, 
  Share2, 
  FileText, 
  TrendingUp, 
  TrendingDown,
  CheckCircle,
  AlertCircle,
  ChevronDown,
  ChevronRight,
  CreditCard,
  Calendar,
  DollarSign,
  Building,
  Loader2
} from 'lucide-react';
import { CreditReport } from '@/services/creditCheckService';
import { generateCreditReportPDF, generatePDFFromElement, generateSimplePDF, testPDFGeneration } from '@/utils/pdfGenerator';
import { showSuccess, showError } from '@/utils/toast';

interface CreditReportDisplayProps {
  report: CreditReport;
  onPrint?: () => void;
  onDownload?: () => void;
  onShare?: () => void;
}

const CreditReportDisplay: React.FC<CreditReportDisplayProps> = ({
  report,
  onPrint,
  onDownload,
  onShare,
}) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({});
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  const reportRef = useRef<HTMLDivElement>(null);

  const getScoreColor = (score: number) => {
    if (score >= 750) return 'text-green-600';
    if (score >= 650) return 'text-blue-600';
    if (score >= 550) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreRangeColor = (range: string) => {
    switch (range) {
      case 'excellent': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'good': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
      case 'fair': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      case 'poor': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
    }
  };

  const getScoreRangeDescription = (range: string) => {
    switch (range) {
      case 'excellent': return 'Excellent credit score. You have very good credit standing.';
      case 'good': return 'Good credit score. You have a solid credit history.';
      case 'fair': return 'Fair credit score. There is room for improvement.';
      case 'poor': return 'Poor credit score. Consider working on improving your credit.';
      default: return 'Credit score information not available.';
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-CA', {
      style: 'currency',
      currency: 'CAD',
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-CA', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString('en-CA', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const handlePrint = () => {
    if (onPrint) {
      onPrint();
    } else {
      window.print();
    }
  };

  const handleDownload = async () => {
    if (onDownload) {
      onDownload();
      return;
    }

    setIsGeneratingPDF(true);
    try {
      // Use the comprehensive PDF generation method
      await generateCreditReportPDF(report, reportRef.current);
      showSuccess('PDF generated successfully!');
    } catch (error) {
      console.error('Comprehensive PDF generation failed, trying simple PDF:', error);
      
      try {
        // Fallback to simple text-based PDF
        await generateSimplePDF(report);
        showSuccess('PDF generated successfully!');
      } catch (simpleError) {
        console.error('All PDF generation methods failed:', simpleError);
        showError('Failed to generate PDF. Please try again.');
      }
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  const handleShare = () => {
    if (onShare) {
      onShare();
    } else {
      // Default sharing behavior
      if (navigator.share) {
        navigator.share({
          title: 'Credit Report',
          text: 'Check out my credit report',
          url: window.location.href,
        });
      } else {
        navigator.clipboard.writeText(window.location.href);
      }
    }
  };

  const calculateUtilization = (balance: number, limit: number) => {
    if (limit === 0) return 0;
    return (balance / limit) * 100;
  };

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case 'OK': return 'text-green-600';
      case '30': return 'text-yellow-600';
      case '60': return 'text-orange-600';
      case '90': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <div ref={reportRef} className="space-y-6 print:space-y-4">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 print:flex-row">
        <div>
          <h1 className="text-3xl font-bold">Credit Report</h1>
          <p className="text-gray-600">
            Generated on {formatDate(report.createdAt)} at {formatTime(report.createdAt)}
          </p>
          <p className="text-sm text-gray-500">Report ID: {report.id}</p>
        </div>
        
        <div className="flex gap-2 print:hidden">
          <Button variant="outline" onClick={handlePrint}>
            <Printer className="w-4 h-4 mr-2" />
            Print
          </Button>
          <Button 
            variant="outline" 
            onClick={handleDownload}
            disabled={isGeneratingPDF}
          >
            {isGeneratingPDF ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Generating PDF...
              </>
            ) : (
              <>
                <Download className="w-4 h-4 mr-2" />
                Download PDF
              </>
            )}
          </Button>
          <Button 
            variant="outline" 
            onClick={async () => {
              try {
                await testPDFGeneration();
                showSuccess('Test PDF generated successfully!');
              } catch (error) {
                showError('Test PDF generation failed');
              }
            }}
          >
            <FileText className="w-4 h-4 mr-2" />
            Test PDF
          </Button>
          <Button variant="outline" onClick={handleShare}>
            <Share2 className="w-4 h-4 mr-2" />
            Share
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-4 print:hidden">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="accounts">Accounts</TabsTrigger>
          <TabsTrigger value="inquiries">Inquiries</TabsTrigger>
          <TabsTrigger value="factors">Factors</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          {/* Credit Score Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                Credit Score
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center">
                <div className={`text-6xl font-bold mb-2 ${getScoreColor(report.score)}`}>
                  {report.score}
                </div>
                <Badge className={`text-lg px-4 py-2 ${getScoreRangeColor(report.scoreRange)}`}>
                  {report.scoreRange.charAt(0).toUpperCase() + report.scoreRange.slice(1)}
                </Badge>
                <p className="text-gray-600 mt-2">
                  {getScoreRangeDescription(report.scoreRange)}
                </p>
              </div>

              {/* Score Range Bar */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm text-gray-600">
                  <span>300</span>
                  <span>850</span>
                </div>
                <div className="relative h-4 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className="absolute top-0 left-0 h-full bg-gradient-to-r from-red-500 via-yellow-500 to-green-500"
                    style={{ width: `${((report.score - 300) / (850 - 300)) * 100}%` }}
                  />
                  <div 
                    className="absolute top-0 h-full w-1 bg-black"
                    style={{ left: `${((report.score - 300) / (850 - 300)) * 100}%` }}
                  />
                </div>
                <div className="flex justify-between text-xs text-gray-500">
                  <span>Poor</span>
                  <span>Fair</span>
                  <span>Good</span>
                  <span>Excellent</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Summary Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-2">
                  <CreditCard className="w-5 h-5 text-blue-600" />
                  <span className="font-semibold">Total Accounts</span>
                </div>
                <div className="text-2xl font-bold mt-2">{report.accounts.length}</div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-green-600" />
                  <span className="font-semibold">Recent Inquiries</span>
                </div>
                <div className="text-2xl font-bold mt-2">{report.inquiries.length}</div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-2">
                  <Building className="w-5 h-5 text-purple-600" />
                  <span className="font-semibold">Public Records</span>
                </div>
                <div className="text-2xl font-bold mt-2">{report.publicRecords.length}</div>
              </CardContent>
            </Card>
          </div>

          {/* Credit Factors Summary */}
          <Card>
            <CardHeader>
              <CardTitle>Credit Factors</CardTitle>
              <CardDescription>
                Factors affecting your credit score
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {report.factors.positive.length > 0 && (
                <div>
                  <h4 className="font-semibold text-green-700 mb-2 flex items-center gap-2">
                    <CheckCircle className="w-4 h-4" />
                    Positive Factors
                  </h4>
                  <ul className="space-y-1">
                    {report.factors.positive.map((factor, index) => (
                      <li key={index} className="text-sm text-green-600 flex items-center gap-2">
                        <div className="w-1 h-1 bg-green-600 rounded-full" />
                        {factor}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {report.factors.negative.length > 0 && (
                <div>
                  <h4 className="font-semibold text-red-700 mb-2 flex items-center gap-2">
                    <AlertCircle className="w-4 h-4" />
                    Areas for Improvement
                  </h4>
                  <ul className="space-y-1">
                    {report.factors.negative.map((factor, index) => (
                      <li key={index} className="text-sm text-red-600 flex items-center gap-2">
                        <div className="w-1 h-1 bg-red-600 rounded-full" />
                        {factor}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Accounts Tab */}
        <TabsContent value="accounts" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Credit Accounts</CardTitle>
              <CardDescription>
                Detailed information about your credit accounts
              </CardDescription>
            </CardHeader>
            <CardContent>
              {report.accounts.length === 0 ? (
                <p className="text-gray-500 text-center py-8">No credit accounts found</p>
              ) : (
                <div className="space-y-4">
                  {report.accounts.map((account, index) => (
                    <Collapsible
                      key={index}
                      open={expandedSections[`account-${index}`]}
                      onOpenChange={() => toggleSection(`account-${index}`)}
                    >
                      <CollapsibleTrigger asChild>
                        <Button variant="ghost" className="w-full justify-between p-4 h-auto">
                          <div className="flex items-center gap-3">
                            <CreditCard className="w-5 h-5" />
                            <div className="text-left">
                              <div className="font-semibold">{account.type}</div>
                              <div className="text-sm text-gray-600">
                                Balance: {formatCurrency(account.balance)} / Limit: {formatCurrency(account.limit)}
                              </div>
                            </div>
                          </div>
                          {expandedSections[`account-${index}`] ? (
                            <ChevronDown className="w-4 h-4" />
                          ) : (
                            <ChevronRight className="w-4 h-4" />
                          )}
                        </Button>
                      </CollapsibleTrigger>
                      <CollapsibleContent className="space-y-3 px-4 pb-4">
                        <Separator />
                        
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="font-medium">Status:</span>
                            <Badge variant="outline" className="ml-2">{account.status}</Badge>
                          </div>
                          <div>
                            <span className="font-medium">Utilization:</span>
                            <span className="ml-2">
                              {calculateUtilization(account.balance, account.limit).toFixed(1)}%
                            </span>
                          </div>
                        </div>

                        <div>
                          <span className="font-medium text-sm">Payment History:</span>
                          <div className="flex gap-1 mt-2">
                            {account.paymentHistory.map((payment, pIndex) => (
                              <div
                                key={pIndex}
                                className={`w-6 h-6 rounded text-xs flex items-center justify-center ${
                                  payment === 'OK' 
                                    ? 'bg-green-100 text-green-800' 
                                    : 'bg-red-100 text-red-800'
                                }`}
                                title={`Payment ${pIndex + 1}: ${payment}`}
                              >
                                {payment === 'OK' ? '✓' : payment}
                              </div>
                            ))}
                          </div>
                        </div>
                      </CollapsibleContent>
                    </Collapsible>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Inquiries Tab */}
        <TabsContent value="inquiries" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Credit Inquiries</CardTitle>
              <CardDescription>
                Recent credit inquiries on your report
              </CardDescription>
            </CardHeader>
            <CardContent>
              {report.inquiries.length === 0 ? (
                <p className="text-gray-500 text-center py-8">No recent inquiries found</p>
              ) : (
                <div className="space-y-3">
                  {report.inquiries.map((inquiry, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <div className="font-semibold">{inquiry.company}</div>
                        <div className="text-sm text-gray-600">{inquiry.type}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium">{formatDate(inquiry.date)}</div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Factors Tab */}
        <TabsContent value="factors" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Detailed Credit Factors</CardTitle>
              <CardDescription>
                Comprehensive breakdown of factors affecting your credit score
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Payment History */}
              <div>
                <h4 className="font-semibold mb-3">Payment History (35% of score)</h4>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">On-time payments</span>
                    <Badge variant="default" className="bg-green-100 text-green-800">
                      Excellent
                    </Badge>
                  </div>
                  <Progress value={95} className="w-full" />
                </div>
              </div>

              {/* Credit Utilization */}
              <div>
                <h4 className="font-semibold mb-3">Credit Utilization (30% of score)</h4>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Current utilization</span>
                    <span className="text-sm font-medium">25%</span>
                  </div>
                  <Progress value={25} className="w-full" />
                  <p className="text-xs text-gray-600">
                    Recommended: Keep below 30%
                  </p>
                </div>
              </div>

              {/* Credit History Length */}
              <div>
                <h4 className="font-semibold mb-3">Credit History Length (15% of score)</h4>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Average account age</span>
                    <span className="text-sm font-medium">5.2 years</span>
                  </div>
                  <Progress value={70} className="w-full" />
                </div>
              </div>

              {/* Credit Mix */}
              <div>
                <h4 className="font-semibold mb-3">Credit Mix (10% of score)</h4>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Types of credit</span>
                    <Badge variant="default" className="bg-blue-100 text-blue-800">
                      Good
                    </Badge>
                  </div>
                  <Progress value={80} className="w-full" />
                </div>
              </div>

              {/* New Credit */}
              <div>
                <h4 className="font-semibold mb-3">New Credit (10% of score)</h4>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Recent inquiries</span>
                    <span className="text-sm font-medium">{report.inquiries.length}</span>
                  </div>
                  <Progress value={60} className="w-full" />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Footer */}
      <div className="text-center text-sm text-gray-500 print:mt-8">
        <p>This report was generated by our secure credit check system.</p>
        <p>For questions about this report, please contact our support team.</p>
      </div>
    </div>
  );
};

export default CreditReportDisplay; 