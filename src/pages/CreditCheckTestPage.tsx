import React from 'react';
import CreditCheckWizard from '@/components/CreditCheckWizard';
import { CreditReport } from '@/services/creditCheckService';

const CreditCheckTestPage: React.FC = () => {
  const handleComplete = (report: CreditReport) => {
    console.log('Credit check completed:', report);
    alert('Credit check completed successfully! Check the console for details.');
  };

  const handleCancel = () => {
    console.log('Credit check cancelled');
    alert('Credit check was cancelled');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Credit Check Test Page
          </h1>
          <p className="text-gray-600">
            This page tests the complete credit check flow with mock data.
          </p>
          <div className="mt-4 p-4 bg-blue-50 rounded-lg">
            <h3 className="font-semibold text-blue-900 mb-2">Test Instructions:</h3>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• Complete the payment form (any card details will work)</li>
              <li>• Fill in personal information</li>
              <li>• Watch the processing progress (30 seconds)</li>
              <li>• View the generated credit report</li>
              <li>• Test download and export features</li>
            </ul>
          </div>
        </div>

        <CreditCheckWizard
          onComplete={handleComplete}
          onCancel={handleCancel}
        />
      </div>
    </div>
  );
};

export default CreditCheckTestPage; 