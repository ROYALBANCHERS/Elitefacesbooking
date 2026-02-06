import React, { useState, useMemo } from 'react';
import { CELEBRITIES, CATEGORIES } from '../../constants';
import { Celebrity, Category } from '../../types';
import CelebrityCard from '../CelebrityCard';
import { useRouter } from '../Router';

const Celebrities: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<Category | 'All'>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const { navigateTo } = useRouter();

  const filteredCelebrities = useMemo(() => {
    return CELEBRITIES.filter(c => {
      const matchesCategory = selectedCategory === 'All' || c.category === selectedCategory;
      const matchesSearch = c.name.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <div className="min-h-screen pt-32 pb-20">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-40 glass border-b border-white/5 px-6 py-3">
        <div className="container mx-auto flex justify-between items-center">
          <button 
            onClick={() => navigateTo('home')}
            className="flex items-center space-x-3 group logo-glow transition-all hover:opacity-80"
          >
            <img 
              src="LOGO.PNG" 
              alt="EliteFaces Logo" 
              className="h-12 w-12 rounded-full object-cover border border-white/10"
            />
            <div className="flex flex-col -space-y-1">
              <span className="text-xl font-black tracking-tighter gold-gradient italic serif leading-tight">EliteFaces</span>
              <span className="text-[10px] uppercase tracking-[0.3em] text-slate-400 hidden sm:block">Luxury Booking</span>
            </div>
          </button>
          <div className="hidden md:flex items-center space-x-8 text-sm font-medium tracking-widest text-slate-300">
            <button onClick={() => navigateTo('home')} className="hover:text-yellow-500 transition-colors">HOME</button>
            <button onClick={() => navigateTo('services')} className="hover:text-yellow-500 transition-colors">OUR SERVICES</button>
            <button onClick={() => navigateTo('about')} className="hover:text-yellow-500 transition-colors">ABOUT</button>
            <button onClick={() => navigateTo('contact')} className="btn-gold text-slate-950 px-6 py-2 rounded-full font-bold">CONTACT</button>
          </div>
          <div className="md:hidden">
            <button
              onClick={() => navigateTo('home')}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
            </button>
          </div>
        </div>
      </nav>

      {/* Header */}
      <div className="px-6 mb-16">
        <div className="container mx-auto">
          <h1 className="text-4xl md:text-5xl font-black tracking-tighter gold-gradient mb-4">ALL CELEBRITIES</h1>
          <p className="text-slate-300 text-lg">Explore our exclusive roster of premium talent and influencers</p>
        </div>
      </div>

      {/* Filters */}
      <div className="px-6 mb-12">
        <div className="container mx-auto space-y-6">
          {/* Search */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search celebrities..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 rounded-xl px-6 py-4 text-white placeholder-slate-500 focus:outline-none focus:border-yellow-500 transition-colors"
            />
            <svg className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>

          {/* Category Filter */}
          <div>
            <p className="text-sm uppercase tracking-widest text-slate-400 mb-4 font-semibold">Filter by Category</p>
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => setSelectedCategory('All')}
                className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                  selectedCategory === 'All'
                    ? 'bg-yellow-500 text-slate-950'
                    : 'bg-slate-800 text-white hover:bg-slate-700'
                }`}
              >
                All
              </button>
              {CATEGORIES.map(category => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                    selectedCategory === category
                      ? 'bg-yellow-500 text-slate-950'
                      : 'bg-slate-800 text-white hover:bg-slate-700'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Results Count */}
      <div className="px-6 mb-8">
        <div className="container mx-auto">
          <p className="text-slate-400 text-sm">
            Showing <span className="text-yellow-400 font-bold">{filteredCelebrities.length}</span> of <span className="text-yellow-400 font-bold">{CELEBRITIES.length}</span> celebrities
          </p>
        </div>
      </div>

      {/* Celebrity Grid */}
      <div className="px-6 pb-20">
        <div className="container mx-auto">
          {filteredCelebrities.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredCelebrities.map(celebrity => (
                <CelebrityCard key={celebrity.name} celebrity={celebrity} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <svg className="w-16 h-16 text-slate-600 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm0 2c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm0 10c-2.21 0-4 1.79-4 4v2h8v-2c0-2.21-1.79-4-4-4z" />
              </svg>
              <h3 className="text-xl font-semibold text-slate-300 mb-2">No celebrities found</h3>
              <p className="text-slate-500">Try adjusting your search or filter criteria</p>
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-white/5 bg-slate-950/50 py-12">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
            <div>
              <h4 className="text-lg font-bold mb-6 text-white uppercase tracking-widest">About</h4>
              <ul className="space-y-4 text-slate-400">
                <li><button onClick={() => navigateTo('about')} className="hover:text-white transition-colors">About Us</button></li>
                <li><button onClick={() => navigateTo('why-us')} className="hover:text-white transition-colors">Why Choose Us</button></li>
                <li><button onClick={() => navigateTo('faqs')} className="hover:text-white transition-colors">FAQs</button></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-bold mb-6 text-white uppercase tracking-widest">Company</h4>
              <ul className="space-y-4 text-slate-400">
                <li><button onClick={() => navigateTo('services')} className="hover:text-white transition-colors">Our Services</button></li>
                <li><button onClick={() => navigateTo('portfolio')} className="hover:text-white transition-colors">Portfolio</button></li>
                <li><button onClick={() => navigateTo('contact')} className="hover:text-white transition-colors">Contact</button></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-bold mb-6 text-white uppercase tracking-widest">Legal</h4>
              <ul className="space-y-4 text-slate-400">
                <li><button onClick={() => navigateTo('privacy')} className="hover:text-white transition-colors">Privacy Policy</button></li>
                <li><button onClick={() => navigateTo('blog-industry')} className="hover:text-white transition-colors">Blog</button></li>
                <li><a href="mailto:elitefacesbooking@gmail.com" className="hover:text-white transition-colors">Email Us</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/5 pt-8 text-center text-slate-500 text-sm">
            <p>&copy; 2025 EliteFaces Booking. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Celebrities;
