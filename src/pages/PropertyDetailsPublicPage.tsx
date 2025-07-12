import React from "react";
import { BiBed } from "react-icons/bi";
import { LuBath } from "react-icons/lu";
import { MdPets } from "react-icons/md";
import { TbParking } from "react-icons/tb";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";
import { CityMapNoMarker } from "@/components/ui/cityMap";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { showSuccess } from "@/utils/toast";
import { X } from "lucide-react";
import { useTranslation } from 'react-i18next';

const propertyMetaData = [
  { label: "2 Bed", icon: BiBed },
  { label: "2 Bath", icon: LuBath },
  { label: "Pets", icon: LuBath },
  { label: "700 FT²", icon: MdPets },
  { label: "Garage", icon: TbParking },
];

export default function PropertyDetailsPublicPage() {
  // Modal state
  const [open, setOpen] = React.useState(false);
  const [fullscreenOpen, setFullscreenOpen] = React.useState(false);
  const { t } = useTranslation();

  // Dummy property summary
  const propertySummary =
    "This modern 2-bedroom, 2-bath apartment offers 700 sq ft of comfortable living space, featuring a secure building, convenient garage parking, and a range of amenities including a pool and bike room. Utilities such as water and heating are included for your convenience.";

  // Dummy contact info
  const phone = "(555) 123-4567";
  const email = "info@property.com";
  const address = "31 Tippett Road - North York, ON";

  // const images = [1, 2, 3, 4, 5].map(
  //   (num) => `https://picsum.photos/seed/property${num}/800/500`
  // );

  const images = [
    "https://n-ep-sbh-aws-assets-prod-bfgkcubph2fde6f8.z03.azurefd.net/listing-images/Processed/l074388_4582a2bb-df43-4000-974f-f7f178b69687_11202021033343PM.jpeg",
    "https://www.narcity.com/media-library/a-row-of-homes-in-kingston-ontario.jpg?id=34794961&width=1245&height=700&coordinates=45%2C0%2C45%2C0",
    "https://www.squareyards.ca/blog/wp-content/uploads/2022/05/Rental-House-in-Canada.jpg",
  ];

  const handleConfirm = () => {
    setOpen(false);
    showSuccess(
      t('propertyDetails.bookingConfirmed')
    );
  };

  return (
    <div className="max-w-7xl mx-auto pb-10">
      {/* top header */}
      <div className="px-10 py-3 border-b bordet-t flex items-center justify-between">
        <div>
          <div className="flex items-end gap-3 mb-2">
            <h3 className="text-blue-500 text-2xl font-bold">$2400</h3>
            <h4 className="text-xl font-medium text-gray-700">Condo</h4>
            <p className="text-gray-700">1 Day ago</p>
          </div>
          <div>
            <p className="text-gray-700">31 Tippett Road - North York, ON</p>
          </div>
        </div>

        <div className="flex items-center gap-5">
          {propertyMetaData?.map((item, index) => (
            <div key={index} className="flex items-center gap-2">
              <item.icon className="text-lg text-blue-500" />
              <p className="text-gray-800 font-medium">{item?.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Two-column layout */}
      <div className="flex gap-8 mt-8">
        {/* Left column: scrollable, max width, all sections */}
        <div
          className="flex-1 max-w-4xl overflow-y-auto pr-2"
          style={{ maxHeight: "calc(100vh - 120px)" }}
        >
          {/* Tabs for Images and Map */}
          <Card>
            <CardHeader>
              <CardTitle>{t('propertyDetails.galleryLocation')}</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="images" className="w-full">
                <TabsList className="mb-4">
                  <TabsTrigger value="images">{t('propertyDetails.images')}</TabsTrigger>
                  <TabsTrigger value="map">{t('propertyDetails.map')}</TabsTrigger>
                </TabsList>
                <TabsContent value="images">
                  <div className="relative">
                    {/* <Carousel className="w-full max-w-xl mx-auto"> */}
                    <Carousel className="w-full  mx-auto">
                      <CarouselContent>
                        {images.map((src, idx) => (
                          <CarouselItem key={src}>
                            <img
                              src={src}
                              alt={`Property image ${idx + 1}`}
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
                      title={t('propertyDetails.viewFullscreen')}
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
                    <Dialog
                      open={fullscreenOpen}
                      onOpenChange={setFullscreenOpen}
                    >
                      <DialogContent className="p-0 max-w-none w-screen h-screen flex items-center justify-center bg-black/90">
                        <button
                          className="absolute top-6 right-8 z-20 bg-white/80 hover:bg-white rounded-full p-2 shadow border border-gray-200"
                          onClick={() => setFullscreenOpen(false)}
                          title={t('propertyDetails.closeFullscreen')}
                        >
                          <X className="w-7 h-7 text-blue-600" />
                        </button>
                        <div className="w-full h-full flex items-center justify-center">
                          <Carousel className="w-full max-w-4xl mx-auto">
                            <CarouselContent>
                              {images.map((src, idx) => (
                                <CarouselItem key={src}>
                                  <img
                                    src={src}
                                    alt={`Property image ${idx + 1}`}
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
                </TabsContent>
                <TabsContent value="map">
                  <div className="w-full h-[400px] rounded-lg overflow-hidden">
                    <CityMapNoMarker />
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          {/* Floor Plans */}
          <Card>
            <CardHeader>
              <CardTitle>{t('propertyDetails.floorPlans')}</CardTitle>
            </CardHeader>
            <CardContent>
              2 Bedrooms, 2 bath, 700 sq ft. Spacious open-concept living and
              dining area, modern kitchen, and private balcony.
            </CardContent>
          </Card>

          {/* Parking Information */}
          <Card>
            <CardHeader>
              <CardTitle>{t('propertyDetails.parkingInformation')}</CardTitle>
            </CardHeader>
            <CardContent>
              Parking types: Garage Parking. 1 reserved spot included. Visitor
              parking available.
            </CardContent>
          </Card>

          {/* Features and Amenities */}
          <Card>
            <CardHeader>
              <CardTitle>{t('propertyDetails.featuresAmenities')}</CardTitle>
            </CardHeader>
            <CardContent>
              Building features: 24/7 security, bike room, garage, visitor
              parking, pool, fitness center, rooftop terrace, party room,
              pet-friendly.
            </CardContent>
          </Card>

          {/* Utilities Included */}
          <Card>
            <CardHeader>
              <CardTitle>{t('propertyDetails.utilitiesIncluded')}</CardTitle>
            </CardHeader>
            <CardContent>
              Water, Heating, Garbage collection, Building insurance.
            </CardContent>
          </Card>

          {/* Summary */}
          <Card>
            <CardHeader>
              <CardTitle>{t('propertyDetails.summary')}</CardTitle>
            </CardHeader>
            <CardContent>{propertySummary}</CardContent>
          </Card>

          {/* More content example */}
          <Card>
            <CardHeader>
              <CardTitle>{t('propertyDetails.neighborhood')}</CardTitle>
            </CardHeader>
            <CardContent>
              Located in a vibrant neighborhood with easy access to public
              transit, shopping, restaurants, and parks. Walk score: 92/100.
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>{t('propertyDetails.petPolicy')}</CardTitle>
            </CardHeader>
            <CardContent>
              Pets allowed with restrictions. Please contact for details.
            </CardContent>
          </Card>
        </div>

        {/* Right column: fixed, contact info, book button */}
        <div className="w-[340px] flex-shrink-0 sticky top-8 h-fit bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 p-6 flex flex-col gap-6">
          <div>
            <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">{t('propertyDetails.contactInformation')}</h3>
            <div className="mb-2 text-gray-700 dark:text-gray-300">
              <span className="font-medium">{t('propertyDetails.phone')}:</span> {phone}
            </div>
            <div className="mb-2 text-gray-700 dark:text-gray-300">
              <span className="font-medium">{t('propertyDetails.email')}:</span> {email}
            </div>
            <div className="mb-2 text-gray-700 dark:text-gray-300">
              <span className="font-medium">{t('propertyDetails.address')}:</span> {address}
            </div>
            <div className="mb-2 text-gray-500 dark:text-gray-400 text-sm">
              {t('propertyDetails.availableHours')}
            </div>
          </div>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button className="w-full" size="lg">
                {t('propertyDetails.bookThisProperty')}
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{t('propertyDetails.confirmBooking')}</DialogTitle>
              </DialogHeader>
              <div className="py-4">
                <div className="mb-2 font-medium">{t('propertyDetails.summaryLabel')}</div>
                <div className="text-gray-700 mb-4 text-sm">
                  {propertySummary}
                </div>
                <div className="flex justify-end gap-3 mt-6">
                  <Button variant="outline" onClick={() => setOpen(false)}>
                    {t('propertyDetails.cancel')}
                  </Button>
                  <Button onClick={handleConfirm}>{t('propertyDetails.confirm')}</Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
}
