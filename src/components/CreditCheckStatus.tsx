import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Separator } from '@/components/ui/separator';
import { 
  Clock, 
  CheckCircle, 
  AlertCircle, 
  Loader2, 
  RefreshCw,
  FileText,
  Shield,
  CreditCard
} from 'lucide-react';
import { CreditCheckStatus as StatusType } from '@/services/creditCheckService';

interface CreditCheckStatusProps {
  reportId: string;
  status: StatusType;
  onStatusUpdate: (status: StatusType) => void;
  onComplete: () => void;
  onError: (error: string) => void;
}

const CreditCheckStatus: React.FC<CreditCheckStatusProps> = ({
  reportId,
  status,
  onStatusUpdate,
  onComplete,
  onError,
}) => {
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    setLastUpdated(new Date());
  }, [status]);

  const getStatusIcon = () => {
    switch (status.status) {
      case 'completed':
        return <CheckCircle className="w-8 h-8 text-green-600" />;
      case 'failed':
        return <AlertCircle className="w-8 h-8 text-red-600" />;
      case 'processing':
        return <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />;
      default:
        return <Clock className="w-8 h-8 text-yellow-600" />;
    }
  };

  const getStatusColor = () => {
    switch (status.status) {
      case 'completed':
        return 'text-green-600';
      case 'failed':
        return 'text-red-600';
      case 'processing':
        return 'text-blue-600';
      default:
        return 'text-yellow-600';
    }
  };

  const getStatusBadge = () => {
    switch (status.status) {
      case 'completed':
        return <Badge variant="default" className="bg-green-100 text-green-800">Completed</Badge>;
      case 'failed':
        return <Badge variant="destructive">Failed</Badge>;
      case 'processing':
        return <Badge variant="secondary" className="bg-blue-100 text-blue-800">Processing</Badge>;
      default:
        return <Badge variant="outline">Pending</Badge>;
    }
  };

  const getStatusMessage = () => {
    switch (status.status) {
      case 'completed':
        return 'Your credit check has been completed successfully!';
      case 'failed':
        return 'The credit check failed. Please try again or contact support.';
      case 'processing':
        return 'We are currently processing your credit check. This usually takes 5-10 minutes.';
      default:
        return 'Your credit check request has been submitted and is waiting to be processed.';
    }
  };

  const getEstimatedTime = () => {
    if (status.estimatedCompletion) {
      const estimated = new Date(status.estimatedCompletion);
      const now = new Date();
      const diff = estimated.getTime() - now.getTime();
      
      if (diff > 0) {
        const minutes = Math.ceil(diff / (1000 * 60));
        return `${minutes} minute${minutes !== 1 ? 's' : ''}`;
      }
    }
    
    return '5-10 minutes';
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    try {
      // This would typically call the status check API
      await new Promise(resolve => setTimeout(resolve, 1000));
      // Simulate status update
      onStatusUpdate(status);
    } catch (error) {
      onError('Failed to refresh status');
    } finally {
      setIsRefreshing(false);
    }
  };

  const formatTime = (date: Date): string => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {getStatusIcon()}
            <div>
              <CardTitle className={getStatusColor()}>
                Credit Check Status
              </CardTitle>
              <CardDescription>
                Report ID: {reportId}
              </CardDescription>
            </div>
          </div>
          {getStatusBadge()}
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Status Message */}
        <Alert>
          <FileText className="h-4 w-4" />
          <AlertDescription>
            {getStatusMessage()}
          </AlertDescription>
        </Alert>

        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">Progress</span>
            <span className="text-sm text-gray-500">{status.progress}%</span>
          </div>
          <Progress value={status.progress} className="w-full" />
        </div>

        {/* Status Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Clock className="w-4 h-4" />
              <span>Estimated completion:</span>
            </div>
            <p className="font-medium">{getEstimatedTime()}</p>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <RefreshCw className="w-4 h-4" />
              <span>Last updated:</span>
            </div>
            <p className="font-medium">{formatTime(lastUpdated)}</p>
          </div>
        </div>

        <Separator />

        {/* Processing Steps */}
        <div className="space-y-4">
          <h4 className="font-semibold">Processing Steps</h4>
          <div className="space-y-3">
            <div className={`flex items-center gap-3 ${status.progress >= 20 ? 'text-green-600' : 'text-gray-400'}`}>
              <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${
                status.progress >= 20 ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400'
              }`}>
                {status.progress >= 20 ? '✓' : '1'}
              </div>
              <span className="text-sm">Request submitted</span>
            </div>

            <div className={`flex items-center gap-3 ${status.progress >= 40 ? 'text-green-600' : 'text-gray-400'}`}>
              <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${
                status.progress >= 40 ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400'
              }`}>
                {status.progress >= 40 ? '✓' : '2'}
              </div>
              <span className="text-sm">Identity verification</span>
            </div>

            <div className={`flex items-center gap-3 ${status.progress >= 60 ? 'text-green-600' : 'text-gray-400'}`}>
              <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${
                status.progress >= 60 ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400'
              }`}>
                {status.progress >= 60 ? '✓' : '3'}
              </div>
              <span className="text-sm">Credit bureau access</span>
            </div>

            <div className={`flex items-center gap-3 ${status.progress >= 80 ? 'text-green-600' : 'text-gray-400'}`}>
              <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${
                status.progress >= 80 ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400'
              }`}>
                {status.progress >= 80 ? '✓' : '4'}
              </div>
              <span className="text-sm">Report generation</span>
            </div>

            <div className={`flex items-center gap-3 ${status.progress >= 100 ? 'text-green-600' : 'text-gray-400'}`}>
              <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${
                status.progress >= 100 ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400'
              }`}>
                {status.progress >= 100 ? '✓' : '5'}
              </div>
              <span className="text-sm">Report ready</span>
            </div>
          </div>
        </div>

        <Separator />

        {/* Security Notice */}
        <Alert>
          <Shield className="h-4 w-4" />
          <AlertDescription>
            Your personal information is encrypted and secure. This credit check is performed in compliance with 
            privacy regulations and will only be used for the intended purpose.
          </AlertDescription>
        </Alert>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <Button
            onClick={handleRefresh}
            disabled={isRefreshing || status.status === 'completed' || status.status === 'failed'}
            variant="outline"
            className="flex-1"
          >
            {isRefreshing ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Refreshing...
              </>
            ) : (
              <>
                <RefreshCw className="w-4 h-4 mr-2" />
                Refresh Status
              </>
            )}
          </Button>

          {status.status === 'completed' && (
            <Button onClick={onComplete} className="flex-1">
              <FileText className="w-4 h-4 mr-2" />
              View Report
            </Button>
          )}

          {status.status === 'failed' && (
            <Button onClick={() => window.location.reload()} className="flex-1">
              <CreditCard className="w-4 h-4 mr-2" />
              Try Again
            </Button>
          )}
        </div>

        {/* Auto-refresh notice */}
        {status.status === 'processing' && (
          <p className="text-sm text-gray-500 text-center">
            Status will automatically update every 10 seconds
          </p>
        )}
      </CardContent>
    </Card>
  );
};

export default CreditCheckStatus; 