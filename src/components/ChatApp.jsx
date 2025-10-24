 import React, { useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";

const loadingPhrases = [
  "Charting your career course...",
  "Crafting a path to success...",
  "Unlocking career insights...",
  "Aligning your professional stars...",
  "Mapping your future...",
];

// ❌ Removed loadSessions because we don’t want to persist sessions
function saveSessions(sessions) {
  localStorage.setItem("careerist_sessions", JSON.stringify(sessions));
}

export default function ChatApp({
  backendUrl = import.meta.env.VITE_BACKEND_URL || "https://backend-api-67ei.onrender.com",
  open = false,
}) {
  const [sessions, setSessions] = useState([]);
  const [currentSession, setCurrentSession] = useState(null);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingPhrase, setLoadingPhrase] = useState(loadingPhrases[0]);

  const messagesContainerRef = useRef(null);
  const textareaRef = useRef(null);

  const currentMessages =
    sessions.find((s) => s.id === currentSession)?.messages || [];

  const setCurrentMessages = (msgs) => {
    if (!currentSession) return;
    setSessions((prev) => {
      const updated = prev.map((s) =>
        s.id === currentSession ? { ...s, messages: msgs } : s
      );
      saveSessions(updated);
      return updated;
    });
  };

  // 🔹 Always reset sessions on fresh page load
  useEffect(() => {
    localStorage.removeItem("careerist_sessions");
    setSessions([]);
    setCurrentSession(null);
  }, []);

  useEffect(() => {
    if (loading) {
      const interval = setInterval(() => {
        setLoadingPhrase((prev) => {
          const idx = loadingPhrases.indexOf(prev);
          return loadingPhrases[(idx + 1) % loadingPhrases.length];
        });
      }, 1500);
      return () => clearInterval(interval);
    }
  }, [loading]);

  useEffect(() => {
    if (open) {
      setTimeout(() => textareaRef.current?.focus(), 150);
    }
  }, [open]);

  const sendMessage = async (e, sampleQuery = null) => {
    if (e && e.preventDefault) e.preventDefault();
    const messageToSend = sampleQuery || query;
    if (!messageToSend.trim()) return;

    let activeSession = currentSession;
    if (!activeSession) {
      const newSession = {
        id: "sess_" + Date.now().toString(36),
        title: "New Chat",
        messages: [],
      };
      activeSession = newSession.id;
      setSessions([newSession]);
      setCurrentSession(newSession.id);
    }

    const userMsg = { role: "human", content: messageToSend };
    setCurrentMessages([...currentMessages, userMsg]);
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("query", messageToSend);
      formData.append("session_id", activeSession);

      const res = await fetch(`${backendUrl}/ask`, { method: "POST", body: formData });
      const data = await res.json();
      const aiMsg = { role: "ai", content: data.answer || "(no answer)" };
      setCurrentMessages([...currentMessages, userMsg, aiMsg]);
    } catch {
      setCurrentMessages([
        ...currentMessages,
        userMsg,
        { role: "ai", content: "⚠️ Error contacting backend." },
      ]);
    }
    setQuery("");
    setLoading(false);
  };

  return (
    <div className="w-full h-full flex flex-col bg-[#0f0425] text-white">
      {/* Messages */}
      <div
        ref={messagesContainerRef}
        className="flex-1 overflow-auto p-4 space-y-4"
      >
        {currentMessages.length === 0 && !loading && (
          <div className="text-center text-gray-400 py-6">
            <img src="/careerist_logo.png" alt="Logo" className="mx-auto mb-4 w-20 h-20" />
            <div className="text-lg font-semibold mb-2">Your Buddy for Career Growth 🚀</div>
            <div className="text-sm text-pink-400 font-medium">Powered by Gemini 2.5-Flash</div>
            <div className="mt-6 grid gap-3 max-w-md mx-auto">
              <button
                onClick={() => sendMessage(null, "What are the key skills for an AI Engineer?")}
                className="bg-[#1a103d] hover:bg-gradient-to-r hover:from-indigo-500 hover:to-pink-500 p-3 rounded-xl"
              >
                What are the key skills for an AI Engineer?
              </button>
              <button
                onClick={() => sendMessage(null, "How can I prepare for a software engineering interview?")}
                className="bg-[#1a103d] hover:bg-gradient-to-r hover:from-indigo-500 hover:to-pink-500 p-3 rounded-xl"
              >
                How can I prepare for a software engineering interview?
              </button>
              <button
                onClick={() => sendMessage(null, "Provide a detailed roadmap for a successful entrepreneur.")}
                className="bg-[#1a103d] hover:bg-gradient-to-r hover:from-indigo-500 hover:to-pink-500 p-3 rounded-xl"
              >
                Provide a detailed roadmap for a successful entrepreneur.
              </button>
            </div>
          </div>
        )}

        {currentMessages.map((m, i) => (
          <div key={i} className={`flex ${m.role === "human" ? "justify-end" : "justify-start"}`}>
            <div
              className={`max-w-[75%] px-4 py-3 rounded-2xl ${
                m.role === "human"
                  ? "bg-gradient-to-r from-indigo-500 to-pink-500 text-white rounded-br-none"
                  : "bg-[#1a103d] text-gray-200 rounded-bl-none"
              }`}
            >
              <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
                {m.content}
              </ReactMarkdown>
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex justify-start text-gray-400">
            <div className="px-4 py-2 flex items-center gap-2">
              <div className="animate-spin h-5 w-5 border-2 border-pink-500 border-t-transparent rounded-full"></div>
              <span>{loadingPhrase}</span>
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <form
        onSubmit={sendMessage}
        className="p-3 border-t border-pink-500/30 flex items-center gap-2 bg-[#1a103d]"
      >
        <textarea
          ref={textareaRef}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={loading ? loadingPhrase : "Type your question..."}
          className="flex-1 px-3 py-2 rounded-lg bg-[#0f0425] border border-pink-500/30 focus:outline-none focus:ring-2 focus:ring-pink-500 text-white resize-none"
          rows={1}
        />
        <button
          type="submit"
          disabled={loading || !query.trim()}
          className="px-5 py-2 rounded-lg bg-gradient-to-r from-indigo-500 to-pink-500 text-white font-semibold hover:scale-105 transition disabled:opacity-50"
        >
          {loading ? "..." : "Send"}
        </button>
      </form>
    </div>
  );
}
