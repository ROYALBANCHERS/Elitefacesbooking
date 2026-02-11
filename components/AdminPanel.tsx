import React, { useState, useEffect, useCallback } from 'react';
import { Celebrity, BlogPost, CustomPageData, BlogPlacement, HomepagePosition } from '../types';
import { useTheme } from '../ThemeContext';
import { dataService } from '../services/DataService';
import { firebaseService } from '../services/FirebaseService';

// Admin credentials
const ADMIN_CREDENTIALS = {
  username: 'Rishabhkumar023',
  email: 'growthing868@gmail.com',
  password: 'admin123'
};

// Page content interface
interface PageContent {
  id: string;
  title: string;
  content: string;
  section: string;
  imageUrl?: string;
}

interface AdminPanelProps {
  onClose: () => void;
  onUpdateCelebrities: (celebrities: Celebrity[]) => void;
  celebrities: Celebrity[];
}

const AdminPanel: React.FC<AdminPanelProps> = ({ onClose, onUpdateCelebrities, celebrities }) => {
  const { theme, toggleTheme, isDark } = useTheme();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState<'celebrities' | 'blogs' | 'pages' | 'settings'>('celebrities');
  const [editingCelebrity, setEditingCelebrity] = useState<Celebrity | null>(null);
  const [celebrityList, setCelebrityList] = useState<Celebrity[]>(celebrities);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [editingBlog, setEditingBlog] = useState<BlogPost | null>(null);
  const [customPages, setCustomPages] = useState<CustomPageData[]>([]);
  const [editingCustomPage, setEditingCustomPage] = useState<CustomPageData | null>(null);
  const [pageContents, setPageContents] = useState<PageContent[]>([]);
  const [editingPageContent, setEditingPageContent] = useState<PageContent | null>(null);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState<'success' | 'error'>('success');
  const [selectedPageSection, setSelectedPageSection] = useState('all');
  const [uploadingImage, setUploadingImage] = useState(false);

  // Firebase state
  const [firebaseEnabled, setFirebaseEnabled] = useState(false);

  // Load data from localStorage on mount
  useEffect(() => {
    const savedBlogs = localStorage.getItem('elitefaces_blogs');
    if (savedBlogs) {
      setBlogPosts(JSON.parse(savedBlogs));
    }

    const savedCustomPages = localStorage.getItem('elitefaces_custom_pages');
    if (savedCustomPages) {
      setCustomPages(JSON.parse(savedCustomPages));
    }

    const savedContents = localStorage.getItem('elitefaces_page_contents');
    if (savedContents) {
      setPageContents(JSON.parse(savedContents));
    } else {
      // Initialize with default content
      const defaultContents: PageContent[] = [
        { id: 'hero-title', title: 'Hero Title', content: 'Elevate Your Brand with Iconic Faces', section: 'home' },
        { id: 'hero-subtitle', title: 'Hero Subtitle', content: "India's Leading Talent Agency", section: 'home' },
      ];
      setPageContents(defaultContents);
      localStorage.setItem('elitefaces_page_contents', JSON.stringify(defaultContents));
    }

    // Initialize Firebase
    const initFirebase = async () => {
      if (firebaseService.isConfigured()) {
        setFirebaseEnabled(true);
        try {
          await firebaseService.initialize();
          const data = await firebaseService.fetchAllData();
          if (data.blogs.length > 0) setBlogPosts(data.blogs);
          if (data.customPages.length > 0) setCustomPages(data.customPages);
        } catch (error) {
          console.error('Firebase init failed:', error);
        }
      }
    };
    initFirebase();
  }, []);

  useEffect(() => {
    const auth = sessionStorage.getItem('admin_auth');
    const savedUsername = sessionStorage.getItem('admin_username');
    if (auth === 'true') {
      setIsAuthenticated(true);
      if (savedUsername) {
        setUsername(savedUsername);
      }
    }
  }, []);

  // Save to Firebase helper function
  const saveToFirebase = async () => {
    if (!firebaseEnabled) return false;

    try {
      setSavingToFirebase(true);
      await Promise.all([
        firebaseService.saveCelebrities(celebrityList),
        firebaseService.saveBlogs(blogPosts),
        firebaseService.saveCustomPages(customPages),
        firebaseService.savePageContents(pageContents)
      ]);
      setSavingToFirebase(false);
      return true;
    } catch (error) {
      console.error('Firebase save error:', error);
      setSavingToFirebase(false);
      return false;
    }
  };

  const showToastMessage = (message: string, type: 'success' | 'error') => {
    setToastMessage(message);
    setToastType(type);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Trim inputs to avoid whitespace issues
    const trimmedUsername = username.trim();
    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();

    if (
      trimmedUsername === ADMIN_CREDENTIALS.username &&
      trimmedEmail === ADMIN_CREDENTIALS.email &&
      trimmedPassword === ADMIN_CREDENTIALS.password
    ) {
      setIsAuthenticated(true);
      sessionStorage.setItem('admin_auth', 'true');
      sessionStorage.setItem('admin_username', trimmedUsername);
      showToastMessage('Welcome back, Admin!', 'success');
      // Clear inputs
      setUsername('');
      setEmail('');
      setPassword('');
    } else {
      showToastMessage('Invalid credentials! Please check your username, email, and password.', 'error');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('admin_auth');
    setUsername('');
    setEmail('');
    setPassword('');
  };

  // Image upload handler (converts to Base64 for localStorage)
  const handleImageUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>, onImageLoaded: (url: string) => void) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check file size (max 2MB for localStorage)
    if (file.size > 2 * 1024 * 1024) {
      showToastMessage('Image too large! Maximum 2MB allowed.', 'error');
      return;
    }

    setUploadingImage(true);
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result as string;
      onImageLoaded(base64String);
      setUploadingImage(false);
    };
    reader.onerror = () => {
      showToastMessage('Failed to upload image', 'error');
      setUploadingImage(false);
    };
    reader.readAsDataURL(file);
  }, []);

  // Celebrity management
  const handleEditCelebrity = (celebrity: Celebrity) => {
    setEditingCelebrity(celebrity);
  };

  const handleDeleteCelebrity = (id: string) => {
    if (window.confirm('Are you sure you want to delete this celebrity?')) {
      const updated = celebrityList.filter(c => c.id !== id);
      setCelebrityList(updated);
      onUpdateCelebrities(updated);
      dataService.setCelebrities(updated);
      setEditingCelebrity(null);

      // Show immediate success
      showToastMessage('Celebrity deleted!', 'success');

      // Sync to Firebase in background
      if (firebaseEnabled) {
        firebaseService.saveCelebrities(updated).catch(() => {
          showToastMessage('Saved locally only (Firebase sync failed)', 'error');
        });
      }
    }
  };

  const handleSaveCelebrity = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCelebrity) return;

    const updated = celebrityList.map(c =>
      c.id === editingCelebrity.id ? editingCelebrity : c
    );
    setCelebrityList(updated);
    onUpdateCelebrities(updated);
    dataService.setCelebrities(updated);
    setEditingCelebrity(null);

    // Show immediate success - don't wait for Firebase
    if (firebaseEnabled) {
      showToastMessage('Celebrity saved! Syncing to Firebase...', 'success');
      // Sync in background - don't await
      firebaseService.saveCelebrities(updated).catch(() => {
        // Silent fail - user already sees success message
        console.warn('Firebase sync failed, data saved locally');
      });
    } else {
      showToastMessage('Celebrity saved! Click "Publish" to make changes live.', 'success');
    }
  };

  const handleAddCelebrity = () => {
    const newCelebrity: Celebrity = {
      id: Date.now().toString(),
      name: 'New Celebrity',
      category: 'Bollywood',
      bio: 'Add bio here...',
      rating: 5.0,
      imageUrl: 'LOGO.PNG',
      priceRange: 'Contact us',
      followers: '1M+',
      expertise: ['Brand Endorsement']
    };
    setCelebrityList([...celebrityList, newCelebrity]);
    setEditingCelebrity(newCelebrity);
  };

  const updateCelebrityField = (field: keyof Celebrity, value: any) => {
    if (editingCelebrity) {
      setEditingCelebrity({
        ...editingCelebrity,
        [field]: value
      });
    }
  };

  // Blog management with section
  const handleAddBlog = () => {
    const newBlog: BlogPost = {
      id: Date.now().toString(),
      title: 'New Blog Post',
      content: '<p>Add your blog content here...</p>',
      excerpt: 'Add a brief excerpt...',
      category: 'Industry Trends',
      section: 'Blog',
      imageUrl: 'LOGO.PNG',
      date: new Date().toISOString(),
      author: 'Admin',
      published: true,
      slug: `blog-${Date.now()}`,
      placement: 'separate-page',
      homepagePosition: 'after-roster',
      customPageSlug: ''
    };
    setBlogPosts([...blogPosts, newBlog]);
    setEditingBlog(newBlog);
  };

  const handleEditBlog = (blog: BlogPost) => {
    setEditingBlog(blog);
  };

  const handleDeleteBlog = (id: string) => {
    if (window.confirm('Are you sure you want to delete this blog post?')) {
      const updated = blogPosts.filter(b => b.id !== id);
      setBlogPosts(updated);
      localStorage.setItem('elitefaces_blogs', JSON.stringify(updated));
      dataService.setBlogs(updated);

      showToastMessage('Blog deleted!', 'success');

      // Sync to Firebase in background
      if (firebaseEnabled) {
        firebaseService.saveBlogs(updated).catch(() => {
          console.warn('Firebase sync failed');
        });
      }
    }
  };

  const handleSaveBlog = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingBlog) return;

    const updated = blogPosts.map(b =>
      b.id === editingBlog.id ? editingBlog : b
    );
    setBlogPosts(updated);
    localStorage.setItem('elitefaces_blogs', JSON.stringify(updated));
    dataService.setBlogs(updated);
    setEditingBlog(null);

    if (firebaseEnabled) {
      showToastMessage('Blog saved! Syncing to Firebase...', 'success');
      firebaseService.saveBlogs(updated).catch(() => {
        console.warn('Firebase sync failed');
      });
    } else {
      showToastMessage('Blog saved! Click "Publish" to make it live for all users.', 'success');
    }
  };

  const updateBlogField = (field: keyof BlogPost, value: any) => {
    if (editingBlog) {
      setEditingBlog({
        ...editingBlog,
        [field]: value
      });
    }
  };

  // Custom Page management
  const handleAddCustomPage = () => {
    const newPage: CustomPageData = {
      id: Date.now().toString(),
      title: 'New Page',
      slug: `page-${Date.now()}`,
      content: '<p>Add your page content here...</p>',
      section: 'Custom',
      imageUrl: '',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      published: true,
      metaDescription: ''
    };
    setCustomPages([...customPages, newPage]);
    setEditingCustomPage(newPage);
  };

  const handleEditCustomPage = (page: CustomPageData) => {
    setEditingCustomPage(page);
  };

  const handleDeleteCustomPage = (id: string) => {
    if (window.confirm('Are you sure you want to delete this page?')) {
      const updated = customPages.filter(p => p.id !== id);
      setCustomPages(updated);
      localStorage.setItem('elitefaces_custom_pages', JSON.stringify(updated));
      dataService.setCustomPages(updated);

      showToastMessage('Page deleted!', 'success');

      if (firebaseEnabled) {
        firebaseService.saveCustomPages(updated).catch(() => {
          console.warn('Firebase sync failed');
        });
      }
    }
  };

  const handleSaveCustomPage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCustomPage) return;

    const updated = customPages.map(p =>
      p.id === editingCustomPage.id ? editingCustomPage : p
    );
    setCustomPages(updated);
    localStorage.setItem('elitefaces_custom_pages', JSON.stringify(updated));
    dataService.setCustomPages(updated);
    setEditingCustomPage(null);

    if (firebaseEnabled) {
      showToastMessage('Page saved! Syncing to Firebase...', 'success');
      firebaseService.saveCustomPages(updated).catch(() => {
        console.warn('Firebase sync failed');
      });
    } else {
      showToastMessage('Page saved! Click "Publish" to make it live for all users.', 'success');
    }
  };

  const updateCustomPageField = (field: keyof CustomPageData, value: any) => {
    if (editingCustomPage) {
      setEditingCustomPage({
        ...editingCustomPage,
        [field]: value
      });
    }
  };

  // Page Content management
  const handleAddPageContent = () => {
    const newContent: PageContent = {
      id: Date.now().toString(),
      title: 'New Content',
      content: 'Add content here...',
      section: selectedPageSection === 'all' ? 'home' : selectedPageSection
    };
    setPageContents([...pageContents, newContent]);
    setEditingPageContent(newContent);
    localStorage.setItem('elitefaces_page_contents', JSON.stringify([...pageContents, newContent]));
  };

  const handleEditPageContent = (content: PageContent) => {
    setEditingPageContent(content);
  };

  const handleDeletePageContent = (id: string) => {
    if (window.confirm('Are you sure you want to delete this content?')) {
      const updated = pageContents.filter(c => c.id !== id);
      setPageContents(updated);
      localStorage.setItem('elitefaces_page_contents', JSON.stringify(updated));
      showToastMessage('Content deleted successfully', 'success');
    }
  };

  const handleSavePageContent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingPageContent) return;

    const updated = pageContents.map(c =>
      c.id === editingPageContent.id ? editingPageContent : c
    );
    setPageContents(updated);
    localStorage.setItem('elitefaces_page_contents', JSON.stringify(updated));
    setEditingPageContent(null);
    showToastMessage('Content updated successfully!', 'success');
  };

  const updatePageContentField = (field: keyof PageContent, value: any) => {
    if (editingPageContent) {
      setEditingPageContent({
        ...editingPageContent,
        [field]: value
      });
    }
  };

  const filteredPageContents = selectedPageSection === 'all'
    ? pageContents
    : pageContents.filter(c => c.section === selectedPageSection);

  if (!isAuthenticated) {
    return (
      <>
        <div className="fixed inset-0 z-50 flex items-center justify-center px-6">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose}></div>
          <div className="relative glass w-full max-w-md rounded-3xl overflow-hidden p-8">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-yellow-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-shield-alt text-yellow-500 text-2xl"></i>
              </div>
              <h2 className="text-2xl font-bold mb-2">Admin Login</h2>
              <p className="text-slate-400 text-sm">Enter your credentials to continue</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="text-sm text-slate-400 mb-1 block">Username</label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full bg-slate-800 border border-white/10 rounded-lg p-3 text-white placeholder-slate-500 focus:outline-none focus:border-yellow-500"
                  placeholder="Enter username"
                  required
                />
              </div>
              <div>
                <label className="text-sm text-slate-400 mb-1 block">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-slate-800 border border-white/10 rounded-lg p-3 text-white placeholder-slate-500 focus:outline-none focus:border-yellow-500"
                  placeholder="Enter email"
                  required
                />
              </div>
              <div>
                <label className="text-sm text-slate-400 mb-1 block">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-slate-800 border border-white/10 rounded-lg p-3 text-white placeholder-slate-500 focus:outline-none focus:border-yellow-500"
                  placeholder="Enter password"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full py-3 btn-gold text-slate-950 font-bold rounded-lg"
              >
                LOGIN
              </button>
            </form>

            <button onClick={onClose} className="mt-4 w-full text-slate-400 text-sm hover:text-white transition-colors">
              Cancel
            </button>
          </div>
        </div>

        {showToast && (
          <div className={`toast ${toastType}`}>
            <p className="text-white font-medium">{toastMessage}</p>
          </div>
        )}
      </>
    );
  }

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center px-6">
        <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose}></div>
        <div className="relative glass w-full max-w-7xl h-[90vh] rounded-3xl overflow-hidden flex flex-col">
          {/* Header */}
          <div className="p-6 border-b border-white/10 flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-yellow-500/20 rounded-full flex items-center justify-center">
                <i className="fas fa-cog text-yellow-500"></i>
              </div>
              <div>
                <h2 className="text-xl font-bold">Admin Panel</h2>
                <div className="flex items-center space-x-2">
                  <p className="text-slate-400 text-sm">Manage all content & settings</p>
                  {/* Firebase Status Indicator */}
                  {firebaseEnabled ? (
                    <span className="px-2 py-0.5 bg-orange-500/20 text-orange-400 text-xs rounded-full flex items-center">
                      <i className="fas fa-fire mr-1"></i>Firebase Live
                    </span>
                  ) : (
                    <span className="px-2 py-0.5 bg-slate-500/20 text-slate-400 text-xs rounded-full flex items-center">
                      <i className="fas fa-database mr-1"></i>Local Only
                    </span>
                  )}
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              {/* Firebase is disabled - show publish button */}
              {!firebaseEnabled && (
                <button
                  onClick={() => {
                    const dataStr = dataService.exportData();
                    const blob = new Blob([dataStr], { type: 'application/json' });
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = `elitefaces-data-${new Date().toISOString().split('T')[0]}.json`;
                    document.body.appendChild(a);
                    a.click();
                    document.body.removeChild(a);
                    URL.revokeObjectURL(url);
                    showToastMessage('Data exported! Replace data.json in project and commit to GitHub.', 'success');
                  }}
                  className="px-4 py-2 bg-green-500/20 text-green-400 rounded-lg hover:bg-green-500/30 transition-colors flex items-center"
                  title="Download data to publish changes for all users"
                >
                  <i className="fas fa-cloud-upload-alt mr-2"></i>
                  <span className="hidden sm:inline">Publish</span>
                </button>
              )}
              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className="px-4 py-2 bg-purple-500/20 text-purple-400 rounded-lg hover:bg-purple-500/30 transition-colors"
                title={isDark ? 'Switch to Light Theme' : 'Switch to Dark Theme'}
              >
                <i className={`fas ${isDark ? 'fa-sun' : 'fa-moon'} mr-2`}></i>
                {isDark ? 'Light' : 'Dark'}
              </button>
              <button onClick={handleLogout} className="px-4 py-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-colors">
                <i className="fas fa-sign-out-alt mr-2"></i>Logout
              </button>
              <button onClick={onClose} className="text-slate-400 hover:text-white">
                <i className="fas fa-times text-xl"></i>
              </button>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex border-b border-white/10 overflow-x-auto">
            <button
              onClick={() => setActiveTab('celebrities')}
              className={`flex-1 py-4 px-4 text-center font-medium transition-colors whitespace-nowrap ${activeTab === 'celebrities' ? 'text-yellow-500 border-b-2 border-yellow-500' : 'text-slate-400 hover:text-white'}`}
            >
              <i className="fas fa-users mr-2"></i>Celebrities
            </button>
            <button
              onClick={() => setActiveTab('blogs')}
              className={`flex-1 py-4 px-4 text-center font-medium transition-colors whitespace-nowrap ${activeTab === 'blogs' ? 'text-yellow-500 border-b-2 border-yellow-500' : 'text-slate-400 hover:text-white'}`}
            >
              <i className="fas fa-blog mr-2"></i>Blog Posts
            </button>
            <button
              onClick={() => setActiveTab('pages')}
              className={`flex-1 py-4 px-4 text-center font-medium transition-colors whitespace-nowrap ${activeTab === 'pages' ? 'text-yellow-500 border-b-2 border-yellow-500' : 'text-slate-400 hover:text-white'}`}
            >
              <i className="fas fa-file-alt mr-2"></i>Custom Pages
            </button>
            <button
              onClick={() => setActiveTab('settings')}
              className={`flex-1 py-4 px-4 text-center font-medium transition-colors whitespace-nowrap ${activeTab === 'settings' ? 'text-yellow-500 border-b-2 border-yellow-500' : 'text-slate-400 hover:text-white'}`}
            >
              <i className="fas fa-cog mr-2"></i>Settings
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-6">
            {activeTab === 'celebrities' && (
              <div className="space-y-6">
                {!editingCelebrity ? (
                  <>
                    <div className="flex justify-between items-center">
                      <h3 className="text-lg font-semibold">Manage Celebrities</h3>
                      <button onClick={handleAddCelebrity} className="px-4 py-2 btn-gold text-slate-950 rounded-lg font-medium">
                        <i className="fas fa-plus mr-2"></i>Add Celebrity
                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {celebrityList.map((celeb) => (
                        <div key={celeb.id} className="bg-slate-900/50 border border-white/10 rounded-xl p-4">
                          <div className="flex items-start justify-between mb-3">
                            <img src={celeb.imageUrl} alt={celeb.name} className="w-16 h-16 rounded-lg object-cover" onError={(e) => { (e.target as HTMLImageElement).src = 'LOGO.PNG'; }} />
                            <div className="flex space-x-2">
                              <button onClick={() => handleEditCelebrity(celeb)} className="p-2 bg-blue-500/20 text-blue-400 rounded-lg hover:bg-blue-500/30">
                                <i className="fas fa-edit"></i>
                              </button>
                              <button onClick={() => handleDeleteCelebrity(celeb.id)} className="p-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30">
                                <i className="fas fa-trash"></i>
                              </button>
                            </div>
                          </div>
                          <h4 className="font-semibold mb-1">{celeb.name}</h4>
                          <p className="text-slate-400 text-sm">{celeb.category}</p>
                          <p className="text-yellow-500 text-sm mt-1">{celeb.followers} followers</p>
                        </div>
                      ))}
                    </div>
                  </>
                ) : (
                  <div className="max-w-2xl mx-auto">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-lg font-semibold">Edit Celebrity</h3>
                      <button onClick={() => setEditingCelebrity(null)} className="text-slate-400 hover:text-white">
                        <i className="fas fa-times mr-2"></i>Cancel
                      </button>
                    </div>

                    <form onSubmit={handleSaveCelebrity} className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="text-sm text-slate-400 mb-1 block">Name</label>
                          <input
                            type="text"
                            value={editingCelebrity.name}
                            onChange={(e) => updateCelebrityField('name', e.target.value)}
                            className="w-full bg-slate-800 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-yellow-500"
                            required
                          />
                        </div>
                        <div>
                          <label className="text-sm text-slate-400 mb-1 block">Category</label>
                          <input
                            type="text"
                            value={editingCelebrity.category}
                            onChange={(e) => updateCelebrityField('category', e.target.value)}
                            className="w-full bg-slate-800 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-yellow-500"
                            required
                          />
                        </div>
                      </div>

                      <div>
                        <label className="text-sm text-slate-400 mb-1 block">Bio</label>
                        <textarea
                          value={editingCelebrity.bio}
                          onChange={(e) => updateCelebrityField('bio', e.target.value)}
                          className="w-full bg-slate-800 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-yellow-500"
                          rows={3}
                          required
                        />
                      </div>

                      <div className="grid grid-cols-3 gap-4">
                        <div>
                          <label className="text-sm text-slate-400 mb-1 block">Followers</label>
                          <input
                            type="text"
                            value={editingCelebrity.followers}
                            onChange={(e) => updateCelebrityField('followers', e.target.value)}
                            className="w-full bg-slate-800 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-yellow-500"
                            required
                          />
                        </div>
                        <div>
                          <label className="text-sm text-slate-400 mb-1 block">Price Range</label>
                          <input
                            type="text"
                            value={editingCelebrity.priceRange}
                            onChange={(e) => updateCelebrityField('priceRange', e.target.value)}
                            className="w-full bg-slate-800 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-yellow-500"
                            required
                          />
                        </div>
                        <div>
                          <label className="text-sm text-slate-400 mb-1 block">Rating</label>
                          <input
                            type="number"
                            step="0.1"
                            value={editingCelebrity.rating}
                            onChange={(e) => updateCelebrityField('rating', parseFloat(e.target.value))}
                            className="w-full bg-slate-800 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-yellow-500"
                            required
                          />
                        </div>
                      </div>

                      <div>
                        <label className="text-sm text-slate-400 mb-1 block">Image URL or Upload</label>
                        <div className="space-y-2">
                          <input
                            type="text"
                            value={editingCelebrity.imageUrl}
                            onChange={(e) => updateCelebrityField('imageUrl', e.target.value)}
                            className="w-full bg-slate-800 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-yellow-500"
                            placeholder="Enter image URL..."
                          />
                          <div className="flex items-center space-x-2">
                            <span className="text-slate-400 text-sm">Or upload:</span>
                            <label className="px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg cursor-pointer text-sm">
                              <i className="fas fa-upload mr-2"></i>Choose File
                              <input
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={(e) => handleImageUpload(e, (url) => updateCelebrityField('imageUrl', url))}
                              />
                            </label>
                            {uploadingImage && <span className="text-yellow-500 text-sm">Uploading...</span>}
                          </div>
                          <img src={editingCelebrity.imageUrl} alt="Preview" className="w-20 h-20 rounded-lg object-cover mt-2" onError={(e) => { (e.target as HTMLImageElement).src = 'LOGO.PNG'; }} />
                        </div>
                      </div>

                      <div>
                        <label className="text-sm text-slate-400 mb-1 block">Expertise (comma separated)</label>
                        <input
                          type="text"
                          value={editingCelebrity.expertise.join(', ')}
                          onChange={(e) => updateCelebrityField('expertise', e.target.value.split(', ').filter(Boolean))}
                          className="w-full bg-slate-800 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-yellow-500"
                          required
                        />
                      </div>

                      <div className="flex space-x-3 pt-4">
                        <button type="submit" className="flex-1 py-3 btn-gold text-slate-950 font-bold rounded-lg">
                          <i className="fas fa-save mr-2"></i>Save Changes
                        </button>
                        <button type="button" onClick={() => setEditingCelebrity(null)} className="px-6 py-3 bg-slate-800 text-white rounded-lg hover:bg-slate-700">
                          Cancel
                        </button>
                      </div>
                    </form>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'blogs' && (
              <div className="space-y-6">
                {!editingBlog ? (
                  <>
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="text-lg font-semibold">Manage Blog Posts</h3>
                        <p className="text-slate-400 text-sm">These posts appear on the website under their sections</p>
                      </div>
                      <button onClick={handleAddBlog} className="px-4 py-2 btn-gold text-slate-950 rounded-lg font-medium">
                        <i className="fas fa-plus mr-2"></i>Add Blog Post
                      </button>
                    </div>

                    {blogPosts.length === 0 ? (
                      <div className="text-center py-12">
                        <i className="fas fa-blog text-6xl text-slate-700 mb-4"></i>
                        <h3 className="text-xl font-semibold mb-2">No Blog Posts Yet</h3>
                        <p className="text-slate-400">Click "Add Blog Post" to create your first blog post.</p>
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {blogPosts.map((blog) => (
                          <div key={blog.id} className={`bg-slate-900/50 border rounded-xl p-4 ${blog.published === false ? 'border-red-500/30' : 'border-white/10'}`}>
                            <div className="flex items-start justify-between mb-3">
                              <img src={blog.imageUrl} alt={blog.title} className="w-20 h-20 rounded-lg object-cover" onError={(e) => { (e.target as HTMLImageElement).src = 'LOGO.PNG'; }} />
                              <div className="flex space-x-2">
                                <button onClick={() => handleEditBlog(blog)} className="p-2 bg-blue-500/20 text-blue-400 rounded-lg hover:bg-blue-500/30">
                                  <i className="fas fa-edit"></i>
                                </button>
                                <button onClick={() => handleDeleteBlog(blog.id)} className="p-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30">
                                  <i className="fas fa-trash"></i>
                                </button>
                              </div>
                            </div>
                            <h4 className="font-semibold mb-1">{blog.title}</h4>
                            <div className="flex gap-2 mb-2">
                              <span className="text-xs bg-yellow-500/20 text-yellow-500 px-2 py-1 rounded-full">{blog.category}</span>
                              <span className="text-xs bg-slate-700 text-slate-300 px-2 py-1 rounded-full">{blog.section}</span>
                              {!blog.published && <span className="text-xs bg-red-500/20 text-red-400 px-2 py-1 rounded-full">Draft</span>}
                            </div>
                            <p className="text-slate-500 text-xs">
                              {new Date(blog.date).toLocaleDateString()}
                            </p>
                            <p className="text-slate-400 text-sm mt-2 line-clamp-2">
                              {blog.excerpt || blog.content.replace(/<[^>]*>/g, '').substring(0, 100)}...
                            </p>
                          </div>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <div className="max-w-3xl mx-auto">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-lg font-semibold">Edit Blog Post</h3>
                      <button onClick={() => setEditingBlog(null)} className="text-slate-400 hover:text-white">
                        <i className="fas fa-times mr-2"></i>Cancel
                      </button>
                    </div>

                    <form onSubmit={handleSaveBlog} className="space-y-4">
                      <div>
                        <label className="text-sm text-slate-400 mb-1 block">Blog Title</label>
                        <input
                          type="text"
                          value={editingBlog.title}
                          onChange={(e) => updateBlogField('title', e.target.value)}
                          className="w-full bg-slate-800 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-yellow-500"
                          required
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="text-sm text-slate-400 mb-1 block">Category</label>
                          <input
                            type="text"
                            value={editingBlog.category}
                            onChange={(e) => updateBlogField('category', e.target.value)}
                            className="w-full bg-slate-800 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-yellow-500"
                            placeholder="e.g., Industry Trends"
                            required
                          />
                        </div>
                        <div>
                          <label className="text-sm text-slate-400 mb-1 block">Section (Navigation Name)</label>
                          <input
                            type="text"
                            value={editingBlog.section}
                            onChange={(e) => updateBlogField('section', e.target.value)}
                            className="w-full bg-slate-800 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-yellow-500"
                            placeholder="e.g., News, Updates"
                            required
                          />
                          <p className="text-xs text-slate-500 mt-1">This creates a navigation link to this section</p>
                        </div>
                      </div>

                      {/* Placement Settings */}
                      <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4">
                        <h4 className="text-yellow-500 font-semibold mb-3 flex items-center">
                          <i className="fas fa-map-marker-alt mr-2"></i>Where should this blog post appear?
                        </h4>

                        <div className="space-y-4">
                          <div>
                            <label className="text-sm text-slate-400 mb-2 block">Display Location</label>
                            <select
                              value={editingBlog.placement || 'separate-page'}
                              onChange={(e) => updateBlogField('placement', e.target.value as any)}
                              className="w-full bg-slate-800 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-yellow-500"
                            >
                              <option value="separate-page">Separate Blog Page Only</option>
                              <option value="homepage">Homepage Only</option>
                              <option value="both">Both Homepage & Separate Page</option>
                            </select>
                          </div>

                          {editingBlog.placement === 'homepage' || editingBlog.placement === 'both' ? (
                            <div>
                              <label className="text-sm text-slate-400 mb-2 block">Position on Homepage</label>
                              <select
                                value={editingBlog.homepagePosition || 'after-roster'}
                                onChange={(e) => updateBlogField('homepagePosition', e.target.value as any)}
                                className="w-full bg-slate-800 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-yellow-500"
                              >
                                <option value="hero">Hero Section (Top of page)</option>
                                <option value="after-roster">After Talent Roster</option>
                                <option value="after-services">After Services Section</option>
                                <option value="before-footer">Before Footer</option>
                              </select>
                              <p className="text-xs text-slate-500 mt-1">Choose where this blog appears on the homepage</p>
                            </div>
                          ) : null}

                          {editingBlog.placement === 'separate-page' && (
                            <div>
                              <label className="text-sm text-slate-400 mb-2 block">Or Add to Custom Page (Optional)</label>
                              <select
                                value={editingBlog.customPageSlug || ''}
                                onChange={(e) => updateBlogField('customPageSlug', e.target.value)}
                                className="w-full bg-slate-800 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-yellow-500"
                              >
                                <option value="">-- Select Custom Page --</option>
                                {/* This will be populated dynamically with custom pages */}
                                <option value="about">About Page</option>
                                <option value="services">Services Page</option>
                                <option value="contact">Contact Page</option>
                              </select>
                              <p className="text-xs text-slate-500 mt-1">Blog will appear on this custom page</p>
                            </div>
                          )}
                        </div>
                      </div>

                      <div>
                        <label className="text-sm text-slate-400 mb-1 block">Excerpt (Short description)</label>
                        <input
                          type="text"
                          value={editingBlog.excerpt || ''}
                          onChange={(e) => updateBlogField('excerpt', e.target.value)}
                          className="w-full bg-slate-800 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-yellow-500"
                          placeholder="Brief description for listing page"
                        />
                      </div>

                      <div>
                        <label className="text-sm text-slate-400 mb-1 block">Image URL or Upload</label>
                        <div className="space-y-2">
                          <input
                            type="text"
                            value={editingBlog.imageUrl}
                            onChange={(e) => updateBlogField('imageUrl', e.target.value)}
                            className="w-full bg-slate-800 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-yellow-500"
                            placeholder="https://example.com/image.jpg"
                          />
                          <div className="flex items-center space-x-2">
                            <label className="px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg cursor-pointer text-sm">
                              <i className="fas fa-upload mr-2"></i>Upload Image
                              <input
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={(e) => handleImageUpload(e, (url) => updateBlogField('imageUrl', url))}
                              />
                            </label>
                            {uploadingImage && <span className="text-yellow-500 text-sm">Uploading...</span>}
                          </div>
                          <img src={editingBlog.imageUrl} alt="Preview" className="w-full h-40 object-cover rounded-lg mt-2" onError={(e) => { (e.target as HTMLImageElement).src = 'LOGO.PNG'; }} />
                        </div>
                      </div>

                      <div>
                        <label className="text-sm text-slate-400 mb-1 block">Author</label>
                        <input
                          type="text"
                          value={editingBlog.author || ''}
                          onChange={(e) => updateBlogField('author', e.target.value)}
                          className="w-full bg-slate-800 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-yellow-500"
                          placeholder="Author name"
                        />
                      </div>

                      <div>
                        <label className="text-sm text-slate-400 mb-1 block">Blog Content (supports HTML)</label>
                        <textarea
                          value={editingBlog.content}
                          onChange={(e) => updateBlogField('content', e.target.value)}
                          className="w-full bg-slate-800 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-yellow-500 font-mono text-sm"
                          rows={12}
                          placeholder="Enter your blog content here... You can use HTML tags like &lt;p&gt;, &lt;h1&gt;, &lt;strong&gt;, &lt;em&gt;, &lt;ul&gt;, &lt;li&gt;, etc."
                          required
                        />
                        <p className="text-xs text-slate-500 mt-1">
                          <i className="fas fa-info-circle mr-1"></i>
                          Tip: You can use HTML for formatting. Example: &lt;p&gt;Your text&lt;/p&gt;, &lt;strong&gt;Bold&lt;/strong&gt;
                        </p>
                      </div>

                      <div className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id="published"
                          checked={editingBlog.published !== false}
                          onChange={(e) => updateBlogField('published', e.target.checked)}
                          className="w-4 h-4 rounded"
                        />
                        <label htmlFor="published" className="text-slate-300">Published (visible on website)</label>
                      </div>

                      <div className="bg-slate-800/50 rounded-lg p-4 border border-white/10">
                        <p className="text-sm text-slate-400 mb-2">Content Preview:</p>
                        <div className="bg-white rounded-lg p-4 text-slate-900 max-h-40 overflow-y-auto">
                          <div dangerouslySetInnerHTML={{ __html: editingBlog.content }} />
                        </div>
                      </div>

                      <div className="flex space-x-3 pt-4">
                        <button type="submit" className="flex-1 py-3 btn-gold text-slate-950 font-bold rounded-lg">
                          <i className="fas fa-save mr-2"></i>Save Blog Post
                        </button>
                        <button type="button" onClick={() => setEditingBlog(null)} className="px-6 py-3 bg-slate-800 text-white rounded-lg hover:bg-slate-700">
                          Cancel
                        </button>
                      </div>
                    </form>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'pages' && (
              <div className="space-y-6">
                {!editingCustomPage ? (
                  <>
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="text-lg font-semibold">Custom Pages</h3>
                        <p className="text-slate-400 text-sm">Create custom pages that appear on your website</p>
                      </div>
                      <button onClick={handleAddCustomPage} className="px-4 py-2 btn-gold text-slate-950 rounded-lg font-medium">
                        <i className="fas fa-plus mr-2"></i>Add Custom Page
                      </button>
                    </div>

                    {customPages.length === 0 ? (
                      <div className="text-center py-12">
                        <i className="fas fa-file-alt text-6xl text-slate-700 mb-4"></i>
                        <h3 className="text-xl font-semibold mb-2">No Custom Pages Yet</h3>
                        <p className="text-slate-400">Click "Add Custom Page" to create your first page.</p>
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {customPages.map((page) => (
                          <div key={page.id} className={`bg-slate-900/50 border rounded-xl p-4 ${page.published === false ? 'border-red-500/30' : 'border-white/10'}`}>
                            <div className="flex items-start justify-between mb-3">
                              {page.imageUrl && <img src={page.imageUrl} alt={page.title} className="w-20 h-20 rounded-lg object-cover" />}
                              <div className="flex space-x-2">
                                <button onClick={() => handleEditCustomPage(page)} className="p-2 bg-blue-500/20 text-blue-400 rounded-lg hover:bg-blue-500/30">
                                  <i className="fas fa-edit"></i>
                                </button>
                                <button onClick={() => handleDeleteCustomPage(page.id)} className="p-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30">
                                  <i className="fas fa-trash"></i>
                                </button>
                              </div>
                            </div>
                            <h4 className="font-semibold mb-1">{page.title}</h4>
                            <p className="text-xs bg-slate-700 text-slate-300 px-2 py-1 rounded-full inline-block mb-2">/{page.slug}</p>
                            {!page.published && <span className="text-xs bg-red-500/20 text-red-400 px-2 py-1 rounded-full ml-2">Draft</span>}
                            <p className="text-slate-500 text-xs">{new Date(page.updatedAt).toLocaleDateString()}</p>
                          </div>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <div className="max-w-3xl mx-auto">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-lg font-semibold">Edit Custom Page</h3>
                      <button onClick={() => setEditingCustomPage(null)} className="text-slate-400 hover:text-white">
                        <i className="fas fa-times mr-2"></i>Cancel
                      </button>
                    </div>

                    <form onSubmit={handleSaveCustomPage} className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="text-sm text-slate-400 mb-1 block">Page Title</label>
                          <input
                            type="text"
                            value={editingCustomPage.title}
                            onChange={(e) => updateCustomPageField('title', e.target.value)}
                            className="w-full bg-slate-800 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-yellow-500"
                            required
                          />
                        </div>
                        <div>
                          <label className="text-sm text-slate-400 mb-1 block">URL Slug</label>
                          <input
                            type="text"
                            value={editingCustomPage.slug}
                            onChange={(e) => updateCustomPageField('slug', e.target.value)}
                            className="w-full bg-slate-800 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-yellow-500"
                            placeholder="page-url-slug"
                            required
                          />
                          <p className="text-xs text-slate-500 mt-1">This will be the page URL: /{editingCustomPage.slug}</p>
                        </div>
                      </div>

                      <div>
                        <label className="text-sm text-slate-400 mb-1 block">Meta Description (SEO)</label>
                        <input
                          type="text"
                          value={editingCustomPage.metaDescription || ''}
                          onChange={(e) => updateCustomPageField('metaDescription', e.target.value)}
                          className="w-full bg-slate-800 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-yellow-500"
                          placeholder="Brief description for search engines"
                        />
                      </div>

                      <div>
                        <label className="text-sm text-slate-400 mb-1 block">Section</label>
                        <select
                          value={editingCustomPage.section}
                          onChange={(e) => updateCustomPageField('section', e.target.value)}
                          className="w-full bg-slate-800 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-yellow-500"
                        >
                          <option value="Custom">Custom</option>
                          <option value="Blog">Blog</option>
                          <option value="News">News</option>
                          <option value="Updates">Updates</option>
                          <option value="Resources">Resources</option>
                        </select>
                      </div>

                      <div>
                        <label className="text-sm text-slate-400 mb-1 block">Cover Image URL or Upload</label>
                        <div className="space-y-2">
                          <input
                            type="text"
                            value={editingCustomPage.imageUrl || ''}
                            onChange={(e) => updateCustomPageField('imageUrl', e.target.value)}
                            className="w-full bg-slate-800 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-yellow-500"
                            placeholder="https://example.com/image.jpg"
                          />
                          <div className="flex items-center space-x-2">
                            <label className="px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg cursor-pointer text-sm">
                              <i className="fas fa-upload mr-2"></i>Upload Image
                              <input
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={(e) => handleImageUpload(e, (url) => updateCustomPageField('imageUrl', url))}
                              />
                            </label>
                            {uploadingImage && <span className="text-yellow-500 text-sm">Uploading...</span>}
                          </div>
                          {editingCustomPage.imageUrl && (
                            <img src={editingCustomPage.imageUrl} alt="Preview" className="w-full h-40 object-cover rounded-lg mt-2" />
                          )}
                        </div>
                      </div>

                      <div>
                        <label className="text-sm text-slate-400 mb-1 block">Page Content (HTML supported)</label>
                        <textarea
                          value={editingCustomPage.content}
                          onChange={(e) => updateCustomPageField('content', e.target.value)}
                          className="w-full bg-slate-800 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-yellow-500 font-mono text-sm"
                          rows={12}
                          placeholder="Enter your page content... You can use HTML tags"
                          required
                        />
                      </div>

                      <div className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id="pagePublished"
                          checked={editingCustomPage.published !== false}
                          onChange={(e) => updateCustomPageField('published', e.target.checked)}
                          className="w-4 h-4 rounded"
                        />
                        <label htmlFor="pagePublished" className="text-slate-300">Published (visible on website)</label>
                      </div>

                      <div className="bg-slate-800/50 rounded-lg p-4 border border-white/10">
                        <p className="text-sm text-slate-400 mb-2">Content Preview:</p>
                        <div className="bg-white rounded-lg p-4 text-slate-900 max-h-40 overflow-y-auto">
                          <div dangerouslySetInnerHTML={{ __html: editingCustomPage.content }} />
                        </div>
                      </div>

                      <div className="flex space-x-3 pt-4">
                        <button type="submit" className="flex-1 py-3 btn-gold text-slate-950 font-bold rounded-lg">
                          <i className="fas fa-save mr-2"></i>Save Page
                        </button>
                        <button type="button" onClick={() => setEditingCustomPage(null)} className="px-6 py-3 bg-slate-800 text-white rounded-lg hover:bg-slate-700">
                          Cancel
                        </button>
                      </div>
                    </form>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'settings' && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold mb-4">Admin Settings</h3>

                {/* Firebase Status Section - NEW */}
                {firebaseEnabled ? (
                  <div className="bg-orange-500/10 border border-orange-500/30 rounded-xl p-6">
                    <h4 className="font-semibold mb-4 text-orange-500">
                      <i className="fas fa-fire mr-2"></i>Firebase Real-time Sync - ENABLED
                    </h4>
                    <div className="space-y-3">
                      <p className="text-sm text-orange-200">
                        <i className="fas fa-check-circle mr-2 text-green-400"></i>
                        <strong>Live Sync Active:</strong> All your changes are automatically synced to Firebase and visible to all users in real-time!
                      </p>
                      <p className="text-xs text-orange-200/70">
                        When you save celebrities, blogs, or pages, they are immediately available to all visitors. No need to export or deploy.
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-6">
                    <h4 className="font-semibold mb-4 text-blue-500">
                      <i className="fas fa-database mr-2"></i>Enable Firebase Real-time Sync
                    </h4>
                    <div className="space-y-4">
                      <div className="bg-blue-500/5 rounded-lg p-4 border border-blue-500/20">
                        <p className="text-sm text-blue-200 mb-3">
                          <i className="fas fa-bolt mr-2 text-yellow-400"></i>
                          <strong>Why enable Firebase?</strong> Make admin changes live instantly for all users without deploying!
                        </p>
                        <ol className="text-xs text-blue-200/80 space-y-2 ml-6 list-decimal">
                          <li>Go to <a href="https://console.firebase.google.com/" target="_blank" rel="noopener noreferrer" className="text-yellow-400 underline">Firebase Console</a></li>
                          <li>Create a new project (or use existing)</li>
                          <li>Go to Project Settings &gt; General &gt; Your apps &gt; Web app</li>
                          <li>Copy the config object</li>
                          <li>Paste it in <code className="bg-black/30 px-1 rounded">firebase.ts</code> in your project</li>
                          <li>Enable Realtime Database from Build menu</li>
                          <li>Deploy the updated code</li>
                        </ol>
                      </div>
                      <p className="text-xs text-slate-400">
                        <i className="fas fa-info-circle mr-1"></i>
                        Firebase is free for up to 1GB database storage and 10GB/month bandwidth.
                      </p>
                    </div>
                  </div>
                )}

                {/* Data Export/Import Section - Only show when Firebase is disabled */}
                {!firebaseEnabled && (
                  <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-6">
                    <h4 className="font-semibold mb-4 text-yellow-500">
                      <i className="fas fa-cloud-upload-alt mr-2"></i>Publish Changes to Live Site
                    </h4>
                    <div className="space-y-4">
                      <div className="bg-yellow-500/5 rounded-lg p-4 border border-yellow-500/20">
                        <p className="text-sm text-yellow-200 mb-2">
                          <i className="fas fa-info-circle mr-2"></i>
                          <strong>Important:</strong> To make your changes visible to all users, you need to export the data and commit it to GitHub.
                        </p>
                        <ol className="text-xs text-yellow-200/80 space-y-1 ml-6 list-decimal">
                          <li>Click "Export Data" below to download the data file</li>
                          <li>Replace the <code className="bg-black/30 px-1 rounded">data.json</code> file in your project with the downloaded file</li>
                          <li>Commit and push the changes to GitHub</li>
                          <li>GitHub Actions will automatically deploy the changes</li>
                        </ol>
                      </div>

                      <div className="flex flex-wrap gap-3">
                        <button
                          onClick={() => {
                            const dataStr = dataService.exportData();
                          const blob = new Blob([dataStr], { type: 'application/json' });
                          const url = URL.createObjectURL(blob);
                          const a = document.createElement('a');
                          a.href = url;
                          a.download = `elitefaces-data-${new Date().toISOString().split('T')[0]}.json`;
                          document.body.appendChild(a);
                          a.click();
                          document.body.removeChild(a);
                          URL.revokeObjectURL(url);
                          showToastMessage('Data exported successfully! Now replace data.json in your project.', 'success');
                        }}
                        className="px-6 py-3 bg-green-500/20 text-green-400 rounded-lg font-medium hover:bg-green-500/30 flex items-center"
                      >
                        <i className="fas fa-download mr-2"></i>Export Data
                      </button>

                      <label className="px-6 py-3 bg-blue-500/20 text-blue-400 rounded-lg font-medium hover:bg-blue-500/30 flex items-center cursor-pointer">
                        <i className="fas fa-upload mr-2"></i>Import Data
                        <input
                          type="file"
                          accept=".json"
                          className="hidden"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              const reader = new FileReader();
                              reader.onload = (event) => {
                                try {
                                  const data = event.target?.result as string;
                                  dataService.importData(data);
                                  // Refresh the UI
                                  window.location.reload();
                                } catch (error) {
                                  showToastMessage('Failed to import data', 'error');
                                }
                              };
                              reader.readAsText(file);
                            }
                          }}
                        />
                      </label>
                    </div>
                  </div>
                </div>
                )}

                <div className="bg-slate-900/50 border border-white/10 rounded-xl p-6">
                  <h4 className="font-semibold mb-4">Cache Management</h4>
                  <div className="space-y-4">
                    <button
                      onClick={() => {
                        localStorage.clear();
                        showToastMessage('Cache cleared! Page will reload...', 'success');
                        setTimeout(() => window.location.reload(), 1000);
                      }}
                      className="px-6 py-2 bg-red-500/20 text-red-400 rounded-lg font-medium hover:bg-red-500/30"
                    >
                      <i className="fas fa-trash mr-2"></i>Clear All Cache
                    </button>
                    <p className="text-sm text-slate-400">This will clear all cached data including celebrities, blogs, and custom pages.</p>
                  </div>
                </div>

                <div className="bg-slate-900/50 border border-white/10 rounded-xl p-6">
                  <h4 className="font-semibold mb-4">Statistics</h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center p-4 bg-slate-800 rounded-lg">
                      <p className="text-3xl font-bold text-yellow-500">{celebrityList.length}</p>
                      <p className="text-slate-400 text-sm">Celebrities</p>
                    </div>
                    <div className="text-center p-4 bg-slate-800 rounded-lg">
                      <p className="text-3xl font-bold text-blue-500">{blogPosts.length}</p>
                      <p className="text-slate-400 text-sm">Blog Posts</p>
                    </div>
                    <div className="text-center p-4 bg-slate-800 rounded-lg">
                      <p className="text-3xl font-bold text-green-500">{customPages.length}</p>
                      <p className="text-slate-400 text-sm">Custom Pages</p>
                    </div>
                    <div className="text-center p-4 bg-slate-800 rounded-lg">
                      <p className="text-3xl font-bold text-purple-500">{blogPosts.filter(b => b.published !== false).length}</p>
                      <p className="text-slate-400 text-sm">Published</p>
                    </div>
                  </div>
                </div>

                <div className="bg-slate-900/50 border border-white/10 rounded-xl p-6">
                  <h4 className="font-semibold mb-4">How to Use</h4>
                  <div className="space-y-3 text-sm text-slate-400">
                    <p><strong className="text-white">Celebrities:</strong> Add/Edit celebrity profiles. Upload photos directly from your device.</p>
                    <p><strong className="text-white">Blog Posts:</strong> Create blog articles. The "Section" field creates a navigation link that users can click to view all posts in that section.</p>
                    <p><strong className="text-white">Custom Pages:</strong> Create standalone pages with custom URLs. Perfect for About, Services, or any custom content.</p>
                    <p><strong className="text-white">Publish Changes:</strong> Use Export Data above to download your changes and commit to GitHub for live deployment.</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {showToast && (
        <div className={`toast ${toastType}`}>
          <p className="text-white font-medium">{toastMessage}</p>
        </div>
      )}
    </>
  );
};

export default AdminPanel;
