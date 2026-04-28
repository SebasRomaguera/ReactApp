import { useState } from 'react';
import './CompetitionForm.css';

const EMPTY_FORM = {
  name: '',
  date: '',
  venue_public_id: '',
  season_public_id: '',
  coach_public_ids: [],
  athlete_public_ids: [],
};

function toDateInputValue(value) {
  if (!value) return '';
  return String(value).slice(0, 10);
}

function toApiDate(value) {
  if (!value) return null;
  return `${value}T00:00:00Z`;
}

export default function CompetitionForm({ competition = null, seasons = [], venues = [], onSubmit, onCancel, isLoading = false }) {
  const [form, setForm] = useState(competition ? {
    name: competition.name || '',
    date: toDateInputValue(competition.date),
    venue_public_id: competition.venuePublicId || '',
    season_public_id: competition.seasonPublicId || '',
    coach_public_ids: competition.coachPublicIds || [],
    athlete_public_ids: competition.athletePublicIds || [],
  } : EMPTY_FORM);

  const [errors, setErrors] = useState({});

  function validateForm() {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = 'Event name is required';
    if (!form.date) newErrors.date = 'Date is required';
    if (!form.season_public_id) newErrors.season_public_id = 'Season is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!validateForm()) return;
    onSubmit({
      ...form,
      date: toApiDate(form.date),
      venue_public_id: form.venue_public_id || null,
    });
  }

  const title = competition ? '✏️ Edit Competition' : '➕ Add Competition';
  const submitLabel = competition ? 'Update' : 'Create';

  return (
    <form className="competition-form card" onSubmit={handleSubmit}>
      <h3 className="form-heading">{title}</h3>
      
      <div className="form-grid">
        <div className="form-group">
          <label htmlFor="name">Event Name *</label>
          <input
            id="name"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="e.g. National Sprint Championship"
            disabled={isLoading}
            className={errors.name ? 'error' : ''}
          />
          {errors.name && <span className="error-text">{errors.name}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="date">Date *</label>
          <input
            id="date"
            name="date"
            type="date"
            value={form.date}
            onChange={handleChange}
            disabled={isLoading}
            className={errors.date ? 'error' : ''}
          />
          {errors.date && <span className="error-text">{errors.date}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="venue_public_id">Venue</label>
          <select
            id="venue_public_id"
            name="venue_public_id"
            value={form.venue_public_id}
            onChange={handleChange}
            disabled={isLoading}
          >
            <option value="">No venue</option>
            {venues.map(venue => (
              <option key={venue.publicId || venue.id} value={venue.publicId || venue.id}>
                {venue.name}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="season_public_id">Season *</label>
          <select
            id="season_public_id"
            name="season_public_id"
            value={form.season_public_id}
            onChange={handleChange}
            disabled={isLoading || seasons.length === 0}
            className={errors.season_public_id ? 'error' : ''}
          >
            <option value="">Select a season</option>
            {seasons.map(season => (
              <option key={season.publicId || season.id} value={season.publicId || season.id}>
                {season.name}
              </option>
            ))}
          </select>
          {errors.season_public_id && <span className="error-text">{errors.season_public_id}</span>}
        </div>

      </div>

      <div className="form-actions">
        <button type="submit" className="btn btn-primary" disabled={isLoading}>
          {isLoading ? 'Processing...' : submitLabel}
        </button>
        <button type="button" className="btn btn-outline" onClick={onCancel} disabled={isLoading}>
          Cancel
        </button>
      </div>
    </form>
  );
}
