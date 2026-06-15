import { useState, useEffect } from "react";
import type { Session } from "@supabase/supabase-js";
import { supabase } from "./lib/supabase";
import "./App.css";

import NavBar from "./Components/LandingPage/NavBar";
import BannerSection from "./Components/LandingPage/BannerSection";
import AboutSection from "./Components/LandingPage/AboutSection";
import ServicesSection from "./Components/LandingPage/ServicesSection";
import ProductsSection from "./Components/LandingPage/ProductsSection";
import ProjectsSection from "./Components/LandingPage/ProjectsSection";
import ContactSection from "./Components/LandingPage/ContactSection";
import Footer from "./Components/LandingPage/Footer";

import LoginSignUp from "./Components/LoginSignUp/LoginSignUp";
import DashboardLayout from "./Components/Dashboard/DashboardLayout";

function App() {
  const [showLoginSignUp, setShowLoginSignUp] = useState<boolean>(false);
  const [loginMode, setLoginMode] = useState<"Login" | "Sign Up">("Sign Up");
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogin = (): void => { setLoginMode("Login"); setShowLoginSignUp(true); };
  const handleSignUp = (): void => { setLoginMode("Sign Up"); setShowLoginSignUp(true); };
  const handleSuccessfulLogin = (): void => { setShowLoginSignUp(false); };
  const handleSignOut = async (): Promise<void> => { await supabase.auth.signOut(); };
  const handleClose = (): void => { setShowLoginSignUp(false); };

  if (loading) {
    return (
      <div className="min-h-screen bg-twenitu-navy flex items-center justify-center">
        <div className="text-white/60 text-sm tracking-widest uppercase animate-pulse">
          Loading…
        </div>
      </div>
    );
  }

  return (
    <div className="app">
      {session ? (
        <DashboardLayout onSignOut={handleSignOut} />
      ) : (
        <>
          <NavBar onLogin={handleLogin} onSignUp={handleSignUp} />

          {!showLoginSignUp ? (
            <>
              <BannerSection />
              <AboutSection />
              <ServicesSection />
              <ProductsSection />
              <ProjectsSection />
              <ContactSection />
              <Footer />
            </>
          ) : (
            <LoginSignUp
              onSuccess={handleSuccessfulLogin}
              initialMode={loginMode}
              onClose={handleClose}
            />
          )}
        </>
      )}
    </div>
  );
}

export default App;