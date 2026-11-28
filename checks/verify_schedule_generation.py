"""Check generation with an unapplied slot edit against a fresh normal demo mock.

Run Vite preview first. Set CLUBFLOW_PREVIEW_PORT if it uses a port other than 4173.
The case writes screening and a draft. Restart the disposable mock before rerunning it.
"""

import json
import os
from pathlib import Path

from playwright.sync_api import expect, sync_playwright


ORIGIN = f"http://127.0.0.1:{int(os.environ.get('CLUBFLOW_PREVIEW_PORT', '4173'))}"
SEED = Path(__file__).resolve().parents[1] / 'mock/data/seed.json'
DRAFT = ORIGIN + '/api/schedule/draft'


def verify_unapplied_edit(page):
    account = next(user for user in json.loads(SEED.read_text(encoding='utf-8'))['accounts']
                   if user['alias'] == 'exec')

    def button(name):
        return page.get_by_role('button', name=name, exact=True)

    page.goto(ORIGIN + '/sign-in')
    page.get_by_label('Email address').fill(account['email'])
    page.get_by_label('Password', exact=True).fill(account['password'])
    with page.expect_response(ORIGIN + '/api/auth/login') as login:
        button('Sign in').click()
    assert login.value.ok
    response = page.request.patch(ORIGIN + '/api/applications/A01/screening',
                                  data={'status': 'Shortlisted'},
                                  headers={'Authorization': 'Bearer ' + login.value.json()['token']})
    assert response.ok, response.text()
    expect(button('Sign out')).to_be_visible()
    page.goto(ORIGIN + '/executive/schedule')

    generate = button('Generate Draft')
    with page.expect_response(DRAFT) as first_generation:
        generate.click()
    assert first_generation.value.ok
    with page.expect_response(ORIGIN + '/api/schedule') as saved:
        button('Save Changes').click()
    assert saved.value.ok
    button('Edit A01').click()
    slot = page.get_by_label('Time slot', exact=True)
    original = slot.input_value()
    options = first_generation.value.json()['rows'][0]['availableSlotIds']
    changed = next(option for option in options if option != original)
    slot.select_option(changed)

    expect(generate).to_be_disabled()
    expect(page.locator('#unapplied-help')).to_contain_text('A01')
    expect(slot).to_have_value(changed)

    button('Cancel').click()
    expect(generate).to_be_enabled()
    with page.expect_response(DRAFT) as after_cancel:
        generate.click()
    assert after_cancel.value.ok


if __name__ == '__main__':
    with sync_playwright() as playwright:
        with playwright.chromium.launch(channel='chrome', headless=True) as browser:
            verify_unapplied_edit(browser.new_page())
    print('PASS Generate Draft preserves the unapplied choice and is available after Cancel')
