import React, { useEffect, useState } from "react";
import { getItems } from "../../services/itemService";
import Button from "../../components/buttons/Button";
import OrderForm from "../../components/forms/OrderForm";
import { FaShoppingCart } from "react-icons/fa";

const Dashboard = () => {
  const [items, setItems] = useState([]);
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [cart, setCart] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [cartSidebarOpen, setCartSidebarOpen] = useState(false);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        setLoading(true);
        const data = await getItems();
        setItems(Array.isArray(data) ? data : []);
      } catch (err) {
        setError(err.message || "Failed to fetch items");
      } finally {
        setLoading(false);
      }
    };
    fetchItems();
  }, []);

  const filteredItems =
    filter === "all"
      ? items
      : items.filter((item) => item.type?.toLowerCase() === filter);

  const addToCart = (item) => {
    setCart((prev) => {
      const exists = prev.find((i) => i.id === item.id);
      if (exists) {
        return prev.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const updateQuantity = (id, delta) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.id === id ? { ...item, quantity: item.quantity + delta } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="space-y-4 p-2 md:p-5 relative">
      {error && <div className="text-red-600">{error}</div>}

      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="flex gap-8">
          <div className="flex-1">
            <div className="flex items-center justify-between flex-wrap gap-2 mb-4">
              <div className="flex flex-wrap gap-2">
                {["all", "pizza", "beverage", "toppings"].map((type) => (
                  <button
                    key={type}
                    onClick={() => setFilter(type)}
                    className={`px-2 py-1 md:px-4 md:py-2 text-sm md:text-base rounded-md cursor-pointer ${
                      filter === type
                        ? "bg-blue-600 text-white"
                        : "bg-gray-200 hover:bg-gray-300"
                    }`}
                  >
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </button>
                ))}
              </div>

              <button
                className="bg-blue-600 flex items-center text-sm md:text-base justify-center gap-2 text-white cursor-pointer px-3 py-1 md:py-2 md:px-5 rounded-md"
                onClick={() => setCartSidebarOpen(true)}
              >
                <FaShoppingCart /> Cart ({cart.length})
              </button>
            </div>


            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 gap-4">
              {Array.isArray(filteredItems) &&
                filteredItems.map((item) => (
                  <div
                    key={item.id}
                    className="border rounded-lg p-4 shadow hover:shadow-lg cursor-pointer"
                    onClick={() => addToCart(item)}
                    title="Click to add"
                  >
                    <h3 className="text-lg font-semibold">{item.name}</h3>
                    <p className="capitalize text-gray-600">{item.type}</p>
                    <p className="mt-2 font-bold text-green-700">
                      Rs. {item.price.toFixed(2)}
                    </p>
                  </div>
                ))}
              {Array.isArray(filteredItems) && filteredItems.length === 0 && (
                <p className="text-gray-500 col-span-full">No items found</p>
              )}
            </div>
          </div>

          {cartSidebarOpen && (
            <div
              className="fixed inset-0 bg-black/25 backdrop-blur-md bg-opacity-40 z-40"
              onClick={() => setCartSidebarOpen(false)}
            />
          )}

          <div
            className={`fixed top-0 right-0 w-72 h-full bg-white z-50 border p-4 rounded-md justify-between shadow flex flex-col transform transition-transform duration-300 ease-in-out
              ${cartSidebarOpen ? "translate-x-0" : "translate-x-full"}
              `}
          >
            <div>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Checkout</h2>
                <button
                  className=" text-red-600 font-bold cursor-pointer text-xl"
                  onClick={() => setCartSidebarOpen(false)}
                >
                  ×
                </button>
              </div>

              {cart.length === 0 && <p>No items selected</p>}

              <ul className="space-y-3 max-h-[60vh] overflow-auto flex-grow">
                {cart.map((item) => (
                  <li
                    key={item.id}
                    className="flex justify-between items-center border-b pb-2"
                  >
                    <div>
                      <h4 className="font-semibold">{item.name}</h4>
                      <p className="text-sm text-gray-600">
                        Rs. {item.price.toFixed(2)} each
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        className="w-8 h-8 flex items-center justify-center text-xl font-bold bg-red-500 text-white rounded-full cursor-pointer"
                        onClick={() => updateQuantity(item.id, -1)}
                      >
                        -
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        className="w-8 h-8 flex items-center justify-center text-xl font-bold bg-green-500 text-white rounded-full cursor-pointer"
                        onClick={() => updateQuantity(item.id, 1)}
                      >
                        +
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {cart.length > 0 && (
              <div>
                <div className="mt-4 font-bold text-right">
                  Total: Rs. {totalPrice.toFixed(2)}
                </div>
                <Button
                  type="button"
                  disabled={cart.length === 0}
                  variant="primary"
                  className="w-full mt-3"
                  onClick={() => {
                    setShowModal(true);
                    setCartSidebarOpen(false);
                  }}
                >
                  Confirm Order
                </Button>
              </div>
            )}
          </div>
        </div>
      )}

      {showModal && (
        <OrderForm
          cart={cart}
          setCart={setCart}
          setShowModal={setShowModal}
          setLoading={setLoading}
          onSubmitOrder={() => {
            console.log("Order submitted", cart);
          }}
        />
      )}
    </div>
  );
};

export default Dashboard;
