import { PARTNERS } from '../../data/partners';
import './Partners.css';

export default function Partners() {
  return (
    <section className="partners">
      <div className="container">
        <h2 className="partners__heading">ՄԵՐ ԳՈՐԾԸՆԿԵՐՆԵՐԸ</h2>
        <ul className="partners__grid">
          {PARTNERS.map(({ id, name, image, width }) => (
            <li className="partners__cell" key={id}>
              {/* width comes from the logo's exact box in the frame; the
                  height follows the image's intrinsic ratio */}
              <img src={image} alt={name} style={{ width: `${width}px` }} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
