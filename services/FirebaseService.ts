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
  private listeners: Map<string, () => void> = new Map();
  private readonly REQUEST_TIMEOUT_MS = 12000;

  private cache: DataContent = {
    celebrities: [],
    blogs: [],
    customPages: [],
    pageContents: [],
    lastUpdated: null
  };

  private async withTimeout<T>(promise: Promise<T>, action: string): Promise<T> {
    return Promise.race([
      promise,
      new Promise<T>((_, reject) => {
        setTimeout(() => reject(new Error(`${action} timed out after ${this.REQUEST_TIMEOUT_MS / 1000}s`)), this.REQUEST_TIMEOUT_MS);
      })
    ]);
  }

  /**
   * Initialize Firebase
   */
  async initialize(): Promise<boolean> {
    if (initialized) return true;

    try {
      console.log('🔥 Initializing Firebase...');

      // Load Firebase SDKs dynamically
      const { initializeApp } = await import('https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js');
      const { getDatabase, ref, set, get, remove, onValue, off } = await import('https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js');

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
      (this as any).remove = remove;
      (this as any).onValue = onValue;
      (this as any).off = off;

      return true;
    } catch (error: any) {
      console.error('❌ Firebase initialization error:', error?.message || error);
      return false;
    }
  }

  private async ensureInitialized(): Promise<void> {
    if (initialized) return;
    const ok = await this.initialize();
    if (!ok || !database) {
      throw new Error('Firebase initialization failed. Please verify firebase.ts config and Realtime Database rules.');
    }
  }

  /**
   * Check if Firebase is properly configured
   */
  isConfigured(): boolean {
    return firebaseConfig.apiKey !== 'YOUR_API_KEY';
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

    await this.ensureInitialized();

    try {
      const snapshot: any = await this.withTimeout((this as any).get(this.db('/')), 'Fetching Firebase data');
      if (snapshot.exists()) {
        const data = snapshot.val();
        this.cache = {
          celebrities: data.celebrities || [],
          blogs: data.blogs || [],
          customPages: data.customPages || [],
          pageContents: data.pageContents || [],
          lastUpdated: data.lastUpdated || null
        };
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
    this.ensureInitialized()
      .then(() => this.attachListener(callback))
      .catch((error) => {
        console.error('❌ Failed to attach Firebase listener:', error);
      });
  }

  private attachListener(callback: (data: DataContent) => void): void {
    // Clean old global listener before attaching a new one
    this.detachListeners();

    const rootRef = this.db('/');
    const listener = (snapshot: any) => {
      const data = snapshot?.exists?.() ? snapshot.val() : {};
      const updatedData: DataContent = {
        celebrities: data.celebrities || [],
        blogs: data.blogs || [],
        customPages: data.customPages || [],
        pageContents: data.pageContents || [],
        lastUpdated: data.lastUpdated || null
      };
      this.cache = updatedData;
      callback(updatedData);
    };

    (this as any).onValue(rootRef, listener);
    this.listeners.set('global', () => (this as any).off(rootRef, 'value', listener));
  }

  /**
   * Remove all listeners
   */
  detachListeners(): void {
    this.listeners.forEach((unsubscribe) => {
      try {
        unsubscribe();
      } catch (error) {
        console.warn('Failed to detach Firebase listener:', error);
      }
    });
    this.listeners.clear();
  }

  private async setPath(path: string, value: unknown, label: string): Promise<void> {
    await this.ensureInitialized();
    await this.withTimeout((this as any).set(this.db(path), value), label);
    await this.withTimeout((this as any).set(this.db('/lastUpdated'), new Date().toISOString()), 'Updating Firebase timestamp');
  }

  /**
   * Save celebrities
   */
  async saveCelebrities(celebrities: Celebrity[]): Promise<void> {
    try {
      console.log('💾 Saving', celebrities.length, 'celebrities to Firebase...');
      await this.setPath('/celebrities', celebrities, 'Saving celebrities');
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
    try {
      console.log('💾 Saving', blogs.length, 'blogs to Firebase...');
      await this.setPath('/blogs', blogs, 'Saving blogs');
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
    try {
      console.log('💾 Saving', pages.length, 'custom pages to Firebase...');
      await this.setPath('/customPages', pages, 'Saving custom pages');
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
    try {
      console.log('💾 Saving page contents to Firebase...');
      await this.setPath('/pageContents', contents, 'Saving page contents');
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
