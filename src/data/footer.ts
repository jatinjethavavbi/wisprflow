export interface FooterColumn {
  heading: string;
  links: { label: string; href: string }[];
}

export const FOOTER_COLUMNS: FooterColumn[] = [
  {
    heading: 'Get started',
    links: [
      { label: 'Pricing', href: '/pricing' },
      { label: 'Privacy & Security', href: '/privacy' },
      { label: 'Web demo', href: '/demo' },
      { label: 'Why Flow vs. Built-in Dictation', href: '/why-flow' },
      { label: 'Microphone guide', href: '/microphones' },
      { label: 'Merch store', href: '/get-started' },
    ],
  },
  {
    heading: 'Professionals',
    links: [
      { label: 'Leaders', href: '/leaders' },
      { label: 'Developers', href: '/developers' },
      { label: 'Marketers', href: '/marketers' },
      { label: 'Creators', href: '/content-creators' },
      { label: 'Customer Support', href: '/customer-support' },
      { label: 'Students', href: '/students' },
      { label: 'Lawyers', href: '/lawyers' },
      { label: 'Accessibility', href: '/accessibility' },
      { label: 'Sales', href: '/sales' },
    ],
  },
  {
    heading: 'Resources',
    links: [
      { label: 'Case studies', href: '/case-studies' },
      { label: 'Blog', href: '/blog' },
      { label: 'Notetaker resources', href: '/notetaker-resources' },
      { label: 'AI prompting guide', href: '/ai-prompting-guide' },
      { label: 'Workflows', href: '/workflows' },
      { label: 'Flow vs Gboard voice typing', href: '/flow-vs-gboard-typing' },
      { label: 'Flow vs Apple Dictation', href: '/flow-vs-apple-dictation' },
      { label: "What's new", href: '/whats-new' },
      { label: 'Vibe coding', href: '/vibe-coding' },
      { label: 'Bug bounty', href: '/bug-bounty' },
      { label: 'Talk to support', href: '/support' },
      { label: 'Talk to sales', href: '/talk-to-sales' },
      { label: 'Help center', href: '/support' },
    ],
  },
  {
    heading: 'Company',
    links: [
      { label: 'About', href: '/about' },
      { label: 'Careers', href: '/careers' },
      { label: 'Trust Center', href: '/privacy' },
      { label: 'Become an affiliate', href: '/about' },
      { label: 'Media Kit', href: '/media-kit' },
    ],
  },
];

export const LEGAL_LINKS = [
  { label: 'Terms', href: '/terms-of-service' },
  { label: 'Privacy', href: '/privacy-policy' },
  { label: 'Data Controls', href: '/data-controls' },
  { label: 'Do Not Sell or Share My Personal Information', href: '/data-controls' },
  { label: 'Privacy Settings', href: '/privacy' },
];
