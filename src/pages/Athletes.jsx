import { useState } from 'react';
import athletesData from '../data/athletes.json';
import AthleteList from '../components/AthleteList/AthleteList';
import AthleteForm from '../components/AthleteForm/AthleteForm';
import './Athletes.css';

export default function Athletes() {
  const [athletes, setAthletes]       = useState(athletesData);
  const [editingAthlete, setEditing]  = useState(null);
  const [filterStatus, setFilter]     = useState('all');
  const [filterCategory, setCategory] = useState('all');

  const categories = [...new Set(athletesData.map(a => a.category))];

  const displayed = athletes.filter(a => {
    const statusOk   = filterStatus === 'all'   || a.status === filterStatus;
    const categoryOk = filterCategory === 'all' || a.category === filterCategory;
    return statusOk && categoryOk;
  });

  function handleAdd(newAthlete) {
    setAthletes(prev => [...prev, newAthlete]);
  }

  function handleUpdate(updated) {
    setAthletes(prev => prev.map(a => a.id === updated.id ? updated : a));
    setEditing(null);
  }

  function handleDelete(id) {
    if (window.confirm('Remove this athlete from the roster?')) {
      setAthletes(prev => prev.filter(a => a.id !== id));
    }
  }

  const activeCount = athletes.filter(a => a.status === 'active').length;

  return (
    <div>
      {/* Page header */}
      <div className="page-header">
        <div className="page-header-info">
          <h1>🏃 Athlete Roster</h1>
          <p>Manage all registered athletes in the club.</p>
        </div>
      </div>

      {/* Stats */}
      <div className="stats-strip">
        <div className="stat-card">
          <div className="stat-value">{athletes.length}</div>
          <div className="stat-label">Total Athletes</div>
        </div>
        <div className="stat-card accent-green">
          <div className="stat-value">{activeCount}</div>
          <div className="stat-label">Active</div>
        </div>
        <div className="stat-card accent-red">
          <div className="stat-value">{athletes.length - activeCount}</div>
          <div className="stat-label">Inactive</div>
        </div>
        <div className="stat-card accent-gold">
          <div className="stat-value">{categories.length}</div>
          <div className="stat-label">Categories</div>
        </div>
      </div>

      {/* Form */}
      <AthleteForm
        onAddAthlete={handleAdd}
        onUpdateAthlete={handleUpdate}
        editingAthlete={editingAthlete}
        onCancelEdit={() => setEditing(null)}
      />

      {/* Filters */}
      <div className="athletes-filters">
        <div className="form-group filter-group">
          <label htmlFor="filter-status">Status</label>
          <select id="filter-status" value={filterStatus} onChange={e => setFilter(e.target.value)}>
            <option value="all">All</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
        <div className="form-group filter-group">
          <label htmlFor="filter-cat">Category</label>
          <select id="filter-cat" value={filterCategory} onChange={e => setCategory(e.target.value)}>
            <option value="all">All</option>
            {categories.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
        <span className="filter-count">{displayed.length} result{displayed.length !== 1 ? 's' : ''}</span>
      </div>

      {/* List */}
      <AthleteList athletes={displayed} onEdit={setEditing} onDelete={handleDelete} />
    </div>
  );
}
