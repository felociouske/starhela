import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../lib/api";
import { useAuth } from "../../context/AuthContext";

export default function ChatsListPage() {
  const { user } = useAuth();
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get("/chats/")
      .then((res) => setSessions(res.data))
      .finally(() => setLoading(false));
  }, []);

  const statusStyles = {
    active: "bg-emerald-50 text-emerald-700",
    completed: "bg-[#EFEDFB] text-[#4338CA]",
    cancelled: "bg-rose-50 text-rose-700",
  };

  if (loading) return <p className="text-sm text-[#6B6B85]">Loading chats...</p>;

  return (
    <div>
      <h1 className="text-2xl font-semibold text-[#1A1A2E]">My chats</h1>
      <p className="text-sm text-[#6B6B85] mt-1">All your conversations, active and past.</p>

      <div className="bg-white rounded-2xl border border-[#E7E5F7] mt-6">
        {sessions.length === 0 ? (
          <p className="px-5 py-6 text-sm text-[#6B6B85]">
            No chats yet.{" "}
            {user?.role === "client" && (
              <Link to="/dashboard/providers" className="text-[#4338CA] font-medium">
                Browse profiles
              </Link>
            )}
          </p>
        ) : (
          <ul className="divide-y divide-[#E7E5F7]">
            {sessions.map((s) => {
              const otherParty = user.role === "client" ? s.provider_name : s.client_email;
              return (
                <li key={s.id}>
                  <Link
                    to={`/dashboard/chat/${s.id}`}
                    className="flex items-center justify-between px-5 py-4 hover:bg-[#F8F7FF]"
                  >
                    <div>
                      <p className="font-medium text-[#1A1A2E]">{otherParty}</p>
                      <p className="text-xs text-[#6B6B85]">
                        {new Date(s.created_at).toLocaleString()} - ${Number(s.amount).toFixed(2)}
                      </p>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded-full ${statusStyles[s.status]}`}>
                      {s.status}
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}