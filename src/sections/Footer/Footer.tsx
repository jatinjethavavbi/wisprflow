import React, { useEffect, useRef } from 'react';
import { Container } from '../../components/Container';
import { AppLink, useRouter } from '../../context/RouterContext';
import { FOOTER_COLUMNS } from '../../data/footer';
import { gsap, useScrollReveal } from '../../hooks/useGsapAnimations';
import flowbarGraphic from '../../assets/images/flowbar_graphic.svg';
import transcriptNewGraphic from '../../assets/images/transcript_new_graphic.png';

interface FooterProps {
  onOpenDownload?: (mode: 'dictation' | 'notetaker') => void;
}

const WAVE_BARS = [
  { x: 0, y: 10, width: 44, height: 300, rx: 22 },
  { x: 70, y: 170, width: 44, height: 140, rx: 22 },
  { x: 140, y: 110, width: 44, height: 200, rx: 22 },
  { x: 210, y: 170, width: 44, height: 140, rx: 22 },
  { x: 280, y: 10, width: 44, height: 300, rx: 22 },
];

export const Footer: React.FC<FooterProps> = ({ onOpenDownload }) => {
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

  // Wave entrance animation across the 5 giant footer bars
  useEffect(() => {
    const rects = barsRef.current.filter((el): el is SVGRectElement => el !== null);
    if (rects.length === 0 || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const ctx = gsap.context(() => {
      gsap.set(rects, { transformOrigin: '50% 100%', scaleY: 0.18, opacity: 0 });
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

  return (
    <footer className="bg-[#FFFFEB] text-[#1a1a1a] pt-12 sm:pt-16 pb-10 sm:pb-14 border-t border-[#1a1a1a]/10">
      <Container maxWidth="wide">
        {/* 1. Products Section */}
        <div className="mb-16 sm:mb-20">
          <div className="text-[11px] sm:text-xs font-mono uppercase tracking-[0.16em] text-[#787D6D] font-semibold mb-4 px-1">
            PRODUCTS
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-5">
            {/* Product 1: Wispr Flow Dictation */}
            <div
              onClick={() => {
                if (onOpenDownload) {
                  onOpenDownload('dictation');
                } else {
                  navigate('/get-started');
                }
              }}
              className="group relative flex items-center gap-4 sm:gap-6 bg-[#DDD8CB] border-2 border-transparent hover:border-[#1a1a1a] rounded-[20px] sm:rounded-[22px] p-2.5 sm:p-3 pr-6 sm:pr-8 transition-all duration-200 cursor-pointer shadow-xs hover:shadow-md"
            >
              {/* Graphic Box */}
              <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-[16px] sm:rounded-[18px] bg-[#EBDDFF] flex items-center justify-center shrink-0 p-3 shadow-inner">
                <img
                  src={flowbarGraphic}
                  alt="Wispr Flowbar"
                  className="max-w-[7.5rem] sm:max-w-[8.25rem] w-full object-contain"
                />
              </div>

              {/* Content */}
              <div className="flex flex-col justify-center py-1 flex-1">
                <h3 className="font-body font-semibold text-base sm:text-lg text-[#141414] mb-1.5">
                  Wispr Flow Dictation
                </h3>
                <p className="text-xs sm:text-[13px] text-[#141414]/70 leading-relaxed mb-3.5 max-w-xs sm:max-w-sm">
                  The voice-to-text AI that turns speech into clear, polished writing in every app.
                </p>
                <div className="inline-flex items-center gap-1.5 text-xs sm:text-[13px] font-semibold text-[#141414] group-hover:text-black transition-colors">
                  <span>Download free</span>
                  <span className="inline-block transition-transform duration-200 group-hover:translate-x-1 font-bold">
                    &gt;
                  </span>
                </div>
              </div>
            </div>

            {/* Product 2: Wispr Flow Notetaker */}
            <div
              onClick={() => {
                if (onOpenDownload) {
                  onOpenDownload('notetaker');
                } else {
                  navigate('/notetaker');
                }
              }}
              className="group relative flex items-center gap-4 sm:gap-6 bg-[#DDD8CB] border-2 border-transparent hover:border-[#1a1a1a] rounded-[20px] sm:rounded-[22px] p-2.5 sm:p-3 pr-6 sm:pr-8 transition-all duration-200 cursor-pointer shadow-xs hover:shadow-md"
            >
              {/* Graphic Box */}
              <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-[16px] sm:rounded-[18px] bg-[#06443B] flex items-end justify-center shrink-0 overflow-hidden shadow-inner pt-2">
                <img
                  src={transcriptNewGraphic}
                  alt="Wispr Flow Transcript"
                  className="max-w-[6.75rem] sm:max-w-[7.5rem] w-full object-contain translate-y-1"
                />
              </div>

              {/* Content */}
              <div className="flex flex-col justify-center py-1 flex-1">
                <div className="flex items-center justify-between gap-2 mb-1.5">
                  <h3 className="font-body font-semibold text-base sm:text-lg text-[#141414]">
                    Wispr Flow Notetaker
                  </h3>
                  <span className="bg-[#F89C33] text-white text-[11px] font-bold px-2.5 py-0.5 rounded-full shadow-xs shrink-0 tracking-tight">
                    New
                  </span>
                </div>
                <p className="text-xs sm:text-[13px] text-[#141414]/70 leading-relaxed mb-3.5 max-w-xs sm:max-w-sm">
                  AI meeting notes accurate enough to act on. Works in all meetings.
                </p>
                <div className="inline-flex items-center gap-1.5 text-xs sm:text-[13px] font-semibold text-[#141414] group-hover:text-black transition-colors">
                  <span>Download free</span>
                  <span className="inline-block transition-transform duration-200 group-hover:translate-x-1 font-bold">
                    &gt;
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 2. 4-Column Footer Navigation Links */}
        <div
          ref={colsRef}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 sm:gap-12 pb-14 sm:pb-20"
        >
          {FOOTER_COLUMNS.map((col) => (
            <div key={col.heading} data-footer-col>
              <h4 className="text-[11px] sm:text-xs font-mono uppercase tracking-[0.14em] text-[#787D6D] font-semibold mb-4 sm:mb-5">
                {col.heading}
              </h4>
              <ul className="space-y-2 sm:space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <AppLink
                      to={link.href}
                      className="group inline-flex items-center gap-1.5 text-[13px] sm:text-[14px] text-[#1A1A1A] hover:text-[#034F46] transition-colors duration-150 py-0.5"
                    >
                      <span className="transition-transform duration-150 group-hover:translate-x-0.5">
                        {link.label}
                      </span>
                      <span
                        className="inline-flex items-center opacity-0 -translate-x-1.5 w-0 overflow-hidden group-hover:w-3.5 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 text-[#034F46] shrink-0"
                        aria-hidden="true"
                      >
                        <svg
                          viewBox="0 0 16 9"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-3.5 h-auto"
                        >
                          <path
                            d="M7.30209 4.39387C5.58154 4.37997 3.86103 4.36522 2.14057 4.34963C1.79759 4.34582 1.45417 4.31894 1.11266 4.28535C1.05617 4.27926 1.00284 4.25627 0.959627 4.21939C0.916414 4.18251 0.88533 4.13345 0.870437 4.07863C0.842351 3.99082 0.939919 3.86619 1.05679 3.84791C1.16971 3.83011 1.2821 3.80265 1.39573 3.79577C2.12069 3.75198 2.84552 3.68968 3.57115 3.67664C5.06198 3.65002 6.55317 3.64309 8.04409 3.64158C9.45874 3.63994 10.8733 3.65774 12.2882 3.66093C12.5152 3.66146 12.7424 3.63267 12.9693 3.61257C12.9844 3.60886 12.9982 3.60144 13.0097 3.59097C13.0211 3.5805 13.0297 3.56733 13.0347 3.55267C13.0388 3.51762 13.0288 3.45878 13.0052 3.44595C12.5704 3.2096 12.1412 2.96113 11.694 2.75006C10.6541 2.2595 9.67872 1.65767 8.70364 1.05423C8.54347 0.955023 8.37557 0.854219 8.31084 0.65726C8.29908 0.621454 8.28076 0.560097 8.29575 0.548117C8.34922 0.498263 8.4142 0.462417 8.4849 0.443795C8.5602 0.434903 8.6365 0.447087 8.70529 0.478984C8.94883 0.589421 9.19069 0.70447 9.42749 0.828484C11.1214 1.71282 12.8125 2.60248 14.5075 3.48451C15.147 3.8172 15.4508 4.13955 14.6833 4.87064C14.4621 5.08139 14.2384 5.29192 13.998 5.47948C12.8828 6.34954 11.7636 7.21439 10.6403 8.07401C10.4859 8.18478 10.323 8.28331 10.1532 8.36871C10.0424 8.42883 9.93159 8.39317 9.83597 8.32107C9.73072 8.24173 9.66536 8.01096 9.7017 7.90948C9.78232 7.68422 9.94289 7.51894 10.1154 7.36928C10.7796 6.79313 11.449 6.22298 12.1186 5.65327C12.555 5.28207 12.9957 4.91656 13.4313 4.54474C13.4528 4.52633 13.4537 4.46908 13.4451 4.43514C13.4393 4.42033 13.4301 4.40713 13.4181 4.39669C13.4061 4.38625 13.3918 4.37888 13.3763 4.3752C13.1485 4.36038 12.9206 4.34125 12.6927 4.34245C10.8957 4.35189 9.09869 4.36372 7.30168 4.37795L7.30209 4.39387Z"
                            fill="currentColor"
                          />
                        </svg>
                      </span>
                    </AppLink>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* 3. Full-Width Giant Brand Wordmark (|ılı| Flow) */}
        <div ref={wordmarkRef} className="py-6 sm:py-10 overflow-hidden">
          <button
            type="button"
            onClick={handleBrandClick}
            aria-label="Scroll to top"
            className="w-full block text-[#1a1a1a] cursor-pointer focus:outline-none group"
          >
            <svg
              viewBox="0 0 1280 320"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full h-auto block select-none transition-opacity duration-200 group-hover:opacity-90"
              aria-hidden="true"
            >
              {/* 5 Vertical Waveform Bars */}
              {WAVE_BARS.map((bar, idx) => (
                <rect
                  key={idx}
                  ref={(el) => {
                    barsRef.current[idx] = el;
                  }}
                  x={bar.x}
                  y={bar.y}
                  width={bar.width}
                  height={bar.height}
                  rx={bar.rx}
                  fill="currentColor"
                />
              ))}

              {/* Vector Wordmark "Flow" perfectly aligned */}
              <g transform="translate(414, 10) scale(3.15)">
                {/* F */}
                <path
                  d="M59.13 57.15H20.53V93.77H0V0H59.68V19.01H20.52V38.65H59.12V57.15H59.13Z"
                  fill="currentColor"
                />
                {/* l */}
                <path
                  d="M98.1 76.54H89.15C87.4 76.54 85.98 75.12 85.98 73.37V0H66.47V81.6C66.47 88.32 71.92 93.77 78.64 93.77H85.99H98.11V76.54H98.1Z"
                  fill="currentColor"
                />
                {/* o */}
                <path
                  d="M101.51 61.0299C101.51 40.4399 116.62 26.6299 137.47 26.6299C158.32 26.6299 173.3 40.4399 173.3 61.0299C173.3 81.6199 158.19 95.3 137.47 95.3C116.75 95.3 101.51 81.6199 101.51 61.0299ZM121.7 60.8999C121.7 70.7999 128.08 77.3199 137.47 77.3199C146.86 77.3199 153.11 70.8099 153.11 60.8999C153.11 50.9899 146.73 44.6099 137.47 44.6099C128.21 44.6099 121.7 51.1199 121.7 60.8999Z"
                  fill="currentColor"
                />
                {/* w */}
                <path
                  d="M192.109 93.35L171.66 28.3501H192.235L198.075 49.5384C199.602 55.1299 200.995 61.5033 202.01 67.9954C203.151 61.1074 203.789 58.6333 206.583 49.5384L213.061 28.3501H233.123L239.089 49.5384C239.727 51.7453 242.773 63.8388 243.411 67.9954C244.175 63.3143 247.22 51.874 247.858 49.5384L253.959 28.3501H274.66L252.432 93.35H234.274L228.173 72.6764C225.002 62.0179 223.348 54.3481 222.962 51.6167C222.449 54.3481 221.308 59.4151 217.248 73.0623L211.156 93.34H192.109V93.35Z"
                  fill="currentColor"
                />
              </g>
            </svg>
          </button>
        </div>

        {/* 4. Bottom Legal & Social Bar */}
        <div className="pt-8 sm:pt-10 flex flex-col md:flex-row items-start md:items-end justify-between gap-6 text-[#1a1a1a]">
          <div className="text-[13px] leading-relaxed">
            <div className="flex flex-wrap items-center gap-x-5 gap-y-1.5 font-medium">
              <span>© Wispr Flow 2026</span>
              <AppLink
                to="/terms-of-service"
                className="hover:text-[#034f46] transition-colors"
              >
                Terms
              </AppLink>
              <AppLink
                to="/privacy-policy"
                className="hover:text-[#034f46] transition-colors"
              >
                Privacy
              </AppLink>
              <AppLink
                to="/data-controls"
                className="hover:text-[#034f46] transition-colors"
              >
                Data Controls
              </AppLink>
            </div>
            <div className="flex flex-wrap items-center gap-x-5 gap-y-1.5 mt-2 text-[#1a1a1a]/65">
              <button
                type="button"
                onClick={() => window.dispatchEvent(new CustomEvent('open-privacy-settings'))}
                className="hover:text-[#1a1a1a] transition-colors cursor-pointer text-left"
              >
                Do Not Sell or Share My Personal Information
              </button>
              <button
                type="button"
                onClick={() => window.dispatchEvent(new CustomEvent('open-privacy-settings'))}
                className="hover:text-[#1a1a1a] transition-colors cursor-pointer text-left"
              >
                Privacy Settings
              </button>
            </div>
          </div>

          {/* Social Media Icons */}
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
