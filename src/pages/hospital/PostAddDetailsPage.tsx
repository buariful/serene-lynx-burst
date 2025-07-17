import { useState, useCallback, useEffect } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useToast } from "@/hooks/use-toast";
import { useTranslation } from 'react-i18next';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Upload, X, Save, Eye, MapPin, Phone, Mail, DollarSign, Tag, Settings, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

// Types
interface ImageItemType {
  file: File;
  preview: string;
}

interface ImageUploaderProps {
  images: ImageItemType[];
  setImages: React.Dispatch<React.SetStateAction<ImageItemType[]>>;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ images, setImages }) => {
  const { t } = useTranslation();
  
  const moveImage = useCallback(
    (dragIndex: number, hoverIndex: number) => {
      setImages((prev) => {
        const newImages = [...prev];
        const [removed] = newImages.splice(dragIndex, 1);
        newImages.splice(hoverIndex, 0, removed);
        return newImages;
      });
    },
    [setImages]
  );

  const removeImage = (index: number) => {
    setImages((prev) => {
      // Clean up object URL
      URL.revokeObjectURL(prev[index].preview);
      return prev.filter((_, i) => i !== index);
    });
  };

  useEffect(() => {
    // Cleanup on unmount
    return () => {
      images.forEach((img) => URL.revokeObjectURL(img.preview));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const ImageItem: React.FC<{ image: ImageItemType; index: number }> = ({
    image,
    index,
  }) => {
    const [{ isDragging }, drag] = useDrag({
      type: "IMAGE",
      item: { index },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    });

    const [, drop] = useDrop({
      accept: "IMAGE",
      hover: (item: { index: number }) => {
        if (item.index !== index) {
          moveImage(item.index, index);
          item.index = index;
        }
      },
    });

    return (
      <div
        ref={(node) => drag(drop(node))}
        className={`relative w-24 h-24 border border-gray-300 dark:border-gray-600 rounded-lg overflow-hidden ${
          isDragging ? "opacity-50" : "opacity-100"
        } group cursor-move transition-all duration-200 hover:shadow-lg`}
      >
        <img
          src={image.preview}
          alt={`${t('postAd.image')} ${index + 1}`}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-200"/>
        <button
          type="button"
          onClick={() => removeImage(index)}
          className="absolute top-1 right-1 sm:top-2 sm:right-2 bg-red-500 text-white rounded-full w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center hover:bg-red-600 transition-colors"
          aria-label={t('postAd.removeImage')}
        >
          <X className="w-3 h-3" />
        </button>
        <div className="absolute bottom-1 left-1 sm:bottom-2 sm:left-2 bg-black bg-opacity-50 text-white text-xs px-1.5 sm:px-2 rounded">
          {index + 1}
        </div>
      </div>
    );
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const newImages = files.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));
    setImages((prev) => [...prev, ...newImages].slice(0, 10));
  };

  return (
    <Card className="shadow-sm border-gray-200 dark:border-gray-700">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center text-lg">
          <Upload className="w-5 h-5 mr-2 text-blue-600" />
          {t('postAd.addPhotosTitle')}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
          {t('postAd.addPhotosDescription')}
          <br />
          <span className="font-medium">{t('postAd.dragDropHint')}</span>
        </p>

        <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl p-6 sm:p-8 text-center hover:border-blue-400 transition-colors">
          <Upload className="w-10 h-10 sm:w-12 sm:h-12 mx-auto text-gray-400 mb-4"/>
          <p className="text-base sm:text-lg font-medium text-gray-900 dark:text-white mb-2">
            {t('postAd.selectImages')}
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
            Upload up to 10 high-quality images (JPG, PNG)
          </p>
          <Button
            onClick={() => document.getElementById('image-upload')?.click()}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2"
          >
            Choose Files
          </Button>
          <input
            id="image-upload"
            type="file"
            multiple
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
            aria-label={t('postAd.selectImages')}
          />
        </div>

        {images.length > 0 && (
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
              <h3 className="font-medium text-gray-900 dark:text-white">
                Uploaded Images ({images.length}/10)
              </h3>
              <Badge variant="secondary" className="w-fit">
                Drag to reorder
              </Badge>
            </div>
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-3 sm:gap-4">
              {images.map((image, index) => (
                <ImageItem key={index} image={image} index={index} />
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default function PostAdDetailsPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [adType, setAdType] = useState<"offering" | "wanting">();
  const [paymentOptions, setPaymentOptions] = useState({
    cashless: false,
    cash: false,
  });
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [images, setImages] = useState<ImageItemType[]>([]);
  const [exposureChecked, setExposureChecked] = useState(false);
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [condition, setCondition] = useState("");
  const { toast } = useToast();

  const togglePaymentOption = (option: "cashless" | "cash") => {
    setPaymentOptions((prev) => ({ ...prev, [option]: !prev[option] }));
  };

  // Required fields for submit
  const isSubmitDisabled = !title.trim() || !description.trim() || !adType || !price.trim() || !category.trim();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitDisabled) return;
    toast({
      title: t('postAd.adPostedSuccess'),
      description: t('postAd.adPostedDescription'),
    });
    // Optionally clear the form here
    // setTitle(""); setDescription(""); setAdType(undefined); ...
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="mx-auto px-4 sm:px-6 lg:px-8 m:py-8">
          {/* Header */}
          <div className="mb-6 sm:mb-8">
            <div className="flex items-center gap-4 mb-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate(-1)}
                className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-2">
              {t('postAd.adDetails')}
            </h1>
            <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base">
              Complete your advertisement with detailed information
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Information */}
            <Card className="shadow-sm border-gray-200 dark:border-gray-700">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center text-lg">
                  <Settings className="w-5 h-5 mr-2 text-blue-600" />
                  Basic Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="title" className="text-sm font-medium">Ad Title *</Label>
                    <Input
                      id="title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="Enter your ad title"
                      maxLength={70}
                      required
                      className="h-11"
                    />
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {70 - title.length} {t('postAd.charactersLeft')}
                    </p>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="category" className="text-sm font-medium">Category *</Label>
                    <Select value={category} onValueChange={setCategory}>
                      <SelectTrigger className="h-11">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="diagnostic">Diagnostic Devices</SelectItem>
                        <SelectItem value="surgical">Surgical Instruments</SelectItem>
                        <SelectItem value="monitoring">Monitoring Equipment</SelectItem>
                        <SelectItem value="imaging">Imaging Devices</SelectItem>
                        <SelectItem value="therapeutic">Therapeutic Devices</SelectItem>
                        <SelectItem value="laboratory">Laboratory Equipment</SelectItem>
                        <SelectItem value="mobility">Mobility Aids</SelectItem>
                        <SelectItem value="consumables">Consumables & Disposables</SelectItem>
                        <SelectItem value="furniture">Medical Furniture</SelectItem>
                        <SelectItem value="it">IT & Software</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="price" className="text-sm font-medium">Price *</Label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                        id="price"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        placeholder="0.00"
                        type="number"
                        min="0"
                        step="0.01"
                        className="pl-10 h-11"
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="condition" className="text-sm font-medium">Condition</Label>
                    <Select value={condition} onValueChange={setCondition}>
                      <SelectTrigger className="h-11">
                        <SelectValue placeholder="Select condition" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="excellent">Excellent</SelectItem>
                        <SelectItem value="like-new">Like New</SelectItem>
                        <SelectItem value="good">Good</SelectItem>
                        <SelectItem value="fair">Fair</SelectItem>
                        <SelectItem value="poor">Poor</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Ad Type *</Label>
                    <div className="space-y-3 pt-2">
                      <div className="flex items-center space-x-3">
                        <input
                          type="radio"
                          id="offering"
                          name="adType"
                          checked={adType === "offering"}
                          onChange={() => setAdType("offering")}
                          className="text-blue-600 focus:ring-blue-500"
                        />
                        <Label htmlFor="offering" className="text-sm font-normal cursor-pointer">
                          {t('postAd.imOffering')}
                        </Label>
                      </div>
                      <div className="flex items-center space-x-3">
                        <input
                          type="radio"
                          id="wanting"
                          name="adType"
                          checked={adType === "wanting"}
                          onChange={() => setAdType("wanting")}
                          className="text-blue-600 focus:ring-blue-500"
                        />
                        <Label htmlFor="wanting" className="text-sm font-normal cursor-pointer">
                          {t('postAd.iWantToFind')}
                        </Label>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Description */}
            <Card className="shadow-sm border-gray-200 dark:border-gray-700">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg">Description & Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Switch
                      id="exposure"
                      checked={exposureChecked}
                      onCheckedChange={setExposureChecked}
                    />
                    <Label htmlFor="exposure" className="text-sm font-normal cursor-pointer">
                      {t('postAd.increaseExposureText')}
                    </Label>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="description" className="text-sm font-medium">Description *</Label>
                    <Textarea
                      id="description"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Describe your item in detail..."
                      rows={6}
                      maxLength={1000}
                      required
                      className="resize-none"
                    />
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {1000 - description.length} {t('postAd.charactersLeft')}
                    </p>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="tags" className="text-sm font-medium">Tags (Optional)</Label>
                  <Input
                    id="tags"
                    value={tags}
                    onChange={(e) => setTags(e.target.value)}
                    placeholder="Enter tags separated by commas"
                    className="h-11"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Payment Options */}
            <Card className="shadow-sm border-gray-200 dark:border-gray-700">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg">Payment Options</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Switch
                      id="cashless"
                      checked={paymentOptions.cashless}
                      onCheckedChange={() => togglePaymentOption("cashless")}
                    />
                    <Label htmlFor="cashless" className="text-sm font-normal cursor-pointer">
                      {t('postAd.offerCashlessPayment')}
                    </Label>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Switch
                      id="cash"
                      checked={paymentOptions.cash}
                      onCheckedChange={() => togglePaymentOption("cash")}
                    />
                    <Label htmlFor="cash" className="text-sm font-normal cursor-pointer">
                      {t('postAd.cashAccepted')}
                    </Label>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Images */}
            <ImageUploader images={images} setImages={setImages} />

            {/* Contact Information */}
            <Card className="shadow-sm border-gray-200 dark:border-gray-700">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center text-lg">
                  <Mail className="w-5 h-5 mr-2 text-blue-600" />
                  Contact Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="address" className="text-sm font-medium">Address</Label>
                  <Input
                    id="address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder={t('postAd.addressPlaceholder')}
                    className="h-11"
                  />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-sm font-medium">Phone Number (Optional)</Label>
                    <Input
                      id="phone"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder={t('postAd.phonePlaceholder')}
                      className="h-11"
                    />
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {t('postAd.phoneWillShow')}
                    </p>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-sm font-medium">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="your.email@example.com"
                      required
                      className="h-11"
                    />
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {t('postAd.emailNotShared')}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Submit */}
            <div className="flex flex-col sm:flex-row justify-end gap-4 pt-6 border-t border-gray-200 dark:border-gray-700">
              <Button type="button" variant="outline" className="w-full sm:w-auto">
                Save Draft
              </Button>
              <Button
                type="submit"
                disabled={isSubmitDisabled}
                className="bg-blue-600 hover:bg-blue-700 text-white w-full sm:w-auto"
              >
                <Save className="w-4 h-4 mr-2" />
                {t('postAd.postAd')}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </DndProvider>
  );
}
