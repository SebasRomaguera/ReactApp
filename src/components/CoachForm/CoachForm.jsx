import { useState } from 'react';
import './CoachForm.css';

const EMPTY_FORM = {
  first_name: '',
  last_name: '',
  specialty: '',
  certification_level: '',
  experience: '',
  status: 'active',
  email: '',
  phone: '',
};

export default function CoachForm({ coach = null, onSubmit, onCancel, isLoading = false }) {
  const [form, setForm] = useState(coach ? {
    first_name: coach.first_name || coach.name?.split(' ')[0] || '',
    last_name: coach.last_name || coach.name?.split(' ').slice(1).join(' ') || '',
    specialty: coach.specialty || '',
    certification_level: coach.certificationLevel || '',
    experience: coach.experience || '',
    status: coach.status || 'active',
    email: coach.email || '',
    phone: coach.phone || '',
  } : EMPTY_FORM);

  const [errors, setErrors] = useState({});

  function validateForm() {
    const newErrors = {};
    if (!form.first_name.trim()) newErrors.first_name = 'First name is required';
    if (!form.specialty.trim()) newErrors.specialty = 'Specialty is required';
    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
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
    onSubmit(form);
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
          <label htmlFor="last_name">Last Name</label>
          <input
            id="last_name"
            name="last_name"
            value={form.last_name}
            onChange={handleChange}
            placeholder="e.g. García"
            disabled={isLoading}
          />
        </div>

        <div className="form-group">
          <label htmlFor="specialty">Specialty *</label>
          <input
            id="specialty"
            name="specialty"
            value={form.specialty}
            onChange={handleChange}
            placeholder="e.g. Sprint Coach"
            disabled={isLoading}
            className={errors.specialty ? 'error' : ''}
          />
          {errors.specialty && <span className="error-text">{errors.specialty}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="certification_level">Certification Level</label>
          <input
            id="certification_level"
            name="certification_level"
            value={form.certification_level}
            onChange={handleChange}
            placeholder="e.g. Level 2"
            disabled={isLoading}
          />
        </div>

        <div className="form-group">
          <label htmlFor="experience">Experience</label>
          <input
            id="experience"
            name="experience"
            value={form.experience}
            onChange={handleChange}
            placeholder="e.g. 10 years"
            disabled={isLoading}
          />
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
