import { useEffect, useMemo, useState } from 'react';
import { getList, createResource } from '../api/client';
import { normalizeTraining, normalizeVenue } from '../api/normalizers';
import ScheduleList from '../components/ScheduleList/ScheduleList';
import TrainingForm from '../components/TrainingForm/TrainingForm';
import LoadingState from '../components/common/LoadingState/LoadingState';
import ErrorState from '../components/common/ErrorState/ErrorState';
import Toast from '../components/common/Toast/Toast';
import './Schedule.css';

export default function Schedule() {
  const [sessions, setSessions] = useState([]);
  const [seasons, setSeasons] = useState([]);
  const [venues, setVenues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [toast, setToast] = useState({ message: '', type: '' });

  useEffect(() => {
    let isMounted = true;

    async function loadTrainings() {
      setLoading(true);
      setError('');

      try {
        const [records, seasonRecords, venueRecords] = await Promise.all([
          getList('/scheduling/trainings'),
          getList('/scheduling/seasons'),
          getList('/inventory/venues'),
        ]);
        if (!isMounted) return;
        setSessions(records.map(normalizeTraining));
        setSeasons(seasonRecords.map(season => ({ publicId: season.public_id, name: season.name })));
        setVenues(venueRecords.map(normalizeVenue));
      } catch (requestError) {
        if (!isMounted) return;
        setError(requestError.message);
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    loadTrainings();

    return () => {
      isMounted = false;
    };
  }, []);

  async function handleCreateTraining(formData) {
    setSubmitting(true);
    try {
      const newTraining = await createResource('/scheduling/trainings', formData);
      const normalized = normalizeTraining(newTraining);
      setSessions(prev => [normalized, ...prev]);
      setToast({ message: `✓ Session "${normalized.name}" created successfully!`, type: 'success' });
      setShowForm(false);
    } catch (err) {
      setToast({ message: `✕ Failed to create session: ${err.message}`, type: 'error' });
    } finally {
      setSubmitting(false);
    }
  }

  const displayed = useMemo(() => sessions, [sessions]);
  const withVenue = sessions.filter(s => s.venuePublicId).length;
  const withAthletes = sessions.filter(s => s.athletePublicIds.length > 0).length;
  const withCoaches = sessions.filter(s => s.coachPublicIds.length > 0).length;

  return (
    <div>
      <div className="page-header">
        <div className="page-header-info">
          <h1>📅 Training Schedule</h1>
          <p>Upcoming sessions, competitions, and recovery days.</p>
        </div>
        <button className="btn btn-gold" onClick={() => setShowForm(!showForm)}>
          {showForm ? '✕ Close Form' : '➕ Create Session'}
        </button>
      </div>

      {/* Form */}
      {showForm && (
        <TrainingForm
          seasons={seasons}
          venues={venues}
          onSubmit={handleCreateTraining}
          onCancel={() => setShowForm(false)}
          isLoading={submitting}
        />
      )}

      <div className="stats-strip">
        <div className="stat-card">
          <div className="stat-value">{sessions.length}</div>
          <div className="stat-label">Total Sessions</div>
        </div>
        <div className="stat-card accent-gold">
          <div className="stat-value">{withVenue}</div>
          <div className="stat-label">With Venue</div>
        </div>
        <div className="stat-card accent-red">
          <div className="stat-value">{withAthletes}</div>
          <div className="stat-label">With Athletes</div>
        </div>
        <div className="stat-card accent-green">
          <div className="stat-value">{withCoaches}</div>
          <div className="stat-label">With Coaches</div>
        </div>
      </div>

      <div className="schedule-filters">
        <span className="filter-count">{displayed.length} session{displayed.length !== 1 ? 's' : ''}</span>
      </div>

      {loading ? <LoadingState label="Loading training schedule from API..." /> : null}
      {!loading && error ? <ErrorState message={error} /> : null}
      {!loading && !error ? <ScheduleList sessions={displayed} /> : null}

      <Toast
        type={toast.type}
        message={toast.message}
        onClose={() => setToast({ message: '', type: '' })}
      />
    </div>
  );
}
