import React from 'react';

export const FlowWaveIcon: React.FC<{ className?: string }> = ({ className = 'w-6 h-6' }) => (
  <svg
    viewBox="0 0 28 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    <rect x="1" y="9" width="2.6" height="6" rx="1.3" fill="currentColor" />
    <rect x="6" y="5" width="2.6" height="14" rx="1.3" fill="currentColor" />
    <rect x="11" y="2" width="2.6" height="20" rx="1.3" fill="currentColor" />
    <rect x="16" y="6" width="2.6" height="12" rx="1.3" fill="currentColor" />
    <rect x="21" y="4" width="2.6" height="16" rx="1.3" fill="currentColor" />
    <rect x="25.5" y="9.5" width="2" height="5" rx="1" fill="currentColor" />
  </svg>
);

export const FlowBrandLogo: React.FC<{ className?: string; showWordmark?: boolean }> = ({
  className = '',
  showWordmark = true,
}) => (
  <span className={`inline-flex items-center gap-2 whitespace-nowrap shrink-0 ${className}`}>
    <FlowWaveIcon className="w-6 h-5 text-current" />
    {showWordmark && (
      <span className="font-display text-[1.45rem] leading-none tracking-tight font-normal">
        Flow
      </span>
    )}
  </span>
);

export const FlowWaveformPill: React.FC<{
  active?: boolean;
  label?: string;
  compact?: boolean;
}> = ({ active = true, label = 'Listening...', compact = false }) => {
  const heights = [35, 70, 100, 55, 85, 45, 90, 60, 40, 75, 50];
  return (
    <div
      className={`inline-flex items-center gap-2.5 rounded-full bg-[#1a1a1a] text-[#ffffeb] border border-[#ffffeb]/15 shadow-lg ${
        compact ? 'px-3 py-1.5 text-xs' : 'px-4 py-2 text-xs'
      }`}
    >
      <div className="flex items-center gap-[3px] h-4" aria-hidden="true">
        {heights.map((h, i) => (
          <span
            key={i}
            className="w-[2.5px] rounded-full bg-[#f0d7ff] transition-all duration-150"
            style={{
              height: active ? `${h}%` : '25%',
              opacity: active ? 0.95 : 0.4,
              animation: active
                ? `pulse ${0.65 + (i % 4) * 0.14}s ease-in-out ${(i * 0.08).toFixed(2)}s infinite alternate`
                : 'none',
            }}
          />
        ))}
      </div>
      <span className="font-medium tracking-tight text-[#ffffeb]/90 whitespace-nowrap">
        {label}
      </span>
    </div>
  );
};

export const CompanyLogoMark: React.FC<{ name: string }> = ({ name }) => {
  switch (name) {
    case 'Microsoft':
      return (
        <span className="inline-flex items-center gap-2.5 text-[#ffffeb]/85 hover:text-[#ffffeb] transition-colors">
          <svg viewBox="0 0 20 20" className="w-5 h-5" fill="currentColor" aria-hidden="true">
            <rect x="1" y="1" width="8" height="8" />
            <rect x="11" y="1" width="8" height="8" />
            <rect x="1" y="11" width="8" height="8" />
            <rect x="11" y="11" width="8" height="8" />
          </svg>
          <span className="font-body font-semibold text-lg tracking-tight">Microsoft</span>
        </span>
      );
    case 'Amazon':
      return (
        <span className="inline-flex flex-col items-start text-[#ffffeb]/85 hover:text-[#ffffeb] transition-colors">
          <span className="font-body font-bold text-lg leading-none tracking-tight">amazon</span>
          <svg viewBox="0 0 68 12" className="w-14 h-2.5 mt-0.5" fill="none" aria-hidden="true">
            <path
              d="M3 3C19 10.5 41 10.5 60 3.5"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
            />
            <path
              d="M55 1.5L62 3.2L59 9"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      );
    case 'Notion':
      return (
        <span className="inline-flex items-center gap-2 text-[#ffffeb]/85 hover:text-[#ffffeb] transition-colors">
          <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.9" aria-hidden="true">
            <path d="M4 5.5L15 4l5 3v12l-11 1.5L4 17V5.5z" />
            <path d="M8.5 9.5v7M8.5 9.5l5 6.5v-6.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span className="font-body font-semibold text-lg tracking-tight">Notion</span>
        </span>
      );
    case 'Klarna':
      return (
        <span className="font-body font-bold text-xl tracking-tight text-[#ffffeb]/85 hover:text-[#ffffeb] transition-colors">
          Klarna.
        </span>
      );
    case 'Groupon':
      return (
        <span className="font-body font-bold text-lg tracking-wider uppercase text-[#ffffeb]/85 hover:text-[#ffffeb] transition-colors">
          GROUPON
        </span>
      );
    case 'Vercel':
      return (
        <span className="inline-flex items-center gap-2 text-[#ffffeb]/85 hover:text-[#ffffeb] transition-colors">
          <svg viewBox="0 0 20 18" className="w-4 h-4" fill="currentColor" aria-hidden="true">
            <path d="M10 1L19.5 17H0.5L10 1Z" />
          </svg>
          <span className="font-body font-semibold text-lg tracking-tight">Vercel</span>
        </span>
      );
    case 'Mercury':
      return (
        <span className="inline-flex items-center gap-2 text-[#ffffeb]/85 hover:text-[#ffffeb] transition-colors">
          <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.9" aria-hidden="true">
            <circle cx="12" cy="12" r="8" />
            <path d="M8 12h8M12 8v8" strokeLinecap="round" />
          </svg>
          <span className="font-body font-semibold text-lg tracking-wide uppercase text-sm">MERCURY</span>
        </span>
      );
    default:
      return (
        <span className="inline-flex items-center gap-2 text-[#ffffeb]/85 hover:text-[#ffffeb] transition-colors">
          <svg viewBox="0 0 20 20" className="w-4 h-4" fill="currentColor" aria-hidden="true">
            <rect x="2" y="2" width="16" height="4" rx="1" />
            <rect x="8" y="6" width="4" height="12" rx="1" />
          </svg>
          <span className="font-body font-semibold text-lg tracking-tight">Turing</span>
        </span>
      );
  }
};

export const AppDestinationIcon: React.FC<{ app: 'slack' | 'claude' | 'docs' | 'cursor' }> = ({ app }) => {
  switch (app) {
    case 'slack':
      return (
        <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" aria-hidden="true">
          <path d="M6 15a2 2 0 1 1-2-2h2v2zm1 0a2 2 0 0 1 4 0v5a2 2 0 1 1-4 0v-5z" fill="#E01E5A" />
          <path d="M9 6a2 2 0 1 1 2-2v2H9zm0 1a2 2 0 0 1 0 4H4a2 2 0 1 1 0-4h5z" fill="#36C5F0" />
          <path d="M18 9a2 2 0 1 1 2 2h-2V9zm-1 0a2 2 0 0 1-4 0V4a2 2 0 1 1 4 0v5z" fill="#2EB67D" />
          <path d="M15 18a2 2 0 1 1-2 2v-2h2zm0-1a2 2 0 0 1 0-4h5a2 2 0 1 1 0 4h-5z" fill="#ECB22E" />
        </svg>
      );
    case 'claude':
      return (
        <svg viewBox="0 0 24 24" className="w-5 h-5 text-[#D97757]" fill="currentColor" aria-hidden="true">
          <path d="M12 2l2.1 6.4L20.5 7l-4.4 4.8 4.4 4.8-6.4-1.4L12 22l-2.1-6.8-6.4 1.4 4.4-4.8L3.5 7l6.4 1.4L12 2z" />
        </svg>
      );
    case 'docs':
      return (
        <svg viewBox="0 0 24 24" className="w-5 h-5 text-[#4285F4]" fill="currentColor" aria-hidden="true">
          <path d="M6 2h8l5 5v13a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2zm7 1.5V8h4.5L13 3.5zM8 12h8v1.6H8V12zm0 3.5h8v1.6H8v-1.6zm0 3.5h5v1.6H8V19z" />
        </svg>
      );
    case 'cursor':
      return (
        <svg viewBox="0 0 24 24" className="w-5 h-5 text-[#1a1a1a]" fill="currentColor" aria-hidden="true">
          <path d="M12 2L20.66 7v10L12 22l-8.66-5V7L12 2zm0 2.3L5.34 8.15v7.7L12 19.7l6.66-3.85v-7.7L12 4.3z" />
          <path d="M12 7l4.33 2.5v5L12 17l-4.33-2.5v-5L12 7z" />
        </svg>
      );
  }
};
