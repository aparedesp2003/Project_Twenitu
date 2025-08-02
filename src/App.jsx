import './App.css';
import NavBar from './Components/LandingPage/NavBar.jsx';
import BannerSection from './Components/LandingPage/BannerSection.jsx';
import AboutSection from './Components/LandingPage/AboutSection.jsx';
import Footer from './Components/LandingPage/Footer.jsx';
// import LoginSignUp from './Components/LoginSignUp/LoginSignUp';

function App() {
  return (
    <div className="app">
      <NavBar />
      <BannerSection />
      <AboutSection />
      <Footer />

      {/* If you ever want to render the login page instead of the landing page: */}
      {/* <div className="app-wrapper">
        <LoginSignUp />
      </div> */}
    </div>
  );
}

export default App;
