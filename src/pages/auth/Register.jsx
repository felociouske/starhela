import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { countries } from "../../data/countries";

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    country: "",
    role: "client",
    phone_number: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!form.country) {
      setError("Please select your country.");
      return;
    }

    setLoading(true);
    try {
      await register(form);
      navigate("/activate");
    } catch (err) {
      const data = err.response?.data;
      const message = data
        ? Object.values(data).flat().join(" ")
        : "Registration failed. Please try again.";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F8F7FF] px-4 py-12">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-sm border border-[#E7E5F7] p-8">
        <h1 className="text-2xl font-semibold text-[#1A1A2E]">Create your account</h1>
        <p className="text-sm text-[#6B6B85] mt-1">Join Starhela in a few steps.</p>

        {error && (
          <div className="mt-4 text-sm text-rose-700 bg-rose-50 border border-rose-200 rounded-lg px-3 py-2">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-[#1A1A2E] mb-1">Username</label>
            <input
              type="text"
              name="username"
              value={form.username}
              onChange={handleChange}
              required
              className="w-full rounded-lg border border-[#DAD8ED] px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#4338CA]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#1A1A2E] mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full rounded-lg border border-[#DAD8ED] px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#4338CA]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#1A1A2E] mb-1">Password</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              required
              minLength={8}
              className="w-full rounded-lg border border-[#DAD8ED] px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#4338CA]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#1A1A2E] mb-1">Phone number</label>
            <input
              type="text"
              name="phone_number"
              value={form.phone_number}
              onChange={handleChange}
              className="w-full rounded-lg border border-[#DAD8ED] px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#4338CA]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#1A1A2E] mb-1">Country</label>
            <select
              name="country"
              value={form.country}
              onChange={handleChange}
              required
              className="w-full rounded-lg border border-[#DAD8ED] px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#4338CA]"
            >
              <option value="">Select your country</option>
              {countries.map((c) => (
                <option key={c.code} value={c.code}>
                  {c.name} ({c.currency})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-[#1A1A2E] mb-1">Account type</label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setForm({ ...form, role: "client" })}
                className={`rounded-lg border px-3 py-2 text-sm font-medium ${
                  form.role === "client"
                    ? "border-[#4338CA] bg-[#4338CA]/5 text-[#4338CA]"
                    : "border-[#DAD8ED] text-[#6B6B85]"
                }`}
              >
                I want to chat
              </button>
              <button
                type="button"
                onClick={() => setForm({ ...form, role: "provider" })}
                className={`rounded-lg border px-3 py-2 text-sm font-medium ${
                  form.role === "provider"
                    ? "border-[#4338CA] bg-[#4338CA]/5 text-[#4338CA]"
                    : "border-[#DAD8ED] text-[#6B6B85]"
                }`}
              >
                I want to earn
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#4338CA] text-white rounded-lg py-2.5 text-sm font-medium hover:bg-[#372FA8] disabled:opacity-60"
          >
            {loading ? "Creating account..." : "Create account"}
          </button>
        </form>

        <p className="text-sm text-[#6B6B85] mt-6 text-center">
          Already have an account?{" "}
          <Link to="/login" className="text-[#4338CA] font-medium">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}