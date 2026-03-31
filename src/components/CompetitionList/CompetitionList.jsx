import CompetitionCard from '../CompetitionCard/CompetitionCard';
import EmptyState from '../common/EmptyState/EmptyState';

export default function CompetitionList({ competitions }) {
  if (!competitions.length) {
    return <EmptyState message="No competitions available right now." />;
  }

  return (
    <div className="grid-cards">
      {competitions.map(item => (
        <CompetitionCard key={item.id} competition={item} />
      ))}
    </div>
  );
}
