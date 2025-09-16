// App.jsx
import React, { useState } from "react";
import "./App.css";

// Landing Page Components
import NavBar from "./Components/LandingPage/NavBar.jsx";
import BannerSection from "./Components/LandingPage/BannerSection.jsx";
import AboutSection from "./Components/LandingPage/AboutSection.jsx";
import ServicesSection from "./Components/LandingPage/ServicesSection.jsx";
import ProductsSection from "./Components/LandingPage/ProductsSection.jsx";
import ProjectsSection from "./Components/LandingPage/ProjectsSection.jsx";
import ContactSection from "./Components/LandingPage/ContactSection.jsx";
import Footer from "./Components/LandingPage/Footer.jsx";

// Auth
import LoginSignUp from "./Components/LoginSignUp/LoginSignUp.jsx";

// Dashboard (new)
import DashboardLayout from "./Components/Dashboard/DashboardLayout.jsx";

function App() {
  const [showLoginSignUp, setShowLoginSignUp] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // NEW state

  const handleLogin = () => setShowLoginSignUp(true);
  const handleSignUp = () => setShowLoginSignUp(true);

  // ✅ Simulate login success for now
  const handleSuccessfulLogin = () => {
    setShowLoginSignUp(false);
    setIsLoggedIn(true);
  };

  const handleSignOut = () => {
    setIsLoggedIn(false);
  };

  return (
    <div className="app">
      {/* If user is logged in → Dashboard */}
      {isLoggedIn ? (
        <DashboardLayout onSignOut={handleSignOut} />
      ) : (
        <>
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
          {showLoginSignUp && (
            <LoginSignUp onSuccess={handleSuccessfulLogin} />
          )}
        </>
      )}
    </div>
  );
}

export default App;
