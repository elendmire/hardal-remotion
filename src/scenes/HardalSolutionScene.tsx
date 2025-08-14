import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate, spring, staticFile } from 'remotion';

type Brand = {
  name: string;
  accent: string;
  subtle: string;
};

export const HardalSolutionScene: React.FC<{ brand: Brand }> = ({ brand }) => {
  const f = useCurrentFrame();
  
  // Logo setup
  const logoSrc = staticFile('hardal-logo-white.png');
  
  // Logo animation (similar to second sequence but enhanced)
  const logoSpring = spring({ fps: 30, frame: f - 10, config: { damping: 120, stiffness: 200 } });
  const logoScale = interpolate(logoSpring, [0, 1], [0.7, 1]);
  const logoOpacity = interpolate(logoSpring, [0, 1], [0, 1]);
  const logoY = interpolate(logoSpring, [0, 1], [30, 0]);
  
  // Subtitle animation
  const subtitleSpring = spring({ fps: 30, frame: f - 30, config: { damping: 150, stiffness: 200 } });
  const subtitleY = interpolate(subtitleSpring, [0, 1], [20, 0]);
  const subtitleOpacity = interpolate(subtitleSpring, [0, 1], [0, 1]);
  
  // Content animation with proper stopping point
  const contentSpring = spring({ fps: 30, frame: f - 60, config: { damping: 180, stiffness: 150 } });
  const contentScale = interpolate(contentSpring, [0, 1], [0.9, 1]);
  const contentOpacity = interpolate(contentSpring, [0, 1], [0, 1]);
  const contentY = interpolate(contentSpring, [0, 1], [40, 0]);
  
  // Enhanced background animations with shine effects
  const shineRotation = interpolate(f, [0, 240], [0, 360]);
  const pulseEffect = interpolate(Math.sin(f * 0.1), [-1, 1], [0.8, 1.2]);
  
  // Floating orbs with different timings
  const orb1 = spring({ fps: 30, frame: f, config: { damping: 250, stiffness: 80 } });
  const orb2 = spring({ fps: 30, frame: f - 40, config: { damping: 200, stiffness: 100 } });
  const orb3 = spring({ fps: 30, frame: f - 80, config: { damping: 220, stiffness: 90 } });

  return (
    <AbsoluteFill
      style={{
        background: 'linear-gradient(135deg, #0c0a1e 0%, #1a1738 50%, #0c0a1e 100%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 60,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Enhanced shiny background effects */}
      <div
        style={{
          position: 'absolute',
          top: '20%',
          left: '10%',
          width: 400,
          height: 400,
          background: `radial-gradient(circle, ${brand.accent}20 0%, transparent 60%)`,
          borderRadius: '50%',
          transform: `scale(${orb1}) rotate(${shineRotation}deg)`,
          opacity: 0.7,
          filter: 'blur(2px)',
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: '10%',
          right: '15%',
          width: 300,
          height: 300,
          background: `radial-gradient(circle, ${brand.accent}15 0%, transparent 50%)`,
          borderRadius: '50%',
          transform: `scale(${orb2}) rotate(${-shineRotation}deg)`,
          opacity: 0.5,
          filter: 'blur(1px)',
        }}
      />
      <div
        style={{
          position: 'absolute',
          top: '60%',
          left: '70%',
          width: 200,
          height: 200,
          background: `radial-gradient(circle, ${brand.accent}10 0%, transparent 40%)`,
          borderRadius: '50%',
          transform: `scale(${orb3}) rotate(${shineRotation * 0.5}deg)`,
          opacity: 0.6,
        }}
      />
      
      {/* Rotating shine effect */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          width: '120%',
          height: '120%',
          background: `conic-gradient(transparent, ${brand.accent}05, transparent, ${brand.accent}08, transparent)`,
          transform: `translate(-50%, -50%) rotate(${shineRotation * 0.3}deg) scale(${pulseEffect})`,
          opacity: 0.4,
          borderRadius: '50%',
          filter: 'blur(3px)',
        }}
      />

      {/* Logo Section */}
      <div style={{
        textAlign: 'center',
        marginBottom: 48,
        transform: `translateY(${logoY}px) scale(${logoScale})`,
        opacity: logoOpacity,
      }}>
        <img 
          src={logoSrc}
          alt="Hardal Logo" 
          style={{
            height: 64,
            width: 'auto',
            filter: `drop-shadow(0 8px 32px ${brand.accent}60) brightness(1.1)`,
            marginBottom: 24,
          }}
        />
        <p style={{
          color: brand.accent,
          fontSize: 22,
          margin: 0,
          fontWeight: 600,
          transform: `translateY(${subtitleY}px)`,
          opacity: subtitleOpacity,
        }}>
          Server-side measurement platform
        </p>
      </div>

      {/* Main Content */}
      <div
        style={{
          background: `linear-gradient(135deg, rgba(20,16,32,0.9) 0%, rgba(26,23,56,0.7) 100%)`,
          borderRadius: 24,
          padding: 48,
          border: `2px solid ${brand.accent}40`,
          boxShadow: `0 20px 60px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.1), inset 0 1px 0 rgba(255,255,255,0.2)`,
          transform: `translateY(${contentY}px) scale(${contentScale})`,
          opacity: contentOpacity,
          position: 'relative',
          maxWidth: '900px',
          width: '100%',
          backdropFilter: 'blur(20px)',
        }}
      >
        {/* Subtle inner glow */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: `radial-gradient(ellipse at center, ${brand.accent}08 0%, transparent 70%)`,
            borderRadius: 24,
            pointerEvents: 'none',
          }}
        />

        {/* What Hardal Does */}
        <div style={{ textAlign: 'center', marginBottom: 40, position: 'relative', zIndex: 1 }}>
          <h1 style={{
            fontSize: 36,
            fontWeight: 800,
            color: '#ffffff',
            margin: 0,
            marginBottom: 16,
            background: `linear-gradient(135deg, ${brand.accent} 0%, #ffffff 70%, ${brand.accent} 100%)`,
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            color: 'transparent',
            lineHeight: 1.2,
          }}>
            Privacy-First Analytics That Actually Work
          </h1>
          <p style={{
            color: brand.subtle,
            fontSize: 18,
            lineHeight: 1.6,
            margin: 0,
            maxWidth: '700px',
            marginLeft: 'auto',
            marginRight: 'auto',
          }}>
            Hardal connects your first-party data from any source to any destination while ensuring 99% accuracy and full privacy compliance. No more lost conversions, no more privacy headaches.
          </p>
        </div>

        {/* Key Value Props */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: 20,
          position: 'relative',
          zIndex: 1,
        }}>
          {[
            {
              icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={brand.accent} strokeWidth="2"><path d="M12 1v6m0 6v6"/><path d="M17 21v-2a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
              title: "99% Data Accuracy",
              desc: "Capture every conversion with server-side tracking that bypasses ad blockers"
            },
            {
              icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={brand.accent} strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><circle cx="12" cy="16" r="1"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>,
              title: "GDPR & KVKK Ready",
              desc: "Built-in privacy compliance for all major regulations worldwide"
            },
            {
              icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={brand.accent} strokeWidth="2"><polygon points="13,2 3,14 12,14 11,22 21,10 12,10 13,2"/></svg>,
              title: "Faster Performance",
              desc: "Reduce page load times by moving tracking scripts server-side"
            },
            {
              icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={brand.accent} strokeWidth="2"><polyline points="16,18 22,12 16,6"/><polyline points="8,6 2,12 8,18"/></svg>,
              title: "Any Source to Any Destination",
              desc: "Connect web, mobile, and server data to 200+ marketing tools"
            }
          ].map((item, i) => (
            <div
              key={i}
              style={{
                background: `linear-gradient(135deg, ${brand.accent}12 0%, ${brand.accent}06 100%)`,
                borderRadius: 16,
                padding: 20,
                border: `1px solid ${brand.accent}30`,
                display: 'flex',
                alignItems: 'flex-start',
                gap: 16,
                boxShadow: `0 4px 20px ${brand.accent}10`,
              }}
            >
              <div style={{
                width: 48,
                height: 48,
                borderRadius: 12,
                background: `${brand.accent}20`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                boxShadow: `0 0 20px ${brand.accent}30`,
              }}>
                {item.icon}
              </div>
              <div>
                <h3 style={{
                  fontSize: 16,
                  fontWeight: 700,
                  color: '#ffffff',
                  margin: 0,
                  marginBottom: 6,
                }}>
                  {item.title}
                </h3>
                <p style={{
                  fontSize: 14,
                  color: brand.subtle,
                  margin: 0,
                  lineHeight: 1.4,
                }}>
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Enhanced floating particles */}
      {[...Array(12)].map((_, i) => {
        const particleDelay = i * 20;
        const particleSpring = spring({ fps: 30, frame: f - particleDelay, config: { damping: 250, stiffness: 100 } });
        const particleY = interpolate(particleSpring, [0, 1], [30, 0]);
        const particleOpacity = interpolate(particleSpring, [0, 1], [0, 0.8]);
        const particleScale = interpolate(particleSpring, [0, 1], [0, 1]);
        
        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: `${10 + i * 7}%`,
              top: `${15 + (i % 4) * 20}%`,
              width: i % 3 === 0 ? 6 : 4,
              height: i % 3 === 0 ? 6 : 4,
              borderRadius: '50%',
              background: brand.accent,
              transform: `translateY(${particleY}px) scale(${particleScale})`,
              opacity: particleOpacity,
              boxShadow: `0 0 ${i % 2 === 0 ? 15 : 25}px ${brand.accent}`,
              filter: 'blur(0.5px)',
            }}
          />
        );
      })}
    </AbsoluteFill>
  );
};
