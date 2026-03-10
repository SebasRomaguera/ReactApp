import CoachCard from '../CoachCard/CoachCard';

export default function CoachList({ coaches }) {
  if (!coaches || coaches.length === 0) {
    return (
      <div className="empty-state">
        <p>No coaches found.</p>
      </div>
    );
  }

  return (
    <div className="grid-cards">
      {coaches.map(coach => (
        <CoachCard key={coach.id} coach={coach} />
      ))}
    </div>
  );
}
