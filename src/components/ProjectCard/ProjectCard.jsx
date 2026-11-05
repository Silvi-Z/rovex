import { useTranslation } from '../../i18n/I18nProvider';
import './ProjectCard.css';

/**
 * One project tile. `size` picks the footprint from the frame:
 * xl = 737×526, md = 519×251, sm = 411×251.
 */
export default function ProjectCard({ project }) {
  const { size, title, year, type, image, imageSize } = project;
  const { t } = useTranslation();

  return (
    <figure className={`card card--${size}`}>
      <img src={image} width={imageSize.width} height={imageSize.height} alt={title} />
      <figcaption className="card__cap">
        <h3 className="card__title">{title}</h3>
        <p className="card__meta">{`${t(`projectTypes.${type}`)}`}</p>
      </figcaption>
    </figure>
  );
}
