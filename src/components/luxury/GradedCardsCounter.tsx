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

  // Split digits for individual styling
  const digits = formattedCount.split('');

  return (
    <div className={`w-full mt-5 pt-5 border-t ${isLight ? 'border-[#E5E1D8]' : 'border-white/[0.08]'}`}>
      {/* Label */}
      <span className={`font-sans text-[10px] tracking-[0.2em] uppercase block mb-2.5 font-bold ${
        isLight ? 'text-[#4A5248]' : 'text-[#A4ACA1]'
      }`}>
        {language === 'es' ? 'CARTAS GRADUADAS' : 'CARDS GRADED'}
      </span>

      {/* Counter Row */}
      <div className="flex items-center gap-3">
        {/* Shield icon — brand-native, not generic */}
        <div className={`w-8 h-8 border flex items-center justify-center shrink-0 ${
          isLight 
            ? 'border-[#16A34A]/40 bg-[#16A34A]/10 text-[#16A34A]' 
            : 'border-[#48C765]/25 bg-[#48C765]/[0.06] text-[#48C765]'
        }`}>
          <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
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
                  ? `font-mono text-sm mx-[1px] leading-none ${isLight ? 'text-[#4A5248]' : 'text-[#7A8377]'}`
                  : `font-['Oswald'] text-xl font-bold leading-none w-[18px] text-center inline-block py-0.5 border ${
                      isLight 
                        ? 'bg-white border-[#D5CEC2] text-[#16A34A] shadow-xs' 
                        : 'bg-white/[0.04] border-white/[0.08] text-[#48C765]'
                    }`
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

