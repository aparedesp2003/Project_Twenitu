import './App.css';
import LoginSignUp from './Components/LoginSignUp/LoginSignUp';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Components/LandingPage/NavBar';
import BannerSection from './Components/LandingPage/BannerSection';

function App() {
  return (
    <div className="app">
      <Navbar />
      <BannerSection />
      {/* Later, add About, Services, etc. */}
    </div>

    // If you want to render the login page instead of landing page, just switch these:
    // <div className="app-wrapper">
    //   <LoginSignUp />
    // </div>
  );
}

export default App;
