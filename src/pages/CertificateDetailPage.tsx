import React, { useState } from 'react';
import { MOCK_GRADED_CARDS } from '../data/mockCards';
import { SlabCard } from '../components/common/SlabCard';
import { DefectInspector } from '../components/common/DefectInspector';
import { 
  ShieldCheck, 
  QrCode, 
  Printer, 
  Share2, 
  ArrowLeft, 
  Award, 
  FileText, 
  CheckCircle2, 
  Copy,
  ExternalLink
} from 'lucide-react';

interface CertificateDetailPageProps {
  onNavigate: (path: string) => void;
  certId?: string;
}

export const CertificateDetailPage: React.FC<CertificateDetailPageProps> = ({ 
  onNavigate, 
  certId = 'GG-892401' 
}) => {
  const [copied, setCopied] = useState(false);
  const card = MOCK_GRADED_CARDS.find(c => c.certNumber === certId) || MOCK_GRADED_CARDS[0];

  const handleCopyLink = () => {
    navigator.clipboard?.writeText?.(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12 text-slate-100">
      
      {/* Top Bar Navigation */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <button
          onClick={() => onNavigate('/verify')}
          className="inline-flex items-center gap-2 text-xs font-mono text-slate-400 hover:text-gorilla-400 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Certificate Registry Search</span>
        </button>

        <div className="flex items-center gap-3">
          <button
            onClick={handleCopyLink}
            className="px-3.5 py-2 rounded-none bg-slate-800 hover:bg-slate-700 text-xs font-mono text-slate-300 flex items-center gap-1.5 transition-colors"
          >
            <Share2 className="w-3.5 h-3.5 text-gorilla-400" />
            <span>{copied ? 'Link Copied!' : 'Share Cert'}</span>
          </button>

          <button
            onClick={() => window.print()}
            className="px-3.5 py-2 rounded-none bg-slate-800 hover:bg-slate-700 text-xs font-mono text-slate-300 flex items-center gap-1.5 transition-colors"
          >
            <Printer className="w-3.5 h-3.5 text-gorilla-400" />
            <span>Print Dossier</span>
          </button>
        </div>
      </div>

      {/* Official Certificate Header Plaque */}
      <div className="p-8 rounded-none bg-gradient-to-r from-charcoal-900 via-charcoal-850 to-charcoal-900 border border-slate-800 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gorilla-500/5 rounded-none blur-3xl pointer-events-none" />

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 relative z-10">
          
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-none bg-gorilla-500/20 text-gorilla-400 font-mono text-xs font-bold border border-gorilla-500/40">
                OFFICIAL EUROPEAN CERTIFICATE DOSSIER
              </span>
              <span className="font-mono text-xs text-slate-400">
                Issued: {card.certDate}
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-lg font-display font-extrabold text-white">
              {card.name}
            </h1>

            <p className="text-sm text-slate-300 font-mono">
              {card.year} • {card.set} • #{card.cardNumber} • {card.game} ({card.language})
            </p>

            <div className="text-xs text-slate-400 font-mono">
              Laboratory Authority: <strong className="text-slate-200">{card.verifier}</strong>
            </div>
          </div>

          {/* Big Grade Emblem */}
          <div className="p-6 rounded-none bg-charcoal-950/90 border border-gorilla-500/60 shadow-xl flex items-center gap-6 shrink-0">
            <div className="text-center font-mono">
              <div className="text-[10px] text-slate-400 uppercase tracking-wider">Final Certified Grade</div>
              <div className="text-lg font-display font-extrabold text-gorilla-400 leading-none my-1">
                {card.grade.toFixed(1)}
              </div>
              <div className="text-xs font-bold text-white uppercase">{card.gradeLabel}</div>
            </div>

            <div className="border-l border-slate-800 pl-5 text-right font-mono text-xs space-y-1">
              <div>Centering: <strong className="text-gorilla-400">{card.subgrades.centering.score.toFixed(1)}</strong></div>
              <div>Corners: <strong className="text-gorilla-400">{card.subgrades.corners.score.toFixed(1)}</strong></div>
              <div>Edges: <strong className="text-gorilla-400">{card.subgrades.edges.score.toFixed(1)}</strong></div>
              <div>Surface: <strong className="text-gorilla-400">{card.subgrades.surface.score.toFixed(1)}</strong></div>
            </div>
          </div>

        </div>
      </div>

      {/* Main Grid: 3D Slab + Optical Defect Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        <div className="lg:col-span-5 flex justify-center">
          <SlabCard card={card} size="lg" />
        </div>

        <div className="lg:col-span-7 space-y-8">
          <DefectInspector card={card} />

          {/* Tamper Proof Security & NFC Record */}
          <div className="p-6 rounded-none bg-charcoal-900 border border-slate-800 space-y-3 font-mono text-xs">
            <div className="flex items-center gap-2 text-gorilla-400 font-bold">
              <ShieldCheck className="w-4 h-4" />
              <span>CRYPTOGRAPHIC LEDGER INTEGRITY</span>
            </div>
            <p className="text-slate-400 text-[11px] leading-relaxed">
              This card was authenticated using non-destructive spectral wavelength analysis and encapsulated in an ultrasonic hermetic acrylic case. The unique security hash matches the European central vault ledger.
            </p>
            <div className="p-3 rounded-none bg-charcoal-950 border border-slate-800 text-[10px] text-slate-500 break-all">
              SHA256: {card.securityHash}
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};
