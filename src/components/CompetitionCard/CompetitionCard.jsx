import { Link } from 'react-router-dom';
import './CompetitionCard.css';

export default function CompetitionCard({ competition }) {
  const dateObj = new Date(`${competition.date}T00:00:00`);
  const prettyDate = Number.isNaN(dateObj.getTime())
    ? competition.date
    : dateObj.toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      });

  return (
    <article className="competition-card card">
      <div className="competition-card-top">
        <h3>{competition.name}</h3>
        <span className={`badge badge-${competition.status}`}>{competition.status}</span>
      </div>

      <div className="competition-card-body">
        <p><strong>Date:</strong> {prettyDate}</p>
        <p><strong>Venue:</strong> {competition.venue}</p>
        <p><strong>Season:</strong> {competition.season}</p>
        <p><strong>Category:</strong> {competition.category}</p>
      </div>

      <Link className="btn btn-primary btn-sm" to={`/competitions/${competition.publicId || competition.id}`}>
        View detail
      </Link>
    </article>
  );
}
