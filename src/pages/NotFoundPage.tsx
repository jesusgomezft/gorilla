import React from 'react';
import { ShieldAlert, ArrowLeft, Home, Search } from 'lucide-react';

interface NotFoundPageProps {
  onNavigate: (path: string) => void;
}

export const NotFoundPage: React.FC<NotFoundPageProps> = ({ onNavigate }) => {
  return (
    <div className="max-w-xl mx-auto px-4 py-24 text-center space-y-6 text-slate-100">
      <div className="w-16 h-16 rounded-none bg-rose-500/10 border border-rose-500/30 text-rose-400 flex items-center justify-center mx-auto">
        <ShieldAlert className="w-8 h-8" />
      </div>

      <div className="space-y-2">
        <span className="font-mono text-xs text-rose-400 font-bold uppercase tracking-wider">
          404 — REGISTRY RECORD NOT FOUND
        </span>
        <h1 className="text-4xl sm:text-5xl font-display font-extrabold text-white">
          Unregistered Coordinate
        </h1>
        <p className="text-xs text-slate-400 max-w-sm mx-auto leading-relaxed">
          The requested certificate, submission manifest, or grading route could not be verified in the European Gorilla database.
        </p>
      </div>

      <div className="flex items-center justify-center gap-3 pt-4">
        <button
          onClick={() => onNavigate('/')}
          className="px-5 py-2.5 rounded-none bg-gorilla-500 hover:bg-gorilla-400 text-charcoal-950 font-bold text-xs flex items-center gap-2 shadow-lg"
        >
          <Home className="w-4 h-4" />
          <span>Return to Homepage</span>
        </button>
        <button
          onClick={() => onNavigate('/verify')}
          className="px-5 py-2.5 rounded-none bg-slate-800 hover:bg-slate-700 text-slate-300 font-mono text-xs flex items-center gap-2"
        >
          <Search className="w-4 h-4 text-gorilla-400" />
          <span>Search Certificate Registry</span>
        </button>
      </div>
    </div>
  );
};
