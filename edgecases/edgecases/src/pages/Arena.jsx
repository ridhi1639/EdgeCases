// Edge Cases — Matchmaking Arena Lobby
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  Swords,
  Timer,
  Terminal,
  Zap,
  CheckCircle2,
  AlertCircle,
  X,
  Play,
} from 'lucide-react';
import Button from '../components/Button';
import Badge from '../components/Badge';
import { battleSocket } from '../services/socket';
import '../styles/arena.css';

export default function Arena() {
  const { user } = useAuth();
  const navigate = useNavigate();

  // Match configurations
  const [difficulty, setDifficulty] = useState('Any');
  const [language, setLanguage] = useState(user?.preferredLanguage || 'python');
  const [matchType, setMatchType] = useState('Ranked');

  // Matchmaking State
  const [isSearching, setIsSearching] = useState(false);
  const [searchSeconds, setSearchSeconds] = useState(0);
  const [statusMessage, setStatusMessage] = useState('');
  const [statusLogs, setStatusLogs] = useState([]);
  const [currentPing, setCurrentPing] = useState('24ms');

  // Match Found State
  const [matchFoundData, setMatchFoundData] = useState(null);
  const [countdown, setCountdown] = useState(4);

  // Timer effect for searching
  useEffect(() => {
    let interval = null;
    if (isSearching) {
      interval = setInterval(() => {
        setSearchSeconds((s) => s + 1);
      }, 1000);
    } else {
      setSearchSeconds(0);
    }
    return () => clearInterval(interval);
  }, [isSearching]);

  // Countdown effect when match is found
  useEffect(() => {
    let timer = null;
    if (matchFoundData && countdown > 0) {
      timer = setTimeout(() => {
        setCountdown((c) => c - 1);
      }, 1000);
    } else if (matchFoundData && countdown === 0) {
      // Transition to the live battle IDE!
      navigate(`/battle/${matchFoundData.matchId}`, {
        state: {
          opponent: matchFoundData.opponent,
          problemId: matchFoundData.problemId,
          language,
        },
      });
    }
    return () => clearTimeout(timer);
  }, [matchFoundData, countdown, navigate, language]);

  const handleStartSearch = () => {
    setIsSearching(true);
    setStatusLogs([]);
    setMatchFoundData(null);
    setCountdown(4);

    battleSocket.joinMatchmaking(
      { difficulty, language, user },
      (statusUpdate) => {
        setStatusMessage(statusUpdate.message);
        setCurrentPing(statusUpdate.ping);
        setStatusLogs((prev) => [
          ...prev,
          { time: new Date().toLocaleTimeString().slice(3, 8), msg: statusUpdate.message },
        ]);
      },
      (matchResult) => {
        setIsSearching(false);
        setMatchFoundData(matchResult);
      }
    );
  };

  const handleCancelSearch = () => {
    battleSocket.cancelMatchmaking();
    setIsSearching(false);
    setStatusMessage('');
  };

  const formatTimer = (secs) => {
    const mins = Math.floor(secs / 60);
    const rem = secs % 60;
    return `${mins.toString().padStart(2, '0')}:${rem.toString().padStart(2, '0')}`;
  };

  return (
    <div className="arena-container">
      {/* Header */}
      <div className="arena-header">
        <h1 className="arena-title">
          <Swords size={24} style={{ color: '#C5F467' }} />
          <span>1v1 Battle Arena</span>
        </h1>
        <p className="arena-subtitle">
          Queue up for a real-time coding encounter. Your rating changes based on match outcome and speed.
        </p>
      </div>

      {/* Match Found State */}
      {matchFoundData ? (
        <div className="match-found-card">
          <div className="match-found-title">Match Found!</div>
          <p style={{ fontSize: '13px', color: '#969DA5' }}>
            Allocating sandboxed runtime container...
          </p>

          <div className="match-players-vs">
            <div className="match-player-card">
              <div className="match-player-avatar">
                {user?.username?.slice(0, 2).toUpperCase() || 'YOU'}
              </div>
              <span style={{ fontWeight: 600, fontSize: '13px', color: '#ECEEEF' }}>
                @{user?.username || 'you'}
              </span>
              <span className="tabular-nums" style={{ fontSize: '11px', color: '#C5F467' }}>
                Rating: {user?.rating || 1840}
              </span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '14px', color: '#666E77' }}>
                VS
              </span>
              <div className="match-countdown tabular-nums">{countdown}s</div>
            </div>

            <div className="match-player-card">
              <div className="match-player-avatar">
                {matchFoundData.opponent.avatar}
              </div>
              <span style={{ fontWeight: 600, fontSize: '13px', color: '#ECEEEF' }}>
                @{matchFoundData.opponent.username}
              </span>
              <span className="tabular-nums" style={{ fontSize: '11px', color: '#C5F467' }}>
                Rating: {matchFoundData.opponent.rating}
              </span>
            </div>
          </div>

          <p style={{ fontSize: '11px', color: '#68707B', fontFamily: 'var(--font-mono)' }}>
            Language: {language.toUpperCase()} • Mode: {matchType} (15m Limit)
          </p>
        </div>
      ) : isSearching ? (
        /* Matchmaking Searching Box */
        <div className="arena-card">
          <div className="matchmaking-box">
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: '#969DA5' }}>
              <span className="status-dot status-dot-online" />
              <span>Searching in Queue • Ping: {currentPing}</span>
            </div>

            <div className="queue-timer tabular-nums">{formatTimer(searchSeconds)}</div>

            <div className="matchmaking-status-text">
              {statusMessage || 'Connecting to matchmaking broker...'}
            </div>

            {/* Diagnostic search logs */}
            <div className="matchmaking-logs">
              {statusLogs.map((log, i) => (
                <div key={i} className="match-log-entry">
                  <span className="match-log-time">[{log.time}]</span>
                  <span>{log.msg}</span>
                </div>
              ))}
            </div>

            <Button
              variant="secondary"
              size="md"
              onClick={handleCancelSearch}
            >
              <X size={14} />
              <span>Cancel Search</span>
            </Button>
          </div>
        </div>
      ) : (
        /* Configuration & Start Matching Panel */
        <div className="arena-card">
          {/* Difficulty Selection */}
          <div className="arena-section-title">1. Problem Difficulty</div>
          <div className="option-chips-grid">
            {['Any', 'Easy', 'Medium', 'Hard'].map((diff) => (
              <button
                key={diff}
                type="button"
                className={`option-chip ${difficulty === diff ? 'selected' : ''}`}
                onClick={() => setDifficulty(diff)}
              >
                <span className="chip-title">{diff}</span>
                <span className="chip-desc">
                  {diff === 'Any' && 'Fastest matching'}
                  {diff === 'Easy' && '1200 - 1500 Elo'}
                  {diff === 'Medium' && '1500 - 1900 Elo'}
                  {diff === 'Hard' && '1900+ Elo'}
                </span>
              </button>
            ))}
          </div>

          {/* Programming Language Selection */}
          <div className="arena-section-title">2. Preferred Language</div>
          <div className="option-chips-grid">
            {[
              { id: 'python', label: 'Python 3', sub: 'CPython 3.11' },
              { id: 'javascript', label: 'JavaScript', sub: 'Node.js 20' },
              { id: 'cpp', label: 'C++', sub: 'GCC 13 / C++20' },
              { id: 'java', label: 'Java', sub: 'OpenJDK 21' },
            ].map((lang) => (
              <button
                key={lang.id}
                type="button"
                className={`option-chip ${language === lang.id ? 'selected' : ''}`}
                onClick={() => setLanguage(lang.id)}
              >
                <span className="chip-title">{lang.label}</span>
                <span className="chip-desc">{lang.sub}</span>
              </button>
            ))}
          </div>

          {/* Match Type */}
          <div className="arena-section-title">3. Match Type</div>
          <div className="option-chips-grid">
            {[
              { id: 'Ranked', label: 'Ranked 1v1', sub: 'Standard Elo (15m)' },
              { id: 'Rapid', label: 'Rapid Duel', sub: 'Fast clock (8m)' },
              { id: 'Casual', label: 'Unranked Friendly', sub: 'Rating protected' },
            ].map((mode) => (
              <button
                key={mode.id}
                type="button"
                className={`option-chip ${matchType === mode.id ? 'selected' : ''}`}
                onClick={() => setMatchType(mode.id)}
              >
                <span className="chip-title">{mode.label}</span>
                <span className="chip-desc">{mode.sub}</span>
              </button>
            ))}
          </div>

          {/* Primary Action Button */}
          <div style={{ marginTop: '32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '20px', borderTop: '1px solid var(--border-subtle)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: '#68707B' }}>
              <Terminal size={14} />
              <span>Isolated Docker container with strict memory bounds</span>
            </div>

            <Button
              variant="primary"
              size="lg"
              onClick={handleStartSearch}
            >
              <Swords size={16} />
              <span>Find Opponent</span>
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
