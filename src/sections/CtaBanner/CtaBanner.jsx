import { Link } from 'react-router-dom';
import './CtaBanner.css';

export default function CtaBanner() {
  return (
    <section className="cta">
      <img
        className="cta__mark"
        src="/assets/logo-rovex-watermark.png"
        width="455"
        height="331"
        alt=""
        aria-hidden="true"
      />
      <div className="container cta__inner">
        <h2 className="cta__heading">
          քննարկե՞նք ձեր <br />
          նախագիծը
        </h2>
        <Link className="btn btn--white" to="/contact">Ուղարկել հարցում</Link>
      </div>
    </section>
  );
}
