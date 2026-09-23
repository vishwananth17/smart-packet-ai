'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Sparkles, Home, PartyPopper, Gem, History, User, LogOut, Menu, X } from 'lucide-react';
import { getCurrentUser, logoutUser, UserSession } from '@/lib/storage';

export function Navbar() {
  const pathname = usePathname();
  const [user, setUser] = useState<UserSession | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    setUser(getCurrentUser());
  }, []);

  const handleLogout = () => {
    logoutUser();
    setUser({ email: 'guest@pocketsmart.ai', name: 'Guest Explorer', isLoggedIn: false });
  };

  const navLinks = [
    { href: '/', label: 'Home', icon: null },
    { href: '/home-planner', label: 'Home Interior', icon: <Home size={15} /> },
    { href: '/party-planner', label: 'Party Planner', icon: <PartyPopper size={15} /> },
    { href: '/jewelry-planner', label: 'Jewelry & Outfit', icon: <Gem size={15} /> },
    { href: '/history', label: 'Saved Plans', icon: <History size={15} /> },
  ];

  return (
    <nav
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 50,
        background: 'rgba(7, 13, 30, 0.85)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(100, 150, 255, 0.12)',
        padding: '0.85rem 0',
      }}
    >
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        {/* Brand */}
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
          <div
            style={{
              width: '38px',
              height: '38px',
              borderRadius: '10px',
              background: 'linear-gradient(135deg, #4361ee 0%, #4cc9f0 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#ffffff',
              boxShadow: '0 4px 15px rgba(67, 97, 238, 0.4)',
            }}
          >
            <Sparkles size={22} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontSize: '1.25rem', fontWeight: 800, letterSpacing: '-0.02em', color: '#ffffff' }}>
              Pocket<span style={{ color: '#4cc9f0' }}>Smart</span>{' '}
              <span style={{ fontSize: '0.75rem', fontWeight: 700, padding: '2px 6px', background: 'rgba(76, 201, 240, 0.2)', border: '1px solid rgba(76, 201, 240, 0.4)', borderRadius: '6px', color: '#4cc9f0' }}>
                AI
              </span>
            </span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <div style={{ display: 'none', alignItems: 'center', gap: '0.5rem' }} className="desktop-nav">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  fontSize: '0.9rem',
                  fontWeight: 500,
                  color: isActive ? '#4cc9f0' : '#cbd5e1',
                  background: isActive ? 'rgba(76, 201, 240, 0.12)' : 'transparent',
                  padding: '0.45rem 0.85rem',
                  borderRadius: '999px',
                  border: isActive ? '1px solid rgba(76, 201, 240, 0.3)' : '1px solid transparent',
                  transition: 'all 0.2s ease',
                }}
              >
                {link.icon}
                {link.label}
              </Link>
            );
          })}
        </div>

        {/* User / Actions */}
        <div style={{ display: 'none', alignItems: 'center', gap: '0.75rem' }} className="desktop-actions">
          {user?.isLoggedIn ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
              <span style={{ fontSize: '0.85rem', color: '#94a3b8' }}>
                Hi, <strong style={{ color: '#ffffff' }}>{user.name.split(' ')[0]}</strong>
              </span>
              <button
                onClick={handleLogout}
                className="btn btn-secondary"
                style={{ padding: '0.45rem 0.8rem', fontSize: '0.8rem' }}
                title="Log Out"
              >
                <LogOut size={14} />
              </button>
            </div>
          ) : (
            <Link
              href="/auth"
              className="btn btn-secondary"
              style={{ padding: '0.45rem 1rem', fontSize: '0.85rem', borderRadius: '999px' }}
            >
              <User size={14} /> Sign In
            </Link>
          )}

          <Link
            href="/home-planner"
            className="btn btn-primary"
            style={{ padding: '0.5rem 1.15rem', fontSize: '0.875rem' }}
          >
            Start Planning
          </Link>
        </div>

        {/* Mobile menu trigger */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          style={{
            background: 'none',
            border: 'none',
            color: '#ffffff',
            cursor: 'pointer',
            padding: '0.4rem',
            display: 'block',
          }}
          className="mobile-toggle"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div
          style={{
            padding: '1rem 1.5rem',
            background: 'rgba(7, 13, 30, 0.98)',
            borderBottom: '1px solid rgba(100, 150, 255, 0.15)',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.75rem',
          }}
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.6rem',
                padding: '0.65rem 0',
                fontSize: '1rem',
                color: pathname === link.href ? '#4cc9f0' : '#ffffff',
                borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
              }}
            >
              {link.icon}
              {link.label}
            </Link>
          ))}
          <div style={{ paddingTop: '0.5rem', display: 'flex', gap: '0.75rem' }}>
            <Link
              href="/auth"
              onClick={() => setMobileMenuOpen(false)}
              className="btn btn-secondary"
              style={{ flex: 1, fontSize: '0.85rem' }}
            >
              Account
            </Link>
            <Link
              href="/home-planner"
              onClick={() => setMobileMenuOpen(false)}
              className="btn btn-primary"
              style={{ flex: 1, fontSize: '0.85rem' }}
            >
              Plan Now
            </Link>
          </div>
        </div>
      )}

      <style jsx>{`
        @media (min-width: 900px) {
          .desktop-nav {
            display: flex !important;
          }
          .desktop-actions {
            display: flex !important;
          }
          .mobile-toggle {
            display: none !important;
          }
        }
      `}</style>
    </nav>
  );
}
