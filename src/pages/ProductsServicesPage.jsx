import { usePageTitle } from '../i18n/I18nProvider';
import ServicesHero from '../sections/ServicesHero/ServicesHero';
import ServiceCards from '../sections/ServiceCards/ServiceCards';
import Production from '../sections/Production/Production';
import Maintenance from '../sections/Maintenance/Maintenance';
import Process from '../sections/Process/Process';
import CtaBanner from '../sections/CtaBanner/CtaBanner';
import Footer from '../components/Footer/Footer';

/** Figma frame 143:325 "Services". */
export default function ProductsServicesPage() {
  usePageTitle('nav.servicesFull');

  return (
    <>
      <main className="page page--services">
        <ServicesHero />
        <ServiceCards />
        <Production />
        <Maintenance />
        <Process className="process--services" />
        <CtaBanner />
      </main>
      <Footer />
    </>
  );
}
