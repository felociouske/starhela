import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { getPaymentMethods, submitDeposit, getMyDeposits, initiateMpesaPayment } from "../api/deposits";
import { countries } from "../data/countries";

export default function Activate() {
  const { user, loading: authLoading } = useAuth();

  const [methods, setMethods] = useState([]);
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [mpesaAmount, setMpesaAmount] = useState("");
  const [mpesaInitiating, setMpesaInitiating] = useState(false);
  const [mpesaError, setMpesaError] = useState("");
  const [mpesaInitiated, setMpesaInitiated] = useState(false);

  const [form, setForm] = useState({
    payment_method: "",
    transaction_code: "",
    amount: "",
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const loadData = async () => {
    setLoading(true);
    try {
      const [methodsRes, submissionsRes] = await Promise.all([
        getPaymentMethods(),
        getMyDeposits(),
      ]);
      setMethods(methodsRes.data);
      setSubmissions(submissionsRes.data);

      if (methodsRes.data.length > 0) {
        setForm((f) => ({ ...f, payment_method: methodsRes.data[0].id }));
      }
    } catch (err) {
      setError("Could not load activation details. Please refresh the page.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleMpesaInitiate = async () => {
    setMpesaError("");

    if (!mpesaAmount || Number(mpesaAmount) <= 0) {
      setMpesaError("Please enter a valid amount.");
      return;
    }

    setMpesaInitiating(true);
    try {
      const depositRes = await submitDeposit({
        payment_method: form.payment_method || null,
        transaction_code: "",
        amount: Number(mpesaAmount),
        message: "Automatic M-Pesa STK push initiated.",
      });

      const depositId = depositRes.data.id;
      await initiateMpesaPayment(depositId, Number(mpesaAmount));

      setMpesaInitiated(true);
      setMpesaAmount("");
      loadData();
    } catch (err) {
      const data = err.response?.data;
      const message = data
        ? Object.values(data).flat().join(" ")
        : "Failed to initiate M-Pesa payment. Please try again.";
      setMpesaError(message);
    } finally {
      setMpesaInitiating(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError("");

    if (!form.payment_method || !form.transaction_code) {
      setSubmitError("Please select a payment method and enter your transaction code.");
      return;
    }

    setSubmitting(true);
    try {
      await submitDeposit({
        payment_method: form.payment_method || null,
        transaction_code: form.transaction_code,
        amount: form.amount || null,
        message: form.message,
      });
      setSubmitted(true);
      loadData();
    } catch (err) {
      const data = err.response?.data;
      const message = data
        ? Object.values(data).flat().join(" ")
        : "Submission failed. Please try again.";
      setSubmitError(message);
    } finally {
      setSubmitting(false);
    }
  };

  const pendingSubmission = submissions.find((s) => s.status === "pending");
  const countryName = countries.find((c) => c.code === user?.country)?.name || user?.country || "your country";

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F8F7FF]">
        <p className="text-sm text-[#6B6B85]">Loading activation details...</p>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (user.is_verified) {
    return <Navigate to="/dashboard" replace />;
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F8F7FF]">
        <p className="text-sm text-[#6B6B85]">Loading activation details...</p>
      </div>
    );
  }

  const isKenyaUser = user?.country === "KE";
  const kenyaMethod = methods.find((m) => m.country === "KE");

  return (
    <div className="min-h-screen bg-[#F8F7FF] px-4 py-12">
      <div className="max-w-lg mx-auto">
        <div className="bg-white rounded-2xl shadow-sm border border-[#E7E5F7] p-8">
          <h1 className="text-2xl font-semibold text-[#1A1A2E]">Activate your account</h1>
          <p className="text-sm text-[#6B6B85] mt-1">
            Complete the activation request for {countryName}.
          </p>

          {error && (
            <div className="mt-4 text-sm text-rose-700 bg-rose-50 border border-rose-200 rounded-lg px-3 py-2">
              {error}
            </div>
          )}

          {pendingSubmission && !submitted && !mpesaInitiated && (
            <div className="mt-4 text-sm text-amber-700 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2">
              You have a submission awaiting review.
            </div>
          )}

          {submitted && (
            <div className="mt-4 text-sm text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-lg px-3 py-2">
              Submission received. Your account will be activated, come back after 5 minutes.
            </div>
          )}

          {mpesaInitiated && (
            <div className="mt-4 text-sm text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-lg px-3 py-2">
              M-Pesa payment initiated. Please complete the payment on your phone.
            </div>
          )}

          {methods.length === 0 && !error && (
            <p className="mt-4 text-sm text-[#6B6B85]">
              No payment methods are set up for your country yet. Please contact support.
            </p>
          )}

          {isKenyaUser && kenyaMethod && (
            <>
              <div className="mt-6 border border-[#DAD8ED] rounded-lg p-4">
                <h2 className="text-sm font-semibold text-[#1A1A2E]">{kenyaMethod.method_name}</h2>
                {kenyaMethod.account_name && (
                  <p className="text-sm text-[#6B6B85] mt-1">Name: {kenyaMethod.account_name}</p>
                )}
                <p className="text-sm text-[#6B6B85]">Till: {kenyaMethod.account_number}</p>
                <p className="text-sm text-[#6B6B85] mt-2">
                  Required amount: <span className="font-semibold">KES {kenyaMethod.required_amount}</span>
                </p>
                <p className="text-sm text-[#6B6B85] mt-2">
                  {kenyaMethod.instructions}
                </p>
              </div>

              <div className="mt-6 space-y-4">
                {mpesaError && (
                  <div className="text-sm text-rose-700 bg-rose-50 border border-rose-200 rounded-lg px-3 py-2">
                    {mpesaError}
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-[#1A1A2E] mb-1">
                    Amount (KES)
                  </label>
                  <input
                    type="number"
                    value={mpesaAmount}
                    onChange={(e) => setMpesaAmount(e.target.value)}
                    placeholder="550"
                    className="w-full rounded-lg border border-[#DAD8ED] px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#4338CA]"
                  />
                </div>

                <button
                  type="button"
                  onClick={handleMpesaInitiate}
                  disabled={mpesaInitiating}
                  className="w-full bg-[#10B981] text-white rounded-lg py-2.5 text-sm font-medium hover:bg-[#059669] disabled:opacity-60"
                >
                  {mpesaInitiating ? "Initiating M-Pesa..." : "Initiate M-Pesa Payment"}
                </button>
              </div>
            </>
          )}

          {!isKenyaUser && methods.length > 0 && (
            <>
              {methods.map((method) => (
                <div key={method.id} className="mt-6 border border-[#DAD8ED] rounded-lg p-4">
                  <h2 className="text-sm font-semibold text-[#1A1A2E]">{method.method_name}</h2>
                  {method.account_name && (
                    <p className="text-sm text-[#6B6B85] mt-1">Name: {method.account_name}</p>
                  )}
                  <p className="text-sm text-[#6B6B85]">Account: {method.account_number}</p>
                  {method.payment_link && (
                    <a
                      href={method.payment_link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-[#4338CA] font-medium mt-2 inline-block hover:underline"
                    >
                      Open payment link →
                    </a>
                  )}
                  <p className="text-sm text-[#6B6B85] mt-2 whitespace-pre-line">
                    {method.instructions}
                  </p>
                </div>
              ))}

              <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                {submitError && (
                  <div className="text-sm text-rose-700 bg-rose-50 border border-rose-200 rounded-lg px-3 py-2">
                    {submitError}
                  </div>
                )}

                {methods.length > 1 && (
                  <div>
                    <label className="block text-sm font-medium text-[#1A1A2E] mb-1">
                      Payment method used
                    </label>
                    <select
                      name="payment_method"
                      value={form.payment_method}
                      onChange={handleChange}
                      className="w-full rounded-lg border border-[#DAD8ED] px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#4338CA]"
                    >
                      {methods.map((m) => (
                        <option key={m.id} value={m.id}>
                          {m.method_name}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-[#1A1A2E] mb-1">
                    Transaction code
                  </label>
                  <input
                    type="text"
                    name="transaction_code"
                    value={form.transaction_code}
                    onChange={handleChange}
                    required
                    className="w-full rounded-lg border border-[#DAD8ED] px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#4338CA]"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#1A1A2E] mb-1">
                    Amount (optional)
                  </label>
                  <input
                    type="number"
                    name="amount"
                    value={form.amount}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-[#DAD8ED] px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#4338CA]"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#1A1A2E] mb-1">
                    Message for admin approval
                  </label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    rows="3"
                    placeholder="Share any details the admin should review."
                    className="w-full rounded-lg border border-[#DAD8ED] px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#4338CA]"
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-[#4338CA] text-white rounded-lg py-2.5 text-sm font-medium hover:bg-[#372FA8] disabled:opacity-60"
                >
                  {submitting ? "Submitting..." : "Submit for review"}
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}