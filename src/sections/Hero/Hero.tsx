import React, { useEffect, useId, useMemo, useRef, useState } from 'react';
import lottie, { AnimationItem } from 'lottie-web';
import { gsap } from '../../hooks/useGsapAnimations';
import heroLottieData from '../../data/heroLottie.json';

interface HeroProps {
  activeMode: 'dictation' | 'notetaker';
  onOpenDownload: () => void;
}

type DetectedOS = 'windows' | 'mac' | 'other';

const RAW_SPEECH_TEXT =
  'Umm, hope your week has started well…I was talking to Cheyene earlier but reception was really bad and I think their going to handle the first part of the project, but I’m not totally sure. Also, I told the team the the new timeline should be ready by Friday, although it’s probably going to slip. There’s been a lot of back and forth and honestly the the whole thing’s been kind of chaotic, like nobody really knows what’s going on so can you check in with them and see if the notes from yesterday’s meeting were sent out, or if they’re still waiting. I think Cheyene mentioned it but didn’t confirm, and now I’m a little lost.';

const POLISHED_SPEECH_TEXT =
  'Hope your week is off to a good start. I was talking to Cheyene earlier, but the reception was really bad. I think they’re going to handle the first part of the project, but I’m not totally sure. I also told the team the new timeline should be ready by Friday — although it might slip. There’s been a lot of back and forth, and honestly, the whole thing has been a bit chaotic. It feels like nobody really knows what’s going on. Can you check in with them and see if the notes from yesterday’s meeting were sent out, or if they’re still waiting? I think Cheyene mentioned it, but didn’t confirm — and now I’m a little lost!';

export const Hero: React.FC<HeroProps> = ({ activeMode, onOpenDownload }) => {
  const uid = useId().replace(/:/g, '');
  const curve1TrackId = `hero-curve1-${uid}`;
  const curve2TrackId = `hero-curve2-${uid}`;

  const heroRootRef = useRef<HTMLDivElement>(null);
  const heroCopyRef = useRef<HTMLElement>(null);
  const curveStageRef = useRef<HTMLDivElement>(null);
  const lottieContainerRef = useRef<HTMLDivElement>(null);

  const measure1Ref = useRef<SVGTextElement>(null);
  const textPath1Ref = useRef<SVGTextPathElement>(null);
  const measure2Ref = useRef<SVGTextElement>(null);
  const textPath2Ref = useRef<SVGTextPathElement>(null);

  const [detectedOS, setDetectedOS] = useState<DetectedOS>('windows');
  const [isMobileNarrow, setIsMobileNarrow] = useState(false);
  const [widths, setWidths] = useState({ w1: 4800, w2: 4600 });

  const rawUnit = useMemo(() => `${RAW_SPEECH_TEXT}   `, []);
  const polishedUnit = useMemo(() => `${POLISHED_SPEECH_TEXT}   `, []);
  const rawRepeated = useMemo(() => `${rawUnit}${rawUnit}${rawUnit}`, [rawUnit]);
  const polishedRepeated = useMemo(() => `${polishedUnit}${polishedUnit}${polishedUnit}`, [polishedUnit]);

  // Detect OS for platform-native CTA label & icon (matching wisprflow.ai)
  useEffect(() => {
    const ua = navigator.userAgent.toLowerCase();
    if (ua.includes('mac') && !ua.includes('iphone') && !ua.includes('ipad')) {
      setDetectedOS('mac');
    } else if (ua.includes('win')) {
      setDetectedOS('windows');
    } else {
      setDetectedOS('windows');
    }
  }, []);

  // Responsive SVG stroke-width, animation speed, and live SVG text measurement
  useEffect(() => {
    const checkWidth = () => {
      setIsMobileNarrow(window.matchMedia('(max-width: 480px)').matches);
      const w1 = measure1Ref.current?.getComputedTextLength() || 0;
      const w2 = measure2Ref.current?.getComputedTextLength() || 0;
      if (w1 > 200 && w2 > 200) {
        setWidths({ w1, w2 });
      }
    };

    checkWidth();
    if (typeof document !== 'undefined' && document.fonts?.ready) {
      document.fonts.ready.then(checkWidth);
    }

    window.addEventListener('resize', checkWidth);
    return () => window.removeEventListener('resize', checkWidth);
  }, []);

  // Mount exact Wispr Flow Lottie waveform & toast animation
  useEffect(() => {
    if (!lottieContainerRef.current) return;
    const anim: AnimationItem = lottie.loadAnimation({
      container: lottieContainerRef.current,
      renderer: 'svg',
      loop: true,
      autoplay: true,
      animationData: heroLottieData,
    });
    return () => {
      anim.destroy();
    };
  }, []);

  // Smooth continuous 60fps SVG textPath scrolling for both hero ribbons
  const leadIn1 = Math.max(12000, Math.ceil(widths.w1) + 1200);
  const leadIn2 = Math.max(12000, Math.ceil(widths.w2) + 1200);

  useEffect(() => {
    const tp1 = textPath1Ref.current;
    const tp2 = textPath2Ref.current;
    if (!tp1 || !tp2) return;

    const dur1 = isMobileNarrow ? 15 : 35;
    const dur2 = isMobileNarrow ? 20 : 50;
    const speed1 = widths.w1 / dur1;
    const speed2 = widths.w2 / dur2;

    const startLen1 = leadIn1 - 0.597656;
    const startLen2 = leadIn2 + 2.04309;

    let offset1 = (widths.w1 * 0.35) % widths.w1;
    let offset2 = (widths.w2 * 0.25) % widths.w2;

    tp1.setAttribute('startOffset', `${(startLen1 - widths.w1 + offset1).toFixed(2)}`);
    tp2.setAttribute('startOffset', `${(startLen2 - widths.w2 + offset2).toFixed(2)}`);

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const tick = (_time: number, deltaTime: number) => {
      const dt = Math.min(deltaTime, 50) / 1000;
      offset1 = (offset1 + speed1 * dt) % widths.w1;
      offset2 = (offset2 + speed2 * dt) % widths.w2;
      tp1.setAttribute('startOffset', `${(startLen1 - widths.w1 + offset1).toFixed(2)}`);
      tp2.setAttribute('startOffset', `${(startLen2 - widths.w2 + offset2).toFixed(2)}`);
    };

    gsap.ticker.add(tick);
    return () => {
      gsap.ticker.remove(tick);
    };
  }, [widths.w1, widths.w2, leadIn1, leadIn2, isMobileNarrow]);

  // GSAP initial stagger + scroll-linked parallax exit as TrustedBy slides in
  useEffect(() => {
    const root = heroRootRef.current;
    if (!root || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const ctx = gsap.context(() => {
      const items = root.querySelectorAll('[data-hero-enter]');
      gsap.fromTo(
        items,
        { opacity: 0, y: 18 },
        {
          opacity: 1,
          y: 0,
          duration: 0.72,
          stagger: 0.08,
          ease: 'power3.out',
          clearProps: 'transform,opacity',
        }
      );

      if (heroCopyRef.current) {
        gsap.to(heroCopyRef.current, {
          y: -36,
          opacity: 0.22,
          ease: 'none',
          scrollTrigger: {
            trigger: root,
            start: 'top top',
            end: 'bottom top',
            scrub: 0.6,
          },
        });
      }

      if (curveStageRef.current) {
        gsap.to(curveStageRef.current, {
          y: 24,
          ease: 'none',
          scrollTrigger: {
            trigger: root,
            start: 'top top',
            end: 'bottom top',
            scrub: 0.6,
          },
        });
      }
    }, heroRootRef);

    return () => ctx.revert();
  }, [activeMode]);

  const ribbonStrokeWidth = isMobileNarrow ? 75 : 30;
  const curve1D = `M ${-leadIn1} 50.924805 L 0.597656 50.924805 C17.4612 143.2965 61.94 299.86 398.60 360.27 C594.00 395.31 772.77 285.92 668.74 149.27 C564.71 12.62 340.74 270.96 667.04 470.42 C719.69 506.55 817.468 561.26 1046.43 565.235`;
  const curve2VisibleD =
    'M2.04309 563.872C111.592 558.268 316.491 554.016 517.963 490.064C703.017 431.323 875.319 444.531 1021.88 453.216';
  const curve2TrackD = `M ${-leadIn2} 563.872 L 2.04309 563.872C111.592 558.268 316.491 554.016 517.963 490.064C703.017 431.323 875.319 444.531 1021.88 453.216`;

  return (
    <div ref={heroRootRef} id="hero" className="relative overflow-x-clip bg-[#ffffeb] text-[#1a1a1a]">
      {/* Top Hero Copy & Primary CTA (z-index: 3 sits cleanly above the curved loop) */}
      <section
        ref={heroCopyRef}
        className="relative z-[3] flex flex-col justify-center pt-10 sm:pt-14 pb-12 sm:pb-20"
      >
        <div className="px-5 sm:px-8 max-w-4xl mx-auto text-center">
          <div
            data-hero-enter
            className="text-xs sm:text-sm font-medium uppercase tracking-[0.08em] text-[#1a1a1a]/70 mb-4 sm:mb-5"
          >
            {activeMode === 'dictation' ? 'WISPR FLOW Dictation' : 'WISPR FLOW Notetaker'}
          </div>

          <h1
            data-hero-enter
            className="font-display text-[3.5rem] sm:text-[5rem] lg:text-[6rem] leading-[0.95] tracking-[-0.03em] font-normal text-[#1a1a1a] mb-6 sm:mb-7"
            style={{ textWrap: 'balance' }}
          >
            {activeMode === 'dictation' ? (
              <>
                Don’t type,
                <br />
                <em className="italic font-normal">just speak.</em>
              </>
            ) : (
              <>
                Every meeting,
                <br />
                <em className="italic font-normal">bot-free notes.</em>
              </>
            )}
          </h1>

          <div className="max-w-lg mx-auto">
            <p
              data-hero-enter
              className="text-lg sm:text-xl leading-snug text-[#1a1a1a] mb-6"
              style={{ textWrap: 'balance' }}
            >
              {activeMode === 'dictation'
                ? 'The voice-to-text AI that turns speech into clear, polished writing in every app.'
                : 'Capture named speakers, topic summaries, and next steps on Zoom, Meet, Teams, and in person.'}
            </p>

            <div data-hero-enter className="flex justify-center mb-5">
              <button
                type="button"
                onClick={onOpenDownload}
                className="inline-flex items-center justify-center gap-2.5 bg-[#f0d7ff] hover:bg-[#e7c4ff] border-2 border-[#1a1a1a] rounded-[0.5rem] px-6 py-4 text-base font-semibold leading-none text-[#1a1a1a] transition-transform duration-200 hover:-translate-y-0.5 cursor-pointer whitespace-nowrap"
              >
                {detectedOS === 'mac' ? (
                  <>
                    <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current shrink-0" aria-hidden="true">
                      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.33c.64-.78 1.08-1.86.96-2.94-.93.04-2.05.62-2.71 1.4-.58.68-1.1 1.78-.96 2.84 1.04.08 2.07-.52 2.71-1.3" />
                    </svg>
                    <span>Download for Mac</span>
                  </>
                ) : (
                  <>
                    <svg viewBox="0 0 20 20" className="w-4 h-4 fill-current shrink-0" aria-hidden="true">
                      <rect x="1" y="1" width="8.2" height="8.2" />
                      <rect x="10.8" y="1" width="8.2" height="8.2" />
                      <rect x="1" y="10.8" width="8.2" height="8.2" />
                      <rect x="10.8" y="10.8" width="8.2" height="8.2" />
                    </svg>
                    <span>Get started on Windows</span>
                  </>
                )}
              </button>
            </div>

            <div data-hero-enter className="text-sm text-[#1a1a1a]/70">
              Available on Mac, Windows, iPhone, and Android
            </div>
          </div>
        </div>
      </section>

      {/* Exact Curved Speech-to-Polished Ribbon + Lottie Centerpiece */}
      <div ref={curveStageRef} className="hero_animation-wrapper-v2">
        {/* Left Half: Raw Speech Loop flowing into the Flow Pill */}
        <div className="hero_animation is-left">
          <svg
            id="hero-svg"
            width="100%"
            height="auto"
            viewBox="0 0 1048 594"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <defs>
              <path id={curve1TrackId} d={curve1D} fill="none" />
            </defs>
            <text
              ref={measure1Ref}
              x="0"
              y="-9999"
              style={{
                fontSize: 'inherit',
                fontWeight: 600,
                fontFamily: 'Figtree, sans-serif',
                visibility: 'hidden',
                pointerEvents: 'none',
              }}
            >
              {rawUnit}
            </text>
            <text
              style={{
                fontSize: 'inherit',
                fontWeight: 600,
                fill: '#1A1A1A',
                opacity: 0.25,
                fontFamily: 'Figtree, sans-serif',
              }}
            >
              <textPath
                ref={textPath1Ref}
                id="marquee-text-hero1"
                href={`#${curve1TrackId}`}
                startOffset={`${leadIn1}`}
                method="align"
                spacing="auto"
                style={{ baselineShift: '-20%' }}
              >
                {rawRepeated}
              </textPath>
            </text>
          </svg>
        </div>

        {/* Center Cream Halo behind Waveform Pill */}
        <div className="hero_animation-lottie-bg" aria-hidden="true" />

        {/* Center Lottie Waveform Pill + Emerald Correction Toasts */}
        <button
          type="button"
          onClick={onOpenDownload}
          aria-label="Download Wispr Flow"
          className="hero_animation-lottie bg-transparent border-0 p-0 cursor-pointer"
        >
          <div ref={lottieContainerRef} className="w-full h-full" />
        </button>

        {/* Right Half: Thick Black Ribbon with Polished Cream Text */}
        <div className="hero_animation is-right">
          <svg
            width="100%"
            height="auto"
            viewBox="0 0 1024 620"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <defs>
              <path id={curve2TrackId} d={curve2TrackD} fill="none" />
            </defs>
            <path
              d={curve2VisibleD}
              stroke="#1A1A1A"
              strokeWidth={ribbonStrokeWidth}
              fill="none"
            />
            <text
              ref={measure2Ref}
              x="0"
              y="-9999"
              style={{
                fontSize: 'inherit',
                fontWeight: 600,
                fontFamily: 'Figtree, sans-serif',
                visibility: 'hidden',
                pointerEvents: 'none',
              }}
            >
              {polishedUnit}
            </text>
            <text
              style={{
                fontSize: 'inherit',
                fontWeight: 600,
                fill: '#FFFFEB',
                fontFamily: 'Figtree, sans-serif',
              }}
            >
              <textPath
                ref={textPath2Ref}
                id="marquee-text-hero2"
                href={`#${curve2TrackId}`}
                startOffset={`${leadIn2}`}
                method="align"
                spacing="auto"
                style={{ baselineShift: '-30%' }}
              >
                {polishedRepeated}
              </textPath>
            </text>
          </svg>
        </div>
      </div>
    </div>
  );
};
