import React, { useState } from "react";
import Sidebar from "./Sidebar";

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
        return <DashboardHome />;
    }
  };

  return (
    <div style={{ display: "flex" }}>
      <Sidebar
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        onSignOut={onSignOut}
      />
      <main style={{ flex: 1, padding: "20px", background: "#f9fafb" }}>
        {renderSection()}
      </main>
    </div>
  );
};

export default DashboardLayout;
