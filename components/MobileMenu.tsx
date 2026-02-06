import React, { useState } from 'react';
import { useRouter } from './Router';

const MobileMenu: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { navigateTo } = useRouter();

  const handleNavigation = (page: string) => {
    navigateTo(page as any);
    setIsOpen(false);
  };

  return (
    <div className="md:hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 hover:bg-white/10 rounded-lg transition-colors"
        aria-label="Toggle menu"
      >
        <svg
          className="w-6 h-6 text-white"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          {isOpen ? (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          ) : (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          )}
        </svg>
      </button>

      {isOpen && (
        <div className="absolute top-20 left-0 right-0 bg-slate-950 border-b border-white/10 shadow-lg z-30">
          <nav className="flex flex-col p-4 space-y-3">
            <button
              onClick={() => handleNavigation('home')}
              className="text-left hover:text-yellow-500 transition-colors py-2 px-3"
            >
              HOME
            </button>
            <button
              onClick={() => handleNavigation('services')}
              className="text-left hover:text-yellow-500 transition-colors py-2 px-3"
            >
              OUR SERVICES
            </button>
            <button
              onClick={() => handleNavigation('about')}
              className="text-left hover:text-yellow-500 transition-colors py-2 px-3"
            >
              ABOUT
            </button>
            <button
              onClick={() => handleNavigation('celebrities')}
              className="text-left hover:text-yellow-500 transition-colors py-2 px-3"
            >
              ALL CELEBRITIES
            </button>
            <button
              onClick={() => handleNavigation('portfolio')}
              className="text-left hover:text-yellow-500 transition-colors py-2 px-3"
            >
              PORTFOLIO
            </button>
            <button
              onClick={() => handleNavigation('contact')}
              className="text-left hover:text-yellow-500 transition-colors py-2 px-3 border-t border-white/10 pt-4"
            >
              CONTACT
            </button>
          </nav>
        </div>
      )}
    </div>
  );
};

export default MobileMenu;
