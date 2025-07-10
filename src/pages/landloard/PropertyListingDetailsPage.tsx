import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Label } from "@/components/ui/label";
import { FloorPlan, OpenHouseDate, AmenityCategory } from "@/types/listing";
import { format } from "date-fns";
import {
  ArrowLeft,
  PlusCircle,
  UploadCloud,
  Image as ImageIcon,
  Trash2,
  CalendarIcon,
  ClockIcon,
  BedDouble,
  Bath,
  DollarSign,
  Square,
  Building,
  Home,
  Users,
  Utensils,
  Wifi, // Amenity icons
} from "lucide-react";
import LandlordDashboardWrapper from "@/components/LandlordDashboardWrapper";
import { useTranslation } from "react-i18next";

// Sample Amenities Data
const initialAmenityCategories: AmenityCategory[] = [
  {
    id: "building",
    name: "Building Features",
    amenities: [
      { id: "elevator", label: "Elevator", checked: false },
      { id: "gym", label: "Fitness Center", checked: false },
      { id: "pool", label: "Swimming Pool", checked: false },
      { id: "laundry", label: "On-site Laundry", checked: false },
      { id: "parking", label: "Parking Available", checked: false },
      { id: "concierge", label: "Concierge", checked: false },
    ],
  },
  {
    id: "unit",
    name: "Unit Features",
    amenities: [
      { id: "ac", label: "Air Conditioning", checked: false },
      { id: "balcony", label: "Balcony/Patio", checked: false },
      { id: "dishwasher", label: "Dishwasher", checked: false },
      { id: "hardwood", label: "Hardwood Floors", checked: false },
      { id: "fireplace", label: "Fireplace", checked: false },
      { id: "kitchen", label: "Modern Kitchen", checked: false },
    ],
  },
  {
    id: "nearby",
    name: "Nearby Amenities",
    amenities: [
      { id: "transit", label: "Public Transit", checked: false },
      { id: "shops", label: "Shopping", checked: false },
      { id: "parks", label: "Parks", checked: false },
      { id: "schools", label: "Schools", checked: false },
    ],
  },
];

const PropertyListingDetailsPage: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [floorPlans, setFloorPlans] = useState<FloorPlan[]>([]);
  const [currentFloorPlan, setCurrentFloorPlan] = useState<Partial<FloorPlan>>(
    {}
  );
  const [isFloorPlanDialogOpen, setIsFloorPlanDialogOpen] = useState(false);

  const [photos, setPhotos] = useState<File[]>([]);
  const [photoPreviews, setPhotoPreviews] = useState<string[]>([]);

  const [description, setDescription] = useState("");
  const [amenityCategories, setAmenityCategories] = useState<AmenityCategory[]>(
    initialAmenityCategories
  );

  const [openHouseDates, setOpenHouseDates] = useState<OpenHouseDate[]>([]);
  const [currentOpenHouseDate, setCurrentOpenHouseDate] = useState<
    Partial<OpenHouseDate>
  >({});
  const [isOpenHouseDialogOpen, setIsOpenHouseDialogOpen] = useState(false);

  const handleAddFloorPlan = () => {
    if (
      currentFloorPlan.bedrooms &&
      currentFloorPlan.bathrooms &&
      currentFloorPlan.rent &&
      currentFloorPlan.unitSize &&
      currentFloorPlan.availabilityDate
    ) {
      setFloorPlans([
        ...floorPlans,
        { ...currentFloorPlan, id: Date.now().toString() } as FloorPlan,
      ]);
      setCurrentFloorPlan({});
      setIsFloorPlanDialogOpen(false);
    } else {
      alert(t('landlord.propertyListingDetails.fillAllFields'));
    }
  };

  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const newFiles = Array.from(event.target.files);
      if (photos.length + newFiles.length < 2) {
        alert(t('landlord.propertyListingDetails.uploadMinImages'));
        // return; // Or allow uploading less for now and enforce on submit
      }
      setPhotos((prevPhotos) => [...prevPhotos, ...newFiles]);
      const newPreviews = newFiles.map((file) => URL.createObjectURL(file));
      setPhotoPreviews((prevPreviews) => [...prevPreviews, ...newPreviews]);
    }
  };

  const removePhoto = (index: number) => {
    setPhotos(photos.filter((_, i) => i !== index));
    setPhotoPreviews(photoPreviews.filter((_, i) => i !== index));
  };

  const handleAmenityChange = (
    categoryId: string,
    amenityId: string,
    checked: boolean
  ) => {
    setAmenityCategories((prevCategories) =>
      prevCategories.map((category) =>
        category.id === categoryId
          ? {
              ...category,
              amenities: category.amenities.map((amenity) =>
                amenity.id === amenityId ? { ...amenity, checked } : amenity
              ),
            }
          : category
      )
    );
  };

  const handleAddOpenHouseDate = () => {
    if (
      currentOpenHouseDate.date &&
      currentOpenHouseDate.startTime &&
      currentOpenHouseDate.endTime
    ) {
      setOpenHouseDates([
        ...openHouseDates,
        { ...currentOpenHouseDate, id: Date.now().toString() } as OpenHouseDate,
      ]);
      setCurrentOpenHouseDate({});
      setIsOpenHouseDialogOpen(false);
    } else {
      alert(t('landlord.propertyListingDetails.fillAllOpenHouseFields'));
    }
  };

  const handlePublish = () => {
    if (photos.length < 2) {
      alert(t('landlord.propertyListingDetails.uploadMinPhotos'));
      return;
    }
    console.log("Publishing Listing:", {
      floorPlans,
      photos,
      description,
      amenityCategories,
      openHouseDates,
    });
    navigate("/landlord/listing-success"); // Go to success page
  };

  return (
    <LandlordDashboardWrapper>
      <div className="min-h-screen bg-slate-50 dark:bg-slate-900 p-4 md:p-8">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold text-slate-800 dark:text-slate-100">
              {t('landlord.propertyListingDetails.title')}
            </h1>
          </div>

          {/* Floor Plans Section */}
          <Card className="shadow-md border-slate-200 dark:border-slate-700 dark:bg-slate-800">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-slate-800 dark:text-slate-100">
                {t('landlord.propertyListingDetails.floorPlans')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="dark:text-slate-300">
                      {t('landlord.propertyListingDetails.bedrooms')}
                    </TableHead>
                    <TableHead className="dark:text-slate-300">
                      {t('landlord.propertyListingDetails.bathrooms')}
                    </TableHead>
                    <TableHead className="dark:text-slate-300">
                      {t('landlord.propertyListingDetails.rent')}
                    </TableHead>
                    <TableHead className="dark:text-slate-300">
                      {t('landlord.propertyListingDetails.unitSize')}
                    </TableHead>
                    <TableHead className="dark:text-slate-300">
                      {t('landlord.propertyListingDetails.available')}
                    </TableHead>
                    <TableHead className="dark:text-slate-300">
                      {t('landlord.propertyListingDetails.actions')}
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {floorPlans.map((fp, index) => (
                    <TableRow key={fp.id}>
                      <TableCell className="dark:text-slate-400">
                        {fp.bedrooms}
                      </TableCell>
                      <TableCell className="dark:text-slate-400">
                        {fp.bathrooms}
                      </TableCell>
                      <TableCell className="dark:text-slate-400">
                        {fp.rent}
                      </TableCell>
                      <TableCell className="dark:text-slate-400">
                        {fp.unitSize}
                      </TableCell>
                      <TableCell className="dark:text-slate-400">
                        {fp.availabilityDate
                          ? format(fp.availabilityDate, "PPP")
                          : "N/A"}
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() =>
                            setFloorPlans(
                              floorPlans.filter((f) => f.id !== fp.id)
                            )
                          }
                        >
                          <Trash2 className="h-4 w-4 text-red-500" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <Dialog
                open={isFloorPlanDialogOpen}
                onOpenChange={setIsFloorPlanDialogOpen}
              >
                <DialogTrigger asChild>
                  <Button
                    variant="outline"
                    className="mt-4 dark:text-slate-300 dark:border-slate-600 dark:hover:bg-slate-700"
                  >
                    <PlusCircle className="mr-2 h-4 w-4" /> {t('landlord.propertyListingDetails.addFloorPlan')}
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px] dark:bg-slate-800 dark:border-slate-700">
                  <DialogHeader>
                    <DialogTitle className="dark:text-slate-100">
                      {t('landlord.propertyListingDetails.addFloorPlan')}
                    </DialogTitle>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    {/* Bedrooms, Bathrooms, Rent, Unit Size, Availability Date inputs */}
                    <Input
                      placeholder={`${t('landlord.propertyListingDetails.bedrooms')} (e.g., 2)`}
                      value={currentFloorPlan.bedrooms || ""}
                      onChange={(e) =>
                        setCurrentFloorPlan({
                          ...currentFloorPlan,
                          bedrooms: e.target.value,
                        })
                      }
                      className="dark:bg-slate-700 dark:border-slate-600 dark:text-slate-200"
                    />
                    <Input
                      placeholder={`${t('landlord.propertyListingDetails.bathrooms')} (e.g., 1.5)`}
                      value={currentFloorPlan.bathrooms || ""}
                      onChange={(e) =>
                        setCurrentFloorPlan({
                          ...currentFloorPlan,
                          bathrooms: e.target.value,
                        })
                      }
                      className="dark:bg-slate-700 dark:border-slate-600 dark:text-slate-200"
                    />
                    <Input
                      type="number"
                      placeholder="Rent per month"
                      value={currentFloorPlan.rent || ""}
                      onChange={(e) =>
                        setCurrentFloorPlan({
                          ...currentFloorPlan,
                          rent: e.target.value,
                        })
                      }
                      className="dark:bg-slate-700 dark:border-slate-600 dark:text-slate-200"
                    />
                    <Input
                      placeholder={`${t('landlord.propertyListingDetails.unitSize')} (e.g., 800 sq ft)`}
                      value={currentFloorPlan.unitSize || ""}
                      onChange={(e) =>
                        setCurrentFloorPlan({
                          ...currentFloorPlan,
                          unitSize: e.target.value,
                        })
                      }
                      className="dark:bg-slate-700 dark:border-slate-600 dark:text-slate-200"
                    />
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={`w-full justify-start text-left font-normal dark:bg-slate-700 dark:border-slate-600 dark:text-slate-200 ${
                            !currentFloorPlan.availabilityDate &&
                            "text-muted-foreground"
                          }`}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {currentFloorPlan.availabilityDate ? (
                            format(currentFloorPlan.availabilityDate, "PPP")
                          ) : (
                            <span>{t('landlord.propertyListingDetails.pickDate')}</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent
                        className="w-auto p-0 dark:bg-slate-800 dark:border-slate-700"
                        align="start"
                      >
                        <Calendar
                          mode="single"
                          selected={currentFloorPlan.availabilityDate}
                          onSelect={(date) =>
                            setCurrentFloorPlan({
                              ...currentFloorPlan,
                              availabilityDate: date,
                            })
                          }
                          initialFocus
                          className="dark:text-slate-200"
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                  <DialogFooter>
                    <DialogClose asChild>
                      <Button variant="ghost" className="dark:text-slate-300">
                        {t('common.cancel')}
                      </Button>
                    </DialogClose>
                    <Button
                      onClick={handleAddFloorPlan}
                      className="bg-blue-600 hover:bg-blue-700"
                    >
                      {t('common.add')}
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </CardContent>
          </Card>

          {/* Photos Section */}
          <Card className="shadow-md border-slate-200 dark:border-slate-700 dark:bg-slate-800">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-slate-800 dark:text-slate-100">
                {t('landlord.propertyListingDetails.photos')}
              </CardTitle>
              <CardDescription className="text-slate-600 dark:text-slate-400">
                {t('landlord.propertyListingDetails.photosDescription')}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-lg p-6 text-center cursor-pointer hover:border-blue-500 dark:hover:border-blue-400 transition-colors">
                <input
                  type="file"
                  id="photoUpload"
                  multiple
                  accept="image/jpeg, image/png"
                  onChange={handlePhotoUpload}
                  className="hidden"
                />
                <label htmlFor="photoUpload" className="cursor-pointer">
                  <UploadCloud className="mx-auto h-12 w-12 text-slate-400 dark:text-slate-500 mb-2" />
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    {t('landlord.propertyListingDetails.dragDropText')}
                  </p>
                  <Button variant="link" asChild className="mt-2">
                    <span className="text-blue-600 dark:text-blue-400">
                      {t('landlord.propertyListingDetails.addPhotos')}
                    </span>
                  </Button>
                </label>
              </div>
              {photoPreviews.length > 0 && (
                <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                  {photoPreviews.map((preview, index) => (
                    <div key={index} className="relative group">
                      <img
                        src={preview}
                        alt={`Preview ${index + 1}`}
                        className="w-full h-32 object-cover rounded-md"
                      />
                      <Button
                        variant="destructive"
                        size="icon"
                        className="absolute top-1 right-1 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={() => removePhoto(index)}
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Description Section */}
          <Card className="shadow-md border-slate-200 dark:border-slate-700 dark:bg-slate-800">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-slate-800 dark:text-slate-100">
                {t('landlord.propertyListingDetails.propertyDescription')}
              </CardTitle>
              <CardDescription className="text-slate-600 dark:text-slate-400">
                {t('landlord.propertyListingDetails.propertyDescriptionText')}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Textarea
                placeholder={t('landlord.propertyListingDetails.describePlaceholder')}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={6}
                className="dark:bg-slate-700 dark:border-slate-600 dark:text-slate-200"
              />
            </CardContent>
          </Card>

          {/* Features/Amenities Section */}
          <Card className="shadow-md border-slate-200 dark:border-slate-700 dark:bg-slate-800">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-slate-800 dark:text-slate-100">
                {t('landlord.propertyListingDetails.featuresAmenities')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Accordion type="multiple" className="w-full">
                {amenityCategories.map((category) => (
                  <AccordionItem
                    key={category.id}
                    value={category.id}
                    className="dark:border-slate-700"
                  >
                    <AccordionTrigger className="hover:no-underline dark:text-slate-200">
                      {category.name}
                    </AccordionTrigger>
                    <AccordionContent className="pt-2">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2">
                        {category.amenities.map((amenity) => (
                          <div
                            key={amenity.id}
                            className="flex items-center space-x-2"
                          >
                            <Checkbox
                              id={`${category.id}-${amenity.id}`}
                              checked={amenity.checked}
                              onCheckedChange={(checked) =>
                                handleAmenityChange(
                                  category.id,
                                  amenity.id,
                                  !!checked
                                )
                              }
                              className="dark:border-slate-600 data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
                            />
                            <Label
                              htmlFor={`${category.id}-${amenity.id}`}
                              className="text-sm font-normal dark:text-slate-300"
                            >
                              {amenity.label}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>

          {/* Open House Dates Section */}
          <Card className="shadow-md border-slate-200 dark:border-slate-700 dark:bg-slate-800">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-slate-800 dark:text-slate-100">
                {t('landlord.propertyListingDetails.openHouseDates')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="dark:text-slate-300">{t('landlord.propertyListingDetails.date')}</TableHead>
                    <TableHead className="dark:text-slate-300">
                      {t('landlord.propertyListingDetails.startTime')}
                    </TableHead>
                    <TableHead className="dark:text-slate-300">
                      {t('landlord.propertyListingDetails.endTime')}
                    </TableHead>
                    <TableHead className="dark:text-slate-300">
                      {t('landlord.propertyListingDetails.actions')}
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {openHouseDates.map((ohd) => (
                    <TableRow key={ohd.id}>
                      <TableCell className="dark:text-slate-400">
                        {ohd.date ? format(ohd.date, "PPP") : "N/A"}
                      </TableCell>
                      <TableCell className="dark:text-slate-400">
                        {ohd.startTime}
                      </TableCell>
                      <TableCell className="dark:text-slate-400">
                        {ohd.endTime}
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() =>
                            setOpenHouseDates(
                              openHouseDates.filter((d) => d.id !== ohd.id)
                            )
                          }
                        >
                          <Trash2 className="h-4 w-4 text-red-500" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <Dialog
                open={isOpenHouseDialogOpen}
                onOpenChange={setIsOpenHouseDialogOpen}
              >
                <DialogTrigger asChild>
                  <Button
                    variant="outline"
                    className="mt-4 dark:text-slate-300 dark:border-slate-600 dark:hover:bg-slate-700"
                  >
                    <PlusCircle className="mr-2 h-4 w-4" /> {t('landlord.propertyListingDetails.addDate')}
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px] dark:bg-slate-800 dark:border-slate-700">
                  <DialogHeader>
                    <DialogTitle className="dark:text-slate-100">
                      {t('landlord.propertyListingDetails.addDate')}
                    </DialogTitle>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={`w-full justify-start text-left font-normal dark:bg-slate-700 dark:border-slate-600 dark:text-slate-200 ${
                            !currentOpenHouseDate.date &&
                            "text-muted-foreground"
                          }`}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {currentOpenHouseDate.date ? (
                            format(currentOpenHouseDate.date, "PPP")
                          ) : (
                            <span>{t('landlord.propertyListingDetails.pickDate')}</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent
                        className="w-auto p-0 dark:bg-slate-800 dark:border-slate-700"
                        align="start"
                      >
                        <Calendar
                          mode="single"
                          selected={currentOpenHouseDate.date}
                          onSelect={(date) =>
                            setCurrentOpenHouseDate({
                              ...currentOpenHouseDate,
                              date,
                            })
                          }
                          initialFocus
                          className="dark:text-slate-200"
                        />
                      </PopoverContent>
                    </Popover>
                    <Input
                      type="time"
                      placeholder={t('landlord.propertyListingDetails.startTime')}
                      value={currentOpenHouseDate.startTime || ""}
                      onChange={(e) =>
                        setCurrentOpenHouseDate({
                          ...currentOpenHouseDate,
                          startTime: e.target.value,
                        })
                      }
                      className="dark:bg-slate-700 dark:border-slate-600 dark:text-slate-200"
                    />
                    <Input
                      type="time"
                      placeholder={t('landlord.propertyListingDetails.endTime')}
                      value={currentOpenHouseDate.endTime || ""}
                      onChange={(e) =>
                        setCurrentOpenHouseDate({
                          ...currentOpenHouseDate,
                          endTime: e.target.value,
                        })
                      }
                      className="dark:bg-slate-700 dark:border-slate-600 dark:text-slate-200"
                    />
                  </div>
                  <DialogFooter>
                    <DialogClose asChild>
                      <Button variant="ghost" className="dark:text-slate-300">
                        {t('common.cancel')}
                      </Button>
                    </DialogClose>
                    <Button
                      onClick={handleAddOpenHouseDate}
                      className="bg-blue-600 hover:bg-blue-700"
                    >
                      {t('landlord.propertyListingDetails.addDate')}
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </CardContent>
          </Card>

          {/* Lead Contact Section */}
          <Card className="shadow-md border-slate-200 dark:border-slate-700 dark:bg-slate-800">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-slate-800 dark:text-slate-100">
                {t('landlord.propertyListingDetails.leadContact')}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <p className="text-slate-700 dark:text-slate-300">
                <strong>Email:</strong> manaknightdigitaldev@gmail.com
              </p>
              <p className="text-slate-700 dark:text-slate-300">
                <strong>Phone:</strong> (647) 849-6002
              </p>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex justify-between items-center pt-4">
            <Button
              variant="outline"
              onClick={() => navigate("/landlord/property-details")}
              className="dark:text-slate-300 dark:border-slate-600 dark:hover:bg-slate-700"
            >
              <ArrowLeft className="mr-2 h-4 w-4" /> {t('common.back')}
            </Button>
            <Button
              size="lg"
              className="bg-green-600 hover:bg-green-700 text-white"
              onClick={handlePublish}
            >
              {t('landlord.propertyListingDetails.publishListing')}
            </Button>
          </div>
        </div>
      </div>
    </LandlordDashboardWrapper>
  );
};

export default PropertyListingDetailsPage;
