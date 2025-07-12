import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { CreditCard, Download, Share2, Printer, FileText, CheckCircle, AlertCircle, Clock } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { creditCheckService, CreditReport } from '@/services/creditCheckService';
import { toast } from 'sonner';

const CreditCheckReportPage: React.FC = () => {
  const { t } = useTranslation();
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [creditReport, setCreditReport] = useState<CreditReport | null>(null);
  const [paymentDetails, setPaymentDetails] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    name: ''
  });

  const handlePayment = async () => {
    setIsProcessing(true);
    try {
      // Process payment
      const paymentResponse = await creditCheckService.mockCreditCheck({
        cardNumber: paymentDetails.cardNumber,
        expiryDate: paymentDetails.expiryDate,
        cvv: paymentDetails.cvv,
        cardholderName: paymentDetails.name,
        amount: 90
      });

      if (!paymentResponse.success) {
        throw new Error('Payment failed');
      }

      // Initiate credit check
      const checkResponse = await creditCheckService.initiateCreditCheck(paymentResponse.transactionId!);
      
      if (!checkResponse.success) {
        throw new Error('Credit check initiation failed');
      }

      // Retrieve report
      const reportResponse = await creditCheckService.mockRetrieveReport('CR-' + Date.now());
      
      if (!reportResponse.success || !reportResponse.report) {
        throw new Error('Failed to retrieve report');
      }

      setCreditReport(reportResponse.report);
      setIsPaymentModalOpen(false);
      toast.success('Credit report generated successfully!');
    } catch (error) {
      console.error('Payment failed:', error);
      toast.error(error instanceof Error ? error.message : 'Payment failed');
    } finally {
      setIsProcessing(false);
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 750) return 'text-green-600';
    if (score >= 650) return 'text-blue-600';
    if (score >= 550) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreRangeColor = (range: string) => {
    switch (range) {
      case 'excellent': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'good': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
      case 'fair': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      case 'poor': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadPDF = () => {
    // Simulate PDF download
    const link = document.createElement('a');
    link.href = '#';
    link.download = `credit-report-${creditReport?.id}.pdf`;
    link.click();
  };

  const handleShare = () => {
    // Simulate sharing functionality
    if (navigator.share) {
      navigator.share({
        title: 'Credit Report',
        text: 'Check out my credit report',
        url: window.location.href
      });
    } else {
      // Fallback to copying link
      navigator.clipboard.writeText(window.location.href);
    }
  };

  if (!creditReport) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <Card>
            <CardHeader className="text-center">
              <CreditCard className="w-16 h-16 mx-auto text-blue-600 mb-4" />
              <CardTitle className="text-2xl">{t('creditCheck.title')}</CardTitle>
              <CardDescription>{t('creditCheck.description')}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">$90</div>
                <p className="text-gray-600 dark:text-gray-400">{t('creditCheck.oneTimePayment')}</p>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span>{t('creditCheck.features.instant')}</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span>{t('creditCheck.features.comprehensive')}</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span>{t('creditCheck.features.secure')}</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span>{t('creditCheck.features.printable')}</span>
                </div>
              </div>

              <Dialog open={isPaymentModalOpen} onOpenChange={setIsPaymentModalOpen}>
                <DialogTrigger asChild>
                  <Button className="w-full" size="lg">
                    <CreditCard className="w-4 h-4 mr-2" />
                    {t('creditCheck.getReport')}
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle>{t('creditCheck.payment.title')}</DialogTitle>
                    <DialogDescription>{t('creditCheck.payment.description')}</DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="cardNumber">{t('creditCheck.payment.cardNumber')}</Label>
                      <Input
                        id="cardNumber"
                        placeholder="1234 5678 9012 3456"
                        value={paymentDetails.cardNumber}
                        onChange={(e) => setPaymentDetails({...paymentDetails, cardNumber: e.target.value})}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="expiryDate">{t('creditCheck.payment.expiryDate')}</Label>
                        <Input
                          id="expiryDate"
                          placeholder="MM/YY"
                          value={paymentDetails.expiryDate}
                          onChange={(e) => setPaymentDetails({...paymentDetails, expiryDate: e.target.value})}
                        />
                      </div>
                      <div>
                        <Label htmlFor="cvv">{t('creditCheck.payment.cvv')}</Label>
                        <Input
                          id="cvv"
                          placeholder="123"
                          value={paymentDetails.cvv}
                          onChange={(e) => setPaymentDetails({...paymentDetails, cvv: e.target.value})}
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="name">{t('creditCheck.payment.name')}</Label>
                      <Input
                        id="name"
                        placeholder="John Doe"
                        value={paymentDetails.name}
                        onChange={(e) => setPaymentDetails({...paymentDetails, name: e.target.value})}
                      />
                    </div>
                    <Button 
                      onClick={handlePayment} 
                      className="w-full" 
                      disabled={isProcessing}
                    >
                      {isProcessing ? (
                        <>
                          <Clock className="w-4 h-4 mr-2 animate-spin" />
                          {t('creditCheck.payment.processing')}
                        </>
                      ) : (
                        <>
                          <CreditCard className="w-4 h-4 mr-2" />
                          {t('creditCheck.payment.pay')} $90
                        </>
                      )}
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">{t('creditCheck.report.title')}</h1>
            <p className="text-gray-600 dark:text-gray-400">
              {t('creditCheck.report.generated')} {new Date(creditReport.createdAt).toLocaleDateString()}
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={handlePrint}>
              <Printer className="w-4 h-4 mr-2" />
              {t('creditCheck.report.print')}
            </Button>
            <Button variant="outline" onClick={handleDownloadPDF}>
              <Download className="w-4 h-4 mr-2" />
              {t('creditCheck.report.download')}
            </Button>
            <Button variant="outline" onClick={handleShare}>
              <Share2 className="w-4 h-4 mr-2" />
              {t('creditCheck.report.share')}
            </Button>
          </div>
        </div>

        {/* Credit Score */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="w-5 h-5" />
              {t('creditCheck.report.creditScore')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center">
              <div className={`text-6xl font-bold ${getScoreColor(creditReport.score)}`}>
                {creditReport.score}
              </div>
              <Badge className={`mt-2 ${getScoreRangeColor(creditReport.scoreRange)}`}>
                {t(`creditCheck.report.scoreRanges.${creditReport.scoreRange}`)}
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* Factors */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-green-600">
                <CheckCircle className="w-5 h-5" />
                {t('creditCheck.report.positiveFactors')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {creditReport.factors.positive.map((factor, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">{factor}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-red-600">
                <AlertCircle className="w-5 h-5" />
                {t('creditCheck.report.negativeFactors')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {creditReport.factors.negative.map((factor, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 text-red-600 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">{factor}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Accounts */}
        <Card>
          <CardHeader>
            <CardTitle>{t('creditCheck.report.accounts')}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {creditReport.accounts.map((account, index) => (
                <div key={index} className="border rounded-lg p-4">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h4 className="font-semibold">{account.type}</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {t('creditCheck.report.balance')}: ${account.balance.toLocaleString()} / ${account.limit.toLocaleString()}
                      </p>
                    </div>
                    <Badge variant={account.status === 'Open' ? 'default' : 'secondary'}>
                      {account.status}
                    </Badge>
                  </div>
                  <div>
                    <p className="text-sm font-medium mb-2">{t('creditCheck.report.paymentHistory')}:</p>
                    <div className="flex gap-1">
                      {account.paymentHistory.map((payment, pIndex) => (
                        <div
                          key={pIndex}
                          className={`w-3 h-3 rounded-full text-xs flex items-center justify-center ${
                            payment === 'OK' 
                              ? 'bg-green-500 text-white' 
                              : 'bg-red-500 text-white'
                          }`}
                          title={`${t('creditCheck.report.month')} ${pIndex + 1}: ${payment}`}
                        >
                          {payment === 'OK' ? '✓' : '✗'}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Inquiries */}
        <Card>
          <CardHeader>
            <CardTitle>{t('creditCheck.report.inquiries')}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {creditReport.inquiries.map((inquiry, index) => (
                <div key={index} className="flex justify-between items-center py-2 border-b last:border-b-0">
                  <div>
                    <p className="font-medium">{inquiry.company}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{inquiry.type}</p>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {new Date(inquiry.date).toLocaleDateString()}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Public Records */}
        {creditReport.publicRecords.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>{t('creditCheck.report.publicRecords')}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {creditReport.publicRecords.map((record, index) => (
                  <div key={index} className="flex justify-between items-center py-2 border-b last:border-b-0">
                    <div>
                      <p className="font-medium">{record.type}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {record.amount && `$${record.amount.toLocaleString()}`}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {new Date(record.date).toLocaleDateString()}
                      </p>
                      <Badge variant="outline">{record.status}</Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default CreditCheckReportPage; 