import { loadStripe, Stripe } from '@stripe/stripe-js';
import { 
  shouldUseMockApis, 
  generateMockTransactionId, 
  getMockPaymentTime,
  logDev,
  logApiError
} from '@/config/development';

// Types for payment processing
export interface PaymentRequest {
  amount: number;
  currency: string;
  description: string;
  customerEmail?: string;
  metadata?: Record<string, string>;
}

export interface PaymentResponse {
  success: boolean;
  transactionId?: string;
  paymentIntentId?: string;
  amount: number;
  currency: string;
  status: 'succeeded' | 'processing' | 'requires_payment_method' | 'requires_action' | 'requires_capture' | 'canceled' | 'failed';
  error?: string;
}

export interface PaymentMethod {
  id: string;
  type: string;
  card?: {
    brand: string;
    last4: string;
    expMonth: number;
    expYear: number;
  };
}

class PaymentService {
  private stripe: Stripe | null = null;
  private publishableKey: string;

  constructor() {
    this.publishableKey = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || '';
    this.initializeStripe();
  }

  private async initializeStripe(): Promise<void> {
    if (!this.publishableKey) {
      console.warn('STRIPE_PUBLISHABLE_KEY is not set. Payment processing will not work.');
      return;
    }

    try {
      this.stripe = await loadStripe(this.publishableKey);
    } catch (error) {
      console.error('Failed to initialize Stripe:', error);
    }
  }

  /**
   * Create a payment intent for credit check
   */
  async createPaymentIntent(paymentRequest: PaymentRequest): Promise<PaymentResponse> {
    if (!this.stripe) {
      throw new Error('Stripe is not initialized');
    }

    try {
      const response = await fetch('/api/payment/create-intent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(paymentRequest),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to create payment intent');
      }

      const data = await response.json();
      return {
        success: true,
        paymentIntentId: data.paymentIntentId,
        amount: data.amount,
        currency: data.currency,
        status: data.status,
      };
    } catch (error) {
      console.error('Payment intent creation failed:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Payment failed',
        amount: paymentRequest.amount,
        currency: paymentRequest.currency,
        status: 'failed',
      };
    }
  }

  /**
   * Confirm payment with Stripe
   */
  async confirmPayment(paymentIntentId: string, paymentMethod: any): Promise<PaymentResponse> {
    if (!this.stripe) {
      throw new Error('Stripe is not initialized');
    }

    try {
      const { error, paymentIntent } = await this.stripe.confirmCardPayment(paymentIntentId, {
        payment_method: paymentMethod,
      });

      if (error) {
        return {
          success: false,
          error: error.message,
          amount: paymentIntent?.amount || 0,
          currency: paymentIntent?.currency || 'usd',
          status: 'failed',
        };
      }

      return {
        success: true,
        transactionId: paymentIntent?.id,
        paymentIntentId: paymentIntent?.id,
        amount: paymentIntent?.amount || 0,
        currency: paymentIntent?.currency || 'usd',
        status: (paymentIntent?.status as any) || 'failed',
      };
    } catch (error) {
      console.error('Payment confirmation failed:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Payment confirmation failed',
        amount: 0,
        currency: 'usd',
        status: 'failed',
      };
    }
  }

  /**
   * Mock payment for development/testing
   */
  async mockPayment(paymentRequest: PaymentRequest): Promise<PaymentResponse> {
    logDev('Processing mock payment');
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, getMockPaymentTime()));

    // Simulate payment processing with configurable success rate
    const success = Math.random() > 0.1; // 90% success rate

    if (!success) {
      logDev('Mock payment failed');
      return {
        success: false,
        error: 'Payment declined by bank',
        amount: paymentRequest.amount,
        currency: paymentRequest.currency,
        status: 'failed',
      };
    }

    const transactionId = generateMockTransactionId();
    logDev('Mock payment succeeded', { transactionId });

    return {
      success: true,
      transactionId,
      paymentIntentId: `pi_${transactionId}`,
      amount: paymentRequest.amount,
      currency: paymentRequest.currency,
      status: 'succeeded',
    };
  }

  /**
   * Get payment status
   */
  async getPaymentStatus(paymentIntentId: string): Promise<PaymentResponse> {
    try {
      const response = await fetch(`/api/payment/status/${paymentIntentId}`);
      
      if (!response.ok) {
        throw new Error('Failed to get payment status');
      }

      const data = await response.json();
      return {
        success: true,
        transactionId: data.transactionId,
        paymentIntentId: data.paymentIntentId,
        amount: data.amount,
        currency: data.currency,
        status: data.status,
      };
    } catch (error) {
      console.error('Payment status check failed:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Status check failed',
        amount: 0,
        currency: 'usd',
        status: 'failed',
      };
    }
  }

  /**
   * Validate payment amount
   */
  validatePaymentAmount(amount: number): boolean {
    return amount > 0 && amount <= 10000; // Max $10,000
  }

  /**
   * Format amount for display
   */
  formatAmount(amount: number, currency: string = 'USD'): string {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency.toUpperCase(),
    }).format(amount / 100); // Stripe amounts are in cents
  }
}

export const paymentService = new PaymentService(); 