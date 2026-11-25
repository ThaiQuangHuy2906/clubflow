"""Run against a fresh, disposable normal demo mock and Vite preview (same setup as H2)."""

from playwright.sync_api import Browser, Page, expect, sync_playwright

from verify_role_navigation import ORIGIN, require, sign_in


def click(page: Page, name: str) -> None:
    page.get_by_role('button', name=name, exact=True).click()


def check_editor(browser: Browser) -> None:
    with browser.new_context() as context:
        page = context.new_page()
        writes = []
        paths = ('/api/campaign/draft', '/api/campaign/publication')
        page.on('request', lambda r: writes.append(r.method) if r.method in ('PUT', 'POST')
                and r.url in [ORIGIN + path for path in paths] else None)
        page.goto(ORIGIN + '/sign-in')
        sign_in(page, 'exec', paths[0])
        page.get_by_text('Demo controls', exact=True).click()
        click(page, 'Begin creation walkthrough')
        expect(page.get_by_role('heading', name='New campaign')).to_be_visible()
        expect(page.get_by_label('Campaign name', exact=True)).to_have_value('')
        expect(page.get_by_text('No departments yet.')).to_be_visible()

        click(page, 'Publish Campaign')
        name = page.get_by_label('Campaign name', exact=True)
        expect(name).to_be_focused()
        expect(page.get_by_text('Add at least one department.')).to_be_visible()
        name.fill('Creation walkthrough')
        page.get_by_label('Host club').fill('Media club')
        page.get_by_label('Campaign description').fill('Autumn recruitment')
        page.get_by_label('Application instructions').fill('Choose one position.')
        page.get_by_label('Opening date').fill('2026-11-16')
        page.get_by_label('Closing date').fill('2026-11-15')
        click(page, 'Save as Draft')
        expect(page.get_by_label('Closing date')).to_be_focused()
        expect(page.get_by_text('Closing must be later than opening.')).to_be_visible()
        page.get_by_label('Closing date').fill('2026-11-20')

        click(page, 'Add department')
        click(page, 'Add department')
        groups = page.locator('fieldset.editor-department')
        kept = groups.nth(1)
        kept.get_by_label('Department name').fill('Editorial')
        kept.get_by_role('button', name='Add position').click()
        kept.get_by_role('button', name='Add position').click()
        row = kept.locator('fieldset.editor-position').nth(1)
        row.get_by_label('Position name').fill('Copy editor')
        row.get_by_label('Quota').fill('0')
        click(page, 'Publish Campaign')
        quota_id = row.get_by_label('Quota').get_attribute('id')
        quota = page.locator('[id="' + quota_id + '"]')
        message = page.locator('[id="' + quota.get_attribute('aria-describedby') + '"]')
        expect(message).to_have_text('Enter a whole number from 1 to 999.')
        groups.first.get_by_role('button', name='Remove department').click()
        page.get_by_role('button', name='Remove position').first.click()
        expect(quota).to_have_value('0')
        expect(message).to_be_visible()
        expect(page.get_by_label('Position name')).to_have_value('Copy editor')
        require(not writes, 'Invalid edits sent a write')
        print('PASS local validation, date order and stable field errors after both row removals')

        quota.fill('')
        with page.expect_response(ORIGIN + paths[0]) as save:
            click(page, 'Save as Draft')
        require(save.value.status == 200, 'Incomplete draft save failed')
        saved = save.value.json()['draft']
        position = saved['departments'][0]['positions'][0]
        require(position['quota'] is None and saved['closesAt'] == '2026-11-21T00:00:00+07:00',
                'Partial quota or inclusive closing date was serialized incorrectly')
        expect(page.get_by_text('Draft saved.', exact=True)).to_be_visible()
        page.reload()
        expect(page.get_by_label('Position name')).to_have_value('Copy editor')
        expect(page.get_by_label('Closing date')).to_have_value('2026-11-20')
        expect(quota).to_have_value('')
        visitor = browser.new_page()
        try:
            visitor.goto(ORIGIN)
            expect(visitor.get_by_text('No campaign has been published yet.', exact=False)).to_be_visible()
            name.fill('Live recruitment')
            quota.fill('4')
            page.get_by_label('Position description').fill('Edit articles')
            page.get_by_label('Requirements', exact=True).fill('A writing sample')
            click(page, 'Preview Campaign')
            expect(page.get_by_role('heading', level=1, name='Live recruitment')).to_be_visible()
            expect(page.get_by_text('A writing sample', exact=True)).to_be_visible()
            expect(page.get_by_text('Open for applications', exact=True)).to_be_visible()
            expect(page.get_by_role('link', name='Apply', exact=False)).to_have_count(0)
            require(writes == ['PUT'], 'Preview persisted the editor contents')
            click(page, 'Back to editor')
            expect(page.get_by_role('button', name='Preview Campaign')).to_be_focused()
            with page.expect_response(ORIGIN + paths[1]) as published:
                click(page, 'Publish Campaign')
            require(published.value.status == 200 and published.value.json()['published'], 'Publication failed')
            expect(page.get_by_text('Campaign published.', exact=True)).to_be_visible()
            visitor.reload()
            expect(visitor.get_by_role('heading', level=1, name='Live recruitment')).to_be_visible()
            expect(visitor.get_by_role('link', name='Apply for Copy editor')).to_have_attribute('href', '/apply/' + position['id'])
            expect(visitor.get_by_text('Edit articles', exact=True)).to_be_visible()
            name.fill('Next private draft')
            click(page, 'Save as Draft')
            expect(page.get_by_text('Draft saved.', exact=True)).to_be_visible()
            visitor.reload()
            expect(visitor.get_by_role('heading', level=1, name='Live recruitment')).to_be_visible()
            with page.expect_response(ORIGIN + '/api/applications') as review:
                page.get_by_role('main').get_by_role('link', name='Applications', exact=True).click()
            require(review.value.status == 200 and review.value.json()['total'] == 0, 'Publishing created applications')
            expect(page.get_by_text('No applications have been submitted.')).to_be_visible()
            require(writes == ['PUT', 'POST', 'PUT'], 'Unexpected writes in creation walkthrough')
            print('PASS draft reopen, private preview, public snapshot, later draft isolation and empty application review')
        finally:
            visitor.close()


def check_refresh_after_save(browser: Browser) -> None:
    with browser.new_page() as page:
        draft_url = ORIGIN + '/api/campaign/draft'
        page.goto(ORIGIN + '/sign-in')
        sign_in(page, 'exec', '/api/campaign/draft')
        page.goto(ORIGIN + '/executive/campaign')
        name = page.get_by_label('Campaign name', exact=True)
        name.fill('Draft saved before refresh')
        quota = page.get_by_label('Quota', exact=True)
        quota_path = quota.get_attribute('id')
        reject_field = True
        status = 500

        def respond(route):
            if route.request.method == 'PUT' and reject_field:
                route.fulfill(status=400, json={'error': {'code': 'VALIDATION', 'message': 'Check the highlighted fields.',
                              'fields': {quota_path: 'Review this quota.'}}})
            elif route.request.method == 'GET':
                error = {'code': 'MOCK_ERROR', 'message': 'Refresh unavailable.', 'fields': {}}
                if status == 403:
                    error.update(code='FORBIDDEN', message='Access denied.')
                route.fulfill(status=status, json={'error': error})
            else:
                route.continue_()

        page.route(draft_url, respond)
        click(page, 'Save as Draft')
        expect(quota).to_be_focused()
        expect(page.locator('[id="' + quota.get_attribute('aria-describedby') + '"]')).to_have_text('Review this quota.')
        expect(name).to_have_value('Draft saved before refresh')
        reject_field = False
        click(page, 'Save as Draft')
        expect(page.get_by_role('alert')).to_have_text('Refresh unavailable.')
        expect(name).to_have_value('Draft saved before refresh')
        status = 403
        click(page, 'Retry')
        expect(page.get_by_role('heading', name='Access denied')).to_be_visible()
        expect(name).to_have_count(0)
        print('PASS nested server error focus, successful retry, temporary refresh failure and subsequent access denial')


if __name__ == '__main__':
    with sync_playwright() as playwright:
        with playwright.chromium.launch(channel='chrome', headless=True) as browser:
            check_editor(browser)
            check_refresh_after_save(browser)
