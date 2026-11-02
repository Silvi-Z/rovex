import { Fragment } from 'react';
import ContactForm from '../../components/ContactForm/ContactForm';
import { CONTACT_INTRO, CONTACT_ROWS } from '../../data/contactPage';
import './ContactHero.css';

export default function ContactHero() {
  return (
    <section className="chero">
      <div className="chero__glow chero__glow--top" role="presentation" />
      <div className="chero__glow chero__glow--bottom" role="presentation" />

      <div className="container chero__grid">
        <div className="chero__intro">
          <h1 className="chero__title">
            {CONTACT_INTRO.title.map((line, i) => (
              <Fragment key={line}>
                {i > 0 && <br />}
                {line}
              </Fragment>
            ))}
          </h1>

          <p className="chero__lead">
            {CONTACT_INTRO.lead.map((line, i) => (
              <Fragment key={line}>
                {i > 0 && <br />}
                {line}
              </Fragment>
            ))}
          </p>

          <ul className="chero__contacts">
            {CONTACT_ROWS.map(({ key, icon, iconSize, text, href }) => (
              <li className={`chero__contact chero__contact--${key}`} key={key}>
                <img
                  className="chero__contact-icon"
                  src={icon}
                  width={iconSize.width}
                  height={iconSize.height}
                  alt=""
                />
                {href ? <a href={href}>{text}</a> : <span>{text}</span>}
              </li>
            ))}
          </ul>
        </div>

        <ContactForm />
      </div>
    </section>
  );
}
