import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useTheme } from '../../context/ThemeContext';

interface GradedCardsCounterProps {
  /** 
   * The number of graded cards to display.
   * Currently static — will be connected to database in the future.
   * Should only increment when a card completes the full grading process.
   */
  count?: number;
}

/**
 * GradedCardsCounter — Displays the total number of professionally graded cards.
 * 
 * Designed to integrate subtly into existing layouts (footer, hero, etc.)
 * without creating a new section or competing with primary content.
 * 
 * Future integration:
 * - Connect `count` prop to a Supabase real-time query
 * - Increment only when a card's grading process is fully completed
 */
export const GradedCardsCounter: React.FC<GradedCardsCounterProps> = ({ 
  count = 5000 
}) => {
  const { language } = useLanguage();
  const { theme } = useTheme();
  const isLight = theme === 'light';

  // Format number with locale-appropriate separators
  const formattedCount = count.toLocaleString(language === 'es' ? 'es-ES' : 'en-US');

  return (
    <div className={`w-full mt-5 pt-4 border-t ${isLight ? 'border-[#E5E1D8]' : 'border-white/[0.08]'}`}>
      <div className="flex items-center justify-between mb-1.5">
        <span className={`font-mono text-[9px] uppercase tracking-[0.22em] font-semibold ${
          isLight ? 'text-gray-500' : 'text-gray-400'
        }`}>
          {language === 'es' ? 'CENSO DE EJEMPLARES' : 'CERTIFIED CENSUS'}
        </span>
        <span className={`font-mono text-[9px] tracking-wider uppercase font-semibold ${
          isLight ? 'text-gray-700' : 'text-gray-300'
        }`}>
          ISO-9001 · EU
        </span>
      </div>

      <div className="flex items-baseline gap-2.5">
        <span className={`font-['Oswald'] text-3xl font-bold tracking-tight leading-none ${
          isLight ? 'text-[#111827]' : 'text-white'
        }`}>
          {formattedCount}
        </span>
        <div className="flex flex-col">
          <span className={`font-sans text-[11px] font-bold uppercase tracking-wider leading-tight ${
            isLight ? 'text-gray-900' : 'text-gray-200'
          }`}>
            {language === 'es' ? 'Cartas Certificadas' : 'Graded & Sealed'}
          </span>
          <span className={`font-mono text-[9px] tracking-tight ${
            isLight ? 'text-gray-500' : 'text-gray-400'
          }`}>
            {language === 'es' ? 'Cápsula sónica hermética' : 'Hermetic sonic slab'}
          </span>
        </div>
      </div>
    </div>
  );
};

