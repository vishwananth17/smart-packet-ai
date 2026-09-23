'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  PartyPopper,
  Sparkles,
  Users,
  MapPin,
  Utensils,
  Calendar,
  CheckCircle,
  ExternalLink,
  Bookmark,
  Printer,
  RotateCcw,
  Clock,
  DollarSign,
} from 'lucide-react';
import { Currency, PartyPlanRequest, PartyPlanResult } from '@/lib/types';
import { PlatformBadge } from '@/components/PlatformBadge';
import { BudgetGauge } from '@/components/BudgetGauge';
import { saveHistoryItem } from '@/lib/storage';

const EVENT_TYPES = [
  'Birthday Celebration',
  'Wedding Reception / Sangeet',
  'Anniversary Party',
  'Corporate Dinner / Mixer',
  'House Party / Friends Gathering',
  'Graduation Party',
];

const VENUE_TYPES = [
  'Home / Backyard',
  'OYO Townhouse / Rented Villa',
  'Banquet Hall / Community Center',
  'Outdoor Lawn / Resort Poolside',
];

const FOOD_PREFERENCES = [
  'Multi-course Buffet with Starters & Dessert',
  'Finger Food Platters & Sliders',
  'Traditional Festive Feast',
  'High Tea & Gourmet Appetizers',
];

export default function PartyPlannerPage() {
  const [currency, setCurrency] = useState<Currency>('INR');
  const [budget, setBudget] = useState<number>(35000);
  const [guestCount, setGuestCount] = useState<number>(25);
  const [eventType, setEventType] = useState<string>('Birthday Celebration');
  const [venueType, setVenueType] = useState<string>('Home / Backyard');
  const [foodPreference, setFoodPreference] = useState<string>('Multi-course Buffet with Starters & Dessert');
  const [specialRequests, setSpecialRequests] = useState('');

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<PartyPlanResult | null>(null);
  const [savedToast, setSavedToast] = useState(false);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);

    const payload: PartyPlanRequest = {
      budget,
      currency,
      guestCount,
      eventType,
      venueType,
      foodPreference,
      specialRequests,
    };

    try {
      const res = await fetch('/api/generate-party', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        throw new Error('Failed to generate party plan');
      }

      const data: PartyPlanResult = await res.json();
      setResult(data);

      saveHistoryItem({
        type: 'party',
        title: `${eventType} (${guestCount} Guests)`,
        budget: data.totalBudget,
        currency: data.currency,
        data,
      });
    } catch (err) {
      console.error(err);
      alert('Could not generate party plan. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSaveManual = () => {
    if (!result) return;
    saveHistoryItem({
      type: 'party',
      title: `${eventType} (${guestCount} Guests)`,
      budget: result.totalBudget,
      currency: result.currency,
      data: result,
    });
    setSavedToast(true);
    setTimeout(() => setSavedToast(false), 3000);
  };

  return (
    <div className="container" style={{ padding: '2.5rem 1.5rem' }}>
      {/* Header */}
      <div style={{ marginBottom: '2.5rem', textAlign: 'center' }}>
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.45rem',
            padding: '0.35rem 0.85rem',
            borderRadius: '999px',
            background: 'rgba(67, 97, 238, 0.15)',
            border: '1px solid rgba(67, 97, 238, 0.3)',
            color: '#4cc9f0',
            fontSize: '0.85rem',
            fontWeight: 600,
            marginBottom: '0.75rem',
          }}
        >
          <PartyPopper size={15} /> Scenario 2: Smart Event & Party Planner
        </div>
        <h1 style={{ fontSize: 'clamp(2rem, 4vw, 2.75rem)', fontWeight: 800, marginBottom: '0.75rem' }}>
          Party Budget Planner
        </h1>
        <p style={{ color: '#94a3b8', maxWidth: '650px', margin: '0 auto', fontSize: '1rem' }}>
          Proportionally allocate your event budget across catering (Swiggy/Zomato), venues (OYO),
          decorations, and sound to host a memorable occasion without financial guesswork.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: result ? '1fr' : 'repeat(auto-fit, minmax(360px, 1fr))', gap: '2rem' }}>
        {/* INPUT FORM */}
        <div className="glass-panel" style={{ padding: '2rem' }}>
          <form onSubmit={handleGenerate}>
            {/* Currency & Total Budget */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '1rem', marginBottom: '1.5rem' }}>
              <div className="input-group" style={{ marginBottom: 0 }}>
                <label className="input-label">Currency</label>
                <select
                  value={currency}
                  onChange={(e) => {
                    const c = e.target.value as Currency;
                    setCurrency(c);
                    setBudget(c === 'INR' ? 35000 : 800);
                  }}
                  className="select-field"
                >
                  <option value="INR">₹ INR</option>
                  <option value="USD">$ USD</option>
                </select>
              </div>

              <div className="input-group" style={{ marginBottom: 0 }}>
                <label className="input-label">
                  <span>Total Party Budget</span>
                  <span style={{ color: '#4cc9f0', fontWeight: 700 }}>
                    {currency === 'INR' ? '₹' : '$'}{budget.toLocaleString()}
                  </span>
                </label>
                <input
                  type="number"
                  min={currency === 'INR' ? 5000 : 100}
                  step={currency === 'INR' ? 1000 : 25}
                  value={budget}
                  onChange={(e) => setBudget(Number(e.target.value))}
                  className="input-field"
                  required
                />
              </div>
            </div>

            {/* Guest count slider */}
            <div className="input-group">
              <label className="input-label">
                <span>Guest Count</span>
                <span style={{ color: '#ffffff', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                  <Users size={14} color="#4cc9f0" /> {guestCount} People
                </span>
              </label>
              <input
                type="range"
                min="5"
                max="200"
                step="5"
                value={guestCount}
                onChange={(e) => setGuestCount(Number(e.target.value))}
                style={{ width: '100%', accentColor: '#4cc9f0', cursor: 'pointer' }}
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: '#64748b' }}>
                <span>5 (Intimate)</span>
                <span>50 (Medium)</span>
                <span>200 (Grand)</span>
              </div>
            </div>

            {/* Event Type */}
            <div className="input-group">
              <label className="input-label">Event Occasion Type</label>
              <select
                value={eventType}
                onChange={(e) => setEventType(e.target.value)}
                className="select-field"
              >
                {EVENT_TYPES.map((ev) => (
                  <option key={ev} value={ev}>
                    {ev}
                  </option>
                ))}
              </select>
            </div>

            {/* Venue Preference */}
            <div className="input-group">
              <label className="input-label">Venue Location Preference</label>
              <select
                value={venueType}
                onChange={(e) => setVenueType(e.target.value)}
                className="select-field"
              >
                {VENUE_TYPES.map((v) => (
                  <option key={v} value={v}>
                    {v}
                  </option>
                ))}
              </select>
            </div>

            {/* Food Style */}
            <div className="input-group">
              <label className="input-label">Catering / Food Style</label>
              <select
                value={foodPreference}
                onChange={(e) => setFoodPreference(e.target.value)}
                className="select-field"
              >
                {FOOD_PREFERENCES.map((f) => (
                  <option key={f} value={f}>
                    {f}
                  </option>
                ))}
              </select>
            </div>

            {/* Special Requests */}
            <div className="input-group">
              <label className="input-label">Theme or Special Preferences (Optional)</label>
              <textarea
                value={specialRequests}
                onChange={(e) => setSpecialRequests(e.target.value)}
                placeholder="e.g. Neon glow theme, kid-friendly mocktails, need karaoke setup..."
                className="textarea-field"
                rows={2}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary"
              style={{ width: '100%', padding: '0.9rem', fontSize: '1rem', marginTop: '0.5rem' }}
            >
              {loading ? (
                <>
                  <div className="spinner" /> Calculating Party Allocation...
                </>
              ) : (
                <>
                  <Sparkles size={18} /> Generate PocketSmart Party Plan
                </>
              )}
            </button>
          </form>
        </div>

        {/* Informational Panel */}
        {!result && !loading && (
          <div
            className="glass-panel"
            style={{
              padding: '2rem',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
            }}
          >
            <div
              style={{
                width: '50px',
                height: '50px',
                borderRadius: '12px',
                background: 'rgba(76, 201, 240, 0.15)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#4cc9f0',
                marginBottom: '1rem',
              }}
            >
              <Users size={28} />
            </div>
            <h3 style={{ fontSize: '1.35rem', fontWeight: 700, marginBottom: '0.75rem' }}>
              How PocketSmart Distributes Party Budgets
            </h3>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.85rem', color: '#94a3b8', fontSize: '0.9rem' }}>
              <li style={{ display: 'flex', gap: '0.5rem' }}>
                <CheckCircle size={16} color="#4cc9f0" style={{ flexShrink: 0, marginTop: '2px' }} />
                <span><strong>Catering (45%):</strong> Quality food & beverages sourced through Zomato catering and Swiggy Instamart delivery.</span>
              </li>
              <li style={{ display: 'flex', gap: '0.5rem' }}>
                <CheckCircle size={16} color="#4cc9f0" style={{ flexShrink: 0, marginTop: '2px' }} />
                <span><strong>Venues & Stays (22%):</strong> Verified event villas and party rooms sourced on OYO Townhouse or Airbnb.</span>
              </li>
              <li style={{ display: 'flex', gap: '0.5rem' }}>
                <CheckCircle size={16} color="#4cc9f0" style={{ flexShrink: 0, marginTop: '2px' }} />
                <span><strong>Decor & Lighting (18%):</strong> High-impact DIY balloon arches and warm string lights from Amazon.</span>
              </li>
              <li style={{ display: 'flex', gap: '0.5rem' }}>
                <CheckCircle size={16} color="#4cc9f0" style={{ flexShrink: 0, marginTop: '2px' }} />
                <span><strong>Entertainment & Sound (15%):</strong> Party audio systems and party games that avoid expensive DJ hiring.</span>
              </li>
            </ul>
          </div>
        )}
      </div>

      {/* RESULTS DISPLAY */}
      {result && (
        <div style={{ marginTop: '3rem' }}>
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: '1rem',
              marginBottom: '1.5rem',
            }}
          >
            <div>
              <span style={{ fontSize: '0.85rem', color: '#4cc9f0', fontWeight: 700, textTransform: 'uppercase' }}>
                Event Blueprint
              </span>
              <h2 style={{ fontSize: '1.8rem', fontWeight: 800 }}>
                {result.eventType} Masterplan
              </h2>
            </div>
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <button
                onClick={handleSaveManual}
                className="btn btn-secondary"
                style={{ fontSize: '0.85rem', padding: '0.5rem 1rem' }}
              >
                <Bookmark size={15} /> {savedToast ? 'Saved!' : 'Save Plan'}
              </button>
              <button
                onClick={() => window.print()}
                className="btn btn-secondary"
                style={{ fontSize: '0.85rem', padding: '0.5rem 1rem' }}
              >
                <Printer size={15} /> Print / Export
              </button>
              <button
                onClick={() => setResult(null)}
                className="btn btn-secondary"
                style={{ fontSize: '0.85rem', padding: '0.5rem 1rem' }}
              >
                <RotateCcw size={15} /> Modify Event
              </button>
            </div>
          </div>

          {/* Budget Adherence Bar */}
          <BudgetGauge
            totalBudget={result.totalBudget}
            totalEstimatedCost={result.totalEstimatedCost}
            currency={result.currency}
          />

          {/* Quick Metrics Bar */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
              gap: '1rem',
              marginBottom: '2rem',
            }}
          >
            <div style={{ background: 'rgba(11, 20, 48, 0.7)', padding: '1.25rem', borderRadius: '12px', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
              <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>Guest Attendance</span>
              <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#ffffff' }}>{result.guestCount} Guests</div>
            </div>

            <div style={{ background: 'rgba(11, 20, 48, 0.7)', padding: '1.25rem', borderRadius: '12px', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
              <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>Cost Per Guest</span>
              <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#4cc9f0' }}>
                {result.currency === 'INR' ? '₹' : '$'}{result.costPerGuest.toLocaleString()}
              </div>
            </div>

            <div style={{ background: 'rgba(11, 20, 48, 0.7)', padding: '1.25rem', borderRadius: '12px', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
              <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>Unspent Buffer</span>
              <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#2ec4b6' }}>
                {result.currency === 'INR' ? '₹' : '$'}{Math.max(0, result.totalBudget - result.totalEstimatedCost).toLocaleString()}
              </div>
            </div>
          </div>

          {/* CATEGORY ALLOCATIONS */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', marginBottom: '2.5rem' }}>
            {result.allocations.map((cat, idx) => (
              <div key={idx} className="glass-panel" style={{ padding: '1.75rem' }}>
                <div
                  style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '1rem',
                    borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
                    paddingBottom: '0.75rem',
                  }}
                >
                  <div>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#ffffff' }}>
                      {cat.category}
                    </h3>
                    <span style={{ fontSize: '0.85rem', color: '#94a3b8' }}>
                      Allocated: {result.currency === 'INR' ? '₹' : '$'}{cat.allocatedAmount.toLocaleString()} ({cat.percentage}% of budget)
                    </span>
                  </div>
                </div>

                {/* Vendor Suggestions Grid */}
                <div className="grid-2">
                  {cat.vendorSuggestions.map((item) => (
                    <div
                      key={item.id}
                      style={{
                        background: 'rgba(11, 20, 48, 0.75)',
                        border: '1px solid rgba(255, 255, 255, 0.08)',
                        borderRadius: '12px',
                        padding: '1.25rem',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                      }}
                    >
                      <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                          <PlatformBadge platform={item.platform} />
                          {item.tag && (
                            <span style={{ fontSize: '0.7rem', color: '#f7b731', background: 'rgba(247, 183, 49, 0.15)', padding: '2px 6px', borderRadius: '4px', fontWeight: 600 }}>
                              {item.tag}
                            </span>
                          )}
                        </div>
                        <h4 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#ffffff', marginBottom: '0.35rem' }}>
                          {item.name}
                        </h4>
                        <p style={{ fontSize: '0.85rem', color: '#94a3b8', marginBottom: '0.5rem', lineHeight: 1.4 }}>
                          {item.description}
                        </p>
                        <p style={{ fontSize: '0.8rem', color: '#4cc9f0', fontStyle: 'italic', marginBottom: '0.75rem' }}>
                          Why AI recommended: {item.matchReason}
                        </p>
                      </div>

                      <div
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          paddingTop: '0.75rem',
                          borderTop: '1px solid rgba(255, 255, 255, 0.05)',
                        }}
                      >
                        <span style={{ fontSize: '1.2rem', fontWeight: 800, color: '#ffffff' }}>
                          {item.currency === 'INR' ? '₹' : '$'}{item.price.toLocaleString()}
                        </span>
                        <a
                          href={item.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn btn-secondary"
                          style={{ padding: '0.4rem 0.85rem', fontSize: '0.8rem', borderRadius: '8px' }}
                        >
                          Book / View on {item.platform} <ExternalLink size={12} />
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* TIMELINE CHECKLIST */}
          {result.timelineChecklist && result.timelineChecklist.length > 0 && (
            <div className="glass-panel" style={{ padding: '2rem', marginBottom: '2rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.25rem' }}>
                <Clock size={20} color="#4cc9f0" />
                <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#ffffff' }}>
                  PocketSmart Event Countdown Checklist
                </h3>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {result.timelineChecklist.map((task, idx) => (
                  <div
                    key={idx}
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '1rem',
                      padding: '1rem',
                      background: 'rgba(11, 20, 48, 0.6)',
                      borderRadius: '10px',
                      border: '1px solid rgba(255, 255, 255, 0.06)',
                    }}
                  >
                    <span
                      style={{
                        padding: '4px 8px',
                        borderRadius: '6px',
                        background: 'rgba(67, 97, 238, 0.25)',
                        color: '#4cc9f0',
                        fontSize: '0.8rem',
                        fontWeight: 700,
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {task.phase}
                    </span>
                    <div style={{ flex: 1 }}>
                      <p style={{ fontSize: '0.9rem', color: '#e2e8f0' }}>{task.action}</p>
                    </div>
                    <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>{task.deadline}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Party Tips */}
          {result.tips && result.tips.length > 0 && (
            <div className="glass-panel" style={{ padding: '1.5rem', borderLeft: '5px solid #f7b731' }}>
              <h4 style={{ fontSize: '1rem', fontWeight: 700, color: '#f7b731', marginBottom: '0.4rem' }}>
                Host AI Tips for Success
              </h4>
              <ul style={{ listStyle: 'disc', paddingLeft: '1.25rem', fontSize: '0.9rem', color: '#cbd5e1' }}>
                {result.tips.map((tip, idx) => (
                  <li key={idx} style={{ marginBottom: '0.35rem' }}>{tip}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
