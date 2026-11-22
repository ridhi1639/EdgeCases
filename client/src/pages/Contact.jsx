// Edge Cases — Contact & Secure Dispatch Page
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Terminal,
  Send,
  Mail,
  ShieldAlert,
  Swords,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  ChevronDown,
  Globe,
  Radio,
  Cpu,
  Lock,
  Sparkles,
  RefreshCw,
  Copy,
  Check,
  Trophy,
  Bug,
  MessageSquare,
  Code2,
  Clock,
  Users,
} from 'lucide-react';
import SpotlightCard from '../components/SpotlightCard';
import '../styles/contact.css';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const [formStatus, setFormStatus] = useState('idle'); // 'idle' | 'transmitting' | 'success' | 'error'
  const [transmissionLog, setTransmissionLog] = useState([]);
  const [ticketId, setTicketId] = useState('');
  const [openFaq, setOpenFaq] = useState(null);
  const [copiedEmail, setCopiedEmail] = useState(null);

  const directChannels = [
    {
      title: 'Coding Events & Collaborations',
      email: 'events@edgecases.dev',
      badge: 'Collaborations',
      icon: <Trophy size={18} />,
      desc: "Want to organize a coding contest, collaborate on a project, or host a college hackathon? Let's build something exciting together.",
      color: '#EAB308',
    },
    {
      title: 'Bug Reports & Feedback',
      email: 'bugs@edgecases.dev',
      badge: 'Feedback',
      icon: <Bug size={18} />,
      desc: 'Found an issue with a coding problem, test case, or website feature? Tell us what went wrong so we can make the platform better.',
      color: '#EF4444',
    },
    {
      title: 'General Queries & Support',
      email: 'support@edgecases.dev',
      badge: 'Support',
      icon: <MessageSquare size={18} />,
      desc: "Questions about the platform, coding challenges, your submissions, or ideas for new features? We're here to help.",
      color: '#8B5CF6',
    },
  ];

  const helpTopics = [
    {
      icon: <Code2 size={16} />,
      title: 'Coding Problems',
      desc: 'Questions about problem statements or test cases.',
    },
    {
      icon: <Clock size={16} />,
      title: 'Technical Issues',
      desc: 'Report errors, unexpected results, or broken features.',
    },
    {
      icon: <Users size={16} />,
      title: 'Partnerships',
      desc: 'Discuss coding events, competitions, and collaborations.',
    },
  ];

  const faqs = [
    {
      id: 'faq-1',
      q: 'How can I report an incorrect test case?',
      a: 'Send us a message using the form above or email bugs@edgecases.dev with the problem title, your code submission, and the test case input/output where you noticed a discrepancy. Our team verifies test reports quickly.',
    },
    {
      id: 'faq-2',
      q: 'What should I do if my code submission fails unexpectedly?',
      a: 'Check the execution feedback for specific runtime errors, time limit exceeded (TLE), or memory limits. If the execution environment appears to have faulted, refresh and resubmit, or reach out to support@edgecases.dev with your submission ID.',
    },
    {
      id: 'faq-3',
      q: 'Can my college organize a coding competition on edgecases?',
      a: "Yes! We support collegiate contests, hackathons, and club coding showdowns with custom problem sets and leaderboards. Contact us via events@edgecases.dev to set up an event for your institution.",
    },
    {
      id: 'faq-4',
      q: 'How can I suggest a new coding problem or feature?',
      a: 'We love community contributions! Share your problem proposals, boundary-case ideas, or platform feature suggestions through the contact form or directly via support@edgecases.dev.',
    },
    {
      id: 'faq-5',
      q: 'How can I contact the team for technical support?',
      a: 'For urgent technical queries, write to support@edgecases.dev or submit the dispatch form on this page with detailed logs. We typically respond within 24 hours.',
    },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCopy = (email) => {
    navigator.clipboard.writeText(email);
    setCopiedEmail(email);
    setTimeout(() => setCopiedEmail(null), 2000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.message) {
      alert('Please fill in your name, email ID, and message.');
      return;
    }

    setFormStatus('transmitting');
    setTransmissionLog(['Encrypting payload with ephemeral AES-GCM-256...']);

    // Simulated cyberpunk transmission sequence
    setTimeout(() => {
      setTransmissionLog((prev) => [
        ...prev,
        'Routing packets via Frankfurt & Tokyo edge mesh...',
      ]);
    }, 600);

    setTimeout(() => {
      setTransmissionLog((prev) => [
        ...prev,
        'Verifying HMAC signature & AST safety headers...',
      ]);
    }, 1200);

    setTimeout(() => {
      const generatedId = `EC-TX-${Math.floor(1000 + Math.random() * 9000)}-ACK`;
      setTicketId(generatedId);
      setTransmissionLog((prev) => [
        ...prev,
        `Transmission acknowledged! Dispatch ID: ${generatedId}`,
      ]);
      setFormStatus('success');
    }, 1800);
  };

  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      message: '',
    });
    setFormStatus('idle');
    setTransmissionLog([]);
    setTicketId('');
  };

  return (
    <div className="contact-page">
      {/* 1. Hero */}
      <section className="contact-hero">
        <div className="container">
          <div className="contact-tagline-wrapper">
            <span className="live-pulse" />
            <span>// GET IN TOUCH</span>
          </div>

          <h1 className="contact-headline">
            LET'S TALK CODE.
          </h1>

          <p className="contact-description">
            Have a question, found a bug, or want to collaborate on a coding event? We'd love to hear from you. Reach out to the edgecases team.
          </p>
        </div>
      </section>

      {/* 2. Main Two-Column Grid: Form + Fast Channels */}
      <section className="contact-main-section">
        <div className="container">
          <div className="contact-layout-grid">
            {/* Column 1: Terminal Transmission Form */}
            <div className="contact-form-column">
              <div className="terminal-card">
                <div className="terminal-header">
                  <div className="terminal-dots">
                    <span className="terminal-dot dot-red" />
                    <span className="terminal-dot dot-yellow" />
                    <span className="terminal-dot dot-green" />
                  </div>
                  <div className="terminal-title">
                    <Terminal size={12} />
                    <span>dispatch_transmit.sh — bash 80x24</span>
                  </div>
                  <div className="terminal-status-tag">
                    <Radio size={10} style={{ color: 'var(--color-acid)' }} />
                    <span>ENCRYPTED</span>
                  </div>
                </div>

                <div className="terminal-body">
                  {formStatus === 'idle' && (
                    <form onSubmit={handleSubmit} className="dispatch-form">
                      <div className="form-row-grid">
                        <div className="form-field">
                          <label className="field-label" htmlFor="name">
                            <span>YOUR NAME</span>
                            <span className="req">*</span>
                          </label>
                          <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="e.g. Sarah Chen"
                            className="terminal-input"
                            required
                          />
                        </div>

                        <div className="form-field">
                          <label className="field-label" htmlFor="email">
                            <span>EMAIL ID</span>
                            <span className="req">*</span>
                          </label>
                          <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="developer@domain.com"
                            className="terminal-input"
                            required
                          />
                        </div>
                      </div>

                      <div className="form-field">
                        <label className="field-label" htmlFor="phone">
                          <span>PHONE NUMBER</span>
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="+1 (555) 000-0000"
                          className="terminal-input"
                        />
                      </div>

                      <div className="form-field">
                        <label className="field-label" htmlFor="message">
                          <span>MESSAGE</span>
                          <span className="req">*</span>
                        </label>
                        <textarea
                          id="message"
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          rows={6}
                          placeholder="Type your message here..."
                          className="terminal-textarea"
                          required
                        />
                      </div>

                      <div className="form-submit-row">
                        <button type="submit" className="btn btn-primary btn-md">
                          <Send size={14} />
                          <span>Send Message</span>
                        </button>
                        <span className="form-crypto-tag">
                          <Lock size={12} />
                          <span>End-to-End Encrypted via TLS 1.3</span>
                        </span>
                      </div>
                    </form>
                  )}

                  {formStatus === 'transmitting' && (
                    <div className="terminal-transmitting-state">
                      <div className="transmitting-spinner">
                        <RefreshCw size={28} className="spin-icon" />
                      </div>
                      <h4 className="transmitting-title">Transmitting Packet to Cluster...</h4>
                      <div className="transmitting-logs">
                        {transmissionLog.map((log, i) => (
                          <div key={i} className="log-line">
                            <span className="log-prefix">&gt;</span> {log}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {formStatus === 'success' && (
                    <div className="terminal-success-state">
                      <div className="success-icon-badge">
                        <CheckCircle2 size={36} />
                      </div>
                      <h3 className="success-title">Message Sent Successfully!</h3>
                      <p className="success-desc">
                        Thank you{formData.name ? `, ${formData.name}` : ''}! Your message has been received. Our team will get back to you at <strong>{formData.email}</strong>.
                      </p>

                      <div className="ticket-id-box">
                        <span className="ticket-label">REFERENCE TICKET ID:</span>
                        <code className="ticket-code">{ticketId}</code>
                      </div>

                      <div className="success-logs">
                        {transmissionLog.map((log, i) => (
                          <div key={i} className="log-line">
                            <span className="log-prefix">&gt;</span> {log}
                          </div>
                        ))}
                      </div>

                      <button
                        onClick={resetForm}
                        className="btn btn-secondary btn-sm"
                        style={{ marginTop: '20px' }}
                      >
                        <RefreshCw size={13} />
                        <span>Send Another Message</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Column 2: Direct Channels & Telemetry Widget */}
            <div className="contact-sidebar-column">
              {/* Direct Channels */}
              <div className="channels-section">
                <h3 className="sidebar-section-title">
                  <span className="sidebar-title-bar" />
                  Direct Channels
                </h3>

                <div className="channels-list">
                  {directChannels.map((channel) => (
                    <SpotlightCard key={channel.email} className="channel-card">
                      <div className="channel-card-top">
                        <div
                          className="channel-icon-box"
                          style={{ color: channel.color }}
                        >
                          {channel.icon}
                        </div>
                        <span className="channel-badge">{channel.badge}</span>
                      </div>

                      <h4 className="channel-title">{channel.title}</h4>
                      <p className="channel-desc">{channel.desc}</p>

                      <div className="channel-action-row">
                        <a
                          href={`mailto:${channel.email}`}
                          className="channel-email-link"
                        >
                          <Mail size={12} />
                          <span>{channel.email}</span>
                        </a>

                        <button
                          type="button"
                          onClick={() => handleCopy(channel.email)}
                          className="channel-copy-btn"
                          title="Copy email address"
                        >
                          {copiedEmail === channel.email ? (
                            <Check size={12} style={{ color: 'var(--color-acid)' }} />
                          ) : (
                            <Copy size={12} />
                          )}
                        </button>
                      </div>
                    </SpotlightCard>
                  ))}
                </div>
              </div>

              {/* Platform Information / Need a Hand? Card */}
              <div className="nodes-telemetry-card">
                <div style={{ marginBottom: '12px' }}>
                  <div style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '11px',
                    color: 'var(--accent)',
                    letterSpacing: '0.04em',
                    fontWeight: 600,
                    marginBottom: '4px'
                  }}>
                    PLATFORM INFORMATION
                  </div>
                  <h4 style={{
                    fontSize: '18px',
                    fontWeight: 700,
                    color: 'var(--text-primary)',
                    marginBottom: '6px'
                  }}>
                    Need a Hand?
                  </h4>
                  <p style={{
                    fontSize: '13px',
                    color: 'var(--text-secondary)',
                    lineHeight: 1.5,
                    marginBottom: '16px'
                  }}>
                    Choose the right channel for your query and include enough details for us to understand the issue.
                  </p>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  {helpTopics.map((topic, idx) => (
                    <div key={idx} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                      <div style={{
                        color: 'var(--text-muted)',
                        marginTop: '2px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '24px',
                        height: '24px'
                      }}>
                        {topic.icon}
                      </div>
                      <div>
                        <div style={{
                          fontSize: '13.5px',
                          fontWeight: 600,
                          color: 'var(--text-primary)',
                          marginBottom: '2px'
                        }}>
                          {topic.title}
                        </div>
                        <div style={{
                          fontSize: '12.5px',
                          color: 'var(--text-secondary)',
                          lineHeight: 1.4
                        }}>
                          {topic.desc}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Interactive FAQ Section */}
      <section className="contact-faq-section" id="faq">
        <div className="container">
          <div className="section-header text-center">
            <div className="section-label">KNOWLEDGE BASE</div>
            <h2 className="section-title">Frequently Asked Questions</h2>
            <p className="section-subtitle">
              Quick answers to common questions about coding challenges, submissions, platform support, and collaborations.
            </p>
          </div>

          <div className="faq-accordion-container">
            {faqs.map((faq) => {
              const isOpen = openFaq === faq.id;
              return (
                <div
                  key={faq.id}
                  className={`faq-item ${isOpen ? 'is-open' : ''}`}
                >
                  <button
                    className="faq-question-btn"
                    onClick={() => setOpenFaq(isOpen ? null : faq.id)}
                    aria-expanded={isOpen}
                  >
                    <span className="faq-q-text">{faq.q}</span>
                    <span className={`faq-chevron ${isOpen ? 'rotate' : ''}`}>
                      <ChevronDown size={16} />
                    </span>
                  </button>

                  {isOpen && (
                    <div className="faq-answer-panel">
                      <p>{faq.a}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
