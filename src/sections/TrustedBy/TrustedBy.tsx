import React, { useRef } from 'react';
import { Container } from '../../components/Container';
import { CompanyLogoMark } from '../../components/BrandMarks';
import { TRUSTED_COMPANIES } from '../../data/features';
import { useHorizontalMarquee, useScrollReveal } from '../../hooks/useGsapAnimations';

export const TrustedBy: React.FC = () => {
  const headerRef = useRef<HTMLParagraphElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useScrollReveal(headerRef, { y: 18, duration: 0.65, start: 'top 90%' });
  useHorizontalMarquee(trackRef, { duration: 34, pauseOnHover: true });

  return (
    <section
      aria-label="Trusted by professionals"
      className="bg-[#1a1a1a] text-[#ffffeb] rounded-t-[2.5rem] sm:rounded-t-[4.5rem] pt-14 sm:pt-20 pb-20 sm:pb-24 -mb-12 relative z-10 overflow-hidden"
    >
      <Container>
        <p
          ref={headerRef}
          className="text-center text-xs sm:text-sm font-medium uppercase tracking-[0.12em] text-[#ffffeb]/65 mb-10"
        >
          Used by professionals at
        </p>
      </Container>

      <div className="relative overflow-hidden py-2">
        {/* Soft horizontal edge fades */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 left-0 w-16 sm:w-28 bg-gradient-to-r from-[#1a1a1a] to-transparent z-10"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 right-0 w-16 sm:w-28 bg-gradient-to-l from-[#1a1a1a] to-transparent z-10"
        />

        <div ref={trackRef} className="flex w-max items-center will-change-transform">
          {[...TRUSTED_COMPANIES, ...TRUSTED_COMPANIES].map((company, index) => (
            <div
              key={`${company}-${index}`}
              className="mx-7 sm:mx-11 flex items-center justify-center shrink-0"
            >
              <CompanyLogoMark name={company} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
