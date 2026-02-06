import React, { useState } from 'react';
import emailjs from '@emailjs/browser';
import { useRouter } from '../Router';

// Initialize EmailJS
emailjs.init('YOUR_EMAILJS_PUBLIC_KEY');

const ContactUs: React.FC = () => {
  const { navigateTo } = useRouter();
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
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
    setLoading(true);

    try {
      await emailjs.send(
        'YOUR_SERVICE_ID',
        'YOUR_CONTACT_TEMPLATE_ID',
        {
          to_email: 'elitefacesbooking@gmail.com',
          from_name: formData.name,
          from_email: formData.email,
          phone: formData.phone,
          company: formData.company,
          event_type: formData.eventType,
          event_date: formData.eventDate,
          budget: formData.budget,
          message: formData.message
        }
      );

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
    } catch (err) {
      console.error('Error:', err);
      alert('Failed to send message. Please try again.');
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
            <div className="glass border border-white/10 rounded-3xl p-8">
              {!submitted ? (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <h2 className="text-3xl font-bold text-white mb-6">Send us a Message</h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-slate-300 mb-2">Your Name</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="John Doe"
                        className="w-full bg-slate-800 border border-white/10 rounded-lg p-3 text-white placeholder-slate-500 focus:outline-none focus:border-yellow-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-slate-300 mb-2">Email</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="john@company.com"
                        className="w-full bg-slate-800 border border-white/10 rounded-lg p-3 text-white placeholder-slate-500 focus:outline-none focus:border-yellow-500"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-slate-300 mb-2">Phone</label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+91 9999999999"
                        className="w-full bg-slate-800 border border-white/10 rounded-lg p-3 text-white placeholder-slate-500 focus:outline-none focus:border-yellow-500"
                        required
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
                        className="w-full bg-slate-800 border border-white/10 rounded-lg p-3 text-white placeholder-slate-500 focus:outline-none focus:border-yellow-500"
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
                        className="w-full bg-slate-800 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-yellow-500"
                        required
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
                        className="w-full bg-slate-800 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-yellow-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-300 mb-2">Budget Range</label>
                    <select
                      name="budget"
                      value={formData.budget}
                      onChange={handleChange}
                      className="w-full bg-slate-800 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-yellow-500"
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
                    <label className="block text-sm font-semibold text-slate-300 mb-2">Message</label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell us about your event requirements..."
                      rows={5}
                      className="w-full bg-slate-800 border border-white/10 rounded-lg p-3 text-white placeholder-slate-500 focus:outline-none focus:border-yellow-500"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full btn-gold text-slate-950 px-6 py-4 rounded-lg font-bold text-lg disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? 'SENDING...' : 'SEND MESSAGE'}
                  </button>
                </form>
              ) : (
                <div className="py-12 text-center">
                  <div className="w-16 h-16 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-3xl font-bold mb-2">Thank You!</h3>
                  <p className="text-slate-400 mb-6">Your message has been sent successfully. We'll contact you within 24 hours.</p>
                  <button
                    onClick={() => navigateTo('home')}
                    className="glass border border-white/20 text-white px-6 py-2 rounded-lg font-bold hover:border-yellow-500"
                  >
                    Back to Home
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
