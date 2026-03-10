import { Link } from 'react-router-dom';
import './Home.css';

const FEATURES = [
  { icon: '🏃', title: 'Athlete Management', desc: 'Track your athletes\' personal bests, events, and status.', path: '/athletes', cta: 'View Athletes' },
  { icon: '🏅', title: 'Coach Roster',       desc: 'Manage coaching staff, specialties, and certifications.',    path: '/coaches',  cta: 'View Coaches'  },
  { icon: '📅', title: 'Training Schedule',  desc: 'Plan and review training sessions, competitions, and recovery.', path: '/schedule', cta: 'View Schedule' },
];

const HIGHLIGHTS = [
  { value: '6',  label: 'Athletes',        accent: '' },
  { value: '3',  label: 'Coaches',         accent: 'accent-red' },
  { value: '6',  label: 'Sessions / Week', accent: 'accent-gold' },
  { value: '1',  label: 'Competition',     accent: 'accent-green' },
];

export default function Home() {
  return (
    <div className="home-page">
      {/* Hero */}
      <section className="hero">
        <div className="hero-content">
          <span className="hero-eyebrow">Athletics Sports Club</span>
          <h1 className="hero-title">Train. Compete. Excel.</h1>
          <p className="hero-subtitle">
            Manage your club&apos;s athletes, coaches, and training schedule all in one place.
          </p>
          <div className="hero-ctas">
            <Link to="/athletes" className="btn btn-gold">🏃 Manage Athletes</Link>
            <Link to="/schedule" className="btn btn-outline hero-btn-outline">📅 View Schedule</Link>
          </div>
        </div>
        <div className="hero-graphic" aria-hidden="true">
          <span className="hero-icon">⚡</span>
        </div>
      </section>

      {/* Stats */}
      <section className="home-stats stats-strip">
        {HIGHLIGHTS.map(h => (
          <div key={h.label} className={`stat-card ${h.accent}`}>
            <div className="stat-value">{h.value}</div>
            <div className="stat-label">{h.label}</div>
          </div>
        ))}
      </section>

      {/* Feature cards */}
      <section className="home-features">
        <h2 className="section-title">Club Management</h2>
        <div className="features-grid">
          {FEATURES.map(f => (
            <div key={f.title} className="feature-card card">
              <div className="feature-icon">{f.icon}</div>
              <h3 className="feature-title">{f.title}</h3>
              <p className="feature-desc">{f.desc}</p>
              <Link to={f.path} className="btn btn-primary btn-sm feature-btn">{f.cta} →</Link>
            </div>
          ))}
        </div>
      </section>

      {/* User stories callout */}
      <section className="user-stories-section">
        <h2 className="section-title">User Stories</h2>
        <div className="user-stories-grid">
          <div className="us-card card">
            <div className="us-label">User Story 1</div>
            <h3>As a coach, I want to manage my athlete roster so that I can track their progress and performance.</h3>
            <p>Navigate to the <Link to="/athletes">Athletes</Link> section to add, edit, or remove athletes from your roster.</p>
          </div>
          <div className="us-card card">
            <div className="us-label">User Story 2</div>
            <h3>As an athlete, I want to view my training schedule so that I can prepare for upcoming sessions.</h3>
            <p>Navigate to the <Link to="/schedule">Schedule</Link> section to review all training sessions and competitions.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
