// Edge Cases — User Profile & Developer Settings Page
import React, { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  User,
  Settings,
  History,
  Award,
  Swords,
  CheckCircle2,
  Code2,
  Save,
  LogOut,
  Flame,
} from 'lucide-react';
import Button from '../components/Button';
import Input from '../components/Input';
import Badge from '../components/Badge';
import RatingChart from '../components/RatingChart';
import StreakCalendar from '../components/StreakCalendar';
import { MOCK_BATTLES_HISTORY, MOCK_RATING_TIMELINE, MOCK_PROBLEMS } from '../services/mockData';
import '../styles/profile.css';

export default function Profile() {
  const { user, updateUser, logout } = useAuth();
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const activeTab = searchParams.get('tab') || 'overview'; // 'overview' | 'streak' | 'history' | 'settings'

  // Settings form states
  const [fullName, setFullName] = useState(user?.fullName || 'Kiran Patel');
  const [preferredLanguage, setPreferredLanguage] = useState(user?.preferredLanguage || 'python');
  const [fontSize, setFontSize] = useState(user?.editorPreferences?.fontSize || 14);
  const [tabSize, setTabSize] = useState(user?.editorPreferences?.tabSize || 4);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleSaveSettings = (e) => {
    e.preventDefault();
    updateUser({
      fullName,
      preferredLanguage,
      editorPreferences: {
        ...user?.editorPreferences,
        fontSize: Number(fontSize),
        tabSize: Number(tabSize),
      },
    });
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2500);
  };

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  const handleExtendStreak = (newStreak) => {
    if (updateUser) {
      updateUser({ streak: newStreak });
    }
  };

  if (!user) return null;

  return (
    <div className="profile-container">
      {/* Profile Header Card */}
      <div className="profile-card">
        <div className="profile-header-banner">
          <div className="profile-identity">
            <div className="profile-avatar-large">
              {user.username.slice(0, 2).toUpperCase()}
            </div>
            <div className="profile-name-group">
              <h1 className="profile-fullname">{user.fullName || user.username}</h1>
              <span className="profile-username-tag">@{user.username}</span>
              <div style={{ display: 'flex', gap: '8px', marginTop: '6px' }}>
                <span className="badge badge-accent">{user.tier || 'Specialist'} Tier</span>
                <span className="badge">Rating: {user.rating || 1400}</span>
                <span
                  className="badge"
                  style={{ color: '#EAB308', cursor: 'pointer', background: 'rgba(234, 179, 8, 0.1)', borderColor: 'rgba(234, 179, 8, 0.3)' }}
                  onClick={() => setSearchParams({ tab: 'streak' })}
                  title="Click to view Streak Calendar"
                >
                  <Flame size={12} fill="#EAB308" /> {user.streak || 7} Day Streak 🔥
                </span>
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '10px' }}>
            <Button
              variant="secondary"
              size="sm"
              onClick={() => setSearchParams({ tab: 'settings' })}
            >
              <Settings size={13} />
              <span>Settings</span>
            </Button>
            <Button
              variant="danger"
              size="sm"
              onClick={handleLogout}
            >
              <LogOut size={13} />
              <span>Log out</span>
            </Button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="profile-nav-tabs" style={{ marginTop: '20px' }}>
          <button
            type="button"
            className={`profile-tab-btn ${activeTab === 'overview' ? 'active' : ''}`}
            onClick={() => setSearchParams({ tab: 'overview' })}
          >
            Overview & Stats
          </button>
          <button
            type="button"
            className={`profile-tab-btn ${activeTab === 'streak' ? 'active' : ''}`}
            onClick={() => setSearchParams({ tab: 'streak' })}
            style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}
          >
            <Flame size={13} fill="#EAB308" style={{ color: '#EAB308' }} />
            <span>Daily Streak Calendar</span>
          </button>
          <button
            type="button"
            className={`profile-tab-btn ${activeTab === 'history' ? 'active' : ''}`}
            onClick={() => setSearchParams({ tab: 'history' })}
          >
            Battle History
          </button>
          <button
            type="button"
            className={`profile-tab-btn ${activeTab === 'settings' ? 'active' : ''}`}
            onClick={() => setSearchParams({ tab: 'settings' })}
          >
            Preferences & Settings
          </button>
        </div>
      </div>

      {/* Tab 1: Overview */}
      {activeTab === 'overview' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {/* Daily Streak Calendar Card */}
          <StreakCalendar user={user} onExtendStreak={handleExtendStreak} />

          {/* Rating History Chart Card */}
          <div className="profile-card">
            <div className="dash-panel-header">
              <h3 style={{ fontSize: '15px', fontWeight: 600, color: '#ECEEEF' }}>
                Elo Progression Timeline
              </h3>
              <span style={{ fontSize: '12px', color: '#68707B' }}>
                Peak Rating: {user.rating ? Math.max(user.rating, 1840) : 1840} Elo
              </span>
            </div>
            <RatingChart data={MOCK_RATING_TIMELINE} />
          </div>

          {/* Solved Problems List */}
          <div className="profile-card">
            <div className="dash-panel-header">
              <h3 style={{ fontSize: '15px', fontWeight: 600, color: '#ECEEEF' }}>
                Solved Edge Case Problems ({user.solvedProblemIds?.length || 3})
              </h3>
            </div>
            <div className="recommended-list">
              {MOCK_PROBLEMS.filter((p) =>
                (user.solvedProblemIds || ['longest-unique-substring', 'two-sum-sorted', 'valid-parentheses']).includes(p.id)
              ).map((prob) => (
                <div key={prob.id} className="problem-row-item">
                  <div className="problem-item-info">
                    <span className="problem-item-title">{prob.title}</span>
                    <span className="tag-label">{prob.topic}</span>
                  </div>
                  <Badge variant={prob.difficulty}>{prob.difficulty}</Badge>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Daily Streak Calendar Dedicated View */}
      {activeTab === 'streak' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <StreakCalendar user={user} onExtendStreak={handleExtendStreak} />
        </div>
      )}

      {/* Tab 2: Battle History */}
      {activeTab === 'history' && (
        <div className="profile-card" style={{ padding: 0 }}>
          <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--border-subtle)' }}>
            <h3 style={{ fontSize: '15px', fontWeight: 600, color: '#ECEEEF' }}>
              Full 1v1 Battle History
            </h3>
          </div>
          <table className="data-table">
            <thead>
              <tr>
                <th>RESULT</th>
                <th>OPPONENT</th>
                <th>PROBLEM</th>
                <th>TIME</th>
                <th>RATING CHANGE</th>
                <th>DATE</th>
              </tr>
            </thead>
            <tbody>
              {MOCK_BATTLES_HISTORY.map((match) => (
                <tr key={match.id}>
                  <td>
                    <span className={`result-badge ${match.result}`}>
                      {match.result.toUpperCase()}
                    </span>
                  </td>
                  <td style={{ fontWeight: 600, color: '#ECEEEF' }}>
                    @{match.opponent}
                    <span className="tabular-nums" style={{ fontSize: '11px', color: '#68707B', marginLeft: '6px' }}>
                      ({match.opponentRating})
                    </span>
                  </td>
                  <td>{match.problemTitle}</td>
                  <td className="tabular-nums" style={{ color: '#68707B' }}>
                    {match.duration}
                  </td>
                  <td
                    className={`tabular-nums ${
                      match.ratingDelta.startsWith('+') ? 'metric-delta positive' : 'metric-delta negative'
                    }`}
                  >
                    {match.ratingDelta}
                  </td>
                  <td style={{ color: '#68707B', fontSize: '12px' }}>{match.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Tab 3: Settings */}
      {activeTab === 'settings' && (
        <div className="profile-card">
          <form onSubmit={handleSaveSettings}>
            <div className="settings-grid">
              {/* Profile Details */}
              <div>
                <h3 style={{ fontSize: '14px', fontWeight: 600, color: '#ECEEEF', marginBottom: '16px' }}>
                  Developer Profile
                </h3>

                <Input
                  label="Full Name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                />

                <Input
                  label="Username"
                  value={user.username}
                  disabled
                  helper="Contact support to request username modifications."
                />

                <Input
                  label="Email Address"
                  value={user.email}
                  disabled
                  helper="Verified developer email."
                />
              </div>

              {/* Editor Preferences */}
              <div>
                <h3 style={{ fontSize: '14px', fontWeight: 600, color: '#ECEEEF', marginBottom: '16px' }}>
                  IDE & Battle Preferences
                </h3>

                <div className="form-group">
                  <label className="form-label">Preferred Programming Language</label>
                  <select
                    className="form-select"
                    value={preferredLanguage}
                    onChange={(e) => setPreferredLanguage(e.target.value)}
                  >
                    <option value="python">Python 3 (CPython 3.11)</option>
                    <option value="javascript">JavaScript (Node.js 20)</option>
                    <option value="cpp">C++ (C++20 GCC 13)</option>
                    <option value="java">Java (OpenJDK 21)</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Editor Font Size</label>
                  <select
                    className="form-select"
                    value={fontSize}
                    onChange={(e) => setFontSize(e.target.value)}
                  >
                    <option value={12}>12 px — Compact</option>
                    <option value={14}>14 px — Standard</option>
                    <option value={16}>16 px — Large</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Tab Indentation Width</label>
                  <select
                    className="form-select"
                    value={tabSize}
                    onChange={(e) => setTabSize(e.target.value)}
                  >
                    <option value={2}>2 Spaces</option>
                    <option value={4}>4 Spaces</option>
                  </select>
                </div>
              </div>
            </div>

            <div style={{ marginTop: '24px', paddingTop: '16px', borderTop: '1px solid var(--border-subtle)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              {saveSuccess ? (
                <span style={{ fontSize: '12px', color: '#86C98B', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <CheckCircle2 size={14} /> Preferences updated successfully.
                </span>
              ) : (
                <span />
              )}

              <Button type="submit" variant="primary" size="md">
                <Save size={14} />
                <span>Save Preferences</span>
              </Button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
