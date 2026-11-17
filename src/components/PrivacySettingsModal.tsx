import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Check, ExternalLink, Lock, ShieldCheck, X } from 'lucide-react';
import { AppLink } from '../context/RouterContext';

export interface PrivacyPreferences {
  strictlyNecessary: boolean;
  performanceAnalytics: boolean;
  functionalPersonalization: boolean;
  doNotSellOrShare: boolean;
  zeroDataRetention: boolean;
}

const STORAGE_KEY = 'wisprflow_privacy_prefs_v1';

const DEFAULT_PREFERENCES: PrivacyPreferences = {
  strictlyNecessary: true,
  performanceAnalytics: true,
  functionalPersonalization: true,
  doNotSellOrShare: false,
  zeroDataRetention: true,
};

interface PrivacyPolicyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PrivacyPolicyModal: React.FC<PrivacyPolicyModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [prefs, setPrefs] = useState<PrivacyPreferences>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) return { ...DEFAULT_PREFERENCES, ...JSON.parse(saved) };
    } catch {
      // ignore
    }
    return DEFAULT_PREFERENCES;
  });
  const [savedFeedback, setSavedFeedback] = useState(false);

  // Close on Escape & prevent body scrolling when open
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKeyDown);
    const origOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = origOverflow;
    };
  }, [isOpen, onClose]);

  const savePreferences = (newPrefs: PrivacyPreferences) => {
    setPrefs(newPrefs);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newPrefs));
    } catch {
      // ignore
    }
    setSavedFeedback(true);
    setTimeout(() => {
      setSavedFeedback(false);
      onClose();
    }, 450);
  };

  const handleToggle = (key: keyof PrivacyPreferences) => {
    if (key === 'strictlyNecessary') return; // Cannot toggle essential
    setPrefs((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleAcceptAll = () => {
    const allOn: PrivacyPreferences = {
      strictlyNecessary: true,
      performanceAnalytics: true,
      functionalPersonalization: true,
      doNotSellOrShare: false,
      zeroDataRetention: true,
    };
    savePreferences(allOn);
  };

  const handleRejectAll = () => {
    const minPrefs: PrivacyPreferences = {
      strictlyNecessary: true,
      performanceAnalytics: false,
      functionalPersonalization: false,
      doNotSellOrShare: true,
      zeroDataRetention: true,
    };
    savePreferences(minPrefs);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-labelledby="privacy-policy-title"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 bg-[#1a1a1a]/65 backdrop-blur-xs"
          />

          {/* Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 14 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 14 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 w-full max-w-2xl max-h-[90vh] flex flex-col rounded-3xl bg-[#ffffeb] border-2 border-[#1a1a1a] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.35)] text-[#1a1a1a] overflow-hidden"
          >
            {/* Header */}
            <div className="p-6 sm:p-7 border-b border-[#1a1a1a]/10 bg-[#ffffeb]">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[0.72rem] font-semibold tracking-wider uppercase bg-[#d8b4e2]/50 text-[#1a1a1a] mb-2">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    Privacy Preference Center
                  </span>
                  <h2
                    id="privacy-policy-title"
                    className="font-display text-2xl sm:text-3xl leading-tight font-normal text-[#1a1a1a]"
                  >
                    Privacy &amp; Policy Settings
                  </h2>
                </div>
                <button
                  type="button"
                  onClick={onClose}
                  aria-label="Close privacy settings"
                  className="w-9 h-9 rounded-full border border-[#1a1a1a]/20 flex items-center justify-center hover:bg-[#1a1a1a]/10 transition-colors cursor-pointer shrink-0"
                >
                  <X className="w-4 h-4 text-[#1a1a1a]" />
                </button>
              </div>
              <p className="text-xs sm:text-[0.8125rem] text-[#1a1a1a]/70 leading-relaxed mt-2.5">
                When you visit our site, we and our trusted services store or retrieve data
                on your browser (mostly cookies). We respect your privacy and give you full
                control over your choices below.
              </p>
            </div>

            {/* Scrollable Policy Preferences List */}
            <div className="flex-1 overflow-y-auto p-6 sm:p-7 space-y-4 text-left">
              {/* 1. Strictly Necessary */}
              <div className="rounded-2xl border border-[#1a1a1a]/12 bg-[#faf9ed] p-4 sm:p-5">
                <div className="flex items-center justify-between gap-3 mb-1.5">
                  <div className="flex items-center gap-2">
                    <Lock className="w-4 h-4 text-[#034f46]" />
                    <h3 className="text-sm sm:text-base font-semibold text-[#1a1a1a]">
                      Strictly Necessary Cookies
                    </h3>
                  </div>
                  <span className="text-[0.7rem] sm:text-xs font-semibold px-2.5 py-1 rounded-full bg-[#034f46]/10 text-[#034f46] shrink-0">
                    Always Active
                  </span>
                </div>
                <p className="text-xs sm:text-[0.8125rem] text-[#1a1a1a]/75 leading-relaxed">
                  These cookies are essential for you to browse the website and securely use
                  core features like user sessions, security verification, and page navigation.
                  They cannot be turned off.
                </p>
              </div>

              {/* 2. Performance & Analytics */}
              <div className="rounded-2xl border border-[#1a1a1a]/12 bg-[#faf9ed] p-4 sm:p-5">
                <div className="flex items-center justify-between gap-3 mb-1.5">
                  <h3 className="text-sm sm:text-base font-semibold text-[#1a1a1a]">
                    Performance &amp; Analytics
                  </h3>
                  <button
                    type="button"
                    role="switch"
                    aria-checked={prefs.performanceAnalytics}
                    onClick={() => handleToggle('performanceAnalytics')}
                    className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                      prefs.performanceAnalytics ? 'bg-[#034f46]' : 'bg-[#1a1a1a]/25'
                    }`}
                  >
                    <span
                      aria-hidden="true"
                      className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                        prefs.performanceAnalytics ? 'translate-x-5' : 'translate-x-0'
                      }`}
                    />
                  </button>
                </div>
                <p className="text-xs sm:text-[0.8125rem] text-[#1a1a1a]/75 leading-relaxed">
                  These cookies help us count visits and understand user interactions so we
                  can measure and optimize the speed, accuracy, and responsiveness of Wispr
                  Flow.
                </p>
              </div>

              {/* 3. Functional & Personalization */}
              <div className="rounded-2xl border border-[#1a1a1a]/12 bg-[#faf9ed] p-4 sm:p-5">
                <div className="flex items-center justify-between gap-3 mb-1.5">
                  <h3 className="text-sm sm:text-base font-semibold text-[#1a1a1a]">
                    Functional &amp; Personalization
                  </h3>
                  <button
                    type="button"
                    role="switch"
                    aria-checked={prefs.functionalPersonalization}
                    onClick={() => handleToggle('functionalPersonalization')}
                    className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                      prefs.functionalPersonalization ? 'bg-[#034f46]' : 'bg-[#1a1a1a]/25'
                    }`}
                  >
                    <span
                      aria-hidden="true"
                      className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                        prefs.functionalPersonalization ? 'translate-x-5' : 'translate-x-0'
                      }`}
                    />
                  </button>
                </div>
                <p className="text-xs sm:text-[0.8125rem] text-[#1a1a1a]/75 leading-relaxed">
                  Allows our site to remember your operating system preferences (Mac/Windows),
                  selected dictation language, and personalized settings.
                </p>
              </div>

              {/* 4. Do Not Sell or Share My Personal Information */}
              <div className="rounded-2xl border border-[#1a1a1a]/12 bg-[#faf9ed] p-4 sm:p-5">
                <div className="flex items-center justify-between gap-3 mb-1.5">
                  <h3 className="text-sm sm:text-base font-semibold text-[#1a1a1a]">
                    Do Not Sell or Share My Information
                  </h3>
                  <button
                    type="button"
                    role="switch"
                    aria-checked={prefs.doNotSellOrShare}
                    onClick={() => handleToggle('doNotSellOrShare')}
                    className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                      prefs.doNotSellOrShare ? 'bg-[#034f46]' : 'bg-[#1a1a1a]/25'
                    }`}
                  >
                    <span
                      aria-hidden="true"
                      className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                        prefs.doNotSellOrShare ? 'translate-x-5' : 'translate-x-0'
                      }`}
                    />
                  </button>
                </div>
                <p className="text-xs sm:text-[0.8125rem] text-[#1a1a1a]/75 leading-relaxed">
                  Exercise your rights under CCPA/CPRA and GDPR to restrict third-party
                  cross-context behavioral sharing. We never sell your personal data.
                </p>
              </div>

              {/* 5. Zero Data Retention for Voice & AI Models */}
              <div className="rounded-2xl border border-[#1a1a1a]/12 bg-[#faf9ed] p-4 sm:p-5">
                <div className="flex items-center justify-between gap-3 mb-1.5">
                  <h3 className="text-sm sm:text-base font-semibold text-[#1a1a1a]">
                    Zero Data Retention for AI Models
                  </h3>
                  <button
                    type="button"
                    role="switch"
                    aria-checked={prefs.zeroDataRetention}
                    onClick={() => handleToggle('zeroDataRetention')}
                    className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                      prefs.zeroDataRetention ? 'bg-[#034f46]' : 'bg-[#1a1a1a]/25'
                    }`}
                  >
                    <span
                      aria-hidden="true"
                      className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                        prefs.zeroDataRetention ? 'translate-x-5' : 'translate-x-0'
                      }`}
                    />
                  </button>
                </div>
                <p className="text-xs sm:text-[0.8125rem] text-[#1a1a1a]/75 leading-relaxed">
                  Guarantees that your audio recordings, transcripts, and meeting notes are
                  processed ephemerally and never retained to train foundational AI models.
                </p>
              </div>
            </div>

            {/* Modal Footer Controls */}
            <div className="p-4 sm:p-6 border-t border-[#1a1a1a]/10 bg-[#ffffeb] flex flex-col sm:flex-row items-center justify-between gap-3.5">
              <div className="flex items-center gap-3 text-xs text-[#1a1a1a]/60 order-2 sm:order-1">
                <AppLink
                  to="/privacy-policy"
                  onClick={onClose}
                  className="hover:text-[#1a1a1a] underline underline-offset-2"
                >
                  Privacy Policy
                </AppLink>
                <span>•</span>
                <AppLink
                  to="/privacy"
                  onClick={onClose}
                  className="hover:text-[#1a1a1a] underline underline-offset-2"
                >
                  Trust Center
                </AppLink>
                <span>•</span>
                <AppLink
                  to="/data-controls"
                  onClick={onClose}
                  className="hover:text-[#1a1a1a] underline underline-offset-2"
                >
                  Data Controls
                </AppLink>
              </div>

              <div className="flex items-center gap-2.5 w-full sm:w-auto justify-end order-1 sm:order-2">
                <button
                  type="button"
                  onClick={handleRejectAll}
                  className="px-4 py-2.5 rounded-xl border border-[#1a1a1a]/20 text-xs sm:text-sm font-semibold hover:bg-[#1a1a1a]/5 transition-colors cursor-pointer"
                >
                  Reject All
                </button>
                <button
                  type="button"
                  onClick={() => savePreferences(prefs)}
                  className="px-5 py-2.5 rounded-xl bg-[#034f46] hover:bg-[#023b34] text-[#ffffeb] text-xs sm:text-sm font-semibold transition-all duration-200 flex items-center gap-1.5 cursor-pointer shadow-sm hover:shadow"
                >
                  {savedFeedback ? (
                    <>
                      <Check className="w-4 h-4 text-[#ffffeb]" />
                      <span>Saved!</span>
                    </>
                  ) : (
                    <span>Save Preferences</span>
                  )}
                </button>
                <button
                  type="button"
                  onClick={handleAcceptAll}
                  className="px-4 py-2.5 rounded-xl bg-[#1a1a1a] hover:bg-[#2b2b2b] text-[#ffffeb] text-xs sm:text-sm font-semibold transition-colors cursor-pointer"
                >
                  Accept All
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export const PrivacyPreferencesWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Listen for global custom event to open privacy settings from anywhere (e.g. footer)
  useEffect(() => {
    const handleOpen = () => setIsOpen(true);
    window.addEventListener('open-privacy-settings', handleOpen);
    return () => window.removeEventListener('open-privacy-settings', handleOpen);
  }, []);

  return (
    <>
      {/* Global Fixed Bottom-Left Fingerprint Button */}
      <div className="fixed bottom-6 left-6 z-50 pointer-events-auto">
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          aria-label="Privacy & Preferences"
          className="w-11 h-11 rounded-full bg-[#d8b4e2] text-white flex items-center justify-center shadow-[0_4px_18px_rgba(0,0,0,0.18)] hover:scale-108 hover:shadow-[0_6px_22px_rgba(0,0,0,0.24)] transition-all cursor-pointer"
        >
          <svg
            viewBox="0 0 24 24"
            className="w-6 h-6 stroke-current fill-none stroke-[1.8]"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 1a10 10 0 0 0-1.8.16" />
            <path d="M7.34 3.65a10 10 0 0 0-2.6 3.6" />
            <path d="M4.1 11a10 10 0 0 0 .5 3.5" />
            <path d="M6.2 18.2a10 10 0 0 0 4.1 2.4" />
            <path d="M14 21.6a10 10 0 0 0 4.2-1.8" />
            <path d="M20.5 15.5a10 10 0 0 0 .5-3.5" />
            <path d="M19.7 7.5a10 10 0 0 0-2.3-3" />
            <path d="M12 5a7 7 0 0 0-6.7 5.1" />
            <path d="M5.5 13a7 7 0 0 0 1.2 3.8" />
            <path d="M9.8 19a7 7 0 0 0 5.4-.5" />
            <path d="M17.5 15a7 7 0 0 0 .5-3" />
            <path d="M16.5 8a7 7 0 0 0-3.3-2.5" />
            <path d="M12 9a3 3 0 0 0-3 3c0 2 1 3.5 3 3.5s3-1.5 3-3.5a3 3 0 0 0-3-3" />
          </svg>
        </button>
      </div>

      {/* Privacy Policy Modal */}
      <PrivacyPolicyModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
};
