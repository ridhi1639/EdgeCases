// Edge Cases — Premium Interview Questions Page
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import premiumLockImg from '../assets/premium_lock.jpg';
import {
  Lock,
  Unlock,
  Star,
  Crown,
  ChevronRight,
  Search,
  Filter,
  MessageCircle,
  Lightbulb,
  TrendingUp,
  Zap,
  Brain,
  Sparkles,
} from 'lucide-react';
import Badge from '../components/Badge';
import '../styles/premium-questions.css';

const INTERVIEW_QUESTIONS = [
  {
    id: 'iq-1',
    title: 'Two Sum',
    difficulty: 'Easy',
    topic: 'Hash Map',
    company: ['Google', 'Amazon'],
    isPremium: false,
    acceptance: '49.1%',
    hints: ['Use a hash map to store complement values', 'Single pass is possible'],
    approach: 'O(n) time with hash map lookup',
  },
  {
    id: 'iq-2',
    title: 'Merge Intervals',
    difficulty: 'Medium',
    topic: 'Sorting',
    company: ['Facebook', 'Microsoft'],
    isPremium: true,
    acceptance: '44.8%',
    hints: ['Sort by start time first', 'Check if current start <= prev end'],
    approach: 'O(n log n) sort + O(n) merge',
  },
  {
    id: 'iq-3',
    title: 'LRU Cache',
    difficulty: 'Medium',
    topic: 'Design',
    company: ['Amazon', 'Apple'],
    isPremium: true,
    acceptance: '39.2%',
    hints: ['Use a doubly linked list + hash map', 'O(1) get and put required'],
    approach: 'Doubly linked list + HashMap: O(1)',
  },
  {
    id: 'iq-4',
    title: 'Word Ladder',
    difficulty: 'Hard',
    topic: 'BFS',
    company: ['Google', 'Uber'],
    isPremium: true,
    acceptance: '35.1%',
    hints: ['Model as a graph problem', 'BFS finds shortest transformation'],
    approach: 'Bidirectional BFS: O(M²×N)',
  },
  {
    id: 'iq-5',
    title: 'Trapping Rain Water',
    difficulty: 'Hard',
    topic: 'Two Pointers',
    company: ['Amazon', 'Goldman'],
    isPremium: true,
    acceptance: '57.3%',
    hints: ['Think about water trapped at each index', 'Two pointers from both ends'],
    approach: 'Two pointers: O(n) time O(1) space',
  },
  {
    id: 'iq-6',
    title: 'Serialize & Deserialize Binary Tree',
    difficulty: 'Hard',
    topic: 'Tree',
    company: ['Facebook', 'LinkedIn'],
    isPremium: true,
    acceptance: '55.2%',
    hints: ['Use BFS level-order traversal', 'Null markers help reconstruct'],
    approach: 'BFS with queue: O(n)',
  },
  {
    id: 'iq-7',
    title: 'Course Schedule II',
    difficulty: 'Medium',
    topic: 'Graph / Topological Sort',
    company: ['Microsoft', 'Airbnb'],
    isPremium: true,
    acceptance: '47.5%',
    hints: ['Build adjacency list + in-degree array', 'Kahn\'s algorithm for topological sort'],
    approach: 'Topological sort (Kahn\'s): O(V+E)',
  },
  {
    id: 'iq-8',
    title: 'Minimum Window Substring',
    difficulty: 'Hard',
    topic: 'Sliding Window',
    company: ['Google', 'Snapchat'],
    isPremium: true,
    acceptance: '40.4%',
    hints: ['Expand right pointer, shrink left', 'Track character frequency counts'],
    approach: 'Sliding window: O(|S| + |T|)',
  },
  {
    id: 'iq-9',
    title: 'Find Median from Data Stream',
    difficulty: 'Hard',
    topic: 'Heap',
    company: ['Amazon', 'Twitter'],
    isPremium: true,
    acceptance: '50.8%',
    hints: ['Use two heaps: max-heap and min-heap', 'Balance sizes after each insertion'],
    approach: 'Two heaps: O(log n) insert, O(1) median',
  },
  {
    id: 'iq-10',
    title: 'Binary Tree Maximum Path Sum',
    difficulty: 'Hard',
    topic: 'DFS',
    company: ['Facebook', 'Google'],
    isPremium: true,
    acceptance: '38.7%',
    hints: ['Think about contribution of each node', 'DFS with global max tracker'],
    approach: 'DFS: O(n) time O(h) space',
  },
  {
    id: 'iq-11',
    title: 'Edit Distance',
    difficulty: 'Hard',
    topic: 'Dynamic Programming',
    company: ['Google', 'Nvidia'],
    isPremium: true,
    acceptance: '52.1%',
    hints: ['2D DP table: rows = s1, cols = s2', 'dp[i][j] = min edit ops for s1[:i] to s2[:j]'],
    approach: 'DP: O(m×n) time and space',
  },
  {
    id: 'iq-12',
    title: 'Sliding Window Maximum',
    difficulty: 'Hard',
    topic: 'Deque / Monotonic Queue',
    company: ['Amazon', 'Qualcomm'],
    isPremium: true,
    acceptance: '46.2%',
    hints: ['Use a monotonic decreasing deque', 'Remove out-of-window indices from front'],
    approach: 'Monotonic deque: O(n)',
  },
  {
    id: 'iq-13',
    title: 'Number of Islands',
    difficulty: 'Medium',
    topic: 'DFS / BFS',
    company: ['Amazon', 'Bloomberg'],
    isPremium: false,
    acceptance: '55.6%',
    hints: ['DFS to flood-fill each island', 'Mark visited cells as 0'],
    approach: 'DFS: O(M×N) time and space',
  },
  {
    id: 'iq-14',
    title: 'Design Twitter',
    difficulty: 'Medium',
    topic: 'Design / Heap',
    company: ['Twitter', 'Dropbox'],
    isPremium: true,
    acceptance: '37.8%',
    hints: ['Use heap for getNewsFeed top-10', 'HashMap for users/tweets'],
    approach: 'Min-heap of size k: O(N log k)',
  },
  {
    id: 'iq-15',
    title: 'Regular Expression Matching',
    difficulty: 'Hard',
    topic: 'Dynamic Programming',
    company: ['Google', 'Facebook'],
    isPremium: true,
    acceptance: '28.1%',
    hints: ['Think about * matching 0 or more of previous char', 'Recursive with memoization'],
    approach: 'DP: O(m×n) time and space',
  },
  {
    id: 'iq-16',
    title: 'Longest Consecutive Sequence',
    difficulty: 'Medium',
    topic: 'Hash Set',
    company: ['Amazon', 'Palantir'],
    isPremium: true,
    acceptance: '47.6%',
    hints: ['Use a hash set for O(1) lookup', 'Start sequence only from num-1 not in set'],
    approach: 'Hash set: O(n) time and space',
  },
  {
    id: 'iq-17',
    title: 'Alien Dictionary',
    difficulty: 'Hard',
    topic: 'Graph / Topological Sort',
    company: ['Facebook', 'Airbnb'],
    isPremium: true,
    acceptance: '33.9%',
    hints: ['Build ordering graph from adjacent words', 'Topological sort gives alphabet order'],
    approach: 'BFS topological sort: O(C) where C = total chars',
  },
  {
    id: 'iq-18',
    title: 'Kth Largest Element in an Array',
    difficulty: 'Medium',
    topic: 'Heap / Quickselect',
    company: ['Amazon', 'Apple'],
    isPremium: false,
    acceptance: '65.3%',
    hints: ['Min-heap of size k is intuitive', 'Quickselect is O(n) average'],
    approach: 'Quickselect: O(n) avg, Heap: O(n log k)',
  },
  {
    id: 'iq-19',
    title: 'Word Search II',
    difficulty: 'Hard',
    topic: 'Trie / DFS',
    company: ['Microsoft', 'Yandex'],
    isPremium: true,
    acceptance: '36.4%',
    hints: ['Build Trie from word list', 'DFS over board while traversing Trie'],
    approach: 'Trie + DFS: O(M × N × 4^L)',
  },
  {
    id: 'iq-20',
    title: 'Jump Game II',
    difficulty: 'Medium',
    topic: 'Greedy',
    company: ['Google', 'Coupang'],
    isPremium: true,
    acceptance: '39.8%',
    hints: ['Greedy: extend furthest reach at each step', 'Track current end and furthest reach'],
    approach: 'Greedy: O(n) time O(1) space',
  },
];

const DIFFICULTY_FILTERS = ['All', 'Easy', 'Medium', 'Hard'];
const TOPIC_FILTERS = ['All', 'Array', 'Dynamic Programming', 'Graph', 'Tree', 'Design', 'Heap', 'Greedy'];

export default function PremiumQuestions() {
  const navigate = useNavigate();
  const { user, updateUser } = useAuth();
  const isPremiumUser = Boolean(
    user?.isPremium || user?.membership === 'silver' || user?.membership === 'gold'
  );

  const [search, setSearch] = useState('');
  const [diffFilter, setDiffFilter] = useState('All');
  const [expandedId, setExpandedId] = useState(null);
  const [lockedClickedId, setLockedClickedId] = useState(null);

  const filtered = INTERVIEW_QUESTIONS.filter((q) => {
    const matchSearch =
      q.title.toLowerCase().includes(search.toLowerCase()) ||
      q.topic.toLowerCase().includes(search.toLowerCase());
    const matchDiff = diffFilter === 'All' || q.difficulty === diffFilter;
    return matchSearch && matchDiff;
  });

  const handleQuestionClick = (q) => {
    if (q.isPremium && !isPremiumUser) {
      setLockedClickedId(q.id === lockedClickedId ? null : q.id);
    } else {
      setExpandedId(q.id === expandedId ? null : q.id);
    }
  };

  const handleTestUnlock = (plan = 'silver') => {
    if (updateUser) {
      updateUser({ isPremium: true, membership: plan });
    }
  };

  const handleResetLock = () => {
    if (updateUser) {
      updateUser({ isPremium: false, membership: null });
    }
  };

  return (
    <div className="pq-page">
      {/* Page Header */}
      <div className="pq-header">
        <div className="pq-header-top">
          <div className="pq-header-badge" style={{ background: 'rgba(234, 179, 8, 0.15)', borderColor: 'rgba(234, 179, 8, 0.4)', color: '#FACC15' }}>
            <Star size={13} fill="#FACC15" />
            CONFIDENTIAL • TOP 1% TECH INTERVIEWS
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            {isPremiumUser ? (
              <button className="btn btn-secondary btn-sm" onClick={handleResetLock} title="Reset lock state to test animation">
                Lock Vault (Test)
              </button>
            ) : (
              <button className="btn btn-secondary btn-sm" onClick={() => handleTestUnlock('silver')} title="1-click preview of unlocked vault">
                ⚡ 1-Click Test Unlock
              </button>
            )}

            <button className="pq-unlock-btn" onClick={() => navigate('/premium')}>
              {isPremiumUser ? <Crown size={14} /> : <Lock size={14} />}
              {isPremiumUser ? 'Active Membership' : 'Unlock All Premium'}
              <ChevronRight size={14} />
            </button>
          </div>
        </div>

        <h1 className="pq-title">
          🔥 Elite FAANG Interview Vault
        </h1>
        <p className="pq-subtitle">
          20 confidential questions from Google, Meta, Amazon, Microsoft & Uber. Step-by-step AI Problem Tutor hints, space-time optimal proofs, and community discussions.
        </p>

        {/* Stats Bar */}
        <div className="pq-stats">
          <div className="pq-stat">
            <span className="pq-stat-num">{INTERVIEW_QUESTIONS.length}</span>
            <span className="pq-stat-label">Interview Questions</span>
          </div>
          <div className="pq-stat-divider" />
          <div className="pq-stat">
            <span className="pq-stat-num gold-text">{isPremiumUser ? 'UNLOCKED' : 'LOCKED'}</span>
            <span className="pq-stat-label">Vault Status</span>
          </div>
          <div className="pq-stat-divider" />
          <div className="pq-stat">
            <span className="pq-stat-num" style={{ color: '#C5F467' }}>50+ LPA</span>
            <span className="pq-stat-label">Target Tier</span>
          </div>
          <div className="pq-stat-divider" />
          <div className="pq-stat">
            <span className="pq-stat-num">FAANG+</span>
            <span className="pq-stat-label">Companies</span>
          </div>
        </div>
      </div>

      {/* When Locked: Show Big 3D Animation Lock Gate */}
      {!isPremiumUser ? (
        <div className="pq-lock-gate anim-fade-up">
          <div className="lock-3d-scene">
            <div className="lock-3d-glow-ring" />
            <div className="lock-3d-rotating-border" />
            <div className="lock-3d-card">
              <img src={premiumLockImg} alt="Confidential 3D Lock" className="lock-3d-img" />
            </div>
          </div>

          <div className="lock-gate-badge">
            <Sparkles size={12} />
            <span>CONFIDENTIAL FAANG ARCHIVE</span>
          </div>

          <h2 className="lock-gate-title">
            Elite 20 FAANG Interview Vault is Locked
          </h2>
          <p className="lock-gate-subtitle">
            Curated 20 real algorithmic challenges asked in Google, Meta, Amazon, Microsoft & Uber onsite rounds.
            Includes step-by-step AI Problem Tutor hints, space-time optimal proofs, and mock interview guidance.
          </p>

          <div className="lock-gate-plans-grid">
            <div className="lock-plan-card silver" onClick={() => navigate('/premium')} style={{ cursor: 'pointer' }}>
              <span className="lock-plan-tag" style={{ background: 'rgba(197, 244, 103, 0.15)', color: '#C5F467' }}>
                ₹200 OFF • POPULAR
              </span>
              <div className="lock-plan-title">Silver Membership</div>
              <div className="lock-plan-price">₹600<span style={{ fontSize: '13px', color: '#969DA5' }}>/mo</span></div>
              <p className="lock-plan-desc">
                Unlocks all 20 questions + AI Problem Tutor with incremental hints without revealing full code.
              </p>
            </div>

            <div className="lock-plan-card gold" onClick={() => navigate('/premium')} style={{ cursor: 'pointer' }}>
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
            onClick={() => navigate('/premium')}
          >
            <Lock size={18} />
            <span>Unlock Premium Access</span>
            <ChevronRight size={18} />
          </button>

          <div className="lock-gate-test-row">
            <span>Want to preview the questions now?</span>
            <button
              onClick={() => handleTestUnlock('silver')}
              className="btn btn-secondary btn-sm"
            >
              ⚡ 1-Click Test Unlock
            </button>
          </div>
        </div>
      ) : (
        /* When Unlocked: Show Questions & Search */
        <>
          {/* Filters */}
          <div className="pq-filters">
            <div className="pq-search-wrap">
              <Search size={15} className="pq-search-icon" />
              <input
                className="pq-search"
                placeholder="Search by title, topic or company..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <div className="pq-filter-pills">
              {DIFFICULTY_FILTERS.map((f) => (
                <button
                  key={f}
                  className={`pq-filter-pill ${diffFilter === f ? 'pq-filter-active' : ''} ${
                    f === 'Easy' ? 'pq-pill-easy' : f === 'Medium' ? 'pq-pill-medium' : f === 'Hard' ? 'pq-pill-hard' : ''
                  }`}
                  onClick={() => setDiffFilter(f)}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

      {/* Questions Table */}
      <div className="pq-table-wrapper">
        <table className="pq-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Title</th>
              <th>Topic</th>
              <th>Difficulty</th>
              <th>Companies</th>
              <th>Acceptance</th>
              <th>Access</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((q, idx) => (
              <React.Fragment key={q.id}>
                <tr
                  className={`pq-row ${q.isPremium ? 'pq-row-premium' : 'pq-row-free'} ${
                    expandedId === q.id || lockedClickedId === q.id ? 'pq-row-expanded' : ''
                  }`}
                  onClick={() => handleQuestionClick(q)}
                >
                  <td className="pq-num">{idx + 1}</td>
                  <td className="pq-title-cell">
                    <span className="pq-question-title">{q.title}</span>
                    {q.isPremium && <Lock size={12} className="pq-lock-inline" />}
                  </td>
                  <td>
                    <span className="pq-topic-tag">{q.topic}</span>
                  </td>
                  <td>
                    <Badge variant={q.difficulty}>{q.difficulty}</Badge>
                  </td>
                  <td>
                    <div className="pq-companies">
                      {q.company.slice(0, 2).map((c) => (
                        <span key={c} className="pq-company-chip">{c}</span>
                      ))}
                    </div>
                  </td>
                  <td className="pq-acceptance">{q.acceptance}</td>
                  <td>
                    {q.isPremium ? (
                      <span className="pq-premium-tag">
                        <Star size={11} /> Premium
                      </span>
                    ) : (
                      <span className="pq-free-tag">Free</span>
                    )}
                  </td>
                </tr>

                {/* Expanded Free Question Details */}
                {!q.isPremium && expandedId === q.id && (
                  <tr className="pq-detail-row">
                    <td colSpan={7}>
                      <div className="pq-detail-panel">
                        <div className="pq-detail-section">
                          <div className="pq-detail-label">
                            <Lightbulb size={14} />
                            Hints (No Solution Revealed)
                          </div>
                          <ul className="pq-hints-list">
                            {q.hints.map((h, i) => (
                              <li key={i}>
                                <span className="pq-hint-num">{i + 1}.</span> {h}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div className="pq-detail-section">
                          <div className="pq-detail-label">
                            <TrendingUp size={14} />
                            Optimized Approach
                          </div>
                          <div className="pq-approach-chip">{q.approach}</div>
                        </div>
                        <div className="pq-detail-section">
                          <div className="pq-detail-label">
                            <MessageCircle size={14} />
                            Community Discussion
                          </div>
                          <div className="pq-comments-placeholder">
                            <div className="pq-comment-mock">
                              <div className="pq-comment-avatar">AK</div>
                              <div className="pq-comment-body">
                                <div className="pq-comment-user">algo_kiran <span>2h ago</span></div>
                                <div className="pq-comment-text">Great problem! The sliding window approach is key. Don't forget to handle edge cases with empty strings.</div>
                              </div>
                            </div>
                            <div className="pq-comment-mock">
                              <div className="pq-comment-avatar" style={{ background: 'rgba(197,244,103,0.15)', color: '#C5F467' }}>SR</div>
                              <div className="pq-comment-body">
                                <div className="pq-comment-user">sudh_r <span>5h ago</span></div>
                                <div className="pq-comment-text">Watch out for the constraint: the string can have symbols and spaces too, not just letters.</div>
                              </div>
                            </div>
                            <button className="pq-add-comment-btn">
                              <MessageCircle size={13} />
                              Add comment (Sign in required)
                            </button>
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr>
                )}

                {/* Locked Premium Overlay */}
                {q.isPremium && lockedClickedId === q.id && (
                  <tr className="pq-detail-row">
                    <td colSpan={7}>
                      <div className="pq-locked-panel">
                        <Lock size={28} className="pq-locked-icon" />
                        <h3 className="pq-locked-title">Premium Content Locked</h3>
                        <p className="pq-locked-desc">
                          This question includes AI hints, optimized approach walkthroughs, and community discussions — unlocked with Silver or Gold membership.
                        </p>
                        <div className="pq-locked-actions">
                          <button
                            className="pq-unlock-silver"
                            onClick={() => navigate('/premium')}
                          >
                            <Star size={14} />
                            Unlock with Silver — ₹600/mo
                          </button>
                          <button
                            className="pq-unlock-gold"
                            onClick={() => navigate('/premium')}
                          >
                            <Crown size={14} />
                            Unlock with Gold — ₹1,000/mo
                          </button>
                        </div>
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>

      {/* Bottom CTA */}
      <div className="pq-bottom-cta">
        <div className="pq-cta-card">
          <Crown size={32} className="pq-cta-icon" />
          <div className="pq-cta-text">
            <h3>Elite 20 FAANG Questions Unlocked</h3>
            <p>Access AI Problem Tutoring, hints, and mock interviews with your active membership.</p>
          </div>
          <button className="pq-cta-btn" onClick={() => navigate('/mock-interview')}>
            Mock Interview
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
      </>
      )}
    </div>
  );
}
