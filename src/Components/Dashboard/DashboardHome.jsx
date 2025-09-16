import React from "react";

const DashboardHome = ({ setActiveSection }) => {
  const features = [
    {
      key: "plan",
      title: "Plan Your Project",
      description: "Use our immersive Power BI tool to design and manage your project efficiently.",
      icon: "📐",
    },
    {
      key: "inspiration",
      title: "Inspiration",
      description: "Browse and save pre-built ideas to kickstart your creativity and projects.",
      icon: "💡",
    },
    {
      key: "messages",
      title: "Messages",
      description: "Communicate directly with our team through your private message box.",
      icon: "💬",
    },
    {
      key: "settings",
      title: "Account Settings",
      description: "Manage your profile, preferences, and security settings all in one place.",
      icon: "⚙️",
    },
  ];

  return (
    <div>
      <h2>Welcome to your Dashboard 🎉</h2>
      <p>Here’s a quick overview of what you can do:</p>

      <div className="dashboard-cards">
        {features.map((feature) => (
          <div
            key={feature.key}
            className="dashboard-card"
            onClick={() => {
              if (feature.key !== "settings") {
                setActiveSection(feature.key);
              } else {
                alert("⚙️ Settings section coming soon!");
              }
            }}
            style={{ cursor: "pointer" }}
          >
            <h3>
              {feature.icon} {feature.title}
            </h3>
            <p>{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashboardHome;
