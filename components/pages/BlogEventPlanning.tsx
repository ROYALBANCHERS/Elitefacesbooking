import React, { useState, useEffect } from 'react';
import { useRouter } from '../Router';
import PageEditor from '../PageEditor';

interface Article {
  id: string;
  title: string;
  date: string;
  imageUrl?: string;
  content: string;
}

const BlogEventPlanning: React.FC = () => {
  const { navigateTo } = useRouter();
  const [articles, setArticles] = useState<Article[]>([]);

  useEffect(() => {
    // Load articles from localStorage
    const storedBlogs = localStorage.getItem('blog_posts');
    if (storedBlogs) {
      const allBlogs = JSON.parse(storedBlogs);
      const eventBlogs = allBlogs.filter((b: any) => b.category === 'Event Planning');
      setArticles(eventBlogs);
    } else {
      // Default articles if none exist
      setArticles([
        {
          id: '1',
          title: 'Complete Guide to Planning Celebrity Events in 2024',
          date: '2024-02-10',
          content: `<h2>Planning Your Celebrity Event</h2>
<p>Clearly outline what you want to achieve – brand awareness, product launch, audience engagement, or entertainment. Celebrity selection should align perfectly with these goals.</p>
<h3>Step 1: Define Your Event Objectives</h3>
<p>Clearly outline what you want to achieve – brand awareness, product launch, audience engagement, or entertainment. Celebrity selection should align perfectly with these goals.</p>
<h3>Step 2: Set Your Budget</h3>
<p>Celebrity fees typically range from ₹5 lakhs to ₹5 crores depending on their tier and availability. Allocate 30-40% of your event budget for talent, 40% for logistics, and 20% for marketing.</p>
<h3>Step 3: Book in Advance</h3>
<p>Top celebrities are booked 2-6 months ahead. Submit your requirement with event dates, duration, and compensation. We'll provide options within your budget and timeline.</p>
<h3>Step 4: Finalize Details</h3>
<p>Confirm appearance duration, performance requirements, technical needs, and any special requests. Provide a detailed event brief to ensure smooth coordination.</p>
<h2>Celebrity Selection Strategy</h2>
<h3>Brand Alignment</h3>
<p>Choose celebrities whose image, values, and audience demographics match your brand. A perfect fit creates authentic endorsements that resonate with consumers.</p>
<h3>Audience Appeal</h3>
<p>Analyze the celebrity's followers – age group, geography, interests. Ensure their audience overlaps with your target market for maximum impact.</p>
<h3>Market Value</h3>
<p>Consider recent appearances, media coverage, and social media engagement. Rising stars might offer better ROI than established names, especially for niche markets.</p>
<h2>Sponsorship Opportunities</h2>
<h3>Tier-Based Sponsorship</h3>
<p>Structure sponsorships in tiers:</p>
<ul>
<li>Title Sponsor: Primary branding rights, ₹50-100L+</li>
<li>Co-Sponsor: Secondary branding, ₹25-50L</li>
<li>Associate Sponsor: Limited visibility, ₹10-25L</li>
</ul>
<h3>Deliverables per Tier</h3>
<p>Provide clear value to sponsors: Logo placement on banners, backdrops, programs; Social media mentions and hashtags; Media coverage and press releases; Celebrity meet-and-greet opportunities; Post-event report and metrics.</p>`
        }
      ]);
    }
  }, []);

  const defaultPageContent = `
    <div class="mb-12">
      <h1 class="text-5xl font-bold mb-4 gold-gradient">Event Planning & Sponsorship Guide</h1>
      <p class="text-slate-400 text-lg">Complete guide to planning events with celebrity appearances and securing sponsorships.</p>
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
          pageId="blog-event-header"
          defaultContent={defaultPageContent}
        />

        {/* Articles */}
        {articles.length === 0 ? (
          <div className="text-center py-20 glass rounded-2xl">
            <i className="fas fa-calendar-alt text-6xl text-slate-700 mb-4"></i>
            <h3 className="text-2xl font-bold mb-2">No Articles Yet</h3>
            <p className="text-slate-400">Check back soon for event planning tips!</p>
          </div>
        ) : (
          <div className="space-y-16">
            {articles.map((article) => (
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

        {/* CTA */}
        <div className="mt-16 glass border border-yellow-500/20 rounded-2xl p-10 text-center bg-gradient-to-r from-yellow-500/10 via-transparent to-transparent">
          <h3 className="text-2xl font-bold mb-4">Need Help Planning Your Event?</h3>
          <p className="text-slate-400 mb-6">Our expert team specializes in celebrity event coordination and sponsorship activation.</p>
          <button
            onClick={() => navigateTo('contact')}
            className="btn-gold text-slate-950 px-8 py-3 rounded-lg font-bold inline-block"
          >
            Consult Our Team
          </button>
        </div>
      </div>
    </div>
  );
};

export default BlogEventPlanning;
