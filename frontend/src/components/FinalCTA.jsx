import  {
    ArrowRight, ArrowUpRight
}
from 'lucide-react';
export default function FinalCTA()  {
    return <section className="final-cta">
<div className="container">
<div className="eyebrow dark">READY WHEN YOU ARE</div>
<h2>Let's Build Something Useful.</h2>
<p>Have an idea, business requirement or digital problem? Start the conversation with A-Tech.</p>
<div>
<button className="btn btn-primary" onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}>Start Your Project <ArrowRight size={18}/>
</button>
<button className="btn btn-secondary" onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}>Explore Services <ArrowUpRight size={17}/>
</button>
</div>
</div>
</section>; }
