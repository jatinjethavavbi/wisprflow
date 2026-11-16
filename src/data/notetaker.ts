export interface NotetakerFaqItem {
  id: string;
  question: string;
  answer: string;
}

export interface NotetakerGuideArticle {
  id: string;
  category: string;
  title: string;
  author: string;
  date: string;
  readTime: string;
  summary: string;
  highlights: string[];
  variant: 'granola' | 'inperson' | 'zoom';
}

export interface NotetakerQaPrompt {
  id: string;
  question: string;
  intro: string;
  bullets: { lead: string; text: string }[];
  sources: string[];
}

export interface HeroScenario {
  id: string;
  lines: {
    id: string;
    speaker: string;
    badgeBg: string;
    text: string;
    opacityClass: string;
    offsetClass: string;
    fadeTail?: boolean;
  }[];
  actionCard: {
    prefix: string;
    action: string;
    owner: string;
    ownerBg: string;
  };
}

export const HERO_SCENARIOS: HeroScenario[] = [
  {
    id: 'target-launch',
    lines: [
      {
        id: 't-1',
        speaker: 'DeShawn',
        badgeBg: 'bg-[#e2e2d2] text-[#1a1a1a]/60',
        text: "What's our meeting target again?",
        opacityClass: 'opacity-15',
        offsetClass: 'pl-10 sm:pl-20',
      },
      {
        id: 't-2',
        speaker: 'Alix',
        badgeBg: 'bg-[#f5b7ec] text-[#1a1a1a]',
        text: '25 over the course of three days.',
        opacityClass: 'opacity-28',
        offsetClass: 'pl-16 sm:pl-28',
      },
      {
        id: 't-3',
        speaker: 'Mark',
        badgeBg: 'bg-[#e2b8b2] text-[#1a1a1a]',
        text: 'We need Sales targeting priority accounts ASAP.',
        opacityClass: 'opacity-55',
        offsetClass: 'pl-0 sm:pl-0',
      },
      {
        id: 't-4',
        speaker: 'Alix',
        badgeBg: 'bg-[#f5b7ec] text-[#1a1a1a]',
        text: "Who's handling the list?",
        opacityClass: 'opacity-82',
        offsetClass: 'pl-24 sm:pl-44',
      },
      {
        id: 't-5',
        speaker: 'DeShawn',
        badgeBg: 'bg-[#03473e] text-[#ffffeb]',
        text: "I'll send it to Yao tomorrow morning",
        opacityClass: 'opacity-100',
        offsetClass: 'pl-6 sm:pl-14',
        fadeTail: true,
      },
    ],
    actionCard: {
      prefix: 'Tell Eng:',
      action: 'tentatively 11am–2pm',
      owner: 'Hailey',
      ownerBg: 'bg-[#ffa946] text-[#1a1a1a]',
    },
  },
  {
    id: 'ces-travel',
    lines: [
      {
        id: 'c-1',
        speaker: 'Hailey',
        badgeBg: 'bg-[#fde6b8] text-[#1a1a1a]',
        text: 'Has everyone booked their travel?',
        opacityClass: 'opacity-15',
        offsetClass: 'pl-8 sm:pl-14',
      },
      {
        id: 'c-2',
        speaker: 'Alix',
        badgeBg: 'bg-[#f5b7ec] text-[#1a1a1a]',
        text: 'Not everyone on my team.',
        opacityClass: 'opacity-28',
        offsetClass: 'pl-16 sm:pl-28',
      },
      {
        id: 'c-3',
        speaker: 'Mark',
        badgeBg: 'bg-[#e2b8b2] text-[#1a1a1a]',
        text: 'We need to wrap that up by the 10th.',
        opacityClass: 'opacity-55',
        offsetClass: 'pl-0 sm:pl-0',
      },
      {
        id: 'c-4',
        speaker: 'Hailey',
        badgeBg: 'bg-[#fde6b8] text-[#1a1a1a]',
        text: 'The 8th, actually.',
        opacityClass: 'opacity-82',
        offsetClass: 'pl-24 sm:pl-40',
      },
      {
        id: 'c-5',
        speaker: 'Alix',
        badgeBg: 'bg-[#f5b7ec] text-[#1a1a1a]',
        text: 'Reminding them now.',
        opacityClass: 'opacity-100',
        offsetClass: 'pl-14 sm:pl-26',
      },
    ],
    actionCard: {
      prefix: 'Remind team:',
      action: 'CES travel due 8th',
      owner: 'Alix',
      ownerBg: 'bg-[#f5b7ec] text-[#1a1a1a]',
    },
  },
];

export const HERO_CHAT_STACK = HERO_SCENARIOS[0].lines;

export interface WalkthroughTranscriptLine {
  id: string;
  speaker: string;
  speakerKey: 'nathalie' | 'stephen' | 'mikel';
  labelColor: string;
  text: string;
  highlighted?: boolean;
}

export const WALKTHROUGH_TRANSCRIPT: WalkthroughTranscriptLine[] = [
  {
    id: 'wt-1',
    speaker: 'Nathalie',
    speakerKey: 'nathalie',
    labelColor: 'text-[#e59a38]',
    text: "Stephen, how's the process review going?",
  },
  {
    id: 'wt-2',
    speaker: 'Stephen',
    speakerKey: 'stephen',
    labelColor: 'text-[#d96b6b]',
    text: "I'd give Raphael carte blanche.",
  },
  {
    id: 'wt-3',
    speaker: 'Stephen',
    speakerKey: 'stephen',
    labelColor: 'text-[#1a1a1a]/45',
    text: 'Most ad hoc updates can go in Asana.',
  },
  {
    id: 'wt-4',
    speaker: 'Mikel',
    speakerKey: 'mikel',
    labelColor: 'text-[#5b9bd5]',
    text: 'Will you be ready to present the Miro board on Monday?',
  },
  {
    id: 'wt-5',
    speaker: 'Stephen',
    speakerKey: 'stephen',
    labelColor: 'text-[#1a1a1a]/45',
    text: 'Tuesday is better. I want to run it by Siobhan first',
  },
  {
    id: 'wt-6',
    speaker: 'Nathalie',
    speakerKey: 'nathalie',
    labelColor: 'text-[#e59a38]',
    text: "What's slowing us down most right now?",
  },
  {
    id: 'wt-7',
    speaker: 'Stephen',
    speakerKey: 'stephen',
    labelColor: 'text-[#d96b6b]',
    text: 'Too many approvals along the way.',
  },
  {
    id: 'wt-8',
    speaker: 'Mikel',
    speakerKey: 'mikel',
    labelColor: 'text-[#5b9bd5]',
    text: "That's always been an issue.",
    highlighted: true,
  },
  {
    id: 'wt-9',
    speaker: 'Nathalie',
    speakerKey: 'nathalie',
    labelColor: 'text-[#e59a38]',
    text: 'Especially with design.',
  },
  {
    id: 'wt-10',
    speaker: 'Stephen',
    speakerKey: 'stephen',
    labelColor: 'text-[#d96b6b]',
    text: "I'd give Raphael carte blanche.",
  },
  {
    id: 'wt-11',
    speaker: 'Nathalie',
    speakerKey: 'nathalie',
    labelColor: 'text-[#e59a38]',
    text: 'What about all the status meetings?',
  },
  {
    id: 'wt-12',
    speaker: 'Stephen',
    speakerKey: 'stephen',
    labelColor: 'text-[#d96b6b]',
    text: 'I think we can lose half of them.',
  },
];

export const CONVERSATION_TRANSCRIPT = WALKTHROUGH_TRANSCRIPT.slice(5);

export interface McpToolItem {
  id: string;
  name: string;
  badge: string;
  command: string;
  output: string;
}

export const MCP_TOOLS: McpToolItem[] = [
  {
    id: 'claude',
    name: 'Claude',
    badge: 'MCP Connected',
    command: 'search_meetings("Q3 creative sign-off blockers")',
    output:
      'Found 2 meetings (Oct 19–20): Siobhan reviews final lifestyle assets Tuesday once Cheng Liu returns from PTO. Mobile checkout QA stays Thursday.',
  },
  {
    id: 'chatgpt',
    name: 'ChatGPT',
    badge: 'MCP Connected',
    command: 'draft_followup(meeting_id="q3-campaign-planning")',
    output:
      'Drafted concise partner recap with Asana action items, Tableau reporting owner, and Tuesday sign-off milestone ready to send.',
  },
  {
    id: 'gemini',
    name: 'Gemini',
    badge: 'MCP Connected',
    command: 'list_decisions(range="last_7_days", topic="process")',
    output:
      '1. Consolidate ad-hoc updates into Asana. 2. Tableau cohort dashboard updates every Tuesday morning. 3. Give Raphael carte blanche on design QA.',
  },
];

export const NOTETAKER_QA_PROMPTS: NotetakerQaPrompt[] = [
  {
    id: 'blockers',
    question: "What's blocking the launch this week?",
    intro:
      'I searched through your meetings and notes and found three potential launch blockers that people have mentioned:',
    bullets: [
      {
        lead: 'Cheng Liu',
        text: 'is on vacation from Oct 17–20 and unable to approve assets.',
      },
      {
        lead: 'New product images',
        text: 'are delayed with the retoucher.',
      },
      {
        lead: "Rohan's team",
        text: 'is working to fix mobile checkout page issues.',
      },
    ],
    sources: ['Marketing Standup', 'Product <> Marketing Sync'],
  },
  {
    id: 'decisions',
    question: 'What did we decide on campaign owners?',
    intro: 'Across this week’s standups, the team aligned on two ownership updates:',
    bullets: [
      {
        lead: 'Stephen & Siobhan',
        text: 'will finalize the Q3 process review on Tuesday before sprint kickoff.',
      },
      {
        lead: 'Hailey',
        text: 'is posting the Ramp reminder and event channel timeline updates.',
      },
      {
        lead: 'Asana & Tableau',
        text: 'remain the source of truth for ad-hoc tasks and weekly KPIs.',
      },
    ],
    sources: ['Q3 Campaign Planning', 'Marketing Standup'],
  },
  {
    id: 'missed',
    question: 'What did I miss in the last 5 minutes?',
    intro: 'Here is a quick recap of what happened while you stepped away:',
    bullets: [
      {
        lead: 'Approval path',
        text: 'Design sign-off was reduced from 3 reviewers to 1 final check.',
      },
      {
        lead: 'Timeline',
        text: 'Mobile checkout QA stays scheduled for Thursday morning.',
      },
    ],
    sources: ['Live Call · Current'],
  },
];

export const ENTERPRISE_CONTROLS = [
  {
    id: 'access',
    title: 'Control Notetaker access',
    description: 'Turn Notetaker on or off across your organization.',
  },
  {
    id: 'consent',
    title: 'Optional consent acknowledgment*',
    description:
      "Choose to require users to confirm they've obtained participant consent before recording.",
  },
  {
    id: 'no-training',
    title: 'No training on your meeting data',
    description: 'Model training is disabled for every enterprise account.',
  },
  {
    id: 'rules',
    title: 'Set privacy rules centrally',
    description:
      "Apply organization-level privacy restrictions that individual users can't change.",
  },
];

export const NOTETAKER_FAQS: NotetakerFaqItem[] = [
  {
    id: 'accuracy',
    question: "How accurate are Wispr Notetaker's AI transcripts?",
    answer:
      'Wispr Notetaker is built to spell names, jargon, and product terms correctly. Most AI notetakers transcribe your conversation cold. Notetaker starts with your context: the people on your calendar and the names and jargon in your personal dictionary.\n\nThat means names like "Aditya" are spelled correctly and product names stay intact. After the meeting, the tool reviews every transcript to catch mistakes. Notetaker was built by the team behind Wispr Flow dictation, where getting words right is the whole job.\n\nThe best way to see the difference is to record one meeting with Notetaker alongside your current tool and compare the transcripts.',
  },
  {
    id: 'diarization',
    question: 'How does Wispr Notetaker identify who said what in a meeting?',
    answer:
      'Notetaker combines clean system and microphone audio separation with speaker diarization and your calendar invite list, labeling each turn in the transcript automatically without requiring a meeting bot.',
  },
  {
    id: 'apps',
    question: 'What apps and tools does Notetaker work with?',
    answer:
      'Notetaker captures audio directly on Mac and Windows, so it works seamlessly with Zoom, Google Meet, Microsoft Teams, Slack Huddles, Discord, Webex, and in-person microphone recordings.',
  },
  {
    id: 'consent',
    question: 'Do I need to get user consent?',
    answer:
      'Yes — we always recommend informing participants before recording or transcribing. Admins on Enterprise plans can also enable optional participant consent acknowledgment prompts before a session starts.',
  },
  {
    id: 'ai-tools',
    question: 'Can I use my meeting notes in Claude, ChatGPT, or other AI tools?',
    answer:
      'Yes. Connect Notetaker via MCP or export clean Markdown summaries and full speaker-labeled transcripts directly into Claude, ChatGPT, Gemini, Notion, Linear, or your docs in one click.',
  },
  {
    id: 'in-person',
    question: 'Does Wispr Notetaker work for in-person meetings?',
    answer:
      'Yes. Open Notetaker on your laptop during coffee chats, boardroom briefings, or 1:1 conversations and press record — no calendar event or video link is required.',
  },
  {
    id: 'adhoc',
    question: "Can I record meetings that aren't on my calendar?",
    answer:
      'Anytime. Start an instant capture from the menu bar, desktop app, or floating widget for spontaneous Slack huddles, hallway discussions, or back-to-back calls.',
  },
  {
    id: 'vs-granola',
    question: 'Why is Wispr Flow better than Granola and other AI note-taking tools?',
    answer:
      'Wispr Flow brings together studio-grade dictation and bot-free meeting notes in a single app powered by one shared vocabulary. Your custom terms, names, and shortcuts automatically improve both your writing and your meeting summaries.',
  },
  {
    id: 'import',
    question: "I'm coming from Granola, Otter, or Fathom. Do I lose my history?",
    answer:
      'Not at all. Our guided importer brings over your past transcripts, dates, summaries, and action items in a few clicks so your searchable meeting archive is ready immediately.',
  },
  {
    id: 'privacy',
    question: 'Is my data private? What happens to the audio after a meeting ends?',
    answer:
      'Your voice and meeting data stay private, are encrypted in transit and at rest, and are never sold. Enterprise accounts ship with zero data retention options and model training disabled by default.',
  },
  {
    id: 'pricing',
    question: 'Is Notetaker free? Can my team use it?',
    answer:
      'Yes — Wispr Flow Notetaker is included inside the Flow desktop app on Mac and Windows, with free tier access to get started and unified team controls on Business and Enterprise plans.',
  },
  {
    id: 'languages',
    question: 'What languages can I use Notetaker in?',
    answer:
      'Notetaker supports 100+ languages with automatic language detection, making it effortless for distributed global teams and bilingual conversations.',
  },
  {
    id: 'platforms',
    question: 'What platforms can I use Notetaker on?',
    answer:
      'Wispr Flow Notetaker is available on macOS and Windows today inside the unified Flow desktop application.',
  },
];

export const NOTETAKER_GUIDES: NotetakerGuideArticle[] = [
  {
    id: 'granola-alternatives',
    category: 'ALTERNATIVE',
    title: 'Granola alternatives: Wispr Flow, Otter.AI & other competitors',
    author: 'Rob Solomon',
    date: 'Oct 8, 2026',
    readTime: '12 MIN',
    variant: 'granola',
    summary:
      'A practical side-by-side comparison of modern bot-free AI notetakers across transcription accuracy, custom dictionary support, MCP integrations, and unified dictation workflows.',
    highlights: [
      'Why shared personal dictionaries eliminate repetitive spelling fixes on names and acronyms.',
      'Bot-free local capture vs. calendar-bot participants in customer-facing calls.',
      'How MCP lets Claude, ChatGPT, and Cursor query your entire meeting archive.',
    ],
  },
  {
    id: 'in-person-meetings',
    category: 'HOW-TO',
    title: 'How to record and transcribe an in-person meeting',
    author: 'Samm Yates',
    date: 'Oct 13, 2026',
    readTime: '11 MIN',
    variant: 'inperson',
    summary:
      'Best practices for room mic placement, etiquette, consent prompts, and structuring crisp topic-by-topic recaps from boardrooms, coffee chats, and onsite workshops.',
    highlights: [
      'Getting clean speaker separation from built-in laptop arrays in reflective rooms.',
      'One-click "What did I miss?" summaries for marathon strategy sessions.',
      'Turning raw room transcripts into Asana, Linear, or email follow-ups with Flow.',
    ],
  },
  {
    id: 'zoom-without-bot',
    category: 'CAPTURE-PLATFORM',
    title: 'AI notetaker for Zoom: more accurate transcripts without a bot',
    author: 'Rob Solomon',
    date: 'Oct 28, 2026',
    readTime: '8 MINUTES',
    variant: 'zoom',
    summary:
      'How system-audio capture outperforms virtual meeting bots on latency, participant comfort, and rare terminology without cluttering your Zoom participant pane.',
    highlights: [
      'Zero "Recording Bot has joined the call" interruptions on external prospect meetings.',
      'Automatic diarization using your calendar invitees and voice print separation.',
      'SOC 2 Type II, HIPAA, and ISO 27001 controls built directly into Flow Enterprise.',
    ],
  },
];
