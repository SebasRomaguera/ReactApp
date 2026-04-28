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

function resolveAddress(record) {
  const address = record.address || null;
  if (!address) return 'N/A';
  return safeText(address.formatted_address || [address.line1, address.city, address.country].filter(Boolean).join(', '));
}

function resolveVenueName(record) {
  return safeText(record.venue?.name || record.venue_name || record.location || record.name);
}

function resolveSeasonName(record) {
  return safeText(record.season?.name || record.season || 'General');
}

export function normalizeAthlete(record) {
  const name = resolveName(record);

  return {
    id: record.public_id || record.id || record.uuid || name,
    publicId: record.public_id || record.id || record.uuid || name,
    name,
    avatarInitials: initialsFromName(name),
    first_name: safeText(record.first_name, ''),
    last_name: safeText(record.last_name, ''),
    email: safeText(record.email, '-'),
    phone: safeText(record.phone, '-'),
    date_of_birth: safeText(record.date_of_birth, ''),
    joinedDate: resolveDate(record.date_of_birth),
    address: record.address || null,
    addressLabel: resolveAddress(record),
    height: record.height ?? null,
    weight: record.weight ?? null,
    jersey_number: record.jersey_number ?? null,
    jerseyNumber: record.jersey_number ?? null,
  };
}

export function normalizeCoach(record) {
  const name = resolveName(record);

  return {
    id: record.public_id || record.id || record.uuid || name,
    publicId: record.public_id || record.id || record.uuid || name,
    name,
    avatarInitials: initialsFromName(name),
    first_name: safeText(record.first_name, ''),
    last_name: safeText(record.last_name, ''),
    email: safeText(record.email, '-'),
    phone: safeText(record.phone, '-'),
    date_of_birth: safeText(record.date_of_birth, ''),
    address: record.address || null,
    addressLabel: resolveAddress(record),
    certification: safeText(record.certification, ''),
    certificationLevel: safeText(record.certification, '-'),
  };
}

export function normalizeVenue(record) {
  return {
    id: record.public_id || record.id || record.uuid || safeText(record.name),
    publicId: record.public_id || record.id || record.uuid,
    name: safeText(record.name),
    venue_type: safeText(record.venue_type || record.venueType || 'FIELD'),
    indoor: Boolean(record.indoor),
    capacity: record.capacity ?? null,
    address: record.address || null,
    addressLabel: resolveAddress(record),
  };
}

export function normalizeTraining(record) {
  const athletes = Array.isArray(record.athletes) ? record.athletes : [];
  const coaches = Array.isArray(record.coaches) ? record.coaches : [];

  return {
    id: record.public_id || record.id || record.uuid || safeText(record.name),
    publicId: record.public_id || record.id || record.uuid,
    name: safeText(record.name),
    date: safeText(record.date),
    season: resolveSeasonName(record),
    seasonPublicId: safeText(record.season?.public_id || record.season_public_id || record.seasonPublicId, ''),
    venue: resolveVenueName(record),
    venuePublicId: safeText(record.venue?.public_id || record.venue_public_id || record.venuePublicId, ''),
    focus: safeText(record.focus, ''),
    coachPublicIds: coaches.map(item => item.public_id).filter(Boolean),
    athletePublicIds: athletes.map(item => item.public_id).filter(Boolean),
    coachNames: coaches.map(item => item.display_name).filter(Boolean),
    athleteNames: athletes.map(item => item.display_name).filter(Boolean),
  };
}

export function normalizeCompetition(record) {
  const athletes = Array.isArray(record.athletes) ? record.athletes : [];
  const coaches = Array.isArray(record.coaches) ? record.coaches : [];

  return {
    id: record.public_id || record.id || record.uuid || safeText(record.name),
    publicId: record.public_id || record.id || record.uuid,
    name: safeText(record.name),
    date: safeText(record.date),
    season: resolveSeasonName(record),
    seasonPublicId: safeText(record.season?.public_id || record.season_public_id || record.seasonPublicId, ''),
    venue: resolveVenueName(record),
    venuePublicId: safeText(record.venue?.public_id || record.venue_public_id || record.venuePublicId, ''),
    coachPublicIds: coaches.map(item => item.public_id).filter(Boolean),
    athletePublicIds: athletes.map(item => item.public_id).filter(Boolean),
    coachNames: coaches.map(item => item.display_name).filter(Boolean),
    athleteNames: athletes.map(item => item.display_name).filter(Boolean),
    athleteCount: athletes.length,
    score: record.score || null,
  };
}
