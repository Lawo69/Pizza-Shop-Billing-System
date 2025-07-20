import React, { useState } from "react";
import { createItem } from "../../services/itemService";
import Button from "../buttons/Button";

const AddItemForm = ({ onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    name: "",
    type: "",
    price: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      setLoading(true);
      await createItem({
        name: formData.name,
        type: formData.type,
        price: parseFloat(formData.price),
      });
      onSuccess();
      onClose();
    } catch (err) {
      setError(err.message || "Failed to add item");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 backdrop-blur-md bg-black/25 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-md shadow-lg">
        <h2 className="text-lg font-semibold mb-4">Add New Item</h2>
        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Item Name"
            className="w-full border px-3 py-2 rounded"
            value={formData.name}
            onChange={handleChange}
            required
          />
           <select
            name="type"
            className="w-full border px-3 py-2 rounded"
            value={formData.type}
            onChange={handleChange}
            required
          >
            <option value="">Select Type</option>
            <option value="pizza">Pizza</option>
            <option value="beverage">Beverage</option>
            <option value="toppings">Toppings</option>
          </select>
          <input
            type="number"
            name="price"
            placeholder="Item Price (LKR)"
            className="w-full border px-3 py-2 rounded"
            value={formData.price}
            onChange={handleChange}
            required
          />

          <div className="flex justify-end space-x-2 pt-2">
            <Button type="submit" disabled={loading} variant="primary">{loading ? "Adding..." : "Add Item"}</Button>
            <Button onClick={onClose} variant="secondary">Cancel</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddItemForm;
