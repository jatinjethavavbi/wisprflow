import React, { useState } from 'react';
import { Globe, Check } from 'lucide-react';
import { Container } from '../../components/Container';
import { SUPPORTED_LANGUAGES } from '../../data/languages';

export const LanguageSupport: React.FC = () => {
  const [selectedCode, setSelectedCode] = useState('en');
  const activeLanguage =
    SUPPORTED_LANGUAGES.find((l) => l.code === selectedCode) || SUPPORTED_LANGUAGES[0];

  return (
    <section id="languages" className="pb-16 sm:pb-24 bg-[#ffffeb] text-[#1a1a1a]">
      <Container>
        <div className="max-w-6xl mx-auto rounded-[2rem] bg-[#e4e4d0] border border-[#1a1a1a]/10 p-6 sm:p-10 lg:p-12">
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Copy */}
            <div className="lg:col-span-5">
              <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.1em] text-[#034f46] mb-3">
                <Globe className="w-4 h-4" />
                <span>Multilingual intelligence</span>
              </div>
              <h3 className="font-display text-4xl sm:text-5xl leading-[0.95] tracking-tight mb-4">
                100+ Languages
              </h3>
              <p className="text-base text-[#1a1a1a]/75 leading-relaxed mb-6">
                Flow automatically detects and transcribes the language you’re speaking, so you can switch between languages naturally.
              </p>
              <div className="text-xs font-medium text-[#1a1a1a]/65">
                Pick a language to preview real-time transcription formatting:
              </div>
            </div>

            {/* Right Interactive Language Selector & Preview */}
            <div className="lg:col-span-7 space-y-4">
              {/* Language Grid Buttons */}
              <div className="flex flex-wrap gap-2">
                {SUPPORTED_LANGUAGES.map((lang) => {
                  const isActive = lang.code === selectedCode;
                  return (
                    <button
                      key={lang.code}
                      type="button"
                      onClick={() => setSelectedCode(lang.code)}
                      className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all cursor-pointer whitespace-nowrap ${
                        isActive
                          ? 'bg-[#034f46] text-[#ffffeb] shadow-sm'
                          : 'bg-[#ffffeb] text-[#1a1a1a] hover:bg-[#ffffeb]/80 border border-[#1a1a1a]/12'
                      }`}
                    >
                      <span className="font-code text-[0.7rem] opacity-75">
                        {lang.flagCode}
                      </span>
                      <span>{lang.name}</span>
                    </button>
                  );
                })}
              </div>

              {/* Active Language Floating Pill & Output */}
              <div className="rounded-2xl bg-[#ffffeb] border-2 border-[#1a1a1a]/12 p-5 sm:p-6 shadow-sm">
                <div className="flex flex-wrap items-center justify-between gap-2 pb-4 mb-4 border-b border-[#1a1a1a]/10">
                  <div className="inline-flex items-center gap-2.5">
                    <span className="w-8 h-8 rounded-full bg-[#034f46] text-[#ffffeb] font-code text-xs font-bold flex items-center justify-center">
                      {activeLanguage.flagCode}
                    </span>
                    <div>
                      <div className="text-xs text-[#1a1a1a]/60 font-medium">
                        Language:
                      </div>
                      <div className="text-sm font-bold text-[#1a1a1a]">
                        {activeLanguage.name} ({activeLanguage.nativeName})
                      </div>
                    </div>
                  </div>
                  <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#034f46]">
                    <Check className="w-3.5 h-3.5" />
                    <span>{activeLanguage.bilingualNote}</span>
                  </span>
                </div>

                <p className="text-base sm:text-lg font-medium leading-relaxed text-[#1a1a1a]">
                  {activeLanguage.sampleGreeting}
                </p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};
