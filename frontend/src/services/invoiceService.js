const API_URL = `${import.meta.env.VITE_API_BASE_URL}/invoices`;

export const getInvoices = async () => {
  const res = await fetch(API_URL);
  if (!res.ok) throw new Error("Failed to fetch invoices");
  return res.json();
};

export const createInvoices = async (invoices) => {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(invoices),
  });
  if (!res.ok) throw new Error("Failed to create invoices");
  return res.json();
};
