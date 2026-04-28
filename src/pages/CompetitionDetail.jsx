import { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { getById, getList, updateResource, deleteResource, createResource } from '../api/client';
import { normalizeCompetition, normalizeAthlete } from '../api/normalizers';
import CompetitionForm from '../components/CompetitionForm/CompetitionForm';
import EnrollmentForm from '../components/EnrollmentForm/EnrollmentForm';
import Modal from '../components/common/Modal/Modal';
import Toast from '../components/common/Toast/Toast';
import LoadingState from '../components/common/LoadingState/LoadingState';
import ErrorState from '../components/common/ErrorState/ErrorState';
import './DetailPage.css';

export default function CompetitionDetail() {
  const { publicId } = useParams();
  const navigate = useNavigate();
  const [competition, setCompetition] = useState(null);
  const [athletes, setAthletes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [isEnrolling, setIsEnrolling] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [toast, setToast] = useState({ message: '', type: '' });

  useEffect(() => {
    let isMounted = true;

    async function loadData() {
      setLoading(true);
      setError('');

      try {
        const [compRecord, athletesRecords] = await Promise.all([
          getById('/scheduling/competitions', publicId),
          getList('/people/athletes')
        ]);
        
        if (!isMounted) return;
        setCompetition(normalizeCompetition(compRecord));
        setAthletes(athletesRecords.map(normalizeAthlete));
      } catch (requestError) {
        if (!isMounted) return;
        setError(requestError.message);
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    loadData();

    return () => {
      isMounted = false;
    };
  }, [publicId]);

  async function handleUpdate(formData) {
    setIsSubmitting(true);
    try {
      const updated = await updateResource('/scheduling/competitions', publicId, formData);
      const normalized = normalizeCompetition(updated);
      setCompetition(normalized);
      setToast({ message: `✓ Competition updated successfully!`, type: 'success' });
      setIsEditing(false);
    } catch (err) {
      setToast({ message: `✕ Failed to update: ${err.message}`, type: 'error' });
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleEnroll(formData) {
    setIsSubmitting(true);
    try {
      await createResource(`/scheduling/competitions/${publicId}/enrollments`, formData);
      setToast({ message: `✓ Athlete enrolled successfully!`, type: 'success' });
      setIsEnrolling(false);
    } catch (err) {
      setToast({ message: `✕ Failed to enroll: ${err.message}`, type: 'error' });
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleDelete() {
    setIsDeleting(true);
    try {
      await deleteResource('/scheduling/competitions', publicId);
      setToast({ message: `✓ Competition deleted successfully!`, type: 'success' });
      setTimeout(() => navigate('/competitions'), 1500);
    } catch (err) {
      setToast({ message: `✕ Failed to delete: ${err.message}`, type: 'error' });
    } finally {
      setIsDeleting(false);
      setShowDeleteModal(false);
    }
  }

  if (loading) return <LoadingState label="Loading competition detail..." />;
  if (error) return <ErrorState message={error} />;
  if (!competition) return <ErrorState message="Competition not found" />;

  if (isEditing) {
    return (
      <>
        <CompetitionForm
          competition={competition}
          onSubmit={handleUpdate}
          onCancel={() => setIsEditing(false)}
          isLoading={isSubmitting}
        />
        <Toast type={toast.type} message={toast.message} onClose={() => setToast({ message: '', type: '' })} />
      </>
    );
  }

  if (isEnrolling) {
    return (
      <>
        <EnrollmentForm
          competition={competition}
          availableAthletes={athletes}
          onSubmit={handleEnroll}
          onCancel={() => setIsEnrolling(false)}
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
            <h1>🏁 {competition.name}</h1>
            <p>Competition detail loaded from /scheduling/competitions/{publicId}</p>
          </div>
          <div className="detail-actions">
            <button className="btn btn-secondary" onClick={() => setIsEnrolling(true)}>🏃 Enroll Athlete</button>
            <button className="btn btn-primary" onClick={() => setIsEditing(true)}>✏️ Edit</button>
            <button className="btn btn-danger" onClick={() => setShowDeleteModal(true)}>🗑 Delete</button>
          </div>
        </div>

        <div className="detail-grid">
          <div><strong>Date:</strong> {competition.date}</div>
          <div><strong>Status:</strong> {competition.status}</div>
          <div><strong>Venue:</strong> {competition.venue}</div>
          <div><strong>Season:</strong> {competition.season}</div>
          <div><strong>Category:</strong> {competition.category}</div>
        </div>

        <p className="detail-description">{competition.description}</p>

        <div className="detail-back">
          <Link className="btn btn-outline" to="/competitions">← Back to Competitions</Link>
        </div>
      </article>

      <Modal
        isOpen={showDeleteModal}
        title="Delete Competition"
        message={`Are you sure you want to delete "${competition.name}"? This action cannot be undone.`}
        confirmText="Delete"
        cancelText="Cancel"
        onConfirm={handleDelete}
        onCancel={() => setShowDeleteModal(false)}
      />

      <Toast type={toast.type} message={toast.message} onClose={() => setToast({ message: '', type: '' })} />
    </>
  );
}
