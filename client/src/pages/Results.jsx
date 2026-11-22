// Edge Cases — Battle Results Screen
import React from 'react';
import { useParams, useLocation, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  Trophy,
  Swords,
  LayoutDashboard,
  CheckCircle2,
  Clock,
  Coins,
  ArrowRight,
  Code2,
} from 'lucide-react';
import Button from '../components/Button';
import '../styles/results.css';

export default function Results() {
  const { matchId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();

  const matchState = location.state || {
    outcome: 'victory',
    userRating: 1840,
    opponentRating: 1825,
    ratingDelta: 24,
    duration: '06:14',
    problemTitle: 'Longest Substring Without Repeating Characters',
    passedTests: 6,
    totalTests: 6,
    coinsEarned: 25,
  };

  const isVictory = matchState.outcome === 'victory';
  const isDefeat = matchState.outcome === 'defeat';
  const isDraw = matchState.outcome === 'draw';

  return (
    <div className="results-container">
      <div className="results-card">
        {/* Outcome Header Banner */}
        <div className="results-banner">
          <div
            className={`outcome-title ${
              isVictory ? 'victory' : isDefeat ? 'defeat' : 'draw'
            }`}
          >
            {isVictory ? 'Victory' : isDefeat ? 'Defeat' : 'Draw'}
          </div>
          <p className="outcome-sub">
            {isVictory
              ? 'All edge cases passed ahead of your opponent.'
              : isDefeat
              ? 'Match conceded or opponent submitted first.'
              : 'Match concluded within time boundaries.'}
          </p>
        </div>

        {/* Head-to-Head Comparison */}
        <div className="results-players-grid">
          {/* Player (You) */}
          <div className="result-player-box">
            <div className="result-avatar">
              {user?.username?.slice(0, 2).toUpperCase() || 'YOU'}
            </div>
            <div className="result-username">@{user?.username || 'you'}</div>
            <div className="result-rating-row">
              <span className="result-current-rating tabular-nums">
                {matchState.userRating + (matchState.ratingDelta || 0)}
              </span>
              <span
                className={`result-rating-delta tabular-nums ${
                  matchState.ratingDelta >= 0 ? 'positive' : 'negative'
                }`}
              >
                {matchState.ratingDelta >= 0 ? `+${matchState.ratingDelta}` : matchState.ratingDelta}
              </span>
            </div>
          </div>

          {/* VS Divider */}
          <div className="result-vs-divider">VS</div>

          {/* Opponent */}
          <div className="result-player-box">
            <div className="result-avatar">AR</div>
            <div className="result-username">@algo_rythm</div>
            <div className="result-rating-row">
              <span className="result-current-rating tabular-nums">
                {matchState.opponentRating - (matchState.ratingDelta > 0 ? 16 : -16)}
              </span>
              <span
                className={`result-rating-delta tabular-nums ${
                  matchState.ratingDelta > 0 ? 'negative' : 'positive'
                }`}
              >
                {matchState.ratingDelta > 0 ? '-16' : '+18'}
              </span>
            </div>
          </div>
        </div>

        {/* Statistics Breakdown */}
        <div className="results-stats-list">
          <div className="stat-row-item">
            <span className="stat-row-label">Problem Solved</span>
            <span className="stat-row-val">{matchState.problemTitle}</span>
          </div>

          <div className="stat-row-item">
            <span className="stat-row-label">Test Cases Passed</span>
            <span className="stat-row-val tabular-nums">
              {matchState.passedTests || 6} / {matchState.totalTests || 6} (100% Edge Coverage)
            </span>
          </div>

          <div className="stat-row-item">
            <span className="stat-row-label">Battle Duration</span>
            <span className="stat-row-val tabular-nums">
              {matchState.duration || '06:14'}
            </span>
          </div>

          <div className="stat-row-item">
            <span className="stat-row-label">Virtual Coins Earned</span>
            <span className="stat-row-val tabular-nums" style={{ color: '#EAB308' }}>
              +{matchState.coinsEarned || 25} Coins
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div style={{ padding: '20px 24px', backgroundColor: 'var(--bg-surface-subtle)', borderTop: '1px solid var(--border-subtle)' }}>
          <div className="results-actions">
            <Button
              variant="secondary"
              size="md"
              onClick={() => navigate('/dashboard')}
            >
              <LayoutDashboard size={14} />
              <span>Return to Dashboard</span>
            </Button>

            <Button
              variant="primary"
              size="md"
              onClick={() => navigate('/arena')}
            >
              <Swords size={14} />
              <span>Rematch / New Battle</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
