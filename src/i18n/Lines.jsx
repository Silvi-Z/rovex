import { Fragment } from 'react';

/**
 * Renders a translated value whose line breaks are part of the design
 * (stored as an array of lines in the locale files). A plain string is
 * rendered as-is.
 */
export default function Lines({ value }) {
  if (!Array.isArray(value)) return value;
  return value.map((line, index) => (
    <Fragment key={index}>
      {index > 0 && <br />}
      {line}
    </Fragment>
  ));
}
