import { useEffect, useState } from 'react';
import { getList } from '../api/client';
import { normalizeCoach } from '../api/normalizers';
import CoachList from '../components/CoachList/CoachList';
import LoadingState from '../components/common/LoadingState/LoadingState';
import ErrorState from '../components/common/ErrorState/ErrorState';

export default function Coaches() {
  const [coaches, setCoaches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let isMounted = true;

    async function loadCoaches() {
      setLoading(true);
      setError('');

      try {
        const records = await getList('/people/coaches');
        if (!isMounted) return;
        setCoaches(records.map(normalizeCoach));
      } catch (requestError) {
        if (!isMounted) return;
        setError(requestError.message);
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    loadCoaches();

    return () => {
      isMounted = false;
    };
  }, []);

  // Aggregate total athlete load across the coaching staff.
  const totalAthletes = coaches.reduce((sum, c) => sum + c.athleteCount, 0);

  return (
    <div>
      <div className="page-header">
        <div className="page-header-info">
          <h1>🏅 Coaching Staff</h1>
          <p>Our certified coaches guiding athletes to their best performance.</p>
        </div>
      </div>

      <div className="stats-strip">
        <div className="stat-card">
          <div className="stat-value">{coaches.length}</div>
          <div className="stat-label">Total Coaches</div>
        </div>
        <div className="stat-card accent-green">
          <div className="stat-value">{coaches.filter(c => c.status === 'active').length}</div>
          <div className="stat-label">Active</div>
        </div>
        <div className="stat-card accent-gold">
          <div className="stat-value">{totalAthletes}</div>
          <div className="stat-label">Athletes Coached</div>
        </div>
      </div>

      {loading ? <LoadingState label="Loading coaches from API..." /> : null}
      {!loading && error ? <ErrorState message={error} /> : null}
      {!loading && !error ? <CoachList coaches={coaches} /> : null}
    </div>
  );
}
