import React, { useEffect, useState } from "react";
import { getInvoices } from "../../services/invoiceService";

const Invoices = () => {
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchItems = async () => {
    try {
      setLoading(true);
      const data = await getInvoices();
      setInvoices(data);
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  return (
    <div className="space-y-4 p-2 md:p-5">
      {error && <div className="text-red-600">{error}</div>}

      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="overflow-x-auto rounded-md">
          <table className="min-w-full bg-white shadow-sm">
            <thead className="bg-blue-600 text-white text-sm">
              <tr>
                <th className="text-left px-4 py-2 hidden md:block">No</th>
                <th className="text-left px-4 py-2">Customer Name</th>
                <th className="text-left px-4 py-2 hidden md:block">Items</th>
                <th className="text-left px-4 py-2">Tax</th>
                <th className="text-left px-4 py-2">Total</th>
                <th className="text-left px-4 py-2">Created Date</th>
              </tr>
            </thead>
            <tbody className="text-sm text-gray-800">
              {invoices && invoices.length > 0 ? (
                invoices.map((invoice, index) => (
                  <tr key={invoice.id} className="border-t hover:bg-gray-50">
                    <td className="px-4 py-2 hidden md:block">{index + 1}</td>
                    <td className="px-4 py-2">{invoice.customer_name}</td>
                    <td className="px-4 py-2 hidden md:block">
                      <ul className="list-disc list-inside space-y-1">
                        {Array.isArray(invoice.items) &&
                          invoice.items.map((item, idx) => (
                            <li key={idx}>
                              Item ID: {item.item_id} | Qty: {item.quantity} | Price: Rs.{item.price} | Subtotal: Rs.{item.subtotal}
                            </li>
                          ))}
                      </ul>
                    </td>
                    <td className="px-4 py-2">Rs. {invoice.tax.toFixed(2)}</td>
                    <td className="px-4 py-2">Rs. {invoice.total.toFixed(2)}</td>
                    <td className="px-4 py-2">{new Date(invoice.created_at).toLocaleDateString()}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="text-center text-gray-500 py-4">
                    No items found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Invoices;
