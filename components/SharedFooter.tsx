import React from 'react';
import { useRouter } from './Router';

const SharedFooter: React.FC = () => {
  const { navigateTo } = useRouter();

  return (
    <footer className="py-20 bg-gradient-to-b from-slate-900 to-slate-950 border-t border-white/10" role="contentinfo">
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12 text-center md:text-left">
        <div className="md:col-span-2">
          <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4 mb-6">
              <img src="/LOGO.PNG" alt="Elite Faces Booking Logo" className="h-16 w-16 rounded-full border-2 border-yellow-500/30" />
              <span className="text-3xl font-black gold-gradient serif italic">EliteFacesBooking</span>
          </div>
          <p className="text-slate-400 max-w-sm mx-auto md:mx-0 mb-8 leading-relaxed">
            Delhi's leading talent management agency. Book top Indian celebrities, actors, influencers, anchors, magicians, and entertainment talent for events, endorsements, and brand collaborations.
          </p>
          <div className="flex justify-center md:justify-start space-x-3 sm:space-x-4">
            <a href="https://www.instagram.com/elitefacesbooking" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-slate-800 border border-white/10 flex items-center justify-center hover:text-yellow-500 hover:border-yellow-500/50 transition-all" aria-label="Instagram">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="https://www.linkedin.com/company/elitefaces" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-slate-800 border border-white/10 flex items-center justify-center hover:text-yellow-500 hover:border-yellow-500/50 transition-all" aria-label="LinkedIn">
              <i className="fab fa-linkedin-in"></i>
            </a>
            <a href="https://twitter.com/elitefacesbooking" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-slate-800 border border-white/10 flex items-center justify-center hover:text-yellow-500 hover:border-yellow-500/50 transition-all" aria-label="Twitter/X">
              <i className="fab fa-x-twitter"></i>
            </a>
            <a
              href="https://wa.me/919990996091"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-slate-800 border border-white/10 flex items-center justify-center hover:text-green-500 hover:border-green-500/50 transition-all"
              aria-label="WhatsApp 1"
            >
              <i className="fab fa-whatsapp text-lg"></i>
            </a>
            <a
              href="https://wa.me/917678683436"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-slate-800 border border-white/10 flex items-center justify-center hover:text-green-500 hover:border-green-500/50 transition-all"
              aria-label="WhatsApp 2"
            >
              <i className="fab fa-whatsapp text-lg"></i>
            </a>
          </div>
        </div>
        <nav>
          <h4 className="text-lg font-bold mb-6 text-yellow-500 uppercase tracking-widest">Get in Touch</h4>
          <ul className="space-y-4 text-slate-400">
            <li>
              <a href="mailto:elitefacesbooking@gmail.com" className="flex items-center justify-center md:justify-start space-x-2 hover:text-yellow-500 transition-colors">
                <i className="fas fa-envelope text-sm"></i>
                <span>elitefacesbooking@gmail.com</span>
              </a>
            </li>
            <li>
              <a href="tel:+919990996091" className="flex items-center justify-center md:justify-start space-x-2 hover:text-yellow-500 transition-colors">
                <i className="fas fa-phone text-sm"></i>
                <span>+91 9990996091</span>
              </a>
            </li>
            <li>
              <a href="https://wa.me/919990996091" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center md:justify-start space-x-2 hover:text-green-500 transition-colors">
                <i className="fab fa-whatsapp text-sm"></i>
                <span>WhatsApp Chat 1</span>
              </a>
            </li>
            <li>
              <a href="https://wa.me/917678683436" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center md:justify-start space-x-2 hover:text-green-500 transition-colors">
                <i className="fab fa-whatsapp text-sm"></i>
                <span>WhatsApp Chat 2</span>
              </a>
            </li>
          </ul>
        </nav>
        <nav>
          <h4 className="text-lg font-bold mb-6 text-yellow-500 uppercase tracking-widest">Quick Links</h4>
          <ul className="space-y-4 text-slate-400">
            <li><button onClick={() => navigateTo('home')} className="hover:text-yellow-500 transition-colors">Home</button></li>
            <li><button onClick={() => navigateTo('services')} className="hover:text-yellow-500 transition-colors">Our Services</button></li>
            <li><button onClick={() => navigateTo('portfolio')} className="hover:text-yellow-500 transition-colors">Success Stories</button></li>
            <li><button onClick={() => navigateTo('about')} className="hover:text-yellow-500 transition-colors">About Us</button></li>
            <li><button onClick={() => navigateTo('contact')} className="hover:text-yellow-500 transition-colors">Book Talent</button></li>
          </ul>
        </nav>
      </div>
      <div className="container mx-auto px-6 pt-12 mt-12 border-t border-white/10">
        <div className="text-center text-slate-400 text-xs tracking-widest uppercase mb-4">
          © {new Date().getFullYear()} EliteFacesBooking Pvt. Ltd. All rights reserved.
        </div>
        <div className="text-center space-x-4">
          <button onClick={() => navigateTo('privacy')} className="text-slate-500 hover:text-yellow-500 text-xs transition-colors">Privacy Policy</button>
          <button onClick={() => navigateTo('faqs')} className="text-slate-500 hover:text-yellow-500 text-xs transition-colors">FAQs</button>
        </div>
      </div>
    </footer>
  );
};

export default SharedFooter;
