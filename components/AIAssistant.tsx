
import React, { useState } from 'react';
import { getTalentRecommendations } from '../services/geminiService';
import { RecommendationRequest } from '../types';

const AIAssistant: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [response, setResponse] = useState<string | null>(null);
  const [displayedResponse, setDisplayedResponse] = useState('');
  const [formData, setFormData] = useState<RecommendationRequest>({
    brandGoal: '',
    targetAudience: '',
    budget: 'Medium'
  });

  const typeWriterEffect = (text: string, speed: number = 10) => {
    let currentIndex = 0;
    setDisplayedResponse('');

    const interval = setInterval(() => {
      if (currentIndex < text.length) {
        setDisplayedResponse(prev => prev + text[currentIndex]);
        currentIndex++;
      } else {
        clearInterval(interval);
      }
    }, speed);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResponse(null);
    setDisplayedResponse('');
    setError('');

    try {
      if (!formData.brandGoal.trim() || !formData.targetAudience.trim()) {
        setError('Please fill in all required fields');
        setLoading(false);
        return;
      }
      
      const result = await getTalentRecommendations(formData);
      
      if (!result || result.includes('Error') || result.includes('unable')) {
        setError('AI service returned an error. Please check your API key and try again.');
      } else {
        setResponse(result);
        typeWriterEffect(result);
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
      setError(`Failed to generate recommendations: ${errorMessage}. Make sure your API_KEY is set in environment variables.`);
    } finally {
      setLoading(false);
    }
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

          {error && (
            <div className="bg-red-500/20 border border-red-500/50 text-red-400 p-4 rounded-xl mb-6 text-sm">
              {error}
            </div>
          )}

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
            <div className="space-y-4">
              <div className="bg-gradient-to-r from-yellow-500/10 to-orange-500/10 rounded-2xl p-6 md:p-8 border border-yellow-500/30 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="mb-3">
                  <span className="text-yellow-400 font-bold text-sm uppercase tracking-widest">AI Expert Recommendation</span>
                </div>
                <div className="prose prose-invert max-w-none">
                  <div className="whitespace-pre-wrap leading-relaxed text-slate-200 text-base">
                    {displayedResponse || response}
                  </div>
                  {displayedResponse && displayedResponse.length < response.length && (
                    <span className="inline-block w-2 h-6 bg-yellow-500 ml-1 animate-pulse"></span>
                  )}
                </div>
              </div>
              
              <div className="bg-slate-900/50 rounded-xl p-4 border border-slate-700/50">
                <p className="text-sm text-slate-400">
                  <span className="text-yellow-400 font-semibold">Pro Tip:</span> This recommendation is based on your campaign requirements and our talent database. Feel free to explore individual celebrity profiles for more details.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default AIAssistant;
