import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  FileText, 
  Download, 
  Printer, 
  Share2, 
  ArrowLeft,
  User,
  Shield,
  CreditCard,
  Globe,
  Calendar,
  Phone,
  Mail,
  CheckCircle,
  AlertCircle,
  Clock,
  Loader2,
  Building2,
  Settings
} from 'lucide-react';
import { TrustiiRetrieveInquiryResponse } from '@/types/trustii';
import { generatePDFFromElement } from '@/utils/pdfGenerator';
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

// Static mock data for demonstration - matches API specification
const getMockInquiryData = (inquiryId: string): TrustiiRetrieveInquiryResponse => ({
  id: inquiryId,
  createdAt: "2024-01-15T10:30:00Z",
  completedAt: "2024-01-15T14:45:00Z", // nullable
  expiresAt: "2024-02-15T10:30:00Z",
  cancellable: false,
  name: "John Smith",
  email: "john.smith@email.com", // nullable
  url: `https://trustii.co/verif/${inquiryId}`, // Form URL for embedding
  phoneNumber: "+1-555-123-4567", // nullable
  notificationType: "Email", // nullable, possible values: [Sms, Email]
  services: ["identity", "credit", "criminal_canada"], // possible values: [identity, credit, criminal_quebec, criminal_canada, online_reputation]
  serviceAddOns: [], // string[]
  tags: ["rental_application", "background_check"], // string[]
  creditStatus: "Available", // possible values: [NotIncluded, Available, Unavailable]
  status: "Completed", // possible values: [Pending, Completed, Submitted, InProgress, Suspended]
  report: {
    id: `rep_${inquiryId}`,
    status: "completed", // pending, completed, failed
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
        end_date: null,
        salary: 85000,
        reason_for_leaving: null,
        notes: "Employment verification completed successfully"
      },
      criminal_background_check: {
        verified: true,
        has_criminal_record: false,
        records: [],
        notes: "No criminal records found"
      },
      education_verification: {
        verified: true,
        institution: "University of Toronto",
        degree: "Bachelor of Science in Computer Science",
        graduation_date: "2010-05-15",
        notes: "Education verification completed successfully"
      }
    },
    summary: {
      overall_status: "pass", // pass, fail, pending
      total_checks: 4,
      passed_checks: 4,
      failed_checks: 0,
      pending_checks: 0
    }
  }
});

const TrustiiSharedReportPage: React.FC = () => {
  const { inquiryId } = useParams<{ inquiryId: string }>();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [inquiry, setInquiry] = useState<TrustiiRetrieveInquiryResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);

  useEffect(() => {
    const loadInquiry = async () => {
      if (!inquiryId) {
        setError('Inquiry ID is required');
        setLoading(false);
        return;
      }

      try {
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // For demo purposes, show static data
        const mockData = getMockInquiryData(inquiryId);
        setInquiry(mockData);
      } catch (err) {
        setError('Failed to load inquiry report');
      } finally {
        setLoading(false);
      }
    };

    loadInquiry();
  }, [inquiryId]);

  const handlePrint = () => {
    if (!inquiry) return;
    
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
          <title>Trustii Verification Report - ${inquiry.id}</title>
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
                background: ${inquiry.status === 'Completed' ? '#dcfce7' : '#fef3c7'};
                color: ${inquiry.status === 'Completed' ? '#166534' : '#92400e'};
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
                background: ${inquiry.report?.summary.overall_status === 'pass' ? '#dcfce7' : '#fef3c7'};
                color: ${inquiry.report?.summary.overall_status === 'pass' ? '#166534' : '#92400e'};
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
          
          <h1 style="text-align: center; color: #2563eb; margin-bottom: 20px; font-size: 24px;">Trustii Human Resources Verification</h1>
          
          <div class="section">
            <h2>Report Information</h2>
            <div class="info-grid">
              <div class="info-item">
                <strong>Inquiry ID:</strong> ${inquiry.id}
              </div>
              <div class="info-item">
                <strong>Subject:</strong> ${inquiry.name}
              </div>
              <div class="info-item">
                <strong>Email:</strong> ${inquiry.email || 'N/A'}
              </div>
              <div class="info-item">
                <strong>Phone:</strong> ${inquiry.phoneNumber || 'N/A'}
              </div>
              <div class="info-item">
                <strong>Status:</strong> 
                <span class="status-badge">${inquiry.status}</span>
              </div>
              <div class="info-item">
                <strong>Created:</strong> ${new Date(inquiry.createdAt).toLocaleDateString()}
              </div>
              ${inquiry.completedAt ? `
                <div class="info-item">
                  <strong>Completed:</strong> ${new Date(inquiry.completedAt).toLocaleDateString()}
                </div>
              ` : ''}
            </div>
          </div>
          
          <div class="section">
            <h2>Services Requested</h2>
            <div class="services-grid">
              ${inquiry.services.map(service => `
                <span class="service-badge">${service.replace('_', ' ').replace(/\\b\\w/g, l => l.toUpperCase())}</span>
              `).join('')}
            </div>
            ${inquiry.creditStatus !== 'NotIncluded' ? `
              <div class="info-item">
                <strong>Credit Status:</strong> ${inquiry.creditStatus}
              </div>
            ` : ''}
          </div>
          
          <div class="section">
            <h2>Additional Information</h2>
            <div class="info-grid">
              <div class="info-item">
                <strong>Inquiry ID:</strong> ${inquiry.id}
              </div>
              <div class="info-item">
                <strong>Created:</strong> ${new Date(inquiry.createdAt).toLocaleDateString()}
              </div>
              ${inquiry.completedAt ? `
                <div class="info-item">
                  <strong>Completed:</strong> ${new Date(inquiry.completedAt).toLocaleDateString()}
                </div>
              ` : ''}
              <div class="info-item">
                <strong>Expires:</strong> ${new Date(inquiry.expiresAt).toLocaleDateString()}
              </div>
              <div class="info-item">
                <strong>Cancellable:</strong> ${inquiry.cancellable ? 'Yes' : 'No'}
              </div>
              ${inquiry.notificationType ? `
                <div class="info-item">
                  <strong>Notification Type:</strong> ${inquiry.notificationType}
                </div>
              ` : ''}
            </div>
            ${inquiry.tags && inquiry.tags.length > 0 ? `
              <div class="info-item">
                <strong>Tags:</strong> ${inquiry.tags.join(', ')}
              </div>
            ` : ''}
            ${inquiry.serviceAddOns && inquiry.serviceAddOns.length > 0 ? `
              <div class="info-item">
                <strong>Service Add-ons:</strong> ${inquiry.serviceAddOns.join(', ')}
              </div>
            ` : ''}
          </div>
          
          ${inquiry.report ? `
            <div class="section">
              <h2>Verification Results</h2>
              <div class="stats-grid">
                <div class="stat-box">
                  <div class="stat-number">${inquiry.report.summary.total_checks}</div>
                  <div class="stat-label">Total Checks</div>
                </div>
                <div class="stat-box">
                  <div class="stat-number" style="color: #059669;">${inquiry.report.summary.passed_checks}</div>
                  <div class="stat-label">Passed</div>
                </div>
                <div class="stat-box">
                  <div class="stat-number" style="color: #dc2626;">${inquiry.report.summary.failed_checks}</div>
                  <div class="stat-label">Failed</div>
                </div>
              </div>
              
              <div class="overall-status">
                Overall Status: ${inquiry.report.summary.overall_status.toUpperCase()}
              </div>
            </div>
            
            <div class="section">
              <h2>Detailed Verification Results</h2>
              
              ${inquiry.report.results.identity_verification ? `
                <div class="result-item">
                  <div class="result-header">Identity Verification</div>
                  <div class="result-detail"><strong>Verified:</strong> ${inquiry.report.results.identity_verification.verified ? 'Yes' : 'No'}</div>
                  <div class="result-detail"><strong>Name:</strong> ${inquiry.report.results.identity_verification.first_name} ${inquiry.report.results.identity_verification.last_name}</div>
                  <div class="result-detail"><strong>Date of Birth:</strong> ${inquiry.report.results.identity_verification.date_of_birth}</div>
                  ${inquiry.report.results.identity_verification.address ? `
                    <div class="result-detail"><strong>Address:</strong> ${inquiry.report.results.identity_verification.address.street}, ${inquiry.report.results.identity_verification.address.city}, ${inquiry.report.results.identity_verification.address.state} ${inquiry.report.results.identity_verification.address.postal_code}, ${inquiry.report.results.identity_verification.address.country}</div>
                  ` : ''}
                  ${inquiry.report.results.identity_verification.notes ? `
                    <div class="result-detail"><strong>Notes:</strong> ${inquiry.report.results.identity_verification.notes}</div>
                  ` : ''}
                </div>
              ` : ''}
              
              ${inquiry.report.results.employment_verification ? `
                <div class="result-item">
                  <div class="result-header">Employment Verification</div>
                  <div class="result-detail"><strong>Verified:</strong> ${inquiry.report.results.employment_verification.verified ? 'Yes' : 'No'}</div>
                  <div class="result-detail"><strong>Company:</strong> ${inquiry.report.results.employment_verification.company_name}</div>
                  <div class="result-detail"><strong>Position:</strong> ${inquiry.report.results.employment_verification.position}</div>
                  <div class="result-detail"><strong>Start Date:</strong> ${inquiry.report.results.employment_verification.start_date}</div>
                  ${inquiry.report.results.employment_verification.end_date ? `
                    <div class="result-detail"><strong>End Date:</strong> ${inquiry.report.results.employment_verification.end_date}</div>
                  ` : ''}
                  ${inquiry.report.results.employment_verification.salary ? `
                    <div class="result-detail"><strong>Salary:</strong> $${inquiry.report.results.employment_verification.salary.toLocaleString()}</div>
                  ` : ''}
                  ${inquiry.report.results.employment_verification.reason_for_leaving ? `
                    <div class="result-detail"><strong>Reason for Leaving:</strong> ${inquiry.report.results.employment_verification.reason_for_leaving}</div>
                  ` : ''}
                  ${inquiry.report.results.employment_verification.notes ? `
                    <div class="result-detail"><strong>Notes:</strong> ${inquiry.report.results.employment_verification.notes}</div>
                  ` : ''}
                </div>
              ` : ''}
              
              ${inquiry.report.results.criminal_background_check ? `
                <div class="result-item">
                  <div class="result-header">Criminal Background Check</div>
                  <div class="result-detail"><strong>Verified:</strong> ${inquiry.report.results.criminal_background_check.verified ? 'Yes' : 'No'}</div>
                  <div class="result-detail"><strong>Has Criminal Record:</strong> ${inquiry.report.results.criminal_background_check.has_criminal_record ? 'Yes' : 'No'}</div>
                  ${inquiry.report.results.criminal_background_check.records && inquiry.report.results.criminal_background_check.records.length > 0 ? `
                    <div class="result-detail"><strong>Records:</strong></div>
                    ${inquiry.report.results.criminal_background_check.records.map(record => `
                      <div class="result-detail" style="margin-left: 20px;">
                        <strong>Offense:</strong> ${record.offense}<br>
                        <strong>Date:</strong> ${record.date}<br>
                        <strong>Disposition:</strong> ${record.disposition}<br>
                        <strong>Jurisdiction:</strong> ${record.jurisdiction}
                      </div>
                    `).join('')}
                  ` : ''}
                  ${inquiry.report.results.criminal_background_check.notes ? `
                    <div class="result-detail"><strong>Notes:</strong> ${inquiry.report.results.criminal_background_check.notes}</div>
                  ` : ''}
                </div>
              ` : ''}
              
              ${inquiry.report.results.education_verification ? `
                <div class="result-item">
                  <div class="result-header">Education Verification</div>
                  <div class="result-detail"><strong>Verified:</strong> ${inquiry.report.results.education_verification.verified ? 'Yes' : 'No'}</div>
                  <div class="result-detail"><strong>Institution:</strong> ${inquiry.report.results.education_verification.institution}</div>
                  <div class="result-detail"><strong>Degree:</strong> ${inquiry.report.results.education_verification.degree}</div>
                  <div class="result-detail"><strong>Graduation Date:</strong> ${inquiry.report.results.education_verification.graduation_date}</div>
                  ${inquiry.report.results.education_verification.notes ? `
                    <div class="result-detail"><strong>Notes:</strong> ${inquiry.report.results.education_verification.notes}</div>
                  ` : ''}
                </div>
              ` : ''}
            </div>
          ` : ''}
          
          <div class="footer">
            <p>Report generated on ${new Date().toLocaleDateString()} at ${new Date().toLocaleTimeString()}</p>
            <p>This report was generated by Trustii verification system.</p>
            <p>Shared via: ${window.location.href}</p>
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
    if (!inquiry) return;
    
    setIsGeneratingPDF(true);
    try {
      // Create a new PDF document with proper A4 formatting
      const { jsPDF } = await import('jspdf');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const margin = 20;
      let yPosition = 20;

      // Set default font
      pdf.setFont('helvetica');

      // ===== HEADER =====
      pdf.setFillColor(37, 99, 235); // Blue background
      pdf.rect(0, 0, pageWidth, 35, 'F');
      
      pdf.setTextColor(255, 255, 255);
      pdf.setFontSize(20);
      pdf.setFont('helvetica', 'bold');
      pdf.text('Trustii Human Resources Verification', pageWidth / 2, 15, { align: 'center' });
      
      pdf.setFontSize(12);
      pdf.setFont('helvetica', 'normal');
      pdf.text(`Generated on ${new Date().toLocaleDateString('en-CA', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })}`, pageWidth / 2, 25, { align: 'center' });

      pdf.setFontSize(10);
      pdf.text(`Inquiry ID: ${inquiry.id}`, pageWidth / 2, 32, { align: 'center' });

      // Reset text color and position
      pdf.setTextColor(0, 0, 0);
      yPosition = 45;

      // ===== REPORT INFORMATION =====
      pdf.setFontSize(16);
      pdf.setFont('helvetica', 'bold');
      pdf.text('Report Information', margin, yPosition);
      yPosition += 8;

      pdf.setFontSize(11);
      pdf.setFont('helvetica', 'normal');
      pdf.text(`Subject: ${inquiry.name}`, margin, yPosition);
      yPosition += 6;
      pdf.text(`Email: ${inquiry.email || 'N/A'}`, margin, yPosition);
      yPosition += 6;
      pdf.text(`Phone: ${inquiry.phoneNumber || 'N/A'}`, margin, yPosition);
      yPosition += 6;
      pdf.text(`Status: ${inquiry.status}`, margin, yPosition);
      yPosition += 6;
      pdf.text(`Created: ${new Date(inquiry.createdAt).toLocaleDateString()}`, margin, yPosition);
      yPosition += 6;
      if (inquiry.completedAt) {
        pdf.text(`Completed: ${new Date(inquiry.completedAt).toLocaleDateString()}`, margin, yPosition);
        yPosition += 6;
      }
      yPosition += 10;

      // Check if we need a new page
      if (yPosition > pageHeight - 80) {
        pdf.addPage();
        yPosition = 20;
      }

      // ===== SERVICES REQUESTED =====
      pdf.setFontSize(16);
      pdf.setFont('helvetica', 'bold');
      pdf.text('Services Requested', margin, yPosition);
      yPosition += 8;

      pdf.setFontSize(11);
      pdf.setFont('helvetica', 'normal');
      inquiry.services.forEach(service => {
        pdf.text(`• ${service.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}`, margin, yPosition);
        yPosition += 5;
      });
      yPosition += 5;

      if (inquiry.creditStatus !== 'NotIncluded') {
        pdf.text(`Credit Status: ${inquiry.creditStatus}`, margin, yPosition);
        yPosition += 6;
      }
      yPosition += 10;

      // Check if we need a new page
      if (yPosition > pageHeight - 80) {
        pdf.addPage();
        yPosition = 20;
      }

      // ===== ADDITIONAL INFORMATION =====
      pdf.setFontSize(16);
      pdf.setFont('helvetica', 'bold');
      pdf.text('Additional Information', margin, yPosition);
      yPosition += 8;

      pdf.setFontSize(11);
      pdf.setFont('helvetica', 'normal');
      pdf.text(`Inquiry ID: ${inquiry.id}`, margin, yPosition);
      yPosition += 6;
      pdf.text(`Created: ${new Date(inquiry.createdAt).toLocaleDateString()}`, margin, yPosition);
      yPosition += 6;
      if (inquiry.completedAt) {
        pdf.text(`Completed: ${new Date(inquiry.completedAt).toLocaleDateString()}`, margin, yPosition);
        yPosition += 6;
      }
      pdf.text(`Expires: ${new Date(inquiry.expiresAt).toLocaleDateString()}`, margin, yPosition);
      yPosition += 6;
      pdf.text(`Cancellable: ${inquiry.cancellable ? 'Yes' : 'No'}`, margin, yPosition);
      yPosition += 6;
      if (inquiry.notificationType) {
        pdf.text(`Notification Type: ${inquiry.notificationType}`, margin, yPosition);
        yPosition += 6;
      }
      if (inquiry.tags && inquiry.tags.length > 0) {
        pdf.text(`Tags: ${inquiry.tags.join(', ')}`, margin, yPosition);
        yPosition += 6;
      }
      if (inquiry.serviceAddOns && inquiry.serviceAddOns.length > 0) {
        pdf.text(`Service Add-ons: ${inquiry.serviceAddOns.join(', ')}`, margin, yPosition);
        yPosition += 6;
      }
      yPosition += 10;

      // Check if we need a new page
      if (yPosition > pageHeight - 80) {
        pdf.addPage();
        yPosition = 20;
      }

      // ===== VERIFICATION RESULTS =====
      if (inquiry.report) {
        pdf.setFontSize(16);
        pdf.setFont('helvetica', 'bold');
        pdf.text('Verification Results', margin, yPosition);
        yPosition += 8;

        pdf.setFontSize(11);
        pdf.setFont('helvetica', 'normal');
        pdf.text(`Overall Status: ${inquiry.report.summary.overall_status.toUpperCase()}`, margin, yPosition);
        yPosition += 6;
        pdf.text(`Total Checks: ${inquiry.report.summary.total_checks}`, margin, yPosition);
        yPosition += 6;
        pdf.text(`Passed: ${inquiry.report.summary.passed_checks}`, margin, yPosition);
        yPosition += 6;
        pdf.text(`Failed: ${inquiry.report.summary.failed_checks}`, margin, yPosition);
        yPosition += 10;

        // Check if we need a new page
        if (yPosition > pageHeight - 80) {
          pdf.addPage();
          yPosition = 20;
        }

        // ===== DETAILED VERIFICATION RESULTS =====
        pdf.setFontSize(16);
        pdf.setFont('helvetica', 'bold');
        pdf.text('Detailed Verification Results', margin, yPosition);
        yPosition += 8;

        // Identity Verification
        if (inquiry.report.results.identity_verification) {
          pdf.setFontSize(14);
          pdf.setFont('helvetica', 'bold');
          pdf.text('Identity Verification', margin, yPosition);
          yPosition += 6;

          pdf.setFontSize(11);
          pdf.setFont('helvetica', 'normal');
          pdf.text(`Verified: ${inquiry.report.results.identity_verification.verified ? 'Yes' : 'No'}`, margin, yPosition);
          yPosition += 5;
          pdf.text(`Name: ${inquiry.report.results.identity_verification.first_name} ${inquiry.report.results.identity_verification.last_name}`, margin, yPosition);
          yPosition += 5;
          pdf.text(`Date of Birth: ${inquiry.report.results.identity_verification.date_of_birth}`, margin, yPosition);
          yPosition += 5;
          
          if (inquiry.report.results.identity_verification.address) {
            const address = inquiry.report.results.identity_verification.address;
            pdf.text(`Address: ${address.street}, ${address.city}, ${address.state} ${address.postal_code}, ${address.country}`, margin, yPosition);
            yPosition += 5;
          }
          
          if (inquiry.report.results.identity_verification.notes) {
            pdf.text(`Notes: ${inquiry.report.results.identity_verification.notes}`, margin, yPosition);
            yPosition += 5;
          }
          yPosition += 5;
        }

        // Check if we need a new page
        if (yPosition > pageHeight - 80) {
          pdf.addPage();
          yPosition = 20;
        }

        // Employment Verification
        if (inquiry.report.results.employment_verification) {
          pdf.setFontSize(14);
          pdf.setFont('helvetica', 'bold');
          pdf.text('Employment Verification', margin, yPosition);
          yPosition += 6;

          pdf.setFontSize(11);
          pdf.setFont('helvetica', 'normal');
          pdf.text(`Verified: ${inquiry.report.results.employment_verification.verified ? 'Yes' : 'No'}`, margin, yPosition);
          yPosition += 5;
          pdf.text(`Company: ${inquiry.report.results.employment_verification.company_name}`, margin, yPosition);
          yPosition += 5;
          pdf.text(`Position: ${inquiry.report.results.employment_verification.position}`, margin, yPosition);
          yPosition += 5;
          pdf.text(`Start Date: ${inquiry.report.results.employment_verification.start_date}`, margin, yPosition);
          yPosition += 5;
          
          if (inquiry.report.results.employment_verification.end_date) {
            pdf.text(`End Date: ${inquiry.report.results.employment_verification.end_date}`, margin, yPosition);
            yPosition += 5;
          }
          
          if (inquiry.report.results.employment_verification.salary) {
            pdf.text(`Salary: $${inquiry.report.results.employment_verification.salary.toLocaleString()}`, margin, yPosition);
            yPosition += 5;
          }
          
          if (inquiry.report.results.employment_verification.reason_for_leaving) {
            pdf.text(`Reason for Leaving: ${inquiry.report.results.employment_verification.reason_for_leaving}`, margin, yPosition);
            yPosition += 5;
          }
          
          if (inquiry.report.results.employment_verification.notes) {
            pdf.text(`Notes: ${inquiry.report.results.employment_verification.notes}`, margin, yPosition);
            yPosition += 5;
          }
          yPosition += 5;
        }

        // Check if we need a new page
        if (yPosition > pageHeight - 80) {
          pdf.addPage();
          yPosition = 20;
        }

        // Criminal Background Check
        if (inquiry.report.results.criminal_background_check) {
          pdf.setFontSize(14);
          pdf.setFont('helvetica', 'bold');
          pdf.text('Criminal Background Check', margin, yPosition);
          yPosition += 6;

          pdf.setFontSize(11);
          pdf.setFont('helvetica', 'normal');
          pdf.text(`Verified: ${inquiry.report.results.criminal_background_check.verified ? 'Yes' : 'No'}`, margin, yPosition);
          yPosition += 5;
          pdf.text(`Has Criminal Record: ${inquiry.report.results.criminal_background_check.has_criminal_record ? 'Yes' : 'No'}`, margin, yPosition);
          yPosition += 5;
          
          if (inquiry.report.results.criminal_background_check.records && inquiry.report.results.criminal_background_check.records.length > 0) {
            pdf.text('Records:', margin, yPosition);
            yPosition += 5;
            inquiry.report.results.criminal_background_check.records.forEach(record => {
              pdf.text(`  Offense: ${record.offense}`, margin + 5, yPosition);
              yPosition += 4;
              pdf.text(`  Date: ${record.date}`, margin + 5, yPosition);
              yPosition += 4;
              pdf.text(`  Disposition: ${record.disposition}`, margin + 5, yPosition);
              yPosition += 4;
              pdf.text(`  Jurisdiction: ${record.jurisdiction}`, margin + 5, yPosition);
              yPosition += 6;
            });
          }
          
          if (inquiry.report.results.criminal_background_check.notes) {
            pdf.text(`Notes: ${inquiry.report.results.criminal_background_check.notes}`, margin, yPosition);
            yPosition += 5;
          }
          yPosition += 5;
        }

        // Check if we need a new page
        if (yPosition > pageHeight - 80) {
          pdf.addPage();
          yPosition = 20;
        }

        // Education Verification
        if (inquiry.report.results.education_verification) {
          pdf.setFontSize(14);
          pdf.setFont('helvetica', 'bold');
          pdf.text('Education Verification', margin, yPosition);
          yPosition += 6;

          pdf.setFontSize(11);
          pdf.setFont('helvetica', 'normal');
          pdf.text(`Verified: ${inquiry.report.results.education_verification.verified ? 'Yes' : 'No'}`, margin, yPosition);
          yPosition += 5;
          pdf.text(`Institution: ${inquiry.report.results.education_verification.institution}`, margin, yPosition);
          yPosition += 5;
          pdf.text(`Degree: ${inquiry.report.results.education_verification.degree}`, margin, yPosition);
          yPosition += 5;
          pdf.text(`Graduation Date: ${inquiry.report.results.education_verification.graduation_date}`, margin, yPosition);
          yPosition += 5;
          
          if (inquiry.report.results.education_verification.notes) {
            pdf.text(`Notes: ${inquiry.report.results.education_verification.notes}`, margin, yPosition);
            yPosition += 5;
          }
          yPosition += 5;
        }
      }

      // ===== FOOTER =====
      if (yPosition > pageHeight - 40) {
        pdf.addPage();
        yPosition = 20;
      }

      pdf.setFontSize(10);
      pdf.setFont('helvetica', 'normal');
      pdf.text(`Report generated on ${new Date().toLocaleDateString()} at ${new Date().toLocaleTimeString()}`, margin, yPosition);
      yPosition += 5;
      pdf.text('This report was generated by Trustii verification system.', margin, yPosition);
      yPosition += 5;
      pdf.text(`Shared via: ${window.location.href}`, margin, yPosition);

      // Save the PDF
      pdf.save(`trustii-report-${inquiry.id}.pdf`);
      showSuccess('PDF generated successfully!');
    } catch (error) {
      console.error('PDF generation failed:', error);
      showError('Failed to generate PDF. Please try again.');
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  const handleShare = () => {
    if (!inquiry) return;
    
    const shareUrl = window.location.href;
    
    if (navigator.share) {
      navigator.share({
        title: 'Trustii Verification Report',
        text: `Verification report for ${inquiry.name}`,
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
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-blue-600" />
          <p className="text-gray-600 dark:text-gray-400">Loading report...</p>
        </div>
      </div>
    );
  }

  if (error || !inquiry) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="max-w-md mx-auto text-center">
          <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <h1 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
            Report Not Found
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            {error || 'The requested report could not be found.'}
          </p>
          <Button onClick={() => navigate('/trustii-demo')}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Demo
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-4xl mx-auto p-6">
        {/* Header */}
        <div className="mb-6">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/trustii-demo')}
            className="mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Demo
          </Button>
          
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                Shared Verification Report
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-1">
                Inquiry ID: {inquiry.id}
              </p>
            </div>
            <Badge className={getStatusColor(inquiry.status)}>
              {getStatusIcon(inquiry.status)}
              {inquiry.status}
            </Badge>
          </div>
        </div>

        <div className="space-y-6">
          {/* Report Header */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Report Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-gray-500" />
                  <div>
                    <p className="text-sm font-medium">{inquiry.name}</p>
                    <p className="text-xs text-gray-500">Subject</p>
                  </div>
                </div>
                
                {inquiry.email && (
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-gray-500" />
                    <div>
                      <p className="text-sm font-medium">{inquiry.email}</p>
                      <p className="text-xs text-gray-500">Email</p>
                    </div>
                  </div>
                )}
                
                {inquiry.phoneNumber && (
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-gray-500" />
                    <div>
                      <p className="text-sm font-medium">{inquiry.phoneNumber}</p>
                      <p className="text-xs text-gray-500">Phone</p>
                    </div>
                  </div>
                )}
                
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-gray-500" />
                  <div>
                    <p className="text-sm font-medium">{formatDate(inquiry.createdAt)}</p>
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
                {inquiry.services.map((service) => (
                  <Badge key={service} variant="outline" className="justify-start">
                    {service === 'identity' && <User className="h-3 w-3 mr-1" />}
                    {service === 'credit' && <CreditCard className="h-3 w-3 mr-1" />}
                    {(service === 'criminal_quebec' || service === 'criminal_canada') && <Shield className="h-3 w-3 mr-1" />}
                    {service === 'online_reputation' && <Globe className="h-3 w-3 mr-1" />}
                    {service.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                  </Badge>
                ))}
              </div>
              
              {inquiry.creditStatus !== 'NotIncluded' && (
                <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <p className="text-sm font-medium text-blue-800 dark:text-blue-200">
                    Credit Status: {inquiry.creditStatus}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Additional Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                Additional Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-2">Inquiry Details</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Inquiry ID:</span>
                      <span className="font-mono text-gray-900 dark:text-gray-100">{inquiry.id}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Created:</span>
                      <span className="text-gray-900 dark:text-gray-100">{formatDate(inquiry.createdAt)}</span>
                    </div>
                    {inquiry.completedAt && (
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">Completed:</span>
                        <span className="text-gray-900 dark:text-gray-100">{formatDate(inquiry.completedAt)}</span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Expires:</span>
                      <span className="text-gray-900 dark:text-gray-100">{formatDate(inquiry.expiresAt)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Cancellable:</span>
                      <Badge variant={inquiry.cancellable ? "default" : "secondary"}>
                        {inquiry.cancellable ? 'Yes' : 'No'}
                      </Badge>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-2">Communication</h4>
                  <div className="space-y-2 text-sm">
                    {inquiry.notificationType && (
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">Notification Type:</span>
                        <Badge variant="outline">{inquiry.notificationType}</Badge>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Form URL:</span>
                      <a 
                        href={inquiry.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-blue-600 dark:text-blue-400 hover:underline text-xs truncate max-w-32"
                      >
                        {inquiry.url}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Tags */}
              {inquiry.tags && inquiry.tags.length > 0 && (
                <div className="mt-4">
                  <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-2">Tags</h4>
                  <div className="flex flex-wrap gap-2">
                    {inquiry.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Service Add-ons */}
              {inquiry.serviceAddOns && inquiry.serviceAddOns.length > 0 && (
                <div className="mt-4">
                  <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-2">Service Add-ons</h4>
                  <div className="flex flex-wrap gap-2">
                    {inquiry.serviceAddOns.map((addon) => (
                      <Badge key={addon} variant="outline" className="text-xs">
                        {addon}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Report Details */}
          {inquiry.report && (
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
                        {inquiry.report.summary.total_checks}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Total Checks</p>
                    </div>
                    <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                      <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                        {inquiry.report.summary.passed_checks}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Passed</p>
                    </div>
                    <div className="text-center p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
                      <p className="text-2xl font-bold text-red-600 dark:text-red-400">
                        {inquiry.report.summary.failed_checks}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Failed</p>
                    </div>
                  </div>
                  
                  <div className="text-center">
                    <Badge 
                      className={
                        inquiry.report.summary.overall_status === 'pass' 
                          ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-200'
                          : inquiry.report.summary.overall_status === 'fail'
                          ? 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-200'
                          : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-200'
                      }
                    >
                      Overall Status: {inquiry.report.summary.overall_status.toUpperCase()}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Detailed Verification Results */}
          {inquiry.report && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5" />
                  Detailed Verification Results
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {/* Identity Verification */}
                  {inquiry.report.results.identity_verification && (
                    <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-3">
                        <User className="h-4 w-4 text-blue-600" />
                        <h3 className="font-semibold text-gray-900 dark:text-gray-100">Identity Verification</h3>
                        <Badge 
                          className={inquiry.report.results.identity_verification.verified 
                            ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-200'
                            : 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-200'
                          }
                        >
                          {inquiry.report.results.identity_verification.verified ? 'Verified' : 'Not Verified'}
                        </Badge>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                        <div>
                          <span className="font-medium text-gray-700 dark:text-gray-300">Name:</span>
                          <span className="ml-2 text-gray-900 dark:text-gray-100">
                            {inquiry.report.results.identity_verification.first_name} {inquiry.report.results.identity_verification.last_name}
                          </span>
                        </div>
                        <div>
                          <span className="font-medium text-gray-700 dark:text-gray-300">Date of Birth:</span>
                          <span className="ml-2 text-gray-900 dark:text-gray-100">
                            {inquiry.report.results.identity_verification.date_of_birth}
                          </span>
                        </div>
                        {inquiry.report.results.identity_verification.address && (
                          <div className="md:col-span-2">
                            <span className="font-medium text-gray-700 dark:text-gray-300">Address:</span>
                            <span className="ml-2 text-gray-900 dark:text-gray-100">
                              {inquiry.report.results.identity_verification.address.street}, {inquiry.report.results.identity_verification.address.city}, {inquiry.report.results.identity_verification.address.state} {inquiry.report.results.identity_verification.address.postal_code}, {inquiry.report.results.identity_verification.address.country}
                            </span>
                          </div>
                        )}
                        {inquiry.report.results.identity_verification.notes && (
                          <div className="md:col-span-2">
                            <span className="font-medium text-gray-700 dark:text-gray-300">Notes:</span>
                            <span className="ml-2 text-gray-900 dark:text-gray-100">
                              {inquiry.report.results.identity_verification.notes}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Employment Verification */}
                  {inquiry.report.results.employment_verification && (
                    <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-3">
                        <Building2 className="h-4 w-4 text-green-600" />
                        <h3 className="font-semibold text-gray-900 dark:text-gray-100">Employment Verification</h3>
                        <Badge 
                          className={inquiry.report.results.employment_verification.verified 
                            ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-200'
                            : 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-200'
                          }
                        >
                          {inquiry.report.results.employment_verification.verified ? 'Verified' : 'Not Verified'}
                        </Badge>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                        <div>
                          <span className="font-medium text-gray-700 dark:text-gray-300">Company:</span>
                          <span className="ml-2 text-gray-900 dark:text-gray-100">
                            {inquiry.report.results.employment_verification.company_name}
                          </span>
                        </div>
                        <div>
                          <span className="font-medium text-gray-700 dark:text-gray-300">Position:</span>
                          <span className="ml-2 text-gray-900 dark:text-gray-100">
                            {inquiry.report.results.employment_verification.position}
                          </span>
                        </div>
                        <div>
                          <span className="font-medium text-gray-700 dark:text-gray-300">Start Date:</span>
                          <span className="ml-2 text-gray-900 dark:text-gray-100">
                            {inquiry.report.results.employment_verification.start_date}
                          </span>
                        </div>
                        {inquiry.report.results.employment_verification.end_date && (
                          <div>
                            <span className="font-medium text-gray-700 dark:text-gray-300">End Date:</span>
                            <span className="ml-2 text-gray-900 dark:text-gray-100">
                              {inquiry.report.results.employment_verification.end_date}
                            </span>
                          </div>
                        )}
                        {inquiry.report.results.employment_verification.salary && (
                          <div>
                            <span className="font-medium text-gray-700 dark:text-gray-300">Salary:</span>
                            <span className="ml-2 text-gray-900 dark:text-gray-100">
                              ${inquiry.report.results.employment_verification.salary.toLocaleString()}
                            </span>
                          </div>
                        )}
                        {inquiry.report.results.employment_verification.reason_for_leaving && (
                          <div className="md:col-span-2">
                            <span className="font-medium text-gray-700 dark:text-gray-300">Reason for Leaving:</span>
                            <span className="ml-2 text-gray-900 dark:text-gray-100">
                              {inquiry.report.results.employment_verification.reason_for_leaving}
                            </span>
                          </div>
                        )}
                        {inquiry.report.results.employment_verification.notes && (
                          <div className="md:col-span-2">
                            <span className="font-medium text-gray-700 dark:text-gray-300">Notes:</span>
                            <span className="ml-2 text-gray-900 dark:text-gray-100">
                              {inquiry.report.results.employment_verification.notes}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Criminal Background Check */}
                  {inquiry.report.results.criminal_background_check && (
                    <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-3">
                        <Shield className="h-4 w-4 text-red-600" />
                        <h3 className="font-semibold text-gray-900 dark:text-gray-100">Criminal Background Check</h3>
                        <Badge 
                          className={inquiry.report.results.criminal_background_check.verified 
                            ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-200'
                            : 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-200'
                          }
                        >
                          {inquiry.report.results.criminal_background_check.verified ? 'Verified' : 'Not Verified'}
                        </Badge>
                      </div>
                      <div className="space-y-3 text-sm">
                        <div>
                          <span className="font-medium text-gray-700 dark:text-gray-300">Has Criminal Record:</span>
                          <Badge 
                            className={inquiry.report.results.criminal_background_check.has_criminal_record 
                              ? 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-200 ml-2'
                              : 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-200 ml-2'
                            }
                          >
                            {inquiry.report.results.criminal_background_check.has_criminal_record ? 'Yes' : 'No'}
                          </Badge>
                        </div>
                        {inquiry.report.results.criminal_background_check.records && inquiry.report.results.criminal_background_check.records.length > 0 && (
                          <div>
                            <span className="font-medium text-gray-700 dark:text-gray-300">Records:</span>
                            <div className="mt-2 space-y-2">
                              {inquiry.report.results.criminal_background_check.records.map((record, index) => (
                                <div key={index} className="pl-4 border-l-2 border-gray-200 dark:border-gray-700">
                                  <div><strong>Offense:</strong> {record.offense}</div>
                                  <div><strong>Date:</strong> {record.date}</div>
                                  <div><strong>Disposition:</strong> {record.disposition}</div>
                                  <div><strong>Jurisdiction:</strong> {record.jurisdiction}</div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                        {inquiry.report.results.criminal_background_check.notes && (
                          <div>
                            <span className="font-medium text-gray-700 dark:text-gray-300">Notes:</span>
                            <span className="ml-2 text-gray-900 dark:text-gray-100">
                              {inquiry.report.results.criminal_background_check.notes}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Education Verification */}
                  {inquiry.report.results.education_verification && (
                    <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-3">
                        <FileText className="h-4 w-4 text-purple-600" />
                        <h3 className="font-semibold text-gray-900 dark:text-gray-100">Education Verification</h3>
                        <Badge 
                          className={inquiry.report.results.education_verification.verified 
                            ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-200'
                            : 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-200'
                          }
                        >
                          {inquiry.report.results.education_verification.verified ? 'Verified' : 'Not Verified'}
                        </Badge>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                        <div>
                          <span className="font-medium text-gray-700 dark:text-gray-300">Institution:</span>
                          <span className="ml-2 text-gray-900 dark:text-gray-100">
                            {inquiry.report.results.education_verification.institution}
                          </span>
                        </div>
                        <div>
                          <span className="font-medium text-gray-700 dark:text-gray-300">Degree:</span>
                          <span className="ml-2 text-gray-900 dark:text-gray-100">
                            {inquiry.report.results.education_verification.degree}
                          </span>
                        </div>
                        <div>
                          <span className="font-medium text-gray-700 dark:text-gray-300">Graduation Date:</span>
                          <span className="ml-2 text-gray-900 dark:text-gray-100">
                            {inquiry.report.results.education_verification.graduation_date}
                          </span>
                        </div>
                        {inquiry.report.results.education_verification.notes && (
                          <div className="md:col-span-2">
                            <span className="font-medium text-gray-700 dark:text-gray-300">Notes:</span>
                            <span className="ml-2 text-gray-900 dark:text-gray-100">
                              {inquiry.report.results.education_verification.notes}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
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
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default TrustiiSharedReportPage; 