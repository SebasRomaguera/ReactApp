import AthleteCard from '../AthleteCard/AthleteCard';

export default function AthleteList({ athletes, onEdit, onDelete }) {
  if (!athletes || athletes.length === 0) {
    return (
      <div className="empty-state">
        <p>No athletes found. Add one using the form above!</p>
      </div>
    );
  }

  return (
    <div className="grid-cards">
      {athletes.map(athlete => (
        <AthleteCard
          key={athlete.id}
          athlete={athlete}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}
