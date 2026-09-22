import { useEffect, useRef, useState } from 'react';
import ProjectCard from './ProjectCard';
import { projects } from '../data/projects';

export default function Projects() {
  const total = projects.length;

  const loopProjects = [
    ...projects,
    ...projects,
    ...projects,
  ];

  const carouselRef = useRef(null);

  const [slideWidth, setSlideWidth] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(total);
  const [isTransitioning, setIsTransitioning] = useState(true);

  // Calculate EXACT width of one card
  useEffect(() => {
    const updateWidth = () => {
      if (!carouselRef.current) return;

      const carouselWidth = carouselRef.current.clientWidth;

      setSlideWidth(carouselWidth / 3);
    };

    updateWidth();

    window.addEventListener('resize', updateWidth);

    return () => {
      window.removeEventListener('resize', updateWidth);
    };
  }, []);

  // Automatic rotation
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => prev + 1);
    }, 4000);

    return () => clearInterval(timer);
  }, []);

  // Seamless reset
  useEffect(() => {
    // With 3 projects:
    //
    // index 3 = 123
    // index 4 = 231
    // index 5 = 312
    // index 6 = 123
    //
    // Reset 6 -> 3

    if (currentIndex === total * 2) {
      const timeout = setTimeout(() => {
        setIsTransitioning(false);

        setCurrentIndex(total);

        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            setIsTransitioning(true);
          });
        });
      }, 850);

      return () => clearTimeout(timeout);
    }
  }, [currentIndex, total]);

  const translateX = currentIndex * slideWidth;

  return (
    <section id="projects" className="section projects">

      <div className="container">

        {/* HEADER */}
        <div className="section-head">

          <div>
            <div className="eyebrow dark">
              OUR ACHIEVEMENTS
            </div>

            <h2>
              Built For Real Digital Experiences.
            </h2>
          </div>



        </div>


        {/* CAROUSEL */}
        <div
          className="project-carousel"
          ref={carouselRef}
        >

          <div
            className="project-track"
            style={{
              transform: `translate3d(-${translateX}px, 0, 0)`,

              transition: isTransitioning
                ? 'transform 0.8s cubic-bezier(0.22, 1, 0.36, 1)'
                : 'none',
            }}
          >

            {loopProjects.map((project, index) => (

              <div
                className="project-slide"
                key={`${project.id}-${index}`}
                style={{
                  width: `${slideWidth}px`,
                  minWidth: `${slideWidth}px`,
                  maxWidth: `${slideWidth}px`,
                }}
              >

                <ProjectCard project={project} />

              </div>

            ))}

          </div>

        </div>


        {/* DOTS */}
        <div className="project-dots">

          {projects.map((project, index) => (

            <button
              key={project.id}
              type="button"

              className={
                currentIndex % total === index
                  ? 'active'
                  : ''
              }

              onClick={() => {
                setIsTransitioning(true);

                setCurrentIndex(total + index);
              }}

              aria-label={`Show ${project.title}`}
            />

          ))}

        </div>

      </div>

    </section>
  );
}