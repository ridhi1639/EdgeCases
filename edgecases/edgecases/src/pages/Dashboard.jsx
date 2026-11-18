// Edge Cases — Developer Dashboard
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  Swords,
  TrendingUp,
  Flame,
  Award,
  ArrowRight,
  Code2,
  Gift,
  X,
  Copy,
  CheckCheck,
  Ticket,
  Zap,
  Star,
} from 'lucide-react';
import Button from '../components/Button';
import Badge from '../components/Badge';
import RatingChart from '../components/RatingChart';
import { matchApi, problemsApi } from '../services/api';
import { MOCK_RATING_TIMELINE } from '../services/mockData';
import '../styles/dashboard.css';

const STREAK_REWARDS = [
  {
    id: 'r1',
    type: 'Free Trial',
    title: '7-Day Premium Free Trial',
    description: 'Full access to all premium problems, mock interviews & analytics.',
    code: 'STREAK20-PREMIUM',
    icon: Star,
    color: '#C5F467',
    bg: 'rgba(197, 244, 103, 0.08)',
    border: 'rgba(197, 244, 103, 0.2)',
  },
  {
    id: 'r2',
    type: 'Coupon',
    title: '40% Off Premium Plan',
    description: 'Discount on any monthly or annual premium subscription.',
    code: 'STREAK20-40OFF',
    icon: Ticket,
    color: '#60A5FA',
    bg: 'rgba(96, 165, 250, 0.08)',
    border: 'rgba(96, 165, 250, 0.2)',
  },
  {
    id: 'r3',
    type: 'Bonus',
    title: '+500 Bonus XP',
    description: 'Instant XP boost credited to your account.',
    code: 'AUTO-APPLIED',
    icon: Zap,
    color: '#F59E0B',
    bg: 'rgba(245, 158, 11, 0.08)',
    border: 'rgba(245, 158, 11, 0.2)',
  },
];

function StreakRewardModal({ streak, onClose }) {
  const [copiedId, setCopiedId] = useState(null);
  const copyCode = (id, code) => {
    if (code === 'AUTO-APPLIED') return;
    navigator.clipboard.writeText(code);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 1000,
      background: 'rgba(5,5,8,0.88)', backdropFilter: 'blur(8px)',
      display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px',
    }}>
      <div style={{
        background: '#0C0C12', border: '1px solid #262638', borderRadius: '16px',
        padding: '36px 32px', maxWidth: '480px', width: '100%', position: 'relative',
        boxShadow: '0 32px 64px -16px rgba(0,0,0,0.9)',
      }}>
        <button onClick={onClose} style={{
          position: 'absolute', top: '16px', right: '16px',
          background: 'rgba(255,255,255,0.06)', border: '1px solid #262638',
          borderRadius: '8px', color: '#666E77', cursor: 'pointer',
          width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}><X size={14} /></button>

        <div style={{ textAlign: 'center', marginBottom: '28px' }}>
          <div style={{
            width: '64px', height: '64px', borderRadius: '50%',
            background: 'linear-gradient(135deg,rgba(245,158,11,0.2),rgba(220,28,28,0.2))',
            border: '1px solid rgba(245,158,11,0.35)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            margin: '0 auto 16px', fontSize: '28px',
          }}>🎁</div>
          <h2 style={{ fontSize: '20px', fontWeight: 700, color: '#FFFFFF', marginBottom: '6px' }}>
            🔥 {streak}-Day Streak Unlocked!
          </h2>
          <p style={{ fontSize: '13px', color: '#9FA2B4' }}>
            You've maintained a {streak}-day streak! Claim your exclusive rewards below.
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '24px' }}>
          {STREAK_REWARDS.map((reward) => {
            const Icon = reward.icon;
            return (
              <div key={reward.id} style={{
                background: reward.bg, border: `1px solid ${reward.border}`,
                borderRadius: '10px', padding: '14px 16px',
                display: 'flex', flexDirection: 'column', gap: '6px',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Icon size={15} style={{ color: reward.color, flexShrink: 0 }} />
                  <span style={{ fontSize: '13px', fontWeight: 600, color: '#FFFFFF' }}>{reward.title}</span>
                  <span style={{
                    marginLeft: 'auto', fontSize: '10px', fontWeight: 600, color: reward.color,
                    background: reward.bg, border: `1px solid ${reward.border}`,
                    borderRadius: '4px', padding: '1px 7px', textTransform: 'uppercase', letterSpacing: '0.04em',
                  }}>{reward.type}</span>
                </div>
                <p style={{ fontSize: '11px', color: '#9FA2B4', margin: 0 }}>{reward.description}</p>
                <div style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  background: 'rgba(255,255,255,0.04)', borderRadius: '6px', padding: '6px 10px', marginTop: '4px',
                  border: '1px dashed rgba(255,255,255,0.12)',
                }}>
                  <span style={{ fontFamily: 'monospace', fontSize: '12px', color: reward.color, letterSpacing: '0.06em' }}>
                    {reward.code}
                  </span>
                  {reward.code !== 'AUTO-APPLIED' && (
                    <button onClick={() => copyCode(reward.id, reward.code)} style={{
                      background: 'none', border: 'none', cursor: 'pointer',
                      color: copiedId === reward.id ? '#10B981' : '#666E77',
                      display: 'flex', alignItems: 'center', gap: '4px', fontSize: '11px', padding: '2px 6px',
                    }}>
                      {copiedId === reward.id ? <><CheckCheck size={12} /> Copied!</> : <><Copy size={12} /> Copy</>}
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <button onClick={onClose} style={{
          width: '100%', padding: '12px',
          background: 'linear-gradient(135deg,#DC1C1C,#B81010)',
          border: 'none', borderRadius: '8px', color: '#fff',
          fontWeight: 600, fontSize: '14px', cursor: 'pointer',
        }}>
          Claim Rewards & Continue 🚀
        </button>
      </div>
    </div>
  );
}

const STREAK_THRESHOLD = 20;

export default function Dashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [recentMatches, setRecentMatches] = useState([]);
  const [recommendedProblems, setRecommendedProblems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showRewardModal, setShowRewardModal] = useState(false);
  const [rewardsClaimed, setRewardsClaimed] = useState(false);

  useEffect(() => {
    const claimed = localStorage.getItem(`streak_reward_claimed_${user?.id}`);
    if (claimed) setRewardsClaimed(true);
  }, [user?.id]);

  useEffect(() => {
    async function loadDashboardData() {
      try {
        const [matches, problems] = await Promise.all([
          matchApi.getRecentMatches(),
          problemsApi.getProblems(),
        ]);
        setRecentMatches(matches);
        setRecommendedProblems(problems.slice(0, 3));
      } catch (err) {
        console.error('Failed to load dashboard data:', err);
      } finally {
        setLoading(false);
      }
    }
    loadDashboardData();
  }, []);

  const handleClaimRewards = () => {
    setShowRewardModal(false);
    setRewardsClaimed(true);
    localStorage.setItem(`streak_reward_claimed_${user?.id}`, 'true');
  };

  if (!user) return null;

  const streak = user.streak || 0;
  const streakReady = streak >= STREAK_THRESHOLD && !rewardsClaimed;
  const streakProgress = Math.min((streak / STREAK_THRESHOLD) * 100, 100);

  return (
    <div className="dashboard-container">
      {showRewardModal && <StreakRewardModal streak={streak} onClose={handleClaimRewards} />}

      {/* Header */}
      <div className="dash-header-row">
        <div className="dash-user-welcome">
          <h1 className="dash-greeting">
            <span>Welcome, {user.username}</span>
            <span className="dash-tier-badge">{user.tier || 'Specialist'}</span>
          </h1>
          <p className="dash-subtext">
            Your rating is active. 38 wins in 50 matches (76% win rate).
          </p>
        </div>
        <div className="dash-actions">
          <Link to="/practice" className="btn btn-secondary btn-md">
            <Code2 size={15} /><span>Problem Library</span>
          </Link>
          <Button variant="primary" size="md" onClick={() => navigate('/arena')}>
            <Swords size={15} /><span>Find a Match</span>
          </Button>
        </div>
      </div>

      {/* Metrics Ribbon */}
      <div className="metrics-ribbon">
        <div className="metric-cell">
          <div className="metric-label">
            <Award size={13} style={{ color: '#C5F467' }} /><span>Elo Rating</span>
          </div>
          <div className="metric-value-row">
            <span className="metric-value tabular-nums">{user.rating}</span>
            <span className="metric-delta positive tabular-nums">{user.ratingChange || '+24'}</span>
          </div>
          <div className="metric-sub">Ranked #4 on global ladder</div>
        </div>
        <div className="metric-cell">
          <div className="metric-label">
            <Swords size={13} style={{ color: '#60A5FA' }} /><span>Battles Played</span>
          </div>
          <div className="metric-value-row">
            <span className="metric-value tabular-nums">{user.battlesCount}</span>
            <span className="metric-sub tabular-nums" style={{ marginLeft: '4px' }}>({user.wins}W / {user.losses}L)</span>
          </div>
          <div className="metric-sub">Avg duration: 08m 12s</div>
        </div>
        <div className="metric-cell">
          <div className="metric-label">
            <TrendingUp size={13} style={{ color: '#86C98B' }} /><span>Win Rate</span>
          </div>
          <div className="metric-value-row">
            <span className="metric-value tabular-nums">{user.winRate}</span>
          </div>
          <div className="metric-sub">+4.2% over last 10 matches</div>
        </div>
        <div className="metric-cell">
          <div className="metric-label">
            <Flame size={13} style={{ color: '#EAB308' }} /><span>Current Streak</span>
          </div>
          <div className="metric-value-row">
            <span className="metric-value tabular-nums">{streak} days</span>
          </div>
          <div className="metric-sub">Personal record: 8 consecutive</div>
        </div>
      </div>

      {/* Main 2-Column Content Grid */}
      <div className="dash-content-grid">
        {/* Left: Recent Matches */}
        <div className="dash-panel">
          <div className="dash-panel-header">
            <div className="dash-panel-title">
              <Swords size={16} /><span>Recent Battle History</span>
            </div>
            <Link to="/profile?tab=history" className="btn btn-ghost btn-sm">
              All matches <ArrowRight size={13} />
            </Link>
          </div>
          <div className="data-table-wrapper">
            <table className="data-table">
              <thead>
                <tr>
                  <th>RESULT</th><th>OPPONENT</th><th>PROBLEM</th><th>DURATION</th><th>RATING</th>
                </tr>
              </thead>
              <tbody>
                {recentMatches.map((m) => (
                  <tr key={m.id}>
                    <td><span className={`result-badge ${m.result}`}>{m.result.toUpperCase()}</span></td>
                    <td style={{ fontWeight: 500, color: '#ECEEEF' }}>
                      @{m.opponent}
                      <span style={{ fontSize: '11px', color: '#666E77', marginLeft: '6px' }} className="tabular-nums">{m.opponentRating}</span>
                    </td>
                    <td style={{ color: '#969DA5', maxWidth: '200px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{m.problemTitle}</td>
                    <td className="tabular-nums" style={{ color: '#666E77' }}>{m.duration}</td>
                    <td className={`tabular-nums ${m.ratingDelta.startsWith('+') ? 'metric-delta positive' : 'metric-delta negative'}`}>{m.ratingDelta}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right: Chart + Recommended */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div className="dash-panel">
            <div className="dash-panel-header">
              <div className="dash-panel-title">
                <TrendingUp size={16} style={{ color: '#C5F467' }} /><span>Rating Progression</span>
              </div>
              <span className="badge badge-accent">Season 3</span>
            </div>
            <p style={{ fontSize: '12px', color: '#969DA5', marginBottom: '8px' }}>
              Performance rating over the last 10 competitive 1v1 encounters.
            </p>
            <RatingChart data={MOCK_RATING_TIMELINE} />
          </div>

          <div className="dash-panel">
            <div className="dash-panel-header">
              <div className="dash-panel-title">
                <Code2 size={16} /><span>Recommended Problems</span>
              </div>
              <Link to="/practice" className="btn btn-ghost btn-sm">Library <ArrowRight size={13} /></Link>
            </div>
            <div className="recommended-list">
              {recommendedProblems.map((p) => (
                <Link key={p.id} to="/practice" className="problem-row-item">
                  <div className="problem-item-info">
                    <span className="problem-item-title">{p.title}</span>
                    <div className="problem-item-tags">
                      <span className="tag-label">{p.topic}</span>
                      <span style={{ color: '#484E55' }}>•</span>
                      <span className="tag-label tabular-nums">{p.acceptanceRate} pass</span>
                    </div>
                  </div>
                  <Badge variant={p.difficulty}>{p.difficulty}</Badge>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ===== 20-DAY STREAK REWARD SECTION (BOTTOM) ===== */}
      <div style={{
        marginTop: '32px',
        background: streakReady
          ? 'linear-gradient(135deg, rgba(245,158,11,0.07), rgba(220,28,28,0.05))'
          : 'rgba(12,12,18,0.5)',
        border: streakReady ? '1px solid rgba(245,158,11,0.35)' : '1px solid #1A1A26',
        borderRadius: '14px',
        padding: '24px',
      }}>
        {/* Section title */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
          <Flame size={18} style={{ color: streakReady ? '#F59E0B' : '#EAB308' }} />
          <span style={{ fontSize: '15px', fontWeight: 600, color: '#FFFFFF' }}>Streak Rewards</span>
          <span style={{
            marginLeft: 'auto',
            fontSize: '11px', fontFamily: 'monospace', color: streakReady ? '#F59E0B' : '#666E77',
            background: streakReady ? 'rgba(245,158,11,0.1)' : 'rgba(255,255,255,0.04)',
            border: streakReady ? '1px solid rgba(245,158,11,0.3)' : '1px solid #1A1A26',
            borderRadius: '4px', padding: '2px 8px',
          }}>{streak}/{STREAK_THRESHOLD} days</span>
        </div>

        {/* Progress bar */}
        <div style={{ marginBottom: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
            <span style={{ fontSize: '12px', color: '#9FA2B4' }}>
              {streakReady ? '🎉 All rewards unlocked! Click Claim below.' : `Keep going — ${STREAK_THRESHOLD - streak} more days to unlock gifts`}
            </span>
          </div>
          <div style={{ height: '8px', background: '#1A1A26', borderRadius: '99px', overflow: 'hidden', position: 'relative' }}>
            <div style={{
              height: '100%', width: `${streakProgress}%`,
              background: streakReady
                ? 'linear-gradient(90deg, #F59E0B, #DC1C1C)'
                : 'linear-gradient(90deg, #EAB308, #F59E0B)',
              borderRadius: '99px', transition: 'width 0.6s ease',
            }} />
          </div>
          {/* Day markers */}
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '6px' }}>
            {[0, 5, 10, 15, 20].map((d) => (
              <span key={d} style={{ fontSize: '10px', color: streak >= d ? '#F59E0B' : '#3C3C4C', fontFamily: 'monospace' }}>
                {d === 20 ? '🎁' : `${d}d`}
              </span>
            ))}
          </div>
        </div>

        {/* Reward cards preview */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '12px', marginBottom: '20px' }}>
          {STREAK_REWARDS.map((reward) => {
            const Icon = reward.icon;
            return (
              <div key={reward.id} style={{
                background: streakReady ? reward.bg : 'rgba(255,255,255,0.02)',
                border: `1px solid ${streakReady ? reward.border : '#1A1A26'}`,
                borderRadius: '10px', padding: '14px 12px',
                opacity: streakReady ? 1 : 0.45,
                transition: 'all 0.3s ease',
                filter: streakReady ? 'none' : 'grayscale(0.5)',
              }}>
                <Icon size={18} style={{ color: streakReady ? reward.color : '#3C3C4C', marginBottom: '8px' }} />
                <div style={{ fontSize: '12px', fontWeight: 600, color: streakReady ? '#FFFFFF' : '#666E77', marginBottom: '4px' }}>
                  {reward.title}
                </div>
                <div style={{
                  fontSize: '10px', color: streakReady ? reward.color : '#3C3C4C',
                  fontFamily: 'monospace', letterSpacing: '0.04em',
                  background: streakReady ? `${reward.bg}` : 'transparent',
                  padding: '2px 6px', borderRadius: '4px',
                  border: streakReady ? `1px solid ${reward.border}` : 'none',
                  display: 'inline-block',
                }}>
                  {reward.type}
                </div>
              </div>
            );
          })}
        </div>

        {/* Claim button */}
        {streakReady ? (
          <button
            onClick={() => setShowRewardModal(true)}
            style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
              background: 'linear-gradient(135deg, #F59E0B, #DC1C1C)',
              border: 'none', borderRadius: '10px', color: '#fff',
              fontWeight: 600, fontSize: '14px', padding: '12px 24px',
              cursor: 'pointer', width: '100%',
              boxShadow: '0 0 24px rgba(245,158,11,0.25)',
              animation: 'gift-pulse 1.5s ease infinite',
            }}
          >
            <Gift size={16} /> Claim Your 20-Day Streak Rewards 🎁
          </button>
        ) : (
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
            background: 'rgba(255,255,255,0.03)', border: '1px dashed #262638',
            borderRadius: '10px', color: '#484E55', fontSize: '13px',
            padding: '12px', cursor: 'not-allowed',
          }}>
            <Gift size={15} /> Reward unlocks at 20-day streak
          </div>
        )}
      </div>

      <style>{`
        @keyframes gift-pulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(245,158,11,0.4); }
          50% { box-shadow: 0 0 0 10px rgba(245,158,11,0); }
        }
      `}</style>
    </div>
  );
}
