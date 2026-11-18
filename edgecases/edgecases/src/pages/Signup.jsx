// Edge Cases — Signup Screen (Premium Redesign)
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Terminal, Eye, EyeOff, ArrowRight, ShieldCheck, Zap, Trophy, Code2 } from 'lucide-react';
import Input from '../components/Input';
import Button from '../components/Button';
import signupBg from '../assets/signup_bg.jpg';
import '../styles/auth.css';
import '../styles/signup.css';

export default function Signup() {
  const { signup } = useAuth();
  const navigate = useNavigate();

  const [fullName, setFullName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const getPasswordStrength = (pwd) => {
    if (!pwd) return { score: 0, label: '' };
    let score = 0;
    if (pwd.length >= 8) score++;
    if (/[A-Z]/.test(pwd)) score++;
    if (/[0-9]/.test(pwd)) score++;
    if (/[^A-Za-z0-9]/.test(pwd)) score++;
    const labels = ['Weak', 'Fair', 'Good', 'Strong'];
    return { score, label: labels[score - 1] || 'Weak' };
  };

  const passwordStrength = getPasswordStrength(password);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!fullName.trim()) newErrors.fullName = 'Full name is required.';
    if (!username.trim() || !/^[a-zA-Z0-9_]{3,20}$/.test(username)) {
      newErrors.username = 'Username must be 3-20 characters (letters, numbers, underscores).';
    }
    if (!email.trim() || !email.includes('@')) {
      newErrors.email = 'Valid developer email required.';
    }
    if (!password || password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters.';
    }
    if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match.';
    }
    if (!termsAccepted) {
      newErrors.terms = 'You must accept the terms of service.';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    try {
      setIsLoading(true);
      await signup({ fullName, username, email, password });
      navigate('/dashboard');
    } catch (err) {
      setErrors({ form: err.message || 'Failed to create account.' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="signup-page">
      {/* Background Image */}
      <div className="signup-bg-image" style={{ backgroundImage: `url(${signupBg})` }} />
      <div className="signup-bg-overlay" />

      {/* Floating Stats */}
      <div className="signup-floating-stats">
        <div className="signup-stat">
          <Trophy size={14} />
          <span>10,000+ Developers</span>
        </div>
        <div className="signup-stat-divider" />
        <div className="signup-stat">
          <Zap size={14} />
          <span>Real-time Battles</span>
        </div>
        <div className="signup-stat-divider" />
        <div className="signup-stat">
          <Code2 size={14} />
          <span>150+ Problems</span>
        </div>
      </div>

      {/* Form Card */}
      <div className="signup-form-container">
        <div className="signup-form-card">
          <div className="signup-form-header">
            <Link to="/" className="signup-brand">
              <Terminal size={16} style={{ color: '#C5F467' }} />
              <span>edgecases</span>
            </Link>
            <h1 className="signup-form-title">Create your account</h1>
            <p className="signup-form-subtitle">
              Join 10,000+ developers competing in real-time coding battles.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="signup-form" noValidate>
            <div className="signup-name-row">
              <Input
                label="Full Name"
                placeholder="Ada Lovelace"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                error={errors.fullName}
                disabled={isLoading}
                required
              />
              <Input
                label="Username"
                placeholder="ada_codes"
                value={username}
                onChange={(e) => setUsername(e.target.value.toLowerCase())}
                error={errors.username}
                helper="3-20 chars, no spaces"
                disabled={isLoading}
                required
              />
            </div>

            <Input
              label="Email Address"
              type="email"
              placeholder="ada@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={errors.email}
              disabled={isLoading}
              required
            />

            <Input
              label="Password"
              type={showPassword ? 'text' : 'password'}
              placeholder="Minimum 8 characters"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={errors.password}
              disabled={isLoading}
              trailingIcon={
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{ background: 'none', border: 'none', color: '#666E77', cursor: 'pointer' }}
                >
                  {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              }
              required
            />

            {password && (
              <div className="password-strength">
                <div className="password-strength-bars">
                  {[1, 2, 3, 4].map((step) => {
                    let stepClass = '';
                    if (step <= passwordStrength.score) {
                      if (passwordStrength.score === 1) stepClass = 'is-weak';
                      else if (passwordStrength.score === 2) stepClass = 'is-fair';
                      else if (passwordStrength.score === 3) stepClass = 'is-good';
                      else if (passwordStrength.score === 4) stepClass = 'is-strong';
                    }
                    return <div key={step} className={`strength-bar ${stepClass}`} />;
                  })}
                </div>
                <div className="password-strength-label">Strength: {passwordStrength.label}</div>
              </div>
            )}

            <Input
              label="Confirm Password"
              type={showPassword ? 'text' : 'password'}
              placeholder="Re-enter password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              error={errors.confirmPassword}
              disabled={isLoading}
              required
            />

            <div style={{ marginBottom: '16px' }}>
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  className="checkbox-input"
                  checked={termsAccepted}
                  onChange={(e) => setTermsAccepted(e.target.checked)}
                />
                <span style={{ fontSize: '12px' }}>
                  I agree to the competitive fair-play and edge cases rules
                </span>
              </label>
              {errors.terms && <span className="form-error">{errors.terms}</span>}
            </div>

            {errors.form && (
              <div className="signup-form-error">
                {errors.form}
              </div>
            )}

            <Button
              type="submit"
              variant="primary"
              size="md"
              isLoading={isLoading}
              style={{ width: '100%' }}
            >
              <span>Create Account</span>
              <ArrowRight size={14} />
            </Button>
          </form>

          <div className="signup-form-footer">
            <div className="signup-trust-badges">
              <div className="signup-trust-item">
                <ShieldCheck size={12} style={{ color: '#4ade80' }} />
                <span>Secure</span>
              </div>
              <div className="signup-trust-item">
                <Zap size={12} style={{ color: '#C5F467' }} />
                <span>Elo Rating: 1400</span>
              </div>
            </div>
            <p className="signup-login-link">
              Already have an account?{' '}
              <Link to="/login" className="auth-link">Sign in</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
