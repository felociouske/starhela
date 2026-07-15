import { useEffect, useRef, useState, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../lib/api";
import { useAuth } from "../../context/AuthContext";
import { useWallet } from "../../context/WalletContext";

const POLL_INTERVAL_MS = 3000;

export default function ChatPage() {
  const { sessionId } = useParams();
  const { user } = useAuth();
  const { refreshWallet } = useWallet();
  const navigate = useNavigate();

  const [session, setSession] = useState(null);
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [completing, setCompleting] = useState(false);
  const [error, setError] = useState("");

  const scrollRef = useRef(null);
  const pollRef = useRef(null);

  const loadSession = useCallback(async () => {
    const res = await api.get(`/chats/${sessionId}/`);
    setSession(res.data);
  }, [sessionId]);

  const loadMessages = useCallback(async () => {
    const res = await api.get(`/chats/${sessionId}/messages/`);
    setMessages(res.data);
  }, [sessionId]);

  useEffect(() => {
    setLoading(true);
    Promise.all([loadSession(), loadMessages()]).finally(() => setLoading(false));
  }, [loadSession, loadMessages]);

  useEffect(() => {
    pollRef.current = setInterval(() => {
      loadMessages();
    }, POLL_INTERVAL_MS);
    return () => clearInterval(pollRef.current);
  }, [loadMessages]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;

    setSending(true);
    setError("");
    try {
      await api.post(`/chats/${sessionId}/messages/`, { text });
      setText("");
      await loadMessages();
    } catch (err) {
      setError("Could not send message. The chat may have ended.");
    } finally {
      setSending(false);
    }
  };

  const handleComplete = async () => {
    setCompleting(true);
    setError("");
    try {
      const res = await api.post(`/chats/${sessionId}/complete/`);
      setSession(res.data);
      await refreshWallet();
    } catch (err) {
      setError(err.response?.data?.detail || "Could not complete chat.");
    } finally {
      setCompleting(false);
    }
  };

  if (loading) return <p className="text-sm text-[#6B6B85]">Loading chat...</p>;
  if (!session) return null;

  const isClient = session.client === user.id;
  const otherPartyName = isClient ? session.provider_name : session.client_email;
  const isActive = session.status === "active";

  return (
    <div className="max-w-2xl mx-auto flex flex-col h-[calc(100vh-4rem)]">
      <div className="bg-white border border-[#E7E5F7] rounded-t-2xl px-5 py-4 flex items-center justify-between">
        <div>
          <button
            onClick={() => navigate(-1)}
            className="text-xs text-[#6B6B85] hover:text-[#1A1A2E] mb-1"
          >
            &larr; Back
          </button>
          <h2 className="font-semibold text-[#1A1A2E]">{otherPartyName}</h2>
          <p className="text-xs text-[#6B6B85]">
            {isActive ? `Active chat - $${Number(session.amount).toFixed(2)} held` : `Chat ${session.status}`}
          </p>
        </div>

        {isClient && isActive && (
          <button
            onClick={handleComplete}
            disabled={completing}
            className="text-sm font-medium bg-emerald-600 text-white rounded-lg px-4 py-2 hover:bg-emerald-700 disabled:opacity-60"
          >
            {completing ? "Completing..." : "Mark complete & release payment"}
          </button>
        )}
      </div>

      <div
        ref={scrollRef}
        className="flex-1 bg-[#EFEDFB] border-x border-[#E7E5F7] overflow-y-auto px-4 py-4 space-y-2"
      >
        {messages.length === 0 ? (
          <p className="text-center text-xs text-[#6B6B85] mt-6">
            No messages yet. Say hello to start the conversation.
          </p>
        ) : (
          messages.map((m) => {
            const isOwn = m.sender === user.id;
            return (
              <div key={m.id} className={`flex ${isOwn ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[75%] rounded-2xl px-4 py-2 text-sm ${
                    isOwn
                      ? "bg-[#4338CA] text-white rounded-br-sm"
                      : "bg-white text-[#1A1A2E] rounded-bl-sm border border-[#E7E5F7]"
                  }`}
                >
                  <p>{m.text}</p>
                  <p className={`text-[10px] mt-1 ${isOwn ? "text-white/70" : "text-[#6B6B85]"}`}>
                    {new Date(m.created_at).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                  </p>
                </div>
              </div>
            );
          })
        )}
      </div>

      <div className="bg-white border border-[#E7E5F7] rounded-b-2xl px-4 py-3">
        {error && <p className="text-xs text-rose-600 mb-2">{error}</p>}

        {isActive ? (
          <form onSubmit={handleSend} className="flex items-center gap-2">
            <input
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Type a message"
              className="flex-1 rounded-full border border-[#DAD8ED] px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#4338CA]"
            />
            <button
              type="submit"
              disabled={sending || !text.trim()}
              className="bg-[#4338CA] text-white text-sm font-medium rounded-full px-5 py-2 hover:bg-[#372FA8] disabled:opacity-60"
            >
              Send
            </button>
          </form>
        ) : (
          <p className="text-sm text-center text-[#6B6B85] py-1">
            This chat has ended. {session.status === "completed" ? "Payment was released." : ""}
          </p>
        )}
      </div>
    </div>
  );
}