
import { Celebrity, Category } from './types';

export const CELEBRITIES: Celebrity[] = [
  {
    id: '1',
    name: 'TUSSHAR KAPOOR',
    category: 'Bollywood',
    bio: 'The "Star of Bollywood", a global icon known for his charisma and unparalleled stardom across the globe.',
    rating: 5.0,
    imageUrl: 'TUSHAR KAPOOR.jpeg',
    priceRange: 'Contact us',
    followers: '8 Million +',
    expertise: ['Brand Endorsement', 'Keynote Speaking', 'Grand Appearances']
  },
  {
    id: '2',
    name: 'MANNARA CHOPRA',
    category: 'Bollywood',
    bio: '.',
    rating: 5.0,
    imageUrl: 'MANNARA CHOPRA.jpeg',
    priceRange: 'Contact us',
    followers: '2 Million+',
    expertise: ['Actor Branding', 'Fitness Apps', 'Youth Motivation']
  },
  {
    id: '3',
    name: 'Deepika Padukone',
    category: 'Bollywood',
    bio: 'One of the highest-paid actresses in India, known for her elegance and powerful performances.',
    rating: 4.9,
    imageUrl: 'https://assets.vogue.in/photos/5df9ba277c02da0008038eb6/master/w_800,c_limit/2006-1-Deepika-Padukone-makeup-hairstyle-auto=format&fit=crop&q=80&w=800',
    priceRange: 'Contact us',
    followers: '75M+',
    expertise: ['Luxury Fashion', 'Mental Health Advocacy', 'Global Events']
  },
  {
    id: '4',
    name: 'ESHA DEOL',
    category: 'Business',
    bio: 'Legendary industrialist and philanthropist. The most respected voice in the Indian corporate world.',
    rating: 5.0,
    imageUrl: 'https://assets.vogue.in/photos/5df9ba277c02da0008038eb6/master/w_800,c_limit/2006-1-Deepika-Padukone-makeup-hairstyle-auto=format&fit=crop&q=80&w=800',
    priceRange: 'Selective',
    followers: '12M+',
    expertise: ['Philanthropy', 'Corporate Leadership', 'Ethical Business']
  },
  {
    id: '5',
    name: 'A.R. Rahman',
    category: 'Musicians',
    bio: 'Oscar-winning composer and the "Mozart of Madras". A musical genius with global appeal.',
    rating: 4.9,
    imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=800',
    priceRange: 'Contact us',
    followers: '25M+',
    expertise: ['Musical Compositions', 'Global Concerts', 'Tech Partnerships']
  },
  {
    id: '6',
    name: 'CarryMinati',
    category: 'Digital Influencers',
    bio: 'Ajey Nagar, India\'s biggest individual YouTuber, known for his roasting and gaming content.',
    rating: 4.7,
    imageUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=800',
    priceRange: 'Contact us',
    followers: '40M+',
    expertise: ['Gen-Z Marketing', 'Gaming Launches', 'Viral Content']
  },
  {
    id: '7',
    name: 'Alia Bhatt',
    category: 'Bollywood',
    bio: 'Versatile actress and producer. One of the most bankable and influential faces in modern cinema.',
    rating: 4.8,
    imageUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=800',
    priceRange: 'Contact us',
    followers: '82M+',
    expertise: ['Lifestyle Brands', 'Sustainability', 'Youth Appeal']
  },
  {
    id: '8',
    name: 'Hardik Pandya',
    category: 'Cricketers',
    bio: 'Dynamic all-rounder and a style icon. Known for his high-octane performance and flamboyant lifestyle.',
    rating: 4.6,
    imageUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=800',
    priceRange: 'Contact us',
    followers: '28M+',
    expertise: ['Sports Gear', 'Men\'s Grooming', 'Style Statements']
  },
  {
    id: '9',
    name: 'Shreya Ghoshal',
    category: 'Musicians',
    bio: 'The queen of melody. One of the most honored and loved playback singers in the country.',
    rating: 4.9,
    imageUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=800',
    priceRange: 'Contact us',
    followers: '28M+',
    expertise: ['Singing Appearances', 'Jewelry Brands', 'Traditional Wear']
  },
  {
    id: '10',
    name: 'Zakir Khan',
    category: 'Digital Influencers',
    bio: 'The "Sakht Launda" of Indian stand-up comedy. A master storyteller with a massive loyal following.',
    rating: 4.8,
    imageUrl: 'https://images.unsplash.com/photo-1506803682981-6e718a9dd3ee?auto=format&fit=crop&q=80&w=800',
    priceRange: 'Contact us',
    followers: '6M+',
    expertise: ['Storytelling Ads', 'University Events', 'Tech Reviews']
  },
  {
    id: '11',
    name: 'Neeraj Chopra',
    category: 'Cricketers',
    bio: 'Olympic Gold Medalist and a national hero. The face of discipline, hard work, and athletic excellence.',
    rating: 4.9,
    imageUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=800',
    priceRange: 'Contact us',
    followers: '9M+',
    expertise: ['Institutional Ads', 'Sports Gear', 'Government Campaigns']
  },
  {
    id: '12',
    name: 'Ranveer Singh',
    category: 'Bollywood',
    bio: 'Known for his high energy and versatile acting. The ultimate fashion trailblazer in the Indian industry.',
    rating: 4.8,
    imageUrl: 'https://images.unsplash.com/photo-1552374196-c4e7ffc6e126?auto=format&fit=crop&q=80&w=800',
    priceRange: 'Contact us',
    followers: '45M+',
    expertise: ['Fashion Retail', 'High Energy Ads', 'Product Launches']
  }
];

export const CATEGORIES: Category[] = [
  'Bollywood',
  'Cricketers',
  'Digital Influencers',
  'Musicians',
  'Fashion',
  'Business'
];
