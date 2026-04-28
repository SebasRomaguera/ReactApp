import { useState } from 'react';
import './EnrollmentForm.css';

export default function EnrollmentForm({ competition = null, availableAthletes = [], onSubmit, onCancel, isLoading = false }) {
  const [form, setForm] = useState({
    athlete_id: '',
    notes: '',
  });

  const [errors, setErrors] = useState({});

  function validateForm() {
    const newErrors = {};
    if (!form.athlete_id) newErrors.athlete_id = 'Please select an athlete';
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

  return (
    <form className="enrollment-form card" onSubmit={handleSubmit}>
      <h3 className="form-heading">🏃 Enroll Athlete in Competition</h3>
      
      {competition && (
        <div className="enrollment-context">
          <p><strong>Competition:</strong> {competition.name}</p>
          <p><strong>Date:</strong> {competition.date}</p>
        </div>
      )}

      <div className="form-grid">
        <div className="form-group">
          <label htmlFor="athlete_id">Select Athlete *</label>
          <select
            id="athlete_id"
            name="athlete_id"
            value={form.athlete_id}
            onChange={handleChange}
            disabled={isLoading}
            className={errors.athlete_id ? 'error' : ''}
          >
            <option value="">-- Choose an athlete --</option>
            {availableAthletes.map(athlete => (
              <option key={athlete.publicId || athlete.id} value={athlete.publicId || athlete.id}>
                {athlete.name}
              </option>
            ))}
          </select>
          {errors.athlete_id && <span className="error-text">{errors.athlete_id}</span>}
        </div>

        <div className="form-group full-width">
          <label htmlFor="notes">Notes (Optional)</label>
          <textarea
            id="notes"
            name="notes"
            placeholder="Any additional notes about this enrollment..."
            value={form.notes}
            onChange={handleChange}
            disabled={isLoading}
            rows="3"
          />
        </div>
      </div>

      <div className="form-actions">
        <button type="submit" className="btn btn-primary" disabled={isLoading}>
          {isLoading ? 'Processing...' : 'Enroll Athlete'}
        </button>
        <button type="button" className="btn btn-outline" onClick={onCancel} disabled={isLoading}>
          Cancel
        </button>
      </div>
    </form>
  );
}
