
import ServiceCard from './ServiceCard';
import { services } from '../data/services';

export default function Services() {
    return (
        <section id="services" className="section services">
            <div className="container">
                <div className="section-head">
                    <div>
                        <div className="eyebrow dark">OUR SERVICES</div>

                        <h2>
                            Professional Website Development & Digital Solutions
                        </h2>
                    </div>

                    <p>
                        Explore professional website development, custom web
                        applications, e-commerce development, custom software,
                        mobile applications, SEO, digital marketing, UI/UX
                        design, and API & backend solutions for businesses.
                    </p>
                </div>

                <div className="service-grid">
                    {services.map(s => (
                        <ServiceCard
                            key={s.id}
                            service={s}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
