'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Sparkles, User, Lock, Mail, ArrowRight, ShieldCheck } from 'lucide-react';
import { setCurrentUser, getCurrentUser } from '@/lib/storage';

export default function AuthPage() {
  const router = useRouter();
  const [tab, setTab] = useState<'login' | 'register'>('login');

  // Form states
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    // Mock realistic JWT generation
    setTimeout(() => {
      const token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.${btoa(
        JSON.stringify({ email, sub: 'user_123', iat: Date.now() })
      )}.signature`;

      setCurrentUser({
        email,
        name: email.split('@')[0].toUpperCase(),
        isLoggedIn: true,
        token,
      });

      setLoading(false);
      router.push('/home-planner');
    }, 600);
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    setTimeout(() => {
      const token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.${btoa(
        JSON.stringify({ email, name, sub: 'user_456', iat: Date.now() })
      )}.signature`;

      setCurrentUser({
        email,
        name: name || 'Smart Shopper',
        isLoggedIn: true,
        token,
      });

      setLoading(false);
      router.push('/home-planner');
    }, 600);
  };

  const handleGuestLogin = () => {
    setCurrentUser({
      email: 'demo@pocketsmart.ai',
      name: 'Demo Evaluator',
      isLoggedIn: true,
      token: 'demo_guest_token_valid',
    });
    router.push('/home-planner');
  };

  return (
    <div className="container" style={{ padding: '3.5rem 1.5rem', maxWidth: '480px' }}>
      <div className="glass-panel" style={{ padding: '2.5rem' }}>
        {/* Brand Header */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div
            style={{
              width: '45px',
              height: '45px',
              borderRadius: '12px',
              background: 'linear-gradient(135deg, #4361ee 0%, #4cc9f0 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#ffffff',
              margin: '0 auto 0.75rem auto',
              boxShadow: '0 4px 15px rgba(67, 97, 238, 0.4)',
            }}
          >
            <Sparkles size={24} />
          </div>
          <h2 style={{ fontSize: '1.65rem', fontWeight: 800, marginBottom: '0.35rem' }}>
            {tab === 'login' ? 'Welcome to PocketSmart' : 'Create an Account'}
          </h2>
          <p style={{ color: '#94a3b8', fontSize: '0.875rem' }}>
            {tab === 'login'
              ? 'Sign in to access saved budget recommendations'
              : 'Start your personalized AI budget journey'}
          </p>
        </div>

        {/* Tab switch */}
        <div
          style={{
            display: 'flex',
            background: 'rgba(11, 20, 48, 0.7)',
            padding: '4px',
            borderRadius: '10px',
            marginBottom: '1.5rem',
            border: '1px solid rgba(255, 255, 255, 0.08)',
          }}
        >
          <button
            type="button"
            onClick={() => setTab('login')}
            style={{
              flex: 1,
              padding: '0.5rem',
              borderRadius: '8px',
              background: tab === 'login' ? '#4361ee' : 'transparent',
              color: '#ffffff',
              border: 'none',
              fontWeight: 600,
              fontSize: '0.85rem',
              cursor: 'pointer',
              transition: 'all 0.2s',
            }}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => setTab('register')}
            style={{
              flex: 1,
              padding: '0.5rem',
              borderRadius: '8px',
              background: tab === 'register' ? '#4361ee' : 'transparent',
              color: '#ffffff',
              border: 'none',
              fontWeight: 600,
              fontSize: '0.85rem',
              cursor: 'pointer',
              transition: 'all 0.2s',
            }}
          >
            Register
          </button>
        </div>

        {/* Form */}
        <form onSubmit={tab === 'login' ? handleLogin : handleRegister}>
          {tab === 'register' && (
            <div className="input-group">
              <label className="input-label">Full Name</label>
              <div style={{ position: 'relative' }}>
                <input
                  type="text"
                  required
                  placeholder="e.g. Alex Sharma"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="input-field"
                />
              </div>
            </div>
          )}

          <div className="input-group">
            <label className="input-label">Email Address</label>
            <input
              type="email"
              required
              placeholder="you@domain.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input-field"
            />
          </div>

          <div className="input-group">
            <label className="input-label">Password</label>
            <input
              type="password"
              required
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input-field"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn btn-primary"
            style={{ width: '100%', padding: '0.85rem', fontSize: '0.95rem', marginTop: '0.5rem' }}
          >
            {loading ? (
              <div className="spinner" />
            ) : tab === 'login' ? (
              <>
                Sign In to PocketSmart <ArrowRight size={16} />
              </>
            ) : (
              <>
                Create Free Account <ArrowRight size={16} />
              </>
            )}
          </button>
        </form>

        {/* Guest access option */}
        <div style={{ margin: '1.75rem 0', textAlign: 'center', position: 'relative' }}>
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: 0,
              right: 0,
              height: '1px',
              background: 'rgba(255, 255, 255, 0.1)',
            }}
          />
          <span
            style={{
              position: 'relative',
              background: '#0d1b3e',
              padding: '0 0.75rem',
              color: '#64748b',
              fontSize: '0.75rem',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
            }}
          >
            OR ONE-CLICK TEST
          </span>
        </div>

        <button
          type="button"
          onClick={handleGuestLogin}
          className="btn btn-secondary"
          style={{ width: '100%', padding: '0.75rem', fontSize: '0.9rem' }}
        >
          <ShieldCheck size={16} color="#4cc9f0" /> Continue as Demo Evaluator
        </button>
      </div>
    </div>
  );
}
