import { useState } from 'react';
import './Accordion.css';

/**
 * Rows without body copy render as static text rather than buttons — the
 * frame supplies copy for the first row only, so there is nothing for the
 * others to reveal.
 */
function AccordionRow({ item, isOpen, onToggle }) {
  const panelId = `acc-panel-${item.id}`;

  if (!item.body) {
    return (
      <div className="acc__item">
        <div className="acc__head acc__head--static">
          <span className="acc__label">{item.label}</span>
          <span className="acc__icon acc__icon--plus" aria-hidden="true">+</span>
        </div>
      </div>
    );
  }

  return (
    <div className={isOpen ? 'acc__item is-open' : 'acc__item'}>
      <button
        className="acc__head"
        type="button"
        aria-expanded={isOpen}
        aria-controls={panelId}
        onClick={onToggle}
      >
        <span className="acc__label">{item.label}</span>
        <span
          className={isOpen ? 'acc__icon' : 'acc__icon acc__icon--plus'}
          aria-hidden="true"
        >
          {isOpen ? '-' : '+'}
        </span>
      </button>
      <div className="acc__panel" id={panelId}>
        <p className="acc__text">{item.body}</p>
      </div>
    </div>
  );
}

export default function Accordion({ items, defaultOpenId = null }) {
  const [openId, setOpenId] = useState(defaultOpenId);

  return (
    <div className="acc">
      {items.map((item) => (
        <AccordionRow
          key={item.id}
          item={item}
          isOpen={openId === item.id}
          onToggle={() => setOpenId((current) => (current === item.id ? null : item.id))}
        />
      ))}
      <div className="acc__rule" role="presentation" />
    </div>
  );
}
