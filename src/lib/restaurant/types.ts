export interface OpeningHours {
  day: string;
  open: string;
  close: string;
}

export interface PromotionSlot {
  time: string;
  discount: number;
}

export interface MenuItem {
  id: string;
  name: string;
  photo: string;
  price: number;
  discountedPrice?: number;
}

export interface RestaurantReview {
  id: string;
  author: string;
  date: string;
  rating: number;
  tags: string[];
  comment: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export interface OwnerProfile {
  hasMultipleBranches: boolean;
}

export interface Restaurant {
  id: string;
  slug: string;
  name: string;
  /** BUSINESS_TYPES id — คลินิก ร้านอาหาร ธนาคาร ฯลฯ */
  businessType: string;
  /** @deprecated ข้อมูลเก่า — อ่านผ่าน getRestaurantBusinessType() */
  cuisine?: string;
  branch?: string;
  /** ลิงก์เพจ Facebook ที่เจ้าของนำไปแปะ */
  facebookPageUrl?: string;
  description: string;
  address: string;
  phone: string;
  mapEmbedUrl?: string;
  hours: OpeningHours[];
  coverPhoto: string;
  gallery: string[];
  promotionSlots: PromotionSlot[];
  menu: MenuItem[];
  reviews: RestaurantReview[];
  rating: number;
  reservations: number;
  priceRange?: number;
  /** AI Summary — แท็กไฮไลต์จาก Google */
  highlightTags?: string[];
  /** AI Summary — bullet points */
  highlightBullets?: string[];
  googleReviewCount?: number;
  menuDisclaimer?: string;
  faqs?: FaqItem[];
}

export type AuthRole = "owner" | "customer" | null;
export type MockBookingMode = "reservation" | "waitlist" | null;
