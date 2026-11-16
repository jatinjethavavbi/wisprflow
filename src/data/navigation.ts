export interface NavLinkItem {
  id: string;
  label: string;
  href: string;
  description?: string;
  highlights?: { title: string; subtitle: string; href: string }[];
}

export interface PlatformOption {
  id: 'mac' | 'windows' | 'iphone' | 'android';
  name: string;
  version: string;
  requirement: string;
  fileSize: string;
  actionLabel: string;
}

export const NAV_LINKS: NavLinkItem[] = [
  {
    id: 'business',
    label: 'Business',
    href: '/business',
    description: 'Enterprise-grade voice dictation and bot-free meeting notes for teams.',
    highlights: [
      {
        title: 'Flow for Business',
        subtitle: 'The fastest teams don’t type. They speak.',
        href: '/business',
      },
      {
        title: 'Privacy & Security',
        subtitle: 'Enforced SSO, SOC 2 Type II, HIPAA & ISO 27001 certified.',
        href: '/privacy',
      },
      {
        title: 'Customer Case Studies',
        subtitle: 'See how Clay and Steven Bartlett save hours every day.',
        href: '/case-studies',
      },
      {
        title: 'Talk to Sales',
        subtitle: 'Custom enterprise rollouts and volume team pricing.',
        href: '/talk-to-sales',
      },
    ],
  },
  {
    id: 'pricing',
    label: 'Pricing',
    href: '/pricing',
    description: 'Start free with 2,000 words per week, or upgrade for unlimited voice power.',
    highlights: [
      {
        title: 'Compare All Plans',
        subtitle: 'Free, Pro ($12/mo billed annually), and Enterprise.',
        href: '/pricing',
      },
      {
        title: 'Get Started Free',
        subtitle: 'Sign in or download for Mac, Windows, iOS, and Android.',
        href: '/get-started',
      },
    ],
  },
  {
    id: 'lab',
    label: 'Lab',
    href: '/lab',
    description: 'Wispr Advanced Interfaces Lab — building toward the human.',
    highlights: [
      {
        title: 'Advanced Interfaces Lab',
        subtitle: 'Contextual speech models & Voice In, UI Out research.',
        href: '/lab',
      },
      {
        title: 'Interactive Web Demo',
        subtitle: 'Try live voice-to-text prompts, messages, and lists in browser.',
        href: '/demo',
      },
      {
        title: 'Why Flow vs. Built-in',
        subtitle: 'Side-by-side accuracy comparison with Siri and Google voice.',
        href: '/why-flow',
      },
      {
        title: 'Blog & Insights',
        subtitle: 'Engineering deep-dives, Series B announcement, and updates.',
        href: '/blog',
      },
    ],
  },
];

export const PLATFORM_OPTIONS: PlatformOption[] = [
  {
    id: 'mac',
    name: 'macOS',
    version: 'v1.4.18 (Universal)',
    requirement: 'macOS 13.0 Ventura or later · Apple Silicon & Intel',
    fileSize: '84.2 MB (.dmg)',
    actionLabel: 'Download for Mac',
  },
  {
    id: 'windows',
    name: 'Windows',
    version: 'v1.4.18 (64-bit)',
    requirement: 'Windows 10 / 11 (x64 & ARM64)',
    fileSize: '79.6 MB (.exe)',
    actionLabel: 'Download for Windows',
  },
  {
    id: 'iphone',
    name: 'iPhone & iPad',
    version: 'iOS 17.0+',
    requirement: 'System-wide Flow Keyboard with cloud sync',
    fileSize: 'App Store',
    actionLabel: 'Get on App Store',
  },
  {
    id: 'android',
    name: 'Android',
    version: 'Android 12+',
    requirement: 'System-wide voice keyboard & floating bubble',
    fileSize: 'Google Play',
    actionLabel: 'Get on Google Play',
  },
];
