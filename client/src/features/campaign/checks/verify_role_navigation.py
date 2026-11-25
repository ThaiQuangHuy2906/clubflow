"""Check C2 against a normal seeded mock and Vite preview using Playwright and Chrome.

Run this file with Python. Set CLUBFLOW_PREVIEW_PORT if preview uses a port other than 4173.
"""

import json
import os
from pathlib import Path

from playwright.sync_api import Browser, Page, Response, expect, sync_playwright


ORIGIN = f"http://localhost:{int(os.environ.get('CLUBFLOW_PREVIEW_PORT', '4173'))}"
SEED = Path(__file__).resolve().parents[5] / 'mock/data/seed.json'
ACCOUNTS = {account['alias']: account for account in json.loads(SEED.read_text(encoding='utf-8'))['accounts']}


def require(condition: bool, message: str) -> None:
    if not condition:
        raise AssertionError(message)


def authenticated_read(response: Response, token: str) -> None:
    require(response.request.method == 'GET' and response.status == 200,
            f'Expected an authenticated GET to succeed, received {response.status}')
    require(response.request.header_value('authorization') == 'Bearer ' + token,
            'Read did not use the token issued to this account')


def sign_in(page: Page, alias: str, first_read: str) -> str:
    account = ACCOUNTS[alias]
    page.get_by_label('Email address').fill(account['email'])
    page.get_by_label('Password', exact=True).fill(account['password'])
    with page.expect_response(ORIGIN + first_read) as read:
        with page.expect_response(ORIGIN + '/api/auth/login') as login:
            page.get_by_role('button', name='Sign in', exact=True).click()
    require(login.value.request.method == 'POST' and login.value.status == 200, 'Sign-in failed')
    require(login.value.request.header_value('authorization') is None, 'Login carried a previous session')
    session = login.value.json()
    require(session['user'] == {key: account[key] for key in ('id', 'name', 'role')}, 'Unexpected API identity')
    require(bool(session['token']), 'Login returned an empty token')
    authenticated_read(read.value, session['token'])
    expect(page.get_by_text(session['user']['name'], exact=True).first).to_be_visible()
    return session['token']


def check_home_content(page: Page, alias: str, response: Response, token: str) -> None:
    authenticated_read(response, token)
    data = response.json()
    main = page.get_by_role('main')
    if alias == 'exec':
        expect(main.get_by_role('heading', name=data['draft']['name'], exact=True)).to_be_visible()
    elif alias == 'studentA':
        require(bool(data['items']), 'Expected applications for the seeded Applicant')
        for item in data['items']:
            expect(main.locator(f'a[href="/me/applications/{item["id"]}"]')).to_be_visible()
    else:
        require(not data['items'] and not data['confirmed'], 'Expected the unconfirmed interview seed')
        expect(main.get_by_text('Your assignments will appear after schedule confirmation.', exact=True)).to_be_visible()


def check_role_navigation(browser: Browser) -> None:
    homes = [
        ('exec', '/executive/campaign', '/api/campaign/draft'),
        ('studentA', '/me/applications', '/api/applications'),
        ('int-content', '/interviewer/interviews', '/api/interviews'),
        ('int-comms', '/interviewer/interviews', '/api/interviews'),
    ]
    for alias, home, first_read in homes:
        with browser.new_context() as context:
            page = context.new_page()
            page.goto(ORIGIN)
            page.get_by_role('link', name='Sign in', exact=True).click()
            token = sign_in(page, alias, first_read)
            expect(page).to_have_url(ORIGIN + home)
            workspace = page.get_by_role('navigation', name='Workspace navigation')
            role_links = workspace.get_by_role('link').evaluate_all('(links) => links.map(link => link.pathname)')
            expected_links = {home}
            if alias == 'exec':
                expected_links.update(['/executive/interview-setup', '/executive/applications',
                                       '/executive/schedule', '/executive/results'])
            require(sorted(role_links) == sorted(expected_links), f'Unexpected workspace links for {alias}')

            with page.expect_response(ORIGIN + '/api/campaign') as public:
                page.get_by_role('link', name='Public campaign', exact=True).click()
            expect(page).to_have_url(ORIGIN + '/')
            title = public.value.json()['campaign']['name']
            expect(page.get_by_role('heading', level=1, name=title, exact=True)).to_be_visible()
            apply = page.get_by_role('link', name='Apply for Content', exact=True)
            if alias == 'studentA':
                expect(apply).to_have_attribute('href', '/apply/content')
            else:
                expect(page.locator('main a[href^="/apply/"]')).to_have_count(0)
            with page.expect_response(ORIGIN + first_read) as returned:
                page.get_by_role('link', name='My workspace', exact=True).click()
            check_home_content(page, alias, returned.value, token)
            with page.expect_response(ORIGIN + first_read) as restored:
                page.reload()
            check_home_content(page, alias, restored.value, token)
            expect(page).to_have_url(ORIGIN + home)
            expect(workspace).to_be_visible()
            expect(page.get_by_text(ACCOUNTS[alias]['name'], exact=True).first).to_be_visible()
            print(f'PASS {alias}: issued identity, Bearer, role navigation and restored home')


def check_protected_return(browser: Browser) -> None:
    target = ORIGIN + '/apply/content?from=campaign#position'
    with browser.new_context() as context:
        page = context.new_page()
        page.goto(target)
        expect(page).to_have_url(ORIGIN + '/sign-in')
        page.keyboard.press('Tab')
        expect(page.get_by_role('link', name='Skip to content')).to_be_focused()
        page.keyboard.press('Enter')
        expect(page.get_by_role('main')).to_be_focused()
        email = page.get_by_label('Email address')
        password = page.get_by_label('Password', exact=True)
        email.fill(ACCOUNTS['studentA']['email'])
        password.fill('incorrect')
        with page.expect_response(ORIGIN + '/api/auth/login') as refusal:
            page.get_by_role('button', name='Sign in', exact=True).click()
        require(refusal.value.status == 401, 'Expected invalid credentials to return 401')
        expect(page.get_by_role('alert')).to_contain_text('Invalid email or password')
        expect(email).to_have_value(ACCOUNTS['studentA']['email'])
        expect(password).to_have_value('incorrect')

        sign_in(page, 'studentA', '/api/campaign')
        expect(page).to_have_url(target)
        page.reload()
        expect(page.get_by_role('heading', name='Apply for Content', exact=True)).to_be_visible()
        expect(page).to_have_url(target)
        page.goto(ORIGIN + '/executive/campaign')
        expect(page.get_by_role('heading', name='Access denied')).to_be_visible()
        # Invalidate this demo tab's saved token. The real mock drives the 401 and return to sign-in.
        page.evaluate("""() => {
          const session = JSON.parse(sessionStorage.getItem('clubflow.session'));
          session.token = 'expired-demo-session';
          sessionStorage.setItem('clubflow.session', JSON.stringify(session));
        }""")
        with page.expect_response(ORIGIN + '/api/campaign') as expired:
            page.goto(target)
        require(expired.value.status == 401, 'Expected the expired session to return 401')
        expect(page).to_have_url(ORIGIN + '/sign-in')
        require(page.evaluate("sessionStorage.getItem('clubflow.session') === null"), 'Expired session survived')
        sign_in(page, 'studentA', '/api/campaign')
        expect(page).to_have_url(target)
        print('PASS invalid login, protected return with query and fragment, wrong role and session expiry')


def check_account_switch(browser: Browser) -> None:
    with browser.new_context() as context:
        page = context.new_page()
        page.goto(ORIGIN + '/sign-in')
        sign_in(page, 'studentA', '/api/applications')
        links = page.locator('main a[href^="/me/applications/"]')
        expect(links).to_have_count(2)
        page.locator('main a[href="/me/applications/A01"]').click()
        expect(page.locator('main')).to_contain_text('A01')
        with page.expect_response(ORIGIN + '/api/campaign') as public:
            page.get_by_role('button', name='Sign out').click()
        require(public.value.request.header_value('authorization') is None, 'Public read retained the previous token')
        require(page.evaluate("sessionStorage.getItem('clubflow.session') === null"), 'Session survived sign-out')
        page.go_back()
        expect(page).to_have_url(ORIGIN + '/sign-in')
        expect(page.locator('main')).not_to_contain_text('A01')

        sign_in(page, 'studentB', '/api/applications')
        expect(links).to_have_count(1)
        expect(links).to_have_attribute('href', '/me/applications/A03')
        expect(page.get_by_text(ACCOUNTS['studentA']['name'], exact=True)).to_have_count(0)
        with page.expect_response(ORIGIN + '/api/applications/A01') as detail:
            page.goto(ORIGIN + '/me/applications/A01')
        require(detail.value.status == 403, 'An application belonging to another account should be denied')
        expect(page.get_by_role('heading', level=1, name='Access denied')).to_be_visible()
        expect(page.locator('main')).not_to_contain_text('A01')
        print('PASS same-tab sign-out, Back, second Applicant, and owner-only details')


def check_credential_bounds(browser: Browser) -> None:
    with browser.new_page() as page:
        page.goto(ORIGIN + '/sign-in')
        email = page.get_by_label('Email address')
        password = page.get_by_label('Password', exact=True)
        submit = page.get_by_role('button', name='Sign in', exact=True)
        login_url = ORIGIN + '/api/auth/login'
        sends = []
        page.on('request', lambda request: sends.append(request.method) if request.url == login_url else None)
        max_email = 'x' * 64 + '@' + '.'.join(['a' * 62, 'b' * 62, 'c' * 61, 'd'])
        max_password = '🔒' * 128
        email.fill(max_email + 'e')
        password.fill(max_password + 'x')
        submit.click()
        expect(email).to_be_focused()
        for field in (email, password):
            expect(field).to_have_attribute('aria-invalid', 'true')
            expect(page.locator('#' + field.get_attribute('aria-describedby'))).to_be_visible()
        expect(email).to_have_value(max_email + 'e')
        expect(password).to_have_value(max_password + 'x')
        password.fill(max_password)
        submit.click()
        expect(email).to_be_focused()
        expect(password).to_have_attribute('aria-invalid', 'false')
        email.fill(max_email)
        password.fill(max_password + 'x')
        submit.click()
        expect(password).to_be_focused()
        expect(email).to_have_attribute('aria-invalid', 'false')
        password.fill(max_password)
        with page.expect_response(login_url) as allowed:
            submit.click()
        require(allowed.value.status == 401, 'The mock should accept boundary lengths and reject unknown credentials')
        require(sends == ['POST'], 'An out-of-bounds submit reached the API')
        print('PASS credential length boundaries, field descriptions, focus and request count')


def check_pending_credentials(browser: Browser) -> None:
    with browser.new_page() as page:
        page.goto(ORIGIN + '/sign-in')
        login_url = ORIGIN + '/api/auth/login'
        account = ACCOUNTS['studentA']
        email = page.get_by_label('Email address')
        password = page.get_by_label('Password', exact=True)
        held = []
        # Hold the login until a keyboard edit has been attempted, then use the real mock response.
        page.route(login_url, lambda route: held.append(route))
        for address, status in [('user@invalid', 400), (account['email'], 401)]:
            email.fill(address)
            password.fill('incorrect')
            page.get_by_role('button', name='Sign in', exact=True).click()
            expect(page.get_by_role('button', name='Signing in…')).to_be_disabled()
            for field, value in [(email, address), (password, 'incorrect')]:
                expect(field).not_to_be_editable()
                field.focus()
                page.keyboard.insert_text('x')
                expect(field).to_have_value(value)
            route = held.pop()
            response = route.fetch()
            require(response.status == status, f'Expected the pending mock response to be {status}')
            route.fulfill(response=response)
            expect(page.get_by_role('alert')).to_be_visible()
            expect(email).to_be_editable()
            expect(password).to_be_editable()
            if status == 400:
                expect(email).to_be_focused()
                expect(email).to_have_attribute('aria-invalid', 'true')
                description = page.locator('#' + email.get_attribute('aria-describedby'))
                expect(description).to_have_text(response.json()['error']['fields']['email'])
                email.fill(account['email'])
                expect(email).to_have_attribute('aria-invalid', 'false')
            else:
                password.fill(account['password'])
            expect(page.get_by_role('alert')).to_have_count(0)
        page.unroute(login_url)
        sign_in(page, 'studentA', '/api/applications')
        expect(page).to_have_url(ORIGIN + '/me/applications')
        print('PASS pending 400 and 401, editable fields after refusal and successful correction')


if __name__ == '__main__':
    with sync_playwright() as playwright:
        with playwright.chromium.launch(channel='chrome', headless=True) as browser:
            check_role_navigation(browser)
            check_protected_return(browser)
            check_account_switch(browser)
            check_credential_bounds(browser)
            check_pending_credentials(browser)
