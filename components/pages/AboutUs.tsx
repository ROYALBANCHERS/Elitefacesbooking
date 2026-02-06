import React from 'react';
import { useRouter } from '../Router';

const AboutUs: React.FC = () => {
  const { navigateTo } = useRouter();

  const values = [
    { icon: '🎯', title: 'Authenticity', description: 'We connect authentic talent with genuine brand values for lasting relationships.' },
    { icon: '⭐', title: 'Excellence', description: 'Every event, campaign, and interaction is executed with meticulous attention to detail.' },
    { icon: '🤝', title: 'Collaboration', description: 'Success comes from working closely with our clients and celebrity partners.' },
    { icon: '🚀', title: 'Innovation', description: 'We constantly adapt to trends and emerging opportunities in the entertainment industry.' }
  ];

  const stats = [
    { number: '500+', label: 'Celebrities Managed' },
    { number: '1000+', label: 'Successful Events' },
    { number: '₹1000 Cr+', label: 'Total Client Revenue Generated' },
    { number: '50+', label: 'Brand Partnerships' }
  ];

  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="container mx-auto px-6">
        {/* Hero Section */}
        <div className="mb-16 max-w-4xl">
          <button 
            onClick={() => navigateTo('home')}
            className="text-yellow-500 hover:text-yellow-400 mb-6 flex items-center space-x-2"
          >
            <span>←</span> <span>Back</span>
          </button>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 gold-gradient">About EliteFacesBooking</h1>
          <p className="text-xl text-slate-400">
            India's premier talent management and celebrity booking agency, connecting world-class celebrities with ambitious brands since 2010.
          </p>
        </div>

        {/* Our Story */}
        <section className="glass border border-white/10 rounded-3xl p-12 mb-16">
          <h2 className="text-3xl font-bold mb-6 text-white">Our Story</h2>
          <div className="space-y-6 text-slate-300 leading-relaxed text-lg">
            <p>
              EliteFacesBooking was founded with a simple vision: to revolutionize the way brands connect with celebrity talent. What started as a boutique agency in Delhi has grown into India's most trusted talent management platform.
            </p>
            <p>
              Over the past decade, we've managed bookings for India's biggest celebrities, from Bollywood icons to cricketers, from digital influencers to business magnates. Our success is built on deep relationships, market expertise, and unwavering commitment to client satisfaction.
            </p>
            <p>
              Today, we pride ourselves on being more than just a booking agency – we're strategic partners who understand that the right celebrity can transform a brand's trajectory. Every partnership is carefully curated to ensure authentic alignment and maximum impact.
            </p>
          </div>
        </section>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, idx) => (
            <div key={idx} className="glass border border-white/10 rounded-2xl p-8 text-center hover:border-yellow-500/30 transition-all">
              <div className="text-4xl font-bold text-yellow-500 mb-3">{stat.number}</div>
              <div className="text-slate-400">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Our Values */}
        <section className="mb-16">
          <h2 className="text-4xl font-bold mb-12 text-center gold-gradient">Our Core Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, idx) => (
              <div key={idx} className="glass border border-white/10 rounded-2xl p-8 text-center hover:border-yellow-500/30 transition-all">
                <div className="text-5xl mb-4">{value.icon}</div>
                <h3 className="text-xl font-bold mb-3 text-white">{value.title}</h3>
                <p className="text-slate-400">{value.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Our Team */}
        <section className="glass border border-white/10 rounded-3xl p-12 mb-16">
          <h2 className="text-3xl font-bold mb-8 text-white">Our Expert Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="border-b md:border-b-0 md:border-r border-white/10 pb-8 md:pb-0 md:pr-8">
              <h3 className="text-xl font-bold mb-3 text-yellow-500">Celebrity Management</h3>
              <p className="text-slate-400 leading-relaxed">
                Our celebrity team has decades of combined experience managing top talent. We understand the entertainment industry intimately and maintain strong relationships with leading celebrities across all genres.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-3 text-yellow-500">Brand Consulting</h3>
              <p className="text-slate-400 leading-relaxed">
                We provide strategic guidance on celebrity selection, campaign structuring, and ROI optimization. Our consultants have worked with Fortune 500 brands to create impactful celebrity partnerships.
              </p>
            </div>
            <div className="border-b border-white/10 pb-8 md:pb-0 md:border-b-0">
              <h3 className="text-xl font-bold mb-3 text-yellow-500">Event Management</h3>
              <p className="text-slate-400 leading-relaxed">
                From intimate meet-and-greets to large-scale festivals, our event team executes flawlessly. We handle all logistics, coordination, and contingency planning.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-3 text-yellow-500">PR & Marketing</h3>
              <p className="text-slate-400 leading-relaxed">
                Our PR professionals ensure maximum media coverage and positive brand representation. We create compelling narratives around celebrity partnerships for optimal reach.
              </p>
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="glass border border-yellow-500/20 rounded-3xl p-12 bg-gradient-to-r from-yellow-500/10 via-transparent to-transparent">
          <h2 className="text-3xl font-bold mb-8 text-white">Why Brands Choose Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              'Direct access to India\'s top celebrity talent',
              'Transparent pricing with no hidden charges',
              'Dedicated account managers for each client',
              'Comprehensive event management support',
              'Proven track record with 1000+ successful events',
              'Strategic consulting for maximum ROI'
            ].map((reason, idx) => (
              <div key={idx} className="flex space-x-4">
                <span className="text-2xl">✓</span>
                <p className="text-slate-300">{reason}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <div className="mt-16 text-center">
          <h3 className="text-3xl font-bold mb-4">Ready to Work with EliteFacesBooking?</h3>
          <p className="text-slate-400 mb-8 max-w-2xl mx-auto">
            Let's discuss your brand goals and find the perfect celebrity partnership to elevate your message.
          </p>
          <button 
            onClick={() => navigateTo('contact')}
            className="btn-gold text-slate-950 px-10 py-4 rounded-xl font-bold text-lg inline-block hover:shadow-lg transition-all"
          >
            Get in Touch
          </button>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
