import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/routing/ProtectedRoute";

import Navbar from "./components/layout/NavBar";
import Footer from "./components/layout/Footer";
import Hero from "./components/sections/Hero";
import About from "./components/sections/About";
import Services from "./components/sections/Services";
import Summaries from "./components/sections/Summaries";
import HowItWorks from "./components/sections/HowItWorks";
import Team from "./components/sections/Team";
import Blog from "./components/sections/Blog";
import Contact from "./components/sections/Contact";
import WhatsAppFloat from "./components/ui/WhatsAppFloat";

import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";

import DashboardLayout from "./pages/dashboard/DashboardLayout";
import DashboardHome from "./pages/dashboard/DashboardHome";
import ProvidersPage from "./pages/dashboard/ProvidersPage";
import ChatPage from "./pages/dashboard/ChatPage";
import DepositPage from "./pages/dashboard/DepositPage";
import WithdrawPage from "./pages/dashboard/WithdrawPage";
import ProviderProfilePage from "./pages/dashboard/ProviderProfilePage";
import ChatsListPage from "./pages/dashboard/ChatsListPage";
import Activate from "./pages/Activate";

function MarketingSite() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Services />
        <Summaries />
        <HowItWorks />
        <Team />
        <Blog />
        <Contact />
      </main>
      <Footer />
      <WhatsAppFloat />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<MarketingSite />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route path="/activate" element={<Activate />} />

          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<DashboardHome />} />
            <Route path="providers" element={<ProvidersPage />} />
            <Route path="chat/:sessionId" element={<ChatPage />} />
            <Route path="deposit" element={<DepositPage />} />
            <Route path="chats" element={<ChatsListPage />} />
            <Route path="withdraw" element={<WithdrawPage />} />
            <Route path="provider-profile" element={<ProviderProfilePage />} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}