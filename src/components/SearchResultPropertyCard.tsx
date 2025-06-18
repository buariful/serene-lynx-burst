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

interface SearchResultPropertyCardProps {
  property: Property;
  // onHover?: (id: string | null) => void; // Removed
  // onClick?: (id: string) => void; // Removed
  // isHighlighted?: boolean; // Removed
}

const amenityIcons: { [key: string]: React.ElementType } = {
  Elevator: Building,
  Laundry: WashingMachine,
  Parking: ParkingCircle,
};

const SearchResultPropertyCard: React.FC<SearchResultPropertyCardProps> = ({
  property,
}) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

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

  return (
    <div
      className={`bg-white rounded-lg shadow-md overflow-hidden flex border border-gray-200 hover:shadow-lg transition-all duration-200 cursor-pointer`}
      // onMouseEnter, onMouseLeave, onClick related to map interaction removed
    >
      {/* Left Column (40%): Image */}
      <div className="w-2/5 flex-shrink-0">
        <img
          src={
            property.imageUrl ||
            "https://via.placeholder.com/300x200?text=No+Image"
          }
          alt={property.address}
          className="w-full h-40 object-cover"
        />
      </div>

      {/* Right Column (60%): Details */}
      <div className="w-3/5 p-3 flex flex-col justify-between">
        <div>
          <h3
            className="text-sm font-semibold text-gray-800 mb-1 truncate"
            title={property.address}
          >
            {property.address}
          </h3>
          <div className="flex items-center text-xs text-gray-600 mb-1 space-x-2">
            <span className="flex items-center">
              <BedDouble className="w-3 h-3 mr-1" /> {property.beds} Bed
            </span>
            <span className="flex items-center">
              <Bath className="w-3 h-3 mr-1" /> {property.baths} Bath
            </span>
          </div>
          {property.amenities && property.amenities.length > 0 && (
            <div className="text-xs text-gray-500 mb-2 flex flex-wrap items-center gap-x-2 gap-y-1">
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
        </div>

        <div className="mt-auto">
          <p className="text-sm font-bold text-blue-600 mb-2">
            ${property.price.toLocaleString()} {property.currency}/month
          </p>
          <div className="flex justify-end">
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

export default SearchResultPropertyCard;
