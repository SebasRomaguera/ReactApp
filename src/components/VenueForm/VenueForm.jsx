import { useState } from 'react';
import './VenueForm.css';

const EMPTY_FORM = {
  name: '',
  city: '',
  country: '',
  capacity: '',
  surface_type: '',
};

export default function VenueForm({ venue = null, onSubmit, onCancel, isLoading = false }) {
  const [form, setForm] = useState(venue ? {
    name: venue.name || '',
    city: venue.city || '',
    country: venue.country || '',
    capacity: venue.capacity || '',
    surface_type: venue.surface_type || '',
  } : EMPTY_FORM);

  const [errors, setErrors] = useState({});

  function validateForm() {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = 'Venue name is required';
    if (!form.city.trim()) newErrors.city = 'City is required';
    if (form.capacity && (isNaN(form.capacity) || form.capacity < 0)) {
      newErrors.capacity = 'Capacity must be a valid number';
    }
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
          <label htmlFor="city">City *</label>
          <input
            id="city"
            name="city"
            value={form.city}
            onChange={handleChange}
            placeholder="e.g. Madrid"
            disabled={isLoading}
            className={errors.city ? 'error' : ''}
          />
          {errors.city && <span className="error-text">{errors.city}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="country">Country</label>
          <input
            id="country"
            name="country"
            value={form.country}
            onChange={handleChange}
            placeholder="e.g. Spain"
            disabled={isLoading}
          />
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

        <div className="form-group">
          <label htmlFor="surface_type">Surface Type</label>
          <input
            id="surface_type"
            name="surface_type"
            value={form.surface_type}
            onChange={handleChange}
            placeholder="e.g. Synthetic, Natural Grass"
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
