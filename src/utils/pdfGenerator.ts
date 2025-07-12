import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { CreditReport } from '@/services/creditCheckService';

/**
 * Generate a comprehensive PDF from a credit report
 */
export const generateCreditReportPDF = async (
  report: CreditReport,
  elementRef: HTMLElement | null
): Promise<void> => {
  console.log('Starting PDF generation for report:', report.id);
  try {
    // Create a new PDF document
    const pdf = new jsPDF('p', 'mm', 'a4');
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    const margin = 20;
    let yPosition = 20;

    // Set default font
    pdf.setFont('helvetica');

    // ===== HEADER =====
    pdf.setFillColor(59, 130, 246); // Blue background
    pdf.rect(0, 0, pageWidth, 35, 'F');
    
    pdf.setTextColor(255, 255, 255);
    pdf.setFontSize(20);
    pdf.setFont('helvetica', 'bold');
    pdf.text('CREDIT REPORT', pageWidth / 2, 15, { align: 'center' });
    
    pdf.setFontSize(12);
    pdf.setFont('helvetica', 'normal');
    pdf.text(`Generated on ${new Date(report.createdAt).toLocaleDateString('en-CA', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })}`, pageWidth / 2, 25, { align: 'center' });

    pdf.setFontSize(10);
    pdf.text(`Report ID: ${report.id}`, pageWidth / 2, 32, { align: 'center' });

    // Reset text color and position
    pdf.setTextColor(0, 0, 0);
    yPosition = 45;

    // ===== CREDIT SCORE SECTION =====
    pdf.setFontSize(16);
    pdf.setFont('helvetica', 'bold');
    pdf.text('CREDIT SCORE', margin, yPosition);
    yPosition += 10;

    pdf.setFontSize(36);
    pdf.setTextColor(59, 130, 246);
    pdf.text(report.score.toString(), margin, yPosition);
    yPosition += 12;

    pdf.setFontSize(14);
    pdf.setTextColor(0, 0, 0);
    const scoreRangeText = report.scoreRange.charAt(0).toUpperCase() + report.scoreRange.slice(1);
    pdf.text(`Score Range: ${scoreRangeText}`, margin, yPosition);
    yPosition += 8;

    // Add score description
    const scoreDescription = getScoreDescription(report.scoreRange);
    pdf.setFontSize(10);
    pdf.setFont('helvetica', 'normal');
    const splitDescription = pdf.splitTextToSize(scoreDescription, pageWidth - 2 * margin);
    pdf.text(splitDescription, margin, yPosition);
    yPosition += splitDescription.length * 5 + 10;

    // ===== SUMMARY STATISTICS =====
    pdf.setFontSize(14);
    pdf.setFont('helvetica', 'bold');
    pdf.text('SUMMARY STATISTICS', margin, yPosition);
    yPosition += 8;

    pdf.setFontSize(11);
    pdf.setFont('helvetica', 'normal');
    pdf.text(`• Total Credit Accounts: ${report.accounts.length}`, margin, yPosition);
    yPosition += 6;
    pdf.text(`• Recent Credit Inquiries: ${report.inquiries.length}`, margin, yPosition);
    yPosition += 6;
    pdf.text(`• Public Records: ${report.publicRecords.length}`, margin, yPosition);
    yPosition += 6;
    pdf.text(`• Report Status: ${report.status}`, margin, yPosition);
    yPosition += 6;
    pdf.text(`• Report Created: ${new Date(report.createdAt).toLocaleDateString()}`, margin, yPosition);
    yPosition += 6;
    if (report.completedAt) {
      pdf.text(`• Report Completed: ${new Date(report.completedAt).toLocaleDateString()}`, margin, yPosition);
      yPosition += 6;
    }
    yPosition += 10;

    // Check if we need a new page
    if (yPosition > pageHeight - 80) {
      pdf.addPage();
      yPosition = 20;
    }

    // ===== CREDIT FACTORS =====
    if (report.factors.positive.length > 0 || report.factors.negative.length > 0) {
      pdf.setFontSize(14);
      pdf.setFont('helvetica', 'bold');
      pdf.text('CREDIT FACTORS', margin, yPosition);
      yPosition += 8;

      pdf.setFontSize(11);
      pdf.setFont('helvetica', 'normal');

      if (report.factors.positive.length > 0) {
        pdf.setTextColor(34, 197, 94); // Green
        pdf.setFont('helvetica', 'bold');
        pdf.text('✓ POSITIVE FACTORS:', margin, yPosition);
        yPosition += 6;
        
        pdf.setFont('helvetica', 'normal');
        report.factors.positive.forEach(factor => {
          pdf.text(`  • ${factor}`, margin, yPosition);
          yPosition += 5;
        });
        yPosition += 5;
      }

      if (report.factors.negative.length > 0) {
        pdf.setTextColor(239, 68, 68); // Red
        pdf.setFont('helvetica', 'bold');
        pdf.text('⚠ AREAS FOR IMPROVEMENT:', margin, yPosition);
        yPosition += 6;
        
        pdf.setFont('helvetica', 'normal');
        report.factors.negative.forEach(factor => {
          pdf.text(`  • ${factor}`, margin, yPosition);
          yPosition += 5;
        });
        yPosition += 5;
      }

      pdf.setTextColor(0, 0, 0); // Reset to black
    }

    // Check if we need a new page for accounts
    if (yPosition > pageHeight - 80) {
      pdf.addPage();
      yPosition = 20;
    }

    // ===== CREDIT ACCOUNTS =====
    if (report.accounts.length > 0) {
      pdf.setFontSize(14);
      pdf.setFont('helvetica', 'bold');
      pdf.text('CREDIT ACCOUNTS', margin, yPosition);
      yPosition += 8;

      pdf.setFontSize(11);
      pdf.setFont('helvetica', 'normal');

      report.accounts.forEach((account, index) => {
        if (yPosition > pageHeight - 60) {
          pdf.addPage();
          yPosition = 20;
        }

        // Account header
        pdf.setFont('helvetica', 'bold');
        pdf.text(`${index + 1}. ${account.type}`, margin, yPosition);
        yPosition += 6;

        // Account details
        pdf.setFont('helvetica', 'normal');
        pdf.text(`   Balance: ${formatCurrency(account.balance)}`, margin, yPosition);
        yPosition += 5;
        pdf.text(`   Credit Limit: ${formatCurrency(account.limit)}`, margin, yPosition);
        yPosition += 5;
        pdf.text(`   Status: ${account.status}`, margin, yPosition);
        yPosition += 5;
        
        const utilization = account.limit > 0 ? ((account.balance / account.limit) * 100).toFixed(1) : '0';
        pdf.text(`   Credit Utilization: ${utilization}%`, margin, yPosition);
        yPosition += 5;

        // Payment history
        pdf.text(`   Payment History: ${account.paymentHistory.join(', ')}`, margin, yPosition);
        yPosition += 8;
      });
    }

    // Check if we need a new page for inquiries
    if (yPosition > pageHeight - 80) {
      pdf.addPage();
      yPosition = 20;
    }

    // ===== RECENT INQUIRIES =====
    if (report.inquiries.length > 0) {
      pdf.setFontSize(14);
      pdf.setFont('helvetica', 'bold');
      pdf.text('RECENT CREDIT INQUIRIES', margin, yPosition);
      yPosition += 8;

      pdf.setFontSize(11);
      pdf.setFont('helvetica', 'normal');

      report.inquiries.forEach((inquiry, index) => {
        if (yPosition > pageHeight - 60) {
          pdf.addPage();
          yPosition = 20;
        }

        pdf.setFont('helvetica', 'bold');
        pdf.text(`${index + 1}. ${inquiry.company}`, margin, yPosition);
        yPosition += 5;

        pdf.setFont('helvetica', 'normal');
        pdf.text(`   Type: ${inquiry.type}`, margin, yPosition);
        yPosition += 5;
        pdf.text(`   Date: ${new Date(inquiry.date).toLocaleDateString()}`, margin, yPosition);
        yPosition += 8;
      });
    }

    // Check if we need a new page for public records
    if (yPosition > pageHeight - 80) {
      pdf.addPage();
      yPosition = 20;
    }

    // ===== PUBLIC RECORDS =====
    if (report.publicRecords.length > 0) {
      pdf.setFontSize(14);
      pdf.setFont('helvetica', 'bold');
      pdf.text('PUBLIC RECORDS', margin, yPosition);
      yPosition += 8;

      pdf.setFontSize(11);
      pdf.setFont('helvetica', 'normal');

      report.publicRecords.forEach((record, index) => {
        if (yPosition > pageHeight - 60) {
          pdf.addPage();
          yPosition = 20;
        }

        pdf.setFont('helvetica', 'bold');
        pdf.text(`${index + 1}. ${record.type}`, margin, yPosition);
        yPosition += 5;

        pdf.setFont('helvetica', 'normal');
        pdf.text(`   Date: ${new Date(record.date).toLocaleDateString()}`, margin, yPosition);
        yPosition += 5;
        pdf.text(`   Status: ${record.status}`, margin, yPosition);
        yPosition += 5;
        if (record.amount) {
          pdf.text(`   Amount: ${formatCurrency(record.amount)}`, margin, yPosition);
          yPosition += 5;
        }
        yPosition += 5;
      });
    } else {
      pdf.setFontSize(14);
      pdf.setFont('helvetica', 'bold');
      pdf.text('PUBLIC RECORDS', margin, yPosition);
      yPosition += 8;

      pdf.setFontSize(11);
      pdf.setFont('helvetica', 'normal');
      pdf.text('No public records found on this credit report.', margin, yPosition);
      yPosition += 10;
    }

    // Check if we need a new page for footer
    if (yPosition > pageHeight - 40) {
      pdf.addPage();
      yPosition = 20;
    }

    // ===== FOOTER =====
    yPosition = pageHeight - 30;
    pdf.setFontSize(8);
    pdf.setTextColor(128, 128, 128);
    pdf.setFont('helvetica', 'normal');
    
    const footerText = 'This report was generated by our secure credit check system.';
    const footerText2 = 'For questions about this report, please contact our support team.';
    const footerText3 = `Generated on ${new Date().toLocaleDateString()} at ${new Date().toLocaleTimeString()}`;
    
    pdf.text(footerText, pageWidth / 2, yPosition, { align: 'center' });
    yPosition += 4;
    pdf.text(footerText2, pageWidth / 2, yPosition, { align: 'center' });
    yPosition += 4;
    pdf.text(footerText3, pageWidth / 2, yPosition, { align: 'center' });

    // Save the PDF
    const fileName = `credit-report-${report.id}-${new Date().toISOString().split('T')[0]}.pdf`;
    console.log('Saving PDF with filename:', fileName);
    pdf.save(fileName);
    console.log('PDF saved successfully');

  } catch (error) {
    console.error('Error generating PDF:', error);
    
    // Provide more specific error messages
    if (error instanceof Error) {
      if (error.message.includes('jsPDF')) {
        throw new Error('PDF library error. Please try again.');
      } else if (error.message.includes('canvas')) {
        throw new Error('Canvas generation error. Please try again.');
      } else {
        throw new Error(`PDF generation failed: ${error.message}`);
      }
    } else {
      throw new Error('Failed to generate PDF. Please try again.');
    }
  }
};

/**
 * Generate PDF from HTML element using html2canvas
 */
export const generatePDFFromElement = async (
  elementRef: HTMLElement | null,
  fileName: string = 'credit-report.pdf'
): Promise<void> => {
  if (!elementRef) {
    throw new Error('Element reference is required for PDF generation');
  }

  try {
    // Create a clone of the element for PDF generation
    const clone = elementRef.cloneNode(true) as HTMLElement;
    clone.style.position = 'absolute';
    clone.style.left = '-9999px';
    clone.style.top = '0';
    clone.style.width = '800px'; // Fixed width for consistent rendering
    clone.style.backgroundColor = 'white';
    clone.style.color = 'black';
    
    // Remove interactive elements
    const buttons = clone.querySelectorAll('button');
    buttons.forEach(btn => btn.remove());
    
    // Remove tabs and show all content
    const tabsContent = clone.querySelectorAll('[data-state="inactive"]');
    tabsContent.forEach(tab => {
      (tab as HTMLElement).style.display = 'block';
    });

    document.body.appendChild(clone);

    // Generate canvas from the element
    const canvas = await html2canvas(clone, {
      scale: 2,
      useCORS: true,
      allowTaint: true,
      backgroundColor: '#ffffff',
      width: 800,
      height: clone.scrollHeight,
    });

    // Remove the clone
    document.body.removeChild(clone);

    // Create PDF from canvas
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    const imgWidth = pageWidth - 20; // 10mm margin on each side
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    let heightLeft = imgHeight;
    let position = 10; // Top margin

    // Add first page
    pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);
    heightLeft -= (pageHeight - 20);

    // Add additional pages if needed
    while (heightLeft >= 0) {
      position = heightLeft - imgHeight + 10;
      pdf.addPage();
      pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);
      heightLeft -= (pageHeight - 20);
    }

    // Save the PDF
    pdf.save(fileName);

  } catch (error) {
    console.error('Error generating PDF from element:', error);
    throw new Error('Failed to generate PDF. Please try again.');
  }
};

/**
 * Fallback PDF generation - simple text-based PDF
 */
export const generateSimplePDF = async (report: CreditReport): Promise<void> => {
  try {
    const pdf = new jsPDF('p', 'mm', 'a4');
    const pageWidth = pdf.internal.pageSize.getWidth();
    const margin = 20;
    let yPosition = 20;

    // Header
    pdf.setFontSize(18);
    pdf.setFont('helvetica', 'bold');
    pdf.text('Credit Report', pageWidth / 2, yPosition, { align: 'center' });
    yPosition += 15;

    // Report details
    pdf.setFontSize(12);
    pdf.setFont('helvetica', 'normal');
    pdf.text(`Report ID: ${report.id}`, margin, yPosition);
    yPosition += 8;
    pdf.text(`Generated: ${new Date(report.createdAt).toLocaleDateString()}`, margin, yPosition);
    yPosition += 15;

    // Credit score
    pdf.setFontSize(16);
    pdf.setFont('helvetica', 'bold');
    pdf.text('Credit Score', margin, yPosition);
    yPosition += 8;
    pdf.setFontSize(24);
    pdf.text(report.score.toString(), margin, yPosition);
    yPosition += 8;
    pdf.setFontSize(12);
    pdf.text(`Range: ${report.scoreRange}`, margin, yPosition);
    yPosition += 15;

    // Summary
    pdf.setFontSize(14);
    pdf.setFont('helvetica', 'bold');
    pdf.text('Summary', margin, yPosition);
    yPosition += 8;
    pdf.setFontSize(10);
    pdf.setFont('helvetica', 'normal');
    pdf.text(`Total Accounts: ${report.accounts.length}`, margin, yPosition);
    yPosition += 6;
    pdf.text(`Recent Inquiries: ${report.inquiries.length}`, margin, yPosition);
    yPosition += 6;
    pdf.text(`Public Records: ${report.publicRecords.length}`, margin, yPosition);
    yPosition += 15;

    // Factors
    if (report.factors.positive.length > 0 || report.factors.negative.length > 0) {
      pdf.setFontSize(14);
      pdf.setFont('helvetica', 'bold');
      pdf.text('Credit Factors', margin, yPosition);
      yPosition += 8;
      pdf.setFontSize(10);
      pdf.setFont('helvetica', 'normal');

      if (report.factors.positive.length > 0) {
        pdf.text('Positive Factors:', margin, yPosition);
        yPosition += 6;
        report.factors.positive.forEach(factor => {
          pdf.text(`• ${factor}`, margin + 5, yPosition);
          yPosition += 5;
        });
        yPosition += 5;
      }

      if (report.factors.negative.length > 0) {
        pdf.text('Areas for Improvement:', margin, yPosition);
        yPosition += 6;
        report.factors.negative.forEach(factor => {
          pdf.text(`• ${factor}`, margin + 5, yPosition);
          yPosition += 5;
        });
      }
    }

    // Save the PDF
    const fileName = `credit-report-${report.id}-${new Date().toISOString().split('T')[0]}.pdf`;
    pdf.save(fileName);

  } catch (error) {
    console.error('Simple PDF generation failed:', error);
    throw new Error('Failed to generate PDF. Please try again.');
  }
};

/**
 * Helper function to get score description
 */
const getScoreDescription = (range: string): string => {
  switch (range) {
    case 'excellent':
      return 'Excellent credit score. You have very good credit standing and are likely to qualify for the best rates and terms.';
    case 'good':
      return 'Good credit score. You have a solid credit history and should qualify for most credit products with favorable terms.';
    case 'fair':
      return 'Fair credit score. There is room for improvement, but you may still qualify for some credit products.';
    case 'poor':
      return 'Poor credit score. Consider working on improving your credit by paying bills on time and reducing debt.';
    default:
      return 'Credit score information not available.';
  }
};

/**
 * Helper function to format currency
 */
const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-CA', {
    style: 'currency',
    currency: 'CAD',
  }).format(amount);
};

/**
 * Test function to verify PDF generation works
 */
export const testPDFGeneration = async (): Promise<void> => {
  try {
    console.log('Testing PDF generation...');
    
    // Create a simple test PDF
    const pdf = new jsPDF('p', 'mm', 'a4');
    const pageWidth = pdf.internal.pageSize.getWidth();
    
    // Add test content
    pdf.setFont('helvetica');
    pdf.setFontSize(16);
    pdf.text('PDF Generation Test', pageWidth / 2, 20, { align: 'center' });
    
    pdf.setFontSize(12);
    pdf.text('This is a test PDF to verify that PDF generation is working correctly.', 20, 40);
    pdf.text(`Generated at: ${new Date().toLocaleString()}`, 20, 50);
    
    // Save the test PDF
    const testFileName = `test-pdf-${Date.now()}.pdf`;
    console.log('Saving test PDF:', testFileName);
    pdf.save(testFileName);
    
    console.log('Test PDF generated successfully!');
  } catch (error) {
    console.error('Test PDF generation failed:', error);
    throw error;
  }
}; 