import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate, Easing, spring, staticFile } from 'remotion';
import { Brand } from '../compositions/HardalMarketing';

export const CTA: React.FC<{ brand: Brand }> = ({ brand }) => {
  const f = useCurrentFrame();
  
  // Stop animations at frame 75
  const clampedFrame = Math.min(f, 75);
  
  // Smooth spring animations that complete by frame 75
  const titleSpring = spring({ 
    fps: 30, 
    frame: clampedFrame, 
    config: { damping: 200, stiffness: 200 } 
  });
  
  const subtitleSpring = spring({ 
    fps: 30, 
    frame: clampedFrame - 15, 
    config: { damping: 200, stiffness: 200 } 
  });
  
  const taglineSpring = spring({ 
    fps: 30, 
    frame: clampedFrame - 30, 
    config: { damping: 200, stiffness: 200 } 
  });
  
  const logoSpring = spring({ 
    fps: 30, 
    frame: clampedFrame - 45, 
    config: { damping: 180, stiffness: 120 } 
  });

  // Transform values
  const titleY = interpolate(titleSpring, [0, 1], [40, 0]);
  const titleO = interpolate(titleSpring, [0, 1], [0, 1]);
  
  const subtitleY = interpolate(subtitleSpring, [0, 1], [30, 0]);
  const subtitleO = interpolate(subtitleSpring, [0, 1], [0, 1]);
  
  const taglineY = interpolate(taglineSpring, [0, 1], [20, 0]);
  const taglineO = interpolate(taglineSpring, [0, 1], [0, 1]);
  
  const logoScale = 0.9 + logoSpring * 0.1;
  const logoO = interpolate(logoSpring, [0, 1], [0, 1]);

  const logoSrc = staticFile('hardal-logo-white.png');

  return (
    <AbsoluteFill style={{ 
      background: 'linear-gradient(135deg, #0c0a1e 0%, #1a1738 50%, #0c0a1e 100%)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 60,
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Background decorative elements */}
      <div style={{
        position: 'absolute',
        top: '20%',
        left: '10%',
        width: 200,
        height: 200,
        background: `radial-gradient(circle, ${brand.accent}20 0%, transparent 70%)`,
        borderRadius: '50%',
        filter: 'blur(40px)',
        opacity: 0.6,
        transform: 'translate(-50%, -50%)'
      }} />
      
      <div style={{
        position: 'absolute',
        bottom: '30%',
        right: '15%',
        width: 150,
        height: 150,
        background: `radial-gradient(circle, ${brand.accent}15 0%, transparent 70%)`,
        borderRadius: '50%',
        filter: 'blur(30px)',
        opacity: 0.4,
        transform: 'translate(50%, 50%)'
      }} />

      {/* Main content container */}
      <div style={{ 
        textAlign: 'center', 
        maxWidth: 1200,
        zIndex: 10,
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%'
      }}>
        {/* Main headline */}
        <div style={{ 
          fontSize: 80, 
          fontWeight: 800,
          lineHeight: 1.1,
          marginBottom: 48,
          transform: `translateY(${titleY}px)`,
          opacity: titleO,
          background: `linear-gradient(135deg, ${brand.accent} 0%, #ffffff 50%, ${brand.accent} 100%)`,
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          color: 'transparent',
          fontFamily: 'Inter, sans-serif'
        }}>
          Clarify your data for better server-side
        </div>

        {/* Subtitle */}
        <div style={{ 
          fontSize: 42, 
          color: '#e2e8f0',
          marginBottom: 36,
          transform: `translateY(${subtitleY}px)`,
          opacity: subtitleO,
          fontWeight: 500,
          lineHeight: 1.2,
          fontFamily: 'Inter, sans-serif',
          whiteSpace: 'nowrap'
        }}>
          Start with the demo project. Send your first S2S event in minutes
        </div>

        {/* Tagline */}
        <div style={{ 
          fontSize: 28, 
          color: brand.subtle,
          transform: `translateY(${taglineY}px)`,
          opacity: taglineO,
          fontWeight: 400,
          lineHeight: 1.3,
          fontFamily: 'Inter, sans-serif',
          whiteSpace: 'nowrap'
        }}>
          Transform your analytics with advanced attribution modeling and real-time insights
        </div>
      </div>

      {/* Hardal logo at bottom */}
      <img
        src={logoSrc}
        alt="Hardal logo"
        style={{
          position: 'absolute',
          bottom: 48,
          left: '50%',
          transform: `translateX(-50%) scale(${logoScale})`,
          width: 160,
          height: 'auto',
          opacity: logoO,
          filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.4))',
          pointerEvents: 'none',
          zIndex: 10
        }}
      />

      {/* Subtle grid pattern overlay */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundImage: `
          linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)
        `,
        backgroundSize: '50px 50px',
        opacity: 0.3,
        pointerEvents: 'none'
      }} />
    </AbsoluteFill>
  );
};
