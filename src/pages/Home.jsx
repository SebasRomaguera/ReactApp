import { Link } from 'react-router-dom';
import './Home.css';

const FEATURES = [
  { icon: '🏃', title: 'Athlete Directory', desc: 'Explore roster data and open each athlete detail page.', path: '/athletes', cta: 'View Athletes' },
  { icon: '🏅', title: 'Coach Directory',   desc: 'Browse coaches and inspect detail profiles from the API.', path: '/coaches',  cta: 'View Coaches'  },
  { icon: '📅', title: 'Training Agenda',   desc: 'Read club trainings and recovery sessions from backend data.', path: '/schedule', cta: 'View Schedule' },
  { icon: '🏟', title: 'Competitions',      desc: 'Track scheduled and finished competitions with detail views.', path: '/competitions', cta: 'View Competitions' },
];

const HIGHLIGHTS = [
  { value: '4',  label: 'User Stories',      accent: '' },
  { value: 'GET', label: 'API Operations',   accent: 'accent-red' },
  { value: '8+',  label: 'Routes / Views',   accent: 'accent-gold' },
  { value: '4',   label: 'Core Endpoints',   accent: 'accent-green' },
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
            <h3>As a coach, I want to review athlete profiles so that I can monitor performance and readiness.</h3>
            <p>Open the <Link to="/athletes">Athletes</Link> route and navigate to each athlete detail page.</p>
          </div>
          <div className="us-card card">
            <div className="us-label">User Story 2</div>
            <h3>As an athlete, I want to view trainings and recovery sessions so that I can prepare my week.</h3>
            <p>Use the <Link to="/schedule">Schedule</Link> filters to focus by session type.</p>
          </div>
          <div className="us-card card">
            <div className="us-label">User Story 3</div>
            <h3>As a coordinator, I want to inspect coach profiles so that I can assign athletes to the right specialist.</h3>
            <p>Use <Link to="/coaches">Coaches</Link> and open each coach detail route.</p>
          </div>
          <div className="us-card card">
            <div className="us-label">User Story 4</div>
            <h3>As a club member, I want to browse competitions so that I can follow upcoming events.</h3>
            <p>Navigate to <Link to="/competitions">Competitions</Link> and open details for each event.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
