import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useParams, useLocation } from "react-router-dom";
import { FaMicroscope, FaFilePdf, FaDollarSign } from "react-icons/fa";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { X } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useNavigate } from "react-router-dom";
import { useTranslation } from 'react-i18next';

const DeviceDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const { toast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  const [fullscreenOpen, setFullscreenOpen] = React.useState(false);
  const { t } = useTranslation();
  
  // In a real app, fetch device details by id
  const sampleDevice = {
    id: "1",
    name: "Portable Ultrasound Machine",
    type: t('deviceDetails.deviceTypes.imaging'),
    status: t('deviceDetails.available'),
    price: "$12,000 to buy",
    specifications: [
      { label: t('deviceDetails.specLabels.display'), value: '15.6" LCD, 1920x1080' },
      { label: t('deviceDetails.specLabels.weight'), value: "3.5 kg" },
      { label: t('deviceDetails.specLabels.batteryLife'), value: "4 hours" },
      { label: t('deviceDetails.specLabels.probes'), value: "Convex, Linear, Cardiac" },
      { label: t('deviceDetails.specLabels.connectivity'), value: "WiFi, USB, DICOM" },
    ],
    description:
      "A compact, high-resolution ultrasound machine ideal for bedside diagnostics and emergency use. Provides clear imaging and supports multiple probe types.",
    usageInstructions:
      "1. Connect the desired probe. 2. Power on the device. 3. Select the imaging mode. 4. Apply gel and scan. 5. Save or export images as needed.",
    documents: [
      { name: "User Manual", url: "#" },
      { name: "CE Certificate", url: "#" },
    ],
    images: [
      "https://www.sgs.com/-/media/sgscorp/images/temporary/tablet-showing-heart-test-result.cdn.en-BD.1.jpg",
      "https://res.cloudinary.com/armis/images/f_auto,q_auto/v1706810885/images/operating-room-with-security-alert-icons-1/operating-room-with-security-alert-icons-1.jpg?_i=AA",
    ],
  };
  
  const device = sampleDevice; // Replace with fetched data
  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen px-0 sm:px-4 pb-8">
      <div className="w-full mx-auto pt-6 sm:pt-12 px-2 sm:px-0">
      {/* Image Carousel */}
      <div className="mb-6 sm:mb-8 relative">
        <Carousel className="w-full mx-auto">
          <CarouselContent>
            {device.images.map((src, idx) => (
              <CarouselItem key={src}>
                <img
                  src={src}
                  alt={`Device image ${idx + 1}`}
                  className="rounded-lg w-full h-56 sm:h-80 md:h-96 object-cover bg-white"
                  style={{ maxHeight: '60vw', minHeight: 160 }}
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="bg-blue-500 text-white left-2" />
          <CarouselNext className="bg-blue-500 text-white right-2" />
        </Carousel>
        {/* Fullscreen button */}
        <button
          className="absolute top-2 right-2 z-10 bg-white/80 hover:bg-white rounded-full p-2 shadow border border-gray-200 dark:bg-gray-800/80 dark:hover:bg-gray-800 dark:border-gray-600"
          onClick={() => setFullscreenOpen(true)}
          title={t('deviceDetails.viewFullscreen')}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6 text-blue-600 dark:text-blue-400"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 9V5.25A1.5 1.5 0 0 1 5.25 3.75H9m6 0h3.75c.828 0 1.5.672 1.5 1.5V9m0 6v3.75c0 .828-.672 1.5-1.5 1.5H15m-6 0H5.25a1.5 1.5 0 0 1-1.5-1.5V15"
            />
          </svg>
        </button>
        {/* Fullscreen Modal */}
        <Dialog open={fullscreenOpen} onOpenChange={setFullscreenOpen}>
          <DialogContent className="p-0 max-w-none w-screen h-screen flex items-center justify-center bg-black/90">
            <button
              className="absolute top-6 right-8 z-20 bg-white/80 hover:bg-white rounded-full p-2 shadow border border-gray-200 dark:bg-gray-800/80 dark:hover:bg-gray-800 dark:border-gray-600"
              onClick={() => setFullscreenOpen(false)}
              title={t('deviceDetails.closeFullscreen')}
            >
              <X className="w-7 h-7 text-blue-600 dark:text-blue-400" />
            </button>
            <div className="w-full h-full flex items-center justify-center">
              <Carousel className="w-full max-w-4xl mx-auto">
                <CarouselContent>
                  {device.images.map((src, idx) => (
                    <CarouselItem key={src}>
                      <img
                        src={src}
                        alt={`Device image ${idx + 1}`}
                        className="rounded-lg w-full max-h-[80vh] object-contain bg-black"
                        style={{ minHeight: 160 }}
                      />
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="bg-blue-600 text-white hover:bg-blue-700 left-4 top-1/2 -translate-y-1/2" />
                <CarouselNext className="bg-blue-600 text-white hover:bg-blue-700 right-4 top-1/2 -translate-y-1/2" />
              </Carousel>
            </div>
          </DialogContent>
        </Dialog>
      </div>
      <Card className="shadow-md border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-2 sm:px-6 py-4 sm:py-8">
        <CardHeader>
          <div className="flex items-center space-x-3">
            <FaMicroscope className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            <CardTitle className="text-xl font-semibold text-gray-800 dark:text-white">
              {device.name}{" "}
              <span className="ml-2 text-sm font-normal text-gray-400 dark:text-gray-500">
                ({t('deviceDetails.deviceId')}: {id})
              </span>
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-6 mt-4">
          {/* Overview */}
          <div>
            <div className="flex flex-wrap items-center gap-3 mb-2">
              <span className="text-xs px-2 py-1 rounded bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 font-semibold">
                {t('deviceDetails.available')}
              </span>
              <span className="text-xs px-2 py-1 rounded bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 font-semibold flex items-center">
                <FaDollarSign className="mr-1" /> {device.price}
              </span>
              <span className="text-xs px-2 py-1 rounded bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 font-semibold">
                {t('deviceDetails.type')}: {device.type}
              </span>
            </div>
          </div>
          {/* Specifications */}
          <div>
            <h2 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">{t('deviceDetails.specifications')}</h2>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1 text-sm text-gray-700 dark:text-gray-200">
              {device.specifications.map((spec) => (
                <li key={spec.label}>
                  <span className="font-medium">{spec.label}:</span>{" "}
                  {spec.value}
                </li>
              ))}
            </ul>
          </div>
          {/* Description */}
          <div>
            <h2 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">{t('deviceDetails.description')}</h2>
            <p className="text-gray-600 dark:text-gray-300">
              {device.description}
            </p>
          </div>
          {/* Usage Instructions */}
          <div>
            <h2 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">{t('deviceDetails.usageInstructions')}</h2>
            <p className="text-gray-600 dark:text-gray-300 whitespace-pre-line">
              {device.usageInstructions}
            </p>
          </div>
          {/* Documents */}
          <div>
            <h2 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">{t('deviceDetails.documents')}</h2>
            <ul className="space-y-1">
              {device.documents.map((doc) => (
                <li
                  key={doc.name}
                  className="flex items-center gap-2 text-blue-700 dark:text-blue-400 hover:underline cursor-pointer text-sm sm:text-base"
                >
                  <FaFilePdf className="text-red-500" />
                  <a href={doc.url} target="_blank" rel="noopener noreferrer">
                    {doc.name === "User Manual" ? t('deviceDetails.userManual') : t('deviceDetails.ceCertificate')}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          {/* Buy Button */}
          {!(location.state && location.state.hideBuy) && (
            <div className="pt-4 flex justify-end">
              <Button
                className="bg-blue-600 hover:bg-blue-700 text-white w-full sm:w-auto px-8 py-2 text-base sm:text-lg font-semibold rounded"
                onClick={async () => {
                  toast({
                    title: t('deviceDetails.purchaseSuccessful'),
                    description: t('deviceDetails.purchaseDescription'),
                    variant: "default",
                  });
                  await new Promise((res) => setTimeout(res, 2000));
                  navigate("/hospital/dashboard");
                }}
              >
                {t('deviceDetails.buy')}
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
      </div>
    </div>
  );
};

export default DeviceDetailsPage;
