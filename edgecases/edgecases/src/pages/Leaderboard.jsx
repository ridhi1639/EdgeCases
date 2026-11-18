// Edge Cases — Competitive Leaderboard Page
import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Trophy, Medal, Award, Flame, Search } from 'lucide-react';
import Badge from '../components/Badge';
import { leaderboardApi } from '../services/api';
import '../styles/leaderboard.css';

export default function Leaderboard() {
  const { user } = useAuth();
  const [timeframe, setTimeframe] = useState('all-time'); // 'all-time' | 'season' | 'weekly'
  const [players, setPlayers] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadLeaderboard() {
      try {
        setLoading(true);
        const data = await leaderboardApi.getLeaderboard(timeframe);
        setPlayers(data);
      } catch (err) {
        console.error('Failed to load leaderboard:', err);
      } finally {
        setLoading(false);
      }
    }
    loadLeaderboard();
  }, [timeframe]);

  const filteredPlayers = players.filter((p) =>
    p.username.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="leaderboard-container">
      {/* Header */}
      <div className="leaderboard-header">
        <div>
          <h1 style={{ fontSize: '22px', fontWeight: 700, color: '#ECEEEF', letterSpacing: '-0.02em', marginBottom: '4px' }}>
            Competitive Leaderboard
          </h1>
          <p style={{ fontSize: '13px', color: '#969DA5' }}>
            Official developer rankings based on 1v1 Elo rating and test-suite accuracy.
          </p>
        </div>

        {/* Time Tabs */}
        <div className="leaderboard-time-tabs">
          <button
            type="button"
            className={`time-tab-btn ${timeframe === 'all-time' ? 'active' : ''}`}
            onClick={() => setTimeframe('all-time')}
          >
            All-Time
          </button>
          <button
            type="button"
            className={`time-tab-btn ${timeframe === 'season' ? 'active' : ''}`}
            onClick={() => setTimeframe('season')}
          >
            Season 3
          </button>
          <button
            type="button"
            className={`time-tab-btn ${timeframe === 'weekly' ? 'active' : ''}`}
            onClick={() => setTimeframe('weekly')}
          >
            Weekly
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="practice-filter-bar">
        <div className="search-input-box" style={{ maxWidth: '360px' }}>
          <div className="input-wrapper has-leading">
            <span className="input-icon-leading">
              <Search size={14} />
            </span>
            <input
              type="text"
              className="form-input"
              placeholder="Search competitor by username..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: '#68707B' }}>
          <span>Current active tier: <strong>Specialist (1840 Elo)</strong></span>
        </div>
      </div>

      {/* Leaderboard Table Card */}
      <div className="leaderboard-card">
        <table className="data-table">
          <thead>
            <tr>
              <th style={{ width: '60px' }}>RANK</th>
              <th>DEVELOPER</th>
              <th>TIER</th>
              <th>ELO RATING</th>
              <th>WINS</th>
              <th>LOSSES</th>
              <th>WIN RATE</th>
            </tr>
          </thead>
          <tbody>
            {filteredPlayers.map((player) => {
              const isCurrentUser = player.username === user?.username || player.isCurrentUser;
              return (
                <tr
                  key={player.username}
                  className={`leaderboard-row ${isCurrentUser ? 'is-current-user' : ''}`}
                >
                  {/* Rank */}
                  <td>
                    {player.rank === 1 ? (
                      <span className="rank-badge-top1">#1</span>
                    ) : player.rank === 2 ? (
                      <span className="rank-badge-top2">#2</span>
                    ) : player.rank === 3 ? (
                      <span className="rank-badge-top3">#3</span>
                    ) : (
                      <span className="tabular-nums" style={{ color: '#666E77', fontWeight: 600 }}>
                        #{player.rank}
                      </span>
                    )}
                  </td>

                  {/* Developer Name and Avatar */}
                  <td>
                    <div className="player-cell">
                      <div className="player-avatar-cell">{player.avatar}</div>
                      <div>
                        <div style={{ fontWeight: 600, color: '#ECEEEF' }}>
                          @{player.username}
                          {isCurrentUser && (
                            <span
                              style={{
                                fontSize: '10px',
                                marginLeft: '6px',
                                color: '#C5F467',
                                backgroundColor: 'rgba(197, 244, 103, 0.1)',
                                padding: '1px 5px',
                                borderRadius: '3px',
                              }}
                            >
                              YOU
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* Tier */}
                  <td>
                    <span className="badge">{player.tier}</span>
                  </td>

                  {/* Rating */}
                  <td className="tabular-nums" style={{ color: '#C5F467', fontWeight: 700, fontSize: '14px' }}>
                    {player.rating}
                  </td>

                  {/* Wins */}
                  <td className="tabular-nums" style={{ color: '#86C98B' }}>
                    {player.wins}
                  </td>

                  {/* Losses */}
                  <td className="tabular-nums" style={{ color: '#F87171' }}>
                    {player.losses}
                  </td>

                  {/* Win rate */}
                  <td className="tabular-nums" style={{ fontWeight: 600 }}>
                    {player.winRate}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
