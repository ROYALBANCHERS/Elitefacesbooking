import React, { useState } from 'react';
import { useRouter } from './Router';

const BlogMenu: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { navigateTo } = useRouter();

  const blogPages = [
    { id: 'blog-industry', title: 'Industry Trends & News' },
    { id: 'blog-success', title: 'Success Stories & Cases' },
    { id: 'blog-faq', title: 'FAQ & Help Center' },
    { id: 'blog-event', title: 'Event Planning Guide' }
  ];

  return (
    <div className="relative group">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="hover:text-yellow-500 transition-colors flex items-center space-x-1"
      >
        <span>BLOG</span>
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </button>
      
      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-48 glass border border-white/10 rounded-xl overflow-hidden z-50">
          {blogPages.map(page => (
            <button
              key={page.id}
              onClick={() => {
                navigateTo(page.id as any);
                setIsOpen(false);
              }}
              className="block w-full text-left px-4 py-3 text-sm text-slate-300 hover:bg-white/5 hover:text-yellow-500 transition-colors"
            >
              {page.title}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default BlogMenu;
