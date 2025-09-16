import React, { useState } from "react";

const InspirationSection = () => {
  const [savedIdeas, setSavedIdeas] = useState([]);

  const ideas = [
    {
      id: 1,
      title: "Modern Kitchen",
      description: "Open space with natural lighting and minimalistic design.",
      image: "https://source.unsplash.com/400x250/?kitchen,modern",
    },
    {
      id: 2,
      title: "Cozy Living Room",
      description: "Warm colors and comfortable furniture for relaxation.",
      image: "https://source.unsplash.com/400x250/?livingroom,interior", //Change this with the actual image of the idea
    },
    {
      id: 3,
      title: "Office Workspace",
      description: "Productive and stylish workspace with ergonomic design.",
      image: "https://source.unsplash.com/400x250/?workspace,office", //Change this with the actual image of the idea
    },
    {
      id: 4,
      title: "Luxury Bathroom",
      description: "Elegant marble with a spa-like atmosphere.",
      image: "https://source.unsplash.com/400x250/?bathroom,luxury", //Change this with the actual image of the idea
    },
  ];

  const toggleSave = (id) => {
    if (savedIdeas.includes(id)) {
      setSavedIdeas(savedIdeas.filter((ideaId) => ideaId !== id));
    } else {
      setSavedIdeas([...savedIdeas, id]);
    }
  };

  return (
    <div>
      <h2>Inspiration 💡</h2>
      <p>Browse project ideas and save your favorites for later reference.</p>

      <div className="dashboard-cards">
        {ideas.map((idea) => (
          <div key={idea.id} className="dashboard-card">
            <img
              src={idea.image}
              alt={idea.title}
              style={{
                width: "100%",
                borderRadius: "8px",
                marginBottom: "10px",
                objectFit: "cover",
              }}
            />
            <h3>{idea.title}</h3>
            <p>{idea.description}</p>
            <button
              onClick={() => toggleSave(idea.id)}
              style={{
                marginTop: "10px",
                padding: "8px 12px",
                borderRadius: "6px",
                border: "none",
                background: savedIdeas.includes(idea.id) ? "#9d9759" : "#2563eb",
                color: "#fff",
                fontWeight: "600",
                cursor: "pointer",
              }}
            >
              {savedIdeas.includes(idea.id) ? "✓ Saved" : "Save Idea"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InspirationSection;
