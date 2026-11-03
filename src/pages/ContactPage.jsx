import { usePageTitle } from '../i18n/I18nProvider';
import ContactHero from '../sections/ContactHero/ContactHero';
import ContactMap from '../sections/ContactMap/ContactMap';
import Footer from '../components/Footer/Footer';

/** Figma frame 55:12 "Contact". */
export default function ContactPage() {
  usePageTitle('nav.contact');

  return (
    <>
      <main className="page page--contact">
        <ContactHero />
        <ContactMap />
      </main>
      <Footer />
    </>
  );

}
