/**
 * Firebase Configuration
 * Connected to: elitefacesbooking023
 */

export const firebaseConfig = {
  apiKey: "AIzaSyANlRkCOY_yf54mZ5MkHd3tZkh_IpNKw_E",
  authDomain: "elitefacesbooking023.firebaseapp.com",
  databaseURL: "https://elitefacesbooking023-default-rtdb.firebaseio.com",
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
 * Go to Firebase Console > Realtime Database > Rules and paste:
 *
 * {
 *   "rules": {
 *     ".read": true,
 *     ".write": false,
 *     "celebrities": {
 *       ".read": true,
 *       ".write": "auth != null"
 *     },
 *     "blogs": {
 *       ".read": true,
 *       ".write": "auth != null"
 *     },
 *     "customPages": {
 *       ".read": true,
 *       ".write": "auth != null"
 *     },
 *     "pageContents": {
 *       ".read": true,
 *       ".write": "auth != null"
 *     }
 *   }
 * }
 *
 * For testing, you can use:
 * {
 *   "rules": {
 *     ".read": true,
 *     ".write": true
 *   }
 * }
 */
