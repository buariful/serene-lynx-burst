import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, CheckCircle, AlertCircle } from 'lucide-react';
import { useTrustii } from '@/hooks/useTrustii';
import { TrustiiCreateInquiryRequest } from '@/types/trustii';
import { showSuccess, showError } from '@/utils/toast';

// Form validation schema
const inquirySchema = z.object({
  first_name: z.string().min(1, 'First name is required'),
  last_name: z.string().min(1, 'Last name is required'),
  email: z.string().email('Invalid email address').optional().or(z.literal('')),
  phone: z.string().optional(),
  date_of_birth: z.string().optional(),
  address: z.object({
    street: z.string().optional(),
    city: z.string().optional(),
    state: z.string().optional(),
    postal_code: z.string().optional(),
    country: z.string().optional(),
  }).optional(),
  employment_details: z.object({
    company_name: z.string().min(1, 'Company name is required'),
    position: z.string().min(1, 'Position is required'),
    start_date: z.string().min(1, 'Start date is required'),
    end_date: z.string().optional(),
    salary: z.number().optional(),
    reason_for_leaving: z.string().optional(),
  }).optional(),
  purpose: z.string().min(1, 'Purpose is required'),
  consent: z.boolean().refine(val => val === true, 'You must consent to proceed'),
});

type InquiryFormData = z.infer<typeof inquirySchema>;

interface TrustiiInquiryFormProps {
  onSuccess?: (inquiryId: string) => void;
  onError?: (error: string) => void;
}

/**
 * Form component for creating Trustii human resources inquiries
 */
export const TrustiiInquiryForm: React.FC<TrustiiInquiryFormProps> = ({
  onSuccess,
  onError,
}) => {
  const { createInquiry, loading, error, inquiry } = useTrustii();
  const [showEmploymentDetails, setShowEmploymentDetails] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<InquiryFormData>({
    resolver: zodResolver(inquirySchema),
    defaultValues: {
      consent: false,
    },
  });

  const consent = watch('consent');

  const onSubmit = async (data: InquiryFormData) => {
    try {
      const inquiryData: TrustiiCreateInquiryRequest = {
        type: 'human_resources',
        data: {
          first_name: data.first_name,
          last_name: data.last_name,
          email: data.email || undefined,
          phone: data.phone || undefined,
          date_of_birth: data.date_of_birth || undefined,
          address: data.address?.street ? {
            street: data.address.street,
            city: data.address.city || '',
            state: data.address.state || '',
            postal_code: data.address.postal_code || '',
            country: data.address.country || '',
          } : undefined,
          employment_details: data.employment_details ? {
            company_name: data.employment_details.company_name,
            position: data.employment_details.position,
            start_date: data.employment_details.start_date,
            end_date: data.employment_details.end_date || undefined,
            salary: data.employment_details.salary || undefined,
            reason_for_leaving: data.employment_details.reason_for_leaving || undefined,
          } : undefined,
          consent: data.consent,
          purpose: data.purpose,
        },
        metadata: {
          submitted_at: new Date().toISOString(),
          source: 'web_form',
        },
      };

      await createInquiry(inquiryData);
      
      showSuccess('Inquiry created successfully!');
      onSuccess?.(inquiry?.id || '');
      
      // Reset form after successful submission
      reset();
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to create inquiry';
      showError(errorMessage);
      onError?.(errorMessage);
    }
  };

  if (inquiry) {
    return (
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-green-600" />
            Inquiry Created Successfully
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="text-sm text-gray-600">
              Your inquiry has been submitted and is being processed.
            </p>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm font-medium">Inquiry ID: {inquiry.id}</p>
              <p className="text-sm text-gray-600">Status: {inquiry.status}</p>
            </div>
            <Button
              onClick={() => window.location.reload()}
              variant="outline"
              className="w-full"
            >
              Create Another Inquiry
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Human Resources Verification Request</CardTitle>
        <p className="text-sm text-gray-600">
          Please provide the required information to initiate a background verification.
        </p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Personal Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Personal Information</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="first_name">First Name *</Label>
                <Input
                  id="first_name"
                  {...register('first_name')}
                  placeholder="Enter first name"
                />
                {errors.first_name && (
                  <p className="text-sm text-red-600 mt-1">{errors.first_name.message}</p>
                )}
              </div>

              <div>
                <Label htmlFor="last_name">Last Name *</Label>
                <Input
                  id="last_name"
                  {...register('last_name')}
                  placeholder="Enter last name"
                />
                {errors.last_name && (
                  <p className="text-sm text-red-600 mt-1">{errors.last_name.message}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  {...register('email')}
                  placeholder="Enter email address"
                />
                {errors.email && (
                  <p className="text-sm text-red-600 mt-1">{errors.email.message}</p>
                )}
              </div>

              <div>
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  {...register('phone')}
                  placeholder="Enter phone number"
                />
                {errors.phone && (
                  <p className="text-sm text-red-600 mt-1">{errors.phone.message}</p>
                )}
              </div>
            </div>

            <div>
              <Label htmlFor="date_of_birth">Date of Birth</Label>
              <Input
                id="date_of_birth"
                type="date"
                {...register('date_of_birth')}
              />
            </div>
          </div>

          {/* Address Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Address Information (Optional)</h3>
            
            <div>
              <Label htmlFor="street">Street Address</Label>
              <Input
                id="street"
                {...register('address.street')}
                placeholder="Enter street address"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="city">City</Label>
                <Input
                  id="city"
                  {...register('address.city')}
                  placeholder="Enter city"
                />
              </div>

              <div>
                <Label htmlFor="state">State/Province</Label>
                <Input
                  id="state"
                  {...register('address.state')}
                  placeholder="Enter state"
                />
              </div>

              <div>
                <Label htmlFor="postal_code">Postal Code</Label>
                <Input
                  id="postal_code"
                  {...register('address.postal_code')}
                  placeholder="Enter postal code"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="country">Country</Label>
              <Input
                id="country"
                {...register('address.country')}
                placeholder="Enter country"
              />
            </div>
          </div>

          {/* Employment Details */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium">Employment Details</h3>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setShowEmploymentDetails(!showEmploymentDetails)}
              >
                {showEmploymentDetails ? 'Hide' : 'Add'} Employment Details
              </Button>
            </div>

            {showEmploymentDetails && (
              <div className="space-y-4 p-4 border rounded-lg">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="company_name">Company Name *</Label>
                    <Input
                      id="company_name"
                      {...register('employment_details.company_name')}
                      placeholder="Enter company name"
                    />
                    {errors.employment_details?.company_name && (
                      <p className="text-sm text-red-600 mt-1">
                        {errors.employment_details.company_name.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="position">Position *</Label>
                    <Input
                      id="position"
                      {...register('employment_details.position')}
                      placeholder="Enter position"
                    />
                    {errors.employment_details?.position && (
                      <p className="text-sm text-red-600 mt-1">
                        {errors.employment_details.position.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="start_date">Start Date *</Label>
                    <Input
                      id="start_date"
                      type="date"
                      {...register('employment_details.start_date')}
                    />
                    {errors.employment_details?.start_date && (
                      <p className="text-sm text-red-600 mt-1">
                        {errors.employment_details.start_date.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="end_date">End Date</Label>
                    <Input
                      id="end_date"
                      type="date"
                      {...register('employment_details.end_date')}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="salary">Salary (Annual)</Label>
                    <Input
                      id="salary"
                      type="number"
                      {...register('employment_details.salary', { valueAsNumber: true })}
                      placeholder="Enter annual salary"
                    />
                  </div>

                  <div>
                    <Label htmlFor="reason_for_leaving">Reason for Leaving</Label>
                    <Input
                      id="reason_for_leaving"
                      {...register('employment_details.reason_for_leaving')}
                      placeholder="Enter reason for leaving"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Purpose and Consent */}
          <div className="space-y-4">
            <div>
              <Label htmlFor="purpose">Purpose of Verification *</Label>
              <Textarea
                id="purpose"
                {...register('purpose')}
                placeholder="Please describe the purpose of this verification"
                rows={3}
              />
              {errors.purpose && (
                <p className="text-sm text-red-600 mt-1">{errors.purpose.message}</p>
              )}
            </div>

            <div className="flex items-start space-x-2">
              <Checkbox
                id="consent"
                {...register('consent')}
                checked={consent}
              />
              <div className="space-y-1">
                <Label htmlFor="consent" className="text-sm">
                  I consent to the background verification process *
                </Label>
                <p className="text-xs text-gray-600">
                  By checking this box, you authorize the verification of the information provided
                  and understand that this process may include employment, education, and criminal
                  background checks as applicable.
                </p>
                {errors.consent && (
                  <p className="text-sm text-red-600">{errors.consent.message}</p>
                )}
              </div>
            </div>
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
                Creating Inquiry...
              </>
            ) : (
              'Submit Verification Request'
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}; 