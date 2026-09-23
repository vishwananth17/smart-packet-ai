'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Sparkles,
  Home,
  PartyPopper,
  Gem,
  ArrowRight,
  TrendingDown,
  ShieldCheck,
  Zap,
  Sliders,
  Camera,
  CheckCircle,
  ExternalLink,
} from 'lucide-react';
import { PlatformBadge } from '@/components/PlatformBadge';

export default function HomePage() {
  const [quickBudget, setQuickBudget] = useState(25000);
  const [quickCurrency, setQuickCurrency] = useState<'INR' | 'USD'>('INR');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '4.5rem' }}>
      {/* HERO SECTION matching PDF Screenshot exactly */}
      <section
        style={{
          position: 'relative',
          padding: '5rem 0 4rem 0',
          textAlign: 'center',
          overflow: 'hidden',
          background: 'radial-gradient(ellipse at 50% 10%, rgba(67, 97, 238, 0.25) 0%, rgba(7, 13, 30, 0) 70%)',
        }}
      >
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          {/* Top pill badge */}
          <div style={{ display: 'inline-flex', marginBottom: '1.5rem' }}>
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.45rem',
                fontSize: '0.85rem',
                fontWeight: 600,
                color: '#4cc9f0',
                background: 'rgba(76, 201, 240, 0.1)',
                border: '1px solid rgba(76, 201, 240, 0.3)',
                padding: '0.4rem 1rem',
                borderRadius: '999px',
              }}
            >
              <Sparkles size={15} /> Powered by Google Gemini 1.5 Flash Pro
            </span>
          </div>

          {/* Main App Title */}
          <h1
            style={{
              fontSize: 'clamp(2.5rem, 5vw, 4.2rem)',
              fontWeight: 800,
              lineHeight: 1.15,
              marginBottom: '1rem',
              letterSpacing: '-0.03em',
            }}
          >
            Pocket<span style={{ color: '#4cc9f0' }}>Smart</span>
          </h1>

          {/* Subtitle matching doc */}
          <h2
            style={{
              fontSize: 'clamp(1.25rem, 2.8vw, 2rem)',
              fontWeight: 600,
              color: '#e2e8f0',
              marginBottom: '1.25rem',
              letterSpacing: '-0.01em',
            }}
          >
            AI-Powered Budget Planning for Everyday Needs
          </h2>

          {/* Descriptive text matching doc */}
          <p
            style={{
              maxWidth: '680px',
              margin: '0 auto 2.5rem auto',
              fontSize: 'clamp(0.95rem, 1.8vw, 1.125rem)',
              color: '#94a3b8',
              lineHeight: 1.6,
            }}
          >
            Make smarter financial decisions with personalized budget recommendations for home
            interiors, parties, and jewelry purchases. Our AI helps you get the most value for your
            money.
          </p>

          {/* CTA Buttons matching doc screenshot */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '1rem',
              justifyContent: 'center',
              alignItems: 'center',
              marginBottom: '3rem',
            }}
          >
            <Link
              href="/home-planner"
              className="btn btn-outline-white"
              style={{
                padding: '0.85rem 2rem',
                fontSize: '1rem',
                borderRadius: '999px',
                minWidth: '150px',
              }}
            >
              Get Started
            </Link>
            <a
              href="#smart-planners"
              className="btn btn-secondary"
              style={{
                padding: '0.85rem 2rem',
                fontSize: '1rem',
                borderRadius: '999px',
                minWidth: '150px',
              }}
            >
              Learn More
            </a>
          </div>

          {/* Platform tags */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexWrap: 'wrap',
              gap: '0.85rem',
              opacity: 0.9,
            }}
          >
            <span style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: 600 }}>Cross-Platform Sourcing:</span>
            <PlatformBadge platform="Amazon" />
            <PlatformBadge platform="Flipkart" />
            <PlatformBadge platform="IKEA" />
            <PlatformBadge platform="Swiggy" />
            <PlatformBadge platform="Zomato" />
            <PlatformBadge platform="OYO" />
            <PlatformBadge platform="Tanishq" />
          </div>
        </div>
      </section>

      {/* THREE SMART BUDGET PLANNERS (Exact replica of page 2-7 screenshot) */}
      <section id="smart-planners" className="container" style={{ scrollMarginTop: '6rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.4rem)', fontWeight: 800, marginBottom: '0.75rem' }}>
            Our Smart Budget Planners
          </h2>
          <p style={{ color: '#94a3b8', fontSize: '1rem', maxWidth: '600px', margin: '0 auto' }}>
            Discover how PocketSmart helps you make better financial decisions across different areas of your life
          </p>
        </div>

        {/* 3 Screenshot replica cards */}
        <div className="grid-3">
          {/* Card 1: Home Interior */}
          <div className="screenshot-card">
            <div className="screenshot-card-header">
              <div
                style={{
                  width: '60px',
                  height: '60px',
                  borderRadius: '16px',
                  background: 'rgba(255, 255, 255, 0.12)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#ffffff',
                }}
              >
                <Home size={34} />
              </div>
            </div>
            <div className="screenshot-card-body">
              <h3 className="screenshot-card-title">Home Interior Budget Planner</h3>
              <p className="screenshot-card-desc">
                Get personalized recommendations for furniture, lighting, and decor that fit your
                style preferences and budget constraints. Our AI helps you create a beautiful
                space without overspending.
              </p>
              <div style={{ marginTop: 'auto', paddingTop: '1rem', borderTop: '1px solid #e2e8f0' }}>
                <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
                  <span style={{ fontSize: '0.7rem', background: '#f1f5f9', padding: '3px 8px', borderRadius: '4px', color: '#475569' }}>
                    IKEA & Pepperfry
                  </span>
                  <span style={{ fontSize: '0.7rem', background: '#f1f5f9', padding: '3px 8px', borderRadius: '4px', color: '#475569' }}>
                    Room Allocation
                  </span>
                  <span style={{ fontSize: '0.7rem', background: '#f1f5f9', padding: '3px 8px', borderRadius: '4px', color: '#475569' }}>
                    Style Harmonizer
                  </span>
                </div>
                <Link
                  href="/home-planner"
                  className="btn btn-primary"
                  style={{ width: '100%', fontSize: '0.9rem', padding: '0.7rem 1rem' }}
                >
                  Launch Home Planner <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </div>

          {/* Card 2: Party Budget Planner */}
          <div className="screenshot-card">
            <div className="screenshot-card-header">
              <div
                style={{
                  width: '60px',
                  height: '60px',
                  borderRadius: '16px',
                  background: 'rgba(255, 255, 255, 0.12)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#ffffff',
                }}
              >
                <PartyPopper size={34} />
              </div>
            </div>
            <div className="screenshot-card-body">
              <h3 className="screenshot-card-title">Party Budget Planner</h3>
              <p className="screenshot-card-desc">
                Plan your perfect event with smart budget allocations for venue, catering,
                decorations, and entertainment. Our AI suggests the best ways to create memorable
                events while staying within your budget.
              </p>
              <div style={{ marginTop: 'auto', paddingTop: '1rem', borderTop: '1px solid #e2e8f0' }}>
                <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
                  <span style={{ fontSize: '0.7rem', background: '#f1f5f9', padding: '3px 8px', borderRadius: '4px', color: '#475569' }}>
                    Swiggy & Zomato
                  </span>
                  <span style={{ fontSize: '0.7rem', background: '#f1f5f9', padding: '3px 8px', borderRadius: '4px', color: '#475569' }}>
                    OYO & Venues
                  </span>
                  <span style={{ fontSize: '0.7rem', background: '#f1f5f9', padding: '3px 8px', borderRadius: '4px', color: '#475569' }}>
                    Timeline Checklist
                  </span>
                </div>
                <Link
                  href="/party-planner"
                  className="btn btn-primary"
                  style={{ width: '100%', fontSize: '0.9rem', padding: '0.7rem 1rem' }}
                >
                  Launch Party Planner <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </div>

          {/* Card 3: Jewelry Budget Planner */}
          <div className="screenshot-card">
            <div className="screenshot-card-header">
              <div
                style={{
                  width: '60px',
                  height: '60px',
                  borderRadius: '16px',
                  background: 'rgba(255, 255, 255, 0.12)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#ffffff',
                }}
              >
                <Gem size={34} />
              </div>
            </div>
            <div className="screenshot-card-body">
              <h3 className="screenshot-card-title">Jewelry Budget Planner</h3>
              <p className="screenshot-card-desc">
                Find the ideal jewelry pieces for any occasion that match your outfit and budget.
                Our AI recommends options based on your style preferences, occasion, and
                available budget.
              </p>
              <div style={{ marginTop: 'auto', paddingTop: '1rem', borderTop: '1px solid #e2e8f0' }}>
                <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
                  <span style={{ fontSize: '0.7rem', background: '#e0f2fe', color: '#0369a1', fontWeight: 600, padding: '3px 8px', borderRadius: '4px' }}>
                    ★ Multimodal Image AI
                  </span>
                  <span style={{ fontSize: '0.7rem', background: '#f1f5f9', padding: '3px 8px', borderRadius: '4px', color: '#475569' }}>
                    Tanishq & CaratLane
                  </span>
                  <span style={{ fontSize: '0.7rem', background: '#f1f5f9', padding: '3px 8px', borderRadius: '4px', color: '#475569' }}>
                    Color Match
                  </span>
                </div>
                <Link
                  href="/jewelry-planner"
                  className="btn btn-primary"
                  style={{ width: '100%', fontSize: '0.9rem', padding: '0.7rem 1rem' }}
                >
                  Launch Jewelry Planner <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* INTERACTIVE BUDGET SIMULATION WIDGET */}
      <section className="container">
        <div
          className="glass-panel"
          style={{
            padding: '2.5rem',
            background: 'linear-gradient(135deg, rgba(13, 27, 62, 0.8) 0%, rgba(18, 30, 66, 0.7) 100%)',
          }}
        >
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2.5rem', alignItems: 'center' }}>
            <div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', color: '#4cc9f0', fontSize: '0.85rem', fontWeight: 700, marginBottom: '0.75rem' }}>
                <Sliders size={16} /> INTERACTIVE BUDGET SIMULATOR
              </div>
              <h3 style={{ fontSize: '1.85rem', fontWeight: 800, marginBottom: '0.75rem', lineHeight: 1.25 }}>
                See how AI optimizes your spending across real categories
              </h3>
              <p style={{ color: '#94a3b8', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '1.75rem' }}>
                Adjust the slider below to test PocketSmart’s algorithmic budget split. Our Gemini-powered engine dynamically balances quality, aesthetics, and affordability.
              </p>

              {/* Controls */}
              <div style={{ background: 'rgba(11, 20, 48, 0.7)', padding: '1.25rem', borderRadius: '14px', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                  <span style={{ fontSize: '0.85rem', color: '#94a3b8' }}>Target Budget</span>
                  <div style={{ display: 'flex', gap: '0.4rem' }}>
                    <button
                      onClick={() => { setQuickCurrency('INR'); setQuickBudget(25000); }}
                      style={{
                        padding: '3px 8px',
                        fontSize: '0.75rem',
                        borderRadius: '6px',
                        background: quickCurrency === 'INR' ? '#4361ee' : 'transparent',
                        color: '#ffffff',
                        border: '1px solid rgba(255, 255, 255, 0.2)',
                        cursor: 'pointer',
                      }}
                    >
                      ₹ INR
                    </button>
                    <button
                      onClick={() => { setQuickCurrency('USD'); setQuickBudget(800); }}
                      style={{
                        padding: '3px 8px',
                        fontSize: '0.75rem',
                        borderRadius: '6px',
                        background: quickCurrency === 'USD' ? '#4361ee' : 'transparent',
                        color: '#ffffff',
                        border: '1px solid rgba(255, 255, 255, 0.2)',
                        cursor: 'pointer',
                      }}
                    >
                      $ USD
                    </button>
                  </div>
                </div>

                <div style={{ fontSize: '2rem', fontWeight: 800, color: '#ffffff', marginBottom: '0.5rem' }}>
                  {quickCurrency === 'INR' ? '₹' : '$'}{quickBudget.toLocaleString()}
                </div>

                <input
                  type="range"
                  min={quickCurrency === 'INR' ? 5000 : 100}
                  max={quickCurrency === 'INR' ? 200000 : 5000}
                  step={quickCurrency === 'INR' ? 1000 : 50}
                  value={quickBudget}
                  onChange={(e) => setQuickBudget(Number(e.target.value))}
                  style={{ width: '100%', accentColor: '#4cc9f0', cursor: 'pointer' }}
                />
              </div>
            </div>

            {/* Simulated AI Split Preview */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ fontSize: '0.85rem', color: '#4cc9f0', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Algorithmic Allocation Preview (Party Scenario)
              </div>

              {/* Item 1 */}
              <div style={{ background: 'rgba(11, 20, 48, 0.8)', padding: '1rem', borderRadius: '12px', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem', fontSize: '0.9rem' }}>
                  <span style={{ fontWeight: 600 }}>Catering & Beverages (45%)</span>
                  <span style={{ color: '#4cc9f0', fontWeight: 700 }}>
                    {quickCurrency === 'INR' ? '₹' : '$'}{Math.round(quickBudget * 0.45).toLocaleString()}
                  </span>
                </div>
                <div style={{ width: '100%', height: '6px', background: 'rgba(255,255,255,0.1)', borderRadius: '999px', overflow: 'hidden' }}>
                  <div style={{ width: '45%', height: '100%', background: '#4361ee' }} />
                </div>
                <span style={{ fontSize: '0.75rem', color: '#94a3b8', marginTop: '0.4rem', display: 'block' }}>
                  Sourced via Swiggy & Zomato bulk party catering
                </span>
              </div>

              {/* Item 2 */}
              <div style={{ background: 'rgba(11, 20, 48, 0.8)', padding: '1rem', borderRadius: '12px', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem', fontSize: '0.9rem' }}>
                  <span style={{ fontWeight: 600 }}>Venue & Accommodations (25%)</span>
                  <span style={{ color: '#4cc9f0', fontWeight: 700 }}>
                    {quickCurrency === 'INR' ? '₹' : '$'}{Math.round(quickBudget * 0.25).toLocaleString()}
                  </span>
                </div>
                <div style={{ width: '100%', height: '6px', background: 'rgba(255,255,255,0.1)', borderRadius: '999px', overflow: 'hidden' }}>
                  <div style={{ width: '25%', height: '100%', background: '#4cc9f0' }} />
                </div>
                <span style={{ fontSize: '0.75rem', color: '#94a3b8', marginTop: '0.4rem', display: 'block' }}>
                  Sourced via OYO Townhouse / Airbnb Party Halls
                </span>
              </div>

              {/* Item 3 */}
              <div style={{ background: 'rgba(11, 20, 48, 0.8)', padding: '1rem', borderRadius: '12px', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem', fontSize: '0.9rem' }}>
                  <span style={{ fontWeight: 600 }}>Decorations & Supplies (18%)</span>
                  <span style={{ color: '#4cc9f0', fontWeight: 700 }}>
                    {quickCurrency === 'INR' ? '₹' : '$'}{Math.round(quickBudget * 0.18).toLocaleString()}
                  </span>
                </div>
                <div style={{ width: '100%', height: '6px', background: 'rgba(255,255,255,0.1)', borderRadius: '999px', overflow: 'hidden' }}>
                  <div style={{ width: '18%', height: '100%', background: '#2ec4b6' }} />
                </div>
                <span style={{ fontSize: '0.75rem', color: '#94a3b8', marginTop: '0.4rem', display: 'block' }}>
                  DIY Balloon arches & fairy lights on Amazon
                </span>
              </div>

              {/* Item 4 */}
              <div style={{ background: 'rgba(11, 20, 48, 0.8)', padding: '1rem', borderRadius: '12px', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem', fontSize: '0.9rem' }}>
                  <span style={{ fontWeight: 600 }}>Entertainment & Sound (12%)</span>
                  <span style={{ color: '#4cc9f0', fontWeight: 700 }}>
                    {quickCurrency === 'INR' ? '₹' : '$'}{Math.round(quickBudget * 0.12).toLocaleString()}
                  </span>
                </div>
                <div style={{ width: '100%', height: '6px', background: 'rgba(255,255,255,0.1)', borderRadius: '999px', overflow: 'hidden' }}>
                  <div style={{ width: '12%', height: '100%', background: '#f7b731' }} />
                </div>
                <span style={{ fontSize: '0.75rem', color: '#94a3b8', marginTop: '0.4rem', display: 'block' }}>
                  Bluetooth soundbars & party games on Flipkart
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS SECTION */}
      <section className="container">
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.4rem)', fontWeight: 800, marginBottom: '0.75rem' }}>
            How PocketSmart AI Works
          </h2>
          <p style={{ color: '#94a3b8', fontSize: '1rem', maxWidth: '600px', margin: '0 auto' }}>
            Transforming complex shopping decisions into effortless, budget-perfect experiences
          </p>
        </div>

        <div className="grid-3">
          <div className="glass-card">
            <div
              style={{
                width: '45px',
                height: '45px',
                borderRadius: '12px',
                background: 'rgba(67, 97, 238, 0.2)',
                color: '#4cc9f0',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '1.25rem',
                fontSize: '1.2rem',
                fontWeight: 800,
              }}
            >
              1
            </div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '0.75rem' }}>Set Your Target Budget</h3>
            <p style={{ color: '#94a3b8', fontSize: '0.9rem', lineHeight: 1.6 }}>
              Define your upper spending limit, room types, guest counts, or occasion. No financial guesswork or endless manual spreadsheeting.
            </p>
          </div>

          <div className="glass-card">
            <div
              style={{
                width: '45px',
                height: '45px',
                borderRadius: '12px',
                background: 'rgba(76, 201, 240, 0.2)',
                color: '#4cc9f0',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '1.25rem',
                fontSize: '1.2rem',
                fontWeight: 800,
              }}
            >
              2
            </div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '0.75rem' }}>Gemini AI Contextual Reasoning</h3>
            <p style={{ color: '#94a3b8', fontSize: '0.9rem', lineHeight: 1.6 }}>
              Our multimodal engine analyzes aesthetic styles, dimensions, and even uploaded outfit photos to find pieces that truly harmonize.
            </p>
          </div>

          <div className="glass-card">
            <div
              style={{
                width: '45px',
                height: '45px',
                borderRadius: '12px',
                background: 'rgba(46, 196, 182, 0.2)',
                color: '#2ec4b6',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '1.25rem',
                fontSize: '1.2rem',
                fontWeight: 800,
              }}
            >
              3
            </div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '0.75rem' }}>Direct Cross-Platform Links</h3>
            <p style={{ color: '#94a3b8', fontSize: '0.9rem', lineHeight: 1.6 }}>
              Receive itemized lists with real-world prices across Amazon, Flipkart, IKEA, Swiggy, and Tanishq with 1-click buy or search links.
            </p>
          </div>
        </div>
      </section>

      {/* WHY POCKETSMART STATS */}
      <section className="container">
        <div
          style={{
            background: 'rgba(18, 30, 66, 0.5)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            borderRadius: '24px',
            padding: '2.5rem',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '2rem',
            textAlign: 'center',
          }}
        >
          <div>
            <div style={{ fontSize: '2.5rem', fontWeight: 800, color: '#4cc9f0', marginBottom: '0.35rem' }}>35%</div>
            <div style={{ color: '#ffffff', fontWeight: 600, fontSize: '1rem', marginBottom: '0.2rem' }}>Average Cost Savings</div>
            <div style={{ color: '#94a3b8', fontSize: '0.8rem' }}>Compared to unguided impulse shopping</div>
          </div>
          <div>
            <div style={{ fontSize: '2.5rem', fontWeight: 800, color: '#2ec4b6', marginBottom: '0.35rem' }}>100%</div>
            <div style={{ color: '#ffffff', fontWeight: 600, fontSize: '1rem', marginBottom: '0.2rem' }}>Budget Adherence</div>
            <div style={{ color: '#94a3b8', fontSize: '0.8rem' }}>Algorithmic price caps ensure zero overspending</div>
          </div>
          <div>
            <div style={{ fontSize: '2.5rem', fontWeight: 800, color: '#f7b731', marginBottom: '0.35rem' }}>8+</div>
            <div style={{ color: '#ffffff', fontWeight: 600, fontSize: '1rem', marginBottom: '0.2rem' }}>Integrated Platforms</div>
            <div style={{ color: '#94a3b8', fontSize: '0.8rem' }}>Amazon, IKEA, Flipkart, Swiggy, Zomato, OYO</div>
          </div>
          <div>
            <div style={{ fontSize: '2.5rem', fontWeight: 800, color: '#4361ee', marginBottom: '0.35rem' }}>Multimodal</div>
            <div style={{ color: '#ffffff', fontWeight: 600, fontSize: '1rem', marginBottom: '0.2rem' }}>Vision Intelligence</div>
            <div style={{ color: '#94a3b8', fontSize: '0.8rem' }}>Outfit image analysis with Gemini 1.5 Flash</div>
          </div>
        </div>
      </section>
    </div>
  );
}
