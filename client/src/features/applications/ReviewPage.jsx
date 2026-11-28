import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Link, useOutletContext, useSearchParams } from 'react-router-dom';
import { apiRequest } from '../../api.js';
import { CampaignTime, EmptyState, ErrorState, LoadingState, PageTitle } from '../../ui.jsx';
import { ReviewDetail } from './ReviewDetail.jsx';
import { readReviewQuery, reviewPaths, searchText, sortOptions, statuses, trimReviewText, useReviewResource } from './review-data.js';
import './review.css';

const statisticLabels = [
  ['applications', 'Applications'],
  ['applicants', 'Unique applicants'],
  ['submitted', 'Submitted'],
  ['shortlisted', 'Shortlisted'],
  ['rejected', 'Rejected']
];

function DownloadCsv({ path, blocked }) {
  const [pending, setPending] = useState(false);
  const [error, setError] = useState('');
  const active = useRef(null);
  useEffect(() => () => active.current?.abort(), []);

  async function download() {
    if (active.current || blocked) return;
    const controller = new AbortController();
    active.current = controller;
    setError('');
    setPending(true);
    try {
      const csv = await apiRequest(path, { responseType: 'blob', signal: controller.signal });
      controller.signal.throwIfAborted();
      const url = URL.createObjectURL(csv);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'applications.csv';
      document.body.append(link);
      link.click();
      link.remove();
      setTimeout(() => URL.revokeObjectURL(url), 0);
    } catch (failure) {
      if (!controller.signal.aborted) setError(failure.message);
    } finally {
      active.current = null;
      if (!controller.signal.aborted) setPending(false);
    }
  }

  return <div>
    <button className="button" type="button" disabled={pending || blocked} onClick={download}>
      {pending ? 'Exporting…' : 'Export filtered CSV'}
    </button>
    {error && <p className="review-action-message" role="alert">{error}</p>}
  </div>;
}

function ReviewFilters({ query, search, setSearch, updateQuery, catalog }) {
  const positions = catalog.data?.campaign?.departments.flatMap(department => department.positions) ?? [];
  const selectedPositionUnavailable = query.positionId && !positions.some(position => position.id === query.positionId);
  const pageSizes = [...new Set([10, 20, 50, 100, query.pageSize])].sort((a, b) => a - b);
  const filter = name => event => updateQuery({ [name]: event.target.value, page: null });

  return <div className="review-filters">
    <label className="review-field review-search">
      Search applications
      <input type="search" value={search} onChange={event => setSearch(searchText(event.target.value))}
        placeholder="Name, student number, position or ID" />
    </label>
    <label className="review-field">
      Screening status
      <select value={query.status} onChange={filter('status')}>
        <option value="">All statuses</option>
        {statuses.map(status => <option key={status}>{status}</option>)}
      </select>
    </label>
    <div className="review-field">
      <label htmlFor="review-position">Position</label>
      <select id="review-position" value={query.positionId} onChange={filter('positionId')}
        disabled={catalog.refreshing && !catalog.data} aria-describedby={catalog.error ? 'review-position-error' : undefined}>
        <option value="">All positions</option>
        {selectedPositionUnavailable && <option value={query.positionId}>{query.positionId}</option>}
        {positions.map(position => <option key={position.id} value={position.id}>{position.name}</option>)}
      </select>
      {catalog.error && <div id="review-position-error">
        <ErrorState message="Positions could not be loaded." onRetry={catalog.reload} retryLabel="Retry positions" />
      </div>}
    </div>
    <label className="review-field">
      Sort by
      <select value={query.sort} onChange={filter('sort')}>
        {sortOptions.map(([value, label]) => <option key={value} value={value}>{label}</option>)}
      </select>
    </label>
    <label className="review-field">
      Sort order
      <select value={query.order} onChange={filter('order')}>
        <option value="asc">Ascending</option>
        <option value="desc">Descending</option>
      </select>
    </label>
    <label className="review-field">
      Results per page
      <select value={query.pageSize} onChange={filter('pageSize')}>
        {pageSizes.map(size => <option key={size}>{size}</option>)}
      </select>
    </label>
  </div>;
}

function ReviewRows({ data, selection, writing, open, updateQuery }) {
  const { items, total, page, pageSize } = data;
  const pageCount = Math.ceil(total / pageSize);
  return <>
    <p className="muted" role="status">{total} matching {total === 1 ? 'application' : 'applications'}</p>
    {items.length ? <ul className="review-records">
      {items.map(application => <li key={application.id}>
        <h3>{application.studentName}</h3>
        <p>{application.positionName} · {application.id}</p>
        <p className="muted">{application.studentNumber} · <CampaignTime value={application.submittedAt} /></p>
        <div className="review-row-actions">
          <span className="status" data-screening={application.status}>{application.status}</span>
          <button type="button" className="button" disabled={writing}
            aria-expanded={selection?.id === application.id}
            aria-controls={selection?.id === application.id ? 'selected-application' : undefined}
            onClick={event => open(application.id, event.currentTarget)}>
            Review {application.id}
          </button>
        </div>
      </li>)}
    </ul> : <EmptyState message={total ? 'This page has no applications.' : 'No applications match the current filters.'} />}
    {pageCount > 0 && <nav className="actions" aria-label="Application results pages">
      <button type="button" className="button" disabled={page <= 1}
        onClick={() => updateQuery({ page: Math.min(page - 1, pageCount) })}>Previous page</button>
      <span>Page {page} of {pageCount}</span>
      <button type="button" className="button" disabled={page >= pageCount}
        onClick={() => updateQuery({ page: page + 1 })}>Next page</button>
    </nav>}
  </>;
}

export function ReviewPage() {
  const [params, setParams] = useSearchParams();
  const { campaignDraft } = useOutletContext();
  const query = readReviewQuery(params);
  const [search, setSearch] = useState(query.q);
  const [selection, setSelection] = useState(null);
  const [writing, setWriting] = useState(false);
  const resultsHeading = useRef(null);

  const updateQuery = useCallback((changes, options) => {
    const next = new URLSearchParams(params);
    for (const [name, value] of Object.entries(changes)) {
      if (value) next.set(name, String(value));
      else next.delete(name);
    }
    if (next.toString() !== params.toString()) setParams(next, options);
  }, [params, setParams]);

  const pendingTerm = trimReviewText(search);
  const searchPending = pendingTerm !== query.q;
  useEffect(() => setSearch(query.q), [query.q]);
  useEffect(() => {
    if (!searchPending) return;
    const timer = setTimeout(() => updateQuery({ q: pendingTerm, page: null }, { replace: true }), 300);
    return () => clearTimeout(timer);
  }, [pendingTerm, searchPending, updateQuery]);

  const { listPath, exportPath } = reviewPaths(query);
  const catalog = useReviewResource('/api/campaign');
  const list = useReviewResource(searchPending ? null : listPath);
  const campaignResults = list.data ?? list.previousData;
  const statistics = campaignResults?.statistics;
  const lastPage = list.data && Math.max(1, Math.ceil(list.data.total / list.data.pageSize));
  const pageToRestore = !list.refreshing && list.data?.page > lastPage ? lastPage : null;

  useEffect(() => {
    if (pageToRestore !== null) updateQuery({ page: pageToRestore }, { replace: true });
  }, [pageToRestore, updateQuery]);

  function refreshAfterScreening() {
    list.reload();
    if (campaignDraft.data?.demo.canBegin) campaignDraft.reload();
  }

  function closeDetail() {
    const trigger = selection.trigger;
    setSelection(null);
    requestAnimationFrame(() => (trigger.isConnected ? trigger : resultsHeading.current)?.focus());
  }

  return <div className="executive-review">
    <PageTitle title="Application review" />
    <section className="panel review-overview">
      <h1>Application review</h1>
      {statistics && <dl className="review-statistics" aria-label="Campaign totals">
        {statisticLabels.map(([key, label]) => <div key={key}><dt>{label}</dt><dd>{statistics[key]}</dd></div>)}
      </dl>}
      {statistics?.shortlisted > 0 && <Link className="button" to="/executive/schedule">Continue to interview schedule</Link>}
    </section>
    <div className="review-workspace" data-detail-open={!!selection}>
      <section className="panel review-list">
        <h2 ref={resultsHeading} tabIndex={-1}>Applications</h2>
        <ReviewFilters query={query} search={search} setSearch={setSearch} updateQuery={updateQuery} catalog={catalog} />
        <DownloadCsv key={exportPath} path={exportPath} blocked={!list.data || searchPending || list.refreshing} />
        {list.error && <ErrorState message={list.error.message} onRetry={list.reload} />}
        {!list.error && (searchPending || list.refreshing || pageToRestore !== null) && <LoadingState />}
        {list.data && pageToRestore === null && <ReviewRows data={list.data} selection={selection} writing={writing} updateQuery={updateQuery}
          open={(id, trigger) => setSelection({ id, trigger })} />}
      </section>
      {selection && <ReviewDetail key={selection.id} id={selection.id} locked={campaignResults?.locked}
        writing={writing} onWritingChange={setWriting} onSaved={refreshAfterScreening} onClose={closeDetail} />}
    </div>
  </div>;
}
