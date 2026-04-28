import { Link } from 'react-router-dom';
import './AthleteCard.css';

export default function AthleteCard({ athlete }) {
  return (
    <div className="athlete-card card">
      <div className="athlete-card-header">
        <div className="avatar athlete-avatar">{athlete.avatarInitials}</div>
        <div className="athlete-card-info">
          <h3 className="athlete-name">{athlete.name}</h3>
          <p className="athlete-event">{athlete.email}</p>
        </div>
        <span className="badge badge-active">#{athlete.jerseyNumber ?? '-'}</span>
      </div>

      <div className="athlete-card-body">
        <div className="athlete-detail-row">
          <span className="detail-label">Phone</span>
          <span className="detail-value">{athlete.phone}</span>
        </div>
        <div className="athlete-detail-row">
          <span className="detail-label">Date of Birth</span>
          <span className="detail-value detail-pb">{athlete.joinedDate}</span>
        </div>
        <div className="athlete-detail-row">
          <span className="detail-label">Height</span>
          <span className="detail-value">{athlete.height ?? 'N/A'} cm</span>
        </div>
        <div className="athlete-detail-row">
          <span className="detail-label">Weight</span>
          <span className="detail-value">{athlete.weight ?? 'N/A'} kg</span>
        </div>
        <div className="athlete-detail-row">
          <span className="detail-label">Address</span>
          <span className="detail-value">{athlete.addressLabel}</span>
        </div>
      </div>

      <div className="athlete-card-actions">
        <Link className="btn btn-primary btn-sm" to={`/athletes/${athlete.publicId || athlete.id}`}>
          View detail
        </Link>
      </div>
    </div>
  );
}
