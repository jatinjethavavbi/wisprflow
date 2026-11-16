import React, { useEffect, useMemo, useRef, useState } from 'react';
import { gsap } from '../hooks/useGsapAnimations';

interface SmoothTextPathMarqueeProps {
  pathId: string;
  text: string;
  /** SVG speed in user-space units per second (right-to-left) */
  speed: number;
  variant: 'straight' | 'arch';
  viewBoxWidth?: number;
  viewBoxHeight?: number;
  /** Vertical baseline for straight line or left/right edges of arch */
  edgeY?: number;
  /** Vertical peak for arch center */
  peakY?: number;
  fontSize?: number;
  fontWeight?: number;
  fill?: string;
  letterSpacing?: string;
  className?: string;
  /** Initial visual offset fraction (0..1) so text starts nicely centered mid-sentence */
  initialPhase?: number;
}

export const SmoothTextPathMarquee: React.FC<SmoothTextPathMarqueeProps> = ({
  pathId,
  text,
  speed,
  variant,
  viewBoxWidth = 900,
  viewBoxHeight = 180,
  edgeY = 146,
  peakY = 26,
  fontSize = 18,
  fontWeight = 500,
  fill = '#ffffeb',
  letterSpacing = '-0.01em',
  className = 'w-full h-full overflow-visible',
  initialPhase = 0.22,
}) => {
  const measureRef = useRef<SVGTextElement>(null);
  const textPathRef = useRef<SVGTextPathElement>(null);
  const [unitWidth, setUnitWidth] = useState<number>(2900);

  const unit = useMemo(() => `${text}   `, [text]);
  const repeatedText = useMemo(() => `${unit}${unit}${unit}${unit}${unit}`, [unit]);

  // Lead-in straight track off-screen to the left so startOffset always remains strictly > 0
  const leadIn = Math.max(4200, Math.ceil(unitWidth) + 600);
  const tailOut = Math.max(9000, viewBoxWidth + leadIn * 2);

  const pathD = useMemo(() => {
    if (variant === 'straight') {
      return `M ${-leadIn} ${edgeY} L 0 ${edgeY} L ${tailOut} ${edgeY}`;
    }
    const midX = viewBoxWidth / 2;
    return `M ${-leadIn} ${edgeY} L 0 ${edgeY} C ${Math.round(viewBoxWidth * 0.22)} ${edgeY}, ${Math.round(
      viewBoxWidth * 0.32
    )} ${peakY}, ${midX} ${peakY} C ${Math.round(viewBoxWidth * 0.68)} ${peakY}, ${Math.round(
      viewBoxWidth * 0.78
    )} ${edgeY}, ${viewBoxWidth} ${edgeY} L ${tailOut} ${edgeY}`;
  }, [variant, leadIn, tailOut, edgeY, peakY, viewBoxWidth]);

  useEffect(() => {
    let mounted = true;
    const updateWidth = () => {
      if (!mounted || !measureRef.current) return;
      const w = measureRef.current.getComputedTextLength();
      if (w > 100) {
        setUnitWidth(w);
      }
    };

    updateWidth();
    if (typeof document !== 'undefined' && document.fonts?.ready) {
      document.fonts.ready.then(updateWidth);
    }

    return () => {
      mounted = false;
    };
  }, [unit, fontSize, fontWeight, letterSpacing]);

  useEffect(() => {
    const tp = textPathRef.current;
    if (!tp || unitWidth <= 100) return;

    const currentLeadIn = Math.max(4200, Math.ceil(unitWidth) + 600);
    let offset = (unitWidth * initialPhase) % unitWidth;
    tp.setAttribute('startOffset', `${(currentLeadIn - offset).toFixed(2)}`);

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const tick = (_time: number, deltaTime: number) => {
      const dt = Math.min(deltaTime, 50) / 1000;
      offset = (offset + speed * dt) % unitWidth;
      tp.setAttribute('startOffset', `${(currentLeadIn - offset).toFixed(2)}`);
    };

    gsap.ticker.add(tick);
    return () => {
      gsap.ticker.remove(tick);
    };
  }, [unitWidth, speed, initialPhase]);

  const textStyle: React.CSSProperties = {
    fontSize: `${fontSize}px`,
    fontWeight,
    fill,
    fontFamily: 'Figtree, sans-serif',
    letterSpacing,
  };

  return (
    <svg
      viewBox={`0 0 ${viewBoxWidth} ${viewBoxHeight}`}
      preserveAspectRatio="xMidYMid meet"
      className={className}
      aria-hidden="true"
    >
      <defs>
        <path id={pathId} d={pathD} fill="none" />
      </defs>

      {/* Hidden single-unit measurement node in SVG user coordinates */}
      <text
        ref={measureRef}
        x="0"
        y="-9999"
        style={{ ...textStyle, visibility: 'hidden', pointerEvents: 'none' }}
      >
        {unit}
      </text>

      <text style={textStyle}>
        <textPath
          ref={textPathRef}
          href={`#${pathId}`}
          startOffset={`${leadIn}`}
          method="align"
          spacing="auto"
        >
          {repeatedText}
        </textPath>
      </text>
    </svg>
  );
};
