import React, { useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowUp, AtSign, Check, ChevronDown, Loader2, Plus, Smile, X } from 'lucide-react';
import { Container } from '../../components/Container';
import { AppDestinationIcon } from '../../components/BrandMarks';
import { SmoothTextPathMarquee } from '../../components/SmoothTextPathMarquee';
import { HOW_IT_WORKS_STEPS, SPEED_DEMO_TEXT } from '../../data/features';
import { gsap, useScrollCorners } from '../../hooks/useGsapAnimations';
import { SpeedComparison } from '../SpeedComparison/SpeedComparison';
import { HowItWorks } from '../HowItWorks/HowItWorks';

type StepId = 'speak' | 'edits' | 'anywhere';
type DestApp = 'slack' | 'claude' | 'gmail' | 'docs';

const APP_ORDER: DestApp[] = ['slack', 'claude', 'gmail', 'docs'];
const SPEED_PILL_BARS = [42, 76, 98, 56, 88, 50, 94, 68, 44, 72];

interface SpeechSegment {
  text: string;
  tag?: 'filler' | 'correction' | 'repeat' | 'date';
}

const TYPEWRITER_SEGMENTS: SpeechSegment[] = [
  { text: 'Hey so ' },
  { text: 'um', tag: 'filler' },
  { text: ' ' },
  { text: 'can you actually wait', tag: 'correction' },
  { text: ' can you tell the team that ' },
  { text: 'the the', tag: 'repeat' },
  { text: ' launch is gonna slip I think to ' },
  { text: 'like', tag: 'filler' },
  { text: ' ' },
  { text: 'not Friday the following Monday', tag: 'date' },
  { text: " because we're still waiting on " },
  { text: 'uh', tag: 'filler' },
  { text: ' legal to sign off on ' },
  { text: 'the the', tag: 'repeat' },
  { text: ' new terms page and ' },
  { text: 'uh yeah', tag: 'filler' },
  { text: " just let them know we'll have a real timeline by " },
  { text: 'by by', tag: 'repeat' },
  { text: ' ' },
  { text: 'end of week sorry end of day Thursday', tag: 'date' },
];

const TOTAL_SPEECH_CHARS = TYPEWRITER_SEGMENTS.reduce((sum, seg) => sum + seg.text.length, 0);

const APP_CARDS: Record<
  DestApp,
  {
    label: string;
    body: string;
  }
> = {
  slack: {
    label: 'Slack',
    body: "Can you let the team know the launch is slipping to Monday? We're still waiting on legal to sign off on the new terms page. We'll have a firm timeline by end of day Thursday.",
  },
  claude: {
    label: 'Claude',
    body: "Can you let the team know the launch is slipping to Monday? We're still waiting on legal to sign off on the new terms page. We'll have a firm timeline by end of day Thursday.",
  },
  gmail: {
    label: 'Gmail',
    body: "Hi Marcus,\n\nCan you let the team know the launch is slipping to Monday? We're still waiting on legal to sign off on the new terms page. We'll have a firm timeline by end of day Thursday.",
  },
  docs: {
    label: 'Docs',
    body: "Can you let the team know the launch is slipping to Monday? We're still waiting on legal to sign off on the new terms page. We'll have a firm timeline by end of day Thursday.",
  },
};

const CardAppLogo: React.FC<{ app: DestApp }> = ({ app }) => {
  if (app === 'gmail') {
    return (
      <span className="inline-flex items-center justify-center w-6 h-6 font-display font-bold text-lg text-[#ffffeb] tracking-tight">
        M
      </span>
    );
  }
  return (
    <div className="p-2 rounded-xl bg-[#ffffeb]/95 shadow-lg">
      <AppDestinationIcon app={app === 'claude' ? 'claude' : app === 'docs' ? 'docs' : 'slack'} />
    </div>
  );
};

const CardAppFooter: React.FC<{ app: DestApp }> = ({ app }) => {
  if (app === 'claude') {
    return (
      <div className="flex items-center justify-between pt-2.5 mt-2 border-t border-[#1a1a1a]/10 text-[#1a1a1a]/60">
        <span className="w-5 h-5 rounded-full bg-[#1a1a1a]/10 flex items-center justify-center">
          <Plus className="w-3 h-3" />
        </span>
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1 text-[0.65rem] font-semibold text-[#1a1a1a]/65">
            Sonnet 4.5
            <ChevronDown className="w-2.5 h-2.5" />
          </span>
          <span className="w-5 h-5 rounded-md bg-[#c96442] text-[#ffffeb] flex items-center justify-center">
            <ArrowUp className="w-3 h-3" />
          </span>
        </div>
      </div>
    );
  }

  if (app === 'gmail') {
    return (
      <div className="flex items-center justify-between pt-2.5 mt-2 border-t border-[#1a1a1a]/10 text-[#1a1a1a]/60">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#1a73e8] text-white text-[0.65rem] font-semibold">
            Send
            <ChevronDown className="w-2.5 h-2.5" />
          </span>
          <span className="text-[0.7rem] font-bold">A</span>
          <Smile className="w-3 h-3" />
        </div>
        <span className="text-[0.65rem] text-[#1a1a1a]/40 font-medium">Saved</span>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-between pt-2.5 mt-2 border-t border-[#1a1a1a]/10 text-[#1a1a1a]/55">
      <div className="flex items-center gap-2.5">
        <span className="w-5 h-5 rounded-full bg-[#1a1a1a]/10 flex items-center justify-center">
          <Plus className="w-3 h-3" />
        </span>
        <span className="text-xs font-bold">Aa</span>
        <Smile className="w-3.5 h-3.5" />
        <AtSign className="w-3.5 h-3.5" />
      </div>
      <span className="w-6 h-6 rounded-md bg-[#034f46] text-[#ffffeb] flex items-center justify-center">
        <ArrowUp className="w-3.5 h-3.5" />
      </span>
    </div>
  );
};

export const SpeedToFlowStage: React.FC = () => {
  const outerRef = useRef<HTMLDivElement>(null);
  const greenBandRef = useRef<HTMLElement>(null);
  const stageTrackRef = useRef<HTMLDivElement>(null);
  const keyboardRef = useRef<HTMLDivElement>(null);
  const centerCardRef = useRef<HTMLDivElement>(null);
  const speedTextRef = useRef<HTMLDivElement>(null);
  const speedPillRef = useRef<HTMLDivElement>(null);
  const howInnerRef = useRef<HTMLDivElement>(null);
  const howBadgeRef = useRef<HTMLDivElement>(null);
  const howPillRef = useRef<HTMLDivElement>(null);
  const howColumnsRef = useRef<HTMLDivElement>(null);

  const [activeStep, setActiveStep] = useState<StepId>('speak');
  const [selectedApp, setSelectedApp] = useState<DestApp>('slack');
  const [typedChars, setTypedChars] = useState<number>(11);
  const [editsCleaned, setEditsCleaned] = useState<boolean>(false);
  const [stagePhase, setStagePhase] = useState<'speed' | 'how'>('speed');

  const prevStepRef = useRef<StepId>('speak');
  const prevPhaseRef = useRef<'speed' | 'how'>('speed');

  useScrollCorners(greenBandRef, 72, 40);

  // Card 1 Live Character-by-Character Typewriter Loop during Speak naturally (00:02 -> 00:11)
  useEffect(() => {
    if (stagePhase !== 'how' || activeStep !== 'speak') return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setTypedChars(TOTAL_SPEECH_CHARS);
      return;
    }

    let pauseTicks = 0;
    const interval = window.setInterval(() => {
      setTypedChars((prev) => {
        if (prev >= TOTAL_SPEECH_CHARS) {
          pauseTicks += 1;
          if (pauseTicks < 45) return prev;
          pauseTicks = 0;
          return 10;
        }
        return prev + 1;
      });
    }, 32);

    return () => window.clearInterval(interval);
  }, [stagePhase, activeStep]);

  // Card 2 Messy + Cleaning up... -> Messy fades out & clean message lands inside centered composer (00:13 -> 00:18)
  useEffect(() => {
    if (stagePhase !== 'how' || activeStep !== 'edits') {
      setEditsCleaned(false);
      return;
    }

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setEditsCleaned(true);
      return;
    }

    let t1: number | undefined;
    let t2: number | undefined;
    const runCycle = () => {
      setEditsCleaned(false);
      t1 = window.setTimeout(() => {
        setEditsCleaned(true);
      }, 1500);
      t2 = window.setTimeout(runCycle, 5200);
    };

    runCycle();
    return () => {
      if (t1) window.clearTimeout(t1);
      if (t2) window.clearTimeout(t2);
    };
  }, [stagePhase, activeStep]);

  // Card 3 Continuous Auto-Swiping App Carousel (00:19 -> 00:27)
  useEffect(() => {
    if (stagePhase !== 'how' || activeStep !== 'anywhere') return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const timer = window.setInterval(() => {
      setSelectedApp((prev) => {
        const idx = APP_ORDER.indexOf(prev);
        return APP_ORDER[(idx + 1) % APP_ORDER.length];
      });
    }, 2300);

    return () => window.clearInterval(timer);
  }, [stagePhase, activeStep]);

  // Desktop GSAP ScrollTrigger Master Scrub Timeline (1024px+)
  useEffect(() => {
    const outer = outerRef.current;
    if (!outer || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const mm = gsap.matchMedia();
    mm.add('(min-width: 1024px)', () => {
      if (
        !stageTrackRef.current ||
        !keyboardRef.current ||
        !centerCardRef.current ||
        !speedTextRef.current ||
        !speedPillRef.current ||
        !howInnerRef.current ||
        !howBadgeRef.current ||
        !howPillRef.current ||
        !howColumnsRef.current
      ) {
        return;
      }

      const setupTimeline = () => {
        const vw = window.innerWidth;
        const vh = window.innerHeight;
        const stageW = Math.min(1260, Math.round(vw * 0.92));
        const kbW = Math.round(stageW * 0.275);
        const gap = 3;
        const flowInitW = stageW - kbW - gap;
        const flowInitX = Math.round((stageW - flowInitW) / 2);

        const speedH = Math.round(Math.min(470, Math.max(335, vh - 285)));
        const speedTop = Math.round(Math.min(265, Math.max(232, vh * 0.285)));
        const speedY = Math.round(speedTop + speedH / 2 - vh / 2);

        const howW = Math.round(Math.min(384, Math.max(356, stageW * 0.31)));
        const howH = Math.round(Math.min(455, Math.max(390, vh - 210)));
        const howIntroY = Math.round(Math.min(68, Math.max(36, vh * 0.08)));

        gsap.set(stageTrackRef.current, { maxWidth: stageW });
        gsap.set(keyboardRef.current, { width: kbW, height: speedH, x: 0, y: speedY, opacity: 1 });
        gsap.set(centerCardRef.current, {
          width: flowInitW,
          height: speedH,
          x: flowInitX,
          y: speedY,
          borderRadius: 30,
        });
        gsap.set(speedTextRef.current, { opacity: 1 });
        gsap.set(speedPillRef.current, { opacity: 1 });
        gsap.set(howInnerRef.current, { opacity: 0 });
        gsap.set(howBadgeRef.current, { opacity: 0 });
        gsap.set(howPillRef.current, { opacity: 0 });
        gsap.set(howColumnsRef.current, { opacity: 0 });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: outer,
            start: 'top top',
            end: 'bottom bottom',
            scrub: 0.55,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              const p = self.progress;

              const nextPhase: 'speed' | 'how' = p >= 0.34 ? 'how' : 'speed';
              if (nextPhase !== prevPhaseRef.current) {
                prevPhaseRef.current = nextPhase;
                setStagePhase(nextPhase);
              }

              const nextStep: StepId =
                p < 0.65 ? 'speak' : p < 0.79 ? 'edits' : 'anywhere';
              if (nextStep !== prevStepRef.current) {
                prevStepRef.current = nextStep;
                setActiveStep(nextStep);
                if (nextStep === 'speak') setTypedChars(11);
              }
            },
          },
        });

        // Phase 1 (0.04 -> 0.18): Keyboard slides left, Flow expands full-width (stageW)
        tl.to(
          keyboardRef.current,
          { x: -(kbW + 60), opacity: 0, ease: 'power2.inOut', duration: 0.14 },
          0.04
        )
          .to(
            centerCardRef.current,
            { x: 0, width: stageW, height: speedH + 14, ease: 'power2.inOut', duration: 0.15 },
            0.04
          )
          // Phase 2 (0.19 -> 0.34): Fade speed text & pill, morph wide card -> ~380px portrait card below Band 2 intro headline
          .to(speedTextRef.current, { opacity: 0, ease: 'none', duration: 0.07 }, 0.19)
          .to(speedPillRef.current, { opacity: 0, ease: 'none', duration: 0.07 }, 0.25)
          .to(
            centerCardRef.current,
            {
              width: howW,
              height: howH,
              y: howIntroY,
              borderRadius: 24,
              ease: 'power2.inOut',
              duration: 0.13,
            },
            0.22
          )
          // Phase 3a (0.34 -> 0.40): Reveal dark Flow HUD dictation pill (x ||||||| ✓)
          .to(howPillRef.current, { opacity: 1, ease: 'none', duration: 0.06 }, 0.34)
          // Phase 3b (0.44 -> 0.51): Center portrait card vertically as intro heading exits & reveal 3-column stage
          .to(centerCardRef.current, { y: 0, ease: 'power2.out', duration: 0.08 }, 0.44)
          .to(
            [howColumnsRef.current, howInnerRef.current, howBadgeRef.current],
            { opacity: 1, ease: 'none', duration: 0.07 },
            0.45
          )
          .to({}, { duration: 0.04 }, 0.96);

        return tl;
      };

      const tl = setupTimeline();
      return () => {
        tl?.scrollTrigger?.kill();
        tl?.kill();
      };
    });

    return () => mm.revert();
  }, []);

  const activeData =
    HOW_IT_WORKS_STEPS.find((s) => s.id === activeStep) || HOW_IT_WORKS_STEPS[0];

  const jumpToStep = (step: StepId) => {
    setActiveStep(step);
    if (step === 'speak') setTypedChars(11);
    if (!outerRef.current) return;
    const rect = outerRef.current.getBoundingClientRect();
    const docTop = window.scrollY + rect.top;
    const scrollable = outerRef.current.offsetHeight - window.innerHeight;
    const ratio = step === 'speak' ? 0.52 : step === 'edits' ? 0.69 : 0.82;
    window.scrollTo({
      top: docTop + scrollable * ratio,
      behavior: 'smooth',
    });
  };

  // Compute currently typed segments + latest active detection badge
  const { visibleSegments, activeSpeakTag } = useMemo(() => {
    let remaining = typedChars;
    const parts: { key: number; text: string; tag?: SpeechSegment['tag'] }[] = [];
    let latestTag: SpeechSegment['tag'] = 'filler';

    for (let i = 0; i < TYPEWRITER_SEGMENTS.length; i++) {
      if (remaining <= 0) break;
      const seg = TYPEWRITER_SEGMENTS[i];
      const slice = seg.text.slice(0, remaining);
      remaining -= slice.length;
      if (slice.length > 0) {
        parts.push({ key: i, text: slice, tag: seg.tag });
        if (seg.tag) latestTag = seg.tag;
      }
    }

    return { visibleSegments: parts, activeSpeakTag: latestTag };
  }, [typedChars]);

  const getSpeakToastBadge = () => {
    if (activeSpeakTag === 'correction') {
      return {
        text: 'Self correction',
        style: 'bg-[#60a5fa] text-[#1a1a1a]',
        tilt: '-rotate-6',
      };
    }
    if (activeSpeakTag === 'repeat') {
      return {
        text: 'Repetition identified',
        style: 'bg-[#f472b6] text-[#1a1a1a]',
        tilt: '-rotate-6',
      };
    }
    if (activeSpeakTag === 'date') {
      return {
        text: 'Correction identified',
        style: 'bg-[#ffffeb] border-[1.5px] border-[#ff6c4c] text-[#ff6c4c]',
        tilt: '-rotate-6',
      };
    }
    return {
      text: 'Filler identified',
      style: 'bg-[#ffa946] text-[#1a1a1a]',
      tilt: '-rotate-6',
    };
  };

  const activeStepIndex = Math.max(
    0,
    HOW_IT_WORKS_STEPS.findIndex((s) => s.id === activeStep)
  );
  const speakBadge = getSpeakToastBadge();
  const isCard2Bg = stagePhase === 'how' && activeStep === 'edits';
  const isCard3Bg = stagePhase === 'how' && activeStep === 'anywhere';

  return (
    <>
      {/* Desktop Unified Scroll-Choreographed Morph Stage (GSAP ScrollTrigger 1024px+) */}
      <div ref={outerRef} className="hidden lg:block relative z-20">
        {/* Sticky Master Card Overlay centered in viewport */}
        <div className="sticky top-0 h-screen z-20 pointer-events-none flex items-center justify-center">
          <div
            ref={stageTrackRef}
            className="relative w-[92vw] max-w-[1260px] h-full flex items-center justify-center"
          >
            {/* Left Keyboard 45 wpm Card */}
            <div
              ref={keyboardRef}
              className="absolute left-0 rounded-[1.85rem] border-[2.5px] border-[#ffffeb]/18 bg-[#034f46] flex flex-col items-center pt-10 overflow-hidden will-change-transform"
            >
              <div className="text-center px-5">
                <div className="text-[0.95rem] font-medium text-[#ffffeb]/95 leading-tight mb-0.5">
                  Keyboard
                </div>
                <div className="font-display text-[2.35rem] font-normal text-[#ffffeb] leading-[1.02] tracking-tight">
                  45 wpm
                </div>
              </div>

              <div className="absolute inset-x-0 top-[58%] -translate-y-1/2 overflow-hidden">
                <SmoothTextPathMarquee
                  pathId="desktop-kb-straight"
                  text={SPEED_DEMO_TEXT}
                  speed={38}
                  variant="straight"
                  viewBoxWidth={350}
                  viewBoxHeight={56}
                  edgeY={32}
                  fontSize={16.5}
                  fontWeight={500}
                  fill="rgba(255, 255, 235, 0.46)"
                  initialPhase={0.34}
                  className="w-full aspect-[350/56] overflow-visible"
                />
              </div>
            </div>

            {/* Center Morphing Card (Flow 220 wpm -> Portrait 3-Card Stage) */}
            <div
              ref={centerCardRef}
              className="relative z-20 rounded-[1.85rem] overflow-hidden shadow-2xl will-change-transform"
            >
              {/* Layer A: Card 1 & Speed Backdrop */}
              <img
                src="/src/assets/images/elena_verna_portrait_1794805451854.jpg"
                alt=""
                loading="lazy"
                referrerPolicy="no-referrer"
                className={`absolute inset-0 w-full h-full object-cover object-top scale-125 transition-opacity duration-500 ${
                  stagePhase === 'how' ? 'blur-[7px] brightness-[0.86] saturate-[1.2]' : 'blur-[5px] brightness-[0.9] saturate-[1.15]'
                } ${!isCard2Bg && !isCard3Bg ? 'opacity-100' : 'opacity-0'}`}
              />

              {/* Layer B: Card 2 Distinct Moody Evening Backdrop (Edits as you speak) */}
              <img
                src="/src/assets/images/steven_bartlett_portrait_1794805450787.jpg"
                alt=""
                loading="lazy"
                referrerPolicy="no-referrer"
                className={`absolute inset-0 w-full h-full object-cover object-center scale-125 blur-[8px] brightness-[0.76] saturate-[1.25] transition-opacity duration-500 ${
                  isCard2Bg ? 'opacity-100' : 'opacity-0'
                }`}
              />

              {/* Layer C: Card 3 Distinct Office/Laptop Workspace Backdrop (Use it anywhere) */}
              <img
                src="/src/assets/images/alex_lieberman_office_1794805451048.jpg"
                alt=""
                loading="lazy"
                referrerPolicy="no-referrer"
                className={`absolute inset-0 w-full h-full object-cover object-center scale-125 blur-[7px] brightness-[0.85] saturate-[1.2] transition-opacity duration-500 ${
                  isCard3Bg ? 'opacity-100' : 'opacity-0'
                }`}
              />

              <div
                aria-hidden="true"
                className={`absolute inset-0 transition-colors duration-500 ${
                  isCard2Bg
                    ? 'bg-gradient-to-b from-[#0d192b]/68 via-[#18120e]/52 to-[#0d0907]/85'
                    : isCard3Bg
                      ? 'bg-gradient-to-b from-[#112432]/38 via-[#261b12]/28 to-[#120d09]/74'
                      : stagePhase === 'how'
                        ? 'bg-gradient-to-b from-[#231912]/38 via-[#3d2515]/22 to-[#140d08]/72'
                        : 'bg-gradient-to-b from-[#1a2228]/20 via-transparent to-[#1a120a]/55'
                }`}
              />

              {/* Layer 1: Flow 220 wpm + Smooth Infinite Arched Marquee */}
              <div ref={speedTextRef} className="absolute inset-0 pointer-events-none">
                <div className="text-center px-6 pt-10">
                  <div className="text-[0.95rem] font-medium text-[#ffffeb] leading-tight mb-0.5">
                    Flow
                  </div>
                  <div className="font-display text-[2.4rem] font-normal text-[#ffffeb] leading-[1.02] tracking-tight">
                    220 wpm
                  </div>
                </div>

                <div className="absolute inset-x-0 top-[35%] overflow-hidden">
                  <SmoothTextPathMarquee
                    pathId="desktop-flow-fast-curve"
                    text={SPEED_DEMO_TEXT}
                    speed={186}
                    variant="arch"
                    viewBoxWidth={900}
                    viewBoxHeight={185}
                    edgeY={122}
                    peakY={26}
                    fontSize={18}
                    fontWeight={500}
                    fill="#ffffff"
                    initialPhase={0.18}
                    className="w-full aspect-[900/185] overflow-visible"
                  />
                </div>
              </div>

              {/* Layer 2: How It Works Interactive Demo Overlay */}
              <div
                ref={howInnerRef}
                className={`absolute inset-0 p-5 pb-16 flex flex-col justify-between ${
                  stagePhase === 'how' ? 'pointer-events-auto' : 'pointer-events-none'
                }`}
              >
                {activeStep !== 'anywhere' ? (
                  <>
                    {/* Top Spoken Text Area: Colored Text Typewriter on Card 1, Messy fades cleanly out on Card 2 */}
                    <div className="min-h-[8rem] flex items-center justify-center px-1">
                      <AnimatePresence mode="wait">
                        {activeStep === 'speak' && (
                          <motion.div
                            key="how-top-speak-typewriter"
                            initial={{ opacity: 0, y: 6 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -6 }}
                            transition={{ duration: 0.2 }}
                            className="text-center text-[0.76rem] leading-[1.52] font-semibold text-[#ffffff]"
                          >
                            {visibleSegments.map((seg) => {
                              if (seg.tag === 'filler') {
                                return (
                                  <span key={seg.key} className="text-[#ffa946] font-bold">
                                    {seg.text}
                                  </span>
                                );
                              }
                              if (seg.tag === 'correction') {
                                return (
                                  <span key={seg.key} className="text-[#60a5fa] font-bold">
                                    {seg.text}
                                  </span>
                                );
                              }
                              if (seg.tag === 'repeat') {
                                return (
                                  <span key={seg.key} className="text-[#f472b6] font-bold">
                                    {seg.text}
                                  </span>
                                );
                              }
                              if (seg.tag === 'date') {
                                return (
                                  <span key={seg.key} className="text-[#ff6c4c] font-bold">
                                    {seg.text}
                                  </span>
                                );
                              }
                              return <span key={seg.key}>{seg.text}</span>;
                            })}
                          </motion.div>
                        )}

                        {activeStep === 'edits' && !editsCleaned && (
                          <motion.p
                            key="how-top-edits-messy"
                            initial={{ opacity: 0, y: 6 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.3 }}
                            className="text-[0.72rem] leading-[1.48] text-[#ffffeb] text-center font-medium"
                          >
                            Hey so <span className="text-[#ffa946] font-bold">um</span>{' '}
                            <span className="text-[#60a5fa] font-bold">can you actually wait</span>{' '}
                            can you tell the team that{' '}
                            <span className="text-[#f472b6] font-bold">the the</span> launch is gonna slip I think to{' '}
                            <span className="text-[#ffa946] font-bold">like</span>{' '}
                            <span className="text-[#ff6c4c] font-bold">not Friday the following Monday</span>{' '}
                            because we’re still waiting on{' '}
                            <span className="text-[#ffa946] font-bold">uh</span> legal to sign off on{' '}
                            <span className="text-[#f472b6] font-bold">the the</span> new terms page and{' '}
                            <span className="text-[#ffa946] font-bold">uh yeah</span> just let them know we’ll have a real timeline by{' '}
                            <span className="text-[#f472b6] font-bold">by by</span>{' '}
                            <span className="text-[#ff6c4c] font-bold">end of week sorry end of day Thursday</span>
                          </motion.p>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* Message Composer Card: glides nicely upward once cleaned text lands (00:15 -> 00:18) */}
                    <div
                      className={`relative z-10 w-full rounded-2xl bg-[#ffffeb] text-[#1a1a1a] p-4 shadow-xl text-left transition-transform duration-500 ease-out ${
                        activeStep === 'edits' && editsCleaned ? '-translate-y-10' : 'translate-y-0'
                      }`}
                    >
                      <div className="min-h-[4.35rem] flex items-start">
                        <AnimatePresence mode="wait">
                          {activeStep === 'edits' && editsCleaned ? (
                            <motion.p
                              key="desk-edits-clean"
                              initial={{ opacity: 0, y: 4 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0 }}
                              transition={{ duration: 0.28 }}
                              className="text-[0.75rem] leading-relaxed font-medium text-[#1a1a1a]"
                            >
                              {APP_CARDS.slack.body}
                            </motion.p>
                          ) : (
                            <motion.span
                              key="desk-msg-placeholder"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              exit={{ opacity: 0 }}
                              className="text-xs text-[#1a1a1a]/45 font-medium"
                            >
                              Message...
                            </motion.span>
                          )}
                        </AnimatePresence>
                      </div>
                      <div className="flex items-center justify-between pt-2.5 mt-2 border-t border-[#1a1a1a]/10 text-[#1a1a1a]/55">
                        <div className="flex items-center gap-2.5">
                          <span className="w-5 h-5 rounded-full bg-[#1a1a1a]/10 flex items-center justify-center">
                            <Plus className="w-3 h-3" />
                          </span>
                          <span className="text-xs font-bold">Aa</span>
                          <Smile className="w-3.5 h-3.5" />
                          <AtSign className="w-3.5 h-3.5" />
                        </div>
                        <span
                          className={`w-6 h-6 rounded-md flex items-center justify-center transition-colors ${
                            activeStep === 'edits' && editsCleaned
                              ? 'bg-[#034f46] text-[#ffffeb]'
                              : 'bg-[#1a1a1a]/10'
                          }`}
                        >
                          <ArrowUp className="w-3.5 h-3.5" />
                        </span>
                      </div>
                    </div>
                  </>
                ) : (
                  /* Card 3 (Use it anywhere): Simultaneous Horizontal Tilting Dual-Corner Carousel matching 00:20 -> 00:27 */
                  <div className="flex-1 flex flex-col justify-center">
                    <div className="flex justify-center mb-3 h-10 items-center">
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={`logo-${selectedApp}`}
                          initial={{ opacity: 0, scale: 0.85 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.85 }}
                          transition={{ duration: 0.22 }}
                        >
                          <CardAppLogo app={selectedApp} />
                        </motion.div>
                      </AnimatePresence>
                    </div>

                    <div className="relative h-[196px] w-full">
                      <AnimatePresence initial={false}>
                        <motion.div
                          key={selectedApp}
                          initial={{ x: '112%', rotate: 7, scale: 0.92, opacity: 0.85 }}
                          animate={{ x: '0%', rotate: 0, scale: 1, opacity: 1 }}
                          exit={{ x: '-112%', rotate: -7, scale: 0.92, opacity: 0.85 }}
                          transition={{ duration: 0.52, ease: [0.22, 1, 0.36, 1] }}
                          className="absolute inset-x-0 top-0 w-full rounded-2xl bg-[#ffffeb] text-[#1a1a1a] p-4 shadow-xl text-left will-change-transform"
                        >
                          <p className="text-[0.74rem] leading-relaxed font-medium text-[#1a1a1a] whitespace-pre-line min-h-[6rem]">
                            {APP_CARDS[selectedApp].body}
                          </p>
                          <CardAppFooter app={selectedApp} />
                        </motion.div>
                      </AnimatePresence>
                    </div>

                    {/* App Quick Switch Dots */}
                    <div className="flex items-center justify-center gap-1.5 mt-3">
                      {APP_ORDER.map((app) => (
                        <button
                          key={app}
                          type="button"
                          onClick={() => setSelectedApp(app)}
                          aria-label={`Preview in ${APP_CARDS[app].label}`}
                          className={`h-1.5 rounded-full transition-all cursor-pointer ${
                            selectedApp === app ? 'w-5 bg-[#ffffeb]' : 'w-1.5 bg-[#ffffeb]/40 hover:bg-[#ffffeb]/70'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Speed Phase Dark 10-Bar Waveform Pill */}
              <div
                ref={speedPillRef}
                className="absolute inset-x-0 bottom-[19%] z-20 flex justify-center pointer-events-none"
              >
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

              {/* HowItWorks Phase Bottom Tilted Detection Badges & Dark HUD Pill */}
              <div className="absolute inset-x-0 bottom-3.5 z-20 flex flex-col items-center gap-0.5 pointer-events-none">
                <div ref={howBadgeRef} className="-mb-1 relative z-30">
                  <AnimatePresence mode="wait">
                    {activeStep === 'speak' && (
                      <motion.span
                        key={speakBadge.text}
                        initial={{ opacity: 0, y: 10, scale: 0.85 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -6, scale: 0.85 }}
                        transition={{ type: 'spring', stiffness: 420, damping: 24 }}
                        className={`inline-block px-3 py-0.5 rounded-full text-[0.68rem] font-bold shadow-md ${speakBadge.style} ${speakBadge.tilt}`}
                      >
                        {speakBadge.text}
                      </motion.span>
                    )}
                    {activeStep === 'edits' && !editsCleaned && (
                      <motion.span
                        key="desk-badge-edits"
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -4 }}
                        className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#1a1a1a] text-[#ffffeb] border border-[#ffffeb]/20 text-[0.68rem] font-semibold shadow-md"
                      >
                        <Loader2 className="w-2.5 h-2.5 animate-spin" />
                        <span>Cleaning up...</span>
                      </motion.span>
                    )}
                  </AnimatePresence>
                </div>

                {/* Card 1 & 2 show (x ||||||| ✓) HUD; Card 3 shows sleek dark waveform capsule matching video */}
                <div ref={howPillRef}>
                  {activeStep === 'anywhere' ? (
                    <div className="inline-flex items-center justify-center px-3.5 py-1.5 rounded-full bg-[#1a1a1a] border-[1.5px] border-[#ffffeb]/90 shadow-xl">
                      <div className="flex items-center gap-[2.5px] h-3.5" aria-hidden="true">
                        {SPEED_PILL_BARS.map((h, i) => (
                          <span
                            key={i}
                            className="w-[2px] rounded-full bg-[#ffffeb]"
                            style={{
                              height: `${h}%`,
                              animation: `pulse ${0.6 + (i % 4) * 0.14}s ease-in-out ${(i * 0.08).toFixed(2)}s infinite alternate`,
                            }}
                          />
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="inline-flex items-center gap-2 px-2.5 py-1.5 rounded-full bg-[#1a1a1a]/95 border border-[#ffffeb]/30 shadow-xl">
                      <span className="w-4 h-4 rounded-full bg-white/25 text-[#1a1a1a] flex items-center justify-center">
                        <X className="w-2.5 h-2.5 stroke-[2.5]" />
                      </span>
                      <div className="flex items-center gap-[2px] h-3.5" aria-hidden="true">
                        {SPEED_PILL_BARS.slice(0, 9).map((h, i) => (
                          <span
                            key={i}
                            className="w-[2px] rounded-full bg-[#ffffeb]"
                            style={{
                              height: `${h}%`,
                              animation: `pulse ${0.6 + (i % 4) * 0.14}s ease-in-out ${(i * 0.08).toFixed(2)}s infinite alternate`,
                            }}
                          />
                        ))}
                      </div>
                      <span className="w-4 h-4 rounded-full bg-white/85 text-[#1a1a1a] flex items-center justify-center">
                        <Check className="w-2.5 h-2.5 stroke-[2.75]" />
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Underlying Scrollable Background Sections pulled up underneath sticky stage */}
        <div className="-mt-[100vh]">
          {/* Band 1: Green Speed Comparison Header Stage */}
          <section
            ref={greenBandRef}
            id="speed-comparison"
            className="relative z-10 h-[165vh] bg-[#034f46] text-[#ffffeb] rounded-[4.5rem]"
          >
            <div className="sticky top-14 pt-6 pb-4">
              <Container>
                <div className="max-w-3xl mx-auto text-center">
                  <h2
                    className="font-display text-5xl xl:text-[4.5rem] leading-[0.94] tracking-tight mb-3"
                    style={{ textWrap: 'balance' }}
                  >
                    4x faster <em className="italic font-normal">than typing</em>
                  </h2>
                  <p className="text-base xl:text-lg text-[#ffffeb]/85 max-w-xl mx-auto leading-snug">
                    Voice that finally works is here. Flow lets you create, code, message, and write at the speed of thought, 4x faster than your keyboard.
                  </p>
                </div>
              </Container>
            </div>
          </section>

          {/* Band 2: Cream How It Works 3-Column Stage */}
          <section
            id="how-it-works"
            className="relative z-0 h-[310vh] -mt-12 pt-16 bg-[#ffffeb] text-[#1a1a1a]"
          >
            {/* Non-sticky Top Intro Heading */}
            <Container className="pt-10 pb-8">
              <div className="max-w-4xl mx-auto text-center">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#1a1a1a]/60 mb-2">
                  How it works
                </p>
                <h2 className="font-display text-[2.65rem] xl:text-[3.25rem] leading-[1.02] tracking-tight text-[#1a1a1a]">
                  Speak at the speed you think,
                  <br className="hidden lg:block" />{' '}
                  <em className="italic font-normal">in every app, on every device.</em>
                </h2>
              </div>
            </Container>

            {/* Full-Viewport Sticky 3-Column Stage */}
            <div ref={howColumnsRef} className="sticky top-0 h-screen flex items-center">
              <Container>
                <div className="grid grid-cols-12 gap-8 items-center max-w-6xl mx-auto">
                  {/* Left Column: Slim Coral-Orange Vertical Bar + Step Selector */}
                  <div className="col-span-3 relative z-30 pointer-events-auto">
                    <div className="relative flex items-stretch gap-3.5">
                      <div className="relative w-[2.5px] rounded-full bg-[#1a1a1a]/12 shrink-0 overflow-hidden">
                        <div
                          className="w-full h-1/3 rounded-full bg-[#ff6c4c] transition-transform duration-300 ease-out"
                          style={{ transform: `translateY(${activeStepIndex * 100}%)` }}
                        />
                      </div>

                      <div className="space-y-3 flex-1">
                        {HOW_IT_WORKS_STEPS.map((step) => {
                          const isActive = step.id === activeStep;
                          return (
                            <button
                              key={step.id}
                              type="button"
                              onClick={() => jumpToStep(step.id)}
                              className={`block w-full text-left py-1 text-[0.95rem] leading-snug transition-colors cursor-pointer ${
                                isActive
                                  ? 'font-bold text-[#1a1a1a]'
                                  : 'font-medium text-[#1a1a1a]/38 hover:text-[#1a1a1a]/75'
                              }`}
                            >
                              {step.title === 'Flow edits as you speak'
                                ? 'Edits as you speak'
                                : step.title}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  {/* Center Column Spacer occupied by z-20 floating ~380px portrait demo card */}
                  <div className="col-span-5" aria-hidden="true" />

                  {/* Right Column: Active Step Serif Heading & Muted Grey Description */}
                  <div className="col-span-4 relative z-30">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={activeData.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                        className="space-y-2.5"
                      >
                        <h3 className="font-display text-[2.25rem] leading-tight text-[#1a1a1a]">
                          {activeData.title}
                        </h3>
                        <p className="text-[0.95rem] leading-relaxed text-[#1a1a1a]/68">
                          {activeData.description}
                        </p>
                      </motion.div>
                    </AnimatePresence>
                  </div>
                </div>
              </Container>
            </div>
          </section>
        </div>
      </div>

      {/* Tablet & Mobile Fallback (< lg): Responsive Stacked SpeedComparison + HowItWorks */}
      <div className="lg:hidden">
        <SpeedComparison />
        <HowItWorks />
      </div>
    </>
  );
};
