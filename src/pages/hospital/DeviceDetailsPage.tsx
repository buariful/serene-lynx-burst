import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useParams } from "react-router-dom";
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

const sampleDevice = {
  id: "1",
  name: "Portable Ultrasound Machine",
  type: "Imaging",
  status: "Available",
  price: "$1,200/month or $12,000 to buy",
  specifications: [
    { label: "Display", value: '15.6" LCD, 1920x1080' },
    { label: "Weight", value: "3.5 kg" },
    { label: "Battery Life", value: "4 hours" },
    { label: "Probes", value: "Convex, Linear, Cardiac" },
    { label: "Connectivity", value: "WiFi, USB, DICOM" },
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

const DeviceDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [fullscreenOpen, setFullscreenOpen] = React.useState(false);
  // In a real app, fetch device details by id
  const device = sampleDevice; // Replace with fetched data
  return (
    <div className="max-w-2xl mx-auto mt-12">
      {/* Image Carousel */}
      <div className="mb-8 relative">
        <Carousel className="w-full mx-auto">
          <CarouselContent>
            {device.images.map((src, idx) => (
              <CarouselItem key={src}>
                <img
                  src={src}
                  alt={`Device image ${idx + 1}`}
                  className="rounded-lg w-full h-96 object-cover"
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="bg-blue-500 text-white left-2" />
          <CarouselNext className="bg-blue-500 text-white right-2" />
        </Carousel>
        {/* Fullscreen button */}
        <button
          className="absolute top-2 right-2 z-10 bg-white/80 hover:bg-white rounded-full p-2 shadow border border-gray-200"
          onClick={() => setFullscreenOpen(true)}
          title="View Fullscreen"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6 text-blue-600"
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
              className="absolute top-6 right-8 z-20 bg-white/80 hover:bg-white rounded-full p-2 shadow border border-gray-200"
              onClick={() => setFullscreenOpen(false)}
              title="Close Fullscreen"
            >
              <X className="w-7 h-7 text-blue-600" />
            </button>
            <div className="w-full h-full flex items-center justify-center">
              <Carousel className="w-full max-w-4xl mx-auto">
                <CarouselContent>
                  {device.images.map((src, idx) => (
                    <CarouselItem key={src}>
                      <img
                        src={src}
                        alt={`Device image ${idx + 1}`}
                        className="rounded-lg w-full h-[80vh] object-contain bg-black"
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
      <Card className="shadow-md border-slate-200 dark:border-slate-700 dark:bg-slate-800">
        <CardHeader>
          <div className="flex items-center space-x-3">
            <FaMicroscope className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            <CardTitle className="text-xl font-semibold text-slate-800 dark:text-slate-100">
              {device.name}{" "}
              <span className="ml-2 text-sm font-normal text-gray-400">
                (ID: {id})
              </span>
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-6 mt-4">
          {/* Overview */}
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="text-xs px-2 py-1 rounded bg-green-100 text-green-700 font-semibold">
                {device.status}
              </span>
              <span className="text-xs px-2 py-1 rounded bg-blue-100 text-blue-700 font-semibold flex items-center">
                <FaDollarSign className="mr-1" /> {device.price}
              </span>
              <span className="text-xs px-2 py-1 rounded bg-gray-100 text-gray-700 font-semibold">
                Type: {device.type}
              </span>
            </div>
          </div>
          {/* Specifications */}
          <div>
            <h2 className="text-lg font-semibold mb-2">Specifications</h2>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-1 text-sm text-slate-700 dark:text-slate-200">
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
            <h2 className="text-lg font-semibold mb-2">Description</h2>
            <p className="text-slate-600 dark:text-slate-300">
              {device.description}
            </p>
          </div>
          {/* Usage Instructions */}
          <div>
            <h2 className="text-lg font-semibold mb-2">Usage Instructions</h2>
            <p className="text-slate-600 dark:text-slate-300 whitespace-pre-line">
              {device.usageInstructions}
            </p>
          </div>
          {/* Documents */}
          <div>
            <h2 className="text-lg font-semibold mb-2">Documents</h2>
            <ul className="space-y-1">
              {device.documents.map((doc) => (
                <li
                  key={doc.name}
                  className="flex items-center gap-2 text-blue-700 hover:underline cursor-pointer"
                >
                  <FaFilePdf className="text-red-500" />
                  <a href={doc.url} target="_blank" rel="noopener noreferrer">
                    {doc.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          {/* Buy Button */}
          <div className="pt-4 flex justify-end">
            <Button
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-2 text-lg font-semibold rounded"
              onClick={async () => {
                toast({
                  title: "Purchase Successful!",
                  description:
                    "Thank you for your purchase. Our team will contact you soon.",
                  variant: "default",
                });
                await new Promise((res) => setTimeout(res, 2000));
                navigate("/hospital/dashboard");
              }}
            >
              Buy
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DeviceDetailsPage;
