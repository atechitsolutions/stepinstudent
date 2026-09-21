import  {
    technologyGroups
}
from '../data/technologies';
import  {
    Braces, Database, Cloud, Layers, Smartphone
}
from 'lucide-react';
const icons = [Braces, Braces, Database, Smartphone, Cloud];
export default function TechnologyStack()  {
    return <section className="section tech-section">
<div className="container tech-grid">
<div>
<div className="eyebrow">TECHNOLOGY</div>
<h2>Built With Modern Technology.</h2>
<p>We use technologies selected according to the requirements, scale and long-term needs of each project.</p>
<div className="tech-groups"> {
        technologyGroups.map((g, i) =>  {
            const Icon = icons[i] || Layers;
            return <div key= {
                g.title
            }
            className="tech-group">
<span>
<Icon size= {
                16
            }
            /> {
                g.title
            }
            </span>
<div> {
                g.items.map(x => <b key= {
                    x
                }
                > {
                    x
                }
                </b>)
            }
            </div>
</div>;
        }
        )
    }
    </div>
</div>
<div className="stack-visual">
<div className="stack-core">BUILD</div> {
        ['React', 'Java', 'Spring Boot', 'MySQL', 'API', 'Cloud'].map((x, i) => <span className= {
            `stack-node n${i + 1}`
        }
        key= {
            x
        }
        > {
            x
        }
        </span>)
    }
    <div className="stack-line l1"/>
<div className="stack-line l2"/>
<div className="stack-line l3"/>
</div>
</div>
</section>;
}
