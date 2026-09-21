import  {
    ArrowRight
}
from 'lucide-react';
export default function IntroSection()  {
    const go = () => document.getElementById('services')?.scrollIntoView( {
        behavior: 'smooth'
    }
    );
    return <section id="about" className="section intro">
<div className="container intro-grid">
<div>
<div className="eyebrow dark">WHAT WE DO</div>
<h2>Technology That Solves Real Business Problems.</h2>
</div>
<div>
<p className="lead">A-Tech helps businesses transform ideas, manual processes and customer experiences into modern digital solutions. From the first concept to development and deployment, we focus on building technology around the actual business requirement.</p>
<button className="text-link" onClick= {
        go
    }
    >Explore What We Build <ArrowRight size= {
        17
    }
    />
</button>
</div>
</div>
</section>;
}
