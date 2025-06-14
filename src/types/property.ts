export interface Property {
  id: string;
  imageUrl: string;
  address: string;
  beds: number;
  baths: number;
  price: number;
  currency: string;
  city?: string; // Optional, for dynamic sections
  amenities?: string[]; // New field for amenities
  lat?: number; // Optional: latitude for map markers
  lng?: number; // Optional: longitude for map markers
}

export interface FAQItem {
  question: string;
  answer: string;
}