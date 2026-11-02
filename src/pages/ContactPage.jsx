import { useEffect } from 'react';
import ContactHero from '../sections/ContactHero/ContactHero';
import ContactMap from '../sections/ContactMap/ContactMap';
import Footer from '../components/Footer/Footer';

/** Figma frame 55:12 "Contact". */
export default function ContactPage() {
  useEffect(() => {
    document.title = 'Կապ — Rovex';
    return () => {
      document.title = 'Rovex';
    };
  }, []);

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
