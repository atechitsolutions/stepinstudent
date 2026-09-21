import  {
    Search, ClipboardList, PenTool, Code2, ShieldCheck, Rocket, LifeBuoy
}
from 'lucide-react';
const steps = [['01', 'DISCOVER', 'Understand the business, users and requirements.', Search], ['02', 'PLAN', 'Define features, scope and technical direction.', ClipboardList], ['03', 'DESIGN', 'Create wireframes and user interfaces.', PenTool], ['04', 'DEVELOP', 'Build frontend, backend, database and integrations.', Code2], ['05', 'TEST', 'Check functionality, responsiveness, security and performance.', ShieldCheck], ['06', 'LAUNCH', 'Deploy and prepare the product for real users.', Rocket], ['07', 'SUPPORT', 'Continue with maintenance, optimization and improvements.', LifeBuoy]];
export default function Process()  {
    return <section id="process" className="section process">
<div className="container">
<div className="section-head">
<div>
<div className="eyebrow dark">OUR PROCESS</div>
<h2>From Idea to Digital Product.</h2>
</div>
</div>
<div className="timeline"> {
        steps.map(([n, t, d, I]) => <article key= {
            n
        }
        >
<div className="step-icon">
<I size= {
            19
        }
        />
</div>
<small> {
            n
        }
        </small>
<h3> {
            t
        }
        </h3>
<p> {
            d
        }
        </p>
</article>)
    }
    </div>
</div>
</section>;
}
