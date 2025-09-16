import React, { useState } from "react";

const MessagesSection = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const handleSend = () => {
    if (message.trim() === "") return;

    // Add message to local state (for now, just client-side)
    setMessages([...messages, { text: message, time: new Date().toLocaleTimeString() }]);
    setMessage(""); // reset input
  };

  return (
    <div>
      <h2>Messages 💬</h2>
      <p>Send a message to the team and keep track of your conversation.</p>

      {/* Display past messages */}
      <div style={{ margin: "20px 0" }}>
        {messages.length === 0 ? (
          <p style={{ color: "#6b7280" }}>No messages yet.</p>
        ) : (
          messages.map((msg, index) => (
            <div
              key={index}
              style={{
                background: "#fff",
                padding: "12px",
                borderRadius: "8px",
                marginBottom: "10px",
                border: "1px solid #e5e7eb",
              }}
            >
              <p style={{ margin: 0 }}>{msg.text}</p>
              <small style={{ color: "#9ca3af" }}>{msg.time}</small>
            </div>
          ))
        )}
      </div>

      {/* Message box */}
      <div className="message-box">
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message here..."
        />
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
};

export default MessagesSection;
