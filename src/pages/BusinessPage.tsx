import React, { useState } from 'react';
import { BarChart3, Check, Lock, ShieldCheck, Users } from 'lucide-react';
import { Container } from '../components/Container';
import { Button } from '../components/Button';
import { AppLink } from '../context/RouterContext';
import { TrustedBy } from '../sections/TrustedBy/TrustedBy';

interface BusinessPageProps {
  onOpenDownload: () => void;
  focusSalesForm?: boolean;
}

export const BusinessPage: React.FC<BusinessPageProps> = ({
  onOpenDownload,
  focusSalesForm = false,
}) => {
  const [company, setCompany] = useState('');
  const [email, setEmail] = useState('');
  const [teamSize, setTeamSize] = useState('25-100');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.includes('@') || !company.trim()) {
      setError('Please enter your company name and a valid work email.');
      return;
    }
    setError('');
    setSubmitted(true);
  };

  return (
    <div className="bg-[#ffffeb] text-[#1a1a1a]">
      <section className="pt-12 sm:pt-16 pb-16 sm:pb-24">
        <Container>
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-xs sm:text-sm font-semibold uppercase tracking-[0.12em] text-[#034f46] mb-4">
              Flow for Business
            </p>
            <h1
              className="font-display text-5xl sm:text-6xl lg:text-[5.5rem] leading-[0.92] tracking-[-0.03em] mb-6"
              style={{ textWrap: 'balance' }}
            >
              {focusSalesForm ? (
                <>
                  Bring Voice OS <em className="italic font-normal">to your team.</em>
                </>
              ) : (
                <>
                  The fastest teams don’t type.{' '}
                  <em className="italic font-normal">They speak.</em>
                </>
              )}
            </h1>
            <p className="text-lg sm:text-xl text-[#1a1a1a]/80 max-w-2xl mx-auto leading-relaxed mb-8">
              Dictation that cleans up every word you say. Meeting notes that capture every word and speaker. No integration needed. Up and running in minutes.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <Button size="lg" onClick={onOpenDownload}>
                Start free team trial
              </Button>
              <a href="#sales-form">
                <Button variant="secondary" size="lg">
                  Talk to sales
                </Button>
              </a>
            </div>
          </div>
        </Container>
      </section>

      <TrustedBy />

      {/* Team Capabilities & Admin Usage Dashboard */}
      <section className="bg-[#034f46] text-[#ffffeb] rounded-[2.5rem] sm:rounded-[4.5rem] py-20 sm:py-28 relative z-20">
        <Container>
          <div className="grid lg:grid-cols-12 gap-10 items-center max-w-6xl mx-auto">
            <div className="lg:col-span-5 space-y-5">
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#cef5ca]">
                Admin usage dashboard
              </p>
              <h2 className="font-display text-4xl sm:text-5xl leading-[0.95]">
                Everything your team writes, <em className="italic font-normal">faster.</em>
              </h2>
              <p className="text-base text-[#ffffeb]/80 leading-relaxed">
                Track weekly time saved, manage seats under centralized billing, and publish shared company dictionaries &amp; snippets across every employee automatically.
              </p>
              <ul className="space-y-2.5 text-sm">
                {[
                  'Enforced SAML SSO & SCIM provisioning',
                  'Locked zero-model-training & custom data retention',
                  'Shared team dictionary for product names & clients',
                  'Full SOC 2 Type II, HIPAA & ISO 27001 compliance',
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-[#cef5ca] shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="lg:col-span-7 rounded-[2rem] bg-[#ffffeb] text-[#1a1a1a] p-6 sm:p-8 shadow-2xl">
              <div className="flex items-center justify-between pb-4 mb-6 border-b border-[#1a1a1a]/10">
                <div className="flex items-center gap-2.5">
                  <BarChart3 className="w-5 h-5 text-[#034f46]" />
                  <span className="font-bold text-base">Workspace Productivity Overview</span>
                </div>
                <span className="font-code text-xs text-[#034f46] font-semibold">
                  Last 30 days
                </span>
              </div>

              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="rounded-2xl bg-[#e4e4d0]/70 p-4">
                  <div className="font-display text-3xl sm:text-4xl leading-none tabular-nums mb-1">
                    4.2x
                  </div>
                  <div className="text-xs font-medium text-[#1a1a1a]/70">
                    Average speed vs typing
                  </div>
                </div>
                <div className="rounded-2xl bg-[#f0d7ff]/70 p-4">
                  <div className="font-display text-3xl sm:text-4xl leading-none tabular-nums mb-1">
                    6.4h
                  </div>
                  <div className="text-xs font-medium text-[#1a1a1a]/70">
                    Saved per user / week
                  </div>
                </div>
                <div className="rounded-2xl bg-[#cef5ca] p-4">
                  <div className="font-display text-3xl sm:text-4xl leading-none tabular-nums mb-1">
                    100%
                  </div>
                  <div className="text-xs font-medium text-[#1a1a1a]/70">
                    Zero training lock
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-[#1a1a1a]/12 p-4 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <Users className="w-5 h-5 text-[#034f46]" />
                  <div>
                    <div className="text-sm font-bold">Clay GTM &amp; Sales Rollout</div>
                    <div className="text-xs text-[#1a1a1a]/65">
                      20% more customer calls/day · $3.08M estimated annual savings
                    </div>
                  </div>
                </div>
                <AppLink
                  to="/case-study/clay"
                  className="text-xs font-bold underline underline-offset-4 hover:text-[#034f46] whitespace-nowrap"
                >
                  Read case study
                </AppLink>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Enterprise Security & Talk to Sales Form */}
      <section id="sales-form" className="py-20 sm:py-28">
        <Container>
          <div className="max-w-5xl mx-auto grid lg:grid-cols-12 gap-10 items-start">
            <div className="lg:col-span-6 space-y-5">
              <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.12em] text-[#034f46]">
                <Lock className="w-4 h-4" />
                <span>Enterprise Deployment</span>
              </div>
              <h2 className="font-display text-4xl sm:text-5xl leading-[0.95]">
                Talk to our enterprise team.
              </h2>
              <p className="text-base text-[#1a1a1a]/75 leading-relaxed">
                Get custom volume pricing, a dedicated solutions architect, HIPAA BAA execution, and SAML SSO setup for your organization.
              </p>
              <div className="flex flex-wrap gap-3 pt-2">
                {['SOC 2 Type II', 'HIPAA Ready', 'ISO 27001'].map((cert) => (
                  <span
                    key={cert}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#e4e4d0] text-xs font-bold"
                  >
                    <ShieldCheck className="w-4 h-4 text-[#034f46]" />
                    <span>{cert}</span>
                  </span>
                ))}
              </div>
            </div>

            <div className="lg:col-span-6 rounded-[2rem] bg-[#e4e4d0] p-6 sm:p-8 border border-[#1a1a1a]/10">
              {submitted ? (
                <div className="rounded-2xl bg-[#cef5ca] p-6 text-[#034f46] space-y-2">
                  <div className="font-display text-3xl">Request received</div>
                  <p className="text-sm font-medium">
                    Thanks! Our enterprise team will reach out to <strong>{email}</strong> shortly to schedule your walkthrough for {company}.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold mb-1.5">Company name</label>
                    <input
                      type="text"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      placeholder="Acme Corp"
                      className="w-full px-4 py-3 rounded-xl bg-[#ffffeb] border border-[#1a1a1a]/20 text-sm focus:outline-none focus:border-[#034f46]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold mb-1.5">Work email</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="alex@company.com"
                      className="w-full px-4 py-3 rounded-xl bg-[#ffffeb] border border-[#1a1a1a]/20 text-sm focus:outline-none focus:border-[#034f46]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold mb-1.5">Team size</label>
                    <select
                      value={teamSize}
                      onChange={(e) => setTeamSize(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-[#ffffeb] border border-[#1a1a1a]/20 text-sm focus:outline-none focus:border-[#034f46]"
                    >
                      <option value="5-25">5 – 25 seats</option>
                      <option value="25-100">25 – 100 seats</option>
                      <option value="100-500">100 – 500 seats</option>
                      <option value="500+">500+ seats</option>
                    </select>
                  </div>
                  {error && <p className="text-xs font-semibold text-[#7f1c34]">{error}</p>}
                  <Button type="submit" size="lg" className="w-full">
                    Request enterprise demo
                  </Button>
                </form>
              )}
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
};
