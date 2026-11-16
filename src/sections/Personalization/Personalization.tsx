import React, { useEffect, useId, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Plus } from 'lucide-react';
import { Container } from '../../components/Container';
import { SmoothTextPathMarquee } from '../../components/SmoothTextPathMarquee';
import { INITIAL_VOCAB_WORDS, TONE_PRESETS } from '../../data/features';
import { SUPPORTED_LANGUAGES } from '../../data/languages';
import { gsap, ScrollTrigger, useScrollReveal, useTextReveal } from '../../hooks/useGsapAnimations';

const FlagCircle: React.FC<{ code: string }> = ({ code }) => {
  const clipId = useId();

  switch (code) {
    case 'DE':
      return (
        <svg viewBox="0 0 24 24" className="w-7 h-7 rounded-full shrink-0" aria-hidden="true">
          <clipPath id={clipId}><circle cx="12" cy="12" r="12" /></clipPath>
          <g clipPath={`url(#${clipId})`}>
            <rect width="24" height="8" y="0" fill="#1a1a1a" />
            <rect width="24" height="8" y="8" fill="#DD0000" />
            <rect width="24" height="8" y="16" fill="#FFCE00" />
          </g>
        </svg>
      );
    case 'ES':
      return (
        <svg viewBox="0 0 24 24" className="w-7 h-7 rounded-full shrink-0" aria-hidden="true">
          <clipPath id={clipId}><circle cx="12" cy="12" r="12" /></clipPath>
          <g clipPath={`url(#${clipId})`}>
            <rect width="24" height="6" y="0" fill="#AA151B" />
            <rect width="24" height="12" y="6" fill="#F1BF00" />
            <rect width="24" height="6" y="18" fill="#AA151B" />
          </g>
        </svg>
      );
    case 'FR':
      return (
        <svg viewBox="0 0 24 24" className="w-7 h-7 rounded-full shrink-0" aria-hidden="true">
          <clipPath id={clipId}><circle cx="12" cy="12" r="12" /></clipPath>
          <g clipPath={`url(#${clipId})`}>
            <rect width="8" height="24" x="0" fill="#002395" />
            <rect width="8" height="24" x="8" fill="#FFFFFF" />
            <rect width="8" height="24" x="16" fill="#ED2939" />
          </g>
        </svg>
      );
    case 'JP':
      return (
        <svg viewBox="0 0 24 24" className="w-7 h-7 rounded-full shrink-0 border border-[#1a1a1a]/10" aria-hidden="true">
          <rect width="24" height="24" fill="#FFFFFF" />
          <circle cx="12" cy="12" r="5.5" fill="#BC002D" />
        </svg>
      );
    case 'IN':
      return (
        <svg viewBox="0 0 24 24" className="w-7 h-7 rounded-full shrink-0" aria-hidden="true">
          <clipPath id={clipId}><circle cx="12" cy="12" r="12" /></clipPath>
          <g clipPath={`url(#${clipId})`}>
            <rect width="24" height="8" y="0" fill="#FF9933" />
            <rect width="24" height="8" y="8" fill="#FFFFFF" />
            <rect width="24" height="8" y="16" fill="#138808" />
            <circle cx="12" cy="12" r="2.7" fill="none" stroke="#000080" strokeWidth="1" />
            <circle cx="12" cy="12" r="0.65" fill="#000080" />
          </g>
        </svg>
      );
    default:
      return (
        <span className="w-7 h-7 rounded-full bg-[#034f46] text-[#ffffeb] font-code text-[0.65rem] font-bold flex items-center justify-center shrink-0">
          {code}
        </span>
      );
  }
};

const PERSONALIZATION_STEPS = [
  {
    id: 0,
    title: '100+ Languages',
    description:
      'Flow automatically detects and transcribes the language you’re speaking, so you can switch between languages naturally.',
  },
  {
    id: 1,
    title: 'Flow learns your vocabulary',
    description:
      'Flow learns your unique words and names automatically, or lets you add them yourself. From client names to company jargon, it gets the details right.',
  },
  {
    id: 2,
    title: 'Save your most used text',
    description:
      'Create snippets for the things you type all the time, like emails, links, addresses, and bios. Speak the shortcut, and Flow expands it instantly.',
  },
  {
    id: 3,
    title: 'Make Flow sound like you',
    description:
      'Flow adapts to how you write in different apps. Set a different style for messages, work chats, emails, and more.',
  },
];

export const Personalization: React.FC = () => {
  const headerRef = useRef<HTMLDivElement>(null);
  const underlineRef = useRef<SVGPathElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const mobileListRef = useRef<HTMLDivElement>(null);
  const [activeCardIndex, setActiveCardIndex] = useState(0);

  const [selectedLangCode, setSelectedLangCode] = useState('hi');
  const activeLanguage =
    SUPPORTED_LANGUAGES.find((l) => l.code === selectedLangCode) || SUPPORTED_LANGUAGES[6];

  const [vocabWords, setVocabWords] = useState<string[]>(INITIAL_VOCAB_WORDS.slice(0, 3));
  const [isAddingWord, setIsAddingWord] = useState(false);
  const [newWordInput, setNewWordInput] = useState('Wispr Flow');
  const [correctMisspelling, setCorrectMisspelling] = useState(true);
  const [shareWithTeam, setShareWithTeam] = useState(true);

  const [snippetExpanded, setSnippetExpanded] = useState(false);
  const [selectedTone, setSelectedTone] = useState<'formal' | 'casual' | 'very-casual'>('formal');
  const activeTone = TONE_PRESETS.find((t) => t.id === selectedTone) || TONE_PRESETS[0];

  useTextReveal(headerRef, { stagger: 0.09, start: 'top 86%' });
  useScrollReveal(mobileListRef, {
    selector: '[data-personalization-mobile-card]',
    y: 28,
    stagger: 0.1,
    duration: 0.7,
    start: 'top 86%',
  });

  // GSAP ScrollTrigger for #heading-underline draw (locks at 100% once completed) + desktop step sync
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const ctx = gsap.context(() => {
      const path = underlineRef.current;
      if (path) {
        const len = path.getTotalLength();
        gsap.set(path, { strokeDasharray: len, strokeDashoffset: len });
        let locked = false;
        ScrollTrigger.create({
          trigger: path,
          start: 'top 88%',
          end: 'top 35%',
          onUpdate: (self) => {
            if (locked) return;
            gsap.set(path, { strokeDashoffset: len * (1 - self.progress) });
            if (self.progress >= 0.99) {
              locked = true;
              gsap.set(path, { strokeDashoffset: 0 });
            }
          },
        });
      }

      if (trackRef.current) {
        const mm = gsap.matchMedia();
        mm.add('(min-width: 768px)', () => {
          const blocks = trackRef.current?.querySelectorAll('[data-lang-step]');
          blocks?.forEach((block, idx) => {
            ScrollTrigger.create({
              trigger: block,
              start: 'top 56%',
              end: 'bottom 44%',
              onEnter: () => setActiveCardIndex(idx),
              onEnterBack: () => setActiveCardIndex(idx),
            });
          });
        });
      }
    });

    return () => ctx.revert();
  }, []);

  const handleAddWord = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = newWordInput.trim();
    if (!trimmed) return;
    if (!vocabWords.includes(trimmed)) {
      setVocabWords((prev) => [...prev, trimmed]);
    }
    setNewWordInput('');
    setIsAddingWord(false);
  };

  const renderCardVisual = (index: number, scope: 'desktop' | 'mobile') => {
    if (index === 0) {
      return (
        <div className="relative w-full h-full flex flex-col items-center justify-between pt-8 sm:pt-9 pb-4 px-0 overflow-hidden bg-[#dfdfcc]">
          <div className="relative z-10 w-[264px] sm:w-[276px] inline-flex items-center justify-between bg-[#ffffeb] rounded-full px-6 py-3.5">
            <div className="inline-flex items-center gap-2 min-w-0">
              <span className="text-sm font-medium text-[#1a1a1a]/75 shrink-0">Language:</span>
              <select
                aria-label="Select language preview"
                value={selectedLangCode}
                onChange={(e) => setSelectedLangCode(e.target.value)}
                className="appearance-none bg-transparent text-sm sm:text-[15px] font-medium text-[#1a1a1a] focus:outline-none cursor-pointer pr-1"
              >
                {SUPPORTED_LANGUAGES.map((lang) => (
                  <option key={lang.code} value={lang.code}>
                    {lang.nativeName}
                  </option>
                ))}
              </select>
            </div>
            <FlagCircle code={activeLanguage.flagCode} />
          </div>

          <div
            className="w-full overflow-hidden"
            style={{
              maskImage:
                'linear-gradient(to right, transparent 0%, black 7%, black 93%, transparent 100%)',
              WebkitMaskImage:
                'linear-gradient(to right, transparent 0%, black 7%, black 93%, transparent 100%)',
            }}
          >
            <SmoothTextPathMarquee
              pathId={`personalization-lang-arc-${scope}`}
              text={activeLanguage.sampleGreeting}
              speed={46}
              variant="arch"
              viewBoxWidth={440}
              viewBoxHeight={76}
              edgeY={64}
              peakY={18}
              fontSize={14}
              fontWeight={500}
              fill="#1a1a1a"
              letterSpacing="-0.005em"
              initialPhase={0.14}
              className="w-full aspect-[440/76] overflow-visible"
            />
          </div>
        </div>
      );
    }

    if (index === 1) {
      return (
        <div className="w-full h-full flex flex-col items-center justify-center p-6">
          {!isAddingWord ? (
            <div className="flex flex-col items-center gap-2.5 max-w-xs">
              <div className="flex flex-wrap items-center justify-center gap-2">
                {vocabWords.map((word) => (
                  <span
                    key={word}
                    className="px-3.5 py-1.5 rounded-lg bg-[#ffffeb] text-xs sm:text-sm font-semibold text-[#1a1a1a] shadow-xs"
                  >
                    {word}
                  </span>
                ))}
              </div>
              <button
                type="button"
                onClick={() => setIsAddingWord(true)}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#1a1a1a] text-[#ffffeb] text-xs sm:text-sm font-bold hover:bg-[#034f46] transition-colors cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add a new word</span>
              </button>
            </div>
          ) : (
            <form
              onSubmit={handleAddWord}
              className="w-full max-w-xs rounded-2xl bg-[#ffffeb] p-3.5 text-left space-y-2"
            >
              <div className="text-xs font-bold text-[#1a1a1a]">Add to vocabulary</div>
              <input
                type="text"
                value={newWordInput}
                onChange={(e) => setNewWordInput(e.target.value)}
                placeholder="Word or name..."
                aria-label="New vocabulary word"
                className="w-full px-3 py-1.5 rounded-lg border border-[#1a1a1a]/25 bg-[#ffffeb] text-xs font-medium focus:outline-none focus:border-[#034f46]"
              />
              <div className="flex items-center justify-between text-[0.7rem]">
                <label className="inline-flex items-center gap-1.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={correctMisspelling}
                    onChange={(e) => setCorrectMisspelling(e.target.checked)}
                    className="accent-[#034f46]"
                  />
                  <span>Correct a misspelling</span>
                </label>
                <label className="inline-flex items-center gap-1.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={shareWithTeam}
                    onChange={(e) => setShareWithTeam(e.target.checked)}
                    className="accent-[#034f46]"
                  />
                  <span>Share with team</span>
                </label>
              </div>
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddingWord(false)}
                  className="px-3 py-1 rounded-md border border-[#1a1a1a]/20 text-xs font-bold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-3 py-1 rounded-md bg-[#1a1a1a] text-[#ffffeb] text-xs font-bold cursor-pointer"
                >
                  Add word
                </button>
              </div>
            </form>
          )}
        </div>
      );
    }

    if (index === 2) {
      return (
        <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center">
          <div className="text-sm sm:text-base font-medium text-[#1a1a1a]/75 flex flex-wrap items-center justify-center gap-2 leading-relaxed">
            <span>If you go to</span>
            <button
              type="button"
              onClick={() => setSnippetExpanded((s) => !s)}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-all cursor-pointer ${
                snippetExpanded
                  ? 'bg-[#ffffeb] text-[#1a1a1a] font-code text-xs shadow-xs break-all'
                  : 'bg-[#ffffeb] text-[#1a1a1a] shadow-xs hover:bg-[#f0d7ff]'
              }`}
            >
              {snippetExpanded
                ? 'https://www.linkedin.com/in/john-doe-9b0139134/'
                : '“my Linkedin”'}
            </button>
            <span>you’ll see what</span>
          </div>
          <span className="mt-4 text-[0.7rem] text-[#1a1a1a]/55 font-medium">
            Tap “my Linkedin” to expand snippet
          </span>
        </div>
      );
    }

    return (
      <div className="w-full h-full flex flex-col items-center justify-center p-6">
        <div className="w-full max-w-sm space-y-3">
          <div className="flex items-center justify-center gap-1.5">
            {TONE_PRESETS.map((tone) => {
              const active = tone.id === selectedTone;
              return (
                <button
                  key={tone.id}
                  type="button"
                  onClick={() => setSelectedTone(tone.id)}
                  className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                    active
                      ? 'bg-[#1a1a1a] text-[#ffffeb] shadow-xs'
                      : 'bg-[#ffffeb] text-[#1a1a1a] hover:bg-[#ffffeb]/80'
                  }`}
                >
                  {tone.label}
                </button>
              );
            })}
          </div>
          <div className="rounded-xl bg-[#ffffeb] p-4 shadow-xs text-center">
            <p className="text-xs sm:text-sm font-semibold text-[#1a1a1a] leading-relaxed">
              {activeTone.sample}
            </p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <section id="personalization" className="py-20 sm:py-28 bg-[#ffffeb] text-[#1a1a1a]">
      <Container>
        <div ref={headerRef} className="max-w-4xl mx-auto text-center mb-16 sm:mb-28">
          <p
            data-reveal-line
            className="text-xs font-medium uppercase tracking-[0.14em] text-[#1a1a1a]/65 mb-5"
          >
            WISPR MAKES IT EASY
          </p>
          <h2
            data-reveal-line
            className="font-display text-4xl sm:text-6xl lg:text-[4.25rem] leading-[1.04] tracking-tight"
          >
            Built around{' '}
            <span className="relative inline-block">
              <em className="italic font-normal">how you work,</em>
              <svg
                viewBox="0 0 240 16"
                fill="none"
                className="absolute -bottom-1 left-0 w-full h-3.5 text-[#ebd0ff]"
                aria-hidden="true"
              >
                <path
                  ref={underlineRef}
                  id="heading-underline"
                  d="M3 12C72 6 168 3 237 9"
                  stroke="currentColor"
                  strokeWidth="4.5"
                  strokeLinecap="round"
                />
              </svg>
            </span>
            <br className="hidden sm:block" /> not how we think you should.
          </h2>
        </div>

        {/* Desktop 2-Column Sticky Showcase */}
        <div
          ref={trackRef}
          className="hidden md:grid grid-cols-12 gap-12 lg:gap-16 max-w-[64rem] mx-auto items-start"
        >
          {/* Left Sticky Interactive Card */}
          <div className="col-span-6 sticky top-36 flex justify-center md:justify-start">
            <div className="w-full max-w-[440px] h-[16.25rem] rounded-2xl bg-[#dfdfcc] overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeCardIndex}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                  className="w-full h-full"
                >
                  {renderCardVisual(activeCardIndex, 'desktop')}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Right Scrolling Feature Descriptions */}
          <div className="col-span-6 space-y-44 py-2">
            {PERSONALIZATION_STEPS.map((step, idx) => {
              const isActive = idx === activeCardIndex;
              return (
                <div
                  key={step.id}
                  data-lang-step
                  onMouseEnter={() => setActiveCardIndex(idx)}
                  onClick={() => setActiveCardIndex(idx)}
                  className={`min-h-[16.25rem] flex flex-col justify-center transition-opacity duration-300 cursor-pointer ${
                    isActive ? 'opacity-100' : 'opacity-30 hover:opacity-75'
                  }`}
                >
                  <h3 className="font-display text-3xl lg:text-[2.5rem] leading-[1.12] tracking-tight mb-4">
                    {step.title}
                  </h3>
                  <p className="text-[15px] text-[#1a1a1a]/80 leading-relaxed max-w-[440px]">
                    {step.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Mobile Stacked Cards */}
        <div ref={mobileListRef} className="md:hidden grid gap-12 max-w-md mx-auto">
          {PERSONALIZATION_STEPS.map((step, idx) => (
            <div
              key={step.id}
              data-personalization-mobile-card
              className="flex flex-col items-center text-center"
            >
              <div className="w-full h-[15.5rem] rounded-2xl bg-[#dfdfcc] overflow-hidden mb-5">
                {renderCardVisual(idx, 'mobile')}
              </div>
              <h3 className="font-display text-3xl leading-tight mb-2">{step.title}</h3>
              <p className="text-sm text-[#1a1a1a]/75 leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};
