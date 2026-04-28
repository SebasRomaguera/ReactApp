import { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { getById, updateResource, deleteResource } from '../api/client';
import VenueForm from '../components/VenueForm/VenueForm';
import Modal from '../components/common/Modal/Modal';
import Toast from '../components/common/Toast/Toast';
import LoadingState from '../components/common/LoadingState/LoadingState';
import ErrorState from '../components/common/ErrorState/ErrorState';
import './DetailPage.css';

export default function VenueDetail() {
  const { publicId } = useParams();
  const navigate = useNavigate();
  const [venue, setVenue] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [toast, setToast] = useState({ message: '', type: '' });

  useEffect(() => {
    let isMounted = true;

    async function loadVenue() {
      setLoading(true);
      setError('');

      try {
        const record = await getById('/locations/venues', publicId);
        if (!isMounted) return;
        setVenue(record);
      } catch (requestError) {
        if (!isMounted) return;
        setError(requestError.message);
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    loadVenue();

    return () => {
      isMounted = false;
    };
  }, [publicId]);

  async function handleUpdate(formData) {
    setIsSubmitting(true);
    try {
      const updated = await updateResource('/locations/venues', publicId, formData);
      setVenue(updated);
      setToast({ message: `✓ Venue updated successfully!`, type: 'success' });
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
      await deleteResource('/locations/venues', publicId);
      setToast({ message: `✓ Venue deleted successfully!`, type: 'success' });
      setTimeout(() => navigate('/venues'), 1500);
    } catch (err) {
      setToast({ message: `✕ Failed to delete: ${err.message}`, type: 'error' });
    } finally {
      setIsDeleting(false);
      setShowDeleteModal(false);
    }
  }

  if (loading) return <LoadingState label="Loading venue detail..." />;
  if (error) return <ErrorState message={error} />;
  if (!venue) return <ErrorState message="Venue not found" />;

  if (isEditing) {
    return (
      <>
        <VenueForm
          venue={venue}
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
            <h1>📍 {venue.name}</h1>
            <p>Venue detail loaded from /locations/venues/{publicId}</p>
          </div>
          <div className="detail-actions">
            <button className="btn btn-primary" onClick={() => setIsEditing(true)}>✏️ Edit</button>
            <button className="btn btn-danger" onClick={() => setShowDeleteModal(true)}>🗑 Delete</button>
          </div>
        </div>

        <div className="detail-grid">
          <div><strong>City:</strong> {venue.city}</div>
          <div><strong>Country:</strong> {venue.country}</div>
          <div><strong>Capacity:</strong> {venue.capacity}</div>
          <div><strong>Surface Type:</strong> {venue.surface_type}</div>
        </div>

        <div className="detail-back">
          <Link className="btn btn-outline" to="/venues">← Back to Venues</Link>
        </div>
      </article>

      <Modal
        isOpen={showDeleteModal}
        title="Delete Venue"
        message={`Are you sure you want to delete "${venue.name}"? This action cannot be undone.`}
        confirmText="Delete"
        cancelText="Cancel"
        onConfirm={handleDelete}
        onCancel={() => setShowDeleteModal(false)}
      />

      <Toast type={toast.type} message={toast.message} onClose={() => setToast({ message: '', type: '' })} />
    </>
  );
}
