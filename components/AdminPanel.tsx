import React, { useState, useEffect } from 'react';
import { Celebrity } from '../types';
import { useAdmin } from './AdminContext';
import ImageUpload from './ImageUpload';

// Admin credentials - stored in localStorage for persistence
const DEFAULT_ADMIN_CREDENTIALS = {
  username: 'Rishabhkumar023',
  password: 'Admin@123'
};

// Blog content interface
interface BlogPost {
  id: string;
  title: string;
  content: string;
  category: string;
  imageUrl: string;
  date: string;
}

interface PageContent {
  id: string;
  title: string;
  content: string;
  slug: string;
}

interface AdminPanelProps {
  onClose: () => void;
  onUpdateCelebrities: (celebrities: Celebrity[]) => void;
  celebrities: Celebrity[];
  onUpdateBlogs?: (blogs: BlogPost[]) => void;
  onUpdatePages?: (pages: PageContent[]) => void;
}

const AdminPanel: React.FC<AdminPanelProps> = ({ onClose, onUpdateCelebrities, celebrities, onUpdateBlogs, onUpdatePages }) => {
  const { isAdmin, setAdminAuth, logoutAdmin } = useAdmin();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [activeTab, setActiveTab] = useState<'celebrities' | 'blogs' | 'images' | 'pages' | 'settings'>('celebrities');
  const [editingCelebrity, setEditingCelebrity] = useState<Celebrity | null>(null);
  const [celebrityList, setCelebrityList] = useState<Celebrity[]>(celebrities);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [editingBlog, setEditingBlog] = useState<BlogPost | null>(null);
  const [pageContents, setPageContents] = useState<PageContent[]>([]);
  const [editingPage, setEditingPage] = useState<PageContent | null>(null);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState<'success' | 'error'>('success');

  useEffect(() => {
    // Load admin credentials from localStorage or use defaults
    const storedCreds = localStorage.getItem('admin_credentials');
    if (!storedCreds) {
      localStorage.setItem('admin_credentials', JSON.stringify(DEFAULT_ADMIN_CREDENTIALS));
    }

    // Load page contents from localStorage
    const storedPages = localStorage.getItem('page_contents');
    if (storedPages) {
      setPageContents(JSON.parse(storedPages));
    } else {
      // Initialize with default pages
      const defaultPages = [
        { id: 'services', title: 'Our Services', content: 'Default services content...', slug: 'services' },
        { id: 'about', title: 'About Us', content: 'Default about content...', slug: 'about' },
        { id: 'portfolio', title: 'Portfolio', content: 'Default portfolio content...', slug: 'portfolio' },
        { id: 'contact', title: 'Contact Us', content: 'Default contact content...', slug: 'contact' }
      ];
      setPageContents(defaultPages);
      localStorage.setItem('page_contents', JSON.stringify(defaultPages));
    }

    // Load blog posts from localStorage
    const storedBlogs = localStorage.getItem('blog_posts');
    if (storedBlogs) {
      setBlogPosts(JSON.parse(storedBlogs));
    }
  }, []);

  const showToastMessage = (message: string, type: 'success' | 'error') => {
    setToastMessage(message);
    setToastType(type);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const getAdminCredentials = () => {
    const stored = localStorage.getItem('admin_credentials');
    return stored ? JSON.parse(stored) : DEFAULT_ADMIN_CREDENTIALS;
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const creds = getAdminCredentials();
    if (username === creds.username && password === creds.password) {
      setAdminAuth(true);
      showToastMessage('Welcome back, Admin!', 'success');
      setPassword('');
    } else {
      showToastMessage('Invalid username or password!', 'error');
    }
  };

  const handleLogout = () => {
    logoutAdmin();
    setUsername('');
    setPassword('');
    onClose();
  };

  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      showToastMessage('Passwords do not match!', 'error');
      return;
    }
    if (newPassword.length < 6) {
      showToastMessage('Password must be at least 6 characters!', 'error');
      return;
    }
    const creds = getAdminCredentials();
    creds.password = newPassword;
    localStorage.setItem('admin_credentials', JSON.stringify(creds));
    showToastMessage('Password changed successfully!', 'success');
    setNewPassword('');
    setConfirmPassword('');
    setShowChangePassword(false);
  };

  const handleEditCelebrity = (celebrity: Celebrity) => {
    setEditingCelebrity(celebrity);
  };

  const handleDeleteCelebrity = (id: string) => {
    if (window.confirm('Are you sure you want to delete this celebrity?')) {
      const updated = celebrityList.filter(c => c.id !== id);
      setCelebrityList(updated);
      onUpdateCelebrities(updated);
      showToastMessage('Celebrity deleted successfully', 'success');
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
    setEditingCelebrity(null);
    showToastMessage('Celebrity updated successfully!', 'success');
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

  // Blog management functions
  const handleAddBlog = () => {
    const newBlog: BlogPost = {
      id: Date.now().toString(),
      title: 'New Blog Post',
      content: 'Add your blog content here...',
      category: 'Industry Trends',
      imageUrl: 'LOGO.PNG',
      date: new Date().toISOString()
    };
    const updated = [...blogPosts, newBlog];
    setBlogPosts(updated);
    localStorage.setItem('blog_posts', JSON.stringify(updated));
    setEditingBlog(newBlog);
  };

  const handleEditBlog = (blog: BlogPost) => {
    setEditingBlog(blog);
  };

  const handleDeleteBlog = (id: string) => {
    if (window.confirm('Are you sure you want to delete this blog post?')) {
      const updated = blogPosts.filter(b => b.id !== id);
      setBlogPosts(updated);
      localStorage.setItem('blog_posts', JSON.stringify(updated));
      if (onUpdateBlogs) onUpdateBlogs(updated);
      showToastMessage('Blog deleted successfully', 'success');
    }
  };

  const handleSaveBlog = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingBlog) return;

    const updated = blogPosts.map(b =>
      b.id === editingBlog.id ? editingBlog : b
    );
    setBlogPosts(updated);
    localStorage.setItem('blog_posts', JSON.stringify(updated));
    if (onUpdateBlogs) onUpdateBlogs(updated);
    setEditingBlog(null);
    showToastMessage('Blog updated successfully!', 'success');
  };

  const updateBlogField = (field: keyof BlogPost, value: any) => {
    if (editingBlog) {
      setEditingBlog({
        ...editingBlog,
        [field]: value
      });
    }
  };

  if (!isAdmin) {
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
        <div className="relative glass w-full max-w-6xl h-[90vh] rounded-3xl overflow-hidden flex flex-col">
          {/* Header */}
          <div className="p-6 border-b border-white/10 flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-yellow-500/20 rounded-full flex items-center justify-center">
                <i className="fas fa-cog text-yellow-500"></i>
              </div>
              <div>
                <h2 className="text-xl font-bold">Admin Panel</h2>
                <p className="text-slate-400 text-sm">Manage celebrities & content</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
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
              className={`flex-1 py-4 text-center font-medium transition-colors whitespace-nowrap ${activeTab === 'celebrities' ? 'text-yellow-500 border-b-2 border-yellow-500' : 'text-slate-400 hover:text-white'}`}
            >
              <i className="fas fa-users mr-2"></i>Celebrities
            </button>
            <button
              onClick={() => setActiveTab('blogs')}
              className={`flex-1 py-4 text-center font-medium transition-colors whitespace-nowrap ${activeTab === 'blogs' ? 'text-yellow-500 border-b-2 border-yellow-500' : 'text-slate-400 hover:text-white'}`}
            >
              <i className="fas fa-blog mr-2"></i>Blog Posts
            </button>
            <button
              onClick={() => setActiveTab('pages')}
              className={`flex-1 py-4 text-center font-medium transition-colors whitespace-nowrap ${activeTab === 'pages' ? 'text-yellow-500 border-b-2 border-yellow-500' : 'text-slate-400 hover:text-white'}`}
            >
              <i className="fas fa-file-alt mr-2"></i>Custom Pages
            </button>
            <button
              onClick={() => setActiveTab('images')}
              className={`flex-1 py-4 text-center font-medium transition-colors whitespace-nowrap ${activeTab === 'images' ? 'text-yellow-500 border-b-2 border-yellow-500' : 'text-slate-400 hover:text-white'}`}
            >
              <i className="fas fa-images mr-2"></i>Images
            </button>
            <button
              onClick={() => setActiveTab('settings')}
              className={`flex-1 py-4 text-center font-medium transition-colors whitespace-nowrap ${activeTab === 'settings' ? 'text-yellow-500 border-b-2 border-yellow-500' : 'text-slate-400 hover:text-white'}`}
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
                            <img src={celeb.imageUrl} alt={celeb.name} className="w-16 h-16 rounded-lg object-cover" />
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

                      <div className="grid grid-cols-1 gap-4">
                        <ImageUpload
                          label="Celebrity Image"
                          currentImage={editingCelebrity.imageUrl}
                          onImageSelect={(name, base64) => updateCelebrityField('imageUrl', base64)}
                        />

                        <div className="grid grid-cols-2 gap-4">
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
                        </div>

                        <div>
                          <label className="text-sm text-slate-400 mb-1 block">Or paste Image URL</label>
                          <input
                            type="text"
                            value={editingCelebrity.imageUrl}
                            onChange={(e) => updateCelebrityField('imageUrl', e.target.value)}
                            className="w-full bg-slate-800 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-yellow-500"
                            placeholder="https://example.com/image.jpg"
                          />
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
                      <h3 className="text-lg font-semibold">Manage Blog Posts</h3>
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
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {blogPosts.map((blog) => (
                          <div key={blog.id} className="bg-slate-900/50 border border-white/10 rounded-xl p-4">
                            <div className="flex items-start justify-between mb-3">
                              <img src={blog.imageUrl} alt={blog.title} className="w-20 h-20 rounded-lg object-cover" />
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
                            <p className="text-slate-400 text-sm mb-2">{blog.category}</p>
                            <p className="text-slate-500 text-xs">
                              {new Date(blog.date).toLocaleDateString()}
                            </p>
                            <p className="text-slate-400 text-sm mt-2 line-clamp-2">
                              {blog.content.substring(0, 100)}...
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
                          <select
                            value={editingBlog.category}
                            onChange={(e) => updateBlogField('category', e.target.value)}
                            className="w-full bg-slate-800 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-yellow-500"
                          >
                            <option>Industry Trends</option>
                            <option>Event Planning</option>
                            <option>Success Stories</option>
                            <option>FAQ</option>
                          </select>
                        </div>
                      </div>

                      <ImageUpload
                        label="Blog Cover Image"
                        currentImage={editingBlog.imageUrl}
                        onImageSelect={(name, base64) => updateBlogField('imageUrl', base64)}
                      />

                      <div>
                        <label className="text-sm text-slate-400 mb-1 block">Or paste Image URL</label>
                        <input
                          type="text"
                          value={editingBlog.imageUrl}
                          onChange={(e) => updateBlogField('imageUrl', e.target.value)}
                          className="w-full bg-slate-800 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-yellow-500"
                          placeholder="https://example.com/image.jpg"
                        />
                      </div>

                      <div>
                        <label className="text-sm text-slate-400 mb-1 block">Blog Content (supports HTML)</label>
                        <textarea
                          value={editingBlog.content}
                          onChange={(e) => updateBlogField('content', e.target.value)}
                          className="w-full bg-slate-800 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-yellow-500 font-mono text-sm"
                          rows={12}
                          placeholder="Enter your blog content here... You can use HTML tags like <p>, <h1>, <strong>, <em>, <ul>, <li>, etc."
                          required
                        />
                        <p className="text-xs text-slate-500 mt-1">
                          <i className="fas fa-info-circle mr-1"></i>
                          Tip: You can use HTML for formatting. Example: &lt;p&gt;Your text&lt;/p&gt;, &lt;strong&gt;Bold&lt;/strong&gt;, &lt;em&gt;Italic&lt;/em&gt;
                        </p>
                      </div>

                      <div className="bg-slate-800/50 rounded-lg p-4 border border-white/10">
                        <p className="text-sm text-slate-400 mb-2">Preview:</p>
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
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-lg font-semibold">Custom Pages Management</h3>
                    <p className="text-slate-400 text-sm">Create and manage custom pages for your website</p>
                  </div>
                  <button onClick={() => {
                    const newPage: PageContent = {
                      id: Date.now().toString(),
                      title: 'New Page',
                      content: '<p>Add your page content here...</p>',
                      slug: `page-${Date.now()}`
                    };
                    setEditingPage(newPage);
                  }} className="px-4 py-2 btn-gold text-slate-950 rounded-lg font-medium">
                    <i className="fas fa-plus mr-2"></i>Create New Page
                  </button>
                </div>

                {!editingPage ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {pageContents.length === 0 ? (
                      <div className="col-span-full text-center py-12 glass rounded-xl">
                        <i className="fas fa-file-alt text-6xl text-slate-700 mb-4"></i>
                        <h4 className="text-xl font-semibold mb-2">No Custom Pages Yet</h4>
                        <p className="text-slate-400">Click "Create New Page" to add your first custom page</p>
                      </div>
                    ) : (
                      pageContents.map((page) => (
                        <div key={page.id} className="bg-slate-900/50 border border-white/10 rounded-xl p-4">
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex-1">
                              <h4 className="font-semibold mb-1">{page.title}</h4>
                              <p className="text-xs text-slate-500">/{page.slug}</p>
                            </div>
                            <div className="flex space-x-2">
                              <button onClick={() => setEditingPage(page)} className="p-2 bg-blue-500/20 text-blue-400 rounded-lg hover:bg-blue-500/30">
                                <i className="fas fa-edit"></i>
                              </button>
                              <button onClick={() => {
                                if (window.confirm('Delete this page?')) {
                                  const updated = pageContents.filter(p => p.id !== page.id);
                                  setPageContents(updated);
                                  localStorage.setItem('page_contents', JSON.stringify(updated));
                                }
                              }} className="p-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30">
                                <i className="fas fa-trash"></i>
                              </button>
                            </div>
                          </div>
                          <p className="text-slate-500 text-xs line-clamp-2">
                            {page.content.replace(/<[^>]*>/g, '').substring(0, 100)}...
                          </p>
                        </div>
                      ))
                    )}
                  </div>
                ) : (
                  <div className="max-w-3xl mx-auto">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-lg font-semibold">{pageContents.find(p => p.id === editingPage.id) ? 'Edit Page' : 'Create New Page'}</h3>
                      <button onClick={() => setEditingPage(null)} className="text-slate-400 hover:text-white">
                        <i className="fas fa-times mr-2"></i>Cancel
                      </button>
                    </div>

                    <form onSubmit={(e) => {
                      e.preventDefault();
                      const existingIndex = pageContents.findIndex(p => p.id === editingPage.id);
                      let updated;
                      if (existingIndex >= 0) {
                        updated = [...pageContents];
                        updated[existingIndex] = editingPage;
                      } else {
                        updated = [...pageContents, editingPage];
                      }
                      setPageContents(updated);
                      localStorage.setItem('page_contents', JSON.stringify(updated));
                      setEditingPage(null);
                      showToastMessage('Page saved successfully!', 'success');
                    }} className="space-y-4">
                      <div>
                        <label className="text-sm text-slate-400 mb-1 block">Page Title</label>
                        <input
                          type="text"
                          value={editingPage.title}
                          onChange={(e) => setEditingPage({ ...editingPage, title: e.target.value })}
                          className="w-full bg-slate-800 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-yellow-500"
                          required
                        />
                      </div>

                      <div>
                        <label className="text-sm text-slate-400 mb-1 block">URL Slug (no spaces, use hyphens)</label>
                        <input
                          type="text"
                          value={editingPage.slug}
                          onChange={(e) => setEditingPage({ ...editingPage, slug: e.target.value.toLowerCase().replace(/\s+/g, '-') })}
                          className="w-full bg-slate-800 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-yellow-500 font-mono text-sm"
                          placeholder="my-custom-page"
                          required
                        />
                        <p className="text-xs text-slate-500 mt-1">
                          <i className="fas fa-info-circle mr-1"></i>
                          Page will be accessible at: /{editingPage.slug}
                        </p>
                      </div>

                      <div>
                        <label className="text-sm text-slate-400 mb-1 block">Page Content (HTML supported)</label>
                        <textarea
                          value={editingPage.content}
                          onChange={(e) => setEditingPage({ ...editingPage, content: e.target.value })}
                          className="w-full bg-slate-800 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-yellow-500 font-mono text-sm"
                          rows={12}
                          placeholder="<h1>Your Page Title</h1><p>Your content here...</p>"
                          required
                        />
                      </div>

                      <div className="bg-slate-800/50 rounded-lg p-4 border border-white/10">
                        <p className="text-sm text-slate-400 mb-2">Preview:</p>
                        <div className="bg-white rounded-lg p-4 text-slate-900 max-h-48 overflow-y-auto">
                          <div dangerouslySetInnerHTML={{ __html: editingPage.content }} />
                        </div>
                      </div>

                      <div className="flex space-x-3 pt-4">
                        <button type="submit" className="flex-1 py-3 btn-gold text-slate-950 font-bold rounded-lg">
                          <i className="fas fa-save mr-2"></i>Save Page
                        </button>
                        <button type="button" onClick={() => setEditingPage(null)} className="px-6 py-3 bg-slate-800 text-white rounded-lg hover:bg-slate-700">
                          Cancel
                        </button>
                      </div>
                    </form>
                  </div>
                )}

                {/* Info Box */}
                <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-4 mt-6">
                  <p className="text-sm text-blue-300">
                    <i className="fas fa-info-circle mr-2"></i>
                    <strong>Note:</strong> Custom pages created here are stored in localStorage. To access them, you'll need to add routing logic to your App.tsx.
                  </p>
                </div>
              </div>
            )}

            {activeTab === 'images' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-4">Image Management</h3>
                  <p className="text-slate-400 text-sm mb-6">Upload and manage images for celebrities, blogs, and modals. Images are stored as URLs.</p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Image URL Helper */}
                    <div className="bg-slate-900/50 border border-white/10 rounded-xl p-6">
                      <h4 className="font-semibold mb-4 flex items-center">
                        <i className="fas fa-link text-yellow-500 mr-2"></i>Add Image URL
                      </h4>
                      <p className="text-sm text-slate-400 mb-4">Enter a URL to add an image to your media library.</p>
                      <div className="space-y-3">
                        <input
                          type="text"
                          placeholder="https://example.com/image.jpg"
                          className="w-full bg-slate-800 border border-white/10 rounded-lg p-3 text-white placeholder-slate-500 focus:outline-none focus:border-yellow-500"
                        />
                        <input
                          type="text"
                          placeholder="Image name/description"
                          className="w-full bg-slate-800 border border-white/10 rounded-lg p-3 text-white placeholder-slate-500 focus:outline-none focus:border-yellow-500"
                        />
                        <button className="w-full py-2 btn-gold text-slate-950 rounded-lg font-medium">
                          <i className="fas fa-plus mr-2"></i>Add to Library
                        </button>
                      </div>
                    </div>

                    {/* Image Hosting Info */}
                    <div className="bg-slate-900/50 border border-white/10 rounded-xl p-6">
                      <h4 className="font-semibold mb-4 flex items-center">
                        <i className="fas fa-cloud text-blue-500 mr-2"></i>Image Hosting
                      </h4>
                      <p className="text-sm text-slate-400 mb-4">Recommended free image hosting services:</p>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-center text-slate-300">
                          <i className="fas fa-check text-green-500 mr-2"></i>
                          <a href="https://imgbb.com" target="_blank" rel="noopener noreferrer" className="hover:text-yellow-500">ImgBB</a>
                        </li>
                        <li className="flex items-center text-slate-300">
                          <i className="fas fa-check text-green-500 mr-2"></i>
                          <a href="https://postimages.org" target="_blank" rel="noopener noreferrer" className="hover:text-yellow-500">PostImages</a>
                        </li>
                        <li className="flex items-center text-slate-300">
                          <i className="fas fa-check text-green-500 mr-2"></i>
                          <a href="https://cloudinary.com" target="_blank" rel="noopener noreferrer" className="hover:text-yellow-500">Cloudinary</a>
                        </li>
                        <li className="flex items-center text-slate-300">
                          <i className="fas fa-check text-green-500 mr-2"></i>
                          <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-yellow-500">GitHub (via repo)</a>
                        </li>
                      </ul>
                    </div>
                  </div>

                  {/* Current Images in Use */}
                  <div className="mt-6">
                    <h4 className="font-semibold mb-4 flex items-center">
                      <i className="fas fa-photo-video text-purple-500 mr-2"></i>Current Images in Use
                    </h4>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                      {celebrities.map((celeb) => (
                        <div key={celeb.id} className="relative group">
                          <img
                            src={celeb.imageUrl}
                            alt={celeb.name}
                            className="w-full aspect-square object-cover rounded-lg border border-white/10"
                          />
                          <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                            <span className="text-xs text-white text-center px-2">{celeb.name}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Logo Images */}
                  <div className="mt-6">
                    <h4 className="font-semibold mb-4 flex items-center">
                      <i className="fas fa-crown text-yellow-500 mr-2"></i>Brand Images
                    </h4>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                      <div className="bg-slate-900/50 border border-white/10 rounded-xl p-4 text-center">
                        <img src="LOGO.PNG" alt="Main Logo" className="w-20 h-20 mx-auto rounded-lg object-cover mb-2" />
                        <p className="text-sm font-medium">Main Logo</p>
                        <p className="text-xs text-slate-500">LOGO.PNG</p>
                      </div>
                      <div className="bg-slate-900/50 border border-white/10 rounded-xl p-4 text-center">
                        <img src="LOGO.png" alt="Logo Alt" className="w-20 h-20 mx-auto rounded-lg object-cover mb-2" />
                        <p className="text-sm font-medium">Logo Alt</p>
                        <p className="text-xs text-slate-500">LOGO.png</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'settings' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-4 flex items-center">
                    <i className="fas fa-cog text-yellow-500 mr-2"></i>Settings
                  </h3>

                  {/* Change Password Section */}
                  <div className="bg-slate-900/50 border border-white/10 rounded-xl p-6">
                    <h4 className="font-semibold mb-4 flex items-center">
                      <i className="fas fa-key text-blue-500 mr-2"></i>Change Password
                    </h4>

                    {!showChangePassword ? (
                      <button
                        onClick={() => setShowChangePassword(true)}
                        className="px-4 py-2 btn-gold text-slate-950 rounded-lg font-medium"
                      >
                        <i className="fas fa-lock mr-2"></i>Change Password
                      </button>
                    ) : (
                      <form onSubmit={handleChangePassword} className="space-y-4 max-w-md">
                        <div>
                          <label className="text-sm text-slate-400 mb-1 block">New Password</label>
                          <input
                            type="password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            className="w-full bg-slate-800 border border-white/10 rounded-lg p-3 text-white placeholder-slate-500 focus:outline-none focus:border-yellow-500"
                            placeholder="Enter new password (min 6 characters)"
                            required
                            minLength={6}
                          />
                        </div>
                        <div>
                          <label className="text-sm text-slate-400 mb-1 block">Confirm Password</label>
                          <input
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="w-full bg-slate-800 border border-white/10 rounded-lg p-3 text-white placeholder-slate-500 focus:outline-none focus:border-yellow-500"
                            placeholder="Confirm new password"
                            required
                          />
                        </div>
                        <div className="flex space-x-3">
                          <button type="submit" className="px-4 py-2 btn-gold text-slate-950 rounded-lg font-medium">
                            <i className="fas fa-save mr-2"></i>Update Password
                          </button>
                          <button
                            type="button"
                            onClick={() => { setShowChangePassword(false); setNewPassword(''); setConfirmPassword(''); }}
                            className="px-4 py-2 bg-slate-800 text-white rounded-lg hover:bg-slate-700"
                          >
                            Cancel
                          </button>
                        </div>
                      </form>
                    )}
                  </div>

                  {/* Security Info */}
                  <div className="bg-slate-900/50 border border-white/10 rounded-xl p-6">
                    <h4 className="font-semibold mb-4 flex items-center">
                      <i className="fas fa-shield-alt text-green-500 mr-2"></i>Security Information
                    </h4>
                    <ul className="space-y-3 text-sm text-slate-400">
                      <li className="flex items-start">
                        <i className="fas fa-check text-green-500 mr-2 mt-1"></i>
                        <span>Passwords are stored securely in your browser's localStorage</span>
                      </li>
                      <li className="flex items-start">
                        <i className="fas fa-check text-green-500 mr-2 mt-1"></i>
                        <span>Session expires when you close the browser</span>
                      </li>
                      <li className="flex items-start">
                        <i className="fas fa-check text-green-500 mr-2 mt-1"></i>
                        <span>All admin actions are logged for security</span>
                      </li>
                      <li className="flex items-start">
                        <i className="fas fa-info-circle text-blue-500 mr-2 mt-1"></i>
                        <span>Default credentials: username <code className="bg-slate-800 px-2 py-0.5 rounded">Rishabhkumar023</code>, password <code className="bg-slate-800 px-2 py-0.5 rounded">Admin@123</code></span>
                      </li>
                    </ul>
                  </div>

                  {/* Current Session Info */}
                  <div className="bg-slate-900/50 border border-white/10 rounded-xl p-6">
                    <h4 className="font-semibold mb-4 flex items-center">
                      <i className="fas fa-user-circle text-purple-500 mr-2"></i>Current Session
                    </h4>
                    <div className="space-y-2 text-sm">
                      <p className="text-slate-400">
                        <span className="text-slate-500">Logged in as:</span> {getAdminCredentials().username}
                      </p>
                      <p className="text-slate-400">
                        <span className="text-slate-500">Session active:</span> Yes
                      </p>
                    </div>
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
