import { useState } from 'react';
import './TrainingForm.css';

const EMPTY_FORM = {
  title: '',
  type: 'training',
  date: '',
  time: '',
  duration: '',
  intensity: 'Medium',
  description: '',
  location: '',
};

const TYPES = ['training', 'competition', 'recovery'];
const INTENSITIES = ['Low', 'Medium', 'High'];

export default function TrainingForm({ training = null, onSubmit, onCancel, isLoading = false }) {
  const [form, setForm] = useState(training ? {
    title: training.title || '',
    type: training.type || 'training',
    date: training.date || '',
    time: training.time || '',
    duration: training.duration || '',
    intensity: training.intensity || 'Medium',
    description: training.description || '',
    location: training.location || '',
  } : EMPTY_FORM);

  const [errors, setErrors] = useState({});

  function validateForm() {
    const newErrors = {};
    if (!form.title.trim()) newErrors.title = 'Title is required';
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

  const title = training ? '✏️ Edit Session' : '➕ Add Training Session';
  const submitLabel = training ? 'Update' : 'Create';

  return (
    <form className="training-form card" onSubmit={handleSubmit}>
      <h3 className="form-heading">{title}</h3>
      
      <div className="form-grid">
        <div className="form-group">
          <label htmlFor="title">Session Title *</label>
          <input
            id="title"
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="e.g. Sprint Training"
            disabled={isLoading}
            className={errors.title ? 'error' : ''}
          />
          {errors.title && <span className="error-text">{errors.title}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="type">Type</label>
          <select
            id="type"
            name="type"
            value={form.type}
            onChange={handleChange}
            disabled={isLoading}
          >
            {TYPES.map(t => (
              <option key={t} value={t}>{t.charAt(0).toUpperCase() + t.slice(1)}</option>
            ))}
          </select>
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
          <label htmlFor="time">Time</label>
          <input
            id="time"
            name="time"
            type="time"
            value={form.time}
            onChange={handleChange}
            disabled={isLoading}
          />
        </div>

        <div className="form-group">
          <label htmlFor="duration">Duration</label>
          <input
            id="duration"
            name="duration"
            placeholder="e.g. 90 min"
            value={form.duration}
            onChange={handleChange}
            disabled={isLoading}
          />
        </div>

        <div className="form-group">
          <label htmlFor="intensity">Intensity</label>
          <select
            id="intensity"
            name="intensity"
            value={form.intensity}
            onChange={handleChange}
            disabled={isLoading}
          >
            {INTENSITIES.map(i => (
              <option key={i} value={i}>{i}</option>
            ))}
          </select>
        </div>

        <div className="form-group full-width">
          <label htmlFor="location">Location</label>
          <input
            id="location"
            name="location"
            placeholder="e.g. Stadium A, Track 1"
            value={form.location}
            onChange={handleChange}
            disabled={isLoading}
          />
        </div>

        <div className="form-group full-width">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            placeholder="Session notes and details..."
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
