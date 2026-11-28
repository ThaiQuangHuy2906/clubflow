"""Check H4 and the scheduling API on a fresh disposable normal demo mock."""

import json
from pathlib import Path

from playwright.sync_api import Browser, Locator, Page, expect, sync_playwright

from verify_role_navigation import ORIGIN, require, sign_in


SETUP = '/api/campaign/setup'
SEED = Path(__file__).resolve().parents[5] / 'mock/data/seed.json'
FIXTURE = json.loads(SEED.read_text(encoding='utf-8'))


def api(page: Page, token: str, path: str, method: str = 'GET', data: dict | None = None,
        expected: int = 200) -> dict:
    response = page.request.fetch(ORIGIN + path, method=method, data=data,
                                  headers={'Authorization': 'Bearer ' + token})
    require(response.status == expected, f'{method} {path} returned {response.status}, expected {expected}')
    return response.json()


def button(page: Page, name: str) -> Locator:
    return page.get_by_role('button', name=name, exact=True)


def save(page: Page, status: int = 200) -> dict:
    with page.expect_response(lambda item: item.url == ORIGIN + SETUP and item.request.method == 'PUT') as reply:
        button(page, 'Save interview setup').click()
    require(reply.value.status == status, f'Setup save returned {reply.value.status}, expected {status}')
    return reply.value.json()


def fill_interval(group: Locator, index: int, start: str, end: str) -> None:
    row = group.get_by_role('group', name=f'Interval {index}', exact=True)
    row.get_by_label('Start time', exact=True).fill(start)
    row.get_by_label('End time', exact=True).fill(end)


def submit_application(page: Page, window_ids: list[str], position_id: str = 'content') -> str:
    payload = page.evaluate("""async ({ids, position, token}) => {
      const body = new FormData();
      body.set('positionId', position);
      body.set('email', 'studenta@clubflow.test');
      body.set('phone', '0900000001');
      body.set('motivation', 'I enjoy working with the club.');
      for (const id of ids) body.append('availabilityWindowIds', id);
      body.set('cv', new Blob(['%PDF-1.4'], {type: 'application/pdf'}), 'cv.pdf');
      const response = await fetch('/api/applications', {method: 'POST', body, headers: {Authorization: 'Bearer ' + token}});
      return {status: response.status, body: await response.json()};
    }""", {'ids': window_ids, 'position': position_id,
           'token': page.evaluate("JSON.parse(sessionStorage.getItem('clubflow.session')).token")})
    require(payload['status'] == 201, f"Test application returned {payload['status']}")
    return payload['body']['id']


def check_handoff(browser: Browser) -> dict:
    with browser.new_context() as context, browser.new_context() as applicant:
        page = context.new_page()
        page.goto(ORIGIN + '/executive/interview-setup')
        token = sign_in(page, 'exec', SETUP)
        page.get_by_text('Demo controls', exact=True).click()
        button(page, 'Begin creation walkthrough').click()
        expect(page.get_by_text('Save a campaign before configuring interview availability.')).to_be_visible()
        api(page, token, '/api/campaign/publication', 'POST', FIXTURE['campaign'])
        page.reload()
        expect(page.get_by_text('Interview availability has not been configured yet.')).to_be_visible()
        writes = []
        page.on('request', lambda event: writes.append(event.method)
                if event.url == ORIGIN + SETUP and event.method == 'PUT' else None)

        button(page, 'Save interview setup').click()
        expect(page.get_by_label('Interview date')).to_be_focused()
        expect(page.get_by_text('Offer at least three distinct windows.')).to_be_visible()
        for label, value in [('Interview date', '2026-11-24'), ('Interview day start', '09:00'), ('Interview day end', '12:10')]:
            page.get_by_label(label).fill(value)
        windows = page.get_by_role('group', name='Applicant availability windows', exact=True)
        for i, (start, end) in enumerate([('09:00', '09:20'), ('09:10', '09:40'), ('09:40', '10:00'), ('10:00', '12:10')], 1):
            windows.get_by_role('button', name='Add interval').click()
            fill_interval(windows, i, start, end)
        page.get_by_role('checkbox', name='Room B', exact=True).check()
        interviewer = page.get_by_role('group', name='Content Interviewer', exact=True)
        interviewer.get_by_role('checkbox', name='Include Content Interviewer').check()
        button(page, 'Save interview setup').click()
        expect(page.get_by_text('Intervals cannot overlap.')).to_be_visible()
        expect(page.get_by_text('Select at least one position from the current catalogue.')).to_be_visible()
        require(not writes, 'Invalid setup reached the server')
        fill_interval(windows, 2, '09:20', '09:40')
        interviewer.get_by_role('checkbox', name='Content', exact=True).check()
        interviewer.get_by_role('checkbox', name='Communications', exact=True).check()
        available = interviewer.get_by_role('group', name='Interviewer availability')
        available.get_by_role('button', name='Add interval').click()
        fill_interval(available, 1, '08:59', '12:10')
        button(page, 'Save interview setup').click()
        expect(available.get_by_text('Use times inside the interview day bounds.')).to_be_visible()
        require(not writes, 'Out-of-bounds interviewer interval reached the server')
        fill_interval(available, 1, '09:00', '12:10')
        page.get_by_label('Interview date').fill('2026-11-19')
        rejection = save(page, 400)
        expect(page.get_by_label('Interview date')).to_be_focused()
        require('date' in rejection['error']['fields'], 'Expected server date error')
        expect(interviewer.get_by_role('checkbox', name='Communications', exact=True)).to_be_checked()
        page.get_by_label('Interview date').fill('2026-11-24')
        initial = save(page)
        expect(page.get_by_text('Interview setup saved.')).to_be_visible()
        require(initial['settings']['roomIds'] == ['R-B'] and len(initial['slots']) == 9, 'Setup response was incorrect')
        offered = [window['id'] for window in initial['availabilityWindows']]
        require(len(offered) == 4, 'Expected four applicant windows')
        page.reload()
        expect(page.get_by_text('9 saved interview slots · 4 offered windows')).to_be_visible()
        expect(interviewer.get_by_role('checkbox', name='Communications', exact=True)).to_be_checked()
        expect(page.get_by_role('checkbox', name='Room B', exact=True)).to_be_checked()
        print('PASS creation prerequisite, local and server validation, multiple qualifications, save and reopen')

        student = applicant.new_page()
        student.goto(ORIGIN)
        student.get_by_role('link', name='Sign in', exact=True).click()
        applicant_token = sign_in(student, 'studentA', '/api/applications')
        student.goto(ORIGIN + '/executive/interview-setup')
        expect(student.get_by_role('heading', name='Access denied')).to_be_visible()
        denied = api(student, applicant_token, SETUP, expected=403)
        require('catalog' not in denied, 'Catalogue visible to Applicant')
        public = api(student, applicant_token, '/api/campaign')
        require([item['id'] for item in public['availabilityWindows']] == offered, 'Applicant projection differs')

        fill_interval(windows, 4, '10:10', '12:10')
        page.get_by_label('Slot duration').select_option('15')
        entries = [submit_application(student, offered[:3], position) for position in ('content', 'comms')]
        rejected = save(page, 409)
        require(rejected['error']['code'] == 'AVAILABILITY_LOCKED', 'Expected frozen availability response')
        expect(page.get_by_label('Slot duration')).to_have_value('15')
        button(page, 'Load saved dates and applicant windows').click()
        expect(page.get_by_text('Saved dates and applicant windows loaded.', exact=False)).to_be_visible()
        expect(page.get_by_label('Interview date')).not_to_be_editable()
        expect(windows.get_by_role('group', name='Interval 4').get_by_label('Start time')).to_have_value('10:00')
        expect(page.get_by_label('Slot duration')).to_have_value('15')
        for entry in entries:
            api(page, token, '/api/applications/' + entry + '/screening', 'PATCH', {'status': 'Shortlisted'})
        print('PASS Applicant route and catalogue denial, real first-submission lock and pending duration retained')

        handoff = {}
        window = {'date': '2026-11-24', 'start': '09:00', 'end': '12:10'}
        saved_assignments = None
        for duration, count in [(15, 12), (20, 9), (30, 6)]:
            page.get_by_label('Slot duration').select_option(str(duration))
            setup = save(page)
            expect(page.get_by_text(f'{count} saved interview slots · 4 offered windows')).to_be_visible()
            require(setup['availabilityLocked'] and [item['id'] for item in setup['availabilityWindows']] == offered,
                    'Duration change altered applicant windows')
            require(len(setup['slots']) == count, 'Trailing partial slot was retained')
            schedule = api(page, token, '/api/schedule')
            if duration == 20:
                require(schedule['state'] == 'Draft' and all(row['status'] == 'Unassigned'
                        and any(issue['code'] == 'INVALID_SLOT' for issue in row['issues']) for row in schedule['rows']),
                        'Existing 15-minute assignments were not revalidated on the 20-minute grid')
            preview = api(page, token, '/api/schedule/draft', 'POST',
                          {'action': 'generate', 'revision': schedule['revision'], 'window': window})
            slots = {slot['id'] for slot in setup['slots']}
            rows = preview['rows']
            require(len(rows) == 2 and all(row['status'] == 'Proposed' and row['slotId'] in slots
                    and row['roomId'] == 'R-B' and row['interviewerId'] == 'I01' for row in rows),
                    f'Unexpected C8 assignment for {duration} minutes')
            require([row['positionId'] for row in rows] == ['content', 'comms'], 'Unexpected positions')
            handoff[duration] = [{key: row[key] for key in ('applicationId', 'positionId', 'interviewerId', 'roomId', 'slotId')} for row in rows]
            saved_assignments = [{key: row[key] for key in ('applicationId', 'interviewerId', 'roomId', 'slotId')} for row in rows]
            if duration == 15:
                api(page, token, '/api/schedule', 'PUT', {'window': window, 'revision': schedule['revision'],
                                                         'assignments': saved_assignments})
            page.reload()
            expect(page.get_by_label('Slot duration')).to_have_value(str(duration))
            expect(page.get_by_label('Interview day end')).not_to_be_editable()
        print('PASS 15/20/30-minute duration, same offered IDs, C8 assignments, revalidation and reload')

        revision = api(page, token, '/api/schedule', 'PUT', {'window': window, 'revision': schedule['revision'],
                                                           'assignments': saved_assignments})['revision']
        api(page, token, '/api/demo/steps', 'POST', {'action': 'pastClose'})
        api(page, token, '/api/schedule/confirmation', 'POST', {'revision': revision})
        page.get_by_label('Slot duration').select_option('20')
        require(save(page, 409)['error']['code'] == 'LOCKED', 'Expected confirmed lock')
        expect(button(page, 'Save interview setup')).to_be_disabled()
        page.reload()
        expect(page.get_by_text('The schedule is confirmed. Interview setup is read-only.')).to_be_visible()
        expect(page.get_by_label('Slot duration')).to_be_disabled()
        expect(page.get_by_label('Slot duration')).to_have_value('30')
        expect(page.get_by_role('checkbox', name='Room B', exact=True)).to_be_disabled()
        expect(page.get_by_role('link', name='Interview schedule', exact=True).last).to_have_attribute('href', '/executive/schedule')
        print('PASS real schedule confirmation, stale write rejected and saved configuration read-only on reopen')
        return {'offeredWindowIds': offered, 'generatedRows': handoff}


if __name__ == '__main__':
    with sync_playwright() as playwright:
        with playwright.chromium.launch(channel='chrome', headless=True) as browser:
            print(json.dumps(check_handoff(browser)))
