import React from 'react';
import './ProjectsSection.css';

const ProjectsSection = () => {
  return (
    <section className="projects-section" id="projects">
      <div className="projects-container">
        <h2>Our Projects</h2>
        <p className="projects-intro">
          A glimpse into the spaces we’ve transformed — combining innovation, functionality, and aesthetics.
        </p>
        <div className="projects-grid">
          <div className="project-card">
            <div className="project-image project1" />
            <h3>Urban Loft Redesign</h3>
            <p>Modern renovation blending minimalism with industrial elements for a downtown Toronto loft.</p>
          </div>
          <div className="project-card">
            <div className="project-image project2" />
            <h3>Smart Office Space</h3>
            <p>Tech-enabled, modular office system to enhance productivity in a fast-paced startup environment.</p>
          </div>
          <div className="project-card">
            <div className="project-image project3" />
            <h3>Family-Centered Remodel</h3>
            <p>Full home makeover focused on space optimization, comfort, and connected living.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
