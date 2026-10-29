import { Link } from 'react-router-dom';
import ProjectCard from '../../components/ProjectCard/ProjectCard';
import {
  FEATURED_PROJECT,
  STACKED_PROJECTS,
  SECONDARY_PROJECTS,
} from '../../data/projects';
import './Projects.css';

export default function Projects() {
  return (
    <section className="projects">
      <div className="container">
        <div className="projects__head">
          <div>
            <h2 className="projects__heading">Նախագծեր</h2>
            <p className="projects__sub">Rovex՝ ճշտգրտություն ամեն դետալում</p>
          </div>
          <Link className="projects__all" to="/projects">Բոլոր նախագծերը</Link>
        </div>

        <div className="projects__rowA">
          <ProjectCard project={FEATURED_PROJECT} />
          <div className="projects__stack">
            {STACKED_PROJECTS.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </div>

        <div className="projects__rowB">
          {SECONDARY_PROJECTS.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}
