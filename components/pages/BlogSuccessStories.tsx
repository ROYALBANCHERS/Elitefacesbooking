import React from 'react';
import { useRouter } from '../Router';

interface Story {
  id: string;
  title: string;
  client: string;
  celebrity: string;
  category: string;
  result: string;
  metrics: string[];
  description: string;
}

const BlogSuccessStories: React.FC = () => {
  const { navigateTo } = useRouter();

  const stories: Story[] = [
    {
      id: '1',
      title: 'Record-Breaking Product Launch with Bollywood Icon',
      client: 'Premium Lifestyle Brand',
      celebrity: 'A-List Bollywood Star',
      category: 'Brand Endorsement',
      result: 'Exceeded sales targets by 250% in first month',
      metrics: ['5M+ Social Impressions', '15% Conversion Rate', '₹50 Crore Revenue'],
      description: 'A luxury brand partnered with a top Bollywood celebrity for their product launch campaign. The integrated approach combining social media, TV spots, and live events created unprecedented brand visibility and consumer engagement.'
    },
    {
      id: '2',
      title: 'Corporate Gala with Sports Icon Performance',
      client: 'Fortune 500 Tech Company',
      celebrity: 'Renowned Cricket Legend',
      category: 'Corporate Event',
      result: '1000+ attendees, 8.5/10 satisfaction rating',
      metrics: ['Live Attendance: 1000+', 'Media Coverage: 50+ outlets', 'Executive Satisfaction: 9/10'],
      description: 'A tech giant hosted an annual conference with an international cricket legend as keynote speaker. The celebrity\'s presence attracted premium sponsorships and significantly elevated the event\'s prestige and media coverage.'
    },
    {
      id: '3',
      title: 'Social Media Viral Campaign with Digital Influencer',
      client: 'Beauty & Personal Care Brand',
      celebrity: 'Top Fashion Influencer',
      category: 'Influencer Collaboration',
      result: '150M+ organic reach, 2M+ engagement',
      metrics: ['Organic Reach: 150M+', 'User-Generated Content: 50K posts', 'Sales Lift: 180%'],
      description: 'A beauty brand collaborated with a trending fashion influencer for a multi-week campaign. The authentic content and influencer\'s engaged community resulted in viral spread and unprecedented organic reach without paid promotion.'
    },
    {
      id: '4',
      title: 'Festival Performance with Music Stars',
      client: 'Entertainment & Events Company',
      celebrity: 'Multiple Music Celebrities',
      category: 'Music & Entertainment',
      result: '50,000+ attendees, Record ticket sales',
      metrics: ['Attendees: 50,000+', 'Ticket Sales: ₹25 Crore', 'Social Buzz: Trending #1'],
      description: 'A music festival featuring multiple celebrity performers sold out within days. The combination of star-studded lineup and strategic marketing created a sold-out event with massive social media buzz and positive reviews.'
    },
    {
      id: '5',
      title: 'Brand Ambassador Program with Fitness Icon',
      client: 'Health & Wellness Company',
      celebrity: 'Fitness & Wellness Influencer',
      category: 'Brand Ambassador',
      result: '2-year partnership, 300% ROI',
      metrics: ['Revenue Growth: 300%', 'Social Following: +2M', 'Brand Trust Score: +40%'],
      description: 'A health brand established a long-term ambassador partnership with a renowned fitness personality. The authentic alignment between brand values and the celebrity\'s lifestyle resulted in sustained growth and brand loyalty.'
    },
    {
      id: '6',
      title: 'Movie Promotion Tour with Bollywood Actor',
      client: 'Film Production House',
      celebrity: 'Lead Bollywood Actor',
      category: 'Movie Promotion',
      result: 'Blockbuster opening weekend with ₹200 Crore+ collection',
      metrics: ['Opening Weekend: ₹200 Crore+', 'Theater Count: 4000+', 'Positive Reviews: 92%'],
      description: 'A production house orchestrated a comprehensive promotional tour with the film\'s lead actor across major cities. The ground-level engagement combined with media appearances resulted in record-breaking box office numbers.'
    }
  ];

  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="container mx-auto px-6">
        <div className="mb-12 max-w-4xl">
          <button 
            onClick={() => navigateTo('home')}
            className="text-yellow-500 hover:text-yellow-400 mb-6 flex items-center space-x-2"
          >
            <span>←</span> <span>Back</span>
          </button>
          <h1 className="text-5xl font-bold mb-4 gold-gradient">Success Stories & Case Studies</h1>
          <p className="text-slate-400 text-lg">Real results from brands and events that partnered with EliteFacesBooking.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {stories.map(story => (
            <div key={story.id} className="glass border border-white/10 rounded-2xl overflow-hidden hover:border-yellow-500/30 transition-all group">
              <div className="p-8">
                <div className="mb-4">
                  <span className="inline-block px-3 py-1 bg-yellow-500/20 text-yellow-500 text-xs font-semibold rounded-full">
                    {story.category}
                  </span>
                </div>
                
                <h3 className="text-2xl font-bold mb-3 text-white group-hover:text-yellow-500 transition-colors">
                  {story.title}
                </h3>

                <div className="space-y-2 mb-6 pb-6 border-b border-white/10">
                  <p className="text-slate-400">
                    <span className="text-slate-300 font-semibold">Client:</span> {story.client}
                  </p>
                  <p className="text-slate-400">
                    <span className="text-slate-300 font-semibold">Celebrity:</span> {story.celebrity}
                  </p>
                </div>

                <p className="text-slate-300 mb-6 leading-relaxed">{story.description}</p>

                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-yellow-500 mb-3 uppercase tracking-widest">Key Results</h4>
                  <p className="text-2xl font-bold text-white mb-4">{story.result}</p>
                  <div className="grid grid-cols-3 gap-3">
                    {story.metrics.map((metric, idx) => (
                      <div key={idx} className="bg-white/5 rounded-lg p-3 text-center border border-white/10">
                        <p className="text-sm text-slate-400">{metric}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <button className="text-yellow-500 font-semibold hover:text-yellow-400 uppercase tracking-widest text-sm">
                  View Details →
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 glass border border-yellow-500/20 rounded-3xl p-12 text-center bg-gradient-to-r from-yellow-500/10 via-transparent to-transparent max-w-4xl mx-auto">
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
