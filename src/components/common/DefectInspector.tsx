import React, { useState } from 'react';
import { GradedCard, CardDefect } from '../../types';
import { useLanguage } from '../../context/LanguageContext';

interface DefectInspectorProps {
  card: GradedCard;
}

type TabType = 'Global' | 'Centering' | 'Corners' | 'Edges' | 'Surface';

export const DefectInspector: React.FC<DefectInspectorProps> = ({ card }) => {
  const { language } = useLanguage();
  const [activeTab, setActiveTab] = useState<TabType>('Global');
  const [selectedDefect, setSelectedDefect] = useState<CardDefect | null>(null);

  const tabs: { id: TabType; label: string; score: number }[] = [
    { id: 'Global', label: 'Global', score: card.grade },
    { id: 'Centering', label: 'Centering', score: card.subgrades.centering.score },
    { id: 'Corners', label: 'Corners', score: card.subgrades.corners.score },
    { id: 'Edges', label: 'Edges', score: card.subgrades.edges.score },
    { id: 'Surface', label: 'Surface', score: card.subgrades.surface.score },
  ];

  const visibleDefects = activeTab === 'Global' 
    ? card.defects 
    : card.defects.filter(d => d.category === activeTab);

  return (
    <div className="w-full flex flex-col border-t border-white/10 pt-12">
      
      {/* Header */}
      <div className="flex flex-col mb-8">
        <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-white/30 mb-2">
          {language === 'es' ? 'Inspector de Defectos' : 'Defect Inspector'}
        </span>
        <h3 className="font-['Oswald'] text-lg text-white uppercase tracking-wide">
          {language === 'es' ? 'Mapeo Óptico de Anomalías' : 'Optical Anomaly Mapping'}
        </h3>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-4 mb-8">
        {tabs.map(({ id, label }) => {
          const isActive = activeTab === id;
          return (
            <button
              key={id}
              onClick={() => {
                setActiveTab(id);
                setSelectedDefect(null);
              }}
              className={`pb-1 font-mono text-[10px] tracking-[0.15em] uppercase border-b-2 transition-colors ${
                isActive 
                  ? 'border-[#48C765] text-white' 
                  : 'border-transparent text-[#A4ACA1] hover:text-white'
              }`}
            >
              {label}
            </button>
          );
        })}
      </div>

      {/* Main Layout: Map + Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
        
        {/* The Card Blueprint */}
        <div className="relative w-full aspect-[2.5/3.5] border border-white/10 p-4">
          {/* Corner brackets */}
          <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-white/30" />
          <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-white/30" />
          <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-white/30" />
          <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-white/30" />

          {/* Grid lines */}
          <div className="absolute top-1/2 left-0 right-0 border-t border-dashed border-white/10" />
          <div className="absolute left-1/2 top-0 bottom-0 border-l border-dashed border-white/10" />

          {/* The Image (Desaturated) */}
          <div className="relative w-full h-full overflow-hidden bg-[#454545]">
            <img
              src={card.frontImage}
              alt={card.name}
              className="w-full h-full object-cover opacity-30 grayscale contrast-125"
            />
            
            {/* Defect Markers */}
            {visibleDefects.map((defect) => {
              const isSelected = selectedDefect?.id === defect.id;
              
              return (
                <button
                  key={defect.id}
                  onClick={() => setSelectedDefect(defect)}
                  className="absolute -translate-x-1/2 -translate-y-1/2 z-20 group"
                  style={{ left: `${defect.x}%`, top: `${defect.y}%` }}
                >
                  {/* Minimal Crosshair marker */}
                  <div className={`relative flex items-center justify-center w-6 h-6 transition-transform ${isSelected ? 'scale-125' : ''}`}>
                    <div className={`absolute w-full h-[1px] ${isSelected ? 'bg-[#C22F2F]' : 'bg-[#48C765]'}`} />
                    <div className={`absolute h-full w-[1px] ${isSelected ? 'bg-[#C22F2F]' : 'bg-[#48C765]'}`} />
                    <div className={`w-1.5 h-1.5 rounded-none z-10 ${isSelected ? 'bg-[#C22F2F]' : 'bg-[#48C765]'}`} />
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Selected Defect Info (Editorial Style) */}
        <div className="flex flex-col">
          {selectedDefect ? (
            <div className="flex flex-col gap-6">
              <div className="pb-4 border-b border-white/10 flex items-center justify-between">
                <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-[#C22F2F]">
                  Defect Found // {selectedDefect.category}
                </span>
                <span className="font-mono text-[10px] tracking-widest text-white/30">
                  X:{selectedDefect.x}% Y:{selectedDefect.y}%
                </span>
              </div>
              
              <h4 className="font-['Oswald'] text-lg font-bold uppercase text-white leading-tight">
                {selectedDefect.title}
              </h4>
              
              <p className="font-sans text-sm text-white/50 leading-relaxed">
                {selectedDefect.description}
              </p>

              <div className="mt-8 flex items-center justify-between p-4 bg-white/[0.02] border border-white/5">
                <span className="font-mono text-[10px] tracking-widest uppercase text-[#A4ACA1]">
                  Score Impact
                </span>
                <span className="font-['Oswald'] text-lg font-bold text-[#C22F2F]">
                  -{selectedDefect.deduction.toFixed(1)}
                </span>
              </div>
            </div>
          ) : (
            <div className="h-full flex items-center justify-center min-h-[300px]">
              <p className="font-mono text-[10px] text-white/30 uppercase tracking-[0.2em] max-w-[200px] text-center leading-loose">
                {visibleDefects.length > 0 
                  ? 'Select a crosshair marker on the blueprint to view anomaly details.'
                  : `No anomalies detected in the ${activeTab} category.`}
              </p>
            </div>
          )}
        </div>
      </div>

    </div>
  );
};
