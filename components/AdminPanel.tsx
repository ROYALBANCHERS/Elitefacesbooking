import React, { useState, useEffect } from 'react';
import { Celebrity } from '../types';

// Admin credentials
const ADMIN_CREDENTIALS = {
  username: 'Rishabhkumar023',
  email: 'growthing868@gmail.com'
};

interface AdminPanelProps {
  onClose: () => void;
  onUpdateCelebrities: (celebrities: Celebrity[]) => void;
  celebrities: Celebrity[];
}

const AdminPanel: React.FC<AdminPanelProps> = ({ onClose, onUpdateCelebrities, celebrities }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [activeTab, setActiveTab] = useState<'celebrities' | 'blogs'>('celebrities');
  const [editingCelebrity, setEditingCelebrity] = useState<Celebrity | null>(null);
  const [celebrityList, setCelebrityList] = useState<Celebrity[]>(celebrities);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState<'success' | 'error'>('success');

  useEffect(() => {
    // Check if already authenticated in session
    const auth = sessionStorage.getItem('admin_auth');
    if (auth === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  const showToastMessage = (message: string, type: 'success' | 'error') => {
    setToastMessage(message);
    setToastType(type);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === ADMIN_CREDENTIALS.username && email === ADMIN_CREDENTIALS.email) {
      setIsAuthenticated(true);
      sessionStorage.setItem('admin_auth', 'true');
      showToastMessage('Welcome back, Admin!', 'success');
    } else {
      showToastMessage('Invalid credentials!', 'error');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('admin_auth');
    setUsername('');
    setEmail('');
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
          <div className="flex border-b border-white/10">
            <button
              onClick={() => setActiveTab('celebrities')}
              className={`flex-1 py-4 text-center font-medium transition-colors ${activeTab === 'celebrities' ? 'text-yellow-500 border-b-2 border-yellow-500' : 'text-slate-400 hover:text-white'}`}
            >
              <i className="fas fa-users mr-2"></i>Celebrities
            </button>
            <button
              onClick={() => setActiveTab('blogs')}
              className={`flex-1 py-4 text-center font-medium transition-colors ${activeTab === 'blogs' ? 'text-yellow-500 border-b-2 border-yellow-500' : 'text-slate-400 hover:text-white'}`}
            >
              <i className="fas fa-blog mr-2"></i>Blog Posts
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

                      <div className="grid grid-cols-3 gap-4">
                        <div>
                          <label className="text-sm text-slate-400 mb-1 block">Image URL</label>
                          <input
                            type="text"
                            value={editingCelebrity.imageUrl}
                            onChange={(e) => updateCelebrityField('imageUrl', e.target.value)}
                            className="w-full bg-slate-800 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-yellow-500"
                            required
                          />
                        </div>
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
              <div className="text-center py-12">
                <i className="fas fa-blog text-6xl text-slate-700 mb-4"></i>
                <h3 className="text-xl font-semibold mb-2">Blog Management</h3>
                <p className="text-slate-400">Blog management feature coming soon...</p>
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
