import { usePageTitle } from '../i18n/I18nProvider';
import ProjectsHero from '../sections/ProjectsHero/ProjectsHero';
import ProjectGallery from '../sections/ProjectGallery/ProjectGallery';
import CtaBanner from '../sections/CtaBanner/CtaBanner';
import Footer from '../components/Footer/Footer';

/** Figma frame 66:435 "Projects". */
export default function ProjectsPage() {
  usePageTitle('nav.projects');

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
