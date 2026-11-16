import React, { useEffect, useState } from 'react';
import { Check, Mic, RotateCcw, Sparkles } from 'lucide-react';
import { Container } from '../components/Container';
import { Button } from '../components/Button';
import { FlowWaveformPill } from '../components/BrandMarks';
import { AppLink } from '../context/RouterContext';
import { FinalCTA } from '../sections/FinalCTA/FinalCTA';

interface DemoPageProps {
  onOpenDownload: () => void;
}

const DEMO_TASKS = [
  {
    id: 'prompt',
    tab: 'Write the perfect prompt',
    title: 'Try writing a detailed AI prompt.',
    subtitle: 'Flow makes it easy to give detailed prompts to ChatGPT, Cursor, or other AI tools.',
    raw: 'Uh plan like a week-long itinerary for a trip to Italy that prioritizes historical sightseeing and um local food tours. I prefer to see attractions in the mornings, take naps in the afternoons, and then have nice dinners followed by nightlife in the evenings.',
    clean:
      'Plan a week-long itinerary for a trip to Italy that prioritizes historical sightseeing and local food tours. I prefer to see attractions in the mornings, take naps in the afternoons, and then have nice dinners followed by nightlife in the evenings.',
  },
  {
    id: 'friend',
    tab: 'Message a friend',
    title: 'Try messaging a friend.',
    subtitle: 'Flow makes texting your friends easy, and even edits filler words and corrections for you.',
    raw: 'Hey Michelle, um meet me at my apartment lobby at 6pm, actually no, 7pm.',
    clean: 'Hey Michelle, meet me at my apartment lobby at 7pm.',
  },
  {
    id: 'list',
    tab: 'Write a list',
    title: 'Try making a grocery list.',
    subtitle: 'Speak items naturally and Flow automatically formats clean bullet lists.',
    raw: 'Pick up um sourdough bread, olive oil, cherry tomatoes, oh and oat milk, actually two cartons of oat milk.',
    clean: '• Sourdough bread\n• Olive oil\n• Cherry tomatoes\n• 2 cartons of oat milk',
  },
  {
    id: 'email',
    tab: 'Draft an email',
    title: 'Try drafting an email.',
    subtitle: 'Speak thoughts once and get a structured, ready-to-send email.',
    raw: 'Hi team, uh quick recap from today’s sync. We’re shipping the beta on Wednesday, not Tuesday, and Marcus is leading QA.',
    clean:
      'Hi team,\n\nQuick recap from today’s sync: we’re shipping the beta on Wednesday instead of Tuesday, and Marcus is leading QA.',
  },
];

export const DemoPage: React.FC<DemoPageProps> = ({ onOpenDownload }) => {
  const [taskIdx, setTaskIdx] = useState(0);
  const [dictating, setDictating] = useState(false);
  const [outputText, setOutputText] = useState('');

  const task = DEMO_TASKS[taskIdx];

  useEffect(() => {
    setOutputText('');
    setDictating(false);
  }, [taskIdx]);

  useEffect(() => {
    if (!dictating) return;
    let i = 0;
    const timer = setInterval(() => {
      i += 5;
      setOutputText(task.clean.slice(0, i));
      if (i >= task.clean.length) {
        clearInterval(timer);
        setDictating(false);
      }
    }, 35);
    return () => clearInterval(timer);
  }, [dictating, task.clean]);

  // Support holding Control key just like wisprflow.ai/demo
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Control' && !dictating) {
        setDictating(true);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [dictating]);

  return (
    <div className="bg-[#ffffeb] text-[#1a1a1a]">
      <section className="pt-12 sm:pt-16 pb-20 sm:pb-28">
        <Container>
          <div className="max-w-3xl mx-auto text-center mb-10">
            <p className="text-xs sm:text-sm font-semibold uppercase tracking-[0.12em] text-[#034f46] mb-3">
              Interactive Web Demo
            </p>
            <h1 className="font-display text-5xl sm:text-6xl lg:text-[5rem] leading-[0.92] mb-5">
              Experience the <em className="italic font-normal">magic of Flow.</em>
            </h1>
            <p className="text-lg text-[#1a1a1a]/80 mb-7">
              Hold <kbd className="px-2 py-0.5 rounded border border-[#1a1a1a]/30 bg-[#e4e4d0] font-code text-xs">control</kbd> or press Start dictating to preview simulated voice cleanup in your browser.
            </p>
            <Button size="lg" onClick={onOpenDownload}>
              Download for free
            </Button>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="flex flex-wrap justify-center gap-2 mb-6">
              {DEMO_TASKS.map((item, idx) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setTaskIdx(idx)}
                  className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-colors cursor-pointer ${
                    idx === taskIdx
                      ? 'bg-[#1a1a1a] text-[#ffffeb]'
                      : 'bg-[#e4e4d0] text-[#1a1a1a] hover:bg-[#e4e4d0]/75'
                  }`}
                >
                  {item.tab}
                </button>
              ))}
            </div>

            <div className="rounded-[2rem] bg-[#e4e4d0] p-6 sm:p-10 border border-[#1a1a1a]/12 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="font-display text-3xl mb-1">{task.title}</h2>
                  <p className="text-sm text-[#1a1a1a]/70">{task.subtitle}</p>
                </div>
                <FlowWaveformPill
                  active={dictating}
                  label={dictating ? 'Listening...' : 'Ready'}
                />
              </div>

              <div className="rounded-2xl bg-[#1a1a1a]/5 border border-[#1a1a1a]/10 p-4 text-xs sm:text-sm text-[#1a1a1a]/65">
                <span className="font-bold text-[#1a1a1a]">Say aloud: </span>“{task.raw}”
              </div>

              <div className="rounded-2xl bg-[#ffffeb] border-2 border-[#1a1a1a]/15 p-5 min-h-[9rem] flex flex-col justify-between">
                <p className="text-base font-medium whitespace-pre-line leading-relaxed">
                  {outputText || (
                    <span className="text-[#1a1a1a]/40">
                      Click “Start dictating” below to simulate Flow transcription...
                    </span>
                  )}
                </p>
                {outputText === task.clean && (
                  <div className="pt-3 mt-3 border-t border-[#1a1a1a]/10 flex items-center gap-1.5 text-xs font-semibold text-[#034f46]">
                    <Check className="w-4 h-4" />
                    <span>Cleaned &amp; formatted automatically (simulated demo)</span>
                  </div>
                )}
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <Button onClick={() => setDictating(true)}>
                  <Mic className="w-4 h-4" />
                  <span>{dictating ? 'Dictating...' : 'Start dictating'}</span>
                </Button>
                <Button
                  variant="secondary"
                  onClick={() => {
                    setDictating(false);
                    setOutputText('');
                  }}
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Reset</span>
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </section>
      <FinalCTA onOpenDownload={onOpenDownload} />
    </div>
  );
};

interface WhyFlowPageProps {
  competitor?: 'builtin' | 'apple' | 'gboard';
  onOpenDownload: () => void;
}

export const WhyFlowPage: React.FC<WhyFlowPageProps> = ({
  competitor = 'builtin',
  onOpenDownload,
}) => {
  const titleMap = {
    builtin: 'built-in voice mode',
    apple: 'Apple Dictation',
    gboard: 'Gboard voice typing',
  };

  return (
    <div className="bg-[#ffffeb] text-[#1a1a1a]">
      <section className="pt-12 sm:pt-16 pb-20 sm:pb-24">
        <Container>
          <div className="max-w-4xl mx-auto text-center mb-14">
            <p className="text-xs sm:text-sm font-semibold uppercase tracking-[0.12em] text-[#034f46] mb-4">
              Wispr Flow vs. {titleMap[competitor]}
            </p>
            <h1 className="font-display text-5xl sm:text-6xl lg:text-[5.25rem] leading-[0.94] mb-6">
              You’ve tried dictation.{' '}
              <em className="italic font-normal">This is different.</em>
            </h1>
            <p className="text-lg sm:text-xl text-[#1a1a1a]/80 max-w-2xl mx-auto mb-8">
              Wispr Flow turns your voice into polished, ready-to-send text. Works in every app, on every device — with 90% zero-edit accuracy.
            </p>
            <div className="flex flex-wrap justify-center gap-3 mb-8">
              <Button size="lg" onClick={onOpenDownload}>
                Try for free
              </Button>
              <AppLink to="/demo">
                <Button variant="secondary" size="lg">
                  Try it in your browser
                </Button>
              </AppLink>
            </div>
            <blockquote className="font-display text-2xl sm:text-3xl italic text-[#1a1a1a]/80 max-w-2xl mx-auto">
              “Wispr Flow replaces built-in voice transcription with a model that’s scary good”
              <footer className="font-body not-italic text-xs font-bold uppercase tracking-wider text-[#1a1a1a]/55 mt-2">
                Wall Street Journal
              </footer>
            </blockquote>
          </div>

          {/* Side-by-Side Comparison Cards */}
          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            <div className="rounded-[2rem] bg-[#e4e4d0] p-7 sm:p-8 border border-[#1a1a1a]/12">
              <div className="text-xs font-bold uppercase tracking-wider text-[#7f1c34] mb-3">
                {titleMap[competitor]}
              </div>
              <h2 className="font-display text-3xl mb-4">Raw, unedited transcript</h2>
              <div className="rounded-2xl bg-[#ffffeb] p-5 text-sm leading-relaxed text-[#1a1a1a]/75 mb-5">
                “Hey <span className="underline decoration-[#ff6c4c]">bishop</span>, There are{' '}
                <span className="underline decoration-[#ffa946]">two ummm no wait. Actually three,</span>{' '}
                things <span className="underline decoration-[#ff6c4c]">whisper</span> does really well. It’s insanely fast. It’s insanely accurate and it fixes your mistakes.”
              </div>
              <p className="text-xs text-[#1a1a1a]/65">
                Forces you to manually delete filler words, fix misspelled names, and add line breaks.
              </p>
            </div>

            <div className="rounded-[2rem] bg-[#034f46] text-[#ffffeb] p-7 sm:p-8 shadow-xl">
              <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#cef5ca] mb-3">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Wispr Flow</span>
              </div>
              <h2 className="font-display text-3xl mb-4">Zero edits — ready to send</h2>
              <div className="rounded-2xl bg-[#ffffeb] text-[#1a1a1a] p-5 text-sm leading-relaxed font-medium mb-5">
                Hey Biswaroop, there are three things Wispr does really well:
                <br />
                1. It’s insanely fast
                <br />
                2. It’s insanely accurate
                <br />
                3. It fixes your mistakes
              </div>
              <p className="text-xs text-[#ffffeb]/75">
                Speak naturally. Send without fixing. Same accuracy across Mac, Windows, iPhone, and Android.
              </p>
            </div>
          </div>
        </Container>
      </section>
      <FinalCTA onOpenDownload={onOpenDownload} />
    </div>
  );
};
