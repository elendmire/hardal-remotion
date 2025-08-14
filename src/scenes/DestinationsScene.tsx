import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate, spring } from 'remotion';
import { Brand } from '../compositions/HardalMarketing';

interface DestinationData {
  name: string;
  icon: string;
  description: string;
  setupTime: string;
  status: 'Live' | 'Coming Soon';
}

const DestinationIcon: React.FC<{ type: string; size?: number }> = ({ type, size = 40 }) => {
  const iconStyle = { width: size, height: size, borderRadius: type === 'adjust' || type === 'bytebrew' || type === 'discord' || type === 'firebase' || type === 'googleads' || type === 'kochava' || type === 'linear' || type === 'meta' || type === 'pipedream' || type === 'singular' || type === 'slack' || type === 'tenjin' || type === 'tiktok' || type === 'zapier' ? '8px' : '50%' };

  switch (type) {
    case 'adjust':
      return (
        <div style={{...iconStyle, background: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
            <path d="M12 2L2 7v10c0 5.55 3.84 9.74 9 9.74s9-4.19 9-9.74V7l-10-5z"/>
          </svg>
        </div>
      );
    case 'appsflyer':
      return (
        <div style={{...iconStyle, background: '#00D4FF', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
          <span style={{color: 'white', fontWeight: 'bold', fontSize: '12px'}}>AF</span>
        </div>
      );
    case 'bytebrew':
      return (
        <div style={{...iconStyle, background: '#4A90E2', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
          <span style={{color: 'white', fontWeight: 'bold', fontSize: '12px'}}>BB</span>
        </div>
      );
    case 'discord':
      return (
        <div style={{...iconStyle, background: '#5865F2', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
            <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
          </svg>
        </div>
      );
    case 'firebase':
      return (
        <div style={{...iconStyle, background: '#FFA000', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
            <path d="M5.803 21.293l-1.394-12.49a.51.51 0 0 1 .943-.263l2.41 3.897a.25.25 0 0 0 .473-.052l1.083-3.286a.51.51 0 0 1 .968 0l5.09 15.434-9.573-3.24z"/>
            <path d="M14.293 21.986L8.803 2.293a.51.51 0 0 1 .968 0l5.09 19.693-.568-.568z"/>
          </svg>
        </div>
      );
    case 'googleads':
      return (
        <div style={{...iconStyle, background: '#4285F4', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
          </svg>
        </div>
      );
    case 'googleanalytics':
      return (
        <div style={{...iconStyle, background: '#FF6D01', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
            <path d="M22.84 2.998v18.005c0 .827-.673 1.5-1.5 1.5s-1.5-.673-1.5-1.5V2.998c0-.827.673-1.5 1.5-1.5s1.5.673 1.5 1.5zm-6 3v15.005c0 .827-.673 1.5-1.5 1.5s-1.5-.673-1.5-1.5V5.998c0-.827.673-1.5 1.5-1.5s1.5.673 1.5 1.5zm-6 5v10.005c0 .827-.673 1.5-1.5 1.5s-1.5-.673-1.5-1.5V10.998c0-.827.673-1.5 1.5-1.5s1.5.673 1.5 1.5zm-6 5v5.005c0 .827-.673 1.5-1.5 1.5s-1.5-.673-1.5-1.5v-5.005c0-.827.673-1.5 1.5-1.5s1.5.673 1.5 1.5z"/>
          </svg>
        </div>
      );
    case 'kochava':
      return (
        <div style={{...iconStyle, background: '#2E3440', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
          <span style={{color: 'white', fontWeight: 'bold', fontSize: '10px'}}>KOCHAVA</span>
        </div>
      );
    case 'linear':
      return (
        <div style={{...iconStyle, background: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
            <path d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12zm8-5v10l6-5-6-5z"/>
          </svg>
        </div>
      );
    case 'meta':
      return (
        <div style={{...iconStyle, background: '#1877F2', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
          </svg>
        </div>
      );
    case 'pipedream':
      return (
        <div style={{...iconStyle, background: '#0FA958', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
          <span style={{color: 'white', fontWeight: 'bold', fontSize: '12px'}}>P</span>
        </div>
      );
    case 'singular':
      return (
        <div style={{...iconStyle, background: '#6E7BFF', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
          <span style={{color: 'white', fontWeight: 'bold', fontSize: '12px'}}>S</span>
        </div>
      );
    case 'slack':
      return (
        <div style={{...iconStyle, background: '#4A154B', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
            <path d="M5.042 15.165a2.528 2.528 0 0 1-2.52 2.523A2.528 2.528 0 0 1 0 15.165a2.527 2.527 0 0 1 2.522-2.52h2.52v2.52zM6.313 15.165a2.527 2.527 0 0 1 2.521-2.52 2.527 2.527 0 0 1 2.521 2.52v6.313A2.528 2.528 0 0 1 8.834 24a2.528 2.528 0 0 1-2.521-2.522v-6.313zM8.834 5.042a2.528 2.528 0 0 1-2.521-2.52A2.528 2.528 0 0 1 8.834 0a2.528 2.528 0 0 1 2.521 2.522v2.52H8.834zM8.834 6.313a2.528 2.528 0 0 1 2.521 2.521 2.528 2.528 0 0 1-2.521 2.521H2.522A2.528 2.528 0 0 1 0 8.834a2.528 2.528 0 0 1 2.522-2.521h6.312zM18.956 8.834a2.528 2.528 0 0 1 2.522-2.521A2.528 2.528 0 0 1 24 8.834a2.528 2.528 0 0 1-2.522 2.521h-2.522V8.834zM17.688 8.834a2.528 2.528 0 0 1-2.523 2.521 2.527 2.527 0 0 1-2.52-2.521V2.522A2.527 2.527 0 0 1 15.165 0a2.528 2.528 0 0 1 2.523 2.522v6.312zM15.165 18.956a2.528 2.528 0 0 1 2.523 2.522A2.528 2.528 0 0 1 15.165 24a2.527 2.527 0 0 1-2.52-2.522v-2.522h2.52zM15.165 17.688a2.527 2.527 0 0 1-2.52-2.523 2.526 2.526 0 0 1 2.52-2.52h6.313A2.527 2.527 0 0 1 24 15.165a2.528 2.528 0 0 1-2.522 2.523h-6.313z"/>
          </svg>
        </div>
      );
    case 'tenjin':
      return (
        <div style={{...iconStyle, background: '#00A8CC', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
          <span style={{color: 'white', fontWeight: 'bold', fontSize: '10px'}}>TENJIN</span>
        </div>
      );
    case 'tiktok':
      return (
        <div style={{...iconStyle, background: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
            <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
          </svg>
        </div>
      );
    case 'zapier':
      return (
        <div style={{...iconStyle, background: '#FF4A00', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
            <path d="M24 12.036L18.648 17.39H14.35L24 7.74v4.296zM10.606 17.39h-4.3L0 11.084v-4.3l10.606 10.606zM14.35 6.61h4.298L24 12.036V7.74L14.35 6.61zM9.39 6.61H5.094L0 11.7v4.296L9.39 6.61z"/>
          </svg>
        </div>
      );
    default:
      return (
        <div style={{
          ...iconStyle,
          backgroundColor: '#94a3b8',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '14px',
          color: 'white',
          fontWeight: 'bold'
        }}>
          {type.charAt(0).toUpperCase()}
        </div>
      );
  }
};

const DestinationCard: React.FC<{ 
  destination: DestinationData; 
  delay: number; 
  brand: Brand;
}> = ({ destination, delay, brand }) => {
  const f = useCurrentFrame();
  const s = spring({ fps: 30, frame: f - delay, config: { damping: 200, stiffness: 300 } });
  const y = interpolate(s, [0, 1], [40, 0]);
  const o = interpolate(s, [0, 1], [0, 1]);
  const scale = interpolate(s, [0, 1], [0.95, 1]);

  return (
    <div
      style={{
        background: 'rgba(20,16,32,0.85)',
        borderRadius: 12,
        padding: 24,
        border: '1px solid rgba(255,255,255,0.14)',
        boxShadow: '0 12px 28px rgba(0,0,0,0.45)',
        transform: `translateY(${y}px) scale(${scale})`,
        opacity: o,
        display: 'flex',
        flexDirection: 'column',
        gap: 16,
        height: '200px',
      }}
    >
      {/* Header with icon and status */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 12,
        }}>
          <DestinationIcon type={destination.icon} size={40} />
          <h3 style={{
            fontSize: 18,
            fontWeight: 700,
            color: '#ffffff',
            margin: 0,
          }}>
            {destination.name}
          </h3>
        </div>
        <div style={{
          backgroundColor: destination.status === 'Live' ? '#10b981' : '#64748b',
          color: 'white',
          padding: '4px 8px',
          borderRadius: 4,
          fontSize: 12,
          fontWeight: 600,
        }}>
          {destination.status}
        </div>
      </div>

      {/* Description */}
      <p style={{
        color: brand.subtle,
        fontSize: 14,
        lineHeight: 1.5,
        margin: 0,
        flex: 1,
      }}>
        {destination.description}
      </p>

      {/* Setup time */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        color: brand.subtle,
        fontSize: 14,
      }}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10"/>
          <polyline points="12,6 12,12 16,14"/>
        </svg>
        {destination.setupTime}
      </div>
            </div>
          );
};

export const DestinationsScene: React.FC<{ brand: Brand; destinations: string[] }> = ({ brand }) => {
  const f = useCurrentFrame();
  const headerSpring = spring({ fps: 30, frame: f, config: { damping: 200, stiffness: 300 } });
  const headerY = interpolate(headerSpring, [0, 1], [30, 0]);
  const headerOpacity = interpolate(headerSpring, [0, 1], [0, 1]);

  // Text change animation at frame 222 (about 7.4 seconds)
  const textChangeFrame = 222;
  const textChangeSpring = spring({ fps: 30, frame: f - textChangeFrame, config: { damping: 200, stiffness: 300 } });
  const textChangeProgress = interpolate(textChangeSpring, [0, 1], [0, 1]);
  
  // Fade out old text, fade in new text
  const oldTextOpacity = interpolate(f, [textChangeFrame - 15, textChangeFrame], [1, 0], { extrapolateRight: 'clamp' });
  const newTextOpacity = interpolate(f, [textChangeFrame, textChangeFrame + 15], [0, 1], { extrapolateRight: 'clamp' });
  const newTextY = interpolate(textChangeSpring, [0, 1], [20, 0]);

  const destinationsData: DestinationData[] = [
    { name: 'Adjust', icon: 'adjust', description: 'Send your mobile analytics data to Adjust using Hardal\'s server-to-server tracking', setupTime: '2 min setup time', status: 'Live' },
    { name: 'AppsFlyer', icon: 'appsflyer', description: 'Send your mobile analytics data to AppsFlyer using Hardal\'s server-to-server tracking', setupTime: '2 min setup time', status: 'Live' },
    { name: 'Bytebrew', icon: 'bytebrew', description: 'Send your mobile analytics data to Bytebrew using Hardal\'s server-to-server tracking', setupTime: '2 min setup time', status: 'Live' },
    { name: 'Discord', icon: 'discord', description: 'Send your data to Discord using Hardal\'s server-side tracking', setupTime: '5 min setup time', status: 'Live' },
    { name: 'Firebase', icon: 'firebase', description: 'Send your analytics data to Firebase using Hardal\'s server-side tracking', setupTime: '2 min setup time', status: 'Live' },
    { name: 'Google Ads Offline Conversions', icon: 'googleads', description: 'Send your analytics data to Google Ads Offline Conversions using Hardal\'s server-side tracking', setupTime: '2 min setup time', status: 'Live' },
    { name: 'Google Analytics 4', icon: 'googleanalytics', description: 'Send your analytics data to Google Analytics 4 (GA4) using Hardal\'s server-side tracking', setupTime: '2 min setup time', status: 'Live' },
    { name: 'Kochava', icon: 'kochava', description: 'Send your mobile analytics data to Kochava using Hardal\'s server-to-server tracking', setupTime: '2 min setup time', status: 'Live' },
    { name: 'Linear', icon: 'linear', description: 'Send your own first-party data to Linear using Hardal\'s server-side tracking', setupTime: '2 min setup time', status: 'Live' },
    { name: 'Meta Conversions API', icon: 'meta', description: 'Send your analytics data to Meta Conversions API using Hardal\'s server-side tracking', setupTime: '2 min setup time', status: 'Live' },
    { name: 'Pipedream', icon: 'pipedream', description: 'Send your analytics data to Pipedream using Hardal\'s server-side tracking', setupTime: '2 min setup time', status: 'Live' },
    { name: 'Singular', icon: 'singular', description: 'Send your mobile analytics data to Singular using Hardal\'s server-to-server tracking', setupTime: '2 min setup time', status: 'Live' },
    { name: 'Slack', icon: 'slack', description: 'Send your analytics data to Slack using Hardal\'s server-side tracking', setupTime: '5 min setup time', status: 'Live' },
    { name: 'Tenjin', icon: 'tenjin', description: 'Send your mobile analytics data to Tenjin using Hardal\'s server-to-server tracking', setupTime: '2 min setup time', status: 'Live' },
    { name: 'TikTok Events API', icon: 'tiktok', description: 'Send your analytics data to TikTok Events API using Hardal\'s server-side tracking', setupTime: '2 min setup time', status: 'Live' },
    { name: 'Zapier', icon: 'zapier', description: 'Send your analytics data to Zapier using Hardal\'s server-side tracking', setupTime: '2 min setup time', status: 'Live' },
  ];

  return (
    <AbsoluteFill style={{ 
      padding: 60,
      background: 'linear-gradient(135deg, #0c0a1e 0%, #1a1738 100%)',
    }}>
      {/* Header */}
      <div style={{ 
        marginBottom: 24,
        textAlign: 'center',
        transform: `translateY(${headerY}px)`,
        opacity: headerOpacity,
      }}>
        <h1 style={{ 
          fontSize: 42, 
          fontWeight: 800, 
          margin: 0,
          marginBottom: 8,
          background: `linear-gradient(135deg, ${brand.accent} 0%, #ffffff 100%)`,
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          color: 'transparent',
        }}>
          All Destinations
        </h1>
        
        {/* Animated subtitle text change */}
        <div style={{ position: 'relative', height: '50px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {/* Old text */}
          <p style={{
            fontSize: 18,
            color: brand.subtle,
            margin: 0,
            position: 'absolute',
            opacity: oldTextOpacity,
          }}>
            Connect your first-party data to any platform with ready-to-use server-to-server endpoints and integrations
          </p>
          
          {/* New text */}
          <p style={{
            fontSize: 18,
            color: brand.subtle,
            margin: 0,
            position: 'absolute',
            opacity: newTextOpacity,
            transform: `translateY(${newTextY}px)`,
          }}>
            HTTP endpoints and managed integrations. Export to warehouses. Trigger webhooks. Keep schema simple.
          </p>
        </div>
      </div>

      {/* Destinations Grid */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(4, 1fr)', 
        gap: 20,
        marginBottom: 40,
        flex: 1,
        alignContent: 'start',
      }}>
        {destinationsData.map((destination, index) => (
          <DestinationCard
            key={destination.name}
            destination={destination}
            delay={30 + index * 5}
            brand={brand}
          />
        ))}
      </div>


    </AbsoluteFill>
  );
};