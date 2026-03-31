import { useState, useEffect } from 'react';
import './AthleteForm.css';

const EMPTY_FORM = {
  name: '', age: '', category: 'Sprint', event: '',
  personalBest: '', nationality: '', status: 'active',
};

const CATEGORIES = ['Sprint', 'Long Distance', 'Jump', 'Throw', 'Multi-event'];

export default function AthleteForm({ onAddAthlete, onUpdateAthlete, editingAthlete, onCancelEdit }) {
  const [form, setForm] = useState(EMPTY_FORM);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // When a card enters edit mode, hydrate the form with that athlete's current values.
    if (editingAthlete) {
      setForm({
        name:         editingAthlete.name,
        age:          editingAthlete.age,
        category:     editingAthlete.category,
        event:        editingAthlete.event,
        personalBest: editingAthlete.personalBest,
        nationality:  editingAthlete.nationality,
        status:       editingAthlete.status,
      });
      setVisible(true);
    }
  }, [editingAthlete]);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!form.name.trim() || !form.event.trim()) return;

    // Normalize derived fields once, then branch between update and create flows.
    const initials = form.name.trim().split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();
    const athleteData = { ...form, age: Number(form.age), avatarInitials: initials };

    if (editingAthlete) {
      onUpdateAthlete({ ...editingAthlete, ...athleteData });
    } else {
      onAddAthlete({ ...athleteData, id: Date.now(), joinedDate: new Date().toISOString().split('T')[0], coachId: 1 });
    }

    setForm(EMPTY_FORM);
    setVisible(false);
  }

  function handleCancel() {
    // Reset local form state and notify parent to exit external edit mode.
    setForm(EMPTY_FORM);
    setVisible(false);
    if (onCancelEdit) onCancelEdit();
  }

  if (!visible && !editingAthlete) {
    return (
      <div className="athlete-form-toggle">
        <button className="btn btn-gold" onClick={() => setVisible(true)}>
          ➕ Add New Athlete
        </button>
      </div>
    );
  }

  return (
    <div className="athlete-form-wrapper card">
      <h3 className="form-heading">{editingAthlete ? '✏️ Edit Athlete' : '➕ Add New Athlete'}</h3>
      <form className="athlete-form" onSubmit={handleSubmit}>
        <div className="form-grid">
          <div className="form-group">
            <label htmlFor="name">Full Name *</label>
            <input id="name" name="name" value={form.name} onChange={handleChange} placeholder="e.g. Carlos Martínez" required />
          </div>
          <div className="form-group">
            <label htmlFor="age">Age</label>
            <input id="age" name="age" type="number" min="14" max="60" value={form.age} onChange={handleChange} placeholder="22" />
          </div>
          <div className="form-group">
            <label htmlFor="category">Category</label>
            <select id="category" name="category" value={form.category} onChange={handleChange}>
              {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="event">Event *</label>
            <input id="event" name="event" value={form.event} onChange={handleChange} placeholder="e.g. 100m" required />
          </div>
          <div className="form-group">
            <label htmlFor="personalBest">Personal Best</label>
            <input id="personalBest" name="personalBest" value={form.personalBest} onChange={handleChange} placeholder="e.g. 10.45s" />
          </div>
          <div className="form-group">
            <label htmlFor="nationality">Nationality</label>
            <input id="nationality" name="nationality" value={form.nationality} onChange={handleChange} placeholder="e.g. Spanish" />
          </div>
          <div className="form-group">
            <label htmlFor="status">Status</label>
            <select id="status" name="status" value={form.status} onChange={handleChange}>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
        </div>
        <div className="form-actions">
          <button type="submit" className="btn btn-primary">
            {editingAthlete ? 'Save Changes' : 'Add Athlete'}
          </button>
          <button type="button" className="btn btn-outline" onClick={handleCancel}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
