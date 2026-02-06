import React from 'react';
import { useRouter } from './Router';

interface ArticleDetailProps {
  article: any;
}

const ArticleDetail: React.FC<ArticleDetailProps> = ({ article }) => {
  const { navigateTo } = useRouter();

  if (!article) {
    return null;
  }

  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="container mx-auto px-6 max-w-4xl">
        <button 
          onClick={() => navigateTo('blog-industry')}
          className="text-yellow-500 hover:text-yellow-400 mb-12 flex items-center space-x-2"
        >
          <span>←</span> <span>Back to Articles</span>
        </button>

        <article className="glass border border-white/10 rounded-2xl p-8 md:p-12">
          <div className="mb-6">
            <span className="text-yellow-500 text-sm font-semibold">{article.date}</span>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold mb-8 gold-gradient leading-tight">
            {article.title}
          </h1>
          
          <div className="prose prose-invert max-w-none">
            <div className="text-slate-300 whitespace-pre-line text-base md:text-lg leading-relaxed mb-8">
              {article.content}
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-white/10">
            <p className="text-slate-400 italic">
              Published on <span className="text-yellow-500 font-semibold">{article.date}</span>
            </p>
          </div>
        </article>

        <div className="mt-12 text-center">
          <button 
            onClick={() => navigateTo('contact')}
            className="btn-gold text-slate-950 px-10 py-4 rounded-xl font-bold text-lg"
          >
            Book a Talent for Your Campaign
          </button>
        </div>
      </div>
    </div>
  );
};

export default ArticleDetail;
