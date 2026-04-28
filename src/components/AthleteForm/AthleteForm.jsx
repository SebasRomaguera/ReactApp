import { useState } from 'react';
import './AthleteForm.css';

const EMPTY_FORM = {
  first_name: '',
  last_name: '',
  age: '',
  category: 'Sprint',
  event: '',
  personal_best: '',
  nationality: '',
  status: 'active',
};

const CATEGORIES = ['Sprint', 'Long Distance', 'Jump', 'Throw', 'Multi-event'];

export default function AthleteForm({ athlete = null, onSubmit, onCancel, isLoading = false }) {
  const [form, setForm] = useState(athlete ? {
    first_name: athlete.first_name || athlete.name?.split(' ')[0] || '',
    last_name: athlete.last_name || athlete.name?.split(' ').slice(1).join(' ') || '',
    age: athlete.age || '',
    category: athlete.category || 'Sprint',
    event: athlete.event || '',
    personal_best: athlete.personalBest || '',
    nationality: athlete.nationality || '',
    status: athlete.status || 'active',
  } : EMPTY_FORM);

  const [errors, setErrors] = useState({});

  function validateForm() {
    const newErrors = {};
    if (!form.first_name.trim()) newErrors.first_name = 'First name is required';
    if (!form.event.trim()) newErrors.event = 'Event is required';
    if (form.age && (isNaN(form.age) || form.age < 0)) newErrors.age = 'Age must be a valid number';
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

  const title = athlete ? '✏️ Edit Athlete' : '➕ Add New Athlete';
  const submitLabel = athlete ? 'Update' : 'Create';

  return (
    <form className="athlete-form card" onSubmit={handleSubmit}>
      <h3 className="form-heading">{title}</h3>
      
      <div className="form-grid">
        <div className="form-group">
          <label htmlFor="first_name">First Name *</label>
          <input
            id="first_name"
            name="first_name"
            value={form.first_name}
            onChange={handleChange}
            placeholder="e.g. Juan"
            disabled={isLoading}
            className={errors.first_name ? 'error' : ''}
          />
          {errors.first_name && <span className="error-text">{errors.first_name}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="last_name">Last Name</label>
          <input
            id="last_name"
            name="last_name"
            value={form.last_name}
            onChange={handleChange}
            placeholder="e.g. Pérez"
            disabled={isLoading}
          />
        </div>

        <div className="form-group">
          <label htmlFor="age">Age</label>
          <input
            id="age"
            name="age"
            type="number"
            min="14"
            max="60"
            value={form.age}
            onChange={handleChange}
            placeholder="22"
            disabled={isLoading}
            className={errors.age ? 'error' : ''}
          />
          {errors.age && <span className="error-text">{errors.age}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="category">Category</label>
          <select
            id="category"
            name="category"
            value={form.category}
            onChange={handleChange}
            disabled={isLoading}
          >
            {CATEGORIES.map(c => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="event">Event *</label>
          <input
            id="event"
            name="event"
            value={form.event}
            onChange={handleChange}
            placeholder="e.g. 100m"
            disabled={isLoading}
            className={errors.event ? 'error' : ''}
          />
          {errors.event && <span className="error-text">{errors.event}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="personal_best">Personal Best</label>
          <input
            id="personal_best"
            name="personal_best"
            value={form.personal_best}
            onChange={handleChange}
            placeholder="e.g. 10.45s"
            disabled={isLoading}
          />
        </div>

        <div className="form-group">
          <label htmlFor="nationality">Nationality</label>
          <input
            id="nationality"
            name="nationality"
            value={form.nationality}
            onChange={handleChange}
            placeholder="e.g. Spanish"
            disabled={isLoading}
          />
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
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
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
