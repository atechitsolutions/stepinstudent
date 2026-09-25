import { ArrowUpRight } from 'lucide-react';

export default function ProjectCard({ project }) {
  return (
    <article className="project-card">

      <div className={`project-visual ${project.accent.toLowerCase()}`}>
        <span>PROJECT</span>

        <div className="project-window">
          {project.image ? (
              <img
                src={project.image}
                alt={`${project.title} project preview`}
                className="project-image"
                loading="lazy"
                decoding="async"
              />

          ) : (
            <>
              <div className="mini-top" />

              <div className="mini-grid">
                <i />
                <i />
                <i />
              </div>
            </>
          )}
        </div>
      </div>

      <div className="project-content">

        <div>
          <small>{project.category}</small>

          <h3>{project.title}</h3>
        </div>

        <ArrowUpRight
          className="project-arrow"
          size={20}
        />

        <p>{project.description}</p>

        <div className="tags">
          {project.tags.map((x) => (
            <span key={x}>{x}</span>
          ))}
        </div>

        <button
          onClick={() => {
            if (project.url) {
              window.open(project.url, '_blank', 'noopener,noreferrer');
            }
          }}
        >
          View Project
        </button>

      </div>
    </article>
  );
}