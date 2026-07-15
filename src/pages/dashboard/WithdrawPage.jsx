import { useEffect, useState } from "react";
import api from "../../lib/api";
import { useWallet } from "../../context/WalletContext";

export default function WithdrawPage() {
  const { wallet, refreshWallet } = useWallet();
  const [withdrawals, setWithdrawals] = useState([]);
  const [loading, setLoading] = useState(true);

  const [amount, setAmount] = useState("");
  const [payoutDetails, setPayoutDetails] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const loadWithdrawals = async () => {
    const res = await api.get("/withdrawals/");
    setWithdrawals(res.data);
  };

  useEffect(() => {
    loadWithdrawals().finally(() => setLoading(false));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setMessage("");
    setError("");

    try {
      await api.post("/withdrawals/", { amount, payout_details: payoutDetails });
      setMessage("Withdrawal request submitted for admin approval.");
      setAmount("");
      setPayoutDetails("");
      await loadWithdrawals();
      await refreshWallet();
    } catch (err) {
      const data = err.response?.data;
      setError(data ? Object.values(data).flat().join(" ") : "Could not submit withdrawal.");
    } finally {
      setSubmitting(false);
    }
  };

  const statusStyles = {
    pending: "bg-amber-50 text-amber-700",
    approved: "bg-emerald-50 text-emerald-700",
    rejected: "bg-rose-50 text-rose-700",
  };

  if (loading) return <p className="text-sm text-[#6B6B85]">Loading...</p>;

  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl font-semibold text-[#1A1A2E]">Withdraw</h1>
      <p className="text-sm text-[#6B6B85] mt-1">
        Available balance: {wallet ? `${wallet.currency} ${Number(wallet.balance).toLocaleString()}` : "..."}
      </p>

      {message && (
        <div className="mt-4 text-sm text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-lg px-3 py-2">
          {message}
        </div>
      )}
      {error && (
        <div className="mt-4 text-sm text-rose-700 bg-rose-50 border border-rose-200 rounded-lg px-3 py-2">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-[#E7E5F7] p-5 mt-6 space-y-4">
        <div>
          <label className="block text-sm font-medium text-[#1A1A2E] mb-1">Amount</label>
          <input
            type="number"
            min="1"
            step="0.01"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
            className="w-full rounded-lg border border-[#DAD8ED] px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#4338CA]"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-[#1A1A2E] mb-1">
            Payout details (phone number, mobile money name)
          </label>
          <input
            type="text"
            value={payoutDetails}
            onChange={(e) => setPayoutDetails(e.target.value)}
            required
            className="w-full rounded-lg border border-[#DAD8ED] px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#4338CA]"
          />
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="bg-[#4338CA] text-white text-sm font-medium rounded-lg px-5 py-2.5 hover:bg-[#372FA8] disabled:opacity-60"
        >
          {submitting ? "Submitting..." : "Request withdrawal"}
        </button>
      </form>

      <div className="bg-white rounded-2xl border border-[#E7E5F7] mt-6">
        <div className="px-5 py-4 border-b border-[#E7E5F7]">
          <h2 className="text-sm font-semibold text-[#1A1A2E]">Withdrawal history</h2>
        </div>
        {withdrawals.length === 0 ? (
          <p className="px-5 py-6 text-sm text-[#6B6B85]">No withdrawals yet.</p>
        ) : (
          <ul className="divide-y divide-[#E7E5F7]">
            {withdrawals.map((w) => (
              <li key={w.id} className="px-5 py-3 flex items-center justify-between text-sm">
                <div>
                  <p className="font-medium text-[#1A1A2E]">${Number(w.amount).toFixed(2)}</p>
                  <p className="text-xs text-[#6B6B85]">{new Date(w.created_at).toLocaleString()}</p>
                </div>
                <span className={`text-xs px-2 py-1 rounded-full ${statusStyles[w.status]}`}>
                  {w.status}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}