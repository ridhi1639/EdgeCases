// Edge Cases — Login Screen (Clean Minimal)
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Terminal, Eye, EyeOff, ArrowRight } from 'lucide-react';
import Input from '../components/Input';
import Button from '../components/Button';
import '../styles/auth.css';

export default function Login() {
  const { login, demoLogin } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!email.trim() || !email.includes('@')) {
      setError('Please provide a valid email address.');
      return;
    }
    if (!password || password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    try {
      setIsLoading(true);
      await login({ email, password, rememberMe });
      navigate('/dashboard');
    } catch (err) {
      setError(err.message || 'Invalid credentials. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDemoSignIn = async () => {
    try {
      setIsLoading(true);
      await demoLogin();
      navigate('/dashboard');
    } catch (err) {
      setError('Demo login failed.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-simple-card">
        {/* Brand */}
        <Link to="/" className="auth-brand" style={{ marginBottom: '28px', display: 'inline-flex' }}>
          <Terminal size={16} style={{ color: '#DC1C1C' }} />
          <span>edgecases</span>
        </Link>

        <h1 className="auth-title">Welcome back.</h1>
        <p className="auth-subtitle" style={{ marginBottom: '28px' }}>
          Sign in to continue to your dashboard.
        </p>

        <form onSubmit={handleSubmit} className="auth-form" noValidate>
          <Input
            label="Email Address"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isLoading}
            required
          />

          <Input
            label="Password"
            type={showPassword ? 'text' : 'password'}
            placeholder="••••••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={isLoading}
            trailingIcon={
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{ background: 'none', border: 'none', color: '#666E77', cursor: 'pointer' }}
                title={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
              </button>
            }
            required
          />

          <div className="auth-options">
            <label className="checkbox-label">
              <input
                type="checkbox"
                className="checkbox-input"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              <span>Remember me</span>
            </label>
            <a
              href="#forgot"
              className="auth-link"
              onClick={(e) => {
                e.preventDefault();
                alert('Password reset link sent to your email.');
              }}
            >
              Forgot password?
            </a>
          </div>

          {error && (
            <div style={{
              color: '#F87171',
              backgroundColor: 'rgba(248, 113, 113, 0.1)',
              border: '1px solid rgba(248, 113, 113, 0.3)',
              padding: '8px 12px',
              borderRadius: '6px',
              fontSize: '12px',
              marginBottom: '16px',
            }}>
              {error}
            </div>
          )}

          <Button type="submit" variant="primary" size="md" isLoading={isLoading} style={{ width: '100%' }}>
            <span>Sign in</span>
            <ArrowRight size={14} />
          </Button>
        </form>

        <div className="auth-divider" style={{ margin: '20px 0' }}>or</div>

        <Button
          type="button"
          variant="secondary"
          size="md"
          style={{ width: '100%' }}
          onClick={handleDemoSignIn}
          isLoading={isLoading}
        >
          <span>⚡ Try Demo Account</span>
        </Button>

        <div className="auth-footer">
          Don't have an account?{' '}
          <Link to="/signup" className="auth-link">Create one</Link>
        </div>
      </div>
    </div>
  );
}
