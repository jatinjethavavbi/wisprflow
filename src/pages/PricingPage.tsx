import React, { useState } from 'react';
import { Check } from 'lucide-react';
import { Container } from '../components/Container';
import { Button } from '../components/Button';
import { AppLink } from '../context/RouterContext';
import { FAQ } from '../sections/FAQ/FAQ';

interface PricingPageProps {
  onOpenDownload: () => void;
}

export const PricingPage: React.FC<PricingPageProps> = ({ onOpenDownload }) => {
  const [billing, setBilling] = useState<'annual' | 'monthly'>('annual');
  const [hoursTypingPerWeek, setHoursTypingPerWeek] = useState(15);

  const proPrice = billing === 'annual' ? '$12' : '$15';
  const hoursSavedPerWeek = (hoursTypingPerWeek * 0.72).toFixed(1);
  const hoursSavedPerYear = Math.round(Number(hoursSavedPerWeek) * 50);

  return (
    <div className="bg-[#ffffeb] text-[#1a1a1a]">
      <section className="pt-12 sm:pt-16 pb-16 sm:pb-24">
        <Container>
          <div className="max-w-3xl mx-auto text-center mb-10">
            <h1 className="font-display text-5xl sm:text-6xl lg:text-[5.5rem] leading-[0.92] tracking-[-0.03em] mb-4">
              Pricing
            </h1>
            <p className="text-lg sm:text-xl text-[#1a1a1a]/80 leading-relaxed mb-8">
              Free on Mac, Windows, iPhone and Android. Plans add team management, admin controls and support.
            </p>

            {/* Billing Cycle Switcher */}
            <div className="inline-flex items-center bg-[#e4e4d0] rounded-full p-1">
              <button
                type="button"
                onClick={() => setBilling('monthly')}
                className={`px-5 py-2 rounded-full text-sm font-semibold transition-all cursor-pointer ${
                  billing === 'monthly'
                    ? 'bg-[#ffffeb] text-[#1a1a1a] shadow-xs'
                    : 'text-[#1a1a1a]/70'
                }`}
              >
                Monthly
              </button>
              <button
                type="button"
                onClick={() => setBilling('annual')}
                className={`px-5 py-2 rounded-full text-sm font-semibold transition-all cursor-pointer inline-flex items-center gap-2 ${
                  billing === 'annual'
                    ? 'bg-[#ffffeb] text-[#1a1a1a] shadow-xs'
                    : 'text-[#1a1a1a]/70'
                }`}
              >
                <span>Annual</span>
                <span className="text-xs font-bold text-[#034f46]">20% discount</span>
              </button>
            </div>
          </div>

          {/* 3 Pricing Tiers */}
          <div className="grid lg:grid-cols-3 gap-6 max-w-6xl mx-auto items-stretch">
            {/* Free */}
            <div className="rounded-[2rem] bg-[#e4e4d0]/75 border border-[#1a1a1a]/12 p-7 sm:p-8 flex flex-col justify-between">
              <div>
                <div className="text-xs font-semibold uppercase tracking-[0.1em] text-[#1a1a1a]/60 mb-2">
                  For everyone
                </div>
                <h2 className="font-display text-4xl mb-3">Free</h2>
                <div className="flex items-baseline gap-1 mb-6">
                  <span className="font-display text-5xl tabular-nums">$0</span>
                  <span className="text-sm text-[#1a1a1a]/65">/mo</span>
                </div>
                <Button variant="secondary" className="w-full mb-6" onClick={onOpenDownload}>
                  Get started
                </Button>
                <div className="text-xs font-bold uppercase tracking-wider text-[#1a1a1a]/60 mb-3">
                  Includes:
                </div>
                <ul className="space-y-2.5 text-sm text-[#1a1a1a]/85">
                  {[
                    '2,000 words per week on desktop',
                    'Speech-to-text in any app, 100+ languages',
                    'Dictation on Mac, Windows, iOS, and Android',
                    'Learns your names and jargon',
                    'Dictionary and snippets',
                    'Limited Notetaker access',
                    'Use your meeting notes in Claude and ChatGPT',
                  ].map((feat) => (
                    <li key={feat} className="flex items-start gap-2.5">
                      <Check className="w-4 h-4 text-[#034f46] mt-0.5 shrink-0" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Pro */}
            <div className="rounded-[2rem] bg-[#034f46] text-[#ffffeb] border-2 border-[#1a1a1a] p-7 sm:p-8 flex flex-col justify-between shadow-xl">
              <div>
                <div className="text-xs font-semibold uppercase tracking-[0.1em] text-[#cef5ca] mb-2">
                  For individuals and teams
                </div>
                <h2 className="font-display text-4xl mb-3">Pro</h2>
                <div className="flex items-baseline gap-1 mb-6">
                  <span className="font-display text-5xl tabular-nums">{proPrice}</span>
                  <span className="text-sm text-[#ffffeb]/75">/user/mo</span>
                </div>
                <Button className="w-full mb-6" onClick={onOpenDownload}>
                  Get started
                </Button>
                <div className="text-xs font-bold uppercase tracking-wider text-[#ffffeb]/70 mb-3">
                  Get everything in Free, plus:
                </div>
                <ul className="space-y-2.5 text-sm text-[#ffffeb]/90">
                  {[
                    'Unlimited dictations',
                    'Unlimited Notetaker history',
                    'Shared dictionary and snippets',
                    'Shared team workspace',
                    'Centralized billing and user management',
                    'Team usage analytics',
                    'Priority support',
                    'Early access to new features',
                  ].map((feat) => (
                    <li key={feat} className="flex items-start gap-2.5">
                      <Check className="w-4 h-4 text-[#cef5ca] mt-0.5 shrink-0" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Enterprise */}
            <div className="rounded-[2rem] bg-[#f0d7ff]/65 border border-[#1a1a1a]/15 p-7 sm:p-8 flex flex-col justify-between">
              <div>
                <div className="text-xs font-semibold uppercase tracking-[0.1em] text-[#1a1a1a]/65 mb-2">
                  For large organizations
                </div>
                <h2 className="font-display text-4xl mb-3">Enterprise</h2>
                <div className="flex items-baseline gap-1 mb-6">
                  <span className="font-display text-5xl">Custom</span>
                </div>
                <AppLink to="/talk-to-sales" className="block mb-6">
                  <Button variant="dark" className="w-full">
                    Talk to sales
                  </Button>
                </AppLink>
                <div className="text-xs font-bold uppercase tracking-wider text-[#1a1a1a]/60 mb-3">
                  Everything in Pro, plus:
                </div>
                <ul className="space-y-2.5 text-sm text-[#1a1a1a]/85">
                  {[
                    'Enforced SAML SSO & SCIM',
                    'Locked zero-data-training controls',
                    'Admin-controlled data retention policies',
                    'HIPAA BAA, SOC 2 Type II & ISO 27001',
                    'Full audit logs',
                    'Bulk volume pricing & dedicated CSM',
                  ].map((feat) => (
                    <li key={feat} className="flex items-start gap-2.5">
                      <Check className="w-4 h-4 text-[#034f46] mt-0.5 shrink-0" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Interactive Time Saved Calculator */}
          <div className="mt-16 max-w-4xl mx-auto rounded-[2rem] bg-[#e4e4d0] p-7 sm:p-10 border border-[#1a1a1a]/10">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="font-display text-3xl sm:text-4xl leading-tight mb-3">
                  See how much time <em className="italic font-normal">you get back.</em>
                </h2>
                <p className="text-sm text-[#1a1a1a]/75 mb-5">
                  Adjust how many hours per week you currently spend writing emails, Slack messages, docs, and AI prompts:
                </p>
                <label className="block text-xs font-bold mb-2">
                  Hours spent typing per week:{' '}
                  <span className="font-code text-[#034f46]">{hoursTypingPerWeek} hrs</span>
                </label>
                <input
                  type="range"
                  min={2}
                  max={40}
                  value={hoursTypingPerWeek}
                  onChange={(e) => setHoursTypingPerWeek(Number(e.target.value))}
                  className="w-full accent-[#034f46] cursor-pointer"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-2xl bg-[#ffffeb] p-5 border border-[#1a1a1a]/10">
                  <div className="font-display text-4xl text-[#034f46] tabular-nums mb-1">
                    {hoursSavedPerWeek}h
                  </div>
                  <div className="text-xs font-medium text-[#1a1a1a]/70">
                    Saved every week
                  </div>
                </div>
                <div className="rounded-2xl bg-[#ffffeb] p-5 border border-[#1a1a1a]/10">
                  <div className="font-display text-4xl text-[#034f46] tabular-nums mb-1">
                    {hoursSavedPerYear}h
                  </div>
                  <div className="text-xs font-medium text-[#1a1a1a]/70">
                    Saved every year
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <FAQ />
    </div>
  );
};
