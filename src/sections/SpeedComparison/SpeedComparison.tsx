import React, { useRef } from 'react';
import { Container } from '../../components/Container';
import { SmoothTextPathMarquee } from '../../components/SmoothTextPathMarquee';
import { SPEED_DEMO_TEXT } from '../../data/features';
import {
  useScrollCorners,
  useScrollReveal,
  useTextReveal,
} from '../../hooks/useGsapAnimations';

const SPEED_PILL_BARS = [42, 76, 98, 56, 88, 50, 94, 68, 44, 72];

export const SpeedComparison: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useScrollCorners(sectionRef, 72, 40);
  useTextReveal(headerRef, { stagger: 0.09, start: 'top 86%' });
  useScrollReveal(cardsRef, {
    selector: '[data-speed-card]',
    y: 26,
    scale: 0.96,
    stagger: 0.12,
    duration: 0.72,
    start: 'top 86%',
  });

  return (
    <section
      ref={sectionRef}
      id="speed-comparison-mobile"
      className="relative z-20 bg-[#034f46] text-[#ffffeb] rounded-[2.5rem] sm:rounded-[4.5rem] pt-16 sm:pt-24 pb-20 sm:pb-28 overflow-hidden"
    >
      <Container>
        <div ref={headerRef} className="max-w-3xl mx-auto text-center mb-10 sm:mb-14">
          <h2
            data-reveal-line
            className="font-display text-4xl sm:text-6xl leading-[0.94] tracking-tight mb-4"
            style={{ textWrap: 'balance' }}
          >
            4x faster <em className="italic font-normal">than typing</em>
          </h2>
          <p
            data-reveal-line
            className="text-base sm:text-xl text-[#ffffeb]/85 max-w-xl mx-auto leading-relaxed"
          >
            Voice that finally works is here. Flow lets you create, code, message, and write at the speed of thought, 4x faster than your keyboard.
          </p>
        </div>

        {/* Mobile / Tablet Comparison Cards */}
        <div ref={cardsRef} className="grid gap-4 max-w-xl mx-auto items-stretch">
          {/* Card 1: Keyboard 45 wpm */}
          <div
            data-speed-card
            className="rounded-[1.85rem] border-[2.5px] border-[#ffffeb]/18 bg-[#034f46] flex flex-col justify-between min-h-[16rem] py-9 overflow-hidden relative"
          >
            <div className="text-center px-6">
              <div className="text-[0.95rem] font-medium text-[#ffffeb]/95 leading-tight mb-0.5">
                Keyboard
              </div>
              <div className="font-display text-4xl font-normal text-[#ffffeb] leading-[1.02]">
                45 wpm
              </div>
            </div>

            <div className="w-full overflow-hidden my-auto pt-4">
              <SmoothTextPathMarquee
                pathId="keyboard-straight-mobile"
                text={SPEED_DEMO_TEXT}
                speed={38}
                variant="straight"
                viewBoxWidth={560}
                viewBoxHeight={56}
                edgeY={32}
                fontSize={16.5}
                fontWeight={500}
                fill="rgba(255, 255, 235, 0.46)"
                initialPhase={0.34}
                className="w-full aspect-[560/56] overflow-visible"
              />
            </div>
          </div>

          {/* Card 2: Flow 220 wpm */}
          <div
            data-speed-card
            className="relative rounded-[1.85rem] overflow-hidden min-h-[22rem] flex flex-col justify-between pt-9 pb-10 shadow-2xl"
          >
            <img
              src="/src/assets/images/elena_verna_portrait_1794805451854.jpg"
              alt=""
              loading="lazy"
              referrerPolicy="no-referrer"
              className="absolute inset-0 w-full h-full object-cover object-top scale-125 blur-[5px] brightness-[0.9] saturate-[1.15]"
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-b from-[#1a2228]/20 via-transparent to-[#1a120a]/55"
            />

            <div className="relative z-10 text-center px-6">
              <div className="text-[0.95rem] font-medium text-[#ffffeb] leading-tight mb-0.5">
                Flow
              </div>
              <div className="font-display text-4xl font-normal text-[#ffffeb] leading-[1.02]">
                220 wpm
              </div>
            </div>

            {/* Smooth Infinite Curved Flowing Text Arch */}
            <div className="relative z-10 w-full overflow-hidden my-1">
              <SmoothTextPathMarquee
                pathId="flow-fast-curve-mobile"
                text={SPEED_DEMO_TEXT}
                speed={186}
                variant="arch"
                viewBoxWidth={560}
                viewBoxHeight={145}
                edgeY={110}
                peakY={24}
                fontSize={16.5}
                fontWeight={500}
                fill="#ffffff"
                initialPhase={0.18}
                className="w-full aspect-[560/145] overflow-visible"
              />
            </div>

            {/* Centered Dark Flow Waveform Pill */}
            <div className="relative z-10 flex justify-center px-6">
              <div className="inline-flex items-center justify-center px-4 py-2 rounded-full bg-[#1a1a1a] border-[1.5px] border-[#ffffeb]/90 shadow-xl">
                <div className="flex items-center gap-[3px] h-4" aria-hidden="true">
                  {SPEED_PILL_BARS.map((h, i) => (
                    <span
                      key={i}
                      className="w-[2.5px] rounded-full bg-[#ffffeb]"
                      style={{
                        height: `${h}%`,
                        animation: `pulse ${0.62 + (i % 4) * 0.14}s ease-in-out ${(i * 0.08).toFixed(2)}s infinite alternate`,
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};
