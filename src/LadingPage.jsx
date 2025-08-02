// src/App.jsx
import React from 'react';
import NavBar from 'project-Twenitu/src/Components/LandingPage/NavBar.jsx';
import BannerSection from 'project-Twenitu/src/Components/LandingPage/BannerSection.jsx';
import Footer from 'project-Twenitu/src/Components/LandingPage/Footer.jsx';
import './App.css';

function App() {
  return (
    <div className="app">
      <NavBar />
      <BannerSection />
      <Footer />
    </div>
  );
}

export default App;
