import { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { getById, updateResource, deleteResource } from '../api/client';
import { normalizeAthlete } from '../api/normalizers';
import AthleteForm from '../components/AthleteForm/AthleteForm';
import Modal from '../components/common/Modal/Modal';
import Toast from '../components/common/Toast/Toast';
import LoadingState from '../components/common/LoadingState/LoadingState';
import ErrorState from '../components/common/ErrorState/ErrorState';
import './DetailPage.css';

export default function AthleteDetail() {
  const { publicId } = useParams();
  const navigate = useNavigate();
  const [athlete, setAthlete] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [toast, setToast] = useState({ message: '', type: '' });

  useEffect(() => {
    let isMounted = true;

    async function loadAthlete() {
      setLoading(true);
      setError('');

      try {
        const record = await getById('/people/athletes', publicId);
        if (!isMounted) return;
        setAthlete(normalizeAthlete(record));
      } catch (requestError) {
        if (!isMounted) return;
        setError(requestError.message);
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    loadAthlete();

    return () => {
      isMounted = false;
    };
  }, [publicId]);

  async function handleUpdate(formData) {
    setIsSubmitting(true);
    try {
      const updated = await updateResource('/people/athletes', publicId, formData);
      const normalized = normalizeAthlete(updated);
      setAthlete(normalized);
      setToast({ message: `✓ Athlete updated successfully!`, type: 'success' });
      setIsEditing(false);
    } catch (err) {
      setToast({ message: `✕ Failed to update: ${err.message}`, type: 'error' });
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleDelete() {
    try {
      await deleteResource('/people/athletes', publicId);
      setToast({ message: `✓ Athlete deleted successfully!`, type: 'success' });
      setTimeout(() => navigate('/athletes'), 1500);
    } catch (err) {
      setToast({ message: `✕ Failed to delete: ${err.message}`, type: 'error' });
    } finally {
      setShowDeleteModal(false);
    }
  }

  if (loading) return <LoadingState label="Loading athlete detail..." />;
  if (error) return <ErrorState message={error} />;
  if (!athlete) return <ErrorState message="Athlete not found" />;

  if (isEditing) {
    return (
      <>
        <AthleteForm
          athlete={athlete}
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
            <h1>🏃 {athlete.name}</h1>
            <p>Athlete profile loaded from /people/athletes/{publicId}</p>
          </div>
          <div className="detail-actions">
            <button className="btn btn-primary" onClick={() => setIsEditing(true)}>✏️ Edit</button>
            <button className="btn btn-danger" onClick={() => setShowDeleteModal(true)}>🗑 Delete</button>
          </div>
        </div>

        <div className="detail-grid">
          <div><strong>Email:</strong> {athlete.email}</div>
          <div><strong>Phone:</strong> {athlete.phone}</div>
          <div><strong>Date of Birth:</strong> {athlete.joinedDate}</div>
          <div><strong>Jersey Number:</strong> {athlete.jerseyNumber ?? 'N/A'}</div>
          <div><strong>Height:</strong> {athlete.height ?? 'N/A'} cm</div>
          <div><strong>Weight:</strong> {athlete.weight ?? 'N/A'} kg</div>
          <div><strong>Address:</strong> {athlete.addressLabel}</div>
        </div>

        <div className="detail-back">
          <Link className="btn btn-outline" to="/athletes">← Back to Athletes</Link>
        </div>
      </article>

      <Modal
        isOpen={showDeleteModal}
        title="Delete Athlete"
        message={`Are you sure you want to delete "${athlete.name}"? This action cannot be undone.`}
        confirmText="Delete"
        cancelText="Cancel"
        onConfirm={handleDelete}
        onCancel={() => setShowDeleteModal(false)}
      />

      <Toast type={toast.type} message={toast.message} onClose={() => setToast({ message: '', type: '' })} />
    </>
  );
}
