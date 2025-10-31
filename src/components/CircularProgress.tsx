import React, { useEffect, useRef, useState } from "react";

interface CircularProgressProps {
  /**
   * Optional: className for the wrapper div
   */
  className?: string;
  /**
   * The color class for the progress circle (e.g., 'stroke-green-600')
   */
  colorClass: string;
  /**
   * The value to display in the center 
   */
  value: number | string;
  /**
   * Optional: size in px (default 80)
   */
  size?: number;
}

/**
 * Circular progress indicator with customizable color and value.
 */
export const CircularProgress: React.FC<CircularProgressProps> = ({
  colorClass,
  value,
  size = 80,
  className,
}) => {
  // SVG circle parameters
  const r = 40;
  const cx = 50;
  const cy = 50;
  const strokeWidth = 4;
  const circumference = 2 * Math.PI * r;

  // Animation state for percent (circle)
  const [animatedPercent, setAnimatedPercent] = useState(0);
  const hasAnimated = useRef(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    let observer: IntersectionObserver | null = null;
    function handleIntersect(entries: IntersectionObserverEntry[]) {
      if (entries[0].isIntersecting && !hasAnimated.current) {
        setTimeout(() => {
          setAnimatedPercent(typeof value === 'number' ? value : 0);
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
  }, [value]);

  const dash = (animatedPercent / 100) * circumference;
  return (
    <div
      ref={containerRef}
      className={"relative flex items-center justify-center " + (className || "")}
      style={{ width: size, height: size }}
    >
      <svg className="w-full h-full" viewBox="0 0 100 100">
        <circle
          className="stroke-gray-300"
          strokeWidth={strokeWidth}
          fill="transparent"
          r={r}
          cx={cx}
          cy={cy}
        />
        <circle
          className={colorClass + " transition-all ease-in-out"}
          style={{ transitionDuration: "600ms" }}
          strokeWidth={strokeWidth}
          strokeDasharray={`${dash} ${circumference}`}
          fill="transparent"
          r={r}
          cx={cx}
          cy={cy}
          transform="rotate(-90 50 50)"
        />
      </svg>
    </div>
  );
};
