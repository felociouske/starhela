import { useEffect, useState } from "react";
import api from "../../lib/api";
import { useWallet } from "../../context/WalletContext";

export default function DepositPage() {
  const { wallet, refreshWallet } = useWallet();
  const [methods, setMethods] = useState([]);
  const [deposits, setDeposits] = useState([]);
  const [loading, setLoading] = useState(true);

  const [amount, setAmount] = useState("");
  const [referenceCode, setReferenceCode] = useState("");
  const [proofFile, setProofFile] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const loadData = async () => {
    const [methodsRes, depositsRes] = await Promise.all([
      api.get("/payment-methods/mine/"),
      api.get("/deposits/"),
    ]);
    setMethods(methodsRes.data);
    setDeposits(depositsRes.data);
  };

  useEffect(() => {
    loadData().finally(() => setLoading(false));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setMessage("");
    setError("");

    const formData = new FormData();
    formData.append("amount", amount);
    formData.append("reference_code", referenceCode);
    if (proofFile) formData.append("proof_image", proofFile);

    try {
      await api.post("/deposits/", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setMessage("Deposit submitted. It will reflect once approved by our team.");
      setAmount("");
      setReferenceCode("");
      setProofFile(null);
      await loadData();
      await refreshWallet();
    } catch (err) {
      const data = err.response?.data;
      setError(data ? Object.values(data).flat().join(" ") : "Could not submit deposit.");
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
      <h1 className="text-2xl font-semibold text-[#1A1A2E]">Deposit</h1>
      <p className="text-sm text-[#6B6B85] mt-1">
        Send payment using one of the methods below, then submit the details for approval.
      </p>

      <div className="bg-white rounded-2xl border border-[#E7E5F7] p-5 mt-6">
        <h2 className="text-sm font-semibold text-[#1A1A2E] mb-3">
          Payment methods {wallet ? `(${wallet.currency})` : ""}
        </h2>
        {methods.length === 0 ? (
          <p className="text-sm text-[#6B6B85]">No payment methods configured for your country yet.</p>
        ) : (
          <div className="space-y-3">
            {methods.map((m) => (
              <div key={m.id} className="border border-[#E7E5F7] rounded-xl p-4">
                <p className="font-medium text-[#1A1A2E]">{m.method_name}</p>
                {m.account_name && <p className="text-sm text-[#3A3A55]">Name: {m.account_name}</p>}
                <p className="text-sm text-[#3A3A55]">Account: {m.account_number}</p>
                <p className="text-sm text-[#6B6B85] mt-2 whitespace-pre-line">{m.instructions}</p>
              </div>
            ))}
          </div>
        )}
      </div>

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
        <h2 className="text-sm font-semibold text-[#1A1A2E]">Submit your deposit</h2>

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
            Transaction reference code
          </label>
          <input
            type="text"
            value={referenceCode}
            onChange={(e) => setReferenceCode(e.target.value)}
            placeholder="e.g. M-Pesa confirmation code"
            required
            className="w-full rounded-lg border border-[#DAD8ED] px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#4338CA]"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-[#1A1A2E] mb-1">
            Proof of payment (optional)
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setProofFile(e.target.files[0])}
            className="text-sm"
          />
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="bg-[#4338CA] text-white text-sm font-medium rounded-lg px-5 py-2.5 hover:bg-[#372FA8] disabled:opacity-60"
        >
          {submitting ? "Submitting..." : "Submit deposit"}
        </button>
      </form>

      <div className="bg-white rounded-2xl border border-[#E7E5F7] mt-6">
        <div className="px-5 py-4 border-b border-[#E7E5F7]">
          <h2 className="text-sm font-semibold text-[#1A1A2E]">Deposit history</h2>
        </div>
        {deposits.length === 0 ? (
          <p className="px-5 py-6 text-sm text-[#6B6B85]">No deposits yet.</p>
        ) : (
          <ul className="divide-y divide-[#E7E5F7]">
            {deposits.map((d) => (
              <li key={d.id} className="px-5 py-3 flex items-center justify-between text-sm">
                <div>
                  <p className="font-medium text-[#1A1A2E]">${Number(d.amount).toFixed(2)}</p>
                  <p className="text-xs text-[#6B6B85]">{new Date(d.created_at).toLocaleString()}</p>
                </div>
                <span className={`text-xs px-2 py-1 rounded-full ${statusStyles[d.status]}`}>
                  {d.status}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}