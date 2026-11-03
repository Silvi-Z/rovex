import { useEffect } from 'react';
import AboutHero from '../sections/AboutHero/AboutHero';
import FullCycle from '../sections/FullCycle/FullCycle';
import AboutGallery from '../sections/AboutGallery/AboutGallery';
import Partners from '../sections/Partners/Partners';
import Clients from '../sections/Clients/Clients';
import CtaBanner from '../sections/CtaBanner/CtaBanner';
import Footer from '../components/Footer/Footer';

/** Figma frame 106:45 "About us". */
export default function AboutPage() {
  useEffect(() => {
    document.title = 'Մեր մասին — Rovex';
    return () => {
      document.title = 'Rovex';
    };
  }, []);

  return (
    <>
      <main className="page page--about">
        <AboutHero />
        <FullCycle />
        <AboutGallery />
        <Partners className="partners--flush-bottom" />
        <Clients />
        <CtaBanner />
      </main>
      <Footer />
    </>
  );
}
