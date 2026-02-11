/**
 * Firebase Database Initialization Script
 * Run this to initialize Firebase with your existing data
 */

const firebaseConfig = {
  apiKey: "AIzaSyANlRkCOY_yf54mZ5MkHd3tZkh_IpNKw_E",
  authDomain: "elitefacesbooking023.firebaseapp.com",
  databaseURL: "https://elitefacesbooking023-default-rtdb.firebaseio.com",
  projectId: "elitefacesbooking023",
  storageBucket: "elitefacesbooking023.firebasestorage.app",
  messagingSenderId: "981925662056",
  appId: "1:981925662056:web:acc05984db1a47a32d1add",
  measurementId: "G-ZV9GHTZWMM"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const database = firebase.database();

// Load your existing celebrities data
const CELEBRITIES = [
  { id: "1", name: "MANNARA CHOPRA", category: "Bollywood", bio: "Actress & Model", rating: 4.8, imageUrl: "MANNARA CHOPRA.jpeg", priceRange: "₹2-5 Lakhs", followers: "1.2M", expertise: ["Brand Endorsement", "Events"] },
  { id: "2", name: "SONIYA SHARMA", category: "Anchors", bio: "Professional Anchor & Host", rating: 4.9, imageUrl: "SONIYA SHARMA.jpeg", priceRange: "₹50K - ₹1 Lakh", followers: "500K", expertise: ["Anchoring", "Events"] },
  { id: "3", name: "ANCHOR MAYURI", category: "Anchors", bio: "Television Anchor & Presenter", rating: 4.7, imageUrl: "ANCHOR MAYURI.jpeg", priceRange: "₹50K - ₹1 Lakh", followers: "300K", expertise: ["Anchoring", "TV Shows"] },
  { id: "4", name: "HEER KHAMBOJ", category: "Anchors", bio: "Event Anchor & Host", rating: 4.8, imageUrl: "HEER KHAMBOJ.jpeg", priceRange: "₹50K - ₹1 Lakh", followers: "250K", expertise: ["Anchoring", "Corporate Events"] },
  { id: "5", name: "TUSHAR KAPOOR", category: "Anchors", bio: "Radio & TV Anchor", rating: 4.6, imageUrl: "TUSHAR KAPOOR.jpeg", priceRange: "₹50K - ₹1 Lakh", followers: "200K", expertise: ["Radio", "TV Anchoring"] },
  { id: "6", name: "ANCHOR NAAZ", category: "Anchors", bio: "Event Anchor", rating: 4.7, imageUrl: "ANCHOR NAAZ.jpeg", priceRange: "₹50K - ₹1 Lakh", followers: "180K", expertise: ["Anchoring", "Events"] },
  { id: "7", name: "ESHA DEOL", category: "Bollywood", bio: "Actress & Model", rating: 4.5, imageUrl: "ESHA DEOL.jpeg", priceRange: "₹3-6 Lakhs", followers: "800K", expertise: ["Brand Endorsement", "Events"] }
];

// Write to Firebase
database.ref('/').set({
  celebrities: CELEBRITIES,
  blogs: [],
  customPages: [],
  pageContents: [
    { id: 'hero-title', title: 'Hero Title', content: 'Elevate Your Brand with Iconic Faces', section: 'home' },
    { id: 'hero-subtitle', title: 'Hero Subtitle', content: "India's Leading Talent Agency", section: 'home' }
  ],
  lastUpdated: new Date().toISOString()
}).then(() => {
  console.log('✓ Firebase Database initialized successfully!');
  console.log('Celebrities:', CELEBRITIES.length, 'added');
}).catch((error) => {
  console.error('✗ Firebase initialization failed:', error);
});
