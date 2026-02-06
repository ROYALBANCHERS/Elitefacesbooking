import React from 'react';
import { useRouter } from '../Router';

const WhyChooseUs: React.FC = () => {
  const { navigateTo } = useRouter();

  const advantages = [
    {
      title: 'Exclusive Talent Access',
      description: 'Direct relationships with 500+ celebrities across Bollywood, sports, and digital platforms. We have first access to top talent before public announcements.',
      icon: '⭐'
    },
    {
      title: 'Strategic Expertise',
      description: 'Our team includes entertainment strategists, PR professionals, and former celebrity managers who understand market dynamics and consumer behavior.',
      icon: '📊'
    },
    {
      title: 'Transparent Pricing',
      description: 'No hidden fees, no surprise charges. You know exactly what you\'re paying for and what ROI to expect. Flexible packages for every budget.',
      icon: '💰'
    },
    {
      title: 'End-to-End Solutions',
      description: 'From celebrity selection and contract negotiation to event execution and post-campaign analysis. We handle everything so you don\'t have to.',
      icon: '🎯'
    },
    {
      title: '24/7 Support',
      description: 'Dedicated account managers available round-the-clock. Quick response times and proactive problem-solving for peace of mind.',
      icon: '📱'
    },
    {
      title: 'Proven Track Record',
      description: '1000+ successful events, ₹1000 crore+ in generated client revenue, and 95%+ client satisfaction rate over 14 years.',
      icon: '✅'
    }
  ];

  const testimonials = [
    {
      company: 'Premium Tech Startup',
      testimonial: 'EliteFacesBooking connected us with the perfect celebrity for our product launch. The event exceeded all our expectations and generated tremendous buzz.',
      author: 'CEO, Tech Company'
    },
    {
      company: 'Fortune 500 FMCG Brand',
      testimonial: 'Their strategic insights on celebrity selection saved us from a potentially poor fit. The campaign delivered 3x our expected ROI.',
      author: 'CMO, FMCG Company'
    },
    {
      company: 'Entertainment Media Group',
      testimonial: 'Professional team, excellent coordination, and celebrities who showed up prepared. They made our festival unforgettable.',
      author: 'Event Director'
    }
  ];

  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="container mx-auto px-6">
        {/* Hero */}
        <div className="mb-16 max-w-4xl">
          <button 
            onClick={() => navigateTo('home')}
            className="text-yellow-500 hover:text-yellow-400 mb-6 flex items-center space-x-2"
          >
            <span>←</span> <span>Back</span>
          </button>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 gold-gradient">Why Choose EliteFacesBooking</h1>
          <p className="text-xl text-slate-400">
            The difference between a good campaign and a legendary one lies in the right celebrity partnership. Here's why leading brands trust us.
          </p>
        </div>

        {/* Advantages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {advantages.map((advantage, idx) => (
            <div key={idx} className="glass border border-white/10 rounded-2xl p-8 hover:border-yellow-500/30 transition-all hover:bg-white/5">
              <div className="text-5xl mb-4">{advantage.icon}</div>
              <h3 className="text-xl font-bold mb-3 text-white">{advantage.title}</h3>
              <p className="text-slate-400 leading-relaxed">{advantage.description}</p>
            </div>
          ))}
        </div>

        {/* Comparison Table */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center gold-gradient">How We Compare</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left p-4 text-white font-bold">Feature</th>
                  <th className="text-left p-4 text-white font-bold">EliteFacesBooking</th>
                  <th className="text-left p-4 text-white font-bold">Traditional Agencies</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['Talent Access', '500+ Direct Relationships', '100-200 Contacts'],
                  ['Response Time', 'Within 2 Hours', '24-48 Hours'],
                  ['Pricing Transparency', 'Complete Transparency', 'Hidden Fees Common'],
                  ['Contract Negotiation', 'Included', 'Additional Charge'],
                  ['Event Management', 'End-to-End', 'Limited Support'],
                  ['Post-Event Analysis', 'Comprehensive Reports', 'Basic Summary'],
                  ['Account Management', '24/7 Dedicated Manager', 'Shared Resources'],
                  ['Proven Success Rate', '95%+ Client Satisfaction', 'Variable']
                ].map((row, idx) => (
                  <tr key={idx} className="border-b border-white/5">
                    <td className="p-4 text-white font-semibold">{row[0]}</td>
                    <td className="p-4 text-yellow-500">✓ {row[1]}</td>
                    <td className="p-4 text-slate-400">{row[2]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Testimonials */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center gold-gradient">What Our Clients Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, idx) => (
              <div key={idx} className="glass border border-white/10 rounded-2xl p-8 hover:border-yellow-500/30 transition-all">
                <div className="flex space-x-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-yellow-500">★</span>
                  ))}
                </div>
                <p className="text-slate-300 mb-6 leading-relaxed italic">"{testimonial.testimonial}"</p>
                <div>
                  <p className="text-white font-semibold">{testimonial.author}</p>
                  <p className="text-slate-500 text-sm">{testimonial.company}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Process Section */}
        <section className="glass border border-white/10 rounded-3xl p-12 mb-16">
          <h2 className="text-3xl font-bold mb-8 text-white">Our Simple Process</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { step: '1', title: 'Consultation', desc: 'Share your event details and budget' },
              { step: '2', title: 'Suggestions', desc: 'Get curated celebrity options' },
              { step: '3', title: 'Negotiation', desc: 'Finalize terms and contract' },
              { step: '4', title: 'Execution', desc: 'Seamless event coordination' }
            ].map((item, idx) => (
              <div key={idx} className="text-center">
                <div className="w-12 h-12 bg-yellow-500 text-slate-950 font-bold rounded-full flex items-center justify-center mx-auto mb-4">
                  {item.step}
                </div>
                <h4 className="font-bold text-white mb-2">{item.title}</h4>
                <p className="text-slate-400 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Cost Benefit */}
        <section className="glass border border-yellow-500/20 rounded-3xl p-12 bg-gradient-to-r from-yellow-500/10 via-transparent to-transparent mb-16">
          <h2 className="text-3xl font-bold mb-8 text-white">The EliteFacesBooking Difference in Numbers</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { number: '14+', label: 'Years of Experience' },
              { number: '500+', label: 'Celebrities Managed' },
              { number: '1000+', label: 'Successful Events' },
              { number: '₹1000 Cr+', label: 'Client Revenue Generated' },
              { number: '50+', label: 'Brand Partnerships' },
              { number: '95%+', label: 'Client Satisfaction' }
            ].map((stat, idx) => (
              <div key={idx} className="text-center">
                <div className="text-4xl font-bold text-yellow-500 mb-2">{stat.number}</div>
                <p className="text-slate-400">{stat.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Final CTA */}
        <div className="text-center">
          <h3 className="text-3xl font-bold mb-4">Experience the EliteFacesBooking Difference</h3>
          <p className="text-slate-400 mb-8 max-w-2xl mx-auto text-lg">
            Let's create a memorable campaign that elevates your brand and creates lasting impact.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button 
              onClick={() => navigateTo('contact')}
              className="btn-gold text-slate-950 px-8 py-3 rounded-lg font-bold inline-block"
            >
              Schedule Consultation
            </button>
            <button 
              onClick={() => navigateTo('home')}
              className="glass text-white px-8 py-3 rounded-lg font-bold border border-white/20 hover:border-yellow-500 transition-all"
            >
              Browse Our Talent
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhyChooseUs;
