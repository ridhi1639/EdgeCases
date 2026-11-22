// Edge Cases — About Page: Platform Manifesto, Architecture & Engineering Team
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Terminal,
  Swords,
  ShieldAlert,
  Cpu,
  Zap,
  Flame,
  Award,
  Layers,
  Code2,
  Users,
  Compass,
  ArrowRight,
  CheckCircle2,
  Lock,
  GitBranch,
  Sparkles,
  ExternalLink,
  Clock,
  Send,
  Trophy,
} from 'lucide-react';
import { GithubIcon, TwitterIcon } from '../components/SocialIcons';
import SpotlightCard from '../components/SpotlightCard';
import InteractiveAvatar from '../components/InteractiveAvatar';
import '../styles/about.css';

export default function About() {
  const [activeTab, setActiveTab] = useState('manifesto'); // 'manifesto' | 'architecture' | 'team' | 'anti-cheat'

  const teamMembers = [
    {
      name: 'Kaelen Vance',
      username: '0xkael',
      role: 'Co-Founder & Sandbox Architect',
      rating: 2540,
      avatarId: 'avatar_neon_hacker',
      bio: 'Ex-Kernel engineer & competitive Codeforces Grandmaster. Designed the isolated microVM runner and sub-50ms execution sandbox.',
      skills: ['Linux cgroups', 'Rust', 'eBPF', 'Compilers'],
      github: 'https://github.com',
      twitter: 'https://twitter.com',
    },
    {
      name: 'Seraphina Chen',
      username: 'seraph',
      role: 'Co-Founder & Head of Anti-Cheat',
      rating: 2490,
      avatarId: 'avatar_cyber_ninja',
      bio: 'Cryptographer & systems security researcher. Built the AST fingerprinting engine to eradicate plagiarism and bot assistance in real-time.',
      skills: ['AST Analysis', 'Cryptography', 'Zero-Trust', 'WebSockets'],
      github: 'https://github.com',
      twitter: 'https://twitter.com',
    },
    {
      name: 'Devon Ray',
      username: 'd_ray',
      role: 'Lead Telemetry & Distributed Systems',
      rating: 2410,
      avatarId: 'avatar_matrix_phantom',
      bio: 'High-throughput networking specialist. Engineered the distributed multi-region WebSocket mesh connecting duelists worldwide.',
      skills: ['Distributed Systems', 'Go', 'WebSockets', 'Telemetry'],
      github: 'https://github.com',
      twitter: 'https://twitter.com',
    },
    {
      name: 'Mira Thorne',
      username: 'mira_t',
      role: 'Director of Problem Engineering & Fuzzing',
      rating: 2470,
      avatarId: 'avatar_glitch_protocol',
      bio: 'Adversarial test suite curator and ICPC World Finalist. Specializes in finding the edge cases that crash textbook O(n) solutions.',
      skills: ['Fuzz Testing', 'Graph Theory', 'Boundary Analysis', 'Python'],
      github: 'https://github.com',
      twitter: 'https://twitter.com',
    },
  ];

  const architecturePipeline = [
    {
      step: '01',
      title: 'Interactive Code Editor',
      icon: <Terminal size={18} />,
      badge: 'Editor',
      desc: 'Write, edit, and organize your solutions in a clean coding environment with syntax highlighting.',
    },
    {
      step: '02',
      title: 'Submission & Feedback System',
      icon: <Send size={18} />,
      badge: 'Submission',
      desc: 'Submit your solution for evaluation and receive feedback on its output and correctness.',
    },
    {
      step: '03',
      title: 'Code Execution Environment',
      icon: <Cpu size={18} />,
      badge: 'Environment',
      desc: 'Check your logic against available test cases to discover mistakes and improve your approach.',
    },
    {
      step: '04',
      title: 'Test Case Evaluation',
      icon: <ShieldAlert size={18} />,
      badge: 'Evaluation',
      desc: 'Use failed test cases and execution feedback to identify bugs and refine your solution.',
    },
    {
      step: '05',
      title: 'Results & Performance Tracking',
      icon: <Award size={18} />,
      badge: 'Progress',
      desc: 'Review your submission results and use each attempt as an opportunity to become a better problem solver.',
    },
  ];

  const kpis = [
    { label: 'Battles Fought', value: '1,420,000+', change: '+18% this month' },
    { label: 'Sandbox Execution Latency', value: '< 42ms', change: 'p99 global' },
    { label: 'Hidden Edge Cases Curated', value: '8,500+', change: 'boundary verified' },
    { label: 'Active Competitive Coders', value: '54,000+', change: 'in 82 countries' },
  ];

  return (
    <div className="about-page">
      {/* 1. Hero Section */}
      <section className="about-hero">
        <div className="container">
          <div className="about-hero-grid">
            <div className="about-hero-content">
              <div className="about-tagline-wrapper">
                <span className="live-pulse" />
                <span>ABOUT OUR PLATFORM</span>
              </div>

              <h1 className="about-headline">
                CODE. LEARN. LEVEL UP.
              </h1>

              <p className="about-lead-text" style={{ fontSize: '18px', color: 'var(--text-secondary)', marginBottom: '16px', fontWeight: 500 }}>
                Your journey to becoming a better programmer starts here.
              </p>

              <p className="about-description">
                Welcome to <strong>CodeArena</strong> — a platform built for curious minds who love solving problems and pushing their coding skills further. Whether you're a beginner learning the basics or an experienced coder sharpening your logic, there's always a new challenge waiting for you.
              </p>

              <p className="about-subdescription" style={{ marginBottom: '20px' }}>
                Practice coding problems, improve your problem-solving skills, explore different programming concepts, and track your progress — all in one place.
              </p>

              <p className="about-tagline-punch" style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '28px' }}>
                Think smarter. Write better code. Become a stronger coder.
              </p>

              <div className="about-cta-group">
                <Link to="/practice" className="btn btn-primary btn-md">
                  <span>Start Coding</span>
                  <ArrowRight size={15} />
                </Link>
                <Link to="/arena" className="btn btn-secondary btn-md">
                  <span>Explore Challenges</span>
                </Link>
              </div>
            </div>

            {/* Hero Visual — Live Battle Preview Terminal */}
            <div className="about-hero-visual anim-float">
              <div className="battle-preview-card">
                {/* Preview Topbar */}
                <div className="preview-topbar">
                  <div className="preview-players">
                    <span className="preview-player">
                      <span className="status-dot status-dot-online" />
                      <span>dev_kiran</span>
                      <span style={{ color: '#666E77' }}>1840</span>
                    </span>
                    <span className="preview-vs">vs</span>
                    <span className="preview-player opponent">
                      <span className="status-dot status-dot-online" />
                      <span>algo_rythm</span>
                      <span style={{ color: '#666E77' }}>1825</span>
                    </span>
                  </div>
                  <div className="preview-timer tabular-nums">
                    <Clock size={12} />
                    <span>14:28</span>
                  </div>
                </div>

                {/* Preview Body */}
                <div className="preview-body">
                  {/* Left: Problem snapshot */}
                  <div className="preview-problem">
                    <div className="preview-problem-title">
                      <span>Longest Substring</span>
                      <span className="badge badge-medium">Medium</span>
                    </div>
                    <p className="preview-problem-desc">
                      Find length of longest substring without repeating characters. Must handle empty strings and unique streams.
                    </p>
                    <div className="preview-code-block">
                      Input: s = "abcabcbb"
                      <br />
                      Output: 3 (Explanation: "abc")
                    </div>
                  </div>

                  {/* Right: Syntax-highlighted code editor */}
                  <div className="preview-editor">
                    <div style={{ color: '#68707B', marginBottom: '8px' }}>
                      # 1v1 Battle Runner — Python 3
                    </div>
                    <div>
                      <span className="code-keyword">def</span>{' '}
                      <span className="code-fn">lengthOfLongestSubstring</span>(s: str) -&gt; int:
                    </div>
                    <div style={{ paddingLeft: '16px' }}>
                      char_idx = &#123;&#125;
                    </div>
                    <div style={{ paddingLeft: '16px' }}>
                      max_len = left = <span className="code-num">0</span>
                    </div>
                    <div style={{ paddingLeft: '16px' }}>
                      <span className="code-keyword">for</span> right, ch{' '}
                      <span className="code-keyword">in</span> enumerate(s):
                    </div>
                    <div style={{ paddingLeft: '32px' }}>
                      <span className="code-keyword">if</span> ch{' '}
                      <span className="code-keyword">in</span> char_idx{' '}
                      <span className="code-keyword">and</span> char_idx[ch] &gt;= left:
                    </div>
                    <div style={{ paddingLeft: '48px' }}>
                      left = char_idx[ch] + <span className="code-num">1</span>
                    </div>
                    <div style={{ paddingLeft: '32px' }}>
                      char_idx[ch] = right
                    </div>
                    <div style={{ paddingLeft: '32px' }}>
                      max_len = max(max_len, right - left + <span className="code-num">1</span>)
                    </div>
                    <div style={{ paddingLeft: '16px' }}>
                      <span className="code-keyword">return</span> max_len
                    </div>
                    <div style={{ marginTop: '12px', display: 'flex', gap: '6px' }}>
                      <span className="badge badge-easy">Passed 3/3 Public</span>
                      <span className="badge badge-accent">Running 3 Hidden...</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Platform KPIs */}
          <div className="about-kpi-grid">
            {kpis.map((kpi, idx) => (
              <SpotlightCard key={idx} className="about-kpi-card">
                <span className="about-kpi-val tabular-nums">{kpi.value}</span>
                <span className="about-kpi-label">{kpi.label}</span>
                <span className="about-kpi-change">{kpi.change}</span>
              </SpotlightCard>
            ))}
          </div>
        </div>
      </section>

      {/* 2. Four Pillars of Smarter Coding */}
      <section className="about-pillars-section" id="manifesto">
        <div className="container">
          <div className="section-header text-center">
            <div className="section-label">SECTION HEADING</div>
            <h2 className="section-title">Four Pillars of Smarter Coding</h2>
            <p className="section-subtitle">
              Go beyond passing test cases. Build stronger logic, solve problems under pressure, and learn from every challenge.
            </p>
          </div>

          <div className="about-pillars-grid">
            <SpotlightCard className="about-pillar-card">
              <div className="pillar-icon-box" style={{ color: 'var(--accent)' }}>
                <ShieldAlert size={24} />
              </div>
              <h3 className="pillar-title">1. Edge-Case Mastery</h3>
              <p className="pillar-text">
                Test your solutions against tricky inputs, empty arrays, duplicate values, boundary conditions, and unexpected scenarios. Learn to write code that works beyond the obvious examples.
              </p>
              <div className="pillar-tag">THINK BEYOND EXAMPLES</div>
            </SpotlightCard>

            <SpotlightCard className="about-pillar-card">
              <div className="pillar-icon-box" style={{ color: 'var(--color-acid)' }}>
                <Zap size={24} />
              </div>
              <h3 className="pillar-title">2. Real-Time Coding Battles</h3>
              <p className="pillar-text">
                Challenge yourself in timed coding rounds, race against the clock, and compare your progress with other participants. Put your problem-solving skills to the test.
              </p>
              <div className="pillar-tag">CODE UNDER PRESSURE</div>
            </SpotlightCard>

            <SpotlightCard className="about-pillar-card">
              <div className="pillar-icon-box" style={{ color: 'var(--color-violet)' }}>
                <Trophy size={24} />
              </div>
              <h3 className="pillar-title">3. Skill-Based Rankings</h3>
              <p className="pillar-text">
                Track your performance, earn recognition through coding challenges, and see how your problem-solving skills improve over time.
              </p>
              <div className="pillar-tag">PROGRESS THAT COUNTS</div>
            </SpotlightCard>

            <SpotlightCard className="about-pillar-card">
              <div className="pillar-icon-box" style={{ color: 'var(--color-coral)' }}>
                <Code2 size={24} />
              </div>
              <h3 className="pillar-title">4. Smart Code Evaluation</h3>
              <p className="pillar-text">
                Evaluate solutions against test cases, identify incorrect outputs, and understand where your logic breaks. Focus on correctness, efficiency, and cleaner code.
              </p>
              <div className="pillar-tag">WRITE. TEST. IMPROVE.</div>
            </SpotlightCard>
          </div>
        </div>
      </section>

      {/* 3. Under the Hood: How edgecases Works */}
      <section className="about-arch-section" id="architecture">
        <div className="container">
          <div className="section-header">
            <div className="section-label">SECTION LABEL</div>
            <h2 className="section-title">Under the Hood: How edgecases Works</h2>
            <p className="section-subtitle">
              From writing your first line of code to submitting your solution, every step is designed to make coding practice more engaging and effective.
            </p>
          </div>

          <div className="arch-pipeline-container">
            {architecturePipeline.map((item, index) => (
              <div key={item.step} className="arch-step-card">
                <div className="arch-step-top">
                  <span className="arch-step-num tabular-nums">{item.step}</span>
                  <span className="arch-step-badge">{item.badge}</span>
                </div>
                <div className="arch-step-icon">{item.icon}</div>
                <h4 className="arch-step-title">{item.title}</h4>
                <p className="arch-step-desc">{item.desc}</p>
                {index < architecturePipeline.length - 1 && (
                  <div className="arch-step-connector" aria-hidden="true" />
                )}
              </div>
            ))}
          </div>

          {/* Reliable & Responsible Code Execution Box */}
          <div className="arch-security-banner" id="security">
            <div className="security-banner-icon">
              <ShieldAlert size={28} />
            </div>
            <div className="security-banner-content">
              <h4>Reliable &amp; Responsible Code Execution</h4>
              <p>
                Code evaluation should be designed with appropriate execution limits, input validation, and isolation wherever code runs on a server.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. The Engineering Team */}
      <section className="about-team-section" id="team">
        <div className="container">
          <div className="section-header text-center">
            <div className="section-label">THE CREATORS</div>
            <h2 className="section-title">Core Engineering Group</h2>
            <p className="section-subtitle">
              Engineers, ICPC medalists, and systems researchers building the future of algorithmic combat.
            </p>
          </div>

          <div className="about-team-grid">
            {teamMembers.map((member) => (
              <SpotlightCard key={member.username} className="about-team-card">
                <div className="team-card-header">
                  <div className="team-avatar-wrapper">
                    <InteractiveAvatar
                      username={member.username}
                      avatarId={member.avatarId}
                      size="lg"
                    />
                  </div>
                  <div className="team-header-info">
                    <h3 className="team-member-name">{member.name}</h3>
                    <span className="team-member-handle">@{member.username}</span>
                    <div className="team-rating-badge">
                      <Flame size={12} style={{ color: 'var(--color-acid)' }} />
                      <span>Elo: {member.rating}</span>
                    </div>
                  </div>
                </div>

                <div className="team-role-tag">{member.role}</div>

                <p className="team-bio">{member.bio}</p>

                <div className="team-skills-list">
                  {member.skills.map((skill) => (
                    <span key={skill} className="team-skill-pill">
                      {skill}
                    </span>
                  ))}
                </div>

                <div className="team-socials">
                  <a
                    href={member.github}
                    target="_blank"
                    rel="noreferrer"
                    className="team-social-icon"
                    aria-label={`${member.name} GitHub`}
                  >
                    <GithubIcon size={14} />
                  </a>
                  <a
                    href={member.twitter}
                    target="_blank"
                    rel="noreferrer"
                    className="team-social-icon"
                    aria-label={`${member.name} Twitter`}
                  >
                    <TwitterIcon size={14} />
                  </a>
                </div>
              </SpotlightCard>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Origin Story Timeline */}
      <section className="about-story-section">
        <div className="container">
          <div className="section-header">
            <div className="section-label">ORIGIN & EVOLUTION</div>
            <h2 className="section-title">The Path to edgecases</h2>
          </div>

          <div className="story-timeline">
            <div className="timeline-item">
              <div className="timeline-date tabular-nums">Q1 2024</div>
              <div className="timeline-dot" />
              <div className="timeline-content">
                <h4>The Dorm Room Outage</h4>
                <p>
                  During an ICPC qualifier practice, our team's textbook solution crashed in production
                  due to an unhandled 32-bit integer negation overflow (<code>-2147483648</code>). We realized
                  how broken typical problem-solving practice was: nobody teaches the edge cases.
                </p>
              </div>
            </div>

            <div className="timeline-item">
              <div className="timeline-date tabular-nums">Q3 2024</div>
              <div className="timeline-dot" />
              <div className="timeline-content">
                <h4>The Adversarial Fuzzing Engine</h4>
                <p>
                  We built our first automated edge-case generator: injecting zero-length slices, extreme Unicode,
                  and pathological worst-case time complexity inputs into classic algorithms.
                </p>
              </div>
            </div>

            <div className="timeline-item">
              <div className="timeline-date tabular-nums">Q1 2025</div>
              <div className="timeline-dot" />
              <div className="timeline-content">
                <h4>1v1 WebSockets & The Competitive Arena</h4>
                <p>
                  Launched the head-to-head live duel arena with Monaco IDE integration, live opponent keystroke
                  pings, and chess-grade Elo matchmaking.
                </p>
              </div>
            </div>

            <div className="timeline-item">
              <div className="timeline-date tabular-nums">TODAY</div>
              <div className="timeline-dot active" />
              <div className="timeline-content">
                <h4>Global Esport for Developers</h4>
                <p>
                  Over 50,000 developers across 80+ countries compete daily, training their intuition for
                  software resilience and climbing the global leaderboard.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Call to Action Banner */}
      <section className="about-cta-section">
        <div className="container">
          <SpotlightCard className="about-cta-banner">
            <div className="cta-banner-content">
              <div className="about-tagline-wrapper">
                <Sparkles size={13} />
                <span>READY TO TEST YOUR LIMITS?</span>
              </div>
              <h2 className="cta-banner-title">Stop coding for easy tests. Battle the edges.</h2>
              <p className="cta-banner-desc">
                Step into the arena, compete against live developers in your skill bracket,
                and see if your code can survive our adversarial test oracle.
              </p>
              <div className="cta-buttons">
                <Link to="/arena" className="btn btn-primary btn-lg">
                  <Swords size={16} />
                  <span>Queue for 1v1 Battle</span>
                </Link>
                <Link to="/signup" className="btn btn-secondary btn-lg">
                  <span>Create Free Account</span>
                </Link>
              </div>
            </div>
          </SpotlightCard>
        </div>
      </section>
    </div>
  );
}
