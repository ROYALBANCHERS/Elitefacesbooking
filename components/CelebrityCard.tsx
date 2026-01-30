
import React from 'react';
import { Celebrity } from '../types';

interface CelebrityCardProps {
  celebrity: Celebrity;
  onBook: (id: string) => void;
}

const CelebrityCard: React.FC<CelebrityCardProps> = ({ celebrity, onBook }) => {
  return (
    <div className="group relative glass rounded-2xl overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-yellow-500/20 hover:-translate-y-2">
      <div className="aspect-[3/4] overflow-hidden relative">
        <img 
          src={celebrity.imageUrl} 
          alt={celebrity.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent opacity-90"></div>
        
        {/* Verified Badge */}
        <div className="absolute top-4 right-4 bg-yellow-500 text-slate-950 px-2 py-1 rounded-full flex items-center space-x-1 shadow-lg">
          <svg className="w-3 h-3 fill-current" viewBox="0 0 20 20">
            <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293l-4 4a1 1 0 01-1.414 0l-2-2a1 1 0 111.414-1.414L9 10.586l3.293-3.293a1 1 0 111.414 1.414z" />
          </svg>
          <span className="text-[10px] font-black uppercase tracking-tighter">Verified</span>
        </div>
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 p-6">
        <div className="flex justify-between items-end mb-2">
          <div>
            <span className="text-xs uppercase tracking-widest text-yellow-500 font-bold mb-1 block">
              {celebrity.category}
            </span>
            <h3 className="text-2xl font-bold text-white leading-tight">
              {celebrity.name}
            </h3>
          </div>
          <div className="text-right">
            <span className="text-xs font-bold text-slate-400 block uppercase tracking-tighter">Followers</span>
            <span className="text-sm font-black text-slate-200">
              {celebrity.followers}
            </span>
          </div>
        </div>
        
        <div className="flex items-center space-x-1 mb-4">
          {[...Array(5)].map((_, i) => (
            <svg 
              key={i} 
              className={`w-4 h-4 ${i < Math.floor(celebrity.rating) ? 'text-yellow-500' : 'text-slate-600'}`} 
              fill="currentColor" 
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ))}
          <span className="text-xs text-slate-400 ml-1">({celebrity.rating})</span>
        </div>

        <button 
          onClick={() => onBook(celebrity.id)}
          className="w-full py-3 px-4 btn-gold text-slate-950 font-bold rounded-lg text-sm tracking-wide"
        >
          REQUEST BOOKING
        </button>
      </div>
    </div>
  );
};

export default CelebrityCard;
