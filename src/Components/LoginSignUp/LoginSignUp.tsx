import { useState } from "react";
import type { KeyboardEvent } from "react";
import { supabase } from "../../lib/supabase";

interface LoginSignUpProps {
  onSuccess: () => void;
  initialMode?: "Login" | "Sign Up";
  onClose?: () => void;
}

interface PasswordRule {
  label: string;
  test: (pwd: string) => boolean;
}

const inputClass =
  "w-full px-5 py-4 border border-gray-200 rounded-xl text-base bg-white transition-all duration-200 outline-none focus:border-twenitu-orange focus:ring-2 focus:ring-twenitu-orange/20 placeholder:text-gray-400";

const LoginSignUp = ({ onSuccess, initialMode = "Sign Up", onClose }: LoginSignUpProps) => {
  const [action, setAction] = useState<string>(initialMode);
  const [showSuccess, setShowSuccess] = useState<boolean>(false);
  const [checkEmail, setCheckEmail] = useState<boolean>(false);

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [phone, setPhone] = useState<string>("");

  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const rules: PasswordRule[] = [
    { label: "At least 8 characters", test: (pwd) => pwd.length >= 8 },
    { label: "At least one uppercase letter", test: (pwd) => /[A-Z]/.test(pwd) },
    { label: "At least one lowercase letter", test: (pwd) => /[a-z]/.test(pwd) },
    { label: "At least one number", test: (pwd) => /[0-9]/.test(pwd) },
    {
      label: "At least one special character (!@#$...)",
      test: (pwd) => /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(pwd),
    },
  ];

  const isPasswordValid = rules.every((rule) => rule.test(password));

  const handleSubmit = async (): Promise<void> => {
    setError("");

    if (action === "Login") {
      if (!email.trim() || !password.trim()) {
        setError("Please enter your email and password.");
        return;
      }
      setLoading(true);
      const { error: authError } = await supabase.auth.signInWithPassword({ email, password });
      setLoading(false);
      if (authError) {
        setError(authError.message);
        return;
      }
      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
        onSuccess();
      }, 1200);
    } else {
      if (!email.trim() || !firstName.trim()) {
        setError("First name and email are required.");
        return;
      }
      if (!isPasswordValid) {
        setError("Please meet all password requirements.");
        return;
      }
      setLoading(true);
      const { data, error: authError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { first_name: firstName, last_name: lastName, phone },
        },
      });
      setLoading(false);
      if (authError) {
        setError(authError.message);
        return;
      }
      // Email confirmation required
      if (data.session === null) {
        setCheckEmail(true);
        return;
      }
      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
        onSuccess();
      }, 1200);
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>): void => {
    if (e.key === "Enter") handleSubmit();
  };

  // "Check your email" screen
  if (checkEmail) {
    return (
      <div className="min-h-[calc(100vh-72px)] flex items-center justify-center bg-gray-50 py-10 px-4">
        <div className="bg-twenitu-off-white rounded-2xl shadow-2xl w-full max-w-xl p-12 text-center">
          <div className="w-16 h-16 rounded-full bg-twenitu-orange/10 flex items-center justify-center mx-auto mb-6">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#C3703D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
              <polyline points="22,6 12,13 2,6" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-twenitu-navy mb-2">Check your email</h2>
          <p className="text-gray-500 text-sm leading-relaxed mb-6">
            We sent a confirmation link to <span className="font-semibold text-twenitu-navy">{email}</span>. Click it to activate your account, then come back to sign in.
          </p>
          <button
            type="button"
            onClick={() => { setCheckEmail(false); setAction("Login"); }}
            className="px-8 py-3 bg-twenitu-orange text-white rounded-xl font-semibold hover:opacity-90 transition-all duration-200 cursor-pointer"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-72px)] flex items-center justify-center bg-gray-50 py-10 px-4">
      <div className="relative bg-twenitu-off-white rounded-2xl shadow-2xl w-full max-w-xl p-12 max-h-[90vh] overflow-y-auto">

        {/* Close button */}
        {onClose && (
          <button
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-all duration-200 text-lg leading-none cursor-pointer"
          >
            ✕
          </button>
        )}

        {/* Success toast */}
        {showSuccess && (
          <div
            className="absolute inset-x-6 top-4 bg-linear-to-r from-twenitu-olive to-twenitu-orange text-white py-3 px-5 rounded-xl shadow-lg text-sm font-medium text-center z-10"
            aria-live="polite"
          >
            {action === "Login" ? "Welcome back!" : "Account created successfully!"}
          </div>
        )}

        {/* Error message */}
        {error && (
          <div className="mb-4 px-4 py-3 bg-red-50 border border-red-200 text-red-600 text-sm rounded-xl">
            {error}
          </div>
        )}

        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-twenitu-navy">
            {action === "Login" ? "Welcome Back" : "Create Account"}
          </h2>
          <p className="text-base text-gray-500 mt-2">
            {action === "Login"
              ? "Sign in to your Twenitú account"
              : "Join Twenitú and start your project"}
          </p>
        </div>

        {/* Mode tabs */}
        <div className="flex rounded-xl bg-gray-100 p-1 mb-8">
          <button
            type="button"
            onClick={() => { setAction("Login"); setError(""); }}
            className={`flex-1 py-3 rounded-lg text-base font-semibold transition-all duration-200 cursor-pointer ${
              action === "Login"
                ? "bg-twenitu-orange text-white shadow-sm"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Login
          </button>
          <button
            type="button"
            onClick={() => { setAction("Sign Up"); setError(""); }}
            className={`flex-1 py-3 rounded-lg text-base font-semibold transition-all duration-200 cursor-pointer ${
              action === "Sign Up"
                ? "bg-twenitu-orange text-white shadow-sm"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Sign Up
          </button>
        </div>

        {/* Form fields */}
        <div className="flex flex-col gap-4" onKeyDown={handleKeyDown}>
          {action === "Sign Up" && (
            <>
              <div className="flex gap-3">
                <input
                  type="text"
                  placeholder="First Name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className={inputClass}
                />
                <input
                  type="text"
                  placeholder="Last Name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className={inputClass}
                />
              </div>
              <input
                type="tel"
                placeholder="Phone Number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className={inputClass}
              />
            </>
          )}

          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={inputClass}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={inputClass}
          />

          {/* Password rules — Sign Up only */}
          {action === "Sign Up" && (
            <div className="flex flex-col gap-1 px-1 pt-1">
              {rules.map((rule, i) => {
                const passed = rule.test(password);
                return (
                  <div
                    key={i}
                    className={`flex items-center gap-2 text-xs transition-colors duration-300 ${
                      passed ? "text-twenitu-olive" : "text-gray-400"
                    }`}
                  >
                    <span
                      className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-bold border shrink-0 ${
                        passed
                          ? "bg-twenitu-olive border-twenitu-olive text-white"
                          : "border-gray-300"
                      }`}
                    >
                      {passed ? "✓" : ""}
                    </span>
                    {rule.label}
                  </div>
                );
              })}
            </div>
          )}

          {/* Forgot password — Login only */}
          {action === "Login" && (
            <div className="text-right -mt-1">
              <span className="text-xs text-twenitu-orange cursor-pointer hover:underline">
                Forgot password?
              </span>
            </div>
          )}

          {/* Submit */}
          <button
            type="button"
            onClick={handleSubmit}
            disabled={loading}
            className="w-full py-4 bg-twenitu-orange text-white rounded-xl font-semibold text-lg transition-all duration-200 hover:opacity-90 hover:-translate-y-0.5 hover:shadow-lg mt-2 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed disabled:translate-y-0"
          >
            {loading
              ? "Please wait…"
              : action === "Login"
              ? "Sign In"
              : "Create Account"}
          </button>
        </div>

        {/* Divider */}
        <div className="flex items-center gap-3 mt-8">
          <div className="flex-1 h-px bg-gray-200" />
          <span className="text-xs text-gray-400 font-medium tracking-widest uppercase">
            Twenitú
          </span>
          <div className="flex-1 h-px bg-gray-200" />
        </div>
      </div>
    </div>
  );
};

export default LoginSignUp;