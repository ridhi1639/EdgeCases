// Edge Cases — Reusable Button Component
import React from 'react';
import '../styles/buttons.css';

export default function Button({
  children,
  variant = 'secondary',
  size = 'md',
  isLoading = false,
  disabled = false,
  icon = null,
  iconRight = null,
  className = '',
  type = 'button',
  onClick,
  ...props
}) {
  const variantClass = `btn-${variant}`;
  const sizeClass = `btn-${size}`;
  const disabledState = disabled || isLoading;

  return (
    <button
      type={type}
      className={`btn ${variantClass} ${sizeClass} ${className}`}
      disabled={disabledState}
      onClick={onClick}
      {...props}
    >
      {isLoading ? (
        <span className="spinner" aria-hidden="true" />
      ) : (
        icon && <span className="btn-icon-slot">{icon}</span>
      )}
      {children}
      {!isLoading && iconRight && <span className="btn-icon-slot">{iconRight}</span>}
    </button>
  );
}
