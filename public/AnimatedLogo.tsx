import React, { useEffect, useRef, useState } from "react";

const mainRect = { x: 13.4009 - 3.1, y: 28.1895 - 3.3, width: 23.9876 + 6.3, height: 6.1195 + 6.5 };
const secondaryRect = { width: 6.0986, height: 6.5275 };

// Points are the centers along the main rect's border (clockwise)
const points = [
  { x: mainRect.x + mainRect.width, y: mainRect.y },
  // Right edge (top to bottom)
  { x: mainRect.x + mainRect.width, y: mainRect.y + mainRect.height },
  // Bottom edge (right to left)
  { x: mainRect.x, y: mainRect.y + mainRect.height },
  // Left edge (bottom to top)
  { x: mainRect.x, y: mainRect.y },
  // Top edge (left to right)
  { x: mainRect.x, y: mainRect.y },
];

function interpolate(p1: any, p2: any, t: number) {
  return {
    x: p1.x + (p2.x - p1.x) * t,
    y: p1.y + (p2.y - p1.y) * t,
  };
}

export default function AnimatedLogo() {
  const [center, setCenter] = useState(points[0]);
  const progressRef = useRef(0);

  useEffect(() => {
    let running = true;
    const speed = 0.05; // Adjust for animation speed

    function animate() {
      if (!running) return;
      progressRef.current += speed;
      if (progressRef.current >= points.length - 1) progressRef.current -= (points.length - 1);

      const idx = Math.floor(progressRef.current);
      const nextIdx = (idx + 1) % (points.length - 1);
      const t = progressRef.current - idx;
      setCenter(interpolate(points[idx], points[nextIdx], t));
      requestAnimationFrame(animate);
    }
    animate();
    return () => { running = false; };
  }, []);

  // Convert center to top-left for rect
  const rectX = center.x - secondaryRect.width / 2;
  const rectY = center.y - secondaryRect.height / 2;

  return (
    <svg width="56" height="56" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="56" height="56" rx="8" fill="#181D27" />
      <path d="M37.3885 28.1895H13.4009V34.309H37.3885V28.1895Z" fill="#14EA73" id="main" />
      <rect
        x={rectX}
        y={rectY}
        width={secondaryRect.width}
        height={secondaryRect.height}
        fill="#14EA73"
        id="secondary"
      />
    </svg>
  );
}