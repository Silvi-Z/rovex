import { Link } from 'react-router-dom';
import './Hero.css';

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero__media" role="presentation" />
      <div className="hero__shade" role="presentation" />
      <div className="hero__glow" role="presentation" />

      <div className="container hero__content">
        <h1 className="hero__title">
          Մեկ գործընկեր<br />
          ամբողջ ֆասադի <br />
          համար
        </h1>
        <p className="hero__sub">
          Նախագծում ենք, արտադրում , մոնտաժում և սպասարկում։<br />
          Ամբողջ գործընթացը մեկ վստահելի գործընկերոջ հետ։
        </p>
        <div className="hero__actions">
          <Link className="btn btn--primary btn--hero" to="/contact">
            Քննարկե՞նք ձեր նախագիծը
          </Link>
          <Link className="btn btn--ghost btn--hero" to="/projects">
            Տեսնել նախագծերը
          </Link>
        </div>
      </div>
    </section>
  );
}
