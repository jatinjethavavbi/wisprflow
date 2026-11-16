export interface TestimonialCardItem {
  id: string;
  layout: 'landscape' | 'square';
  theme: 'purple' | 'lumen' | 'yellow-photo' | 'green' | 'dark-lumen' | 'coral' | 'glow';
  quote: string;
  authorName: string;
  authorRole?: string;
  publication?: string;
  image?: string;
  stats?: { value: string; label: string }[];
  hasCaseStudy?: boolean;
  caseStudySummary?: string[];
}

export const TESTIMONIAL_CARDS: TestimonialCardItem[] = [
  {
    id: 'steven-bartlett',
    layout: 'landscape',
    theme: 'purple',
    quote:
      '“The thought I have becomes my explanation. The gap between my thought and my delivery of my idea collapses.”',
    authorName: 'Steven Bartlett',
    authorRole: 'Host of Diary of a CEO',
    image: '/src/assets/images/steven_bartlett_portrait_1794805450787.jpg',
    stats: [
      { value: '90%', label: 'faster message output' },
      { value: '2', label: 'extra productive hours/day' },
    ],
    hasCaseStudy: true,
    caseStudySummary: [
      'Across podcast production, venture operations, and daily executive communication, Steven replaced manual keyboard drafting with Flow voice dictation across Slack, WhatsApp, and Notion.',
      'By speaking full thoughts naturally between recordings, message turnaround dropped by 90% and freed up two extra productive hours each day without editing overhead.',
    ],
  },
  {
    id: 'slash-gear',
    layout: 'square',
    theme: 'lumen',
    quote:
      '“If you find it tiring to write long emails, or just need something quick to note down an idea in the heat of the moment — but typing it all feels like a drag — this app is a Godsend for you.”',
    authorName: 'Slash Gear',
    publication: 'SlashGear',
  },
  {
    id: 'alex-lieberman',
    layout: 'square',
    theme: 'yellow-photo',
    quote:
      '“Wispr Flow is a top 3 favorite AI tool for me. I literally do not use my fingers to type anymore.”',
    authorName: 'Alex Lieberman',
    authorRole: 'Co-founder of Morning Brew',
    image: '/src/assets/images/alex_lieberman_office_1794805451048.jpg',
  },
  {
    id: 'elena-verna',
    layout: 'landscape',
    theme: 'green',
    quote:
      '“I feel like I have no time to type anymore. So I just talk to my phone and my laptop all the time.”',
    authorName: 'Elena Verna',
    authorRole: 'Head of Growth at Lovable',
    image: '/src/assets/images/elena_verna_portrait_1794805451854.jpg',
  },
  {
    id: 'fast-company',
    layout: 'square',
    theme: 'dark-lumen',
    quote:
      '“Wispr Flow just gets it right. It is consistently so much better than the standard voice input, it’ll blow your mind.”',
    authorName: 'Fast Company',
    publication: 'FastCompany',
  },
  {
    id: 'clay',
    layout: 'landscape',
    theme: 'coral',
    quote:
      '“Wispr Flow is a top 3 favorite AI tool for me. I literally do not use my fingers to type anymore.”',
    authorName: 'Clay',
    authorRole: 'GTM Engineering & Sales Team',
    image: '/src/assets/images/clay_team_workspace_1794805452032.jpg',
    stats: [
      { value: '20%', label: 'more customer calls per day' },
      { value: '$3.08m', label: 'estimated cost savings per year' },
    ],
    hasCaseStudy: true,
    caseStudySummary: [
      'Clay’s customer-facing and GTM engineering teams adopted Wispr Flow across CRM updates, Slack follow-ups, and technical documentation.',
      'Eliminating post-call typing bottlenecks unlocked 20% more customer calls per representative per day—translating to $3.08M in estimated annual productivity savings.',
    ],
  },
  {
    id: 'dave-gilboa',
    layout: 'landscape',
    theme: 'glow',
    quote:
      '“Wispr Flow’s dictation has always felt like magic. With Notetaker, that magic has gone multiplayer with no extra setup, perfectly formatted notes, and summaries that are actually useful.”',
    authorName: 'Dave Gilboa',
    authorRole: 'CEO of Warby Parker',
    image: '/src/assets/images/dave_gilboa_portrait_1794805451964.jpg',
  },
];
