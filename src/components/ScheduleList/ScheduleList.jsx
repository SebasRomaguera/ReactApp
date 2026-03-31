import ScheduleCard from '../ScheduleCard/ScheduleCard';
import EmptyState from '../common/EmptyState/EmptyState';

export default function ScheduleList({ sessions }) {
  if (!sessions || sessions.length === 0) {
    return <EmptyState message="No sessions match the selected filter." />;
  }

  // Copy before sorting to avoid mutating the sessions prop received from the parent.
  const sorted = [...sessions].sort((a, b) => new Date(a.date) - new Date(b.date));

  return (
    <div className="grid-cards">
      {sorted.map(session => (
        <ScheduleCard key={session.publicId || session.id} session={session} />
      ))}
    </div>
  );
}
