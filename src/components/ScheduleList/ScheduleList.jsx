import ScheduleCard from '../ScheduleCard/ScheduleCard';

export default function ScheduleList({ sessions }) {
  if (!sessions || sessions.length === 0) {
    return (
      <div className="empty-state">
        <p>No sessions scheduled.</p>
      </div>
    );
  }

  // Copy before sorting to avoid mutating the sessions prop received from the parent.
  const sorted = [...sessions].sort((a, b) => new Date(a.date) - new Date(b.date));

  return (
    <div className="grid-cards">
      {sorted.map(session => (
        <ScheduleCard key={session.id} session={session} />
      ))}
    </div>
  );
}
