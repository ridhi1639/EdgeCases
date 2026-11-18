// Edge Cases — Global Cyberpunk Footer Component
import React from 'react';
import { Link } from 'react-router-dom';
import {
  Terminal,
  Swords,
  ShieldCheck,
  Cpu,
  Disc,
  Radio,
  ArrowUpRight,
  ExternalLink,
  Code2,
  Mail,
  Heart
} from 'lucide-react';
import { GithubIcon, TwitterIcon } from './SocialIcons';
import '../styles/footer.css';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="platform-footer">
      <div className="footer-glow-accent" aria-hidden="true" />

      <div className="container footer-container">
        {/* Main Footer Grid */}
        <div className="footer-grid">
          {/* Brand & Mission Column */}
          <div className="footer-col footer-col-brand">
            <Link to="/" className="brand-logo footer-brand">
              <span className="brand-icon">
                <Terminal size={14} />
              </span>
              <span className="brand-wordmark">
                edge<span>cases</span>
              </span>
            </Link>

            <p className="footer-mission">
              The competitive 1v1 arena engineered for adversarial edge cases,
              sub-millisecond judging telemetry, and algorithmic combat.
            </p>

            <div className="footer-status-pill">
              <span className="footer-status-pulse" />
              <span className="footer-status-text">
                ARENA CLUSTER: <strong>ONLINE (99.98%)</strong>
              </span>
            </div>

            <div className="footer-social-links">
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                className="footer-social-btn"
                aria-label="GitHub Repository"
              >
                <GithubIcon size={15} />
              </a>
              <a
                href="https://discord.com"
                target="_blank"
                rel="noreferrer"
                className="footer-social-btn"
                aria-label="Discord Community"
              >
                <Disc size={15} />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                className="footer-social-btn"
                aria-label="X Twitter"
              >
                <TwitterIcon size={15} />
              </a>
              <Link
                to="/contact"
                className="footer-social-btn"
                aria-label="Contact Email"
              >
                <Mail size={15} />
              </Link>
            </div>
          </div>

          {/* Column 2: Platform */}
          <div className="footer-col">
            <h4 className="footer-col-title">
              <span className="footer-title-bar" />
              Platform
            </h4>
            <ul className="footer-link-list">
              <li>
                <Link to="/arena" className="footer-link">
                  <Swords size={12} />
                  <span>1v1 Battle Arena</span>
                  <span className="footer-hot-tag">LIVE</span>
                </Link>
              </li>
              <li>
                <Link to="/practice" className="footer-link">
                  <Code2 size={12} />
                  <span>Problem Library</span>
                </Link>
              </li>
              <li>
                <Link to="/leaderboard" className="footer-link">
                  <span>Global Elo Rankings</span>
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="footer-link">
                  <span>Developer Dashboard</span>
                </Link>
              </li>
              <li>
                <Link to="/profile" className="footer-link">
                  <span>Match History</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Company & Manifesto */}
          <div className="footer-col">
            <h4 className="footer-col-title">
              <span className="footer-title-bar" />
              Company
            </h4>
            <ul className="footer-link-list">
              <li>
                <Link to="/about" className="footer-link">
                  <span>About edgecases</span>
                </Link>
              </li>
              <li>
                <Link to="/about#manifesto" className="footer-link">
                  <span>The Manifesto</span>
                </Link>
              </li>
              <li>
                <Link to="/about#architecture" className="footer-link">
                  <span>Sandbox Architecture</span>
                </Link>
              </li>
              <li>
                <Link to="/about#team" className="footer-link">
                  <span>Core Engineering Team</span>
                </Link>
              </li>
              <li>
                <Link to="/about#security" className="footer-link">
                  <ShieldCheck size={12} />
                  <span>Fair Play & Anti-Cheat</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Support & Dispatch */}
          <div className="footer-col">
            <h4 className="footer-col-title">
              <span className="footer-title-bar" />
              Dispatch & Comms
            </h4>
            <ul className="footer-link-list">
              <li>
                <Link to="/contact" className="footer-link">
                  <span>Contact Headquarters</span>
                </Link>
              </li>
              <li>
                <Link to="/contact#bug-report" className="footer-link">
                  <span>Report Edge-Case Bug</span>
                </Link>
              </li>
              <li>
                <Link to="/contact#tournaments" className="footer-link">
                  <span>Collegiate Hackathons</span>
                </Link>
              </li>
              <li>
                <Link to="/contact#faq" className="footer-link">
                  <span>Frequently Asked Questions</span>
                </Link>
              </li>
              <li>
                <a
                  href="#status"
                  onClick={(e) => {
                    e.preventDefault();
                    window.alert('All 4 Arena cluster nodes (Tokyo, Frankfurt, Virginia, Singapore) operating at 100% nominal capacity.');
                  }}
                  className="footer-link"
                >
                  <Radio size={12} style={{ color: 'var(--color-acid)' }} />
                  <span>Cluster Status: Nominal</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom">
          <div className="footer-bottom-left">
            <span>&copy; {currentYear} edgecases Inc. All rights reserved.</span>
            <span className="footer-dot-sep">&bull;</span>
            <span className="footer-mono-tag">BUILD 2.4.0-PROD</span>
            <span className="footer-dot-sep">&bull;</span>
            <span className="footer-subtext">Engineered for extreme boundary conditions</span>
          </div>

          <div className="footer-bottom-right">
            <Link to="/about" className="footer-legal-link">
              Philosophy
            </Link>
            <Link to="/contact" className="footer-legal-link">
              Support
            </Link>
            <a
              href="#privacy"
              onClick={(e) => {
                e.preventDefault();
                window.alert('Edgecases Privacy Guarantee: We only store anonymous match telemetry and code diffs for Elo verification.');
              }}
              className="footer-legal-link"
            >
              Privacy Policy
            </a>
            <a
              href="#terms"
              onClick={(e) => {
                e.preventDefault();
                window.alert('Edgecases Terms: Submissions must adhere to fair-play guidelines. Exploiting sandbox sandbox VM escape vectors will result in permanent rating forfeiture.');
              }}
              className="footer-legal-link"
            >
              Fair-Play Rules
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
