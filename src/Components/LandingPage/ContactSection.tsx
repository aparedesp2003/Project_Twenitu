import { useState } from "react";
import { supabase } from "../../lib/supabase";
import { useScrollReveal } from "../../hooks/useScrollReveal";

const inputClass =
  "w-full px-4 py-3.5 border border-gray-200 rounded-xl text-sm text-gray-800 placeholder:text-gray-400 outline-none focus:border-twenitu-orange focus:ring-2 focus:ring-twenitu-orange/20 transition-all duration-200 bg-white";

const ContactSection = () => {
  const sectionRef = useScrollReveal();

  const [fullName, setFullName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const { error: dbError } = await supabase
      .from("contact_submissions")
      .insert({ full_name: fullName, email, message });

    setLoading(false);

    if (dbError) {
      setError("Something went wrong. Please try again.");
      return;
    }

    setSuccess(true);
    setFullName("");
    setEmail("");
    setMessage("");
  };

  return (
    <section ref={sectionRef} className="py-24 px-8 bg-twenitu-off-white" id="contact">
      <div className="max-w-6xl mx-auto">

        {/* Section header */}
        <div className="reveal text-center mb-14">
          <span className="font-brand-mono text-xs font-semibold tracking-widest uppercase text-twenitu-orange">
            Get in Touch
          </span>
          <h2 className="font-brand-mono text-4xl font-bold text-twenitu-navy mt-2 max-[640px]:text-3xl">
            Let's Build Something Together
          </h2>
          <p className="font-brand-sans text-gray-500 mt-3 text-base max-w-xl mx-auto leading-relaxed">
            Have a project in mind? Reach out and our team will get back to you within 24 hours.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-12 items-start max-[768px]:grid-cols-1">

          {/* Left — contact info */}
          <div className="reveal-left flex flex-col gap-8">
            <div>
              <h3 className="font-brand-mono text-xl font-bold text-twenitu-navy mb-2">Why work with us?</h3>
              <p className="font-brand-sans text-gray-500 text-sm leading-relaxed">
                Twenitú bridges the gap between design vision and construction reality. We use
                cutting-edge tools like Power BI and 3D modeling to give you full clarity at
                every stage of your project.
              </p>
            </div>

            <div className="flex flex-col gap-5">
              {[
                {
                  icon: (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.15 3.18 2 2 0 0 1 3.12 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.09 8.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21 16z" />
                    </svg>
                  ),
                  label: "Phone",
                  value: "+1 (555) 000-0000",
                },
                {
                  icon: (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                      <polyline points="22,6 12,13 2,6" />
                    </svg>
                  ),
                  label: "Email",
                  value: "hello@twenitu.com",
                },
                {
                  icon: (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                  ),
                  label: "Location",
                  value: "Chicago, IL",
                },
              ].map(({ icon, label, value }) => (
                <div key={label} className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-twenitu-navy/8 flex items-center justify-center text-twenitu-navy shrink-0">
                    {icon}
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-widest text-gray-400">{label}</p>
                    <p className="text-sm font-medium text-gray-800 mt-0.5">{value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — form */}
          <div className="reveal-right bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
            {success ? (
              <div className="flex flex-col items-center justify-center py-10 text-center gap-4">
                <div className="w-14 h-14 rounded-full bg-twenitu-olive/15 flex items-center justify-center text-2xl">
                  ✓
                </div>
                <h3 className="text-lg font-bold text-twenitu-navy">Message Sent!</h3>
                <p className="text-sm text-gray-500 leading-relaxed max-w-xs">
                  Thanks for reaching out. Our team will get back to you within 24 hours.
                </p>
                <button
                  type="button"
                  onClick={() => setSuccess(false)}
                  className="mt-2 text-xs font-semibold text-twenitu-orange underline underline-offset-4 cursor-pointer"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Jane Smith"
                    required
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="jane@example.com"
                    required
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">
                    Message
                  </label>
                  <textarea
                    rows={5}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Tell us about your project…"
                    required
                    className={`${inputClass} resize-none`}
                  />
                </div>

                {error && (
                  <p className="text-xs text-red-500 bg-red-50 px-4 py-3 rounded-xl border border-red-100">
                    {error}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 bg-twenitu-navy text-white text-sm font-semibold rounded-xl hover:opacity-90 hover:-translate-y-0.5 transition-all duration-200 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {loading ? "Sending…" : "Send Message"}
                </button>
              </form>
            )}
          </div>

        </div>
      </div>
    </section>
  );
};

export default ContactSection;