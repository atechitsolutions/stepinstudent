import { useEffect, useState } from 'react';
import axios from 'axios';

import ProjectCard from './ProjectCard';
import { projects as staticProjects } from '../data/projects';

const API_URL = 'http://localhost:8080/api/projects';

const AUTO_SLIDE_TIME = 4000;
const ANIMATION_TIME = 800;

export default function Projects() {
  // =====================================================
  // DATABASE PROJECTS
  // =====================================================

  const [databaseProjects, setDatabaseProjects] = useState([]);

  // =====================================================
  // CURRENT ROTATION
  //
  // Example:
  //
  // 0 → [1, 2, 3]
  // 1 → [2, 3, 1]
  // 2 → [3, 1, 2]
  // 3 → [1, 2, 3]
  //
  // =====================================================

  const [rotation, setRotation] = useState(0);

  // =====================================================
  // ANIMATION STATE
  // =====================================================

  const [isAnimating, setIsAnimating] = useState(false);

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

        // Static projects continue working
        // even if backend is unavailable.
        setDatabaseProjects([]);
      }
    };

    loadProjects();
  }, []);

  // =====================================================
  // CONVERT DATABASE PROJECT
  // TO EXISTING PROJECT CARD FORMAT
  // =====================================================

  const formattedDatabaseProjects =
    databaseProjects.map((project) => ({
      id: `db-${project.id}`,

      title:
        project.title ||
        'Untitled Project',

      category:
        project.category ||
        'Project',

      description:
        project.description ||
        '',

      image:
        getImageUrl(
          project.imageUrl
        ),

      url:
        project.projectUrl ||
        '#',

      tags:
        project.technologies
          ? project.technologies
              .split(',')
              .map(
                (technology) =>
                  technology.trim()
              )
              .filter(Boolean)
          : [],

      accent: '#a43b8c',
    }));

  // =====================================================
  // COMBINE STATIC + DATABASE PROJECTS
  // =====================================================

  const allProjects = [
    ...staticProjects,
    ...formattedDatabaseProjects,
  ];

  const total = allProjects.length;

  // =====================================================
  // RESET ROTATION IF PROJECT COUNT CHANGES
  //
  // This is important when a new project is added.
  // =====================================================

  useEffect(() => {
    setRotation(0);
  }, [total]);

  // =====================================================
  // AUTOMATIC ROTATION
  // =====================================================

  useEffect(() => {
    if (total <= 1) {
      return;
    }

    const timer = setInterval(() => {
      moveNext();
    }, AUTO_SLIDE_TIME);

    return () => {
      clearInterval(timer);
    };
  }, [total]);

  // =====================================================
  // MOVE TO NEXT PROJECT
  // =====================================================

  const moveNext = () => {
    if (isAnimating || total <= 1) {
      return;
    }

    setIsAnimating(true);

    /*
      First animate the cards.

      After animation finishes,
      change the actual order.
    */

    setTimeout(() => {
      setRotation(
        (previousRotation) =>
          (previousRotation + 1) %
          total
      );

      setIsAnimating(false);
    }, ANIMATION_TIME);
  };

  // =====================================================
  // MOVE TO SPECIFIC PROJECT
  // =====================================================

  const goToProject = (index) => {
    if (
      isAnimating ||
      total <= 1
    ) {
      return;
    }

    setRotation(index);
  };

  // =====================================================
  // CREATE VISIBLE PROJECTS
  //
  // Example with:
  //
  // [1, 2, 3, 4, 5]
  //
  // rotation = 0
  // [1, 2, 3]
  //
  // rotation = 1
  // [2, 3, 4]
  //
  // rotation = 2
  // [3, 4, 5]
  //
  // rotation = 3
  // [4, 5, 1]
  //
  // rotation = 4
  // [5, 1, 2]
  //
  // =====================================================

  const getVisibleProjects = () => {
    if (total === 0) {
      return [];
    }

    // MOBILE will only display the first one
    // through CSS.

    const visibleCount =
      Math.min(3, total);

    const visibleProjects = [];

    for (
      let i = 0;
      i < visibleCount;
      i++
    ) {
      const projectIndex =
        (rotation + i) %
        total;

      visibleProjects.push(
        allProjects[projectIndex]
      );
    }

    return visibleProjects;
  };

  const visibleProjects =
    getVisibleProjects();

  // =====================================================
  // RENDER
  // =====================================================

  return (
    <section
      id="projects"
      className="section projects"
    >
      <div className="container">

        {/* =================================================
            HEADER
            ================================================= */}

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

        {/* =================================================
            PROJECT CAROUSEL
            ================================================= */}

        {total > 0 ? (
          <div
            className={`project-carousel ${
              isAnimating
                ? 'is-animating'
                : ''
            }`}
          >

            <div className="project-track">

              {visibleProjects.map(
                (project, index) => (
                  <div
                    className={`project-slide ${
                      index === 0
                        ? 'slide-first'
                        : ''
                    }`}
                    key={project.id}
                  >

                    <ProjectCard
                      project={project}
                    />

                  </div>
                )
              )}

            </div>

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

        {/* =================================================
            DOTS
            ================================================= */}

        {total > 1 && (
          <div className="project-dots">

            {allProjects.map(
              (project, index) => (
                <button
                  key={project.id}
                  type="button"

                  className={
                    rotation === index
                      ? 'active'
                      : ''
                  }

                  onClick={() =>
                    goToProject(index)
                  }

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
    imageUrl.startsWith(
      'http://'
    ) ||
    imageUrl.startsWith(
      'https://'
    ) ||
    imageUrl.startsWith(
      'data:'
    )
  ) {
    return imageUrl;
  }

  // Spring Boot uploaded image
  if (
    imageUrl.startsWith('/')
  ) {
    return `http://localhost:8080${imageUrl}`;
  }

  return imageUrl;
}