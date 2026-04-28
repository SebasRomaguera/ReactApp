import { useEffect, useMemo, useState } from 'react';
import { getList, createResource } from '../api/client';
import { normalizeAthlete } from '../api/normalizers';
import AthleteList from '../components/AthleteList/AthleteList';
import AthleteForm from '../components/AthleteForm/AthleteForm';
import LoadingState from '../components/common/LoadingState/LoadingState';
import ErrorState from '../components/common/ErrorState/ErrorState';
import Toast from '../components/common/Toast/Toast';
import './Athletes.css';

export default function Athletes() {
  const [athletes, setAthletes]       = useState([]);
  const [filterStatus, setFilter]     = useState('all');
  const [filterCategory, setCategory] = useState('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [toast, setToast] = useState({ message: '', type: '' });

  useEffect(() => {
    let isMounted = true;

    async function loadAthletes() {
      setLoading(true);
      setError('');

      try {
        const records = await getList('/people/athletes');
        if (!isMounted) return;
        setAthletes(records.map(normalizeAthlete));
      } catch (requestError) {
        if (!isMounted) return;
        setError(requestError.message);
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    loadAthletes();

    return () => {
      isMounted = false;
    };
  }, []);

  async function handleCreateAthlete(formData) {
    setSubmitting(true);
    try {
      const newAthlete = await createResource('/people/athletes', formData);
      const normalized = normalizeAthlete(newAthlete);
      setAthletes(prev => [normalized, ...prev]);
      setToast({ message: `✓ Athlete "${normalized.name}" created successfully!`, type: 'success' });
      setShowForm(false);
    } catch (err) {
      setToast({ message: `✕ Failed to create athlete: ${err.message}`, type: 'error' });
    } finally {
      setSubmitting(false);
    }
  }

  const categories = useMemo(() => {
    return [...new Set(athletes.map(a => a.category).filter(Boolean))];
  }, [athletes]);

  // Visible list is derived state: only athletes matching both active filters.
  const displayed = athletes.filter(a => {
    const statusOk   = filterStatus === 'all'   || a.status === filterStatus;
    const categoryOk = filterCategory === 'all' || a.category === filterCategory;
    return statusOk && categoryOk;
  });

  const activeCount = athletes.filter(a => a.status === 'active').length;

  return (
    <div>
      {/* Page header */}
      <div className="page-header">
        <div className="page-header-info">
          <h1>🏃 Athlete Roster</h1>
          <p>Manage all registered athletes in the club.</p>
        </div>
        <button className="btn btn-gold" onClick={() => setShowForm(!showForm)}>
          {showForm ? '✕ Close Form' : '➕ Add Athlete'}
        </button>
      </div>

      {/* Form */}
      {showForm && (
        <AthleteForm
          onSubmit={handleCreateAthlete}
          onCancel={() => setShowForm(false)}
          isLoading={submitting}
        />
      )}

      {/* Stats */}
      <div className="stats-strip">
        <div className="stat-card">
          <div className="stat-value">{athletes.length}</div>
          <div className="stat-label">Total Athletes</div>
        </div>
        <div className="stat-card accent-green">
          <div className="stat-value">{activeCount}</div>
          <div className="stat-label">Active</div>
        </div>
        <div className="stat-card accent-red">
          <div className="stat-value">{athletes.length - activeCount}</div>
          <div className="stat-label">Inactive</div>
        </div>
        <div className="stat-card accent-gold">
          <div className="stat-value">{categories.length}</div>
          <div className="stat-label">Categories</div>
        </div>
      </div>

      {/* Filters */}
      <div className="athletes-filters">
        <div className="form-group filter-group">
          <label htmlFor="filter-status">Status</label>
          <select id="filter-status" value={filterStatus} onChange={e => setFilter(e.target.value)}>
            <option value="all">All</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
        <div className="form-group filter-group">
          <label htmlFor="filter-cat">Category</label>
          <select id="filter-cat" value={filterCategory} onChange={e => setCategory(e.target.value)}>
            <option value="all">All</option>
            {categories.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
        <span className="filter-count">{displayed.length} result{displayed.length !== 1 ? 's' : ''}</span>
      </div>

      {loading ? <LoadingState label="Loading athletes from API..." /> : null}
      {!loading && error ? <ErrorState message={error} /> : null}
      {!loading && !error ? <AthleteList athletes={displayed} /> : null}

      <Toast
        type={toast.type}
        message={toast.message}
        onClose={() => setToast({ message: '', type: '' })}
      />
    </div>
  );
}
