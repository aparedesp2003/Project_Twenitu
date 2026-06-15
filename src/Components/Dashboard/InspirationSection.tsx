import { useState, useEffect } from "react";
import { supabase } from "../../lib/supabase";

interface Idea {
  id: number;
  title: string;
  category: string;
  description: string;
  image: string;
}

const ideas: Idea[] = [
  {
    id: 1,
    title: "Modern Kitchen",
    category: "Kitchen",
    description: "Open space with natural lighting, clean surfaces, and minimalistic design.",
    image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 2,
    title: "Cozy Living Room",
    category: "Living Room",
    description: "Warm tones and comfortable furniture layered for a relaxed, inviting atmosphere.",
    image: "https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 3,
    title: "Office Workspace",
    category: "Workspace",
    description: "Productive and stylish workspace with clean lines and ergonomic design.",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 4,
    title: "Luxury Bathroom",
    category: "Bathroom",
    description: "Elegant finishes and spa-like atmosphere for a private retreat at home.",
    image: "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 5,
    title: "Master Bedroom",
    category: "Bedroom",
    description: "A serene and sophisticated bedroom designed for rest and personal expression.",
    image: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 6,
    title: "Outdoor Patio",
    category: "Outdoor",
    description: "A curated outdoor living space that blends nature with refined comfort.",
    image: "https://images.unsplash.com/photo-1530018607912-eff2daa1bac4?auto=format&fit=crop&w=800&q=80",
  },
];

const categoryColor: Record<string, string> = {
  Kitchen:       "text-twenitu-orange",
  "Living Room": "text-twenitu-olive",
  Workspace:     "text-twenitu-navy",
  Bathroom:      "text-[#7b9ea8]",
  Bedroom:       "text-[#c8a96e]",
  Outdoor:       "text-twenitu-sage",
};

const InspirationSection = () => {
  const [savedKeys, setSavedKeys] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadSaved = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { setLoading(false); return; }

      const { data } = await supabase
        .from("saved_ideas")
        .select("idea_key")
        .eq("user_id", user.id);

      if (data) setSavedKeys(data.map((row) => row.idea_key));
      setLoading(false);
    };

    loadSaved();
  }, []);

  const toggleSave = async (ideaId: number): Promise<void> => {
    const key = String(ideaId);
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    if (savedKeys.includes(key)) {
      setSavedKeys((prev) => prev.filter((k) => k !== key));
      await supabase
        .from("saved_ideas")
        .delete()
        .eq("user_id", user.id)
        .eq("idea_key", key);
    } else {
      setSavedKeys((prev) => [...prev, key]);
      await supabase
        .from("saved_ideas")
        .insert({ user_id: user.id, idea_key: key });
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <span className="text-xs font-semibold tracking-widest uppercase text-twenitu-orange">
          Inspiration Board
        </span>
        <h2 className="text-2xl font-bold text-gray-800 mt-1">Browse Ideas</h2>
        <p className="text-sm text-gray-500 mt-1 leading-relaxed">
          Explore curated design references and save your favorites for your next project.
        </p>
      </div>

      {/* Saved count pill */}
      {savedKeys.length > 0 && (
        <div className="mb-5 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-twenitu-olive/10 border border-twenitu-olive/20">
          <span className="text-twenitu-olive text-xs font-semibold">
            ♥ {savedKeys.length} idea{savedKeys.length > 1 ? "s" : ""} saved
          </span>
        </div>
      )}

      {/* Grid */}
      {loading ? (
        <p className="text-sm text-gray-400 animate-pulse mt-8 text-center">
          Loading inspiration board…
        </p>
      ) : (
        <div className="grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-5">
          {ideas.map((idea) => {
            const saved = savedKeys.includes(String(idea.id));
            return (
              <div
                key={idea.id}
                className="group bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
              >
                {/* Image */}
                <div className="relative overflow-hidden h-52">
                  <img
                    src={idea.image}
                    alt={idea.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <button
                    type="button"
                    onClick={() => toggleSave(idea.id)}
                    className={`absolute top-3 right-3 w-9 h-9 rounded-full flex items-center justify-center text-base transition-all duration-200 cursor-pointer shadow-sm ${
                      saved
                        ? "bg-twenitu-olive text-white"
                        : "bg-white/85 text-gray-400 hover:text-twenitu-olive hover:bg-white"
                    }`}
                    aria-label={saved ? "Unsave idea" : "Save idea"}
                  >
                    {saved ? "♥" : "♡"}
                  </button>
                </div>

                {/* Content */}
                <div className="p-5">
                  <span className={`text-xs font-semibold uppercase tracking-widest ${categoryColor[idea.category] ?? "text-gray-400"}`}>
                    {idea.category}
                  </span>
                  <h3 className="text-gray-900 font-bold text-base mt-1 mb-2">
                    {idea.title}
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed">
                    {idea.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default InspirationSection;