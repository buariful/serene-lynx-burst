import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  Loader2, 
  CheckCircle, 
  AlertCircle, 
  Search, 
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
  Mail
} from 'lucide-react';
import { useTrustii } from '@/hooks/useTrustii';
import { showSuccess, showError } from '@/utils/toast';
import { useTranslation } from 'react-i18next';
import { generatePDFFromElement } from '@/utils/pdfGenerator';
import { TrustiiRetrieveInquiryResponse } from '@/types/trustii';

// Form validation schema
const retrieveSchema = z.object({
  inquiryId: z.string().min(1, 'Inquiry ID is required'),
});

type RetrieveFormData = z.infer<typeof retrieveSchema>;

interface TrustiiInquiryRetrieverProps {
  onInquiryFound?: (inquiryId: string) => void;
}

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

// Static mock data for demonstration
const mockInquiryData: TrustiiRetrieveInquiryResponse = {
  id: "inq_123456789",
  createdAt: "2024-01-15T10:30:00Z",
  completedAt: "2024-01-15T14:45:00Z",
  expiresAt: "2024-02-15T10:30:00Z",
  cancellable: false,
  name: "John Smith",
  email: "john.smith@email.com",
  url: "https://trustii.co/verif/inq_123456789",
  phoneNumber: "+1-555-123-4567",
  notificationType: "Email",
  services: ["identity", "credit", "criminal_canada"],
  serviceAddOns: [],
  tags: ["rental_application"],
  creditStatus: "Available",
  status: "Completed",
  report: {
    id: "rep_123456789",
    status: "completed",
    created_at: "2024-01-15T10:30:00Z",
    updated_at: "2024-01-15T14:45:00Z",
    results: {
      identity_verification: {
        verified: true,
        first_name: "John",
        last_name: "Smith",
        date_of_birth: "1985-03-15",
        address: {
          street: "123 Main Street",
          city: "Toronto",
          state: "ON",
          postal_code: "M5V 2H1",
          country: "Canada"
        },
        notes: "Identity verification completed successfully"
      },
      employment_verification: {
        verified: true,
        company_name: "Tech Solutions Inc.",
        position: "Software Engineer",
        start_date: "2022-01-15",
        salary: 85000,
        notes: "Employment verification completed successfully"
      }
    },
    summary: {
      overall_status: "pass",
      total_checks: 3,
      passed_checks: 3,
      failed_checks: 0,
      pending_checks: 0
    }
  }
};

/**
 * Component for retrieving and displaying Trustii inquiry reports
 */
export const TrustiiInquiryRetriever: React.FC<TrustiiInquiryRetrieverProps> = ({
  onInquiryFound,
}) => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [retrievedInquiry, setRetrievedInquiry] = useState<TrustiiRetrieveInquiryResponse | null>(null);
  const [shareUrl, setShareUrl] = useState<string>('');
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<RetrieveFormData>({
    resolver: zodResolver(retrieveSchema),
  });

  const onSubmit = async (data: RetrieveFormData) => {
    setLoading(true);
    setError(null);
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // For demo purposes, show static data regardless of inquiry ID
      setRetrievedInquiry(mockInquiryData);
      onInquiryFound?.(data.inquiryId);
      showSuccess('Inquiry retrieved successfully!');
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to retrieve inquiry';
      setError(errorMessage);
      showError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handlePrint = () => {
    // Create a new window for printing
    const printWindow = window.open('', '_blank');
    if (!printWindow) {
      showError('Please allow popups to print the report');
      return;
    }

    const printContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Trustii Verification Report - ${retrievedInquiry.id}</title>
          <style>
            @media print {
              body { margin: 0; padding: 20px; font-family: Arial, sans-serif; }
              .no-print { display: none !important; }
              .page-break { page-break-before: always; }
              h1 { color: #2563eb; margin-bottom: 20px; font-size: 24px; }
              h2 { color: #374151; margin-top: 20px; margin-bottom: 10px; font-size: 18px; }
              h3 { color: #374151; margin-top: 15px; margin-bottom: 8px; font-size: 16px; }
              .section { margin-bottom: 20px; }
              .info-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 15px; }
              .info-item { padding: 8px; background: #f9fafb; border-radius: 4px; }
              .status-badge { 
                display: inline-block; 
                padding: 4px 8px; 
                border-radius: 4px; 
                font-size: 12px; 
                font-weight: bold;
                background: ${retrievedInquiry.status === 'Completed' ? '#dcfce7' : '#fef3c7'};
                color: ${retrievedInquiry.status === 'Completed' ? '#166534' : '#92400e'};
              }
              .services-grid { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 15px; }
              .service-badge { 
                padding: 4px 8px; 
                border: 1px solid #d1d5db; 
                border-radius: 4px; 
                font-size: 12px;
                background: #f9fafb;
              }
              .stats-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 15px; margin-bottom: 20px; }
              .stat-box { 
                text-align: center; 
                padding: 15px; 
                border: 1px solid #d1d5db; 
                border-radius: 8px;
                background: #f9fafb;
              }
              .stat-number { font-size: 24px; font-weight: bold; color: #2563eb; }
              .stat-label { font-size: 12px; color: #6b7280; margin-top: 5px; }
              .overall-status { 
                text-align: center; 
                padding: 10px; 
                border-radius: 8px; 
                font-weight: bold;
                background: ${retrievedInquiry.report?.summary.overall_status === 'pass' ? '#dcfce7' : '#fef3c7'};
                color: ${retrievedInquiry.report?.summary.overall_status === 'pass' ? '#166534' : '#92400e'};
              }
              .result-item { 
                margin-bottom: 15px; 
                border: 1px solid #d1d5db; 
                padding: 12px; 
                border-radius: 6px;
                background: #ffffff;
              }
              .result-header { font-weight: bold; margin-bottom: 8px; color: #374151; }
              .result-detail { margin: 4px 0; font-size: 14px; }
              .footer { 
                margin-top: 30px; 
                padding-top: 20px; 
                border-top: 1px solid #d1d5db; 
                font-size: 12px; 
                color: #6b7280; 
                text-align: center;
              }
            }
          </style>
        </head>
        <body>
          <div class="no-print">
            <button onclick="window.print()" style="padding: 10px 20px; background: #2563eb; color: white; border: none; border-radius: 4px; cursor: pointer; margin-bottom: 20px;">
              Print Report
            </button>
          </div>
          
          <h1>Trustii Verification Report</h1>
          
          <div class="section">
            <h2>Report Information</h2>
            <div class="info-grid">
              <div class="info-item">
                <strong>Inquiry ID:</strong> ${retrievedInquiry.id}
              </div>
              <div class="info-item">
                <strong>Subject:</strong> ${retrievedInquiry.name}
              </div>
              <div class="info-item">
                <strong>Email:</strong> ${retrievedInquiry.email || 'N/A'}
              </div>
              <div class="info-item">
                <strong>Phone:</strong> ${retrievedInquiry.phoneNumber || 'N/A'}
              </div>
              <div class="info-item">
                <strong>Status:</strong> 
                <span class="status-badge">${retrievedInquiry.status}</span>
              </div>
              <div class="info-item">
                <strong>Created:</strong> ${new Date(retrievedInquiry.createdAt).toLocaleDateString()}
              </div>
              ${retrievedInquiry.completedAt ? `
                <div class="info-item">
                  <strong>Completed:</strong> ${new Date(retrievedInquiry.completedAt).toLocaleDateString()}
                </div>
              ` : ''}
            </div>
          </div>
          
          <div class="section">
            <h2>Services Requested</h2>
            <div class="services-grid">
              ${retrievedInquiry.services.map(service => `
                <span class="service-badge">${service.replace('_', ' ').replace(/\\b\\w/g, l => l.toUpperCase())}</span>
              `).join('')}
            </div>
            ${retrievedInquiry.creditStatus !== 'NotIncluded' ? `
              <div class="info-item">
                <strong>Credit Status:</strong> ${retrievedInquiry.creditStatus}
              </div>
            ` : ''}
          </div>
          
          ${retrievedInquiry.report ? `
            <div class="section">
              <h2>Verification Results</h2>
              <div class="stats-grid">
                <div class="stat-box">
                  <div class="stat-number">${retrievedInquiry.report.summary.total_checks}</div>
                  <div class="stat-label">Total Checks</div>
                </div>
                <div class="stat-box">
                  <div class="stat-number" style="color: #059669;">${retrievedInquiry.report.summary.passed_checks}</div>
                  <div class="stat-label">Passed</div>
                </div>
                <div class="stat-box">
                  <div class="stat-number" style="color: #dc2626;">${retrievedInquiry.report.summary.failed_checks}</div>
                  <div class="stat-label">Failed</div>
                </div>
              </div>
              
              <div class="overall-status">
                Overall Status: ${retrievedInquiry.report.summary.overall_status.toUpperCase()}
              </div>
            </div>
            
            <div class="section">
              <h2>Detailed Results</h2>
              ${Object.entries(retrievedInquiry.report.results).map(([key, result]) => `
                <div class="result-item">
                  <div class="result-header">${key.replace('_', ' ').replace(/\\b\\w/g, l => l.toUpperCase())}</div>
                  <div class="result-detail"><strong>Verified:</strong> ${result.verified ? 'Yes' : 'No'}</div>
                  ${Object.entries(result).filter(([k, v]) => k !== 'verified' && v !== undefined).map(([k, v]) => `
                    <div class="result-detail">
                      <strong>${k.replace('_', ' ').replace(/\\b\\w/g, l => l.toUpperCase())}:</strong> 
                      ${typeof v === 'object' ? JSON.stringify(v) : v}
                    </div>
                  `).join('')}
                </div>
              `).join('')}
            </div>
          ` : ''}
          
          <div class="footer">
            <p>Report generated on ${new Date().toLocaleDateString()} at ${new Date().toLocaleTimeString()}</p>
            <p>This report was generated by Trustii verification system.</p>
            <p>For questions about this report, please contact our support team.</p>
          </div>
        </body>
      </html>
    `;

    printWindow.document.write(printContent);
    printWindow.document.close();
    
    // Wait for content to load then print
    printWindow.onload = () => {
      printWindow.print();
      printWindow.close();
    };
  };

  const handleDownload = async () => {
    if (!retrievedInquiry) return;
    
    setIsGeneratingPDF(true);
    try {
      // Create a temporary element to generate PDF from
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = `
        <div style="padding: 20px; font-family: Arial, sans-serif;">
          <h1 style="color: #2563eb; margin-bottom: 20px;">Trustii Verification Report</h1>
          
          <div style="margin-bottom: 20px;">
            <h2>Report Information</h2>
            <p><strong>Inquiry ID:</strong> ${retrievedInquiry.id}</p>
            <p><strong>Subject:</strong> ${retrievedInquiry.name}</p>
            <p><strong>Email:</strong> ${retrievedInquiry.email || 'N/A'}</p>
            <p><strong>Phone:</strong> ${retrievedInquiry.phoneNumber || 'N/A'}</p>
            <p><strong>Status:</strong> ${retrievedInquiry.status}</p>
            <p><strong>Created:</strong> ${new Date(retrievedInquiry.createdAt).toLocaleDateString()}</p>
            <p><strong>Completed:</strong> ${retrievedInquiry.completedAt ? new Date(retrievedInquiry.completedAt).toLocaleDateString() : 'N/A'}</p>
          </div>
          
          <div style="margin-bottom: 20px;">
            <h2>Services Requested</h2>
            <ul>
              ${retrievedInquiry.services.map(service => `<li>${service.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}</li>`).join('')}
            </ul>
          </div>
          
          ${retrievedInquiry.report ? `
            <div style="margin-bottom: 20px;">
              <h2>Verification Results</h2>
              <div style="background: #f8f9fa; padding: 15px; border-radius: 8px;">
                <p><strong>Overall Status:</strong> <span style="color: ${retrievedInquiry.report.summary.overall_status === 'pass' ? 'green' : 'red'}">${retrievedInquiry.report.summary.overall_status.toUpperCase()}</span></p>
                <p><strong>Total Checks:</strong> ${retrievedInquiry.report.summary.total_checks}</p>
                <p><strong>Passed:</strong> ${retrievedInquiry.report.summary.passed_checks}</p>
                <p><strong>Failed:</strong> ${retrievedInquiry.report.summary.failed_checks}</p>
              </div>
            </div>
            
            <div style="margin-bottom: 20px;">
              <h2>Detailed Results</h2>
              ${Object.entries(retrievedInquiry.report.results).map(([key, result]) => `
                <div style="margin-bottom: 15px; border: 1px solid #ddd; padding: 10px; border-radius: 5px;">
                  <h3 style="margin: 0 0 10px 0;">${key.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}</h3>
                  <p><strong>Verified:</strong> ${result.verified ? 'Yes' : 'No'}</p>
                  ${Object.entries(result).filter(([k, v]) => k !== 'verified' && v !== undefined).map(([k, v]) => `
                    <p><strong>${k.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}:</strong> ${typeof v === 'object' ? JSON.stringify(v) : v}</p>
                  `).join('')}
                </div>
              `).join('')}
            </div>
          ` : ''}
          
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; font-size: 12px; color: #666;">
            <p>Report generated on ${new Date().toLocaleDateString()} at ${new Date().toLocaleTimeString()}</p>
            <p>This report was generated by Trustii verification system.</p>
          </div>
        </div>
      `;
      
      document.body.appendChild(tempDiv);
      
      await generatePDFFromElement(tempDiv, `trustii-report-${retrievedInquiry.id}.pdf`);
      
      document.body.removeChild(tempDiv);
      showSuccess('PDF generated successfully!');
    } catch (error) {
      console.error('PDF generation failed:', error);
      showError('Failed to generate PDF. Please try again.');
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  const handleShare = () => {
    if (!retrievedInquiry) return;
    
    const shareUrl = `${window.location.origin}/trustii-shared-report/${retrievedInquiry.id}`;
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

  if (retrievedInquiry) {
    return (
      <div className="space-y-6">
        {/* Report Header */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Verification Report
                </CardTitle>
                <p className="text-sm text-gray-600 mt-1">
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
                  <p className="text-sm font-medium">{retrievedInquiry.name}</p>
                  <p className="text-xs text-gray-500">Subject</p>
                </div>
              </div>
              
              {retrievedInquiry.email && (
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-gray-500" />
                  <div>
                    <p className="text-sm font-medium">{retrievedInquiry.email}</p>
                    <p className="text-xs text-gray-500">Email</p>
                  </div>
                </div>
              )}
              
              {retrievedInquiry.phoneNumber && (
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-gray-500" />
                  <div>
                    <p className="text-sm font-medium">{retrievedInquiry.phoneNumber}</p>
                    <p className="text-xs text-gray-500">Phone</p>
                  </div>
                </div>
              )}
              
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-gray-500" />
                <div>
                  <p className="text-sm font-medium">{formatDate(retrievedInquiry.createdAt)}</p>
                  <p className="text-xs text-gray-500">Created</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Services */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
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
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Report Details
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
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
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col sm:flex-row gap-3">
              <Button onClick={handlePrint} variant="outline" className="flex-1">
                <Printer className="h-4 w-4 mr-2" />
                Print Report
              </Button>
              <Button 
                onClick={handleDownload} 
                variant="outline" 
                className="flex-1"
                disabled={isGeneratingPDF}
              >
                {isGeneratingPDF ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Generating PDF...
                  </>
                ) : (
                  <>
                    <Download className="h-4 w-4 mr-2" />
                    Download PDF
                  </>
                )}
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
                  <Input value={shareUrl} readOnly className="flex-1" />
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

        {/* Back Button */}
        <Button
          onClick={() => {
            reset();
            setRetrievedInquiry(null);
            setError(null);
            setShareUrl('');
          }}
          variant="outline"
          className="w-full"
        >
          Retrieve Another Report
        </Button>
      </div>
    );
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Search className="h-5 w-5" />
          Retrieve Inquiry Report
        </CardTitle>
        <p className="text-sm text-gray-600">
          Enter an inquiry ID to retrieve the verification results and detailed report.
        </p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Label htmlFor="inquiryId">Inquiry ID *</Label>
            <Input
              id="inquiryId"
              {...register('inquiryId')}
              placeholder="Enter inquiry ID"
            />
            {errors.inquiryId && (
              <p className="text-sm text-red-600 mt-1">{errors.inquiryId.message}</p>
            )}
          </div>

          {/* Error Display */}
          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={loading}
            className="w-full"
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Retrieving Report...
              </>
            ) : (
              <>
                <Search className="mr-2 h-4 w-4" />
                Retrieve Report
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}; 