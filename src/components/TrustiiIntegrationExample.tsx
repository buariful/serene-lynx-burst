import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { CheckCircle, AlertCircle, UserCheck, Clock } from 'lucide-react';
import { TrustiiInquiryForm } from './TrustiiInquiryForm';
import { TrustiiInquiryRetriever } from './TrustiiInquiryRetriever';
import { useTrustii } from '@/hooks/useTrustii';
import { useTrustiiConfig } from '@/hooks/useTrustii';
import { showSuccess, showError } from '@/utils/toast';

interface Candidate {
  id: string;
  name: string;
  email: string;
  position: string;
  trustiiInquiryId?: string;
  verificationStatus?: 'pending' | 'completed' | 'failed' | 'not_started';
}

interface TrustiiIntegrationExampleProps {
  candidate?: Candidate;
  onVerificationComplete?: (candidateId: string, inquiryId: string) => void;
}

/**
 * Example component showing how to integrate Trustii verification into existing workflows
 * This could be used in recruiter dashboards, job applications, or HR systems
 */
export const TrustiiIntegrationExample: React.FC<TrustiiIntegrationExampleProps> = ({
  candidate,
  onVerificationComplete,
}) => {
  const { isConfigured } = useTrustiiConfig();
  const [showVerificationForm, setShowVerificationForm] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [currentCandidate, setCurrentCandidate] = useState<Candidate | null>(
    candidate || {
      id: '1',
      name: 'John Doe',
      email: 'john.doe@example.com',
      position: 'Software Engineer',
      verificationStatus: 'not_started',
    }
  );

  const handleVerificationSuccess = (inquiryId: string) => {
    if (currentCandidate) {
      const updatedCandidate = {
        ...currentCandidate,
        trustiiInquiryId: inquiryId,
        verificationStatus: 'pending' as const,
      };
      setCurrentCandidate(updatedCandidate);
      onVerificationComplete?.(currentCandidate.id, inquiryId);
      setShowVerificationForm(false);
      showSuccess('Background verification initiated successfully!');
    }
  };

  const handleVerificationError = (error: string) => {
    showError(`Verification failed: ${error}`);
  };

  const getStatusIcon = (status?: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'failed':
        return <AlertCircle className="h-4 w-4 text-red-600" />;
      case 'pending':
        return <Clock className="h-4 w-4 text-yellow-600" />;
      default:
        return <UserCheck className="h-4 w-4 text-gray-600" />;
    }
  };

  const getStatusBadge = (status?: string) => {
    switch (status) {
      case 'completed':
        return <Badge variant="default" className="bg-green-100 text-green-800">Verified</Badge>;
      case 'failed':
        return <Badge variant="destructive">Failed</Badge>;
      case 'pending':
        return <Badge variant="secondary">In Progress</Badge>;
      default:
        return <Badge variant="outline">Not Started</Badge>;
    }
  };

  if (!isConfigured) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertCircle className="h-5 w-5 text-red-600" />
            Background Verification Unavailable
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              Trustii API is not configured. Please set up your API key to enable background verification.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {/* Candidate Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            Candidate Information
            {getStatusIcon(currentCandidate?.verificationStatus)}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <span className="font-medium">Name:</span> {currentCandidate?.name}
            </div>
            <div>
              <span className="font-medium">Email:</span> {currentCandidate?.email}
            </div>
            <div>
              <span className="font-medium">Position:</span> {currentCandidate?.position}
            </div>
            <div>
              <span className="font-medium">Verification Status:</span> {getStatusBadge(currentCandidate?.verificationStatus)}
            </div>
          </div>

          {currentCandidate?.trustiiInquiryId && (
            <div className="mt-4 p-3 bg-gray-50 rounded-lg">
              <span className="font-medium">Inquiry ID:</span> {currentCandidate.trustiiInquiryId}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Verification Actions */}
      <div className="flex gap-2">
        {!currentCandidate?.trustiiInquiryId ? (
          <Dialog open={showVerificationForm} onOpenChange={setShowVerificationForm}>
            <DialogTrigger asChild>
              <Button>
                <UserCheck className="mr-2 h-4 w-4" />
                Start Background Verification
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Background Verification for {currentCandidate?.name}</DialogTitle>
              </DialogHeader>
              <TrustiiInquiryForm
                onSuccess={handleVerificationSuccess}
                onError={handleVerificationError}
              />
            </DialogContent>
          </Dialog>
        ) : (
          <Dialog open={showResults} onOpenChange={setShowResults}>
            <DialogTrigger asChild>
              <Button variant="outline">
                <CheckCircle className="mr-2 h-4 w-4" />
                View Verification Results
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Verification Results for {currentCandidate?.name}</DialogTitle>
              </DialogHeader>
              <TrustiiInquiryRetriever />
            </DialogContent>
          </Dialog>
        )}

        {currentCandidate?.trustiiInquiryId && (
          <Button
            variant="outline"
            onClick={() => {
              // This would typically open a new verification form for the same candidate
              setShowVerificationForm(true);
            }}
          >
            New Verification
          </Button>
        )}
      </div>

      {/* Verification Status Summary */}
      {currentCandidate?.trustiiInquiryId && (
        <Card>
          <CardHeader>
            <CardTitle>Verification Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span>Background Check</span>
                {getStatusBadge(currentCandidate.verificationStatus)}
              </div>
              <div className="flex justify-between items-center">
                <span>Employment Verification</span>
                {getStatusBadge(currentCandidate.verificationStatus)}
              </div>
              <div className="flex justify-between items-center">
                <span>Identity Verification</span>
                {getStatusBadge(currentCandidate.verificationStatus)}
              </div>
              <div className="flex justify-between items-center">
                <span>Criminal Background</span>
                {getStatusBadge(currentCandidate.verificationStatus)}
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

/**
 * Example usage in a recruiter dashboard or job application page
 */
export const RecruiterDashboardExample: React.FC = () => {
  const [candidates, setCandidates] = useState<Candidate[]>([
    {
      id: '1',
      name: 'John Doe',
      email: 'john.doe@example.com',
      position: 'Software Engineer',
      verificationStatus: 'not_started',
    },
    {
      id: '2',
      name: 'Jane Smith',
      email: 'jane.smith@example.com',
      position: 'Product Manager',
      trustiiInquiryId: 'inq_123456789',
      verificationStatus: 'completed',
    },
    {
      id: '3',
      name: 'Bob Johnson',
      email: 'bob.johnson@example.com',
      position: 'Data Analyst',
      trustiiInquiryId: 'inq_987654321',
      verificationStatus: 'pending',
    },
  ]);

  const handleVerificationComplete = (candidateId: string, inquiryId: string) => {
    setCandidates(prev =>
      prev.map(candidate =>
        candidate.id === candidateId
          ? { ...candidate, trustiiInquiryId: inquiryId, verificationStatus: 'pending' as const }
          : candidate
      )
    );
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Candidate Verification Dashboard</h2>
      
      <div className="grid gap-4">
        {candidates.map(candidate => (
          <TrustiiIntegrationExample
            key={candidate.id}
            candidate={candidate}
            onVerificationComplete={handleVerificationComplete}
          />
        ))}
      </div>
    </div>
  );
}; 