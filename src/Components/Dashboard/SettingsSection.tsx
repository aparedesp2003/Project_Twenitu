import { useState, useEffect } from "react";
import { supabase } from "../../lib/supabase";

interface NotificationPrefs {
  projectUpdates: boolean;
  messages: boolean;
  newsletter: boolean;
  promotions: boolean;
}

const inputClass =
  "w-full px-4 py-3 border border-gray-200 rounded-xl text-sm bg-white outline-none focus:border-twenitu-orange focus:ring-2 focus:ring-twenitu-orange/20 transition-all duration-200 placeholder:text-gray-400";
const labelClass =
  "block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5";

const SettingsSection = () => {
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [saved, setSaved] = useState<boolean>(false);
  const [saveError, setSaveError] = useState<string>("");
  const [saveLoading, setSaveLoading] = useState<boolean>(false);
  const [profileLoading, setProfileLoading] = useState<boolean>(true);

  const [notifications, setNotifications] = useState<NotificationPrefs>({
    projectUpdates: true,
    messages: true,
    newsletter: false,
    promotions: false,
  });

  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [pwdError, setPwdError] = useState<string>("");
  const [pwdSuccess, setPwdSuccess] = useState<boolean>(false);
  const [pwdLoading, setPwdLoading] = useState<boolean>(false);

  const notificationItems: { key: keyof NotificationPrefs; label: string; desc: string }[] = [
    { key: "projectUpdates", label: "Project Updates", desc: "Get notified when your project status changes." },
    { key: "messages", label: "New Messages", desc: "Receive alerts when the team sends you a message." },
    { key: "newsletter", label: "Newsletter", desc: "Monthly updates and industry insights from Twenitú." },
    { key: "promotions", label: "Promotions", desc: "Occasional offers and service announcements." },
  ];

  useEffect(() => {
    const loadProfile = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      setEmail(user.email ?? "");

      const { data: profile } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

      if (profile) {
        setFirstName(profile.first_name ?? "");
        setLastName(profile.last_name ?? "");
        setPhone(profile.phone ?? "");
      }

      const { data: notif } = await supabase
        .from("notification_settings")
        .select("*")
        .eq("user_id", user.id)
        .single();

      if (notif) {
        setNotifications({
          projectUpdates: notif.project_updates,
          messages: notif.messages,
          newsletter: notif.newsletter,
          promotions: notif.promotions,
        });
      }

      setProfileLoading(false);
    };

    loadProfile();
  }, []);

  const handleSave = async (): Promise<void> => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    setSaveError("");
    setSaveLoading(true);
    const { error } = await supabase
      .from("profiles")
      .upsert({ id: user.id, first_name: firstName, last_name: lastName, phone });
    setSaveLoading(false);

    if (error) {
      setSaveError(error.message);
      return;
    }
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const toggleNotification = async (key: keyof NotificationPrefs): Promise<void> => {
    const updated = { ...notifications, [key]: !notifications[key] };
    setNotifications(updated);

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    await supabase.from("notification_settings").upsert({
      user_id: user.id,
      project_updates: updated.projectUpdates,
      messages: updated.messages,
      newsletter: updated.newsletter,
      promotions: updated.promotions,
    });
  };

  const handleUpdatePassword = async (): Promise<void> => {
    setPwdError("");
    if (!newPassword.trim() || !confirmPassword.trim()) {
      setPwdError("Please fill in both password fields.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setPwdError("Passwords don't match.");
      return;
    }
    if (newPassword.length < 8) {
      setPwdError("Password must be at least 8 characters.");
      return;
    }
    setPwdLoading(true);
    const { error } = await supabase.auth.updateUser({ password: newPassword });
    setPwdLoading(false);
    if (error) {
      setPwdError(error.message);
      return;
    }
    setNewPassword("");
    setConfirmPassword("");
    setPwdSuccess(true);
    setTimeout(() => setPwdSuccess(false), 2500);
  };

  const initials =
    (firstName.charAt(0) || "").toUpperCase() +
    (lastName.charAt(0) || "").toUpperCase();

  if (profileLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-sm text-gray-400 animate-pulse">Loading profile…</p>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <span className="text-xs font-semibold tracking-widest uppercase text-twenitu-orange">
          Settings
        </span>
        <h1 className="text-3xl font-bold text-twenitu-navy mt-1">Account Settings</h1>
        <p className="text-gray-500 text-sm mt-1">
          Manage your profile, preferences, and security.
        </p>
      </div>

      <div className="flex flex-col gap-6">

        {/* Profile */}
        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
          <h3 className="font-bold text-gray-900 text-base mb-5">Profile Information</h3>

          {/* Avatar row */}
          <div className="flex items-center gap-4 mb-6 pb-6 border-b border-gray-100">
            <div className="w-16 h-16 rounded-full bg-twenitu-navy flex items-center justify-center text-white text-xl font-bold select-none shrink-0">
              {initials || "?"}
            </div>
            <div>
              <p className="font-semibold text-gray-800">
                {firstName || "—"} {lastName}
              </p>
              <p className="text-xs text-gray-400 mt-0.5">{email}</p>
            </div>
          </div>

          {/* Fields */}
          <div className="grid grid-cols-2 gap-4 max-[640px]:grid-cols-1">
            <div>
              <label className={labelClass}>First Name</label>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className={inputClass}
                placeholder="First name"
              />
            </div>
            <div>
              <label className={labelClass}>Last Name</label>
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className={inputClass}
                placeholder="Last name"
              />
            </div>
            <div className="col-span-2 max-[640px]:col-span-1">
              <label className={labelClass}>Email Address</label>
              <input
                type="email"
                value={email}
                disabled
                placeholder="Email address"
                className={`${inputClass} bg-gray-50 text-gray-400 cursor-not-allowed`}
              />
            </div>
            <div className="col-span-2 max-[640px]:col-span-1">
              <label className={labelClass}>Phone Number</label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className={inputClass}
                placeholder="(555) 000-0000"
              />
            </div>
          </div>

          <div className="mt-5 flex items-center gap-3 flex-wrap">
            <button
              type="button"
              onClick={handleSave}
              disabled={saveLoading}
              className="px-6 py-2.5 bg-twenitu-orange text-white text-sm font-semibold rounded-xl hover:opacity-90 hover:-translate-y-0.5 transition-all duration-200 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {saveLoading ? "Saving…" : "Save Changes"}
            </button>
            {saved && (
              <span className="text-sm text-twenitu-olive font-medium">✓ Changes saved</span>
            )}
            {saveError && (
              <span className="text-sm text-red-500">{saveError}</span>
            )}
          </div>
        </div>

        {/* Notifications */}
        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
          <h3 className="font-bold text-gray-900 text-base mb-1">Notifications</h3>
          <p className="text-sm text-gray-400 mb-5">
            Choose what updates you'd like to receive.
          </p>
          <div className="flex flex-col">
            {notificationItems.map(({ key, label, desc }, i) => (
              <div
                key={key}
                className={`flex items-center justify-between py-4 ${i < notificationItems.length - 1 ? "border-b border-gray-50" : ""}`}
              >
                <div>
                  <p className="text-sm font-medium text-gray-800">{label}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{desc}</p>
                </div>
                <button
                  type="button"
                  onClick={() => toggleNotification(key)}
                  className={`relative w-11 h-6 rounded-full transition-colors duration-200 cursor-pointer shrink-0 ml-6 ${
                    notifications[key] ? "bg-twenitu-orange" : "bg-gray-200"
                  }`}
                  aria-label={`Toggle ${label}`}
                >
                  <span
                    className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow-sm transition-transform duration-200 ${
                      notifications[key] ? "translate-x-5" : "translate-x-0"
                    }`}
                  />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Security */}
        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
          <h3 className="font-bold text-gray-900 text-base mb-1">Security</h3>
          <p className="text-sm text-gray-400 mb-5">
            Update your password to keep your account secure.
          </p>
          <div className="flex flex-col gap-4 max-w-md">
            <div>
              <label className={labelClass}>New Password</label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className={inputClass}
                placeholder="Enter new password"
              />
            </div>
            <div>
              <label className={labelClass}>Confirm New Password</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className={inputClass}
                placeholder="Confirm new password"
              />
            </div>
            {pwdError && (
              <p className="text-xs text-red-500">{pwdError}</p>
            )}
            {pwdSuccess && (
              <p className="text-xs text-twenitu-olive font-medium">✓ Password updated successfully</p>
            )}
            <button
              type="button"
              onClick={handleUpdatePassword}
              disabled={pwdLoading}
              className="self-start px-6 py-2.5 bg-twenitu-navy text-white text-sm font-semibold rounded-xl hover:opacity-90 hover:-translate-y-0.5 transition-all duration-200 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {pwdLoading ? "Updating…" : "Update Password"}
            </button>
          </div>
        </div>

        {/* Danger zone */}
        <div className="bg-white rounded-2xl p-6 border border-red-100 shadow-sm">
          <h3 className="font-bold text-red-500 text-base mb-1">Danger Zone</h3>
          <p className="text-sm text-gray-400 mb-4">
            These actions are permanent and cannot be undone. Please proceed with caution.
          </p>
          <button
            type="button"
            className="px-6 py-2.5 border border-red-200 text-red-500 text-sm font-semibold rounded-xl hover:bg-red-50 transition-all duration-200 cursor-pointer"
          >
            Delete Account
          </button>
        </div>

      </div>
    </div>
  );
};

export default SettingsSection;