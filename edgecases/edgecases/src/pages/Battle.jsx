// Edge Cases — 1v1 Live Battle Coding IDE
import React, { useState, useEffect, useRef } from 'react';
import { useParams, useLocation, useNavigate, Link } from 'react-router-dom';
import Editor from '@monaco-editor/react';
import { useAuth } from '../context/AuthContext';
import {
  Terminal,
  Play,
  Send,
  RotateCcw,
  Clock,
  Wifi,
  ChevronDown,
  ChevronRight,
  LogOut,
  Settings2,
  CheckCircle,
  XCircle,
  AlertTriangle,
  FileCode,
} from 'lucide-react';
import Button from '../components/Button';
import Badge from '../components/Badge';
import Modal from '../components/Modal';
import { problemsApi, matchApi } from '../services/api';
import { battleSocket } from '../services/socket';
import '../styles/battle.css';

export default function Battle() {
  const { matchId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();

  // Match and opponent state
  const opponentData = location.state?.opponent || {
    username: 'algo_rythm',
    rating: 1825,
    avatar: 'AR',
  };
  const problemId = location.state?.problemId || 'longest-unique-substring';
  const initialLanguage = location.state?.language || user?.preferredLanguage || 'python';

  // Problem data
  const [problem, setProblem] = useState(null);
  const [activeProblemTab, setActiveProblemTab] = useState('statement'); // 'statement' | 'submissions'
  const [hintsExpanded, setHintsExpanded] = useState(false);

  // Editor configuration
  const [language, setLanguage] = useState(initialLanguage);
  const [code, setCode] = useState('');
  const [fontSize, setFontSize] = useState(user?.editorPreferences?.fontSize || 14);
  const [editorTheme, setEditorTheme] = useState('vs-dark');
  const editorRef = useRef(null);

  // Live Timer (15 minutes countdown)
  const [secondsRemaining, setSecondsRemaining] = useState(15 * 60);
  const [isTimerActive, setIsTimerActive] = useState(true);

  // Live Opponent Status
  const [opponentStatus, setOpponentStatus] = useState('Connected • Typing solution...');

  // Output console & tests state
  const [activeOutputTab, setActiveOutputTab] = useState('testcases'); // 'testcases' | 'stdout' | 'result'
  const [selectedCaseIndex, setSelectedCaseIndex] = useState(0);
  const [isExecuting, setIsExecuting] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [executionResult, setExecutionResult] = useState(null);
  const [submissionResult, setSubmissionResult] = useState(null);

  // Exit Confirmation Modal
  const [showExitModal, setShowExitModal] = useState(false);

  // Load Problem Details
  useEffect(() => {
    async function fetchProblem() {
      try {
        const data = await problemsApi.getProblemById(problemId);
        setProblem(data);
        const starter = data.starterCode[language] || data.starterCode.python;
        setCode(starter);
      } catch (err) {
        console.error('Failed to load problem:', err);
      }
    }
    fetchProblem();
  }, [problemId]);

  // Handle Language Change
  const handleLanguageChange = (newLang) => {
    setLanguage(newLang);
    if (problem?.starterCode?.[newLang]) {
      setCode(problem.starterCode[newLang]);
    }
  };

  // Countdown timer interval
  useEffect(() => {
    if (!isTimerActive) return;
    const interval = setInterval(() => {
      setSecondsRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          handleTimeExpired();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [isTimerActive]);

  // Subscribe to Opponent Event Bus
  useEffect(() => {
    const unsubscribe = battleSocket.subscribeToMatch(matchId, (event) => {
      if (event.type === 'status') {
        setOpponentStatus(event.text);
      }
    });
    return () => unsubscribe();
  }, [matchId]);

  // Time format helper
  const formatTimer = (secs) => {
    const mins = Math.floor(secs / 60);
    const rem = secs % 60;
    return `${mins.toString().padStart(2, '0')}:${rem.toString().padStart(2, '0')}`;
  };

  const handleTimeExpired = () => {
    alert('Match time has expired. Calculating submissions...');
    navigate(`/results/${matchId}`, {
      state: {
        outcome: 'draw',
        userRating: user?.rating || 1840,
        opponentRating: opponentData.rating,
        ratingDelta: 0,
        duration: '15:00',
        problemTitle: problem?.title,
      },
    });
  };

  // Run Test Cases Action
  const handleRunCode = async () => {
    try {
      setIsExecuting(true);
      setActiveOutputTab('testcases');
      const res = await matchApi.runTests(problemId, language, code, problem?.testCases);
      setExecutionResult(res);
    } catch (err) {
      console.error(err);
    } finally {
      setIsExecuting(false);
    }
  };

  // Submit Solution Action
  const handleSubmitCode = async () => {
    try {
      setIsSubmitting(true);
      setActiveOutputTab('result');
      const res = await matchApi.submitSolution(problemId, language, code);
      setSubmissionResult(res);

      // Auto redirect to results screen after successful execution
      setTimeout(() => {
        navigate(`/results/${matchId}`, {
          state: {
            outcome: 'victory',
            userRating: user?.rating || 1840,
            opponentRating: opponentData.rating,
            ratingDelta: res.ratingDelta,
            duration: formatTimer(15 * 60 - secondsRemaining),
            problemTitle: problem?.title,
            passedTests: res.passedTests,
            totalTests: res.totalTests,
            coinsEarned: res.coinsEarned,
          },
        });
      }, 1500);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Reset editor to starter template
  const handleResetStarter = () => {
    if (confirm('Reset editor to initial template? Any unsaved edits will be discarded.')) {
      if (problem?.starterCode?.[language]) {
        setCode(problem.starterCode[language]);
      }
    }
  };

  // Confirm Forfeit / Exit
  const handleConfirmExit = () => {
    setShowExitModal(false);
    navigate(`/results/${matchId}`, {
      state: {
        outcome: 'defeat',
        userRating: user?.rating || 1840,
        opponentRating: opponentData.rating,
        ratingDelta: -18,
        duration: formatTimer(15 * 60 - secondsRemaining),
        problemTitle: problem?.title,
        forfeit: true,
      },
    });
  };

  if (!problem) {
    return (
      <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#111315', color: '#ECEEEF' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span className="spinner" />
          <span>Provisioning sandboxed battle environment...</span>
        </div>
      </div>
    );
  }

  const publicCases = problem.testCases.filter((c) => !c.isHidden);

  return (
    <div className="battle-viewport">
      {/* 1. Dense Top Status Bar */}
      <header className="battle-topbar">
        {/* Left: Brand and Match Identifier */}
        <div className="battle-topbar-left">
          <Link to="/dashboard" className="brand-logo" title="Back to Dashboard">
            <span className="brand-icon">
              <Terminal size={14} />
            </span>
            <span className="brand-wordmark">
              edge<span>cases</span>
            </span>
          </Link>

          <span className="battle-match-id">{matchId}</span>

          {/* Players status */}
          <div className="battle-players-status">
            <div className="battle-player-pill">
              <span className="status-dot status-dot-online" />
              <span>{user?.username || 'you'}</span>
              <span className="tabular-nums" style={{ color: '#C5F467' }}>
                {user?.rating || 1840}
              </span>
            </div>

            <span style={{ fontSize: '11px', color: '#484E55' }}>vs</span>

            <div className="battle-player-pill player-opponent-pill">
              <span className="status-dot status-dot-online" />
              <span>@{opponentData.username}</span>
              <span className="tabular-nums" style={{ color: '#969DA5' }}>
                {opponentData.rating}
              </span>
              <span className="player-status-tag">
                ({opponentStatus})
              </span>
            </div>
          </div>
        </div>

        {/* Center: Countdown Timer */}
        <div className="battle-topbar-center">
          <div
            className={`battle-countdown-badge tabular-nums ${
              secondsRemaining < 120 ? 'warning' : ''
            }`}
          >
            <Clock size={15} />
            <span>{formatTimer(secondsRemaining)}</span>
          </div>
        </div>

        {/* Right: Latency & Exit */}
        <div className="battle-topbar-right">
          <div className="network-ping">
            <Wifi size={13} style={{ color: '#86C98B' }} />
            <span>22ms</span>
          </div>

          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowExitModal(true)}
            style={{ color: '#F87171' }}
          >
            <LogOut size={13} />
            <span>Forfeit</span>
          </Button>
        </div>
      </header>

      {/* 2. Main Resizable Split Workspace */}
      <main className="battle-workspace">
        {/* Left Panel: Problem Statement */}
        <section className="problem-panel">
          <div className="problem-panel-tabs">
            <button
              className={`problem-tab ${activeProblemTab === 'statement' ? 'active' : ''}`}
              onClick={() => setActiveProblemTab('statement')}
            >
              <FileCode size={13} />
              <span>Problem Statement</span>
            </button>
          </div>

          <div className="problem-content-scroll">
            <div className="problem-header-block">
              <div className="problem-title-row">
                <h2 className="problem-title-text">{problem.title}</h2>
                <Badge variant={problem.difficulty}>{problem.difficulty}</Badge>
              </div>
              <div style={{ display: 'flex', gap: '8px', fontSize: '11px', color: '#68707B', fontFamily: 'var(--font-mono)' }}>
                <span>Topic: {problem.topic}</span>
                <span>•</span>
                <span>Time Limit: {problem.timeLimit}</span>
                <span>•</span>
                <span>Memory: {problem.memoryLimit}</span>
              </div>
            </div>

            {/* Description Body */}
            <div className="problem-statement-body">
              <p>{problem.description}</p>
            </div>

            {/* Input & Output Format */}
            <div>
              <div className="problem-section-title">Input Format</div>
              <p style={{ fontSize: '12px', color: '#969DA5', marginBottom: '12px' }}>
                {problem.inputFormat}
              </p>

              <div className="problem-section-title">Output Format</div>
              <p style={{ fontSize: '12px', color: '#969DA5' }}>
                {problem.outputFormat}
              </p>
            </div>

            {/* Examples */}
            <div>
              <div className="problem-section-title">Examples</div>
              {problem.examples.map((ex, i) => (
                <div key={i} className="example-box">
                  <div className="example-box-header">Example {i + 1}</div>
                  <div className="example-io-row">
                    <span className="io-label">Input: </span>
                    <span className="io-val">{ex.input}</span>
                  </div>
                  <div className="example-io-row">
                    <span className="io-label">Output: </span>
                    <span className="io-val">{ex.output}</span>
                  </div>
                  {ex.explanation && (
                    <div style={{ marginTop: '4px', color: '#68707B', fontSize: '11px' }}>
                      <span className="io-label">Explanation: </span>
                      {ex.explanation}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Constraints */}
            <div>
              <div className="problem-section-title">Constraints</div>
              <ul className="constraints-list">
                {problem.constraints.map((c, i) => (
                  <li key={i}>{c}</li>
                ))}
              </ul>
            </div>

            {/* Hints Disclosure */}
            {problem.hints && problem.hints.length > 0 && (
              <div className="hint-disclosure">
                <div
                  className="hint-summary"
                  onClick={() => setHintsExpanded(!hintsExpanded)}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    {hintsExpanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                    <span>Algorithmic Hints ({problem.hints.length})</span>
                  </div>
                </div>
                {hintsExpanded && (
                  <div className="hint-body">
                    {problem.hints.map((h, i) => (
                      <p key={i} style={{ marginBottom: i < problem.hints.length - 1 ? '8px' : 0 }}>
                        {i + 1}. {h}
                      </p>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </section>

        {/* Right Panel: Editor and Output */}
        <section className="editor-panel">
          {/* Top Editor Toolbar */}
          <div className="editor-toolbar">
            <div className="editor-toolbar-left">
              <select
                className="lang-select"
                value={language}
                onChange={(e) => handleLanguageChange(e.target.value)}
              >
                <option value="python">Python 3.11</option>
                <option value="javascript">JavaScript (Node.js)</option>
                <option value="cpp">C++20 (GCC 13)</option>
                <option value="java">Java 21 (OpenJDK)</option>
              </select>

              <button
                className="btn btn-ghost btn-sm"
                onClick={handleResetStarter}
                title="Reset starter template"
              >
                <RotateCcw size={12} />
                <span>Reset</span>
              </button>
            </div>

            <div className="editor-toolbar-right">
              {/* Font size toggle */}
              <select
                className="lang-select"
                style={{ width: '80px' }}
                value={fontSize}
                onChange={(e) => setFontSize(Number(e.target.value))}
              >
                <option value={12}>12 px</option>
                <option value={14}>14 px</option>
                <option value={16}>16 px</option>
              </select>

              {/* Run Test cases */}
              <Button
                variant="secondary"
                size="sm"
                onClick={handleRunCode}
                isLoading={isExecuting}
                disabled={isSubmitting}
              >
                <Play size={12} />
                <span>Run</span>
              </Button>

              {/* Submit Final */}
              <Button
                variant="primary"
                size="sm"
                onClick={handleSubmitCode}
                isLoading={isSubmitting}
                disabled={isExecuting}
              >
                <Send size={12} />
                <span>Submit</span>
              </Button>
            </div>
          </div>

          {/* Monaco Editor Container */}
          <div className="monaco-wrapper">
            <Editor
              height="100%"
              language={language === 'cpp' ? 'cpp' : language === 'python' ? 'python' : language}
              theme={editorTheme}
              value={code}
              onChange={(value) => setCode(value || '')}
              onMount={(editor) => {
                editorRef.current = editor;
              }}
              options={{
                fontSize: fontSize,
                fontFamily: '"JetBrains Mono", monospace',
                minimap: { enabled: false },
                scrollBeyondLastLine: false,
                lineNumbers: 'on',
                renderWhitespace: 'selection',
                tabSize: 4,
                padding: { top: 12, bottom: 12 },
                cursorBlinking: 'smooth',
                automaticLayout: true,
              }}
            />
          </div>

          {/* Bottom Output Console & Test Cases Panel */}
          <div className="output-panel">
            <div className="output-tabs">
              <div className="output-tab-group">
                <button
                  className={`output-tab-btn ${activeOutputTab === 'testcases' ? 'active' : ''}`}
                  onClick={() => setActiveOutputTab('testcases')}
                >
                  <span>Test Cases</span>
                  {executionResult && (
                    <span className="badge badge-easy">Passed 3/3</span>
                  )}
                </button>
                <button
                  className={`output-tab-btn ${activeOutputTab === 'stdout' ? 'active' : ''}`}
                  onClick={() => setActiveOutputTab('stdout')}
                >
                  <span>Standard Output</span>
                </button>
                {submissionResult && (
                  <button
                    className={`output-tab-btn ${activeOutputTab === 'result' ? 'active' : ''}`}
                    onClick={() => setActiveOutputTab('result')}
                  >
                    <span>Submission</span>
                  </button>
                )}
              </div>

              <div style={{ fontSize: '11px', color: '#68707B', fontFamily: 'var(--font-mono)' }}>
                Sandboxed Runner • Isolated
              </div>
            </div>

            <div className="output-body">
              {activeOutputTab === 'testcases' && (
                <div>
                  {/* Test case tab chips */}
                  <div className="testcase-selector">
                    {publicCases.map((tc, idx) => (
                      <button
                        key={tc.id}
                        type="button"
                        className={`testcase-chip ${selectedCaseIndex === idx ? 'active' : ''}`}
                        onClick={() => setSelectedCaseIndex(idx)}
                      >
                        <span>Case {idx + 1}</span>
                      </button>
                    ))}
                  </div>

                  {/* Active Test Case Detail */}
                  {publicCases[selectedCaseIndex] && (
                    <div>
                      <div className="test-io-box">
                        <div className="test-io-label">Input</div>
                        <div>{publicCases[selectedCaseIndex].input}</div>
                      </div>

                      <div className="test-io-box">
                        <div className="test-io-label">Expected Output</div>
                        <div>{publicCases[selectedCaseIndex].expectedOutput}</div>
                      </div>

                      {executionResult && (
                        <div className="test-result-status accepted">
                          <CheckCircle size={14} />
                          <span>Status: Accepted (Runtime: {executionResult.runtime})</span>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}

              {activeOutputTab === 'stdout' && (
                <div style={{ color: '#969DA5' }}>
                  {executionResult ? (
                    <pre style={{ margin: 0 }}>{executionResult.stdout}</pre>
                  ) : (
                    <span style={{ color: '#666E77' }}>
                      No standard output yet. Click 'Run' to execute code against public tests.
                    </span>
                  )}
                </div>
              )}

              {activeOutputTab === 'result' && submissionResult && (
                <div>
                  <div className="test-result-status accepted">
                    <CheckCircle size={16} />
                    <span>Verdict: {submissionResult.status}</span>
                  </div>
                  <p style={{ color: '#969DA5', marginBottom: '8px' }}>
                    {submissionResult.summary}
                  </p>
                  <div style={{ display: 'flex', gap: '16px', color: '#68707B' }}>
                    <span>Runtime: {submissionResult.runtime}</span>
                    <span>Memory: {submissionResult.memory}</span>
                    <span style={{ color: '#C5F467' }}>
                      Rating Delta: +{submissionResult.ratingDelta}
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      </main>

      {/* Forfeit Confirmation Modal */}
      <Modal
        isOpen={showExitModal}
        onClose={() => setShowExitModal(false)}
        title="Forfeit Match?"
        actions={
          <>
            <Button variant="ghost" size="sm" onClick={() => setShowExitModal(false)}>
              Continue Battle
            </Button>
            <Button variant="danger" size="sm" onClick={handleConfirmExit}>
              Forfeit & Concede
            </Button>
          </>
        }
      >
        <p>
          Exiting an ongoing battle will count as a forfeit defeat and deduct approximately 18 Elo rating points. Are you sure you wish to concede?
        </p>
      </Modal>
    </div>
  );
}
