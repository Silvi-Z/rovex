import { CLIENTS } from '../../data/aboutPage';
import './Clients.css';

export default function Clients() {
  return (
    <section className="clients">
      <div className="container">
        <h2 className="clients__heading">ՄԵՐ հաճախորդները</h2>
        <ul className="clients__grid">
          {CLIENTS.map(({ id, name, image, width, height, dx, dy }) => (
            <li
              className="clients__cell"
              key={id}
              style={{ '--dx': `${dx}px`, '--dy': `${dy}px` }}
            >
              <img src={image} width={width} height={height} alt={name} loading="lazy" />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
