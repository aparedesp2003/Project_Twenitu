// App.jsx
import React, { useState } from "react";
import "./App.css";

// Components
import NavBar from "./Components/LandingPage/NavBar.jsx";
import BannerSection from "./Components/LandingPage/BannerSection.jsx";
import AboutSection from "./Components/LandingPage/AboutSection.jsx";
import ServicesSection from "./Components/LandingPage/ServicesSection.jsx";
import ProductsSection from "./Components/LandingPage/ProductsSection.jsx";
import ProjectsSection from "./Components/LandingPage/ProjectsSection.jsx";
import ContactSection from "./Components/LandingPage/ContactSection.jsx";
import Footer from "./Components/LandingPage/Footer.jsx";
import LoginSignUp from "./Components/LoginSignUp/LoginSignUp.jsx";
// import ProgressBar from "./Components/LandingPage/ProgressBar.jsx";

function App() {
  const [showLoginSignUp, setShowLoginSignUp] = useState(false);

  const handleLogin = () => setShowLoginSignUp(true);
  const handleSignUp = () => setShowLoginSignUp(true);

  return (
    <div className="app">
      {/* Navbar always visible */}
      <NavBar onLogin={handleLogin} onSignUp={handleSignUp} />

      {/* Landing page sections */}
      {!showLoginSignUp && (
        <>
          <BannerSection />
          <AboutSection />
          <ServicesSection />
          <ProductsSection />
          <ProjectsSection />
          <ContactSection />
          <Footer />
        </>
      )}

      {/* Login / Signup */}
      {showLoginSignUp && <LoginSignUp />}

      {/* Scroll Progress Bar - always visible */}
      {/* <ProgressBar /> */}
    </div>
  );
}

export default App;
