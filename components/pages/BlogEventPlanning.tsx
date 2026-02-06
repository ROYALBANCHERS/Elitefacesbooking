import React from 'react';
import { useRouter } from '../Router';

const BlogEventPlanning: React.FC = () => {
  const { navigateTo } = useRouter();

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
          <h1 className="text-5xl font-bold mb-4 gold-gradient">Event Planning & Sponsorship Guide</h1>
          <p className="text-slate-400 text-lg">Complete guide to planning events with celebrity appearances and securing sponsorships.</p>
        </div>

        <div className="space-y-8 text-slate-300">
          <section className="glass border border-white/10 rounded-2xl p-8">
            <h2 className="text-3xl font-bold mb-4 text-white flex items-center space-x-3">
              <span className="text-4xl">📋</span>
              <span>Planning Your Celebrity Event</span>
            </h2>
            <div className="space-y-4 ml-12">
              <div>
                <h3 className="text-lg font-semibold text-yellow-500 mb-2">Step 1: Define Your Event Objectives</h3>
                <p>Clearly outline what you want to achieve – brand awareness, product launch, audience engagement, or entertainment. Celebrity selection should align perfectly with these goals.</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-yellow-500 mb-2">Step 2: Set Your Budget</h3>
                <p>Celebrity fees typically range from ₹5 lakhs to ₹5 crores depending on their tier and availability. Allocate 30-40% of your event budget for talent, 40% for logistics, and 20% for marketing.</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-yellow-500 mb-2">Step 3: Book in Advance</h3>
                <p>Top celebrities are booked 2-6 months ahead. Submit your requirement with event dates, duration, and compensation. We'll provide options within your budget and timeline.</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-yellow-500 mb-2">Step 4: Finalize Details</h3>
                <p>Confirm appearance duration, performance requirements, technical needs, and any special requests. Provide a detailed event brief to ensure smooth coordination.</p>
              </div>
            </div>
          </section>

          <section className="glass border border-white/10 rounded-2xl p-8">
            <h2 className="text-3xl font-bold mb-4 text-white flex items-center space-x-3">
              <span className="text-4xl">🎯</span>
              <span>Celebrity Selection Strategy</span>
            </h2>
            <div className="space-y-4 ml-12">
              <div>
                <h3 className="text-lg font-semibold text-yellow-500 mb-2">Brand Alignment</h3>
                <p>Choose celebrities whose image, values, and audience demographics match your brand. A perfect fit creates authentic endorsements that resonate with consumers.</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-yellow-500 mb-2">Audience Appeal</h3>
                <p>Analyze the celebrity's followers – age group, geography, interests. Ensure their audience overlaps with your target market for maximum impact.</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-yellow-500 mb-2">Market Value</h3>
                <p>Consider recent appearances, media coverage, and social media engagement. Rising stars might offer better ROI than established names, especially for niche markets.</p>
              </div>
            </div>
          </section>

          <section className="glass border border-white/10 rounded-2xl p-8">
            <h2 className="text-3xl font-bold mb-4 text-white flex items-center space-x-3">
              <span className="text-4xl">💼</span>
              <span>Sponsorship Opportunities</span>
            </h2>
            <div className="space-y-4 ml-12">
              <div>
                <h3 className="text-lg font-semibold text-yellow-500 mb-2">Tier-Based Sponsorship</h3>
                <p className="mb-3">Structure sponsorships in tiers:</p>
                <ul className="list-disc list-inside space-y-1">
                  <li>Title Sponsor: Primary branding rights, ₹50-100L+</li>
                  <li>Co-Sponsor: Secondary branding, ₹25-50L</li>
                  <li>Associate Sponsor: Limited visibility, ₹10-25L</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-yellow-500 mb-2">Deliverables per Tier</h3>
                <p className="mb-3">Provide clear value to sponsors:</p>
                <ul className="list-disc list-inside space-y-1">
                  <li>Logo placement on banners, backdrops, programs</li>
                  <li>Social media mentions and hashtags</li>
                  <li>Media coverage and press releases</li>
                  <li>Celebrity meet-and-greet opportunities</li>
                  <li>Post-event report and metrics</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="glass border border-white/10 rounded-2xl p-8">
            <h2 className="text-3xl font-bold mb-4 text-white flex items-center space-x-3">
              <span className="text-4xl">📊</span>
              <span>Measuring Success</span>
            </h2>
            <div className="space-y-4 ml-12">
              <div>
                <h3 className="text-lg font-semibold text-yellow-500 mb-2">Key Metrics to Track</h3>
                <ul className="list-disc list-inside space-y-1">
                  <li>Attendance numbers and demographics</li>
                  <li>Social media mentions and reach</li>
                  <li>Media coverage value (earned media)</li>
                  <li>Brand sentiment and perception shifts</li>
                  <li>Sales lift or lead generation</li>
                  <li>Post-event engagement and conversions</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-yellow-500 mb-2">ROI Calculation</h3>
                <p>Calculate return by comparing total event investment against measurable outcomes (sales, leads, media value, brand lift). Target minimum 3:1 ROI.</p>
              </div>
            </div>
          </section>

          <section className="glass border border-white/10 rounded-2xl p-8">
            <h2 className="text-3xl font-bold mb-4 text-white flex items-center space-x-3">
              <span className="text-4xl">💡</span>
              <span>Pro Tips for Success</span>
            </h2>
            <ul className="list-disc list-inside space-y-3 ml-4">
              <li>Secure media partnerships early to amplify reach</li>
              <li>Create exclusive content moments (photo ops, interviews) for social sharing</li>
              <li>Brief the celebrity thoroughly on brand messaging and key talking points</li>
              <li>Have backup plans for technical issues or weather problems</li>
              <li>Engage attendees pre-event through teasers and countdowns</li>
              <li>Capture high-quality content for post-event marketing</li>
              <li>Follow up with attendees and sponsors within a week</li>
            </ul>
          </section>

          <div className="mt-12 glass border border-yellow-500/20 rounded-2xl p-10 text-center bg-gradient-to-r from-yellow-500/10 via-transparent to-transparent">
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
    </div>
  );
};

export default BlogEventPlanning;
