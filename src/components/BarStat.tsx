import React, { useEffect, useRef, useState } from "react";

interface BarStatProps {
  /** Percentage from 0 to 100, mapped to 0px to 60px bar height */
  percentage: number;
  /** Value to display below the bar */
  value: number | string;
  /** Label to display below the value */
  label: string;
  /** Bar color class, e.g. 'bg-blue-900' */
  colorClass?: string;
}

/**
 * Vertical bar with value and label below. Height is 0-60px based on percentage (0-100).
 */
export const BarStat: React.FC<BarStatProps> = ({ percentage, value, label, colorClass = "bg-blue-900" }) => {
  // Clamp percentage between 0 and 100
  const pct = Math.max(0, Math.min(percentage, 100));
  // Animation state for bar height
  const [animatedPercent, setAnimatedPercent] = useState(0);
  const hasAnimated = useRef(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    let observer: IntersectionObserver | null = null;
    function handleIntersect(entries: IntersectionObserverEntry[]) {
      if (entries[0].isIntersecting && !hasAnimated.current) {
        setTimeout(() => {
          setAnimatedPercent(pct);
          hasAnimated.current = true;
        }, 150);
        if (observer) observer.disconnect();
      }
    }
    observer = new window.IntersectionObserver(handleIntersect, { threshold: 0.2 });
    observer.observe(containerRef.current);
    return () => {
      if (observer) observer.disconnect();
    };
  }, [pct]);

  // Map 0-100% to 0-60px
  const height = (animatedPercent / 100) * 60;
  return (
    <div ref={containerRef} className="flex flex-col items-center gap-1">
      <div className={`w-2 transition-all ease-in-out ${colorClass}`} style={{ height: `${height}px`, transitionDuration: "600ms" }}></div>
      <span className="text-xs">{value}</span>
      <span className="text-xs text-gray-600">{label}</span>
    </div>
  );
};
