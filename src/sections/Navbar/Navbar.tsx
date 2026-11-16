import React, { useState, useRef, useEffect } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ChevronDown, Menu, X } from 'lucide-react';
import { FlowBrandLogo } from '../../components/BrandMarks';
import { AppLink, useRouter } from '../../context/RouterContext';
import { NAV_LINKS, NavLinkItem } from '../../data/navigation';

interface NavbarProps {
  onOpenDownload: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenDownload }) => {
  const { pathname, navigate } = useRouter();
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMac, setIsMac] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);

  const isNotetakerActive = pathname === '/notetaker' || pathname === '/notetaker-resources';

  useEffect(() => {
    const ua = navigator.userAgent.toLowerCase();
    setIsMac(ua.includes('mac') && !ua.includes('iphone') && !ua.includes('ipad'));
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleNavClick = (item: NavLinkItem) => {
    setOpenDropdown(null);
    setMobileMenuOpen(false);
    navigate(item.href);
  };

  return (
    <header className="sticky top-2 sm:top-3 z-40 w-full px-3 sm:px-6 lg:px-10 pointer-events-none">
      <div ref={navRef} className="max-w-[60rem] mx-auto pointer-events-auto relative">
        <div className="flex items-center justify-between gap-3 sm:gap-5 bg-[#ffffeb]/95 backdrop-blur-md border-2 border-[#e4e4d0] rounded-[0.65rem] pl-4 pr-2 py-2 shadow-[0_6px_24px_rgba(26,26,26,0.06)]">
          {/* Zone 1: Brand + Dictation/Notetaker Pill Switcher */}
          <div className="flex items-center gap-4 shrink-0">
            <AppLink
              to="/"
              className="text-[#1a1a1a] hover:opacity-80 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1a1a1a] rounded"
              aria-label="Wispr Flow Home"
            >
              <FlowBrandLogo />
            </AppLink>

            <div
              className="hidden md:flex items-center bg-[#e4e4d0] rounded-full p-0.5"
              role="tablist"
              aria-label="Product switcher"
            >
              <AppLink
                to="/"
                role="tab"
                aria-selected={!isNotetakerActive}
                className={`px-4 py-1.5 rounded-full text-sm font-semibold leading-none transition-all whitespace-nowrap shrink-0 ${
                  !isNotetakerActive
                    ? 'bg-[#fffdf9] text-[#1a1a1a] shadow-xs'
                    : 'text-[#1a1a1a]/70 hover:text-[#1a1a1a]'
                }`}
              >
                Dictation
              </AppLink>
              <AppLink
                to="/notetaker"
                role="tab"
                aria-selected={isNotetakerActive}
                className={`px-4 py-1.5 rounded-full text-sm font-semibold leading-none transition-all whitespace-nowrap shrink-0 ${
                  isNotetakerActive
                    ? 'bg-[#fffdf9] text-[#1a1a1a] shadow-xs'
                    : 'text-[#1a1a1a]/70 hover:text-[#1a1a1a]'
                }`}
              >
                Notetaker
              </AppLink>
            </div>
          </div>

          {/* Zone 2: Desktop Navigation Links with Real Page Routes + Dropdowns */}
          <nav className="hidden lg:flex items-center gap-7" aria-label="Main navigation">
            {NAV_LINKS.map((item) => {
              const isOpen = openDropdown === item.id;
              const isActive = pathname === item.href;
              return (
                <div
                  key={item.id}
                  className="relative"
                  onMouseEnter={() => setOpenDropdown(item.id)}
                  onMouseLeave={() => setOpenDropdown(null)}
                >
                  <button
                    type="button"
                    onClick={() => handleNavClick(item)}
                    aria-expanded={isOpen}
                    className={`inline-flex items-center gap-1 py-1.5 text-[0.95rem] font-medium transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                      isActive ? 'text-[#034f46] font-semibold' : 'text-[#1a1a1a]/85 hover:text-[#034f46]'
                    }`}
                  >
                    <span>{item.label}</span>
                    <ChevronDown
                      className={`w-3.5 h-3.5 opacity-60 transition-transform duration-150 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>

                  <AnimatePresence>
                    {isOpen && item.highlights && (
                      <motion.div
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 6 }}
                        transition={{ duration: 0.16, ease: [0.16, 1, 0.3, 1] }}
                        className="absolute left-1/2 -translate-x-1/2 top-full pt-3 w-72 z-50"
                      >
                        <div className="rounded-2xl bg-[#ffffeb] border-2 border-[#e4e4d0] shadow-xl p-3 space-y-1">
                          {item.highlights.map((hl) => (
                            <AppLink
                              key={hl.title}
                              to={hl.href}
                              onClick={() => setOpenDropdown(null)}
                              className="block rounded-xl p-2.5 hover:bg-[#e4e4d0]/60 transition-colors"
                            >
                              <div className="text-sm font-semibold text-[#1a1a1a]">
                                {hl.title}
                              </div>
                              <div className="text-xs text-[#1a1a1a]/65 mt-0.5 leading-snug">
                                {hl.subtitle}
                              </div>
                            </AppLink>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </nav>

          {/* Zone 3: OS-Aware Primary Button & Mobile Menu Toggle */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={onOpenDownload}
              className="inline-flex items-center justify-center gap-2 bg-[#f0d7ff] hover:bg-[#e6c3ff] border-2 border-[#1a1a1a] rounded-[0.45rem] px-3 sm:px-4 py-2 text-xs sm:text-sm font-semibold text-[#1a1a1a] transition-colors cursor-pointer whitespace-nowrap shrink-0"
            >
              {isMac ? (
                <>
                  <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-current shrink-0" aria-hidden="true">
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.33c.64-.78 1.08-1.86.96-2.94-.93.04-2.05.62-2.71 1.4-.58.68-1.1 1.78-.96 2.84 1.04.08 2.07-.52 2.71-1.3" />
                  </svg>
                  <span>Download for Mac</span>
                </>
              ) : (
                <>
                  <svg viewBox="0 0 20 20" className="w-3.5 h-3.5 fill-current shrink-0" aria-hidden="true">
                    <rect x="1" y="1" width="8.2" height="8.2" />
                    <rect x="10.8" y="1" width="8.2" height="8.2" />
                    <rect x="1" y="10.8" width="8.2" height="8.2" />
                    <rect x="10.8" y="10.8" width="8.2" height="8.2" />
                  </svg>
                  <span>Get started on Windows</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={mobileMenuOpen}
              className="lg:hidden w-9 h-9 rounded-lg border border-[#e4e4d0] flex items-center justify-center text-[#1a1a1a] hover:bg-[#e4e4d0]/60 transition-colors cursor-pointer shrink-0"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Drawer */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
              className="lg:hidden mt-2 rounded-2xl bg-[#ffffeb] border-2 border-[#e4e4d0] shadow-xl p-4 space-y-3"
            >
              <div className="flex items-center bg-[#e4e4d0] rounded-full p-1 md:hidden">
                <AppLink
                  to="/"
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex-1 py-2 text-center rounded-full text-sm font-semibold transition-all ${
                    !isNotetakerActive
                      ? 'bg-[#fffdf9] text-[#1a1a1a] shadow-xs'
                      : 'text-[#1a1a1a]/70'
                  }`}
                >
                  Dictation
                </AppLink>
                <AppLink
                  to="/notetaker"
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex-1 py-2 text-center rounded-full text-sm font-semibold transition-all ${
                    isNotetakerActive
                      ? 'bg-[#fffdf9] text-[#1a1a1a] shadow-xs'
                      : 'text-[#1a1a1a]/70'
                  }`}
                >
                  Notetaker
                </AppLink>
              </div>

              <div className="divide-y divide-[#1a1a1a]/10">
                {[
                  ...NAV_LINKS,
                  { id: 'demo', label: 'Web Demo', href: '/demo', description: 'Try dictation live' },
                  { id: 'why-flow', label: 'Why Flow', href: '/why-flow', description: 'vs. Siri & Google' },
                  { id: 'privacy', label: 'Privacy & Security', href: '/privacy', description: 'SOC 2, HIPAA & ISO' },
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => handleNavClick(item)}
                    className="w-full text-left py-3 px-2 flex items-center justify-between text-base font-semibold text-[#1a1a1a] hover:text-[#034f46] cursor-pointer"
                  >
                    <span>{item.label}</span>
                    <span className="text-xs font-normal text-[#1a1a1a]/60 truncate max-w-[55%]">
                      {item.description}
                    </span>
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};
