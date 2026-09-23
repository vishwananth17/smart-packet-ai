'use client';

import React from 'react';
import { Currency } from '@/lib/types';
import { CheckCircle2, AlertTriangle } from 'lucide-react';

interface BudgetGaugeProps {
  totalBudget: number;
  totalEstimatedCost: number;
  currency: Currency;
}

export function BudgetGauge({ totalBudget, totalEstimatedCost, currency }: BudgetGaugeProps) {
  const symbol = currency === 'INR' ? '₹' : '$';
  const percentage = totalBudget > 0 ? Math.round((totalEstimatedCost / totalBudget) * 100) : 0;
  const isOverBudget = totalEstimatedCost > totalBudget;
  const remaining = totalBudget - totalEstimatedCost;

  let barColor = 'linear-gradient(90deg, #2ec4b6, #4cc9f0)';
  if (percentage > 95 && percentage <= 100) {
    barColor = 'linear-gradient(90deg, #4cc9f0, #f7b731)';
  } else if (isOverBudget) {
    barColor = 'linear-gradient(90deg, #f7b731, #ff5e7e)';
  }

  return (
    <div
      style={{
        background: 'rgba(11, 20, 48, 0.7)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        borderRadius: '16px',
        padding: '1.25rem',
        margin: '1.5rem 0',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '0.75rem' }}>
        <div>
          <span style={{ fontSize: '0.8rem', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Budget Adherence Status
          </span>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.2rem' }}>
            <span style={{ fontSize: '1.5rem', fontWeight: '800', color: '#ffffff' }}>
              {symbol}{totalEstimatedCost.toLocaleString()}
            </span>
            <span style={{ fontSize: '0.9rem', color: '#94a3b8' }}>
              of {symbol}{totalBudget.toLocaleString()} target ({percentage}%)
            </span>
          </div>
        </div>

        <div style={{ textAlign: 'right' }}>
          {isOverBudget ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: '#ff5e7e', fontWeight: 600, fontSize: '0.85rem' }}>
              <AlertTriangle size={16} /> Over Budget by {symbol}{Math.abs(remaining).toLocaleString()}
            </div>
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: '#2ec4b6', fontWeight: 600, fontSize: '0.85rem' }}>
              <CheckCircle2 size={16} /> Within Budget! Buffer: {symbol}{remaining.toLocaleString()}
            </div>
          )}
        </div>
      </div>

      {/* Progress Bar */}
      <div
        style={{
          width: '100%',
          height: '10px',
          background: 'rgba(255, 255, 255, 0.08)',
          borderRadius: '999px',
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        <div
          style={{
            width: `${Math.min(100, percentage)}%`,
            height: '100%',
            background: barColor,
            borderRadius: '999px',
            transition: 'width 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        />
      </div>
    </div>
  );
}
