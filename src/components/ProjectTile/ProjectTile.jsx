import './ProjectTile.css';

/** Gallery tile: image with the caption below it (not overlaid). */
export default function ProjectTile({ project }) {
  return (
    <figure className="tile">
      <img className="tile__img" src={project.image} width="411" height="294" alt={project.title} />
      <figcaption className="tile__cap">
        <h3 className="tile__title">{project.title}</h3>
        <p className="tile__meta">{project.meta}</p>
      </figcaption>
    </figure>
  );
}
