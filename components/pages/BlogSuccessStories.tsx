import React, { useState, useEffect } from 'react';
import { useRouter } from '../Router';
import PageEditor from '../PageEditor';

interface Story {
  id: string;
  title: string;
  date: string;
  imageUrl?: string;
  content: string;
}

const BlogSuccessStories: React.FC = () => {
  const { navigateTo } = useRouter();
  const [stories, setStories] = useState<Story[]>([]);

  useEffect(() => {
    // Load stories from localStorage
    const storedBlogs = localStorage.getItem('blog_posts');
    if (storedBlogs) {
      const allBlogs = JSON.parse(storedBlogs);
      const storyBlogs = allBlogs.filter((b: any) => b.category === 'Success Stories');
      setStories(storyBlogs);
    } else {
      // Default stories if none exist
      setStories([
        {
          id: '1',
          title: 'Record-Breaking Product Launch with Bollywood Icon',
          date: '2024-02-15',
          content: `<h2>Overview</h2>
<p>A luxury brand partnered with a top Bollywood celebrity for their product launch campaign. The integrated approach combining social media, TV spots, and live events created unprecedented brand visibility and consumer engagement.</p>
<h3>The Challenge</h3>
<p>The brand needed to make a significant impact in a highly competitive market segment. They wanted to create buzz and drive immediate sales for their new premium product line.</p>
<h3>Our Solution</h3>
<p>We selected a Bollywood icon whose persona perfectly matched the brand's values – luxury, sophistication, and aspirational living. The multi-channel campaign included:</p>
<ul>
<li>Exclusive launch event with media coverage</li>
<li>Social media reveal and behind-the-scenes content</li>
<li>TV commercial during prime time</li>
<li>Print ads in premium publications</li>
</ul>
<h3>The Results</h3>
<p>The campaign exceeded all expectations with record-breaking numbers across every metric.</p>`
        },
        {
          id: '2',
          title: 'Corporate Gala with Sports Icon Performance',
          date: '2024-01-28',
          content: `<h2>Event Overview</h2>
<p>A tech giant hosted their annual conference with an international cricket legend as keynote speaker. The celebrity's presence attracted premium sponsorships and significantly elevated the event's prestige.</p>
<h3>Objective</h3>
<p>Create a memorable corporate event that would attract sponsors and engage attendees while reinforcing the company's position as an industry leader.</p>
<h3>Execution</h3>
<p>The cricket legend delivered an inspiring keynote about teamwork and perseverance, followed by an interactive Q&A session with attendees. The event also included exclusive meet-and-greet opportunities for VIP sponsors.</p>
<h3>Outcome</h3>
<p>1000+ attendees with an 8.5/10 satisfaction rating. The event secured premium sponsorships worth ₹5 crores and generated extensive media coverage across 50+ outlets.</p>`
        }
      ]);
    }
  }, []);

  const defaultPageContent = `
    <div class="mb-12">
      <h1 class="text-5xl font-bold mb-4 gold-gradient">Success Stories & Case Studies</h1>
      <p class="text-slate-400 text-lg">Real results from brands and events that partnered with EliteFacesBooking.</p>
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
          pageId="blog-success-header"
          defaultContent={defaultPageContent}
        />

        {/* Stories */}
        {stories.length === 0 ? (
          <div className="text-center py-20 glass rounded-2xl">
            <i className="fas fa-trophy text-6xl text-slate-700 mb-4"></i>
            <h3 className="text-2xl font-bold mb-2">No Stories Yet</h3>
            <p className="text-slate-400">Check back soon for inspiring success stories!</p>
          </div>
        ) : (
          <div className="space-y-16">
            {stories.map((story) => (
              <article key={story.id} className="glass border border-white/10 rounded-2xl overflow-hidden">
                {story.imageUrl && (
                  <img src={story.imageUrl} alt={story.title} className="w-full h-64 object-cover" />
                )}
                <div className="p-8">
                  <div className="mb-4">
                    <span className="text-yellow-500 text-sm font-semibold">
                      {new Date(story.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long' })}
                    </span>
                  </div>
                  <h2 className="text-3xl font-bold mb-6 text-white">{story.title}</h2>

                  {/* Full Story Content */}
                  <div
                    className="text-slate-300 prose prose-invert prose-lg max-w-none"
                    dangerouslySetInnerHTML={{ __html: story.content }}
                  />
                </div>
              </article>
            ))}
          </div>
        )}

        {/* CTA */}
        <div className="mt-16 glass border border-yellow-500/20 rounded-3xl p-12 text-center bg-gradient-to-r from-yellow-500/10 via-transparent to-transparent">
          <h2 className="text-3xl font-bold mb-4">Ready to Create Your Success Story?</h2>
          <p className="text-slate-400 mb-8">Let's discuss how EliteFacesBooking can help achieve your brand goals.</p>
          <button
            onClick={() => navigateTo('contact')}
            className="btn-gold text-slate-950 px-10 py-4 rounded-xl font-bold inline-block hover:shadow-lg transition-all"
          >
            Start Your Campaign Today
          </button>
        </div>
      </div>
    </div>
  );
};

export default BlogSuccessStories;
