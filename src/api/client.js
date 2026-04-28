const DEFAULT_API_BASE_URL = 'http://localhost:8000/api/v1';

const API_BASE_URL = (
  import.meta.env.VITE_API_BASE_URL ||
  DEFAULT_API_BASE_URL
).replace(/\/$/, '');

function buildUrl(path) {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  return `${API_BASE_URL}${normalizedPath}`;
}

function toArray(payload) {
  if (Array.isArray(payload)) return payload;
  if (Array.isArray(payload?.data)) return payload.data;
  if (Array.isArray(payload?.results)) return payload.results;
  if (Array.isArray(payload?.items)) return payload.items;
  return [];
}

function toObject(payload) {
  if (payload && typeof payload === 'object' && !Array.isArray(payload)) {
    if (payload.data && typeof payload.data === 'object' && !Array.isArray(payload.data)) {
      return payload.data;
    }
    return payload;
  }
  return null;
}

function errorMessage(response) {
  return `Request failed (${response.status} ${response.statusText})`;
}

export async function getList(resourcePath) {
  const response = await fetch(buildUrl(resourcePath));
  if (!response.ok) {
    throw new Error(errorMessage(response));
  }

  const payload = await response.json();
  return toArray(payload);
}

export async function getById(resourcePath, publicId) {
  const response = await fetch(buildUrl(`${resourcePath}/${publicId}`));
  if (!response.ok) {
    throw new Error(errorMessage(response));
  }

  const payload = await response.json();
  return toObject(payload);
}

export async function createResource(resourcePath, data) {
  const response = await fetch(buildUrl(resourcePath), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw new Error(errorMessage(response));
  }

  const payload = await response.json();
  return toObject(payload);
}

export async function updateResource(resourcePath, publicId, data) {
  const response = await fetch(buildUrl(`${resourcePath}/${publicId}`), {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw new Error(errorMessage(response));
  }

  const payload = await response.json();
  return toObject(payload);
}

export async function deleteResource(resourcePath, publicId) {
  const response = await fetch(buildUrl(`${resourcePath}/${publicId}`), {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error(errorMessage(response));
  }

  return true;
}

export { API_BASE_URL };
