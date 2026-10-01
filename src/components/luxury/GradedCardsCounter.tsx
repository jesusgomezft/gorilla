import React from 'react';
import { useLanguage } from '../../context/LanguageContext';

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

  // Format number with locale-appropriate separators
  const formattedCount = count.toLocaleString(language === 'es' ? 'es-ES' : 'en-US');

  // Split digits for individual styling
  const digits = formattedCount.split('');

  return (
    <div className="w-full mt-5 pt-5 border-t border-white/[0.06]">
      {/* Label */}
      <span className="font-sans text-[10px] tracking-[0.2em] text-[#5A6357] uppercase block mb-2.5">
        {language === 'es' ? 'CARTAS GRADUADAS' : 'CARDS GRADED'}
      </span>

      {/* Counter Row */}
      <div className="flex items-center gap-3">
        {/* Shield icon — brand-native, not generic */}
        <div className="w-8 h-8 border border-[#48C765]/25 bg-[#48C765]/[0.06] flex items-center justify-center shrink-0">
          <svg className="w-3.5 h-3.5 text-[#48C765]" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2L3 7v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-9-5zm-1 15l-4-4 1.41-1.41L11 14.17l6.59-6.59L19 9l-8 8z" />
          </svg>
        </div>

        {/* Digit blocks */}
        <div className="flex items-baseline gap-[3px]">
          {digits.map((char, i) => (
            <span
              key={i}
              className={
                char === '.' || char === ','
                  ? "font-mono text-sm text-[#5A6357] mx-[1px] leading-none"
                  : "font-['Oswald'] text-xl font-bold text-[#48C765] leading-none w-[18px] text-center inline-block bg-white/[0.02] border border-white/[0.05] py-0.5"
              }
            >
              {char}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};
