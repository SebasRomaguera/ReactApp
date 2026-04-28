import { useEffect, useState } from 'react';
import { getList, createResource } from '../api/client';
import { normalizeVenue } from '../api/normalizers';
import VenueList from '../components/VenueList/VenueList';
import VenueForm from '../components/VenueForm/VenueForm';
import LoadingState from '../components/common/LoadingState/LoadingState';
import ErrorState from '../components/common/ErrorState/ErrorState';
import Toast from '../components/common/Toast/Toast';
import './Venues.css';

export default function Venues() {
  const [venues, setVenues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [toast, setToast] = useState({ message: '', type: '' });

  useEffect(() => {
    let isMounted = true;

    async function loadVenues() {
      setLoading(true);
      setError('');

      try {
        const records = await getList('/inventory/venues');
        if (!isMounted) return;
        setVenues(records.map(normalizeVenue));
      } catch (requestError) {
        if (!isMounted) return;
        setError(requestError.message);
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    loadVenues();

    return () => {
      isMounted = false;
    };
  }, []);

  async function handleCreateVenue(formData) {
    setSubmitting(true);
    try {
      const newVenue = await createResource('/inventory/venues', formData);
      const normalized = normalizeVenue(newVenue);
      setVenues(prev => [normalized, ...prev]);
      setToast({ message: `✓ Venue "${normalized.name}" created successfully!`, type: 'success' });
      setShowForm(false);
    } catch (err) {
      setToast({ message: `✕ Failed to create venue: ${err.message}`, type: 'error' });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div>
      <div className="page-header">
        <div className="page-header-info">
          <h1>📍 Training Venues</h1>
          <p>Manage all club training facilities and venues.</p>
        </div>
        <button className="btn btn-gold" onClick={() => setShowForm(!showForm)}>
          {showForm ? '✕ Close Form' : '➕ Add Venue'}
        </button>
      </div>

      {/* Form */}
      {showForm && (
        <VenueForm
          onSubmit={handleCreateVenue}
          onCancel={() => setShowForm(false)}
          isLoading={submitting}
        />
      )}

      <div className="stats-strip">
        <div className="stat-card">
          <div className="stat-value">{venues.length}</div>
          <div className="stat-label">Total Venues</div>
        </div>
      </div>

      {loading ? <LoadingState label="Loading venues from API..." /> : null}
      {!loading && error ? <ErrorState message={error} /> : null}
      {!loading && !error && venues.length > 0 ? <VenueList venues={venues} /> : null}
      {!loading && !error && venues.length === 0 ? <ErrorState message="No venues found. Create one to get started!" /> : null}

      <Toast
        type={toast.type}
        message={toast.message}
        onClose={() => setToast({ message: '', type: '' })}
      />
    </div>
  );
}
