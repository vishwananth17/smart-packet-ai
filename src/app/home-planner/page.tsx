'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Home,
  Sparkles,
  ArrowRight,
  Plus,
  Minus,
  CheckCircle,
  ExternalLink,
  Bookmark,
  Printer,
  RotateCcw,
  Lightbulb,
} from 'lucide-react';
import { Currency, HomePlanRequest, HomePlanResult } from '@/lib/types';
import { PlatformBadge } from '@/components/PlatformBadge';
import { BudgetGauge } from '@/components/BudgetGauge';
import { saveHistoryItem } from '@/lib/storage';

const AVAILABLE_ROOMS = [
  'Living Room',
  'Master Bedroom',
  'Kitchen',
  'Dining Room',
  'Home Office / Study',
  'Balcony / Patio',
];

const AVAILABLE_STYLES = [
  'Modern Contemporary',
  'Minimalist',
  'Scandinavian',
  'Traditional Indian',
  'Bohemian Chic',
  'Industrial Loft',
];

const COMMON_ITEMS = [
  '3-Seater Sofa',
  'Coffee Table',
  'Ceiling Fan with Light',
  'Ambient Floor Lamp',
  'Dining Table (4-6 Seater)',
  'Queen Bed Frame',
  'Blackout Curtains',
  'Area Rug',
  'Wall Art / Mirror',
  'Indoor Planters',
];

export default function HomePlannerPage() {
  const [currency, setCurrency] = useState<Currency>('INR');
  const [budget, setBudget] = useState<number>(60000);
  const [selectedRooms, setSelectedRooms] = useState<string[]>(['Living Room', 'Master Bedroom']);
  const [selectedStyle, setSelectedStyle] = useState<string>('Modern Contemporary');
  const [itemQuantities, setItemQuantities] = useState<{ [key: string]: number }>({
    '3-Seater Sofa': 1,
    'Coffee Table': 1,
    'Ceiling Fan with Light': 2,
    'Ambient Floor Lamp': 1,
    'Area Rug': 1,
  });
  const [notes, setNotes] = useState('');

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<HomePlanResult | null>(null);
  const [savedToast, setSavedToast] = useState(false);

  const toggleRoom = (room: string) => {
    if (selectedRooms.includes(room)) {
      if (selectedRooms.length > 1) {
        setSelectedRooms(selectedRooms.filter((r) => r !== room));
      }
    } else {
      setSelectedRooms([...selectedRooms, room]);
    }
  };

  const updateQuantity = (item: string, delta: number) => {
    const current = itemQuantities[item] || 0;
    const next = Math.max(0, current + delta);
    if (next === 0) {
      const copy = { ...itemQuantities };
      delete copy[item];
      setItemQuantities(copy);
    } else {
      setItemQuantities({ ...itemQuantities, [item]: next });
    }
  };

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);

    const payload: HomePlanRequest = {
      budget,
      currency,
      rooms: selectedRooms,
      style: selectedStyle,
      items: itemQuantities,
      notes,
    };

    try {
      const res = await fetch('/api/generate-home', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        throw new Error('Failed to generate home plan');
      }

      const data: HomePlanResult = await res.json();
      setResult(data);

      // Auto-save to history
      saveHistoryItem({
        type: 'home',
        title: `${selectedStyle} (${selectedRooms.join(', ')})`,
        budget: data.totalBudget,
        currency: data.currency,
        data,
      });
    } catch (err) {
      console.error(err);
      alert('Could not generate plan. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSaveManual = () => {
    if (!result) return;
    saveHistoryItem({
      type: 'home',
      title: `${selectedStyle} (${selectedRooms.join(', ')})`,
      budget: result.totalBudget,
      currency: result.currency,
      data: result,
    });
    setSavedToast(true);
    setTimeout(() => setSavedToast(false), 3000);
  };

  return (
    <div className="container" style={{ padding: '2.5rem 1.5rem' }}>
      {/* Page Header */}
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
          <Home size={15} /> Scenario 1: Intelligent Interior Decorator
        </div>
        <h1 style={{ fontSize: 'clamp(2rem, 4vw, 2.75rem)', fontWeight: 800, marginBottom: '0.75rem' }}>
          Home Interior Budget Planner
        </h1>
        <p style={{ color: '#94a3b8', maxWidth: '650px', margin: '0 auto', fontSize: '1rem' }}>
          Specify your rooms, budget limit, and style preferences. Our Gemini 1.5 Flash AI procures
          cost-effective furniture and lighting from IKEA, Amazon, Pepperfry, and Flipkart.
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
                    setBudget(c === 'INR' ? 60000 : 1500);
                  }}
                  className="select-field"
                >
                  <option value="INR">₹ INR</option>
                  <option value="USD">$ USD</option>
                </select>
              </div>

              <div className="input-group" style={{ marginBottom: 0 }}>
                <label className="input-label">
                  <span>Total Interior Budget</span>
                  <span style={{ color: '#4cc9f0', fontWeight: 700 }}>
                    {currency === 'INR' ? '₹' : '$'}{budget.toLocaleString()}
                  </span>
                </label>
                <input
                  type="number"
                  min={currency === 'INR' ? 10000 : 200}
                  step={currency === 'INR' ? 1000 : 50}
                  value={budget}
                  onChange={(e) => setBudget(Number(e.target.value))}
                  className="input-field"
                  required
                />
              </div>
            </div>

            {/* Target Rooms Selection */}
            <div className="input-group">
              <label className="input-label">Select Rooms to Furnish (Multiple)</label>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginTop: '0.35rem' }}>
                {AVAILABLE_ROOMS.map((room) => {
                  const isSelected = selectedRooms.includes(room);
                  return (
                    <button
                      type="button"
                      key={room}
                      onClick={() => toggleRoom(room)}
                      style={{
                        padding: '0.5rem 0.85rem',
                        fontSize: '0.85rem',
                        borderRadius: '8px',
                        background: isSelected ? 'rgba(76, 201, 240, 0.2)' : 'rgba(255, 255, 255, 0.05)',
                        border: isSelected ? '1px solid #4cc9f0' : '1px solid rgba(255, 255, 255, 0.1)',
                        color: isSelected ? '#ffffff' : '#94a3b8',
                        cursor: 'pointer',
                        transition: 'all 0.2s',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.35rem',
                      }}
                    >
                      {isSelected && <CheckCircle size={14} color="#4cc9f0" />}
                      {room}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Style Selection */}
            <div className="input-group">
              <label className="input-label">Aesthetic Style Theme</label>
              <select
                value={selectedStyle}
                onChange={(e) => setSelectedStyle(e.target.value)}
                className="select-field"
              >
                {AVAILABLE_STYLES.map((style) => (
                  <option key={style} value={style}>
                    {style}
                  </option>
                ))}
              </select>
            </div>

            {/* Quantities for Key Items */}
            <div className="input-group">
              <label className="input-label">Specify Key Items & Desired Quantities</label>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                  gap: '0.65rem',
                  maxHeight: '220px',
                  overflowY: 'auto',
                  paddingRight: '0.4rem',
                  marginTop: '0.4rem',
                }}
              >
                {COMMON_ITEMS.map((item) => {
                  const count = itemQuantities[item] || 0;
                  return (
                    <div
                      key={item}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '0.45rem 0.75rem',
                        background: 'rgba(11, 20, 48, 0.6)',
                        borderRadius: '8px',
                        border: '1px solid rgba(255, 255, 255, 0.06)',
                      }}
                    >
                      <span style={{ fontSize: '0.8rem', color: count > 0 ? '#ffffff' : '#94a3b8' }}>
                        {item}
                      </span>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                        <button
                          type="button"
                          onClick={() => updateQuantity(item, -1)}
                          style={{
                            width: '24px',
                            height: '24px',
                            borderRadius: '4px',
                            background: 'rgba(255, 255, 255, 0.1)',
                            border: 'none',
                            color: '#ffffff',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}
                        >
                          <Minus size={12} />
                        </button>
                        <span style={{ fontSize: '0.85rem', fontWeight: 700, minWidth: '16px', textAlign: 'center' }}>
                          {count}
                        </span>
                        <button
                          type="button"
                          onClick={() => updateQuantity(item, 1)}
                          style={{
                            width: '24px',
                            height: '24px',
                            borderRadius: '4px',
                            background: '#4361ee',
                            border: 'none',
                            color: '#ffffff',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}
                        >
                          <Plus size={12} />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Additional Notes */}
            <div className="input-group">
              <label className="input-label">Special Preferences or Room Dimensions (Optional)</label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="e.g. Prefer neutral beige tones, have pets so need durable fabric, living room is 14x12 ft..."
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
                  <div className="spinner" /> Generating AI Interior Plan...
                </>
              ) : (
                <>
                  <Sparkles size={18} /> Generate PocketSmart Interior Plan
                </>
              )}
            </button>
          </form>
        </div>

        {/* Informational card shown before generation */}
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
              <Lightbulb size={28} />
            </div>
            <h3 style={{ fontSize: '1.35rem', fontWeight: 700, marginBottom: '0.75rem' }}>
              How Gemini 1.5 Flash Optimizes Your Home
            </h3>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.85rem', color: '#94a3b8', fontSize: '0.9rem' }}>
              <li style={{ display: 'flex', gap: '0.5rem' }}>
                <CheckCircle size={16} color="#4cc9f0" style={{ flexShrink: 0, marginTop: '2px' }} />
                <span><strong>Aesthetic Cohesion:</strong> Balances modern finishes, lighting temperatures, and furniture scale.</span>
              </li>
              <li style={{ display: 'flex', gap: '0.5rem' }}>
                <CheckCircle size={16} color="#4cc9f0" style={{ flexShrink: 0, marginTop: '2px' }} />
                <span><strong>Strict Budget Caps:</strong> Room-by-room proportional math prevents living room overspending from starving bedrooms.</span>
              </li>
              <li style={{ display: 'flex', gap: '0.5rem' }}>
                <CheckCircle size={16} color="#4cc9f0" style={{ flexShrink: 0, marginTop: '2px' }} />
                <span><strong>Direct Platform Integration:</strong> Real options curated across IKEA, Amazon, Pepperfry, and Flipkart.</span>
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
                AI Recommendation Report
              </span>
              <h2 style={{ fontSize: '1.8rem', fontWeight: 800 }}>
                {selectedStyle} Interior Blueprint
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
                <RotateCcw size={15} /> Edit Specs
              </button>
            </div>
          </div>

          {/* Budget Adherence Bar */}
          <BudgetGauge
            totalBudget={result.totalBudget}
            totalEstimatedCost={result.totalEstimatedCost}
            currency={result.currency}
          />

          {/* Plan Summary */}
          <div
            style={{
              background: 'rgba(18, 30, 66, 0.7)',
              border: '1px solid rgba(100, 150, 255, 0.2)',
              borderRadius: '16px',
              padding: '1.5rem',
              marginBottom: '2rem',
              lineHeight: 1.6,
              color: '#e2e8f0',
            }}
          >
            <strong style={{ color: '#4cc9f0' }}>AI Design Summary:</strong> {result.summary}
          </div>

          {/* Room-by-room items */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            {result.roomBreakdowns.map((roomPlan, idx) => (
              <div
                key={idx}
                className="glass-panel"
                style={{ padding: '1.75rem' }}
              >
                <div
                  style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '1.25rem',
                    borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
                    paddingBottom: '0.75rem',
                  }}
                >
                  <div>
                    <h3 style={{ fontSize: '1.35rem', fontWeight: 700, color: '#ffffff' }}>
                      {roomPlan.room}
                    </h3>
                    <span style={{ fontSize: '0.85rem', color: '#94a3b8' }}>
                      Room Allocation: {result.currency === 'INR' ? '₹' : '$'}{roomPlan.allocatedBudget.toLocaleString()} • Estimated: {result.currency === 'INR' ? '₹' : '$'}{roomPlan.estimatedCost.toLocaleString()}
                    </span>
                  </div>
                  <span
                    style={{
                      fontSize: '0.75rem',
                      padding: '4px 10px',
                      borderRadius: '999px',
                      background: roomPlan.estimatedCost <= roomPlan.allocatedBudget ? 'rgba(46, 196, 182, 0.15)' : 'rgba(255, 94, 126, 0.15)',
                      color: roomPlan.estimatedCost <= roomPlan.allocatedBudget ? '#2ec4b6' : '#ff5e7e',
                      border: `1px solid ${roomPlan.estimatedCost <= roomPlan.allocatedBudget ? '#2ec4b6' : '#ff5e7e'}`,
                      fontWeight: 600,
                    }}
                  >
                    {roomPlan.estimatedCost <= roomPlan.allocatedBudget ? 'On Target' : 'Slight Overage'}
                  </span>
                </div>

                {/* Items Grid */}
                <div className="grid-2" style={{ marginBottom: '1.25rem' }}>
                  {roomPlan.items.map((item) => (
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
                          Why AI matched this: {item.matchReason}
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
                          View on {item.platform} <ExternalLink size={12} />
                        </a>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Room Styling Tips */}
                {roomPlan.designTips && roomPlan.designTips.length > 0 && (
                  <div
                    style={{
                      background: 'rgba(67, 97, 238, 0.08)',
                      borderRadius: '10px',
                      padding: '1rem',
                      borderLeft: '4px solid #4361ee',
                    }}
                  >
                    <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#4cc9f0', textTransform: 'uppercase', marginBottom: '0.35rem' }}>
                      Designer Styling Advice for {roomPlan.room}
                    </div>
                    <ul style={{ listStyle: 'disc', paddingLeft: '1.25rem', fontSize: '0.85rem', color: '#cbd5e1' }}>
                      {roomPlan.designTips.map((tip, tIdx) => (
                        <li key={tIdx} style={{ marginBottom: '0.2rem' }}>{tip}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Cost saving advice */}
          {result.costSavingAdvice && (
            <div
              className="glass-panel"
              style={{
                marginTop: '2rem',
                padding: '1.5rem',
                borderLeft: '5px solid #2ec4b6',
              }}
            >
              <h4 style={{ fontSize: '1rem', fontWeight: 700, color: '#2ec4b6', marginBottom: '0.4rem' }}>
                PocketSmart Cost-Saving Insights
              </h4>
              <p style={{ fontSize: '0.9rem', color: '#cbd5e1', lineHeight: 1.5 }}>
                {result.costSavingAdvice}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
