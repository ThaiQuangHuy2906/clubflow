import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { apiRequest } from '../../api.js';
import { useAuth } from '../../auth.jsx';
import { CampaignTime, Denied, EmptyState, ErrorState, Resource, useResource } from '../../ui.jsx';
import './apply.css';

const MIN_WINDOWS = 3;
const MAX_WORDS = 300;
const MAX_CV_BYTES = 5 * 1024 * 1024;
const identityFields = [
  ['studentName', 'Full name'],
  ['studentNumber', 'Student number'],
  ['faculty', 'Faculty']
];

const trimText = value => value.replace(/^[\s\u0085]+|[\s\u0085]+$/gu, '');
const wordCount = value => value ? value.split(/[\s\u0085]+/u).length : 0;
const fieldId = name => 'apply-' + name;

function validEmail(value) {
  const [local, domain, extra] = value.split('@');
  const atom = /^[\p{L}\p{M}\p{N}!#$%&'*+/=?^_\x60{|}~-]+$/u;
  if ([...value].length > 254 || extra !== undefined || !domain ||
      !local.split('.').every(part => atom.test(part)) || !/^[\p{L}\p{M}\p{N}.-]+$/u.test(domain)) {
    return false;
  }
  try {
    const labels = new URL('http://' + domain).hostname.split('.');
    return labels.length >= 2 && labels.every(label => /^[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?$/i.test(label));
  } catch {
    return false;
  }
}

async function cvError(file) {
  if (!file?.size) return 'Choose a nonempty PDF CV.';
  if (file.size > MAX_CV_BYTES) return 'The CV must be no larger than 5 MB.';
  const invalidPdf = 'Choose a PDF file with a .pdf extension and a valid PDF signature.';
  if (!/\.pdf$/i.test(file.name) || file.type !== 'application/pdf') return invalidPdf;
  try {
    if (await file.slice(0, 5).text() !== '%PDF-') return invalidPdf;
  } catch {
    return 'The CV could not be read. Choose the file again.';
  }
}

function fieldProps(name, errors, hintId) {
  return {
    ...describedField(name, errors, hintId),
    'aria-invalid': errors[name] ? true : undefined
  };
}

function describedField(name, errors, hintId) {
  const describedBy = [hintId, errors[name] && fieldId(name) + '-error'].filter(Boolean).join(' ');
  return { id: fieldId(name), 'aria-describedby': describedBy || undefined };
}

function FieldError({ name, errors }) {
  return errors[name] && <p className="field-error" id={fieldId(name) + '-error'}>{errors[name]}</p>;
}

function ApplicationForm({ position, profile, windows }) {
  const navigate = useNavigate();
  const [words, setWords] = useState(0);
  const [pending, setPending] = useState(false);
  const [failure, setFailure] = useState(null);
  const formRef = useRef(null);
  const active = useRef(null);
  const errors = failure?.fields ?? {};

  useEffect(() => () => active.current?.abort(), []);
  useEffect(() => {
    if (!failure || pending) return;
    const target = formRef.current.querySelector('[aria-invalid="true"], [data-invalid]') ??
      formRef.current.querySelector('[role="alert"]');
    target?.focus();
  }, [failure, pending]);

  async function submit(event) {
    event.preventDefault();
    if (active.current) return;

    const input = new FormData(event.currentTarget);
    const phone = trimText(input.get('phone'));
    const email = trimText(input.get('email'));
    const motivation = trimText(input.get('motivation'));
    const chosen = input.getAll('availabilityWindowIds');
    const cv = input.get('cv');
    const offered = new Set(windows.map(window => window.id));
    const fields = {};

    if (!validEmail(email)) fields.email = 'Enter a valid email address of up to 254 characters.';
    if (!/^\+?\d{7,15}$/.test(phone)) fields.phone = 'Enter 7 to 15 digits, with an optional leading +.';
    if (!motivation || wordCount(motivation) > MAX_WORDS) fields.motivation = 'Enter 1 to 300 words.';
    if (chosen.length < MIN_WINDOWS || new Set(chosen).size !== chosen.length || chosen.some(id => !offered.has(id))) {
      fields.availabilityWindowIds = 'Select at least three different offered windows.';
    }

    const controller = new AbortController();
    active.current = controller;
    setPending(true);
    setFailure(null);
    try {
      const invalidCv = await cvError(cv);
      controller.signal.throwIfAborted();
      if (invalidCv) fields.cv = invalidCv;
      if (Object.keys(fields).length) {
        setFailure({ fields, message: 'Check the highlighted fields.' });
        return;
      }

      const body = new FormData();
      body.set('positionId', position.id);
      body.set('phone', phone);
      body.set('email', email);
      body.set('motivation', motivation);
      body.set('cv', cv);
      for (const id of chosen) body.append('availabilityWindowIds', id);
      const { id } = await apiRequest('/api/applications', { method: 'POST', body, signal: controller.signal });
      controller.signal.throwIfAborted();
      navigate('/me/applications/' + encodeURIComponent(id));
    } catch (error) {
      if (!controller.signal.aborted) setFailure({ fields: error.fields, message: error.message });
    } finally {
      active.current = null;
      if (!controller.signal.aborted) setPending(false);
    }
  }

  return <form ref={formRef} className="apply-form" noValidate onSubmit={submit}>
    <fieldset className="apply-controls" disabled={pending}>
      <legend>Application details</legend>
      {errors.positionId && <div tabIndex={-1} data-invalid="" {...describedField('positionId', errors)}>
        <FieldError name="positionId" errors={errors} />
      </div>}
      <div className="apply-profile">
        {identityFields.map(([name, label]) => <div className="apply-field" key={name}>
          <label htmlFor={fieldId(name)}>{label}</label>
          <input {...fieldProps(name, errors)} value={profile[name]} readOnly />
          <FieldError name={name} errors={errors} />
        </div>)}
      </div>
      <p className="muted apply-hint">Email and phone changes apply to this application only.</p>
      <div className="apply-profile">
        <div className="apply-field">
          <label htmlFor={fieldId('email')}>Email address</label>
          <input {...fieldProps('email', errors)} name="email" inputMode="email" autoComplete="email"
            autoCapitalize="none" defaultValue={profile.email} required />
          <FieldError name="email" errors={errors} />
        </div>
        <div className="apply-field">
          <label htmlFor={fieldId('phone')}>Phone number</label>
          <input {...fieldProps('phone', errors)} name="phone" type="tel" autoComplete="tel"
            defaultValue={profile.phone} required />
          <FieldError name="phone" errors={errors} />
        </div>
      </div>
      <fieldset className="apply-windows" tabIndex={-1} data-invalid={errors.availabilityWindowIds ? '' : undefined}
        {...describedField('availabilityWindowIds', errors, 'apply-windows-hint')}>
        <legend>Interview availability</legend>
        <p className="muted apply-hint" id="apply-windows-hint">Choose at least three windows. All times are UTC+7.</p>
        <FieldError name="availabilityWindowIds" errors={errors} />
        <div className="apply-window-options">
          {windows.map(({ id, date, start, end }) => <label key={id}>
            <input type="checkbox" name="availabilityWindowIds" value={id} />
            <span><time dateTime={date}>{date}</time> · <span className="apply-window-time">{start}–{end}</span></span>
          </label>)}
        </div>
      </fieldset>
      <div className="apply-field">
        <label htmlFor={fieldId('motivation')}>Motivation</label>
        <textarea {...fieldProps('motivation', errors, 'apply-word-count')} name="motivation" rows={5} required
          onChange={event => setWords(wordCount(trimText(event.target.value)))} />
        <p className="muted apply-hint" id="apply-word-count">{words} / {MAX_WORDS} words</p>
        <FieldError name="motivation" errors={errors} />
      </div>
      <div className="apply-field">
        <label htmlFor={fieldId('cv')}>CV</label>
        <input {...fieldProps('cv', errors, 'apply-cv-hint')} name="cv" type="file" accept=".pdf,application/pdf" required />
        <p className="muted apply-hint" id="apply-cv-hint">PDF only, up to 5 MB (5,242,880 bytes).</p>
        <FieldError name="cv" errors={errors} />
      </div>
    </fieldset>
    {failure && <p tabIndex={-1} role="alert">{failure.message}</p>}
    <div className="actions">
      <button className="button primary" type="submit" disabled={pending}>
        {pending ? 'Submitting…' : 'Submit application'}
      </button>
      <Link className="button" to="/">View campaign</Link>
    </div>
  </form>;
}

export function ApplyPage() {
  const { positionId } = useParams();
  const { user } = useAuth();
  const applicant = user?.role === 'Applicant';
  const resource = useResource(applicant ? '/api/campaign' : null);
  if (!applicant) return <Denied />;

  const { campaign, acceptingApplications, profile, availabilityWindows = [] } = resource.data ?? {};
  const position = campaign?.departments.flatMap(department => department.positions).find(p => p.id === positionId);
  const title = position ? 'Apply for ' + position.name : 'Apply for a position';
  let unavailable;
  if (!campaign) {
    unavailable = <EmptyState message="No recruitment campaign has been published yet." />;
  } else if (!position) {
    unavailable = <EmptyState message="This position is unavailable in the current campaign." />;
  } else if (!acceptingApplications) {
    unavailable = <div className="state">
      <p>The campaign is currently closed to applications.</p>
      <dl className="apply-intake">
        <dt>Opens</dt><dd><CampaignTime value={campaign.opensAt} /></dd>
        <dt>Closes</dt><dd><CampaignTime value={campaign.closesAt} /></dd>
      </dl>
    </div>;
  } else if (!profile) {
    unavailable = <ErrorState message="Your applicant profile could not be loaded." onRetry={resource.reload} />;
  } else if (new Set(availabilityWindows.map(window => window.id)).size < MIN_WINDOWS) {
    unavailable = <EmptyState message="Applications require three interview windows. The campaign has not offered enough windows yet." />;
  }

  return <Resource title={title} resource={resource}>{() => <section className="panel apply-page">
    <h1>{title}</h1>
    {position && <p className="muted">{campaign.name}</p>}
    {unavailable ?? <ApplicationForm key={position.id} position={position} profile={profile} windows={availabilityWindows} />}
    {unavailable && <Link className="button" to="/">View campaign</Link>}
  </section>}</Resource>;
}
