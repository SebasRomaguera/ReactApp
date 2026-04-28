import { useState } from 'react';
import './CompetitionForm.css';

const EMPTY_FORM = {
  name: '',
  date: '',
  status: 'scheduled',
  venue: '',
  season: '',
  category: '',
  description: '',
};

const STATUSES = ['scheduled', 'finished', 'cancelled'];

export default function CompetitionForm({ competition = null, onSubmit, onCancel, isLoading = false }) {
  const [form, setForm] = useState(competition ? {
    name: competition.name || '',
    date: competition.date || '',
    status: competition.status || 'scheduled',
    venue: competition.venue || '',
    season: competition.season || '',
    category: competition.category || '',
    description: competition.description || '',
  } : EMPTY_FORM);

  const [errors, setErrors] = useState({});

  function validateForm() {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = 'Event name is required';
    if (!form.date) newErrors.date = 'Date is required';
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
    onSubmit(form);
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
          <label htmlFor="status">Status</label>
          <select
            id="status"
            name="status"
            value={form.status}
            onChange={handleChange}
            disabled={isLoading}
          >
            {STATUSES.map(s => (
              <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="venue">Venue</label>
          <input
            id="venue"
            name="venue"
            value={form.venue}
            onChange={handleChange}
            placeholder="e.g. Stadio Olimpico"
            disabled={isLoading}
          />
        </div>

        <div className="form-group">
          <label htmlFor="season">Season</label>
          <input
            id="season"
            name="season"
            value={form.season}
            onChange={handleChange}
            placeholder="e.g. Spring 2024"
            disabled={isLoading}
          />
        </div>

        <div className="form-group">
          <label htmlFor="category">Category</label>
          <input
            id="category"
            name="category"
            value={form.category}
            onChange={handleChange}
            placeholder="e.g. U18, Open, Masters"
            disabled={isLoading}
          />
        </div>

        <div className="form-group full-width">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            placeholder="Event details and notes..."
            value={form.description}
            onChange={handleChange}
            disabled={isLoading}
            rows="4"
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
