/**
 * Firebase Configuration
 * Connected to: elitefacesbooking023
 */

export const firebaseConfig = {
  apiKey: "AIzaSyANlRkCOY_yf54mZ5MkHd3tZkh_IpNKw_E",
  authDomain: "elitefacesbooking023.firebaseapp.com",
  // NOTE: This project is hosted in asia-southeast1, so use the regional RTDB URL.
  // Using the legacy firebaseio URL can cause inconsistent behavior in some environments.
  databaseURL: "https://elitefacesbooking023-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "elitefacesbooking023",
  storageBucket: "elitefacesbooking023.firebasestorage.app",
  messagingSenderId: "981925662056",
  appId: "1:981925662056:web:acc05984db1a47a32d1add",
  measurementId: "G-ZV9GHTZWMM"
};

/**
 * Instructions to get your Firebase config:
 *
 * 1. Go to https://console.firebase.google.com/
 * 2. Create a new project or select existing
 * 3. Go to Project Settings (gear icon)
 * 4. Scroll down to "Your apps" section
 * 5. Click on web app (</>) icon
 * 6. Copy the config object
 * 7. Paste above in firebaseConfig
 * 8. Enable Realtime Database:
 *    - Go to Build > Realtime Database
 *    - Click "Create Database"
 *    - Select location
 *    - Start in test mode or production mode
 *    - Set security rules (see below)
 */

/**
 * Security Rules for Realtime Database
 *
 * For exact production-safe rules (public read + admin-only write), see:
 * - FIREBASE_RULES.md
 *
 * Quick debug rules (temporary only):
 * {
 *   "rules": {
 *     ".read": true,
 *     ".write": true
 *   }
 * }
 */
