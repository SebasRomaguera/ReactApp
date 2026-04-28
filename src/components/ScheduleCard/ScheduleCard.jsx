import './ScheduleCard.css';

export default function ScheduleCard({ session }) {
  // Force local midnight to render consistent calendar values from YYYY-MM-DD strings.
  const dateObj = new Date(session.date);
  const dayName = dateObj.toLocaleDateString('en-US', { weekday: 'short' });
  const dayNum  = dateObj.getDate();
  const month   = dateObj.toLocaleDateString('en-US', { month: 'short' });
  const time = Number.isNaN(dateObj.getTime())
    ? 'N/A'
    : dateObj.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });

  return (
    <div className="schedule-card card">
      <div className="schedule-card-header">
        <div className="schedule-date-box">
          <span className="sdate-day">{dayName}</span>
          <span className="sdate-num">{dayNum}</span>
          <span className="sdate-month">{month}</span>
        </div>
        <div className="schedule-title-block">
          <h3 className="schedule-title">{session.name}</h3>
          <p className="schedule-meta">{time} &bull; {session.season}</p>
        </div>
        <div className="schedule-badges">
          <span className="badge badge-training">training</span>
        </div>
      </div>

      <p className="schedule-description">{session.focus || 'No focus provided.'}</p>

      <div className="schedule-footer">
        <span className="schedule-location">📍 {session.venue}</span>
        <span className="schedule-athletes">👥 {session.athletePublicIds.length} athlete{session.athletePublicIds.length !== 1 ? 's' : ''}</span>
      </div>
    </div>
  );
}
