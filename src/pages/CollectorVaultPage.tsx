import React, { useState } from 'react';
import { MOCK_GRADED_CARDS } from '../data/mockCards';
import { MOCK_ORDERS } from '../data/mockOrders';
import { SlabCard } from '../components/common/SlabCard';
import { 
  User, 
  ShieldCheck, 
  TrendingUp, 
  Layers, 
  Package, 
  ArrowRight, 
  Plus, 
  ExternalLink,
  Filter
} from 'lucide-react';

interface CollectorVaultPageProps {
  onNavigate: (path: string) => void;
}

export const CollectorVaultPage: React.FC<CollectorVaultPageProps> = ({ onNavigate }) => {
  const [filterGame, setFilterGame] = useState('ALL');
  const userCards = MOCK_GRADED_CARDS;
  const activeOrder = MOCK_ORDERS[0];

  const totalVaultValue = userCards.reduce((acc, c) => acc + c.declaredValueEur, 0);

  const filteredCards = filterGame === 'ALL'
    ? userCards
    : userCards.filter(c => c.game.toUpperCase().includes(filterGame));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12 text-slate-100">
      
      {/* Vault Profile Header */}
      <div className="p-8 rounded-none bg-charcoal-900 border border-slate-800 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-none bg-gradient-to-tr from-gorilla-600 to-emerald-400 text-charcoal-950 flex items-center justify-center font-display font-extrabold text-lg shadow-lg">
            CM
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded bg-gorilla-500/20 text-gorilla-400 font-mono text-[10px] font-bold">
                VIP COLLECTOR VAULT
              </span>
              <span className="text-xs text-slate-400 font-mono">Member since 2025</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-display font-bold text-white mt-1">
              Carlos Mendes's Vault
            </h1>
            <p className="text-xs text-slate-400 font-mono">
              Madrid, Spain • Gorilla Client ID: #GOR-8821
            </p>
          </div>
        </div>

        <button
          onClick={() => onNavigate('/submit')}
          className="px-6 py-3.5 rounded-none bg-gorilla-500 hover:bg-gorilla-400 text-charcoal-950 font-bold text-xs flex items-center gap-2 shadow-lg shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Submit More Cards</span>
        </button>
      </div>

      {/* Portfolio Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 font-mono">
        <div className="p-5 rounded-none bg-charcoal-900 border border-slate-800 space-y-1">
          <div className="text-xs text-slate-400">Total Portfolio Value</div>
          <div className="text-lg font-bold text-gorilla-400">€{totalVaultValue.toLocaleString()}</div>
          <div className="text-[10px] text-emerald-400 flex items-center gap-1">
            <TrendingUp className="w-3 h-3" />
            <span>+14.2% Past 90 Days</span>
          </div>
        </div>

        <div className="p-5 rounded-none bg-charcoal-900 border border-slate-800 space-y-1">
          <div className="text-xs text-slate-400">Certified Slabs in Vault</div>
          <div className="text-lg font-bold text-white">{userCards.length} Slabs</div>
          <div className="text-[10px] text-slate-400">100% Cryptographically Registered</div>
        </div>

        <div className="p-5 rounded-none bg-charcoal-900 border border-slate-800 space-y-1">
          <div className="text-xs text-slate-400">Pristine 10 Slabs</div>
          <div className="text-lg font-bold text-emerald-400">2 Cards</div>
          <div className="text-[10px] text-slate-400">Pikachu Illustrator & Shanks</div>
        </div>

        <div className="p-5 rounded-none bg-charcoal-900 border border-slate-800 space-y-1">
          <div className="text-xs text-slate-400">Active Submissions</div>
          <div className="text-lg font-bold text-amber-400">1 Order</div>
          <div className="text-[10px] text-amber-400/80">Optical Grading in Progress</div>
        </div>
      </div>

      {/* Active Submission Callout */}
      {activeOrder && (
        <div className="p-6 rounded-none bg-gradient-to-r from-charcoal-900 via-slate-900 to-charcoal-900 border border-amber-500/30 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-xl">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-none bg-amber-400/20 text-amber-300 shrink-0">
              <Package className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded bg-amber-400/20 text-amber-300 font-mono text-[10px] font-bold">
                  ACTIVE SUBMISSION: {activeOrder.status.replace('_', ' ')}
                </span>
                <span className="text-xs font-mono text-slate-400">Order #{activeOrder.id}</span>
              </div>
              <h3 className="font-bold text-base text-white mt-1">
                {activeOrder.items.length} Cards in European Grading Queue
              </h3>
              <p className="text-xs text-slate-400 font-mono">
                Est. Completion: {activeOrder.estimatedCompletion} • Carrier: {activeOrder.carrier}
              </p>
            </div>
          </div>

          <button
            onClick={() => onNavigate('/track')}
            className="px-5 py-2.5 rounded-none bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-mono font-semibold flex items-center gap-1.5 shrink-0 transition-colors"
          >
            <span>View Live Tracking</span>
            <ArrowRight className="w-3.5 h-3.5 text-gorilla-400" />
          </button>
        </div>
      )}

      {/* Graded Slabs Vault Inventory */}
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="font-display font-bold text-lg text-white">
              Slab Inventory
            </h3>
            <p className="text-xs text-slate-400">
              Click on any certified slab to inspect subgrade telemetry, optical defects, and provenance.
            </p>
          </div>

          {/* Game filters */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs font-mono">
            {['ALL', 'POKEMON', 'MAGIC', 'ONE PIECE'].map((game) => (
              <button
                key={game}
                onClick={() => setFilterGame(game)}
                className={`px-3 py-1.5 rounded-none transition-colors ${
                  filterGame === game
                    ? 'bg-gorilla-500 text-charcoal-950 font-bold'
                    : 'bg-charcoal-900 text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                {game}
              </button>
            ))}
          </div>
        </div>

        {/* 3D Slabs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 justify-items-center">
          {filteredCards.map((card) => (
            <div key={card.id} className="w-full flex flex-col items-center">
              <SlabCard
                card={card}
                size="sm"
                onInspect={() => onNavigate('/certificates/demo')}
              />
              <div className="w-full max-w-[260px] mt-3 p-3 rounded-none bg-charcoal-900/80 border border-slate-800 text-xs font-mono flex items-center justify-between">
                <div>
                  <span className="text-slate-400 block text-[10px]">Est. Valuation</span>
                  <span className="font-bold text-white">€{card.declaredValueEur.toLocaleString()}</span>
                </div>
                <button
                  onClick={() => onNavigate('/verify')}
                  className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-gorilla-400 text-[10px] font-semibold"
                >
                  Verify
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
