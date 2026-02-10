
import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { CELEBRITIES, CATEGORIES } from './constants';
import { Celebrity, Category, BlogPost } from './types';
import CelebrityCard from './components/CelebrityCard';
import AIAssistant from './components/AIAssistant';
import BookingModal from './components/BookingModal';
import WelcomeModal from './components/WelcomeModal';
import BlogMenu from './components/BlogMenu';
import AdminPanel from './components/AdminPanel';
import SharedFooter from './components/SharedFooter';
import { RouterProvider, useRouter } from './components/Router';
import PrivacyPolicy from './components/pages/PrivacyPolicy';
import OurServices from './components/pages/OurServices';
import BlogIndustryTrends from './components/pages/BlogIndustryTrends';
import BlogFAQ from './components/pages/BlogFAQ';
import BlogSuccessStories from './components/pages/BlogSuccessStories';
import BlogEventPlanning from './components/pages/BlogEventPlanning';
import AboutUs from './components/pages/AboutUs';
import WhyChooseUs from './components/pages/WhyChooseUs';
import FAQsPage from './components/pages/FAQsPage';
import ContactUs from './components/pages/ContactUs';
import Portfolio from './components/pages/Portfolio';
import CustomPage from './components/CustomPage';
import BlogListingPage from './components/BlogListingPage';
import BlogDetailPage from './components/BlogDetailPage';

const HomePage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<Category | 'All'>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [bookingCelebrity, setBookingCelebrity] = useState<Celebrity | null>(null);
  const [showAdminPanel, setShowAdminPanel] = useState(false);
  const [showAllCelebrities, setShowAllCelebrities] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [adminClickCount, setAdminClickCount] = useState(0);

  // Secret admin access - click logo 5 times
  const handleLogoClick = () => {
    setAdminClickCount(prev => {
      const newCount = prev + 1;
      if (newCount >= 5) {
        setShowAdminPanel(true);
        return 0;
      }
      return newCount;
    });
    navigateTo('home');
    setShowMobileMenu(false);
  };

  // Initialize welcome modal state from localStorage
  const [showWelcomeModal, setShowWelcomeModal] = useState(() => {
    return !localStorage.getItem('elitefaces_welcome_dismissed');
  });

  // Load celebrities from localStorage if available, otherwise use CELEBRITIES constant
  const [celebrities, setCelebrities] = useState<Celebrity[]>(() => {
    const saved = localStorage.getItem('elitefaces_celebrities');
    return saved ? JSON.parse(saved) : CELEBRITIES;
  });

  // Load custom sections for navigation
  const [customSections, setCustomSections] = useState<string[]>(() => {
    const savedBlogs = localStorage.getItem('elitefaces_blogs');
    if (savedBlogs) {
      const blogs: BlogPost[] = JSON.parse(savedBlogs);
      const sections = Array.from(new Set(blogs.filter(b => b.published !== false).map(b => b.section)));
      return sections;
    }
    return [];
  });

  const { navigateTo } = useRouter();

  // Memoized callbacks to prevent unnecessary re-renders
  const handleBookCelebrity = useCallback((celeb: Celebrity) => {
    setBookingCelebrity(celeb);
  }, []);

  // Wrapper function to update celebrities and persist to localStorage
  const handleUpdateCelebrities = useCallback((updatedCelebrities: Celebrity[]) => {
    setCelebrities(updatedCelebrities);
    localStorage.setItem('elitefaces_celebrities', JSON.stringify(updatedCelebrities));
  }, []);

  const handleCloseBooking = useCallback(() => {
    setBookingCelebrity(null);
  }, []);

  const handleCloseWelcome = useCallback(() => {
    setShowWelcomeModal(false);
    localStorage.setItem('elitefaces_welcome_dismissed', 'true');
  }, []);

  const handleCategoryChange = useCallback((cat: Category | 'All') => {
    setSelectedCategory(cat);
  }, []);

  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  }, []);

  // Handle navigation and scroll to section
  const handleNavigateAndScroll = useCallback((page: Page, sectionId?: string) => {
    navigateTo(page);
    setShowMobileMenu(false);
    if (sectionId) {
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  }, [navigateTo]);

  // Update page title and meta tags for SEO
  React.useEffect(() => {
    document.title = 'Elite Faces Booking - Book Top Celebrities & Influencers in India';
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Book top Indian celebrities, actors, influencers, and entertainment talent for events, endorsements, and brand collaborations. Professional talent management agency in Delhi.');
    }
  }, []);

  const filteredCelebrities = useMemo(() => {
    return celebrities.filter(c => {
      const matchesCategory = selectedCategory === 'All' || c.category === selectedCategory;
      const matchesSearch = c.name.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery, celebrities]);

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-40 glass border-b border-white/5 px-6 py-3" role="navigation" aria-label="Main Navigation">
        <div className="container mx-auto flex justify-between items-center">
          <button
            onClick={handleLogoClick}
            className="flex items-center space-x-3 group logo-glow transition-all hover:opacity-80"
            aria-label="Elite Faces Booking - Home"
          >
            <img
              src="LOGO.PNG"
              alt="Elite Faces Booking Logo"
              className="h-12 w-12 rounded-full object-cover border border-white/10"
            />
            <div className="flex flex-col -space-y-1">
              <span className="text-xl font-black tracking-tighter gold-gradient italic serif leading-tight">EliteFaces</span>
              <span className="text-[10px] uppercase tracking-[0.3em] text-slate-400 hidden sm:block">Celebrity Booking</span>
            </div>
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6 text-sm font-medium tracking-widest text-slate-300">
            <button onClick={() => handleNavigateAndScroll('home', 'roster')} className="hover:text-yellow-500 transition-colors" title="Browse our talent roster">TALENT ROSTER</button>
            <button onClick={() => navigateTo('services')} className="hover:text-yellow-500 transition-colors" title="View our services">SERVICES</button>
            <button onClick={() => navigateTo('about')} className="hover:text-yellow-500 transition-colors" title="Learn about us">ABOUT</button>
            <BlogMenu />
            {/* Custom Sections from Admin */}
            {customSections.map(section => (
              <button
                key={section}
                onClick={() => navigateTo('blog-listing', section)}
                className="hover:text-yellow-500 transition-colors"
                title={`View ${section}`}
              >
                {section.toUpperCase()}
              </button>
            ))}
            <button onClick={() => navigateTo('contact')} className="btn-gold text-slate-950 px-6 py-2 rounded-full font-bold" title="Contact us for booking">CONTACT</button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setShowMobileMenu(!showMobileMenu)}
            className="md:hidden text-white p-2 z-50 relative"
            aria-label="Toggle menu"
            style={{ minWidth: '44px', minHeight: '44px' }}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {showMobileMenu ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {showMobileMenu && (
          <div className="md:hidden glass border-t border-white/10 mt-3 py-4 px-6 absolute top-full left-0 right-0 z-40">
            <div className="flex flex-col space-y-4">
              <button
                onClick={() => handleNavigateAndScroll('home', 'roster')}
                className="text-left text-slate-300 hover:text-yellow-500 transition-colors py-2 text-lg font-medium"
              >
                TALENT ROSTER
              </button>
              <button
                onClick={() => {
                  navigateTo('services');
                  setShowMobileMenu(false);
                }}
                className="text-left text-slate-300 hover:text-yellow-500 transition-colors py-2 text-lg font-medium"
              >
                SERVICES
              </button>
              <button
                onClick={() => {
                  navigateTo('about');
                  setShowMobileMenu(false);
                }}
                className="text-left text-slate-300 hover:text-yellow-500 transition-colors py-2 text-lg font-medium"
              >
                ABOUT
              </button>
              <div className="py-2">
                <BlogMenu />
              </div>
              {customSections.map(section => (
                <button
                  key={section}
                  onClick={() => {
                    navigateTo('blog-listing', section);
                    setShowMobileMenu(false);
                  }}
                  className="text-left text-slate-300 hover:text-yellow-500 transition-colors py-2 text-lg font-medium"
                >
                  {section.toUpperCase()}
                </button>
              ))}
              <button
                onClick={() => {
                  navigateTo('contact');
                  setShowMobileMenu(false);
                }}
                className="btn-gold text-slate-950 px-6 py-3 rounded-lg font-bold text-center text-lg mt-2"
              >
                CONTACT
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <header className="relative pt-40 pb-32 overflow-hidden" role="banner">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-yellow-500/10 via-transparent to-transparent"></div>
          {/* Subtle logo watermark background */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.03] scale-150 pointer-events-none" aria-hidden="true">
            <img src="LOGO.png" alt="" className="w-[800px] grayscale brightness-200" />
          </div>
        </div>

        <div className="container mx-auto px-6 relative z-10 text-center">
          <div className="flex justify-center mb-8 animate-in fade-in zoom-in duration-1000">
             <img src="LOGO.PNG" alt="Elite Faces Booking Logo" className="h-24 w-24 rounded-full border-2 border-yellow-500/30 shadow-2xl shadow-yellow-500/10" />
          </div>
          <span className="text-yellow-500 font-bold tracking-[0.3em] uppercase text-xs sm:text-sm mb-4 sm:mb-6 block animate-in fade-in slide-in-from-top-4 duration-1000">India's Leading Talent Agency</span>
          <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-black mb-6 sm:mb-8 leading-tight hero-title">
            Elevate Your Brand with <br className="sm:hidden" />
            <span className="gold-gradient serif">Iconic Faces</span>
          </h1>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto mb-12">
            Book India's top celebrities, actors, influencers, and entertainment talent. Professional talent management and celebrity booking services for events, endorsements, and brand collaborations.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6">
            <button onClick={() => handleNavigateAndScroll('home', 'roster')} className="btn-gold text-slate-950 px-10 py-5 rounded-xl font-bold text-lg w-full sm:w-auto">BROWSE TALENT</button>
            <button onClick={() => handleNavigateAndScroll('home', 'ai-consultant')} className="glass px-10 py-5 rounded-xl font-bold text-lg hover:bg-white/5 transition-all w-full sm:w-auto">TALK TO AI ADVISOR</button>
          </div>
        </div>
      </header>

      {/* Roster Section */}
      <section id="roster" className="py-24 bg-slate-950/50" aria-label="Celebrity Talent Roster">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center mb-16 space-y-8 md:space-y-0">
            <div className="max-w-xl text-center md:text-left">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">The Premier Roster</h2>
              <p className="text-slate-400 italic">Browse our curated collection of India's most sought-after celebrities, actors, influencers, and entertainment talent available for booking.</p>
              <p className="text-yellow-500 font-semibold mt-2">{celebrities.length}+ Celebrities Available</p>
            </div>

            <div className="w-full md:w-auto flex flex-col items-center md:items-end space-y-6">
              {/* Search Bar */}
              <div className="relative w-full md:w-80 group">
                <input
                  type="text"
                  placeholder="Search celebrity name..."
                  value={searchQuery}
                  onChange={handleSearchChange}
                  className="w-full bg-slate-900/50 border border-white/10 glass px-5 py-3 rounded-full text-white placeholder-slate-500 focus:outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500/50 transition-all"
                />
                <svg className="w-5 h-5 text-slate-500 absolute right-4 top-1/2 -translate-y-1/2 group-focus-within:text-yellow-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>

              {/* Category Pills */}
              <div className="flex flex-wrap justify-center md:justify-end gap-2">
                <button
                  onClick={() => handleCategoryChange('All')}
                  className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${selectedCategory === 'All' ? 'bg-yellow-500 text-slate-950' : 'bg-slate-900 text-slate-400 hover:text-white'}`}
                >
                  All
                </button>
                {CATEGORIES.map(cat => (
                  <button
                    key={cat}
                    onClick={() => handleCategoryChange(cat)}
                    className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${selectedCategory === cat ? 'bg-yellow-500 text-slate-950' : 'bg-slate-900 text-slate-400 hover:text-white'}`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Display celebrities - limited by default */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
            {(showAllCelebrities ? filteredCelebrities : filteredCelebrities.slice(0, 8)).map(celeb => (
              <CelebrityCard
                key={celeb.id}
                celebrity={celeb}
                onBook={handleBookCelebrity}
              />
            ))}
          </div>

          {/* View All Button */}
          {filteredCelebrities.length > 8 && !showAllCelebrities && (
            <div className="text-center mt-12">
              <button
                onClick={() => setShowAllCelebrities(true)}
                className="glass border border-yellow-500/30 px-10 py-4 rounded-xl font-bold text-lg hover:bg-yellow-500/10 transition-all"
              >
                <i className="fas fa-users mr-2"></i>View All Celebrities ({filteredCelebrities.length})
              </button>
            </div>
          )}

          {/* Show Less Button */}
          {showAllCelebrities && filteredCelebrities.length > 8 && (
            <div className="text-center mt-12">
              <button
                onClick={() => setShowAllCelebrities(false)}
                className="glass border border-white/20 px-10 py-4 rounded-xl font-bold text-lg hover:bg-white/5 transition-all"
              >
                <i className="fas fa-chevron-up mr-2"></i>Show Less
              </button>
            </div>
          )}

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
      <section className="py-20 border-y border-white/5 bg-slate-950/30">
        <div className="container mx-auto px-6">
          <div className="flex flex-wrap justify-center items-center gap-12 opacity-30 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-700">
            <div className="text-2xl font-bold tracking-tighter text-white">PEPSICO</div>
            <div className="text-2xl font-bold tracking-tighter text-white">NIKE INDIA</div>
            <div className="text-2xl font-bold tracking-tighter text-white">TATA</div>
            <div className="text-2xl font-bold tracking-tighter text-white">RELIANCE</div>
            <div className="text-2xl font-bold tracking-tighter text-white">EIA</div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <SharedFooter />

      {/* Welcome Modal */}
      {showWelcomeModal && (
        <WelcomeModal
          onClose={handleCloseWelcome}
        />
      )}

      {/* Booking Modal */}
      {bookingCelebrity && (
        <BookingModal
          celebrity={bookingCelebrity}
          onClose={handleCloseBooking}
        />
      )}

      {/* Admin Panel Modal */}
      {showAdminPanel && (
        <AdminPanel
          onClose={() => setShowAdminPanel(false)}
          onUpdateCelebrities={handleUpdateCelebrities}
          celebrities={celebrities}
        />
      )}
    </div>
  );
};

const PageWrapper: React.FC<{ children: React.ReactNode; showFooter?: boolean }> = ({ children, showFooter = true }) => {
  return (
    <>
      {children}
      {showFooter && <SharedFooter />}
    </>
  );
};

interface AppContainerProps {}

const AppContainer: React.FC<AppContainerProps> = () => {
  const { currentPage, pageParams } = useRouter();

  return (
    <>
      {currentPage === 'home' && <HomePage />}
      {currentPage === 'privacy' && <PageWrapper><PrivacyPolicy /></PageWrapper>}
      {currentPage === 'services' && <PageWrapper><OurServices /></PageWrapper>}
      {currentPage === 'blog-industry' && <PageWrapper><BlogIndustryTrends /></PageWrapper>}
      {currentPage === 'blog-faq' && <PageWrapper><BlogFAQ /></PageWrapper>}
      {currentPage === 'blog-success' && <PageWrapper><BlogSuccessStories /></PageWrapper>}
      {currentPage === 'blog-event' && <PageWrapper><BlogEventPlanning /></PageWrapper>}
      {currentPage === 'about' && <PageWrapper><AboutUs /></PageWrapper>}
      {currentPage === 'why-us' && <PageWrapper><WhyChooseUs /></PageWrapper>}
      {currentPage === 'faqs' && <PageWrapper><FAQsPage /></PageWrapper>}
      {currentPage === 'contact' && <PageWrapper><ContactUs /></PageWrapper>}
      {currentPage === 'portfolio' && <PageWrapper><Portfolio /></PageWrapper>}
      {currentPage === 'blog-listing' && <PageWrapper><BlogListingPage section={pageParams || undefined} /></PageWrapper>}
      {currentPage === 'blog-detail' && <PageWrapper><BlogDetailPage blogId={pageParams || undefined} /></PageWrapper>}
      {currentPage === 'custom-page' && <PageWrapper><CustomPage pageId={pageParams || undefined} /></PageWrapper>}
    </>
  );
};

const App: React.FC = () => {
  return (
    <RouterProvider>
      <AppContainer />
    </RouterProvider>
  );
};

export default App;
