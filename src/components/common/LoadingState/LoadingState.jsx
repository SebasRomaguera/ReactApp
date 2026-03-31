import './LoadingState.css';

export default function LoadingState({ label = 'Loading data...' }) {
  return (
    <div className="loading-state" role="status" aria-live="polite">
      <span className="loading-spinner" aria-hidden="true" />
      <p>{label}</p>
    </div>
  );
}
