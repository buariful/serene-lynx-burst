export interface FloorPlan {
  id: string;
  bedrooms: string;
  bathrooms: string;
  rent: string; // Using string for input flexibility, can be parsed to number
  unitSize: string; // e.g., "sq ft"
  availabilityDate: Date | undefined;
}

export interface OpenHouseDate {
  id: string;
  date: Date | undefined;
  startTime: string;
  endTime: string;
}

export interface Amenity {
  id: string;
  label: string;
  checked: boolean;
}

export interface AmenityCategory {
  id: string;
  name: string;
  amenities: Amenity[];
}
