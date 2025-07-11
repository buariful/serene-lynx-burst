import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Loader2, Search, AlertCircle, CheckCircle, XCircle, Clock } from 'lucide-react';
import { useTrustii } from '@/hooks/useTrustii';
import { TrustiiReport } from '@/types/trustii';
import { showError } from '@/utils/toast';

interface TrustiiInquiryRetrieverProps {
  onInquiryFound?: (inquiryId: string) => void;
}

/**
 * Component for retrieving and displaying Trustii inquiry results
 */
export const TrustiiInquiryRetriever: React.FC<TrustiiInquiryRetrieverProps> = ({
  onInquiryFound,
}) => {
  const { retrieveInquiry, loading, error, inquiry, report } = useTrustii();
  const [inquiryId, setInquiryId] = useState('');

  const handleRetrieve = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inquiryId.trim()) {
      showError('Please enter an inquiry ID');
      return;
    }

    try {
      await retrieveInquiry(inquiryId.trim());
      onInquiryFound?.(inquiryId.trim());
    } catch (err) {
      // Error is already handled by the hook
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'failed':
        return <XCircle className="h-4 w-4 text-red-600" />;
      case 'pending':
        return <Clock className="h-4 w-4 text-yellow-600" />;
      default:
        return <Clock className="h-4 w-4 text-gray-600" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge variant="default" className="bg-green-100 text-green-800">Completed</Badge>;
      case 'failed':
        return <Badge variant="destructive">Failed</Badge>;
      case 'pending':
        return <Badge variant="secondary">Pending</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  const renderReportSection = (report: TrustiiReport) => {
    const { results, summary } = report;

    return (
      <div className="space-y-6">
        {/* Summary */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              Report Summary
              {getStatusIcon(report.status)}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{summary.total_checks}</div>
                <div className="text-sm text-gray-600">Total Checks</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">{summary.passed_checks}</div>
                <div className="text-sm text-gray-600">Passed</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-red-600">{summary.failed_checks}</div>
                <div className="text-sm text-gray-600">Failed</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-600">{summary.pending_checks}</div>
                <div className="text-sm text-gray-600">Pending</div>
              </div>
            </div>
            <div className="mt-4 text-center">
              Overall Status: {getStatusBadge(summary.overall_status)}
            </div>
          </CardContent>
        </Card>

        {/* Employment Verification */}
        {results.employment_verification && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                Employment Verification
                {getStatusIcon(results.employment_verification.verified ? 'completed' : 'failed')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {results.employment_verification.company_name && (
                  <div>
                    <span className="font-medium">Company:</span> {results.employment_verification.company_name}
                  </div>
                )}
                {results.employment_verification.position && (
                  <div>
                    <span className="font-medium">Position:</span> {results.employment_verification.position}
                  </div>
                )}
                {results.employment_verification.start_date && (
                  <div>
                    <span className="font-medium">Start Date:</span> {results.employment_verification.start_date}
                  </div>
                )}
                {results.employment_verification.end_date && (
                  <div>
                    <span className="font-medium">End Date:</span> {results.employment_verification.end_date}
                  </div>
                )}
                {results.employment_verification.salary && (
                  <div>
                    <span className="font-medium">Salary:</span> ${results.employment_verification.salary.toLocaleString()}
                  </div>
                )}
                {results.employment_verification.notes && (
                  <div>
                    <span className="font-medium">Notes:</span> {results.employment_verification.notes}
                  </div>
                )}
                <div className="mt-2">
                  {getStatusBadge(results.employment_verification.verified ? 'completed' : 'failed')}
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Identity Verification */}
        {results.identity_verification && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                Identity Verification
                {getStatusIcon(results.identity_verification.verified ? 'completed' : 'failed')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {results.identity_verification.first_name && (
                  <div>
                    <span className="font-medium">First Name:</span> {results.identity_verification.first_name}
                  </div>
                )}
                {results.identity_verification.last_name && (
                  <div>
                    <span className="font-medium">Last Name:</span> {results.identity_verification.last_name}
                  </div>
                )}
                {results.identity_verification.date_of_birth && (
                  <div>
                    <span className="font-medium">Date of Birth:</span> {results.identity_verification.date_of_birth}
                  </div>
                )}
                {results.identity_verification.address && (
                  <div>
                    <span className="font-medium">Address:</span>
                    <div className="ml-4 text-sm text-gray-600">
                      {results.identity_verification.address.street}<br />
                      {results.identity_verification.address.city}, {results.identity_verification.address.state} {results.identity_verification.address.postal_code}<br />
                      {results.identity_verification.address.country}
                    </div>
                  </div>
                )}
                {results.identity_verification.notes && (
                  <div>
                    <span className="font-medium">Notes:</span> {results.identity_verification.notes}
                  </div>
                )}
                <div className="mt-2">
                  {getStatusBadge(results.identity_verification.verified ? 'completed' : 'failed')}
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Criminal Background Check */}
        {results.criminal_background_check && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                Criminal Background Check
                {getStatusIcon(results.criminal_background_check.verified ? 'completed' : 'failed')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div>
                  <span className="font-medium">Has Criminal Record:</span>
                  <Badge variant={results.criminal_background_check.has_criminal_record ? "destructive" : "default"} className="ml-2">
                    {results.criminal_background_check.has_criminal_record ? 'Yes' : 'No'}
                  </Badge>
                </div>
                {results.criminal_background_check.records && results.criminal_background_check.records.length > 0 && (
                  <div>
                    <span className="font-medium">Records:</span>
                    <div className="mt-2 space-y-2">
                      {results.criminal_background_check.records.map((record, index) => (
                        <div key={index} className="p-3 bg-gray-50 rounded-lg">
                          <div><span className="font-medium">Offense:</span> {record.offense}</div>
                          <div><span className="font-medium">Date:</span> {record.date}</div>
                          <div><span className="font-medium">Disposition:</span> {record.disposition}</div>
                          <div><span className="font-medium">Jurisdiction:</span> {record.jurisdiction}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                {results.criminal_background_check.notes && (
                  <div>
                    <span className="font-medium">Notes:</span> {results.criminal_background_check.notes}
                  </div>
                )}
                <div className="mt-2">
                  {getStatusBadge(results.criminal_background_check.verified ? 'completed' : 'failed')}
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Education Verification */}
        {results.education_verification && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                Education Verification
                {getStatusIcon(results.education_verification.verified ? 'completed' : 'failed')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {results.education_verification.institution && (
                  <div>
                    <span className="font-medium">Institution:</span> {results.education_verification.institution}
                  </div>
                )}
                {results.education_verification.degree && (
                  <div>
                    <span className="font-medium">Degree:</span> {results.education_verification.degree}
                  </div>
                )}
                {results.education_verification.graduation_date && (
                  <div>
                    <span className="font-medium">Graduation Date:</span> {results.education_verification.graduation_date}
                  </div>
                )}
                {results.education_verification.notes && (
                  <div>
                    <span className="font-medium">Notes:</span> {results.education_verification.notes}
                  </div>
                )}
                <div className="mt-2">
                  {getStatusBadge(results.education_verification.verified ? 'completed' : 'failed')}
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Search Form */}
      <Card>
        <CardHeader>
          <CardTitle>Retrieve Inquiry</CardTitle>
          <p className="text-sm text-gray-600">
            Enter an inquiry ID to retrieve the verification results.
          </p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleRetrieve} className="space-y-4">
            <div>
              <Label htmlFor="inquiry-id">Inquiry ID</Label>
              <div className="flex gap-2">
                <Input
                  id="inquiry-id"
                  value={inquiryId}
                  onChange={(e) => setInquiryId(e.target.value)}
                  placeholder="Enter inquiry ID"
                  disabled={loading}
                />
                <Button type="submit" disabled={loading || !inquiryId.trim()}>
                  {loading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Search className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Error Display */}
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {/* Inquiry Details */}
      {inquiry && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              Inquiry Details
              {getStatusIcon(inquiry.status)}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <span className="font-medium">Inquiry ID:</span> {inquiry.id}
                </div>
                <div>
                  <span className="font-medium">Status:</span> {getStatusBadge(inquiry.status)}
                </div>
                <div>
                  <span className="font-medium">Created:</span> {new Date(inquiry.created_at).toLocaleDateString()}
                </div>
                <div>
                  <span className="font-medium">Updated:</span> {new Date(inquiry.updated_at).toLocaleDateString()}
                </div>
              </div>

              <Separator />

              <div>
                <h4 className="font-medium mb-2">Personal Information</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                  <div><span className="font-medium">Name:</span> {inquiry.data.first_name} {inquiry.data.last_name}</div>
                  {inquiry.data.email && <div><span className="font-medium">Email:</span> {inquiry.data.email}</div>}
                  {inquiry.data.phone && <div><span className="font-medium">Phone:</span> {inquiry.data.phone}</div>}
                  {inquiry.data.date_of_birth && <div><span className="font-medium">DOB:</span> {inquiry.data.date_of_birth}</div>}
                </div>
              </div>

              {inquiry.data.employment_details && (
                <>
                  <Separator />
                  <div>
                    <h4 className="font-medium mb-2">Employment Details</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                      <div><span className="font-medium">Company:</span> {inquiry.data.employment_details.company_name}</div>
                      <div><span className="font-medium">Position:</span> {inquiry.data.employment_details.position}</div>
                      <div><span className="font-medium">Start Date:</span> {inquiry.data.employment_details.start_date}</div>
                      {inquiry.data.employment_details.end_date && (
                        <div><span className="font-medium">End Date:</span> {inquiry.data.employment_details.end_date}</div>
                      )}
                    </div>
                  </div>
                </>
              )}

              <Separator />

              <div>
                <h4 className="font-medium mb-2">Purpose</h4>
                <p className="text-sm">{inquiry.data.purpose}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Report Display */}
      {report && renderReportSection(report)}
    </div>
  );
}; 