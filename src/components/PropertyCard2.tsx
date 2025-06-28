import React, { useState } from "react";
import { Property } from "@/types/property";
import { Button } from "@/components/ui/button";
import {
  BedDouble,
  Bath,
  ParkingCircle,
  Building,
  WashingMachine,
} from "lucide-react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";

interface SearchResultPropertyCardProps {
  property: Property;
  onAddressClick?: (property: Property) => void;
  showDetails?: boolean;
}

const amenityIcons: { [key: string]: React.ElementType } = {
  Elevator: Building,
  Laundry: WashingMachine,
  Parking: ParkingCircle,
};

const PropertyCard2: React.FC<SearchResultPropertyCardProps> = ({
  property,
  onAddressClick,
  showDetails = false,
}) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // Expanded details state
  const [showTab, setShowTab] = useState<"images" | "map">("images");
  const [open, setOpen] = useState(false);
  const [fullscreenOpen, setFullscreenOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!phone || !email) {
      setError("Phone and email are required.");
      return;
    }
    // Simulate submit
    alert("Request sent!");
    setIsDialogOpen(false);
    setPhone("");
    setEmail("");
    setMessage("");
  };

  if (showDetails) {
    // Dummy data for sections not in Property type
    const images = [
      property.imageUrl,
      "https://www.narcity.com/media-library/a-row-of-homes-in-kingston-ontario.jpg?id=34794961&width=1245&height=700&coordinates=45%2C0%2C45%2C0",
      "https://www.squareyards.ca/blog/wp-content/uploads/2022/05/Rental-House-in-Canada.jpg",
    ];
    const propertySummary =
      "This modern apartment offers comfortable living space, featuring a secure building, convenient parking, and a range of amenities. Utilities such as water and heating are included for your convenience.";
    const phoneInfo = "(555) 123-4567";
    const emailInfo = "info@property.com";
    const addressInfo = property.address;
    const handleConfirm = () => {
      setOpen(false);
      alert("Booking confirmed! The property manager will contact you soon.");
    };
    return (
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-6 relative">
        <button
          className="absolute top-4 left-4 bg-blue-600 text-white z-10  px-4 py-2 rounded hover:bg-blue-700 font-bold"
          onClick={() => onAddressClick && onAddressClick(null)}
        >
          ← Back
        </button>
        {/* Gallery & Map Tabs */}
        <div className="mb-6">
          <div className="w-full">
            <div className="mb-4 flex gap-2">
              {/* <button
                className={`px-4 py-2 rounded font-semibold ${
                  showTab === "images"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-700"
                }`}
                onClick={() => setShowTab("images")}
              >
                Images
              </button>
              <button
                className={`px-4 py-2 rounded font-semibold ${
                  showTab === "map"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-700"
                }`}
                onClick={() => setShowTab("map")}
              >
                Map
              </button> */}
            </div>
            {showTab === "images" && (
              <div className="relative mt-12">
                <div className="w-full mx-auto">
                  <div className="flex overflow-x-auto gap-4">
                    {images.map((src, idx) => (
                      <img
                        key={src}
                        src={src}
                        alt={`Property image ${idx + 1}`}
                        className="rounded-lg w-80 h-60 object-cover flex-shrink-0"
                      />
                    ))}
                  </div>
                </div>
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
                {fullscreenOpen && (
                  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90">
                    <button
                      className="absolute top-6 right-8 z-20 bg-white/80 hover:bg-white rounded-full p-2 shadow border border-gray-200"
                      onClick={() => setFullscreenOpen(false)}
                      title="Close Fullscreen"
                    >
                      <svg
                        className="w-7 h-7 text-blue-600"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                    <div className="w-full h-full flex items-center justify-center">
                      <div className="w-full max-w-4xl mx-auto flex gap-4 overflow-x-auto">
                        {images.map((src, idx) => (
                          <img
                            key={src}
                            src={src}
                            alt={`Property image ${idx + 1}`}
                            className="rounded-lg w-[80vw] h-[80vh] object-contain bg-black"
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
            {/* {showTab === "map" && (
              <div className="w-full h-80 rounded-lg overflow-hidden bg-gray-100 flex items-center justify-center">
         
                <span className="text-gray-500">[Map Placeholder]</span>
              </div>
            )} */}
          </div>
        </div>
        {/* Floor Plans */}
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-blue-600 mb-2">
            Floor Plans
          </h3>
          <div className="bg-gray-50 rounded p-4">
            2 Bedrooms, {property.baths} bath, 700 sq ft. Spacious open-concept
            living and dining area, modern kitchen, and private balcony.
          </div>
        </div>
        {/* Parking Information */}
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-blue-600 mb-2">
            Parking Information
          </h3>
          <div className="bg-gray-50 rounded p-4">
            Parking types: Garage Parking. 1 reserved spot included. Visitor
            parking available.
          </div>
        </div>
        {/* Features and Amenities */}
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-blue-600 mb-2">
            Features & Amenities
          </h3>
          <div className="bg-gray-50 rounded p-4">
            {property.amenities?.join(", ") || "No amenities listed."}
          </div>
        </div>
        {/* Utilities Included */}
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-blue-600 mb-2">
            Utilities Included
          </h3>
          <div className="bg-gray-50 rounded p-4">
            Water, Heating, Garbage collection, Building insurance.
          </div>
        </div>
        {/* Summary */}
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-blue-600 mb-2">Summary</h3>
          <div className="bg-gray-50 rounded p-4">{propertySummary}</div>
        </div>
        {/* Neighborhood */}
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-blue-600 mb-2">
            Neighborhood
          </h3>
          <div className="bg-gray-50 rounded p-4">
            Located in a vibrant neighborhood with easy access to public
            transit, shopping, restaurants, and parks. Walk score: 92/100.
          </div>
        </div>
        {/* Pet Policy */}
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-blue-600 mb-2">
            Pet Policy
          </h3>
          <div className="bg-gray-50 rounded p-4">
            Pets allowed with restrictions. Please contact for details.
          </div>
        </div>
        {/* Contact Info & Booking Button */}
        <div className="bg-white rounded-lg shadow border p-6 flex flex-col gap-4 mt-8">
          <div>
            <h3 className="text-lg font-semibold mb-2">Contact Information</h3>
            <div className="mb-2">
              <span className="font-medium">Phone:</span> {phoneInfo}
            </div>
            <div className="mb-2">
              <span className="font-medium">Email:</span> {emailInfo}
            </div>
            <div className="mb-2">
              <span className="font-medium">Address:</span> {addressInfo}
            </div>
            <div className="mb-2 text-gray-500 text-sm">
              Available 9am - 6pm, Mon-Fri
            </div>
          </div>
          <button
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded"
            onClick={() => setOpen(true)}
          >
            Book This Property
          </button>
          {/* Booking Modal */}
          {open && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
              <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full relative">
                <button
                  className="absolute top-2 right-2 text-gray-400 hover:text-gray-700"
                  onClick={() => setOpen(false)}
                  title="Close"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
                <h2 className="text-xl font-bold mb-4">Confirm Your Booking</h2>
                <div className="mb-2 font-medium">Summary:</div>
                <div className="text-gray-700 mb-4 text-sm">
                  {propertySummary}
                </div>
                <div className="flex justify-end gap-3 mt-6">
                  <button
                    className="px-4 py-2 rounded border border-gray-300 bg-white hover:bg-gray-100"
                    onClick={() => setOpen(false)}
                  >
                    Cancel
                  </button>
                  <button
                    className="px-4 py-2 rounded bg-blue-600 text-white font-bold hover:bg-blue-700"
                    onClick={handleConfirm}
                  >
                    Confirm
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div
      className={`bg-white  shadow-md overflow-hidden   transition-all duration-200 `}
    >
      <div className="w-full bg-red-500 flex-shrink-0">
        <img
          src={
            property.imageUrl ||
            "https://via.placeholder.com/300x200?text=No+Image"
          }
          alt={property.address}
          className="w-full h-full max-h-[50vh] object-cover"
        />
      </div>
      <div className="py-3 px-4">
        <div>
          <button
            className="text-xl hover:underline font-semibold text-gray-800 bg-transparent border-none p-0 m-0 cursor-pointer"
            onClick={() => onAddressClick && onAddressClick(property)}
            type="button"
          >
            {property.address}
          </button>
        </div>
        <div className=" grid grid-cols-12">
          <div className="col-span-8">
            <div className="flex items-center  text-gray-600 mb-1 space-x-2">
              <span className="flex items-center">
                <BedDouble className="w-3 h-3 mr-1" /> {property.beds} Bed
              </span>
              <span className="flex items-center">
                <Bath className="w-3 h-3 mr-1" /> {property.baths} Bath
              </span>
            </div>
            {property.amenities && property.amenities.length > 0 && (
              <div className=" text-gray-500 mb-2 flex flex-wrap items-center gap-x-2 gap-y-1">
                {property.amenities.slice(0, 3).map((amenity) => {
                  const IconComponent = amenityIcons[amenity];
                  return (
                    <span key={amenity} className="flex items-center">
                      {IconComponent && (
                        <IconComponent className="w-3 h-3 mr-0.5" />
                      )}
                      {amenity}
                    </span>
                  );
                })}
              </div>
            )}
            <p className=" font-bold text-blue-600 ">
              ${property.price.toLocaleString()} {property.currency}/month
            </p>
          </div>

          <div className="mt-auto ml-auto col-span-4">
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button
                  variant="default"
                  size="sm"
                  className="bg-blue-600 hover:bg-blue-700 text-white text-xs h-8 font-bold"
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsDialogOpen(true);
                  }}
                >
                  Check Availability
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[400px]">
                <DialogHeader>
                  <DialogTitle>Check Availability</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Phone
                    </label>
                    <Input
                      id="phone"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      type="tel"
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Email
                    </label>
                    <Input
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      type="email"
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Message
                    </label>
                    <Input
                      id="message"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      type="text"
                      placeholder="Optional message"
                    />
                  </div>
                  {error && <div className="text-red-600 text-sm">{error}</div>}
                  <DialogFooter>
                    <DialogClose asChild>
                      <Button type="button" variant="ghost">
                        Cancel
                      </Button>
                    </DialogClose>
                    <Button
                      type="submit"
                      className="bg-blue-600 hover:bg-blue-700 text-white"
                    >
                      Send Request
                    </Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard2;
