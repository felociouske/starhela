import { createContext, useContext, useState, useCallback } from "react";
import api from "../lib/api";

const WalletContext = createContext(null);

export function WalletProvider({ children }) {
  const [wallet, setWallet] = useState(null);
  const [loading, setLoading] = useState(true);

  const refreshWallet = useCallback(async () => {
    setLoading(true);
    try {
      const res = await api.get("/wallet/");
      setWallet(res.data);
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <WalletContext.Provider value={{ wallet, loading, refreshWallet }}>
      {children}
    </WalletContext.Provider>
  );
}

export function useWallet() {
  return useContext(WalletContext);
}