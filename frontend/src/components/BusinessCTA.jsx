import  {
    ArrowRight
}
from 'lucide-react';
export default function BusinessCTA()  {
    return <section className="problem-cta">
<div className="container">
<div>
<div className="eyebrow">BUSINESS PROBLEM</div>
<h2>Have a Business Problem That Technology Could Solve?</h2>
<p>Tell us what you're trying to improve, automate or build.</p>
</div>
<button className="btn btn-light" onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}>Discuss Your Requirement <ArrowRight size={18}/>
</button>
</div>
</section>; }
