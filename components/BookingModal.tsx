
import React, { useState } from 'react';
import { Celebrity } from '../types';

interface BookingModalProps {
  celebrity: Celebrity;
  onClose: () => void;
}

const BookingModal: React.FC<BookingModalProps> = ({ celebrity, onClose }) => {
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess(true);
    setTimeout(() => {
      onClose();
    }, 2000);
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
                <div className="grid grid-cols-2 gap-4">
                  <input placeholder="Full Name" className="bg-slate-800 border-none rounded-lg p-3 w-full" required />
                  <input placeholder="Work Email" type="email" className="bg-slate-800 border-none rounded-lg p-3 w-full" required />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <input placeholder="Event Date" type="date" className="bg-slate-800 border-none rounded-lg p-3 w-full" required />
                  <input placeholder="Event Location" className="bg-slate-800 border-none rounded-lg p-3 w-full" required />
                </div>
                <select className="bg-slate-800 border-none rounded-lg p-3 w-full text-slate-400">
                  <option>Brand Endorsement</option>
                  <option>Corporate Event</option>
                  <option>Social Media Collaboration</option>
                  <option>Guest Appearance</option>
                </select>
                <textarea placeholder="Tell us more about your requirements..." rows={3} className="bg-slate-800 border-none rounded-lg p-3 w-full"></textarea>
                
                <button type="submit" className="w-full py-4 btn-gold text-slate-950 font-bold rounded-xl mt-4">
                  SUBMIT REQUEST
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
