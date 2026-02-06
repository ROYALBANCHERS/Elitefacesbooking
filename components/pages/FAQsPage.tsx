import React, { useState } from 'react';
import { useRouter } from '../Router';

interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
}

const FAQsPage: React.FC = () => {
  const { navigateTo } = useRouter();
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const faqs: FAQ[] = [
    {
      id: '1',
      category: 'Booking',
      question: 'How do I request a celebrity booking?',
      answer: 'Visit our website, browse the talent roster, select your preferred celebrity, and fill out the booking form with event details. Our team will review and contact you within 24 hours with pricing and availability.'
    },
    {
      id: '2',
      category: 'Booking',
      question: 'What is the minimum booking period?',
      answer: 'We recommend booking 2-3 months in advance for A-list celebrities. However, we handle last-minute requests based on availability. Rush bookings may incur additional fees of 15-25%.'
    },
    {
      id: '3',
      category: 'Pricing',
      question: 'How is celebrity pricing determined?',
      answer: 'Pricing depends on celebrity tier, event type, duration, location, and demand. A-list celebrities range from ₹50 lakhs to ₹5 crores. We offer custom quotes based on your specific requirements.'
    },
    {
      id: '4',
      category: 'Pricing',
      question: 'Do you offer discounts for multiple celebrities?',
      answer: 'Yes! We provide package discounts for multi-celebrity bookings, long-term ambassadorships, and repeat clients. Contact our team to discuss bulk pricing options.'
    },
    {
      id: '5',
      category: 'Payment',
      question: 'What are your payment terms?',
      answer: 'We require 50% advance payment to confirm the booking and the remaining 50% due 7 days before the event. We accept bank transfers, digital wallets, and corporate checks.'
    },
    {
      id: '6',
      category: 'Payment',
      question: 'Do you offer payment plans?',
      answer: 'For bookings exceeding ₹25 lakhs, we can arrange flexible payment plans. Contact our finance team to discuss options that work for your cash flow.'
    },
    {
      id: '7',
      category: 'Cancellation',
      question: 'What is your cancellation policy?',
      answer: 'Cancellations 90+ days before event incur no fee. 30-90 days: 25% charge. Within 30 days: 50% charge. Within 7 days: 100% charge. Postponements are subject to celebrity availability.'
    },
    {
      id: '8',
      category: 'Cancellation',
      question: 'What if the celebrity cannot attend due to emergency?',
      answer: 'We provide a replacement celebrity of equal or higher caliber at no additional cost. If no suitable replacement is available, full refund is provided.'
    },
    {
      id: '9',
      category: 'Event Details',
      question: 'What is included in the celebrity appearance?',
      answer: 'Standard package includes the celebrity\'s time for the agreed duration at the specified location. Travel, accommodation, meals, styling, and additional performances can be arranged for extra fees.'
    },
    {
      id: '10',
      category: 'Event Details',
      question: 'Can celebrities participate in virtual events?',
      answer: 'Yes! Virtual appearances are available for webinars, online launches, and streaming events. Virtual appearances typically cost 40-50% of in-person rates.'
    },
    {
      id: '11',
      category: 'Event Details',
      question: 'How much time should I allot for the celebrity appearance?',
      answer: 'Typically 30-60 minutes for standard appearances, 2-3 hours for events with performances. We can customize duration based on your event requirements.'
    },
    {
      id: '12',
      category: 'Services',
      question: 'Do you provide makeup and styling services?',
      answer: 'These are not included in standard bookings but can be arranged through our partner professionals. We handle all coordination at transparent rates.'
    },
    {
      id: '13',
      category: 'Services',
      question: 'Can you help with event management and coordination?',
      answer: 'Yes! Our team provides comprehensive event management including venue selection, logistics, guest management, and technical coordination. This is often included for larger celebrity bookings.'
    },
    {
      id: '14',
      category: 'Services',
      question: 'Do you handle media and PR coordination?',
      answer: 'Absolutely. We manage media invitations, press releases, social media promotion, and ensure maximum coverage of your event. This helps maximize ROI on your investment.'
    },
    {
      id: '15',
      category: 'Contracts',
      question: 'Is a formal contract required?',
      answer: 'Yes, all bookings require a signed contract outlining terms, conditions, fees, cancellation policy, and performance details. This protects both parties and ensures clarity.'
    },
    {
      id: '16',
      category: 'Contracts',
      question: 'Can we negotiate contract terms?',
      answer: 'Standard terms are fixed, but we\'re flexible on performance details, exclusivity clauses, and usage rights. Our legal team can discuss customizations for large bookings.'
    },
    {
      id: '17',
      category: 'Support',
      question: 'What support is provided on event day?',
      answer: 'Our team provides on-ground support including celebrity arrival coordination, technical troubleshooting, schedule management, and real-time problem resolution.'
    },
    {
      id: '18',
      category: 'Support',
      question: 'Who do I contact if there\'s an issue during the event?',
      answer: 'Your dedicated account manager is available 24/7 via phone/WhatsApp. We have emergency protocols to resolve issues immediately.'
    }
  ];

  const categories = ['All', ...new Set(faqs.map(faq => faq.category))];
  const filteredFAQs = selectedCategory === 'All' ? faqs : faqs.filter(faq => faq.category === selectedCategory);

  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="container mx-auto px-6 max-w-4xl">
        {/* Header */}
        <div className="mb-12">
          <button 
            onClick={() => navigateTo('home')}
            className="text-yellow-500 hover:text-yellow-400 mb-6 flex items-center space-x-2"
          >
            <span>←</span> <span>Back</span>
          </button>
          <h1 className="text-5xl font-bold mb-4 gold-gradient">Frequently Asked Questions</h1>
          <p className="text-slate-400 text-lg">Everything you need to know about booking celebrities through EliteFacesBooking.</p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-3 mb-8">
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

        {/* FAQs List */}
        <div className="space-y-3">
          {filteredFAQs.map(faq => (
            <div 
              key={faq.id} 
              className="glass border border-white/10 rounded-xl overflow-hidden hover:border-yellow-500/30 transition-all"
            >
              <button
                onClick={() => setExpandedId(expandedId === faq.id ? null : faq.id)}
                className="w-full px-6 py-4 flex items-center justify-between hover:bg-white/5 transition-colors text-left"
              >
                <h3 className="font-semibold text-base text-white pr-4">{faq.question}</h3>
                <span className={`text-yellow-500 text-2xl flex-shrink-0 transition-transform ${expandedId === faq.id ? 'rotate-45' : ''}`}>
                  +
                </span>
              </button>
              
              {expandedId === faq.id && (
                <div className="px-6 py-4 bg-white/5 border-t border-white/10 text-slate-300 leading-relaxed">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredFAQs.length === 0 && (
          <div className="text-center py-12">
            <p className="text-slate-400">No FAQs found for this category.</p>
          </div>
        )}

        {/* Contact Section */}
        <div className="mt-16 glass border border-yellow-500/20 rounded-2xl p-10 text-center bg-gradient-to-r from-yellow-500/10 via-transparent to-transparent">
          <h3 className="text-2xl font-bold mb-4">Still have questions?</h3>
          <p className="text-slate-400 mb-6">Our expert team is happy to answer any specific questions about your booking requirements.</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button 
              onClick={() => navigateTo('contact')}
              className="btn-gold text-slate-950 px-6 py-3 rounded-lg font-bold"
            >
              Contact Us
            </button>
            <a 
              href="https://wa.me/919990996091"
              target="_blank"
              rel="noopener noreferrer"
              className="glass border border-white/20 text-white px-6 py-3 rounded-lg font-bold hover:border-yellow-500 transition-all"
            >
              WhatsApp Support
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQsPage;
