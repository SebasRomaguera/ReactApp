import { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { getById, updateResource, deleteResource } from '../api/client';
import { normalizeCoach } from '../api/normalizers';
import CoachForm from '../components/CoachForm/CoachForm';
import Modal from '../components/common/Modal/Modal';
import Toast from '../components/common/Toast/Toast';
import LoadingState from '../components/common/LoadingState/LoadingState';
import ErrorState from '../components/common/ErrorState/ErrorState';
import './DetailPage.css';

export default function CoachDetail() {
  const { publicId } = useParams();
  const navigate = useNavigate();
  const [coach, setCoach] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [toast, setToast] = useState({ message: '', type: '' });

  useEffect(() => {
    let isMounted = true;

    async function loadCoach() {
      setLoading(true);
      setError('');

      try {
        const record = await getById('/people/coaches', publicId);
        if (!isMounted) return;
        setCoach(normalizeCoach(record));
      } catch (requestError) {
        if (!isMounted) return;
        setError(requestError.message);
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    loadCoach();

    return () => {
      isMounted = false;
    };
  }, [publicId]);

  async function handleUpdate(formData) {
    setIsSubmitting(true);
    try {
      const updated = await updateResource('/people/coaches', publicId, formData);
      const normalized = normalizeCoach(updated);
      setCoach(normalized);
      setToast({ message: `✓ Coach updated successfully!`, type: 'success' });
      setIsEditing(false);
    } catch (err) {
      setToast({ message: `✕ Failed to update: ${err.message}`, type: 'error' });
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleDelete() {
    setIsDeleting(true);
    try {
      await deleteResource('/people/coaches', publicId);
      setToast({ message: `✓ Coach deleted successfully!`, type: 'success' });
      setTimeout(() => navigate('/coaches'), 1500);
    } catch (err) {
      setToast({ message: `✕ Failed to delete: ${err.message}`, type: 'error' });
    } finally {
      setIsDeleting(false);
      setShowDeleteModal(false);
    }
  }

  if (loading) return <LoadingState label="Loading coach detail..." />;
  if (error) return <ErrorState message={error} />;
  if (!coach) return <ErrorState message="Coach not found" />;

  if (isEditing) {
    return (
      <>
        <CoachForm
          coach={coach}
          onSubmit={handleUpdate}
          onCancel={() => setIsEditing(false)}
          isLoading={isSubmitting}
        />
        <Toast type={toast.type} message={toast.message} onClose={() => setToast({ message: '', type: '' })} />
      </>
    );
  }

  return (
    <>
      <article className="card detail-page">
        <div className="page-header detail-page-header">
          <div className="page-header-info">
            <h1>🏅 {coach.name}</h1>
            <p>Coach profile loaded from /people/coaches/{publicId}</p>
          </div>
          <div className="detail-actions">
            <button className="btn btn-primary" onClick={() => setIsEditing(true)}>✏️ Edit</button>
            <button className="btn btn-danger" onClick={() => setShowDeleteModal(true)}>🗑 Delete</button>
          </div>
        </div>

        <div className="detail-grid">
          <div><strong>Specialty:</strong> {coach.specialty}</div>
          <div><strong>Status:</strong> {coach.status}</div>
          <div><strong>Experience:</strong> {coach.experience}</div>
          <div><strong>Certification:</strong> {coach.certificationLevel}</div>
          <div><strong>Athletes Coached:</strong> {coach.athleteCount}</div>
          <div><strong>Email:</strong> {coach.email}</div>
          <div><strong>Phone:</strong> {coach.phone}</div>
          <div><strong>Age:</strong> {coach.age}</div>
        </div>

        <div className="detail-back">
          <Link className="btn btn-outline" to="/coaches">← Back to Coaches</Link>
        </div>
      </article>

      <Modal
        isOpen={showDeleteModal}
        title="Delete Coach"
        message={`Are you sure you want to delete "${coach.name}"? This action cannot be undone.`}
        confirmText="Delete"
        cancelText="Cancel"
        onConfirm={handleDelete}
        onCancel={() => setShowDeleteModal(false)}
      />

      <Toast type={toast.type} message={toast.message} onClose={() => setToast({ message: '', type: '' })} />
    </>
  );
}
      </div>

      <div className="detail-grid">
        <div><strong>Specialty:</strong> {coach.specialty}</div>
        <div><strong>Status:</strong> {coach.status}</div>
        <div><strong>Experience:</strong> {coach.experience}</div>
        <div><strong>Certification:</strong> {coach.certificationLevel}</div>
        <div><strong>Athletes:</strong> {coach.athleteCount}</div>
        <div><strong>Email:</strong> {coach.email}</div>
        <div><strong>Phone:</strong> {coach.phone}</div>
      </div>

      <div className="detail-back">
        <Link className="btn btn-outline" to="/coaches">← Back to Coaches</Link>
      </div>
    </article>
  );
}
