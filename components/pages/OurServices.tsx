import React from 'react';
import { useRouter } from '../Router';

interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  features: string[];
}

const OurServices: React.FC = () => {
  const { navigateTo } = useRouter();

  const services: Service[] = [
    {
      id: '1',
      title: 'Celebrity Endorsements',
      description: 'Connect with top celebrities for brand endorsements and product campaigns that drive engagement and sales.',
      icon: '⭐',
      features: ['Social Media Campaigns', 'TV Commercials', 'Print Ads', 'Brand Ambassador Programs']
    },
    {
      id: '2',
      title: 'Event Management',
      description: 'Professional celebrity appearances for corporate events, product launches, and exclusive gatherings.',
      icon: '🎤',
      features: ['Live Performances', 'Guest Appearances', 'MC Services', 'Meet & Greet Events']
    },
    {
      id: '3',
      title: 'Influencer Collaborations',
      description: 'Partner with trending digital influencers and content creators for authentic brand storytelling.',
      icon: '📱',
      features: ['Instagram Partnerships', 'YouTube Collaborations', 'TikTok Campaigns', 'Content Creation']
    },
    {
      id: '4',
      title: 'Corporate Events',
      description: 'Elevate your corporate gatherings with celebrity speakers and performers that create memorable experiences.',
      icon: '🎯',
      features: ['Keynote Speakers', 'Awards Ceremonies', 'Gala Events', 'Conference Appearances']
    },
    {
      id: '5',
      title: 'Sports Management',
      description: 'Access to renowned cricketers and sports personalities for sponsorships and promotional activities.',
      icon: '⚡',
      features: ['Athlete Endorsements', 'Sports Events', 'Brand Partnerships', 'Sports Marketing']
    },
    {
      id: '6',
      title: 'Music & Entertainment',
      description: 'Book top musicians and entertainers for concerts, festivals, and entertainment events.',
      icon: '🎵',
      features: ['Live Concerts', 'Music Videos', 'Album Promotions', 'Festival Performances']
    }
  ];

  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="container mx-auto px-6">
        {/* Back Button */}
        <button
          onClick={() => navigateTo('home')}
          className="text-yellow-500 hover:text-yellow-400 mb-6 flex items-center space-x-2"
        >
          <span>←</span> <span>Back to Home</span>
        </button>

        {/* Header */}
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 gold-gradient">Our Services</h1>
          <p className="text-xl text-slate-400">
            Comprehensive talent management and celebrity booking services tailored to your brand's unique needs
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {services.map(service => (
            <div key={service.id} className="glass border border-white/10 rounded-2xl p-8 hover:border-yellow-500/50 transition-all hover:bg-white/5">
              <div className="text-5xl mb-4">{service.icon}</div>
              <h3 className="text-2xl font-bold mb-3 text-white">{service.title}</h3>
              <p className="text-slate-400 mb-6">{service.description}</p>
              
              <div className="space-y-2 mb-6">
                {service.features.map((feature, idx) => (
                  <div key={idx} className="flex items-center space-x-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-yellow-500"></div>
                    <span className="text-sm text-slate-300">{feature}</span>
                  </div>
                ))}
              </div>

              <button 
                onClick={() => navigateTo('contact')}
                className="text-yellow-500 font-semibold hover:text-yellow-400 transition-colors text-sm uppercase tracking-widest"
              >
                Learn More →
              </button>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="glass border border-yellow-500/20 rounded-3xl p-12 text-center bg-gradient-to-r from-yellow-500/10 via-transparent to-transparent">
          <h2 className="text-3xl font-bold mb-4">Ready to Elevate Your Brand?</h2>
          <p className="text-slate-400 mb-8 max-w-2xl mx-auto">
            Our expert team is ready to help you find the perfect talent match for your campaign or event.
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

export default OurServices;
