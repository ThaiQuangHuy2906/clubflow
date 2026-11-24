import { useCallback, useEffect, useState } from 'react';
import { apiRequest } from '../../api.js';

export const statuses = ['Submitted', 'Shortlisted', 'Rejected'];
export const sortOptions = [
  ['id', 'Application ID'],
  ['submittedAt', 'Submission time'],
  ['studentName', 'Applicant name'],
  ['positionName', 'Position']
];

const positiveInteger = (value, fallback, max = Number.MAX_SAFE_INTEGER) => {
  const number = Number(value);
  return /^\d+$/.test(value) && Number.isSafeInteger(number) && number > 0 && number <= max ? number : fallback;
};

export const searchText = value => [...value].slice(0, 120).join('');
export const trimReviewText = value => value.replace(/^[\s\u0085]+|[\s\u0085]+$/gu, '');

export function readReviewQuery(params) {
  const status = params.get('status');
  const sort = params.get('sort');
  return {
    q: searchText(trimReviewText(params.get('q') ?? '')),
    status: statuses.includes(status) ? status : '',
    positionId: params.get('positionId') ?? '',
    sort: sortOptions.some(([value]) => value === sort) ? sort : 'id',
    order: params.get('order') === 'desc' ? 'desc' : 'asc',
    page: positiveInteger(params.get('page'), 1),
    pageSize: positiveInteger(params.get('pageSize'), 20, 100)
  };
}

export function reviewPaths({ page, pageSize, ...filters }) {
  const params = new URLSearchParams();
  for (const [name, value] of Object.entries(filters)) {
    if (value) params.set(name, value);
  }
  const exportPath = '/api/applications/export?' + params;
  params.set('page', String(page));
  params.set('pageSize', String(pageSize));
  return { listPath: '/api/applications?' + params, exportPath };
}

// List filters, campaign positions and the selected application have independent request lifetimes.
export function useReviewResource(path, responseType = 'json') {
  const [attempt, setAttempt] = useState(0);
  const [response, setResponse] = useState(null);
  const reload = useCallback(() => setAttempt(value => value + 1), []);
  useEffect(() => {
    if (!path) return;
    const controller = new AbortController();
    apiRequest(path, { signal: controller.signal, responseType }).then(
      data => { if (!controller.signal.aborted) setResponse({ path, attempt, data }); },
      error => {
        if (!controller.signal.aborted) {
          setResponse(previous => ({ path, attempt, error, previousData: previous?.data ?? previous?.previousData }));
        }
      }
    );
    return () => controller.abort();
  }, [path, responseType, attempt]);
  const current = response?.path === path ? response : null;
  const settled = current?.attempt === attempt;
  return {
    data: current?.data,
    previousData: response?.data ?? response?.previousData,
    error: settled ? current.error : undefined,
    refreshing: !!path && !settled,
    reload
  };
}
