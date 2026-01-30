
import React, { useState } from 'react';
import { getTalentRecommendations } from '../services/geminiService';
import { RecommendationRequest } from '../types';

const AIAssistant: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<string | null>(null);
  const [formData, setFormData] = useState<RecommendationRequest>({
    brandGoal: '',
    targetAudience: '',
    budget: 'Medium'
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResponse(null);
    const result = await getTalentRecommendations(formData);
    setResponse(result);
    setLoading(false);
  };

  return (
    <section id="ai-consultant" className="py-24 relative overflow-hidden">
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-yellow-500/10 rounded-full blur-[120px]"></div>
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto glass rounded-3xl p-8 md:p-12 border-yellow-500/20">
          <div className="text-center mb-10">
            <span className="text-yellow-500 font-bold tracking-[0.3em] uppercase text-sm mb-4 block">AI Powered</span>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Talent Consultant</h2>
            <p className="text-slate-400 max-w-xl mx-auto">
              Not sure who to pick? Let our intelligent advisor recommend the perfect face for your campaign.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-2">Campaign Goal</label>
              <input 
                type="text"
                placeholder="e.g. Luxury Car Launch"
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-yellow-500 transition-colors"
                value={formData.brandGoal}
                onChange={e => setFormData({...formData, brandGoal: e.target.value})}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-2">Target Audience</label>
              <input 
                type="text"
                placeholder="e.g. Gen Z Professionals"
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-yellow-500 transition-colors"
                value={formData.targetAudience}
                onChange={e => setFormData({...formData, targetAudience: e.target.value})}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-2">Budget Scale</label>
              <select 
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-yellow-500 transition-colors"
                value={formData.budget}
                onChange={e => setFormData({...formData, budget: e.target.value})}
              >
                <option value="Premium">Premium (Tier 1 Stars)</option>
                <option value="Medium">Medium (Mid-range Stars)</option>
                <option value="Entry">Digital Only (Emerging Talent)</option>
              </select>
            </div>
            <div className="md:col-span-3">
              <button 
                type="submit"
                disabled={loading}
                className="w-full py-4 btn-gold text-slate-950 font-bold rounded-xl text-lg disabled:opacity-50"
              >
                {loading ? 'ANALYZING TALENT NETWORK...' : 'GENERATE EXPERT ADVICE'}
              </button>
            </div>
          </form>

          {response && (
            <div className="bg-slate-900/50 rounded-2xl p-6 md:p-8 border border-yellow-500/20 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="prose prose-invert prose-yellow max-w-none">
                <div className="whitespace-pre-wrap leading-relaxed text-slate-300">
                  {response}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default AIAssistant;
