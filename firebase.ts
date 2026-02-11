/**
 * Firebase Configuration
 * Replace with your actual Firebase config from Firebase Console
 */

export const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  databaseURL: "https://YOUR_PROJECT_ID-default-rtdb.firebaseio.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
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
