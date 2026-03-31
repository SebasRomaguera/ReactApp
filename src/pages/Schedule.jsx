import { useState } from 'react';
import schedulesData from '../data/schedules.json';
import ScheduleList from '../components/ScheduleList/ScheduleList';
import './Schedule.css';

const SESSION_TYPES = ['all', 'training', 'competition', 'recovery'];

export default function Schedule() {
  const [sessions]   = useState(schedulesData);
  const [typeFilter, setType] = useState('all');

  // Derived list shown in UI according to the selected session type.
  const displayed = sessions.filter(s => typeFilter === 'all' || s.type === typeFilter);

  // Dashboard counters are computed from the full dataset, not the filtered subset.
  const competitions = sessions.filter(s => s.type === 'competition').length;
  const trainings    = sessions.filter(s => s.type === 'training').length;
  const recoveries   = sessions.filter(s => s.type === 'recovery').length;

  return (
    <div>
      <div className="page-header">
        <div className="page-header-info">
          <h1>📅 Training Schedule</h1>
          <p>Upcoming sessions, competitions, and recovery days.</p>
        </div>
      </div>

      <div className="stats-strip">
        <div className="stat-card">
          <div className="stat-value">{sessions.length}</div>
          <div className="stat-label">Total Sessions</div>
        </div>
        <div className="stat-card accent-gold">
          <div className="stat-value">{trainings}</div>
          <div className="stat-label">Training</div>
        </div>
        <div className="stat-card accent-red">
          <div className="stat-value">{competitions}</div>
          <div className="stat-label">Competitions</div>
        </div>
        <div className="stat-card accent-green">
          <div className="stat-value">{recoveries}</div>
          <div className="stat-label">Recovery</div>
        </div>
      </div>

      <div className="schedule-filters">
        {SESSION_TYPES.map(t => (
          <button
            key={t}
            className={`filter-pill ${typeFilter === t ? 'active' : ''}`}
            onClick={() => setType(t)}
          >
            {t.charAt(0).toUpperCase() + t.slice(1)}
          </button>
        ))}
        <span className="filter-count">{displayed.length} session{displayed.length !== 1 ? 's' : ''}</span>
      </div>

      <ScheduleList sessions={displayed} />
    </div>
  );
}
