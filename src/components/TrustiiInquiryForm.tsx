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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Loader2, CheckCircle, AlertCircle, Building2, User, Shield, CreditCard, Search, Globe, Calendar, MapPin, GraduationCap, Briefcase } from 'lucide-react';
import { useTrustii } from '@/hooks/useTrustii';
import { TrustiiCreateInquiryRequest, TrustiiService } from '@/types/trustii';
import { showSuccess, showError } from '@/utils/toast';
import { useTranslation } from 'react-i18next';

// Form validation schema
const inquirySchema = z.object({
  contactName: z.string().min(1, 'Contact name is required'),
  sender: z.string().optional(),
  customerName: z.string().optional(),
  delegatePayment: z.boolean().default(false),
  name: z.string().min(1, 'Subject name is required'),
  services: z.array(z.enum(['identity', 'credit', 'criminal_quebec', 'criminal_canada', 'online_reputation'])).min(1, 'At least one service must be selected'),
  serviceAddOns: z.array(z.string()).optional(),
  tags: z.array(z.string()).optional(),
  email: z.string().email('Invalid email address').optional().or(z.literal('')),
  phoneNumber: z.string().optional(),
  language: z.enum(['FR', 'EN'], { required_error: 'Language is required' }),
  notificationType: z.enum(['Sms', 'Email']).optional(),
  // Additional fields for specific services
  dateOfBirth: z.string().optional(),
  address: z.object({
    street: z.string().optional(),
    city: z.string().optional(),
    state: z.string().optional(),
    postalCode: z.string().optional(),
    country: z.string().optional(),
  }).optional(),
  employmentDetails: z.object({
    companyName: z.string().optional(),
    position: z.string().optional(),
    startDate: z.string().optional(),
    endDate: z.string().optional(),
    salary: z.number().optional(),
  }).optional(),
  educationDetails: z.object({
    institution: z.string().optional(),
    degree: z.string().optional(),
    graduationDate: z.string().optional(),
  }).optional(),
});

type InquiryFormData = z.infer<typeof inquirySchema>;

interface TrustiiInquiryFormProps {
  onSuccess?: (inquiryId: string) => void;
  onError?: (error: string) => void;
}

const AVAILABLE_SERVICES: { value: TrustiiService; label: string; description: string; icon: React.ReactNode }[] = [
  {
    value: 'identity',
    label: 'Identity Verification',
    description: 'Verify personal information and identity documents',
    icon: <User className="h-4 w-4" />
  },
  {
    value: 'credit',
    label: 'Credit Check',
    description: 'Comprehensive credit history and score analysis',
    icon: <CreditCard className="h-4 w-4" />
  },
  {
    value: 'criminal_quebec',
    label: 'Criminal Check (Quebec)',
    description: 'Criminal background check for Quebec jurisdiction',
    icon: <Shield className="h-4 w-4" />
  },
  {
    value: 'criminal_canada',
    label: 'Criminal Check (Canada)',
    description: 'Criminal background check for all of Canada',
    icon: <Shield className="h-4 w-4" />
  },
  {
    value: 'online_reputation',
    label: 'Online Reputation',
    description: 'Social media and online presence analysis',
    icon: <Search className="h-4 w-4" />
  },
];

/**
 * Form component for creating Trustii human resources inquiries
 */
export const TrustiiInquiryForm: React.FC<TrustiiInquiryFormProps> = ({
  onSuccess,
  onError,
}) => {
  const { t } = useTranslation();
  const { createInquiry, loading, error, inquiry } = useTrustii();
  const [selectedServices, setSelectedServices] = useState<TrustiiService[]>([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    setValue,
  } = useForm<InquiryFormData>({
    resolver: zodResolver(inquirySchema),
    defaultValues: {
      delegatePayment: false,
      services: [],
      language: 'EN',
    },
  });

  const delegatePayment = watch('delegatePayment');

  const handleServiceToggle = (service: TrustiiService) => {
    const newSelectedServices = selectedServices.includes(service)
      ? selectedServices.filter(s => s !== service)
      : [...selectedServices, service];
    
    setSelectedServices(newSelectedServices);
    setValue('services', newSelectedServices);
  };

  const onSubmit = async (data: InquiryFormData) => {
    try {
      const inquiryData: TrustiiCreateInquiryRequest = {
        contactName: data.contactName,
        sender: data.sender || undefined,
        customerName: data.customerName || undefined,
        delegatePayment: data.delegatePayment,
        name: data.name,
        services: data.services,
        serviceAddOns: data.serviceAddOns || undefined,
        tags: data.tags || undefined,
        email: data.email || undefined,
        phoneNumber: data.phoneNumber || undefined,
        language: data.language,
        notificationType: data.notificationType || undefined,
      };

      await createInquiry(inquiryData);
      
      showSuccess(t('trustii.form.inquiryCreatedSuccess'));
      onSuccess?.(inquiry?.id || '');
      
      // Reset form after successful submission
      reset();
      setSelectedServices([]);
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
            {t('trustii.form.inquiryCreatedSuccessfully')}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="text-sm text-gray-600">
              {t('trustii.form.inquirySubmittedProcessing')}
            </p>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm font-medium">{t('trustii.form.inquiryId')}: {inquiry.id}</p>
            </div>
            <Button
              onClick={() => window.location.reload()}
              variant="outline"
              className="w-full"
            >
              {t('trustii.form.createAnotherInquiry')}
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Building2 className="h-5 w-5" />
          {t('trustii.form.humanResourcesVerificationRequest')}
        </CardTitle>
        <p className="text-sm text-gray-600">
          {t('trustii.form.provideRequiredInformation')}
        </p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Contact Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium flex items-center gap-2">
              <User className="h-4 w-4" />
              Contact Information
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="contactName">Contact Name *</Label>
                <Input
                  id="contactName"
                  {...register('contactName')}
                  placeholder="Enter contact name"
                />
                {errors.contactName && (
                  <p className="text-sm text-red-600 mt-1">{errors.contactName.message}</p>
                )}
              </div>

              <div>
                <Label htmlFor="sender">Sender (Optional)</Label>
                <Input
                  id="sender"
                  {...register('sender')}
                  placeholder="Enter sender name"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="customerName">Customer Name (Optional)</Label>
              <Input
                id="customerName"
                {...register('customerName')}
                placeholder="Enter customer name"
              />
            </div>
          </div>

          {/* Subject Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium flex items-center gap-2">
              <User className="h-4 w-4" />
              Subject Information
            </h3>
            
            <div>
              <Label htmlFor="name">Subject Name *</Label>
              <Input
                id="name"
                {...register('name')}
                placeholder="Enter subject's full name"
              />
              {errors.name && (
                <p className="text-sm text-red-600 mt-1">{errors.name.message}</p>
              )}
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
                <Label htmlFor="phoneNumber">Phone Number</Label>
                <Input
                  id="phoneNumber"
                  {...register('phoneNumber')}
                  placeholder="Enter phone number"
                />
              </div>
            </div>
          </div>

          {/* Services Selection */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium flex items-center gap-2">
              <Shield className="h-4 w-4" />
              Verification Services *
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {AVAILABLE_SERVICES.map((service) => (
                <div
                  key={`service-${service.value}`}
                  className={`p-4 border rounded-lg transition-colors ${
                    selectedServices.includes(service.value)
                      ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                      : 'border-gray-200 dark:border-gray-700'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0">
                      {service.icon}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-sm">{service.label}</h4>
                      <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                        {service.description}
                      </p>
                    </div>
                    <Checkbox
                      checked={selectedServices.includes(service.value)}
                      onCheckedChange={() => handleServiceToggle(service.value)}
                      className="mt-0.5"
                    />
                  </div>
                </div>
              ))}
            </div>
            {errors.services && (
              <p className="text-sm text-red-600 mt-1">{errors.services.message}</p>
            )}
          </div>

          {/* Dynamic Service-Specific Fields */}
          {selectedServices.length > 0 && (
            <div className="space-y-6">
              {/* Identity Verification Fields */}
              {selectedServices.includes('identity') && (
                <div className="space-y-4 p-4 border border-blue-200 dark:border-blue-800 rounded-lg bg-blue-50 dark:bg-blue-900/20">
                  <h4 className="text-md font-medium flex items-center gap-2 text-blue-900 dark:text-blue-100">
                    <User className="h-4 w-4" />
                    Identity Verification Details
                  </h4>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="dateOfBirth">Date of Birth</Label>
                      <Input
                        id="dateOfBirth"
                        type="date"
                        {...register('dateOfBirth')}
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h5 className="text-sm font-medium flex items-center gap-2">
                      <MapPin className="h-3 w-3" />
                      Address Information
                    </h5>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="street">Street Address</Label>
                        <Input
                          id="street"
                          {...register('address.street')}
                          placeholder="Enter street address"
                        />
                      </div>
                      <div>
                        <Label htmlFor="city">City</Label>
                        <Input
                          id="city"
                          {...register('address.city')}
                          placeholder="Enter city"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <Label htmlFor="state">State/Province</Label>
                        <Input
                          id="state"
                          {...register('address.state')}
                          placeholder="Enter state/province"
                        />
                      </div>
                      <div>
                        <Label htmlFor="postalCode">Postal Code</Label>
                        <Input
                          id="postalCode"
                          {...register('address.postalCode')}
                          placeholder="Enter postal code"
                        />
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
                  </div>
                </div>
              )}

              {/* Employment Verification Fields */}
              {(selectedServices.includes('identity') || selectedServices.includes('credit')) && (
                <div className="space-y-4 p-4 border border-green-200 dark:border-green-800 rounded-lg bg-green-50 dark:bg-green-900/20">
                  <h4 className="text-md font-medium flex items-center gap-2 text-green-900 dark:text-green-100">
                    <Briefcase className="h-4 w-4" />
                    Employment Details
                  </h4>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="companyName">Company Name</Label>
                      <Input
                        id="companyName"
                        {...register('employmentDetails.companyName')}
                        placeholder="Enter company name"
                      />
                    </div>
                    <div>
                      <Label htmlFor="position">Position</Label>
                      <Input
                        id="position"
                        {...register('employmentDetails.position')}
                        placeholder="Enter position"
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="startDate">Start Date</Label>
                      <Input
                        id="startDate"
                        type="date"
                        {...register('employmentDetails.startDate')}
                      />
                    </div>
                    <div>
                      <Label htmlFor="endDate">End Date</Label>
                      <Input
                        id="endDate"
                        type="date"
                        {...register('employmentDetails.endDate')}
                      />
                    </div>
                    <div>
                      <Label htmlFor="salary">Annual Salary</Label>
                      <Input
                        id="salary"
                        type="number"
                        {...register('employmentDetails.salary', { valueAsNumber: true })}
                        placeholder="Enter annual salary"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Education Verification Fields */}
              {selectedServices.includes('identity') && (
                <div className="space-y-4 p-4 border border-purple-200 dark:border-purple-800 rounded-lg bg-purple-50 dark:bg-purple-900/20">
                  <h4 className="text-md font-medium flex items-center gap-2 text-purple-900 dark:text-purple-100">
                    <GraduationCap className="h-4 w-4" />
                    Education Details
                  </h4>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="institution">Institution</Label>
                      <Input
                        id="institution"
                        {...register('educationDetails.institution')}
                        placeholder="Enter institution name"
                      />
                    </div>
                    <div>
                      <Label htmlFor="degree">Degree</Label>
                      <Input
                        id="degree"
                        {...register('educationDetails.degree')}
                        placeholder="Enter degree"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="graduationDate">Graduation Date</Label>
                    <Input
                      id="graduationDate"
                      type="date"
                      {...register('educationDetails.graduationDate')}
                    />
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Configuration */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium flex items-center gap-2">
              <Globe className="h-4 w-4" />
              Configuration
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="language">Language *</Label>
                <Select 
                  value={watch('language')} 
                  onValueChange={(value) => setValue('language', value as 'FR' | 'EN')}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select language" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="EN">English</SelectItem>
                    <SelectItem value="FR">Français</SelectItem>
                  </SelectContent>
                </Select>
                {errors.language && (
                  <p className="text-sm text-red-600 mt-1">{errors.language.message}</p>
                )}
              </div>

              <div>
                <Label htmlFor="notificationType">Notification Type</Label>
                <Select 
                  value={watch('notificationType') || ''} 
                  onValueChange={(value) => setValue('notificationType', value as 'Sms' | 'Email')}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select notification type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Email">Email</SelectItem>
                    <SelectItem value="Sms">SMS</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex items-start space-x-2">
              <Checkbox
                id="delegatePayment"
                checked={delegatePayment}
                onCheckedChange={(checked) => setValue('delegatePayment', checked as boolean)}
                className="mt-1"
              />
              <Label htmlFor="delegatePayment" className="text-sm">
                Delegate Payment to Subject
                <p className="text-xs text-gray-500 mt-1">
                  Allow the subject to pay for this inquiry via credit card
                </p>
              </Label>
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
              'Create Inquiry'
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}; 