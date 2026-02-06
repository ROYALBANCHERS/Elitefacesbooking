
import React, { useState } from 'react';
import emailjs from '@emailjs/browser';
import { Celebrity } from '../types';

interface BookingModalProps {
  celebrity: Celebrity;
  onClose: () => void;
}

// Initialize EmailJS (you'll need to set up an account on emailjs.com)
emailjs.init('Aco8Fura5q-jpJj8q'); // Replace with your EmailJS public key

const BookingModal: React.FC<BookingModalProps> = ({ celebrity, onClose }) => {
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    eventDate: '',
    eventLocation: '',
    eventType: 'Brand Endorsement',
    requirements: ''
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
    setError('');

    try {
      // Send email to the admin
      await emailjs.send(
  'gmail_service',
  'welcome_booking_template',
        {
          to_email: 'elitefacesbooking@gmail.com',
          from_name: formData.fullName,
          from_email: formData.email,
          celebrity_name: celebrity.name,
          event_type: formData.eventType,
          event_date: formData.eventDate,
          event_location: formData.eventLocation,
          requirements: formData.requirements,
          category: celebrity.category
        }
      );

      setSuccess(true);
      setTimeout(() => {
        onClose();
      }, 2000);
    } catch (err) {
      console.error('Email error:', err);
      setError('Failed to submit request. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-6">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose}></div>
      <div className="relative glass w-full max-w-2xl rounded-3xl overflow-hidden animate-in zoom-in-95 duration-300">
        {!success ? (
          <div className="flex flex-col md:flex-row">
            <div className="w-full md:w-1/3 bg-slate-900">
              <img src={celebrity.imageUrl} alt={celebrity.name} className="w-full h-full object-cover" />
            </div>
            <div className="w-full md:w-2/3 p-8">
              <h3 className="text-3xl font-bold mb-1">Request {celebrity.name}</h3>
              <p className="text-yellow-500 text-sm font-semibold mb-6">Booking for {celebrity.category}</p>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                {error && <div className="bg-red-500/20 text-red-500 p-3 rounded-lg text-sm">{error}</div>}
                <div className="grid grid-cols-2 gap-4">
                  <input 
                    placeholder="Full Name" 
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    className="bg-slate-800 border-none rounded-lg p-3 w-full text-white placeholder-slate-500" 
                    required 
                  />
                  <input 
                    placeholder="Work Email" 
                    name="email"
                    type="email" 
                    value={formData.email}
                    onChange={handleChange}
                    className="bg-slate-800 border-none rounded-lg p-3 w-full text-white placeholder-slate-500" 
                    required 
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <input 
                    placeholder="Event Date" 
                    name="eventDate"
                    type="date" 
                    value={formData.eventDate}
                    onChange={handleChange}
                    className="bg-slate-800 border-none rounded-lg p-3 w-full text-white" 
                    required 
                  />
                  <input 
                    placeholder="Event Location" 
                    name="eventLocation"
                    value={formData.eventLocation}
                    onChange={handleChange}
                    className="bg-slate-800 border-none rounded-lg p-3 w-full text-white placeholder-slate-500" 
                    required 
                  />
                </div>
                <select 
                  name="eventType"
                  value={formData.eventType}
                  onChange={handleChange}
                  className="bg-slate-800 border-none rounded-lg p-3 w-full text-white"
                >
                  <option>Brand Endorsement</option>
                  <option>Corporate Event</option>
                  <option>Social Media Collaboration</option>
                  <option>Guest Appearance</option>
                </select>
                <textarea 
                  placeholder="Tell us more about your requirements..." 
                  name="requirements"
                  rows={3} 
                  value={formData.requirements}
                  onChange={handleChange}
                  className="bg-slate-800 border-none rounded-lg p-3 w-full text-white placeholder-slate-500"
                ></textarea>
                
                <button 
                  type="submit" 
                  disabled={loading}
                  className="w-full py-4 btn-gold text-slate-950 font-bold rounded-xl mt-4 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'SUBMITTING...' : 'SUBMIT REQUEST'}
                </button>
              </form>
            </div>
          </div>
        ) : (
          <div className="p-16 text-center">
            <div className="w-20 h-20 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
            </div>
            <h3 className="text-3xl font-bold mb-2">Request Received</h3>
            <p className="text-slate-400">Our talent manager will contact you within 24 hours to discuss the details for {celebrity.name}.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingModal;
