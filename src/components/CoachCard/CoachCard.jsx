import { Link } from 'react-router-dom';
import './CoachCard.css';

export default function CoachCard({ coach }) {
  return (
    <div className="coach-card card">
      <div className="coach-card-header">
        <div className="avatar coach-avatar">{coach.avatarInitials}</div>
        <div className="coach-card-info">
          <h3 className="coach-name">{coach.name}</h3>
          <p className="coach-specialty">{coach.certificationLevel || 'No certification'}</p>
        </div>
        <span className="badge badge-active">Coach</span>
      </div>

      <div className="coach-card-body">
        <div className="coach-detail-row">
          <span className="detail-label">Email</span>
          <span className="detail-value">{coach.email}</span>
        </div>
        <div className="coach-detail-row">
          <span className="detail-label">Certification</span>
          <span className="detail-value cert-value">{coach.certificationLevel}</span>
        </div>
        <div className="coach-detail-row">
          <span className="detail-label">Phone</span>
          <span className="detail-value">{coach.phone}</span>
        </div>
        <div className="coach-detail-row">
          <span className="detail-label">Address</span>
          <span className="detail-value">{coach.addressLabel}</span>
        </div>
      </div>

      <div className="coach-card-contact">
        <a href={`mailto:${coach.email}`} className="contact-link">✉️ {coach.email}</a>
        <span className="contact-link">📞 {coach.phone}</span>
      </div>

      <div className="coach-card-actions">
        <Link className="btn btn-primary btn-sm" to={`/coaches/${coach.publicId || coach.id}`}>
          View detail
        </Link>
      </div>
    </div>
  );
}
