export interface MedicalDevice {
  id: string;
  name: string;
  type: string; // e.g., Diagnostic, Surgical, Monitoring
  usageInstructions: string;
  documents?: { name: string; url: string }[]; // For manuals, certificates
  images?: string[];
  availability?: 'available' | 'rented' | 'unavailable';
  // Add other relevant fields like specifications, rentalPrice, purchasePrice etc.
}