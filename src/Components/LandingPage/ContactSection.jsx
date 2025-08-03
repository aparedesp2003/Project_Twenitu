import React from 'react';
import './ContactSection.css';

const ContactSection = () => {
  return (
    <section className="contact-section" id="contact">
      <div className="contact-container">
        <h2>Contact Us</h2>
        <p className="contact-intro">
          Have a question, idea, or project in mind? Reach out to us and let’s bring it to life together.
        </p>

        <form className="contact-form" onSubmit={(e) => e.preventDefault()}>
          <div className="form-group">
            <input type="text" placeholder="Full Name" required />
          </div>
          <div className="form-group">
            <input type="email" placeholder="Email Address" required />
          </div>
          <div className="form-group">
            <textarea rows="5" placeholder="Your Message" required></textarea>
          </div>
          <button type="submit" className="contact-button">Send Message</button>
        </form>
      </div>
    </section>
  );
};

export default ContactSection;
