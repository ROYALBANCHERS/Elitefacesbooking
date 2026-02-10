import React, { useEffect, useState } from 'react';
import { useRouter } from './Router';

export interface CustomPageData {
  id: string;
  title: string;
  slug: string;
  content: string;
  section: string;
  imageUrl?: string;
  createdAt: string;
  updatedAt: string;
  published: boolean;
  metaDescription?: string;
}

const CustomPage: React.FC<{ pageId?: string }> = ({ pageId }) => {
  const { navigateTo } = useRouter();
  const [pageData, setPageData] = useState<CustomPageData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load custom pages from localStorage
    const savedPages = localStorage.getItem('elitefaces_custom_pages');
    if (savedPages) {
      const pages: CustomPageData[] = JSON.parse(savedPages);
      const page = pages.find(p => p.id === pageId || p.slug === pageId);
      if (page && page.published) {
        setPageData(page);
        // Update page title
        document.title = `${page.title} - Elite Faces Booking`;
      }
    }
    setLoading(false);
  }, [pageId]);

  if (loading) {
    return (
      <div className="min-h-screen pt-32 flex items-center justify-center">
        <div className="text-yellow-500 text-2xl">Loading...</div>
      </div>
    );
  }

  if (!pageData) {
    return (
      <div className="min-h-screen pt-32 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Page Not Found</h1>
          <p className="text-slate-400 mb-8">The page you're looking for doesn't exist.</p>
          <button
            onClick={() => navigateTo('home')}
            className="btn-gold text-slate-950 px-6 py-3 rounded-lg font-bold"
          >
            Go Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="container mx-auto px-6">
        {/* Back Button */}
        <button
          onClick={() => navigateTo('home')}
          className="text-yellow-500 hover:text-yellow-400 mb-8 flex items-center space-x-2"
        >
          <span>←</span> <span>Back to Home</span>
        </button>

        {/* Page Header */}
        {pageData.imageUrl && (
          <div className="mb-8 rounded-2xl overflow-hidden">
            <img src={pageData.imageUrl} alt={pageData.title} className="w-full h-64 md:h-96 object-cover" />
          </div>
        )}

        <div className="max-w-4xl mx-auto">
          <div className="mb-6">
            <span className="text-yellow-500 text-sm uppercase tracking-widest">
              {pageData.section}
            </span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 gold-gradient">{pageData.title}</h1>
          <div className="prose prose-invert prose-lg max-w-none">
            <div dangerouslySetInnerHTML={{ __html: pageData.content }} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomPage;
