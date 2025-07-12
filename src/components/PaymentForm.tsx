import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { CreditCard, Lock, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { paymentService, PaymentRequest, PaymentResponse } from '@/services/paymentService';

interface PaymentFormProps {
  amount: number;
  currency?: string;
  description?: string;
  onPaymentSuccess: (response: PaymentResponse) => void;
  onPaymentError: (error: string) => void;
  onCancel?: () => void;
}

interface PaymentFormData {
  cardholderName: string;
  email: string;
  billingAddress: {
    line1: string;
    line2?: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
}

const PaymentForm: React.FC<PaymentFormProps> = ({
  amount,
  currency = 'CAD',
  description = 'Credit Check Report',
  onPaymentSuccess,
  onPaymentError,
  onCancel,
}) => {
  
  const [formData, setFormData] = useState<PaymentFormData>({
    cardholderName: '',
    email: '',
    billingAddress: {
      line1: '',
      line2: '',
      city: '',
      state: '',
      postalCode: '',
      country: 'CA',
    },
  });

  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentStep, setPaymentStep] = useState<'form' | 'processing' | 'success' | 'error'>('form');
  const [error, setError] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);

  // Form validation
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (paymentStep === 'processing') {
      const interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 90) return prev;
          return prev + Math.random() * 10;
        });
      }, 500);

      return () => clearInterval(interval);
    }
  }, [paymentStep]);

  const validateForm = (): boolean => {
    const errors: Record<string, string> = {};

    if (!formData.cardholderName.trim()) {
      errors.cardholderName = 'Cardholder name is required';
    }

    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'Please enter a valid email address';
    }

    if (!formData.billingAddress.line1.trim()) {
      errors.line1 = 'Address is required';
    }

    if (!formData.billingAddress.city.trim()) {
      errors.city = 'City is required';
    }

    if (!formData.billingAddress.state.trim()) {
      errors.state = 'Province/State is required';
    }

    if (!formData.billingAddress.postalCode.trim()) {
      errors.postalCode = 'Postal code is required';
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));

    // Clear validation error when user starts typing
    if (validationErrors[field]) {
      setValidationErrors(prev => ({
        ...prev,
        [field]: '',
      }));
    }
  };

  const handleAddressChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      billingAddress: {
        ...prev.billingAddress,
        [field]: value,
      },
    }));

    // Clear validation error when user starts typing
    if (validationErrors[field]) {
      setValidationErrors(prev => ({
        ...prev,
        [field]: '',
      }));
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsProcessing(true);
    setPaymentStep('processing');
    setError(null);
    setProgress(0);

    try {
      // Create payment request
      const paymentRequest: PaymentRequest = {
        amount: amount * 100, // Convert to cents
        currency: currency.toLowerCase(),
        description,
        customerEmail: formData.email,
        metadata: {
          cardholderName: formData.cardholderName,
          billingAddress: JSON.stringify(formData.billingAddress),
        },
      };

      // Process payment using mock service for development
      const paymentResponse = await paymentService.mockPayment(paymentRequest);

      if (!paymentResponse.success) {
        throw new Error(paymentResponse.error || 'Payment failed');
      }

      setProgress(100);
      setPaymentStep('success');
      onPaymentSuccess(paymentResponse);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Payment failed';
      setError(errorMessage);
      setPaymentStep('error');
      onPaymentError(errorMessage);
    } finally {
      setIsProcessing(false);
    }
  };

  const formatAmount = (amount: number, currency: string): string => {
    return new Intl.NumberFormat('en-CA', {
      style: 'currency',
      currency: currency.toUpperCase(),
    }).format(amount);
  };

  if (paymentStep === 'success') {
    return (
      <Card className="w-full max-w-md mx-auto">
        <CardContent className="pt-6">
          <div className="text-center">
            <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-green-800 mb-2">Payment Successful!</h3>
            <p className="text-gray-600 mb-4">
              Your payment of {formatAmount(amount, currency)} has been processed successfully.
            </p>
            <Badge variant="default" className="bg-green-100 text-green-800">
              Transaction Complete
            </Badge>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (paymentStep === 'error') {
    return (
      <Card className="w-full max-w-md mx-auto">
        <CardContent className="pt-6">
          <div className="text-center">
            <AlertCircle className="w-16 h-16 text-red-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-red-800 mb-2">Payment Failed</h3>
            <p className="text-gray-600 mb-4">{error}</p>
            <div className="space-y-2">
              <Button onClick={() => setPaymentStep('form')} className="w-full">
                Try Again
              </Button>
              {onCancel && (
                <Button variant="outline" onClick={onCancel} className="w-full">
                  Cancel
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (paymentStep === 'processing') {
    return (
      <Card className="w-full max-w-md mx-auto">
        <CardContent className="pt-6">
          <div className="text-center">
            <Loader2 className="w-16 h-16 text-blue-600 mx-auto mb-4 animate-spin" />
            <h3 className="text-lg font-semibold mb-2">Processing Payment</h3>
            <p className="text-gray-600 mb-4">Please wait while we process your payment...</p>
            <Progress value={progress} className="w-full mb-4" />
            <p className="text-sm text-gray-500">
              {Math.round(progress)}% complete
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CreditCard className="w-5 h-5" />
          Payment Information
        </CardTitle>
        <CardDescription>
          Secure payment powered by Stripe
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Payment Summary */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex justify-between items-center mb-2">
              <span className="font-medium">Credit Check Report</span>
              <span className="font-bold">{formatAmount(amount, currency)}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Lock className="w-4 h-4" />
              <span>Secure payment processing</span>
            </div>
          </div>

          {/* Cardholder Information */}
          <div className="space-y-4">
            <div>
              <Label htmlFor="cardholderName">Cardholder Name</Label>
              <Input
                id="cardholderName"
                type="text"
                value={formData.cardholderName}
                onChange={(e) => handleInputChange('cardholderName', e.target.value)}
                placeholder="John Doe"
                className={validationErrors.cardholderName ? 'border-red-500' : ''}
              />
              {validationErrors.cardholderName && (
                <p className="text-sm text-red-500 mt-1">{validationErrors.cardholderName}</p>
              )}
            </div>

            <div>
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                placeholder="john.doe@example.com"
                className={validationErrors.email ? 'border-red-500' : ''}
              />
              {validationErrors.email && (
                <p className="text-sm text-red-500 mt-1">{validationErrors.email}</p>
              )}
            </div>
          </div>

          <Separator />

          {/* Card Information */}
          <div className="space-y-4">
            <Label>Card Information</Label>
            <div className="border rounded-md p-3">
              <div className="space-y-3">
                <div>
                  <Label htmlFor="cardNumber" className="text-sm">Card Number</Label>
                  <Input
                    id="cardNumber"
                    type="text"
                    placeholder="1234 5678 9012 3456"
                    className="font-mono"
                    maxLength={19}
                    onChange={(e) => {
                      // Format card number with spaces
                      const value = e.target.value.replace(/\s/g, '');
                      const formatted = value.replace(/(\d{4})(?=\d)/g, '$1 ');
                      e.target.value = formatted;
                    }}
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label htmlFor="expiry" className="text-sm">Expiry Date</Label>
                    <Input
                      id="expiry"
                      type="text"
                      placeholder="MM/YY"
                      maxLength={5}
                      onChange={(e) => {
                        // Format expiry date
                        const value = e.target.value.replace(/\D/g, '');
                        if (value.length >= 2) {
                          e.target.value = value.slice(0, 2) + '/' + value.slice(2, 4);
                        } else {
                          e.target.value = value;
                        }
                      }}
                    />
                  </div>
                  <div>
                    <Label htmlFor="cvv" className="text-sm">CVV</Label>
                    <Input
                      id="cvv"
                      type="text"
                      placeholder="123"
                      maxLength={4}
                      onChange={(e) => {
                        // Only allow numbers
                        e.target.value = e.target.value.replace(/\D/g, '');
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Separator />

          {/* Billing Address */}
          <div className="space-y-4">
            <Label>Billing Address</Label>
            
            <div>
              <Label htmlFor="line1">Address Line 1</Label>
              <Input
                id="line1"
                type="text"
                value={formData.billingAddress.line1}
                onChange={(e) => handleAddressChange('line1', e.target.value)}
                placeholder="123 Main St"
                className={validationErrors.line1 ? 'border-red-500' : ''}
              />
              {validationErrors.line1 && (
                <p className="text-sm text-red-500 mt-1">{validationErrors.line1}</p>
              )}
            </div>

            <div>
              <Label htmlFor="line2">Address Line 2 (Optional)</Label>
              <Input
                id="line2"
                type="text"
                value={formData.billingAddress.line2}
                onChange={(e) => handleAddressChange('line2', e.target.value)}
                placeholder="Apt 4B"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="city">City</Label>
                <Input
                  id="city"
                  type="text"
                  value={formData.billingAddress.city}
                  onChange={(e) => handleAddressChange('city', e.target.value)}
                  placeholder="Toronto"
                  className={validationErrors.city ? 'border-red-500' : ''}
                />
                {validationErrors.city && (
                  <p className="text-sm text-red-500 mt-1">{validationErrors.city}</p>
                )}
              </div>

              <div>
                <Label htmlFor="state">Province/State</Label>
                <Input
                  id="state"
                  type="text"
                  value={formData.billingAddress.state}
                  onChange={(e) => handleAddressChange('state', e.target.value)}
                  placeholder="ON"
                  className={validationErrors.state ? 'border-red-500' : ''}
                />
                {validationErrors.state && (
                  <p className="text-sm text-red-500 mt-1">{validationErrors.state}</p>
                )}
              </div>
            </div>

            <div>
              <Label htmlFor="postalCode">Postal Code</Label>
              <Input
                id="postalCode"
                type="text"
                value={formData.billingAddress.postalCode}
                onChange={(e) => handleAddressChange('postalCode', e.target.value)}
                placeholder="M5V 3A8"
                className={validationErrors.postalCode ? 'border-red-500' : ''}
              />
              {validationErrors.postalCode && (
                <p className="text-sm text-red-500 mt-1">{validationErrors.postalCode}</p>
              )}
            </div>
          </div>

          {/* Error Display */}
          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {/* Action Buttons */}
          <div className="space-y-3">
            <Button
              type="submit"
              className="w-full"
              disabled={isProcessing}
            >
              {isProcessing ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <CreditCard className="w-4 h-4 mr-2" />
                  Pay {formatAmount(amount, currency)}
                </>
              )}
            </Button>

            {onCancel && (
              <Button
                type="button"
                variant="outline"
                onClick={onCancel}
                className="w-full"
                disabled={isProcessing}
              >
                Cancel
              </Button>
            )}
          </div>

          {/* Security Notice */}
          <div className="text-center text-sm text-gray-500">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Lock className="w-4 h-4" />
              <span>Secure payment powered by Stripe</span>
            </div>
            <p>Your payment information is encrypted and secure.</p>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default PaymentForm; 