import React, { useEffect, useState } from "react";
import Button from "../../components/buttons/Button";
import { getItems, deleteItem } from "../../services/itemService";
import AddItemForm from "../../components/forms/AddItemForm";
import UpdateItemForm from "../../components/forms/UpdateItemForm";
import ConfirmBox from "../../components/dialogbox/ConfirmBox";
import { MdEdit, MdDeleteForever } from "react-icons/md";
import { toast } from 'react-toastify';

const Items = () => {
  const [items, setItems] = useState([]);
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);
  const [editItem, setEditItem] = useState(null);

  const fetchItems = async () => {
    try {
      setLoading(true);
      const data = await getItems();
      setItems(data);
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleDelete = async () => {
    try {
      await deleteItem(confirmDeleteId);
      fetchItems();
      toast.success("Item deleted successfully!");
    } catch (err) {
      alert(err.message || "Failed to delete item");
    } finally {
      setConfirmDeleteId(null);
    }
  };

  return (
    <div className="space-y-4 p-2 overflow-x-auto md:p-5">
      <div className="flex">
        <Button onClick={() => setShowAddForm(true)}>Add Item</Button>
      </div>

      {error && <div className="text-red-600">{error}</div>}

      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="w-full overflow-x-auto rounded-md">
          <table className="min-w-[700px] w-full bg-white shadow-sm">
            <thead className="bg-blue-600 text-white text-sm">
              <tr>
                <th className="text-left px-4 py-2 hidden md:table-cell">No</th>
                <th className="text-left px-4 py-2">Name</th>
                <th className="text-left px-4 py-2">Type</th>
                <th className="text-left px-4 py-2">Price</th>
                <th className="text-left px-4 py-2">Created Date</th>
                <th className="text-left px-4 py-2 hidden md:table-cell">Action</th>
              </tr>
            </thead>
            <tbody className="text-sm text-gray-800">
              {items && items.length > 0 ? (
                items.map((item, index) => (
                  <tr key={item.id} className="hover:bg-gray-50">
                    <td className="px-4 py-2 hidden md:table-cell">{index + 1}</td>
                    <td className="px-4 py-2">{item.name}</td>
                    <td className="px-4 py-2 capitalize">{item.type}</td>
                    <td className="px-4 py-2">Rs. {item.price.toFixed(2)}</td>
                    <td className="px-4 py-2">
                      {new Date(item.created_at).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-2 gap-2 hidden md:flex">
                      <button
                        className="p-2 bg-green-500 text-white rounded-full hover:bg-green-600"
                        onClick={() => setEditItem(item)}
                      >
                        <MdEdit />
                      </button>
                      <button
                        className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600"
                        onClick={() => setConfirmDeleteId(item.id)}
                      >
                        <MdDeleteForever />
                      </button>
                    </td>
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

      {showAddForm && (
        <AddItemForm
          onClose={() => setShowAddForm(false)}
          onSuccess={() => {
            fetchItems();
            setShowAddForm(false);
            toast.success("Item added successfully!");
          }}
        />
      )}

      {editItem && (
        <UpdateItemForm
          item={editItem}
          onClose={() => setEditItem(null)}
          onSuccess={() => {
            fetchItems();
            setEditItem(null);
            toast.success("Item updated successfully!");
          }}
        />
      )}

      {confirmDeleteId && (
        <ConfirmBox
          onClose={() => setConfirmDeleteId(null)}
          onConfirm={handleDelete}
        />
      )}
    </div>
  );
};

export default Items;
