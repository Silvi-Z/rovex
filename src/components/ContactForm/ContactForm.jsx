import { useId, useState } from 'react';
import { FORM } from '../../data/contactPage';
import './ContactForm.css';

/**
 * The white enquiry card.
 *
 * The frame specifies no success, error or validation states, so the form is
 * left as markup: it reports the chosen file name (the only state the design
 * implies, via the file row) and otherwise does not submit anywhere.
 */
export default function ContactForm() {
  const id = useId();
  const [fileName, setFileName] = useState('');

  return (
    <form className="cform" onSubmit={(e) => e.preventDefault()} noValidate>
      <h2 className="cform__title">{FORM.title}</h2>

      {FORM.fields.map(({ name, label, type, autoComplete }) => (
        <div className="cform__row" key={name}>
          <label className="cform__label" htmlFor={`${id}-${name}`}>{label}</label>
          <input
            className="cform__input"
            id={`${id}-${name}`}
            name={name}
            type={type}
            autoComplete={autoComplete}
          />
        </div>
      ))}

      <div className="cform__row">
        <span className="cform__label" id={`${id}-file-label`}>{FORM.file.label}</span>
        <label className="cform__file" htmlFor={`${id}-file`}>
          <img className="cform__file-icon" src="/assets/icon-upload.png" width="26" height="26" alt="" />
          <span className="cform__file-action">{FORM.file.action}</span>
          <span className="cform__file-hint">{fileName || FORM.file.hint}</span>
          <input
            className="cform__file-input"
            id={`${id}-file`}
            name="attachment"
            type="file"
            accept={FORM.file.accept}
            aria-labelledby={`${id}-file-label`}
            onChange={(e) => setFileName(e.target.files?.[0]?.name ?? '')}
          />
        </label>
      </div>

      <button className="cform__submit" type="submit">{FORM.submit}</button>
    </form>
  );
}
