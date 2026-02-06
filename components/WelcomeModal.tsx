import React, { useState } from 'react';
import emailjs from '@emailjs/browser';

interface WelcomeModalProps {
  onClose: () => void;
}

emailjs.init('Aco8Fura5q-jpJj8q'); // Replace with your EmailJS public key

const WelcomeModal: React.FC<WelcomeModalProps> = ({ onClose }) => {
  const [step, setStep] = useState<'greeting' | 'form'>('greeting');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    companyName: '',
    location: '',
    bookingType: 'Celebrity',
    preferredCelebrity: '',
    eventDate: '',
    additionalDetails: ''
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
      // Validate required fields
      if (!formData.fullName || !formData.phone || !formData.companyName || !formData.location || !formData.eventDate) {
        setError('Please fill in all required fields');
        setLoading(false);
        return;
      }

      // Send email to admin
      await emailjs.send(
  'service_em3wlf9',
  'template_5rpfhd7',
        {
          to_email: 'elitefacesbooking@gmail.com',
          from_name: formData.fullName,
          from_phone: formData.phone,
          from_company: formData.companyName,
          location: formData.location,
          booking_type: formData.bookingType,
          preferred_celebrity: formData.preferredCelebrity || 'Not specified',
          event_date: formData.eventDate,
          additional_details: formData.additionalDetails || 'None',
          message: `New Booking Request\n\nName: ${formData.fullName}\nPhone: ${formData.phone}\nCompany: ${formData.companyName}\nLocation: ${formData.location}\nBooking Type: ${formData.bookingType}\nPreferred Celebrity: ${formData.preferredCelebrity || 'Not specified'}\nEvent Date: ${formData.eventDate}\nAdditional Details: ${formData.additionalDetails || 'None'}`
        }
      );

      setSuccess(true);
      setTimeout(() => {
        onClose();
      }, 3000);
    } catch (err) {
      console.error('Email error:', err);
      setError('Failed to submit booking. Please try again or contact us directly.');
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="absolute inset-0 bg-black/70 backdrop-blur-sm"></div>
        <div className="relative bg-gradient-to-b from-slate-900 to-slate-950 rounded-3xl p-8 max-w-md w-full border border-yellow-500/30 text-center">
          <div className="mb-4 text-5xl">✓</div>
          <h2 className="text-2xl font-bold text-white mb-4">Booking Request Received!</h2>
          <p className="text-slate-300 mb-2">Thank you for your interest, {formData.fullName}!</p>
          <p className="text-slate-400 text-sm">We'll review your request and contact you shortly at {formData.phone}</p>
          <div className="mt-6 text-yellow-500 text-sm font-medium">Redirecting...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose}></div>
      
      <div className="relative bg-gradient-to-b from-slate-900 to-slate-950 rounded-3xl p-8 max-w-2xl w-full border border-yellow-500/30 max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors text-2xl"
        >
          ×
        </button>

        {step === 'greeting' ? (
          <div className="text-center space-y-6">
            <div className="text-5xl mb-4">✨</div>
            <h1 className="text-4xl font-bold text-white">Welcome to EliteFaces!</h1>
            <p className="text-slate-300 text-lg max-w-md mx-auto">
              Ready to book your perfect celebrity, influencer, magician, or anchor for your next big event?
            </p>
            <p className="text-slate-400 text-sm max-w-md mx-auto">
              We connect you with India's most exclusive talent. Let's make your event unforgettable!
            </p>
            <div className="flex gap-4 justify-center pt-6">
              <button
                onClick={() => setStep('form')}
                className="flex-1 py-3 btn-gold text-slate-950 font-bold rounded-xl text-lg hover:shadow-lg hover:shadow-yellow-500/50 transition-all"
              >
                BOOK NOW
              </button>
              <button
                onClick={onClose}
                className="flex-1 py-3 border border-slate-600 text-white font-bold rounded-xl text-lg hover:bg-slate-800 transition-colors"
              >
                BROWSE FIRST
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div>
              <h2 className="text-3xl font-bold text-white mb-2">Book Your Talent</h2>
              <p className="text-slate-400">Fill in your details below</p>
            </div>

            {error && (
              <div className="bg-red-500/20 border border-red-500/50 text-red-400 p-4 rounded-lg text-sm">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Row 1: Name & Phone */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Full Name *</label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="Your Full Name"
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg p-3 text-white placeholder-slate-500 focus:outline-none focus:border-yellow-500 transition-colors"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Phone Number *</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+91 XXXXX XXXXX"
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg p-3 text-white placeholder-slate-500 focus:outline-none focus:border-yellow-500 transition-colors"
                    required
                  />
                </div>
              </div>

              {/* Row 2: Company & Location */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Company Name *</label>
                  <input
                    type="text"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleChange}
                    placeholder="Your Company/Brand"
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg p-3 text-white placeholder-slate-500 focus:outline-none focus:border-yellow-500 transition-colors"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Location *</label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    placeholder="City/State"
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg p-3 text-white placeholder-slate-500 focus:outline-none focus:border-yellow-500 transition-colors"
                    required
                  />
                </div>
              </div>

              {/* Row 3: Booking Type */}
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">What are you looking for? *</label>
                <select
                  name="bookingType"
                  value={formData.bookingType}
                  onChange={handleChange}
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg p-3 text-white focus:outline-none focus:border-yellow-500 transition-colors"
                  required
                >
                  <option value="Celebrity">Celebrity</option>
                  <option value="Influencer">Influencer</option>
                  <option value="Magician">Magician</option>
                  <option value="Anchor">Anchor</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              {/* Row 4: Preferred Celebrity & Event Date */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Preferred Celebrity/Talent (Optional)</label>
                  <input
                    type="text"
                    name="preferredCelebrity"
                    value={formData.preferredCelebrity}
                    onChange={handleChange}
                    placeholder="Any specific name?"
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg p-3 text-white placeholder-slate-500 focus:outline-none focus:border-yellow-500 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Event Date *</label>
                  <input
                    type="date"
                    name="eventDate"
                    value={formData.eventDate}
                    onChange={handleChange}
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg p-3 text-white focus:outline-none focus:border-yellow-500 transition-colors"
                    required
                  />
                </div>
              </div>

              {/* Row 5: Additional Details */}
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Additional Details (Optional)</label>
                <textarea
                  name="additionalDetails"
                  value={formData.additionalDetails}
                  onChange={handleChange}
                  placeholder="Tell us more about your event, budget, or specific requirements..."
                  rows={3}
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg p-3 text-white placeholder-slate-500 focus:outline-none focus:border-yellow-500 transition-colors resize-none"
                />
              </div>

              {/* Submit & Cancel Buttons */}
              <div className="flex gap-4 pt-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 py-3 btn-gold text-slate-950 font-bold rounded-xl text-lg disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg hover:shadow-yellow-500/50 transition-all"
                >
                  {loading ? 'SUBMITTING...' : 'SUBMIT BOOKING REQUEST'}
                </button>
                <button
                  type="button"
                  onClick={() => setStep('greeting')}
                  className="flex-1 py-3 border border-slate-600 text-white font-bold rounded-xl text-lg hover:bg-slate-800 transition-colors"
                >
                  BACK
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default WelcomeModal;
