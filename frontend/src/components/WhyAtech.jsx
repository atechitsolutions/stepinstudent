import  {
    BriefcaseBusiness, Code2, Scaling, Smartphone, Workflow, LifeBuoy
}
from 'lucide-react';
const items = [['Business First', 'We start with the business requirement before selecting the technology.', BriefcaseBusiness], ['Custom Development', 'Solutions can be designed around your specific workflows.', Code2], ['Scalable Architecture', 'Build with future expansion and maintainability in mind.', Scaling], ['Responsive Experience', 'Designed for desktop, tablet and mobile.', Smartphone], ['Clear Process', 'Structured project stages from discovery to deployment.', Workflow], ['Ongoing Support', 'Maintenance and improvements can continue after launch.', LifeBuoy]];
export default function WhyAtech()  {
    return <section className="section why">
<div className="container">
<div className="section-head">
<div>
<div className="eyebrow dark">WHY  CHOOSE A-TECH</div>
<h2>Technology With a Business Perspective.</h2>
</div>
</div>
<div className="why-grid"> {
        items.map(([t, d, I]) => <article key= {
            t
        }
        >
<I size= {
            21
        }
        />
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
