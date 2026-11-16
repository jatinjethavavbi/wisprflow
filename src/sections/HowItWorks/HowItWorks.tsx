import React, { useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowUp, AtSign, Check, ChevronDown, Loader2, Plus, Smile, X } from 'lucide-react';
import { Container } from '../../components/Container';
import { AppDestinationIcon } from '../../components/BrandMarks';
import { HOW_IT_WORKS_STEPS } from '../../data/features';
import { useScrollReveal, useTextReveal } from '../../hooks/useGsapAnimations';

type StepId = 'speak' | 'edits' | 'anywhere';
type DestApp = 'slack' | 'claude' | 'gmail' | 'docs';

const APP_ORDER: DestApp[] = ['slack', 'claude', 'gmail', 'docs'];
const HUD_BARS = [42, 76, 98, 56, 88, 50, 94, 68, 44, 72];

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

const APP_CARDS: Record<DestApp, { label: string; body: string }> = {
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

export const HowItWorks: React.FC = () => {
  const headerRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const [activeStep, setActiveStep] = useState<StepId>('speak');
  const [selectedApp, setSelectedApp] = useState<DestApp>('slack');
  const [typedChars, setTypedChars] = useState<number>(11);
  const [editsCleaned, setEditsCleaned] = useState<boolean>(false);

  useTextReveal(headerRef, { stagger: 0.09, start: 'top 86%' });
  useScrollReveal(stageRef, {
    selector: '[data-how-mobile-block]',
    y: 22,
    stagger: 0.1,
    duration: 0.72,
    start: 'top 86%',
  });

  // Card 1 Live Typewriter Loop
  useEffect(() => {
    if (activeStep !== 'speak') return;
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
  }, [activeStep]);

  // Card 2 Messy -> Clean into Composer
  useEffect(() => {
    if (activeStep !== 'edits') {
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
      t1 = window.setTimeout(() => setEditsCleaned(true), 1500);
      t2 = window.setTimeout(runCycle, 5200);
    };

    runCycle();
    return () => {
      if (t1) window.clearTimeout(t1);
      if (t2) window.clearTimeout(t2);
    };
  }, [activeStep]);

  // Card 3 Continuous Auto-Swipe Carousel
  useEffect(() => {
    if (activeStep !== 'anywhere') return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const timer = window.setInterval(() => {
      setSelectedApp((prev) => {
        const idx = APP_ORDER.indexOf(prev);
        return APP_ORDER[(idx + 1) % APP_ORDER.length];
      });
    }, 2300);

    return () => window.clearInterval(timer);
  }, [activeStep]);

  const activeData =
    HOW_IT_WORKS_STEPS.find((s) => s.id === activeStep) || HOW_IT_WORKS_STEPS[0];
  const activeIndex = Math.max(
    0,
    HOW_IT_WORKS_STEPS.findIndex((s) => s.id === activeStep)
  );

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

  const speakBadge =
    activeSpeakTag === 'correction'
      ? { text: 'Self correction', style: 'bg-[#60a5fa] text-[#1a1a1a]', tilt: '-rotate-6' }
      : activeSpeakTag === 'repeat'
        ? { text: 'Repetition identified', style: 'bg-[#f472b6] text-[#1a1a1a]', tilt: '-rotate-6' }
        : activeSpeakTag === 'date'
          ? {
              text: 'Correction identified',
              style: 'bg-[#ffffeb] border-[1.5px] border-[#ff6c4c] text-[#ff6c4c]',
              tilt: '-rotate-6',
            }
          : { text: 'Filler identified', style: 'bg-[#ffa946] text-[#1a1a1a]', tilt: '-rotate-6' };

  return (
    <section
      id="how-it-works-mobile"
      className="bg-[#ffffeb] text-[#1a1a1a] pt-16 sm:pt-24 pb-16 sm:pb-24 overflow-hidden"
    >
      <Container>
        <div ref={headerRef} className="max-w-2xl mx-auto text-center mb-8 sm:mb-12">
          <p
            data-reveal-line
            className="text-xs font-semibold uppercase tracking-[0.14em] text-[#1a1a1a]/60 mb-2"
          >
            How it works
          </p>
          <h2
            data-reveal-line
            className="font-display text-4xl sm:text-5xl leading-[1.02] tracking-tight text-[#1a1a1a]"
            style={{ textWrap: 'balance' }}
          >
            Speak at the speed you think,
            <br className="hidden sm:block" />{' '}
            <em className="italic font-normal">in every app, on every device.</em>
          </h2>
        </div>

        {/* Tablet & Mobile Interactive Feature Switcher + Portrait Demo Card */}
        <div
          ref={stageRef}
          className="max-w-2xl mx-auto grid md:grid-cols-12 gap-6 sm:gap-8 items-center"
        >
          {/* Accessible Feature Navigation with slim orange indicator */}
          <div data-how-mobile-block className="md:col-span-5 space-y-5">
            <div className="relative flex items-stretch gap-3">
              <div className="relative w-[2.5px] rounded-full bg-[#1a1a1a]/12 shrink-0 overflow-hidden">
                <div
                  className="w-full h-1/3 rounded-full bg-[#ff6c4c] transition-transform duration-300 ease-out"
                  style={{ transform: `translateY(${activeIndex * 100}%)` }}
                />
              </div>

              <div className="space-y-2.5 flex-1">
                {HOW_IT_WORKS_STEPS.map((step) => {
                  const isActive = step.id === activeStep;
                  return (
                    <button
                      key={step.id}
                      type="button"
                      onClick={() => {
                        setActiveStep(step.id);
                        if (step.id === 'speak') setTypedChars(11);
                      }}
                      className={`block w-full text-left py-1 text-[0.95rem] leading-snug transition-colors cursor-pointer ${
                        isActive
                          ? 'font-bold text-[#1a1a1a]'
                          : 'font-medium text-[#1a1a1a]/40 hover:text-[#1a1a1a]/75'
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

            <AnimatePresence mode="wait">
              <motion.div
                key={activeData.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
                className="space-y-2"
              >
                <h3 className="font-display text-3xl leading-tight text-[#1a1a1a]">
                  {activeData.title}
                </h3>
                <p className="text-sm sm:text-base text-[#1a1a1a]/70 leading-relaxed">
                  {activeData.description}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Interactive Portrait Demo Card */}
          <div data-how-mobile-block className="md:col-span-7 flex justify-center">
            <div className="relative w-full max-w-[380px] aspect-[380/455] rounded-[1.5rem] overflow-hidden p-5 pb-16 flex flex-col justify-between shadow-2xl">
              {/* Distinct Backdrop Image per Step */}
              <img
                src="/src/assets/images/elena_verna_portrait_1794805451854.jpg"
                alt=""
                loading="lazy"
                referrerPolicy="no-referrer"
                className={`absolute inset-0 w-full h-full object-cover object-top scale-125 blur-[7px] brightness-[0.86] saturate-[1.2] transition-opacity duration-500 ${
                  activeStep === 'speak' ? 'opacity-100' : 'opacity-0'
                }`}
              />
              <img
                src="/src/assets/images/steven_bartlett_portrait_1794805450787.jpg"
                alt=""
                loading="lazy"
                referrerPolicy="no-referrer"
                className={`absolute inset-0 w-full h-full object-cover object-center scale-125 blur-[8px] brightness-[0.76] saturate-[1.25] transition-opacity duration-500 ${
                  activeStep === 'edits' ? 'opacity-100' : 'opacity-0'
                }`}
              />
              <img
                src="/src/assets/images/alex_lieberman_office_1794805451048.jpg"
                alt=""
                loading="lazy"
                referrerPolicy="no-referrer"
                className={`absolute inset-0 w-full h-full object-cover object-center scale-125 blur-[7px] brightness-[0.85] saturate-[1.2] transition-opacity duration-500 ${
                  activeStep === 'anywhere' ? 'opacity-100' : 'opacity-0'
                }`}
              />

              <div
                aria-hidden="true"
                className={`absolute inset-0 transition-colors duration-500 ${
                  activeStep === 'edits'
                    ? 'bg-gradient-to-b from-[#0d192b]/68 via-[#18120e]/52 to-[#0d0907]/85'
                    : activeStep === 'anywhere'
                      ? 'bg-gradient-to-b from-[#112432]/38 via-[#261b12]/28 to-[#120d09]/74'
                      : 'bg-gradient-to-b from-[#231912]/38 via-[#3d2515]/22 to-[#140d08]/72'
                }`}
              />

              {activeStep !== 'anywhere' ? (
                <>
                  {/* Top Speech Preview Layer */}
                  <div className="relative z-10 min-h-[7.5rem] flex items-center justify-center px-1">
                    <AnimatePresence mode="wait">
                      {activeStep === 'speak' && (
                        <motion.div
                          key="mob-top-speak"
                          initial={{ opacity: 0, y: 6 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -6 }}
                          transition={{ duration: 0.2 }}
                          className="text-center text-xs leading-[1.52] font-semibold text-[#ffffff]"
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
                          key="mob-top-edits"
                          initial={{ opacity: 0, y: 6 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.3 }}
                          className="text-[0.72rem] leading-[1.48] text-[#ffffeb] text-center font-medium"
                        >
                          Hey so <span className="text-[#ffa946] font-bold">um</span>{' '}
                          <span className="text-[#60a5fa] font-bold">can you actually wait</span>{' '}
                          can you tell the team that{' '}
                          <span className="text-[#f472b6] font-bold">the the</span> launch is gonna slip to{' '}
                          <span className="text-[#ffa946] font-bold">like</span>{' '}
                          <span className="text-[#ff6c4c] font-bold">not Friday the following Monday</span>...
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Message Composer Card */}
                  <div
                    className={`relative z-10 w-full rounded-2xl bg-[#ffffeb] text-[#1a1a1a] p-4 shadow-xl text-left transition-transform duration-500 ease-out ${
                      activeStep === 'edits' && editsCleaned ? '-translate-y-10' : 'translate-y-0'
                    }`}
                  >
                    <div className="min-h-[4.25rem] flex items-start">
                      <AnimatePresence mode="wait">
                        {activeStep === 'edits' && editsCleaned ? (
                          <motion.p
                            key="mob-edits-clean"
                            initial={{ opacity: 0, y: 4 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.28 }}
                            className="text-xs leading-relaxed font-medium text-[#1a1a1a]"
                          >
                            {APP_CARDS.slack.body}
                          </motion.p>
                        ) : (
                          <motion.span
                            key="mob-msg-placeholder"
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
                <div className="relative z-10 flex-1 flex flex-col justify-center">
                  <div className="flex justify-center mb-3 h-10 items-center">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={`mob-logo-${selectedApp}`}
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
                        <p className="text-xs leading-relaxed font-medium text-[#1a1a1a] whitespace-pre-line min-h-[6rem]">
                          {APP_CARDS[selectedApp].body}
                        </p>
                        <CardAppFooter app={selectedApp} />
                      </motion.div>
                    </AnimatePresence>
                  </div>

                  <div className="flex items-center justify-center gap-1.5 mt-3">
                    {APP_ORDER.map((app) => (
                      <button
                        key={app}
                        type="button"
                        onClick={() => setSelectedApp(app)}
                        aria-label={`Preview in ${APP_CARDS[app].label}`}
                        className={`h-1.5 rounded-full transition-all cursor-pointer ${
                          selectedApp === app ? 'w-5 bg-[#ffffeb]' : 'w-1.5 bg-[#ffffeb]/40'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Bottom Tilted Indicator Badge & Dark HUD Pill */}
              <div className="absolute inset-x-0 bottom-3.5 z-20 flex flex-col items-center gap-0.5 pointer-events-none">
                <div className="-mb-1 relative z-30">
                  <AnimatePresence mode="wait">
                    {activeStep === 'speak' && (
                      <motion.span
                        key={speakBadge.text}
                        initial={{ opacity: 0, y: 10, scale: 0.85 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -6, scale: 0.85 }}
                        transition={{ type: 'spring', stiffness: 420, damping: 24 }}
                        className={`inline-block px-3 py-0.5 rounded-full text-[0.68rem] font-bold shadow ${speakBadge.style} ${speakBadge.tilt}`}
                      >
                        {speakBadge.text}
                      </motion.span>
                    )}
                    {activeStep === 'edits' && !editsCleaned && (
                      <motion.span
                        key="mob-badge-edits"
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -4 }}
                        className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#1a1a1a] text-[#ffffeb] border border-[#ffffeb]/20 text-[0.68rem] font-semibold shadow"
                      >
                        <Loader2 className="w-2.5 h-2.5 animate-spin" />
                        <span>Cleaning up...</span>
                      </motion.span>
                    )}
                  </AnimatePresence>
                </div>

                {activeStep === 'anywhere' ? (
                  <div className="inline-flex items-center justify-center px-3.5 py-1.5 rounded-full bg-[#1a1a1a] border-[1.5px] border-[#ffffeb]/90 shadow-xl">
                    <div className="flex items-center gap-[2.5px] h-3.5" aria-hidden="true">
                      {HUD_BARS.map((h, i) => (
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
                      {HUD_BARS.slice(0, 9).map((h, i) => (
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
      </Container>
    </section>
  );
};
