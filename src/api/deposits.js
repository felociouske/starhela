import api from "../lib/api";

export const getPaymentMethods = () => api.get("/payment-methods/mine/");

export const submitDeposit = (payload) => api.post("/deposits/", payload);

export const getMyDeposits = () => api.get("/deposits/mine/");

export const initiateMpesaPayment = (depositId, amount) =>
  api.post("/mpesa/initiate/", { deposit_id: depositId, amount });