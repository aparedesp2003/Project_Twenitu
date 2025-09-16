import React, { useState } from "react";
import Sidebar from "./Sidebar";
import "./Dashboard.css";

// Sections
import DashboardHome from "./DashboardHome";
import PlanSection from "./PlanSection";
import InspirationSection from "./InspirationSection";
import MessagesSection from "./MessagesSection";

const DashboardLayout = ({ onSignOut }) => {
  const [activeSection, setActiveSection] = useState("home");

  const renderSection = () => {
    switch (activeSection) {
      case "plan":
        return <PlanSection />;
      case "inspiration":
        return <InspirationSection />;
      case "messages":
        return <MessagesSection />;
      default:
        return <DashboardHome setActiveSection={setActiveSection} />;
    }
  };

  return (
    <div className="dashboard-container">
      <Sidebar
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        onSignOut={onSignOut}
      />
      <main className="dashboard-main">{renderSection()}</main>
    </div>
  );
};

export default DashboardLayout;
