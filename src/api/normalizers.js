function initialsFromName(name) {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map(part => part[0]?.toUpperCase() || '')
    .join('') || 'NA';
}

function safeText(value, fallback = 'N/A') {
  if (value === null || value === undefined) return fallback;
  const text = String(value).trim();
  return text.length ? text : fallback;
}

function normalizeStatus(value) {
  if (typeof value === 'boolean') return value ? 'active' : 'inactive';
  if (typeof value !== 'string') return 'active';
  const lowered = value.toLowerCase();
  if (lowered.includes('inactive')) return 'inactive';
  return 'active';
}

function resolveName(record) {
  if (record.name) return safeText(record.name, 'Unknown');
  const composed = [record.first_name, record.last_name].filter(Boolean).join(' ').trim();
  return safeText(composed, 'Unknown');
}

function resolveDate(value) {
  if (!value) return 'N/A';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return safeText(value);
  return date.toLocaleDateString('en-GB');
}

export function normalizeAthlete(record) {
  const name = resolveName(record);

  return {
    id: record.public_id || record.id || record.uuid || name,
    publicId: record.public_id || record.id || record.uuid || name,
    name,
    avatarInitials: initialsFromName(name),
    event: safeText(record.event?.name || record.event || record.discipline),
    category: safeText(record.category?.name || record.category || record.level),
    status: normalizeStatus(record.status ?? record.is_active),
    personalBest: safeText(record.personal_best || record.pb || record.best_mark),
    age: record.age || 'N/A',
    nationality: safeText(record.nationality || record.country),
    joinedDate: resolveDate(record.joined_at || record.created_at || record.membership_start),
  };
}

export function normalizeCoach(record) {
  const name = resolveName(record);
  const experienceValue = record.experience || (record.years_experience ? `${record.years_experience} years` : null);

  return {
    id: record.public_id || record.id || record.uuid || name,
    publicId: record.public_id || record.id || record.uuid || name,
    name,
    avatarInitials: initialsFromName(name),
    specialty: safeText(record.specialty || record.discipline || record.focus_area),
    status: normalizeStatus(record.status ?? record.is_active),
    experience: safeText(experienceValue),
    certificationLevel: safeText(record.certification_level || record.certification),
    athleteCount: Number(record.athlete_count ?? record.athleteCount ?? 0),
    age: record.age || 'N/A',
    email: safeText(record.email, '-'),
    phone: safeText(record.phone, '-'),
  };
}

export function normalizeTraining(record) {
  const type = safeText(record.type || 'training').toLowerCase();
  const athletes = Array.isArray(record.athletes) ? record.athletes : [];

  return {
    id: record.public_id || record.id || record.uuid || safeText(record.title || record.name),
    publicId: record.public_id || record.id || record.uuid,
    title: safeText(record.title || record.name),
    type,
    date: safeText(record.date || record.training_date || record.start_date),
    time: safeText(record.time || record.start_time),
    duration: safeText(record.duration || (record.duration_minutes ? `${record.duration_minutes} min` : null)),
    intensity: safeText(record.intensity || 'Medium'),
    description: safeText(record.description || record.notes || 'No description provided.'),
    location: safeText(record.location?.name || record.venue?.name || record.location),
    athleteIds: athletes.map(item => item.public_id || item.id).filter(Boolean),
  };
}

export function normalizeCompetition(record) {
  return {
    id: record.public_id || record.id || record.uuid || safeText(record.name || record.title),
    publicId: record.public_id || record.id || record.uuid,
    name: safeText(record.name || record.title),
    date: safeText(record.date || record.start_date),
    status: safeText(record.status || 'scheduled').toLowerCase(),
    venue: safeText(record.venue?.name || record.venue_name || record.location),
    season: safeText(record.season?.name || record.season || 'General'),
    category: safeText(record.category?.name || record.category),
    description: safeText(record.description || record.notes || 'No extra details available.'),
  };
}
