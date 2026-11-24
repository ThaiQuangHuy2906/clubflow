import React from 'react';
import { EmptyState, FeaturePage, Resource, useResource } from '../../ui.jsx';

export { ApplyPage } from './ApplyPage.jsx';
export { MyApplicationsPage, MyApplicationPage } from './MyApplications.jsx';
export { ReviewPage } from './ReviewPage.jsx';

export function ResultsPage() {
  const results = useResource('/api/results');
  return <Resource title="Results" resource={results}>{({ items }) =>
    <FeaturePage title="Results" note="Decisions and publication will be added with the applications feature.">
      {items.length ? <p>{items.length} interview cases.</p> : <EmptyState message="No interview cases are available for final decisions. Shortlisted cases appear here after schedule confirmation." />}
    </FeaturePage>}</Resource>;
}
