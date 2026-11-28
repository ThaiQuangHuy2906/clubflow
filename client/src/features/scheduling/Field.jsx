import React from 'react';

// A labelled control whose help and error text are tied to it, so Tab announces them with the field.
export function Field({ id, label, help, error, children }) {
  const described = [help && id + '-help', error && id + '-error'].filter(Boolean).join(' ') || undefined;
  return <div className="schedule-field">
    <label htmlFor={id}>{label}</label>
    {React.cloneElement(children, { id, 'aria-invalid': error ? true : undefined, 'aria-describedby': described })}
    {help && <p id={id + '-help'} className="field-help">{help}</p>}
    {error && <p id={id + '-error'} className="field-error">{error}</p>}
  </div>;
}
