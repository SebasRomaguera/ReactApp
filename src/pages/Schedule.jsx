import { useEffect, useMemo, useState } from 'react';
import { getList, createResource } from '../api/client';
import { normalizeTraining } from '../api/normalizers';
import ScheduleList from '../components/ScheduleList/ScheduleList';
import TrainingForm from '../components/TrainingForm/TrainingForm';
import LoadingState from '../components/common/LoadingState/LoadingState';
import ErrorState from '../components/common/ErrorState/ErrorState';
import Toast from '../components/common/Toast/Toast';
import './Schedule.css';

const SESSION_TYPES = ['all', 'training', 'competition', 'recovery'];

export default function Schedule() {
  const [sessions, setSessions] = useState([]);
  const [typeFilter, setType] = useState('all');
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
        const records = await getList('/scheduling/trainings');
        if (!isMounted) return;
        setSessions(records.map(normalizeTraining));
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
      setToast({ message: `✓ Session "${normalized.title}" created successfully!`, type: 'success' });
      setShowForm(false);
    } catch (err) {
      setToast({ message: `✕ Failed to create session: ${err.message}`, type: 'error' });
    } finally {
      setSubmitting(false);
    }
  }

  // Derived list shown in UI according to the selected session type.
  const displayed = useMemo(() => {
    return sessions.filter(s => typeFilter === 'all' || s.type === typeFilter);
  }, [sessions, typeFilter]);

  // Dashboard counters are computed from the full dataset, not the filtered subset.
  const competitions = sessions.filter(s => s.type === 'competition').length;
  const trainings    = sessions.filter(s => s.type === 'training').length;
  const recoveries   = sessions.filter(s => s.type === 'recovery').length;

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
          <div className="stat-value">{trainings}</div>
          <div className="stat-label">Training</div>
        </div>
        <div className="stat-card accent-red">
          <div className="stat-value">{competitions}</div>
          <div className="stat-label">Competitions</div>
        </div>
        <div className="stat-card accent-green">
          <div className="stat-value">{recoveries}</div>
          <div className="stat-label">Recovery</div>
        </div>
      </div>

      <div className="schedule-filters">
        {SESSION_TYPES.map(t => (
          <button
            key={t}
            className={`filter-pill ${typeFilter === t ? 'active' : ''}`}
            onClick={() => setType(t)}
          >
            {t.charAt(0).toUpperCase() + t.slice(1)}
          </button>
        ))}
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
