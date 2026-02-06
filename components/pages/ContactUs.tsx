import React, { useState } from 'react';
import emailjs from '@emailjs/browser';
import { useRouter } from '../Router';

// Initialize EmailJS
emailjs.init('Aco8Fura5q-jpJj8q');

const ContactUs: React.FC = () => {
  const { navigateTo } = useRouter();
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    eventType: '',
    eventDate: '',
    budget: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Validate only essential required fields
    if (!formData.name.trim()) {
      setError('Please enter your name');
      setLoading(false);
      return;
    }

    if (!formData.email.trim()) {
      setError('Please enter your email address');
      setLoading(false);
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError('Please enter a valid email address');
      setLoading(false);
      return;
    }

    if (!formData.phone.trim()) {
      setError('Please enter your phone number');
      setLoading(false);
      return;
    }

    if (!formData.message.trim()) {
      setError('Please enter a message');
      setLoading(false);
      return;
    }

    try {
      console.log('[v0] Sending contact form with data:', formData);
      
      const emailData = {
        to_email: 'elitefacesbooking@gmail.com',
        from_name: formData.name.trim(),
        from_email: formData.email.trim(),
        phone: formData.phone.trim(),
        company: formData.company.trim() || 'Not specified',
        event_type: formData.eventType || 'Not specified',
        event_date: formData.eventDate || 'Not specified',
        budget: formData.budget || 'Not specified',
        message: formData.message.trim()
      };

      console.log('[v0] Email payload:', emailData);
      
      const response = await emailjs.send(
        'service_em3wlf9',
        'template_5rpfhd7',
        emailData
      );

      console.log('[v0] Email sent successfully:', response);
      setSubmitted(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        eventType: '',
        eventDate: '',
        budget: '',
        message: ''
      });

      setTimeout(() => {
        setSubmitted(false);
      }, 5000);
    } catch (err: any) {
      console.error('[v0] Error sending email:', err);
      const errorMessage = err?.text || err?.message || 'Failed to send message. Please try again.';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

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
          <h1 className="text-5xl md:text-6xl font-bold mb-6 gold-gradient">Get in Touch</h1>
          <p className="text-xl text-slate-400">
            Let's discuss your event requirements and find the perfect celebrity match for your brand.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Information */}
          <div className="space-y-6">
            {/* Email */}
            <div className="glass border border-white/10 rounded-2xl p-8">
              <div className="text-4xl mb-4">📧</div>
              <h3 className="text-xl font-bold mb-2 text-white">Email</h3>
              <a href="mailto:elitefacesbooking@gmail.com" className="text-yellow-500 hover:text-yellow-400 break-all">
                elitefacesbooking@gmail.com
              </a>
            </div>

            {/* Phone */}
            <div className="glass border border-white/10 rounded-2xl p-8">
              <div className="text-4xl mb-4">📱</div>
              <h3 className="text-xl font-bold mb-2 text-white">Phone</h3>
              <div className="space-y-2">
                <a href="tel:+919990996091" className="text-yellow-500 hover:text-yellow-400 block">
                  +91 9990996091
                </a>
                <a href="tel:+917678683436" className="text-yellow-500 hover:text-yellow-400 block">
                  +91 7678683436
                </a>
              </div>
            </div>

            {/* WhatsApp */}
            <div className="glass border border-white/10 rounded-2xl p-8">
              <div className="text-4xl mb-4">💬</div>
              <h3 className="text-xl font-bold mb-2 text-white">WhatsApp</h3>
              <p className="text-slate-400 mb-4">Quick responses via WhatsApp</p>
              <div className="space-y-2">
                <a 
                  href="https://wa.me/919990996091" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-gold text-slate-950 px-4 py-2 rounded-lg font-bold text-sm w-full text-center block"
                >
                  Chat on WhatsApp
                </a>
              </div>
            </div>

            {/* Hours */}
            <div className="glass border border-white/10 rounded-2xl p-8">
              <div className="text-4xl mb-4">⏰</div>
              <h3 className="text-xl font-bold mb-2 text-white">Business Hours</h3>
              <div className="space-y-1 text-slate-400">
                <p>Monday - Friday: 9 AM - 6 PM</p>
                <p>Saturday: 10 AM - 4 PM</p>
                <p>Sunday: Closed</p>
                <p className="pt-2 text-yellow-500">24/7 Emergency Support Available</p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="glass border border-white/10 rounded-3xl p-8 lg:p-12 bg-gradient-to-br from-slate-900/50 to-slate-800/50 hover:border-yellow-500/30 transition-all duration-300">
              {!submitted ? (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="mb-8">
                    <h2 className="text-3xl lg:text-4xl font-bold text-white mb-2">Send us a Message</h2>
                    <p className="text-slate-400">Fill out the form below and we'll get back to you within 24 hours</p>
                  </div>

                  {error && (
                    <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-4 flex items-center gap-3">
                      <svg className="w-5 h-5 text-red-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                      </svg>
                      <span className="text-red-400">{error}</span>
                    </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-slate-300 mb-2">Your Name <span className="text-red-400">*</span></label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="John Doe"
                        className="w-full bg-slate-800/50 border border-white/10 rounded-lg p-3 text-white placeholder-slate-500 focus:outline-none focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/20 transition-all duration-200"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-slate-300 mb-2">Email <span className="text-red-400">*</span></label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="john@company.com"
                        className="w-full bg-slate-800/50 border border-white/10 rounded-lg p-3 text-white placeholder-slate-500 focus:outline-none focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/20 transition-all duration-200"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-slate-300 mb-2">Phone <span className="text-red-400">*</span></label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+91 9999999999"
                        className="w-full bg-slate-800/50 border border-white/10 rounded-lg p-3 text-white placeholder-slate-500 focus:outline-none focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/20 transition-all duration-200"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-slate-300 mb-2">Company</label>
                      <input
                        type="text"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        placeholder="Your Company Name"
                        className="w-full bg-slate-800/50 border border-white/10 rounded-lg p-3 text-white placeholder-slate-500 focus:outline-none focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/20 transition-all duration-200"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-slate-300 mb-2">Event Type</label>
                      <select
                        name="eventType"
                        value={formData.eventType}
                        onChange={handleChange}
                        className="w-full bg-slate-800/50 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/20 transition-all duration-200"
                      >
                        <option value="">Select Event Type</option>
                        <option>Brand Endorsement</option>
                        <option>Corporate Event</option>
                        <option>Product Launch</option>
                        <option>Social Media Campaign</option>
                        <option>Live Performance</option>
                        <option>Meet & Greet</option>
                        <option>Other</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-slate-300 mb-2">Event Date</label>
                      <input
                        type="date"
                        name="eventDate"
                        value={formData.eventDate}
                        onChange={handleChange}
                        className="w-full bg-slate-800/50 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/20 transition-all duration-200"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-300 mb-2">Budget Range</label>
                    <select
                      name="budget"
                      value={formData.budget}
                      onChange={handleChange}
                      className="w-full bg-slate-800/50 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/20 transition-all duration-200"
                    >
                      <option value="">Select Budget Range</option>
                      <option>₹5 Lakhs - ₹15 Lakhs</option>
                      <option>₹15 Lakhs - ₹30 Lakhs</option>
                      <option>₹30 Lakhs - ₹50 Lakhs</option>
                      <option>₹50 Lakhs - ₹1 Crore</option>
                      <option>₹1 Crore+</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-300 mb-2">Message <span className="text-red-400">*</span></label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell us about your event requirements..."
                      rows={5}
                      className="w-full bg-slate-800/50 border border-white/10 rounded-lg p-3 text-white placeholder-slate-500 focus:outline-none focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/20 transition-all duration-200 resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full btn-gold text-slate-950 px-6 py-4 rounded-lg font-bold text-lg disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg hover:shadow-yellow-500/30 transition-all duration-200 flex items-center justify-center gap-2"
                  >
                    {loading ? (
                      <>
                        <svg className="w-5 h-5 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        SENDING...
                      </>
                    ) : (
                      <>
                        <span>SEND MESSAGE</span>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      </>
                    )}
                  </button>
                </form>
              ) : (
                <div className="py-16 text-center">
                  <div className="w-20 h-20 bg-green-500/20 border-2 border-green-500 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce">
                    <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <h3 className="text-4xl font-bold mb-3 text-white">Thank You!</h3>
                  <p className="text-slate-400 mb-2">Your message has been sent successfully.</p>
                  <p className="text-slate-500 mb-8">We'll contact you within 24 hours to discuss your event requirements.</p>
                  <button
                    onClick={() => navigateTo('home')}
                    className="btn-gold text-slate-950 px-8 py-3 rounded-lg font-bold hover:shadow-lg hover:shadow-yellow-500/30 transition-all duration-200 inline-flex items-center gap-2"
                  >
                    <span>Back to Home</span>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-3m0 0l7-4 7 4M5 9v10a1 1 0 001 1h12a1 1 0 001-1V9m-9 16l4-4m0 0l4 4m-4-4V5" />
                    </svg>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
