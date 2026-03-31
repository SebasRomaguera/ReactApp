import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getById } from '../api/client';
import { normalizeCompetition } from '../api/normalizers';
import LoadingState from '../components/common/LoadingState/LoadingState';
import ErrorState from '../components/common/ErrorState/ErrorState';
import './DetailPage.css';

export default function CompetitionDetail() {
  const { publicId } = useParams();
  const [competition, setCompetition] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let isMounted = true;

    async function loadCompetition() {
      setLoading(true);
      setError('');

      try {
        const record = await getById('/scheduling/competitions', publicId);
        if (!isMounted) return;
        setCompetition(normalizeCompetition(record));
      } catch (requestError) {
        if (!isMounted) return;
        setError(requestError.message);
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    loadCompetition();

    return () => {
      isMounted = false;
    };
  }, [publicId]);

  if (loading) return <LoadingState label="Loading competition detail..." />;
  if (error) return <ErrorState message={error} />;

  return (
    <article className="card detail-page">
      <div className="page-header detail-page-header">
        <div className="page-header-info">
          <h1>🏁 {competition.name}</h1>
          <p>Competition detail loaded from /scheduling/competitions/{publicId}</p>
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
  );
}
