import { ABOUT_GALLERY } from '../../data/aboutPage';
import './AboutGallery.css';

export default function AboutGallery() {
  return (
    <section className="agallery">
      <div className="container">
        <ul className="agallery__grid">
          {ABOUT_GALLERY.map(({ id, image, width, height }) => (
            <li className="agallery__item" key={id}>
              <img src={image} width={width} height={height} alt="" loading="lazy" />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
