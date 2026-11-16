export interface HeroScenario {
  id: string;
  appName: string;
  label: string;
  rawSpeech: string;
  polishedText: string;
  highlights: { phrase: string; type: 'filler' | 'correction' | 'repetition' }[];
}

export const HERO_SCENARIOS: HeroScenario[] = [
  {
    id: 'project-update',
    appName: 'Slack',
    label: 'Team Update',
    rawSpeech:
      'Umm, hope your week has started well… I was talking to Cheyene earlier but reception was really bad and I think their going to handle the first part of the project, but I’m not totally sure. Also, I told the team the the new timeline should be ready by Friday, although it’s probably going to slip. There’s been a lot of back and forth and honestly the the whole thing’s been kind of chaotic, like nobody really knows what’s going on so can you check in with them and see if the notes from yesterday’s meeting were sent out, or if they’re still waiting. I think Cheyene mentioned it but didn’t confirm, and now I’m a little lost.',
    polishedText:
      'Hope your week is off to a good start. I was talking to Cheyene earlier, but the reception was really bad. I think they’re going to handle the first part of the project, but I’m not totally sure. I also told the team the new timeline should be ready by Friday — although it might slip. There’s been a lot of back and forth, and honestly, the whole thing has been a bit chaotic. It feels like nobody really knows what’s going on. Can you check in with them and see if the notes from yesterday’s meeting were sent out, or if they’re still waiting? I think Cheyene mentioned it, but didn’t confirm — and now I’m a little lost!',
    highlights: [
      { phrase: 'Umm,', type: 'filler' },
      { phrase: 'the the', type: 'repetition' },
      { phrase: 'like', type: 'filler' },
      { phrase: 'their going', type: 'correction' },
    ],
  },
  {
    id: 'launch-slip',
    appName: 'Gmail',
    label: 'Launch Note',
    rawSpeech:
      'Hey so um can you actually wait can you tell the team that the the launch is gonna slip I think to like not Friday the following Monday because we’re still waiting on uh legal to sign off on the the new terms page and uh yeah just let them know we’ll have a real timeline by by end of week sorry end of day Thursday',
    polishedText:
      'Hi Marcus,\n\nCan you let the team know the launch is slipping to Monday?\n\nWe’re still waiting on legal to sign off on the new terms page. We’ll have a firm timeline by end of day Thursday.',
    highlights: [
      { phrase: 'um', type: 'filler' },
      { phrase: 'uh', type: 'filler' },
      { phrase: 'like', type: 'filler' },
      { phrase: 'not Friday the following Monday', type: 'correction' },
      { phrase: 'by end of week sorry end of day Thursday', type: 'correction' },
      { phrase: 'the the', type: 'repetition' },
      { phrase: 'by by', type: 'repetition' },
    ],
  },
  {
    id: 'claude-prompt',
    appName: 'Claude',
    label: 'AI Prompt',
    rawSpeech:
      'Okay so uh help me structure a a Q3 product roadmap doc. First section should cover um latency goals, second section should be mobile sync, wait actually put mobile sync first and latency second, and keep the tone super crisp for engineering.',
    polishedText:
      'Help me structure a Q3 product roadmap doc:\n\n1. Mobile sync architecture and offline conflict handling\n2. End-to-end latency targets across desktop and mobile\n\nKeep the tone concise and engineering-focused.',
    highlights: [
      { phrase: 'uh', type: 'filler' },
      { phrase: 'um', type: 'filler' },
      { phrase: 'a a', type: 'repetition' },
      { phrase: 'wait actually put mobile sync first and latency second', type: 'correction' },
    ],
  },
];

export const TRUSTED_COMPANIES = [
  'Microsoft',
  'Amazon',
  'Notion',
  'Klarna',
  'Groupon',
  'Vercel',
  'Mercury',
  'Turing',
];

export const SPEED_DEMO_TEXT =
  "I'm getting started with the project. How would you like to set up the file? I can create a new one from scratch, or pull in something you're already working with. What sounds good? Cool, give me a sec... Alright, got the structure ready. Want to walk me through what you're building, or start with a template? Up to you, I'll follow your lead.";

export interface HowItWorksStep {
  id: 'speak' | 'edits' | 'anywhere';
  number: string;
  title: string;
  description: string;
  badgeLabel: string;
}

export const HOW_IT_WORKS_STEPS: HowItWorksStep[] = [
  {
    id: 'speak',
    number: '01',
    title: 'Speak naturally',
    description:
      'Ramble, pause, or change your mind mid-sentence. Flow understands what you mean, not just what you say.',
    badgeLabel: 'Filler & correction detection',
  },
  {
    id: 'edits',
    number: '02',
    title: 'Flow edits as you speak',
    description:
      'Text that reads like you wrote it, not like you spoke it. Flow automatically removes filler words, adds punctuation, and formats your writing.',
    badgeLabel: 'Instant structured formatting',
  },
  {
    id: 'anywhere',
    number: '03',
    title: 'Use it anywhere',
    description:
      'Flow works anywhere you can type, with no plugins required. Syncs seamlessly across Mac, Windows, iPhone, and Android.',
    badgeLabel: 'Works in every app',
  },
];

export interface TonePreset {
  id: 'formal' | 'casual' | 'very-casual';
  label: string;
  sample: string;
  appHint: string;
}

export const TONE_PRESETS: TonePreset[] = [
  {
    id: 'formal',
    label: 'Formal',
    sample: 'Hey, are you free for lunch tomorrow? Let’s do 12 if that works for you.',
    appHint: 'Gmail & Outlook',
  },
  {
    id: 'casual',
    label: 'Casual',
    sample: 'Hey are you free for lunch tomorrow? Let’s do 12 if that works for you',
    appHint: 'Slack & Teams',
  },
  {
    id: 'very-casual',
    label: 'Very casual',
    sample: 'hey are you free for lunch tomorrow? let’s do 12 if that works for you',
    appHint: 'iMessage & WhatsApp',
  },
];

export const INITIAL_VOCAB_WORDS = ['Sarah', 'Aditya', 'Dillon', 'Wispr Flow'];
