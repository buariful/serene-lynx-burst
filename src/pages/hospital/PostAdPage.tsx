import React, { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { X, Upload, Plus, Trash2, Save, Eye, DollarSign, Package, FileText, Image, Settings } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import RecruiterPostJob from "../recruiter/RecruiterPostJob";
import { useTranslation } from 'react-i18next';

const STATUS_OPTIONS = ["Available", "Out of stock"];
const AD_TYPE_OPTIONS = ["For Rent", "For Sell"];
const CATEGORIES = [
  "Diagnostic Devices",
  "Surgical Instruments",
  "Monitoring Equipment",
  "Imaging Devices",
  "Therapeutic Devices",
  "Laboratory Equipment",
  "Mobility Aids",
  "Consumables & Disposables",
  "Medical Furniture",
  "IT & Software",
  "Other",
];

export default function PostAdPage() {
  const { toast } = useToast();
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<"device" | "job">("device");
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState(STATUS_OPTIONS[0]);
  const [adType, setAdType] = useState(AD_TYPE_OPTIONS[0]);
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [specifications, setSpecifications] = useState([
    { label: "", value: "" },
  ]);
  const [description, setDescription] = useState("");
  const [usageInstructions, setUsageInstructions] = useState("");
  const [documents, setDocuments] = useState<File[]>([]);
  const [images, setImages] = useState<{ file: File; url: string }[]>([]);
  const [location, setLocation] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [warranty, setWarranty] = useState("");
  const [condition, setCondition] = useState("Excellent");
  const [isNegotiable, setIsNegotiable] = useState(false);
  const [isUrgent, setIsUrgent] = useState(false);

  const imageInputRef = useRef<HTMLInputElement>(null);
  const docInputRef = useRef<HTMLInputElement>(null);

  // Job form state for direct embedding
  const [job, setJob] = useState({
    title: "",
    company: "",
    type: "",
    description: "",
    image: [],
  });

  // Job form handlers (adapted from RecruiterPostJob)
  const jobFileInputRef = useRef<HTMLInputElement | null>(null);
  const handleJobChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setJob({ ...job, [e.target.name]: e.target.value });
  };
  const handleJobSelect = (value: string) => {
    setJob({ ...job, type: value });
  };
  const handleJobFileButtonClick = () => {
    jobFileInputRef.current?.click();
  };
  const handleJobFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      setJob((prev) => ({ ...prev, image: filesArray }));
    }
  };
  const handleJobRemoveImage = (index: number) => {
    setJob((prev) => ({
      ...prev,
      image: prev.image.filter((_: File | string, i: number) => i !== index),
    }));
  };
  const handleJobSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !job.title.trim() ||
      !job.company.trim() ||
      !job.type.trim() ||
      !job.description.trim()
    ) {
      toast({
        title: "Please fill all required job fields.",
        variant: "destructive",
      });
      return;
    }
    toast({ title: "Job posted successfully!", variant: "default" });
    setJob({ title: "", company: "", type: "", description: "", image: [] });
  };

  // Image handlers
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const files = Array.from(e.target.files);
    const newImages = files.map((file) => ({
      file,
      url: URL.createObjectURL(file),
    }));
    setImages((prev) => [...prev, ...newImages]);
  };
  const handleRemoveImage = (idx: number) => {
    setImages((prev) => prev.filter((_, i) => i !== idx));
  };

  // Document handlers
  const handleDocChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const files = Array.from(e.target.files);
    setDocuments((prev) => [...prev, ...files]);
  };
  const handleRemoveDoc = (idx: number) => {
    setDocuments((prev) => prev.filter((_, i) => i !== idx));
  };

  // Specification handlers
  const handleSpecChange = (
    idx: number,
    field: "label" | "value",
    value: string
  ) => {
    setSpecifications((prev) =>
      prev.map((spec, i) => (i === idx ? { ...spec, [field]: value } : spec))
    );
  };
  const addSpec = () =>
    setSpecifications((prev) => [...prev, { label: "", value: "" }]);
  const removeSpec = (idx: number) =>
    setSpecifications((prev) => prev.filter((_, i) => i !== idx));

  // Form submit
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !title.trim() ||
      !description.trim() ||
      !usageInstructions.trim() ||
      images.length === 0 ||
      !price.trim() ||
      !stock.trim() ||
      !category.trim()
    ) {
      toast({
        title: "Please fill all required fields and add at least one image.",
        variant: "destructive",
      });
      return;
    }
    toast({
      title: "Ad published!",
      description: "Your device ad has been published.",
      variant: "default",
    });
    // Reset form (optional)
    setTitle("");
    setStatus(STATUS_OPTIONS[0]);
    setAdType(AD_TYPE_OPTIONS[0]);
    setCategory("");
    setPrice("");
    setSpecifications([{ label: "", value: "" }]);
    setDescription("");
    setUsageInstructions("");
    setDocuments([]);
    setImages([]);
    setStock("");
    setLocation("");
    setContactPhone("");
    setContactEmail("");
    setWarranty("");
    setCondition("Excellent");
    setIsNegotiable(false);
    setIsUrgent(false);
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen">
      <div className="mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Post New Advertisement
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Create a new listing for medical devices or job opportunities
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as "device" | "job")} className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="device" className="flex items-center">
              <Package className="w-4 h-4 mr-2" />
              Post Device Ad
            </TabsTrigger>
            <TabsTrigger value="job" className="flex items-center">
              <FileText className="w-4 h-4 mr-2" />
              Post Job
            </TabsTrigger>
          </TabsList>

          <TabsContent value="device">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Basic Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Settings className="w-5 h-5 mr-2" />
                    Basic Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="title">Title *</Label>
                      <Input
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Enter device title"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="category">Category *</Label>
                      <Select value={category} onValueChange={setCategory}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          {CATEGORIES.map((cat) => (
                            <SelectItem key={cat} value={cat}>
                              {cat}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="status">Status *</Label>
                      <Select value={status} onValueChange={setStatus}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {STATUS_OPTIONS.map((s) => (
                            <SelectItem key={s} value={s}>
                              {s}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="adType">Ad Type *</Label>
                      <Select value={adType} onValueChange={setAdType}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {AD_TYPE_OPTIONS.map((type) => (
                            <SelectItem key={type} value={type}>
                              {type}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="condition">Condition</Label>
                      <Select value={condition} onValueChange={setCondition}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Excellent">Excellent</SelectItem>
                          <SelectItem value="Like New">Like New</SelectItem>
                          <SelectItem value="Good">Good</SelectItem>
                          <SelectItem value="Fair">Fair</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="price">
                        Price ({adType === "For Rent" ? t('postAd.perMonth') : t('postAd.toSell')}) *
                      </Label>
                      <div className="relative">
                        <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <Input
                          id="price"
                          value={price}
                          onChange={(e) => setPrice(e.target.value)}
                          placeholder={adType === "For Rent" ? "$ per month" : "$ to sell"}
                          type="number"
                          min="0"
                          className="pl-10"
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="stock">Stock Quantity *</Label>
                      <Input
                        id="stock"
                        value={stock}
                        onChange={(e) => setStock(e.target.value)}
                        type="number"
                        min="1"
                        placeholder="Available quantity"
                        required
                      />
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="negotiable"
                        checked={isNegotiable}
                        onCheckedChange={setIsNegotiable}
                      />
                      <Label htmlFor="negotiable">Price is negotiable</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="urgent"
                        checked={isUrgent}
                        onCheckedChange={setIsUrgent}
                      />
                      <Label htmlFor="urgent">Urgent sale</Label>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Description */}
              <Card>
                <CardHeader>
                  <CardTitle>Description & Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="description">Description *</Label>
                    <Textarea
                      id="description"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Describe the device, its features, and benefits..."
                      rows={4}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="usageInstructions">Usage Instructions *</Label>
                    <Textarea
                      id="usageInstructions"
                      value={usageInstructions}
                      onChange={(e) => setUsageInstructions(e.target.value)}
                      placeholder="Provide usage instructions and safety guidelines..."
                      rows={3}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="warranty">Warranty Information</Label>
                    <Input
                      id="warranty"
                      value={warranty}
                      onChange={(e) => setWarranty(e.target.value)}
                      placeholder="e.g., 1 year manufacturer warranty"
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Specifications */}
              <Card>
                <CardHeader>
                  <CardTitle>Technical Specifications</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {specifications.map((spec, idx) => (
                    <div key={idx} className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <Input
                        placeholder={`${t('postAd.label')} (e.g. Display)`}
                        value={spec.label}
                        onChange={(e) =>
                          handleSpecChange(idx, "label", e.target.value)
                        }
                      />
                      <Input
                        placeholder={`${t('postAd.value')} (e.g. 15.6" LCD)`}
                        value={spec.value}
                        onChange={(e) =>
                          handleSpecChange(idx, "value", e.target.value)
                        }
                      />
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => removeSpec(idx)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                  <Button
                    type="button"
                    variant="outline"
                    onClick={addSpec}
                    className="w-full"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    {t('postAd.addSpecification')}
                  </Button>
                </CardContent>
              </Card>

              {/* Images */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Image className="w-5 h-5 mr-2" />
                    {t('postAd.images')} *
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 text-center">
                    <Upload className="w-8 mx-auto text-gray-400 mb-2" />
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                      {t('postAd.uploadHighQualityImages')}
                    </p>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => imageInputRef.current?.click()}
                    >
                      {t('postAd.chooseImages')}
                    </Button>
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      ref={imageInputRef}
                      onChange={handleImageChange}
                      className="hidden"
                    />
                  </div>

                  {images.length > 0 && (
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {images.map((img, idx) => (
                        <div
                          key={idx}
                          className="relative aspect-square border border-gray-200 dark:border-gray-600 rounded-lg overflow-hidden"
                        >
                          <img
                            src={img.url}
                            alt="preview"
                            className="object-cover w-full h-full"
                          />
                          <Button
                            type="button"
                            variant="destructive"
                            size="sm"
                            className="absolute top-2 right-2 w-6 h-6 p-0"
                            onClick={() => handleRemoveImage(idx)}
                          >
                            <X className="w-3 h-3" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Documents */}
              <Card>
                <CardHeader>
                  <CardTitle>Documents</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 text-center">
                    <FileText className="w-8 mx-auto text-gray-400 mb-2" />
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                      {t('postAd.uploadManualsCertificates')}
                    </p>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => docInputRef.current?.click()}
                    >
                      {t('postAd.choosePDFs')}
                    </Button>
                    <input
                      type="file"
                      accept="application/pdf"
                      multiple
                      ref={docInputRef}
                      onChange={handleDocChange}
                      className="hidden"
                    />
                  </div>

                  {documents.length > 0 && (
                    <div className="space-y-2">
                      {documents.map((doc, idx) => (
                        <div key={idx} className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-800 rounded">
                          <span className="text-sm text-gray-700 dark:text-gray-300">{doc.name}</span>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => handleRemoveDoc(idx)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Contact Information */}
              <Card>
                <CardHeader>
                  <CardTitle>Contact Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="location">{t('postAd.location')}</Label>
                      <Input
                        id="location"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        placeholder={`${t('postAd.cityProvince')}`}
                      />
                    </div>
                    <div>
                      <Label htmlFor="contactPhone">{t('postAd.phoneNumber')}</Label>
                      <Input
                        id="contactPhone"
                        value={contactPhone}
                        onChange={(e) => setContactPhone(e.target.value)}
                        placeholder={`+${t('postAd.phoneNumberPlaceholder')}`}
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="contactEmail">{t('postAd.email')}</Label>
                    <Input
                      id="contactEmail"
                      type="email"
                      value={contactEmail}
                      onChange={(e) => setContactEmail(e.target.value)}
                      placeholder={`${t('postAd.emailPlaceholder')}`}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Submit */}
              <div className="flex justify-end space-x-4">
                <Button type="button" variant="outline">
                  {t('postAd.saveDraft')}
                </Button>
                <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white">
                  <Save className="w-4 h-4 mr-2" />
                  {t('postAd.publish')}
                </Button>
              </div>
            </form>
          </TabsContent>

          <TabsContent value="job">
            <Card>
              <CardHeader>
                <CardTitle>{t('postAd.postJob')}</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleJobSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="jobTitle">{t('postAd.jobTitle')}</Label>
                      <Input
                        type="text"
                        name="title"
                        value={job.title}
                        onChange={handleJobChange}
                        required
                        placeholder={`${t('postAd.jobTitlePlaceholder')}`}
                      />
                    </div>
                    <div>
                      <Label htmlFor="companyName">{t('postAd.companyName')}</Label>
                      <Input
                        type="text"
                        name="company"
                        value={job.company}
                        onChange={handleJobChange}
                        required
                        placeholder={`${t('postAd.companyNamePlaceholder')}`}
                      />
                    </div>
                  </div>

                  <div>
                    <Label>{t('postAd.jobType')}</Label>
                    <Select value={job.type} onValueChange={handleJobSelect}>
                      <SelectTrigger>
                        <SelectValue placeholder={`${t('postAd.selectJobType')}`} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="contract">{t('postAd.contract')}</SelectItem>
                        <SelectItem value="part-time">{t('postAd.partTime')}</SelectItem>
                        <SelectItem value="full-time">{t('postAd.fullTime')}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="jobDescription">{t('postAd.jobDescription')}</Label>
                    <Textarea
                      name="description"
                      rows={5}
                      value={job.description}
                      onChange={handleJobChange}
                      required
                      placeholder={`${t('postAd.jobDescriptionPlaceholder')}`}
                    />
                  </div>

                  <div>
                    <Label>{t('postAd.uploadImages')}</Label>
                    <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 text-center">
                      <Upload className="w-8 mx-auto text-gray-400 mb-2" />
                      <Button
                        type="button"
                        variant="outline"
                        onClick={handleJobFileButtonClick}
                      >
                        {t('postAd.chooseImages')}
                      </Button>
                      <input
                        ref={jobFileInputRef}
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={handleJobFileChange}
                        className="hidden"
                      />
                    </div>

                    {Array.isArray(job.image) && job.image.length > 0 && (
                      <div className="mt-3 grid grid-cols-3 gap-3">
                        {job.image.map((file: File | string, index: number) => {
                          let previewUrl = "";
                          if (typeof file === "string") {
                            previewUrl = file;
                          } else {
                            previewUrl = URL.createObjectURL(file);
                          }
                          return (
                            <div
                              key={index}
                              className="relative w-full aspect-square overflow-hidden rounded-md border border-gray-200 dark:border-gray-600"
                            >
                              <img
                                src={previewUrl}
                                alt={`Preview ${index}`}
                                className="object-cover w-full h-full"
                              />
                              <Button
                                type="button"
                                variant="destructive"
                                size="sm"
                                className="absolute top-1 right-1 w-6 h-6 p-0"
                                onClick={() => handleJobRemoveImage(index)}
                              >
                                <X className="w-3 h-3" />
                              </Button>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>

                  <div className="flex justify-end">
                    <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white">
                      {t('postAd.postJob')}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
