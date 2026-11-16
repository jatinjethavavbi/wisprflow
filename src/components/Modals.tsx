import React, { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Check, Download, Laptop, ShieldCheck, Smartphone, X } from 'lucide-react';
import { PLATFORM_OPTIONS, PlatformOption } from '../data/navigation';
import { TestimonialCardItem } from '../data/testimonials';
import { Button } from './Button';

interface DownloadModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: 'dictation' | 'notetaker';
}

export const DownloadModal: React.FC<DownloadModalProps> = ({
  isOpen,
  onClose,
  initialMode = 'dictation',
}) => {
  const [selectedPlatform, setSelectedPlatform] = useState<PlatformOption['id']>('mac');
  const [downloadStarted, setDownloadStarted] = useState<string | null>(null);

  const activePlatform =
    PLATFORM_OPTIONS.find((p) => p.id === selectedPlatform) || PLATFORM_OPTIONS[0];

  const handleDownload = () => {
    setDownloadStarted(activePlatform.name);
    setTimeout(() => setDownloadStarted(null), 4000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="download-modal-title"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-[#1a1a1a]/65 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 12 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 w-full max-w-xl rounded-3xl bg-[#ffffeb] border-2 border-[#1a1a1a] p-6 sm:p-8 shadow-2xl text-[#1a1a1a]"
          >
            <div className="flex items-start justify-between gap-4 mb-6">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.08em] text-[#034f46] mb-1.5">
                  {initialMode === 'notetaker'
                    ? 'Wispr Flow + Notetaker'
                    : 'Wispr Flow Desktop & Mobile'}
                </p>
                <h3 id="download-modal-title" className="font-display text-3xl sm:text-4xl leading-none">
                  Start speaking, 4x faster.
                </h3>
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close download modal"
                className="w-10 h-10 rounded-full border border-[#1a1a1a]/20 flex items-center justify-center hover:bg-[#e4e4d0] transition-colors cursor-pointer shrink-0"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-5">
              {PLATFORM_OPTIONS.map((platform) => {
                const isSelected = platform.id === selectedPlatform;
                const isMobile = platform.id === 'iphone' || platform.id === 'android';
                return (
                  <button
                    key={platform.id}
                    type="button"
                    onClick={() => {
                      setSelectedPlatform(platform.id);
                      setDownloadStarted(null);
                    }}
                    className={`flex flex-col items-center justify-center gap-1.5 px-3 py-3 rounded-xl border-2 text-sm font-semibold transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-[#034f46] text-[#ffffeb] border-[#034f46]'
                        : 'bg-[#e4e4d0]/55 text-[#1a1a1a] border-transparent hover:border-[#1a1a1a]/30'
                    }`}
                  >
                    {isMobile ? <Smartphone className="w-4 h-4" /> : <Laptop className="w-4 h-4" />}
                    <span className="whitespace-nowrap">{platform.name}</span>
                  </button>
                );
              })}
            </div>

            <div className="rounded-2xl bg-[#e4e4d0]/70 p-5 mb-6 border border-[#1a1a1a]/10">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                <span className="font-semibold text-base">{activePlatform.name}</span>
                <span className="font-code text-xs text-[#1a1a1a]/70">
                  {activePlatform.version} · {activePlatform.fileSize}
                </span>
              </div>
              <p className="text-sm text-[#1a1a1a]/75 leading-relaxed mb-4">
                {activePlatform.requirement}
              </p>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 border-t border-[#1a1a1a]/10 text-xs text-[#1a1a1a]/70">
                <span>Includes 2,000 free words/week · No credit card required</span>
                <span>Both Dictation &amp; Notetaker included</span>
              </div>
            </div>

            {downloadStarted ? (
              <div className="flex items-center gap-3 rounded-xl bg-[#cef5ca] border border-[#034f46]/30 px-4 py-3.5 text-sm font-medium text-[#034f46]">
                <Check className="w-5 h-5 shrink-0" />
                <span>
                  Prepared simulated installer preview for <strong>{downloadStarted}</strong> (interactive demo environment).
                </span>
              </div>
            ) : (
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                <Button onClick={handleDownload} size="lg" className="w-full sm:w-auto">
                  <Download className="w-4 h-4" />
                  <span>{activePlatform.actionLabel}</span>
                </Button>
                <span className="text-xs text-[#1a1a1a]/60 text-center sm:text-right">
                  SOC 2 Type II · HIPAA · ISO 27001
                </span>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

interface CaseStudyModalProps {
  item: TestimonialCardItem | null;
  onClose: () => void;
}

export const CaseStudyModal: React.FC<CaseStudyModalProps> = ({ item, onClose }) => (
  <AnimatePresence>
    {item && (
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        role="dialog"
        aria-modal="true"
        aria-labelledby="case-study-title"
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-[#1a1a1a]/70 backdrop-blur-sm"
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 12 }}
          transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 w-full max-w-2xl rounded-3xl bg-[#ffffeb] border-2 border-[#1a1a1a] p-6 sm:p-8 shadow-2xl text-[#1a1a1a]"
        >
          <div className="flex items-start justify-between gap-4 mb-5">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.08em] text-[#034f46] mb-1">
                Customer Case Study
              </p>
              <h3 id="case-study-title" className="font-display text-3xl sm:text-4xl leading-tight">
                {item.authorName}
              </h3>
              {item.authorRole && (
                <p className="text-sm text-[#1a1a1a]/70 mt-0.5">{item.authorRole}</p>
              )}
            </div>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close case study"
              className="w-10 h-10 rounded-full border border-[#1a1a1a]/20 flex items-center justify-center hover:bg-[#e4e4d0] transition-colors cursor-pointer shrink-0"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <blockquote className="font-display text-2xl leading-snug text-[#1a1a1a] mb-6">
            {item.quote}
          </blockquote>

          {item.stats && (
            <div className="grid grid-cols-2 gap-3 mb-6">
              {item.stats.map((stat, idx) => (
                <div
                  key={idx}
                  className="rounded-2xl bg-[#f0d7ff]/60 border border-[#1a1a1a]/15 p-4"
                >
                  <div className="font-display text-4xl leading-none mb-1 tabular-nums">
                    {stat.value}
                  </div>
                  <div className="text-xs font-medium text-[#1a1a1a]/75">{stat.label}</div>
                </div>
              ))}
            </div>
          )}

          <div className="space-y-3 text-[0.95rem] leading-relaxed text-[#1a1a1a]/80 mb-6">
            {item.caseStudySummary?.map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>

          <div className="flex justify-end">
            <Button variant="dark" onClick={onClose}>
              Close
            </Button>
          </div>
        </motion.div>
      </div>
    )}
  </AnimatePresence>
);

interface PrivacyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PrivacyModal: React.FC<PrivacyModalProps> = ({ isOpen, onClose }) => (
  <AnimatePresence>
    {isOpen && (
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        role="dialog"
        aria-modal="true"
        aria-labelledby="privacy-modal-title"
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-[#1a1a1a]/70 backdrop-blur-sm"
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 12 }}
          transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 w-full max-w-xl rounded-3xl bg-[#ffffeb] border-2 border-[#1a1a1a] p-6 sm:p-8 shadow-2xl text-[#1a1a1a]"
        >
          <div className="flex items-start justify-between gap-4 mb-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#034f46] text-[#ffffeb] flex items-center justify-center">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.08em] text-[#034f46]">
                  Trust &amp; Security
                </p>
                <h3 id="privacy-modal-title" className="font-display text-3xl leading-none">
                  Your voice stays yours.
                </h3>
              </div>
            </div>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close privacy details"
              className="w-10 h-10 rounded-full border border-[#1a1a1a]/20 flex items-center justify-center hover:bg-[#e4e4d0] transition-colors cursor-pointer shrink-0"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="space-y-4 text-sm leading-relaxed text-[#1a1a1a]/80 mb-6">
            <p>
              Your data is never sold or shared with third-party brokers. In Settings &gt; Data
              and Privacy, you can enable zero data retention or opt out of model improvement
              entirely.
            </p>
            <div className="grid sm:grid-cols-3 gap-3">
              <div className="rounded-xl bg-[#e4e4d0]/70 p-3.5 border border-[#1a1a1a]/10">
                <div className="font-semibold text-[#1a1a1a] mb-1">SOC 2 Type II</div>
                <p className="text-xs text-[#1a1a1a]/70">
                  Independently audited continuous security controls.
                </p>
              </div>
              <div className="rounded-xl bg-[#e4e4d0]/70 p-3.5 border border-[#1a1a1a]/10">
                <div className="font-semibold text-[#1a1a1a] mb-1">HIPAA Ready</div>
                <p className="text-xs text-[#1a1a1a]/70">
                  Healthcare-grade safeguards and BAA availability.
                </p>
              </div>
              <div className="rounded-xl bg-[#e4e4d0]/70 p-3.5 border border-[#1a1a1a]/10">
                <div className="font-semibold text-[#1a1a1a] mb-1">ISO 27001</div>
                <p className="text-xs text-[#1a1a1a]/70">
                  Certified international information security management.
                </p>
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <Button variant="primary" onClick={onClose}>
              Got it
            </Button>
          </div>
        </motion.div>
      </div>
    )}
  </AnimatePresence>
);
