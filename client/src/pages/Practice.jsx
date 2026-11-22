// Edge Cases — Practice & Problem Library Page (Free & Premium Sections)
import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  Search,
  Filter,
  CheckCircle2,
  Circle,
  Swords,
  ChevronLeft,
  ChevronRight,
  Code2,
  Lock,
  Unlock,
  Star,
  Crown,
  Sparkles,
  Zap,
  ArrowRight,
  X,
  Brain,
  MessageSquare,
} from 'lucide-react';
import Badge from '../components/Badge';
import Button from '../components/Button';
import { problemsApi } from '../services/api';
import { INTERVIEW_QUESTIONS } from '../services/mockData';
import premiumLockImg from '../assets/premium_lock.jpg';
import '../styles/practice.css';
import '../styles/premium-questions.css';

export default function Practice() {
  const { user, updateUser } = useAuth();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  // Active section tab: 'free' or 'premium'
  const activeSection = searchParams.get('tab') === 'premium' ? 'premium' : 'free';

  const [problems, setProblems] = useState([]);
  const [search, setSearch] = useState('');
  const [difficultyFilter, setDifficultyFilter] = useState('All');
  const [topicFilter, setTopicFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [loading, setLoading] = useState(true);

  // Upgrade Modal state
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [selectedPlanForModal, setSelectedPlanForModal] = useState('silver');

  // Check if current user is subscribed to Premium
  const isPremiumUser = Boolean(
    user?.isPremium || user?.membership === 'silver' || user?.membership === 'gold'
  );

  useEffect(() => {
    async function fetchProblems() {
      try {
        setLoading(true);
        const list = await problemsApi.getProblems({
          difficulty: difficultyFilter,
          topic: topicFilter,
          search,
        });
        setProblems(list);
      } catch (err) {
        console.error('Failed to load problems:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchProblems();
  }, [difficultyFilter, topicFilter, search]);

  const solvedSet = new Set(user?.solvedProblemIds || ['longest-unique-substring']);

  // Filter free problems
  const filteredFreeProblems = problems.filter((p) => {
    if (statusFilter === 'Solved') return solvedSet.has(p.id);
    if (statusFilter === 'Unsolved') return !solvedSet.has(p.id);
    return true;
  });

  // Filter premium questions
  const filteredPremiumQuestions = INTERVIEW_QUESTIONS.filter((q) => {
    if (difficultyFilter !== 'All' && q.difficulty.toLowerCase() !== difficultyFilter.toLowerCase()) {
      return false;
    }
    if (topicFilter !== 'All' && !q.topic.toLowerCase().includes(topicFilter.toLowerCase())) {
      return false;
    }
    if (search && search.trim()) {
      const s = search.toLowerCase();
      const matchTitle = q.title.toLowerCase().includes(s);
      const matchTopic = q.topic.toLowerCase().includes(s);
      const matchCompany = q.company.some((c) => c.toLowerCase().includes(s));
      if (!matchTitle && !matchTopic && !matchCompany) return false;
    }
    return true;
  });

  const handleTabChange = (tab) => {
    setSearchParams(tab === 'premium' ? { tab: 'premium' } : {});
  };

  const handleQuickUnlock = (plan = 'silver') => {
    if (updateUser) {
      updateUser({ isPremium: true, membership: plan });
    }
    setShowUpgradeModal(false);
  };

  const handleResetPremium = () => {
    if (updateUser) {
      updateUser({ isPremium: false, membership: null });
    }
  };

  return (
    <div className="practice-container">
      {/* Header */}
      <div className="practice-header">
        <div className="practice-title-group">
          <h1 className="practice-title">Problem Library</h1>
          <p className="practice-sub">
            Practice foundational algorithms with edge cases, or unlock top interview questions curated for leading tech companies.
          </p>

          {/* Dual Section Tabs */}
          <div className="practice-section-nav">
            <button
              className={`section-tab-btn ${activeSection === 'free' ? 'active-free' : ''}`}
              onClick={() => handleTabChange('free')}
            >
              <span>Free Problems</span>
              <span className="tab-badge tab-badge-free">{problems.length || 20}</span>
            </button>
            <button
              className={`section-tab-btn ${activeSection === 'premium' ? 'active-premium' : ''}`}
              onClick={() => handleTabChange('premium')}
            >
              <Crown size={14} style={{ color: '#D4AF37' }} />
              <span>🔥 Elite FAANG Vault</span>
              <span className="tab-badge tab-badge-premium">
                {isPremiumUser ? 'UNLOCKED' : '20 LOCKED'}
              </span>
            </button>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          {activeSection === 'premium' && (
            <button
              onClick={() => {
                if (isPremiumUser) handleResetPremium();
                else handleQuickUnlock('silver');
              }}
              className="btn btn-secondary btn-sm"
              title="Toggle mock membership for testing"
            >
              {isPremiumUser ? 'Reset Demo Plan' : '⚡ 1-Click Test Unlock'}
            </button>
          )}

          <Button
            variant="primary"
            size="md"
            onClick={() => navigate('/arena')}
          >
            <Swords size={14} />
            <span>Launch 1v1 Match</span>
          </Button>
        </div>
      </div>

      {/* Premium Banner when on Premium Questions Tab */}
      {activeSection === 'premium' && (
        <div className={`practice-premium-banner ${isPremiumUser ? 'is-unlocked' : ''}`}>
          <div className="premium-banner-left">
            <div className="premium-banner-icon">
              {isPremiumUser ? <Sparkles size={22} /> : <Lock size={22} />}
            </div>
            <div>
              <div className="premium-banner-title">
                {isPremiumUser
                  ? `✨ ${user?.membership ? user.membership.toUpperCase() : 'PREMIUM'} Plan Active — All 20 Interview Questions Unlocked`
                  : '🔒 Premium Interview-Level Questions (20 Handpicked Problems)'}
              </div>
              <div className="premium-banner-desc">
                {isPremiumUser
                  ? 'You have complete access to AI problem tutor hints, optimized approaches, discussion comments, and interview practice.'
                  : 'Curated from real interviews at Google, Meta, Amazon, Microsoft & Uber. Unlocked with Silver (₹600/mo) or Gold (₹1,000/mo).'}
              </div>
            </div>
          </div>

          <div className="premium-banner-actions">
            {!isPremiumUser ? (
              <>
                <button
                  className="btn-unlock-silver"
                  onClick={() => {
                    setSelectedPlanForModal('silver');
                    setShowUpgradeModal(true);
                  }}
                >
                  <Star size={13} style={{ color: '#C5F467' }} />
                  Silver — ₹600/mo
                </button>
                <button
                  className="btn-unlock-gold"
                  onClick={() => {
                    setSelectedPlanForModal('gold');
                    setShowUpgradeModal(true);
                  }}
                >
                  <Crown size={14} />
                  Unlock with Gold — ₹1,000/mo
                </button>
              </>
            ) : (
              <span className="unlocked-cell-tag">
                <CheckCircle2 size={13} />
                Full Access Enabled
              </span>
            )}
          </div>
        </div>
      )}

      {/* Filter and Search Bar */}
      <div className="practice-filter-bar">
        <div className="search-input-box">
          <div className="input-wrapper has-leading">
            <span className="input-icon-leading">
              <Search size={14} />
            </span>
            <input
              type="text"
              className="form-input"
              placeholder={
                activeSection === 'free'
                  ? 'Search free problem title or topic...'
                  : 'Search company (Google, Amazon...), topic or title...'
              }
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        <div className="filter-pills-group">
          {/* Difficulty Dropdown */}
          <select
            className="filter-select"
            value={difficultyFilter}
            onChange={(e) => setDifficultyFilter(e.target.value)}
          >
            <option value="All">All Difficulties</option>
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>

          {/* Topic Dropdown */}
          <select
            className="filter-select"
            value={topicFilter}
            onChange={(e) => setTopicFilter(e.target.value)}
          >
            <option value="All">All Topics</option>
            <option value="Two Pointers">Two Pointers</option>
            <option value="Sliding Window">Sliding Window</option>
            <option value="Binary Search">Binary Search</option>
            <option value="Dynamic Programming">Dynamic Programming</option>
            <option value="Tree">Tree</option>
            <option value="Hash Map">Hash Map</option>
            <option value="Linked List">Linked List</option>
            <option value="Graph">Graph</option>
            <option value="Heap">Heap</option>
          </select>

          {/* Status Dropdown (only relevant for free problems) */}
          {activeSection === 'free' && (
            <select
              className="filter-select"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="All">All Statuses</option>
              <option value="Solved">Solved</option>
              <option value="Unsolved">Unsolved</option>
            </select>
          )}
        </div>
      </div>

      {/* Table Section */}
      <div className="problems-table-card">
        {activeSection === 'free' ? (
          /* ── 1. Free Problems Table (20 Problems) ── */
          <table className="data-table">
            <thead>
              <tr>
                <th style={{ width: '48px', textAlign: 'center' }}>STATUS</th>
                <th>TITLE</th>
                <th>TOPIC</th>
                <th>DIFFICULTY</th>
                <th>ACCEPTANCE</th>
                <th style={{ textAlign: 'right' }}>ACTION</th>
              </tr>
            </thead>
            <tbody>
              {filteredFreeProblems.length === 0 ? (
                <tr>
                  <td colSpan="6" style={{ textAlign: 'center', padding: '32px', color: '#68707B' }}>
                    No free problems match your current search and filters.
                  </td>
                </tr>
              ) : (
                filteredFreeProblems.map((prob) => {
                  const isSolved = solvedSet.has(prob.id);
                  return (
                    <tr key={prob.id}>
                      <td style={{ textAlign: 'center' }}>
                        {isSolved ? (
                          <CheckCircle2 size={16} className="problem-solved-check" title="Solved" />
                        ) : (
                          <Circle size={14} style={{ color: '#484E55' }} title="Unsolved" />
                        )}
                      </td>
                      <td>
                        <Link
                          to={`/battle/practice_${prob.id}`}
                          state={{ problemId: prob.id }}
                          className="problem-link"
                        >
                          {prob.title}
                        </Link>
                      </td>
                      <td style={{ color: '#969DA5' }}>{prob.topic}</td>
                      <td>
                        <Badge variant={prob.difficulty}>{prob.difficulty}</Badge>
                      </td>
                      <td className="tabular-nums" style={{ color: '#969DA5' }}>
                        {prob.acceptanceRate}
                      </td>
                      <td style={{ textAlign: 'right' }}>
                        <Link
                          to={`/battle/practice_${prob.id}`}
                          state={{ problemId: prob.id }}
                          className="btn btn-secondary btn-sm"
                        >
                          <Code2 size={12} />
                          <span>Solve</span>
                        </Link>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        ) : !isPremiumUser ? (
          /* ── 2. Locked 3D Animation Gate ── */
          <div className="pq-lock-gate anim-fade-up" style={{ margin: '20px auto', maxWidth: '800px', background: 'transparent', border: 'none', boxShadow: 'none' }}>
            <div className="lock-3d-scene">
              <div className="lock-3d-glow-ring" />
              <div className="lock-3d-rotating-border" />
              <div className="lock-3d-card">
                <img src={premiumLockImg} alt="3D Lock" className="lock-3d-img" />
              </div>
            </div>

            <div className="lock-gate-badge">
              <Sparkles size={12} />
              <span>CONFIDENTIAL FAANG ARCHIVE</span>
            </div>

            <h2 className="lock-gate-title">
              🔥 Elite 20 FAANG Interview Vault is Locked
            </h2>
            <p className="lock-gate-subtitle">
              Curated 20 real algorithmic challenges asked in Google, Meta, Amazon, Microsoft & Uber onsite rounds.
              Includes step-by-step AI Problem Tutor hints, space-time optimal proofs, and mock interview guidance.
            </p>

            <div className="lock-gate-plans-grid">
              <div
                className="lock-plan-card silver"
                onClick={() => {
                  setSelectedPlanForModal('silver');
                  setShowUpgradeModal(true);
                }}
                style={{ cursor: 'pointer' }}
              >
                <span className="lock-plan-tag" style={{ background: 'rgba(197, 244, 103, 0.15)', color: '#C5F467' }}>
                  ₹200 OFF • POPULAR
                </span>
                <div className="lock-plan-title">Silver Membership</div>
                <div className="lock-plan-price">₹600<span style={{ fontSize: '13px', color: '#969DA5' }}>/mo</span></div>
                <p className="lock-plan-desc">
                  Unlocks all 20 questions + AI Problem Tutor with incremental hints without revealing full code.
                </p>
              </div>

              <div
                className="lock-plan-card gold"
                onClick={() => {
                  setSelectedPlanForModal('gold');
                  setShowUpgradeModal(true);
                }}
                style={{ cursor: 'pointer' }}
              >
                <span className="lock-plan-tag" style={{ background: 'rgba(212, 175, 55, 0.2)', color: '#FFDF73' }}>
                  ALL INCLUSIVE
                </span>
                <div className="lock-plan-title">Gold Membership</div>
                <div className="lock-plan-price" style={{ color: '#FFDF73' }}>₹1,000<span style={{ fontSize: '13px', color: '#969DA5' }}>/mo</span></div>
                <p className="lock-plan-desc">
                  Everything in Silver + 1v1 Mock Interview Simulator with real-time feedback & performance scorecard.
                </p>
              </div>
            </div>

            <button
              className="lock-gate-cta-btn"
              onClick={() => {
                setSelectedPlanForModal('silver');
                setShowUpgradeModal(true);
              }}
            >
              <Lock size={18} />
              <span>Unlock Premium Access</span>
              <ChevronRight size={18} />
            </button>
          </div>
        ) : (
          /* ── 3. Premium Questions Table (20 Questions - Unlocked) ── */
          <table className="data-table">
            <thead>
              <tr>
                <th style={{ width: '48px', textAlign: 'center' }}>ACCESS</th>
                <th>INTERVIEW QUESTION</th>
                <th>TARGET COMPANIES</th>
                <th>TOPIC</th>
                <th>DIFFICULTY</th>
                <th>ACCEPTANCE</th>
                <th style={{ textAlign: 'right' }}>ACTION</th>
              </tr>
            </thead>
            <tbody>
              {filteredPremiumQuestions.length === 0 ? (
                <tr>
                  <td colSpan="7" style={{ textAlign: 'center', padding: '32px', color: '#68707B' }}>
                    No interview questions match your current search and filters.
                  </td>
                </tr>
              ) : (
                filteredPremiumQuestions.map((q) => {
                  return (
                    <tr key={q.id}>
                      <td style={{ textAlign: 'center' }}>
                        {isPremiumUser ? (
                          <span title="Unlocked with Premium Plan" style={{ color: '#C5F467' }}>
                            <Unlock size={15} />
                          </span>
                        ) : (
                          <span title="Locked — Requires Silver or Gold" style={{ color: '#D4AF37' }}>
                            <Lock size={15} />
                          </span>
                        )}
                      </td>
                      <td>
                        {isPremiumUser ? (
                          <Link to="/premium-questions" className="problem-link">
                            {q.title}
                          </Link>
                        ) : (
                          <span
                            style={{ cursor: 'pointer', fontWeight: 600, color: 'var(--text-primary)' }}
                            onClick={() => {
                              setSelectedPlanForModal('silver');
                              setShowUpgradeModal(true);
                            }}
                          >
                            {q.title}
                          </span>
                        )}
                      </td>
                      <td>
                        {q.company.map((comp) => {
                          const lower = comp.toLowerCase();
                          const cls = lower.includes('google')
                            ? 'google'
                            : lower.includes('meta') || lower.includes('facebook')
                            ? 'meta'
                            : lower.includes('amazon')
                            ? 'amazon'
                            : lower.includes('microsoft')
                            ? 'microsoft'
                            : '';
                          return (
                            <span key={comp} className={`company-badge-pill ${cls}`}>
                              {comp}
                            </span>
                          );
                        })}
                      </td>
                      <td style={{ color: '#969DA5' }}>{q.topic}</td>
                      <td>
                        <Badge variant={q.difficulty}>{q.difficulty}</Badge>
                      </td>
                      <td className="tabular-nums" style={{ color: '#969DA5' }}>
                        {q.acceptance}
                      </td>
                      <td style={{ textAlign: 'right' }}>
                        {isPremiumUser ? (
                          <Link to="/premium-questions" className="btn btn-secondary btn-sm">
                            <Brain size={12} style={{ color: '#C5F467' }} />
                            <span>Tutor & Solution</span>
                          </Link>
                        ) : (
                          <button
                            className="btn-unlock-silver"
                            style={{ padding: '5px 10px', fontSize: '11px' }}
                            onClick={() => {
                              setSelectedPlanForModal('silver');
                              setShowUpgradeModal(true);
                            }}
                          >
                            <Lock size={11} style={{ color: '#D4AF37' }} />
                            <span>Unlock</span>
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        )}

        {/* Table Pagination */}
        <div className="table-pagination">
          <span>
            {activeSection === 'free'
              ? `Showing 1-${filteredFreeProblems.length} of ${filteredFreeProblems.length} free problems`
              : `Showing 1-${filteredPremiumQuestions.length} of ${filteredPremiumQuestions.length} interview questions`}
          </span>

          <div className="pagination-controls">
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px' }}>
              {activeSection === 'free' ? 'Free Problem Library' : 'Premium Interview Collection'}
            </span>
          </div>
        </div>
      </div>

      {/* ── Premium Upgrade Modal ── */}
      {showUpgradeModal && (
        <div className="payment-modal-overlay" onClick={() => setShowUpgradeModal(false)}>
          <div className="payment-modal" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '500px' }}>
            <button className="payment-modal-close" onClick={() => setShowUpgradeModal(false)}>
              <X size={18} />
            </button>

            <div className="payment-modal-icon">
              {selectedPlanForModal === 'gold' ? <Crown size={30} /> : <Star size={30} />}
            </div>

            <h3 className="payment-modal-title">Unlock Premium Questions</h3>
            <p className="payment-modal-desc">
              Get instant access to all 20 curated interview questions with AI problem-solving tutor, optimized approaches, and comments.
            </p>

            {/* Plan Selector Radios */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', margin: '18px 0', textAlign: 'left' }}>
              {/* Silver Card */}
              <div
                style={{
                  border: `2px solid ${selectedPlanForModal === 'silver' ? '#C5F467' : 'var(--border-main)'}`,
                  background: selectedPlanForModal === 'silver' ? 'rgba(197, 244, 103, 0.08)' : 'var(--bg-surface-elevated)',
                  borderRadius: '10px',
                  padding: '12px',
                  cursor: 'pointer',
                }}
                onClick={() => setSelectedPlanForModal('silver')}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
                  <span style={{ fontWeight: 700, fontSize: '14px', color: '#C5F467' }}>Silver Plan</span>
                  <span style={{ fontSize: '10px', background: 'rgba(197, 244, 103, 0.2)', color: '#C5F467', padding: '1px 5px', borderRadius: '4px' }}>₹200 OFF</span>
                </div>
                <div style={{ fontSize: '18px', fontWeight: 800, color: 'var(--text-primary)' }}>₹600<span style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>/mo</span></div>
                <div style={{ fontSize: '11px', color: 'var(--text-secondary)', marginTop: '4px' }}>AI Tutor & Hints for 20+ Questions</div>
              </div>

              {/* Gold Card */}
              <div
                style={{
                  border: `2px solid ${selectedPlanForModal === 'gold' ? '#D4AF37' : 'var(--border-main)'}`,
                  background: selectedPlanForModal === 'gold' ? 'rgba(212, 175, 55, 0.08)' : 'var(--bg-surface-elevated)',
                  borderRadius: '10px',
                  padding: '12px',
                  cursor: 'pointer',
                }}
                onClick={() => setSelectedPlanForModal('gold')}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
                  <span style={{ fontWeight: 700, fontSize: '14px', color: '#D4AF37' }}>Gold Plan</span>
                  <span style={{ fontSize: '10px', background: 'rgba(212, 175, 55, 0.2)', color: '#FFDF73', padding: '1px 5px', borderRadius: '4px' }}>POPULAR</span>
                </div>
                <div style={{ fontSize: '18px', fontWeight: 800, color: '#FFDF73' }}>₹1,000<span style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>/mo</span></div>
                <div style={{ fontSize: '11px', color: 'var(--text-secondary)', marginTop: '4px' }}>Includes Mock Interviews with Feedback</div>
              </div>
            </div>

            <button
              className={`payment-modal-btn ${selectedPlanForModal === 'gold' ? 'gold-btn' : 'silver-btn'}`}
              onClick={() => handleQuickUnlock(selectedPlanForModal)}
            >
              Confirm & Unlock {selectedPlanForModal === 'gold' ? 'Gold (₹1,000)' : 'Silver (₹600)'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
