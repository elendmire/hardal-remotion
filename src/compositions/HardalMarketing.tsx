import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate, Easing, Sequence } from 'remotion';
import { TabsChaos } from '../scenes/TabsChaos';
import { Intro } from '../scenes/Intro';
import { MetricsScene } from '../scenes/MetricsScene';
import { TrafficOverviewScene } from '../scenes/TrafficOverviewScene';
import { ReferrersAnalyticsScene } from '../scenes/ReferrersAnalyticsScene';
import { DestinationsScene } from '../scenes/DestinationsScene';
import { BenefitsScene } from '../scenes/BenefitsScene';
import { HardalSolutionScene } from '../scenes/HardalSolutionScene';
import { CTA } from '../scenes/CTA';

export type Brand = {
  name: string;
  primary: string;
  accent: string;
  bg: string;
  text: string;
  subtle: string;
};

type Props = {
  segmentDurations: Record<string, number>;
  brand: Brand;
  metrics: { visitors: number; pageViews: number; bounceRate: number; totalEvents: number };
  destinations: string[];
};

export const HardalMarketing: React.FC<Props> = ({ segmentDurations, brand, metrics, destinations }) => {
  const frame = useCurrentFrame();
  const introFade = interpolate(frame, [0, 30], [0, 1], { extrapolateRight: 'clamp' });
  const bgGradientY = interpolate(frame, [0, 120], [0, 100], { easing: Easing.out(Easing.cubic) });

  let start = 0;
  const s = (k: keyof typeof segmentDurations) => {
    const from = start;
    start += segmentDurations[k];
    return { from, duration: segmentDurations[k] };
  };

  // Allocate sequential segments without gaps. Compute each only once.
  const segTabsChaos = s('tabsChaos');
  const segIntro = s('intro');
  const segMetrics = s('metrics');
  const segTrafficOverview = s('trafficOverview');
  const segReferrersAnalytics = s('referrersAnalytics');
  const segDestinations = s('destinations');
  const segBenefits = s('benefits');
  const segHardalSolution = s('hardalSolution');
  const segCta = s('cta');

  return (
    <AbsoluteFill style={{ backgroundColor: brand.bg, color: brand.text, fontFamily: 'Inter, Poppins, ui-sans-serif, system-ui' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;800&family=Poppins:wght@500;600;700&display=swap');
      `}</style>
      <AbsoluteFill style={{ background: `radial-gradient(1200px 600px at 50% ${50 + bgGradientY}%, rgba(124,58,237,0.2), transparent)` }} />

      <Sequence from={segTabsChaos.from} durationInFrames={segTabsChaos.duration}>
        <TabsChaos brand={brand} />
      </Sequence>

      <Sequence from={segIntro.from} durationInFrames={segIntro.duration}>
        <Intro brand={brand} />
      </Sequence>

      <Sequence from={segMetrics.from} durationInFrames={segMetrics.duration}>
        <MetricsScene brand={brand} />
      </Sequence>

      <Sequence from={segTrafficOverview.from} durationInFrames={segTrafficOverview.duration}>
        <TrafficOverviewScene brand={brand} />
      </Sequence>

      <Sequence from={segReferrersAnalytics.from} durationInFrames={segReferrersAnalytics.duration}>
        <ReferrersAnalyticsScene brand={brand} />
      </Sequence>

      <Sequence from={segDestinations.from} durationInFrames={segDestinations.duration}>
        <DestinationsScene brand={brand} destinations={destinations} />
      </Sequence>

      <Sequence from={segBenefits.from} durationInFrames={segBenefits.duration}>
        <BenefitsScene brand={brand} />
      </Sequence>

      <Sequence from={segHardalSolution.from} durationInFrames={segHardalSolution.duration}>
        <HardalSolutionScene brand={brand} />
      </Sequence>

      <Sequence from={segCta.from} durationInFrames={segCta.duration}>
        <CTA brand={brand} />
      </Sequence>

      <AbsoluteFill style={{ opacity: introFade, pointerEvents: 'none' }} />
    </AbsoluteFill>
  );
};