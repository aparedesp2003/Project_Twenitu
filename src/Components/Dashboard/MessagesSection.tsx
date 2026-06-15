import { useState, useRef, useEffect } from "react";
import type { KeyboardEvent } from "react";
import { supabase } from "../../lib/supabase";

type Sender = "user" | "team";

interface Message {
  id: string;
  text: string;
  sender: Sender;
  time: string;
}

interface DbMessage {
  id: string;
  text: string;
  sender: Sender;
  created_at: string;
}

const teamReplies = [
  "Thanks for reaching out! We'll get back to you shortly.",
  "Great to hear from you! One of our specialists will follow up soon.",
  "Could you tell us a bit more about your project? We'd love to help.",
  "We'd love to help with your space. Our team will be in touch within 24 hours.",
  "Received! We're reviewing your message and will respond shortly.",
  "That sounds like an exciting project — let us look into the details and get back to you!",
];

const WELCOME_TEXT =
  "Hi there! 👋 Welcome to Twenitú. How can we help you with your project today?";

const formatTime = (iso: string): string =>
  new Date(iso).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

const toMessage = (m: DbMessage): Message => ({
  id: m.id,
  text: m.text,
  sender: m.sender,
  time: formatTime(m.created_at),
});

const MessagesSection = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState<string>("");
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  useEffect(() => {
    const loadMessages = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from("messages")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: true });

      if (!error && data) {
        if (data.length === 0) {
          // First visit — seed the welcome message
          const { data: welcome } = await supabase
            .from("messages")
            .insert({ user_id: user.id, text: WELCOME_TEXT, sender: "team" })
            .select()
            .single();
          if (welcome) setMessages([toMessage(welcome as DbMessage)]);
        } else {
          setMessages((data as DbMessage[]).map(toMessage));
        }
      }

      setLoading(false);
    };

    loadMessages();
  }, []);

  const sendMessage = async (): Promise<void> => {
    const text = input.trim();
    if (!text) return;

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    setInput("");

    // Save user message
    const { data: userMsg } = await supabase
      .from("messages")
      .insert({ user_id: user.id, text, sender: "user" })
      .select()
      .single();

    if (userMsg) setMessages((prev) => [...prev, toMessage(userMsg as DbMessage)]);

    // Simulate and save team reply
    setIsTyping(true);
    const delay = 1500 + Math.random() * 1000;
    setTimeout(async () => {
      const reply = teamReplies[Math.floor(Math.random() * teamReplies.length)];
      const { data: teamMsg } = await supabase
        .from("messages")
        .insert({ user_id: user.id, text: reply, sender: "team" })
        .select()
        .single();

      setIsTyping(false);
      if (teamMsg) setMessages((prev) => [...prev, toMessage(teamMsg as DbMessage)]);
    }, delay);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>): void => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-90px)]">

      {/* Chat header */}
      <div className="flex items-center gap-3 pb-4 mb-4 border-b border-gray-100 shrink-0">
        <div className="relative">
          <div className="w-10 h-10 rounded-full bg-twenitu-navy flex items-center justify-center text-white font-bold text-sm select-none">
            TW
          </div>
          <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-green-400 border-2 border-white" />
        </div>
        <div>
          <p className="font-semibold text-gray-800 text-sm leading-none">Twenitú Team</p>
          <p className="text-xs text-green-500 font-medium mt-1">Online</p>
        </div>
      </div>

      {/* Message list */}
      <div className="flex-1 overflow-y-auto flex flex-col gap-5 pr-1 pb-2">
        {loading ? (
          <p className="text-sm text-gray-400 text-center animate-pulse mt-8">
            Loading messages…
          </p>
        ) : (
          messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex items-end gap-2.5 ${msg.sender === "user" ? "flex-row-reverse" : "flex-row"}`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0 select-none ${
                  msg.sender === "team"
                    ? "bg-twenitu-navy text-white"
                    : "bg-gray-200 text-gray-500"
                }`}
              >
                {msg.sender === "team" ? "TW" : "ME"}
              </div>

              <div
                className={`flex flex-col gap-1 max-w-[68%] ${
                  msg.sender === "user" ? "items-end" : "items-start"
                }`}
              >
                <div
                  className={`px-4 py-3 text-sm leading-relaxed rounded-2xl ${
                    msg.sender === "user"
                      ? "bg-twenitu-orange text-white rounded-br-sm"
                      : "bg-white border border-gray-100 text-gray-800 rounded-bl-sm shadow-sm"
                  }`}
                >
                  {msg.text}
                </div>
                <span className="text-xs text-gray-400 px-1">{msg.time}</span>
              </div>
            </div>
          ))
        )}

        {/* Typing indicator */}
        {isTyping && (
          <div className="flex items-end gap-2.5">
            <div className="w-8 h-8 rounded-full bg-twenitu-navy flex items-center justify-center text-white text-xs font-bold shrink-0 select-none">
              TW
            </div>
            <div className="bg-white border border-gray-100 shadow-sm px-4 py-3.5 rounded-2xl rounded-bl-sm flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-gray-400 animate-bounce [animation-delay:0ms]" />
              <span className="w-1.5 h-1.5 rounded-full bg-gray-400 animate-bounce [animation-delay:150ms]" />
              <span className="w-1.5 h-1.5 rounded-full bg-gray-400 animate-bounce [animation-delay:300ms]" />
            </div>
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* Input area */}
      <div className="shrink-0 pt-4 border-t border-gray-100">
        <div className="flex items-end gap-3 bg-white border border-gray-200 rounded-2xl px-4 py-3 transition-all duration-200 focus-within:border-twenitu-orange focus-within:ring-2 focus-within:ring-twenitu-orange/15">
          <textarea
            rows={1}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type a message…"
            className="flex-1 resize-none outline-none text-sm text-gray-800 placeholder:text-gray-400 max-h-32 leading-relaxed bg-transparent"
          />
          <button
            type="button"
            onClick={sendMessage}
            disabled={!input.trim()}
            className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-all duration-200 ${
              input.trim()
                ? "bg-twenitu-orange text-white cursor-pointer hover:opacity-90 hover:-translate-y-0.5"
                : "bg-gray-100 text-gray-300 cursor-not-allowed"
            }`}
            aria-label="Send message"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="22" y1="2" x2="11" y2="13" />
              <polygon points="22 2 15 22 11 13 2 9 22 2" />
            </svg>
          </button>
        </div>
        <p className="text-xs text-gray-400 mt-2 pl-1">
          Press{" "}
          <kbd className="px-1.5 py-0.5 bg-gray-100 rounded text-gray-500 font-mono text-[11px]">Enter</kbd>
          {" "}to send ·{" "}
          <kbd className="px-1.5 py-0.5 bg-gray-100 rounded text-gray-500 font-mono text-[11px]">Shift + Enter</kbd>
          {" "}for a new line
        </p>
      </div>
    </div>
  );
};

export default MessagesSection;
