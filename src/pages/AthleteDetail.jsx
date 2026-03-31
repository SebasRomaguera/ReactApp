import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getById } from '../api/client';
import { normalizeAthlete } from '../api/normalizers';
import LoadingState from '../components/common/LoadingState/LoadingState';
import ErrorState from '../components/common/ErrorState/ErrorState';
import './DetailPage.css';

export default function AthleteDetail() {
  const { publicId } = useParams();
  const [athlete, setAthlete] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

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

  if (loading) return <LoadingState label="Loading athlete detail..." />;
  if (error) return <ErrorState message={error} />;

  return (
    <article className="card detail-page">
      <div className="page-header detail-page-header">
        <div className="page-header-info">
          <h1>🏃 {athlete.name}</h1>
          <p>Athlete profile loaded from /people/athletes/{publicId}</p>
        </div>
      </div>

      <div className="detail-grid">
        <div><strong>Event:</strong> {athlete.event}</div>
        <div><strong>Category:</strong> {athlete.category}</div>
        <div><strong>Status:</strong> {athlete.status}</div>
        <div><strong>Personal Best:</strong> {athlete.personalBest}</div>
        <div><strong>Age:</strong> {athlete.age}</div>
        <div><strong>Nationality:</strong> {athlete.nationality}</div>
        <div><strong>Joined:</strong> {athlete.joinedDate}</div>
      </div>

      <div className="detail-back">
        <Link className="btn btn-outline" to="/athletes">← Back to Athletes</Link>
      </div>
    </article>
  );
}
