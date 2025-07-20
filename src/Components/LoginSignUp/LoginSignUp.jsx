import React, { useState } from "react";
import "./LoginSignUp.css";
import user_icon from "../Images/user_icon.png";
import email_icon from "../Images/email_icon.png";
import password_icon from "../Images/password_icon.png";
import telephone_icon from "../Images/telephone_icon.png";

const LoginSignUp = () => {
  const [action, setAction] = useState("Sign Up");
  const [showSuccess, setShowSuccess] = useState(false);
  const [password, setPassword] = useState("");

  const rules = [
    {
      label: "At least 8 characters",
      test: (pwd) => pwd.length >= 8,
    },
    {
      label: "At least one uppercase letter",
      test: (pwd) => /[A-Z]/.test(pwd),
    },
    {
      label: "At least one lowercase letter",
      test: (pwd) => /[a-z]/.test(pwd),
    },
    {
      label: "At least one number",
      test: (pwd) => /[0-9]/.test(pwd),
    },
    {
      label: "At least one special character (!@#$...)",
      test: (pwd) => /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(pwd),
    },
  ];

  const isPasswordValid = rules.every((rule) => rule.test(password));

  const handleSubmit = () => {
    if (isPasswordValid) {
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    }
  };

  return (
    <div className="container">
      {showSuccess && (
        <div className="popup">
          {action === "Login"
            ? "Login Successful!"
            : "Account Created Successfully!"}
        </div>
      )}

      <div className="header">
        <div className="text">{action}</div>
        <div className="underline"></div>
      </div>

      <div className="inputs">
        {action === "Sign Up" && (
          <>
            <div className="input">
              <img src={user_icon} alt="User Icon" />
              <input type="text" placeholder="First Name" />
            </div>
            <div className="input">
              <img src={user_icon} alt="User Icon" />
              <input type="text" placeholder="Last Name" />
            </div>
            <div className="input">
              <img src={telephone_icon} alt="Phone Icon" />
              <input type="text" placeholder="Phone Number" />
            </div>
          </>
        )}

        <div className="input">
          <img src={email_icon} alt="Email Icon" />
          <input type="email" placeholder="Email" />
        </div>

        <div className="input">
          <img src={password_icon} alt="Password Icon" />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {/* Password Rule Display */}
        <div className="password-rules">
          {rules.map((rule, index) => {
            const passed = rule.test(password);
            return (
              <div
                key={index}
                className={`rule ${passed ? "valid" : "invalid"}`}
              >
                {passed ? "✅" : "❌"} {rule.label}
              </div>
            );
          })}
        </div>
      </div>

      <div className="forgot-password">
        Forgot Password? <span>Click Here!</span>
      </div>

      <div className="submit-container">
        <div
          className={action === "Login" ? "submit gray" : "submit"}
          onClick={() => {
            if (action !== "Sign Up") setAction("Sign Up");
            else handleSubmit();
          }}
        >
          Sign Up
        </div>
        <div
          className={action === "Sign Up" ? "submit gray" : "submit"}
          onClick={() => {
            if (action !== "Login") setAction("Login");
            else handleSubmit();
          }}
        >
          Login
        </div>
      </div>
    </div>
  );
};

export default LoginSignUp;
