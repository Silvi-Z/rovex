import { useEffect } from 'react';
import ProjectsHero from '../sections/ProjectsHero/ProjectsHero';
import ProjectGallery from '../sections/ProjectGallery/ProjectGallery';
import CtaBanner from '../sections/CtaBanner/CtaBanner';
import Footer from '../components/Footer/Footer';

/** Figma frame 66:435 "Projects". */
export default function ProjectsPage() {
  useEffect(() => {
    document.title = 'Նախագծեր — Rovex';
    return () => {
      document.title = 'Rovex';
    };
  }, []);

  return (
    <>
      <main className="page page--projects">
        <ProjectsHero />
        <ProjectGallery />
        <CtaBanner />
      </main>
      <Footer />
    </>
  );
}
