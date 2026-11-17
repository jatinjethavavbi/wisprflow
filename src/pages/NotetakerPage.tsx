import React, { useEffect, useId, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  ArrowRight,
  ChevronDown,
  ChevronRight,
  EyeOff,
  FileText,
  Lock,
  Mic,
  Search,
  Send,
  ShieldCheck,
  Sparkles,
  Users,
  X,
} from 'lucide-react';
import { Container } from '../components/Container';
import { AppLink } from '../context/RouterContext';
import { NotetakerTestimonials } from '../sections/Testimonials/NotetakerTestimonials';
import {
  CONVERSATION_TRANSCRIPT,
  ENTERPRISE_CONTROLS,
  HERO_SCENARIOS,
  MCP_TOOLS,
  NOTETAKER_FAQS,
  NOTETAKER_GUIDES,
  NOTETAKER_QA_PROMPTS,
  NotetakerGuideArticle,
  WALKTHROUGH_TRANSCRIPT,
} from '../data/notetaker';
import {
  gsap,
  ScrollTrigger,
  useScrollReveal,
  useTextReveal,
} from '../hooks/useGsapAnimations';

import alexImg from '../assets/images/alex_lieberman_office_1794805451048.jpg';
import clayImg from '../assets/images/clay_team_workspace_1794805452032.jpg';
import daveImg from '../assets/images/dave_gilboa_portrait_1794805451964.jpg';
import elenaImg from '../assets/images/elena_verna_portrait_1794805451854.jpg';
import atmosphereImg from '../assets/images/final_cta_atmosphere_1794805452889.jpg';
import stevenImg from '../assets/images/steven_bartlett_portrait_1794805450787.jpg';
import workflowIconStarts from '../assets/images/workflow_icon_starts.png';
import workflowIconWhatever from '../assets/images/workflow_icon_whatever.png';
import workflowIconConnects from '../assets/images/workflow_icon_connects.png';

interface NotetakerPageProps {
  onOpenDownload: (mode?: 'dictation' | 'notetaker') => void;
  isResources?: boolean;
}

type DetectedOS = 'windows' | 'mac';
type DesktopTab = 'insights' | 'transcript' | 'summary';

const FlowWaveformMark: React.FC<{ className?: string }> = ({ className = 'w-5 h-5' }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
    <rect x="2" y="4" width="2.4" height="16" rx="1.2" />
    <rect x="6.5" y="8.5" width="2.4" height="9" rx="1.2" />
    <rect x="11" y="5.5" width="2.4" height="13" rx="1.2" />
    <rect x="15.5" y="8.5" width="2.4" height="9" rx="1.2" />
    <rect x="20" y="4" width="2.4" height="16" rx="1.2" />
  </svg>
);

const OsButtonIcon: React.FC<{ os: DetectedOS }> = ({ os }) =>
  os === 'mac' ? (
    <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current shrink-0" aria-hidden="true">
      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.33c.64-.78 1.08-1.86.96-2.94-.93.04-2.05.62-2.71 1.4-.58.68-1.1 1.78-.96 2.84 1.04.08 2.07-.52 2.71-1.3" />
    </svg>
  ) : (
    <svg viewBox="0 0 20 20" className="w-3.5 h-3.5 fill-current shrink-0" aria-hidden="true">
      <rect x="1" y="1" width="8.2" height="8.2" />
      <rect x="10.8" y="1" width="8.2" height="8.2" />
      <rect x="1" y="10.8" width="8.2" height="8.2" />
      <rect x="10.8" y="10.8" width="8.2" height="8.2" />
    </svg>
  );

export const NotetakerPage: React.FC<NotetakerPageProps> = ({
  onOpenDownload,
  isResources = false,
}) => {
  const uid = useId().replace(/:/g, '');
  const [detectedOS, setDetectedOS] = useState<DetectedOS>('windows');
  const [heroScenarioIdx, setHeroScenarioIdx] = useState(0);
  const [highlightedSpeaker, setHighlightedSpeaker] = useState<
    'nathalie' | 'stephen' | 'mikel' | null
  >(null);
  const [activeChapter, setActiveChapter] = useState(0);
  const activeChapterRef = useRef(0);
  const [activeMcpTool, setActiveMcpTool] = useState<string>('claude');
  const [askPhase, setAskPhase] = useState<0 | 1 | 2>(0);
  const [catchUpPulse, setCatchUpPulse] = useState(false);
  const [summaryStep, setSummaryStep] = useState(0);
  const [mcpPhase, setMcpPhase] = useState<0 | 1>(0);

  // Interactive states across Notetaker showcases
  const [activeQaId, setActiveQaId] = useState<string>('blockers');
  const [followUpInput, setFollowUpInput] = useState('');
  const [customFollowUps, setCustomFollowUps] = useState<
    { question: string; reply: string }[]
  >([]);

  const [window1Tab, setWindow1Tab] = useState<DesktopTab>('insights');
  const [window1SourcesOpen, setWindow1SourcesOpen] = useState(true);
  const [window1Input, setWindow1Input] = useState('');
  const [window1AnswerNote, setWindow1AnswerNote] = useState<string | null>(null);

  const [window2Tab, setWindow2Tab] = useState<DesktopTab>('summary');
  const [catchUpOpen, setCatchUpOpen] = useState(false);

  const [activeSummaryChapter, setActiveSummaryChapter] = useState<
    'timelines' | 'decisions' | 'next-steps'
  >('timelines');

  const [openFaqId, setOpenFaqId] = useState<string | null>(null);
  const [activeGuide, setActiveGuide] = useState<NotetakerGuideArticle | null>(null);

  // Animation refs
  const heroRef = useRef<HTMLDivElement>(null);
  const heroFloatRef = useRef<HTMLButtonElement>(null);
  const quoteSectionRef = useRef<HTMLElement>(null);
  const captureStageRef = useRef<HTMLElement>(null);
  const walkthroughTrackRef = useRef<HTMLDivElement>(null);
  const waveSvgRef = useRef<SVGSVGElement>(null);
  const floatingCardRef = useRef<HTMLDivElement>(null);
  const cardFeedRef = useRef<HTMLDivElement>(null);
  const topRightPortraitRef = useRef<HTMLButtonElement>(null);
  const midRightPortraitRef = useRef<HTMLButtonElement>(null);
  const bottomLeftPortraitRef = useRef<HTMLButtonElement>(null);
  const waveformPillRef = useRef<HTMLDivElement>(null);
  const leftNavRef = useRef<HTMLDivElement>(null);
  const rightCopyRef = useRef<HTMLDivElement>(null);
  const workflowRef = useRef<HTMLDivElement>(null);
  const workflowListRef = useRef<HTMLDivElement>(null);
  const migrationCardRef = useRef<HTMLDivElement>(null);
  const enterpriseRef = useRef<HTMLDivElement>(null);
  const guidesRef = useRef<HTMLDivElement>(null);
  const finalCtaRef = useRef<HTMLElement>(null);

  useTextReveal(workflowRef, { stagger: 0.08, start: 'top 86%' });
  useScrollReveal(workflowListRef, {
    selector: '[data-wf-item]',
    y: 22,
    stagger: 0.12,
    start: 'top 85%',
  });
  useScrollReveal(enterpriseRef, {
    selector: '[data-ent-item]',
    y: 18,
    stagger: 0.08,
    start: 'top 86%',
  });
  useScrollReveal(guidesRef, {
    selector: 'article',
    y: 22,
    stagger: 0.1,
    start: 'top 86%',
  });

  useEffect(() => {
    const ua = navigator.userAgent.toLowerCase();
    if (ua.includes('mac') && !ua.includes('iphone') && !ua.includes('ipad')) {
      setDetectedOS('mac');
    } else {
      setDetectedOS('windows');
    }
  }, []);

  // Scroll straight to #guides when visiting /notetaker-resources
  useEffect(() => {
    if (isResources && guidesRef.current) {
      guidesRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [isResources]);

  // Subtle cycle between live Notetaker hero transcript scenarios
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const timer = window.setInterval(() => {
      setHeroScenarioIdx((prev) => (prev + 1) % HERO_SCENARIOS.length);
    }, 4500);
    return () => window.clearInterval(timer);
  }, []);

  // Chapter-specific discrete animation timelines (zero high-frequency React re-renders)
  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const timers: number[] = [];

    if (activeChapter === 1) {
      if (reduced) {
        setAskPhase(2);
        return;
      }
      setAskPhase(0);
      timers.push(window.setTimeout(() => setAskPhase(1), 280));
      timers.push(window.setTimeout(() => setAskPhase(2), 1180));
    } else if (activeChapter === 2) {
      if (reduced) {
        setCatchUpPulse(false);
        setCatchUpOpen(true);
        return;
      }
      setCatchUpPulse(false);
      setCatchUpOpen(false);
      timers.push(window.setTimeout(() => setCatchUpPulse(true), 780));
      timers.push(
        window.setTimeout(() => {
          setCatchUpPulse(false);
          setCatchUpOpen(true);
        }, 1240)
      );
    } else if (activeChapter === 3) {
      if (reduced) {
        setSummaryStep(4);
        return;
      }
      setSummaryStep(0);
      timers.push(window.setTimeout(() => setSummaryStep(1), 460));
      timers.push(window.setTimeout(() => setSummaryStep(2), 940));
      timers.push(window.setTimeout(() => setSummaryStep(3), 1440));
      timers.push(window.setTimeout(() => setSummaryStep(4), 2100));
    } else if (activeChapter === 4) {
      if (reduced) {
        setMcpPhase(1);
        return;
      }
      setMcpPhase(0);
      timers.push(window.setTimeout(() => setMcpPhase(1), 320));
    }

    return () => {
      timers.forEach((id) => window.clearTimeout(id));
    };
  }, [activeChapter]);

  // Entrance, ambient hero float, emerald parallax, & scroll-choreographed desktop walkthrough
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const ctx = gsap.context(() => {
      if (heroRef.current) {
        const items = heroRef.current.querySelectorAll('[data-nt-hero]');
        gsap.fromTo(
          items,
          { opacity: 0, y: 18 },
          {
            opacity: 1,
            y: 0,
            duration: 0.65,
            stagger: 0.07,
            ease: 'power3.out',
            clearProps: 'transform,opacity',
          }
        );
      }

      if (heroFloatRef.current) {
        gsap.to(heroFloatRef.current, {
          y: -5,
          rotation: 0.55,
          duration: 3.1,
          ease: 'sine.inOut',
          repeat: -1,
          yoyo: true,
        });
      }

      if (quoteSectionRef.current) {
        const quoteBlock = quoteSectionRef.current.querySelector('[data-nt-quote]');
        if (quoteBlock) {
          gsap.fromTo(
            quoteBlock,
            { opacity: 0, y: 20 },
            {
              opacity: 1,
              y: 0,
              duration: 0.7,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: quoteBlock,
                start: 'top 86%',
                once: true,
              },
            }
          );
        }
      }

      if (captureStageRef.current) {
        const fgBubbles = captureStageRef.current.querySelectorAll('[data-bubble-fg]');
        const bgBubbles = captureStageRef.current.querySelectorAll('[data-bubble-bg]');
        if (fgBubbles.length) {
          gsap.fromTo(
            fgBubbles,
            { y: 18 },
            {
              y: -18,
              ease: 'none',
              scrollTrigger: {
                trigger: captureStageRef.current,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 0.6,
              },
            }
          );
        }
        if (bgBubbles.length) {
          gsap.fromTo(
            bgBubbles,
            { y: 9 },
            {
              y: -9,
              ease: 'none',
              scrollTrigger: {
                trigger: captureStageRef.current,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 0.6,
              },
            }
          );
        }
      }

      if (migrationCardRef.current) {
        gsap.fromTo(
          migrationCardRef.current,
          { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: migrationCardRef.current,
              start: 'top 86%',
              once: true,
            },
          }
        );
      }

      if (finalCtaRef.current) {
        gsap.fromTo(
          finalCtaRef.current,
          { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            duration: 0.75,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: finalCtaRef.current,
              start: 'top 88%',
              once: true,
            },
          }
        );
      }
    });

    // Desktop end-to-end scroll handoff: Emerald bubbles -> Floating card glides across intro headline -> Sticky 3-column walkthrough
    const mm = gsap.matchMedia();
    mm.add('(min-width: 1024px)', () => {
      const track = walkthroughTrackRef.current;
      if (!track) return;

      const arrivalTl = gsap.timeline({
        scrollTrigger: {
          trigger: track,
          start: 'top bottom',
          end: 'top top',
          scrub: true,
          invalidateOnRefresh: true,
        },
      });

      if (floatingCardRef.current) {
        arrivalTl.fromTo(
          floatingCardRef.current,
          { y: () => -Math.round(window.innerHeight * 0.88) },
          { y: 0, ease: 'none', duration: 1 },
          0
        );
      }

      if (topRightPortraitRef.current) {
        arrivalTl.fromTo(
          topRightPortraitRef.current,
          { opacity: 0.5, scale: 0.9, y: 14 },
          { opacity: 1, scale: 1, y: 0, ease: 'power2.out', duration: 0.45 },
          0.18
        );
      }

      if (midRightPortraitRef.current) {
        arrivalTl.fromTo(
          midRightPortraitRef.current,
          { opacity: 0.5, scale: 0.9, y: 16 },
          { opacity: 1, scale: 1, y: 0, ease: 'power2.out', duration: 0.45 },
          0.32
        );
      }

      if (bottomLeftPortraitRef.current) {
        arrivalTl.fromTo(
          bottomLeftPortraitRef.current,
          { opacity: 0, scale: 0.88, y: 12 },
          { opacity: 1, scale: 1, y: 0, ease: 'power2.out', duration: 0.35 },
          0.56
        );
      }

      if (waveformPillRef.current) {
        arrivalTl.fromTo(
          waveformPillRef.current,
          { opacity: 0, scale: 0.86 },
          { opacity: 1, scale: 1, ease: 'power2.out', duration: 0.32 },
          0.62
        );
      }

      if (leftNavRef.current) {
        arrivalTl.fromTo(
          leftNavRef.current,
          { opacity: 0, x: -16 },
          { opacity: 1, x: 0, ease: 'power2.out', duration: 0.32 },
          0.68
        );
      }

      if (rightCopyRef.current) {
        arrivalTl.fromTo(
          rightCopyRef.current,
          { opacity: 0, y: 18 },
          { opacity: 1, y: 0, ease: 'power2.out', duration: 0.32 },
          0.68
        );
      }

      // Continuous transcript feed scroll from arrival right through Chapter 0
      if (cardFeedRef.current) {
        gsap.fromTo(
          cardFeedRef.current,
          { y: 0 },
          {
            y: -355,
            ease: 'none',
            scrollTrigger: {
              trigger: track,
              start: 'top bottom',
              end: () => `+=${Math.round(window.innerHeight + track.offsetHeight * 0.2)}`,
              scrub: 0.45,
              invalidateOnRefresh: true,
            },
          }
        );
      }

      // Subtle diagonal ribbon parallax behind the pinned 3-column walkthrough
      if (waveSvgRef.current) {
        gsap.fromTo(
          waveSvgRef.current,
          { xPercent: -3.5, scale: 1 },
          {
            xPercent: 3.5,
            scale: 1.04,
            ease: 'none',
            scrollTrigger: {
              trigger: track,
              start: 'top top',
              end: 'bottom bottom',
              scrub: 0.5,
            },
          }
        );
      }

      ScrollTrigger.create({
        trigger: track,
        start: 'top top',
        end: 'bottom bottom',
        onUpdate: (self) => {
          const p = self.progress;
          const nextIdx =
            p < 0.22 ? 0 : p < 0.42 ? 1 : p < 0.62 ? 2 : p < 0.82 ? 3 : 4;
          if (nextIdx !== activeChapterRef.current) {
            activeChapterRef.current = nextIdx;
            setActiveChapter(nextIdx);
          }
        },
      });
    });

    return () => {
      ctx.revert();
      mm.revert();
    };
  }, []);

  const scrollToChapter = (chapterIndex: number) => {
    const track = walkthroughTrackRef.current;
    if (!track) {
      setActiveChapter(chapterIndex);
      return;
    }
    const trackTop = track.getBoundingClientRect().top + window.scrollY;
    const scrollable = Math.max(0, track.offsetHeight - window.innerHeight);
    const targets = [0.06, 0.32, 0.52, 0.72, 0.92];
    const targetY = trackTop + scrollable * (targets[chapterIndex] ?? 0);
    activeChapterRef.current = chapterIndex;
    setActiveChapter(chapterIndex);
    window.scrollTo({ top: targetY, behavior: 'smooth' });
  };

  const currentQa =
    NOTETAKER_QA_PROMPTS.find((p) => p.id === activeQaId) || NOTETAKER_QA_PROMPTS[0];

  const handleFollowUpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const q = followUpInput.trim();
    if (!q) return;
    setCustomFollowUps((prev) => [
      ...prev.slice(-1),
      {
        question: q,
        reply:
          'Found in Marketing Standup (Oct 19): Cheng Liu is back Oct 21 to finalize creative review, while Rohan’s mobile checkout fix ships to staging tomorrow.',
      },
    ]);
    setFollowUpInput('');
  };

  const handleWindow1Ask = (e: React.FormEvent) => {
    e.preventDefault();
    const q = window1Input.trim();
    if (!q) return;
    setWindow1AnswerNote(
      `Answer to “${q}”: Based on Q3 Campaign Planning & Marketing Standup, launch creative sign-off moves to Tuesday with Siobhan.`
    );
    setWindow1Input('');
  };

  const activeHeroScenario = HERO_SCENARIOS[heroScenarioIdx] || HERO_SCENARIOS[0];

  return (
    <div className="bg-[#ffffeb] text-[#1a1a1a]">
      {/* 1. Hero Section */}
      <section ref={heroRef} className="pt-12 sm:pt-16 pb-12 sm:pb-16 overflow-x-clip">
        <Container>
          <div className="max-w-5xl mx-auto text-center">
            <p
              data-nt-hero
              className="text-xs sm:text-[0.8125rem] font-medium uppercase tracking-[0.14em] text-[#1a1a1a]/65 mb-5"
            >
              {isResources ? 'NOTETAKER RESOURCES' : 'WISPR FLOW NOTETAKER'}
            </p>
            <h1
              data-nt-hero
              className="font-display text-[3.35rem] sm:text-[5rem] lg:text-[6rem] xl:text-[6.4rem] leading-[0.93] tracking-[-0.03em] font-normal mb-8"
            >
              Meeting notes that
              <br />
              get <em className="italic font-normal">the details right.</em>
            </h1>

            <div data-nt-hero className="flex justify-center mb-4">
              <button
                type="button"
                onClick={() => onOpenDownload('notetaker')}
                className="inline-flex items-center justify-center gap-2.5 bg-[#f0d7ff] hover:bg-[#e7c4ff] border border-[#1a1a1a] rounded-[0.55rem] px-7 py-4 text-[0.95rem] sm:text-base font-semibold text-[#1a1a1a] transition-transform duration-200 hover:-translate-y-0.5 cursor-pointer whitespace-nowrap"
              >
                <OsButtonIcon os={detectedOS} />
                <span>
                  {detectedOS === 'mac' ? 'Download for Mac' : 'Get started on Windows'}
                </span>
              </button>
            </div>

            <p data-nt-hero className="text-xs sm:text-sm text-[#1a1a1a]/65 mb-12 sm:mb-14">
              Available on Mac and Windows
            </p>
          </div>

          {/* Bottom Split Strip: Staggered Diarized Stream (Left) + Fanned Stacked Reminder Card (Right) */}
          <div
            data-nt-hero
            className="max-w-6xl mx-auto grid md:grid-cols-12 items-end gap-8 lg:gap-12 pt-2"
          >
            {/* Left: Fading Diarized Transcript Stream */}
            <div className="md:col-span-7 text-left select-none min-h-[12.5rem] flex flex-col justify-end">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeHeroScenario.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.35 }}
                  className="space-y-3 sm:space-y-3.5"
                >
                  {activeHeroScenario.lines.map((row) => (
                    <div
                      key={row.id}
                      className={`flex items-center gap-3 ${row.offsetClass} ${row.opacityClass}`}
                    >
                      <span
                        className={`inline-flex items-center gap-1.5 rounded-full px-3 py-0.5 text-[0.7rem] font-semibold leading-tight shrink-0 ${row.badgeBg}`}
                      >
                        <FlowWaveformMark className="w-2.5 h-2.5" />
                        <span>{row.speaker}</span>
                      </span>
                      <span
                        className="font-display text-xl sm:text-[1.48rem] lg:text-[1.62rem] leading-tight text-[#1a1a1a] sm:whitespace-nowrap"
                        style={
                          row.fadeTail
                            ? {
                                WebkitMaskImage:
                                  'linear-gradient(to right, #000 72%, transparent 98%)',
                                maskImage: 'linear-gradient(to right, #000 72%, transparent 98%)',
                              }
                            : undefined
                        }
                      >
                        {row.text}
                      </span>
                    </div>
                  ))}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Right: 3-Layer Fanned Reminder / Capture Card */}
            <div className="md:col-span-5 flex justify-center md:justify-end pb-1">
              <button
                ref={heroFloatRef}
                type="button"
                onClick={() => setHeroScenarioIdx((prev) => (prev + 1) % HERO_SCENARIOS.length)}
                className="relative w-full max-w-[28.5rem] text-left cursor-pointer group pt-5 will-change-transform"
                aria-label="Preview next captured action reminder"
              >
                {/* Back Card 2 */}
                <div
                  aria-hidden="true"
                  className="absolute inset-x-0 top-0 h-14 rounded-xl border-[1.5px] border-[#1a1a1a] bg-[#ffffeb] rotate-[2.2deg] transition-transform duration-300 group-hover:rotate-[3deg]"
                />
                {/* Back Card 1 */}
                <div
                  aria-hidden="true"
                  className="absolute inset-x-0 top-2 h-14 rounded-xl border-[1.5px] border-[#1a1a1a] bg-[#ffffeb] -rotate-[1.1deg] transition-transform duration-300 group-hover:-rotate-[1.8deg]"
                />
                {/* Foreground Active Card */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeHeroScenario.id}
                    initial={{ opacity: 0.7, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0.7, y: -4 }}
                    transition={{ duration: 0.28 }}
                    className="relative rounded-xl border-[1.5px] border-[#1a1a1a] bg-[#ffffeb] px-5 py-4 rotate-[0.9deg] transition-transform duration-300 group-hover:rotate-0 shadow-xs flex items-center justify-between gap-3"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <svg
                        viewBox="0 0 16 16"
                        className="w-3.5 h-3.5 fill-[#1a1a1a] shrink-0"
                        aria-hidden="true"
                      >
                        <path d="M8 0L9.8 6.2L16 8L9.8 9.8L8 16L6.2 9.8L0 8L6.2 6.2L8 0Z" />
                      </svg>
                      <p className="text-sm sm:text-[0.95rem] text-[#1a1a1a] truncate">
                        <span className="text-[#1a1a1a]/75">
                          {activeHeroScenario.actionCard.prefix}
                        </span>{' '}
                        <span className="font-medium">{activeHeroScenario.actionCard.action}</span>
                      </p>
                    </div>
                    <span
                      className={`shrink-0 rounded-full px-3 py-0.5 text-[0.72rem] font-semibold ${activeHeroScenario.actionCard.ownerBg}`}
                    >
                      {activeHeroScenario.actionCard.owner}
                    </span>
                  </motion.div>
                </AnimatePresence>
              </button>
            </div>
          </div>
        </Container>
      </section>

      {/* 2 & 3. Unified Dark Quote -> Nested Emerald Capture Stage (rounded bottom seam matches video) */}
      <div
        ref={quoteSectionRef as React.RefObject<HTMLDivElement>}
        className="relative z-10 bg-[#1a1a1a] text-[#ffffeb] rounded-[2.5rem] sm:rounded-[4.25rem] overflow-x-clip"
      >
        {/* 2. Steven Bartlett Dark Quote Banner */}
        <section className="pt-20 sm:pt-28 pb-16 sm:pb-24 px-5">
          <Container>
            <div data-nt-quote className="max-w-[44rem] mx-auto text-center">
              <blockquote
                className="font-display text-[1.6rem] sm:text-[2.25rem] lg:text-[2.55rem] leading-[1.15] tracking-[-0.02em] mb-8 text-[#ffffeb]"
                style={{ textWrap: 'balance' }}
              >
                “Every important thing I do starts with a conversation. I trust Wispr Notetaker to capture it accurately, so I can focus on what comes next.”
              </blockquote>
              <div className="font-body font-extrabold text-xl sm:text-[1.75rem] uppercase tracking-[-0.04em] leading-none scale-x-[0.82] origin-center text-[#ffffeb]">
                STEVEN BARTLETT
              </div>
              <p className="text-xs sm:text-[0.8125rem] text-[#ffffeb]/55 mt-2.5">
                Host of The Diary of a CEO, Spotify&apos;s #2 global podcast
              </p>
            </div>
          </Container>
        </section>

        {/* 3. Deep Emerald "hard-to-spell words" Interactive Capture Stage */}
        <section
          ref={captureStageRef}
          className="relative bg-[#03473e] text-[#ffffeb] rounded-[2.5rem] sm:rounded-[4.25rem] overflow-x-clip lg:pb-36"
        >
          {/* Desktop Stage — exact match to reference composition */}
          <div className="hidden lg:flex items-center justify-center relative min-h-[46rem] xl:min-h-[48rem] w-full overflow-hidden">
            {/* Bubble 1 — Top-Right Foreground */}
            <div data-bubble-fg className="absolute top-[15.5%] left-[57%] z-20">
              <div className="text-[0.68rem] font-medium leading-none text-[#e8b354] mb-1.5">
                Nathalie
              </div>
              <div className="rounded-[0.8rem] bg-[#08302a] px-4 py-2.5 text-[0.8125rem] leading-[1.35] text-[#ffffeb] whitespace-nowrap">
                Stephen, how&apos;s the process review going?
              </div>
            </div>

            {/* Bubble 2 — Upper-Left Recessed (behind "W" of headline) */}
            <div data-bubble-bg className="absolute top-[29%] left-[17.2%] z-10">
              <div className="text-[0.68rem] font-medium leading-none text-[#ffffeb]/25 mb-1.5">
                Stephen
              </div>
              <div className="rounded-[0.8rem] bg-[#0b5147]/80 px-4 py-2.5 text-[0.8125rem] leading-[1.35] text-[#ffffeb]/45 whitespace-nowrap">
                Most ad hoc updates can go in Asana.
              </div>
            </div>

            {/* Bubble 3 — Far-Left Edge Bleed */}
            <div data-bubble-fg className="absolute top-[45%] -left-2.5 z-20">
              <div className="text-[0.68rem] font-medium leading-none text-[#e8b354] pl-1 mb-1.5">
                Nathalie
              </div>
              <div className="rounded-[0.8rem] bg-[#08302a] pl-5 pr-4 py-2.5 text-[0.8125rem] leading-[1.35] text-[#ffffeb] whitespace-nowrap">
                Make sure the Tableau dashboard is ready.
              </div>
            </div>

            {/* Bubble 4 — Far-Right Foreground */}
            <div data-bubble-fg className="absolute top-[38.5%] right-[3.7%] z-20">
              <div className="text-[0.68rem] font-medium leading-none text-[#d96b6b] mb-1.5">
                Stephen
              </div>
              <div className="rounded-[0.8rem] bg-[#08302a] px-4 py-2.5 text-[0.8125rem] leading-[1.35] text-[#ffffeb] whitespace-nowrap">
                I&apos;d give Raphael carte blanche.
              </div>
            </div>

            {/* Center 3-Line Editorial Headline */}
            <h2 className="relative z-20 font-display text-[4.35rem] xl:text-[4.85rem] leading-[0.94] tracking-[-0.025em] text-[#ffffeb] text-center select-none pointer-events-none">
              <span className="block whitespace-nowrap">Wispr Notetaker captures</span>
              <span className="block whitespace-nowrap">
                the <em className="italic font-normal">hard-to-spell</em> words
              </span>
              <span className="block whitespace-nowrap">
                and <em className="italic font-normal">easy-to-miss</em> details.
              </span>
            </h2>

            {/* Bubble 5 — Lower-Left Foreground */}
            <div data-bubble-fg className="absolute top-[69%] left-[29%] z-20">
              <div className="text-[0.68rem] font-medium leading-none text-[#8ec5e8] mb-1.5">
                Mikel
              </div>
              <div className="rounded-[0.8rem] bg-[#08302a] px-4 py-2.5 text-[0.8125rem] leading-[1.35] text-[#ffffeb] whitespace-nowrap">
                Will you be ready to present the Miro board on Monday?
              </div>
            </div>

            {/* Bubble 6 — Lower-Right Recessed */}
            <div data-bubble-bg className="absolute top-[62.5%] left-[56.8%] z-10">
              <div className="text-[0.68rem] font-medium leading-none text-[#ffffeb]/25 mb-1.5">
                Stephen
              </div>
              <div className="rounded-[0.8rem] bg-[#0b5147]/80 px-4 py-2.5 text-[0.8125rem] leading-[1.35] text-[#ffffeb]/45 whitespace-nowrap">
                Tuesday is better. I want to run it by Siobhan first
              </div>
            </div>
          </div>

          {/* Mobile & Tablet Responsive Flow */}
          <div className="lg:hidden py-18 sm:py-24 px-5 sm:px-8 max-w-2xl mx-auto">
            <div className="flex flex-col gap-3.5 mb-9">
              <div className="self-end">
                <div className="text-[0.68rem] font-medium leading-none text-[#e8b354] mb-1.5">
                  Nathalie
                </div>
                <div className="rounded-[0.8rem] bg-[#08302a] px-4 py-2.5 text-xs sm:text-[0.8125rem] leading-[1.35] text-[#ffffeb]">
                  Stephen, how&apos;s the process review going?
                </div>
              </div>
              <div className="self-start">
                <div className="text-[0.68rem] font-medium leading-none text-[#ffffeb]/25 mb-1.5">
                  Stephen
                </div>
                <div className="rounded-[0.8rem] bg-[#0b5147]/80 px-4 py-2.5 text-xs sm:text-[0.8125rem] leading-[1.35] text-[#ffffeb]/45">
                  Most ad hoc updates can go in Asana.
                </div>
              </div>
            </div>

            <h2
              className="font-display text-[2.35rem] sm:text-[3.65rem] leading-[0.95] tracking-[-0.025em] text-[#ffffeb] text-center my-8"
              style={{ textWrap: 'balance' }}
            >
              Wispr Notetaker captures the <em className="italic font-normal">hard-to-spell</em>{' '}
              words and <em className="italic font-normal">easy-to-miss</em> details.
            </h2>

            <div className="flex flex-col gap-3.5 mt-9">
              <div className="self-start">
                <div className="text-[0.68rem] font-medium leading-none text-[#e8b354] mb-1.5">
                  Nathalie
                </div>
                <div className="rounded-[0.8rem] bg-[#08302a] px-4 py-2.5 text-xs sm:text-[0.8125rem] leading-[1.35] text-[#ffffeb]">
                  Make sure the Tableau dashboard is ready.
                </div>
              </div>
              <div className="self-end">
                <div className="text-[0.68rem] font-medium leading-none text-[#d96b6b] mb-1.5">
                  Stephen
                </div>
                <div className="rounded-[0.8rem] bg-[#08302a] px-4 py-2.5 text-xs sm:text-[0.8125rem] leading-[1.35] text-[#ffffeb]">
                  I&apos;d give Raphael carte blanche.
                </div>
              </div>
              <div className="self-start">
                <div className="text-[0.68rem] font-medium leading-none text-[#8ec5e8] mb-1.5">
                  Mikel
                </div>
                <div className="rounded-[0.8rem] bg-[#08302a] px-4 py-2.5 text-xs sm:text-[0.8125rem] leading-[1.35] text-[#ffffeb]">
                  Will you be ready to present the Miro board on Monday?
                </div>
              </div>
              <div className="self-end">
                <div className="text-[0.68rem] font-medium leading-none text-[#ffffeb]/25 mb-1.5">
                  Stephen
                </div>
                <div className="rounded-[0.8rem] bg-[#0b5147]/80 px-4 py-2.5 text-xs sm:text-[0.8125rem] leading-[1.35] text-[#ffffeb]/45">
                  Tuesday is better. I want to run it by Siobhan first
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* 4. Cream Feature Walkthrough Section */}
      <section className="bg-[#ffffeb] relative z-20">
        {/* Intro Headline (glides cleanly behind the ascending transcript card) */}
        <div className="relative z-10 pt-20 sm:pt-28 pb-10 sm:pb-14 px-5">
          <Container>
            <div className="max-w-3xl mx-auto text-center">
              <h2
                className="font-display text-4xl sm:text-5xl lg:text-[4.15rem] leading-[0.96] tracking-[-0.025em]"
                style={{ textWrap: 'balance' }}
              >
                So you can answer the questions, write the follow-up, and{' '}
                <em className="italic font-normal">keep things moving.</em>
              </h2>
            </div>
          </Container>
        </div>

        {/* Desktop Scroll-Choreographed Sticky 3-Column Feature Walkthrough */}
        <div ref={walkthroughTrackRef} className="hidden lg:block relative z-[35] h-[440vh]">
          <div className="sticky top-0 h-screen flex items-center">
            {/* Subtle Background Diagonal Cream Ribbon Motif (clipped cleanly to viewport) */}
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
              <svg
                ref={waveSvgRef}
                viewBox="0 0 1440 720"
                fill="none"
                aria-hidden="true"
                className="w-full h-full object-cover opacity-85 will-change-transform"
                preserveAspectRatio="none"
              >
                <path
                  d="M-120 440 C 260 440, 390 190, 740 190 C 1090 190, 1210 470, 1560 430"
                  stroke="#f2f0de"
                  strokeWidth="44"
                  strokeLinecap="round"
                />
              </svg>
            </div>

            <div className="max-w-[78rem] mx-auto px-8 w-full grid grid-cols-12 items-center gap-6 relative z-10">
              {/* Left Column: 5-Chapter Vertical Navigation (terracotta active accent) */}
              <div ref={leftNavRef} className="col-span-3 flex flex-col items-start space-y-1">
                {(
                  [
                    'The details',
                    'Ask anything',
                    'What did I miss?',
                    'Summary',
                    'MCP',
                  ] as const
                ).map((label, idx) => (
                  <button
                    key={label}
                    type="button"
                    onClick={() => scrollToChapter(idx)}
                    className={`text-left text-[1.22rem] leading-[1.68] tracking-[-0.015em] transition-colors duration-200 cursor-pointer ${
                      activeChapter === idx
                        ? 'text-[#d14c2e] font-medium'
                        : 'text-[#1a1a1a]/30 hover:text-[#1a1a1a]/65 font-normal'
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>

              {/* Center Column: Uniform 27.5rem/29.5rem Square Morphing Stage */}
              <div className="col-span-6 flex justify-center relative z-30">
                <div
                  ref={floatingCardRef}
                  className="w-[27.5rem] h-[27.5rem] xl:w-[29.5rem] xl:h-[29.5rem] relative z-30"
                >
                  {/* Chapter 0: Cream-Beige Live Transcript Card (absolute inset-0 keeps all chapters centered in the exact same square stage) */}
                  <div
                    className={`absolute inset-0 w-full h-full rounded-[1.5rem] bg-[#e6e4d2] border border-[#1a1a1a]/[0.05] shadow-[0_24px_60px_-18px_rgba(26,26,26,0.14)] px-6 pt-6 pb-4 flex flex-col justify-between transition-all duration-300 ${
                      activeChapter === 0
                        ? 'opacity-100 scale-100 pointer-events-auto z-20'
                        : 'opacity-0 scale-[0.97] pointer-events-none z-0'
                    }`}
                    aria-hidden={activeChapter !== 0}
                  >
                    {/* Floating Portrait 1: Top-Right */}
                    <button
                      ref={topRightPortraitRef}
                      type="button"
                      onClick={() =>
                        setHighlightedSpeaker((prev) =>
                          prev === 'stephen' ? null : 'stephen'
                        )
                      }
                      aria-label="Highlight Stephen lines"
                      className={`absolute -top-6 -right-8 w-24 h-24 rounded-[0.85rem] overflow-hidden shadow-[0_14px_30px_rgba(0,0,0,0.22)] transition-transform duration-200 hover:scale-105 cursor-pointer z-20 ${
                        highlightedSpeaker === 'stephen' ? 'ring-2 ring-[#03473e]' : ''
                      }`}
                    >
                      <img
                        src={daveImg}
                        alt="Stephen"
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover object-top"
                      />
                    </button>

                    {/* Floating Portrait 2: Mid-Right with coral pill tag */}
                    <button
                      ref={midRightPortraitRef}
                      type="button"
                      onClick={() =>
                        setHighlightedSpeaker((prev) => (prev === 'mikel' ? null : 'mikel'))
                      }
                      aria-label="Highlight Mikel lines"
                      className={`absolute top-[37%] -right-9 w-24 h-24 rounded-[0.85rem] overflow-hidden shadow-[0_14px_30px_rgba(0,0,0,0.22)] transition-transform duration-200 hover:scale-105 cursor-pointer z-20 ${
                        highlightedSpeaker === 'mikel' ? 'ring-2 ring-[#03473e]' : ''
                      }`}
                    >
                      <img
                        src={alexImg}
                        alt="Mikel"
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover object-top"
                      />
                      <span className="absolute bottom-1.5 left-1.5 rounded-full bg-[#e07a7a] text-[#ffffeb] text-[0.6rem] font-semibold px-2 py-0.5 leading-none shadow-xs">
                        Mikel
                      </span>
                    </button>

                    {/* Floating Portrait 3: Bottom-Left with warm amber pill tag */}
                    <button
                      ref={bottomLeftPortraitRef}
                      type="button"
                      onClick={() =>
                        setHighlightedSpeaker((prev) =>
                          prev === 'nathalie' ? null : 'nathalie'
                        )
                      }
                      aria-label="Highlight Nathalie lines"
                      className={`absolute bottom-[10%] -left-9 w-24 h-24 rounded-[0.85rem] overflow-hidden shadow-[0_14px_30px_rgba(0,0,0,0.22)] transition-transform duration-200 hover:scale-105 cursor-pointer z-20 ${
                        highlightedSpeaker === 'nathalie' ? 'ring-2 ring-[#03473e]' : ''
                      }`}
                    >
                      <img
                        src={elenaImg}
                        alt="Nathalie"
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover object-top"
                      />
                      <span className="absolute bottom-1.5 left-1.5 rounded-full bg-[#e8b354] text-[#1a1a1a] text-[0.6rem] font-semibold px-2 py-0.5 leading-none shadow-xs">
                        Nathalie
                      </span>
                    </button>

                    {/* Inner Scrollable Transcript Viewport with Top/Bottom Gradient Fade */}
                    <div
                      className="flex-1 overflow-hidden relative"
                      style={{
                        WebkitMaskImage:
                          'linear-gradient(to bottom, transparent 0%, #000 13%, #000 84%, transparent 100%)',
                        maskImage:
                          'linear-gradient(to bottom, transparent 0%, #000 13%, #000 84%, transparent 100%)',
                      }}
                    >
                      <div ref={cardFeedRef} className="space-y-3 pt-1">
                        {WALKTHROUGH_TRANSCRIPT.map((row) => {
                          const isActive =
                            highlightedSpeaker === null ||
                            highlightedSpeaker === row.speakerKey;
                          return (
                            <div
                              key={row.id}
                              className={`transition-opacity duration-200 ${
                                isActive ? 'opacity-100' : 'opacity-25'
                              }`}
                            >
                              <div
                                className={`text-[0.65rem] font-medium leading-none mb-1 ${row.labelColor}`}
                              >
                                {row.speaker}
                              </div>
                              <div
                                className={`inline-block rounded-lg px-3.5 py-2 text-[0.76rem] leading-[1.3] ${
                                  row.highlighted
                                    ? 'bg-[#ffffff] border border-[#1a1a1a]/12 text-[#1a1a1a] shadow-[0_2px_6px_rgba(26,26,26,0.06)] font-medium'
                                    : 'bg-[#f4f2e4] border border-[#1a1a1a]/[0.05] text-[#1a1a1a]/90'
                                }`}
                              >
                                {row.text}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Bottom-Center Emerald Waveform Pill */}
                    <div ref={waveformPillRef} className="flex justify-center pt-2 shrink-0">
                      <button
                        type="button"
                        onClick={() => setHighlightedSpeaker(null)}
                        title="Show all speakers"
                        className="inline-flex items-center justify-center rounded-lg bg-[#03473e] text-[#ffffeb] px-3.5 py-2 shadow-md hover:opacity-90 transition-opacity cursor-pointer"
                      >
                        <FlowWaveformMark className="w-4 h-3.5" />
                      </button>
                    </div>
                  </div>

                  <div
                    className={`absolute inset-0 w-full h-full z-20 ${
                      activeChapter === 0 ? 'pointer-events-none' : 'pointer-events-auto'
                    }`}
                  >
                    <AnimatePresence mode="wait">
                      {activeChapter === 1 && (
                        /* Chapter 1: Ask anything — Spot Illustration + Discrete Smooth Prompt Reveal -> Sent Pill */
                        <motion.div
                          key="chapter-ask"
                          initial={{ opacity: 0, scale: 0.98 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.98 }}
                          transition={{ duration: 0.28 }}
                          className="w-full h-full rounded-[1.5rem] bg-[#e6e4d2] border border-[#1a1a1a]/[0.05] shadow-[0_24px_60px_-18px_rgba(26,26,26,0.14)] p-6 flex flex-col justify-between relative overflow-hidden text-left"
                        >
                          {(() => {
                            const fullQ = "What's blocking the launch this week?";
                            const sent = askPhase >= 2 || Boolean(window1AnswerNote);
                            return (
                              <>
                                {/* Sent Question Pill + AI Response when sent */}
                                <div className="min-h-[2.25rem] flex flex-col items-end gap-2 z-10">
                                  {sent && (
                                    <motion.div
                                      initial={{ opacity: 0, y: 14, scale: 0.95 }}
                                      animate={{ opacity: 1, y: 0, scale: 1 }}
                                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                                      className="rounded-xl bg-[#1a1a1a] text-[#ffffeb] px-3.5 py-2 text-xs font-medium shadow-md"
                                    >
                                      {window1AnswerNote ? 'Your question' : fullQ}
                                    </motion.div>
                                  )}
                                  {sent && (
                                    <motion.div
                                      initial={{ opacity: 0, y: 10 }}
                                      animate={{ opacity: 1, y: 0 }}
                                      transition={{ delay: 0.14, duration: 0.35 }}
                                      className="w-full rounded-xl bg-[#ffffeb]/95 border border-[#1a1a1a]/10 p-3.5 text-[0.74rem] text-[#1a1a1a]/85 leading-relaxed shadow-sm space-y-1.5"
                                    >
                                      {window1AnswerNote ? (
                                        <p>{window1AnswerNote}</p>
                                      ) : (
                                        <>
                                          <p className="font-medium text-[#1a1a1a]">
                                            I searched through your meetings and notes and found three potential launch blockers that people have mentioned:
                                          </p>
                                          <ul className="space-y-1 list-disc list-inside text-[0.71rem]">
                                            <li>
                                              <strong>Cheng Liu</strong> returns Oct 21 for final asset sign-off.
                                            </li>
                                            <li>
                                              <strong>Mobile checkout fix</strong> ships to staging Thursday.
                                            </li>
                                          </ul>
                                          <div className="pt-1 text-[0.65rem] font-semibold text-[#03473e]">
                                            Sources: Marketing Standup · Q3 Campaign Sync
                                          </div>
                                        </>
                                      )}
                                    </motion.div>
                                  )}
                                </div>

                                {/* Center Editorial Magnifying Glass Illustration */}
                                <div
                                  className={`pointer-events-none absolute inset-0 flex flex-col items-center justify-center text-center transition-all duration-400 px-6 ${
                                    sent ? 'opacity-10 scale-90 -translate-y-2' : 'opacity-100 scale-100'
                                  }`}
                                >
                                  <svg
                                    viewBox="0 0 110 96"
                                    className="w-24 h-20 mb-2"
                                    fill="none"
                                    aria-hidden="true"
                                  >
                                    {/* Botanical Leaves */}
                                    <path
                                      d="M66 56 C78 46, 86 30, 82 18 C70 22, 62 38, 66 56 Z"
                                      fill="#4aa96c"
                                    />
                                    <path
                                      d="M68 58 C82 54, 96 44, 98 32 C84 30, 72 42, 68 58 Z"
                                      fill="#2d6a4f"
                                    />
                                    {/* Document Card */}
                                    <rect
                                      x="30"
                                      y="24"
                                      width="42"
                                      height="50"
                                      rx="5"
                                      fill="#f0d7ff"
                                      stroke="#1a1a1a"
                                      strokeWidth="2"
                                    />
                                    <line x1="38" y1="36" x2="62" y2="36" stroke="#1a1a1a" strokeWidth="2" strokeLinecap="round" />
                                    <line x1="38" y1="45" x2="58" y2="45" stroke="#1a1a1a" strokeWidth="2" strokeLinecap="round" />
                                    <line x1="38" y1="54" x2="54" y2="54" stroke="#1a1a1a" strokeWidth="2" strokeLinecap="round" />
                                    {/* Magnifying Glass */}
                                    <circle
                                      cx="47"
                                      cy="34"
                                      r="14"
                                      fill="#ffffeb"
                                      fillOpacity="0.88"
                                      stroke="#ffa946"
                                      strokeWidth="3.5"
                                    />
                                    <line
                                      x1="37"
                                      y1="44"
                                      x2="26"
                                      y2="56"
                                      stroke="#1a1a1a"
                                      strokeWidth="4"
                                      strokeLinecap="round"
                                    />
                                  </svg>
                                  <p className="font-display text-[1.15rem] leading-tight text-[#1a1a1a]/80">
                                    Ask anything about
                                    <br />
                                    your meetings
                                  </p>
                                </div>

                                {/* Bottom Prompt Composer with Smooth Clip Reveal */}
                                <form
                                  onSubmit={handleWindow1Ask}
                                  className="rounded-xl bg-[#ffffeb] border border-[#1a1a1a]/12 px-3.5 py-2.5 flex items-center gap-2 shadow-sm z-10 relative"
                                >
                                  <div className="flex-1 relative flex items-center overflow-hidden min-h-[1.25rem]">
                                    <input
                                      type="text"
                                      value={window1Input}
                                      onChange={(e) => setWindow1Input(e.target.value)}
                                      placeholder={askPhase === 1 ? '' : 'Ask anything'}
                                      className="w-full bg-transparent text-xs text-[#1a1a1a] placeholder:text-[#1a1a1a]/45 focus:outline-none"
                                    />
                                    {!window1Input && askPhase === 1 && (
                                      <motion.span
                                        initial={{ clipPath: 'inset(0 100% 0 0)' }}
                                        animate={{ clipPath: 'inset(0 0% 0 0)' }}
                                        transition={{ duration: 0.65, ease: 'easeOut' }}
                                        className="pointer-events-none absolute inset-y-0 left-0 flex items-center text-xs text-[#1a1a1a] whitespace-nowrap"
                                      >
                                        {fullQ}
                                      </motion.span>
                                    )}
                                  </div>
                                  <button
                                    type="submit"
                                    aria-label="Send question"
                                    className={`w-6 h-6 rounded-full bg-[#1a1a1a] text-[#ffffeb] flex items-center justify-center transition-transform duration-200 cursor-pointer shrink-0 ${
                                      askPhase === 1 ? 'scale-110 ring-2 ring-[#ffa946]/70' : 'hover:opacity-85'
                                    }`}
                                  >
                                    <Send className="w-3 h-3" />
                                  </button>
                                </form>
                              </>
                            );
                          })()}
                        </motion.div>
                      )}

                      {activeChapter === 2 && (
                        /* Chapter 2: What did I miss? — Zoom-Out Tablet Showcase + Auto Recap Drawer */
                        <motion.div
                          key="chapter-missed"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.28 }}
                          className="w-full h-full rounded-[1.5rem] bg-[#141414] p-2.5 shadow-2xl overflow-hidden text-left"
                        >
                          <motion.div
                            initial={{ scale: 1.32, x: -32, y: -24 }}
                            animate={{ scale: 1, x: 0, y: 0 }}
                            transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
                            className="w-full h-full rounded-[1.15rem] bg-[#ffffff] text-[#1a1a1a] p-4 flex flex-col justify-between overflow-hidden relative"
                          >
                            <div>
                              <div className="flex items-center justify-between text-[0.65rem] text-[#1a1a1a]/45 mb-2">
                                <div className="flex items-center gap-1">
                                  <span className="w-2 h-2 rounded-full bg-[#ff5f57]" />
                                  <span className="w-2 h-2 rounded-full bg-[#febc2e]" />
                                  <span className="w-2 h-2 rounded-full bg-[#28c840]" />
                                </div>
                                <span>20 Feb 2026</span>
                              </div>
                              <div className="font-display text-lg mb-2">
                                Q3 Campaign Planning
                              </div>
                              <div className="flex items-center gap-1.5 border-b border-[#1a1a1a]/10 pb-2 mb-3 text-[0.68rem]">
                                {(
                                  [
                                    { id: 'insights', label: 'My Thoughts' },
                                    { id: 'transcript', label: 'Transcript' },
                                    { id: 'summary', label: 'Summary' },
                                  ] as const
                                ).map((t) => (
                                  <button
                                    key={t.id}
                                    type="button"
                                    onClick={() => setWindow2Tab(t.id)}
                                    className={`px-2 py-0.5 rounded font-medium cursor-pointer transition-colors ${
                                      window2Tab === t.id
                                        ? 'bg-[#e6e4d2] text-[#1a1a1a]'
                                        : 'text-[#1a1a1a]/55 hover:text-[#1a1a1a]'
                                    }`}
                                  >
                                    {t.label}
                                  </button>
                                ))}
                              </div>

                              <AnimatePresence>
                                {catchUpOpen && (
                                  <motion.div
                                    initial={{ opacity: 0, y: 14, scale: 0.97 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, y: 10, scale: 0.97 }}
                                    transition={{ duration: 0.34, ease: [0.22, 1, 0.36, 1] }}
                                    className="mb-2.5 rounded-xl bg-[#1a1a1a]/92 backdrop-blur-md border border-[#1a1a1a]/15 p-3 text-[0.66rem] text-[#ffffeb] shadow-lg space-y-1.5"
                                  >
                                    <div className="flex items-center justify-between text-[#cef5ca] font-semibold">
                                      <span>Your five focus areas, in priority order:</span>
                                      <span className="text-[0.6rem] text-[#ffffeb]/60 font-normal">
                                        Last 5 min
                                      </span>
                                    </div>
                                    <ol className="space-y-0.5 text-[#ffffeb]/85 list-decimal list-inside leading-snug">
                                      <li>Budget modification — shift 20% paid spend</li>
                                      <li>Q3 creative plan &amp; loyalty offer test</li>
                                      <li>Channel strategy &amp; analytics sign-off</li>
                                    </ol>
                                  </motion.div>
                                )}
                              </AnimatePresence>

                              <div className="space-y-2.5 text-[0.7rem] leading-snug text-[#1a1a1a]/80">
                                <div className="inline-flex items-center gap-1.5 rounded-full bg-[#f4f2e4] px-2.5 py-1 text-[0.62rem] font-mono text-[#1a1a1a]/70">
                                  <FlowWaveformMark className="w-3 h-2.5 text-[#03473e]" />
                                  <span>28:32</span>
                                </div>
                                <div>
                                  <div className="text-[0.62rem] text-[#1a1a1a]/45 mb-0.5">Stephen</div>
                                  <p>Where are we landing on the budget?</p>
                                </div>
                                <div>
                                  <div className="text-[0.62rem] text-[#e59a38] mb-0.5">Nathalie</div>
                                  <p>
                                    My team wants to cut paid social spend by 20% and reallocate. Let&apos;s confirm channel ROI first.
                                  </p>
                                </div>
                                {!catchUpOpen && (
                                  <div>
                                    <div className="text-[0.62rem] text-[#5b9bd5] mb-0.5">Mikel</div>
                                    <p>What about testing the loyalty offer next week?</p>
                                  </div>
                                )}
                              </div>
                            </div>

                            <div className="flex items-center justify-between pt-2 border-t border-[#1a1a1a]/8">
                              <span className="text-[0.66rem] text-[#1a1a1a]/40">Ask anything...</span>
                              <button
                                type="button"
                                onClick={() => setCatchUpOpen((v) => !v)}
                                className={`relative inline-flex items-center gap-1 rounded-md border px-2.5 py-1 text-[0.66rem] font-semibold transition-all cursor-pointer shadow-xs ${
                                  catchUpOpen
                                    ? 'bg-[#03473e] text-[#ffffeb] border-[#03473e]'
                                    : catchUpPulse
                                    ? 'bg-[#cef5ca] text-[#1a1a1a] border-[#03473e] ring-4 ring-[#cef5ca]/70 scale-95'
                                    : 'bg-[#ffffeb] text-[#1a1a1a] border-[#1a1a1a]/15 hover:bg-[#cef5ca]'
                                }`}
                              >
                                <Sparkles className={`w-2.5 h-2.5 ${catchUpOpen ? 'text-[#cef5ca]' : 'text-[#03473e]'}`} />
                                <span>What did I miss?</span>
                              </button>
                            </div>
                          </motion.div>
                        </motion.div>
                      )}

                      {activeChapter === 3 && (
                        /* Chapter 3: Summary — Atmospheric Photo Backdrop + "Generating Flow Summary..." -> Structured Bullets */
                        <motion.div
                          key="chapter-summary"
                          initial={{ opacity: 0, scale: 0.98 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.98 }}
                          transition={{ duration: 0.28 }}
                          className="w-full h-full rounded-[1.5rem] overflow-hidden relative p-5 flex items-center justify-center shadow-2xl text-left"
                        >
                          <img
                            src={atmosphereImg}
                            alt=""
                            className="absolute inset-0 w-full h-full object-cover scale-105"
                          />
                          <div className="absolute inset-0 bg-[#1a120d]/45 backdrop-blur-[2px]" />

                          <div className="relative z-10 w-full h-full rounded-xl bg-[#ffffff] text-[#1a1a1a] p-4 shadow-2xl flex flex-col justify-between overflow-hidden">
                            <div>
                              <div className="flex items-center justify-between text-[0.65rem] text-[#1a1a1a]/45 mb-2">
                                <div className="flex items-center gap-1">
                                  <span className="w-2 h-2 rounded-full bg-[#ff5f57]" />
                                  <span className="w-2 h-2 rounded-full bg-[#febc2e]" />
                                  <span className="w-2 h-2 rounded-full bg-[#28c840]" />
                                </div>
                                <span>Enhanced Note</span>
                              </div>
                              <div className="font-display text-lg mb-2">
                                Q3 Campaign Planning
                              </div>
                              <div className="flex items-center gap-1.5 border-b border-[#1a1a1a]/10 pb-2 mb-3 text-[0.66rem]">
                                <span className="px-2 py-0.5 rounded bg-[#f4f2e4] font-semibold">
                                  Summary
                                </span>
                                <span className="text-[#1a1a1a]/45">Transcript</span>
                              </div>

                              <AnimatePresence mode="wait">
                                {summaryStep < 4 ? (
                                  <motion.div
                                    key="summary-generating"
                                    initial={{ opacity: 0, y: 4 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -6 }}
                                    transition={{ duration: 0.25 }}
                                    className="rounded-lg bg-[#faf9f2] border border-[#1a1a1a]/8 p-3 space-y-2.5"
                                  >
                                    <div className="flex items-center gap-1.5 text-[0.62rem] font-semibold uppercase tracking-wider text-[#03473e]">
                                      <Sparkles className="w-3 h-3" />
                                      <span>ENHANCED SUMMARY</span>
                                    </div>
                                    <div className="text-xs font-semibold text-[#1a1a1a]">
                                      {summaryStep < 3
                                        ? 'Generating Flow Summary...'
                                        : 'Summary ready'}
                                    </div>

                                    <div className="space-y-2 text-[0.7rem] text-[#1a1a1a]/80">
                                      {[
                                        'Building comprehensive contextual summary',
                                        'Mapping out dependencies and blockers',
                                        'Consolidating action items with owners',
                                      ].map((stepLabel, sIdx) => {
                                        const done = summaryStep > sIdx;
                                        const current = summaryStep === sIdx;
                                        return (
                                          <div
                                            key={stepLabel}
                                            className={`flex items-center gap-2 transition-opacity duration-300 ${
                                              done || current ? 'opacity-100' : 'opacity-35'
                                            }`}
                                          >
                                            <span
                                              className={`w-3.5 h-3.5 rounded-full flex items-center justify-center text-[0.55rem] font-bold shrink-0 ${
                                                done
                                                  ? 'bg-[#03473e] text-[#ffffeb]'
                                                  : current
                                                  ? 'bg-[#ffa946] text-[#1a1a1a]'
                                                  : 'bg-[#1a1a1a]/15 text-[#1a1a1a]/50'
                                              }`}
                                            >
                                              {done ? '✓' : '•'}
                                            </span>
                                            <span className={done ? 'font-medium text-[#1a1a1a]' : ''}>
                                              {stepLabel}
                                            </span>
                                          </div>
                                        );
                                      })}
                                    </div>
                                  </motion.div>
                                ) : (
                                  <motion.div
                                    key="summary-bullets"
                                    initial={{ opacity: 0, y: 8 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                                    className="space-y-2.5 text-[0.68rem] text-[#1a1a1a]/85 leading-snug"
                                  >
                                    <div>
                                      <div className="text-[0.64rem] font-bold uppercase tracking-wider text-[#03473e] mb-1">
                                        Creative Direction
                                      </div>
                                      <ul className="space-y-1 list-disc list-inside">
                                        <li>Siobhan reviews final Miro layout on Tuesday.</li>
                                        <li>Raphael owns design QA sign-off this sprint.</li>
                                      </ul>
                                    </div>
                                    <div>
                                      <div className="text-[0.64rem] font-bold uppercase tracking-wider text-[#03473e] mb-1">
                                        Channel Strategy
                                      </div>
                                      <ul className="space-y-1 list-disc list-inside">
                                        <li>Reallocate 20% paid spend pending ROI check.</li>
                                        <li>Route ad-hoc updates through Asana &amp; Tableau.</li>
                                      </ul>
                                    </div>
                                  </motion.div>
                                )}
                              </AnimatePresence>
                            </div>

                            {/* Interactive Topic Tabs once ready */}
                            <div className="pt-2 border-t border-[#1a1a1a]/8 flex items-center justify-between text-[0.65rem]">
                              <div className="flex gap-1">
                                {(['timelines', 'decisions', 'next-steps'] as const).map((t) => (
                                  <button
                                    key={t}
                                    type="button"
                                    onClick={() => setActiveSummaryChapter(t)}
                                    className={`px-2 py-0.5 rounded capitalize cursor-pointer ${
                                      activeSummaryChapter === t
                                        ? 'bg-[#1a1a1a] text-[#ffffeb] font-semibold'
                                        : 'text-[#1a1a1a]/55 hover:text-[#1a1a1a]'
                                    }`}
                                  >
                                    {t.replace('-', ' ')}
                                  </button>
                                ))}
                              </div>
                              <span className="text-[#03473e] font-semibold">
                                {activeSummaryChapter === 'timelines'
                                  ? 'Oct 21 · QA'
                                  : activeSummaryChapter === 'decisions'
                                  ? 'Asana + Tableau'
                                  : '3 owners'}
                              </span>
                            </div>
                          </div>
                        </motion.div>
                      )}

                      {activeChapter === 4 && (
                        /* Chapter 4: MCP — Solid Obsidian "What should we work on?" Prompt Window */
                        <motion.div
                          key="chapter-mcp"
                          initial={{ opacity: 0, scale: 0.98 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.98 }}
                          transition={{ duration: 0.28 }}
                          className="w-full h-full rounded-[1.5rem] bg-[#111111] text-[#ffffeb] p-7 flex flex-col justify-between items-center text-center shadow-2xl"
                        >
                          <motion.div
                            animate={{ opacity: [0.35, 0.8, 0.35], scale: [1, 1.08, 1] }}
                            transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut' }}
                            className="pt-2 text-[#ffffeb]/55"
                          >
                            <Sparkles className="w-5 h-5 mx-auto" />
                          </motion.div>

                          <div className="w-full space-y-4">
                            <h4 className="font-display text-2xl sm:text-[1.85rem] leading-tight text-[#ffffeb]">
                              What should we work on?
                            </h4>

                            {(() => {
                              const selected =
                                MCP_TOOLS.find((m) => m.id === activeMcpTool) || MCP_TOOLS[0];
                              const samplePrompt = `Use the last meeting to draft follow-ups in ${selected.name}...`;
                              return (
                                <div className="rounded-xl bg-[#1b1b1b] border border-white/10 p-4 text-left space-y-3">
                                  <div className="min-h-[3.5rem] text-xs text-[#ffffeb]/85 leading-relaxed relative overflow-hidden">
                                    {mcpPhase === 0 ? (
                                      <span className="text-[#ffffeb]/40">
                                        Write a message...
                                      </span>
                                    ) : (
                                      <motion.span
                                        key={selected.id}
                                        initial={{ opacity: 0, y: 4 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                                        className="block"
                                      >
                                        {samplePrompt}
                                      </motion.span>
                                    )}
                                  </div>
                                  <div className="flex items-center justify-between pt-1">
                                    <div className="flex items-center gap-1">
                                      {MCP_TOOLS.map((tool) => (
                                        <button
                                          key={tool.id}
                                          type="button"
                                          onClick={() => setActiveMcpTool(tool.id)}
                                          className={`px-2 py-0.5 rounded text-[0.65rem] font-medium transition-colors cursor-pointer ${
                                            activeMcpTool === tool.id
                                              ? 'bg-[#ffffeb] text-[#111111]'
                                              : 'bg-white/10 text-[#ffffeb]/65 hover:text-[#ffffeb]'
                                          }`}
                                        >
                                          {tool.name}
                                        </button>
                                      ))}
                                    </div>
                                    <span className="w-5 h-5 rounded-full bg-[#ffffeb] text-[#111111] flex items-center justify-center">
                                      <ArrowRight className="w-3 h-3" />
                                    </span>
                                  </div>
                                </div>
                              );
                            })()}
                          </div>

                          <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-3.5 py-1.5 text-[0.7rem] font-medium text-[#ffffeb]/75">
                            <FlowWaveformMark className="w-3.5 h-3" />
                            <span>MCP Connected</span>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </div>

              {/* Right Column: Active Feature Headline & Editorial Copy */}
              <div ref={rightCopyRef} className="col-span-3 pl-2 text-left">
                <AnimatePresence mode="wait">
                  {activeChapter === 0 && (
                    <motion.div
                      key="copy-0"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.24 }}
                    >
                      <h3 className="font-display text-[2.25rem] xl:text-[2.5rem] leading-[1.02] tracking-[-0.02em] mb-3.5">
                        Get the <em className="italic font-normal">details</em> right.
                      </h3>
                      <p className="text-[0.875rem] text-[#1a1a1a]/75 leading-[1.55]">
                        From uncommon names to industry jargon, Wispr&apos;s notetaking AI uses your dictionary and calendar to help capture the details that matter in your meeting transcript and summary.
                      </p>
                    </motion.div>
                  )}
                  {activeChapter === 1 && (
                    <motion.div
                      key="copy-1"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.24 }}
                    >
                      <h3 className="font-display text-[2.25rem] xl:text-[2.5rem] leading-[1.02] tracking-[-0.02em] mb-3.5">
                        Stop digging. <em className="italic font-normal">Just ask.</em>
                      </h3>
                      <p className="text-[0.875rem] text-[#1a1a1a]/75 leading-[1.55]">
                        Notetaker&apos;s AI searches across your prior meeting notes and the web for the answer, then links you to the source.
                      </p>
                    </motion.div>
                  )}
                  {activeChapter === 2 && (
                    <motion.div
                      key="copy-2"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.24 }}
                    >
                      <h3 className="font-display text-[2.25rem] xl:text-[2.5rem] leading-[1.02] tracking-[-0.02em] mb-3.5">
                        Zoned out? <em className="italic font-normal">Catch up</em> in seconds.
                      </h3>
                      <p className="text-[0.875rem] text-[#1a1a1a]/75 leading-[1.55]">
                        No more &quot;sorry, can you repeat that?&quot; Tap &quot;What did I miss?&quot; and Notetaker gives you a summary of the last five minutes. You&apos;re caught up before anyone notices.
                      </p>
                    </motion.div>
                  )}
                  {activeChapter === 3 && (
                    <motion.div
                      key="copy-3"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.24 }}
                    >
                      <h3 className="font-display text-[2.25rem] xl:text-[2.5rem] leading-[1.02] tracking-[-0.02em] mb-3.5">
                        Get a summary <em className="italic font-normal">you&apos;ll actually read.</em>
                      </h3>
                      <p className="text-[0.875rem] text-[#1a1a1a]/75 leading-[1.55]">
                        Our AI notetaker pulls out timelines, decisions, and next steps, then organizes everything by topic so you can find what matters.
                      </p>
                    </motion.div>
                  )}
                  {activeChapter === 4 && (
                    <motion.div
                      key="copy-4"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.24 }}
                    >
                      <h3 className="font-display text-[2.25rem] xl:text-[2.5rem] leading-[1.02] tracking-[-0.02em] mb-3.5">
                        Connect to <em className="italic font-normal">all</em> your AI tools.
                      </h3>
                      <p className="text-[0.875rem] text-[#1a1a1a]/75 leading-[1.55]">
                        Bring your meeting history into Claude, ChatGPT, Gemini, or any tool that supports MCP. Put your meeting notes to work alongside your docs and projects. No copy-paste required.
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile & Tablet Stacked Walkthrough Layout */}
        <div className="lg:hidden pb-20">
          <Container>
            {/* 4a. Conversation Card */}
            <div className="max-w-xl mx-auto relative mb-20">
              <div className="rounded-[1.5rem] bg-[#faf9ed] border border-[#1a1a1a]/8 p-5 sm:p-8 shadow-md">
                <div className="flex flex-wrap gap-2 mb-4">
                  {(['nathalie', 'stephen', 'mikel'] as const).map((spk) => (
                    <button
                      key={spk}
                      type="button"
                      onClick={() => setHighlightedSpeaker((p) => (p === spk ? null : spk))}
                      className={`px-3 py-1 rounded-md text-xs font-semibold capitalize cursor-pointer transition-colors ${
                        highlightedSpeaker === spk
                          ? 'bg-[#03473e] text-[#ffffeb]'
                          : 'bg-[#ffffeb] text-[#1a1a1a] border border-[#1a1a1a]/10'
                      }`}
                    >
                      {spk}
                    </button>
                  ))}
                </div>
                <div className="space-y-3">
                  {CONVERSATION_TRANSCRIPT.map((row) => {
                    const isActive =
                      highlightedSpeaker === null || highlightedSpeaker === row.speakerKey;
                    return (
                      <div
                        key={row.id}
                        className={`transition-opacity duration-200 ${
                          isActive ? 'opacity-100' : 'opacity-30'
                        }`}
                      >
                        <div className={`text-[0.68rem] font-medium mb-1 ${row.labelColor}`}>
                          {row.speaker}
                        </div>
                        <div
                          className={`inline-block rounded-lg px-3 py-2 text-xs sm:text-sm ${
                            row.highlighted
                              ? 'bg-[#ffffff] border border-[#1a1a1a]/10 font-medium text-[#1a1a1a]'
                              : 'bg-[#f5f4e6] border border-[#1a1a1a]/6 text-[#1a1a1a]/90'
                          }`}
                        >
                          {row.text}
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div className="flex justify-center mt-5">
                  <button
                    type="button"
                    onClick={() => setHighlightedSpeaker(null)}
                    title="Show all speakers"
                    className="inline-flex items-center justify-center rounded-lg bg-[#03473e] text-[#ffffeb] px-4 py-2 shadow-sm cursor-pointer"
                  >
                    <FlowWaveformMark className="w-4 h-3.5" />
                  </button>
                </div>
              </div>
            </div>

            {/* 4b. Feature 1: Get the details right. */}
            <div className="max-w-2xl mx-auto text-center mb-20">
              <h3 className="font-display text-3xl sm:text-[2.75rem] leading-[1.02] tracking-[-0.02em] mb-3">
                Get the <em className="italic font-normal">details</em> right.
              </h3>
              <p className="text-sm sm:text-base text-[#1a1a1a]/75 max-w-lg mx-auto leading-relaxed mb-8">
                From uncommon names to industry jargon, Wispr&apos;s notetaking AI uses your dictionary and calendar to help capture the details that matter in your meeting transcript and summary.
              </p>

              {/* Interactive Q&A Mockup Card */}
              <div className="rounded-[1.75rem] bg-[#e2e2d2] p-5 sm:p-8 text-left">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                  <div className="flex flex-wrap gap-1.5">
                    {NOTETAKER_QA_PROMPTS.map((item) => (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => setActiveQaId(item.id)}
                        className={`px-3 py-1 rounded-md text-xs font-medium transition-colors cursor-pointer ${
                          activeQaId === item.id
                            ? 'bg-[#1a1a1a] text-[#ffffeb]'
                            : 'bg-[#ffffeb]/70 text-[#1a1a1a]/75 hover:bg-[#ffffeb]'
                        }`}
                      >
                        {item.id === 'blockers'
                          ? 'Launch blockers'
                          : item.id === 'decisions'
                          ? 'Campaign owners'
                          : 'Last 5 mins'}
                      </button>
                    ))}
                  </div>
                  <span className="ml-auto rounded-full bg-[#1a1a1a] text-[#ffffeb] px-4 py-1.5 text-xs font-medium">
                    {currentQa.question}
                  </span>
                </div>

                <div className="rounded-2xl bg-[#ffffeb] p-5 shadow-sm space-y-3">
                  <p className="text-xs sm:text-sm text-[#1a1a1a]/85 leading-relaxed">
                    {currentQa.intro}
                  </p>
                  <ul className="space-y-2 text-xs sm:text-sm text-[#1a1a1a]/85">
                    {currentQa.bullets.map((b, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#03473e] shrink-0" />
                        <span>
                          <strong className="font-semibold text-[#1a1a1a]">{b.lead}</strong>{' '}
                          {b.text}
                        </span>
                      </li>
                    ))}
                  </ul>
                  <div className="pt-2 flex flex-wrap items-center gap-3 text-[0.72rem] font-medium text-[#03473e]">
                    <span className="text-[#1a1a1a]/50">Sources:</span>
                    {currentQa.sources.map((src, idx) => (
                      <span key={src} className="inline-flex items-center gap-1.5">
                        {idx > 0 && <span className="text-[#1a1a1a]/30">·</span>}
                        <FileText className="w-3 h-3" />
                        <span>{src}</span>
                      </span>
                    ))}
                  </div>
                  {customFollowUps.map((entry, idx) => (
                    <div key={idx} className="pt-3 mt-3 border-t border-[#1a1a1a]/10 space-y-1.5">
                      <div className="text-xs font-semibold text-[#1a1a1a]">
                        You: {entry.question}
                      </div>
                      <p className="text-xs text-[#1a1a1a]/75 leading-relaxed">{entry.reply}</p>
                    </div>
                  ))}
                </div>

                <form
                  onSubmit={handleFollowUpSubmit}
                  className="mt-4 rounded-full bg-[#ffffeb] border border-[#1a1a1a]/12 px-4 py-2 flex items-center gap-2 shadow-xs"
                >
                  <input
                    type="text"
                    value={followUpInput}
                    onChange={(e) => setFollowUpInput(e.target.value)}
                    placeholder="Ask a follow up about your meetings"
                    className="flex-1 bg-transparent text-xs sm:text-sm text-[#1a1a1a] placeholder:text-[#1a1a1a]/45 focus:outline-none"
                  />
                  <button
                    type="submit"
                    aria-label="Send follow up question"
                    className="w-7 h-7 rounded-full bg-[#1a1a1a] text-[#ffffeb] flex items-center justify-center hover:opacity-85 transition-opacity cursor-pointer shrink-0"
                  >
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </form>
              </div>
            </div>

            {/* 4c. Feature 2: Stop digging. Just ask. */}
            <div className="max-w-2xl mx-auto text-center mb-20">
              <h3 className="font-display text-3xl sm:text-[2.75rem] leading-[1.02] tracking-[-0.02em] mb-3">
                Stop digging. <em className="italic font-normal">Just ask.</em>
              </h3>
              <p className="text-sm sm:text-base text-[#1a1a1a]/75 max-w-lg mx-auto leading-relaxed mb-8">
                Notetaker&apos;s AI searches across your prior meeting notes and the web for the answer, then links you to the source.
              </p>
              <div className="rounded-[1.75rem] bg-gradient-to-br from-[#234d44] via-[#132c27] to-[#1e3d36] p-4 shadow-2xl text-left">
                <div className="rounded-xl bg-[#ffffeb] text-[#1a1a1a] p-4 space-y-3">
                  <div className="font-display text-lg">Q3 Campaign Planning</div>
                  <p className="text-xs text-[#1a1a1a]/80">
                    <strong className="text-[#1a1a1a]">What&apos;s blocking the launch this week?</strong> Budget confirmation, retouched photography queued, and Asana handoff owner.
                  </p>
                </div>
              </div>
            </div>

            {/* 4d. Feature 3: Zoned out? Catch up in seconds. */}
            <div className="max-w-2xl mx-auto text-center mb-20">
              <h3 className="font-display text-3xl sm:text-[2.75rem] leading-[1.02] tracking-[-0.02em] mb-3">
                Zoned out? <em className="italic font-normal">Catch up</em> in seconds.
              </h3>
              <p className="text-sm sm:text-base text-[#1a1a1a]/75 max-w-lg mx-auto leading-relaxed mb-8">
                No more &quot;sorry, can you repeat that?&quot; Tap &quot;What did I miss?&quot; and Notetaker gives you a summary of the last five minutes. You&apos;re caught up before anyone notices.
              </p>
            </div>

            {/* 4e. Feature 4: Get a summary you'll actually read. */}
            <div className="max-w-2xl mx-auto text-center mb-20">
              <h3 className="font-display text-3xl sm:text-[2.75rem] leading-[1.02] tracking-[-0.02em] mb-3">
                Get a summary <em className="italic font-normal">you&apos;ll actually read.</em>
              </h3>
              <p className="text-sm sm:text-base text-[#1a1a1a]/75 max-w-lg mx-auto leading-relaxed mb-8">
                Our AI notetaker pulls out timelines, decisions, and next steps, then organizes everything by topic so you can find what matters.
              </p>
            </div>

            {/* 4f. Feature 5: Connect to all your AI tools. */}
            <div className="max-w-2xl mx-auto text-center">
              <h3 className="font-display text-3xl sm:text-[2.75rem] leading-[1.02] tracking-[-0.02em] mb-3">
                Connect to <em className="italic font-normal">all</em> your AI tools.
              </h3>
              <p className="text-sm sm:text-base text-[#1a1a1a]/75 max-w-lg mx-auto leading-relaxed">
                Bring your meeting history into Claude, ChatGPT, Gemini, or any tool that supports MCP. Put your meeting notes to work alongside your docs and projects. No copy-paste required.
              </p>
            </div>
          </Container>
        </div>
      </section>

      {/* 5. Three-Column Illustrated Workflow Section */}
      <section className="py-20 sm:py-28 bg-[#ffffeb]">
        <Container>
          <div ref={workflowRef} className="max-w-3xl mx-auto text-center mb-16 sm:mb-20">
            <p
              data-reveal-line
              className="text-xs font-mono uppercase tracking-[0.16em] text-[#787D6D] font-semibold mb-4 sm:mb-5"
            >
              WISPR MAKES IT EASY
            </p>
            <h2
              data-reveal-line
              className="font-display text-4xl sm:text-5xl lg:text-[4.25rem] leading-[1.02] tracking-[-0.025em] text-[#1a1a1a]"
              style={{ textWrap: 'balance' }}
            >
              Fits into your workflow.
              <br />
              <em className="italic font-normal">Doesn&apos;t change it.</em>
            </h2>
          </div>

          <div
            ref={workflowListRef}
            className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16 max-w-5xl mx-auto text-center"
          >
            {/* Workflow Item 1: Starts automatically */}
            <div data-wf-item className="flex flex-col items-center">
              <div className="h-24 flex items-center justify-center mb-6">
                <img
                  src={workflowIconStarts}
                  alt="Starts automatically"
                  className="h-20 w-auto object-contain"
                />
              </div>
              <h3 className="font-display text-[1.65rem] lg:text-[1.85rem] font-normal leading-snug mb-3 text-[#1a1a1a]">
                Starts automatically
              </h3>
              <p className="text-xs sm:text-[0.875rem] leading-[1.6] text-[#1a1a1a]/80 max-w-[280px] mx-auto">
                One button joins and records. Catches back-to-backs and calls that aren&apos;t on your calendar.
              </p>
            </div>

            {/* Workflow Item 2: Whatever you use */}
            <div data-wf-item className="flex flex-col items-center">
              <div className="h-24 flex items-center justify-center mb-6">
                <img
                  src={workflowIconWhatever}
                  alt="Whatever you use"
                  className="h-20 w-auto object-contain"
                />
              </div>
              <h3 className="font-display text-[1.65rem] lg:text-[1.85rem] font-normal leading-snug mb-3 text-[#1a1a1a]">
                Whatever you use
              </h3>
              <p className="text-xs sm:text-[0.875rem] leading-[1.6] text-[#1a1a1a]/80 max-w-[280px] mx-auto">
                Google Meet, Teams, Huddles, lunch catchups. If words are being said, Notetaker captures them.
              </p>
            </div>

            {/* Workflow Item 3: Connects with your AI */}
            <div data-wf-item className="flex flex-col items-center">
              <div className="h-24 flex items-center justify-center mb-6">
                <img
                  src={workflowIconConnects}
                  alt="Connects with your AI"
                  className="h-20 w-auto object-contain"
                />
              </div>
              <h3 className="font-display text-[1.65rem] lg:text-[1.85rem] font-normal leading-snug mb-3 text-[#1a1a1a]">
                Connects with your AI
              </h3>
              <p className="text-xs sm:text-[0.875rem] leading-[1.6] text-[#1a1a1a]/80 max-w-[280px] mx-auto">
                Notetaker plugs into Claude, ChatGPT, Gemini and any tool that speaks MCP.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* 6. Granola / Otter Migration Card */}
      <section className="py-8 sm:py-14 bg-[#ffffeb]">
        <Container>
          <div
            ref={migrationCardRef}
            className="max-w-6xl mx-auto rounded-[1.5rem] sm:rounded-[1.75rem] bg-[#e2e2d2] px-7 py-10 sm:px-12 sm:py-12 grid md:grid-cols-12 gap-8 items-center"
          >
            {/* Left Column: Editorial Headline */}
            <div className="md:col-span-4">
              <h2 className="font-display text-3xl sm:text-[2.6rem] lg:text-[2.85rem] leading-[0.98] tracking-[-0.025em] text-[#1a1a1a]">
                Switch without
                <br />
                losing <em className="italic font-normal">a thing.</em>
              </h2>
            </div>

            {/* Center Column: Copy + Get Started Link */}
            <div className="md:col-span-4 space-y-2.5">
              <p className="text-xs sm:text-[0.84rem] font-semibold text-[#1a1a1a]">
                Coming from Granola or Otter?
              </p>
              <p className="text-xs sm:text-[0.8125rem] text-[#1a1a1a]/75 leading-[1.45] max-w-[17rem]">
                Import your entire meeting history in a few easy steps. You&apos;ll see the source, meeting date, summary, and transcript.
              </p>
              <div className="pt-2.5">
                <AppLink
                  to="/get-started"
                  className="inline-flex items-center gap-2 text-xs sm:text-[0.84rem] font-semibold text-[#1a1a1a] hover:opacity-75 transition-opacity"
                >
                  <span>Get started</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </AppLink>
              </div>
            </div>

            {/* Right Column: Dual-Window Transfer Illustration */}
            <div className="md:col-span-4 flex items-center justify-center md:justify-end">
              <svg
                viewBox="0 0 320 205"
                className="w-full max-w-[19.5rem]"
                fill="none"
                aria-hidden="true"
              >
                <defs>
                  <clipPath id={`move-clip-${uid}`}>
                    <rect x="0" y="0" width="320" height="205" />
                  </clipPath>
                </defs>
                <g clipPath={`url(#move-clip-${uid})`}>
                  {/* Back Window: Wispr Cream/Orange Screen */}
                  <rect
                    x="114"
                    y="16"
                    width="186"
                    height="128"
                    rx="12"
                    fill="#ffffeb"
                    stroke="#1a1a1a"
                    strokeWidth="2"
                  />
                  {/* Top Dots + Flow Waveform inside Back Window */}
                  <circle cx="127" cy="28" r="2.2" fill="#1a1a1a" />
                  <circle cx="135" cy="28" r="2.2" fill="#1a1a1a" />
                  <circle cx="143" cy="28" r="2.2" fill="#1a1a1a" />
                  <rect x="268" y="24" width="2" height="9" rx="1" fill="#1a1a1a" />
                  <rect x="272.5" y="26" width="2" height="5" rx="1" fill="#1a1a1a" />
                  <rect x="277" y="23" width="2" height="11" rx="1" fill="#1a1a1a" />
                  <rect x="281.5" y="25.5" width="2" height="6" rx="1" fill="#1a1a1a" />
                  <rect x="286" y="24" width="2" height="9" rx="1" fill="#1a1a1a" />
                  {/* Inner Orange Workspace */}
                  <rect x="122" y="39" width="170" height="97" rx="6" fill="#f9a84d" />

                  {/* Front Window: Deep Emerald Green */}
                  <rect
                    x="18"
                    y="68"
                    width="176"
                    height="118"
                    rx="12"
                    fill="#03473e"
                    stroke="#1a1a1a"
                    strokeWidth="2"
                  />
                  <circle cx="32" cy="80" r="2.2" fill="#1a1a1a" />
                  <circle cx="40" cy="80" r="2.2" fill="#1a1a1a" />
                  <circle cx="48" cy="80" r="2.2" fill="#1a1a1a" />

                  {/* Notepad 1 (Inside Emerald Window) */}
                  <g transform="translate(88, 92) rotate(-14)">
                    <path d="M -4 8 L -2 48" stroke="#1a1a1a" strokeWidth="1.6" strokeLinecap="round" />
                    <path d="M -1 4 L 1 46" stroke="#ffffeb" strokeWidth="1.8" strokeLinecap="round" />
                    <rect x="2" y="0" width="44" height="50" rx="4" fill="#ffffeb" stroke="#1a1a1a" strokeWidth="1.8" />
                    <rect x="2" y="0" width="44" height="12" rx="3" fill="#1a1a1a" />
                    <path
                      d="M 10 24 C 13 18, 17 18, 16 24 C 15 28, 21 28, 22 22 C 23 18, 27 18, 26 24 C 25 28, 31 28, 33 22 C 34 18, 38 19, 37 24"
                      stroke="#1a1a1a"
                      strokeWidth="1.7"
                      strokeLinecap="round"
                    />
                    <path
                      d="M 10 36 C 13 30, 17 30, 16 36 C 15 40, 21 40, 22 34 C 23 30, 27 30, 26 36 C 25 40, 31 40, 33 34 C 34 30, 38 31, 37 36"
                      stroke="#1a1a1a"
                      strokeWidth="1.7"
                      strokeLinecap="round"
                    />
                  </g>

                  {/* Motion Streak Lines beneath Moving Pad */}
                  <path d="M 142 152 L 172 126" stroke="#1a1a1a" strokeWidth="1.6" strokeLinecap="round" />
                  <path d="M 152 158 L 182 134" stroke="#1a1a1a" strokeWidth="1.6" strokeLinecap="round" />
                  <path d="M 164 156 L 188 136" stroke="#1a1a1a" strokeWidth="1.6" strokeLinecap="round" />

                  {/* Notepad 2 (Transferring Between Windows) */}
                  <g transform="translate(154, 48) rotate(-10)">
                    <path d="M -3 6 L -1 46" stroke="#1a1a1a" strokeWidth="1.6" strokeLinecap="round" />
                    <rect x="2" y="0" width="44" height="50" rx="4" fill="#ffffeb" stroke="#1a1a1a" strokeWidth="1.8" />
                    <rect x="2" y="0" width="44" height="12" rx="3" fill="#1a1a1a" />
                    <path
                      d="M 10 24 C 13 18, 17 18, 16 24 C 15 28, 21 28, 22 22 C 23 18, 27 18, 26 24 C 25 28, 31 28, 33 22 C 34 18, 38 19, 37 24"
                      stroke="#1a1a1a"
                      strokeWidth="1.7"
                      strokeLinecap="round"
                    />
                    <path
                      d="M 10 36 C 13 30, 17 30, 16 36 C 15 40, 21 40, 22 34 C 23 30, 27 30, 26 36 C 25 40, 31 40, 33 34 C 34 30, 38 31, 37 36"
                      stroke="#1a1a1a"
                      strokeWidth="1.7"
                      strokeLinecap="round"
                    />
                  </g>

                  {/* Notepad 3 (Landed Inside Orange Flow Window) */}
                  <g transform="translate(242, 62) rotate(-12)">
                    <path d="M -3 6 L -1 46" stroke="#1a1a1a" strokeWidth="1.6" strokeLinecap="round" />
                    <rect x="2" y="0" width="44" height="50" rx="4" fill="#ffffeb" stroke="#1a1a1a" strokeWidth="1.8" />
                    <rect x="2" y="0" width="44" height="12" rx="3" fill="#1a1a1a" />
                    <path
                      d="M 10 24 C 13 18, 17 18, 16 24 C 15 28, 21 28, 22 22 C 23 18, 27 18, 26 24 C 25 28, 31 28, 33 22 C 34 18, 38 19, 37 24"
                      stroke="#1a1a1a"
                      strokeWidth="1.7"
                      strokeLinecap="round"
                    />
                    <path
                      d="M 10 36 C 13 30, 17 30, 16 36 C 15 40, 21 40, 22 34 C 23 30, 27 30, 26 36 C 25 40, 31 40, 33 34 C 34 30, 38 31, 37 36"
                      stroke="#1a1a1a"
                      strokeWidth="1.7"
                      strokeLinecap="round"
                    />
                  </g>

                  {/* Pink Pointing Hand + MOVE Label */}
                  <g>
                    <path
                      d="M 218 186 L 195 144 C 193 140 197 137 200 140 L 207 147 C 209 144 214 145 215 149 C 217 146 222 148 222 153 L 239 186 Z"
                      fill="#f5a7f0"
                      stroke="#1a1a1a"
                      strokeWidth="1.8"
                      strokeLinejoin="round"
                    />
                    <line x1="184" y1="186" x2="254" y2="186" stroke="#1a1a1a" strokeWidth="1.8" strokeLinecap="round" />

                    {/* Dark MOVE Tooltip Pill */}
                    <rect x="228" y="147" width="46" height="19" rx="5" fill="#1a1a1a" />
                    <text
                      x="251"
                      y="160"
                      textAnchor="middle"
                      fill="#ffffeb"
                      fontSize="9.5"
                      fontWeight="700"
                      letterSpacing="0.08em"
                      fontFamily="JetBrains Mono, monospace"
                    >
                      MOVE
                    </text>
                  </g>
                </g>
              </svg>
            </div>
          </div>
        </Container>
      </section>

      {/* 7. Enterprise Controls ("FOR BUSINESS") */}
      <section className="py-16 sm:py-24 bg-[#ffffeb]">
        <Container>
          <div ref={enterpriseRef} className="max-w-4xl mx-auto">
            <div className="mb-10 sm:mb-12">
              <p className="text-xs font-medium uppercase tracking-[0.14em] text-[#1a1a1a]/60 mb-3">
                FOR BUSINESS
              </p>
              <h2
                className="font-display text-4xl sm:text-5xl leading-[0.98] tracking-[-0.025em] mb-4"
                style={{ textWrap: 'balance' }}
              >
                Bring Notetaker to <em className="italic font-normal">your team.</em>
              </h2>
              <p className="text-sm sm:text-base text-[#1a1a1a]/75 max-w-lg leading-relaxed mb-4">
                Help your team move work forward, with the controls your organization needs.
              </p>
              <AppLink
                to="/privacy"
                className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#1a1a1a] hover:opacity-75 transition-opacity"
              >
                <span>Explore enterprise privacy controls</span>
                <ChevronRight className="w-4 h-4" />
              </AppLink>
            </div>

            <div className="grid sm:grid-cols-2 gap-x-10 gap-y-8">
              {ENTERPRISE_CONTROLS.map((item, idx) => {
                const Icon =
                  idx === 0 ? Users : idx === 1 ? ShieldCheck : idx === 2 ? EyeOff : Lock;
                return (
                  <div key={item.id} data-ent-item className="flex items-start gap-3.5">
                    <div className="w-9 h-9 rounded-lg bg-[#e4e4d0] text-[#1a1a1a] flex items-center justify-center shrink-0 mt-0.5">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="text-sm sm:text-base font-semibold text-[#1a1a1a] mb-1">
                        {item.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-[#1a1a1a]/70 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            <p className="text-[0.72rem] text-[#1a1a1a]/55 mt-8">
              *Consent acknowledgment is available on request.
            </p>
          </div>
        </Container>
      </section>

      {/* 8. Notetaker Testimonials Slider Section */}
      <NotetakerTestimonials />

      {/* 9. Notetaker FAQ Accordion */}
       <section className="py-16 sm:py-24 bg-[#ffffeb]">
        <Container>
          <div className="text-center mb-10 sm:mb-12">
            <p className="text-[0.68rem] sm:text-xs font-medium uppercase tracking-[0.14em] text-[#1a1a1a]/55 mb-3">
              FAQS
            </p>
            <h2 className="font-display text-4xl sm:text-5xl lg:text-[4rem] leading-[0.98] tracking-[-0.025em]">
              You might <em className="italic font-normal">be wondering.</em>
            </h2>
          </div>

          {(() => {
            const activeFaq =
              NOTETAKER_FAQS.find((f) => f.id === openFaqId) || NOTETAKER_FAQS[0];
            return (
              <div className="max-w-[54rem] mx-auto rounded-[1.5rem] sm:rounded-[1.75rem] bg-[#e2e2d2] p-3 sm:p-3.5 grid md:grid-cols-12 gap-0 shadow-xs">
                {/* Left Emerald Pane: Scrollable Questions List */}
                <div className="md:col-span-6 rounded-[1.15rem] bg-[#03473e] text-[#ffffeb] p-6 sm:p-7 h-[27rem] sm:h-[30.5rem] flex flex-col">
                  <h3 className="font-display text-2xl sm:text-[1.65rem] leading-none mb-4 shrink-0">
                    Questions
                  </h3>

                  <div
                    className="flex-1 overflow-y-auto pr-4 space-y-4 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-[#02241f]"
                    style={{
                      WebkitMaskImage:
                        'linear-gradient(to bottom, transparent 0%, #000 8%, #000 94%, transparent 100%)',
                      maskImage:
                        'linear-gradient(to bottom, transparent 0%, #000 8%, #000 94%, transparent 100%)',
                    }}
                  >
                    {NOTETAKER_FAQS.map((faq) => {
                      const isSelected = activeFaq.id === faq.id;
                      return (
                        <button
                          key={faq.id}
                          type="button"
                          onClick={() => setOpenFaqId(faq.id)}
                          aria-pressed={isSelected}
                          className={`w-full text-left text-[0.78rem] sm:text-[0.83rem] leading-[1.4] py-1 transition-all duration-150 cursor-pointer block ${
                            isSelected
                              ? 'text-[#ffffeb] font-semibold'
                              : 'text-[#ffffeb]/75 hover:text-[#ffffeb] font-medium'
                          }`}
                        >
                          {faq.question}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Right Warm Stone Pane: Active Answer Bubble + Flow Mark */}
                <div className="md:col-span-6 p-6 sm:p-7 h-[27rem] sm:h-[30.5rem] flex flex-col">
                  <h3 className="font-display text-2xl sm:text-[1.65rem] leading-none text-[#1a1a1a] mb-4 shrink-0">
                    Answer
                  </h3>

                  <div className="flex-1 overflow-y-auto pr-4 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-[#c2c2b0]">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={activeFaq.id}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -6 }}
                        transition={{ duration: 0.22 }}
                      >
                        <div className="rounded-[1rem] bg-[#f4f4ea] p-5 sm:p-6 text-[0.78rem] sm:text-[0.83rem] text-[#1a1a1a]/85 leading-[1.58] space-y-3.5 shadow-[0_1px_4px_rgba(26,26,26,0.04)]">
                          {activeFaq.answer.split('\n\n').map((para, pIdx) => (
                            <p key={pIdx}>{para}</p>
                          ))}
                        </div>
                        <div className="mt-3 w-7 h-7 rounded-full bg-[#03473e] text-[#ffffeb] flex items-center justify-center shadow-xs">
                          <FlowWaveformMark className="w-3.5 h-3" />
                        </div>
                      </motion.div>
                    </AnimatePresence>
                  </div>
                </div>
              </div>
            );
          })()}
        </Container>
      </section>

      {/* 10. Editorial Guides ("Level up your note taking.") */}
      <section id="guides" className="py-16 sm:py-24 bg-[#ffffeb]">
        <Container>
          <div className="text-center mb-10 sm:mb-14">
            <h2 className="font-display text-4xl sm:text-5xl leading-[0.98] tracking-[-0.02em]">
              Level <em className="italic font-normal">up</em> your note taking.
            </h2>
          </div>

          <div ref={guidesRef} className="max-w-4xl mx-auto space-y-6">
            {NOTETAKER_GUIDES.map((guide) => {
              const cardPhoto =
                guide.variant === 'granola'
                  ? clayImg
                  : guide.variant === 'inperson'
                  ? alexImg
                  : stevenImg;
              const authorAvatar =
                guide.variant === 'granola'
                  ? daveImg
                  : guide.variant === 'inperson'
                  ? alexImg
                  : stevenImg;

              return (
                <article
                  key={guide.id}
                  className="rounded-[1.75rem] bg-[#e2e2d2] overflow-hidden border border-[#1a1a1a]/8 shadow-xs transition-transform duration-200 hover:-translate-y-0.5"
                >
                  <button
                    type="button"
                    onClick={() => setActiveGuide(guide)}
                    className="w-full text-left cursor-pointer block"
                  >
                    {/* Visual Banner */}
                    <div className="relative h-56 sm:h-72 overflow-hidden bg-[#1a1a1a]">
                      <img
                        src={cardPhoto}
                        alt={guide.title}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover opacity-65"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/25 to-transparent" />

                      {guide.variant === 'granola' && (
                        <div className="absolute inset-0 flex items-center justify-center p-6">
                          <div className="w-full max-w-md rounded-xl bg-[#ffffeb] text-[#1a1a1a] p-5 shadow-2xl">
                            <div className="font-display text-2xl sm:text-3xl mb-3">
                              Granola alternatives
                            </div>
                            <div className="space-y-2">
                              <div className="h-2.5 w-3/4 rounded-full bg-[#1a1a1a]/15" />
                              <div className="h-2.5 w-2/3 rounded-full bg-[#1a1a1a]/12" />
                              <div className="h-2.5 w-1/2 rounded-full bg-[#1a1a1a]/10" />
                            </div>
                          </div>
                        </div>
                      )}

                      {guide.variant === 'inperson' && (
                        <div className="absolute inset-0 flex items-center justify-center p-6">
                          <div className="rounded-xl bg-[#03473e] text-[#ffffeb] px-6 py-4 shadow-2xl border border-[#ffffeb]/15">
                            <div className="font-display text-2xl sm:text-3xl">
                              Less note-taking. More listening.
                            </div>
                            <div className="mt-2 w-7 h-7 rounded-md bg-[#ffffeb]/15 flex items-center justify-center">
                              <FlowWaveformMark className="w-4 h-4 text-[#cef5ca]" />
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Clean Typography Body */}
                    <div className="p-6 sm:p-8 text-center">
                      <div className="text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-[#1a1a1a]/60 mb-2">
                        {guide.category}
                      </div>
                      <h3 className="font-display text-2xl sm:text-3xl leading-tight mb-5">
                        {guide.title}
                      </h3>

                      <div className="flex items-center justify-between text-xs text-[#1a1a1a]/65 pt-2">
                        <div className="flex items-center gap-2.5">
                          <img
                            src={authorAvatar}
                            alt={guide.author}
                            referrerPolicy="no-referrer"
                            className="w-6 h-6 rounded-full object-cover"
                          />
                          <span>
                            {guide.author} · {guide.date}
                          </span>
                        </div>
                        <span className="font-medium tracking-wider uppercase">{guide.readTime}</span>
                      </div>
                    </div>
                  </button>
                </article>
              );
            })}
          </div>
        </Container>
      </section>

      {/* 11. Notetaker Final CTA */}
      <section ref={finalCtaRef} className="pb-12 sm:pb-16 bg-[#ffffeb]">
        <Container>
          <div className="relative rounded-[2rem] sm:rounded-[3rem] overflow-hidden min-h-[28rem] sm:min-h-[34rem] flex items-center justify-center text-center text-[#ffffeb] px-6 py-16">
            <img
              src={atmosphereImg}
              alt=""
              referrerPolicy="no-referrer"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-[#1a1a1a]/45 via-[#1a1a1a]/55 to-[#1a1a1a]/75" />

            <div className="relative z-10 max-w-2xl mx-auto">
              <h2
                className="font-display text-4xl sm:text-5xl lg:text-[4rem] leading-[0.96] tracking-[-0.025em] mb-4"
                style={{ textWrap: 'balance' }}
              >
                Put your words to work in more ways <em className="italic font-normal">than one.</em>
              </h2>
              <p className="text-sm sm:text-base text-[#ffffeb]/85 max-w-md mx-auto leading-relaxed mb-7">
                Capture meeting notes with Notetaker and write emails, messages, and documents by speaking with Flow. Both in one subscription.
              </p>

              <button
                type="button"
                onClick={() => onOpenDownload('notetaker')}
                className="inline-flex items-center justify-center gap-2.5 bg-[#f0d7ff] hover:bg-[#e7c4ff] border border-[#1a1a1a] rounded-[0.55rem] px-6 py-3.5 text-sm sm:text-base font-semibold text-[#1a1a1a] transition-transform duration-200 hover:-translate-y-0.5 cursor-pointer whitespace-nowrap"
              >
                <OsButtonIcon os={detectedOS} />
                <span>
                  {detectedOS === 'mac' ? 'Download for Mac' : 'Get started on Windows'}
                </span>
              </button>

              <div className="text-xs text-[#ffffeb]/70 mt-3.5">
                Available on Mac and Windows
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Interactive Guide Reader Modal */}
      <AnimatePresence>
        {activeGuide && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-[#1a1a1a]/65 backdrop-blur-xs flex items-center justify-center p-4"
            onClick={() => setActiveGuide(null)}
          >
            <motion.div
              initial={{ opacity: 0, y: 16, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.98 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-xl rounded-3xl bg-[#ffffeb] text-[#1a1a1a] p-6 sm:p-8 shadow-2xl border border-[#1a1a1a]/12"
            >
              <div className="flex items-start justify-between gap-4 mb-4">
                <div className="text-xs font-semibold uppercase tracking-[0.12em] text-[#03473e]">
                  {activeGuide.category} · {activeGuide.readTime}
                </div>
                <button
                  type="button"
                  onClick={() => setActiveGuide(null)}
                  aria-label="Close guide"
                  className="w-8 h-8 rounded-full hover:bg-[#1a1a1a]/8 flex items-center justify-center cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <h3 className="font-display text-2xl sm:text-3xl leading-tight mb-3">
                {activeGuide.title}
              </h3>
              <p className="text-xs text-[#1a1a1a]/60 mb-4">
                {activeGuide.author} · {activeGuide.date}
              </p>
              <p className="text-sm text-[#1a1a1a]/85 leading-relaxed mb-5">
                {activeGuide.summary}
              </p>
              <ul className="space-y-2 text-xs sm:text-sm text-[#1a1a1a]/85 mb-6">
                {activeGuide.highlights.map((h) => (
                  <li key={h} className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#03473e] shrink-0" />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setActiveGuide(null)}
                  className="px-4 py-2 rounded-lg text-xs font-semibold border border-[#1a1a1a]/15 hover:bg-[#e4e4d0] cursor-pointer"
                >
                  Close
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setActiveGuide(null);
                    onOpenDownload('notetaker');
                  }}
                  className="px-4 py-2 rounded-lg text-xs font-semibold bg-[#f0d7ff] border border-[#1a1a1a] hover:bg-[#e7c4ff] cursor-pointer"
                >
                  Get Notetaker
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
