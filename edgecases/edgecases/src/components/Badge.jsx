// Edge Cases — Reusable Badge Component
import React from 'react';

export default function Badge({
  children,
  variant = 'default', // 'easy' | 'medium' | 'hard' | 'accent' | 'default'
  className = '',
}) {
  const variantClass = variant !== 'default' ? `badge-${variant.toLowerCase()}` : '';

  return (
    <span className={`badge ${variantClass} ${className}`}>
      {children}
    </span>
  );
}
