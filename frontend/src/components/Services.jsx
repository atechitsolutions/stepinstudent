import ServiceCard from './ServiceCard';
import  {
    services
}
from '../data/services';
export default function Services()  {
    return <section id="services" className="section services">
<div className="container">
<div className="section-head">
<div>
<div className="eyebrow dark">OUR SERVICES</div>
<h2>What Can We Build For You?</h2>
</div>
<p>Choose from a range of digital solutions designed for different business needs.</p>
</div>
<div className="service-grid"> {
        services.map(s => <ServiceCard key= {
            s.id
        }
        service= {
            s
        }
        />)
    }
    </div>
</div>
</section>;
}
