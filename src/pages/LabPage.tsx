import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Container } from '../components/Container';
import { Button } from '../components/Button';
import { AppLink } from '../context/RouterContext';

const LAB_PILLARS = [
  {
    num: '01',
    title: 'Contextual speech models',
    desc: 'We build foundational speech models that can use long context and memory to understand you.',
  },
  {
    num: '02',
    title: 'Voice In, UI Out',
    desc: 'Voice is our richest input. UI and vision are our richest output. Don’t default to voice out.',
  },
  {
    num: '03',
    title: 'Interface to Intelligence',
    desc: 'We believe interfaces should route you to the best intelligence for your problem.',
  },
  {
    num: '04',
    title: 'Proactive and reactive',
    desc: 'Great interfaces disappear and help people proactively.',
  },
];

export const LabPage: React.FC = () => {
  return (
    <div className="bg-[#ffffeb] text-[#1a1a1a]">
      <section className="pt-12 sm:pt-16 pb-16 sm:pb-24">
        <Container>
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-xs sm:text-sm font-semibold uppercase tracking-[0.12em] text-[#034f46] mb-4">
              Wispr Advanced Interfaces Lab
            </p>
            <h1
              className="font-display text-5xl sm:text-6xl lg:text-[5.25rem] leading-[0.94] tracking-[-0.03em] mb-6"
              style={{ textWrap: 'balance' }}
            >
              Building toward the human, <em className="italic font-normal">not away from it.</em>
            </h1>
            <p className="text-lg sm:text-xl text-[#1a1a1a]/80 max-w-2xl mx-auto leading-relaxed mb-8">
              We build the interface between people and intelligence — researching voice, multimodal systems, and adaptive interfaces that keep people in flow as AI becomes part of everyday thinking.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <AppLink to="/careers">
                <Button size="lg">See open roles</Button>
              </AppLink>
              <AppLink to="/demo">
                <Button variant="secondary" size="lg">
                  Try interactive demo
                </Button>
              </AppLink>
            </div>
          </div>
        </Container>
      </section>

      {/* Our Focus */}
      <section className="py-16 sm:py-24 bg-[#1a1a1a] text-[#ffffeb] rounded-[2.5rem] sm:rounded-[4.5rem]">
        <Container>
          <div className="max-w-5xl mx-auto">
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#ffffeb]/60 mb-4">
              Our Focus
            </p>
            <h2 className="font-display text-4xl sm:text-5xl mb-12">
              Four research bets guiding the Voice OS.
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              {LAB_PILLARS.map((p) => (
                <div
                  key={p.num}
                  className="rounded-3xl bg-[#ffffeb]/5 border border-[#ffffeb]/15 p-7 sm:p-8"
                >
                  <div className="font-code text-sm font-bold text-[#f0d7ff] mb-3">
                    {p.num}
                  </div>
                  <h3 className="font-display text-3xl mb-3">{p.title}</h3>
                  <p className="text-sm sm:text-base text-[#ffffeb]/75 leading-relaxed">
                    {p.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Featured Lab Essay */}
      <section className="py-20 sm:py-28">
        <Container>
          <div className="max-w-5xl mx-auto rounded-[2rem] bg-[#e4e4d0] p-7 sm:p-12 grid lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <div className="text-xs font-semibold text-[#034f46]">
                From the Lab · Jul 24, 2026 · Product
              </div>
              <h2 className="font-display text-3xl sm:text-5xl leading-tight">
                Introducing Wispr Advanced Interfaces Lab
              </h2>
              <p className="text-base text-[#1a1a1a]/80 leading-relaxed">
                Wispr CSO Ariya Rastrow introduces the new Wispr Advanced Interfaces Lab — solving the AI interface problem by moving beyond voice-to-voice systems toward intent-driven, context-aware outcomes.
              </p>
              <p className="text-sm font-semibold text-[#1a1a1a]">
                Ariya Rastrow · Chief Science Officer, Wispr Flow
              </p>
            </div>
            <div className="lg:col-span-4 flex lg:justify-end">
              <AppLink to="/blog">
                <Button variant="dark" size="lg">
                  <span>Read full article</span>
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </AppLink>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
};
