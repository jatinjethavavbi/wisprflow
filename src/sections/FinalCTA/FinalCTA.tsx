import React, { useEffect, useRef, useState } from 'react';
import { Container } from '../../components/Container';
import {
  useParallax,
  useScrollCorners,
  useTextReveal,
} from '../../hooks/useGsapAnimations';

interface FinalCTAProps {
  onOpenDownload: () => void;
}

export const FinalCTA: React.FC<FinalCTAProps> = ({ onOpenDownload }) => {
  const frameRef = useRef<HTMLDivElement>(null);
  const bgImgRef = useRef<HTMLImageElement>(null);
  const copyRef = useRef<HTMLDivElement>(null);
  const [isMac, setIsMac] = useState(false);

  useScrollCorners(frameRef, 56, 28);
  useParallax(bgImgRef, frameRef, { yPercent: 10, scaleFrom: 1.14, scaleTo: 1.05, scrub: 0.9 });
  useTextReveal(copyRef, { stagger: 0.1, start: 'top 84%' });

  useEffect(() => {
    const ua = navigator.userAgent.toLowerCase();
    setIsMac(ua.includes('mac') && !ua.includes('iphone') && !ua.includes('ipad'));
  }, []);

  return (
    <section id="download" className="px-2 sm:px-3 pb-6 bg-[#ffffeb]">
      <div
        ref={frameRef}
        className="relative w-full max-w-[96rem] mx-auto rounded-[2rem] sm:rounded-[3.5rem] overflow-hidden bg-[#1a1a1a] text-[#ffffeb] min-h-[34rem] sm:min-h-[42rem] lg:min-h-[46rem] flex items-center justify-center py-20 sm:py-28"
      >
        <img
          ref={bgImgRef}
          src="/src/assets/images/final_cta_atmosphere_1794805452889.jpg"
          alt="Warm golden forest atmosphere"
          loading="lazy"
          referrerPolicy="no-referrer"
          className="absolute inset-0 w-full h-full object-cover object-center will-change-transform"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.42)_0%,rgba(0,0,0,0.22)_65%,rgba(0,0,0,0.34)_100%)]"
        />

        <Container className="relative z-10 text-center">
          <div ref={copyRef}>
            <h2
              data-reveal-line
              className="font-display text-4xl sm:text-6xl lg:text-[5.25rem] leading-[0.94] tracking-[-0.02em] max-w-4xl mx-auto mb-6 drop-shadow-[0_2px_20px_rgba(0,0,0,0.28)]"
            >
              You have a way with
              <br />
              words. Now, <em className="italic font-normal">two.</em>
            </h2>

            <p
              data-reveal-line
              className="text-sm sm:text-[15.5px] font-medium text-[#ffffeb]/95 max-w-[30rem] mx-auto leading-[1.45] mb-7 drop-shadow-[0_1px_12px_rgba(0,0,0,0.3)]"
            >
              Talk thoughts into writing with Flow and conversations into meeting notes with Notetaker. Both are in one app, free.
            </p>

            <div data-reveal-line>
              <button
                type="button"
                onClick={onOpenDownload}
                className="inline-flex items-center justify-center gap-2 bg-[#f0d7ff] hover:bg-[#e7c4ff] border border-[#1a1a1a] rounded-[0.45rem] px-5 py-3 text-[13.5px] font-semibold text-[#1a1a1a] transition-transform duration-200 hover:-translate-y-0.5 cursor-pointer whitespace-nowrap"
              >
                {isMac ? (
                  <>
                    <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-current shrink-0" aria-hidden="true">
                      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.33c.64-.78 1.08-1.86.96-2.94-.93.04-2.05.62-2.71 1.4-.58.68-1.1 1.78-.96 2.84 1.04.08 2.07-.52 2.71-1.3" />
                    </svg>
                    <span>Download for Mac</span>
                  </>
                ) : (
                  <>
                    <svg viewBox="0 0 20 20" className="w-3.5 h-3.5 fill-current shrink-0" aria-hidden="true">
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
          </div>
        </Container>
      </div>
    </section>
  );
};
