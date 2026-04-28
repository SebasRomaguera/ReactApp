import { Link } from 'react-router-dom';
import EmptyState from '../common/EmptyState/EmptyState';
import './VenueList.css';

export default function VenueList({ venues }) {
  if (!venues || venues.length === 0) {
    return <EmptyState label="No venues found" />;
  }

  return (
    <div className="venue-list">
      <div className="venue-grid">
        {venues.map(venue => (
          <Link key={venue.publicId || venue.id} to={`/venues/${venue.publicId || venue.id}`} className="venue-card card">
            <div className="venue-header">
              <h3 className="venue-name">📍 {venue.name}</h3>
            </div>
            <div className="venue-info">
              <p><strong>Type:</strong> {venue.venue_type}</p>
              <p><strong>Indoor:</strong> {venue.indoor ? 'Yes' : 'No'}</p>
              <p><strong>Capacity:</strong> {venue.capacity ?? 'N/A'}</p>
            </div>
            <button className="btn btn-primary btn-sm">View Detail →</button>
          </Link>
        ))}
      </div>
    </div>
  );
}
