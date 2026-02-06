import React from 'react';
import { useRouter } from '../Router';

const BlogIndustryTrends: React.FC = () => {
  const { navigateTo } = useRouter();

  const articles = [
    {
      id: '1',
      title: 'The Rise of Micro-Influencers in 2024',
      date: 'February 2024',
      excerpt: 'How brands are shifting focus from mega-celebrities to authentic micro-influencers with highly engaged audiences.',
      content: `The influencer marketing landscape has undergone a dramatic transformation. While mega-influencers with millions of followers still command attention, brands are increasingly recognizing the unparalleled ROI that micro-influencers deliver.

With engagement rates often exceeding 10% compared to 1-3% for mega-influencers, the shift is clear. Micro-influencers ($10K-$100K per post) offer authentic connections to niche audiences, making them invaluable for targeted campaigns.

Key trends include:
• Authenticity over follower count
• Niche community building
• Long-term partnerships over one-off collaborations
• Transparent disclosures and genuine recommendations

The democratization of influence means smaller creators can command premium rates for their dedicated fan bases.`
    },
    {
      id: '2',
      title: 'Bollywood Goes Global: International Celebrity Partnerships',
      date: 'January 2024',
      excerpt: 'Indian celebrities breaking into international markets and the impact on brand visibility.',
      content: `The global reach of Indian entertainment has expanded exponentially. Bollywood stars are no longer confined to Indian audiences – they're becoming global brand ambassadors.

Recent statistics show:
• 30% increase in international brand deals for Indian celebrities
• Bollywood content consumed in 190+ countries
• Rising appeal of Indian aesthetics in Western markets
• Cross-cultural collaborations driving innovation

This presents unprecedented opportunities for brands seeking to bridge cultural gaps and reach diverse audiences. Celebrity partnerships now transcend borders, creating truly global campaigns.`
    },
    {
      id: '3',
      title: 'Digital-First Strategy: The New Celebrity Playbook',
      date: 'December 2023',
      excerpt: 'How celebrities are building direct-to-fan relationships through digital platforms.',
      content: `Gone are the days when celebrities relied solely on traditional media for exposure. Today's top celebrities are digital entrepreneurs, building multi-million-dollar personal brands.

From YouTube channels to NFT collections, the opportunity landscape has expanded:
• Personal brand monetization through digital products
• Direct fan engagement through social platforms
• Subscription-based content services
• Web3 opportunities and digital collectibles

Brands partnering with these digitally-native celebrities gain access to authentic, engaged communities willing to support products they endorse.`
    }
  ];

  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="container mx-auto px-6 max-w-4xl">
        <div className="mb-12">
          <button 
            onClick={() => navigateTo('home')}
            className="text-yellow-500 hover:text-yellow-400 mb-6 flex items-center space-x-2"
          >
            <span>←</span> <span>Back</span>
          </button>
          <h1 className="text-5xl font-bold mb-4 gold-gradient">Industry Trends & News</h1>
          <p className="text-slate-400 text-lg">Latest insights on celebrity management, influencer marketing, and entertainment industry developments.</p>
        </div>

        <div className="space-y-16">
          {articles.map(article => (
            <article key={article.id} className="glass border border-white/10 rounded-2xl p-8 hover:border-yellow-500/30 transition-all">
              <div className="mb-4">
                <span className="text-yellow-500 text-sm font-semibold">{article.date}</span>
              </div>
              <h2 className="text-3xl font-bold mb-4 text-white">{article.title}</h2>
              <p className="text-slate-400 text-lg leading-relaxed mb-6">{article.excerpt}</p>
              <div className="text-slate-300 whitespace-pre-line text-base leading-relaxed max-h-48 overflow-hidden">
                {article.content}
              </div>
              <button className="text-yellow-500 font-semibold hover:text-yellow-400 mt-4 uppercase tracking-widest text-sm">
                Read Full Article →
              </button>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogIndustryTrends;
