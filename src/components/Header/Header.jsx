import { NavLink } from 'react-router-dom';
import './Header.css';

export default function Header() {
  return (
    <header className="header">
      <div className="container header-inner">
        <div className="header-brand">
          <span className="header-logo">⚡</span>
          <div>
            <span className="header-club">Athletics</span>
            <span className="header-sub">Sports Club</span>
          </div>
        </div>
        <nav className="header-nav">
          {/* NavLink computes active state from current URL, so menu highlight stays in sync with routing. */}
          <NavLink to="/"         className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'} end>Home</NavLink>
          <NavLink to="/athletes" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Athletes</NavLink>
          <NavLink to="/coaches"  className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Coaches</NavLink>
          <NavLink to="/schedule" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Schedule</NavLink>
          <NavLink to="/competitions" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Competitions</NavLink>
        </nav>
      </div>
    </header>
  );
}
