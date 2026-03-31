export default function ErrorState({ title = 'Unable to load data', message, onRetry }) {
  return (
    <section className="empty-state" role="alert">
      <p><strong>{title}</strong></p>
      {message ? <p>{message}</p> : null}
      {onRetry ? (
        <button className="btn btn-outline btn-sm" onClick={onRetry}>
          Try again
        </button>
      ) : null}
    </section>
  );
}
