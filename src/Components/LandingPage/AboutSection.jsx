import React, { useState } from 'react';
import './AboutSection.css';
// import ConstructionImage from '../Images/Construction-begins.jpg';
import WorkersWalking from '../Images/Workers-before-construction.png';
import TeamMember1 from '../Images/Gabriel Paredes.png';
import TeamMember2 from '../Images/Andres Paredes.png';
import TeamMember3 from '../Images/Gabria Brenner.png';

const AboutSection = () => {
  const [selectedMember, setSelectedMember] = useState(null);

  const teamMembers = [
    {
      name: "Gabriel Paredes",
      role: "CEO",
      bio: [
        "Gabriel’s passion for the built environment began early in life, growing up across from one of Latin America’s largest cement production and export facilities. Observing the scale and complexity of industrial operations from his neighborhood sparked a deep interest in construction, materials, and the systems that bring structures to life.",
        "He pursued this interest academically by earning a degree in Mechanical Engineering, where he developed a solid foundation in structural analysis, fluid mechanics, and process optimization. This technical background continues to inform his current work — particularly in the integration of digital tools, systems thinking, and the modeling of space through BIM and data-driven environments.",
        "Before founding Twenitú in Chicago, Gabriel led renovation ventures in Venezuela, gaining hands-on experience in project delivery and business development. Today, he integrates his engineering expertise with field experience to guide a company that bridges traditional building methods with modern digital solutions."
      ],
      image: TeamMember1
    },
    {
      name: "Andres Paredes",
      role: "Software Developer",
      bio: [
        "Andrés joined Twenitú as a creative and technical contributor, drawn by the opportunity to help shape the company’s digital presence from the ground up. With a strong interest in design, coding, and user experience, he brings a fresh perspective to how clients interact with Twenitú’s products and identity online.",
        "Currently studying software development, Andrés combines his academic learning with hands-on experience in front-end design, UI/UX prototyping, and responsive web architecture. His approach is driven by curiosity and a passion for intuitive, accessible interfaces that support both beauty and functionality.",
        "As the lead developer of Twenitú’s website, Andrés is helping build a digital platform that integrates client dashboards, 3D visualization, and interactive project data — all with the goal of making Twenitú’s ecosystem seamless, professional, and human-centered."
      ],
      image: TeamMember2
    },
    {
      name: "Gabria Brenner",
      role: "Consultant",
      bio: [
        "Gabria Brenner serves as a consultant at Twenitú, bringing her expertise as a Certified Public Accountant (CPA) and Data Analyst to support our Digital Division. Her work focuses on helping us manage, organize, and visualize data across the properties and portfolios we analyze.",
        "With a professional background that includes financial modeling, SQL-based data structuring, and advanced visualization tools such as Power BI, Gabria plays a vital role in structuring our analytical dashboards and transforming raw data into meaningful insights for our clients.",
        "Her contribution to Digital Twenitú bridges the technical with the strategic, ensuring that our deliverables are not only visually dynamic but also financially accurate, operationally relevant, and client-ready."
      ],
      image: TeamMember3
    }
  ];

  return (
    <section className="about-section" id="about">

      {/* === About content (updated) === */}
      <div className="about-wrapper about-two-col">
        {/* Left: single rounded image */}
        <figure className="about-media">
          <img src={WorkersWalking} alt="Twenitú team at work" />
        </figure>

        {/* Right: text */}
        <div className="about-container">
          <h2 className="about-title">Meet Twenitú</h2>
          <p className="about-lead">
            Learn how we integrate our two divisions to help the construction industry improve their workflow.
          </p>

          <div className="about-body">
            <p>
              Twenitú is a company focused on reimagining and reengineering spaces. With two integrated divisions —
              Twenitú Digital and Twenitú Build — we offer solutions that blend technical precision, intelligent design,
              and advanced technology to transform spaces into energetic and functional environments.
            </p>
            <p>
              We exist to unlock the hidden potential in every space. Inspired by our heritage and roots, we help people,
              families, and investors see beyond walls, plans, and details — to see what their spaces can truly become.
            </p>
            <p>
              We reimagine. We breathe life and energy into space using precise data, realistic visualizations, and
              flawless, caring execution. We build meaning.
            </p>
          </div>
        </div>
      </div>

      {/* === Team subsection (unchanged) === */}
      <div className="team-subsection">
        <h2>Our Team</h2>
        <div className="team-container">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className="team-card"
              onClick={() => setSelectedMember(member)}
            >
              <img src={member.image} alt={member.name} className="team-image" />
              <div className="team-role">{member.role}</div>
              <div className="team-bio">{member.name}</div>
            </div>
          ))}
        </div>
      </div>

      {/* === Side Panel (unchanged) === */}
      {selectedMember && (
        <div
          className="side-panel-overlay"
          onClick={() => setSelectedMember(null)}
        >
          <div className="side-panel" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={() => setSelectedMember(null)}>
              ×
            </button>
            <img src={selectedMember.image} alt={selectedMember.name} className="team-image" />
            <h3>{selectedMember.name}</h3>
            <p className="team-role">{selectedMember.role}</p>
            {selectedMember.bio.map((paragraph, index) => (
              <p key={index} className="team-bio">{paragraph}</p>
            ))}
          </div>
        </div>
      )}
    </section>
  );
};

export default AboutSection;
