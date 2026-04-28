import { useState } from 'react';
import './TrainingForm.css';

const EMPTY_FORM = {
  name: '',
  date: '',
  season_public_id: '',
  venue_public_id: '',
  focus: '',
  coach_public_ids: [],
  athlete_public_ids: [],
};

export default function TrainingForm({ training = null, seasons = [], venues = [], onSubmit, onCancel, isLoading = false }) {
  const [form, setForm] = useState(training ? {
    name: training.name || '',
    date: String(training.date || '').slice(0, 10),
    season_public_id: training.seasonPublicId || '',
    venue_public_id: training.venuePublicId || '',
    focus: training.focus || '',
    coach_public_ids: training.coachPublicIds || [],
    athlete_public_ids: training.athletePublicIds || [],
  } : EMPTY_FORM);

  const [errors, setErrors] = useState({});

  function validateForm() {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = 'Name is required';
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
      date: `${form.date}T00:00:00Z`,
      venue_public_id: form.venue_public_id || null,
    });
  }

  const title = training ? '✏️ Edit Session' : '➕ Add Training Session';
  const submitLabel = training ? 'Update' : 'Create';

  return (
    <form className="training-form card" onSubmit={handleSubmit}>
      <h3 className="form-heading">{title}</h3>
      
      <div className="form-grid">
        <div className="form-group">
          <label htmlFor="name">Session Name *</label>
          <input
            id="name"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="e.g. Sprint Training"
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
          <label htmlFor="season_public_id">Season *</label>
          <select
            id="season_public_id"
            name="season_public_id"
            value={form.season_public_id}
            onChange={handleChange}
            disabled={isLoading}
            className={errors.season_public_id ? 'error' : ''}
          >
            <option value="">Select season</option>
            {seasons.map(season => (
              <option key={season.publicId || season.id} value={season.publicId || season.id}>
                {season.name}
              </option>
            ))}
          </select>
          {errors.season_public_id && <span className="error-text">{errors.season_public_id}</span>}
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

        <div className="form-group full-width">
          <label htmlFor="focus">Focus</label>
          <input
            id="focus"
            name="focus"
            placeholder="e.g. Sprint technique"
            value={form.focus}
            onChange={handleChange}
            disabled={isLoading}
          />
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
