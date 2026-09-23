'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  History,
  Trash2,
  ExternalLink,
  Home,
  PartyPopper,
  Gem,
  Calendar,
  DollarSign,
  ArrowRight,
  Eye,
  CheckCircle,
} from 'lucide-react';
import { getSavedHistory, deleteHistoryItem } from '@/lib/storage';
import { SavedHistoryItem, HomePlanResult, PartyPlanResult, JewelryPlanResult } from '@/lib/types';
import { PlatformBadge } from '@/components/PlatformBadge';

export default function HistoryPage() {
  const [historyItems, setHistoryItems] = useState<SavedHistoryItem[]>([]);
  const [filter, setFilter] = useState<'all' | 'home' | 'party' | 'jewelry'>('all');
  const [selectedPlan, setSelectedPlan] = useState<SavedHistoryItem | null>(null);

  useEffect(() => {
    setHistoryItems(getSavedHistory());
  }, []);

  const handleDelete = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm('Delete this saved plan from your history?')) {
      deleteHistoryItem(id);
      setHistoryItems(getSavedHistory());
      if (selectedPlan?.id === id) {
        setSelectedPlan(null);
      }
    }
  };

  const handleClearAll = () => {
    if (confirm('Clear all saved plans? This cannot be undone.')) {
      if (typeof window !== 'undefined') {
        localStorage.removeItem('pocketsmart_history_v1');
      }
      setHistoryItems([]);
      setSelectedPlan(null);
    }
  };

  const filteredItems = historyItems.filter((it) => {
    if (filter === 'all') return true;
    return it.type === filter;
  });

  const getIcon = (type: string) => {
    switch (type) {
      case 'home':
        return <Home size={18} color="#4cc9f0" />;
      case 'party':
        return <PartyPopper size={18} color="#f7b731" />;
      case 'jewelry':
        return <Gem size={18} color="#c084fc" />;
      default:
        return <History size={18} />;
    }
  };

  return (
    <div className="container" style={{ padding: '2.5rem 1.5rem' }}>
      {/* Header */}
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem', gap: '1rem' }}>
        <div>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.45rem',
              padding: '0.35rem 0.85rem',
              borderRadius: '999px',
              background: 'rgba(76, 201, 240, 0.15)',
              border: '1px solid rgba(76, 201, 240, 0.3)',
              color: '#4cc9f0',
              fontSize: '0.85rem',
              fontWeight: 600,
              marginBottom: '0.5rem',
            }}
          >
            <History size={15} /> Recommendation Logs & Audit Trail
          </div>
          <h1 style={{ fontSize: 'clamp(2rem, 3.5vw, 2.5rem)', fontWeight: 800 }}>
            Saved Plans & Past Queries
          </h1>
          <p style={{ color: '#94a3b8', fontSize: '0.95rem' }}>
            Review, compare, and reuse previous AI budget allocations across all domains.
          </p>
        </div>

        {historyItems.length > 0 && (
          <button
            onClick={handleClearAll}
            className="btn btn-secondary"
            style={{ fontSize: '0.85rem', padding: '0.5rem 1rem', color: '#ff5e7e' }}
          >
            <Trash2 size={14} /> Clear All History
          </button>
        )}
      </div>

      {/* Filter Tabs */}
      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
        {(['all', 'home', 'party', 'jewelry'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setFilter(tab)}
            style={{
              padding: '0.5rem 1.15rem',
              fontSize: '0.85rem',
              fontWeight: 600,
              borderRadius: '999px',
              background: filter === tab ? '#4361ee' : 'rgba(255, 255, 255, 0.06)',
              color: filter === tab ? '#ffffff' : '#94a3b8',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              cursor: 'pointer',
              textTransform: 'capitalize',
              transition: 'all 0.2s',
            }}
          >
            {tab === 'all' ? `All Plans (${historyItems.length})` : tab}
          </button>
        ))}
      </div>

      {filteredItems.length === 0 ? (
        <div
          className="glass-panel"
          style={{
            padding: '4rem 2rem',
            textAlign: 'center',
            maxWidth: '550px',
            margin: '0 auto',
          }}
        >
          <div
            style={{
              width: '60px',
              height: '60px',
              borderRadius: '50%',
              background: 'rgba(76, 201, 240, 0.1)',
              color: '#4cc9f0',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1.25rem auto',
            }}
          >
            <History size={30} />
          </div>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.5rem' }}>
            No Saved Plans Yet
          </h3>
          <p style={{ color: '#94a3b8', fontSize: '0.9rem', marginBottom: '1.5rem', lineHeight: 1.5 }}>
            Whenever you generate an interior blueprint, event budget, or jewelry curation, it will be automatically recorded here for instant reference.
          </p>
          <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/home-planner" className="btn btn-primary" style={{ fontSize: '0.85rem' }}>
              Plan Home Interior
            </Link>
            <Link href="/party-planner" className="btn btn-secondary" style={{ fontSize: '0.85rem' }}>
              Plan Party
            </Link>
          </div>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: selectedPlan ? '1fr 1fr' : '1fr', gap: '2rem' }}>
          {/* List of Saved Items */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {filteredItems.map((item) => {
              const isSelected = selectedPlan?.id === item.id;
              const dateStr = new Date(item.timestamp).toLocaleDateString(undefined, {
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
              });

              return (
                <div
                  key={item.id}
                  onClick={() => setSelectedPlan(item)}
                  className="glass-card"
                  style={{
                    padding: '1.25rem',
                    cursor: 'pointer',
                    borderColor: isSelected ? '#4cc9f0' : 'rgba(255, 255, 255, 0.08)',
                    background: isSelected ? 'rgba(28, 45, 96, 0.9)' : 'rgba(18, 30, 66, 0.6)',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <div
                      style={{
                        width: '42px',
                        height: '42px',
                        borderRadius: '10px',
                        background: 'rgba(255, 255, 255, 0.06)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      {getIcon(item.type)}
                    </div>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.2rem' }}>
                        <span style={{ fontSize: '0.7rem', textTransform: 'uppercase', color: '#4cc9f0', fontWeight: 700 }}>
                          {item.type} planner
                        </span>
                        <span style={{ fontSize: '0.7rem', color: '#64748b' }}>• {dateStr}</span>
                      </div>
                      <h4 style={{ fontSize: '1rem', fontWeight: 700, color: '#ffffff' }}>{item.title}</h4>
                      <span style={{ fontSize: '0.85rem', color: '#94a3b8' }}>
                        Target: {item.currency === 'INR' ? '₹' : '$'}{item.budget.toLocaleString()}
                      </span>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                    <button
                      onClick={(e) => handleDelete(item.id, e)}
                      style={{
                        background: 'transparent',
                        border: 'none',
                        color: '#64748b',
                        cursor: 'pointer',
                        padding: '0.4rem',
                      }}
                      title="Delete plan"
                    >
                      <Trash2 size={16} />
                    </button>
                    <ArrowRight size={18} color={isSelected ? '#4cc9f0' : '#64748b'} />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Details Pane */}
          {selectedPlan && (
            <div className="glass-panel" style={{ padding: '1.75rem', position: 'sticky', top: '5rem', maxHeight: '80vh', overflowY: 'auto' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem', borderBottom: '1px solid rgba(255, 255, 255, 0.08)', paddingBottom: '0.75rem' }}>
                <div>
                  <span style={{ fontSize: '0.75rem', color: '#4cc9f0', fontWeight: 700, textTransform: 'uppercase' }}>
                    {selectedPlan.type} Plan Details
                  </span>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#ffffff' }}>{selectedPlan.title}</h3>
                </div>
                <button
                  onClick={() => setSelectedPlan(null)}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#94a3b8',
                    cursor: 'pointer',
                    fontSize: '0.85rem',
                  }}
                >
                  Close
                </button>
              </div>

              {/* Render dynamic details based on plan type */}
              {selectedPlan.type === 'home' && (
                <div>
                  {(() => {
                    const home = selectedPlan.data as HomePlanResult;
                    return (
                      <div>
                        <p style={{ fontSize: '0.85rem', color: '#cbd5e1', marginBottom: '1rem' }}>{home.summary}</p>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                          {home.roomBreakdowns?.map((r, i) => (
                            <div key={i} style={{ background: 'rgba(11, 20, 48, 0.6)', padding: '0.85rem', borderRadius: '8px' }}>
                              <strong style={{ fontSize: '0.9rem', color: '#4cc9f0' }}>{r.room}</strong>
                              <div style={{ fontSize: '0.8rem', color: '#94a3b8', marginTop: '0.2rem' }}>
                                Estimated: {home.currency === 'INR' ? '₹' : '$'}{r.estimatedCost?.toLocaleString()}
                              </div>
                              <ul style={{ fontSize: '0.75rem', color: '#cbd5e1', marginTop: '0.4rem', paddingLeft: '1rem' }}>
                                {r.items?.map((it, ii) => (
                                  <li key={ii}>
                                    {it.name} ({it.platform}) - {it.currency === 'INR' ? '₹' : '$'}{it.price}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  })()}
                </div>
              )}

              {selectedPlan.type === 'party' && (
                <div>
                  {(() => {
                    const party = selectedPlan.data as PartyPlanResult;
                    return (
                      <div>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '1rem' }}>
                          <div style={{ background: 'rgba(11, 20, 48, 0.6)', padding: '0.75rem', borderRadius: '8px' }}>
                            <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Guests</span>
                            <div style={{ fontSize: '1.1rem', fontWeight: 700 }}>{party.guestCount}</div>
                          </div>
                          <div style={{ background: 'rgba(11, 20, 48, 0.6)', padding: '0.75rem', borderRadius: '8px' }}>
                            <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Cost / Guest</span>
                            <div style={{ fontSize: '1.1rem', fontWeight: 700, color: '#4cc9f0' }}>
                              {party.currency === 'INR' ? '₹' : '$'}{party.costPerGuest?.toLocaleString()}
                            </div>
                          </div>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                          {party.allocations?.map((al, idx) => (
                            <div key={idx} style={{ background: 'rgba(11, 20, 48, 0.6)', padding: '0.85rem', borderRadius: '8px' }}>
                              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', fontWeight: 600 }}>
                                <span>{al.category}</span>
                                <span style={{ color: '#4cc9f0' }}>
                                  {party.currency === 'INR' ? '₹' : '$'}{al.allocatedAmount?.toLocaleString()}
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  })()}
                </div>
              )}

              {selectedPlan.type === 'jewelry' && (
                <div>
                  {(() => {
                    const jewel = selectedPlan.data as JewelryPlanResult;
                    return (
                      <div>
                        {jewel.aestheticAnalysis && (
                          <div style={{ background: 'rgba(11, 20, 48, 0.6)', padding: '0.85rem', borderRadius: '8px', marginBottom: '1rem' }}>
                            <strong style={{ fontSize: '0.85rem', color: '#4cc9f0' }}>Aesthetic Vibe:</strong>
                            <p style={{ fontSize: '0.8rem', color: '#cbd5e1', marginTop: '0.2rem' }}>
                              {jewel.aestheticAnalysis.overallVibe}
                            </p>
                          </div>
                        )}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                          {jewel.recommendations?.map((r, idx) => (
                            <div key={idx} style={{ background: 'rgba(11, 20, 48, 0.6)', padding: '0.85rem', borderRadius: '8px' }}>
                              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <span style={{ fontSize: '0.75rem', color: '#c084fc', fontWeight: 700 }}>{r.pieceType}</span>
                                <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#ffffff' }}>
                                  {r.item.currency === 'INR' ? '₹' : '$'}{r.item.price}
                                </span>
                              </div>
                              <div style={{ fontSize: '0.85rem', color: '#ffffff', fontWeight: 600, marginTop: '0.2rem' }}>
                                {r.item.name}
                              </div>
                              <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>
                                Available on {r.item.platform}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  })()}
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
