import { useEffect } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { WalletProvider, useWallet } from "../../context/WalletContext";

function Sidebar() {
  const { user, logout } = useAuth();
  const { wallet, loading, refreshWallet } = useWallet();
  const navigate = useNavigate();

  useEffect(() => {
    refreshWallet();
  }, [refreshWallet]);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const linkClass = ({ isActive }) =>
    `block rounded-lg px-3 py-2 text-sm font-medium ${
      isActive ? "bg-[#4338CA] text-white" : "text-[#3A3A55] hover:bg-[#EFEDFB]"
    }`;

  return (
    <aside className="w-64 shrink-0 bg-white border-r border-[#E7E5F7] flex flex-col h-screen sticky top-0">
      <div className="px-5 py-5 border-b border-[#E7E5F7]">
        <span className="text-lg font-semibold text-[#1A1A2E]">Starhela</span>
      </div>

      <div className="px-5 py-4 border-b border-[#E7E5F7]">
        <p className="text-xs text-[#6B6B85]">Available balance</p>
        <p className="text-xl font-semibold text-[#1A1A2E] mt-0.5">
          {loading || !wallet ? "..." : `${wallet.currency} ${Number(wallet.balance).toLocaleString()}`}
        </p>
        {wallet && Number(wallet.held_balance) > 0 && (
          <p className="text-xs text-amber-600 mt-1">
            {wallet.currency} {Number(wallet.held_balance).toLocaleString()} in active chats
          </p>
        )}
      </div>

      <nav className="flex-1 px-3 py-4 space-y-1">
        <NavLink to="/dashboard" end className={linkClass}>
          Overview
        </NavLink>

        <NavLink to="/dashboard" end className={linkClass}>
          Overview
        </NavLink>
        <NavLink to="/dashboard/chats" className={linkClass}>
          My chats
        </NavLink>

        {user?.role === "client" && (
          <NavLink to="/dashboard/providers" className={linkClass}>
            Browse profiles
          </NavLink>
        )}
        {user?.role === "provider" && (
          <NavLink to="/dashboard/provider-profile" className={linkClass}>
            My profile
          </NavLink>
        )}
        <NavLink to="/dashboard/deposit" className={linkClass}>
          Deposit
        </NavLink>
        <NavLink to="/dashboard/withdraw" className={linkClass}>
          Withdraw
        </NavLink>
      </nav>

      <div className="px-3 py-4 border-t border-[#E7E5F7]">
        <button
          onClick={handleLogout}
          className="w-full text-left rounded-lg px-3 py-2 text-sm font-medium text-rose-600 hover:bg-rose-50"
        >
          Log out
        </button>
      </div>
    </aside>
  );
}

export default function DashboardLayout() {
  return (
    <WalletProvider>
      <div className="min-h-screen flex bg-[#F8F7FF]">
        <Sidebar />
        <main className="flex-1 p-8">
          <Outlet />
        </main>
      </div>
    </WalletProvider>
  );
}