import React, { useCallback, useEffect, useState } from 'react';
import { Link, Navigate, useLocation } from 'react-router-dom';
import { apiRequest } from './api.js';
import { roleHomes, useAuth } from './auth.jsx';

export function LoadingState() {
  return <p role="status" className="state muted">Loading…</p>;
}
export function ErrorState({ message, onRetry }) {
  return <div className="state"><p role="alert">{message}</p>
    <button type="button" className="button" onClick={onRetry}>Retry</button></div>;
}
export function EmptyState({ message }) {
  return <p className="state muted">{message}</p>;
}

export function PageTitle({ title }) {
  useEffect(() => { document.title = title + ' · ClubFlow'; }, [title]);
  return null;
}

export function useResource(path) {
  const entry = useLocation();
  const [attempt, setAttempt] = useState(0);
  const [result, setResult] = useState(null);
  const reload = useCallback(() => setAttempt(n => n + 1), []);
  useEffect(() => {
    if (!path) return;
    const controller = new AbortController();
    apiRequest(path, { signal: controller.signal }).then(
      data => { if (!controller.signal.aborted) setResult({ path, entry, attempt, data }); },
      error => { if (!controller.signal.aborted) setResult({ path, entry, attempt, error }); }
    );
    return () => controller.abort();
  }, [path, entry, attempt]);
  const current = result?.path === path && result?.entry === entry ? result : null;
  if (current?.attempt === attempt) return { data: current.data, error: current.error, refreshing: false, reload };
  return { data: current?.data, refreshing: true, reload };
}

export function Denied() {
  const { user } = useAuth();
  return <section className="panel"><PageTitle title="Access denied" /><h1>Access denied</h1><p>This account cannot open that page.</p>
    <Link className="button" to={roleHomes[user?.role] ?? '/'}>Return to workspace</Link></section>;
}

export function Resource({ title, resource, children }) {
  const { user } = useAuth();
  const location = useLocation();
  const { error, data, reload } = resource;
  if (location.state?.afterSignIn && [403, 404].includes(error?.status)) {
    return <Navigate replace to={roleHomes[user?.role] ?? '/'} />;
  }
  if (error?.status === 403) return <Denied />;
  if (error?.status === 404) return <section className="panel"><PageTitle title="Record not found" /><h1>Record not found</h1><p>{error.message}</p>
    <Link className="button" to={roleHomes[user?.role] ?? '/'}>Return to workspace</Link></section>;
  return <><PageTitle title={title} />
    {data !== undefined ? children(data) : <section className="panel"><h1>{title}</h1>
      {error ? <ErrorState message={error.message} onRetry={reload} /> : <LoadingState />}</section>}</>;
}

export function FeaturePage({ title, children, note }) {
  return <section className="panel feature"><h1>{title}</h1>{children}
    {note && <p className="stage-note">{note}</p>}</section>;
}

const timeFormat = new Intl.DateTimeFormat('en-GB', {
  day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit', timeZone: 'Asia/Ho_Chi_Minh'
});
export function CampaignTime({ value }) {
  return <time dateTime={value}>{timeFormat.format(new Date(value))} (UTC+7)</time>;
}
