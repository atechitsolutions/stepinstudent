
import { ArrowRight } from 'lucide-react';

export default function IntroSection() {
    const go = () =>
        document.getElementById('services')?.scrollIntoView({
            behavior: 'smooth'
        });

    return (
        <section id="about" className="section intro">
            <div className="container intro-grid">
                <div>
                    <div className="eyebrow dark">WHAT WE DO</div>

                    <h2>
                        Website Development Company Building Digital Solutions
                        Around Your Business
                    </h2>
                </div>

                <div>
                    <p className="lead">
                        A-Tech is a website development company in India providing
                        custom website development, web applications, e-commerce
                        solutions, and digital solutions for businesses. We build
                        professional, scalable and user-focused websites based on
                        your business requirements.
                    </p>

                    <button className="text-link" onClick={go}>
                        Explore What We Build
                        <ArrowRight size={17} aria-hidden="true" />
                    </button>
                </div>
            </div>
        </section>
    );
}
