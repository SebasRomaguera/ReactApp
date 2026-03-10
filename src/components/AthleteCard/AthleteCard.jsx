import './AthleteCard.css';

export default function AthleteCard({ athlete, onEdit, onDelete }) {
  return (
    <div className="athlete-card card">
      <div className="athlete-card-header">
        <div className="avatar athlete-avatar">{athlete.avatarInitials}</div>
        <div className="athlete-card-info">
          <h3 className="athlete-name">{athlete.name}</h3>
          <p className="athlete-event">{athlete.event}</p>
        </div>
        <span className={`badge badge-${athlete.status}`}>{athlete.status}</span>
      </div>

      <div className="athlete-card-body">
        <div className="athlete-detail-row">
          <span className="detail-label">Category</span>
          <span className="detail-value">{athlete.category}</span>
        </div>
        <div className="athlete-detail-row">
          <span className="detail-label">Personal Best</span>
          <span className="detail-value detail-pb">{athlete.personalBest}</span>
        </div>
        <div className="athlete-detail-row">
          <span className="detail-label">Age</span>
          <span className="detail-value">{athlete.age} yrs</span>
        </div>
        <div className="athlete-detail-row">
          <span className="detail-label">Nationality</span>
          <span className="detail-value">{athlete.nationality}</span>
        </div>
        <div className="athlete-detail-row">
          <span className="detail-label">Joined</span>
          <span className="detail-value">{athlete.joinedDate}</span>
        </div>
      </div>

      <div className="athlete-card-actions">
        <button className="btn btn-outline btn-sm" onClick={() => onEdit(athlete)}>
          ✏️ Edit
        </button>
        <button className="btn btn-danger btn-sm" onClick={() => onDelete(athlete.id)}>
          🗑 Delete
        </button>
      </div>
    </div>
  );
}
