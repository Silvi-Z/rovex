import Hero from '../sections/Hero/Hero';
import WhyRovex from '../sections/WhyRovex/WhyRovex';
import Process from '../sections/Process/Process';
import Projects from '../sections/Projects/Projects';
import Partners from '../sections/Partners/Partners';
import CtaBanner from '../sections/CtaBanner/CtaBanner';
import Footer from '../components/Footer/Footer';

/** The approved landing page, in the section order of the Figma frame. */
export default function HomePage() {
  return (
    <>
      <main className="page page--home">
        <Hero />
        <WhyRovex />
        <Process />
        <Projects />
        <Partners />
        <CtaBanner />
      </main>
      <Footer />
    </>
  );
}
