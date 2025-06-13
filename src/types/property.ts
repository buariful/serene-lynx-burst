export interface Property {
  id: string;
  imageUrl: string;
  address: string;
  beds: number;
  baths: number;
  price: number;
  currency: string;
  city?: string; // Optional, for dynamic sections
}

export interface FAQItem {
  question: string;
  answer: string;
}