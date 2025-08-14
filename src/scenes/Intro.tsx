import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate, Easing, spring, useVideoConfig, staticFile } from 'remotion';
import { Brand } from '../compositions/HardalMarketing';

export const Intro: React.FC<{ brand: Brand }> = ({ brand }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Overall container animation (subtle pop like product bump)
  const popIn = spring({ frame, fps, config: { damping: 180, stiffness: 120 } });
  const scale = 0.92 + popIn * 0.08; // 0.92 -> 1.0
  const opacity = interpolate(frame, [0, 10], [0, 1]);

  const title = 'Hardal';
  const letters = title.split('');
  const subtitleText = 'Server-side measurement for first-party data';
  const subtitleWords = subtitleText.split(' ');
  const descText = 'Connect first-party data from any source to any destination for web and mobile';
  const logoSrc = staticFile('hardal-logo-white.png');

  return (
    <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ textAlign: 'center', transform: `scale(${scale})`, opacity, position: 'relative' }}>
        {/* Big animated brand title with per-letter motion and shimmer sweep */}
        <div style={{ fontSize: 120, fontWeight: 900, color: '#FFFFFF', letterSpacing: 1, position: 'relative', display: 'inline-block' }}>
          {letters.map((ch, i) => {
            const appear = spring({ frame: frame - i * 3, fps, config: { damping: 180, stiffness: 160 } });
            const y = (1 - Math.min(1, appear)) * 40;
            const skew = (1 - Math.min(1, appear)) * -8;
            const blur = 6 * (1 - Math.min(1, appear));
            const opacityLetter = Math.min(1, appear);
            return (
              <span
                key={i}
                style={{
                  display: 'inline-block',
                  transform: `translateY(${y}px) skewY(${skew}deg)`,
                  filter: `blur(${blur}px)`,
                  opacity: opacityLetter,
                  willChange: 'transform, filter, opacity',
                }}
              >
                {ch}
              </span>
            );
          })}
          {/* Shimmer sweep */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              pointerEvents: 'none',
              background:
                'linear-gradient(115deg, transparent 20%, rgba(225,255,130,0.12) 40%, rgba(225,255,130,0.22) 50%, rgba(225,255,130,0.12) 60%, transparent 80%)',
              mixBlendMode: 'screen',
              transform: `translateX(${interpolate(frame, [0, 90], [-400, 400], { easing: Easing.inOut(Easing.cubic) })}px)`,
            }}
          />
        </div>

        {/* Subtitle: staggered word flip-in while title finishes (forced 2 lines) */}
        <div style={{ marginTop: 26, fontSize: 56, color: '#E5E7EB', fontWeight: 700, perspective: 800, lineHeight: 1.15 }}>
          {subtitleWords.map((w, i) => {
            const prog = spring({ frame: frame - (16 + i * 2), fps, config: { damping: 170, stiffness: 140 } });
            const p = Math.min(1, Math.max(0, prog));
            const ty = (1 - p) * 26;
            const rx = (1 - p) * 22; // rotateX flip
            const blur = 6 * (1 - p);
            return (
              <React.Fragment key={i}>
                <span
                  style={{
                    display: 'inline-block',
                    transform: `translateY(${ty}px) rotateX(${rx}deg)`,
                    transformOrigin: 'bottom',
                    filter: `blur(${blur}px)`,
                    opacity: p,
                    willChange: 'transform, filter, opacity',
                    marginRight: 10,
                  }}
                >
                  {w}
                </span>
                {i === 1 && <br />}
              </React.Fragment>
            );
          })}
        </div>

        {/* Description: center-out wipe with slight tracking animation */}
        {(() => {
          const p = Math.min(1, spring({ frame: frame - 32, fps, config: { damping: 180, stiffness: 150 } }));
          const inset = (1 - p) * 50; // percent from left/right
          const track = 0.6 * (1 - p); // letter spacing effect
          const blur = 8 * (1 - p);
          return (
            <div
              style={{
                marginTop: 20,
                fontSize: 28,
                color: brand.subtle,
                maxWidth: 1100,
                marginInline: 'auto',
                lineHeight: 1.5,
                clipPath: `inset(0% ${inset}% 0% ${inset}%)`,
                letterSpacing: `${track}px`,
                filter: `blur(${blur}px)`,
                opacity: p,
              }}
            >
              {descText}
            </div>
          );
        })()}

        {/* Ambient motion blobs behind content */}
        <div
          style={{
            position: 'absolute',
            top: -140,
            left: -260,
            width: 600,
            height: 600,
            borderRadius: 9999,
            background: 'radial-gradient(closest-side, rgba(225,255,130,0.18), transparent)',
            filter: 'blur(30px)',
            transform: `translateY(${interpolate(frame, [0, 240], [40, -20], { easing: Easing.inOut(Easing.cubic) })}px)`
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: -180,
            right: -220,
            width: 540,
            height: 540,
            borderRadius: 9999,
            background: 'radial-gradient(closest-side, rgba(255,255,255,0.06), transparent)',
            filter: 'blur(26px)',
            transform: `translateY(${interpolate(frame, [0, 240], [-30, 30], { easing: Easing.inOut(Easing.cubic) })}px)`
          }}
        />
      </div>
      {/* Tiny centered logo near the bottom */}
      <img
        src={logoSrc}
        alt="Hardal logo"
        style={{
          position: 'absolute',
          bottom: 48,
          left: '50%',
          transform: `translateX(-50%) scale(${0.9 + popIn * 0.1})`,
          width: 160,
          height: 'auto',
          opacity: interpolate(frame, [10, 30], [0, 1]),
          filter: 'drop-shadow(0 2px 8px rgba(0,0,0,0.35))',
          pointerEvents: 'none',
        }}
      />
    </AbsoluteFill>
  );
};