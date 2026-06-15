import { useState } from "react";
import Sidebar from "./Sidebar";
import DashboardHome from "./DashboardHome";
import PlanSection from "./PlanSection";
import InspirationSection from "./InspirationSection";
import MessagesSection from "./MessagesSection";
import SettingsSection from "./SettingsSection";

type Section = "home" | "plan" | "inspiration" | "messages" | "settings";

interface DashboardLayoutProps {
  onSignOut: () => void | Promise<void>;
}

const DashboardLayout = ({ onSignOut }: DashboardLayoutProps) => {
  const [activeSection, setActiveSection] = useState<Section>("home");

  const renderSection = () => {
    switch (activeSection) {
      case "plan":
        return <PlanSection />;
      case "inspiration":
        return <InspirationSection />;
      case "messages":
        return <MessagesSection />;
      case "settings":
        return <SettingsSection />;
      default:
        return <DashboardHome setActiveSection={setActiveSection} />;
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50 max-[768px]:flex-col">
      <Sidebar
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        onSignOut={onSignOut}
      />
      <main className="flex-1 p-7.5 overflow-y-auto max-[768px]:p-5">{renderSection()}</main>
    </div>
  );
};

export default DashboardLayout;
