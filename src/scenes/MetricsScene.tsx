import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate, spring, staticFile } from 'remotion';
import { Brand } from '../compositions/HardalMarketing';

interface CampaignData {
  source: string;
  medium: string;
  campaign: string;
  visitors: number;
  conversions: number;
  conversionRate: number;
  totalValue: string;
}

const AttributionSummary: React.FC<{ brand: Brand; delay: number }> = ({ brand, delay }) => {
  const f = useCurrentFrame();
  const s = spring({ fps: 30, frame: f - delay, config: { damping: 200, stiffness: 200 } });
  const y = interpolate(s, [0, 1], [30, 0]);
  const o = interpolate(s, [0, 1], [0, 1]);

  const summaryItems = [
    { label: 'Attribution Model:', value: 'First Click' },
    { label: 'Attribution Window:', value: '30 days' },
    { label: 'Total Conversions:', value: '496' },
    { label: 'Total Value:', value: 'C$0' }
  ];

  return (
    <div
      style={{
        background: 'rgba(20,16,32,0.85)',
        border: '1px solid rgba(255,255,255,0.14)',
        borderRadius: 12,
        padding: 24,
        marginBottom: 24,
        transform: `translateY(${y}px)`,
        opacity: o,
        boxShadow: '0 8px 24px rgba(0,0,0,0.3)',
      }}
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 32 }}>
        {summaryItems.map((item, index) => (
          <div key={index} style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <div style={{ color: brand.subtle, fontSize: 14, fontWeight: 500 }}>
              {item.label}
            </div>
            <div style={{ color: '#ffffff', fontSize: 20, fontWeight: 700 }}>
              {item.value}
            </div>
          </div>
        ))}
      </div>
      <div style={{ 
        marginTop: 16, 
        paddingTop: 16, 
        borderTop: '1px solid rgba(255,255,255,0.1)',
        color: brand.subtle, 
        fontSize: 12 
      }}>
        Advanced Attribution: Enhanced multi-touch attribution analysis with 496 attributed conversions
      </div>
    </div>
  );
};

const TableHeader: React.FC<{ brand: Brand; delay: number }> = ({ brand, delay }) => {
  const f = useCurrentFrame();
  const s = spring({ fps: 30, frame: f - delay, config: { damping: 200, stiffness: 200 } });
  const y = interpolate(s, [0, 1], [20, 0]);
  const o = interpolate(s, [0, 1], [0, 1]);

  const headers = ['Source', 'Medium', 'Campaign', 'Visitors', 'Conversions', 'Conv. Rate', 'Total Value'];

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '140px 120px 180px 100px 120px 120px 120px',
        gap: 16,
        padding: '16px 24px',
        background: 'rgba(30,26,42,0.9)',
        borderBottom: '1px solid rgba(255,255,255,0.1)',
        borderTopLeftRadius: 12,
        borderTopRightRadius: 12,
        transform: `translateY(${y}px)`,
        opacity: o,
      }}
    >
      {headers.map((header, index) => (
        <div
          key={index}
          style={{
            color: brand.subtle,
            fontSize: 13,
            fontWeight: 600,
            textTransform: 'uppercase',
            letterSpacing: '0.5px',
          }}
        >
          {header}
        </div>
      ))}
    </div>
  );
};

const CampaignRow: React.FC<{ 
  data: CampaignData; 
  brand: Brand; 
  delay: number; 
  isLast: boolean;
}> = ({ data, brand, delay, isLast }) => {
  const f = useCurrentFrame();
  const s = spring({ fps: 30, frame: f - delay, config: { damping: 200, stiffness: 200 } });
  const y = interpolate(s, [0, 1], [30, 0]);
  const o = interpolate(s, [0, 1], [0, 1]);

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '140px 120px 180px 100px 120px 120px 120px',
        gap: 16,
        padding: '16px 24px',
        background: 'rgba(20,16,32,0.6)',
        borderBottom: isLast ? 'none' : '1px solid rgba(255,255,255,0.05)',
        transform: `translateY(${y}px)`,
        opacity: o,
        transition: 'background-color 0.2s ease',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <div
          style={{
            width: 8,
            height: 8,
            borderRadius: '50%',
            backgroundColor: brand.accent,
          }}
        />
        <span style={{ color: '#ffffff', fontSize: 14, fontWeight: 500 }}>
          {data.source}
        </span>
      </div>
      <div style={{ color: '#cbd5e1', fontSize: 14 }}>{data.medium}</div>
      <div style={{ color: '#ffffff', fontSize: 14 }}>{data.campaign}</div>
      <div style={{ color: '#ffffff', fontSize: 14, textAlign: 'right' }}>
        {data.visitors}
      </div>
      <div style={{ color: '#ffffff', fontSize: 14, fontWeight: 600, textAlign: 'right' }}>
        {data.conversions}
      </div>
      <div style={{ 
        color: data.conversionRate === 100 ? '#10b981' : '#ffffff', 
        fontSize: 14, 
        fontWeight: 600,
        textAlign: 'right'
      }}>
        {data.conversionRate.toFixed(1)}%
      </div>
      <div style={{ color: '#ffffff', fontSize: 14, textAlign: 'right' }}>
        {data.totalValue}
      </div>
    </div>
  );
};

const FilterSection: React.FC<{ brand: Brand; delay: number }> = ({ brand, delay }) => {
  const f = useCurrentFrame();
  const s = spring({ fps: 30, frame: f - delay, config: { damping: 200, stiffness: 200 } });
  const y = interpolate(s, [0, 1], [20, 0]);
  const o = interpolate(s, [0, 1], [0, 1]);

  return (
    <div
      style={{
        display: 'flex',
        gap: 16,
        marginBottom: 24,
        transform: `translateY(${y}px)`,
        opacity: o,
      }}
    >
      {['Filter by source...', 'Filter by medium...', 'Filter by campaign...'].map((placeholder, index) => (
        <div
          key={index}
          style={{
            flex: 1,
            padding: '12px 16px',
            background: 'rgba(20,16,32,0.8)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: 8,
            color: brand.subtle,
            fontSize: 14,
            display: 'flex',
            alignItems: 'center',
            gap: 8,
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path
              d="M21 21L16.514 16.506M19 10.5C19 15.194 15.194 19 10.5 19S2 15.194 2 10.5 5.806 2 10.5 2 19 5.806 19 10.5Z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          {placeholder}
        </div>
      ))}
    </div>
  );
};

export const MetricsScene: React.FC<{
  brand: Brand;
}>
= ({ brand }) => {
  const f = useCurrentFrame();
  const popInLogo = spring({ fps: 30, frame: f, config: { damping: 180, stiffness: 120 } });
  const logoSrc = staticFile('hardal-logo-white.png');
  const campaignData: CampaignData[] = [
    { source: 'direct', medium: 'none', campaign: 'none', visitors: 12, conversions: 55, conversionRate: 100.0, totalValue: 'C$0' },
    { source: 'instagram', medium: 'search', campaign: 'lead_generation', visitors: 1, conversions: 35, conversionRate: 100.0, totalValue: 'C$0' },
    { source: 'youtube', medium: 'cpc', campaign: 'summer_sale', visitors: 1, conversions: 54, conversionRate: 100.0, totalValue: 'C$0' },
    { source: 'youtube', medium: 'search', campaign: 'spring_collection', visitors: 1, conversions: 36, conversionRate: 100.0, totalValue: 'C$0' },
    { source: 'google', medium: 'display', campaign: 'cyber_monday', visitors: 1, conversions: 58, conversionRate: 100.0, totalValue: 'C$0' },
  ];

  return (
    <AbsoluteFill style={{ padding: 60, background: 'linear-gradient(135deg, #0c0a1e 0%, #1a1738 100%)' }}>
      {/* Header */}
      <div style={{ 
        fontSize: 42, 
        fontWeight: 800, 
        marginBottom: 32,
        background: `linear-gradient(135deg, ${brand.accent} 0%, #ffffff 100%)`,
        backgroundClip: 'text',
        WebkitBackgroundClip: 'text',
        color: 'transparent',
      }}>
        Campaign Reports
      </div>

      {/* Attribution Summary */}
      <AttributionSummary brand={brand} delay={10} />

      {/* Campaign Attribution Analysis Section */}
      <div style={{ 
        marginBottom: 32,
        fontSize: 28,
        fontWeight: 700,
        color: '#ffffff'
      }}>
        Campaign Attribution Analysis
      </div>
      
      <div style={{ 
        color: brand.subtle, 
        fontSize: 16, 
        marginBottom: 24 
      }}>
        Complete view of all traffic sources, mediums, and campaigns with conversion tracking
      </div>

      {/* Filters */}
      <FilterSection brand={brand} delay={30} />

      {/* Table Container */}
      <div style={{
        background: 'rgba(20,16,32,0.4)',
        borderRadius: 12,
        border: '1px solid rgba(255,255,255,0.14)',
        boxShadow: '0 12px 40px rgba(0,0,0,0.4)',
        overflow: 'hidden',
      }}>
        {/* Table Header */}
        <TableHeader brand={brand} delay={40} />
        
        {/* Table Rows */}
        {campaignData.map((campaign, index) => (
          <CampaignRow
            key={`${campaign.source}-${campaign.medium}-${campaign.campaign}`}
            data={campaign}
            brand={brand}
            delay={50 + index * 8}
            isLast={index === campaignData.length - 1}
          />
        ))}
        
        {/* Table Footer */}
        <div style={{
          padding: '16px 24px',
          background: 'rgba(30,26,42,0.9)',
          borderTop: '1px solid rgba(255,255,255,0.1)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
          <div style={{ color: brand.subtle, fontSize: 14 }}>
            📊 Showing 5 of 11 campaigns
          </div>
          <div style={{ color: brand.subtle, fontSize: 14 }}>
            Total: 496 conversions
          </div>
        </div>
      </div>

      {/* Pagination Controls */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 16,
        marginTop: 24,
      }}>
        <div style={{
          padding: '8px 12px',
          background: 'rgba(20,16,32,0.8)',
          border: '1px solid rgba(255,255,255,0.1)',
          borderRadius: 6,
          color: brand.subtle,
          fontSize: 14,
        }}>
          Show: 5
        </div>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          color: brand.subtle,
          fontSize: 14,
        }}>
          <button style={{
            background: 'none',
            border: 'none',
            color: brand.subtle,
            fontSize: 18,
            cursor: 'pointer',
          }}>
            ‹
          </button>
          <span>1 / 3</span>
          <button style={{
            background: 'none',
            border: 'none',
            color: brand.subtle,
            fontSize: 18,
            cursor: 'pointer',
          }}>
            ›
          </button>
        </div>
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
