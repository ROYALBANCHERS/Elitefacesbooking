
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
    bio: 'Talented actress known for her impactful performances in South Indian and Hindi films.',
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
    imageUrl: 'ESHA DEOL.jpeg',
    priceRange: 'Selective',
    followers: '2.5 Million +',
    expertise: ['Philanthropy', 'Corporate Leadership', 'Ethical Business', 'Acting']
  },
  {
    id: '5',
    name: 'ANCHOR MAYURI',
    category: 'Anchor',
    bio: 'Professional anchor and event host with expertise in managing corporate events and global concerts.',
    rating: 4.9,
    imageUrl: 'ANCHOR MAYURI.jpeg',
    priceRange: 'Contact us',
    followers: '25M+',
    expertise: ['Anchor', 'Global Concerts']
  },
  {
    id: '6',
    name: 'Soniya Sharma',
    category: 'Digital Influencers',
    bio: 'Soniya Sharma, individual Instagram Fashion creator known for her engaging content.',
    rating: 4.7,
    imageUrl: 'SONIYA SHARMA.jpeg',
    priceRange: 'Contact us',
    followers: '50k +',
    expertise: ['Gen-Z Marketing', 'Gaming Launches', 'Viral Content']
  },
  {
    id: '7',
    name: 'Anchor Naaz',
    category: 'Anchor',
    bio: 'Experienced anchor specializing in corporate events and concerts.',
    rating: 4.8,
    imageUrl: 'ANCHOR NAAZ.jpeg',
    priceRange: 'Contact us',
    followers: '100k+',
    expertise: ['Concerts', 'Corporate Events']
  },
  {
    id: '8',
    name: 'Heer khamboj',
    category: 'Fashion',
    bio: 'Dynamic all-rounder and a style icon. Known for his high-octane performance and flamboyant lifestyle.',
    rating: 4.6,
    imageUrl: 'HEER KHAMBOJ.jpeg',
    priceRange: 'Contact us',
    followers: '52k+',
    expertise: ['Sports Gear', 'WoMen\'s Grooming', 'Style Statements', 'Fashion' ]
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
  },
  {
    id: '13',
    name: 'Arbaaz Khan',
    category: 'Bollywood',
    bio: 'Versatile actor and film producer known for his roles in Bollywood and his production ventures.',
    rating: 4.5,
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7c/Arbaaz_Khan_at_the_launch_of_%27India%27s_Most_Wanted%27_trailer.jpg/800px-Arbaaz_Khan_at_the_launch_of_%27India%27s_Most_Wanted%27_trailer.jpg',
    priceRange: 'Contact us',
    followers: '3.5M+',
    expertise: ['Film Production', 'Brand Endorsement', 'Event Appearances']
  },
  {
    id: '14',
    name: 'Isha Koppikar',
    category: 'Bollywood',
    bio: 'Actress and model known for her performances in Bollywood and South Indian films. Also a former Miss India.',
    rating: 4.6,
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/Isha_Koppikar.jpg/800px-Isha_Koppikar.jpg',
    priceRange: 'Contact us',
    followers: '1.2M+',
    expertise: ['Fashion Shows', 'Brand Ambassador', 'TV Appearances']
  },
  {
    id: '15',
    name: 'Sonali Bendre',
    category: 'Bollywood',
    bio: 'Graceful actress and former model known for her memorable performances in the 90s and early 2000s.',
    rating: 4.8,
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Sonali_Bendre_in_2019.jpg/800px-Sonali_Bendre_in_2019.jpg',
    priceRange: 'Contact us',
    followers: '5.2M+',
    expertise: ['Lifestyle Branding', 'Wellness Campaigns', 'TV Shows']
  },
  {
    id: '16',
    name: 'Amrita Rao',
    category: 'Bollywood',
    bio: 'Sweet and charming actress known for her girl-next-door roles in romantic films.',
    rating: 4.7,
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Amrita_Rao_promoting_Vivah.jpg/800px-Amrita_Rao_promoting_Vivah.jpg',
    priceRange: 'Contact us',
    followers: '3.8M+',
    expertise: ['Beauty Brands', 'Fashion Endorsements', 'Lifestyle Products']
  },
  {
    id: '17',
    name: 'Ameesha Patel',
    category: 'Bollywood',
    bio: 'Talented actress who made a stunning debut and continues to captivate audiences with her performances.',
    rating: 4.6,
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/Ameesha_Patel_in_2018.jpg/800px-Ameesha_Patel_in_2018.jpg',
    priceRange: 'Contact us',
    followers: '4.1M+',
    expertise: ['Brand Promotions', 'Event Appearances', 'Product Launches']
  },
  {
    id: '18',
    name: 'Bhagyashree',
    category: 'Bollywood',
    bio: 'Beloved actress known for her iconic debut and timeless beauty. A fitness enthusiast and wellness advocate.',
    rating: 4.8,
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Bhagyashree_at_the_launch_of_%27Jai_Maa_Durga%27_trailer.jpg/800px-Bhagyashree_at_the_launch_of_%27Jai_Maa_Durga%27_trailer.jpg',
    priceRange: 'Contact us',
    followers: '2.8M+',
    expertise: ['Wellness & Fitness', 'Family Brands', 'Lifestyle Products']
  },
  {
    id: '19',
    name: 'Neha Dhupia',
    category: 'Bollywood',
    bio: 'Actress, model, and former beauty queen known for her bold roles and strong opinions.',
    rating: 4.7,
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Neha_Dhupia_at_64th_Filmfare_Awards.jpg/800px-Neha_Dhupia_at_64th_Filmfare_Awards.jpg',
    priceRange: 'Contact us',
    followers: '6.5M+',
    expertise: ['Fashion Brands', 'Talk Shows', 'Women Empowerment Campaigns']
  },
  {
    id: '20',
    name: 'Neelam Kothari',
    category: 'Bollywood',
    bio: 'Actress and jewelry designer known for her charming performances and elegant jewelry line.',
    rating: 4.5,
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Neelam_Kothari_Sonpari.jpg/800px-Neelam_Kothari_Sonpari.jpg',
    priceRange: 'Contact us',
    followers: '1.5M+',
    expertise: ['Jewelry Design', 'Fashion Brands', 'Lifestyle Products']
  },
  {
    id: '21',
    name: 'Jaya Prada',
    category: 'Bollywood',
    bio: 'Legendary actress and politician known for her exceptional dancing skills and graceful performances.',
    rating: 4.9,
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Jaya_Prada_at_Cine_Maa_Awards.jpg/800px-Jaya_Prada_at_Cine_Maa_Awards.jpg',
    priceRange: 'Contact us',
    followers: '4.2M+',
    expertise: ['Classical Dance', 'Political Campaigns', 'Brand Ambassador']
  },
  {
    id: '22',
    name: 'Pooja Banerjee',
    category: 'Bollywood',
    bio: 'Television and film actress known for her versatile acting in popular TV shows and web series.',
    rating: 4.4,
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/Pooja_Banerjee.jpg/800px-Pooja_Banerjee.jpg',
    priceRange: 'Contact us',
    followers: '850K+',
    expertise: ['TV Shows', 'Web Series', 'Brand Endorsements']
  }
];

export const CATEGORIES: Category[] = [
  'Bollywood',
  'Cricketers',
  'Digital Influencers',
  'Musicians',
  'Fashion',
  'Business',
  'Anchor'
];
