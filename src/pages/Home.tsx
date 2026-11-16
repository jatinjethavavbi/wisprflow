import React from 'react';
import { Hero } from '../sections/Hero/Hero';
import { TrustedBy } from '../sections/TrustedBy/TrustedBy';
import { SpeedToFlowStage } from '../sections/SpeedToFlowStage/SpeedToFlowStage';
import { Personalization } from '../sections/Personalization/Personalization';
import { Privacy } from '../sections/Privacy/Privacy';
import { Testimonials } from '../sections/Testimonials/Testimonials';
import { FAQ } from '../sections/FAQ/FAQ';
import { FinalCTA } from '../sections/FinalCTA/FinalCTA';

interface HomeProps {
  onOpenDownload: () => void;
}

export const Home: React.FC<HomeProps> = ({ onOpenDownload }) => {
  return (
    <>
      <Hero activeMode="dictation" onOpenDownload={onOpenDownload} />
      <TrustedBy />
      <SpeedToFlowStage />
      <Personalization />
      <Privacy />
      <Testimonials />
      <FAQ />
      <FinalCTA onOpenDownload={onOpenDownload} />
    </>
  );
};
