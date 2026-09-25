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
  duration = 0.8, // Duration isn't strictly needed for Tailwind unless we use inline styles, but we'll stick to a standard 1000ms tailwind class.
  className = ""
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: "0px" }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const baseStyle = "transition-all duration-[1200ms] ease-out";
  const hiddenStyle = {
    up: "opacity-0 translate-y-24",
    down: "opacity-0 -translate-y-24",
    left: "opacity-0 translate-x-24",
    right: "opacity-0 -translate-x-24",
    none: "opacity-0"
  }[direction];

  const visibleStyle = "opacity-100 translate-y-0 translate-x-0";

  return (
    <div 
      ref={ref} 
      className={`${className} ${baseStyle} ${isVisible ? visibleStyle : hiddenStyle}`}
      style={{ transitionDelay: `${delay}s` }}
    >
      {children}
    </div>
  );
};
