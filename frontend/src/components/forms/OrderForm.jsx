import React, { useState, useRef } from "react";
import Button from "../buttons/Button";
import { createInvoices } from "../../services/invoiceService";
import { toast } from "react-toastify";

const OrderForm = ({ cart, setCart, setShowModal, setLoading }) => {
  const [customerName, setCustomerName] = useState("");
  const [tax, setTax] = useState(0);
  const billRef = useRef();

  const totalWithoutTax = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const total = totalWithoutTax + parseFloat(tax || 0);

  const submitOrder = async () => {
    const invoiceData = {
      customer_name: customerName,
      items: cart.map(item => ({
        item_id: item.id,
        quantity: item.quantity,
        price: item.price,
        subtotal: item.price * item.quantity
      })),
      tax: parseFloat(tax),
      total: total
    };

    try {
      setLoading(true);
      await createInvoices(invoiceData);
      toast.success("Order submitted successfully!");
      setCart([]);
      setShowModal(false);
      setCustomerName("");
      setTax(0);
    } catch (err) {
      console.error("Order submission failed:", err);
      toast.error("Failed to submit order.");
    } finally {
      setLoading(false);
    }
  };

  const submitAndPrint = async () => {
    const invoiceData = {
      customer_name: customerName,
      items: cart.map(item => ({
        item_id: item.id,
        quantity: item.quantity,
        price: item.price,
        subtotal: item.price * item.quantity
      })),
      tax: parseFloat(tax),
      total: total
    };

    try {
      setLoading(true);
      await createInvoices(invoiceData);
      toast.success("Order submitted successfully!");
      setTimeout(() => {
        handlePrint();
      }, 500);
    } catch (err) {
      console.error("Order submission failed:", err);
      toast.error("Failed to submit order.");
      setLoading(false);
    }
  };

  const handlePrint = () => {
    const printContents = billRef.current.innerHTML;
    const originalContents = document.body.innerHTML;

    document.body.innerHTML = printContents;
    window.print();
    document.body.innerHTML = originalContents;
    window.location.reload();

    setCart([]);
    setShowModal(false);
    setCustomerName("");
    setTax(0);

    setLoading(false);
  };

  return (
    <>
      <div className="fixed inset-0 backdrop-blur-md bg-black/25 flex justify-center items-center z-50">
        <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full max-h-[80vh] overflow-auto">
          <h3 className="text-2xl font-bold mb-4">Order Details</h3>

          <ul className="divide-y divide-gray-200">
            {cart.map((item) => (
              <li key={item.id} className="py-2 flex justify-between items-center">
                <div>
                  <p className="font-semibold">{item.name}</p>
                  <p className="text-sm text-gray-600">
                    Qty: {item.quantity} × Rs. {item.price.toFixed(2)}
                  </p>
                </div>
                <p className="font-bold">
                  Rs. {(item.price * item.quantity).toFixed(2)}
                </p>
              </li>
            ))}
          </ul>

          <input
            type="text"
            placeholder="Customer Name"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            className="w-full border px-3 py-2 mb-2 rounded"
          />

          <input
            type="number"
            placeholder="Tax Amount"
            value={tax}
            onChange={(e) => setTax(e.target.value)}
            className="w-full border px-3 py-2 rounded"
          />

          <div className="mt-4 font-bold text-right text-lg">
            Total: Rs. {total.toFixed(2)}
          </div>

          <div className="mt-6 flex justify-between space-x-3">
            <Button onClick={submitOrder} variant="primary" className="flex-1">
              Submit Order
            </Button>
            <Button onClick={submitAndPrint} variant="primary" className="flex-1">
              Print Bill
            </Button>
            <Button
              onClick={() => setShowModal(false)}
              variant="secondary"
              className="flex-1"
            >
              Cancel
            </Button>
          </div>
        </div>
      </div>

      <div className="hidden print:block">
        <div ref={billRef} className="p-6 font-mono text-sm w-[300px] mx-auto">
          <h2 className="text-center text-xl font-bold mb-4">🧾 Customer Bill</h2>
          <p>
            <span className="font-semibold">Name:</span> {customerName}
          </p>

          <table className="w-full border border-black border-collapse mt-4">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-black px-2 py-1 text-center">Item</th>
                <th className="border border-black px-2 py-1 text-center">Qty</th>
                <th className="border border-black px-2 py-1 text-center">Price</th>
                <th className="border border-black px-2 py-1 text-center">Subtotal</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item) => (
                <tr key={item.id}>
                  <td className="border border-black px-2 py-1 text-center">{item.name}</td>
                  <td className="border border-black px-2 py-1 text-center">{item.quantity}</td>
                  <td className="border border-black px-2 py-1 text-center">Rs. {item.price.toFixed(2)}</td>
                  <td className="border border-black px-2 py-1 text-center">Rs. {(item.price * item.quantity).toFixed(2)}</td>
                </tr>
              ))}
              <tr>
                <td colSpan="3" className="border border-black px-2 py-1 text-right font-semibold">Tax</td>
                <td className="border border-black px-2 py-1 text-center">Rs. {parseFloat(tax).toFixed(2)}</td>
              </tr>
              <tr>
                <td colSpan="3" className="border border-black px-2 py-1 text-right font-semibold">Total</td>
                <td className="border border-black px-2 py-1 text-center font-bold">Rs. {total.toFixed(2)}</td>
              </tr>
            </tbody>
          </table>

          <p className="text-center mt-6">Thank you for your order!</p>
        </div>
      </div>
    </>
  );
};

export default OrderForm;
