
export type Category = 'Bollywood' | 'Cricketers' | 'Digital Influencers' | 'Musicians' | 'Fashion' | 'Business';

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
