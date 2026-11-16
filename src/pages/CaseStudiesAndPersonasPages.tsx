import React, { useState } from 'react';
import { ArrowRight, Check } from 'lucide-react';
import { Container } from '../components/Container';
import { Button } from '../components/Button';
import { AppLink } from '../context/RouterContext';
import { TESTIMONIAL_CARDS } from '../data/testimonials';

export const CaseStudiesPage: React.FC<{ slug?: 'all' | 'steven-bartlett' | 'clay' }> = ({
  slug = 'all',
}) => {
  const studies = TESTIMONIAL_CARDS.filter((c) => c.hasCaseStudy);
  const selected =
    slug === 'steven-bartlett'
      ? studies.find((s) => s.id === 'steven-bartlett')
      : slug === 'clay'
      ? studies.find((s) => s.id === 'clay')
      : null;

  return (
    <div className="bg-[#ffffeb] text-[#1a1a1a] py-12 sm:py-20">
      <Container>
        <div className="max-w-4xl mx-auto">
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#034f46] mb-3">
            Customer Case Studies
          </p>
          <h1 className="font-display text-5xl sm:text-6xl leading-[0.94] mb-10">
            {selected ? selected.authorName : 'Real teams. Real results.'}
          </h1>

          {selected ? (
            <div className="rounded-[2rem] bg-[#e4e4d0] p-7 sm:p-10 space-y-6">
              <div className="grid md:grid-cols-12 gap-8 items-center">
                <div className="md:col-span-6 space-y-4">
                  <p className="text-xs font-bold uppercase tracking-wider text-[#034f46]">
                    {selected.authorRole}
                  </p>
                  <blockquote className="font-display text-3xl leading-snug">
                    {selected.quote}
                  </blockquote>
                  <div className="space-y-3 text-sm sm:text-base text-[#1a1a1a]/80">
                    {selected.caseStudySummary?.map((p, i) => (
                      <p key={i}>{p}</p>
                    ))}
                  </div>
                </div>
                <div className="md:col-span-6">
                  {selected.image && (
                    <img
                      src={selected.image}
                      alt={selected.authorName}
                      className="w-full h-80 object-cover rounded-2xl mb-4"
                      referrerPolicy="no-referrer"
                    />
                  )}
                  {selected.stats && (
                    <div className="grid grid-cols-2 gap-3">
                      {selected.stats.map((st, idx) => (
                        <div key={idx} className="rounded-xl bg-[#ffffeb] p-4">
                          <div className="font-display text-3xl text-[#034f46]">{st.value}</div>
                          <div className="text-xs font-medium text-[#1a1a1a]/70">{st.label}</div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              <AppLink to="/case-studies" className="inline-flex items-center gap-2 text-sm font-bold underline">
                View all case studies
              </AppLink>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-6">
              {studies.map((study) => (
                <AppLink
                  key={study.id}
                  to={`/case-study/${study.id}`}
                  className="group rounded-[2rem] bg-[#e4e4d0] p-6 border border-[#1a1a1a]/10 hover:border-[#1a1a1a] transition-colors flex flex-col justify-between gap-5"
                >
                  <div>
                    {study.image && (
                      <img
                        src={study.image}
                        alt={study.authorName}
                        className="w-full h-56 object-cover rounded-2xl mb-5"
                        referrerPolicy="no-referrer"
                      />
                    )}
                    <h2 className="font-display text-3xl mb-1">{study.authorName}</h2>
                    <p className="text-xs font-medium text-[#1a1a1a]/65 mb-3">{study.authorRole}</p>
                    <p className="text-base font-medium leading-snug">{study.quote}</p>
                  </div>
                  <span className="inline-flex items-center gap-1.5 text-sm font-bold group-hover:text-[#034f46]">
                    Read case study <ArrowRight className="w-4 h-4" />
                  </span>
                </AppLink>
              ))}
            </div>
          )}
        </div>
      </Container>
    </div>
  );
};

const PERSONAS: Record<string, { title: string; headline: string; desc: string; bullets: string[] }> = {
  '/leaders': {
    title: 'Flow for Leaders',
    headline: 'Move at the speed of your decisions.',
    desc: 'Clear your inbox, reply across Slack and WhatsApp, and capture executive meeting action items without spending your evening typing.',
    bullets: ['4x faster executive messaging', 'Bot-free board & 1:1 Notetaker', 'Shared leadership terminology'],
  },
  '/developers': {
    title: 'Flow for Developers',
    headline: 'Prompt Cursor, Claude, and terminals by voice.',
    desc: 'Speak complex architectural specs, PR reviews, and variable names directly into your IDE — Flow understands camelCase, acronyms, and stack jargon.',
    bullets: ['Works inside Cursor, VS Code & Warp', 'Speaks accurate technical terms & symbols', 'Ideal for Vibe Coding & AI prompting'],
  },
  '/marketers': {
    title: 'Flow for Marketers',
    headline: 'Turn raw campaign ideas into ready copy.',
    desc: 'Draft briefs, social threads, and launch updates in Notion, Figma, and Docs using tone presets tailored for every channel.',
    bullets: ['Custom tone profiles per app', 'Instant brand snippet expansion', 'Campaign debrief summaries with Notetaker'],
  },
  '/content-creators': {
    title: 'Flow for Creators',
    headline: 'Never lose a hook or script idea again.',
    desc: 'Speak scripts, newsletters, and video outlines naturally — Flow strips every pause and formats clean drafts.',
    bullets: ['Natural pacing with zero filler words', 'Syncs thoughts from iPhone to desktop', '90% faster message output'],
  },
  '/customer-support': {
    title: 'Flow for Customer Support',
    headline: 'Empathetic, detailed replies in seconds.',
    desc: 'Resolve complex tickets faster with spoken explanations and instant troubleshooting snippet shortcuts.',
    bullets: ['Works in Zendesk, Intercom & Front', 'Reusable policy & link snippets', 'Accurate customer name recognition'],
  },
  '/students': {
    title: 'Flow for Students',
    headline: 'Think out loud. Write essays faster.',
    desc: 'Brainstorm outlines, lecture reflections, and study guides cleanly without wrist fatigue.',
    bullets: ['2,000 free words every week', '100+ languages for multilingual notes', 'Clean formatting in Google Docs & Notion'],
  },
  '/lawyers': {
    title: 'Flow for Lawyers',
    headline: 'Confidential voice dictation built for legal.',
    desc: 'Draft briefs, client updates, and case memos with SOC 2 Type II, HIPAA, and ISO 27001 safeguards.',
    bullets: ['Custom legal vocabulary & citations', 'Zero-data-training lock options', 'Structured matter notes'],
  },
  '/accessibility': {
    title: 'Accessibility with Flow',
    headline: 'Hands-free computing that actually understands.',
    desc: 'Reduce RSI, carpal tunnel strain, and keyboard fatigue with accurate voice input in every application.',
    bullets: ['System-wide cursor typing anywhere', 'Handles quiet whispers & fast speech', 'Works across Mac, Windows, iOS & Android'],
  },
  '/sales': {
    title: 'Flow for Sales',
    headline: '20% more customer calls, zero CRM slog.',
    desc: 'Log CRM follow-ups, summarize discovery calls with Notetaker, and send personalized outreach 4x faster.',
    bullets: ['Works in Salesforce, HubSpot & Slack', 'Named speaker call transcripts', 'Proven $3M+ team productivity impact'],
  },
};

export const PersonaPage: React.FC<{ path: string; onOpenDownload: () => void }> = ({
  path,
  onOpenDownload,
}) => {
  const data = PERSONAS[path] || PERSONAS['/developers'];
  return (
    <div className="bg-[#ffffeb] text-[#1a1a1a] py-12 sm:py-20">
      <Container>
        <div className="max-w-4xl mx-auto">
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#034f46] mb-3">
            {data.title}
          </p>
          <h1 className="font-display text-5xl sm:text-6xl leading-[0.94] mb-6">
            {data.headline}
          </h1>
          <p className="text-lg text-[#1a1a1a]/80 leading-relaxed mb-8">{data.desc}</p>

          <div className="rounded-[2rem] bg-[#e4e4d0] p-7 sm:p-9 mb-8 space-y-3">
            {data.bullets.map((b) => (
              <div key={b} className="flex items-center gap-3 text-base font-semibold">
                <span className="w-6 h-6 rounded-full bg-[#034f46] text-[#ffffeb] flex items-center justify-center shrink-0">
                  <Check className="w-3.5 h-3.5" />
                </span>
                <span>{b}</span>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-3">
            <Button size="lg" onClick={onOpenDownload}>
              Download for free
            </Button>
            <AppLink to="/demo">
              <Button variant="secondary" size="lg">
                Try interactive demo
              </Button>
            </AppLink>
          </div>
        </div>
      </Container>
    </div>
  );
};

const BLOG_POSTS = [
  {
    category: 'Product Updates',
    title: 'Wispr Flow Notetaker is now on Windows',
    author: 'Tanay Kothari',
    date: 'Sep 15, 2026',
    read: '5 min',
    summary: 'Bringing bot-free meeting capture, named speakers, and actionable summaries to every Windows desktop.',
  },
  {
    category: 'Company',
    title: 'Our Series B, and what it means for you',
    author: 'Tanay Kothari',
    date: 'Aug 17, 2026',
    read: '5 min',
    summary: 'Wispr raises $81M to build the Voice OS across desktop, mobile, and intelligent workflows.',
  },
  {
    category: 'Engineering',
    title: 'Introducing Wispr Advanced Interfaces Lab',
    author: 'Ariya Rastrow',
    date: 'Jul 24, 2026',
    read: '4 min',
    summary: 'Moving beyond voice-to-voice systems toward intent-driven, context-aware Voice In, UI Out interfaces.',
  },
];

export const ResourceOrCompanyPage: React.FC<{ path: string; onOpenDownload: () => void }> = ({
  path,
  onOpenDownload,
}) => {
  const [blogFilter, setBlogFilter] = useState('All');

  if (path === '/blog') {
    const categories = ['All', 'Product Updates', 'Company', 'Engineering'];
    const filtered =
      blogFilter === 'All'
        ? BLOG_POSTS
        : BLOG_POSTS.filter((p) => p.category === blogFilter);

    return (
      <div className="bg-[#ffffeb] text-[#1a1a1a] py-12 sm:py-20">
        <Container>
          <div className="max-w-5xl mx-auto">
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#034f46] mb-3">
              Inside Flow Blog
            </p>
            <h1 className="font-display text-5xl sm:text-6xl leading-[0.94] mb-8">
              Stories, releases, and <em className="italic font-normal">voice research.</em>
            </h1>

            <div className="flex flex-wrap gap-2 mb-10">
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setBlogFilter(cat)}
                  className={`px-4 py-2 rounded-full text-xs font-bold cursor-pointer ${
                    blogFilter === cat
                      ? 'bg-[#1a1a1a] text-[#ffffeb]'
                      : 'bg-[#e4e4d0] text-[#1a1a1a]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {filtered.map((post) => (
                <article
                  key={post.title}
                  className="rounded-[1.75rem] bg-[#e4e4d0] p-6 flex flex-col justify-between gap-4 border border-[#1a1a1a]/10"
                >
                  <div>
                    <div className="text-xs font-semibold text-[#034f46] mb-2">
                      {post.category} · {post.date}
                    </div>
                    <h2 className="font-display text-2xl leading-snug mb-3">{post.title}</h2>
                    <p className="text-sm text-[#1a1a1a]/75 leading-relaxed">{post.summary}</p>
                  </div>
                  <div className="text-xs font-medium text-[#1a1a1a]/60">
                    {post.author} · {post.read} read
                  </div>
                </article>
              ))}
            </div>
          </div>
        </Container>
      </div>
    );
  }

  const pageMeta: Record<string, { kicker: string; title: string; body: string }> = {
    '/about': {
      kicker: 'About Wispr Flow',
      title: 'The Voice Interface Company.',
      body: 'We are a team of designers, AI researchers, and engineers rethinking how humans interact with technology — moving from screen-first typing to effortless voice-first experiences.',
    },
    '/careers': {
      kicker: 'Careers',
      title: 'Build magical experiences with us.',
      body: 'Join our distributed engineering, speech research, and product design teams building the Voice OS across macOS, Windows, iOS, and Android.',
    },
    '/media-kit': {
      kicker: 'Media Kit',
      title: 'Wispr Flow Brand Assets.',
      body: 'Download official Flow wordmarks, soundwave emblems, product screenshots, and press guidance for editorial coverage.',
    },
    '/ai-prompting-guide': {
      kicker: 'AI Prompting Guide',
      title: 'Speak richer prompts to Claude, ChatGPT & Cursor.',
      body: 'People give 3x more context when they speak than when they type — unlocking dramatically better first-pass AI outputs without prompt fatigue.',
    },
    '/vibe-coding': {
      kicker: 'Vibe Coding',
      title: 'Build software at the speed of conversation.',
      body: 'Describe product behavior, edge cases, and UI details naturally in Cursor, Windsurf, or Claude Code without breaking creative momentum.',
    },
    '/workflows': {
      kicker: 'Workflows',
      title: 'Voice workflows for every app.',
      body: 'Combine custom snippets, app-specific tone presets, and shared team dictionaries to eliminate repetitive typing across Slack, Linear, Notion, and Gmail.',
    },
    '/whats-new': {
      kicker: "What's New",
      title: 'Latest Flow & Notetaker releases.',
      body: 'Wispr Flow Notetaker is now live on both Windows and Mac, alongside faster multilingual switching and team shared dictionaries.',
    },
  };

  const info = pageMeta[path] || pageMeta['/about'];

  return (
    <div className="bg-[#ffffeb] text-[#1a1a1a] py-12 sm:py-20">
      <Container>
        <div className="max-w-3xl mx-auto space-y-6">
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#034f46]">
            {info.kicker}
          </p>
          <h1 className="font-display text-5xl sm:text-6xl leading-[0.94]">{info.title}</h1>
          <p className="text-lg text-[#1a1a1a]/80 leading-relaxed">{info.body}</p>
          <div className="pt-2 flex flex-wrap gap-3">
            <Button size="lg" onClick={onOpenDownload}>
              Download for free
            </Button>
            <AppLink to="/demo">
              <Button variant="secondary" size="lg">
                Try interactive demo
              </Button>
            </AppLink>
          </div>
        </div>
      </Container>
    </div>
  );
};
