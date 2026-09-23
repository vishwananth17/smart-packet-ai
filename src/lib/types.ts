export type Currency = 'INR' | 'USD';

export interface ProductRecommendation {
  id: string;
  name: string;
  category: string;
  platform: 'Amazon' | 'IKEA' | 'Flipkart' | 'Pepperfry' | 'Urban Ladder' | 'Swiggy' | 'Zomato' | 'OYO' | 'Tanishq' | 'CaratLane' | 'Other';
  price: number;
  currency: Currency;
  description: string;
  matchReason: string;
  url: string;
  rating?: number;
  imageUrl?: string;
  tag?: string;
}

export interface HomePlanRequest {
  budget: number;
  currency: Currency;
  rooms: string[];
  style: string;
  items: { [itemName: string]: number };
  notes?: string;
}

export interface HomePlanResult {
  totalBudget: number;
  totalEstimatedCost: number;
  currency: Currency;
  budgetAdherencePercentage: number;
  summary: string;
  roomBreakdowns: {
    room: string;
    allocatedBudget: number;
    estimatedCost: number;
    items: ProductRecommendation[];
    designTips: string[];
  }[];
  generalTips: string[];
  costSavingAdvice: string;
  suggestedPlatforms: string[];
}

export interface PartyPlanRequest {
  budget: number;
  currency: Currency;
  guestCount: number;
  eventType: string;
  venueType: string;
  foodPreference: string;
  specialRequests?: string;
}

export interface PartyPlanResult {
  totalBudget: number;
  totalEstimatedCost: number;
  currency: Currency;
  guestCount: number;
  eventType: string;
  costPerGuest: number;
  allocations: {
    category: 'Catering & Food' | 'Venue & Stays' | 'Decoration & Lighting' | 'Entertainment & Sound' | 'Miscellaneous';
    allocatedAmount: number;
    percentage: number;
    vendorSuggestions: ProductRecommendation[];
  }[];
  timelineChecklist: {
    phase: string;
    action: string;
    deadline: string;
  }[];
  tips: string[];
}

export interface JewelryPlanRequest {
  budget: number;
  currency: Currency;
  occasion: string;
  style: string;
  metalPreference?: string;
  outfitDescription?: string;
  outfitImageBase64?: string;
  outfitImageMimeType?: string;
}

export interface JewelryPlanResult {
  totalBudget: number;
  totalEstimatedCost: number;
  currency: Currency;
  occasion: string;
  aestheticAnalysis: {
    outfitColorsDetected: string[];
    necklineDetected: string;
    recommendedMetal: string;
    overallVibe: string;
  };
  recommendations: {
    pieceType: 'Necklace / Choker' | 'Earrings / Jhumkas' | 'Bangles / Bracelets' | 'Rings' | 'Hair / Accent Piece';
    item: ProductRecommendation;
  }[];
  stylingTips: string[];
}

export interface SavedHistoryItem {
  id: string;
  type: 'home' | 'party' | 'jewelry';
  title: string;
  timestamp: string;
  budget: number;
  currency: Currency;
  data: HomePlanResult | PartyPlanResult | JewelryPlanResult;
}
