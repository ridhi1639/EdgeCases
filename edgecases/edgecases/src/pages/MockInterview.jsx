// Edge Cases — Mock Interview / Demo Interview Page (Gold Feature)
import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import {
  Video,
  Crown,
  Mic,
  MicOff,
  Camera,
  CameraOff,
  Send,
  Brain,
  Star,
  Clock,
  ChevronRight,
  CheckCircle,
  AlertCircle,
  Lightbulb,
  BarChart2,
  MessageCircle,
  Code2,
} from 'lucide-react';
import '../styles/mock-interview.css';

const INTERVIEW_QUESTIONS = [
  {
    id: 1,
    question: 'Implement an LRU Cache with O(1) get and put operations.',
    difficulty: 'Medium',
    category: 'Design',
    expectedTime: '25 min',
  },
  {
    id: 2,
    question: 'Given a binary tree, find the maximum path sum.',
    difficulty: 'Hard',
    category: 'DFS',
    expectedTime: '30 min',
  },
  {
    id: 3,
    question: 'Find the shortest path in a weighted graph using Dijkstra\'s algorithm.',
    difficulty: 'Hard',
    category: 'Graph',
    expectedTime: '35 min',
  },
];

const FEEDBACK_CRITERIA = [
  { id: 'problem-understanding', label: 'Problem Understanding', weight: 20 },
  { id: 'approach-clarity', label: 'Approach & Communication', weight: 25 },
  { id: 'code-quality', label: 'Code Quality', weight: 25 },
  { id: 'edge-cases', label: 'Edge Case Handling', weight: 15 },
  { id: 'time-complexity', label: 'Time/Space Analysis', weight: 15 },
];

const MOCK_SESSION_MESSAGES = [
  { role: 'interviewer', text: 'Welcome! I\'m your AI interviewer. Let\'s start with a warm-up. Can you walk me through how you approach a new coding problem?' },
  { role: 'candidate', text: 'Sure! I first read the problem carefully, identify the input/output, think of brute force, then optimize.' },
  { role: 'interviewer', text: 'Great approach! Now let\'s dive into our first technical question. Please read it carefully before we begin.' },
];

export default function MockInterview() {
  const navigate = useNavigate();
  const { user } = useAuth();

  // Gold-only gate — Silver and free users see lock screen
  const isGold = user?.membership === 'gold' || user?.tier === 'Gold';
  if (!isGold) {
    return (
      <div style={{
        minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '40px 20px',
      }}>
        <div style={{
          background: 'linear-gradient(135deg, rgba(24,24,36,0.95), rgba(12,12,18,0.95))',
          border: '1px solid rgba(255,179,64,0.3)',
          borderRadius: '20px', padding: '48px 40px',
          maxWidth: '480px', width: '100%', textAlign: 'center',
          boxShadow: '0 32px 64px -16px rgba(0,0,0,0.8), 0 0 60px rgba(255,179,64,0.06)',
        }}>
          {/* Gold crown icon */}
          <div style={{
            width: '72px', height: '72px', borderRadius: '50%',
            background: 'linear-gradient(135deg, rgba(255,179,64,0.15), rgba(255,140,0,0.1))',
            border: '1.5px solid rgba(255,179,64,0.4)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            margin: '0 auto 20px', fontSize: '32px',
          }}>👑</div>

          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '6px',
            background: 'rgba(255,179,64,0.1)', border: '1px solid rgba(255,179,64,0.3)',
            borderRadius: '99px', padding: '4px 12px', marginBottom: '16px',
          }}>
            <Crown size={12} style={{ color: '#FFB340' }} />
            <span style={{ fontSize: '11px', fontWeight: 600, color: '#FFB340', letterSpacing: '0.06em' }}>GOLD EXCLUSIVE</span>
          </div>

          <h2 style={{ fontSize: '22px', fontWeight: 700, color: '#FFFFFF', marginBottom: '10px' }}>
            Mock Interview Simulator
          </h2>
          <p style={{ fontSize: '13px', color: '#9FA2B4', lineHeight: 1.6, marginBottom: '28px' }}>
            AI-powered mock interviews with live feedback, performance scoring, and personalized
            improvement reports are exclusively available on the <strong style={{ color: '#FFB340' }}>Gold Plan</strong>.
            Silver members do not have access to this feature.
          </p>

          {/* Feature preview list */}
          <div style={{ textAlign: 'left', marginBottom: '28px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {[
              'Live AI interviewer with real-time responses',
              'Performance scoring across 5 criteria',
              'Personalized improvement report after each session',
              'Unlimited mock interview sessions',
              'Expert-level approach walkthroughs',
            ].map((f, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{
                  width: '20px', height: '20px', borderRadius: '50%', flexShrink: 0,
                  background: 'rgba(255,179,64,0.15)', border: '1px solid rgba(255,179,64,0.3)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <Star size={10} style={{ color: '#FFB340' }} />
                </div>
                <span style={{ fontSize: '13px', color: '#C8CAD0' }}>{f}</span>
              </div>
            ))}
          </div>

          <button
            onClick={() => navigate('/premium')}
            style={{
              width: '100%', padding: '13px',
              background: 'linear-gradient(135deg, #FFB340, #FF8C00)',
              border: 'none', borderRadius: '10px', color: '#0C0C12',
              fontWeight: 700, fontSize: '14px', cursor: 'pointer',
              marginBottom: '12px', letterSpacing: '0.01em',
            }}
          >
            👑 Upgrade to Gold — Unlock Mock Interviews
          </button>
          <button
            onClick={() => navigate('/dashboard')}
            style={{
              background: 'none', border: 'none', color: '#666E77',
              fontSize: '12px', cursor: 'pointer', padding: '4px',
            }}
          >
            ← Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  const [phase, setPhase] = useState('intro'); // intro | setup | interview | feedback
  const [selectedQ, setSelectedQ] = useState(0);
  const [micOn, setMicOn] = useState(true);
  const [camOn, setCamOn] = useState(false);
  const [messages, setMessages] = useState(MOCK_SESSION_MESSAGES);
  const [userInput, setUserInput] = useState('');
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [scores, setScores] = useState({});
  const [showFeedback, setShowFeedback] = useState(false);
  const chatEndRef = useRef(null);
  const timerRef = useRef(null);

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  useEffect(() => {
    if (phase === 'interview') {
      timerRef.current = setInterval(() => {
        setTimeElapsed((t) => t + 1);
      }, 1000);
    }
    return () => clearInterval(timerRef.current);
  }, [phase]);

  const formatTime = (secs) => {
    const m = Math.floor(secs / 60).toString().padStart(2, '0');
    const s = (secs % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  const handleSendMessage = () => {
    if (!userInput.trim()) return;
    const newMsg = { role: 'candidate', text: userInput.trim() };
    setMessages((prev) => [...prev, newMsg]);
    setUserInput('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const responses = [
        'That\'s an interesting approach! Can you analyze the time complexity of your solution?',
        'Good. Now, how would you handle the edge case where the input is empty or has only one element?',
        'Can you write out the code for the core logic you just described?',
        'Excellent! What\'s the space complexity here, and can we do better?',
        'Let\'s talk about scalability — how does this perform with 10 million elements?',
      ];
      const reply = responses[Math.floor(Math.random() * responses.length)];
      setMessages((prev) => [...prev, { role: 'interviewer', text: reply }]);
      setIsTyping(false);
    }, 1800);
  };

  const generateFeedback = () => {
    const generated = {};
    FEEDBACK_CRITERIA.forEach((c) => {
      generated[c.id] = Math.floor(Math.random() * 25) + 65; // 65-90 range
    });
    setScores(generated);
    setPhase('feedback');
    clearInterval(timerRef.current);
  };

  const overallScore = Object.keys(scores).length
    ? Math.round(
        FEEDBACK_CRITERIA.reduce((acc, c) => acc + (scores[c.id] * c.weight) / 100, 0)
      )
    : 0;

  return (
    <div className="mi-page">
      {/* Intro Phase */}
      {phase === 'intro' && (
        <div className="mi-intro">
          <div className="mi-orb mi-orb-1" />
          <div className="mi-orb mi-orb-2" />

          <div className="mi-intro-icon">
            <Crown size={40} />
          </div>
          <div className="mi-intro-badge">GOLD FEATURE</div>
          <h1 className="mi-intro-title">Mock Interview Simulator</h1>
          <p className="mi-intro-desc">
            Practice with an AI interviewer that mimics real tech company interviews.
            Get detailed feedback on your communication, code quality, and problem-solving approach.
          </p>

          <div className="mi-intro-features">
            {[
              { icon: Brain, title: 'AI Interviewer', desc: 'Real-time conversational interview experience' },
              { icon: BarChart2, title: 'Detailed Feedback', desc: '5-criteria performance report after session' },
              { icon: Code2, title: 'Technical + Behavioral', desc: 'Covers both coding and soft skills' },
              { icon: Clock, title: 'Timed Sessions', desc: 'Track time per question like a real interview' },
            ].map((f) => (
              <div key={f.title} className="mi-intro-feature">
                <div className="mi-feature-icon">
                  <f.icon size={20} />
                </div>
                <div>
                  <div className="mi-feature-title">{f.title}</div>
                  <div className="mi-feature-desc">{f.desc}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="mi-intro-actions">
            <button className="mi-start-btn" onClick={() => setPhase('setup')}>
              Start Mock Interview
              <ChevronRight size={18} />
            </button>
            <button className="mi-back-link" onClick={() => navigate('/premium-questions')}>
              Back to Questions
            </button>
          </div>
        </div>
      )}

      {/* Setup Phase */}
      {phase === 'setup' && (
        <div className="mi-setup">
          <h2 className="mi-setup-title">Interview Setup</h2>
          <p className="mi-setup-subtitle">Choose your question and configure your session.</p>

          <div className="mi-setup-grid">
            {/* Question Selection */}
            <div className="mi-setup-section">
              <h3 className="mi-section-title">
                <Code2 size={16} />
                Select a Question
              </h3>
              <div className="mi-question-options">
                {INTERVIEW_QUESTIONS.map((q, i) => (
                  <div
                    key={q.id}
                    className={`mi-question-option ${selectedQ === i ? 'mi-option-active' : ''}`}
                    onClick={() => setSelectedQ(i)}
                  >
                    <div className="mi-option-header">
                      <span className="mi-option-num">Q{i + 1}</span>
                      <span className={`mi-option-diff mi-diff-${q.difficulty.toLowerCase()}`}>
                        {q.difficulty}
                      </span>
                      <span className="mi-option-time">
                        <Clock size={11} />
                        {q.expectedTime}
                      </span>
                    </div>
                    <div className="mi-option-text">{q.question}</div>
                    <div className="mi-option-cat">{q.category}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Controls */}
            <div className="mi-setup-section">
              <h3 className="mi-section-title">
                <Video size={16} />
                Session Controls
              </h3>
              <div className="mi-controls">
                <div className="mi-control-item">
                  <div className="mi-control-icon">
                    {micOn ? <Mic size={18} /> : <MicOff size={18} />}
                  </div>
                  <div className="mi-control-info">
                    <div className="mi-control-label">Microphone</div>
                    <div className="mi-control-sub">Voice recording (coming soon)</div>
                  </div>
                  <button
                    className={`mi-toggle ${micOn ? 'mi-toggle-on' : ''}`}
                    onClick={() => setMicOn(!micOn)}
                  />
                </div>
                <div className="mi-control-item">
                  <div className="mi-control-icon">
                    {camOn ? <Camera size={18} /> : <CameraOff size={18} />}
                  </div>
                  <div className="mi-control-info">
                    <div className="mi-control-label">Camera</div>
                    <div className="mi-control-sub">Video feed (coming soon)</div>
                  </div>
                  <button
                    className={`mi-toggle ${camOn ? 'mi-toggle-on' : ''}`}
                    onClick={() => setCamOn(!camOn)}
                  />
                </div>
              </div>

              <div className="mi-tips">
                <div className="mi-tips-title">
                  <Lightbulb size={14} />
                  Interview Tips
                </div>
                <ul className="mi-tips-list">
                  <li>Think aloud — explain your reasoning as you code</li>
                  <li>Ask clarifying questions before diving in</li>
                  <li>State complexity analysis after your solution</li>
                  <li>Discuss tradeoffs and alternatives</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="mi-setup-actions">
            <button className="mi-back-btn" onClick={() => setPhase('intro')}>
              ← Back
            </button>
            <button className="mi-start-btn" onClick={() => setPhase('interview')}>
              Begin Interview
              <Video size={16} />
            </button>
          </div>
        </div>
      )}

      {/* Interview Phase */}
      {phase === 'interview' && (
        <div className="mi-interview">
          {/* Top Bar */}
          <div className="mi-interview-topbar">
            <div className="mi-topbar-left">
              <div className="mi-live-badge">
                <span className="mi-live-dot" />
                LIVE SESSION
              </div>
              <div className="mi-question-chip">
                {INTERVIEW_QUESTIONS[selectedQ].category} — {INTERVIEW_QUESTIONS[selectedQ].difficulty}
              </div>
            </div>
            <div className="mi-topbar-timer">
              <Clock size={14} />
              {formatTime(timeElapsed)}
            </div>
            <div className="mi-topbar-right">
              <button className="mi-end-btn" onClick={generateFeedback}>
                End & Get Feedback
              </button>
            </div>
          </div>

          <div className="mi-interview-body">
            {/* Question Panel */}
            <div className="mi-question-panel">
              <div className="mi-question-label">Your Question</div>
              <div className="mi-question-text">
                {INTERVIEW_QUESTIONS[selectedQ].question}
              </div>
              <div className="mi-question-hints">
                <div className="mi-hints-title">
                  <Lightbulb size={13} />
                  Think About
                </div>
                <ul>
                  <li>What data structures would help here?</li>
                  <li>What's the brute force approach?</li>
                  <li>Can you optimize it further?</li>
                  <li>What are the edge cases?</li>
                </ul>
              </div>
            </div>

            {/* Chat Panel */}
            <div className="mi-chat-panel">
              <div className="mi-chat-header">
                <div className="mi-interviewer-avatar">
                  <Brain size={16} />
                </div>
                <div>
                  <div className="mi-interviewer-name">AI Interviewer</div>
                  <div className="mi-interviewer-sub">Online · Powered by EdgeCases AI</div>
                </div>
              </div>

              <div className="mi-chat-messages">
                {messages.map((msg, i) => (
                  <div
                    key={i}
                    className={`mi-msg ${msg.role === 'interviewer' ? 'mi-msg-interviewer' : 'mi-msg-candidate'}`}
                  >
                    {msg.role === 'interviewer' && (
                      <div className="mi-msg-avatar interviewer-avatar-sm">
                        <Brain size={12} />
                      </div>
                    )}
                    <div className={`mi-msg-bubble ${msg.role === 'interviewer' ? 'interviewer-bubble' : 'candidate-bubble'}`}>
                      {msg.text}
                    </div>
                  </div>
                ))}
                {isTyping && (
                  <div className="mi-msg mi-msg-interviewer">
                    <div className="mi-msg-avatar interviewer-avatar-sm">
                      <Brain size={12} />
                    </div>
                    <div className="mi-msg-bubble interviewer-bubble mi-typing">
                      <span />
                      <span />
                      <span />
                    </div>
                  </div>
                )}
                <div ref={chatEndRef} />
              </div>

              <div className="mi-chat-input-wrap">
                <input
                  className="mi-chat-input"
                  placeholder="Type your response or explanation..."
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && handleSendMessage()}
                />
                <button
                  className="mi-send-btn"
                  onClick={handleSendMessage}
                  disabled={!userInput.trim()}
                >
                  <Send size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Feedback Phase */}
      {phase === 'feedback' && (
        <div className="mi-feedback">
          <div className="mi-feedback-header">
            <div className="mi-feedback-icon">
              <BarChart2 size={32} />
            </div>
            <h2 className="mi-feedback-title">Interview Feedback Report</h2>
            <p className="mi-feedback-subtitle">
              Session duration: {formatTime(timeElapsed)} · Question: {INTERVIEW_QUESTIONS[selectedQ].category}
            </p>
          </div>

          {/* Overall Score */}
          <div className="mi-overall-score">
            <div className={`mi-score-circle ${overallScore >= 80 ? 'score-excellent' : overallScore >= 70 ? 'score-good' : 'score-needs-work'}`}>
              <span className="mi-score-num">{overallScore}</span>
              <span className="mi-score-label">/100</span>
            </div>
            <div className="mi-score-verdict">
              {overallScore >= 80 ? (
                <><CheckCircle size={18} style={{ color: '#4ade80' }} /> Strong Candidate — Ready for interviews!</>
              ) : overallScore >= 70 ? (
                <><Star size={18} style={{ color: '#C5F467' }} /> Good Progress — A few areas to refine</>
              ) : (
                <><AlertCircle size={18} style={{ color: '#F87171' }} /> Keep Practicing — More preparation needed</>
              )}
            </div>
          </div>

          {/* Criteria Breakdown */}
          <div className="mi-criteria-grid">
            {FEEDBACK_CRITERIA.map((c) => {
              const score = scores[c.id] || 0;
              return (
                <div key={c.id} className="mi-criterion-card">
                  <div className="mi-criterion-header">
                    <span className="mi-criterion-label">{c.label}</span>
                    <span className={`mi-criterion-score ${score >= 80 ? 'score-high' : score >= 65 ? 'score-mid' : 'score-low'}`}>
                      {score}
                    </span>
                  </div>
                  <div className="mi-criterion-bar-bg">
                    <div
                      className={`mi-criterion-bar-fill ${score >= 80 ? 'fill-high' : score >= 65 ? 'fill-mid' : 'fill-low'}`}
                      style={{ width: `${score}%` }}
                    />
                  </div>
                  <div className="mi-criterion-weight">Weight: {c.weight}%</div>
                </div>
              );
            })}
          </div>

          {/* Improvement Tips */}
          <div className="mi-improvement">
            <h3 className="mi-improvement-title">
              <Lightbulb size={16} />
              Personalized Improvement Tips
            </h3>
            <div className="mi-tip-cards">
              <div className="mi-tip-card">
                <CheckCircle size={14} style={{ color: '#4ade80' }} />
                <span>Practice explaining your approach before writing code — communication is key in real interviews.</span>
              </div>
              <div className="mi-tip-card">
                <CheckCircle size={14} style={{ color: '#4ade80' }} />
                <span>Always analyze time and space complexity after coding your solution.</span>
              </div>
              <div className="mi-tip-card">
                <AlertCircle size={14} style={{ color: '#F87171' }} />
                <span>Work on edge case identification — consider null inputs, empty arrays, and boundary conditions.</span>
              </div>
            </div>
          </div>

          <div className="mi-feedback-actions">
            <button className="mi-retry-btn" onClick={() => { setPhase('setup'); setMessages(MOCK_SESSION_MESSAGES); setTimeElapsed(0); setScores({}); }}>
              Practice Again
            </button>
            <button className="mi-back-questions-btn" onClick={() => navigate('/premium-questions')}>
              Back to Questions
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
