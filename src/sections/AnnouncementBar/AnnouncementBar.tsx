import React from 'react';
import { ChevronRight } from 'lucide-react';
import { AppLink } from '../../context/RouterContext';

export const AnnouncementBar: React.FC = () => {
  return (
    <div className="w-full bg-[#034f46] text-[#ffffeb] px-4 py-3 sm:py-3.5 text-center relative z-30">
      <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-xs sm:text-sm">
        <AppLink
          to="/notetaker"
          className="inline-flex items-center gap-1.5 font-semibold text-[#ffffeb] hover:opacity-90 transition-opacity"
        >
          <span>Wispr Flow Notetaker is now available on Windows and Mac.</span>
          <ChevronRight className="w-4 h-4 sm:hidden shrink-0" />
        </AppLink>
        <AppLink
          to="/notetaker"
          className="hidden sm:inline-flex items-center gap-1 font-medium text-[#ffffeb]/90 hover:text-[#ffffeb] underline-offset-4 hover:underline transition-colors whitespace-nowrap shrink-0"
        >
          <span>Try for free</span>
          <ChevronRight className="w-4 h-4 shrink-0" />
        </AppLink>
      </div>
    </div>
  );
};
