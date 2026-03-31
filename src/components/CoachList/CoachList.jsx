import CoachCard from '../CoachCard/CoachCard';
import EmptyState from '../common/EmptyState/EmptyState';

export default function CoachList({ coaches }) {
  if (!coaches || coaches.length === 0) {
    return <EmptyState message="No coaches available right now." />;
  }

  return (
    <div className="grid-cards">
      {coaches.map(coach => (
        <CoachCard key={coach.publicId || coach.id} coach={coach} />
      ))}
    </div>
  );
}
