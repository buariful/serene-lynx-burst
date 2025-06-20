import { useState, useCallback, useEffect } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useToast } from "@/hooks/use-toast";

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
        className={`relative w-32 h-32 border rounded ${
          isDragging ? "opacity-50" : "opacity-100"
        }`}
      >
        <img
          src={image.preview}
          alt={`Ad image ${index + 1}`}
          className="w-full h-full object-cover"
        />
        <button
          type="button"
          onClick={() => removeImage(index)}
          className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center"
          aria-label="Remove image"
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
      <h1 className="font-bold mb-4">
        Add photos to attract interest to your ad
      </h1>
      <p className="mb-4 text-sm">
        Include pictures with different angles and details. You can upload a
        maximum of 10 photos, that are at least 300px wide or tall (we recommend
        at least 1000px).
        <br />
        Drag and drop to change the order of your pictures.
      </p>

      <div className="border-t border-b py-4 mb-4">
        <h2 className="font-semibold mb-2">Menu</h2>
        <label className="bg-blue-500  text-primary-foreground hover:bg-blue-600 inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-xs font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 h-10 px-3 py-1 cursor-pointer ">
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
            aria-label="Select images to upload"
          />
          Select Images
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
      title: "Ad posted successfully!",
      description: "Your ad has been posted and is now live.",
    });
    // Optionally clear the form here
    // setTitle(""); setDescription(""); setAdType(undefined); ...
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <form onSubmit={handleSubmit}>
        <div className="max-w-3xl mx-auto p-4 font-sans text-gray-800">
          {/* Ad Details Section */}
          <div className="mb-8">
            <div className="flex justify-center">
              <h1 className="text-lg font-semibold mb-6 text-gray-600">
                Ad Details
              </h1>
            </div>

            <div className="border-b pb-4 mb-4">
              <h2 className=" font-semibold mb-2">Select Category:</h2>
              <div className="flex items-center">
                <span className="font-medium text-gray-600">
                  Services &gt; Childcare & Nanny
                </span>
              </div>
            </div>

            <div className="border-b pb-4 mb-4">
              <h2 className=" font-semibold mb-2">Ad Type</h2>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="adType"
                    checked={adType === "offering"}
                    onChange={() => setAdType("offering")}
                    className="mr-2 accent-green-600"
                    aria-label="I'm offering"
                  />
                  I'm offering
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="adType"
                    checked={adType === "wanting"}
                    onChange={() => setAdType("wanting")}
                    className="mr-2 accent-green-600"
                    aria-label="I want to find"
                  />
                  I want to find
                </label>
              </div>
            </div>

            <div className="border-b pb-4 mb-4">
              <h2 className="font-semibold mb-2">NEW Payment (optional)</h2>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={paymentOptions.cashless}
                    onChange={() => togglePaymentOption("cashless")}
                    className="mr-2 accent-green-600"
                    aria-label="Offer cashless payment"
                  />
                  Offer cashless payment
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={paymentOptions.cash}
                    onChange={() => togglePaymentOption("cash")}
                    className="mr-2 accent-green-600"
                    aria-label="Cash accepted"
                  />
                  Cash accepted
                </label>
              </div>
            </div>

            <div className="border-b pb-4 mb-4">
              <h2 className="font-semibold mb-2">Ad title:</h2>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full p-2 border rounded focus-within:outline-blue-500 ring-0 focus:border-blue-200 focus:ring-0 "
                maxLength={70}
                aria-label="Ad title"
              />
              <div className="text-xs text-gray-500 text-right">
                {70 - title.length} characters left
              </div>
            </div>

            <div className="border-b pb-4 mb-4">
              <h2 className="font-semibold mb-2">Description:</h2>
              <label className="flex items-center mb-2">
                <input
                  type="checkbox"
                  className="mr-2 accent-green-600"
                  checked={exposureChecked}
                  onChange={() => setExposureChecked((v) => !v)}
                  aria-label="Increase your ad exposure"
                />
                Increase your ad exposure. Enter up to 5 keywords someone could
                search to find your ad.
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full p-2 border rounded h-32 focus-within:outline-blue-500 ring-0 focus:border-blue-200 focus:ring-0 "
                maxLength={1000}
                aria-label="Ad description"
              />
            </div>

            <div className="border-b pb-4 mb-4">
              <h2 className="font-semibold mb-2">Tags: (optional)</h2>
              <input
                type="text"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                className="w-full p-2 border rounded focus-within:outline-blue-500 ring-0 focus:border-blue-200 focus:ring-0 "
                aria-label="Tags"
              />
            </div>

            <div>
              <h2 className="font-semibold mb-2">Address:</h2>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Enter your postal code and/or street address above and select it from the suggested list."
                className="w-full p-2 border rounded focus-within:outline-blue-500 ring-0 focus:border-blue-200 focus:ring-0 "
                aria-label="Address"
              />
            </div>
          </div>

          {/* Image Upload Section */}
          <div className="mb-8">
            <ImageUploader images={images} setImages={setImages} />
          </div>

          {/* Contact Information Section */}
          <div className="mb-8">
            <h1 className="text-lg font-bold mb-4">Contact Information</h1>

            <div className="border-b pb-4 mb-4">
              <h2 className="font-semibold mb-2">Phone number:</h2>
              <p className="text-sm text-gray-600 mb-2">(optional)</p>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="e.g. 123 456 7890"
                className="w-full p-2 border rounded focus-within:outline-blue-500 ring-0 focus:border-blue-200 focus:ring-0 "
                aria-label="Phone number"
              />
              <p className="text-sm text-gray-600 mt-1">
                Your phone number will show up on your Ad.
              </p>
            </div>

            <div>
              <h2 className=" font-semibold mb-2">Email:</h2>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2 border rounded focus-within:outline-blue-500 ring-0 focus:border-blue-200 focus:ring-0 "
                aria-label="Email"
              />
              <p className="text-sm text-gray-600 mt-1">
                Your email address will not be shared with others.
              </p>
            </div>
          </div>

          {/* Submit Button */}
          <button
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded"
            type="submit"
            disabled={isSubmitDisabled}
            aria-disabled={isSubmitDisabled}
          >
            Post Ad
          </button>
        </div>
      </form>
    </DndProvider>
  );
}
