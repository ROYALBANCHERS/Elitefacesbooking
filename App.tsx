
import React, { useState, useMemo } from 'react';
import { CELEBRITIES, CATEGORIES } from './constants';
import { Celebrity, Category } from './types';
import CelebrityCard from './components/CelebrityCard';
import AIAssistant from './components/AIAssistant';
import BookingModal from './components/BookingModal';

const App: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<Category | 'All'>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [bookingCelebrity, setBookingCelebrity] = useState<Celebrity | null>(null);

  const filteredCelebrities = useMemo(() => {
    return CELEBRITIES.filter(c => {
      const matchesCategory = selectedCategory === 'All' || c.category === selectedCategory;
      const matchesSearch = c.name.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-40 glass border-b border-white/5 px-6 py-3">
        <div className="container mx-auto flex justify-between items-center">
          <a href="#" className="flex items-center space-x-3 group logo-glow transition-all">
            <img 
              src="logo.png" 
              alt="EliteFaces Logo" 
              className="h-12 w-12 rounded-full object-cover border border-white/10"
            />
            <div className="flex flex-col -space-y-1">
              <span className="text-xl font-black tracking-tighter gold-gradient italic serif leading-tight">EliteFaces</span>
              <span className="text-[10px] uppercase tracking-[0.3em] text-slate-400 hidden sm:block">Luxury Booking</span>
            </div>
          </a>
          <div className="hidden md:flex items-center space-x-8 text-sm font-medium tracking-widest text-slate-300">
            <a href="#roster" className="hover:text-yellow-500 transition-colors">TALENT ROSTER</a>
            <a href="#ai-consultant" className="hover:text-yellow-500 transition-colors">AI ADVISOR</a>
            <a href="#" className="hover:text-yellow-500 transition-colors">OUR SERVICES</a>
            <a href="mailto:elitefacesbooking@gmail.com" className="btn-gold text-slate-950 px-6 py-2 rounded-full font-bold">CONTACT</a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="relative pt-40 pb-32 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-yellow-500/10 via-transparent to-transparent"></div>
          {/* Subtle logo watermark background */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.03] scale-150 pointer-events-none">
            <img src="logo.png" alt="" className="w-[800px] grayscale brightness-200" />
          </div>
        </div>
        
        <div className="container mx-auto px-6 relative z-10 text-center">
          <div className="flex justify-center mb-8 animate-in fade-in zoom-in duration-1000">
             <img src="logo.png" alt="EliteFaces" className="h-24 w-24 rounded-full border-2 border-yellow-500/30 shadow-2xl shadow-yellow-500/10" />
          </div>
          <span className="text-yellow-500 font-bold tracking-[0.5em] uppercase text-sm mb-6 block animate-in fade-in slide-in-from-top-4 duration-1000">India's Leading Talent Agency</span>
          <h1 className="text-6xl md:text-8xl font-black mb-8 leading-tight">
            Elevate Your Brand with <br />
            <span className="gold-gradient serif">Iconic Faces</span>
          </h1>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto mb-12">
            Connecting global brands with India's most influential celebrities, sports stars, and digital icons for unparalleled impact.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6">
            <a href="#roster" className="btn-gold text-slate-950 px-10 py-5 rounded-xl font-bold text-lg w-full sm:w-auto">BROWSE TALENT</a>
            <a href="#ai-consultant" className="glass px-10 py-5 rounded-xl font-bold text-lg hover:bg-white/5 transition-all w-full sm:w-auto">TALK TO AI ADVISOR</a>
          </div>
        </div>
      </header>

      {/* Roster Section */}
      <section id="roster" className="py-24 bg-slate-950/50">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center mb-16 space-y-8 md:space-y-0">
            <div className="max-w-xl text-center md:text-left">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">The Premier Roster</h2>
              <p className="text-slate-400 italic">Curated representation for the most sought-after Indian icons.</p>
            </div>
            
            <div className="w-full md:w-auto flex flex-col items-center md:items-end space-y-6">
              {/* Search Bar */}
              <div className="relative w-full md:w-80 group">
                <input 
                  type="text" 
                  placeholder="Search celebrity name..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-slate-900/50 border border-white/10 glass px-5 py-3 rounded-full text-white placeholder-slate-500 focus:outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500/50 transition-all"
                />
                <svg className="w-5 h-5 text-slate-500 absolute right-4 top-1/2 -translate-y-1/2 group-focus-within:text-yellow-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>

              {/* Category Pills */}
              <div className="flex flex-wrap justify-center md:justify-end gap-2">
                <button 
                  onClick={() => setSelectedCategory('All')}
                  className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${selectedCategory === 'All' ? 'bg-yellow-500 text-slate-950' : 'bg-slate-900 text-slate-400 hover:text-white'}`}
                >
                  All
                </button>
                {CATEGORIES.map(cat => (
                  <button 
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${selectedCategory === cat ? 'bg-yellow-500 text-slate-950' : 'bg-slate-900 text-slate-400 hover:text-white'}`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
            {filteredCelebrities.map(celeb => (
              <CelebrityCard 
                key={celeb.id} 
                celebrity={celeb} 
                onBook={() => setBookingCelebrity(celeb)}
              />
            ))}
          </div>
          
          {filteredCelebrities.length === 0 && (
            <div className="text-center py-24 glass rounded-3xl border-dashed border-2 border-white/5">
              <div className="mb-4 text-slate-600">
                <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M9.172 9.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
              </div>
              <h3 className="text-xl font-bold text-slate-300 mb-2">No Talent Found</h3>
              <p className="text-slate-500 italic max-w-sm mx-auto">We couldn't find a celebrity named "{searchQuery}" in our current roster. Try a broader search or category.</p>
            </div>
          )}
        </div>
      </section>

      {/* AI Assistant Section */}
      <AIAssistant />

      {/* Trust Markers */}
      <section className="py-20 border-y border-white/5">
        <div className="container mx-auto px-6">
          <div className="flex flex-wrap justify-center items-center gap-12 opacity-30 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-700">
            <div className="text-2xl font-bold tracking-tighter">PEPSICO</div>
            <div className="text-2xl font-bold tracking-tighter">NIKE INDIA</div>
            <div className="text-2xl font-bold tracking-tighter">L'ORÉAL</div>
            <div className="text-2xl font-bold tracking-tighter">TATA MOTORS</div>
            <div className="text-2xl font-bold tracking-tighter">MERCEDES-BENZ</div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 glass mt-20">
        <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12 text-center md:text-left">
          <div className="md:col-span-2">
            <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4 mb-6">
                <img src="logo.png" alt="EliteFaces" className="h-16 w-16 rounded-full border border-white/10" />
                <span className="text-3xl font-black gold-gradient serif italic block">EliteFacesBooking</span>
            </div>
            <p className="text-slate-400 max-w-sm mx-auto md:mx-0 mb-8 leading-relaxed">
              We manage the legends of today and the icons of tomorrow. Our mission is to bridge the gap between creative excellence and brand storytelling.
            </p>
            <div className="flex justify-center md:justify-start space-x-4">
              <a href="#" className="w-10 h-10 rounded-full glass flex items-center justify-center hover:text-yellow-500 transition-colors">IG</a>
              <a href="#" className="w-10 h-10 rounded-full glass flex items-center justify-center hover:text-yellow-500 transition-colors">LN</a>
              <a href="#" className="w-10 h-10 rounded-full glass flex items-center justify-center hover:text-yellow-500 transition-colors">X</a>
            </div>
          </div>
          <div>
            <h4 className="text-lg font-bold mb-6 text-white uppercase tracking-widest">Connect</h4>
            <ul className="space-y-4 text-slate-400">
              <li>
                <a href="mailto:elitefacesbooking@gmail.com" className="flex items-center justify-center md:justify-start space-x-2 hover:text-yellow-500 transition-colors">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                  <span>elitefacesbooking@gmail.com</span>
                </a>
              </li>
              <li><a href="#" className="hover:text-white transition-colors">Bollywood Talent</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Sports Management</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-bold mb-6 text-white uppercase tracking-widest">Company</h4>
            <ul className="space-y-4 text-slate-400">
              <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Our Success Stories</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
            </ul>
          </div>
        </div>
        <div className="container mx-auto px-6 pt-12 mt-12 border-t border-white/5 text-center text-slate-500 text-xs tracking-widest uppercase">
          © {new Date().getFullYear()} EliteFacesBooking Management Pvt. Ltd. All rights reserved.
        </div>
      </footer>

      {/* Booking Modal */}
      {bookingCelebrity && (
        <BookingModal 
          celebrity={bookingCelebrity} 
          onClose={() => setBookingCelebrity(null)} 
        />
      )}
    </div>
  );
};

export default App;
