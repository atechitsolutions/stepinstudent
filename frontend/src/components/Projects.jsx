import { useEffect, useRef, useState } from 'react';
import axios from 'axios';

import ProjectCard from './ProjectCard';
import { projects as staticProjects } from '../data/projects';

const API_URL = 'http://localhost:8080/api/projects';

export default function Projects() {
  const carouselRef = useRef(null);

  // =====================================================
  // DATABASE PROJECTS
  // =====================================================

  const [databaseProjects, setDatabaseProjects] = useState([]);

  const [slideWidth, setSlideWidth] = useState(0);

  const [isTransitioning, setIsTransitioning] = useState(true);

  // =====================================================
  // LOAD PROJECTS FROM SPRING BOOT
  // =====================================================

  useEffect(() => {
    const loadProjects = async () => {
      try {
        const response = await axios.get(API_URL);

        if (Array.isArray(response.data)) {
          setDatabaseProjects(response.data);
        }
      } catch (error) {
        console.error(
          'Unable to load projects from backend:',
          error
        );

        // Static projects will continue working
        // even if the backend is unavailable.
        setDatabaseProjects([]);
      }
    };

    loadProjects();
  }, []);

  // =====================================================
  // CONVERT DATABASE PROJECT
  // TO EXISTING PROJECT CARD FORMAT
  // =====================================================

  const formattedDatabaseProjects = databaseProjects.map(
    (project) => ({
      id: `db-${project.id}`,

      title: project.title || 'Untitled Project',

      category: project.category || 'Project',

      description:
        project.description || '',

      image: getImageUrl(project.imageUrl),

      url: project.projectUrl || '#',

      tags: project.technologies
        ? project.technologies
            .split(',')
            .map((technology) => technology.trim())
            .filter(Boolean)
        : [],

      // Existing ProjectCard expects accent.
      // Give database projects a default accent.
      accent: '#a43b8c',
    })
  );

  // =====================================================
  // COMBINE EXISTING + DATABASE PROJECTS
  // =====================================================

  const allProjects = [
    ...staticProjects,
    ...formattedDatabaseProjects,
  ];

  const total = allProjects.length;

  // =====================================================
  // LOOP PROJECTS
  // =====================================================

  const loopProjects =
    total > 0
      ? [
          ...allProjects,
          ...allProjects,
          ...allProjects,
        ]
      : [];

  // =====================================================
  // START FROM MIDDLE COPY
  // =====================================================

  const [currentIndex, setCurrentIndex] = useState(total);

  // =====================================================
  // CALCULATE EXACT CARD WIDTH
  // =====================================================

  useEffect(() => {
    const updateWidth = () => {
      if (!carouselRef.current) return;

      const carouselWidth =
        carouselRef.current.clientWidth;

      setSlideWidth(carouselWidth / 3);
    };

    updateWidth();

    window.addEventListener('resize', updateWidth);

    return () => {
      window.removeEventListener(
        'resize',
        updateWidth
      );
    };
  }, []);

  // =====================================================
  // KEEP INDEX CORRECT WHEN PROJECT COUNT CHANGES
  // =====================================================

  useEffect(() => {
    if (total > 0) {
      setCurrentIndex(total);
    }
  }, [total]);

  // =====================================================
  // AUTOMATIC ROTATION
  // =====================================================

  useEffect(() => {
    if (total === 0) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => prev + 1);
    }, 4000);

    return () => clearInterval(timer);
  }, [total]);

  // =====================================================
  // SEAMLESS RESET
  // =====================================================

  useEffect(() => {
    if (total === 0) return;

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

  // =====================================================
  // TRANSLATION
  // =====================================================

  const translateX =
    currentIndex * slideWidth;

  // =====================================================
  // RENDER
  // =====================================================

  return (
    <section
      id="projects"
      className="section projects"
    >
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

          {total > 0 ? (

            <div
              className="project-track"
              style={{
                transform: `translate3d(-${translateX}px, 0, 0)`,

                transition: isTransitioning
                  ? 'transform 0.8s cubic-bezier(0.22, 1, 0.36, 1)'
                  : 'none',
              }}
            >

              {loopProjects.map(
                (project, index) => (

                  <div
                    className="project-slide"
                    key={`${project.id}-${index}`}
                    style={{
                      width: `${slideWidth}px`,
                      minWidth: `${slideWidth}px`,
                      maxWidth: `${slideWidth}px`,
                    }}
                  >

                    <ProjectCard
                      project={project}
                    />

                  </div>

                )
              )}

            </div>

          ) : (

            <div
              style={{
                width: '100%',
                padding: '60px 20px',
                textAlign: 'center',
              }}
            >
              Loading projects...
            </div>

          )}

        </div>


        {/* DOTS */}

        {total > 0 && (

          <div className="project-dots">

            {allProjects.map(
              (project, index) => (

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

                    setCurrentIndex(
                      total + index
                    );
                  }}

                  aria-label={`Show ${project.title}`}
                />

              )
            )}

          </div>

        )}

      </div>
    </section>
  );
}


// =====================================================
// IMAGE URL HELPER
// =====================================================

function getImageUrl(imageUrl) {
  if (!imageUrl) {
    return '';
  }

  // Already a complete URL
  if (
    imageUrl.startsWith('http://') ||
    imageUrl.startsWith('https://') ||
    imageUrl.startsWith('data:')
  ) {
    return imageUrl;
  }

  // Spring Boot uploaded image
  if (imageUrl.startsWith('/')) {
    return `http://localhost:8080${imageUrl}`;
  }

  return imageUrl;
}