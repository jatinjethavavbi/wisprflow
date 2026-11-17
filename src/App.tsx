import React, { useEffect, useState } from 'react';
import { RouterProvider, useRouter } from './context/RouterContext';
import { ScrollTrigger } from './hooks/useGsapAnimations';
import { AnnouncementBar } from './sections/AnnouncementBar/AnnouncementBar';
import { Navbar } from './sections/Navbar/Navbar';
import { Footer } from './sections/Footer/Footer';
import { DownloadModal } from './components/Modals';
import { PrivacyPreferencesWidget } from './components/PrivacySettingsModal';
import { Home } from './pages/Home';
import { NotetakerPage } from './pages/NotetakerPage';
import { BusinessPage } from './pages/BusinessPage';
import { PricingPage } from './pages/PricingPage';
import { LabPage } from './pages/LabPage';
import { DemoPage, WhyFlowPage } from './pages/DemoAndWhyPages';
import {
  GetStartedPage,
  MicrophonesPage,
  PrivacyTrustPage,
} from './pages/PrivacyAndGetStartedPages';
import {
  CaseStudiesPage,
  PersonaPage,
  ResourceOrCompanyPage,
} from './pages/CaseStudiesAndPersonasPages';

const PERSONA_ROUTES = new Set([
  '/leaders',
  '/developers',
  '/marketers',
  '/content-creators',
  '/customer-support',
  '/students',
  '/lawyers',
  '/accessibility',
  '/sales',
]);

const AppShell: React.FC = () => {
  const { pathname } = useRouter();
  const [downloadOpen, setDownloadOpen] = useState(false);
  const [downloadMode, setDownloadMode] = useState<'dictation' | 'notetaker'>('dictation');

  useEffect(() => {
    const id = window.requestAnimationFrame(() => {
      ScrollTrigger.refresh();
    });
    return () => window.cancelAnimationFrame(id);
  }, [pathname]);

  const openDownload = (mode: 'dictation' | 'notetaker' = 'dictation') => {
    setDownloadMode(mode);
    setDownloadOpen(true);
  };

  const renderPage = () => {
    const cleanPath = pathname === '/' ? '/' : pathname.replace(/\/+$/, '');

    if (cleanPath === '/') {
      return <Home onOpenDownload={() => openDownload('dictation')} />;
    }
    if (cleanPath === '/notetaker' || cleanPath === '/notetaker-resources') {
      return (
        <NotetakerPage
          onOpenDownload={(m) => openDownload(m || 'notetaker')}
          isResources={cleanPath === '/notetaker-resources'}
        />
      );
    }
    if (cleanPath === '/business' || cleanPath === '/talk-to-sales') {
      return (
        <BusinessPage
          onOpenDownload={() => openDownload('dictation')}
          focusSalesForm={cleanPath === '/talk-to-sales'}
        />
      );
    }
    if (cleanPath === '/pricing') {
      return <PricingPage onOpenDownload={() => openDownload('dictation')} />;
    }
    if (cleanPath === '/lab') {
      return <LabPage />;
    }
    if (cleanPath === '/demo') {
      return <DemoPage onOpenDownload={() => openDownload('dictation')} />;
    }
    if (cleanPath === '/why-flow') {
      return <WhyFlowPage competitor="builtin" onOpenDownload={() => openDownload('dictation')} />;
    }
    if (cleanPath === '/flow-vs-apple-dictation') {
      return <WhyFlowPage competitor="apple" onOpenDownload={() => openDownload('dictation')} />;
    }
    if (cleanPath === '/flow-vs-gboard-typing') {
      return <WhyFlowPage competitor="gboard" onOpenDownload={() => openDownload('dictation')} />;
    }
    if (cleanPath === '/privacy') {
      return <PrivacyTrustPage section="trust" />;
    }
    if (cleanPath === '/privacy-policy') {
      return <PrivacyTrustPage section="privacy-policy" />;
    }
    if (cleanPath === '/data-controls') {
      return <PrivacyTrustPage section="data-controls" />;
    }
    if (cleanPath === '/terms-of-service') {
      return <PrivacyTrustPage section="terms" />;
    }
    if (cleanPath === '/bug-bounty') {
      return <PrivacyTrustPage section="bug-bounty" />;
    }
    if (cleanPath === '/support') {
      return <PrivacyTrustPage section="support" />;
    }
    if (cleanPath === '/get-started' || cleanPath === '/login') {
      return <GetStartedPage />;
    }
    if (cleanPath === '/microphones') {
      return <MicrophonesPage onOpenDownload={() => openDownload('dictation')} />;
    }
    if (cleanPath === '/case-studies') {
      return <CaseStudiesPage slug="all" />;
    }
    if (cleanPath === '/case-study/steven-bartlett') {
      return <CaseStudiesPage slug="steven-bartlett" />;
    }
    if (cleanPath === '/case-study/clay') {
      return <CaseStudiesPage slug="clay" />;
    }
    if (PERSONA_ROUTES.has(cleanPath)) {
      return <PersonaPage path={cleanPath} onOpenDownload={() => openDownload('dictation')} />;
    }
    if (
      [
        '/about',
        '/careers',
        '/media-kit',
        '/blog',
        '/ai-prompting-guide',
        '/workflows',
        '/whats-new',
        '/vibe-coding',
      ].includes(cleanPath)
    ) {
      return (
        <ResourceOrCompanyPage
          path={cleanPath}
          onOpenDownload={() => openDownload('dictation')}
        />
      );
    }

    return <Home onOpenDownload={() => openDownload('dictation')} />;
  };

  const cleanPath = pathname === '/' ? '/' : pathname.replace(/\/+$/, '');
  const isNotetakerRoute =
    cleanPath === '/notetaker' || cleanPath === '/notetaker-resources';

  return (
    <div className="min-h-screen bg-[#ffffeb] text-[#1a1a1a] flex flex-col">
      {!isNotetakerRoute && <AnnouncementBar />}
      <Navbar onOpenDownload={() => openDownload('dictation')} />
      <main className="flex-1">{renderPage()}</main>
      <Footer onOpenDownload={openDownload} />
      <DownloadModal
        isOpen={downloadOpen}
        onClose={() => setDownloadOpen(false)}
        initialMode={downloadMode}
      />
      <PrivacyPreferencesWidget />
    </div>
  );
};

export default function App() {
  return (
    <RouterProvider>
      <AppShell />
    </RouterProvider>
  );
}
