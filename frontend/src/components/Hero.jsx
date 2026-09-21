import { motion } from "framer-motion";
import { ArrowRight, ArrowDown } from "lucide-react";

export default function Hero() {
    const go = (id) => {
        document.getElementById(id)?.scrollIntoView({
            behavior: "smooth",
        });
    };

    return (
        <section id="home" className="hero section">
            <div className="container hero-grid">

                {/* Hero Content */}
                <div className="hero-copy">

                    <motion.div
                        initial={{
                            opacity: 0,
                            y: 12,
                        }}
                        animate={{
                            opacity: 1,
                            y: 0,
                        }}
                        transition={{
                            duration: 0.55,
                        }}
                        className="eyebrow"
                    >
                        TECHNOLOGY <i /> DESIGN <i /> GROWTH
                    </motion.div>

                    <motion.h1
                        initial={{
                            opacity: 0,
                            y: 24,
                        }}
                        animate={{
                            opacity: 1,
                            y: 0,
                        }}
                        transition={{
                            duration: 0.7,
                            delay: 0.08,
                        }}
                    >
                        Digital Solutions{" "}
                        <em>Built Around</em>{" "}
                        Your Business.
                    </motion.h1>

                    <motion.p
                        initial={{
                            opacity: 0,
                            y: 18,
                        }}
                        animate={{
                            opacity: 1,
                            y: 0,
                        }}
                        transition={{
                            duration: 0.65,
                            delay: 0.18,
                        }}
                    >
                        From websites and web applications to custom
                        software and digital growth solutions, A-Tech
                        helps businesses turn ideas into practical
                        digital products.
                    </motion.p>

                    <motion.div
                        initial={{
                            opacity: 0,
                            y: 16,
                        }}
                        animate={{
                            opacity: 1,
                            y: 0,
                        }}
                        transition={{
                            duration: 0.6,
                            delay: 0.26,
                        }}
                        className="hero-actions"
                    >
                        <button
                            className="btn btn-primary"
                            onClick={() => go("contact")}
                        >
                            Start Your Project
                            <ArrowRight size={18} />
                        </button>

                        <button
                            className="btn btn-secondary"
                            onClick={() => go("solutions")}
                        >
                            Explore Solutions
                            <ArrowDown size={17} />
                        </button>
                    </motion.div>
                </div>

                {/* Hero Image */}
                <motion.div
                    initial={{
                        opacity: 0,
                        scale: 0.96,
                        x: 20,
                    }}
                    animate={{
                        opacity: 1,
                        scale: 1,
                        x: 0,
                    }}
                    transition={{
                        duration: 0.8,
                        delay: 0.2,
                    }}
                    className="hero-visual"
                >
                    <img
                        src="/images/atech-hero.png"
                        alt="A-Tech digital solutions dashboard"
                        className="hero-image"
                    />
                </motion.div>

            </div>
        </section>
    );
}