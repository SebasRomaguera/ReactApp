import { useState } from 'react';
import coachesData from '../data/coaches.json';
import CoachList from '../components/CoachList/CoachList';

export default function Coaches() {
  const [coaches] = useState(coachesData);

  const totalAthletes = coaches.reduce((sum, c) => sum + c.athleteCount, 0);

  return (
    <div>
      <div className="page-header">
        <div className="page-header-info">
          <h1>🏅 Coaching Staff</h1>
          <p>Our certified coaches guiding athletes to their best performance.</p>
        </div>
      </div>

      <div className="stats-strip">
        <div className="stat-card">
          <div className="stat-value">{coaches.length}</div>
          <div className="stat-label">Total Coaches</div>
        </div>
        <div className="stat-card accent-green">
          <div className="stat-value">{coaches.filter(c => c.status === 'active').length}</div>
          <div className="stat-label">Active</div>
        </div>
        <div className="stat-card accent-gold">
          <div className="stat-value">{totalAthletes}</div>
          <div className="stat-label">Athletes Coached</div>
        </div>
      </div>

      <CoachList coaches={coaches} />
    </div>
  );
}
