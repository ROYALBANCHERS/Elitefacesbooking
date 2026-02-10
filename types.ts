
export type Category = 'Bollywood' | 'Cricketers' | 'Digital Influencers' | 'Musicians' | 'Fashion' | 'Business' | 'Anchor';

export interface Celebrity {
  id: string;
  name: string;
  category: Category;
  bio: string;
  rating: number;
  imageUrl: string;
  priceRange: string;
  followers: string;
  expertise: string[];
}

export interface BookingDetails {
  celebrityId: string;
  eventType: string;
  eventDate: string;
  location: string;
  duration: string;
  additionalInfo: string;
  userName: string;
  userEmail: string;
}

export interface RecommendationRequest {
  brandGoal: string;
  targetAudience: string;
  budget: string;
}

// Blog Types
export interface BlogPost {
  id: string;
  title: string;
  content: string;
  excerpt?: string;
  category: string;
  section: string;
  imageUrl: string;
  date: string;
  author?: string;
  published: boolean;
  slug?: string;
}

// Custom Page Types
export interface CustomPageData {
  id: string;
  title: string;
  slug: string;
  content: string;
  section: string;
  imageUrl?: string;
  createdAt: string;
  updatedAt: string;
  published: boolean;
  metaDescription?: string;
}

// Page Content Types
export interface PageContent {
  id: string;
  title: string;
  content: string;
  section: string;
  imageUrl?: string;
}
