/**
 * DataService - Manages persistent data storage
 * This service ensures admin changes are saved to a JSON file
 * and can be committed to git for deployment
 */

import { Celebrity, BlogPost, CustomPageData } from '../types';

interface DataContent {
  celebrities: Celebrity[];
  blogs: BlogPost[];
  customPages: CustomPageData[];
  pageContents: Array<{ id: string; title: string; content: string; section: string; imageUrl?: string }>;
  lastUpdated: string | null;
}

const LOCAL_STORAGE_KEYS = {
  CELEBRITIES: 'elitefaces_celebrities',
  BLOGS: 'elitefaces_blogs',
  CUSTOM_PAGES: 'elitefaces_custom_pages',
  PAGE_CONTENTS: 'elitefaces_page_contents',
  LAST_SYNC: 'elitefaces_last_sync'
};

class DataService {
  private data: DataContent = {
    celebrities: [],
    blogs: [],
    customPages: [],
    pageContents: [
      { id: 'hero-title', title: 'Hero Title', content: 'Elevate Your Brand with Iconic Faces', section: 'home' },
      { id: 'hero-subtitle', title: 'Hero Subtitle', content: "India's Leading Talent Agency", section: 'home' }
    ],
    lastUpdated: null
  };

  constructor() {
    this.loadFromLocalStorage();
  }

  /**
   * Load data from localStorage (browser-specific data)
   * This is used as a fallback and for admin preview
   */
  private loadFromLocalStorage(): void {
    try {
      const savedCelebrities = localStorage.getItem(LOCAL_STORAGE_KEYS.CELEBRITIES);
      const savedBlogs = localStorage.getItem(LOCAL_STORAGE_KEYS.BLOGS);
      const savedCustomPages = localStorage.getItem(LOCAL_STORAGE_KEYS.CUSTOM_PAGES);
      const savedPageContents = localStorage.getItem(LOCAL_STORAGE_KEYS.PAGE_CONTENTS);

      if (savedCelebrities) this.data.celebrities = JSON.parse(savedCelebrities);
      if (savedBlogs) this.data.blogs = JSON.parse(savedBlogs);
      if (savedCustomPages) this.data.customPages = JSON.parse(savedCustomPages);
      if (savedPageContents) this.data.pageContents = JSON.parse(savedPageContents);
    } catch (error) {
      console.error('Error loading from localStorage:', error);
    }
  }

  /**
   * Save data to localStorage
   */
  private saveToLocalStorage(): void {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEYS.CELEBRITIES, JSON.stringify(this.data.celebrities));
      localStorage.setItem(LOCAL_STORAGE_KEYS.BLOGS, JSON.stringify(this.data.blogs));
      localStorage.setItem(LOCAL_STORAGE_KEYS.CUSTOM_PAGES, JSON.stringify(this.data.customPages));
      localStorage.setItem(LOCAL_STORAGE_KEYS.PAGE_CONTENTS, JSON.stringify(this.data.pageContents));
      localStorage.setItem(LOCAL_STORAGE_KEYS.LAST_SYNC, new Date().toISOString());
    } catch (error) {
      console.error('Error saving to localStorage:', error);
    }
  }

  /**
   * Get celebrities
   */
  getCelebrities(): Celebrity[] {
    return this.data.celebrities;
  }

  /**
   * Set celebrities
   */
  setCelebrities(celebrities: Celebrity[]): void {
    this.data.celebrities = celebrities;
    this.data.lastUpdated = new Date().toISOString();
    this.saveToLocalStorage();
  }

  /**
   * Get blogs
   */
  getBlogs(): BlogPost[] {
    return this.data.blogs;
  }

  /**
   * Set blogs
   */
  setBlogs(blogs: BlogPost[]): void {
    this.data.blogs = blogs;
    this.data.lastUpdated = new Date().toISOString();
    this.saveToLocalStorage();
  }

  /**
   * Get custom pages
   */
  getCustomPages(): CustomPageData[] {
    return this.data.customPages;
  }

  /**
   * Set custom pages
   */
  setCustomPages(pages: CustomPageData[]): void {
    this.data.customPages = pages;
    this.data.lastUpdated = new Date().toISOString();
    this.saveToLocalStorage();
  }

  /**
   * Get page contents
   */
  getPageContents(): Array<{ id: string; title: string; content: string; section: string; imageUrl?: string }> {
    return this.data.pageContents;
  }

  /**
   * Set page contents
   */
  setPageContents(contents: Array<{ id: string; title: string; content: string; section: string; imageUrl?: string }>): void {
    this.data.pageContents = contents;
    this.data.lastUpdated = new Date().toISOString();
    this.saveToLocalStorage();
  }

  /**
   * Export data as JSON string for saving to file
   */
  exportData(): string {
    return JSON.stringify(this.data, null, 2);
  }

  /**
   * Import data from JSON string
   */
  importData(jsonString: string): void {
    try {
      const imported = JSON.parse(jsonString) as DataContent;
      this.data = imported;
      this.saveToLocalStorage();
    } catch (error) {
      console.error('Error importing data:', error);
    }
  }

  /**
   * Clear all data (reset to defaults)
   */
  clearAll(): void {
    this.data = {
      celebrities: [],
      blogs: [],
      customPages: [],
      pageContents: [
        { id: 'hero-title', title: 'Hero Title', content: 'Elevate Your Brand with Iconic Faces', section: 'home' },
        { id: 'hero-subtitle', title: 'Hero Subtitle', content: "India's Leading Talent Agency", section: 'home' }
      ],
      lastUpdated: null
    };
    localStorage.clear();
    this.saveToLocalStorage();
  }

  /**
   * Get statistics
   */
  getStats(): { celebrities: number; blogs: number; customPages: number; lastUpdated: string | null } {
    return {
      celebrities: this.data.celebrities.length,
      blogs: this.data.blogs.length,
      customPages: this.data.customPages.length,
      lastUpdated: this.data.lastUpdated
    };
  }
}

// Export singleton instance
export const dataService = new DataService();
export default DataService;
