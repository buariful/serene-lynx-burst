import { useState, useCallback, useEffect } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useToast } from "@/hooks/use-toast";
import { useTranslation } from 'react-i18next';

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
        className={`relative w-32 h-32 border border-gray-300 dark:border-gray-600 rounded ${
          isDragging ? "opacity-50" : "opacity-100"
        }`}
      >
        <img
          src={image.preview}
          alt={`${t('postAd.image')} ${index + 1}`}
          className="w-full h-full object-cover"
        />
        <button
          type="button"
          onClick={() => removeImage(index)}
          className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center"
          aria-label={t('postAd.removeImage')}
        >
          ×
        </button>
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
    <div>
      <h1 className="font-bold mb-4 text-gray-900 dark:text-white">
        {t('postAd.addPhotosTitle')}
      </h1>
      <p className="mb-4 text-sm text-gray-600 dark:text-gray-400">
        {t('postAd.addPhotosDescription')}
        <br />
        {t('postAd.dragDropHint')}
      </p>

      <div className="border-t border-b border-gray-200 dark:border-gray-700 py-4 mb-4">
        <h2 className="font-semibold mb-2 text-gray-900 dark:text-white">{t('postAd.menu')}</h2>
        <label className="bg-blue-500 text-white hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-xs font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 h-10 px-3 py-1 cursor-pointer">
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
            aria-label={t('postAd.selectImages')}
          />
          {t('postAd.selectImages')}
        </label>
      </div>

      <div className="flex flex-wrap gap-4 mb-6">
        {images.map((image, index) => (
          <ImageItem key={index} image={image} index={index} />
        ))}
      </div>
    </div>
  );
};

export default function PostAdDetailsPage() {
  const { t } = useTranslation();
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
  const { toast } = useToast();

  const togglePaymentOption = (option: "cashless" | "cash") => {
    setPaymentOptions((prev) => ({ ...prev, [option]: !prev[option] }));
  };

  // Required fields for submit
  const isSubmitDisabled = !title.trim() || !description.trim() || !adType;

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
      <form onSubmit={handleSubmit}>
        <div className="max-w-3xl mx-auto p-4 font-sans text-gray-800 dark:text-gray-200 bg-white dark:bg-gray-900 min-h-screen">
          {/* Ad Details Section */}
          <div className="mb-8">
            <div className="flex justify-center">
              <h1 className="text-lg font-semibold mb-6 text-gray-600 dark:text-gray-300">
                {t('postAd.adDetails')}
              </h1>
            </div>

            <div className="border-b border-gray-200 dark:border-gray-700 pb-4 mb-4">
              <h2 className="font-semibold mb-2 text-gray-900 dark:text-white">{t('postAd.selectCategory')}:</h2>
              <div className="flex items-center">
                <span className="font-medium text-gray-600 dark:text-gray-400">
                  {t('postAd.categoryPath')}
                </span>
              </div>
            </div>

            <div className="border-b border-gray-200 dark:border-gray-700 pb-4 mb-4">
              <h2 className="font-semibold mb-2 text-gray-900 dark:text-white">{t('postAd.adType')}</h2>
              <div className="space-y-2">
                <label className="flex items-center text-gray-700 dark:text-gray-300">
                  <input
                    type="radio"
                    name="adType"
                    checked={adType === "offering"}
                    onChange={() => setAdType("offering")}
                    className="mr-2 accent-green-600"
                    aria-label={t('postAd.imOffering')}
                  />
                  {t('postAd.imOffering')}
                </label>
                <label className="flex items-center text-gray-700 dark:text-gray-300">
                  <input
                    type="radio"
                    name="adType"
                    checked={adType === "wanting"}
                    onChange={() => setAdType("wanting")}
                    className="mr-2 accent-green-600"
                    aria-label={t('postAd.iWantToFind')}
                  />
                  {t('postAd.iWantToFind')}
                </label>
              </div>
            </div>

            <div className="border-b border-gray-200 dark:border-gray-700 pb-4 mb-4">
              <h2 className="font-semibold mb-2 text-gray-900 dark:text-white">{t('postAd.paymentOptional')}</h2>
              <div className="space-y-2">
                <label className="flex items-center text-gray-700 dark:text-gray-300">
                  <input
                    type="checkbox"
                    checked={paymentOptions.cashless}
                    onChange={() => togglePaymentOption("cashless")}
                    className="mr-2 accent-green-600"
                    aria-label={t('postAd.offerCashlessPayment')}
                  />
                  {t('postAd.offerCashlessPayment')}
                </label>
                <label className="flex items-center text-gray-700 dark:text-gray-300">
                  <input
                    type="checkbox"
                    checked={paymentOptions.cash}
                    onChange={() => togglePaymentOption("cash")}
                    className="mr-2 accent-green-600"
                    aria-label={t('postAd.cashAccepted')}
                  />
                  {t('postAd.cashAccepted')}
                </label>
              </div>
            </div>

            <div className="border-b border-gray-200 dark:border-gray-700 pb-4 mb-4">
              <h2 className="font-semibold mb-2 text-gray-900 dark:text-white">{t('postAd.adTitle')}:</h2>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                maxLength={70}
                aria-label={t('postAd.adTitle')}
              />
              <div className="text-xs text-gray-500 dark:text-gray-400 text-right">
                {70 - title.length} {t('postAd.charactersLeft')}
              </div>
            </div>

            <div className="border-b border-gray-200 dark:border-gray-700 pb-4 mb-4">
              <h2 className="font-semibold mb-2 text-gray-900 dark:text-white">{t('postAd.description')}:</h2>
              <label className="flex items-center mb-2 text-gray-700 dark:text-gray-300">
                <input
                  type="checkbox"
                  className="mr-2 accent-green-600"
                  checked={exposureChecked}
                  onChange={() => setExposureChecked((v) => !v)}
                  aria-label={t('postAd.increaseExposure')}
                />
                {t('postAd.increaseExposureText')}
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded h-32 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                maxLength={1000}
                aria-label={t('postAd.description')}
              />
            </div>

            <div className="border-b border-gray-200 dark:border-gray-700 pb-4 mb-4">
              <h2 className="font-semibold mb-2 text-gray-900 dark:text-white">{t('postAd.tags')}: ({t('postAd.optional')})</h2>
              <input
                type="text"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                aria-label={t('postAd.tags')}
              />
            </div>

            <div>
              <h2 className="font-semibold mb-2 text-gray-900 dark:text-white">{t('postAd.address')}:</h2>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder={t('postAd.addressPlaceholder')}
                className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                aria-label={t('postAd.address')}
              />
            </div>
          </div>

          {/* Image Upload Section */}
          <div className="mb-8">
            <ImageUploader images={images} setImages={setImages} />
          </div>

          {/* Contact Information Section */}
          <div className="mb-8">
            <h1 className="text-lg font-bold mb-4 text-gray-900 dark:text-white">{t('postAd.contactInformation')}</h1>

            <div className="border-b border-gray-200 dark:border-gray-700 pb-4 mb-4">
              <h2 className="font-semibold mb-2 text-gray-900 dark:text-white">{t('postAd.phoneNumber')}:</h2>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">({t('postAd.optional')})</p>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder={t('postAd.phonePlaceholder')}
                className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                aria-label={t('postAd.phoneNumber')}
              />
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                {t('postAd.phoneWillShow')}
              </p>
            </div>

            <div>
              <h2 className="font-semibold mb-2 text-gray-900 dark:text-white">{t('postAd.email')}:</h2>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                aria-label={t('postAd.email')}
              />
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                {t('postAd.emailNotShared')}
              </p>
            </div>
          </div>

          {/* Submit Button */}
          <button
            className="w-full bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700 text-white font-bold py-3 px-6 rounded transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            type="submit"
            disabled={isSubmitDisabled}
            aria-disabled={isSubmitDisabled}
          >
            {t('postAd.postAd')}
          </button>
        </div>
      </form>
    </DndProvider>
  );
}
