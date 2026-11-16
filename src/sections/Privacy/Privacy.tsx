import React, { useRef } from 'react';
import { ChevronRight } from 'lucide-react';
import { Container } from '../../components/Container';
import { AppLink } from '../../context/RouterContext';
import { useScrollReveal, useTextReveal } from '../../hooks/useGsapAnimations';

const SealWatermark: React.FC<{ id: 'hipaa' | 'soc2' | 'iso' }> = ({ id }) => {
  if (id === 'hipaa') {
    return (
      <svg
        viewBox="0 0 80 80"
        className="w-[74%] h-[74%] text-[#c7c8b6]"
        fill="none"
        aria-hidden="true"
      >
        {/* Central staff & finial */}
        <circle cx="40" cy="17" r="3.2" fill="currentColor" />
        <rect x="38.7" y="19" width="2.6" height="49" rx="1.3" fill="currentColor" />
        {/* Outstretched wings */}
        <path
          d="M38 24 C29 22, 16 19, 8 18 C11 23, 18 26, 29 28 C21 28, 15 27, 11 26 C15 30, 23 32, 34 32 C28 33, 21 34, 17 33 C22 36, 30 36, 38 35 Z"
          fill="currentColor"
        />
        <path
          d="M42 24 C51 22, 64 19, 72 18 C69 23, 62 26, 51 28 C59 28, 65 27, 69 26 C65 30, 57 32, 46 32 C52 33, 59 34, 63 33 C58 36, 50 36, 42 35 Z"
          fill="currentColor"
        />
        {/* Intertwined serpents */}
        <path
          d="M35 28 C28 33, 30 40, 40 43 C49 46, 49 52, 40 55 C33 57, 34 62, 40 65"
          stroke="currentColor"
          strokeWidth="2.6"
          strokeLinecap="round"
        />
        <path
          d="M45 28 C52 33, 50 40, 40 43 C31 46, 31 52, 40 55 C47 57, 46 62, 40 65"
          stroke="currentColor"
          strokeWidth="2.6"
          strokeLinecap="round"
        />
      </svg>
    );
  }

  if (id === 'soc2') {
    return (
      <svg
        viewBox="0 0 80 80"
        className="w-[70%] h-[70%] text-[#c7c8b6]"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M40 12 C51 16, 60 17, 65 18 V41 C65 55, 53 64, 40 69 C27 64, 15 55, 15 41 V18 C20 17, 29 16, 40 12 Z"
          fill="#d9dac9"
          stroke="currentColor"
          strokeWidth="3.5"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  return (
    <svg
      viewBox="0 0 80 80"
      className="w-[72%] h-[72%]"
      fill="none"
      aria-hidden="true"
    >
      <circle cx="40" cy="40" r="27" fill="#ccccba" />
      {/* Latitude & longitude grid cutouts matching card background */}
      <ellipse cx="40" cy="40" rx="13.5" ry="27" stroke="#e2e2d2" strokeWidth="2.2" />
      <line x1="40" y1="13" x2="40" y2="67" stroke="#e2e2d2" strokeWidth="2.2" />
      <line x1="13" y1="40" x2="67" y2="40" stroke="#e2e2d2" strokeWidth="2.2" />
      <path d="M16 28 Q40 32 64 28" stroke="#e2e2d2" strokeWidth="2" fill="none" />
      <path d="M16 52 Q40 48 64 52" stroke="#e2e2d2" strokeWidth="2" fill="none" />
    </svg>
  );
};

const CERTIFICATION_SEALS: Array<{ id: 'hipaa' | 'soc2' | 'iso'; label: string }> = [
  { id: 'hipaa', label: 'HIPAA' },
  { id: 'soc2', label: 'SOC 2 Type II' },
  { id: 'iso', label: 'ISO 27001' },
];

export const Privacy: React.FC = () => {
  const copyRef = useRef<HTMLDivElement>(null);
  const sealsRef = useRef<HTMLDivElement>(null);

  useTextReveal(copyRef, { stagger: 0.1, start: 'top 86%' });
  useScrollReveal(sealsRef, {
    selector: '[data-seal]',
    y: 20,
    scale: 0.94,
    stagger: 0.1,
    duration: 0.7,
    start: 'top 86%',
  });

  return (
    <section id="privacy" className="pb-16 sm:pb-24 bg-[#ffffeb] text-[#1a1a1a]">
      <Container>
        <div className="w-full rounded-[1.5rem] bg-[#e2e2d2] px-7 py-10 sm:px-12 sm:py-12 lg:px-14 lg:py-14">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start lg:items-center">
            {/* Left Heading + Center Copy Columns */}
            <div
              ref={copyRef}
              className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-12 gap-7 sm:gap-8 items-start"
            >
              <div className="sm:col-span-6">
                <h2
                  data-reveal-line
                  className="font-display text-4xl sm:text-[2.75rem] lg:text-[3.15rem] leading-[0.98] tracking-tight"
                >
                  Your voice
                  <br />
                  <em className="italic font-normal">stays yours.</em>
                </h2>
              </div>

              <div className="sm:col-span-6 space-y-6 pt-0.5">
                <p
                  data-reveal-line
                  className="text-[13.5px] sm:text-sm text-[#1a1a1a]/80 leading-[1.55] max-w-[17rem]"
                >
                  Your data is never sold. You choose whether data is used to help improve Flow. SOC 2 Type II, HIPAA and ISO 27001 certified.
                </p>

                <div data-reveal-line>
                  <AppLink
                    to="/privacy"
                    className="inline-flex items-center gap-2 text-sm font-semibold text-[#1a1a1a] hover:text-[#034f46] transition-colors"
                  >
                    <span>Learn more</span>
                    <ChevronRight className="w-4 h-4 stroke-[2]" />
                  </AppLink>
                </div>
              </div>
            </div>

            {/* Right Circular Double-Ring Certification Seals */}
            <div
              ref={sealsRef}
              className="lg:col-span-5 flex flex-wrap sm:flex-nowrap items-center justify-start lg:justify-end gap-3.5 sm:gap-4"
            >
              {CERTIFICATION_SEALS.map((seal) => (
                <div
                  key={seal.id}
                  data-seal
                  className="w-[6.75rem] h-[6.75rem] sm:w-[7.25rem] sm:h-[7.25rem] rounded-full border border-[#224038]/85 p-[4px] flex items-center justify-center shrink-0"
                >
                  <div className="relative w-full h-full rounded-full border border-[#224038]/85 flex items-center justify-center overflow-hidden px-1.5">
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <SealWatermark id={seal.id} />
                    </div>
                    <span className="relative z-10 text-[11.5px] sm:text-[12.5px] font-semibold tracking-[-0.01em] text-[#1a1a1a] text-center whitespace-nowrap">
                      {seal.label}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};
