## Hardal Social Case – Remotion Video

A production-ready Remotion composition that renders a marketing explainer video for Hardal. The video targets marketers and showcases why to use Hardal using animated scenes, charts, and UI sequences.

**About Hardal**

- **Hardal**: A server-side measurement platform that connects your first‑party data from any source to any destination for websites and mobile apps. It enables lossless data collection and orchestration for both web and app.
- **Switch**: The product of Hardal, Inc.

Repository: [elendmire/hardal-remotion](https://github.com/elendmire/hardal-remotion)

## Quickstart

1) Install dependencies
```bash
npm i
```

2) Start Remotion Studio (preview in the browser)
```bash
npm run dev
```

3) Render the video (CLI)
- MP4 (H.264):
```bash
npx remotion render HardalMarketing out/hardal.mp4 --codec=h264 --concurrency=8
```
- WebM (VP9):
```bash
npx remotion render HardalMarketing out/hardal.webm --codec=vp9 --concurrency=8
```

## Composition and Props

The root composition is `HardalMarketing`. You can customize brand colors, segment durations, metrics, and destination list via `defaultProps` in `src/Root.tsx`.

```26:61:/Users/farukavci/Documents/codebase/hard_all/hardal-remotion/src/Root.tsx
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
```

### Scene Overview

- `src/scenes/TabsChaos.tsx`: Animated tabs chaos intro with UI motifs and brand vignette.
- `src/scenes/Intro.tsx`: Branded title and opening message for why Hardal.
- `src/scenes/MetricsScene.tsx`: Advanced attribution summary and campaign table.
- `src/scenes/TrafficOverviewScene.tsx`: Animated line/area chart of traffic and page views.
- `src/scenes/ReferrersAnalyticsScene.tsx`: KPI cards and top referrers table.
- `src/scenes/DestinationsScene.tsx`: Destination cards (GA4, Ads, Meta CAPI, TikTok, BigQuery, etc.).
- `src/scenes/BenefitsScene.tsx`: Problems vs. Hardal solution, comparisons, and benefits.
- `src/scenes/HardalSolutionScene.tsx`: Product value proposition in a focused frame.
- `src/scenes/CTA.tsx`: Call‑to‑action closing frame.

## How to Customize

- **Branding**: Edit `brand` colors and typography in `src/Root.tsx` and `src/compositions/HardalMarketing.tsx`.
- **Durations**: Modify `segmentDurations` in `src/Root.tsx` to change each scene length; total duration is auto‑summed.
- **Metrics**: Tweak `metrics` in `defaultProps` for counts shown in scenes.
- **Destinations**: Update the `destinations` list to show your preferred integrations.

```9:23:/Users/farukavci/Documents/codebase/hard_all/hardal-remotion/src/Root.tsx
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
```

## Development

- Lint: `npm run lint`
- Upgrade Remotion: `npm run upgrade`
- Public assets live under `public/` and are referenced inside scenes.

## License

UNLICENSED. © 2025 Hardal, Inc. All rights reserved.

## Acknowledgements

- Built with [Remotion](https://www.remotion.dev)

<p align="center">
  <a href="https://github.com/remotion-dev/logo">
    <picture>
      <source media="(prefers-color-scheme: dark)" srcset="https://github.com/remotion-dev/logo/raw/main/animated-logo-banner-dark.gif">
      <img alt="Animated Remotion Logo" src="https://github.com/remotion-dev/logo/raw/main/animated-logo-banner-light.gif">
    </picture>
  </a>
</p>



## Commands

**Install Dependencies**

```console
npm i
```

**Start Preview**

```console
npm run dev
```

**Render video**

```console
npx remotion render
```

**Upgrade Remotion**

```console
npx remotion upgrade
```

## Docs

Get started with Remotion by reading the [fundamentals page](https://www.remotion.dev/docs/the-fundamentals).

## Help

We provide help on our [Discord server](https://discord.gg/6VzzNDwUwV).

## Issues

Found an issue with Remotion? [File an issue here](https://github.com/remotion-dev/remotion/issues/new).

## License

Note that for some entities a company license is needed. [Read the terms here](https://github.com/remotion-dev/remotion/blob/main/LICENSE.md).
