import { useState, useEffect } from "react";
import logo from "../Images/Logo_PRINCIPAL-OFF-WHITE.png";

interface NavBarProps {
  onLogin: () => void;
  onSignUp: () => void;
}

const navLinks = ["About", "Services", "Products", "Projects", "Contact"];

const NavBar = ({ onLogin, onSignUp }: NavBarProps) => {
  const [scrolled, setScrolled] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogoClick = (): void => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <nav
      className={`grid grid-cols-[1fr_auto_1fr] items-center px-10 sticky top-0 z-50 w-full transition-all duration-300 max-[640px]:px-5 ${
        scrolled
          ? "py-3 bg-twenitu-navy/95 backdrop-blur-md shadow-lg border-b border-white/5"
          : "py-5 bg-twenitu-navy"
      }`}
    >
      {/* Logo */}
      <div
        className="flex items-center cursor-pointer justify-self-start"
        onClick={handleLogoClick}
      >
        <img
          src={logo}
          alt="Twenitú Logo"
          className="h-12 w-auto object-contain transition-opacity duration-200 hover:opacity-80"
        />
      </div>

      {/* Nav links */}
      <ul className="list-none flex items-center gap-8 m-0 p-0 max-[900px]:gap-5 max-[640px]:gap-3">
        {navLinks.map((item) => (
          <li key={item}>
            <a
              href={`#${item.toLowerCase()}`}
              className="relative text-white/75 text-sm font-medium tracking-wide no-underline transition-colors duration-200 hover:text-white group"
            >
              {item}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-twenitu-orange rounded-full transition-all duration-300 group-hover:w-full" />
            </a>
          </li>
        ))}
      </ul>

      {/* Buttons */}
      <div className="flex gap-3 justify-self-end items-center">
        <button
          type="button"
          onClick={onLogin}
          className="px-5 py-2 text-sm font-medium text-white border border-white/25 rounded-lg transition-all duration-200 hover:bg-white/10 hover:border-white/50 cursor-pointer max-[640px]:px-3.5 max-[640px]:py-1.5"
        >
          Login
        </button>
        <button
          type="button"
          onClick={onSignUp}
          className="px-5 py-2 text-sm font-medium bg-twenitu-orange text-white rounded-lg transition-all duration-200 hover:opacity-90 hover:-translate-y-0.5 hover:shadow-lg cursor-pointer max-[640px]:px-3.5 max-[640px]:py-1.5"
        >
          Sign Up
        </button>
      </div>
    </nav>
  );
};

export default NavBar;