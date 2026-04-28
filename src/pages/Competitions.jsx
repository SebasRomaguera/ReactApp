import { useEffect, useMemo, useState } from 'react';
import { getList, createResource } from '../api/client';
import { normalizeCompetition } from '../api/normalizers';
import CompetitionList from '../components/CompetitionList/CompetitionList';
import CompetitionForm from '../components/CompetitionForm/CompetitionForm';
import LoadingState from '../components/common/LoadingState/LoadingState';
import ErrorState from '../components/common/ErrorState/ErrorState';
import Toast from '../components/common/Toast/Toast';
import './Competitions.css';

const COMPETITION_FILTERS = ['all', 'scheduled', 'finished', 'cancelled'];

export default function Competitions() {
  const [competitions, setCompetitions] = useState([]);
  const [seasons, setSeasons] = useState([]);
  const [statusFilter, setStatusFilter] = useState('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [toast, setToast] = useState({ message: '', type: '' });

  useEffect(() => {
    let isMounted = true;

    async function loadCompetitions() {
      setLoading(true);
      setError('');

      try {
        const [competitionRecords, seasonRecords] = await Promise.all([
          getList('/scheduling/competitions'),
          getList('/scheduling/seasons'),
        ]);
        if (!isMounted) return;
        setCompetitions(competitionRecords.map(normalizeCompetition));
        setSeasons(seasonRecords.map(season => ({
          publicId: season.public_id,
          name: season.name,
        })));
      } catch (requestError) {
        if (!isMounted) return;
        setError(requestError.message);
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    loadCompetitions();

    return () => {
      isMounted = false;
    };
  }, []);

  async function handleCreateCompetition(formData) {
    setSubmitting(true);
    try {
      const newCompetition = await createResource('/scheduling/competitions', formData);
      const normalized = normalizeCompetition(newCompetition);
      setCompetitions(prev => [normalized, ...prev]);
      setToast({ message: `✓ Competition "${normalized.name}" created successfully!`, type: 'success' });
      setShowForm(false);
    } catch (err) {
      setToast({ message: `✕ Failed to create competition: ${err.message}`, type: 'error' });
    } finally {
      setSubmitting(false);
    }
  }

  const displayed = useMemo(() => {
    return competitions.filter(item => statusFilter === 'all' || item.status === statusFilter);
  }, [competitions, statusFilter]);

  return (
    <div>
      <div className="page-header">
        <div className="page-header-info">
          <h1>🏟 Competitions</h1>
          <p>Read upcoming and historical competitions from the REST API.</p>
        </div>
        <button className="btn btn-gold" onClick={() => setShowForm(!showForm)}>
          {showForm ? '✕ Close Form' : '➕ Create Competition'}
        </button>
      </div>

      {/* Form */}
      {showForm && (
        <CompetitionForm
          seasons={seasons}
          onSubmit={handleCreateCompetition}
          onCancel={() => setShowForm(false)}
          isLoading={submitting}
        />
      )}

      <div className="stats-strip">
        <div className="stat-card">
          <div className="stat-value">{competitions.length}</div>
          <div className="stat-label">Total Competitions</div>
        </div>
        <div className="stat-card accent-gold">
          <div className="stat-value">{competitions.filter(c => c.status === 'scheduled').length}</div>
          <div className="stat-label">Scheduled</div>
        </div>
        <div className="stat-card accent-green">
          <div className="stat-value">{competitions.filter(c => c.status === 'finished').length}</div>
          <div className="stat-label">Finished</div>
        </div>
        <div className="stat-card accent-red">
          <div className="stat-value">{competitions.filter(c => c.status === 'cancelled').length}</div>
          <div className="stat-label">Cancelled</div>
        </div>
      </div>

      <div className="competitions-filters">
        {COMPETITION_FILTERS.map(filter => (
          <button
            key={filter}
            className={`filter-pill ${statusFilter === filter ? 'active' : ''}`}
            onClick={() => setStatusFilter(filter)}
          >
            {filter.charAt(0).toUpperCase() + filter.slice(1)}
          </button>
        ))}
        <span className="filter-count">{displayed.length} result{displayed.length !== 1 ? 's' : ''}</span>
      </div>

      {loading ? <LoadingState label="Loading competitions from API..." /> : null}
      {!loading && error ? <ErrorState message={error} /> : null}
      {!loading && !error ? <CompetitionList competitions={displayed} /> : null}

      <Toast
        type={toast.type}
        message={toast.message}
        onClose={() => setToast({ message: '', type: '' })}
      />
    </div>
  );
}
