import React, { useState, useEffect } from 'react';
import { useRouter } from '../Router';
import PageEditor from '../PageEditor';

interface FAQ {
  id: string;
  question: string;
  answer: string;
}

const BlogFAQ: React.FC = () => {
  const { navigateTo } = useRouter();
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [faqs, setFaqs] = useState<FAQ[]>([]);

  useEffect(() => {
    // Load FAQs from localStorage
    const storedBlogs = localStorage.getItem('blog_posts');
    if (storedBlogs) {
      const allBlogs = JSON.parse(storedBlogs);
      const faqBlogs = allBlogs.filter((b: any) => b.category === 'FAQ');
      if (faqBlogs.length > 0) {
        setFaqs(faqBlogs.map((b: any) => ({
          id: b.id,
          question: b.title,
          answer: b.content
        })));
      }
    }

    // Default FAQs if none exist
    if (faqs.length === 0) {
      setFaqs([
        {
          id: '1',
          question: 'How do I book a celebrity through EliteFacesBooking?',
          answer: 'Simply browse our talent roster, click on your preferred celebrity, and fill out the booking form with event details. Our team will review your request and contact you within 24 hours with pricing and availability.'
        },
        {
          id: '2',
          question: 'What is the typical turnaround time for booking confirmation?',
          answer: 'We typically provide confirmation within 24-48 hours. For urgent requests, contact us via WhatsApp at +91 9990996091 or +91 7678683436 for priority handling.'
        },
        {
          id: '3',
          question: 'Do you offer package deals for multiple celebrities?',
          answer: 'Yes! We offer customized packages for corporate events, product launches, and multi-day campaigns. Contact our team to discuss your specific requirements and budget.'
        }
      ]);
    }
  }, []);

  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="container mx-auto px-6 max-w-4xl">
        <div className="mb-12">
          <button 
            onClick={() => navigateTo('home')}
            className="text-yellow-500 hover:text-yellow-400 mb-6 flex items-center space-x-2"
          >
            <span>←</span> <span>Back</span>
          </button>
          <h1 className="text-5xl font-bold mb-4 gold-gradient">FAQ & Help Center</h1>
          <p className="text-slate-400 text-lg">Find answers to common questions about our booking process and services.</p>
        </div>

        <div className="space-y-4">
          {faqs.map(faq => (
            <div 
              key={faq.id} 
              className="glass border border-white/10 rounded-xl overflow-hidden hover:border-yellow-500/30 transition-all"
            >
              <button
                onClick={() => setExpandedId(expandedId === faq.id ? null : faq.id)}
                className="w-full px-8 py-5 flex items-center justify-between hover:bg-white/5 transition-colors text-left"
              >
                <h3 className="font-semibold text-lg text-white pr-4">{faq.question}</h3>
                <span className={`text-yellow-500 text-2xl flex-shrink-0 transition-transform ${expandedId === faq.id ? 'rotate-45' : ''}`}>
                  +
                </span>
              </button>
              
              {expandedId === faq.id && (
                <div className="px-8 py-6 bg-white/5 border-t border-white/10 text-slate-300 leading-relaxed">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Contact CTA */}
        <div className="mt-16 glass border border-yellow-500/20 rounded-2xl p-10 text-center bg-gradient-to-r from-yellow-500/10 via-transparent to-transparent">
          <h3 className="text-2xl font-bold mb-4">Didn't find your answer?</h3>
          <p className="text-slate-400 mb-6">Our expert team is ready to help with any specific questions about your booking.</p>
          <button 
            onClick={() => navigateTo('contact')}
            className="btn-gold text-slate-950 px-8 py-3 rounded-lg font-bold inline-block"
          >
            Contact Our Team
          </button>
        </div>
      </div>
    </div>
  );
};

export default BlogFAQ;
