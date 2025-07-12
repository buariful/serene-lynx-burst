import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { User, Shield, AlertCircle, CheckCircle } from 'lucide-react';
import { PersonalInfo, ConsentInfo } from '@/services/creditCheckService';

interface PersonalInfoFormProps {
  onComplete: (personalInfo: PersonalInfo, consent: ConsentInfo) => void;
  onBack?: () => void;
}

const PersonalInfoForm: React.FC<PersonalInfoFormProps> = ({
  onComplete,
  onBack,
}) => {
  const [formData, setFormData] = useState<PersonalInfo>({
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    ssn: '',
    email: '',
    phone: '',
    address: {
      street: '',
      city: '',
      province: '',
      postalCode: '',
      country: 'CA',
    },
  });

  const [consent, setConsent] = useState<ConsentInfo>({
    creditCheck: false,
    termsAccepted: false,
    privacyPolicyAccepted: false,
    timestamp: '',
  });

  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const provinces = [
    { code: 'AB', name: 'Alberta' },
    { code: 'BC', name: 'British Columbia' },
    { code: 'MB', name: 'Manitoba' },
    { code: 'NB', name: 'New Brunswick' },
    { code: 'NL', name: 'Newfoundland and Labrador' },
    { code: 'NS', name: 'Nova Scotia' },
    { code: 'NT', name: 'Northwest Territories' },
    { code: 'NU', name: 'Nunavut' },
    { code: 'ON', name: 'Ontario' },
    { code: 'PE', name: 'Prince Edward Island' },
    { code: 'QC', name: 'Quebec' },
    { code: 'SK', name: 'Saskatchewan' },
    { code: 'YT', name: 'Yukon' },
  ];

  const validateForm = (): boolean => {
    const errors: Record<string, string> = {};

    // Personal Information Validation
    if (!formData.firstName.trim()) {
      errors.firstName = 'First name is required';
    }

    if (!formData.lastName.trim()) {
      errors.lastName = 'Last name is required';
    }

    if (!formData.dateOfBirth) {
      errors.dateOfBirth = 'Date of birth is required';
    } else {
      const birthDate = new Date(formData.dateOfBirth);
      const today = new Date();
      const age = today.getFullYear() - birthDate.getFullYear();
      if (age < 18 || age > 120) {
        errors.dateOfBirth = 'Please enter a valid date of birth (must be 18 or older)';
      }
    }

    if (!formData.ssn.trim()) {
      errors.ssn = 'Social Security Number is required';
    } else if (!/^\d{3}-\d{2}-\d{4}$/.test(formData.ssn)) {
      errors.ssn = 'Please enter SSN in format: XXX-XX-XXXX';
    }

    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'Please enter a valid email address';
    }

    if (!formData.phone.trim()) {
      errors.phone = 'Phone number is required';
    } else if (!/^\+?1?\s?\(?[0-9]{3}\)?[-.\s]?[0-9]{3}[-.\s]?[0-9]{4}$/.test(formData.phone)) {
      errors.phone = 'Please enter a valid phone number';
    }

    // Address Validation
    if (!formData.address.street.trim()) {
      errors.street = 'Street address is required';
    }

    if (!formData.address.city.trim()) {
      errors.city = 'City is required';
    }

    if (!formData.address.province.trim()) {
      errors.province = 'Province is required';
    }

    if (!formData.address.postalCode.trim()) {
      errors.postalCode = 'Postal code is required';
    } else if (!/^[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d$/.test(formData.address.postalCode)) {
      errors.postalCode = 'Please enter a valid Canadian postal code';
    }

    // Consent Validation
    if (!consent.creditCheck) {
      errors.consent = 'You must consent to the credit check';
    }

    if (!consent.termsAccepted) {
      errors.terms = 'You must accept the terms and conditions';
    }

    if (!consent.privacyPolicyAccepted) {
      errors.privacy = 'You must accept the privacy policy';
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleInputChange = (field: keyof PersonalInfo, value: string) => {
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

  const handleAddressChange = (field: keyof PersonalInfo['address'], value: string) => {
    setFormData(prev => ({
      ...prev,
      address: {
        ...prev.address,
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

  const handleConsentChange = (field: keyof ConsentInfo, value: boolean) => {
    setConsent(prev => ({
      ...prev,
      [field]: value,
      timestamp: new Date().toISOString(),
    }));

    // Clear validation error when user changes consent
    if (validationErrors[field as string]) {
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

    setIsSubmitting(true);

    try {
      // Simulate processing delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      onComplete(formData, consent);
    } catch (error) {
      console.error('Form submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatSSN = (value: string): string => {
    const cleaned = value.replace(/\D/g, '');
    const match = cleaned.match(/^(\d{3})(\d{2})(\d{4})$/);
    if (match) {
      return `${match[1]}-${match[2]}-${match[3]}`;
    }
    return value;
  };

  const formatPhone = (value: string): string => {
    const cleaned = value.replace(/\D/g, '');
    const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
    if (match) {
      return `(${match[1]}) ${match[2]}-${match[3]}`;
    }
    return value;
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <User className="w-5 h-5" />
          Personal Information
        </CardTitle>
        <CardDescription>
          Please provide your personal information for the credit check. All information is kept secure and confidential.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Personal Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Personal Information</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="firstName">First Name *</Label>
                <Input
                  id="firstName"
                  type="text"
                  value={formData.firstName}
                  onChange={(e) => handleInputChange('firstName', e.target.value)}
                  placeholder="John"
                  className={validationErrors.firstName ? 'border-red-500' : ''}
                />
                {validationErrors.firstName && (
                  <p className="text-sm text-red-500 mt-1">{validationErrors.firstName}</p>
                )}
              </div>

              <div>
                <Label htmlFor="lastName">Last Name *</Label>
                <Input
                  id="lastName"
                  type="text"
                  value={formData.lastName}
                  onChange={(e) => handleInputChange('lastName', e.target.value)}
                  placeholder="Doe"
                  className={validationErrors.lastName ? 'border-red-500' : ''}
                />
                {validationErrors.lastName && (
                  <p className="text-sm text-red-500 mt-1">{validationErrors.lastName}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="dateOfBirth">Date of Birth *</Label>
                <Input
                  id="dateOfBirth"
                  type="date"
                  value={formData.dateOfBirth}
                  onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                  className={validationErrors.dateOfBirth ? 'border-red-500' : ''}
                />
                {validationErrors.dateOfBirth && (
                  <p className="text-sm text-red-500 mt-1">{validationErrors.dateOfBirth}</p>
                )}
              </div>

              <div>
                <Label htmlFor="ssn">Social Security Number *</Label>
                <Input
                  id="ssn"
                  type="text"
                  value={formData.ssn}
                  onChange={(e) => handleInputChange('ssn', formatSSN(e.target.value))}
                  placeholder="123-45-6789"
                  maxLength={11}
                  className={validationErrors.ssn ? 'border-red-500' : ''}
                />
                {validationErrors.ssn && (
                  <p className="text-sm text-red-500 mt-1">{validationErrors.ssn}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="email">Email Address *</Label>
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

              <div>
                <Label htmlFor="phone">Phone Number *</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', formatPhone(e.target.value))}
                  placeholder="(416) 555-0123"
                  className={validationErrors.phone ? 'border-red-500' : ''}
                />
                {validationErrors.phone && (
                  <p className="text-sm text-red-500 mt-1">{validationErrors.phone}</p>
                )}
              </div>
            </div>
          </div>

          <Separator />

          {/* Address Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Address Information</h3>
            
            <div>
              <Label htmlFor="street">Street Address *</Label>
              <Input
                id="street"
                type="text"
                value={formData.address.street}
                onChange={(e) => handleAddressChange('street', e.target.value)}
                placeholder="123 Main Street"
                className={validationErrors.street ? 'border-red-500' : ''}
              />
              {validationErrors.street && (
                <p className="text-sm text-red-500 mt-1">{validationErrors.street}</p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="city">City *</Label>
                <Input
                  id="city"
                  type="text"
                  value={formData.address.city}
                  onChange={(e) => handleAddressChange('city', e.target.value)}
                  placeholder="Toronto"
                  className={validationErrors.city ? 'border-red-500' : ''}
                />
                {validationErrors.city && (
                  <p className="text-sm text-red-500 mt-1">{validationErrors.city}</p>
                )}
              </div>

              <div>
                <Label htmlFor="province">Province *</Label>
                <Select
                  value={formData.address.province}
                  onValueChange={(value) => handleAddressChange('province', value)}
                >
                  <SelectTrigger className={validationErrors.province ? 'border-red-500' : ''}>
                    <SelectValue placeholder="Select province" />
                  </SelectTrigger>
                  <SelectContent>
                    {provinces.map((province) => (
                      <SelectItem key={province.code} value={province.code}>
                        {province.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {validationErrors.province && (
                  <p className="text-sm text-red-500 mt-1">{validationErrors.province}</p>
                )}
              </div>

              <div>
                <Label htmlFor="postalCode">Postal Code *</Label>
                <Input
                  id="postalCode"
                  type="text"
                  value={formData.address.postalCode}
                  onChange={(e) => handleAddressChange('postalCode', e.target.value.toUpperCase())}
                  placeholder="M5V 3A8"
                  className={validationErrors.postalCode ? 'border-red-500' : ''}
                />
                {validationErrors.postalCode && (
                  <p className="text-sm text-red-500 mt-1">{validationErrors.postalCode}</p>
                )}
              </div>
            </div>
          </div>

          <Separator />

          {/* Consent and Terms */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Consent and Terms</h3>
            
            <Alert>
              <Shield className="h-4 w-4" />
              <AlertDescription>
                Your personal information is protected and will only be used for the credit check process.
                We do not store your data permanently and all information is transmitted securely.
              </AlertDescription>
            </Alert>

            <div className="space-y-3">
              <div className="flex items-start space-x-2">
                <Checkbox
                  id="creditCheck"
                  checked={consent.creditCheck}
                  onCheckedChange={(checked) => handleConsentChange('creditCheck', checked as boolean)}
                />
                <div className="grid gap-1.5 leading-none">
                  <Label htmlFor="creditCheck" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    I consent to a credit check being performed *
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    I authorize the credit check and understand this will result in a credit inquiry on my credit report.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-2">
                <Checkbox
                  id="terms"
                  checked={consent.termsAccepted}
                  onCheckedChange={(checked) => handleConsentChange('termsAccepted', checked as boolean)}
                />
                <div className="grid gap-1.5 leading-none">
                  <Label htmlFor="terms" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    I accept the Terms and Conditions *
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    I have read and agree to the terms and conditions for this service.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-2">
                <Checkbox
                  id="privacy"
                  checked={consent.privacyPolicyAccepted}
                  onCheckedChange={(checked) => handleConsentChange('privacyPolicyAccepted', checked as boolean)}
                />
                <div className="grid gap-1.5 leading-none">
                  <Label htmlFor="privacy" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    I accept the Privacy Policy *
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    I have read and agree to the privacy policy regarding the handling of my personal information.
                  </p>
                </div>
              </div>
            </div>

            {/* Consent validation errors */}
            {(validationErrors.consent || validationErrors.terms || validationErrors.privacy) && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  Please accept all required consents to proceed with the credit check.
                </AlertDescription>
              </Alert>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            {onBack && (
              <Button
                type="button"
                variant="outline"
                onClick={onBack}
                disabled={isSubmitting}
                className="flex-1"
              >
                Back
              </Button>
            )}
            <Button
              type="submit"
              disabled={isSubmitting}
              className="flex-1"
            >
              {isSubmitting ? (
                <>
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Processing...
                </>
              ) : (
                <>
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Continue to Credit Check
                </>
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default PersonalInfoForm; 