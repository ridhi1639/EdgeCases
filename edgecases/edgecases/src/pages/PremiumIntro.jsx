// Edge Cases — Premium Intro / Subscription Plans Page
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  Lock, Star, Crown, Check, Zap, Brain,
  MessageSquare, Video, ChevronRight, X,
  Calendar, Clock,
} from 'lucide-react';
import premiumLockImg from '../assets/premium_lock.jpg';
import '../styles/premium.css';

// ─── Pricing Config ───────────────────────────────────────────────
const PRICING = {
  silver: {
    monthly: { price: '₹600', original: '₹800', period: 'month', saving: null },
    yearly:  { price: '₹4,999', original: '₹9,600', period: 'year', saving: 'Save ₹4,601 (48% off)' },
  },
  gold: {
    monthly: { price: '₹1,000', original: '₹1,499', period: 'month', saving: null },
    yearly:  { price: '₹7,999', original: '₹17,988', period: 'year', saving: 'Save ₹9,989 (55% off)' },
  },
};

const SILVER_FEATURES = [
  { icon: Brain,         text: 'AI Tutor — step-by-step hints without revealing solutions' },
  { icon: Zap,           text: 'Optimized approach explanations after attempt' },
  { icon: MessageSquare, text: 'Community comments & discussions on each question' },
  { icon: Check,         text: 'Real-time problem-solving guidance' },
  { icon: Check,         text: 'Unlocks all 20+ Interview-Level Questions' },
];

const GOLD_FEATURES = [
  { icon: Crown,         text: 'Everything in Silver, plus:' },
  { icon: Video,         text: '👑 Mock Interview Simulator (Gold Exclusive)' },
  { icon: Brain,         text: 'Personalized interview performance report' },
  { icon: Zap,           text: 'Expert-level approach walkthroughs' },
  { icon: MessageSquare, text: 'Priority tutor + mentor access' },
  { icon: Check,         text: 'Unlimited AI mock sessions' },
];

export default function PremiumIntro() {
  const navigate = useNavigate();
  const { user, updateUser } = useAuth();
  const [selectedPlan, setSelectedPlan] = useState('gold');
  const [billing, setBilling] = useState('monthly'); // 'monthly' | 'yearly'
  const [showPayment, setShowPayment] = useState(false);

  const handleSelectPlan = (plan) => {
    setSelectedPlan(plan);
    setShowPayment(true);
  };

  const currentSilver = PRICING.silver[billing];
  const currentGold   = PRICING.gold[billing];
  const currentPrice  = selectedPlan === 'gold' ? currentGold : currentSilver;

  return (
    <div className="premium-intro-page">
      {/* Animated Background Orbs */}
      <div className="premium-orb premium-orb-1" />
      <div className="premium-orb premium-orb-2" />
      <div className="premium-orb premium-orb-3" />

      {/* Hero Lock Section */}
      <section className="premium-hero">
        <div className="premium-lock-wrapper">
          <img src={premiumLockImg} alt="Premium Lock" className="premium-lock-img" />
          <div className="premium-lock-glow" />
        </div>
        <div className="premium-hero-text">
          <div className="premium-badge">
            <Star size={14} />
            <span>PREMIUM ACCESS</span>
          </div>
          <h1 className="premium-hero-title">Unlock Interview-Level Features</h1>
          <p className="premium-hero-subtitle">
            Get access to 20+ curated interview questions, AI-powered tutoring, and — on Gold — 
            the full Mock Interview Simulator with live AI feedback.
          </p>
        </div>
      </section>

      {/* Plans Section */}
      <section className="premium-plans-section">
        <div className="premium-plans-header">
          <h2 className="premium-plans-title">Choose Your Plan</h2>
          <p className="premium-plans-subtitle">Cancel anytime. No hidden charges.</p>

          {/* ── Monthly / Yearly Toggle ── */}
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '0',
            background: 'rgba(255,255,255,0.04)', border: '1px solid #262638',
            borderRadius: '99px', padding: '4px', marginTop: '16px', position: 'relative',
          }}>
            {['monthly', 'yearly'].map((b) => (
              <button
                key={b}
                onClick={() => setBilling(b)}
                style={{
                  padding: '7px 20px', borderRadius: '99px', border: 'none', cursor: 'pointer',
                  fontWeight: 600, fontSize: '13px', transition: 'all 0.2s ease',
                  background: billing === b
                    ? b === 'yearly' ? 'linear-gradient(135deg,#C5F467,#8DBF30)' : '#FFFFFF'
                    : 'transparent',
                  color: billing === b
                    ? b === 'yearly' ? '#0C0C12' : '#0C0C12'
                    : '#666E77',
                }}
              >
                {b === 'monthly' ? (
                  <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                    <Clock size={12} /> Monthly
                  </span>
                ) : (
                  <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                    <Calendar size={12} /> Yearly
                    <span style={{
                      background: 'rgba(197,244,103,0.2)', color: '#C5F467',
                      fontSize: '10px', padding: '1px 5px', borderRadius: '99px',
                      fontWeight: 700,
                    }}>BEST VALUE</span>
                  </span>
                )}
              </button>
            ))}
          </div>

          {billing === 'yearly' && (
            <p style={{ fontSize: '12px', color: '#C5F467', marginTop: '8px', fontWeight: 500 }}>
              🎉 Annual plans save you up to 55% compared to monthly!
            </p>
          )}
        </div>

        <div className="premium-plans-grid">
          {/* ── Silver Plan ── */}
          <div
            className={`premium-plan-card silver-plan ${selectedPlan === 'silver' ? 'plan-selected' : ''}`}
            onClick={() => setSelectedPlan('silver')}
          >
            <div className="plan-card-header">
              <div className="plan-icon silver-icon"><Star size={22} /></div>
              <div>
                <div className="plan-name">Silver</div>
                <div className="plan-tagline">Perfect for focused prep</div>
              </div>
              <div className="plan-radio">
                <div className={`radio-dot ${selectedPlan === 'silver' ? 'radio-active' : ''}`} />
              </div>
            </div>

            <div className="plan-price-block">
              <div className="plan-price">
                <span className="plan-current-price">{currentSilver.price}</span>
                <span className="plan-original-price">{currentSilver.original}</span>
              </div>
              {currentSilver.saving ? (
                <div className="plan-offer-tag">🎉 {currentSilver.saving}</div>
              ) : (
                <div className="plan-offer-tag">🎉 ₹200 off — Limited Time</div>
              )}
              <div className="plan-period">per {currentSilver.period}</div>
            </div>

            <ul className="plan-features-list">
              {SILVER_FEATURES.map((f, i) => (
                <li key={i} className="plan-feature-item">
                  <span className="feature-icon silver-feature-icon"><f.icon size={13} /></span>
                  <span>{f.text}</span>
                </li>
              ))}
              {/* Explicitly show Mock Interview is NOT included */}
              <li className="plan-feature-item" style={{ opacity: 0.45 }}>
                <span className="feature-icon" style={{ color: '#3C3C4C' }}>
                  <X size={13} />
                </span>
                <span style={{ textDecoration: 'line-through', color: '#3C3C4C' }}>
                  Mock Interview Simulator
                </span>
                <span style={{
                  marginLeft: '6px', fontSize: '10px', color: '#FFB340',
                  background: 'rgba(255,179,64,0.1)', border: '1px solid rgba(255,179,64,0.2)',
                  borderRadius: '4px', padding: '1px 5px',
                }}>Gold only</span>
              </li>
            </ul>

            <button
              className="plan-btn silver-btn"
              onClick={(e) => { e.stopPropagation(); handleSelectPlan('silver'); }}
            >
              Get Silver <ChevronRight size={16} />
            </button>
          </div>

          {/* ── Gold Plan ── */}
          <div
            className={`premium-plan-card gold-plan ${selectedPlan === 'gold' ? 'plan-selected' : ''}`}
            onClick={() => setSelectedPlan('gold')}
          >
            <div className="plan-popular-badge">Most Popular</div>
            <div className="plan-card-header">
              <div className="plan-icon gold-icon"><Crown size={22} /></div>
              <div>
                <div className="plan-name">Gold</div>
                <div className="plan-tagline">Full interview mastery</div>
              </div>
              <div className="plan-radio">
                <div className={`radio-dot ${selectedPlan === 'gold' ? 'radio-active gold-radio' : ''}`} />
              </div>
            </div>

            <div className="plan-price-block">
              <div className="plan-price">
                <span className="plan-current-price gold-price">{currentGold.price}</span>
                <span className="plan-original-price">{currentGold.original}</span>
              </div>
              {currentGold.saving ? (
                <div className="plan-offer-tag gold-offer">🚀 {currentGold.saving}</div>
              ) : (
                <div className="plan-offer-tag gold-offer">🚀 Includes Mock Interviews</div>
              )}
              <div className="plan-period">per {currentGold.period}</div>
            </div>

            <ul className="plan-features-list">
              {GOLD_FEATURES.map((f, i) => (
                <li key={i} className="plan-feature-item" style={i === 1 ? {
                  background: 'rgba(255,179,64,0.07)', border: '1px solid rgba(255,179,64,0.2)',
                  borderRadius: '6px', padding: '6px 8px', marginBottom: '4px',
                } : {}}>
                  <span className="feature-icon gold-feature-icon"><f.icon size={13} /></span>
                  <span style={i === 1 ? { color: '#FFB340', fontWeight: 600 } : {}}>{f.text}</span>
                </li>
              ))}
            </ul>

            <button
              className="plan-btn gold-btn"
              onClick={(e) => { e.stopPropagation(); handleSelectPlan('gold'); }}
            >
              Get Gold <Crown size={16} />
            </button>
          </div>
        </div>

        {/* Comparison note */}
        <div style={{
          textAlign: 'center', marginTop: '20px',
          fontSize: '12px', color: '#666E77',
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px',
        }}>
          <Crown size={12} style={{ color: '#FFB340' }} />
          Mock Interview Simulator is exclusively available on the <strong style={{ color: '#FFB340' }}>Gold</strong> plan.
        </div>

        <button className="premium-skip-btn" onClick={() => navigate('/premium-questions')}>
          Continue browsing free questions →
        </button>
      </section>

      {/* Payment Modal */}
      {showPayment && (
        <div className="payment-modal-overlay" onClick={() => setShowPayment(false)}>
          <div className="payment-modal" onClick={(e) => e.stopPropagation()}>
            <button className="payment-modal-close" onClick={() => setShowPayment(false)}>
              <X size={18} />
            </button>

            <div className="payment-modal-icon">
              {selectedPlan === 'gold' ? <Crown size={28} /> : <Star size={28} />}
            </div>

            <h3 className="payment-modal-title">
              {selectedPlan === 'gold' ? 'Gold' : 'Silver'} Plan — {billing === 'yearly' ? 'Annual' : 'Monthly'}
            </h3>

            {/* Billing toggle inside modal */}
            <div style={{
              display: 'inline-flex', background: 'rgba(255,255,255,0.04)',
              border: '1px solid #262638', borderRadius: '8px', overflow: 'hidden',
              margin: '12px 0',
            }}>
              {['monthly', 'yearly'].map((b) => (
                <button key={b} onClick={() => setBilling(b)} style={{
                  padding: '6px 16px', border: 'none', cursor: 'pointer', fontSize: '12px',
                  fontWeight: 600, transition: 'all 0.2s',
                  background: billing === b ? (selectedPlan === 'gold' ? '#FFB340' : '#9FA2B4') : 'transparent',
                  color: billing === b ? '#0C0C12' : '#666E77',
                }}>
                  {b.charAt(0).toUpperCase() + b.slice(1)}
                </button>
              ))}
            </div>

            <p className="payment-modal-desc">
              Payment integration coming soon! You'll be redirected to a secure payment gateway.
            </p>

            <div className="payment-modal-price">
              {currentPrice.price}
              <span>/{currentPrice.period}</span>
            </div>

            {currentPrice.saving && (
              <div style={{ fontSize: '12px', color: '#C5F467', marginBottom: '8px', fontWeight: 500 }}>
                🎉 {currentPrice.saving}
              </div>
            )}

            <button
              className={`payment-modal-btn ${selectedPlan === 'gold' ? 'gold-btn' : 'silver-btn'}`}
              onClick={() => {
                if (updateUser) {
                  updateUser({ isPremium: true, membership: selectedPlan });
                }
                setShowPayment(false);
                if (selectedPlan === 'gold') {
                  navigate('/mock-interview');
                } else {
                  navigate('/premium-questions');
                }
              }}
            >
              Confirm & Unlock {selectedPlan === 'gold' ? 'Gold' : 'Silver'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
