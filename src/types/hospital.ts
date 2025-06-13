export interface Hospital {
  id: string;
  name: string;
  logoComponent?: React.ReactNode; // For custom logo, otherwise we use a default
}