import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate, spring } from 'remotion';
import { Brand } from '../compositions/HardalMarketing';

interface MetricCardProps {
  title: string;
  value: string | number;
  icon: string;
  delay: number;
  brand: Brand;
}

interface ReferrerData {
  source: string;
  visitors: number;
  icon: string;
}

const MetricCard: React.FC<MetricCardProps> = ({ title, value, icon, delay, brand }) => {
  const f = useCurrentFrame();
  const s = spring({ fps: 30, frame: f - delay, config: { damping: 200, stiffness: 300 } });
  const y = interpolate(s, [0, 1], [40, 0]);
  const o = interpolate(s, [0, 1], [0, 1]);
  const scale = interpolate(s, [0, 1], [0.9, 1]);

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
        gap: 8,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        gap: 8,
        marginBottom: 4,
      }}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" style={{ color: brand.subtle }}>
          {icon === 'users' && (
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          )}
          {icon === 'eye' && (
            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z M12 9a3 3 0 1 1 0 6 3 3 0 0 1 0-6z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          )}
          {icon === 'trending' && (
            <path d="M22 12h-4l-3 9L9 3l-3 9H2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          )}
          {icon === 'zap' && (
            <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          )}
        </svg>
        <span style={{ 
          fontSize: 14, 
          color: brand.subtle,
          fontWeight: 500,
          textTransform: 'uppercase',
          letterSpacing: '0.5px'
        }}>
          {title}
        </span>
      </div>
      
      <div style={{ 
        fontSize: 32, 
        fontWeight: 800, 
        color: '#ffffff',
        lineHeight: 1,
      }}>
        {typeof value === 'number' ? value.toLocaleString() : value}
      </div>
    </div>
  );
};

const PlatformIcon: React.FC<{ platform: string; size?: number }> = ({ platform, size = 20 }) => {
  const iconStyle = { width: size, height: size };

  switch (platform) {
    case 'google':
      return (
        <svg style={iconStyle} viewBox="0 0 24 24" fill="none">
          <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
          <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
          <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
          <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
        </svg>
      );
    case 'github':
      return (
        <svg style={iconStyle} viewBox="0 0 24 24" fill="#333">
          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
        </svg>
      );
    case 'reddit':
      return (
        <svg style={iconStyle} viewBox="0 0 24 24" fill="#FF4500">
          <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 .029-.463.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 0 0-.232-.095z"/>
        </svg>
      );
    case 'facebook':
      return (
        <svg style={iconStyle} viewBox="0 0 24 24" fill="#1877F2">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
        </svg>
      );
    case 'twitter':
      return (
        <svg style={iconStyle} viewBox="0 0 24 24" fill="#000">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
        </svg>
      );
    case 'linkedin':
      return (
        <svg style={iconStyle} viewBox="0 0 24 24" fill="#0A66C2">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
        </svg>
      );
    case 'shopify':
      return (
        <svg style={iconStyle} viewBox="0 0 24 24" fill="#7AB55C">
          <path d="M15.337 2.367c-.342-.003-.654.004-.932.024-.005-.052-.02-.18-.062-.367-.176-.784-.51-1.182-.825-1.338-.096-.047-.203-.07-.315-.07-.019 0-.037.001-.056.003-1.171-.011-2.346.653-3.296 1.87-.754.967-1.346 2.229-1.297 3.268.008.171.021.321.036.451-.79.229-1.396.405-1.728.503-1.077.318-1.109.35-1.251.98-.107.474-2.9 22.365-2.9 22.365l17.248-2.998s-5.281-21.12-5.281-21.12c-.133-.517-.222-.679-.341-.57zm-1.368 3.673c-.434.127-.904.266-1.401.413 0-.011 0-.023-.001-.034-.028-.671.066-1.596.467-2.422.12-.247.318-.577.565-.82.081-.08.169-.151.261-.215.204.684.154 1.898.109 3.078zm1.069-3.049c.216.008.371.056.464.146-.092.08-.194.182-.306.31-.346.394-.649.897-.808 1.265-.466.916-.54 2.003-.506 2.691l-1.148.337c.046-1.236.199-2.769.862-3.714.498-.709 1.163-1.04 1.436-1.035zm.72 3.823c.542-.159 1.026-.302 1.393-.415-.074.508-.243 1.153-.515 1.886-.511 1.381-1.399 2.687-2.364 3.481l.12-1.144c.416-1.05.771-2.443.865-3.424.035-.369.028-.682-.016-.923.179-.053.34-.101.517-.461z"/>
        </svg>
      );
    default:
      return (
        <div style={{
          ...iconStyle,
          backgroundColor: '#94a3b8',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '10px',
          color: 'white',
          fontWeight: 'bold'
        }}>
          {platform.charAt(0).toUpperCase()}
        </div>
      );
  }
};

const TopReferrersTable: React.FC<{ brand: Brand; delay: number }> = ({ brand, delay }) => {
  const f = useCurrentFrame();
  const s = spring({ fps: 30, frame: f - delay, config: { damping: 200, stiffness: 300 } });
  const containerY = interpolate(s, [0, 1], [30, 0]);
  const containerOpacity = interpolate(s, [0, 1], [0, 1]);

  const referrers: ReferrerData[] = [
    { source: 'google.com', visitors: 10, icon: 'google' },
    { source: 'github.com', visitors: 10, icon: 'github' },
    { source: 'reddit.com', visitors: 10, icon: 'reddit' },
    { source: 'facebook.com', visitors: 10, icon: 'facebook' },
    { source: 'twitter.com', visitors: 10, icon: 'twitter' },
    { source: 'linkedin.com', visitors: 10, icon: 'linkedin' },
    { source: 'www.google.com', visitors: 1, icon: 'google' },
    { source: 'hardal-test.myshopify.com', visitors: 1, icon: 'shopify' },
  ];

  return (
    <div
      style={{
        background: 'rgba(20,16,32,0.85)',
        borderRadius: 18,
        padding: 32,
        border: '1px solid rgba(255,255,255,0.14)',
        boxShadow: '0 12px 28px rgba(0,0,0,0.45)',
        transform: `translateY(${containerY}px)`,
        opacity: containerOpacity,
        marginBottom: 32,
      }}
    >
      {/* Header */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        marginBottom: 24,
      }}>
        <h2 style={{ 
          fontSize: 24, 
          fontWeight: 700, 
          color: '#ffffff',
          margin: 0,
        }}>
          Top Referrers
        </h2>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" style={{ color: brand.subtle }}>
          <path d="M7 7h10v10M7 17L17 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>

      {/* Table Header */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr auto',
        padding: '12px 0',
        borderBottom: '1px solid rgba(255,255,255,0.1)',
        marginBottom: 8,
      }}>
        <div style={{ 
          color: brand.subtle, 
          fontSize: 14, 
          fontWeight: 600,
          textTransform: 'uppercase',
          letterSpacing: '0.5px'
        }}>
          Source
        </div>
        <div style={{ 
          color: brand.subtle, 
          fontSize: 14, 
          fontWeight: 600,
          textTransform: 'uppercase',
          letterSpacing: '0.5px'
        }}>
          Visitors
        </div>
      </div>

      {/* Referrer Rows */}
      {referrers.map((referrer, index) => {
        const rowSpring = spring({ 
          fps: 30, 
          frame: f - delay - 30 - (index * 8), 
          config: { damping: 200, stiffness: 300 } 
        });
        const rowY = interpolate(rowSpring, [0, 1], [20, 0]);
        const rowOpacity = interpolate(rowSpring, [0, 1], [0, 1]);

        return (
          <div
            key={referrer.source}
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr auto',
              padding: '12px 0',
              borderBottom: index < referrers.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none',
              transform: `translateY(${rowY}px)`,
              opacity: rowOpacity,
              alignItems: 'center',
            }}
          >
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: 12,
            }}>
              <PlatformIcon platform={referrer.icon} size={20} />
              <span style={{ 
                color: '#ffffff', 
                fontSize: 14,
                fontWeight: 500,
              }}>
                {referrer.source}
              </span>
            </div>
            <div style={{ 
              color: '#ffffff', 
              fontSize: 14,
              fontWeight: 600,
              textAlign: 'right',
            }}>
              {referrer.visitors}
            </div>
          </div>
        );
      })}
    </div>
  );
};

const FilterControls: React.FC<{ brand: Brand; delay: number }> = ({ brand, delay }) => {
  const f = useCurrentFrame();
  const s = spring({ fps: 30, frame: f - delay, config: { damping: 200, stiffness: 300 } });
  const y = interpolate(s, [0, 1], [20, 0]);
  const o = interpolate(s, [0, 1], [0, 1]);

  return (
    <div
      style={{
        display: 'flex',
        gap: 16,
        marginBottom: 32,
        transform: `translateY(${y}px)`,
        opacity: o,
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      {/* Left side filters */}
      <div style={{ display: 'flex', gap: 16 }}>
        <div style={{
          padding: '8px 16px',
          background: 'rgba(20,16,32,0.8)',
          border: '1px solid rgba(255,255,255,0.1)',
          borderRadius: 8,
          color: '#ffffff',
          fontSize: 14,
          fontWeight: 500,
        }}>
          Today
        </div>
        <div style={{
          padding: '8px 16px',
          background: 'rgba(20,16,32,0.8)',
          border: '1px solid rgba(255,255,255,0.1)',
          borderRadius: 8,
          color: brand.subtle,
          fontSize: 14,
          display: 'flex',
          alignItems: 'center',
          gap: 8,
        }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2" stroke="currentColor" strokeWidth="2"/>
            <line x1="16" y1="2" x2="16" y2="6" stroke="currentColor" strokeWidth="2"/>
            <line x1="8" y1="2" x2="8" y2="6" stroke="currentColor" strokeWidth="2"/>
            <line x1="3" y1="10" x2="21" y2="10" stroke="currentColor" strokeWidth="2"/>
          </svg>
          Select custom range
        </div>
        <div style={{
          padding: '8px 16px',
          background: 'rgba(20,16,32,0.8)',
          border: '1px solid rgba(255,255,255,0.1)',
          borderRadius: 8,
          color: brand.subtle,
          fontSize: 14,
          display: 'flex',
          alignItems: 'center',
          gap: 8,
        }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <polygon points="22,3 2,3 10,12.46 10,19 14,21 14,12.46 22,3" stroke="currentColor" strokeWidth="2"/>
          </svg>
          Add Filter
        </div>
      </div>

      {/* Right side active indicator */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        color: brand.subtle,
        fontSize: 14,
      }}>
        <div style={{
          width: 8,
          height: 8,
          borderRadius: '50%',
          backgroundColor: '#10b981',
        }} />
        20 active now
      </div>
    </div>
  );
};

export const ReferrersAnalyticsScene: React.FC<{ brand: Brand }> = ({ brand }) => {
  const f = useCurrentFrame();
  const headerSpring = spring({ fps: 30, frame: f, config: { damping: 200, stiffness: 300 } });
  const headerY = interpolate(headerSpring, [0, 1], [30, 0]);
  const headerOpacity = interpolate(headerSpring, [0, 1], [0, 1]);

  const bottomTextSpring = spring({ fps: 30, frame: f - 150, config: { damping: 200, stiffness: 300 } });
  const bottomTextY = interpolate(bottomTextSpring, [0, 1], [20, 0]);
  const bottomTextOpacity = interpolate(bottomTextSpring, [0, 1], [0, 1]);

  return (
    <AbsoluteFill style={{ 
      padding: 60,
      background: 'linear-gradient(135deg, #0c0a1e 0%, #1a1738 100%)',
    }}>
      {/* Header */}
      <div style={{ 
        marginBottom: 32,
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
          Referrer Analytics
        </h1>
        <p style={{
          fontSize: 18,
          color: brand.subtle,
          margin: 0,
        }}>
          Track your traffic sources and referral performance
        </p>
      </div>

      {/* Filter Controls */}
      <FilterControls brand={brand} delay={20} />

      {/* Events and Time Function Controls */}
      <div style={{
        display: 'flex',
        gap: 16,
        marginBottom: 32,
        alignItems: 'center',
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          padding: '8px 16px',
          background: 'rgba(20,16,32,0.8)',
          border: '1px solid rgba(255,255,255,0.1)',
          borderRadius: 8,
        }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" style={{ color: brand.subtle }}>
            <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2"/>
            <path d="M12 1v6m0 6v6m11-7h-6m-6 0H1" stroke="currentColor" strokeWidth="2"/>
          </svg>
          <span style={{ color: '#ffffff', fontSize: 14 }}>Events</span>
          <select style={{
            background: 'transparent',
            border: 'none',
            color: '#ffffff',
            fontSize: 14,
            outline: 'none',
          }}>
            <option>page_view</option>
          </select>
        </div>

        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          padding: '8px 16px',
          background: 'rgba(20,16,32,0.8)',
          border: '1px solid rgba(255,255,255,0.1)',
          borderRadius: 8,
        }}>
          <span style={{ color: brand.subtle, fontSize: 14 }}>Time Function</span>
          <select style={{
            background: 'transparent',
            border: 'none',
            color: '#ffffff',
            fontSize: 14,
            outline: 'none',
          }}>
            <option>Auto</option>
          </select>
        </div>

        <div style={{
          marginLeft: 'auto',
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          color: brand.subtle,
          fontSize: 14,
        }}>
          <span>Active:</span>
          <span style={{
            background: 'rgba(20,16,32,0.8)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: 6,
            padding: '4px 8px',
            color: '#ffffff',
          }}>
            page_view ×
          </span>
        </div>
      </div>

      {/* Metric Cards Grid */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(4, 1fr)', 
        gap: 24,
        marginBottom: 32,
      }}>
        <MetricCard
          title="Visitors"
          value={20}
          icon="users"
          delay={30}
          brand={brand}
        />
        <MetricCard
          title="Page Views"
          value={412}
          icon="eye"
          delay={35}
          brand={brand}
        />
        <MetricCard
          title="Bounce Rate"
          value="0.0%"
          icon="trending"
          delay={40}
          brand={brand}
        />
        <MetricCard
          title="Total Events"
          value={9763}
          icon="zap"
          delay={45}
          brand={brand}
        />
      </div>

      {/* Top Referrers Table */}
      <TopReferrersTable brand={brand} delay={60} />

      {/* Bottom Text */}
      <div style={{ 
        position: 'absolute',
        bottom: 40,
        left: 60,
        right: 60,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        color: brand.subtle, 
        fontSize: 18,
        lineHeight: 1,
        transform: `translateY(${bottomTextY}px)`,
        opacity: bottomTextOpacity,
        whiteSpace: 'nowrap',
      }}>
        Comprehensive referrer tracking with real-time analytics. Monitor your traffic sources and optimize your marketing campaigns.
      </div>
    </AbsoluteFill>
  );
};
