import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const user = await login(email, password);
      navigate(user?.is_verified ? "/dashboard" : "/activate");
    } catch (err) {
      setError("Invalid email or password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F8F7FF] px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-sm border border-[#E7E5F7] p-8">
        <h1 className="text-2xl font-semibold text-[#1A1A2E]">Welcome back</h1>
        <p className="text-sm text-[#6B6B85] mt-1">Log in to your Starhela account.</p>

        {error && (
          <div className="mt-4 text-sm text-rose-700 bg-rose-50 border border-rose-200 rounded-lg px-3 py-2">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-[#1A1A2E] mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full rounded-lg border border-[#DAD8ED] px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#4338CA]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#1A1A2E] mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full rounded-lg border border-[#DAD8ED] px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#4338CA]"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#4338CA] text-white rounded-lg py-2.5 text-sm font-medium hover:bg-[#372FA8] disabled:opacity-60"
          >
            {loading ? "Logging in..." : "Log in"}
          </button>
        </form>

        <p className="text-sm text-[#6B6B85] mt-6 text-center">
          Don't have an account?{" "}
          <Link to="/register" className="text-[#4338CA] font-medium">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}