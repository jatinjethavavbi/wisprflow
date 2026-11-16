import React, { useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ChevronDown } from 'lucide-react';
import { Container } from '../../components/Container';
import { AppLink } from '../../context/RouterContext';
import { FAQ_ITEMS } from '../../data/faqs';
import { useScrollReveal, useTextReveal } from '../../hooks/useGsapAnimations';

const getScrollMask = (canUp: boolean, canDown: boolean): string => {
  if (canUp && canDown) {
    return 'linear-gradient(to bottom, transparent 0%, black 16%, black 82%, transparent 100%)';
  }
  if (canUp) {
    return 'linear-gradient(to bottom, transparent 0%, black 18%, black 100%)';
  }
  if (canDown) {
    return 'linear-gradient(to bottom, black 0%, black 80%, transparent 100%)';
  }
  return 'none';
};

export const FAQ: React.FC = () => {
  const headerRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const questionsScrollRef = useRef<HTMLDivElement>(null);
  const answerScrollRef = useRef<HTMLDivElement>(null);

  const [selectedId, setSelectedId] = useState<string>(FAQ_ITEMS[1]?.id || FAQ_ITEMS[0].id);
  const [mobileOpenId, setMobileOpenId] = useState<string | null>(null);
  const [qFade, setQFade] = useState<{ up: boolean; down: boolean }>({ up: false, down: true });
  const [aFade, setAFade] = useState<{ up: boolean; down: boolean }>({ up: false, down: true });

  useTextReveal(headerRef, { stagger: 0.08, start: 'top 86%' });
  useScrollReveal(panelRef, { y: 28, duration: 0.75, start: 'top 86%' });

  const activeFaq = FAQ_ITEMS.find((item) => item.id === selectedId) || FAQ_ITEMS[0];

  const syncFadeState = useCallback(
    (
      el: HTMLDivElement | null,
      setter: React.Dispatch<React.SetStateAction<{ up: boolean; down: boolean }>>,
    ) => {
      if (!el) return;
      const up = el.scrollTop > 8;
      const down = el.scrollTop + el.clientHeight < el.scrollHeight - 8;
      setter((prev) => (prev.up === up && prev.down === down ? prev : { up, down }));
    },
    [],
  );

  useEffect(() => {
    const qEl = questionsScrollRef.current;
    const aEl = answerScrollRef.current;
    if (aEl) {
      aEl.scrollTop = 0;
    }
    const raf = window.requestAnimationFrame(() => {
      syncFadeState(qEl, setQFade);
      syncFadeState(aEl, setAFade);
    });
    const timer = window.setTimeout(() => {
      syncFadeState(aEl, setAFade);
    }, 240);
    return () => {
      window.cancelAnimationFrame(raf);
      window.clearTimeout(timer);
    };
  }, [selectedId, syncFadeState]);

  const qMask = getScrollMask(qFade.up, qFade.down);
  const aMask = getScrollMask(aFade.up, aFade.down);

  return (
    <section id="faq" className="py-20 sm:py-28 bg-[#ffffeb] text-[#1a1a1a]">
      <Container>
        <div ref={headerRef} className="text-center mb-12 sm:mb-16">
          <div
            data-reveal-line
            className="text-xs font-medium uppercase tracking-[0.14em] text-[#1a1a1a]/65 mb-4"
          >
            FAQS
          </div>
          <h2
            data-reveal-line
            className="font-display text-4xl sm:text-6xl leading-[0.95] tracking-tight"
            style={{ textWrap: 'balance' }}
          >
            Good <em className="italic font-normal">questions.</em>
          </h2>
        </div>

        {/* Desktop Two-Column Split Panel */}
        <div
          ref={panelRef}
          className="hidden md:grid md:grid-cols-12 gap-3 max-w-[54rem] mx-auto rounded-[1.5rem] bg-[#e2e2d2] p-3.5 sm:p-4"
        >
          {/* Left Emerald Questions List */}
          <div className="md:col-span-6 rounded-[1.1rem] bg-[#03473e] text-[#ffffeb] pt-7 px-4 pb-3 flex flex-col h-[31rem]">
            <div className="px-3.5 pb-4 text-xl font-display font-normal tracking-tight text-[#ffffeb]">
              Questions
            </div>
            <div
              ref={questionsScrollRef}
              onScroll={() => syncFadeState(questionsScrollRef.current, setQFade)}
              className="flex-1 overflow-y-auto wispr-scroll-dark pr-3 space-y-1.5 pb-6"
              style={{
                maskImage: qMask,
                WebkitMaskImage: qMask,
              }}
            >
              {FAQ_ITEMS.map((item) => {
                const isSelected = item.id === selectedId;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setSelectedId(item.id)}
                    className={`w-full text-left px-3.5 py-3 rounded-xl text-[13.5px] font-medium leading-snug transition-colors cursor-pointer ${
                      isSelected
                        ? 'bg-[#ffffeb]/[0.13] text-[#ffffeb]'
                        : 'text-[#ffffeb]/90 hover:bg-[#ffffeb]/[0.08]'
                    }`}
                  >
                    {item.question}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Answer Thread Panel */}
          <div className="md:col-span-6 pt-7 px-3 sm:px-5 pb-3 flex flex-col h-[31rem]">
            <div className="text-xl font-display font-normal tracking-tight text-[#1a1a1a] mb-3">
              Answer
            </div>
            <div
              ref={answerScrollRef}
              onScroll={() => syncFadeState(answerScrollRef.current, setAFade)}
              className="flex-1 overflow-y-auto wispr-scroll-light pr-3 pb-4"
              style={{
                maskImage: aMask,
                WebkitMaskImage: aMask,
              }}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeFaq.id}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.18 }}
                >
                  <p className="text-right text-[13.5px] text-[#1a1a1a]/65 leading-snug max-w-[16rem] ml-auto mb-5">
                    {activeFaq.question}
                  </p>

                  <div className="rounded-2xl bg-[#f5f5ec] p-5 sm:p-6 text-[13.5px] leading-[1.6] text-[#1a1a1a]/88">
                    <div className="space-y-3">
                      {activeFaq.paragraphs.map((p, idx) => (
                        <p key={idx}>{p}</p>
                      ))}
                    </div>
                    {activeFaq.bullets && (
                      <ul className="list-disc pl-5 mt-3.5 space-y-3">
                        {activeFaq.bullets.map((b, idx) => (
                          <li key={idx}>
                            <strong className="font-semibold text-[#1a1a1a]">{b.lead}</strong>{' '}
                            <span>{b.text}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                    {activeFaq.footerLink && (
                      <p className="mt-4 text-[#1a1a1a]/85">
                        {activeFaq.footerLink.prefix}
                        <AppLink
                          to={activeFaq.footerLink.to}
                          className="underline underline-offset-2 font-medium text-[#1a1a1a] hover:text-[#03473e] transition-colors"
                        >
                          {activeFaq.footerLink.linkText}
                        </AppLink>
                        {activeFaq.footerLink.suffix}
                      </p>
                    )}
                  </div>

                  {/* Flow circular waveform badge anchoring the answer bubble */}
                  <div className="mt-3 pl-0.5">
                    <span
                      className="inline-flex w-7 h-7 rounded-full bg-[#03473e] text-[#ffffeb] items-center justify-center"
                      aria-hidden="true"
                    >
                      <svg viewBox="0 0 20 20" className="w-3.5 h-3.5" fill="currentColor">
                        <rect x="2.5" y="7" width="1.7" height="6" rx="0.85" />
                        <rect x="6" y="4.5" width="1.7" height="11" rx="0.85" />
                        <rect x="9.5" y="3" width="1.7" height="14" rx="0.85" />
                        <rect x="13" y="6" width="1.7" height="8" rx="0.85" />
                        <rect x="16.5" y="8" width="1.7" height="4" rx="0.85" />
                      </svg>
                    </span>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Mobile Emerald Container */}
        <div className="md:hidden rounded-[1.5rem] bg-[#03473e] text-[#ffffeb] p-5 max-w-xl mx-auto">
          <div className="font-display text-2xl text-[#ffffeb] mb-3 pb-2 border-b border-[#ffffeb]/15">
            Questions
          </div>
          <div className="divide-y divide-[#ffffeb]/15">
            {FAQ_ITEMS.map((item) => {
              const isOpen = mobileOpenId === item.id;
              return (
                <div key={item.id}>
                  <button
                    type="button"
                    onClick={() => setMobileOpenId(isOpen ? null : item.id)}
                    aria-expanded={isOpen}
                    className="w-full text-left py-4 flex items-center justify-between gap-4 font-semibold text-sm text-[#ffffeb] cursor-pointer"
                  >
                    <span>{item.question}</span>
                    <ChevronDown
                      className={`w-4 h-4 shrink-0 transition-transform duration-200 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <div className="pb-4 text-sm leading-relaxed text-[#ffffeb]/85 space-y-2.5">
                          {item.paragraphs.map((p, idx) => (
                            <p key={idx}>{p}</p>
                          ))}
                          {item.bullets && (
                            <ul className="space-y-2 pt-1">
                              {item.bullets.map((b, idx) => (
                                <li key={idx}>
                                  <strong className="text-[#ffffeb]">{b.lead}</strong> {b.text}
                                </li>
                              ))}
                            </ul>
                          )}
                          {item.footerLink && (
                            <p className="pt-1">
                              {item.footerLink.prefix}
                              <AppLink
                                to={item.footerLink.to}
                                className="underline underline-offset-2 text-[#ffffeb] font-medium"
                              >
                                {item.footerLink.linkText}
                              </AppLink>
                              {item.footerLink.suffix}
                            </p>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
};
