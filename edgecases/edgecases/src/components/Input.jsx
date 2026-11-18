// Edge Cases — Standard Accessible Input Component
import React from 'react';
import '../styles/forms.css';

export default function Input({
  label,
  optional = false,
  error,
  helper,
  leadingIcon,
  trailingIcon,
  className = '',
  id,
  type = 'text',
  ...props
}) {
  const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

  return (
    <div className={`form-group ${className}`}>
      {label && (
        <label htmlFor={inputId} className="form-label">
          <span>{label}</span>
          {optional && <span className="form-label-optional">(optional)</span>}
        </label>
      )}

      <div
        className={`input-wrapper ${leadingIcon ? 'has-leading' : ''} ${
          trailingIcon ? 'has-trailing' : ''
        }`}
      >
        {leadingIcon && <span className="input-icon-leading">{leadingIcon}</span>}
        <input
          id={inputId}
          type={type}
          className={`form-input ${error ? 'is-error' : ''}`}
          {...props}
        />
        {trailingIcon && <span className="input-icon-trailing">{trailingIcon}</span>}
      </div>

      {error && <span className="form-error">{error}</span>}
      {helper && !error && <span className="form-helper">{helper}</span>}
    </div>
  );
}
