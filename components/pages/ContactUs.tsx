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
      console.log('[v0] Sending contact form...');
      
      // Fixed: Proper EmailJS call structure
      const response = await emailjs.send(
        'service_em3wlf9',
        'template_6izepv4',
        {
          to_email: 'elitefacesbooking@gmail.com',
          from_name: formData.name,
          from_email: formData.email,
          phone: formData.phone,
          company: formData.company || 'Not specified',
          event_type: formData.eventType || 'Not specified',
          event_date: formData.eventDate || 'Not specified',
          budget: formData.budget || 'Not specified',
          message: formData.message
        }
      );

      console.log('[v0] Email sent successfully:', response);
      setSubmitted(true);
      setFormData({
        name: '', email: '', phone: '', company: '',
        eventType: '', eventDate: '', budget: '', message: ''
      });

      setTimeout(() => setSubmitted(false), 5000);
    } catch (err: any) {
      console.error('[v0] Error sending email:', err);
      setError(err?.text || err?.message || 'Failed to send message.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="container mx-auto px-6">
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
          <div className="space-y-6">
            <div className="glass border border-white/10 rounded-2xl p-8">
              <div className="text-4xl mb-4">📧</div>
              <h3 className="text-xl font-bold mb-2 text-white">Email</h3>
              <a href="mailto:elitefacesbooking@gmail.com" className="text-yellow-500 hover:text-yellow-400 break-all">
                elitefacesbooking@gmail.com
              </a>
            </div>

            <div className="glass border border-white/10 rounded-2xl p-8">
              <div className="text-4xl mb-4">📱</div>
              <h3 className="text-xl font-bold mb-2 text-white">Phone</h3>
              <div className="space-y-2">
                <a href="tel:+919990996091" className="text-yellow-500 hover:text-yellow-400 block">+91 9990996091</a>
                <a href="tel:+917678683436" className="text-yellow-500 hover:text-yellow-400 block">+91 7678683436</a>
              </div>
            </div>

            <div className="glass border border-white/10 rounded-2xl p-8">
              <div className="text-4xl mb-4">💬</div>
              <h3 className="text-xl font-bold mb-2 text-white">WhatsApp</h3>
              <a 
                href="https://wa.me/919990996091" 
                target="_blank" rel="noopener noreferrer"
                className="btn-gold text-slate-950 px-4 py-2 rounded-lg font-bold text-sm w-full text-center block"
              >
                Chat on WhatsApp
              </a>
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="glass border border-white/10 rounded-3xl p-8 lg:p-12 bg-gradient-to-br from-slate-900/50 to-slate-800/50">
              {!submitted ? (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {error && (
                    <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-4 text-red-400 text-sm">
                      {error}
                    </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Your Name *" className="w-full bg-slate-800/50 border border-white/10 rounded-lg p-3 text-white focus:border-yellow-500 outline-none" />
                    <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email *" className="w-full bg-slate-800/50 border border-white/10 rounded-lg p-3 text-white focus:border-yellow-500 outline-none" />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone *" className="w-full bg-slate-800/50 border border-white/10 rounded-lg p-3 text-white focus:border-yellow-500 outline-none" />
                    <input type="text" name="company" value={formData.company} onChange={handleChange} placeholder="Company" className="w-full bg-slate-800/50 border border-white/10 rounded-lg p-3 text-white focus:border-yellow-500 outline-none" />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <select name="eventType" value={formData.eventType} onChange={handleChange} className="w-full bg-slate-800/50 border border-white/10 rounded-lg p-3 text-white outline-none">
                      <option value="">Event Type</option>
                      <option>Brand Endorsement</option>
                      <option>Corporate Event</option>
                      <option>Live Performance</option>
                    </select>
                    <input type="date" name="eventDate" value={formData.eventDate} onChange={handleChange} className="w-full bg-slate-800/50 border border-white/10 rounded-lg p-3 text-white outline-none" />
                  </div>

                  <textarea name="message" value={formData.message} onChange={handleChange} placeholder="Message *" rows={5} className="w-full bg-slate-800/50 border border-white/10 rounded-lg p-3 text-white focus:border-yellow-500 outline-none resize-none" />

                  <button type="submit" disabled={loading} className="w-full btn-gold text-slate-950 px-6 py-4 rounded-lg font-bold disabled:opacity-50">
                    {loading ? 'SENDING...' : 'SEND MESSAGE'}
                  </button>
                </form>
              ) : (
                <div className="py-16 text-center">
                  <h3 className="text-4xl font-bold mb-3 text-white">Thank You!</h3>
                  <p className="text-slate-400">Message sent successfully.</p>
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
