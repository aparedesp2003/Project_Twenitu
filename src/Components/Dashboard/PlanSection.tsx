import { useState, useRef, useEffect } from "react";
import { supabase } from "../../lib/supabase";

const POWERBI_SRC =
  "https://app.powerbi.com/view?r=eyJrIjoiYzc5M2Y4MTgtYTk2ZS00NDk0LWIzOTctOGQ5MWRjZTUyZmJiIiwidCI6Ijk0YWMyNGRhLTQ1NmQtNDk5NC1hN2YzLTFmNWQ2NDhlN2QyOSIsImMiOjZ9";

const PlanSection = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [loadError, setLoadError] = useState<boolean>(false);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

  const [notes, setNotes] = useState<string>("");
  const [notesInitialLoading, setNotesInitialLoading] = useState<boolean>(true);
  const [notesLoading, setNotesLoading] = useState<boolean>(false);
  const [notesSaved, setNotesSaved] = useState<boolean>(false);
  const [notesError, setNotesError] = useState<string>("");

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadNotes = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { setNotesInitialLoading(false); return; }

      const { data } = await supabase
        .from("project_notes")
        .select("content")
        .eq("user_id", user.id)
        .single();

      if (data?.content) setNotes(data.content);
      setNotesInitialLoading(false);
    };
    loadNotes();
  }, []);

  useEffect(() => {
    const onChange = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener("fullscreenchange", onChange);
    return () => document.removeEventListener("fullscreenchange", onChange);
  }, []);

  const toggleFullscreen = (): void => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  };

  const handleSaveNotes = async (): Promise<void> => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    setNotesError("");
    setNotesLoading(true);
    const { error } = await supabase
      .from("project_notes")
      .upsert({ user_id: user.id, content: notes });
    setNotesLoading(false);

    if (error) { setNotesError(error.message); return; }
    setNotesSaved(true);
    setTimeout(() => setNotesSaved(false), 2500);
  };

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <span className="text-xs font-semibold tracking-widest uppercase text-twenitu-orange">
          Planning
        </span>
        <h2 className="text-2xl font-bold text-twenitu-navy mt-1">Plan Your Project</h2>
        <p className="text-sm text-gray-500 mt-1 leading-relaxed">
          Interact with your immersive planning tool powered by Power BI. Use the fullscreen
          button for the best experience.
        </p>
      </div>

      {/* iframe card */}
      <div
        ref={containerRef}
        className="relative rounded-2xl overflow-hidden border border-gray-100 shadow-sm bg-white"
      >
        {/* Fullscreen button */}
        <button
          type="button"
          onClick={toggleFullscreen}
          className="absolute top-3 right-3 z-10 w-9 h-9 rounded-xl bg-white/90 border border-gray-200 shadow-sm flex items-center justify-center text-gray-500 hover:text-twenitu-navy hover:border-twenitu-navy/30 transition-all duration-200 cursor-pointer"
          aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
          title={isFullscreen ? "Exit fullscreen" : "Fullscreen"}
        >
          {isFullscreen ? (
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M8 3v3a2 2 0 0 1-2 2H3" />
              <path d="M21 8h-3a2 2 0 0 1-2-2V3" />
              <path d="M3 16h3a2 2 0 0 1 2 2v3" />
              <path d="M16 21v-3a2 2 0 0 1 2-2h3" />
            </svg>
          ) : (
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M8 3H5a2 2 0 0 0-2 2v3" />
              <path d="M21 8V5a2 2 0 0 0-2-2h-3" />
              <path d="M3 16v3a2 2 0 0 0 2 2h3" />
              <path d="M16 21h3a2 2 0 0 0 2-2v-3" />
            </svg>
          )}
        </button>

        {/* Loading spinner */}
        {isLoading && !loadError && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-white z-5 gap-3">
            <div className="w-10 h-10 rounded-full border-4 border-gray-100 border-t-twenitu-orange animate-spin" />
            <p className="text-sm text-gray-400">Loading Power BI report…</p>
          </div>
        )}

        {/* Error state */}
        {loadError && (
          <div className="py-20 text-center text-gray-400 text-sm">
            <p className="text-3xl mb-3">⚠️</p>
            <p className="font-medium text-gray-600">Power BI report unavailable</p>
            <p className="mt-1">Please try refreshing the page.</p>
          </div>
        )}

        {!loadError && (
          <iframe
            title="Power BI Dashboard"
            src={POWERBI_SRC}
            width="100%"
            height="800"
            className="border-0 block"
            allowFullScreen={true}
            onLoad={() => setIsLoading(false)}
            onError={() => { setIsLoading(false); setLoadError(true); }}
          />
        )}
      </div>

      {/* Project Notes */}
      <div className="mt-6 bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
        <h3 className="font-bold text-gray-900 text-base mb-1">Project Notes</h3>
        <p className="text-sm text-gray-400 mb-4">
          Jot down ideas, questions, or decisions related to your project. Notes are saved to your account.
        </p>

        {notesInitialLoading ? (
          <p className="text-sm text-gray-400 animate-pulse">Loading notes…</p>
        ) : (
          <>
            <textarea
              rows={5}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="e.g. Preferred kitchen layout — open concept with island. Discussed sage green for walls. Ask team about permit timeline…"
              className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm text-gray-800 placeholder:text-gray-400 outline-none focus:border-twenitu-orange focus:ring-2 focus:ring-twenitu-orange/20 transition-all duration-200 resize-none leading-relaxed"
            />

            <div className="mt-3 flex items-center gap-3">
              <button
                type="button"
                onClick={handleSaveNotes}
                disabled={notesLoading}
                className="px-6 py-2.5 bg-twenitu-orange text-white text-sm font-semibold rounded-xl hover:opacity-90 hover:-translate-y-0.5 transition-all duration-200 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {notesLoading ? "Saving…" : "Save Notes"}
              </button>
              {notesSaved && (
                <span className="text-sm text-twenitu-olive font-medium">✓ Notes saved</span>
              )}
              {notesError && (
                <span className="text-sm text-red-500">{notesError}</span>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default PlanSection;