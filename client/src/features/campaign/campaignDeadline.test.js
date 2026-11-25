import assert from 'node:assert/strict';
import { test } from 'node:test';
import { formatCampaignDeadline } from './campaignDeadline.js';

test('whole-minute deadlines stay concise after conversion to UTC+7', () => {
  assert.deepEqual(formatCampaignDeadline('2026-11-15T18:00:00-07:00'), {
    text: '16 Nov 2026, 08:00 (UTC+7)', dateTime: '2026-11-15T18:00:00-07:00'
  });
});

test('a closing instant keeps its seconds and significant fractional digits', () => {
  assert.deepEqual(formatCampaignDeadline('2026-11-16T01:00:45.12000Z'), {
    text: '16 Nov 2026, 08:00:45.12 (UTC+7)', dateTime: '2026-11-16T01:00:45.12Z'
  });
  assert.equal(formatCampaignDeadline('2026-11-16T01:00:01Z').text, '16 Nov 2026, 08:00:01 (UTC+7)');
});

test('two instants in the same millisecond keep their distinct published times', () => {
  for (const fraction of ['0001', '0002']) {
    assert.deepEqual(formatCampaignDeadline('2026-11-16T01:00:00.' + fraction + 'Z'), {
      text: '16 Nov 2026, 08:00:00.' + fraction + ' (UTC+7)', dateTime: null
    });
  }
});
