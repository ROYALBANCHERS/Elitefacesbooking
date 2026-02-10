import React, { useState, useEffect } from 'react';
import { useRouter } from '../Router';
import PageEditor from '../PageEditor';

const BlogIndustryTrends: React.FC = () => {
  const { navigateTo } = useRouter();
  const [articles, setArticles] = useState<any[]>([]);

  useEffect(() => {
    // Load articles from localStorage
    const storedBlogs = localStorage.getItem('blog_posts');
    if (storedBlogs) {
      const allBlogs = JSON.parse(storedBlogs);
      const industryBlogs = allBlogs.filter((b: any) => b.category === 'Industry Trends');
      setArticles(industryBlogs);
    } else {
      // Default articles if none exist
      setArticles([
        {
          id: '1',
          title: 'The Rise of Micro-Influencers in 2024',
          date: 'February 2024',
          content: `<h2>The Influencer Marketing Revolution</h2>
<p>The influencer marketing landscape has undergone a dramatic transformation. While mega-influencers with millions of followers still command attention, brands are increasingly recognizing the unparalleled ROI that micro-influencers deliver.</p>
<h3>Why Micro-Influencers?</h3>
<p>With engagement rates often exceeding 10% compared to 1-3% for mega-influencers, the shift is clear. Micro-influencers offer authentic connections to niche audiences.</p>
<h3>Key Trends Include:</h3>
<ul>
<li>• Authenticity over follower count</li>
<li>• Niche community building</li>
<li>• Long-term partnerships over one-off collaborations</li>
<li>• Transparent disclosures and genuine recommendations</li>
</ul>
<p>The democratization of influence means smaller creators can command premium rates for their dedicated fan bases.</p>`
        }
      ]);
    }
  }, []);

  const defaultPageContent = `
    <div class="mb-12">
      <h1 class="text-5xl font-bold mb-4 gold-gradient">Industry Trends & News</h1>
      <p class="text-slate-400 text-lg">Latest insights on celebrity management, influencer marketing, and entertainment industry developments.</p>
    </div>
  `;

  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="container mx-auto px-6 max-w-4xl">
        <button
          onClick={() => navigateTo('home')}
          className="text-yellow-500 hover:text-yellow-400 mb-6 flex items-center space-x-2"
        >
          <span>←</span> <span>Back to Home</span>
        </button>

        {/* Page Header - Editable */}
        <PageEditor
          pageId="blog-industry-header"
          defaultContent={defaultPageContent}
        />

        {/* Articles */}
        {articles.length === 0 ? (
          <div className="text-center py-20 glass rounded-2xl">
            <i className="fas fa-newspaper text-6xl text-slate-700 mb-4"></i>
            <h3 className="text-2xl font-bold mb-2">No Articles Yet</h3>
            <p className="text-slate-400">Check back soon for the latest industry insights!</p>
          </div>
        ) : (
          <div className="space-y-16">
            {articles.map((article, index) => (
              <article key={article.id} className="glass border border-white/10 rounded-2xl overflow-hidden">
                {article.imageUrl && (
                  <img src={article.imageUrl} alt={article.title} className="w-full h-64 object-cover" />
                )}
                <div className="p-8">
                  <div className="mb-4">
                    <span className="text-yellow-500 text-sm font-semibold">
                      {new Date(article.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long' })}
                    </span>
                  </div>
                  <h2 className="text-3xl font-bold mb-6 text-white">{article.title}</h2>

                  {/* Full Article Content */}
                  <div
                    className="text-slate-300 prose prose-invert prose-lg max-w-none"
                    dangerouslySetInnerHTML={{ __html: article.content }}
                  />
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogIndustryTrends;
