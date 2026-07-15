import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../lib/api";
import { useWallet } from "../../context/WalletContext";
import { mockProviders } from "../../data/mockProviders";

export default function ProvidersPage() {
  const [providers, setProviders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [startingId, setStartingId] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { wallet, refreshWallet } = useWallet();

  // Replace the useEffect body temporarily:
  useEffect(() => {
    setProviders(mockProviders); // TEMP: preview only, remove before shipping
    setLoading(false);
  }, []);

  const handleStartChat = async (provider) => {
    setError("");
    setStartingId(provider.id);
    try {
      const res = await api.post(`/providers/${provider.id}/start-chat/`);
      await refreshWallet();
      navigate(`/dashboard/chat/${res.data.id}`);
    } catch (err) {
      const data = err.response?.data;
      const message = data?.detail || (data ? Object.values(data).flat().join(" ") : "Could not start chat.");
      setError(message);
    } finally {
      setStartingId(null);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-semibold text-[#1A1A2E]">Browse profiles</h1>
      <p className="text-sm text-[#6B6B85] mt-1">
        Verified profiles only. Starting a chat holds the listed amount from your balance.
      </p>

      {error && (
        <div className="mt-4 text-sm text-rose-700 bg-rose-50 border border-rose-200 rounded-lg px-3 py-2">
          {error}
        </div>
      )}

      {loading ? (
        <p className="text-sm text-[#6B6B85] mt-6">Loading profiles...</p>
      ) : providers.length === 0 ? (
        <p className="text-sm text-[#6B6B85] mt-6">No profiles available right now.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
          {providers.map((p) => (
            <div key={p.id} className="bg-white rounded-2xl border border-[#E7E5F7] overflow-hidden">
              <div className="h-40 bg-[#EFEDFB] flex items-center justify-center">
                {p.photo ? (
                  <img src={p.photo} alt={p.display_name} className="w-full h-full object-cover" />
                ) : (
                  <span className="text-[#6B6B85] text-sm">No photo</span>
                )}
              </div>
              <div className="p-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-[#1A1A2E]">{p.display_name}</h3>
                  <span className="text-xs bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-full">
                    Verified
                  </span>
                </div>
                <p className="text-xs text-[#6B6B85] mt-1">{p.nationality}</p>
                {p.bio && <p className="text-sm text-[#3A3A55] mt-2 line-clamp-3">{p.bio}</p>}

                <div className="flex items-center justify-between mt-4">
                  <span className="font-semibold text-[#1A1A2E]">${Number(p.chat_rate).toFixed(2)}</span>
                  <button
                    onClick={() => handleStartChat(p)}
                    disabled={startingId === p.id}
                    className="bg-[#4338CA] text-white text-sm font-medium rounded-lg px-4 py-2 hover:bg-[#372FA8] disabled:opacity-60"
                  >
                    {startingId === p.id ? "Starting..." : "Start chat"}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}