import './CoachCard.css';

export default function CoachCard({ coach }) {
  return (
    <div className="coach-card card">
      <div className="coach-card-header">
        <div className="avatar coach-avatar">{coach.avatarInitials}</div>
        <div className="coach-card-info">
          <h3 className="coach-name">{coach.name}</h3>
          <p className="coach-specialty">{coach.specialty}</p>
        </div>
        <span className={`badge badge-${coach.status}`}>{coach.status}</span>
      </div>

      <div className="coach-card-body">
        <div className="coach-detail-row">
          <span className="detail-label">Experience</span>
          <span className="detail-value">{coach.experience}</span>
        </div>
        <div className="coach-detail-row">
          <span className="detail-label">Certification</span>
          <span className="detail-value cert-value">{coach.certificationLevel}</span>
        </div>
        <div className="coach-detail-row">
          <span className="detail-label">Athletes</span>
          <span className="detail-value">{coach.athleteCount} athletes</span>
        </div>
        <div className="coach-detail-row">
          <span className="detail-label">Age</span>
          <span className="detail-value">{coach.age} yrs</span>
        </div>
      </div>

      <div className="coach-card-contact">
        <a href={`mailto:${coach.email}`} className="contact-link">✉️ {coach.email}</a>
        <span className="contact-link">📞 {coach.phone}</span>
      </div>
    </div>
  );
}
