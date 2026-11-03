import { useState } from 'react';
import ProjectTile from '../../components/ProjectTile/ProjectTile';
import { PROJECTS, PROJECT_FILTER_IDS } from '../../data/projectsPage';
import { useTranslation } from '../../i18n/I18nProvider';
import './ProjectGallery.css';

export default function ProjectGallery() {
  const [active, setActive] = useState('all');
  const { t } = useTranslation();

  const visible =
    active === 'all'
      ? PROJECTS
      : PROJECTS.filter((project) => project.categories.includes(active));

  return (
    <section className="gallery">
      <div className="container">
        <div className="gallery__filters" role="tablist" aria-label={t('projectsPage.filtersAria')}>
          {PROJECT_FILTER_IDS.map((id) => (
            <button
              key={id}
              type="button"
              role="tab"
              aria-selected={active === id}
              className={active === id ? 'gallery__filter is-active' : 'gallery__filter'}
              onClick={() => setActive(id)}
            >
              {t(`projectsPage.filters.${id}`)}
            </button>
          ))}
        </div>

        <div className="gallery__grid">
          {visible.map((project) => (
            <ProjectTile key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}
