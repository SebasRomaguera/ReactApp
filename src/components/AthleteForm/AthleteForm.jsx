import { useState } from 'react';
import './AthleteForm.css';

const EMPTY_FORM = {
  first_name: '',
  last_name: '',
  email: '',
  phone: '',
  date_of_birth: '',
  height: '',
  weight: '',
  jersey_number: '',
};

export default function AthleteForm({ athlete = null, onSubmit, onCancel, isLoading = false }) {
  const [form, setForm] = useState(athlete ? {
    first_name: athlete.first_name || athlete.name?.split(' ')[0] || '',
    last_name: athlete.last_name || athlete.name?.split(' ').slice(1).join(' ') || '',
    email: athlete.email === '-' ? '' : (athlete.email || ''),
    phone: athlete.phone === '-' ? '' : (athlete.phone || ''),
    date_of_birth: athlete.date_of_birth || '',
    height: athlete.height ?? '',
    weight: athlete.weight ?? '',
    jersey_number: athlete.jersey_number ?? '',
  } : EMPTY_FORM);

  const [errors, setErrors] = useState({});

  function validateForm() {
    const newErrors = {};
    if (!form.first_name.trim()) newErrors.first_name = 'First name is required';
    if (!form.last_name.trim()) newErrors.last_name = 'Last name is required';
    if (!form.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = 'Invalid email format';
    }
    if (form.height !== '' && (isNaN(form.height) || Number(form.height) <= 0)) {
      newErrors.height = 'Height must be a positive number';
    }
    if (form.weight !== '' && (isNaN(form.weight) || Number(form.weight) <= 0)) {
      newErrors.weight = 'Weight must be a positive number';
    }
    if (form.jersey_number !== '' && (isNaN(form.jersey_number) || Number(form.jersey_number) < 0)) {
      newErrors.jersey_number = 'Jersey number must be a valid number';
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
    onSubmit({
      ...form,
      height: form.height === '' ? null : Number(form.height),
      weight: form.weight === '' ? null : Number(form.weight),
      jersey_number: form.jersey_number === '' ? null : Number(form.jersey_number),
      date_of_birth: form.date_of_birth || null,
    });
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
          <label htmlFor="last_name">Last Name *</label>
          <input
            id="last_name"
            name="last_name"
            value={form.last_name}
            onChange={handleChange}
            placeholder="e.g. Pérez"
            disabled={isLoading}
            className={errors.last_name ? 'error' : ''}
          />
          {errors.last_name && <span className="error-text">{errors.last_name}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="email">Email *</label>
          <input
            id="email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            placeholder="athlete@example.com"
            disabled={isLoading}
            className={errors.email ? 'error' : ''}
          />
          {errors.email && <span className="error-text">{errors.email}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="phone">Phone</label>
          <input
            id="phone"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            placeholder="+34 600 000 000"
            disabled={isLoading}
          />
        </div>

        <div className="form-group">
          <label htmlFor="date_of_birth">Date of Birth</label>
          <input
            id="date_of_birth"
            name="date_of_birth"
            type="date"
            value={form.date_of_birth}
            onChange={handleChange}
            disabled={isLoading}
          />
        </div>

        <div className="form-group">
          <label htmlFor="height">Height (cm)</label>
          <input
            id="height"
            name="height"
            type="number"
            step="0.1"
            value={form.height}
            onChange={handleChange}
            placeholder="e.g. 183"
            disabled={isLoading}
            className={errors.height ? 'error' : ''}
          />
          {errors.height && <span className="error-text">{errors.height}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="weight">Weight (kg)</label>
          <input
            id="weight"
            name="weight"
            type="number"
            step="0.1"
            value={form.weight}
            onChange={handleChange}
            placeholder="e.g. 63"
            disabled={isLoading}
            className={errors.weight ? 'error' : ''}
          />
          {errors.weight && <span className="error-text">{errors.weight}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="jersey_number">Jersey Number</label>
          <input
            id="jersey_number"
            name="jersey_number"
            type="number"
            value={form.jersey_number}
            onChange={handleChange}
            placeholder="e.g. 9"
            disabled={isLoading}
            className={errors.jersey_number ? 'error' : ''}
          />
          {errors.jersey_number && <span className="error-text">{errors.jersey_number}</span>}
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
