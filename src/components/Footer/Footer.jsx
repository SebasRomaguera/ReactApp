import './Footer.css';

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div className="footer-brand">
          <span className="footer-logo">⚡</span>
          <span className="footer-name">Athletics Sports Club</span>
        </div>
        <p className="footer-copy">
          &copy; {year} Athletics Sports Club. All rights reserved. Built with React + Vite.
        </p>
        <div className="footer-links">
          <span>Athletes</span>
          <span>Coaches</span>
          <span>Schedule</span>
        </div>
      </div>
    </footer>
  );
}
