import { useState } from 'react';
import './VenueForm.css';

const EMPTY_FORM = {
  name: '',
  venue_type: 'FIELD',
  capacity: '',
  indoor: false,
};

const VENUE_TYPES = ['stadium', 'gymnasium', 'TRACK', 'FIELD'];

export default function VenueForm({ venue = null, onSubmit, onCancel, isLoading = false }) {
  const [form, setForm] = useState(venue ? {
    name: venue.name || '',
    venue_type: venue.venue_type || 'FIELD',
    capacity: venue.capacity || '',
    indoor: Boolean(venue.indoor),
  } : EMPTY_FORM);

  const [errors, setErrors] = useState({});

  function validateForm() {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = 'Venue name is required';
    if (form.capacity && (isNaN(form.capacity) || form.capacity < 0)) {
      newErrors.capacity = 'Capacity must be a valid number';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    if (type === 'checkbox') {
      setForm(prev => ({ ...prev, [name]: checked }));
    }
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!validateForm()) return;
    onSubmit({
      ...form,
      capacity: form.capacity === '' ? null : Number(form.capacity),
    });
  }

  const title = venue ? '✏️ Edit Venue' : '➕ Add Venue';
  const submitLabel = venue ? 'Update' : 'Create';

  return (
    <form className="venue-form card" onSubmit={handleSubmit}>
      <h3 className="form-heading">{title}</h3>
      
      <div className="form-grid">
        <div className="form-group">
          <label htmlFor="name">Venue Name *</label>
          <input
            id="name"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="e.g. Olympic Stadium"
            disabled={isLoading}
            className={errors.name ? 'error' : ''}
          />
          {errors.name && <span className="error-text">{errors.name}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="venue_type">Venue Type</label>
          <select
            id="venue_type"
            name="venue_type"
            value={form.venue_type}
            onChange={handleChange}
            disabled={isLoading}
          >
            {VENUE_TYPES.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="indoor">Indoor</label>
          <div>
            <input
              id="indoor"
              name="indoor"
              type="checkbox"
              checked={form.indoor}
              onChange={handleChange}
              disabled={isLoading}
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="capacity">Capacity</label>
          <input
            id="capacity"
            name="capacity"
            type="number"
            value={form.capacity}
            onChange={handleChange}
            placeholder="e.g. 10000"
            disabled={isLoading}
            className={errors.capacity ? 'error' : ''}
          />
          {errors.capacity && <span className="error-text">{errors.capacity}</span>}
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
