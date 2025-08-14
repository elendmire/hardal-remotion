import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate, spring, staticFile } from 'remotion';
import { Brand } from '../compositions/HardalMarketing';

interface MetricCardProps {
  title: string;
  value: string | number;
  icon: string;
  delay: number;
  brand: Brand;
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

interface ChartData {
  pageViews: number[];
  visitors: number[];
  labels: string[];
}

const TrafficChart: React.FC<{ brand: Brand; delay: number }> = ({ brand, delay }) => {
  const f = useCurrentFrame();
  const s = spring({ fps: 30, frame: f - delay, config: { damping: 150, stiffness: 200 } });
  const chartProgress = interpolate(s, [0, 1], [0, 1]);
  
  // Chart data matching the screenshot pattern
  const data: ChartData = {
    pageViews: [45, 42, 38, 40, 42, 48, 52, 55, 58, 52, 50, 48, 45, 50, 52, 55, 50, 45, 40, 42, 45, 48, 50, 45],
    visitors: [28, 26, 24, 26, 28, 30, 32, 35, 36, 32, 30, 28, 27, 30, 32, 35, 30, 28, 25, 26, 28, 30, 32, 28],
    labels: Array.from({ length: 24 }, (_, i) => `${i}:00`),
  };

  const width = 1800; // Full width to reach screen edge
  const height = 320;
  const padding = 40;
  const chartWidth = width - padding * 2;
  const chartHeight = height - padding * 2;

  const maxValue = 60; // Fixed scale like in screenshot
  const stepX = chartWidth / (data.pageViews.length - 1);

  // Create smooth SVG paths with proper curves
  const createPath = (values: number[], animationProgress: number) => {
    const animatedLength = Math.floor(values.length * animationProgress);
    const animatedValues = values.slice(0, Math.max(1, animatedLength));
    
    if (animatedValues.length < 2) {
      const firstPoint = values[0];
      const x = padding;
      const y = padding + chartHeight - (firstPoint / maxValue) * chartHeight;
      return `M ${x} ${y}`;
    }

    const points = animatedValues.map((value, index) => ({
      x: padding + index * stepX,
      y: padding + chartHeight - (value / maxValue) * chartHeight,
    }));

    let path = `M ${points[0].x} ${points[0].y}`;
    
    for (let i = 1; i < points.length; i++) {
      const prev = points[i - 1];
      const curr = points[i];
      const cpx1 = prev.x + stepX * 0.4;
      const cpy1 = prev.y;
      const cpx2 = curr.x - stepX * 0.4;
      const cpy2 = curr.y;
      
      path += ` C ${cpx1} ${cpy1} ${cpx2} ${cpy2} ${curr.x} ${curr.y}`;
    }
    
    return path;
  };

  const createAreaPath = (values: number[], animationProgress: number) => {
    const linePath = createPath(values, animationProgress);
    const animatedLength = Math.floor(values.length * animationProgress);
    const lastX = padding + (animatedLength - 1) * stepX;
    const baseY = padding + chartHeight;
    
    return `${linePath} L ${lastX} ${baseY} L ${padding} ${baseY} Z`;
  };

  const pageViewsPath = createPath(data.pageViews, chartProgress);
  const visitorsPath = createPath(data.visitors, chartProgress * 0.85);
  const pageViewsAreaPath = createAreaPath(data.pageViews, chartProgress);
  const visitorsAreaPath = createAreaPath(data.visitors, chartProgress * 0.85);

  return (
    <div
      style={{
        background: 'rgba(20,16,32,0.85)',
        borderRadius: 18,
        padding: 32,
        border: '1px solid rgba(255,255,255,0.14)',
        boxShadow: '0 12px 28px rgba(0,0,0,0.45)',
        transform: `translateY(${interpolate(s, [0, 1], [30, 0])}px)`,
        opacity: interpolate(s, [0, 1], [0, 1]),
      }}
    >
      {/* Chart Header */}
      <div style={{ marginBottom: 24 }}>
        <h3 style={{ 
          fontSize: 24, 
          fontWeight: 700, 
          color: '#ffffff',
          margin: 0,
          marginBottom: 6,
        }}>
          Traffic Overview
        </h3>
        <p style={{ 
          fontSize: 16, 
          color: brand.subtle,
          margin: 0,
        }}>
          Page views and visitors today (hourly breakdown)
        </p>
      </div>

      {/* Legend */}
      <div style={{ 
        display: 'flex', 
        gap: 32, 
        marginBottom: 32,
        justifyContent: 'center',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{
            width: 12,
            height: 12,
            borderRadius: '50%',
            background: brand.accent,
          }} />
          <span style={{ fontSize: 16, color: '#ffffff', fontWeight: 500 }}>Page Views</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{
            width: 12,
            height: 12,
            borderRadius: '50%',
            background: '#8b5cf6',
          }} />
          <span style={{ fontSize: 16, color: '#ffffff', fontWeight: 500 }}>Visitors</span>
        </div>
      </div>

      {/* Chart SVG */}
      <svg width={width} height={height} style={{ display: 'block' }}>
        {/* Grid lines */}
        {[0, 1, 2, 3, 4].map((i) => (
          <line
            key={i}
            x1={padding}
            x2={width - padding}
            y1={padding + (chartHeight / 4) * i}
            y2={padding + (chartHeight / 4) * i}
            stroke="rgba(255,255,255,0.1)"
            strokeWidth={1}
          />
        ))}

        {/* Area fills with gradients */}
        <defs>
          <linearGradient id="pageViewsGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={brand.accent} stopOpacity={0.4} />
            <stop offset="100%" stopColor={brand.accent} stopOpacity={0.05} />
          </linearGradient>
          <linearGradient id="visitorsGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#8b5cf6" stopOpacity={0.4} />
            <stop offset="100%" stopColor="#8b5cf6" stopOpacity={0.05} />
          </linearGradient>
        </defs>

        {/* Area fills */}
        <path
          d={pageViewsAreaPath}
          fill="url(#pageViewsGradient)"
        />
        <path
          d={visitorsAreaPath}
          fill="url(#visitorsGradient)"
        />

        {/* Animated stroke lines */}
        <path
          d={pageViewsPath}
          stroke={brand.accent}
          strokeWidth={4}
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d={visitorsPath}
          stroke="#8b5cf6"
          strokeWidth={3}
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Y-axis labels */}
        {[0, 15, 30, 45, 60].map((value, i) => (
          <text
            key={i}
            x={padding - 12}
            y={padding + chartHeight - (value / 60) * chartHeight + 6}
            textAnchor="end"
            fontSize="14"
            fill={brand.subtle}
          >
            {value}
          </text>
        ))}
      </svg>
    </div>
  );
};

export const TrafficOverviewScene: React.FC<{ brand: Brand }> = ({ brand }) => {
  const f = useCurrentFrame();
  const headerSpring = spring({ fps: 30, frame: f, config: { damping: 200, stiffness: 300 } });
  const headerY = interpolate(headerSpring, [0, 1], [30, 0]);
  const headerOpacity = interpolate(headerSpring, [0, 1], [0, 1]);

  const bottomTextSpring = spring({ fps: 30, frame: f - 120, config: { damping: 200, stiffness: 300 } }); // Start after 4 seconds
  const bottomTextY = interpolate(bottomTextSpring, [0, 1], [20, 0]);
  const bottomTextOpacity = interpolate(bottomTextSpring, [0, 1], [0, 1]);

  const logoSrc = staticFile('hardal-logo-white.png');
  const popInLogo = spring({ fps: 30, frame: f, config: { damping: 180, stiffness: 120 } });

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
          Analytics Dashboard
        </h1>
        <p style={{
          fontSize: 18,
          color: brand.subtle,
          margin: 0,
        }}>
          Real-time insights into your website performance
        </p>
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
          value={22}
          icon="users"
          delay={15}  // Start after 0.5 seconds
          brand={brand}
        />
        <MetricCard
          title="Page Views"
          value={699}
          icon="eye"
          delay={20} // Start after 0.7 seconds
          brand={brand}
        />
        <MetricCard
          title="Bounce Rate"
          value="0.0%"
          icon="trending"
          delay={25} // Start after 0.8 seconds
          brand={brand}
        />
        <MetricCard
          title="Total Events"
          value={16951}
          icon="zap"
          delay={30} // Start after 1 second
          brand={brand}
        />
      </div>

      {/* Traffic Chart */}
      <TrafficChart brand={brand} delay={50} />

      {/* Bottom Text */}
      <div style={{ 
        marginTop: 32, 
        textAlign: 'center',
        color: brand.subtle, 
        fontSize: 18,
        lineHeight: 1.6,
        transform: `translateY(${bottomTextY}px)`,
        opacity: bottomTextOpacity,
      }}>
        Advanced analytics powered by server-side tracking. Privacy-first data collection 
        that respects user consent while providing accurate insights for your business decisions.
      </div>
      {/* Bottom-centered Hardal logo (same as Intro scene) */}
      <img
        src={logoSrc}
        alt="Hardal logo"
        style={{
          position: 'absolute',
          bottom: 48,
          left: '50%',
          transform: `translateX(-50%) scale(${0.9 + popInLogo * 0.1})`,
          width: 160,
          height: 'auto',
          opacity: interpolate(f, [10, 30], [0, 1]),
          filter: 'drop-shadow(0 2px 8px rgba(0,0,0,0.35))',
          pointerEvents: 'none',
        }}
      />
    </AbsoluteFill>
  );
};
