import React, { useState } from 'react';
import { Check, Laptop, Lock, Mic, ShieldCheck, Smartphone } from 'lucide-react';
import { Container } from '../components/Container';
import { Button } from '../components/Button';
import { PLATFORM_OPTIONS, PlatformOption } from '../data/navigation';
import { AppLink } from '../context/RouterContext';

export const PrivacyTrustPage: React.FC<{ section?: 'trust' | 'privacy-policy' | 'terms' | 'data-controls' | 'bug-bounty' | 'support' }> = ({
  section = 'trust',
}) => {
  const [improveModel, setImproveModel] = useState(false);
  const [cloudHistory, setCloudHistory] = useState(true);

  return (
    <div className="bg-[#ffffeb] text-[#1a1a1a] py-12 sm:py-20">
      <Container>
        <div className="max-w-4xl mx-auto">
          <p className="text-xs sm:text-sm font-semibold uppercase tracking-[0.12em] text-[#034f46] mb-3">
            {section === 'terms'
              ? 'Legal · Terms of Service'
              : section === 'privacy-policy'
              ? 'Legal · Privacy Policy'
              : section === 'bug-bounty'
              ? 'Security · Bug Bounty'
              : section === 'support'
              ? 'Help & Support'
              : 'Trust Center & Privacy'}
          </p>

          <h1 className="font-display text-5xl sm:text-6xl leading-[0.94] mb-6">
            {section === 'terms' ? (
              'Terms of Service'
            ) : section === 'privacy-policy' ? (
              'Privacy Policy'
            ) : section === 'bug-bounty' ? (
              'Security & Bug Bounty'
            ) : section === 'support' ? (
              'How can we help?'
            ) : (
              <>
                Privacy first. <em className="italic font-normal">Security always.</em>
              </>
            )}
          </h1>

          <p className="text-lg text-[#1a1a1a]/80 leading-relaxed mb-10">
            You choose what Wispr Flow keeps, what it learns from, and when it listens. On Teams and Enterprise plans, model training is off by default and locked.
          </p>

          {/* Interactive Data Controls Card */}
          <div className="rounded-[2rem] bg-[#e4e4d0] p-6 sm:p-8 border border-[#1a1a1a]/12 mb-10 space-y-5">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#034f46]">
              <Lock className="w-4 h-4" />
              <span>Your Data Controls</span>
            </div>

            <div className="rounded-2xl bg-[#ffffeb] p-5 flex items-center justify-between gap-4">
              <div>
                <div className="font-bold text-base">Improve the model for everyone</div>
                <p className="text-xs sm:text-sm text-[#1a1a1a]/70 mt-0.5">
                  Turn off and nothing you say is ever used to train Wispr Flow models.
                </p>
              </div>
              <button
                type="button"
                role="switch"
                aria-checked={improveModel}
                onClick={() => setImproveModel((v) => !v)}
                className={`w-12 h-7 rounded-full transition-colors p-1 cursor-pointer shrink-0 ${
                  improveModel ? 'bg-[#034f46]' : 'bg-[#1a1a1a]/25'
                }`}
              >
                <span
                  className={`block w-5 h-5 rounded-full bg-[#ffffeb] transition-transform ${
                    improveModel ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            <div className="rounded-2xl bg-[#ffffeb] p-5 flex items-center justify-between gap-4">
              <div>
                <div className="font-bold text-base">Dictation cloud storage</div>
                <p className="text-xs sm:text-sm text-[#1a1a1a]/70 mt-0.5">
                  Turn off to keep transcripts and audio stored locally on your device only.
                </p>
              </div>
              <button
                type="button"
                role="switch"
                aria-checked={cloudHistory}
                onClick={() => setCloudHistory((v) => !v)}
                className={`w-12 h-7 rounded-full transition-colors p-1 cursor-pointer shrink-0 ${
                  cloudHistory ? 'bg-[#034f46]' : 'bg-[#1a1a1a]/25'
                }`}
              >
                <span
                  className={`block w-5 h-5 rounded-full bg-[#ffffeb] transition-transform ${
                    cloudHistory ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
          </div>

          <div className="grid sm:grid-cols-3 gap-4 mb-10">
            {[
              { title: 'SOC 2 Type II', desc: 'Continuous audited security & availability controls.' },
              { title: 'HIPAA Compliant', desc: 'BAA coverage and strict healthcare safeguards.' },
              { title: 'ISO 27001', desc: 'International information security management.' },
            ].map((item) => (
              <div key={item.title} className="rounded-2xl bg-[#034f46] text-[#ffffeb] p-6">
                <ShieldCheck className="w-6 h-6 text-[#cef5ca] mb-3" />
                <div className="font-bold text-lg mb-1">{item.title}</div>
                <p className="text-xs text-[#ffffeb]/80 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-3">
            <AppLink to="/business">
              <Button>Enterprise privacy</Button>
            </AppLink>
            <AppLink to="/get-started">
              <Button variant="secondary">Get started free</Button>
            </AppLink>
          </div>
        </div>
      </Container>
    </div>
  );
};

export const GetStartedPage: React.FC = () => {
  const [selectedPlatform, setSelectedPlatform] = useState<PlatformOption['id']>('windows');
  const [email, setEmail] = useState('');
  const [sentCode, setSentCode] = useState(false);

  const activePlatform =
    PLATFORM_OPTIONS.find((p) => p.id === selectedPlatform) || PLATFORM_OPTIONS[0];

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.includes('@')) return;
    setSentCode(true);
  };

  return (
    <div className="bg-[#ffffeb] text-[#1a1a1a] py-12 sm:py-20">
      <Container>
        <div className="max-w-5xl mx-auto grid lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-6 space-y-6">
            <h1 className="font-display text-5xl sm:text-6xl leading-[0.94]">
              Get started
            </h1>
            <p className="text-base sm:text-lg text-[#1a1a1a]/75 leading-relaxed">
              Just sign in with the email you’ll use in the app — we’ll take care of the rest. Includes 2,000 free words per week and Notetaker access.
            </p>

            <div className="space-y-2.5 max-w-sm">
              {['Continue with Google', 'Continue with Apple', 'Continue with Microsoft', 'Continue with SSO'].map(
                (provider) => (
                  <button
                    key={provider}
                    type="button"
                    onClick={() => setSentCode(true)}
                    className="w-full px-5 py-3.5 rounded-xl bg-[#ffffeb] border-2 border-[#1a1a1a] text-sm font-bold hover:bg-[#f0d7ff] transition-colors cursor-pointer text-center"
                  >
                    {provider}
                  </button>
                )
              )}
            </div>

            <form onSubmit={handleEmailSubmit} className="max-w-sm pt-2 space-y-3">
              <div className="text-xs font-semibold uppercase tracking-wider text-[#1a1a1a]/50">
                Or continue with email
              </div>
              <div className="flex gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@company.com"
                  className="flex-1 px-4 py-3 rounded-xl bg-[#ffffeb] border border-[#1a1a1a]/25 text-sm focus:outline-none focus:border-[#034f46]"
                />
                <Button type="submit">Continue</Button>
              </div>
              {sentCode && (
                <div className="rounded-xl bg-[#cef5ca] p-3 text-xs font-semibold text-[#034f46] flex items-center gap-2">
                  <Check className="w-4 h-4 shrink-0" />
                  <span>Verification preview ready — choose your installer on the right.</span>
                </div>
              )}
            </form>
          </div>

          <div className="lg:col-span-6 rounded-[2rem] bg-[#e4e4d0] p-6 sm:p-8 border border-[#1a1a1a]/12">
            <h2 className="font-display text-3xl mb-4">Download Wispr Flow</h2>
            <div className="grid grid-cols-2 gap-2.5 mb-5">
              {PLATFORM_OPTIONS.map((p) => {
                const isMobile = p.id === 'iphone' || p.id === 'android';
                return (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => setSelectedPlatform(p.id)}
                    className={`flex items-center gap-2.5 px-4 py-3 rounded-xl border-2 text-sm font-semibold cursor-pointer ${
                      p.id === selectedPlatform
                        ? 'bg-[#034f46] text-[#ffffeb] border-[#034f46]'
                        : 'bg-[#ffffeb] text-[#1a1a1a] border-transparent'
                    }`}
                  >
                    {isMobile ? <Smartphone className="w-4 h-4" /> : <Laptop className="w-4 h-4" />}
                    <span>{p.name}</span>
                  </button>
                );
              })}
            </div>

            <div className="rounded-2xl bg-[#ffffeb] p-5 mb-5">
              <div className="font-bold text-base mb-1">{activePlatform.name}</div>
              <div className="font-code text-xs text-[#1a1a1a]/60 mb-2">
                {activePlatform.version} · {activePlatform.fileSize}
              </div>
              <p className="text-sm text-[#1a1a1a]/75">{activePlatform.requirement}</p>
            </div>

            <Button size="lg" className="w-full" onClick={() => setSentCode(true)}>
              {activePlatform.actionLabel}
            </Button>
          </div>
        </div>
      </Container>
    </div>
  );
};

export const MicrophonesPage: React.FC<{ onOpenDownload: () => void }> = ({ onOpenDownload }) => (
  <div className="bg-[#ffffeb] text-[#1a1a1a] py-12 sm:py-20">
    <Container>
      <div className="max-w-4xl mx-auto">
        <p className="text-xs sm:text-sm font-semibold uppercase tracking-[0.12em] text-[#034f46] mb-3">
          Microphone Guide
        </p>
        <h1 className="font-display text-5xl sm:text-6xl leading-[0.94] mb-6">
          Your voice is all you need.{' '}
          <em className="italic font-normal">The right mic just makes it sharper.</em>
        </h1>
        <p className="text-lg text-[#1a1a1a]/80 leading-relaxed mb-10">
          Flow works with the built-in mic you already have. Most audio issues are configuration, not hardware: wired beats WiFi beats Bluetooth, and closer to your mouth is always better.
        </p>

        <div className="grid md:grid-cols-3 gap-5 mb-12">
          {[
            {
              title: 'Built-in Laptop Mic',
              tag: 'Best default',
              desc: 'MacBook and Windows studio mics deliver uncompressed audio with zero latency cutoff.',
            },
            {
              title: 'Wired Earbuds / USB Mic',
              tag: 'Best for whispering',
              desc: 'Ideal for open offices and noisy cafes — keeps pickup close to your voice.',
            },
            {
              title: 'Avoid Bluetooth Earbuds',
              tag: 'Heads up',
              desc: 'AirPods and Bluetooth headsets switch to low-bitrate HFP mode and can clip the first word.',
            },
          ].map((card) => (
            <div key={card.title} className="rounded-3xl bg-[#e4e4d0] p-6 border border-[#1a1a1a]/10">
              <div className="flex items-center justify-between mb-3">
                <Mic className="w-5 h-5 text-[#034f46]" />
                <span className="text-xs font-bold text-[#034f46]">{card.tag}</span>
              </div>
              <h2 className="font-display text-2xl mb-2">{card.title}</h2>
              <p className="text-sm text-[#1a1a1a]/75 leading-relaxed">{card.desc}</p>
            </div>
          ))}
        </div>

        <Button size="lg" onClick={onOpenDownload}>
          Download Flow &amp; test your mic
        </Button>
      </div>
    </Container>
  </div>
);
