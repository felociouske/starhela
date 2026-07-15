import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../lib/api";
import { useAuth } from "../../context/AuthContext";
import { useWallet } from "../../context/WalletContext";

export default function DashboardHome() {
  const { user } = useAuth();
  const { wallet } = useWallet();
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get("/transactions/")
      .then((res) => setTransactions(res.data))
      .finally(() => setLoading(false));
  }, []);

  const currency = wallet?.currency || "";
  const isProvider = user?.role === "provider";

  const typeLabels = {
    deposit: "Deposit",
    withdrawal: "Withdrawal",
    chat_hold: "Chat payment held",
    chat_release: "Chat earnings received",
    chat_refund: "Chat refunded",
  };

  // Real totals only - derived from actual completed transactions, nothing passive.
  const totalEarnings = transactions
    .filter((t) => t.type === "chat_release")
    .reduce((sum, t) => sum + Number(t.amount), 0);

  const totalDeposited = transactions
    .filter((t) => t.type === "deposit")
    .reduce((sum, t) => sum + Number(t.amount), 0);

  const totalWithdrawn = transactions
    .filter((t) => t.type === "withdrawal")
    .reduce((sum, t) => sum + Number(t.amount), 0);

  return (
    <div>
      {/* Welcome banner */}
      <div className="bg-[#0F0A1E] rounded-3xl p-7 relative overflow-hidden">
        <div className="absolute -right-10 -top-10 w-48 h-48 rounded-full bg-[#6C3FC5]/20 blur-2xl" />
        <div className="absolute -right-4 bottom-0 w-32 h-32 rounded-full bg-[#2DD4AA]/10 blur-2xl" />

        <div className="relative">
          <span className="inline-block bg-[#2DD4AA] text-[#0F0A1E] text-xs font-bold px-3 py-1.5 rounded-full">
            Welcome, {user?.username || "there"}
          </span>
          <h1 className="text-white text-2xl font-bold mt-4 max-w-lg">
            {isProvider
              ? "Here's how your chats are performing."
              : "Ready to start a conversation today?"}
          </h1>
          <p className="text-gray-400 text-sm mt-2 max-w-lg">
            {isProvider
              ? "Earnings below reflect payments released from chats you've actually completed."
              : "Deposit funds, then browse verified profiles to start chatting."}
          </p>

          {!isProvider && (
            <Link
              to="/dashboard/providers"
              className="inline-block mt-5 bg-[#6C3FC5] hover:bg-[#4C2E8A] text-white text-sm font-semibold px-5 py-2.5 rounded-full transition-colors"
            >
              Browse profiles
            </Link>
          )}
        </div>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
        {isProvider && (
          <div className="bg-gradient-to-br from-[#2DD4AA] to-[#22B892] rounded-2xl p-5">
            <p className="text-[#0F0A1E]/70 text-xs font-semibold uppercase tracking-wide">
              Total earnings
            </p>
            <p className="text-[#0F0A1E] text-3xl font-bold mt-1">
              ${totalEarnings.toFixed(2)}
            </p>
            <p className="text-[#0F0A1E]/60 text-xs mt-1">From completed chats</p>
          </div>
        )}

        <div className="bg-white rounded-2xl border border-[#E7E5F7] p-5">
          <p className="text-[#6B6B85] text-xs font-semibold uppercase tracking-wide">
            Available balance
          </p>
          <p className="text-[#1A1A2E] text-3xl font-bold mt-1">
            {wallet ? `${currency} ${Number(wallet.balance).toLocaleString()}` : "..."}
          </p>
          <p className="text-[#6B6B85] text-xs mt-1">Ready to use</p>
        </div>

        <div className="bg-white rounded-2xl border border-[#E7E5F7] p-5">
          <p className="text-[#6B6B85] text-xs font-semibold uppercase tracking-wide">
            Held in active chats
          </p>
          <p className="text-[#1A1A2E] text-3xl font-bold mt-1">
            {wallet ? `${currency} ${Number(wallet.held_balance).toLocaleString()}` : "..."}
          </p>
          <p className="text-[#6B6B85] text-xs mt-1">Released when chat completes</p>
        </div>

        {!isProvider && (
          <div className="bg-[#6C3FC5] rounded-2xl p-5 flex flex-col justify-between">
            <p className="text-white/70 text-xs font-semibold uppercase tracking-wide">
              Quick actions
            </p>
            <div className="flex gap-2 mt-3">
              <Link
                to="/dashboard/deposit"
                className="flex-1 text-center text-sm font-semibold bg-white text-[#6C3FC5] rounded-lg py-2 hover:bg-white/90"
              >
                Deposit
              </Link>
              <Link
                to="/dashboard/withdraw"
                className="flex-1 text-center text-sm font-semibold border border-white/40 text-white rounded-lg py-2 hover:bg-white/10"
              >
                Withdraw
              </Link>
            </div>
          </div>
        )}
      </div>

      {/* Deposited / withdrawn summary strip */}
      <div className="grid grid-cols-2 gap-4 mt-4">
        <div className="bg-white rounded-2xl border border-[#E7E5F7] px-5 py-4 flex items-center justify-between">
          <span className="text-sm text-[#6B6B85]">Total deposited</span>
          <span className="font-semibold text-[#1A1A2E]">${totalDeposited.toFixed(2)}</span>
        </div>
        <div className="bg-white rounded-2xl border border-[#E7E5F7] px-5 py-4 flex items-center justify-between">
          <span className="text-sm text-[#6B6B85]">Total withdrawn</span>
          <span className="font-semibold text-[#1A1A2E]">${totalWithdrawn.toFixed(2)}</span>
        </div>
      </div>

      {/* Recent activity */}
      <div className="bg-white rounded-2xl border border-[#E7E5F7] mt-6">
        <div className="px-5 py-4 border-b border-[#E7E5F7]">
          <h2 className="text-sm font-semibold text-[#1A1A2E]">Recent activity</h2>
        </div>

        {loading ? (
          <p className="px-5 py-6 text-sm text-[#6B6B85]">Loading...</p>
        ) : transactions.length === 0 ? (
          <p className="px-5 py-6 text-sm text-[#6B6B85]">
            No activity yet. {!isProvider && "Make a deposit to get started."}
          </p>
        ) : (
          <ul className="divide-y divide-[#E7E5F7]">
            {transactions.slice(0, 10).map((t) => (
              <li key={t.id} className="px-5 py-3 flex items-center justify-between text-sm">
                <div>
                  <p className="font-medium text-[#1A1A2E]">{typeLabels[t.type] || t.type}</p>
                  <p className="text-xs text-[#6B6B85]">
                    {new Date(t.created_at).toLocaleString()}
                  </p>
                </div>
                <p
                  className={
                    t.type === "deposit" || t.type === "chat_release"
                      ? "text-emerald-600 font-medium"
                      : "text-[#1A1A2E] font-medium"
                  }
                >
                  {currency} {Number(t.amount).toLocaleString()}
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}