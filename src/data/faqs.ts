export interface FaqItem {
  id: string;
  question: string;
  paragraphs: string[];
  bullets?: { lead: string; text: string }[];
  footerLink?: {
    prefix: string;
    linkText: string;
    suffix: string;
    to: string;
  };
}

export const FAQ_ITEMS: FaqItem[] = [
  {
    id: 'apps',
    question: 'Will Flow work in my messages, notes, email, or AI tools?',
    paragraphs: [
      'Yes. Flow types wherever your cursor is, so it works in every app on your computer with no setup or integrations.',
      'Gmail, Slack, iMessage, Notion, your terminal, your code editor, and AI tools like ChatGPT, Claude, and Cursor. If you can type there, you can Flow there.',
    ],
  },
  {
    id: 'built-in',
    question: 'How is Flow different from Siri or Google voice typing?',
    paragraphs: [
      'Built-in dictation transcribes what you say, word for word, including every "um," false start, and mid-sentence correction. Then you spend time cleaning it up. Flow uses the most advanced voice technology available to turn what you say into what you meant to write.',
      'What that looks like in practice:',
    ],
    bullets: [
      {
        lead: 'Catches your corrections.',
        text: 'Say "let’s meet at 5... actually 6pm" and built-in dictation writes all of it. Flow gives you "Let’s meet at 6pm."',
      },
      {
        lead: 'Formats as you speak.',
        text: 'Numbered lists, paragraphs, structured emails. Built-in dictation gives you a wall of text; Flow gives you something ready to send.',
      },
      {
        lead: 'Gets uncommon names and terms right.',
        text: 'Flow uses your personal dictionary and context to nail names, acronyms, and jargon, and it gets more accurate the more you use it.',
      },
      {
        lead: 'Works everywhere.',
        text: 'Siri only works on Apple devices. Google voice typing has improved its cleanup, but the best version is limited to the Google ecosystem and the newest devices. Flow is one tool with the same accuracy and personalization in every app, on every device.',
      },
    ],
    footerLink: {
      prefix: 'See the full comparison, with side-by-side examples, on our ',
      linkText: 'Why Flow',
      suffix: ' page.',
      to: '/why-flow',
    },
  },
  {
    id: 'other-languages',
    question: 'Does Flow work in other languages?',
    paragraphs: [
      'Yes, Flow supports 100+ languages.',
      'For the best accuracy, select the specific language you’re speaking at that moment rather than relying on auto-detect. If you switch between languages during the day, the language picker lives right in the Flow bar, so changing is one click away.',
    ],
  },
  {
    id: 'accent',
    question: 'Does it work if I have an accent?',
    paragraphs: [
      'Yes. Flow is built to handle a wide range of accents and speaking styles. One tip that makes a real difference: select only the language you’re speaking right now, and deselect the others.',
      'If you speak English with a French accent, having both English and French selected can confuse Flow about which language it’s hearing. Selecting just English while you’re speaking English gives you noticeably better accuracy, and when you switch to French, changing languages is one click in the Flow bar.',
    ],
  },
  {
    id: 'fast-quiet-noisy',
    question: 'What if I talk fast, speak quietly, or work somewhere noisy?',
    paragraphs: [
      'Flow keeps up with fast talkers and can handle speech as quiet as a whisper. The main thing that matters is your microphone setup: your built-in mic works great, and the closer the mic is to your mouth, the quieter you can speak.',
      'We recommend against AirPods and other Bluetooth earbuds for dictation, since they compress audio and can miss the start of what you say.',
    ],
  },
  {
    id: 'microphone',
    question: 'Do I need a special microphone or extra hardware?',
    paragraphs: [
      'No. Your built-in microphone is all you need. If you want to dictate very quietly or in loud environments, a mic closer to your mouth helps.',
      'One note: AirPods and Bluetooth earbuds are the one setup we’d avoid, since they tend to hurt accuracy.',
    ],
  },
  {
    id: 'privacy',
    question: 'Is my voice data private?',
    paragraphs: [
      'We never sell your data. You can manage data-sharing preferences in Settings > Data and Privacy.',
      'Flow is independently certified to the world’s top security standards: SOC 2 Type II, ISO 27001, and HIPAA compliance.',
    ],
  },
  {
    id: 'free',
    question: 'Is Flow free?',
    paragraphs: [
      'Yes. Flow is free, with no trial countdown or credit card required, for 2,000 words per week.',
      'If you want unlimited dictation, upgrade to Flow Pro.',
    ],
  },
  {
    id: 'teams',
    question: 'Can my whole team use it?',
    paragraphs: [
      'Yes, and there are two ways to do it.',
      'Flow Pro for Teams gives everyone unlimited dictation under one plan, with centralized billing and an admin portal to manage seats.',
      'Flow Enterprise adds the things larger organizations need: enforced SSO, admin-controlled data retention and privacy policies, audit logs, and bulk pricing. Most teams start with Pro for Teams and move to Enterprise as they grow.',
    ],
  },
  {
    id: 'notetaker',
    question: 'Does Wispr Flow have an AI Notetaker for meetings?',
    paragraphs: [
      'Yes. Wispr Notetaker is Wispr Flow’s AI Notetaker and meeting assistant. It records meetings on your Mac or Windows computer, then gives you a transcript with speakers named, a summary organized by topic, and next steps.',
      'It works on Zoom, Google Meet, Microsoft Teams, Slack huddles, and in-person meetings.',
    ],
  },
  {
    id: 'same-plan',
    question: 'Are Dictation and Notetaker included in the same plan?',
    paragraphs: [
      'Yes. One Wispr Flow subscription includes both Flow dictation and Notetaker, and both are available on the free plan. Upgrade to Flow Pro for unlimited use.',
    ],
  },
];
