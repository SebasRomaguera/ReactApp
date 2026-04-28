import { useState } from 'react';
import './CoachForm.css';

const EMPTY_FORM = {
  first_name: '',
  last_name: '',
  email: '',
  phone: '',
  date_of_birth: '',
  certification: '',
};

const CERTIFICATIONS = [
  '',
  'tecnico_deportivo_grado_medio',
  'tecnico_deportivo_grado_superior',
  'entrenador_nacional',
  'entrenador_club',
  'nsca_cpt',
];

export default function CoachForm({ coach = null, onSubmit, onCancel, isLoading = false }) {
  const [form, setForm] = useState(coach ? {
    first_name: coach.first_name || coach.name?.split(' ')[0] || '',
    last_name: coach.last_name || coach.name?.split(' ').slice(1).join(' ') || '',
    email: coach.email === '-' ? '' : (coach.email || ''),
    phone: coach.phone === '-' ? '' : (coach.phone || ''),
    date_of_birth: coach.date_of_birth || '',
    certification: coach.certification || '',
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
      date_of_birth: form.date_of_birth || null,
      certification: form.certification || null,
    });
  }

  const title = coach ? '✏️ Edit Coach' : '➕ Add New Coach';
  const submitLabel = coach ? 'Update' : 'Create';

  return (
    <form className="coach-form card" onSubmit={handleSubmit}>
      <h3 className="form-heading">{title}</h3>
      
      <div className="form-grid">
        <div className="form-group">
          <label htmlFor="first_name">First Name *</label>
          <input
            id="first_name"
            name="first_name"
            value={form.first_name}
            onChange={handleChange}
            placeholder="e.g. María"
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
            placeholder="e.g. García"
            disabled={isLoading}
            className={errors.last_name ? 'error' : ''}
          />
          {errors.last_name && <span className="error-text">{errors.last_name}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="certification">Certification</label>
          <select
            id="certification"
            name="certification"
            value={form.certification}
            onChange={handleChange}
            disabled={isLoading}
          >
            {CERTIFICATIONS.map(value => (
              <option key={value || 'none'} value={value}>
                {value || 'None'}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            placeholder="email@example.com"
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
            placeholder="+34 600 123 456"
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
