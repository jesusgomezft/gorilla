export type ConceptType = 'precision' | 'gallery' | 'jungle' | 'hybrid';

export interface CardDefect {
  id: string;
  category: 'Centering' | 'Corners' | 'Edges' | 'Surface';
  title: string;
  description: string;
  severity: 'minor' | 'moderate' | 'critical' | 'flawless';
  x: number; // percentage coordinates 0-100 on card image
  y: number;
  deduction: number;
}

export interface Subgrades {
  centering: {
    score: number;
    frontRatio: string; // e.g. "52/48 L/R, 50/50 T/B"
    backRatio: string;
    description: string;
  };
  corners: {
    score: number;
    frontScore: number;
    backScore: number;
    description: string;
  };
  edges: {
    score: number;
    frontScore: number;
    backScore: number;
    description: string;
  };
  surface: {
    score: number;
    frontScore: number;
    backScore: number;
    description: string;
  };
}

export interface GradedCard {
  id: string;
  certNumber: string;
  name: string;
  set: string;
  year: number;
  cardNumber: string;
  rarity: string;
  game: 'Pokemon' | 'Magic: The Gathering' | 'Yu-Gi-Oh!' | 'One Piece' | 'Lorcana' | 'Sports';
  language: string;
  grade: number;
  gradeLabel: 'Pristine 10' | 'Gem Mint 10' | 'Mint 9' | 'Near Mint-Mint 8.5' | 'Near Mint 8' | 'Excellent 7';
  subgrades: Subgrades;
  frontImage: string;
  backImage: string;
  slabMockupImage?: string;
  defects: CardDefect[];
  population: {
    totalGraded: number;
    higherCount: number;
    equalCount: number;
  };
  certDate: string;
  verifier: string;
  securityHash: string;
  declaredValueEur: number;
  isAuthentic: boolean;
}

export interface ServiceTier {
  id: string;
  name: string;
  tagline: string;
  turnaroundDays: number;
  turnaroundLabel: string;
  priceEur: number;
  maxDeclaredValueEur: number;
  subgradesIncluded: boolean;
  highResScans: boolean;
  priorityQueue: boolean;
  recommendedFor: string;
  badge?: string;
}

export interface OrderItem {
  id: string;
  cardName: string;
  game: string;
  set: string;
  declaredValue: number;
  serviceTierId: string;
  notes?: string;
  frontImagePreview?: string;
}

export type OrderStatus = 
  | 'SUBMITTED'
  | 'PACKAGE_RECEIVED'
  | 'PRE_INSPECTION'
  | 'OPTICAL_GRADING'
  | 'ENCAPSULATION'
  | 'QUALITY_ASSURANCE'
  | 'SHIPPED'
  | 'DELIVERED';

export interface TrackingStep {
  status: OrderStatus;
  label: string;
  description: string;
  timestamp?: string;
  completed: boolean;
  current: boolean;
}

export interface Order {
  id: string;
  trackingNumber: string;
  carrier: string;
  createdAt: string;
  status: OrderStatus;
  items: OrderItem[];
  totalPriceEur: number;
  shippingMethod: 'COURIER_INSURED' | 'CARD_SHOW_DROPOFF' | 'VAULT_STORE';
  shippingAddress?: {
    fullName: string;
    country: string;
    city: string;
    postalCode: string;
    line1: string;
  };
  steps: TrackingStep[];
  estimatedCompletion: string;
}
