import React, { useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Container } from '../../components/Container';
import {
  gsap,
  ScrollTrigger,
  useScrollCorners,
  useTextReveal,
} from '../../hooks/useGsapAnimations';

import davePhoto from '../../assets/images/dave_gilboa_portrait_notetaker.jpg';
import chelciePhoto from '../../assets/images/chelcie_taylor_portrait.jpg';
import stevenPhoto from '../../assets/images/steven_bartlett_portrait_1794805450787.jpg';
import elenaPhoto from '../../assets/images/elena_verna_portrait_1794805451854.jpg';

export interface NotetakerTestimonialItem {
  id: string;
  layout: 'landscape' | 'square';
  theme: 'glow' | 'coral' | 'purple' | 'green' | 'lumen' | 'dark-lumen';
  quote: string;
  authorName: string;
  authorRole?: string;
  image?: string;
}

const NOTETAKER_CARDS: NotetakerTestimonialItem[] = [
  {
    id: 'dave-gilboa',
    layout: 'landscape',
    theme: 'glow',
    quote:
      '“Wispr Flow’s dictation has always felt like magic. With Notetaker, that magic has gone multiplayer with no extra setup, perfectly formatted notes, and summaries that are actually useful.”',
    authorName: 'Dave Gilboa',
    authorRole: 'CEO of Warby Parker',
    image: davePhoto,
  },
  {
    id: 'chelcie-taylor',
    layout: 'landscape',
    theme: 'coral',
    quote:
      '“I’ve connected Wispr Flow Notetaker to the other agents I run, and they do noticeably better work with its transcripts. The accuracy makes a difference beyond the meeting itself.”',
    authorName: 'Chelcie Taylor',
    authorRole: 'Principal at Notable Capital',
    image: chelciePhoto,
  },
  {
    id: 'steven-bartlett',
    layout: 'landscape',
    theme: 'purple',
    quote:
      '“The thought I have becomes my explanation. The gap between my thought and my delivery of my idea collapses.”',
    authorName: 'Steven Bartlett',
    authorRole: 'Host of Diary of a CEO',
    image: stevenPhoto,
  },
  {
    id: 'elena-verna',
    layout: 'landscape',
    theme: 'green',
    quote:
      '“I feel like I have no time to type anymore. So I just talk to my phone and my laptop all the time.”',
    authorName: 'Elena Verna',
    authorRole: 'Head of Growth at Lovable',
    image: elenaPhoto,
  },
  {
    id: 'fast-company',
    layout: 'square',
    theme: 'dark-lumen',
    quote:
      '“Wispr Flow just gets it right. It is consistently so much better than the standard voice input, it’ll blow your mind.”',
    authorName: 'Fast Company',
  },
  {
    id: 'slash-gear',
    layout: 'square',
    theme: 'lumen',
    quote:
      '“If you find it tiring to write long emails, or just need something quick to note down an idea in the heat of the moment — but typing it all feels like a drag — this app is a Godsend for you.”',
    authorName: 'Slash Gear',
  },
];

const CARD_TILTS = [
  '-rotate-[1.5deg]',
  'rotate-[1.8deg]',
  '-rotate-[1.2deg]',
  'rotate-[1.5deg]',
  '-rotate-[1.8deg]',
  'rotate-[1.4deg]',
];

export const NotetakerTestimonials: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const desktopWrapRef = useRef<HTMLDivElement>(null);
  const desktopTrackRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const mobileTrackRef = useRef<HTMLDivElement>(null);
  const mobileHeaderRef = useRef<HTMLDivElement>(null);

  useScrollCorners(sectionRef, 72, 40);
  useTextReveal(headerRef, { stagger: 0.08, start: 'top 86%' });
  useTextReveal(mobileHeaderRef, { stagger: 0.08, start: 'top 86%' });

  useEffect(() => {
    const wrap = desktopWrapRef.current;
    const track = desktopTrackRef.current;
    if (!wrap || !track || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const mm = gsap.matchMedia();
    mm.add('(min-width: 1024px)', () => {
      const cards = gsap.utils.toArray<HTMLElement>('[data-slider="card"]', track);
      if (cards.length === 0) return;

      const ORBIT_VW = 30;
      const ROT_IN = -32;
      const ROT_OUT = 32;
      const DUR = 1.2;
      const EASE = 'power1.inOut';
      const ZFLIP = 0.6;
      const TRAVEL_VW = 220;
      const LEAD_TRIM = true;

      let master: gsap.core.Timeline | null = null;
      let startT = 0;
      let endT = DUR;
      let targetT = 0;
      let currentT = 0;
      let hasSettled = true;
      let currentProgress = 0;

      const buildTimeline = () => {
        if (master) master.kill();

        const vw = window.innerWidth;
        const vh = window.innerHeight;
        const orbitPx = (vw * ORBIT_VW) / 100;
        const isPortrait = vh > vw;
        const step = (isPortrait ? 2.0 : 1.65) / cards.length;
        const travelHalf = (vw * TRAVEL_VW) / 250;

        gsap.set(cards, {
          xPercent: -50,
          yPercent: -50,
          transformOrigin: `50% 50% -${orbitPx}px`,
          force3D: true,
        });

        master = gsap.timeline({ paused: true });

        cards.forEach((card, i) => {
          const tl = gsap.timeline();
          tl.fromTo(
            card,
            { x: -travelHalf, rotateX: ROT_IN, zIndex: 100 + (cards.length - i) },
            { x: travelHalf, rotateX: ROT_OUT, ease: EASE, duration: DUR }
          );
          tl.set(card, { zIndex: 10 + i }, `-=${ZFLIP}`);
          master!.add(tl, i * step);
        });

        startT = LEAD_TRIM ? DUR / 2 : 0;
        endT = LEAD_TRIM
          ? Math.max(startT + 0.001, master.duration() - DUR / 2)
          : master.duration();
        currentT = startT + currentProgress * (endT - startT);
        targetT = currentT;
        master.time(currentT);
      };

      buildTimeline();

      const st = ScrollTrigger.create({
        trigger: wrap,
        start: 'top top',
        end: 'bottom bottom',
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          currentProgress = self.progress;
          targetT = startT + currentProgress * (endT - startT);
          hasSettled = false;
        },
        onRefresh: (self) => {
          currentProgress = self.progress;
          buildTimeline();
          hasSettled = true;
        },
      });

      const tick = () => {
        if (hasSettled || !master) return;
        const diff = targetT - currentT;
        if (Math.abs(diff) < 0.0005) {
          currentT = targetT;
          master.time(currentT);
          hasSettled = true;
          return;
        }
        const k = 1 - Math.pow(1 - 0.14, gsap.ticker.deltaRatio());
        currentT += diff * k;
        master.time(currentT);
      };

      gsap.ticker.add(tick);

      return () => {
        gsap.ticker.remove(tick);
        st.kill();
        if (master) master.kill();
      };
    });

    return () => mm.revert();
  }, []);

  const scrollMobile = (direction: 'prev' | 'next') => {
    if (!mobileTrackRef.current) return;
    mobileTrackRef.current.scrollBy({
      left: direction === 'next' ? 360 : -360,
      behavior: 'smooth',
    });
  };

  const getThemeClasses = (theme: NotetakerTestimonialItem['theme']) => {
    switch (theme) {
      case 'glow':
        return 'bg-[#FF9E2C] text-[#1A1A1A]';
      case 'coral':
        return 'bg-[#F96B55] text-[#1A1A1A]';
      case 'purple':
        return 'bg-[#E6D7FF] text-[#1A1A1A]';
      case 'green':
        return 'bg-[#2EE08D] text-[#1A1A1A]';
      case 'dark-lumen':
      case 'lumen':
      default:
        return 'bg-[#FFFFEB] text-[#1A1A1A]';
    }
  };

  const renderCard = (card: NotetakerTestimonialItem, index: number, isDesktopOrbital = false) => {
    const tilt = isDesktopOrbital ? '' : CARD_TILTS[index % CARD_TILTS.length];
    const sliderProps = isDesktopOrbital
      ? {
          'data-slider': 'card',
          style: {
            transformStyle: 'preserve-3d' as const,
            backfaceVisibility: 'hidden' as const,
          },
        }
      : {};

    // Square Publication Cards (Slash Gear, Fast Company)
    if (card.layout === 'square') {
      return (
        <article
          key={card.id}
          {...sliderProps}
          className={`${
            isDesktopOrbital
              ? 'absolute top-1/2 left-1/2 w-[300px] sm:w-[380px] xl:w-[410px] h-[340px] sm:h-[380px] lg:h-[400px] will-change-transform'
              : `shrink-0 snap-start w-[20.5rem] sm:w-[25rem] h-[25.5rem] sm:h-[26.5rem] transition-transform duration-300 hover:rotate-0 ${tilt}`
          } rounded-[28px] sm:rounded-[36px] p-7 sm:p-9 flex flex-col justify-between shadow-[0_30px_70px_rgba(0,0,0,0.5)] border border-white/10 ${getThemeClasses(
            card.theme
          )}`}
        >
          <p className="font-display text-lg sm:text-xl xl:text-[1.38rem] leading-[1.36] font-normal">
            {card.quote}
          </p>
          <div className="flex items-center gap-3 pt-4 border-t border-black/10">
            <div className="w-10 h-10 rounded-full bg-[#1A1A1A] text-[#FFFFEB] flex items-center justify-center font-display text-xs font-semibold shrink-0 shadow-sm">
              {card.authorName
                .split(' ')
                .map((w) => w[0])
                .join('')
                .slice(0, 2)
                .toUpperCase()}
            </div>
            <div className="font-body font-semibold text-base text-[#1A1A1A]">
              {card.authorName}
            </div>
          </div>
        </article>
      );
    }

    // Landscape Long Cards (Dave Gilboa, Chelcie Taylor, Steven Bartlett, Elena Verna)
    const isPhotoLeft = card.id === 'chelcie-taylor' || card.id === 'elena-verna';

    return (
      <article
        key={card.id}
        {...sliderProps}
        className={`${
          isDesktopOrbital
            ? 'absolute top-1/2 left-1/2 w-[340px] sm:w-[580px] md:w-[660px] lg:w-[720px] xl:w-[760px] h-[340px] sm:h-[380px] lg:h-[400px] will-change-transform'
            : `shrink-0 snap-start w-[21rem] sm:w-[38rem] min-h-[25rem] sm:h-[24rem] transition-transform duration-300 hover:rotate-0 ${tilt}`
        } rounded-[28px] sm:rounded-[36px] overflow-hidden grid grid-cols-1 sm:grid-cols-12 shadow-[0_30px_70px_rgba(0,0,0,0.5)] border border-white/10 ${getThemeClasses(
          card.theme
        )}`}
      >
        <div
          className={`p-6 sm:p-8 lg:p-10 flex flex-col justify-between sm:col-span-7 ${
            isPhotoLeft ? 'order-2 sm:order-2' : 'order-1 sm:order-1'
          }`}
        >
          <div>
            <p className="font-display text-base sm:text-lg lg:text-[1.28rem] xl:text-[1.34rem] leading-[1.34] font-normal text-[#1a1a1a]">
              {card.quote}
            </p>
          </div>

          <div className="pt-4">
            <div className="font-body font-bold text-sm sm:text-base text-[#1a1a1a]">
              {card.authorName}
            </div>
            {card.authorRole && (
              <div className="text-xs sm:text-sm font-medium text-[#1a1a1a]/75 mt-0.5">
                {card.authorRole}
              </div>
            )}
          </div>
        </div>

        <div
          className={`sm:col-span-5 p-3 sm:p-4 flex items-center justify-center h-56 sm:h-full ${
            isPhotoLeft ? 'order-1 sm:order-1' : 'order-2 sm:order-2'
          }`}
        >
          <div className="w-full h-full rounded-[22px] sm:rounded-[28px] overflow-hidden bg-black/10 relative shadow-inner">
            {card.image && (
              <img
                src={card.image}
                alt={card.authorName}
                loading="lazy"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center"
              />
            )}
          </div>
        </div>
      </article>
    );
  };

  return (
    <section
      ref={sectionRef}
      id="testimonials"
      className="bg-[#141414] text-[#ffffeb] rounded-[2.5rem] sm:rounded-[4.5rem] overflow-x-clip select-none"
    >
      {/* Desktop Sticky Pinned 3D Orbital Slider */}
      <div
        ref={desktopWrapRef}
        data-slider="wrap"
        className="hidden lg:block relative w-full h-[380vh]"
      >
        <div
          ref={desktopTrackRef}
          data-slider="track"
          className="sticky top-0 w-full h-screen overflow-hidden flex flex-col justify-between items-center relative"
        >
          {/* Section Heading Pinned Cleanly at Top with generous space margin */}
          <div
            ref={headerRef}
            className="w-full text-center pt-24 xl:pt-32 pb-12 xl:pb-16 px-4 z-20 pointer-events-none shrink-0"
          >
            <p
              data-reveal-line
              className="text-xs sm:text-sm font-semibold uppercase tracking-[0.14em] text-[#ffffeb]/55 mb-4"
            >
              EARLY ACCESS, REAL RESULTS
            </p>
            <h2
              data-reveal-line
              className="font-display text-5xl sm:text-6xl xl:text-[4.75rem] font-normal text-[#ffffeb] leading-[0.96] tracking-tight"
              style={{ textWrap: 'balance' }}
            >
              From the first <br className="hidden sm:inline" />
              <em className="italic font-normal">people to use it.</em>
            </h2>
          </div>

          {/* 3D Orbital Perspective Stage */}
          <div
            className="relative flex-1 w-full"
            style={{ perspective: '100vw', transformStyle: 'preserve-3d' }}
          >
            {NOTETAKER_CARDS.map((card, i) => renderCard(card, i, true))}
          </div>

          {/* Bottom Ambient Cue */}
          <div className="pb-6 z-20 pointer-events-none opacity-40 text-[11px] font-mono tracking-widest text-white/60 shrink-0">
            SCROLL TO EXPLORE
          </div>
        </div>
      </div>

      {/* Tablet & Mobile Touch Carousel */}
      <div className="lg:hidden py-16 sm:py-20">
        <Container>
          <div className="flex items-end justify-between gap-4 mb-10">
            <div ref={mobileHeaderRef}>
              <p
                data-reveal-line
                className="text-xs font-semibold uppercase tracking-[0.12em] text-[#ffffeb]/65 mb-2"
              >
                Early access, real results
              </p>
              <h2
                data-reveal-line
                className="font-display text-4xl sm:text-5xl leading-[0.92] tracking-tight"
              >
                From the first <em className="italic font-normal">people to use it.</em>
              </h2>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={() => scrollMobile('prev')}
                aria-label="Previous testimonials"
                className="w-10 h-10 rounded-full border border-[#ffffeb]/25 flex items-center justify-center hover:bg-[#ffffeb] hover:text-[#1a1a1a] transition-colors cursor-pointer"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                type="button"
                onClick={() => scrollMobile('next')}
                aria-label="Next testimonials"
                className="w-10 h-10 rounded-full border border-[#ffffeb]/25 flex items-center justify-center hover:bg-[#ffffeb] hover:text-[#1a1a1a] transition-colors cursor-pointer"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </Container>

        <div
          ref={mobileTrackRef}
          className="flex gap-5 overflow-x-auto no-scrollbar px-5 sm:px-8 pb-4 snap-x snap-mandatory scroll-smooth"
        >
          {NOTETAKER_CARDS.map((card, i) => renderCard(card, i, false))}
        </div>
      </div>
    </section>
  );
};
