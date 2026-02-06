import React, { useState } from 'react';
import { useRouter } from '../Router';

interface PortfolioItem {
  id: string;
  title: string;
  celebrity: string;
  category: string;
  year: string;
  image: string;
  description: string;
  result: string;
}

const Portfolio: React.FC = () => {
  const { navigateTo } = useRouter();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const portfolioItems: PortfolioItem[] = [
    {
      id: '1',
      title: 'Luxury Brand Launch Campaign',
      celebrity: 'A-List Bollywood Star',
      category: 'Brand Endorsement',
      year: '2023',
      image: '👔',
      description: 'Comprehensive campaign for premium lifestyle brand featuring celebrity endorsement across multiple platforms.',
      result: '250% increase in sales, 5M+ social impressions'
    },
    {
      id: '2',
      title: 'Tech Summit & Keynote',
      celebrity: 'Business Entrepreneur',
      category: 'Corporate Event',
      year: '2023',
      image: '🚀',
      description: 'International tech conference with celebrity keynote speaker and panel discussions.',
      result: '2000+ attendees, ₹50Cr+ sponsorships'
    },
    {
      id: '3',
      title: 'Beauty Product Campaign',
      celebrity: 'Beauty Influencer',
      category: 'Social Media',
      year: '2023',
      image: '💄',
      description: 'Viral social media campaign with authentic influencer storytelling and user-generated content.',
      result: '150M organic reach, 2M+ engagement'
    },
    {
      id: '4',
      title: 'Annual Music Festival',
      celebrity: 'Multiple Music Stars',
      category: 'Event',
      year: '2023',
      image: '🎵',
      description: 'Large-scale music festival featuring lineup of celebrity performers.',
      result: '50K+ attendees, ₹25Cr revenue'
    },
    {
      id: '5',
      title: 'Sports Sponsorship Campaign',
      celebrity: 'Cricket Legend',
      category: 'Sports',
      year: '2022',
      image: '⚡',
      description: 'Multi-year sports marketing initiative with celebrity athlete partnership.',
      result: '300% ROI, 2M+ social following growth'
    },
    {
      id: '6',
      title: 'Movie Promotional Tour',
      celebrity: 'Lead Bollywood Actor',
      category: 'Entertainment',
      year: '2022',
      image: '🎬',
      description: 'Nationwide movie promotion tour with actor appearances across major cities.',
      result: '₹200Cr+ opening weekend collection'
    },
    {
      id: '7',
      title: 'E-commerce Brand Campaign',
      celebrity: 'Digital Creator',
      category: 'Brand Endorsement',
      year: '2022',
      image: '🛍️',
      description: 'Integrated campaign with digital content creator for online retail brand.',
      result: '180% sales lift, 500K+ new customers'
    },
    {
      id: '8',
      title: 'Corporate Gala Event',
      celebrity: 'International Sports Icon',
      category: 'Corporate Event',
      year: '2022',
      image: '🎭',
      description: 'High-profile corporate gala with celebrity guest and performance.',
      result: '1000+ executives, 9/10 satisfaction'
    }
  ];

  const categories = ['All', ...new Set(portfolioItems.map(item => item.category))];
  const filteredItems = selectedCategory === 'All' ? portfolioItems : portfolioItems.filter(item => item.category === selectedCategory);

  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="mb-12 max-w-4xl">
          <button 
            onClick={() => navigateTo('home')}
            className="text-yellow-500 hover:text-yellow-400 mb-6 flex items-center space-x-2"
          >
            <span>←</span> <span>Back</span>
          </button>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 gold-gradient">Our Portfolio</h1>
          <p className="text-xl text-slate-400">
            Showcasing our most successful celebrity partnerships, events, and brand campaigns across diverse industries.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-3 mb-12">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                selectedCategory === cat
                  ? 'bg-yellow-500 text-slate-950'
                  : 'glass border border-white/10 text-slate-300 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Portfolio Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {filteredItems.map(item => (
            <div 
              key={item.id} 
              className="glass border border-white/10 rounded-2xl overflow-hidden hover:border-yellow-500/30 transition-all group"
            >
              {/* Image Section */}
              <div className="bg-gradient-to-br from-yellow-500/20 to-slate-900 h-48 flex items-center justify-center overflow-hidden relative group-hover:from-yellow-500/30 transition-all">
                <div className="text-8xl">{item.image}</div>
              </div>

              {/* Content */}
              <div className="p-8">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <span className="inline-block px-3 py-1 bg-yellow-500/20 text-yellow-500 text-xs font-semibold rounded-full mb-3">
                      {item.category}
                    </span>
                    <h3 className="text-2xl font-bold text-white group-hover:text-yellow-500 transition-colors">
                      {item.title}
                    </h3>
                  </div>
                  <span className="text-sm text-slate-400">{item.year}</span>
                </div>

                <p className="text-slate-400 mb-4">
                  <span className="font-semibold text-slate-300">Celebrity:</span> {item.celebrity}
                </p>

                <p className="text-slate-300 mb-6 leading-relaxed">{item.description}</p>

                <div className="pt-6 border-t border-white/10">
                  <h4 className="text-sm font-semibold text-yellow-500 mb-2 uppercase tracking-widest">Key Results</h4>
                  <p className="text-white font-semibold">{item.result}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <section className="glass border border-yellow-500/20 rounded-3xl p-12 bg-gradient-to-r from-yellow-500/10 via-transparent to-transparent mb-16">
          <h2 className="text-3xl font-bold mb-12 text-center">Our Track Record</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { number: '500+', label: 'Celebrities Managed' },
              { number: '1000+', label: 'Successful Events' },
              { number: '₹1000 Cr+', label: 'Client Revenue Generated' },
              { number: '95%+', label: 'Client Satisfaction' }
            ].map((stat, idx) => (
              <div key={idx} className="text-center">
                <div className="text-4xl font-bold text-yellow-500 mb-2">{stat.number}</div>
                <p className="text-slate-400">{stat.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Testimonial */}
        <div className="max-w-3xl mx-auto">
          <div className="glass border border-white/10 rounded-2xl p-10 text-center">
            <div className="flex justify-center space-x-1 mb-6">
              {[...Array(5)].map((_, i) => (
                <span key={i} className="text-2xl text-yellow-500">★</span>
              ))}
            </div>
            <p className="text-xl text-slate-300 leading-relaxed mb-6">
              "EliteFacesBooking's expertise and professionalism transformed our brand. The celebrity partnership they arranged exceeded all expectations and delivered remarkable results. Highly recommended for any brand serious about elevating their presence."
            </p>
            <p className="text-white font-bold">CEO, Multi-Crore Brand</p>
            <p className="text-slate-400">Fortune 500 Company</p>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <h3 className="text-3xl font-bold mb-4">Ready to Create Your Success Story?</h3>
          <p className="text-slate-400 mb-8 max-w-2xl mx-auto">
            Let's discuss how EliteFacesBooking can help achieve your brand objectives with the right celebrity partnership.
          </p>
          <button 
            onClick={() => navigateTo('contact')}
            className="btn-gold text-slate-950 px-10 py-4 rounded-xl font-bold text-lg inline-block hover:shadow-lg transition-all"
          >
            Get Started Today
          </button>
        </div>
      </div>
    </div>
  );
};

export default Portfolio;
