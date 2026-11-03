import ContactForm from '../../components/ContactForm/ContactForm';
import ContactLink from '../../components/ContactLink';
import { CONTACT_ROWS } from '../../data/contactPage';
import { useTranslation } from '../../i18n/I18nProvider';
import Lines from '../../i18n/Lines';
import './ContactHero.css';

export default function ContactHero() {
  const { t } = useTranslation();

  return (
    <section className="chero">
      <div className="chero__glow chero__glow--top" role="presentation" />
      <div className="chero__glow chero__glow--bottom" role="presentation" />

      <div className="container chero__grid">
        <div className="chero__intro">
          <h1 className="chero__title">
            <Lines value={t('cta.heading')} />
          </h1>

          <p className="chero__lead">
            <Lines value={t('contact.lead')} />
          </p>

          <ul className="chero__contacts">
            {CONTACT_ROWS.map(({ key, icon, iconSize, text, textKey, href, external }) => {
              const label = textKey ? t(textKey) : text;
              return (
                <li className={`chero__contact chero__contact--${key}`} key={key}>
                  <img
                    className="chero__contact-icon"
                    src={icon}
                    width={iconSize.width}
                    height={iconSize.height}
                    alt=""
                  />
                  <ContactLink href={href} external={external}>{label}</ContactLink>
                </li>
              );
            })}
          </ul>
        </div>

        <ContactForm />
      </div>
    </section>
  );
}
