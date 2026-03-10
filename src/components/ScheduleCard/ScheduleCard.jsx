import './ScheduleCard.css';

const INTENSITY_COLORS = { Low: 'low', Medium: 'medium', High: 'high', Max: 'max' };

export default function ScheduleCard({ session }) {
  const dateObj = new Date(session.date + 'T00:00:00');
  const dayName = dateObj.toLocaleDateString('en-US', { weekday: 'short' });
  const dayNum  = dateObj.getDate();
  const month   = dateObj.toLocaleDateString('en-US', { month: 'short' });

  return (
    <div className="schedule-card card">
      <div className="schedule-card-header">
        <div className="schedule-date-box">
          <span className="sdate-day">{dayName}</span>
          <span className="sdate-num">{dayNum}</span>
          <span className="sdate-month">{month}</span>
        </div>
        <div className="schedule-title-block">
          <h3 className="schedule-title">{session.title}</h3>
          <p className="schedule-meta">{session.time} &bull; {session.duration}</p>
        </div>
        <div className="schedule-badges">
          <span className={`badge badge-${session.type}`}>{session.type}</span>
          <span className={`badge badge-${INTENSITY_COLORS[session.intensity]}`}>{session.intensity}</span>
        </div>
      </div>

      <p className="schedule-description">{session.description}</p>

      <div className="schedule-footer">
        <span className="schedule-location">📍 {session.location}</span>
        <span className="schedule-athletes">👥 {session.athleteIds.length} athlete{session.athleteIds.length !== 1 ? 's' : ''}</span>
      </div>
    </div>
  );
}
