import AthleteCard from '../AthleteCard/AthleteCard';
import EmptyState from '../common/EmptyState/EmptyState';

export default function AthleteList({ athletes }) {
  if (!athletes || athletes.length === 0) {
    return <EmptyState message="No athletes found for the selected filters." />;
  }

  return (
    <div className="grid-cards">
      {athletes.map(athlete => (
        <AthleteCard
          key={athlete.publicId || athlete.id}
          athlete={athlete}
        />
      ))}
    </div>
  );
}
