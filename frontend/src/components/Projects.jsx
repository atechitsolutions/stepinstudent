import ProjectCard from './ProjectCard';
import  {
    projects
}
from '../data/projects';
export default function Projects()  {
    return <section id="projects" className="section projects">
<div className="container">
<div className="section-head">
<div>
<div className="eyebrow dark">SELECTED WORK</div>
<h2>Built For Real Digital Experiences.</h2>
</div>
<p>Illustrative concept projects showing the kinds of digital systems A-Tech can build. These are not presented as client work.</p>
</div>
<div className="project-grid"> {
        projects.map(p => <ProjectCard key= {
            p.id
        }
        project= {
            p
        }
        />)
    }
    </div>
</div>
</section>;
}
