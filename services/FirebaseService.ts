/**
 * Firebase Service - Handles all Firebase Realtime Database operations
 */

import { Celebrity, BlogPost, CustomPageData } from '../types';
import { firebaseConfig } from '../firebase';

// Firebase will be loaded dynamically
let app: any = null;
let database: any = null;
let initialized = false;

interface DataContent {
  celebrities: Celebrity[];
  blogs: BlogPost[];
  customPages: CustomPageData[];
  pageContents: Array<{ id: string; title: string; content: string; section: string; imageUrl?: string }>;
  lastUpdated: string | null;
}

class FirebaseService {
  private listeners: Map<string, any> = new Map();
  private cache: DataContent = {
    celebrities: [],
    blogs: [],
    customPages: [],
    pageContents: [],
    lastUpdated: null
  };

  /**
   * Initialize Firebase
   */
  async initialize(): Promise<boolean> {
    if (initialized) return true;

    try {
      console.log('🔥 Initializing Firebase...');

      // Load Firebase SDKs dynamically
      const { initializeApp } = await import('https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js');
      const { getDatabase, ref, set, get, update, remove, onValue } = await import('https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js');

      console.log('✓ Firebase SDKs loaded');

      // Initialize Firebase
      app = initializeApp(firebaseConfig);
      database = getDatabase(app);
      initialized = true;

      console.log('✓ Firebase initialized:', firebaseConfig.projectId);

      // Store functions for later use
      (this as any).ref = ref;
      (this as any).set = set;
      (this as any).get = get;
      (this as any).update = update;
      (this as any).remove = remove;
      (this as any).onValue = onValue;

      return true;
    } catch (error: any) {
      console.error('❌ Firebase initialization error:', error?.message || error);
      alert('Firebase Error: ' + (error?.message || 'Failed to connect. Check console.'));
      return false;
    }
  }

  /**
   * Check if Firebase is properly configured
   */
  isConfigured(): boolean {
    return firebaseConfig.apiKey !== "YOUR_API_KEY";
  }

  /**
   * Get a reference to a database path
   */
  private db(path: string): any {
    if (!database) {
      throw new Error('Firebase not initialized. Call initialize() first.');
    }
    return (this as any).ref(database, path);
  }

  /**
   * Fetch all data from Firebase
   */
  async fetchAllData(): Promise<DataContent> {
    if (!this.isConfigured()) {
      throw new Error('Firebase not configured. Please update firebase.ts with your config.');
    }

    if (!initialized) {
      await this.initialize();
    }

    try {
      const snapshot = await (this as any).get(this.db('/'));
      if (snapshot.exists()) {
        const data = snapshot.val();
        this.cache = {
          celebrities: data.celebrities || [],
          blogs: data.blogs || [],
          customPages: data.customPages || [],
          pageContents: data.pageContents || [],
          lastUpdated: data.lastUpdated || null
        };
        return this.cache;
      }
      return this.cache;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  }

  /**
   * Listen to real-time updates
   */
  onDataChange(callback: (data: DataContent) => void): void {
    if (!initialized) {
      this.initialize().then(() => this.attachListener(callback));
    } else {
      this.attachListener(callback);
    }
  }

  private attachListener(callback: (data: DataContent) => void): void {
    const listener = (this as any).onValue(this.db('/'), (snapshot: any) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        const updatedData: DataContent = {
          celebrities: data.celebrities || [],
          blogs: data.blogs || [],
          customPages: data.customPages || [],
          pageContents: data.pageContents || [],
          lastUpdated: data.lastUpdated || null
        };
        this.cache = updatedData;
        callback(updatedData);
      }
    });

    this.listeners.set('global', listener);
  }

  /**
   * Remove all listeners
   */
  detachListeners(): void {
    this.listeners.forEach((listener, key) => {
      // Firebase listeners auto-cleanup when component unmounts
    });
    this.listeners.clear();
  }

  /**
   * Save celebrities
   */
  async saveCelebrities(celebrities: Celebrity[]): Promise<void> {
    if (!initialized) await this.initialize();

    try {
      console.log('💾 Saving', celebrities.length, 'celebrities to Firebase...');
      await (this as any).update(this.db('/'), {
        celebrities,
        lastUpdated: new Date().toISOString()
      });
      console.log('✓ Celebrities saved to Firebase');
    } catch (error: any) {
      console.error('❌ Error saving celebrities:', error?.message || error);
      throw new Error(error?.message || 'Failed to save celebrities');
    }
  }

  /**
   * Save blogs
   */
  async saveBlogs(blogs: BlogPost[]): Promise<void> {
    if (!initialized) await this.initialize();

    try {
      console.log('💾 Saving', blogs.length, 'blogs to Firebase...');
      await (this as any).update(this.db('/'), {
        blogs,
        lastUpdated: new Date().toISOString()
      });
      console.log('✓ Blogs saved to Firebase');
    } catch (error: any) {
      console.error('❌ Error saving blogs:', error?.message || error);
      throw new Error(error?.message || 'Failed to save blogs');
    }
  }

  /**
   * Save custom pages
   */
  async saveCustomPages(pages: CustomPageData[]): Promise<void> {
    if (!initialized) await this.initialize();

    try {
      console.log('💾 Saving', pages.length, 'custom pages to Firebase...');
      await (this as any).update(this.db('/'), {
        customPages: pages,
        lastUpdated: new Date().toISOString()
      });
      console.log('✓ Custom pages saved to Firebase');
    } catch (error: any) {
      console.error('❌ Error saving custom pages:', error?.message || error);
      throw new Error(error?.message || 'Failed to save pages');
    }
  }

  /**
   * Save page contents
   */
  async savePageContents(contents: Array<{ id: string; title: string; content: string; section: string; imageUrl?: string }>): Promise<void> {
    if (!initialized) await this.initialize();

    try {
      console.log('💾 Saving page contents to Firebase...');
      await (this as any).update(this.db('/'), {
        pageContents: contents,
        lastUpdated: new Date().toISOString()
      });
      console.log('✓ Page contents saved to Firebase');
    } catch (error: any) {
      console.error('❌ Error saving page contents:', error?.message || error);
      throw new Error(error?.message || 'Failed to save contents');
    }
  }

  /**
   * Get data from cache
   */
  getCachedData(): DataContent {
    return this.cache;
  }
}

// Export singleton instance
export const firebaseService = new FirebaseService();
export default FirebaseService;
