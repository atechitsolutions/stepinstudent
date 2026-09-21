import  {
    ArrowUpRight
}
from 'lucide-react';
export default function ProjectCard( {
    project
}
)  {
    return <article className="project-card">
<div className= {
        `project-visual ${project.accent.toLowerCase()}`
    }
    >
<span>CONCEPT PROJECT</span>
<div className="project-window">
<div className="mini-top"/>
<div className="mini-grid">
<i />
<i />
<i />
</div>
</div>
</div>
<div className="project-content">
<div>
<small> {
        project.category
    }
    </small>
<h3> {
        project.title
    }
    </h3>
</div>
<ArrowUpRight className="project-arrow" size= {
        20
    }
    />
<p> {
        project.description
    }
    </p>
<div className="tags"> {
        project.tags.map(x => <span key= {
            x
        }
        > {
            x
        }
        </span>)
    }
    </div>
<button>View Project</button>
</div>
</article>;
}
