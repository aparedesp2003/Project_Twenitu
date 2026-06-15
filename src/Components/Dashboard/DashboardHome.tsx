import { useState, useEffect } from "react";
import { supabase } from "../../lib/supabase";

type Section = "home" | "plan" | "inspiration" | "messages" | "settings";

interface DashboardHomeProps {
  setActiveSection: (section: Section) => void;
}

const features = [
  {
    key: "plan",
    title: "Plan Your Project",
    description: "Use our immersive Power BI tool to design and manage your project efficiently.",
    iconBg: "bg-twenitu-navy/10",
    iconColor: "text-twenitu-navy",
  },
  {
    key: "inspiration",
    title: "Inspiration Board",
    description: "Browse and save curated design ideas to kickstart your creativity.",
    iconBg: "bg-twenitu-orange/10",
    iconColor: "text-twenitu-orange",
  },
  {
    key: "messages",
    title: "Messages",
    description: "Communicate directly with our team through your private message box.",
    iconBg: "bg-twenitu-sage/20",
    iconColor: "text-twenitu-navy",
  },
  {
    key: "settings",
    title: "Account Settings",
    description: "Manage your profile, preferences, and security settings all in one place.",
    iconBg: "bg-twenitu-olive/15",
    iconColor: "text-twenitu-olive",
  },
];

const featureIcons = {
  plan: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="3 11 22 2 13 21 11 13 3 11" />
    </svg>
  ),
  inspiration: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="9" y1="18" x2="15" y2="18" />
      <line x1="10" y1="22" x2="14" y2="22" />
      <path d="M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0 0 18 8 6 6 0 0 0 6 8c0 1 .23 2.23 1.5 3.5A4.61 4.61 0 0 1 8.91 14" />
    </svg>
  ),
  messages: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  ),
  settings: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
    </svg>
  ),
};

const DashboardHome = ({ setActiveSection }: DashboardHomeProps) => {
  const [firstName, setFirstName] = useState<string>("");
  const [savedCount, setSavedCount] = useState<number>(0);
  const [messageCount, setMessageCount] = useState<number>(0);

  useEffect(() => {
    const loadData = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const [profileRes, savedRes, msgRes] = await Promise.all([
        supabase.from("profiles").select("first_name").eq("id", user.id).single(),
        supabase.from("saved_ideas").select("idea_key", { count: "exact", head: true }).eq("user_id", user.id),
        supabase.from("messages").select("id", { count: "exact", head: true }).eq("user_id", user.id).eq("sender", "team"),
      ]);

      if (profileRes.data?.first_name) setFirstName(profileRes.data.first_name);
      setSavedCount(savedRes.count ?? 0);
      // subtract 1 to exclude the automated welcome message
      setMessageCount(Math.max(0, (msgRes.count ?? 1) - 1));
    };

    loadData();
  }, []);

  return (
    <div>
      {/* Welcome header */}
      <div className="mb-8">
        <span className="text-xs font-semibold tracking-widest uppercase text-twenitu-orange">
          Dashboard
        </span>
        <h1 className="text-3xl font-bold text-twenitu-navy mt-1">
          Welcome back{firstName ? `, ${firstName}` : ""}
        </h1>
        <p className="text-gray-500 text-sm mt-1">
          Here's a quick overview of your project.
        </p>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-3 gap-4 mb-10 max-[640px]:grid-cols-1">
        {/* Project Status */}
        <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
          <p className="text-xs text-gray-400 uppercase tracking-widest mb-2">Project Status</p>
          <p className="text-2xl font-bold text-twenitu-orange">Active</p>
          <p className="text-xs text-gray-400 mt-1">In progress</p>
          <div className="mt-3 h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
            <div className="h-full w-3/5 bg-twenitu-orange rounded-full" />
          </div>
        </div>

        {/* Saved Ideas */}
        <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
          <p className="text-xs text-gray-400 uppercase tracking-widest mb-2">Saved Ideas</p>
          <p className="text-2xl font-bold text-twenitu-navy">{savedCount}</p>
          <p className="text-xs text-gray-400 mt-1">
            {savedCount === 1 ? "idea saved" : "ideas saved"}
          </p>
        </div>

        {/* Messages */}
        <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
          <p className="text-xs text-gray-400 uppercase tracking-widest mb-2">Messages</p>
          <p className="text-2xl font-bold text-twenitu-navy">{messageCount}</p>
          <p className="text-xs text-gray-400 mt-1">
            {messageCount === 1 ? "message from team" : "messages from team"}
          </p>
        </div>
      </div>

      {/* Quick access */}
      <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-4">
        Quick Access
      </p>
      <div className="grid grid-cols-2 gap-5 max-[640px]:grid-cols-1">
        {features.map((feature) => (
          <div
            key={feature.key}
            className="group bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:-translate-y-1 hover:shadow-md transition-all duration-200 cursor-pointer"
            onClick={() => setActiveSection(feature.key as Section)}
          >
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${feature.iconBg} ${feature.iconColor}`}>
              {featureIcons[feature.key as keyof typeof featureIcons]}
            </div>
            <h3 className="font-bold text-gray-900 text-base mb-1.5">{feature.title}</h3>
            <p className="text-sm text-gray-500 leading-relaxed">{feature.description}</p>
            <div className="mt-4 flex items-center gap-1.5 text-xs font-semibold text-twenitu-orange transition-all duration-200 group-hover:gap-2.5">
              Open <span>→</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashboardHome;