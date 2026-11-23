const storageKey = 'clubflow.session';
const listeners = new Set();
let lifetime = new AbortController();

function validSession(value) {
  return typeof value?.token === 'string' && value.token.length > 0 &&
    typeof value.user?.id === 'string' && typeof value.user.name === 'string' &&
    ['Applicant', 'Executive', 'Interviewer'].includes(value.user.role);
}

function restore() {
  try {
    const value = JSON.parse(sessionStorage.getItem(storageKey));
    if (validSession(value)) return value;
    sessionStorage.removeItem(storageKey);
  } catch {
    // Storage can be unavailable in a private browser context.
  }
  return null;
}

let session = restore();
export const getSession = () => session;
export function subscribeSession(listener) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function setSession(value) {
  if (value !== null && !validSession(value)) throw new ApiError(0, 'INVALID_RESPONSE', 'Invalid sign-in response.');
  lifetime.abort();
  lifetime = new AbortController();
  session = value;
  try {
    if (value) sessionStorage.setItem(storageKey, JSON.stringify(value));
    else sessionStorage.removeItem(storageKey);
  } catch {
    // The in-memory session is still valid for this page.
  }
  for (const listener of listeners) listener();
}

export class ApiError extends Error {
  constructor(status, code, message, fields = {}) {
    super(message);
    this.name = 'ApiError';
    Object.assign(this, { status, code, fields });
  }
}

function connectionError() {
  return new ApiError(0, 'NETWORK_ERROR', 'The connection to ClubFlow failed. Check the connection and try again.');
}

export async function apiRequest(path, { method = 'GET', body, signal, responseType = 'json' } = {}) {
  if (typeof path !== 'string' || !path.startsWith('/api/') || /[\u0000-\u001f\\#]/.test(path)) {
    throw new ApiError(0, 'INVALID_PATH', 'Expected a relative /api/ path.');
  }
  const url = new URL(path, window.location.origin);
  if (url.origin !== window.location.origin || !url.pathname.startsWith('/api/')) {
    throw new ApiError(0, 'INVALID_PATH', 'Expected a relative /api/ path.');
  }
  if (!['json', 'blob'].includes(responseType)) throw new ApiError(0, 'INVALID_RESPONSE_TYPE', 'Unsupported response type.');

  const isLogin = url.pathname === '/api/auth/login';
  const bearer = isLogin ? null : session?.token;
  const requestSignal = signal ? AbortSignal.any([signal, lifetime.signal]) : lifetime.signal;
  const headers = new Headers();
  if (bearer) headers.set('Authorization', 'Bearer ' + bearer);
  const json = body !== undefined && !(body instanceof FormData);
  if (json) headers.set('Content-Type', 'application/json');

  let response;
  try {
    response = await fetch(url, {
      method, headers, body: json ? JSON.stringify(body) : body,
      signal: requestSignal, redirect: 'error', cache: 'no-store'
    });
  } catch (error) {
    requestSignal.throwIfAborted();
    throw connectionError();
  }
  let data;
  try {
    if (response.ok && responseType === 'blob') return await response.blob();
    if (response.ok && response.status === 204) return null;
    data = await response.json();
  } catch (error) {
    requestSignal.throwIfAborted();
    if (response.ok && !(error instanceof SyntaxError)) throw connectionError();
  }
  if (!response.ok) {
    const details = data?.error;
    if (response.status === 401 && bearer && session?.token === bearer && !requestSignal.aborted) {
      setSession(null);
      window.dispatchEvent(new Event('clubflow:session-expired'));
    }
    throw new ApiError(response.status, details?.code ?? 'HTTP_ERROR',
      details?.message ?? 'ClubFlow could not complete the request.', details?.fields);
  }
  if (data === undefined) throw new ApiError(response.status, 'INVALID_RESPONSE', 'The server returned an unreadable response.');
  return data;
}
