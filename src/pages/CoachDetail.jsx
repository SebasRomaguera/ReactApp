import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getById } from '../api/client';
import { normalizeCoach } from '../api/normalizers';
import LoadingState from '../components/common/LoadingState/LoadingState';
import ErrorState from '../components/common/ErrorState/ErrorState';
import './DetailPage.css';

export default function CoachDetail() {
  const { publicId } = useParams();
  const [coach, setCoach] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let isMounted = true;

    async function loadCoach() {
      setLoading(true);
      setError('');

      try {
        const record = await getById('/people/coaches', publicId);
        if (!isMounted) return;
        setCoach(normalizeCoach(record));
      } catch (requestError) {
        if (!isMounted) return;
        setError(requestError.message);
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    loadCoach();

    return () => {
      isMounted = false;
    };
  }, [publicId]);

  if (loading) return <LoadingState label="Loading coach detail..." />;
  if (error) return <ErrorState message={error} />;

  return (
    <article className="card detail-page">
      <div className="page-header detail-page-header">
        <div className="page-header-info">
          <h1>🏅 {coach.name}</h1>
          <p>Coach profile loaded from /people/coaches/{publicId}</p>
        </div>
      </div>

      <div className="detail-grid">
        <div><strong>Specialty:</strong> {coach.specialty}</div>
        <div><strong>Status:</strong> {coach.status}</div>
        <div><strong>Experience:</strong> {coach.experience}</div>
        <div><strong>Certification:</strong> {coach.certificationLevel}</div>
        <div><strong>Athletes:</strong> {coach.athleteCount}</div>
        <div><strong>Email:</strong> {coach.email}</div>
        <div><strong>Phone:</strong> {coach.phone}</div>
      </div>

      <div className="detail-back">
        <Link className="btn btn-outline" to="/coaches">← Back to Coaches</Link>
      </div>
    </article>
  );
}
