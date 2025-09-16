import React from "react";
import "./Sidebar.css";

const Sidebar = ({ activeSection, setActiveSection, onSignOut }) => {
  return (
    <div className="sidebar">
      <h2 className="logo">TWENITU</h2>
      <nav className="nav-links">
        <button
          className={activeSection === "home" ? "active" : ""}
          onClick={() => setActiveSection("home")}
        >
          🏠 Home
        </button>
        <button
          className={activeSection === "plan" ? "active" : ""}
          onClick={() => setActiveSection("plan")}
        >
          📐 Plan
        </button>
        <button
          className={activeSection === "inspiration" ? "active" : ""}
          onClick={() => setActiveSection("inspiration")}
        >
          💡 Inspiration
        </button>
        <button
          className={activeSection === "messages" ? "active" : ""}
          onClick={() => setActiveSection("messages")}
        >
          💬 Messages
        </button>
      </nav>
      <button className="signout-btn" onClick={onSignOut}>
        🚪 Sign Out
      </button>
    </div>
  );
};

export default Sidebar;