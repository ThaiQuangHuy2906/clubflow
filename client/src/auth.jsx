import React, { createContext, useContext, useEffect, useRef, useState, useSyncExternalStore } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiRequest, getSession, setSession, subscribeSession } from './api.js';

const AuthContext = createContext(null);
export const roleHomes = {
  Executive: '/executive/campaign', Applicant: '/me/applications', Interviewer: '/interviewer/interviews'
};

async function signIn(email, password, signal) {
  const session = await apiRequest('/api/auth/login', { method: 'POST', body: { email, password }, signal });
  signal?.throwIfAborted();
  setSession(session);
  return session.user;
}

export function AuthProvider({ children }) {
  const session = useSyncExternalStore(subscribeSession, getSession);
  const navigate = useNavigate();
  useEffect(() => {
    function expired() {
      const { pathname, search, hash } = window.location;
      navigate('/sign-in', { replace: true, state: { returnTo: pathname + search + hash, expired: true } });
    }
    window.addEventListener('clubflow:session-expired', expired);
    return () => window.removeEventListener('clubflow:session-expired', expired);
  }, [navigate]);

  function signOut() {
    setSession(null);
    navigate('/', { replace: true });
  }
  return <AuthContext.Provider value={{ user: session?.user ?? null, token: session?.token ?? null, signIn, signOut }}>
    {children}
  </AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}

export function SignInPage({ expired = false }) {
  const { signIn } = useAuth();
  const [pending, setPending] = useState(false);
  const [error, setError] = useState('');
  const [fields, setFields] = useState({});
  const active = useRef(null);
  useEffect(() => () => active.current?.abort(), []);

  async function submit(event) {
    event.preventDefault();
    if (active.current) return;
    const form = event.currentTarget;
    const { email, password } = form.elements;
    const invalid = {};
    if (!email.value.trim() || email.validity.typeMismatch) invalid.email = 'Enter a valid email address.';
    if (!password.value) invalid.password = 'Enter your password.';
    setFields(invalid);
    setError('');
    if (Object.keys(invalid).length) {
      form.elements[Object.keys(invalid)[0]].focus();
      return;
    }
    const controller = new AbortController();
    active.current = controller;
    setPending(true);
    try {
      await signIn(email.value.trim(), password.value, controller.signal);
    } catch (failure) {
      if (!controller.signal.aborted) {
        setError(failure.message);
        setFields(failure.fields ?? {});
        form.elements[Object.keys(failure.fields ?? {})[0]]?.focus();
      }
    } finally {
      if (!controller.signal.aborted) setPending(false);
      active.current = null;
    }
  }

  return <section className="signin panel">
    <h1>Sign in</h1>
    <p className="muted">Use your ClubFlow account to open your workspace.</p>
    {expired && <p role="status">Your session has expired. Please sign in again.</p>}
    <form noValidate onSubmit={submit} className="form-stack">
      <label htmlFor="email">Email address</label>
      <input id="email" name="email" type="email" autoComplete="username" autoCapitalize="none" required
        aria-invalid={!!fields.email} aria-describedby={fields.email ? 'email-error' : undefined} />
      {fields.email && <p className="field-error" id="email-error">{fields.email}</p>}
      <label htmlFor="password">Password</label>
      <input id="password" name="password" type="password" autoComplete="current-password" required
        aria-invalid={!!fields.password} aria-describedby={fields.password ? 'password-error' : undefined} />
      {fields.password && <p className="field-error" id="password-error">{fields.password}</p>}
      {error && <p role="alert" className="field-error">{error}</p>}
      <button className="button primary" disabled={pending}>{pending ? 'Signing in…' : 'Sign in'}</button>
    </form>
  </section>;
}
