import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate, spring, staticFile } from 'remotion';
import { Brand } from '../compositions/HardalMarketing';

interface ProblemCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  delay: number;
  brand: Brand;
}

const ProblemCard: React.FC<ProblemCardProps> = ({ title, description, icon, delay, brand }) => {
  const f = useCurrentFrame();
  const s = spring({ fps: 30, frame: f - delay, config: { damping: 150, stiffness: 200 } });
  const y = interpolate(s, [0, 1], [60, 0]);
  const o = interpolate(s, [0, 1], [0, 1]);
  const scale = interpolate(s, [0, 1], [0.8, 1]);
  const rotate = interpolate(s, [0, 1], [-5, 0]);

  return (
    <div
      style={{
        background: 'linear-gradient(135deg, rgba(124, 58, 237, 0.15) 0%, rgba(109, 40, 217, 0.08) 100%)',
        borderRadius: 16,
        padding: 28,
        border: '1px solid rgba(124, 58, 237, 0.4)',
        boxShadow: '0 8px 32px rgba(124, 58, 237, 0.2)',
        transform: `translateY(${y}px) scale(${scale}) rotate(${rotate}deg)`,
        opacity: o,
        display: 'flex',
        flexDirection: 'column',
        gap: 16,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Animated background glow */}
      <div
        style={{
          position: 'absolute',
          top: -50,
          right: -50,
          width: 100,
          height: 100,
          background: `radial-gradient(circle, rgba(124, 58, 237, 0.3) 0%, transparent 70%)`,
          borderRadius: '50%',
          animation: `pulse 3s ease-in-out infinite`,
        }}
      />
      
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: 12,
      }}>
        <div style={{
          width: 48,
          height: 48,
          borderRadius: 12,
          background: 'rgba(124, 58, 237, 0.25)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#a855f7',
        }}>
          {icon}
        </div>
        <h3 style={{
          fontSize: 18,
          fontWeight: 700,
          color: '#ffffff',
          margin: 0,
        }}>
          {title}
        </h3>
      </div>

      <p style={{
        color: brand.subtle,
        fontSize: 15,
        lineHeight: 1.6,
        margin: 0,
      }}>
        {description}
      </p>
    </div>
  );
};

const ComparisonDiagram: React.FC<{ brand: Brand; delay: number }> = ({ brand, delay }) => {
  const f = useCurrentFrame();
  const s = spring({ fps: 30, frame: f - delay, config: { damping: 150, stiffness: 200 } });
  const y = interpolate(s, [0, 1], [40, 0]);
  const o = interpolate(s, [0, 1], [0, 1]);

  return (
    <div
      style={{
        transform: `translateY(${y}px)`,
        opacity: o,
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 32,
        marginBottom: 24,
      }}
    >
      {/* Client-side tagging */}
      <div style={{
        background: 'rgba(239, 68, 68, 0.08)',
        borderRadius: 16,
        padding: 28,
        border: '1px solid rgba(239, 68, 68, 0.2)',
        display: 'flex',
        flexDirection: 'column',
        gap: 24,
      }}>
        {/* Top section - Title and Flow diagram aligned */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: 32,
        }}>
          {/* Title */}
          <div>
            <h3 style={{
              fontSize: 32,
              fontWeight: 700,
              color: '#ffffff',
              margin: 0,
              marginBottom: 8,
              lineHeight: 1.2,
            }}>
              Client-side
            </h3>
            <h3 style={{
              fontSize: 32,
              fontWeight: 700,
              color: '#ffffff',
              margin: 0,
              lineHeight: 1.2,
            }}>
              tagging
            </h3>
          </div>

          {/* Flow diagram */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 20,
          }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{
                width: 64,
                height: 64,
                borderRadius: '50%',
                background: 'rgba(148, 163, 184, 0.2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 12,
              }}>
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                  <circle cx="12" cy="7" r="4"/>
                </svg>
              </div>
              <span style={{ fontSize: 14, color: brand.subtle, fontWeight: 600 }}>User</span>
            </div>
            
            <div style={{ color: '#ef4444', fontSize: 32, fontWeight: 'bold' }}>→</div>
            
            <div style={{ textAlign: 'center' }}>
              <div style={{
                width: 64,
                height: 64,
                borderRadius: '50%',
                background: 'rgba(148, 163, 184, 0.2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 12,
                position: 'relative',
              }}>
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"/>
                  <line x1="2" y1="12" x2="22" y2="12"/>
                </svg>
                {/* Warning icon */}
                <div style={{
                  position: 'absolute',
                  top: -6,
                  right: -6,
                  width: 24,
                  height: 24,
                  borderRadius: '50%',
                  background: '#ef4444',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                  <span style={{ color: 'white', fontSize: 14, fontWeight: 'bold' }}>!</span>
                </div>
              </div>
              <span style={{ fontSize: 14, color: brand.subtle, fontWeight: 600 }}>Browser</span>
            </div>
            
            <div style={{ color: '#ef4444', fontSize: 32, fontWeight: 'bold' }}>→</div>
            
            <div style={{ textAlign: 'center' }}>
              <div style={{
                width: 64,
                height: 64,
                borderRadius: '50%',
                background: 'rgba(148, 163, 184, 0.2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 12,
              }}>
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2">
                  <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
                  <line x1="8" y1="21" x2="16" y2="21"/>
                  <line x1="12" y1="17" x2="12" y2="21"/>
                </svg>
              </div>
              <span style={{ fontSize: 14, color: brand.subtle, fontWeight: 600 }}>Analytics</span>
            </div>
          </div>
        </div>
        
        {/* Problems section */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {[
            '30-40% data loss',
            'Privacy issues',
            'Cookie dependent',
            'Slower performance'
          ].map((issue, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <span style={{ color: '#ef4444', fontSize: 24, fontWeight: 'bold' }}>✕</span>
              <span style={{ fontSize: 16, color: brand.subtle, fontWeight: 500 }}>{issue}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Server-side tagging */}
      <div style={{
        background: `linear-gradient(135deg, rgba(${parseInt(brand.accent.slice(1, 3), 16)}, ${parseInt(brand.accent.slice(3, 5), 16)}, ${parseInt(brand.accent.slice(5, 7), 16)}, 0.1) 0%, rgba(${parseInt(brand.accent.slice(1, 3), 16)}, ${parseInt(brand.accent.slice(3, 5), 16)}, ${parseInt(brand.accent.slice(5, 7), 16)}, 0.05) 100%)`,
        borderRadius: 16,
        padding: 28,
        border: `1px solid ${brand.accent}40`,
        display: 'flex',
        flexDirection: 'column',
        gap: 24,
      }}>
        {/* Top section - Title and Flow diagram aligned */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: 32,
        }}>
          {/* Title */}
          <div>
            <h3 style={{
              fontSize: 32,
              fontWeight: 700,
              color: '#ffffff',
              margin: 0,
              marginBottom: 8,
              lineHeight: 1.2,
            }}>
              Server-side
            </h3>
            <h3 style={{
              fontSize: 32,
              fontWeight: 700,
              color: '#ffffff',
              margin: 0,
              lineHeight: 1.2,
            }}>
              tagging
            </h3>
          </div>

          {/* Flow diagram */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 16,
          }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{
                width: 64,
                height: 64,
                borderRadius: '50%',
                background: 'rgba(148, 163, 184, 0.2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 12,
              }}>
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                  <circle cx="12" cy="7" r="4"/>
                </svg>
              </div>
              <span style={{ fontSize: 14, color: brand.subtle, fontWeight: 600 }}>User</span>
            </div>
            
            <div style={{ color: brand.accent, fontSize: 28, fontWeight: 'bold' }}>→</div>
            
            <div style={{ textAlign: 'center' }}>
              <div style={{
                width: 64,
                height: 64,
                borderRadius: '50%',
                background: 'rgba(148, 163, 184, 0.2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 12,
              }}>
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"/>
                  <line x1="2" y1="12" x2="22" y2="12"/>
                </svg>
              </div>
              <span style={{ fontSize: 14, color: brand.subtle, fontWeight: 600 }}>Browser</span>
            </div>
            
            <div style={{ color: brand.accent, fontSize: 28, fontWeight: 'bold' }}>→</div>
            
            <div style={{ textAlign: 'center' }}>
              <div style={{
                width: 64,
                height: 64,
                borderRadius: '50%',
                background: `${brand.accent}20`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 12,
                position: 'relative',
              }}>
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke={brand.accent} strokeWidth="2">
                  <rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18"/>
                  <line x1="7" y1="2" x2="7" y2="22"/>
                  <line x1="17" y1="2" x2="17" y2="22"/>
                  <line x1="2" y1="12" x2="22" y2="12"/>
                  <line x1="2" y1="7" x2="7" y2="7"/>
                  <line x1="2" y1="17" x2="7" y2="17"/>
                  <line x1="17" y1="17" x2="22" y2="17"/>
                  <line x1="17" y1="7" x2="22" y2="7"/>
                </svg>
                {/* Lock icon */}
                <div style={{
                  position: 'absolute',
                  top: -6,
                  right: -6,
                  width: 24,
                  height: 24,
                  borderRadius: '50%',
                  background: brand.accent,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                    <circle cx="12" cy="16" r="1"/>
                    <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                  </svg>
                </div>
              </div>
              <span style={{ fontSize: 14, color: brand.subtle, fontWeight: 600 }}>Server</span>
            </div>
            
            <div style={{ color: brand.accent, fontSize: 28, fontWeight: 'bold' }}>→</div>
            
            <div style={{ textAlign: 'center' }}>
              <div style={{
                width: 64,
                height: 64,
                borderRadius: '50%',
                background: 'rgba(148, 163, 184, 0.2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 12,
              }}>
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2">
                  <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
                  <line x1="8" y1="21" x2="16" y2="21"/>
                  <line x1="12" y1="17" x2="12" y2="21"/>
                </svg>
              </div>
              <span style={{ fontSize: 14, color: brand.subtle, fontWeight: 600 }}>Analytics</span>
            </div>
          </div>
        </div>
        
        {/* Benefits section */}
        <div>
          <h4 style={{ color: brand.accent, fontSize: 20, fontWeight: 700, margin: '0 0 16px 0' }}>Benefits:</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {[
              '99% accurate data collection - bypass ad blockers',
              'First-party data control and ownership',
              'Full GDPR & KVKK compliance with data governance',
              'Faster website performance with fewer client-side scripts'
            ].map((benefit, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                <span style={{ color: brand.accent, fontSize: 20, marginTop: 2, fontWeight: 'bold' }}>✓</span>
                <span style={{ fontSize: 14, color: brand.subtle, lineHeight: 1.4, fontWeight: 500 }}>{benefit}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const SolutionSection: React.FC<{ brand: Brand; delay: number }> = ({ brand, delay }) => {
  const f = useCurrentFrame();
  const s = spring({ fps: 30, frame: f - delay, config: { damping: 120, stiffness: 180 } });
  const y = interpolate(s, [0, 1], [40, 0]);
  const o = interpolate(s, [0, 1], [0, 1]);
  const scale = interpolate(s, [0, 1], [0.95, 1]);

  return (
    <div
      style={{
        background: `linear-gradient(135deg, rgba(${parseInt(brand.accent.slice(1, 3), 16)}, ${parseInt(brand.accent.slice(3, 5), 16)}, ${parseInt(brand.accent.slice(5, 7), 16)}, 0.15) 0%, rgba(${parseInt(brand.accent.slice(1, 3), 16)}, ${parseInt(brand.accent.slice(3, 5), 16)}, ${parseInt(brand.accent.slice(5, 7), 16)}, 0.08) 100%)`,
        borderRadius: 24,
        padding: 48,
        border: `2px solid ${brand.accent}60`,
        boxShadow: `0 20px 60px ${brand.accent}30`,
        transform: `translateY(${y}px) scale(${scale})`,
        opacity: o,
        position: 'relative',
        overflow: 'hidden',
        textAlign: 'center',
        maxWidth: '800px',
        margin: '0 auto',
      }}
    >
      {/* Animated background elements */}
      <div
        style={{
          position: 'absolute',
          top: -40,
          left: -40,
          width: 200,
          height: 200,
          background: `radial-gradient(circle, ${brand.accent}15 0%, transparent 70%)`,
          borderRadius: '50%',
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: -60,
          right: -60,
          width: 160,
          height: 160,
          background: `radial-gradient(circle, ${brand.accent}10 0%, transparent 70%)`,
          borderRadius: '50%',
        }}
      />

      <div>
        <h2 style={{
          fontSize: 36,
          fontWeight: 800,
          color: '#ffffff',
          margin: 0,
          marginBottom: 16,
          background: `linear-gradient(135deg, ${brand.accent} 0%, #ffffff 100%)`,
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          color: 'transparent',
        }}>
          The Hardal Solution
        </h2>
        <p style={{
          color: brand.accent,
          fontSize: 20,
          margin: 0,
          fontWeight: 600,
          marginBottom: 20,
        }}>
          Regain data accuracy and maintain privacy compliance
        </p>
        <p style={{
          color: brand.subtle,
          fontSize: 20,
          lineHeight: 1.7,
          margin: 0,
        }}>
          To regain data accuracy and maintain privacy compliance, companies are switching to Hardal.
        </p>
      </div>
    </div>
  );
};

export const BenefitsScene: React.FC<{ brand: Brand }> = ({ brand }) => {
  const f = useCurrentFrame();
  
  // Main title animation
  const titleSpring = spring({ fps: 30, frame: f, config: { damping: 200, stiffness: 300 } });
  const titleY = interpolate(titleSpring, [0, 1], [50, 0]);
  const titleOpacity = interpolate(titleSpring, [0, 1], [0, 1]);
  const titleScale = interpolate(titleSpring, [0, 1], [0.9, 1]);

  // Subtitle animation
  const subtitleSpring = spring({ fps: 30, frame: f - 30, config: { damping: 200, stiffness: 300 } });
  const subtitleY = interpolate(subtitleSpring, [0, 1], [30, 0]);
  const subtitleOpacity = interpolate(subtitleSpring, [0, 1], [0, 1]);

  // Logo animation (consistent with other scenes)
  const logoSrc = staticFile('hardal-logo-white.png');
  const popInLogo = spring({ fps: 30, frame: f, config: { damping: 180, stiffness: 120 } });

  // Problems data
  const problems = [
    {
      title: "Not Built for Privacy-First Marketing",
      description: "Require complex workarounds to comply with GDPR, KVKK and other regulations",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
          <path d="M9 12l2 2 4-4"/>
        </svg>
      ),
    },
    {
      title: "Lose Significant Amounts of Data",
      description: "Ad blockers, ITP, and cookie consent barriers block critical conversion data",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M3 3l18 18"/>
          <path d="M20.49 9A9 9 0 0 0 5.64 5.64L20.49 9z"/>
          <path d="M9.36 18.36A9 9 0 0 0 20.49 9"/>
        </svg>
      ),
    },
    {
      title: "Don't Scale Across Platforms",
      description: "Break down under the complexity of multi-channel attribution",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
          <polyline points="7.5,4.21 12,6.81 16.5,4.21"/>
          <polyline points="7.5,19.79 7.5,14.6 3,12"/>
          <polyline points="21,12 16.5,14.6 16.5,19.79"/>
        </svg>
      ),
    },
  ];

  return (
    <AbsoluteFill style={{ 
      padding: 60,
      background: 'linear-gradient(135deg, #0c0a1e 0%, #1a1738 100%)',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Animated background elements */}
      <div
        style={{
          position: 'absolute',
          top: -200,
          left: -200,
          width: 400,
          height: 400,
          background: `radial-gradient(circle, ${brand.accent}08 0%, transparent 70%)`,
          borderRadius: '50%',
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: -150,
          right: -150,
          width: 300,
          height: 300,
          background: `radial-gradient(circle, rgba(239, 68, 68, 0.06) 0%, transparent 70%)`,
          borderRadius: '50%',
        }}
      />

      {/* Header Section */}
      <div style={{ 
        marginBottom: 48,
        textAlign: 'center',
        transform: `translateY(${titleY}px) scale(${titleScale})`,
        opacity: titleOpacity,
      }}>


        <h1 style={{ 
          fontSize: 48, 
          fontWeight: 800, 
          margin: 0,
          marginBottom: 16,
          background: `linear-gradient(135deg, ${brand.accent} 0%, #ffffff 100%)`,
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          color: 'transparent',
          lineHeight: 1.2,
        }}>
          Why do marketing teams switch to Hardal?
        </h1>
        
        <div style={{
          transform: `translateY(${subtitleY}px)`,
          opacity: subtitleOpacity,
        }}>
          <p style={{
            fontSize: 20,
            color: brand.subtle,
            margin: 0,
            maxWidth: '800px',
            marginLeft: 'auto',
            marginRight: 'auto',
            lineHeight: 1.6,
          }}>
            Traditional marketing measurement tools suffer from three core problems:
          </p>
        </div>
      </div>

      {/* Problems Grid */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(3, 1fr)', 
        gap: 24,
        marginBottom: 48,
      }}>
        {problems.map((problem, index) => (
          <ProblemCard
            key={index}
            title={problem.title}
            description={problem.description}
            icon={problem.icon}
            delay={80 + index * 30}
            brand={brand}
          />
        ))}
      </div>

      {/* Impact Statement - Smaller padding */}
      <div style={{
        textAlign: 'center',
        marginBottom: 24,
        padding: '16px 0',
      }}>
        <p style={{
          fontSize: 32,
          color: '#ffffff',
          fontWeight: 700,
          margin: 0,
          opacity: interpolate(f, [200, 230], [0, 1], { extrapolateRight: 'clamp' }),
          transform: `translateY(${interpolate(f, [200, 230], [30, 0], { extrapolateRight: 'clamp' })}px)`,
          lineHeight: 1.3,
          maxWidth: '900px',
          marginLeft: 'auto',
          marginRight: 'auto',
        }}>
          As a result, teams lose visibility into campaign performance and marketing ROI.
        </p>
      </div>

      {/* Comparison Diagram */}
      <ComparisonDiagram brand={brand} delay={250} />

      {/* Bottom-centered Hardal logo (consistent with other scenes) */}
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

      {/* Add some CSS for animations */}
      <style>{`
        @keyframes pulse {
          0%, 100% { transform: scale(1); opacity: 0.3; }
          50% { transform: scale(1.1); opacity: 0.6; }
        }
      `}</style>
    </AbsoluteFill>
  );
};