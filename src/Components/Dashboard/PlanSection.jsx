import React, { useState } from "react";

const PlanSection = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);

  return (
    <div>
      <h2>Plan Your Project 📐</h2>
      <p>
        Here you can interact with our immersive planning tool powered by Power BI.
      </p>

      <div
        style={{
          marginTop: "20px",
          borderRadius: "12px",
          overflow: "hidden",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          background: "#fff",
          position: "relative",
          minHeight: "600px",
        }}
      >
        {/* Show spinner while loading */}
        {isLoading && !loadError && (
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              textAlign: "center",
              color: "#6b7280",
            }}
          >
            <div
              style={{
                border: "4px solid #e5e7eb",
                borderTop: "4px solid #2563eb",
                borderRadius: "50%",
                width: "40px",
                height: "40px",
                margin: "0 auto 10px",
                animation: "spin 1s linear infinite",
              }}
            ></div>
            <p>Loading Power BI report...</p>
          </div>
        )}

        {/* Fallback if iframe fails */}
        {loadError && (
          <div
            style={{
              padding: "50px",
              textAlign: "center",
              color: "#6b7280",
              fontSize: "16px",
            }}
          >
            ⚠️ Power BI report is not available at the moment.
            <br />
            Please try again later.
          </div>
        )}

        {/* Iframe */}
        {!loadError && (
          <iframe
            title="Power BI Dashboard"
            src="https://app.powerbi.com/view?r=eyJrIjoiYzc5M2Y4MTgtYTk2ZS00NDk0LWIzOTctOGQ5MWRjZTUyZmJiIiwidCI6Ijk0YWMyNGRhLTQ1NmQtNDk5NC1hN2YzLTFmNWQ2NDhlN2QyOSIsImMiOjZ9"
            width="100%"
            height="800"
            style={{ border: "none" }}
            allowFullScreen={true}
            onLoad={() => setIsLoading(false)}
            onError={() => {
              setIsLoading(false);
              setLoadError(true);
            }}
          ></iframe>
        )}
      </div>
    </div>
  );
};

export default PlanSection;
