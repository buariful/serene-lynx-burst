import React, { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { X } from "lucide-react";
import { FaFilePdf, FaPlus, FaTrash } from "react-icons/fa";
import RecruiterPostJob from "../recruiter/RecruiterPostJob";
import { useTranslation } from 'react-i18next';

const STATUS_OPTIONS = ["Available", "Out of stock"];
const AD_TYPE_OPTIONS = ["For Rent", "For Sell"];

export default function PostAdPage() {
  const { toast } = useToast();
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<"device" | "job">("device");
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState(STATUS_OPTIONS[0]);
  const [adType, setAdType] = useState(AD_TYPE_OPTIONS[0]);
  const [price, setPrice] = useState("");
  const [specifications, setSpecifications] = useState([
    { label: "", value: "" },
  ]);
  const [description, setDescription] = useState("");
  const [usageInstructions, setUsageInstructions] = useState("");
  const [documents, setDocuments] = useState<File[]>([]);
  const [images, setImages] = useState<{ file: File; url: string }[]>([]);
  const imageInputRef = useRef<HTMLInputElement>(null);
  const docInputRef = useRef<HTMLInputElement>(null);
  const [stock, setStock] = useState("");

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
      !stock.trim()
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
    setPrice("");
    setSpecifications([{ label: "", value: "" }]);
    setDescription("");
    setUsageInstructions("");
    setDocuments([]);
    setImages([]);
    setStock("");
  };

  return (
    <div className="max-w-2xl mx-auto py-10 px-4 bg-gray-50 dark:bg-gray-900 min-h-screen">
      <div className="flex gap-2 mb-8">
        <Button
          variant={activeTab === "device" ? "default" : "outline"}
          onClick={() => setActiveTab("device")}
          className={activeTab === "device" ? "bg-blue-600 hover:bg-blue-700 text-white" : "border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"}
        >
          {t('postAd.postDeviceAd')}
        </Button>
        <Button
          variant={activeTab === "job" ? "default" : "outline"}
          onClick={() => setActiveTab("job")}
          className={activeTab === "job" ? "bg-blue-600 hover:bg-blue-700 text-white" : "border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"}
        >
          {t('postAd.postJob')}
        </Button>
      </div>
      {activeTab === "device" ? (
        <form
          onSubmit={handleSubmit}
          className="space-y-6 bg-white dark:bg-gray-800 p-6 rounded shadow-md border border-gray-200 dark:border-gray-700"
        >
          {/* Title */}
          <div>
            <label className="block font-semibold mb-1 text-gray-700 dark:text-gray-300">{t('postAd.title')} *</label>
            <input
              className="w-full border border-gray-300 dark:border-gray-600 rounded px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          {/* Stock Quantity */}
          <div>
            <label className="block font-semibold mb-1 text-gray-700 dark:text-gray-300">{t('postAd.stockQuantity')} *</label>
            <input
              className="w-full border border-gray-300 dark:border-gray-600 rounded px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
              type="number"
              min="1"
              required
            />
          </div>
          {/* Status */}
          <div>
            <label className="block font-semibold mb-1 text-gray-700 dark:text-gray-300">{t('postAd.status')} *</label>
            <select
              className="w-full border border-gray-300 dark:border-gray-600 rounded px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              required
            >
              {STATUS_OPTIONS.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>
          {/* For Rent or For Sell */}
          <div>
            <label className="block font-semibold mb-1 text-gray-700 dark:text-gray-300">{t('postAd.adType')} *</label>
            <div className="flex gap-4">
              {AD_TYPE_OPTIONS.map((type) => (
                <label key={type} className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                  <input
                    type="radio"
                    name="adType"
                    value={type}
                    checked={adType === type}
                    onChange={() => setAdType(type)}
                    required
                  />
                  {type === "For Rent" ? t('postAd.forRent') : t('postAd.forSell')}
                </label>
              ))}
            </div>
          </div>
          {/* Price */}
          <div>
            <label className="block font-semibold mb-1 text-gray-700 dark:text-gray-300">
              {t('postAd.price')} ({adType === "For Rent" ? t('postAd.perMonth') : t('postAd.toSell')}) *
            </label>
            <input
              className="w-full border border-gray-300 dark:border-gray-600 rounded px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder={adType === "For Rent" ? "$ per month" : "$ to sell"}
              type="number"
              min="0"
              required
            />
          </div>
          {/* Specifications */}
          <div>
            <label className="block font-semibold mb-1 text-gray-700 dark:text-gray-300">{t('postAd.specifications')}</label>
            {specifications.map((spec, idx) => (
              <div key={idx} className="flex gap-2 mb-2">
                <input
                  className="border border-gray-300 dark:border-gray-600 rounded px-2 py-1 flex-1 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  placeholder={`${t('postAd.label')} (e.g. Display)`}
                  value={spec.label}
                  onChange={(e) =>
                    handleSpecChange(idx, "label", e.target.value)
                  }
                />
                <input
                  className="border border-gray-300 dark:border-gray-600 rounded px-2 py-1 flex-1 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  placeholder={`${t('postAd.value')} (e.g. 15.6" LCD)`}
                  value={spec.value}
                  onChange={(e) =>
                    handleSpecChange(idx, "value", e.target.value)
                  }
                />
                <button
                  type="button"
                  onClick={() => removeSpec(idx)}
                  className="text-red-500 dark:text-red-400"
                >
                  <FaTrash />
                </button>
              </div>
            ))}
            <Button
              type="button"
              variant="outline"
              onClick={addSpec}
              className="mt-1 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <FaPlus className="mr-1" />
              {t('postAd.addSpecification')}
            </Button>
          </div>
          {/* Description */}
          <div>
            <label className="block font-semibold mb-1 text-gray-700 dark:text-gray-300">{t('postAd.description')} *</label>
            <textarea
              className="w-full border border-gray-300 dark:border-gray-600 rounded px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              rows={3}
            />
          </div>
          {/* Usage Instructions */}
          <div>
            <label className="block font-semibold mb-1 text-gray-700 dark:text-gray-300">
              {t('postAd.usageInstructions')} *
            </label>
            <textarea
              className="w-full border border-gray-300 dark:border-gray-600 rounded px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              value={usageInstructions}
              onChange={(e) => setUsageInstructions(e.target.value)}
              required
              rows={2}
            />
          </div>
          {/* Documents */}
          <div>
            <label className="block font-semibold mb-1 text-gray-700 dark:text-gray-300">
              {t('postAd.documents')}
            </label>
            <label className="inline-block">
              <span className="sr-only">Choose PDF files</span>
              <span className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded cursor-pointer inline-block mb-2">
                {t('postAd.selectPDFs')}
              </span>
              <input
                type="file"
                accept="application/pdf"
                multiple
                ref={docInputRef}
                onChange={handleDocChange}
                className="hidden"
              />
            </label>
            <ul className="space-y-1">
              {documents.map((doc, idx) => (
                <li
                  key={doc.name}
                  className="flex items-center gap-2 text-blue-700 dark:text-blue-400"
                >
                  <FaFilePdf className="text-red-500" />
                  <span className="text-gray-700 dark:text-gray-300">{doc.name}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveDoc(idx)}
                    className="text-red-500 dark:text-red-400"
                  >
                    <X />
                  </button>
                </li>
              ))}
            </ul>
          </div>
          {/* Images */}
          <div>
            <label className="block font-semibold mb-1 text-gray-700 dark:text-gray-300">{t('postAd.images')} *</label>
            <label className="inline-block">
              <span className="sr-only">Choose images</span>
              <span className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded cursor-pointer inline-block mb-2">
                {t('postAd.selectImages')}
              </span>
              <input
                type="file"
                accept="image/*"
                multiple
                ref={imageInputRef}
                onChange={handleImageChange}
                className="hidden"
              />
            </label>
            <div className="flex flex-wrap gap-3">
              {images.map((img, idx) => (
                <div
                  key={idx}
                  className="relative w-28 h-28 border border-gray-200 dark:border-gray-600 rounded overflow-hidden"
                >
                  <img
                    src={img.url}
                    alt="preview"
                    className="object-cover w-full h-full"
                  />
                  <button
                    type="button"
                    className="absolute top-1 right-1 bg-white/80 dark:bg-gray-800/80 rounded-full p-1 shadow border border-gray-200 dark:border-gray-600"
                    onClick={() => handleRemoveImage(idx)}
                    title="Remove"
                  >
                    <X className="w-4 h-4 text-red-500 dark:text-red-400" />
                  </button>
                </div>
              ))}
            </div>
          </div>
          {/* Submit */}
          <div className="pt-4 flex justify-end">
            <Button
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-2 text-lg font-semibold rounded"
              type="submit"
            >
              {t('postAd.publish')}
            </Button>
          </div>
        </form>
      ) : (
        <div className="max-w-xl mx-auto p-6 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm bg-white dark:bg-gray-800">
          <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">{t('postAd.postJob')}</h2>
          <form onSubmit={handleJobSubmit} className="space-y-5">
            <div>
              <label htmlFor="title" className="block font-medium mb-1 text-gray-700 dark:text-gray-300">
                {t('postAd.jobTitle')}
              </label>
              <input
                type="text"
                name="title"
                value={job.title}
                onChange={handleJobChange}
                required
                className="w-full border border-gray-300 dark:border-gray-600 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                placeholder="e.g. Frontend Developer"
              />
            </div>
            <div>
              <label htmlFor="company" className="block font-medium mb-1 text-gray-700 dark:text-gray-300">
                {t('postAd.companyName')}
              </label>
              <input
                type="text"
                name="company"
                value={job.company}
                onChange={handleJobChange}
                required
                className="w-full border border-gray-300 dark:border-gray-600 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                placeholder="e.g. Acme Corp"
              />
            </div>
            <div>
              <label className="block font-medium mb-1 text-gray-700 dark:text-gray-300">{t('postAd.jobType')}</label>
              <select
                className="w-full border border-gray-300 dark:border-gray-600 rounded-md p-2 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={job.type}
                onChange={(e) => handleJobSelect(e.target.value)}
                required
              >
                <option value="">{t('postAd.selectJobType')}</option>
                <option value="contract">{t('postAd.contract')}</option>
                <option value="part-time">{t('postAd.partTime')}</option>
                <option value="full-time">{t('postAd.fullTime')}</option>
              </select>
            </div>
            <div>
              <label htmlFor="image" className="block font-medium mb-1 text-gray-700 dark:text-gray-300">
                {t('postAd.uploadImages')}
              </label>
              <input
                ref={jobFileInputRef}
                id="image"
                type="file"
                accept="image/*"
                multiple
                onChange={handleJobFileChange}
                className="hidden"
              />
              <Button
                type="button"
                onClick={handleJobFileButtonClick}
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {t('postAd.chooseImages')}
              </Button>
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
                          onLoad={() => {
                            if (typeof file !== "string")
                              URL.revokeObjectURL(previewUrl);
                          }}
                        />
                        <button
                          type="button"
                          onClick={() => handleJobRemoveImage(index)}
                          className="absolute top-1 right-1 bg-blue-600 text-white rounded-full p-1 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 z-10"
                          aria-label="Remove image"
                        >
                          ×
                        </button>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
            <div>
              <label htmlFor="description" className="block font-medium mb-1 text-gray-700 dark:text-gray-300">
                {t('postAd.jobDescription')}
              </label>
              <textarea
                name="description"
                rows={5}
                value={job.description}
                onChange={handleJobChange}
                required
                className="w-full border border-gray-300 dark:border-gray-600 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                placeholder="Describe the role, requirements, and perks..."
              />
            </div>
            <Button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
            >
              {t('postAd.postJob')}
            </Button>
          </form>
        </div>
      )}
    </div>
  );
}

// import LocationSelector from "@/components/LocationSelector";
// import { useState } from "react";
// import { FaRegLightbulb, FaArrowLeft } from "react-icons/fa";

// // Types
// type Category = {
//   id: string;
//   name: string;
//   hasSubcategories?: boolean;
//   subcategories?: Category[];
// };

// type AdData = {
//   title: string;
//   category?: string;
//   subcategory?: string;
//   brand?: string;
// };

// // Mock data (now with full sub-subcategories)
// const CATEGORIES: Category[] = [
//   {
//     id: "buy-sell",
//     name: "Buy & Sell",
//     hasSubcategories: true,
//     subcategories: [
//       {
//         id: "arts",
//         name: "Arts & Collectibles",
//         hasSubcategories: true,
//         subcategories: [
//           { id: "paintings", name: "Paintings" },
//           { id: "sculptures", name: "Sculptures" },
//         ],
//       },
//       { id: "audio", name: "Audio" },
//       { id: "baby", name: "Baby Items" },
//       {
//         id: "bikes",
//         name: "Bikes",
//         hasSubcategories: true,
//         subcategories: [
//           { id: "honda", name: "Honda" },
//           { id: "pulsar", name: "Pulsar" },
//         ],
//       },
//     ],
//   },
//   { id: "cars", name: "Cars & Vehicles" },
//   { id: "real-estate", name: "Real Estate" },
// ];

// const MAX_TITLE_LENGTH = 50;

// export default function PostAdFlow() {
//   const [stepHistory, setStepHistory] = useState<
//     Array<"title" | "category" | "subcategory" | "brand" | "location">
//   >(["title"]);
//   const [adData, setAdData] = useState<AdData>({ title: "" });
//   const [selectedCategory, setSelectedCategory] = useState<Category | null>(
//     null
//   );
//   const [selectedSubcategory, setSelectedSubcategory] =
//     useState<Category | null>(null);

//   const currentStep = stepHistory[stepHistory.length - 1];

//   const goToStep = (newStep: typeof currentStep) => {
//     setStepHistory([...stepHistory, newStep]);
//   };

//   const goBack = () => {
//     if (stepHistory.length > 1) {
//       setStepHistory(stepHistory.slice(0, -1));
//     }
//   };

//   const handleTitleSubmit = () => {
//     if (adData.title.trim().length > 0) {
//       goToStep("category");
//     }
//   };

//   const handleCategorySelect = (category: Category) => {
//     setSelectedCategory(category);
//     if (category.hasSubcategories && category.subcategories) {
//       goToStep("subcategory");
//     } else {
//       setAdData({ ...adData, category: category.id });
//       goToStep("location");
//     }
//   };

//   const handleSubcategorySelect = (subcategory: Category) => {
//     setSelectedSubcategory(subcategory);
//     if (subcategory.hasSubcategories && subcategory.subcategories) {
//       goToStep("brand");
//     } else {
//       setAdData({ ...adData, subcategory: subcategory.id });
//       goToStep("location");
//     }
//   };

//   const handleBrandSelect = (brand: Category) => {
//     setAdData({ ...adData, brand: brand.id });

//     goToStep("location");
//   };

//   // Renders the back button (except on the first step)
//   const renderBackButton = () =>
//     stepHistory.length > 1 && (
//       <button
//         onClick={goBack}
//         className="text-blue-500 font-semibold hover:text-blue-700 mt-10 flex items-center gap-2"
//       >
//         <FaArrowLeft />
//         <span> Back</span>
//       </button>
//     );

//   const renderTitleStep = () => (
//     <div className="max-w-md mx-auto p-4">
//       <h1 className="text-2xl font-bold mb-6">Post Ad</h1>

//       <div className="mb-4">
//         <label htmlFor="ad-title" className="block text-gray-500 mb-2">
//           Ad title
//         </label>
//         <textarea
//           id="ad-title"
//           className="w-full p-2 border rounded focus-within:outline-blue-500 ring-0 focus:border-blue-200 focus:ring-0 "
//           value={adData.title}
//           onChange={(e) => setAdData({ ...adData, title: e.target.value })}
//           maxLength={MAX_TITLE_LENGTH}
//           placeholder="What are you selling?"
//         />
//         <div className="text-right text-sm text-gray-500">
//           {MAX_TITLE_LENGTH - adData.title.length}
//         </div>
//       </div>

//       <hr className="my-4" />

//       <button
//         onClick={handleTitleSubmit}
//         disabled={!adData.title.trim()}
//         className="bg-blue-500 text-white flex w-full justify-center mb-5 px-4 py-2 rounded float-right disabled:bg-gray-300"
//       >
//         Next
//       </button>

//       <div className="border border-blue-200 px-6 rounded-md py-4 flex items-center gap-4">
//         <FaRegLightbulb className="text-blue-500 text-3xl" />
//         <p className="text-sm text-gray-500 ">
//           Descriptive titles are the best fuel for high performing ads!
//         </p>
//       </div>
//       <p className="text-sm text-gray-500 mt-3 text-center">
//         Selling a car or truck?
//       </p>
//     </div>
//   );

//   const renderCategoryStep = () => (
//     <div className="max-w-md mx-auto p-4">
//       <div className="text-center">
//         <h3 className="text-lg font-semibold mb-6 text-gray-600">
//           Select a category
//         </h3>
//       </div>

//       <div className="grid grid-cols-2 gap-4">
//         {CATEGORIES.map((category) => (
//           <button
//             key={category.id}
//             onClick={() => handleCategorySelect(category)}
//             className="p-2.5 border text-sm rounded-lg hover:bg-gray-50 text-left"
//           >
//             {category.name}
//             {category.hasSubcategories && (
//               <span className="float-right">›</span>
//             )}
//           </button>
//         ))}
//       </div>
//       {renderBackButton()}
//     </div>
//   );

//   const renderSubcategoryStep = () => (
//     <div className="max-w-md mx-auto p-4">
//       <h3 className="text-lg font-semibold mb-6 text-gray-600">
//         Select a subcategory
//       </h3>
//       <h4 className="text-md font-semibold mb-6 text-gray-800">
//         {selectedCategory?.name}
//       </h4>

//       <div className="space-y-2">
//         {selectedCategory?.subcategories?.map((subcategory) => (
//           <button
//             key={subcategory.id}
//             onClick={() => handleSubcategorySelect(subcategory)}
//             className="w-full p-2.5 border-b flex justify-between items-center text-sm hover:bg-gray-50"
//           >
//             {subcategory.name}
//             {subcategory.hasSubcategories && <span>›</span>}
//           </button>
//         ))}
//       </div>

//       {renderBackButton()}
//     </div>
//   );

//   const renderBrandStep = () => (
//     <div className="max-w-md mx-auto p-4">
//       <h1 className="text-2xl font-bold mb-6">Select a brand</h1>
//       <h2 className="text-lg font-medium mb-4">
//         {selectedCategory?.name} › {selectedSubcategory?.name}
//       </h2>

//       <div className="space-y-2">
//         {selectedSubcategory?.subcategories?.map((brand) => (
//           <button
//             key={brand.id}
//             onClick={() => handleBrandSelect(brand)}
//             className="w-full p-3 border-b flex justify-between items-center hover:bg-gray-50"
//           >
//             {brand.name}
//           </button>
//         ))}
//       </div>
//       {renderBackButton()}
//     </div>
//   );

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {currentStep === "title" && renderTitleStep()}
//       {currentStep === "category" && renderCategoryStep()}
//       {currentStep === "subcategory" && renderSubcategoryStep()}
//       {currentStep === "brand" && renderBrandStep()}
//       {currentStep === "location" && (
//         <div className="mt-8">
//           <LocationSelector />
//         </div>
//       )}
//     </div>
//   );
// }
