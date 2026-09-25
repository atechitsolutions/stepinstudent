import  {
    ArrowUpRight
}
from 'lucide-react';
const blocks = [['STARTUPS', ['Landing pages', 'MVP development', 'Product websites', 'Web applications'], 'Build Your MVP'], ['SMALL & MEDIUM BUSINESSES', ['Business websites', 'CRM', 'E-commerce', 'Digital marketing'], 'Grow Your Business'], ['ENTERPRISE / ORGANIZATIONS', ['Custom software', 'Dashboards', 'APIs', 'Business automation'], 'Discuss Your System'], ['SERVICE BUSINESSES', ['Booking systems', 'Customer management', 'Lead generation', 'Marketing'], 'Build Your Solution']];
export default function Solutions()  {
    const go = () => document.getElementById('contact')?.scrollIntoView( {
        behavior: 'smooth'
    }
    );
    return <section id="solutions" className="section solutions">
<div className="container">
<div className="section-head">
<div>
<div className="eyebrow dark">SOLUTIONS FOR DIFFERENT BUSINESS NEEDS</div>
<h2>From Simple Websites to Complete Digital Systems.</h2>
</div>
</div>
<div className="solution-grid"> {
        blocks.map(([title, items, cta], i) => <article className="solution-card" key= {
            title
        }
        >
<span>0 {
            i + 1
        }
        </span>
<h3> {
            title
        }
        </h3>
<ul> {
            items.map(x => <li key= {
                x
            }
            > {
                x
            }
            </li>)
        }
        </ul>

<button
    type="button"
    onClick={go}
>{
            cta
        }
        <ArrowUpRight
            size={16}
            aria-hidden="true"
        />
</button>
</article>)
    }
    </div>
</div>
</section>;
}
