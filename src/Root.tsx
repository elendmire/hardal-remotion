import { Composition } from 'remotion';
import { HardalMarketing } from './compositions/HardalMarketing';

export const RemotionRoot = () => {
  const width = 1920;
  const height = 1080;
  const fps = 30;

  // Total duration in frames. Update segment durations to match your target length.
  // Default: ~90 seconds
  const segmentDurations = {
    tabsChaos: 9 * fps,
    intro: 8 * fps,
    metrics: 165,
    trafficOverview: 8 * fps,
    referrersAnalytics: 10 * fps,
    destinations: 10 * fps,
    benefits: 14 * fps,
    hardalSolution: 8 * fps,
    cta: 12 * fps,
  } as const;
  const durationInFrames = Object.values(segmentDurations).reduce((a, b) => a + b, 0);

  return (
    <>
      <Composition
        id="HardalMarketing"
        component={HardalMarketing}
        durationInFrames={durationInFrames}
        fps={fps}
        width={width}
        height={height}
        defaultProps={{
          segmentDurations,
          brand: {
            name: 'Hardal',
            primary: '#141020',
            accent: '#E1FF82',
            bg: '#141020',
            text: '#FFFFFF',
            subtle: '#FFFFFF',
          },
          metrics: {
            visitors: 22,
            pageViews: 438,
            bounceRate: 0,
            totalEvents: 10321,
          },
          destinations: [
            'Google Analytics 4',
            'Google Ads Offline Conversions',
            'Meta Conversions API',
            'TikTok Events API',
            'BigQuery',
            'Firebase',
            'Adjust',
            'AppsFlyer',
            'Slack',
            'Zapier',
          ],
        }}
      />
    </>
  );
};