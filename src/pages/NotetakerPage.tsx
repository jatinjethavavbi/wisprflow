import React, { useEffect, useId, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  ArrowRight,
  ChevronDown,
  ChevronRight,
  ClipboardCheck,
  EyeOff,
  FileText,
  Lock,
  Mic,
  Power,
  Search,
  Send,
  ShieldCheck,
  SlidersHorizontal,
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
import mikelImg from '../assets/images/mikel_video.jpg';
import stephenImg from '../assets/images/stephen_video.jpg';
import nathalieImg from '../assets/images/nathalie_video.jpg';
import askAnythingIllus from '../assets/images/ask_anything_illustration.jpg';
import cozyLaptopBg from '../assets/images/cozy_laptop_bg.jpg';
import ipadTranscriptImg from '../assets/images/ipad_transcript_view.jpg';
import ipadSummaryImg from '../assets/images/ipad_summary_view.jpg';
import workflowIconStarts from '../assets/images/workflow_icon_starts.png';
import workflowIconWhatever from '../assets/images/workflow_icon_whatever.png';
import workflowIconConnects from '../assets/images/workflow_icon_connects.png';
import switchMigrationIllus from '../assets/images/switch_migration_illustration.png';
import granolaGuideImg from '../assets/images/granola_alt_guide.png';
import inPersonGuideImg from '../assets/images/in_person_guide.png';
import zoomGuideImg from '../assets/images/zoom_nt_guide.png';
import robSolomonAvatar from '../assets/images/rob_solomon_avatar.png';
import sammYatesAvatar from '../assets/images/samm_yates_avatar.png';
import ntCtaBg from '../assets/images/nt_cta_bg.webp';
import flowbarGraphic from '../assets/images/flowbar_graphic.svg';
import transcriptNewGraphic from '../assets/images/transcript_new_graphic.png';

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
  const [askDemoTick, setAskDemoTick] = useState(0);
  const [summaryStep, setSummaryStep] = useState(0);
  const [mcpDemoTick, setMcpDemoTick] = useState(0);

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

  const [activeFaqId, setActiveFaqId] = useState<string>('accuracy');
  const [activeGuide, setActiveGuide] = useState<NotetakerGuideArticle | null>(null);

  // Animation refs
  const heroRef = useRef<HTMLDivElement>(null);
  const quoteSectionRef = useRef<HTMLElement>(null);
  const captureStageRef = useRef<HTMLElement>(null);
  const walkthroughTrackRef = useRef<HTMLDivElement>(null);
  const floatingCardRef = useRef<HTMLDivElement>(null);
  const cardFeedRef = useRef<HTMLDivElement>(null);
  const bottomLeftPortraitRef = useRef<HTMLButtonElement>(null);
  const waveformPillRef = useRef<HTMLDivElement>(null);
  const leftNavRef = useRef<HTMLDivElement>(null);
  const rightCopyRef = useRef<HTMLDivElement>(null);
  const workflowRef = useRef<HTMLDivElement>(null);
  const enterpriseRef = useRef<HTMLDivElement>(null);
  const guidesRef = useRef<HTMLDivElement>(null);
  const finalCtaRef = useRef<HTMLElement>(null);

  useTextReveal(workflowRef, { stagger: 0.08, start: 'top 86%' });
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

  // Chapter-specific ambient showcase animations (Ask Anything typing, Summary generation steps, MCP prompt typing)
  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (activeChapter === 1) {
      if (reduced) {
        setAskDemoTick(42);
        return;
      }
      setAskDemoTick(0);
      const id = window.setInterval(() => {
        setAskDemoTick((prev) => (prev >= 56 ? 0 : prev + 1));
      }, 80);
      return () => window.clearInterval(id);
    }
    if (activeChapter === 3) {
      if (reduced) {
        setSummaryStep(3);
        return;
      }
      setSummaryStep(0);
      const id = window.setInterval(() => {
        setSummaryStep((prev) => (prev >= 3 ? 3 : prev + 1));
      }, 680);
      return () => window.clearInterval(id);
    }
    if (activeChapter === 4) {
      if (reduced) {
        setMcpDemoTick(48);
        return;
      }
      setMcpDemoTick(0);
      const id = window.setInterval(() => {
        setMcpDemoTick((prev) => (prev >= 64 ? 0 : prev + 1));
      }, 85);
      return () => window.clearInterval(id);
    }
  }, [activeChapter]);

  // Entrance + subtle scroll parallax for hero stack & emerald transcript bubbles
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

      if (captureStageRef.current) {
        const fgBubbles = captureStageRef.current.querySelectorAll('[data-bubble-fg]');
        const bgBubbles = captureStageRef.current.querySelectorAll('[data-bubble-bg]');
        if (fgBubbles.length) {
          gsap.fromTo(
            fgBubbles,
            { y: 16 },
            {
              y: -16,
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
            { y: 8 },
            {
              y: -8,
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

      if (cardFeedRef.current) {
        arrivalTl.fromTo(
          cardFeedRef.current,
          { y: 0 },
          { y: -355, ease: 'power1.inOut', duration: 0.85 },
          0.12
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
                type="button"
                onClick={() => setHeroScenarioIdx((prev) => (prev + 1) % HERO_SCENARIOS.length)}
                className="relative w-full max-w-[28.5rem] text-left cursor-pointer group pt-5"
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
        className="bg-[#1a1a1a] text-[#ffffeb] rounded-[2.5rem] sm:rounded-[4.25rem] overflow-x-clip"
      >
        {/* 2. Steven Bartlett Dark Quote Banner */}
        <section className="pt-20 sm:pt-28 pb-16 sm:pb-24 px-5">
          <Container>
            <div className="max-w-[44rem] mx-auto text-center">
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
      <section className="bg-[#ffffeb] relative">
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
        <div ref={walkthroughTrackRef} className="hidden lg:block relative z-30 h-[440vh]">
          <div className="sticky top-0 h-screen overflow-hidden flex items-center">
            {/* Subtle Background Diagonal Cream Ribbon Motif (visible across walkthrough stage) */}
            <svg
              viewBox="0 0 1440 720"
              fill="none"
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 w-full h-full object-cover opacity-80"
              preserveAspectRatio="none"
            >
              <path
                d="M-120 440 C 260 440, 390 190, 740 190 C 1090 190, 1210 470, 1560 430"
                stroke="#f2f0de"
                strokeWidth="44"
                strokeLinecap="round"
              />
            </svg>

            <div className="max-w-[78rem] mx-auto px-8 w-full grid grid-cols-12 items-center gap-6 relative z-10">
              {/* Left Column: 5-Chapter Vertical Navigation (terracotta active accent) */}
              <div ref={leftNavRef} className="col-span-3 flex flex-col items-start space-y-2.5">
                {(
                  [
                    'The details',
                    'Ask anything',
                    'What did I miss?',
                    'Summary',
                    'MCP',
                  ] as const
                ).map((label, idx) => {
                  const isActive = activeChapter === idx;
                  return (
                    <button
                      key={label}
                      type="button"
                      onClick={() => scrollToChapter(idx)}
                      className={`group flex items-center text-left text-[1.25rem] leading-[1.6] tracking-[-0.015em] transition-all duration-200 cursor-pointer ${
                        isActive
                          ? 'text-[#1a1a1a] font-medium'
                          : 'text-[#1a1a1a]/35 hover:text-[#1a1a1a]/70 font-normal'
                      }`}
                    >
                      <span
                        className={`w-[3px] rounded-full mr-3 transition-all duration-200 ${
                          isActive ? 'h-5 bg-[#d84f32] opacity-100' : 'h-0 bg-transparent opacity-0'
                        }`}
                      />
                      <span>{label}</span>
                    </button>
                  );
                })}
              </div>

              {/* Center Column: Uniform 27.5rem/29.5rem Square Morphing Stage */}
              <div className="col-span-6 flex justify-center">
                <div
                  ref={floatingCardRef}
                  className="w-[27.5rem] h-[27.5rem] xl:w-[29.5rem] xl:h-[29.5rem] relative"
                >
                  {/* Chapter 0: Cream-Beige Live Transcript Card (kept mounted to preserve GSAP feed scroll) */}
                  <div
                    className={`relative rounded-[1.5rem] bg-[#dedbca] border border-[#1a1a1a]/[0.06] shadow-[0_24px_60px_-18px_rgba(26,26,26,0.14)] px-6 pt-6 pb-4 w-full h-full flex flex-col justify-between transition-all duration-300 ${
                      activeChapter === 0
                        ? 'opacity-100 scale-100 pointer-events-auto'
                        : 'opacity-0 scale-[0.97] pointer-events-none absolute inset-0'
                    }`}
                    aria-hidden={activeChapter !== 0}
                  >
                    {/* Floating Portrait 1: Top-Right (Mikel) */}
                    <button
                      type="button"
                      onClick={() =>
                        setHighlightedSpeaker((prev) =>
                          prev === 'mikel' ? null : 'mikel'
                        )
                      }
                      aria-label="Highlight Mikel lines"
                      className={`absolute -top-7 -right-7 w-22 h-22 rounded-[1rem] overflow-hidden shadow-[0_14px_30px_rgba(0,0,0,0.22)] transition-transform duration-200 hover:scale-105 cursor-pointer z-20 ${
                        highlightedSpeaker === 'mikel' ? 'ring-2 ring-[#03473e]' : ''
                      }`}
                    >
                      <img
                        src={mikelImg}
                        alt="Mikel"
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover"
                      />
                    </button>

                    {/* Floating Portrait 2: Mid-Right (Stephen) */}
                    <button
                      type="button"
                      onClick={() =>
                        setHighlightedSpeaker((prev) => (prev === 'stephen' ? null : 'stephen'))
                      }
                      aria-label="Highlight Stephen lines"
                      className={`absolute top-[34%] -right-8 w-22 h-22 rounded-[1rem] overflow-hidden shadow-[0_14px_30px_rgba(0,0,0,0.22)] transition-transform duration-200 hover:scale-105 cursor-pointer z-20 ${
                        highlightedSpeaker === 'stephen' ? 'ring-2 ring-[#03473e]' : ''
                      }`}
                    >
                      <img
                        src={stephenImg}
                        alt="Stephen"
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover"
                      />
                    </button>

                    {/* Floating Portrait 3: Bottom-Left (Nathalie) */}
                    <button
                      ref={bottomLeftPortraitRef}
                      type="button"
                      onClick={() =>
                        setHighlightedSpeaker((prev) =>
                          prev === 'nathalie' ? null : 'nathalie'
                        )
                      }
                      aria-label="Highlight Nathalie lines"
                      className={`absolute bottom-[10%] -left-8 w-22 h-22 rounded-[1rem] overflow-hidden shadow-[0_14px_30px_rgba(0,0,0,0.22)] transition-transform duration-200 hover:scale-105 cursor-pointer z-20 ${
                        highlightedSpeaker === 'nathalie' ? 'ring-2 ring-[#03473e]' : ''
                      }`}
                    >
                      <img
                        src={nathalieImg}
                        alt="Nathalie"
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover"
                      />
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
                      <div className="inline-flex items-center justify-center rounded-full bg-[#1a1a1a] text-[#34d399] px-4 py-1.5 shadow-md">
                        <span className="flex items-center gap-1">
                          <span className="w-1 h-3 rounded-full bg-[#34d399] animate-pulse" />
                          <span className="w-1 h-4 rounded-full bg-[#34d399]" />
                          <span className="w-1 h-2 rounded-full bg-[#34d399]" />
                          <span className="w-1.5 h-1.5 rounded-sm bg-[#34d399] ml-1" />
                        </span>
                      </div>
                    </div>
                  </div>

                  {activeChapter !== 0 && (
                    <AnimatePresence mode="wait">
                      {activeChapter === 1 && (
                        /* Chapter 1: Ask anything — Spot Illustration + Typing Prompt -> Sent Pill */
                        <motion.div
                          key="chapter-ask"
                          initial={{ opacity: 0, scale: 0.98 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.98 }}
                          transition={{ duration: 0.28 }}
                          className="w-full h-full rounded-[1.5rem] bg-[#dedbca] border border-[#1a1a1a]/[0.06] shadow-[0_24px_60px_-18px_rgba(26,26,26,0.14)] p-6 flex flex-col justify-between relative overflow-hidden text-left"
                        >
                          {(() => {
                            const fullQ = "What's blocking the launch this week?";
                            const sent = askDemoTick >= 36 || Boolean(window1AnswerNote);
                            const typed = fullQ.slice(0, Math.min(fullQ.length, askDemoTick));
                            return (
                              <>
                                {/* Top: Sent Question Pill */}
                                <div className="min-h-[2.5rem] flex flex-col items-end gap-2 z-10 w-full">
                                  {sent && (
                                    <motion.div
                                      initial={{ opacity: 0, y: 14, scale: 0.95 }}
                                      animate={{ opacity: 1, y: 0, scale: 1 }}
                                      className="rounded-full bg-[#1a1a1a] text-[#ffffeb] px-4 py-2 text-xs font-medium shadow-md self-end"
                                    >
                                      {window1AnswerNote ? 'Your question' : fullQ}
                                    </motion.div>
                                  )}
                                </div>

                                {/* Center Spot Illustration (Magnifying Glass + Sprouting Botanical Stem + pink eee) */}
                                <div
                                  className={`flex flex-col items-center justify-center text-center transition-all duration-400 my-auto ${
                                    sent ? 'opacity-15 scale-90 -translate-y-3' : 'opacity-100 scale-100'
                                  }`}
                                >
                                  <img
                                    src={askAnythingIllus}
                                    alt="Ask anything about your meetings"
                                    className="w-24 h-20 object-contain mb-3 drop-shadow-xs"
                                  />
                                  <p className="font-display text-[1.25rem] leading-[1.18] text-[#1a1a1a]">
                                    Ask anything about
                                    <br />
                                    <em className="italic font-normal">your meetings</em>
                                  </p>
                                </div>

                                {/* Bottom Prompt Composer with Auto-Typing Demo */}
                                <form
                                  onSubmit={handleWindow1Ask}
                                  className="rounded-full bg-[#ffffff] border border-[#1a1a1a]/10 px-5 py-3 flex items-center justify-between shadow-xs z-10 w-full"
                                >
                                  <input
                                    type="text"
                                    value={
                                      window1Input ||
                                      (!sent
                                        ? typed
                                        : '')
                                    }
                                    onChange={(e) => setWindow1Input(e.target.value)}
                                    placeholder={sent ? "Ask a follow up about your meetings" : "Ask anything"}
                                    className="flex-1 bg-transparent text-xs text-[#1a1a1a] placeholder:text-[#1a1a1a]/40 focus:outline-none"
                                  />
                                  <button
                                    type="submit"
                                    aria-label="Send question"
                                    className="w-5 h-5 rounded-full bg-[#1a1a1a]/10 hover:bg-[#1a1a1a] text-[#1a1a1a] hover:text-white flex items-center justify-center transition-colors cursor-pointer shrink-0 ml-2"
                                  >
                                    <ArrowRight className="w-2.5 h-2.5" />
                                  </button>
                                </form>
                              </>
                            );
                          })()}
                        </motion.div>
                      )}

                      {activeChapter === 2 && (
                        /* Chapter 2: What did I miss? — Cozy Atmospheric Backdrop to iPad Transcript View */
                        <motion.div
                          key="chapter-missed"
                          initial={{ opacity: 0, scale: 0.98 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.98 }}
                          transition={{ duration: 0.28 }}
                          className="w-full h-full rounded-[1.5rem] bg-[#141414] shadow-2xl overflow-hidden relative flex items-center justify-center"
                        >
                          <img
                            src={ipadTranscriptImg}
                            alt="What did I miss transcript"
                            className="w-full h-full object-cover"
                          />
                        </motion.div>
                      )}

                      {activeChapter === 3 && (
                        /* Chapter 3: Summary — iPad Enhanced Summary View */
                        <motion.div
                          key="chapter-summary"
                          initial={{ opacity: 0, scale: 0.98 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.98 }}
                          transition={{ duration: 0.28 }}
                          className="w-full h-full rounded-[1.5rem] bg-[#141414] shadow-2xl overflow-hidden relative flex items-center justify-center"
                        >
                          <img
                            src={ipadSummaryImg}
                            alt="Generating Flow Summary"
                            className="w-full h-full object-cover"
                          />
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
                          className="w-full h-full rounded-[1.5rem] bg-[#161616] text-[#ffffeb] p-7 flex flex-col justify-between items-center text-center shadow-2xl"
                        >
                          {/* Claude 8-pointed star / asterisk */}
                          <div className="pt-1 text-white font-serif text-3xl select-none">
                            ✹
                          </div>

                          <div className="w-full space-y-4">
                            <h4 className="font-sans font-bold text-xl sm:text-2xl text-[#ffffff]">
                              What should we work on?
                            </h4>

                            {(() => {
                              const samplePrompt = 'Use the last week of meetings';
                              const typed = samplePrompt.slice(
                                0,
                                Math.min(samplePrompt.length, mcpDemoTick)
                              );
                              return (
                                <div className="rounded-2xl bg-[#242424] border border-white/5 p-4 text-left relative min-h-[5.5rem] flex flex-col justify-between">
                                  <div className="text-xs text-[#ffffff]/90 leading-relaxed font-sans">
                                    {typed || (
                                      <span className="text-[#ffffff]/35">
                                        Write a message...
                                      </span>
                                    )}
                                  </div>
                                  <div className="flex justify-end pt-2">
                                    <button
                                      type="button"
                                      aria-label="Submit"
                                      className="w-5 h-5 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors"
                                    >
                                      <span className="w-2 h-2 rounded-xs bg-white" />
                                    </button>
                                  </div>
                                </div>
                              );
                            })()}
                          </div>

                          {/* Bottom waveform capsule matching video */}
                          <div className="inline-flex items-center justify-center rounded-full bg-[#242424] border border-white/10 px-4 py-1.5 shadow-md">
                            <span className="flex items-center gap-1">
                              <span className="w-0.5 h-2 rounded-full bg-white/80" />
                              <span className="w-0.5 h-3.5 rounded-full bg-white" />
                              <span className="w-0.5 h-2 rounded-full bg-white/80" />
                              <span className="w-0.5 h-1.5 rounded-full bg-white/60" />
                              <span className="w-0.5 h-3 rounded-full bg-white" />
                              <span className="w-0.5 h-2 rounded-full bg-white/80" />
                            </span>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  )}
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
                        Get the details right.
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
                        No more &quot;sorry, can you repeat that?&quot; Tap &quot;What did I miss?&quot; and Notetaker gives you a summary of the last few minutes. You&apos;re caught up before anyone notices.
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
                        Connect to all your AI tools.
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

      {/* 5. Three-Column Illustrated Workflow Section matching screenshot */}
      <section className="pt-24 sm:pt-32 pb-24 sm:pb-32 bg-[#ffffeb]">
        <Container>
          <div ref={workflowRef} className="max-w-3xl mx-auto text-center mb-16 sm:mb-24">
            <p
              data-reveal-line
              className="text-xs font-semibold uppercase tracking-[0.16em] text-[#1a1a1a]/60 mb-5"
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

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16 max-w-6xl mx-auto text-center">
            {/* Workflow Item 1: Starts automatically */}
            <div className="flex flex-col items-center">
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
            <div className="flex flex-col items-center">
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
            <div className="flex flex-col items-center">
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
          <div className="max-w-6xl mx-auto rounded-[2rem] sm:rounded-[2.75rem] bg-[#E4E4D0] px-7 sm:px-12 py-9 sm:py-12 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-center">
            {/* Left Column: Heading */}
            <div className="lg:col-span-4">
              <h2 className="font-display text-3xl sm:text-4xl lg:text-[2.65rem] font-normal leading-[1.08] text-[#1a1a1a] tracking-[-0.015em]">
                Switch without<br />
                <em className="italic font-normal">losing a thing.</em>
              </h2>
            </div>

            {/* Middle Column: Copy & CTA */}
            <div className="lg:col-span-4 space-y-2.5 max-w-sm">
              <h3 className="font-semibold text-sm sm:text-base text-[#1a1a1a] leading-snug">
                Coming from Granola or Otter?
              </h3>
              <p className="text-xs sm:text-sm text-[#1a1a1a]/80 leading-relaxed">
                Import your entire meeting history in a few easy steps. You&apos;ll see the source, meeting date, summary, and transcript.
              </p>
              <div className="pt-3 sm:pt-4">
                <AppLink
                  to="/get-started"
                  className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#1a1a1a] hover:underline underline-offset-4 transition-all group"
                >
                  <span>Get started</span>
                  <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                </AppLink>
              </div>
            </div>

            {/* Right Column: Exact Illustration */}
            <div className="lg:col-span-4 flex items-center justify-center lg:justify-end">
              <img
                src={switchMigrationIllus}
                alt="Switch from Granola or Otter to Wispr Flow"
                className="w-full max-w-[19rem] sm:max-w-[22rem] h-auto object-contain select-none pointer-events-none"
                loading="lazy"
              />
            </div>
          </div>
        </Container>
      </section>

      {/* 7. Enterprise Controls ("FOR BUSINESS") */}
      <section className="py-20 sm:py-28 lg:py-32 bg-[#ffffeb]">
        <Container>
          <div ref={enterpriseRef} className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
            {/* Left Column: Heading & CTA */}
            <div className="lg:col-span-6 flex flex-col justify-between self-stretch">
              <div>
                <p className="text-xs sm:text-sm font-semibold uppercase tracking-[0.14em] text-[#1a1a1a]/60 mb-5 sm:mb-6">
                  FOR BUSINESS
                </p>
                <h2 className="font-display text-4xl sm:text-6xl lg:text-[4.25rem] font-normal leading-[1.0] tracking-[-0.025em] text-[#1a1a1a] mb-6 sm:mb-7">
                  Bring Notetaker<br />
                  to <em className="italic font-normal">your team.</em>
                </h2>
                <p className="text-base sm:text-lg text-[#1a1a1a]/75 leading-relaxed max-w-md">
                  Help your team move work forward, with the controls your organization needs.
                </p>
              </div>

              <div className="pt-12 sm:pt-20 lg:pt-32">
                <AppLink
                  to="/privacy"
                  className="inline-flex items-center gap-1.5 text-sm sm:text-base font-semibold text-[#1a1a1a] hover:underline underline-offset-4 transition-all group"
                >
                  <span>Explore enterprise privacy controls</span>
                  <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                </AppLink>
              </div>
            </div>

            {/* Right Column: Stacked Controls List */}
            <div className="lg:col-span-6 space-y-8 sm:space-y-10">
              {/* Item 1: Control Notetaker access */}
              <div data-ent-item>
                <div className="flex items-center gap-3.5 mb-2">
                  <div className="w-8 h-8 rounded-lg bg-[#e8e8d8] border border-black/5 flex items-center justify-center text-[#1a1a1a] shrink-0">
                    <SlidersHorizontal className="w-4 h-4" />
                  </div>
                  <h3 className="font-bold text-base sm:text-[1.05rem] text-[#1a1a1a]">
                    Control Notetaker access
                  </h3>
                </div>
                <p className="text-xs sm:text-sm text-[#1a1a1a]/75 leading-relaxed">
                  Turn Notetaker on or off across your organization.
                </p>
              </div>

              {/* Item 2: Optional consent acknowledgment */}
              <div data-ent-item>
                <div className="flex items-center gap-3.5 mb-2">
                  <div className="w-8 h-8 rounded-lg bg-[#e8e8d8] border border-black/5 flex items-center justify-center text-[#1a1a1a] shrink-0">
                    <ClipboardCheck className="w-4 h-4" />
                  </div>
                  <h3 className="font-bold text-base sm:text-[1.05rem] text-[#1a1a1a]">
                    Optional consent acknowledgment
                  </h3>
                </div>
                <p className="text-xs sm:text-sm text-[#1a1a1a]/75 leading-relaxed">
                  Choose to require users to confirm they&apos;ve obtained participant consent before recording.
                </p>
              </div>

              {/* Item 3: No training on your meeting data */}
              <div data-ent-item>
                <div className="flex items-center gap-3.5 mb-2">
                  <div className="w-8 h-8 rounded-lg bg-[#e8e8d8] border border-black/5 flex items-center justify-center text-[#1a1a1a] shrink-0">
                    <Power className="w-4 h-4" />
                  </div>
                  <h3 className="font-bold text-base sm:text-[1.05rem] text-[#1a1a1a]">
                    No training on your meeting data
                  </h3>
                </div>
                <p className="text-xs sm:text-sm text-[#1a1a1a]/75 leading-relaxed">
                  Model training is disabled for every enterprise account.
                </p>
              </div>

              {/* Item 4: Set privacy rules centrally */}
              <div data-ent-item>
                <div className="flex items-center gap-3.5 mb-2">
                  <div className="w-8 h-8 rounded-lg bg-[#e8e8d8] border border-black/5 flex items-center justify-center text-[#1a1a1a] shrink-0">
                    <Lock className="w-4 h-4" />
                  </div>
                  <h3 className="font-bold text-base sm:text-[1.05rem] text-[#1a1a1a]">
                    Set privacy rules centrally
                  </h3>
                </div>
                <p className="text-xs sm:text-sm text-[#1a1a1a]/75 leading-relaxed">
                  Apply organization-level privacy restrictions that individual users can&apos;t change.
                </p>
              </div>

              {/* Footnote */}
              <p className="italic text-xs sm:text-sm text-[#1a1a1a]/55 pt-2">
                *Consent acknowledgment is available on request.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* 8. Dedicated Notetaker Testimonials Section */}
      <NotetakerTestimonials />

      {/* 9. Notetaker FAQ Section - Split 2-Panel Master-Detail matching reference image */}
      <section className="py-20 sm:py-28 bg-[#ffffeb]">
        <Container>
          <div className="text-center mb-12 sm:mb-16">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#1a1a1a]/60 mb-3">
              FAQS
            </p>
            <h2 className="font-display text-4xl sm:text-6xl lg:text-[4.25rem] font-normal leading-[1.0] tracking-[-0.02em] text-[#1a1a1a]">
              You might <em className="italic font-normal">be wondering.</em>
            </h2>
          </div>

          <div className="max-w-6xl mx-auto rounded-[2.25rem] sm:rounded-[3rem] bg-[#E3E5D4] p-5 sm:p-8 lg:p-10 shadow-sm border border-black/5">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
              {/* Left Column: Questions List (Dark Green Box) */}
              <div className="lg:col-span-5 rounded-[1.75rem] sm:rounded-[2rem] bg-[#06443B] p-5 sm:p-7 text-[#ffffeb] flex flex-col shadow-inner">
                <h3 className="font-display text-2xl sm:text-[1.75rem] font-normal text-[#ffffeb] mb-5 shrink-0">
                  Questions
                </h3>

                <div className="space-y-2 overflow-y-auto max-h-[380px] sm:max-h-[440px] pr-1.5 custom-scrollbar">
                  {NOTETAKER_FAQS.map((faq) => {
                    const isSelected = activeFaqId === faq.id;
                    return (
                      <button
                        key={faq.id}
                        type="button"
                        onClick={() => setActiveFaqId(faq.id)}
                        className={`w-full text-left p-3.5 sm:p-4 rounded-xl transition-all cursor-pointer block ${
                          isSelected
                            ? 'bg-white/10 text-[#ffffeb] font-semibold shadow-sm'
                            : 'text-[#ffffeb]/80 hover:text-[#ffffeb] hover:bg-white/5 font-medium'
                        }`}
                      >
                        <span className="text-xs sm:text-[14px] leading-snug block">
                          {faq.question}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Right Column: Answer Panel */}
              {(() => {
                const activeFaq =
                  NOTETAKER_FAQS.find((f) => f.id === activeFaqId) || NOTETAKER_FAQS[0];
                return (
                  <div className="lg:col-span-7 flex flex-col justify-start">
                    <h3 className="font-display text-2xl sm:text-[1.75rem] font-normal text-[#1a1a1a] mb-2">
                      Answer
                    </h3>
                    <p className="font-semibold text-xs sm:text-sm text-[#1a1a1a]/70 mb-3 line-clamp-1">
                      {activeFaq.question}
                    </p>

                    <div className="rounded-2xl sm:rounded-3xl bg-[#ffffeb] p-6 sm:p-8 lg:p-9 shadow-sm border border-black/5 min-h-[340px] flex-1 flex flex-col justify-between">
                      <div className="space-y-4 text-xs sm:text-sm md:text-[15px] leading-relaxed text-[#1a1a1a]/85 font-body">
                        {activeFaq.answer.split('\n\n').map((paragraph, pIdx) => (
                          <p key={pIdx}>{paragraph}</p>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })()}
            </div>
          </div>
        </Container>
      </section>

      {/* 10. Editorial Guides ("Level up your note taking.") */}
      <section id="guides" className="py-20 sm:py-28 lg:py-32 bg-[#EFECE6] text-[#141414]">
        <Container>
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="font-display text-4xl sm:text-5xl lg:text-[3.5rem] leading-[1.02] tracking-tight text-[#141414]">
              <em className="italic font-normal">Level up</em> your note taking.
            </h2>
          </div>

          <div
            ref={guidesRef}
            className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4 lg:gap-6 max-w-6xl mx-auto"
          >
            {NOTETAKER_GUIDES.map((guide) => {
              const guideImgs =
                guide.variant === 'granola'
                  ? { cover: granolaGuideImg, avatar: robSolomonAvatar }
                  : guide.variant === 'inperson'
                  ? { cover: inPersonGuideImg, avatar: sammYatesAvatar }
                  : { cover: zoomGuideImg, avatar: robSolomonAvatar };

              return (
                <article
                  key={guide.id}
                  className="group flex flex-col p-3 sm:p-4 rounded-[24px] sm:rounded-[28px] bg-[#FFFFEB]/0 hover:bg-[#FFFFEB] transition-all duration-200 ease-out hover:shadow-[0_12px_36px_rgba(0,0,0,0.06)] cursor-pointer"
                >
                  <button
                    type="button"
                    onClick={() => setActiveGuide(guide)}
                    className="text-center w-full flex flex-col h-full cursor-pointer focus:outline-none"
                  >
                    {/* Visual Thumbnail */}
                    <div className="w-full aspect-[16/10] rounded-[16px] sm:rounded-[18px] overflow-hidden bg-black/5 relative mb-3.5">
                      <img
                        src={guideImgs.cover}
                        alt={guide.title}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                      />
                    </div>

                    {/* Tag / Category Badge (Centered) */}
                    <div className="mb-2.5">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-[4px] bg-[#E3DED5] text-[#3A3834] text-[10px] sm:text-[11px] font-mono font-semibold uppercase tracking-wider">
                        {guide.category}
                      </span>
                    </div>

                    {/* Title (Centered) */}
                    <h3 className="font-display text-lg sm:text-[1.25rem] lg:text-[1.32rem] leading-[1.28] font-normal text-[#141414] mb-5 text-center px-1 line-clamp-2 min-h-[3.2rem]">
                      {guide.title}
                    </h3>

                    {/* Author & Read Time Footer */}
                    <div className="flex items-center justify-between mt-auto pt-1 px-1 text-xs text-[#555] w-full">
                      <div className="flex items-center gap-2">
                        <img
                          src={guideImgs.avatar}
                          alt={guide.author}
                          referrerPolicy="no-referrer"
                          className="w-5 h-5 sm:w-6 sm:h-6 rounded-full object-cover shrink-0 ring-1 ring-black/10"
                        />
                        <span className="font-medium text-[#222]">{guide.author}</span>
                        <span className="text-[#888]">•</span>
                        <span className="text-[#666]">{guide.date}</span>
                      </div>
                      <span className="px-2 py-0.5 rounded-[4px] bg-[#E3DED5]/85 text-[#555] font-mono text-[10px] sm:text-[11px] font-medium tracking-tight uppercase">
                        {guide.readTime}
                      </span>
                    </div>
                  </button>
                </article>
              );
            })}
          </div>
        </Container>
      </section>

      {/* 11. Notetaker Final CTA */}
      <section ref={finalCtaRef} className="px-4 sm:px-6 lg:px-8 pb-16 sm:pb-24 bg-[#EFECE6]">
        <div className="max-w-7xl mx-auto">
          <div className="relative rounded-[2.5rem] sm:rounded-[3.5rem] lg:rounded-[4.5rem] overflow-hidden min-h-[32rem] sm:min-h-[40rem] lg:min-h-[44rem] flex items-center justify-center text-center text-[#ffffeb] px-6 py-20 sm:py-28 shadow-[0_25px_60px_rgba(0,0,0,0.18)]">
            <img
              src={ntCtaBg}
              alt="Wispr Flow Notetaker CTA"
              referrerPolicy="no-referrer"
              className="absolute inset-0 w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/40 to-black/35" />

            <div className="relative z-10 max-w-3xl mx-auto flex flex-col items-center">
              <h2
                className="font-display text-4xl sm:text-6xl md:text-7xl lg:text-[5.25rem] leading-[0.98] tracking-tight text-[#FFFFEB] mb-6"
                style={{ textWrap: 'balance' }}
              >
                Put your words to work <br className="hidden sm:inline" />
                in more ways <em className="italic font-normal">than one.</em>
              </h2>

              <p className="text-sm sm:text-base lg:text-lg text-[#FFFFEB]/85 max-w-xl mx-auto leading-relaxed mb-8 font-body">
                Capture meeting notes with Notetaker and write emails, messages, and documents by speaking with Flow. Both in one subscription.
              </p>

              <button
                type="button"
                onClick={() => onOpenDownload('notetaker')}
                className="inline-flex items-center justify-center gap-2.5 bg-[#E4D1FF] hover:bg-[#D8BEFF] rounded-xl px-7 py-3.5 text-sm sm:text-base font-medium text-[#141414] transition-all duration-200 hover:-translate-y-0.5 cursor-pointer shadow-md hover:shadow-lg whitespace-nowrap"
              >
                <OsButtonIcon os={detectedOS} />
                <span>
                  {detectedOS === 'mac' ? 'Get started on Mac' : 'Get started on Windows'}
                </span>
              </button>

              <div className="text-xs sm:text-[13px] font-medium text-[#FFFFEB]/75 mt-4">
                Available on Mac and Windows
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 12. Bottom Products Switcher Strip above Footer */}
      <section className="pb-16 sm:pb-24 bg-[#EFECE6]">
        <Container>
          <div className="max-w-6xl mx-auto">
            <div className="text-[11px] sm:text-xs font-mono uppercase tracking-[0.16em] text-[#787D6D] font-semibold mb-4 px-1">
              PRODUCTS
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
              {/* Product 1: Wispr Flow Dictation */}
              <div
                onClick={() => onOpenDownload('dictation')}
                className="group relative flex items-center gap-4 sm:gap-6 bg-[#DDD8CB] border-2 border-[#1a1a1a]/70 hover:border-[#1a1a1a] rounded-[20px] sm:rounded-[22px] p-2.5 sm:p-3 pr-6 sm:pr-8 transition-all duration-200 cursor-pointer shadow-xs hover:shadow-md"
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
                    <ChevronRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
                  </div>
                </div>
              </div>

              {/* Product 2: Wispr Flow Notetaker */}
              <div
                onClick={() => onOpenDownload('notetaker')}
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
                    <ChevronRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
                  </div>
                </div>
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

      {/* Fixed Floating Privacy / Access Button at Bottom Left matching video */}
      <div className="fixed bottom-6 left-6 z-50 pointer-events-auto">
        <button
          type="button"
          aria-label="Privacy & Preferences"
          className="w-11 h-11 rounded-full bg-[#d8b4e2] text-white flex items-center justify-center shadow-[0_4px_18px_rgba(0,0,0,0.18)] hover:scale-108 hover:shadow-[0_6px_22px_rgba(0,0,0,0.24)] transition-all cursor-pointer"
        >
          <svg
            viewBox="0 0 24 24"
            className="w-6 h-6 stroke-current fill-none stroke-[1.8]"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 1a10 10 0 0 0-1.8.16" />
            <path d="M7.34 3.65a10 10 0 0 0-2.6 3.6" />
            <path d="M4.1 11a10 10 0 0 0 .5 3.5" />
            <path d="M6.2 18.2a10 10 0 0 0 4.1 2.4" />
            <path d="M14 21.6a10 10 0 0 0 4.2-1.8" />
            <path d="M20.5 15.5a10 10 0 0 0 .5-3.5" />
            <path d="M19.7 7.5a10 10 0 0 0-2.3-3" />
            <path d="M12 5a7 7 0 0 0-6.7 5.1" />
            <path d="M5.5 13a7 7 0 0 0 1.2 3.8" />
            <path d="M9.8 19a7 7 0 0 0 5.4-.5" />
            <path d="M17.5 15a7 7 0 0 0 .5-3" />
            <path d="M16.5 8a7 7 0 0 0-3.3-2.5" />
            <path d="M12 9a3 3 0 0 0-3 3c0 2 1 3.5 3 3.5s3-1.5 3-3.5a3 3 0 0 0-3-3" />
          </svg>
        </button>
      </div>
    </div>
  );
};
