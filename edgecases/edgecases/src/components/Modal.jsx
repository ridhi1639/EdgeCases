// Edge Cases — Accessible Modal Dialog Component
import React, { useEffect } from 'react';
import '../styles/buttons.css';

export default function Modal({ isOpen, onClose, title, children, actions }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 100,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px',
        backgroundColor: 'rgba(0, 0, 0, 0.75)',
        backdropFilter: 'blur(4px)',
      }}
      onClick={onClose}
    >
      <div
        style={{
          backgroundColor: '#191C1F',
          border: '1px solid #303438',
          borderRadius: '8px',
          maxWidth: '440px',
          width: '100%',
          padding: '24px',
          boxShadow: '0 20px 40px rgba(0,0,0,0.8)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '16px',
            paddingBottom: '12px',
            borderBottom: '1px solid #23272B',
          }}
        >
          <h3
            style={{
              fontSize: '15px',
              fontWeight: 600,
              color: '#ECEEEF',
              margin: 0,
            }}
          >
            {title}
          </h3>
          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              color: '#666E77',
              cursor: 'pointer',
              fontSize: '18px',
              lineHeight: 1,
            }}
          >
            &times;
          </button>
        </div>

        <div style={{ color: '#969DA5', fontSize: '13px', lineHeight: 1.5, marginBottom: '20px' }}>
          {children}
        </div>

        {actions && (
          <div
            style={{
              display: 'flex',
              justifyContent: 'flex-end',
              gap: '10px',
            }}
          >
            {actions}
          </div>
        )}
      </div>
    </div>
  );
}
