export interface HouseDesign {
  id: string;
  title: string;
  description: string;
  price: number;
  sqMeters: number;
  bedrooms: number;
  bathrooms: number;
  imageUrl: string;
  category: 'Moderni' | 'Alpski' | 'Mediteranski' | 'Mala Kuća';
  featured?: boolean;
  floors?: number;
  garage?: boolean;
  energyClass?: string;
  features?: string[];
  images?: string[];
  floorPlanUrl?: string;
  kitchen?: boolean;
  terraceArea?: number; // m²
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  content: string;
  avatarUrl: string;
}

export type ArchitectureStyle = 'Moderni' | 'Alpski' | 'Mediteranski' | 'Mala Kuća' | 'Sve';