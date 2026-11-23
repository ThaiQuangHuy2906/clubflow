import React, { useEffect, useRef, useState } from 'react';
import { Link, NavLink, Navigate, Outlet, Route, Routes, matchPath, useLocation } from 'react-router-dom';
import { apiRequest } from './api.js';
import { SignInPage, roleHomes, useAuth } from './auth.jsx';
import { CampaignTime, Denied, ErrorState, PageTitle, useResource } from './ui.jsx';
import { PublicCampaignPage, CampaignEditorPage, InterviewSetupPage } from './features/campaign/index.jsx';
import { ApplyPage, MyApplicationsPage, MyApplicationPage, ReviewPage, ResultsPage } from './features/applications/index.jsx';
import { SchedulePage, MyInterviewsPage, InterviewPage } from './features/scheduling/index.jsx';

const pages = [
  { path: '/', title: 'Public campaign', Page: PublicCampaignPage },
  { path: '/executive/campaign', role: 'Executive', title: 'Campaign editor', Page: CampaignEditorPage },
  { path: '/executive/interview-setup', role: 'Executive', title: 'Interview setup', Page: InterviewSetupPage },
  { path: '/executive/applications', role: 'Executive', title: 'Application review', Page: ReviewPage },
  { path: '/executive/schedule', role: 'Executive', title: 'Interview schedule', Page: SchedulePage },
  { path: '/executive/results', role: 'Executive', title: 'Results', Page: ResultsPage },
  { path: '/apply/:positionId', role: 'Applicant', title: 'Apply for a position', Page: ApplyPage },
  { path: '/me/applications', role: 'Applicant', title: 'My applications', Page: MyApplicationsPage },
  { path: '/me/applications/:id', role: 'Applicant', title: 'Application details', Page: MyApplicationPage },
  { path: '/interviewer/interviews', role: 'Interviewer', title: 'My interviews', Page: MyInterviewsPage },
  { path: '/interviewer/interviews/:id', role: 'Interviewer', title: 'Interview details', Page: InterviewPage }
];

function returnPath(raw, role) {
  if (typeof raw !== 'string' || !raw.startsWith('/') || raw.startsWith('//') || /[\\\u0000-\u001f]/.test(raw)) return roleHomes[role];
  const url = new URL(raw, window.location.origin);
  const page = pages.find(p => matchPath(p.path, url.pathname));
  if (url.origin !== window.location.origin || !page || (page.role && page.role !== role)) return roleHomes[role];
  return url.pathname + url.search + url.hash;
}

function SignInRoute() {
  const { user } = useAuth();
  const { state } = useLocation();
  if (user) return <Navigate replace to={returnPath(state?.returnTo, user.role)} state={{ afterSignIn: true }} />;
  return <><PageTitle title="Sign in" /><SignInPage expired={state?.expired} /></>;
}

function Guard({ role, children }) {
  const { user } = useAuth();
  const location = useLocation();
  if (!role) return children;
  if (!user) return <Navigate replace to="/sign-in" state={{ returnTo: location.pathname + location.search + location.hash }} />;
  return user.role === role ? children : <Denied />;
}

function DemoControls({ resource, refresh, draftPage }) {
  const [failure, setFailure] = useState(null);
  const [open, setOpen] = useState(false);
  const [pending, setPending] = useState('');
  const summary = useRef(null);
  const active = useRef(null);
  useEffect(() => () => active.current?.abort(), []);
  async function advance(action) {
    if (active.current || resource.refreshing) return;
    const controller = new AbortController();
    active.current = controller;
    summary.current?.focus();
    setFailure(null);
    setPending(action);
    try {
      await apiRequest('/api/demo/steps', { method: 'POST', body: { action }, signal: controller.signal });
      refresh();
    } catch (error) {
      if (!controller.signal.aborted) {
        setFailure(error.message);
        if (error.status === 409) resource.reload();
      }
    } finally {
      if (!controller.signal.aborted) setPending('');
      active.current = null;
    }
  }
  if (resource.error) return draftPage ? null : <ErrorState message={resource.error.message} onRetry={resource.reload} />;
  const data = resource.data;
  if (!data?.demo.enabled) return null;
  const busy = !!pending || resource.refreshing;
  return <details className="demo" open={open} onToggle={event => setOpen(event.currentTarget.open)}><summary ref={summary}>Demo controls</summary>
    <div className="demo-body">
      <p>Server time <strong><CampaignTime value={data.serverTime} /></strong></p>
      <p className="muted">Begin creation clears the demo records. Advancing the clock preserves them.</p>
      <div className="actions">
        <button className="button" disabled={busy || !data.demo.canBegin} onClick={() => advance('beginCreation')}>Begin creation walkthrough</button>
        <button className="button" disabled={busy || !data.published} onClick={() => advance('pastClose')}>Advance past close</button>
        <button className="button" disabled={busy} onClick={() => advance('pastInterviews')}>Advance past interviews</button>
      </div>
      {pending && <p role="status">Updating demo…</p>}
      {failure && <p role="alert">{failure}</p>}
    </div>
  </details>;
}

function Shell() {
  const { user, signOut } = useAuth();
  const { pathname } = useLocation();
  const workspace = user && pages.find(p => p.role === user.role && matchPath(p.path, pathname));
  const executive = workspace && user.role === 'Executive';
  const campaignDraft = useResource(executive ? '/api/campaign/draft' : null);
  const [generation, setGeneration] = useState(0);
  const signInPage = matchPath('/sign-in', pathname);
  function refreshDemo() {
    campaignDraft.reload();
    setGeneration(n => n + 1);
  }
  return <>
    <a className="skip" href="#main">Skip to content</a>
    <header className="topbar"><div className="frame bar-inner">
      <Link to="/" className="brand" aria-label="ClubFlow home"><span aria-hidden="true" className="mark">CF</span>ClubFlow</Link>
      {(user || !signInPage) && <nav aria-label="Main navigation" className="bar-nav">
        {user ? <>{workspace ? <Link to="/">Public campaign</Link> : <Link to={roleHomes[user.role]}>My workspace</Link>}
          <button type="button" className="button" onClick={signOut}>Sign out</button></> :
          <Link className="button primary" to="/sign-in">Sign in</Link>}
      </nav>}
    </div></header>
    <div className={'frame page-layout' + (workspace ? ' workspace' : '')}>
      {workspace && <aside className="sidebar"><div className="account"><span className="overline">{user.role}</span>
        <strong>{user.name}</strong></div><nav aria-label="Workspace navigation">
          {pages.filter(p => p.role === user.role && !p.path.includes(':')).map(p =>
            <NavLink key={p.path} to={p.path}>{p.title}</NavLink>)}
        </nav></aside>}
      <main id="main" tabIndex="-1">
        <Outlet key={generation} context={{ campaignDraft }} />
        {executive && <DemoControls resource={campaignDraft} refresh={refreshDemo} draftPage={workspace.path === roleHomes.Executive} />}
      </main>
    </div>
  </>;
}

export function AppRouter() {
  const { token } = useAuth();
  return <Routes><Route element={<Shell key={token ?? 'visitor'} />}>
    <Route path="/sign-in" element={<SignInRoute />} />
    {pages.map(({ path, role, Page }) => <Route key={path} path={path} element={<Guard role={role}><Page /></Guard>} />)}
    <Route path="*" element={<section className="panel"><PageTitle title="Page not found" /><h1>Page not found</h1><p>There is no ClubFlow page at this address.</p>
      <Link className="button" to="/">View campaign</Link></section>} />
  </Route></Routes>;
}
