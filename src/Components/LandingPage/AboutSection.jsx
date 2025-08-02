import React from 'react';
import './AboutSection.css';
import ConstructionImage from '../Images/Construction-begins.jpg';
import EngineerImage from '../Images/Engineer-Computer-02.png';


const AboutSection = () => {
  return (
    <section className="about-section" id="about">
      <div className="about-wrapper">
        <div className="about-side left-side">
          {/* You can add an image or illustration here */}
          <img src={EngineerImage} alt="Left Visual" className="about-image" />
        </div>

        <div className="about-container">
          <h2>About Twenitu</h2>
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
            We reimagine. We breathe life and energy into space using precise data, realistic visualizations, and flawless,
            caring execution.
          </p>
          <p>
            We build meaning.
          </p>
        </div>

        <div className="about-side right-side">
          {/* You can add an image or illustration here */}
          <img src= {ConstructionImage} alt="Right Visual" className="about-image" />
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
