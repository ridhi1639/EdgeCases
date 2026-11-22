// Edge Cases — Editorial Developer Landing Page
import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  Swords,
  Code2,
  Clock,
  CheckCircle2,
  Trophy,
  ArrowRight,
  Terminal,
  ShieldAlert,
  Zap,
  Lock,
  Star,
  Crown,
  ChevronRight,
  Brain,
  MessageSquare,
  Video,
} from 'lucide-react';
import Badge from '../components/Badge';
import { MOCK_PROBLEMS, MOCK_LEADERBOARD } from '../services/mockData';
import heroImg from '../assets/hero.png';
import '../styles/home.css';
import '../styles/buttons.css';

const PREVIEW_QUESTIONS = [
  { title: 'Two Sum', difficulty: 'Easy', topic: 'Hash Map', company: 'Google', isPremium: false },
  { title: 'LRU Cache', difficulty: 'Medium', topic: 'Design', company: 'Amazon', isPremium: true },
  { title: 'Word Ladder', difficulty: 'Hard', topic: 'BFS', company: 'Meta', isPremium: true },
  { title: 'Merge Intervals', difficulty: 'Medium', topic: 'Sorting', company: 'Microsoft', isPremium: true },
  { title: 'Trapping Rain Water', difficulty: 'Hard', topic: 'Two Pointers', company: 'Goldman', isPremium: true },
];

export default function Home() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const sampleLeaderboard = MOCK_LEADERBOARD.slice(0, 5);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('anim-visible');
          }
        });
      },
      { threshold: 0.12 }
    );
    document.querySelectorAll('.anim-fade-up, .anim-slide-left, .anim-slide-right, .anim-scale-in').forEach((el) => {
      observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <div className="landing-page">
      {/* ── 1. Hero Section ── */}
      <section className="hero-section subtle-grid anim-hero-section">
        <div className="container">
          <div className="home-hero-content">
            {/* Live Tagline */}
            <div className="hero-tagline-wrapper" style={{ marginBottom: '20px' }}>
              <span className="live-pulse" />
              <span>REAL-TIME 1V1 COMPETITIVE CODING</span>
            </div>

            {/* Hero Image */}
            <div className="home-hero-image-wrap anim-scale-in">
              <img src={heroImg} alt="EdgeCases Platform" className="home-hero-img" />
              <div className="home-hero-img-glow" />
            </div>

            {/* Headline */}
            <h1 className="hero-headline home-hero-headline">
              Your code.{' '}
              <span>Their clock.</span>
            </h1>
            <p className="hero-description home-hero-desc">
              One problem. One opponent. No room for careless solutions.
              Match against peer engineers in real-time, handle strict algorithmic logic, and pass boundary edge cases under timed pressure.
            </p>

            {/* Primary CTAs */}
            <div className="home-hero-cta">
              <Link
                to="/signup"
                className="btn btn-primary btn-lg home-cta-get-started"
              >
                <Swords size={18} />
                Get Started
              </Link>
              <Link to="/login" className="btn btn-secondary btn-lg">
                Login
                <ArrowRight size={16} />
              </Link>
            </div>

            {/* Meta Pills */}
            <div className="hero-meta home-hero-meta">
              <div className="hero-meta-item">
                <Terminal size={14} style={{ color: '#C5F467' }} />
                <span>Python, JS, C++, Java</span>
              </div>
              <div className="hero-meta-item">
                <ShieldAlert size={14} style={{ color: '#C5F467' }} />
                <span>Strict Edge Case Judging</span>
              </div>
              <div className="hero-meta-item">
                <Zap size={14} style={{ color: '#C5F467' }} />
                <span>Elo Rating System</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. Interview Questions Spotlight ── */}
      <section className="home-premium-section anim-fade-up">
        <div className="container">
          <div className="home-premium-inner">
            {/* Left: Text */}
            <div className="home-premium-text anim-slide-left">
              <div className="home-premium-badge" style={{ background: 'rgba(234, 179, 8, 0.15)', borderColor: 'rgba(234, 179, 8, 0.4)', color: '#FACC15' }}>
                <Star size={13} fill="#FACC15" />
                CONFIDENTIAL • TOP 1% TECH INTERVIEWS
              </div>
              <h2 className="home-premium-title">
                Crack 50+ LPA Roles with<br />
                <span className="home-premium-title-accent" style={{ background: 'linear-gradient(135deg, #FDE047 0%, #EAB308 50%, #CA8A04 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                  🔥 Elite FAANG Interview Vault
                </span>
              </h2>
              <p className="home-premium-desc">
                The exact 20 confidential algorithmic challenges asked in Google, Meta, Amazon, Microsoft & Uber onsite rounds. Level up with an interactive AI Problem Tutor, step-by-step hints, and 1v1 Mock Interviews with real-time feedback.
              </p>
              <div className="home-premium-features">
                <div className="home-pf-item">
                  <Brain size={14} style={{ color: '#C5F467' }} />
                  <span>AI Problem Tutor with Silver Plan</span>
                </div>
                <div className="home-pf-item">
                  <Video size={14} style={{ color: '#EAB308' }} />
                  <span>1v1 Mock Interviews with Gold Plan</span>
                </div>
                <div className="home-pf-item">
                  <MessageSquare size={14} style={{ color: '#8AB4F8' }} />
                  <span>Optimal Space-Time Approaches & Discussions</span>
                </div>
              </div>
              <div className="home-premium-actions">
                <Link to="/premium-questions" className="btn btn-primary btn-md" style={{ background: 'linear-gradient(135deg, #FACC15 0%, #CA8A04 100%)', color: '#0A0A0E', fontWeight: 700, border: 'none' }}>
                  <Lock size={15} />
                  Unlock Secret FAANG Vault
                </Link>
                <Link to="/premium" className="btn btn-ghost btn-md">
                  View Plans (from ₹600)
                  <ChevronRight size={14} />
                </Link>
              </div>
            </div>

            {/* Right: Questions Preview Card */}
            <div className="home-premium-card anim-slide-right">
              <div className="home-premium-card-header">
                <span className="home-pcard-label">Interview Questions Preview</span>
                <span className="home-pcard-count">20 questions</span>
              </div>
              <div className="home-premium-questions-list">
                {PREVIEW_QUESTIONS.map((q, i) => (
                  <div
                    key={i}
                    className={`home-pq-item ${q.isPremium ? 'home-pq-locked' : ''}`}
                    onClick={() => navigate(q.isPremium ? '/premium' : '/premium-questions')}
                  >
                    <div className="home-pq-info">
                      <span className="home-pq-num">{i + 1}.</span>
                      <span className="home-pq-title">{q.title}</span>
                      {q.isPremium && <Lock size={11} className="home-pq-lock" />}
                    </div>
                    <div className="home-pq-meta">
                      <Badge variant={q.difficulty}>{q.difficulty}</Badge>
                      <span className="home-pq-company">{q.company}</span>
                    </div>
                  </div>
                ))}
                <Link to="/premium-questions" className="home-pq-view-all">
                  View all 20 questions <ArrowRight size={13} />
                </Link>
              </div>

              {/* Plan Preview */}
              <div className="home-plan-preview">
                <div className="home-plan-chip silver-chip">
                  <Star size={12} />
                  Silver — ₹600/mo
                </div>
                <div className="home-plan-chip gold-chip">
                  <Crown size={12} />
                  Gold — ₹1,000/mo
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 3. The Competitive Loop ── */}
      <section className="loop-section">
        <div className="container">
          <div className="section-header">
            <div className="section-label">THE 1V1 MECHANISM</div>
            <h2 className="section-title">The Competitive Loop</h2>
          </div>

          <div className="loop-grid anim-fade-up">
            <div className="loop-step anim-stagger-1">
              <div className="loop-step-num tabular-nums">01 / QUEUE</div>
              <h3 className="loop-step-title">Find an Opponent</h3>
              <p className="loop-step-desc">
                Enter the matchmaking arena with your preferred rating bracket and language. Get matched with a live peer within seconds.
              </p>
            </div>
            <div className="loop-step anim-stagger-2">
              <div className="loop-step-num tabular-nums">02 / COMPETE</div>
              <h3 className="loop-step-title">Solve the Same Problem</h3>
              <p className="loop-step-desc">
                Both competitors receive the identical problem statement, time limit, and sandbox memory constraints in Monaco IDE.
              </p>
            </div>
            <div className="loop-step anim-stagger-3">
              <div className="loop-step-num tabular-nums">03 / JUDGE</div>
              <h3 className="loop-step-title">Pass the Tests</h3>
              <p className="loop-step-desc">
                Run standard test suites and submit against hidden edge cases: null values, overflow boundaries, and adversarial inputs.
              </p>
            </div>
            <div className="loop-step anim-stagger-4">
              <div className="loop-step-num tabular-nums">04 / WIN</div>
              <h3 className="loop-step-title">Win the Battle</h3>
              <p className="loop-step-desc">
                Submit the correct, efficient solution first. Secure Elo rating points, climb the tiers, and review side-by-side code diffs.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 4. Problem Library & Leaderboard ── */}
      <section className="showcase-section">
        <div className="container">
          <div className="showcase-grid">
            {/* Problems Showcase */}
            <div className="showcase-panel anim-slide-left anim-fade-up">
              <div className="showcase-panel-header">
                <div>
                  <h3 style={{ fontSize: '15px', fontWeight: 600, color: '#ECEEEF' }}>
                    Curated Problem Library
                  </h3>
                  <span style={{ fontSize: '12px', color: '#666E77' }}>
                    Engineered with rigorous boundary and edge tests
                  </span>
                </div>
                <Link to="/practice" className="btn btn-ghost btn-sm">
                  View all <ArrowRight size={13} />
                </Link>
              </div>

              <table className="showcase-table">
                <thead>
                  <tr>
                    <th>TITLE</th>
                    <th>TOPIC</th>
                    <th>DIFFICULTY</th>
                    <th>ACCEPTANCE</th>
                  </tr>
                </thead>
                <tbody>
                  {MOCK_PROBLEMS.slice(0, 3).map((prob) => (
                    <tr key={prob.id}>
                      <td style={{ fontWeight: 500, color: '#ECEEEF' }}>
                        <Link to={`/practice`}>{prob.title}</Link>
                      </td>
                      <td>{prob.topic}</td>
                      <td>
                        <Badge variant={prob.difficulty}>{prob.difficulty}</Badge>
                      </td>
                      <td className="tabular-nums">{prob.acceptanceRate}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Leaderboard Showcase */}
            <div className="showcase-panel anim-slide-right anim-fade-up">
              <div className="showcase-panel-header">
                <div>
                  <h3 style={{ fontSize: '15px', fontWeight: 600, color: '#ECEEEF' }}>
                    Top Competitors
                  </h3>
                  <span style={{ fontSize: '12px', color: '#666E77' }}>
                    Live season leaderboard rankings
                  </span>
                </div>
                <Link to="/leaderboard" className="btn btn-ghost btn-sm">
                  Full table <ArrowRight size={13} />
                </Link>
              </div>

              <table className="showcase-table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>DEVELOPER</th>
                    <th>RATING</th>
                    <th>WIN RATE</th>
                  </tr>
                </thead>
                <tbody>
                  {sampleLeaderboard.map((player) => (
                    <tr key={player.username}>
                      <td className={`rank-num ${player.rank <= 3 ? 'rank-top' : ''}`}>
                        {player.rank}
                      </td>
                      <td style={{ fontWeight: 600, color: '#ECEEEF' }}>
                        @{player.username}
                      </td>
                      <td className="tabular-nums" style={{ color: '#C5F467', fontWeight: 600 }}>
                        {player.rating}
                      </td>
                      <td className="tabular-nums">{player.winRate}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
