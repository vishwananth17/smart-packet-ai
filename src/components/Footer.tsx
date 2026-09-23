'use client';

import React from 'react';
import Link from 'next/link';
import { Sparkles, ShieldCheck, Zap, Heart } from 'lucide-react';
import { PlatformBadge } from './PlatformBadge';

export function Footer() {
  return (
    <footer
      style={{
        marginTop: '5rem',
        borderTop: '1px solid rgba(100, 150, 255, 0.12)',
        background: 'linear-gradient(180deg, rgba(7, 13, 30, 0.6) 0%, rgba(5, 9, 20, 0.95) 100%)',
        padding: '3.5rem 0 2rem 0',
      }}
    >
      <div className="container">
        {/* Top platform bar */}
        <div
          style={{
            textAlign: 'center',
            marginBottom: '3rem',
            paddingBottom: '2.5rem',
            borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
          }}
        >
          <p style={{ fontSize: '0.85rem', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '1.25rem' }}>
            Supported Cross-Platform E-Commerce & Service Integrations
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '0.75rem' }}>
            <PlatformBadge platform="Amazon" size="md" />
            <PlatformBadge platform="Flipkart" size="md" />
            <PlatformBadge platform="IKEA" size="md" />
            <PlatformBadge platform="Pepperfry" size="md" />
            <PlatformBadge platform="Urban Ladder" size="md" />
            <PlatformBadge platform="Swiggy" size="md" />
            <PlatformBadge platform="Zomato" size="md" />
            <PlatformBadge platform="OYO" size="md" />
            <PlatformBadge platform="Tanishq" size="md" />
            <PlatformBadge platform="CaratLane" size="md" />
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '2.5rem', marginBottom: '3rem' }}>
          {/* Col 1: About */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1rem' }}>
              <div
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '8px',
                  background: 'linear-gradient(135deg, #4361ee 0%, #4cc9f0 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#ffffff',
                }}
              >
                <Sparkles size={18} />
              </div>
              <span style={{ fontSize: '1.2rem', fontWeight: 800, color: '#ffffff' }}>
                Pocket<span style={{ color: '#4cc9f0' }}>Smart</span> AI
              </span>
            </div>
            <p style={{ fontSize: '0.875rem', color: '#94a3b8', lineHeight: 1.6, marginBottom: '1rem' }}>
              Next-generation budget planning powered by Google Gemini 1.5 Flash. Personalized, context-aware product and service recommendations for everyday lifestyle needs.
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8rem', color: '#4cc9f0' }}>
              <Zap size={14} /> Multimodal AI Engine Ready
            </div>
          </div>

          {/* Col 2: Smart Planners */}
          <div>
            <h4 style={{ fontSize: '1rem', fontWeight: 700, color: '#ffffff', marginBottom: '1.2rem' }}>Smart Planners</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
              <li>
                <Link href="/home-planner" style={{ fontSize: '0.875rem', color: '#94a3b8', transition: 'color 0.2s' }}>
                  Home Interior Budget Planner
                </Link>
              </li>
              <li>
                <Link href="/party-planner" style={{ fontSize: '0.875rem', color: '#94a3b8', transition: 'color 0.2s' }}>
                  Party & Event Budget Planner
                </Link>
              </li>
              <li>
                <Link href="/jewelry-planner" style={{ fontSize: '0.875rem', color: '#94a3b8', transition: 'color 0.2s' }}>
                  Jewelry & Outfit Matching (Multimodal)
                </Link>
              </li>
              <li>
                <Link href="/history" style={{ fontSize: '0.875rem', color: '#94a3b8', transition: 'color 0.2s' }}>
                  Past Plans & Recommendation Logs
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Technology */}
          <div>
            <h4 style={{ fontSize: '1rem', fontWeight: 700, color: '#ffffff', marginBottom: '1.2rem' }}>Architecture</h4>
            <p style={{ fontSize: '0.875rem', color: '#94a3b8', lineHeight: 1.6, marginBottom: '0.75rem' }}>
              Engineered with Next.js 15, TypeScript, and Google Gemini 1.5 Flash Pro. Includes complete Python FastAPI backend module in <code style={{ color: '#4cc9f0' }}>/backend</code>.
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8rem', color: '#2ec4b6' }}>
              <ShieldCheck size={14} /> 100% Vercel & GitHub Deployable
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          style={{
            borderTop: '1px solid rgba(255, 255, 255, 0.06)',
            paddingTop: '1.75rem',
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontSize: '0.825rem',
            color: '#64748b',
          }}
        >
          <span>© {new Date().getFullYear()} PocketSmart AI. Built for smart budget recommendations.</span>
          <span>Powered by Gemini 1.5 Flash Pro • Vercel Ready</span>
        </div>
      </div>
    </footer>
  );
}
