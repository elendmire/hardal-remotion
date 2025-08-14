import React from 'react';
import { AbsoluteFill, useCurrentFrame, staticFile, spring, useVideoConfig, interpolate, Easing } from 'remotion';
import { Brand } from '../compositions/HardalMarketing';

type IconName = 'ads' | 'ga4' | 'mmp' | 'sheet' | 'webhook' | 'cdp';

const renderIcon = (name: IconName) => {
  const size = 26;
  switch (name) {
    case 'ads':
      // Megaphone
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
          <path d="M3 10v4a2 2 0 0 0 2 2h2l2 3h2l-2-3h2a6 6 0 0 0 6-6V6a1 1 0 0 0-1.6-.8L10 10H5a2 2 0 0 0-2 2Z"/>
        </svg>
      );
    case 'ga4':
      // Bars with dot
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
          <rect x="3" y="10" width="3" height="11" rx="1"/>
          <rect x="9" y="6" width="3" height="15" rx="1"/>
          <rect x="15" y="13" width="3" height="8" rx="1"/>
          <circle cx="19.5" cy="5.5" r="2.5"/>
        </svg>
      );
    case 'mmp':
      // Mobile device
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
          <rect x="7" y="2" width="10" height="20" rx="2"/>
          <rect x="10" y="18" width="4" height="2" rx="1" fill="#00000055"/>
        </svg>
      );
    case 'sheet':
      // Spreadsheet sheet
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
          <path d="M6 2h9l5 5v15a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2Zm8 1.5V8h4.5"/>
          <path d="M7 12h10M7 16h10M7 20h10" stroke="#00000055" strokeWidth="1.5"/>
        </svg>
      );
    case 'webhook':
      // Webhook swirl
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 3a5 5 0 0 1 5 5 5 5 0 0 1-1 3l-1.6-1.2A3 3 0 1 0 9 11l2.4 4.2A4.5 4.5 0 1 1 8 20l.9-1.8A2.5 2.5 0 1 0 11 17l-2.4-4.1A5 5 0 0 1 12 3Z"/>
        </svg>
      );
    case 'cdp':
      // Globe
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
          <circle cx="12" cy="12" r="9"/>
          <path d="M3 12h18M12 3c3.5 3.8 3.5 13.2 0 18M7 5c2 .8 8 .8 10 0M7 19c2-.8 8-.8 10 0" fill="#00000055"/>
        </svg>
      );
  }
};

// removed old Tab component (replaced by NotificationTile)

const MacWindowBackground: React.FC<{ brand: Brand }> = ({ brand }) => {
  const chromeHeight = 44;
  const src = staticFile('hardal-dashboard.jpg');
  return (
    <div
      style={{
        position: 'absolute',
        inset: '6% 6% 10% 6%',
        borderRadius: 22,
        background: 'linear-gradient(180deg, #0f172a, #111827)',
        boxShadow: '0 50px 120px rgba(0,0,0,0.5), inset 0 1px rgba(255,255,255,0.06)',
        border: '1px solid rgba(255,255,255,0.08)',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          height: chromeHeight,
          display: 'flex',
          alignItems: 'center',
          padding: '0 14px',
          gap: 10,
          background: 'linear-gradient(180deg, rgba(255,255,255,0.08), rgba(255,255,255,0.02))',
          borderBottom: '1px solid rgba(255,255,255,0.08)'
        }}
      >
        <div style={{ display: 'flex', gap: 8 }}>
          <div style={{ width: 10, height: 10, borderRadius: 999, background: '#ef4444' }} />
          <div style={{ width: 10, height: 10, borderRadius: 999, background: '#f59e0b' }} />
          <div style={{ width: 10, height: 10, borderRadius: 999, background: '#22c55e' }} />
        </div>
        <div
          style={{
            marginLeft: 10,
            flex: 1,
            height: 28,
            borderRadius: 8,
            background: 'rgba(255,255,255,0.06)',
            border: '1px solid rgba(255,255,255,0.08)'
          }}
        />
      </div>
      <div style={{ position: 'absolute', top: chromeHeight, left: 0, right: 0, bottom: 0 }}>
        {/* Background screenshot */}
        <img
          src={src}
          alt="Hardal Dashboard"
          style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top', filter: 'saturate(1.02)' }}
        />
      </div>
    </div>
  );
};

const VignetteAndLightSweep: React.FC = () => {
  const frame = useCurrentFrame();
  const sweepX = interpolate(frame, [0, 240], [-600, 600], { easing: Easing.inOut(Easing.cubic) });
  return (
    <>
      {/* Light sweep only; vignette disabled */}
      <AbsoluteFill
        style={{
          pointerEvents: 'none',
          background:
            'linear-gradient(115deg, transparent 35%, rgba(225,255,130,0.08) 50%, transparent 65%)',
          transform: `translateX(${sweepX}px)`,
          mixBlendMode: 'screen',
        }}
      />
    </>
  );
};

const Dust: React.FC = () => {
  const frame = useCurrentFrame();
  const dots = new Array(14).fill(0).map((_, i) => i);
  const rand = (s: number) => {
    const x = Math.sin(s * 12.9898 + 78.233) * 43758.5453;
    return x - Math.floor(x);
  };
  return (
    <AbsoluteFill style={{ pointerEvents: 'none' }}>
      {dots.map((i) => {
        const baseX = rand(i + 1) * 100;
        const baseY = rand(i + 2) * 100;
        const driftX = Math.sin((frame + i * 15) / 240) * 6;
        const driftY = Math.cos((frame + i * 15) / 260) * 8;
        const size = 2 + rand(i + 3) * 3;
        const opacity = 0.06 + rand(i + 4) * 0.08;
        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: `calc(${baseX}% + ${driftX}px)`,
              top: `calc(${baseY}% + ${driftY}px)`,
              width: size * 2,
              height: size * 2,
              borderRadius: 9999,
              background: '#FFFFFF',
              filter: 'blur(2px)',
              opacity,
            }}
          />
        );
      })}
    </AbsoluteFill>
  );
};

const NotificationTile: React.FC<{
  title: string;
  primaryValue: string;
  primaryLabel: string;
  secondaryText: string;
  icon: IconName;
  brand: Brand;
  index: number;
  topPx: number;
  widthPx: number;
  heightPx: number;
}>
= ({ title, primaryValue, primaryLabel, secondaryText, icon, brand, index, topPx, widthPx, heightPx }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const appearStart = 10 + index * 28;
  const inProgress = spring({ frame: frame - appearStart, fps, config: { damping: 200, stiffness: 150 } });

  const appear = Math.min(1, Math.max(0, inProgress));
  const alpha = appear;
  // Add subtle rotation and a settling bounce for more character
  const tx = (1 - appear) * 60;
  const ty = (1 - appear) * -20;
  const settle = Math.sin(appear * Math.PI) * 0.015 * (1 - appear);
  const scale = 0.98 + appear * 0.02 + settle;
  const rotate = (1 - appear) * 6; // degrees

  return (
    <div
      style={{
        position: 'absolute',
        right: '4%',
        top: topPx,
        transform: `translate(${tx}px, ${ty}px) scale(${scale})`,
        opacity: alpha,
      }}
    >
      {/* Reuse visual of Tab without absolute/left/top positioning */}
      <div
        style={{
          width: widthPx,
          height: heightPx,
          borderRadius: 22,
          // shadcn-like surface: card background with subtle border and shadow
          background: 'rgba(20,16,32,0.8)',
          border: '1px solid rgba(255,255,255,0.12)',
          boxShadow: '0 12px 28px rgba(0,0,0,0.45), 0 1px 0 rgba(255,255,255,0.04) inset',
          display: 'inline-flex',
          alignItems: 'center',
          gap: 14,
          padding: '12px 16px',
          backdropFilter: 'blur(14px) saturate(1.3)',
          WebkitBackdropFilter: 'blur(14px) saturate(1.3)',
          transform: `rotate(${rotate}deg)`
        }}
      >
        <div
          style={{
            width: Math.max(44, Math.min(54, Math.round(heightPx * 0.45))),
            height: Math.max(44, Math.min(54, Math.round(heightPx * 0.45))),
            borderRadius: 14,
            display: 'grid',
            placeItems: 'center',
            alignSelf: 'flex-start',
            color: brand.accent,
            background: `linear-gradient(135deg, ${brand.text}22, ${brand.text}11)`,
            border: `1px solid ${brand.text}33`,
            boxShadow: 'inset 0 1px rgba(255,255,255,0.25)'
          }}
        >
          {renderIcon(icon)}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4, flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 16, fontWeight: 700, color: brand.text, opacity: 0.9, letterSpacing: 0.2, fontFamily: 'Inter, Poppins, ui-sans-serif, system-ui' }}>
            {title}
          </div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, color: brand.text, fontFamily: 'Poppins, Inter, ui-sans-serif, system-ui' }}>
            <span style={{ fontSize: Math.round(heightPx * 0.24), fontWeight: 800, color: brand.accent }}>
              {primaryValue}
            </span>
            <span style={{ fontSize: Math.round(heightPx * 0.18), fontWeight: 700 }}>{primaryLabel}</span>
          </div>
          <div
            style={{
              color: brand.text,
              opacity: 0.9,
              fontSize: Math.round(heightPx * 0.14),
              lineHeight: 1.25,
              wordWrap: 'break-word',
              whiteSpace: 'normal',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden'
            }}
          >
            {secondaryText}
          </div>
        </div>
        <div style={{ width: 22, height: 22, marginLeft: 8, marginTop: 4, opacity: 0.8, color: brand.subtle, flex: '0 0 auto' }}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
            <rect x="4" y="6" width="16" height="2" rx="1"/>
            <rect x="4" y="11" width="16" height="2" rx="1"/>
            <rect x="4" y="16" width="16" height="2" rx="1"/>
          </svg>
        </div>
      </div>
    </div>
  );
};

export const TabsChaos: React.FC<{ brand: Brand }> = ({ brand }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const items = [
    {
      title: 'Ads Manager',
      primaryValue: '13.0k',
      primaryLabel: 'views',
      secondaryText: 'CTR 2.1% • CPA $4.20',
      icon: 'ads' as const,
    },
    {
      title: 'GA4 DebugView',
      primaryValue: '47',
      primaryLabel: 'events/min',
      secondaryText: '2 missing conversions • 1 duplicate',
      icon: 'ga4' as const,
    },
    {
      title: 'MMP Dashboard',
      primaryValue: '1.2k',
      primaryLabel: 'installs',
      secondaryText: 'ROAS 145% • D1 retention 32%',
      icon: 'mmp' as const,
    },
    {
      title: 'Sheet of UTMs',
      primaryValue: '420',
      primaryLabel: 'rows',
      secondaryText: '12 malformed tags • 5 missing sources',
      icon: 'sheet' as const,
    },
    {
      title: 'Webhook Logs',
      primaryValue: '99.1%',
      primaryLabel: 'delivered',
      secondaryText: '4 failures in last hour • median 320ms',
      icon: 'webhook' as const,
    },
    {
      title: 'CDP Destinations',
      primaryValue: '12',
      primaryLabel: 'active',
      secondaryText: '2 paused • sync latency 3.2s',
      icon: 'cdp' as const,
    },
  ];

  return (
    <AbsoluteFill>
      {/* Background window with Hardal interface screenshot */}
      <MacWindowBackground brand={brand} />
      <VignetteAndLightSweep />
      <Dust />

      {/* Mac notification-like tiles */}
      {items.map((t, i) => {
        // Responsive stacking with small gap. Tile size scales down slightly per row.
        const baseWidth = 440;
        const baseHeight = 120;
        const gap = 10;
        const widthPx = baseWidth;
        const heightPx = baseHeight;
        const topPx = 70 + i * (heightPx + gap);
        return (
          <NotificationTile
            key={i}
            title={t.title}
            primaryValue={t.primaryValue}
            primaryLabel={t.primaryLabel}
            secondaryText={t.secondaryText}
            icon={t.icon}
            brand={brand}
            index={i}
            topPx={topPx}
            widthPx={widthPx}
            heightPx={heightPx}
          />
        );
      })}
      {(() => {
        // Show headline after every 5 notifications have appeared, then keep it visible once
        const STAGGER = 28; // must match NotificationTile stagger
        const FIRST_DELAY = 10;
        const shownCount = Math.max(0, Math.floor((frame - FIRST_DELAY) / STAGGER) + 1);
        // Trigger only the FIRST time 5 have appeared
        if (shownCount < 5) return null;
        const lastTriggerStart = FIRST_DELAY + ((5 - 1) * STAGGER);
        const local = frame - lastTriggerStart;
        const enter = spring({ frame: local, fps, config: { damping: 200, stiffness: 160 } });
        const alpha = Math.min(1, enter);
        const ty = (1 - alpha) * 24;
        const scale = 0.985 + alpha * 0.015;

        return (
          <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center', pointerEvents: 'none', opacity: alpha, transform: `translateY(${ty}px) scale(${scale})` }}>
            <div
              style={{
                padding: '24px 34px',
                borderRadius: 28,
                background: 'linear-gradient(135deg, rgba(20,16,32,0.82), rgba(20,16,32,0.74))',
                border: '1px solid rgba(255,255,255,0.24)',
                boxShadow: '0 18px 56px rgba(0,0,0,0.6), inset 0 1px rgba(255,255,255,0.08)',
                backdropFilter: 'blur(40px) saturate(1.4)',
                WebkitBackdropFilter: 'blur(40px) saturate(1.4)',
                color: '#ffffff',
                maxWidth: 1250,
              }}
            >
              <div style={{ fontSize: 62, fontWeight: 900, letterSpacing: 0.2, textAlign: 'center', lineHeight: 1.18 }}>
                Marketer day in tabs. Context switching burns time.<br/>Attribution breaks.
              </div>
            </div>
          </AbsoluteFill>
        );
      })()}
    </AbsoluteFill>
  );
};