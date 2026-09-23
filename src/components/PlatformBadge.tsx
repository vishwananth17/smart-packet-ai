'use client';

import React from 'react';
import { ShoppingCart, Utensils, Hotel, Sparkles, Box } from 'lucide-react';

interface PlatformBadgeProps {
  platform: string;
  size?: 'sm' | 'md';
}

export function PlatformBadge({ platform, size = 'sm' }: PlatformBadgeProps) {
  const norm = platform.toLowerCase();

  let className = 'badge ';
  let icon = <Box size={12} />;

  if (norm.includes('ikea')) {
    className += 'badge-ikea';
    icon = <Box size={12} />;
  } else if (norm.includes('amazon')) {
    className += 'badge-amazon';
    icon = <ShoppingCart size={12} />;
  } else if (norm.includes('flipkart')) {
    className += 'badge-flipkart';
    icon = <ShoppingCart size={12} />;
  } else if (norm.includes('swiggy')) {
    className += 'badge-swiggy';
    icon = <Utensils size={12} />;
  } else if (norm.includes('zomato')) {
    className += 'badge-zomato';
    icon = <Utensils size={12} />;
  } else if (norm.includes('oyo')) {
    className += 'badge-oyo';
    icon = <Hotel size={12} />;
  } else if (norm.includes('tanishq')) {
    className += 'badge-tanishq';
    icon = <Sparkles size={12} />;
  } else if (norm.includes('caratlane')) {
    className += 'badge-caratlane';
    icon = <Sparkles size={12} />;
  } else {
    className += 'badge-ai';
    icon = <Sparkles size={12} />;
  }

  return (
    <span className={className} style={{ fontSize: size === 'md' ? '0.85rem' : '0.72rem' }}>
      {icon}
      <span>{platform}</span>
    </span>
  );
}
