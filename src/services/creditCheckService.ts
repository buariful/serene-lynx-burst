import { trustiiService } from './trustii';
import { paymentService, PaymentResponse } from './paymentService';
import { 
  shouldUseMockApis, 
  generateMockReportId, 
  getMockProcessingTime, 
  calculateMockProgress,
  getMockCreditScore,
  getMockScoreRange,
  logDev,
  logApiError
} from '@/config/development';

export interface CreditCheckRequest {
  cardNumber: string;
  expiryDate: string;
  cvv: string;
  cardholderName: string;
  amount: number;
}

export interface CreditCheckResponse {
  success: boolean;
  transactionId?: string;
  reportId?: string;
  status?: string;
  estimatedCompletion?: string;
  error?: string;
}

export interface CreditReport {
  id: string;
  status: 'pending' | 'completed' | 'failed';
  createdAt: string;
  completedAt?: string;
  score: number;
  scoreRange: 'excellent' | 'good' | 'fair' | 'poor';
  factors: {
    positive: string[];
    negative: string[];
  };
  accounts: {
    type: string;
    balance: number;
    limit: number;
    status: string;
    paymentHistory: string[];
  }[];
  inquiries: {
    date: string;
    company: string;
    type: string;
  }[];
  publicRecords: {
    type: string;
    date: string;
    amount?: number;
    status: string;
  }[];
}

export interface PersonalInfo {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  ssn: string;
  email: string;
  phone: string;
  address: {
    street: string;
    city: string;
    province: string;
    postalCode: string;
    country: string;
  };
}

export interface ConsentInfo {
  creditCheck: boolean;
  termsAccepted: boolean;
  privacyPolicyAccepted: boolean;
  timestamp: string;
}

export interface ReportRetrievalResponse {
  success: boolean;
  report?: CreditReport;
  error?: string;
}

export interface CreditCheckStatus {
  status: 'pending' | 'processing' | 'completed' | 'failed';
  progress: number;
  estimatedCompletion?: string;
  lastUpdated: string;
}

/**
 * Enhanced Credit Check Service with Trustii Integration
 * 
 * This service handles the complete credit check workflow:
 * 1. Payment processing
 * 2. Credit check initiation
 * 3. Status monitoring
 * 4. Report retrieval
 */
class CreditCheckService {
  private baseUrl = import.meta.env.VITE_API_URL || 'https://api.Scrubhub.ca';
  private apiKey = import.meta.env.VITE_API_KEY || '';
  private useApiKey = import.meta.env.VITE_USE_API_KEY === 'true';
  private pollingInterval: NodeJS.Timeout | null = null;

  /**
   * Get authentication headers
   */
  private getAuthHeaders(): Record<string, string> {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };

    if (this.useApiKey && this.apiKey) {
      headers['X-API-Key'] = this.apiKey;
    } else {
      const token = localStorage.getItem('authToken') || sessionStorage.getItem('authToken');
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
      }
    }

    return headers;
  }

  /**
   * Process payment for credit check using Stripe
   */
  async processPayment(paymentData: CreditCheckRequest): Promise<PaymentResponse> {
    try {
      const paymentRequest = {
        amount: paymentData.amount * 100, // Convert to cents for Stripe
        currency: 'CAD',
        description: 'Credit Check Report',
        customerEmail: '', // Will be filled from personal info
        metadata: {
          service: 'credit_check',
          amount: paymentData.amount.toString(),
        },
      };

      // Use mock payment for development
      if (import.meta.env.DEV) {
        return await paymentService.mockPayment(paymentRequest);
      }

      // Create payment intent
      const paymentIntent = await paymentService.createPaymentIntent(paymentRequest);
      
      if (!paymentIntent.success) {
        throw new Error(paymentIntent.error || 'Payment failed');
      }

      // Confirm payment with card details
      const paymentMethod = {
        type: 'card',
        card: {
          number: paymentData.cardNumber,
          exp_month: parseInt(paymentData.expiryDate.split('/')[0]),
          exp_year: parseInt('20' + paymentData.expiryDate.split('/')[1]),
          cvc: paymentData.cvv,
        },
        billing_details: {
          name: paymentData.cardholderName,
        },
      };

      return await paymentService.confirmPayment(paymentIntent.paymentIntentId!, paymentMethod);
    } catch (error) {
      console.error('Payment processing error:', error);
      throw error;
    }
  }

  /**
   * Initiate credit check after successful payment
   */
  async initiateCreditCheck(
    transactionId: string, 
    personalInfo: PersonalInfo,
    consent: ConsentInfo
  ): Promise<CreditCheckResponse> {
    try {
      // Use mock credit check for development to avoid CORS issues
      if (shouldUseMockApis()) {
        logDev('Initiating mock credit check');
        
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        const mockReportId = generateMockReportId();
        
        return {
          success: true,
          reportId: mockReportId,
          status: 'pending',
          estimatedCompletion: new Date(Date.now() + getMockProcessingTime()).toISOString(),
        };
      }

      // Production code - only runs if not in development
      const trustiiRequest = {
        type: 'credit_check' as any,
        data: {
          first_name: personalInfo.firstName,
          last_name: personalInfo.lastName,
          email: personalInfo.email,
          phone: personalInfo.phone,
          date_of_birth: personalInfo.dateOfBirth,
          ssn: personalInfo.ssn,
          address: {
            street: personalInfo.address.street,
            city: personalInfo.address.city,
            state: personalInfo.address.province,
            postal_code: personalInfo.address.postalCode,
            country: personalInfo.address.country,
          },
          consent: consent.creditCheck,
          purpose: 'Credit check for rental application',
        },
        metadata: {
          transactionId,
          consentTimestamp: consent.timestamp,
          termsAccepted: consent.termsAccepted.toString(),
          privacyPolicyAccepted: consent.privacyPolicyAccepted.toString(),
        },
      };

      const inquiry = await trustiiService.createInquiry(trustiiRequest);
      
      return {
        success: true,
        reportId: inquiry.id,
        status: 'pending',
        estimatedCompletion: new Date(Date.now() + 5 * 60 * 1000).toISOString(), // 5 minutes
      };
    } catch (error) {
      logApiError(error, 'Credit check initiation');
      
      // If there's a CORS or API error, fall back to mock data
      if (shouldUseMockApis()) {
        logDev('Falling back to mock credit check due to API error');
        
        const mockReportId = generateMockReportId();
        
        return {
          success: true,
          reportId: mockReportId,
          status: 'pending',
          estimatedCompletion: new Date(Date.now() + getMockProcessingTime()).toISOString(),
        };
      }
      
      throw error;
    }
  }

  /**
   * Check credit check status with polling
   */
  async checkReportStatus(reportId: string): Promise<CreditCheckStatus> {
    try {
      // Use mock status checking for development to avoid CORS issues
      if (shouldUseMockApis()) {
        logDev('Checking mock credit check status');
        
        // Simulate progressive status updates
        const reportAge = Date.now() - parseInt(reportId.split('-')[1]);
        const maxProcessingTime = getMockProcessingTime();
        const progress = calculateMockProgress(parseInt(reportId.split('-')[1]));
        
        let status: CreditCheckStatus['status'] = 'pending';
        
        if (progress >= 100) {
          status = 'completed';
        } else if (progress >= 50) {
          status = 'processing';
        } else {
          status = 'pending';
        }
        
        logDev('Status update', { status, progress, reportAge, maxProcessingTime });
        
        return {
          status,
          progress: Math.round(progress),
          estimatedCompletion: new Date(Date.now() + (maxProcessingTime - reportAge)).toISOString(),
          lastUpdated: new Date().toISOString(),
        };
      }

      // Production code - only runs if not in development
      const inquiry = await trustiiService.retrieveInquiry(reportId);
      
      let status: CreditCheckStatus['status'] = 'pending';
      let progress = 0;

      switch (inquiry.status) {
        case 'completed':
          status = 'completed';
          progress = 100;
          break;
        case 'failed':
          status = 'failed';
          progress = 0;
          break;
        case 'pending':
          status = 'processing';
          progress = 50; // Estimate progress
          break;
        default:
          status = 'pending';
          progress = 25;
      }

      return {
        status,
        progress,
        estimatedCompletion: (inquiry as any).estimated_completion,
        lastUpdated: new Date().toISOString(),
      };
    } catch (error) {
      logApiError(error, 'Status check');
      
      // If there's a CORS or API error, fall back to mock data
      if (shouldUseMockApis()) {
        logDev('Falling back to mock status check due to API error');
        
        // Return a completed status to avoid infinite errors
        return {
          status: 'completed',
          progress: 100,
          estimatedCompletion: new Date().toISOString(),
          lastUpdated: new Date().toISOString(),
        };
      }
      
      throw error;
    }
  }

  /**
   * Start polling for credit check status
   */
  startStatusPolling(
    reportId: string, 
    onStatusUpdate: (status: CreditCheckStatus) => void,
    onComplete: (report: CreditReport) => void,
    onError: (error: string) => void
  ): void {
    this.stopStatusPolling(); // Clear any existing polling

    this.pollingInterval = setInterval(async () => {
      try {
        const status = await this.checkReportStatus(reportId);
        onStatusUpdate(status);

        if (status.status === 'completed') {
          this.stopStatusPolling();
          const report = await this.retrieveReport(reportId);
          if (report.success && report.report) {
            onComplete(report.report);
          } else {
            onError(report.error || 'Failed to retrieve report');
          }
        } else if (status.status === 'failed') {
          this.stopStatusPolling();
          onError('Credit check failed');
        }
      } catch (error) {
        console.error('Polling error:', error);
        onError(error instanceof Error ? error.message : 'Status check failed');
      }
    }, 5000); // Poll every 5 seconds for faster updates
  }

  /**
   * Stop status polling
   */
  stopStatusPolling(): void {
    if (this.pollingInterval) {
      clearInterval(this.pollingInterval);
      this.pollingInterval = null;
    }
  }

  /**
   * Retrieve credit report
   */
  async retrieveReport(reportId: string): Promise<ReportRetrievalResponse> {
    try {
      // Use mock report retrieval for development to avoid CORS issues
      if (shouldUseMockApis()) {
        logDev('Retrieving mock credit report');
        
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Return mock report data
        const mockScore = getMockCreditScore();
        const mockReport: CreditReport = {
          id: reportId,
          status: 'completed',
          createdAt: new Date(Date.now() - getMockProcessingTime()).toISOString(),
          completedAt: new Date().toISOString(),
          score: mockScore,
          scoreRange: getMockScoreRange(mockScore) as 'excellent' | 'good' | 'fair' | 'poor',
          factors: {
            positive: [
              'No late payments in the last 24 months',
              'Low credit utilization ratio',
              'Long credit history',
            ],
            negative: [
              'Recent credit inquiry',
              'Limited credit mix',
            ],
          },
          accounts: [
            {
              type: 'Credit Card',
              balance: 2500,
              limit: 10000,
              status: 'Open',
              paymentHistory: ['OK', 'OK', 'OK', 'OK', 'OK', 'OK', 'OK', 'OK', 'OK', 'OK', 'OK', 'OK'],
            },
            {
              type: 'Personal Loan',
              balance: 5000,
              limit: 15000,
              status: 'Open',
              paymentHistory: ['OK', 'OK', 'OK', 'OK', 'OK', 'OK', 'OK', 'OK', 'OK', 'OK', 'OK', 'OK'],
            },
          ],
          inquiries: [
            {
              date: '2024-01-15',
              company: 'ABC Bank',
              type: 'Credit Application',
            },
          ],
          publicRecords: [],
        };

        return {
          success: true,
          report: mockReport,
        };
      }

      // Production code - only runs if not in development
      const inquiry = await trustiiService.retrieveInquiry(reportId);
      
      if (inquiry.status !== 'completed') {
        throw new Error('Report is not yet completed');
      }

      // Transform Trustii response to our CreditReport format
      const report: CreditReport = {
        id: inquiry.id,
        status: inquiry.status,
        createdAt: inquiry.created_at,
        completedAt: inquiry.updated_at,
        score: this.calculateCreditScore(inquiry),
        scoreRange: this.getScoreRange(this.calculateCreditScore(inquiry)),
        factors: this.extractCreditFactors(inquiry),
        accounts: this.extractAccountInformation(inquiry),
        inquiries: this.extractInquiries(inquiry),
        publicRecords: this.extractPublicRecords(inquiry),
      };

      return {
        success: true,
        report,
      };
    } catch (error) {
      logApiError(error, 'Report retrieval');
      
      // If there's a CORS or API error, fall back to mock data
      if (shouldUseMockApis()) {
        logDev('Falling back to mock report retrieval due to API error');
        
        // Return mock report data as fallback
        const mockScore = getMockCreditScore();
        const mockReport: CreditReport = {
          id: reportId,
          status: 'completed',
          createdAt: new Date(Date.now() - getMockProcessingTime()).toISOString(),
          completedAt: new Date().toISOString(),
          score: mockScore,
          scoreRange: getMockScoreRange(mockScore) as 'excellent' | 'good' | 'fair' | 'poor',
          factors: {
            positive: ['Good payment history', 'Low credit utilization'],
            negative: ['Recent inquiry'],
          },
          accounts: [
            {
              type: 'Credit Card',
              balance: 2500,
              limit: 10000,
              status: 'Open',
              paymentHistory: ['OK', 'OK', 'OK', 'OK', 'OK', 'OK', 'OK', 'OK', 'OK', 'OK', 'OK', 'OK'],
            },
          ],
          inquiries: [
            {
              date: '2024-01-15',
              company: 'ABC Bank',
              type: 'Credit Application',
            },
          ],
          publicRecords: [],
        };

        return {
          success: true,
          report: mockReport,
        };
      }
      
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to retrieve report',
      };
    }
  }

  /**
   * Calculate credit score from Trustii data
   */
  private calculateCreditScore(inquiry: any): number {
    // This is a simplified calculation - in real implementation,
    // this would be based on actual credit bureau data
    let score = 700; // Base score

    // Adjust based on various factors
    if (inquiry.results?.credit_history?.payment_history) {
      const paymentHistory = inquiry.results.credit_history.payment_history;
      const onTimePayments = paymentHistory.filter((p: any) => p.status === 'on_time').length;
      const totalPayments = paymentHistory.length;
      
      if (totalPayments > 0) {
        const onTimePercentage = onTimePayments / totalPayments;
        score += Math.floor(onTimePercentage * 100);
      }
    }

    // Ensure score is within valid range
    return Math.max(300, Math.min(850, score));
  }

  /**
   * Get score range based on score
   */
  private getScoreRange(score: number): 'excellent' | 'good' | 'fair' | 'poor' {
    if (score >= 750) return 'excellent';
    if (score >= 650) return 'good';
    if (score >= 550) return 'fair';
    return 'poor';
  }

  /**
   * Extract credit factors from Trustii response
   */
  private extractCreditFactors(inquiry: any): { positive: string[]; negative: string[] } {
    const positive: string[] = [];
    const negative: string[] = [];

    // Add factors based on Trustii data
    if (inquiry.results?.credit_history?.accounts) {
      const accounts = inquiry.results.credit_history.accounts;
      const totalAccounts = accounts.length;
      const openAccounts = accounts.filter((a: any) => a.status === 'open').length;

      if (openAccounts > 0) {
        positive.push(`${openAccounts} active credit accounts`);
      }

      if (totalAccounts > 0) {
        const utilization = accounts.reduce((sum: number, a: any) => sum + (a.balance || 0), 0) / 
                          accounts.reduce((sum: number, a: any) => sum + (a.limit || 1), 0);
        
        if (utilization < 0.3) {
          positive.push('Low credit utilization ratio');
        } else if (utilization > 0.7) {
          negative.push('High credit utilization ratio');
        }
      }
    }

    return { positive, negative };
  }

  /**
   * Extract account information from Trustii response
   */
  private extractAccountInformation(inquiry: any): CreditReport['accounts'] {
    const accounts: CreditReport['accounts'] = [];

    if (inquiry.results?.credit_history?.accounts) {
      inquiry.results.credit_history.accounts.forEach((account: any) => {
        accounts.push({
          type: account.type || 'Credit Account',
          balance: account.balance || 0,
          limit: account.limit || 0,
          status: account.status || 'Unknown',
          paymentHistory: account.payment_history?.map((p: any) => p.status) || [],
        });
      });
    }

    return accounts;
  }

  /**
   * Extract inquiries from Trustii response
   */
  private extractInquiries(inquiry: any): CreditReport['inquiries'] {
    const inquiries: CreditReport['inquiries'] = [];

    if (inquiry.results?.credit_history?.inquiries) {
      inquiry.results.credit_history.inquiries.forEach((inquiry: any) => {
        inquiries.push({
          date: inquiry.date,
          company: inquiry.company,
          type: inquiry.type,
        });
      });
    }

    return inquiries;
  }

  /**
   * Extract public records from Trustii response
   */
  private extractPublicRecords(inquiry: any): CreditReport['publicRecords'] {
    const records: CreditReport['publicRecords'] = [];

    if (inquiry.results?.public_records) {
      inquiry.results.public_records.forEach((record: any) => {
        records.push({
          type: record.type,
          date: record.date,
          amount: record.amount,
          status: record.status,
        });
      });
    }

    return records;
  }

  /**
   * Mock implementation for development/testing
   */
  async mockCreditCheck(paymentData: CreditCheckRequest): Promise<CreditCheckResponse> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Simulate payment processing
    if (paymentData.cardNumber.length < 16) {
      throw new Error('Invalid card number');
    }

    return {
      success: true,
      transactionId: `txn_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    };
  }

  /**
   * Mock report retrieval for development
   */
  async mockRetrieveReport(reportId: string): Promise<ReportRetrievalResponse> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    const mockReport: CreditReport = {
      id: reportId,
      status: 'completed',
      createdAt: new Date().toISOString(),
      completedAt: new Date().toISOString(),
      score: Math.floor(Math.random() * 300) + 550, // Random score between 550-850
      scoreRange: 'good',
      factors: {
        positive: [
          'No late payments in the last 24 months',
          'Low credit utilization ratio',
          'Long credit history',
        ],
        negative: [
          'Recent credit inquiry',
          'Limited credit mix',
        ],
      },
      accounts: [
        {
          type: 'Credit Card',
          balance: 2500,
          limit: 10000,
          status: 'Open',
          paymentHistory: ['OK', 'OK', 'OK', 'OK', 'OK', 'OK', 'OK', 'OK', 'OK', 'OK', 'OK', 'OK'],
        },
        {
          type: 'Personal Loan',
          balance: 5000,
          limit: 15000,
          status: 'Open',
          paymentHistory: ['OK', 'OK', 'OK', 'OK', 'OK', 'OK', 'OK', 'OK', 'OK', 'OK', 'OK', 'OK'],
        },
      ],
      inquiries: [
        {
          date: '2024-01-15',
          company: 'ABC Bank',
          type: 'Credit Application',
        },
      ],
      publicRecords: [],
    };

    return {
      success: true,
      report: mockReport,
    };
  }
}

export const creditCheckService = new CreditCheckService(); 