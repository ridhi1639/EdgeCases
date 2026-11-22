// Edge Cases — Persistent Developer Sidebar Component
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  LayoutDashboard,
  Swords,
  Code2,
  Trophy,
  History,
  User,
  Settings,
  ChevronLeft,
  ChevronRight,
  Flame,
  Star,
  Crown,
} from 'lucide-react';
import '../styles/sidebar.css';

export default function Sidebar() {
  const { user } = useAuth();
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <aside className={`sidebar ${isCollapsed ? 'is-collapsed' : ''}`}>
      {/* Platform Navigation */}
      <div className="sidebar-section">
        <div className="sidebar-title">Competitive</div>
        <ul className="sidebar-menu">
          <li>
            <NavLink
              to="/dashboard"
              end
              className={({ isActive }) => `sidebar-item ${isActive ? 'active' : ''}`}
            >
              <LayoutDashboard className="sidebar-icon" />
              <span>Overview</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/arena"
              className={({ isActive }) => `sidebar-item ${isActive ? 'active' : ''}`}
            >
              <Swords className="sidebar-icon" />
              <span>Battle Arena</span>
              <span className="sidebar-badge" style={{ color: '#C5F467' }}>
                LIVE
              </span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/practice"
              className={({ isActive }) => `sidebar-item ${isActive ? 'active' : ''}`}
            >
              <Code2 className="sidebar-icon" />
              <span>Problems</span>
              <span className="sidebar-badge">4</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/leaderboard"
              className={({ isActive }) => `sidebar-item ${isActive ? 'active' : ''}`}
            >
              <Trophy className="sidebar-icon" />
              <span>Leaderboard</span>
            </NavLink>
          </li>
        </ul>
      </div>

      {/* Premium Section */}
      <div className="sidebar-section">
        <div className="sidebar-title" style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
          <Star size={10} style={{ color: '#D4AF37' }} />
          Premium
        </div>
        <ul className="sidebar-menu">
          <li>
            <NavLink
              to="/premium-questions"
              className={({ isActive }) => `sidebar-item ${isActive ? 'active' : ''}`}
            >
              <Star className="sidebar-icon" style={{ color: '#D4AF37' }} />
              <span>Interview Questions</span>
              <span className="sidebar-badge" style={{ color: '#D4AF37', borderColor: 'rgba(212,175,55,0.3)', background: 'rgba(212,175,55,0.08)' }}>20</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/mock-interview"
              className={({ isActive }) => `sidebar-item ${isActive ? 'active' : ''}`}
            >
              <Crown className="sidebar-icon" style={{ color: '#D4AF37' }} />
              <span>Mock Interview</span>
              <span className="sidebar-badge" style={{ color: '#D4AF37', borderColor: 'rgba(212,175,55,0.3)', background: 'rgba(212,175,55,0.08)' }}>Gold</span>
            </NavLink>
          </li>
        </ul>
      </div>

      {/* Account & Profile Navigation */}
      <div className="sidebar-section">
        <div className="sidebar-title">Developer</div>
        <ul className="sidebar-menu">
          <li>
            <NavLink
              to="/profile"
              end
              className={({ isActive }) => `sidebar-item ${isActive ? 'active' : ''}`}
            >
              <User className="sidebar-icon" />
              <span>Profile</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/profile?tab=history"
              className={({ isActive }) => `sidebar-item ${isActive ? 'active' : ''}`}
            >
              <History className="sidebar-icon" />
              <span>Battle History</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/profile?tab=settings"
              className={({ isActive }) => `sidebar-item ${isActive ? 'active' : ''}`}
            >
              <Settings className="sidebar-icon" />
              <span>Settings</span>
            </NavLink>
          </li>
        </ul>
      </div>

      {/* Collapse Action */}
      <div style={{ padding: '8px 12px' }}>
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="btn btn-ghost btn-sm"
          style={{ width: '100%', justifyContent: isCollapsed ? 'center' : 'flex-start' }}
          title={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {isCollapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
          {!isCollapsed && <span style={{ fontSize: '11px' }}>Collapse View</span>}
        </button>
      </div>

      {/* Footer Profile Box */}
      {user && (
        <div className="sidebar-footer">
          <div className="sidebar-user">
            <div className="sidebar-user-avatar">
              {user.username.slice(0, 2).toUpperCase()}
            </div>
            {!isCollapsed && (
              <div className="sidebar-user-details">
                <span className="sidebar-username">{user.username}</span>
                <span className="sidebar-usertag tabular-nums">
                  Rating: {user.rating} ({user.ratingChange})
                </span>
              </div>
            )}
          </div>
          {!isCollapsed && (
            <NavLink
              to="/profile?tab=streak"
              title="Daily Streak Calendar"
              style={{ display: 'flex', alignItems: 'center', gap: '2px', color: '#EAB308', fontSize: '11px', fontFamily: 'var(--font-mono)', textDecoration: 'none' }}
            >
              <Flame size={13} fill="#EAB308" />
              <span>{user.streak || 7}</span>
            </NavLink>
          )}
        </div>
      )}
    </aside>
  );
}
