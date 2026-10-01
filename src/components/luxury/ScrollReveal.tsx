import React, { useEffect, useRef, useState, ReactNode } from 'react';

interface ScrollRevealProps {
  children: ReactNode;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  delay?: number;
  duration?: number;
  className?: string;
}

export const ScrollReveal: React.FC<ScrollRevealProps> = ({ 
  children, 
  direction = 'up',
  delay = 0,
  duration = 0.7,
  className = ""
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // If IntersectionObserver is unavailable or user prefers reduced motion, reveal immediately
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
      setIsVisible(true);
      return;
    }

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { 
        threshold: 0.02, 
        rootMargin: "0px 0px -40px 0px" 
      }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  // Hardware-accelerated transitions targeted strictly to transform & opacity (zero layout thrashing)
  const baseStyle = "transform-gpu transition-[opacity,transform] ease-[cubic-bezier(0.16,1,0.3,1)]";
  
  const hiddenStyle = {
    up: "opacity-0 translate-y-8",
    down: "opacity-0 -translate-y-8",
    left: "opacity-0 translate-x-8",
    right: "opacity-0 -translate-x-8",
    none: "opacity-0"
  }[direction];

  const visibleStyle = "opacity-100 translate-y-0 translate-x-0";

  return (
    <div 
      ref={ref} 
      className={`${className} ${baseStyle} ${isVisible ? visibleStyle : hiddenStyle}`}
      style={{ 
        transitionDuration: `${duration}s`,
        transitionDelay: `${delay}s`,
        willChange: isVisible ? 'auto' : 'transform, opacity'
      }}
    >
      {children}
    </div>
  );
};

