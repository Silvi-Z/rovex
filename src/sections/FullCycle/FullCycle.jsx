import { ABOUT_INTRO, FEATURE_COLUMNS } from '../../data/aboutPage';
import './FullCycle.css';

function Feature({ title, body, metrics }) {
  // Desktop-only placement; FullCycle.css reads these inside its >1100px query.
  const style = {
    '--d-row-h': metrics.rowH ? `${metrics.rowH}px` : 'auto',
    '--d-title-top': `${metrics.titleTop}px`,
    '--d-icon-top': `${metrics.iconTop}px`,
    '--d-body-gap': `${metrics.bodyGap}px`,
  };

  return (
    <li className="feature" style={style}>
      <img
        className="feature__bullet"
        src="/assets/about-bullet.svg"
        width="26"
        height="12"
        alt=""
        aria-hidden="true"
      />
      <h3 className="feature__title">{title}</h3>
      <p className="feature__body">{body}</p>
    </li>
  );
}

export default function FullCycle() {
  return (
    <section className="cycle">
      <div className="container">
        <div className="cycle__intro">
          <h2 className="cycle__heading">ՄԵԿ ԳՈՐԾԸՆԿԵՐ ԱՄԲՈՂՋ ՑԻԿԼԻ ՀԱՄԱՐ</h2>
          <p className="cycle__text">{ABOUT_INTRO}</p>
        </div>

        <div className="features">
          {FEATURE_COLUMNS.map((column, i) => (
            <ul
              key={i}
              className={i === 0 ? 'features__col features__col--closed' : 'features__col'}
            >
              {column.map((item) => (
                <Feature key={item.id} {...item} />
              ))}
            </ul>
          ))}
        </div>
      </div>
    </section>
  );
}
