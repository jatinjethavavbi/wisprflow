import React, { useEffect, useRef } from 'react';
import { Container } from '../../components/Container';
import { AppLink, useRouter } from '../../context/RouterContext';
import { FOOTER_COLUMNS, LEGAL_LINKS } from '../../data/footer';
import { gsap, useScrollReveal } from '../../hooks/useGsapAnimations';

interface FooterProps {
  onOpenDownload?: (mode: 'dictation' | 'notetaker') => void;
}

const WAVE_BARS = [
  { x: 0, y: 12, height: 330 },
  { x: 82, y: 152, height: 154 },
  { x: 164, y: 66, height: 216 },
  { x: 246, y: 152, height: 154 },
  { x: 328, y: 12, height: 330 },
];

export const Footer: React.FC<FooterProps> = () => {
  const colsRef = useRef<HTMLDivElement>(null);
  const wordmarkRef = useRef<HTMLDivElement>(null);
  const barsRef = useRef<Array<SVGRectElement | null>>([]);
  const { pathname, navigate } = useRouter();

  useScrollReveal(colsRef, {
    selector: '[data-footer-col]',
    y: 18,
    stagger: 0.07,
    duration: 0.62,
    start: 'top 90%',
  });
  useScrollReveal(wordmarkRef, {
    y: 36,
    duration: 0.85,
    start: 'top 94%',
  });

  // One-time entrance wave animation across the 5 giant footer bars (plays once only)
  useEffect(() => {
    const rects = barsRef.current.filter((el): el is SVGRectElement => el !== null);
    if (rects.length === 0 || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const ctx = gsap.context(() => {
      gsap.set(rects, { transformOrigin: '50% 50%', scaleY: 0.18, opacity: 0 });
      gsap.to(rects, {
        scaleY: 1,
        opacity: 1,
        duration: 0.82,
        stagger: 0.075,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: wordmarkRef.current,
          start: 'top 92%',
          once: true,
        },
      });
    }, wordmarkRef);

    return () => ctx.revert();
  }, []);

  const handleBrandClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (pathname !== '/') {
      navigate('/');
      window.setTimeout(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 60);
      return;
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const primaryLegal = LEGAL_LINKS.slice(0, 3);
  const secondaryLegal = LEGAL_LINKS.slice(3);

  return (
    <footer className="bg-[#ffffeb] text-[#1a1a1a] pt-10 sm:pt-16 pb-10 sm:pb-12">
      <Container maxWidth="wide">
        {/* 4-Column Footer Navigation Links */}
        <div
          ref={colsRef}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 sm:gap-12 pb-12 sm:pb-16"
        >
          {FOOTER_COLUMNS.map((col) => (
            <div key={col.heading} data-footer-col>
              <h4 className="text-[11px] sm:text-xs font-mono uppercase tracking-[0.14em] text-[#787D6D] font-semibold mb-4 sm:mb-5">
                {col.heading}
              </h4>
              <ul className="space-y-2 sm:space-y-2.5">
                {col.links.map((link) => {
                  const isPricing = link.label === 'Pricing';
                  return (
                    <li key={link.label}>
                      <AppLink
                        to={link.href}
                        className={`group inline-flex items-center gap-1.5 text-[13px] sm:text-[14px] font-normal transition-all duration-200 ${
                          isPricing
                            ? 'text-[#008272] hover:text-[#065B50] font-medium'
                            : 'text-[#1A1A1A]/85 hover:text-[#034F46] hover:translate-x-0.5'
                        }`}
                      >
                        <span>{link.label}</span>
                        {isPricing && (
                          <span className="inline-block transition-transform duration-200 group-hover:translate-x-1 font-sans">
                            →
                          </span>
                        )}
                      </AppLink>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>

        {/* Full-Width Giant Interactive Brand Wordmark (|ılı| Flow) */}
        <div ref={wordmarkRef} className="py-4 sm:py-8 overflow-hidden">
          <button
            type="button"
            onClick={handleBrandClick}
            aria-label="Scroll to top"
            className="w-full block text-[#1a1a1a] cursor-pointer focus:outline-none group"
          >
            <svg
              viewBox="0 0 1260 354"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full h-auto block select-none transition-opacity duration-200 group-hover:opacity-90"
              aria-hidden="true"
            >
              {WAVE_BARS.map((bar, idx) => (
                <rect
                  key={bar.x}
                  ref={(el) => {
                    barsRef.current[idx] = el;
                  }}
                  x={bar.x}
                  y={bar.y}
                  width="50"
                  height={bar.height}
                  rx="25"
                  fill="currentColor"
                />
              ))}

              <text
                x="518"
                y="298"
                fill="currentColor"
                style={{
                  fontFamily: 'Figtree, sans-serif',
                  fontWeight: 700,
                  fontSize: '335px',
                  letterSpacing: '-12px',
                }}
              >
                Flow
              </text>
            </svg>
          </button>
        </div>

        {/* Bottom Copyright, Two-Line Legal Links, and 5 Social Icons */}
        <div className="pt-8 sm:pt-10 flex flex-col md:flex-row items-start md:items-end justify-between gap-6">
          <div className="text-[13px]">
            <div className="flex flex-wrap items-center gap-x-5 gap-y-1.5 font-medium text-[#1a1a1a]">
              <span>© Wispr Flow {new Date().getFullYear()}</span>
              {primaryLegal.map((item) => (
                <AppLink
                  key={item.label}
                  to={item.href}
                  className="hover:text-[#034f46] transition-colors"
                >
                  {item.label}
                </AppLink>
              ))}
            </div>
            <div className="flex flex-wrap items-center gap-x-5 gap-y-1.5 mt-2 font-normal text-[#1a1a1a]/60">
              {secondaryLegal.map((item) => (
                <AppLink
                  key={item.label}
                  to={item.href}
                  className="hover:text-[#1a1a1a] transition-colors"
                >
                  {item.label}
                </AppLink>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-4 text-[#1a1a1a] shrink-0">
            {/* YouTube */}
            <AppLink
              to="/blog"
              aria-label="YouTube"
              className="p-1 hover:text-[#034f46] transition-colors"
            >
              <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current" aria-hidden="true">
                <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 0 0 .5 6.2 31.4 31.4 0 0 0 0 12a31.4 31.4 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 0 0 2.1-2.1A31.4 31.4 0 0 0 24 12a31.4 31.4 0 0 0-.5-5.8zM9.6 15.6V8.4l6.3 3.6-6.3 3.6z" />
              </svg>
            </AppLink>

            {/* Crunchbase */}
            <AppLink
              to="/about"
              aria-label="Crunchbase"
              className="p-1 hover:text-[#034f46] transition-colors"
            >
              <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" aria-hidden="true">
                <rect x="2" y="2" width="20" height="20" rx="3" fill="currentColor" />
                <text
                  x="12"
                  y="15.5"
                  textAnchor="middle"
                  fill="#ffffeb"
                  fontSize="10.5"
                  fontWeight="700"
                  fontFamily="Figtree, sans-serif"
                >
                  cb
                </text>
              </svg>
            </AppLink>

            {/* Instagram */}
            <AppLink
              to="/media-kit"
              aria-label="Instagram"
              className="p-1 hover:text-[#034f46] transition-colors"
            >
              <svg
                viewBox="0 0 24 24"
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
              </svg>
            </AppLink>

            {/* X */}
            <AppLink
              to="/about"
              aria-label="X"
              className="p-1 hover:text-[#034f46] transition-colors"
            >
              <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current" aria-hidden="true">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </AppLink>

            {/* LinkedIn */}
            <AppLink
              to="/careers"
              aria-label="LinkedIn"
              className="p-1 hover:text-[#034f46] transition-colors"
            >
              <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current" aria-hidden="true">
                <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
              </svg>
            </AppLink>
          </div>
        </div>
      </Container>
    </footer>
  );
};
