import React from 'react';
import { newDepartment, newPosition } from './campaignForm.js';

export function ErrorMessage({ path, message }) {
  return message && <p className="field-error" id={path + '-error'}>{message}</p>;
}

export function Field({ path, label, value, onChange, error, multiline, hint, options, ...props }) {
  const Control = options ? 'select' : multiline ? 'textarea' : 'input';
  const describedBy = [hint, error && path + '-error'].filter(Boolean).join(' ') || undefined;
  return <div className="editor-field">
    <label htmlFor={path}>{label}</label>
    <Control {...props} id={path} name={path} value={value ?? ''} onChange={event => onChange(event.target.value)}
      aria-invalid={error ? true : undefined} aria-describedby={describedBy}>
      {options?.map(({ value, label }) => <option key={value} value={value}>{label}</option>)}
    </Control>
    <ErrorMessage path={path} message={error} />
  </div>;
}

export function CampaignFields({ values, errors, edit }) {
  function field(key, label, multiline = false) {
    return <Field path={key} label={label} multiline={multiline} value={values[key]} error={errors[key]}
      onChange={value => edit({ ...values, [key]: value }, key)} />;
  }
  return <section className="panel editor-section">
    <h2>Campaign details</h2>
    <p className="muted">You can save an incomplete draft. Complete all details and positions to publish.</p>
    <div className="editor-pair">{field('name', 'Campaign name')}{field('hostClub', 'Host club')}</div>
    {field('description', 'Campaign description', true)}
    {field('instructions', 'Application instructions', true)}
    <h3>Application window</h3>
    <p className="muted" id="editor-time-help">Times are in UTC+7. Leave the times blank to open at midnight and include the entire closing date.</p>
    {['opensAt', 'closesAt'].map(key => {
      const label = key === 'opensAt' ? 'Opening' : 'Closing';
      const stamp = values[key];
      return <div className="editor-pair" key={key}>
        <Field path={key} label={label + ' date'} type="date" value={stamp.date} hint="editor-time-help" error={errors[key]}
          onChange={date => edit({ ...values, [key]: { ...stamp, date } }, key)} />
        <Field path={key + '.time'} label={label + ' time (optional)'} placeholder="HH:mm" value={stamp.time}
          error={errors[key + '.time']} hint="editor-time-help"
          onChange={time => edit({ ...values, [key]: { ...stamp, time } }, key + '.time')} />
      </div>;
    })}
  </section>;
}

function AddRow({ path, label, error, onClick, disabled }) {
  return <div>
    <button type="button" className="button" id={path} disabled={disabled} onClick={onClick}
      aria-describedby={error ? path + '-error' : undefined}>{label}</button>
    <ErrorMessage path={path} message={error} />
  </div>;
}

function PositionFields({ position, prefix, number, errors, update, remove }) {
  function field(key, label, props) {
    const path = prefix + '.' + key;
    return <Field path={path} label={label} value={position[key]} error={errors[path]} {...props}
      onChange={value => update({ ...position, [key]: value }, path)} />;
  }
  return <fieldset className="editor-position">
    <legend>Position {number}</legend>
    <div className="editor-pair">{field('name', 'Position name')}{field('quota', 'Quota', { inputMode: 'numeric' })}</div>
    {field('description', 'Position description', { multiline: true })}
    {field('requirements', 'Requirements', { multiline: true })}
    <button type="button" className="button remove-row" onClick={remove}>Remove position</button>
  </fieldset>;
}

export function DepartmentFields({ departments, errors, change }) {
  return <section className="panel editor-section">
    <h2>Departments and positions</h2>
    {!departments.length && <p className="muted">No departments yet.</p>}
    {departments.map((department, i) => {
      const prefix = 'departments.' + department.id;
      const positionsPath = prefix + '.positions';
      const rows = department.positions;
      function update(patch, path, options) {
        change(departments.map(row => row.id === department.id ? { ...row, ...patch } : row), path, options);
      }
      return <fieldset className="editor-department" key={department.id}>
        <legend>Department {i + 1}</legend>
        <Field path={prefix + '.name'} label="Department name" value={department.name} error={errors[prefix + '.name']}
          onChange={name => update({ name }, prefix + '.name')} />
        {!rows.length && <p className="muted">No positions in this department yet.</p>}
        {rows.map((position, j) => {
          const path = positionsPath + '.' + position.id;
          return <PositionFields key={position.id} position={position} prefix={path} number={j + 1} errors={errors}
            update={(next, field) => update({ positions: rows.map(row => row.id === next.id ? next : row) }, field)}
            remove={() => update({ positions: rows.filter(row => row.id !== position.id) }, path,
              { removed: true, focus: positionsPath })} />;
        })}
        <div className="actions">
          <AddRow path={positionsPath} label="Add position" error={errors[positionsPath]} disabled={rows.length >= 50}
            onClick={() => {
              const position = newPosition();
              update({ positions: [...rows, position] }, positionsPath, { focus: positionsPath + '.' + position.id + '.name' });
            }} />
          <button type="button" className="button remove-row"
            onClick={() => change(departments.filter(row => row.id !== department.id), prefix,
              { removed: true, focus: 'departments' })}>Remove department</button>
        </div>
      </fieldset>;
    })}
    <AddRow path="departments" label="Add department" error={errors.departments} disabled={departments.length >= 30}
      onClick={() => {
        const department = newDepartment();
        change([...departments, department], 'departments', { focus: 'departments.' + department.id + '.name' });
      }} />
  </section>;
}
