import React from 'react';
import { ErrorMessage, Field } from './CampaignFields.jsx';
import { durations, newInterval } from './interviewSetupForm.js';

function withUnavailable(options, selected) {
  const unavailable = selected.filter(id => !options.some(option => option.id === id));
  return [...options, ...unavailable.map(id => ({ id, name: 'Unavailable (' + id + ')' }))];
}

function Choices({ path, label, options, selected, empty, errors, change }) {
  const error = errors[path];
  return <fieldset className="setup-group" id={path} tabIndex={-1}
    aria-describedby={error ? path + '-error' : undefined}>
    <legend>{label}</legend>
    {options.length === 0 && selected.length === 0 && <p className="muted">{empty}</p>}
    <div className="setup-options">
      {withUnavailable(options, selected).map(({ id, name }, index) => {
        const inputId = path + '-option-' + index;
        const checked = selected.includes(id);
        return <label className="setup-choice" key={id} htmlFor={inputId}>
          <input type="checkbox" id={inputId} checked={checked} aria-invalid={error ? true : undefined}
            aria-describedby={error ? path + '-error' : undefined}
            onChange={event => change(event.target.checked ? [...selected, id] : selected.filter(item => item !== id))} />
          {name}
        </label>;
      })}
    </div>
    <ErrorMessage path={path} message={error} />
  </fieldset>;
}

function Intervals({ path, label, rows, errors, change, frozen = false }) {
  return <fieldset className="setup-group" id={path} tabIndex={-1}
    aria-describedby={errors[path] ? path + '-error' : undefined}>
    <legend>{label}</legend>
    <ErrorMessage path={path} message={errors[path]} />
    {rows.length === 0 && <p className="muted">No intervals added.</p>}
    {rows.map((row, index) => {
      const prefix = path + '.' + row.key;
      return <fieldset className="setup-interval" key={row.key}>
        <legend>{'Interval ' + (index + 1)}</legend>
        <div className="editor-pair">
          {['start', 'end'].map(key => <Field key={key} path={prefix + '.' + key}
            label={key === 'start' ? 'Start time' : 'End time'} type="time" value={row[key]} readOnly={frozen}
            error={errors[prefix + '.' + key]} onChange={value =>
              change(rows.map(item => item.key === row.key ? { ...item, [key]: value } : item), prefix + '.' + key)} />)}
        </div>
        {!frozen && <button className="button remove-row" type="button"
          onClick={() => change(rows.filter(item => item.key !== row.key), prefix, prefix + '.', path + '-add')}>Remove interval</button>}
      </fieldset>;
    })}
    {!frozen && <button className="button" type="button" id={path + '-add'} onClick={() => {
      const row = newInterval();
      change([...rows, row], path, null, path + '.' + row.key + '.start');
    }}>Add interval</button>}
  </fieldset>;
}

export function SetupFields({ form, catalog, availabilityLocked, errors, edit }) {
  function field(path, label, props) {
    return <Field path={path} label={label} value={form[path]} error={errors[path]} {...props}
      onChange={value => edit({ ...form, [path]: value }, path)} />;
  }
  function updatePerson(id, person, path, removedPrefix, focus) {
    let interviewers = form.interviewers.filter(item => item.id !== id);
    if (person) {
      interviewers = form.interviewers.some(item => item.id === id)
        ? form.interviewers.map(item => item.id === id ? person : item) : [...interviewers, person];
    }
    edit({ ...form, interviewers }, path, removedPrefix, focus);
  }
  return <>
    <section className="panel editor-section">
      <h2>Interview day</h2>
      <p className="muted">Use a single date after applications close. All times are in UTC+7.</p>
      <div className="editor-pair">
        {field('date', 'Interview date', { type: 'date', readOnly: availabilityLocked })}
        {field('durationMinutes', 'Slot duration', { options: durations.map(value => ({ value, label: value + ' minutes' })) })}
      </div>
      <div className="editor-pair">
        {field('start', 'Interview day start', { type: 'time', readOnly: availabilityLocked })}
        {field('end', 'Interview day end', { type: 'time', readOnly: availabilityLocked })}
      </div>
      <p className="muted">Changing the duration rebuilds the interview slots. Review any saved assignments after changing it.</p>
      <p className="muted">Offer at least three distinct intervals for applicants to choose.</p>
      <Intervals path="availabilityWindows" label="Applicant availability windows" rows={form.availabilityWindows}
        frozen={availabilityLocked} errors={errors} change={(rows, path, removedPrefix, focus) =>
          edit({ ...form, availabilityWindows: rows }, path, removedPrefix, focus)} />
    </section>
    <section className="panel editor-section">
      <h2>Rooms and interviewers</h2>
      <Choices path="roomIds" label="Rooms" options={catalog.rooms} selected={form.roomIds}
        empty="No rooms are available in the catalogue." errors={errors} change={roomIds => edit({ ...form, roomIds }, 'roomIds')} />
      <p className="muted">Choose positions for each participating interviewer. An interviewer without availability cannot receive an assignment.</p>
      {catalog.interviewers.length === 0 && form.interviewers.length === 0 && <p className="muted">No interviewers are available in the catalogue.</p>}
      <ErrorMessage path="interviewers" message={errors.interviewers} />
      {withUnavailable(catalog.interviewers, form.interviewers.map(({ id }) => id)).map(({ id, name }) => {
        const person = form.interviewers.find(item => item.id === id);
        const prefix = 'interviewers.' + id;
        return <fieldset className="setup-group" key={id}>
          <legend>{name}</legend>
          <label className="setup-choice" htmlFor={prefix + '.id'}>
            <input id={prefix + '.id'} type="checkbox" checked={!!person} aria-invalid={errors[prefix + '.id'] ? true : undefined}
              disabled={!person && !catalog.positions.length}
              aria-describedby={errors[prefix + '.id'] ? prefix + '.id-error' : undefined}
              onChange={event => updatePerson(id, event.target.checked ? { id, positionIds: [], availability: [] } : null,
                prefix + '.id', prefix + '.')} />
            {'Include ' + name}
          </label>
          <ErrorMessage path={prefix + '.id'} message={errors[prefix + '.id']} />
          {person && <>
            <Choices path={prefix + '.positionIds'} label="Qualified positions" options={catalog.positions} selected={person.positionIds}
              errors={errors} empty="No positions are available in the campaign."
              change={positionIds => updatePerson(id, { ...person, positionIds }, prefix + '.positionIds')} />
            <Intervals path={prefix + '.availability'} label="Interviewer availability" rows={person.availability} errors={errors}
              change={(availability, path, removedPrefix, focus) =>
                updatePerson(id, { ...person, availability }, path, removedPrefix, focus)} />
          </>}
        </fieldset>;
      })}
      {!catalog.positions.length && <p className="muted">Add campaign positions to configure qualifications.</p>}
    </section>
  </>;
}
