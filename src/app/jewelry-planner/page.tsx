'use client';

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import {
  Gem,
  Sparkles,
  Upload,
  Image as ImageIcon,
  X,
  CheckCircle,
  ExternalLink,
  Bookmark,
  Printer,
  RotateCcw,
  Palette,
  Eye,
  Camera,
} from 'lucide-react';
import { Currency, JewelryPlanRequest, JewelryPlanResult } from '@/lib/types';
import { PlatformBadge } from '@/components/PlatformBadge';
import { BudgetGauge } from '@/components/BudgetGauge';
import { saveHistoryItem } from '@/lib/storage';

const OCCASIONS = [
  'Wedding / Reception',
  'Engagement Ceremony',
  'Festive (Diwali, Eid, Navratri)',
  'Cocktail / Evening Gala',
  'Daily Wear / Work Essentials',
  'Anniversary Dinner',
];

const JEWELRY_STYLES = [
  'Traditional Indian & Heritage',
  'Minimalist Contemporary',
  'Kundan & Polki Royal',
  'South Indian Temple Jewelry',
  'Diamond & CZ Glamour',
  'Boho Oxidized Silver',
];

const METALS = [
  'Auto Match with Outfit',
  'Yellow Gold (22K / 18K)',
  'Rose Gold',
  'Sterling Silver (925)',
  'Antique Oxidized Finish',
  'Platinum Finish',
];

export default function JewelryPlannerPage() {
  const [currency, setCurrency] = useState<Currency>('INR');
  const [budget, setBudget] = useState<number>(45000);
  const [occasion, setOccasion] = useState<string>('Wedding / Reception');
  const [style, setStyle] = useState<string>('Traditional Indian & Heritage');
  const [metalPreference, setMetalPreference] = useState<string>('Auto Match with Outfit');
  const [outfitDescription, setOutfitDescription] = useState('');

  // Image Upload state
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageMimeType, setImageMimeType] = useState<string>('image/jpeg');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<JewelryPlanResult | null>(null);
  const [savedToast, setSavedToast] = useState(false);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert('Image size exceeds 5MB limit. Please choose a smaller photo.');
        return;
      }
      setImageMimeType(file.type || 'image/jpeg');
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);

    const payload: JewelryPlanRequest = {
      budget,
      currency,
      occasion,
      style,
      metalPreference: metalPreference.includes('Auto') ? undefined : metalPreference,
      outfitDescription: outfitDescription || (imagePreview ? 'Outfit uploaded in photo' : undefined),
      outfitImageBase64: imagePreview || undefined,
      outfitImageMimeType: imagePreview ? imageMimeType : undefined,
    };

    try {
      const res = await fetch('/api/generate-jewelry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        throw new Error('Failed to generate jewelry plan');
      }

      const data: JewelryPlanResult = await res.json();
      setResult(data);

      saveHistoryItem({
        type: 'jewelry',
        title: `${occasion} (${style})`,
        budget: data.totalBudget,
        currency: data.currency,
        data,
      });
    } catch (err) {
      console.error(err);
      alert('Could not generate jewelry plan. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSaveManual = () => {
    if (!result) return;
    saveHistoryItem({
      type: 'jewelry',
      title: `${occasion} (${style})`,
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
          <Gem size={15} /> Scenario 3: Multimodal Jewelry & Outfit Stylist
        </div>
        <h1 style={{ fontSize: 'clamp(2rem, 4vw, 2.75rem)', fontWeight: 800, marginBottom: '0.75rem' }}>
          Jewelry Budget Planner
        </h1>
        <p style={{ color: '#94a3b8', maxWidth: '650px', margin: '0 auto', fontSize: '1rem' }}>
          Upload your outfit photo or specify your style. Gemini 1.5 Flash multimodal vision analyzes
          colors, embroidery, and necklines to recommend perfectly coordinated jewelry within budget.
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
                    setBudget(c === 'INR' ? 45000 : 1000);
                  }}
                  className="select-field"
                >
                  <option value="INR">₹ INR</option>
                  <option value="USD">$ USD</option>
                </select>
              </div>

              <div className="input-group" style={{ marginBottom: 0 }}>
                <label className="input-label">
                  <span>Total Jewelry Budget</span>
                  <span style={{ color: '#4cc9f0', fontWeight: 700 }}>
                    {currency === 'INR' ? '₹' : '$'}{budget.toLocaleString()}
                  </span>
                </label>
                <input
                  type="number"
                  min={currency === 'INR' ? 3000 : 50}
                  step={currency === 'INR' ? 1000 : 25}
                  value={budget}
                  onChange={(e) => setBudget(Number(e.target.value))}
                  className="input-field"
                  required
                />
              </div>
            </div>

            {/* MULTIMODAL OUTFIT IMAGE UPLOAD */}
            <div className="input-group">
              <label className="input-label">
                <span>Upload Outfit Photo (Multimodal Vision)</span>
                <span style={{ color: '#4cc9f0', fontSize: '0.75rem', fontWeight: 600 }}>Optional</span>
              </label>

              {!imagePreview ? (
                <div
                  onClick={() => fileInputRef.current?.click()}
                  style={{
                    border: '2px dashed rgba(76, 201, 240, 0.4)',
                    background: 'rgba(11, 20, 48, 0.5)',
                    borderRadius: '14px',
                    padding: '1.75rem 1rem',
                    textAlign: 'center',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                  }}
                >
                  <div
                    style={{
                      width: '45px',
                      height: '45px',
                      borderRadius: '50%',
                      background: 'rgba(76, 201, 240, 0.15)',
                      color: '#4cc9f0',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      margin: '0 auto 0.75rem auto',
                    }}
                  >
                    <Camera size={22} />
                  </div>
                  <div style={{ fontSize: '0.9rem', fontWeight: 600, color: '#ffffff', marginBottom: '0.2rem' }}>
                    Click or drag photo of your saree, lehenga, or dress
                  </div>
                  <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>
                    Gemini AI will extract color harmony and neckline geometry (PNG, JPG up to 5MB)
                  </div>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    style={{ display: 'none' }}
                  />
                </div>
              ) : (
                <div
                  style={{
                    position: 'relative',
                    borderRadius: '14px',
                    overflow: 'hidden',
                    border: '1px solid rgba(76, 201, 240, 0.5)',
                    background: 'rgba(11, 20, 48, 0.9)',
                    padding: '0.75rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem',
                  }}
                >
                  <img
                    src={imagePreview}
                    alt="Uploaded outfit"
                    style={{
                      width: '75px',
                      height: '75px',
                      objectFit: 'cover',
                      borderRadius: '8px',
                    }}
                  />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#ffffff' }}>
                      Outfit Photo Attached
                    </div>
                    <div style={{ fontSize: '0.75rem', color: '#4cc9f0' }}>
                      Multimodal visual analysis enabled for Gemini 1.5 Flash
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={removeImage}
                    style={{
                      background: 'rgba(255, 94, 126, 0.2)',
                      border: '1px solid rgba(255, 94, 126, 0.4)',
                      color: '#ff5e7e',
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                    title="Remove Image"
                  >
                    <X size={16} />
                  </button>
                </div>
              )}
            </div>

            {/* Occasion */}
            <div className="input-group">
              <label className="input-label">Occasion / Event</label>
              <select
                value={occasion}
                onChange={(e) => setOccasion(e.target.value)}
                className="select-field"
              >
                {OCCASIONS.map((occ) => (
                  <option key={occ} value={occ}>
                    {occ}
                  </option>
                ))}
              </select>
            </div>

            {/* Style */}
            <div className="input-group">
              <label className="input-label">Jewelry Aesthetic Style</label>
              <select
                value={style}
                onChange={(e) => setStyle(e.target.value)}
                className="select-field"
              >
                {JEWELRY_STYLES.map((st) => (
                  <option key={st} value={st}>
                    {st}
                  </option>
                ))}
              </select>
            </div>

            {/* Metal Preference */}
            <div className="input-group">
              <label className="input-label">Preferred Metal / Tone</label>
              <select
                value={metalPreference}
                onChange={(e) => setMetalPreference(e.target.value)}
                className="select-field"
              >
                {METALS.map((m) => (
                  <option key={m} value={m}>
                    {m}
                  </option>
                ))}
              </select>
            </div>

            {/* Outfit Description */}
            <div className="input-group">
              <label className="input-label">Outfit Description / Details</label>
              <textarea
                value={outfitDescription}
                onChange={(e) => setOutfitDescription(e.target.value)}
                placeholder="e.g. Navy blue silk saree with gold zari border and sweetheart blouse neckline..."
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
                  <div className="spinner" /> Analyzing Outfit & Finding Matches...
                </>
              ) : (
                <>
                  <Sparkles size={18} /> Generate PocketSmart Jewelry Plan
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
              <Palette size={28} />
            </div>
            <h3 style={{ fontSize: '1.35rem', fontWeight: 700, marginBottom: '0.75rem' }}>
              Multimodal Visual Styling
            </h3>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.85rem', color: '#94a3b8', fontSize: '0.9rem' }}>
              <li style={{ display: 'flex', gap: '0.5rem' }}>
                <CheckCircle size={16} color="#4cc9f0" style={{ flexShrink: 0, marginTop: '2px' }} />
                <span><strong>Neckline Matching:</strong> Deep V-necks paired with statement chokers, high collars paired with dramatic earrings.</span>
              </li>
              <li style={{ display: 'flex', gap: '0.5rem' }}>
                <CheckCircle size={16} color="#4cc9f0" style={{ flexShrink: 0, marginTop: '2px' }} />
                <span><strong>Color Harmony:</strong> Matches warm gold with rich reds/blues, and silver/rose gold with pastels and cool undertones.</span>
              </li>
              <li style={{ display: 'flex', gap: '0.5rem' }}>
                <CheckCircle size={16} color="#4cc9f0" style={{ flexShrink: 0, marginTop: '2px' }} />
                <span><strong>Trusted Brands:</strong> Real jewelry options sourced from Tanishq, CaratLane, Amazon, and Flipkart.</span>
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
                Jewelry Curation Report
              </span>
              <h2 style={{ fontSize: '1.8rem', fontWeight: 800 }}>
                {result.occasion} Jewelry Collection
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
                <RotateCcw size={15} /> Restyle
              </button>
            </div>
          </div>

          {/* Budget Gauge */}
          <BudgetGauge
            totalBudget={result.totalBudget}
            totalEstimatedCost={result.totalEstimatedCost}
            currency={result.currency}
          />

          {/* AESTHETIC ANALYSIS BOX */}
          {result.aestheticAnalysis && (
            <div
              className="glass-panel"
              style={{
                padding: '1.75rem',
                marginBottom: '2rem',
                background: 'linear-gradient(135deg, rgba(13, 27, 62, 0.9) 0%, rgba(20, 35, 78, 0.8) 100%)',
                border: '1px solid rgba(76, 201, 240, 0.3)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                <Eye size={18} color="#4cc9f0" />
                <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#ffffff' }}>
                  AI Multimodal Aesthetic Analysis
                </h3>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.25rem' }}>
                <div>
                  <span style={{ fontSize: '0.75rem', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    Detected Color Palette
                  </span>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginTop: '0.35rem' }}>
                    {result.aestheticAnalysis.outfitColorsDetected.map((col, idx) => (
                      <span
                        key={idx}
                        style={{
                          fontSize: '0.8rem',
                          padding: '3px 8px',
                          borderRadius: '6px',
                          background: 'rgba(76, 201, 240, 0.15)',
                          color: '#4cc9f0',
                          border: '1px solid rgba(76, 201, 240, 0.3)',
                        }}
                      >
                        {col}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <span style={{ fontSize: '0.75rem', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    Neckline & Silhouette
                  </span>
                  <div style={{ fontSize: '0.9rem', color: '#ffffff', fontWeight: 600, marginTop: '0.35rem' }}>
                    {result.aestheticAnalysis.necklineDetected}
                  </div>
                </div>

                <div>
                  <span style={{ fontSize: '0.75rem', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    Recommended Metal Harmony
                  </span>
                  <div style={{ fontSize: '0.9rem', color: '#f7b731', fontWeight: 600, marginTop: '0.35rem' }}>
                    {result.aestheticAnalysis.recommendedMetal}
                  </div>
                </div>

                <div>
                  <span style={{ fontSize: '0.75rem', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    Curated Vibe
                  </span>
                  <div style={{ fontSize: '0.9rem', color: '#2ec4b6', fontWeight: 600, marginTop: '0.35rem' }}>
                    {result.aestheticAnalysis.overallVibe}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* JEWELRY PIECES GRID */}
          <h3 style={{ fontSize: '1.35rem', fontWeight: 700, marginBottom: '1.25rem', color: '#ffffff' }}>
            Piece-by-Piece Curated Set
          </h3>
          <div className="grid-2" style={{ marginBottom: '2.5rem' }}>
            {result.recommendations.map((rec, idx) => {
              const item = rec.item;
              return (
                <div
                  key={idx}
                  className="glass-card"
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                  }}
                >
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                      <span
                        style={{
                          fontSize: '0.75rem',
                          fontWeight: 700,
                          color: '#4cc9f0',
                          background: 'rgba(76, 201, 240, 0.15)',
                          padding: '3px 8px',
                          borderRadius: '6px',
                        }}
                      >
                        {rec.pieceType}
                      </span>
                      <PlatformBadge platform={item.platform} />
                    </div>

                    <h4 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#ffffff', marginBottom: '0.35rem' }}>
                      {item.name}
                    </h4>
                    <p style={{ fontSize: '0.85rem', color: '#94a3b8', marginBottom: '0.5rem', lineHeight: 1.4 }}>
                      {item.description}
                    </p>
                    <p style={{ fontSize: '0.8rem', color: '#2ec4b6', fontStyle: 'italic', marginBottom: '0.75rem' }}>
                      Style Match: {item.matchReason}
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
                    <span style={{ fontSize: '1.25rem', fontWeight: 800, color: '#ffffff' }}>
                      {item.currency === 'INR' ? '₹' : '$'}{item.price.toLocaleString()}
                    </span>
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-secondary"
                      style={{ padding: '0.4rem 0.85rem', fontSize: '0.8rem', borderRadius: '8px' }}
                    >
                      Shop on {item.platform} <ExternalLink size={12} />
                    </a>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Styling Tips */}
          {result.stylingTips && result.stylingTips.length > 0 && (
            <div className="glass-panel" style={{ padding: '1.75rem', borderLeft: '5px solid #7209b7' }}>
              <h4 style={{ fontSize: '1rem', fontWeight: 700, color: '#c084fc', marginBottom: '0.4rem' }}>
                Jewelry & Outfit Styling Tips
              </h4>
              <ul style={{ listStyle: 'disc', paddingLeft: '1.25rem', fontSize: '0.9rem', color: '#cbd5e1' }}>
                {result.stylingTips.map((tip, idx) => (
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
