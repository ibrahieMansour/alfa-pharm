import { useState, useEffect } from "react";
import api from "@/api/api";
import { Modal } from "@/components/Modal";
import OrdersModalIcon from "../../assets/icons/orders-modal.svg";

const AddItemModal = ({ onConfirm, onClose, loading }) => {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);
  const [selected, setSelected] = useState([]);

  // 🕓 Debounced search effect
  useEffect(() => {
    const delay = setTimeout(() => {
      if (search.trim()) {
        api
          .get(`/products/search-admin?search=${search}`)
          .then((res) => setResults(res.data.data || []))
          .catch(() => setResults([]));
      } else {
        setResults([]);
      }
    }, 300);
    return () => clearTimeout(delay);
  }, [search]);

  // 🟩 Select product or increase quantity
  const handleSelectProduct = (product) => {
    setSelected((prev) => {
      const exists = prev.find((p) => p.id === product.id);
      if (exists) {
        return prev.map((p) => (p.id === product.id ? { ...p, quantity: p.quantity + 1 } : p));
      }
      return [...prev, { ...product, quantity: 1 }];
    });

    setSearch("");
    setResults([]);
  };

  // 🔢 Change quantity with + / − buttons
  const handleQuantityChange = (id, value) => {
    const newValue = Math.max(parseInt(value) || 1, 1);
    setSelected((prev) => prev.map((p) => (p.id === id ? { ...p, quantity: newValue } : p)));
  };

  // ❌ Remove selected product
  const handleRemove = (id) => {
    setSelected((prev) => prev.filter((p) => p.id !== id));
  };

  // ✅ Confirm selection
  const handleConfirm = () => {
    const data = selected.map((p) => ({
      productId: p.id,
      quantity: p.quantity,
    }));
    console.log({
      items: data,
    });
    onConfirm({
      items: data,
    });
  };

  return (
    <Modal
      title="إضافة منتج"
      icon={OrdersModalIcon}
      confirmText="إضافة"
      width={550}
      onClose={onClose}
      onConfirm={handleConfirm}
      loading={loading}
    >
      <div className="space-y-3">
        {/* Search Input */}
        <div className="relative">
          <input
            type="text"
            placeholder="ابحث عن منتج..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full border rounded px-3 py-2"
          />

          {/* Results Dropdown */}
          {results.length > 0 && (
            <ul className="absolute z-10 bg-white border w-full rounded mt-1 max-h-[250px] overflow-y-auto">
              {results.map((p) => (
                <li
                  key={p.id}
                  onClick={() => handleSelectProduct(p)}
                  className="px-3 py-2 hover:bg-gray-100 cursor-pointer flex items-center gap-2"
                >
                  <img src={p.image} alt={p.name} className="w-8 h-8 rounded object-cover" />
                  <span>{p.name}</span>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Selected Products */}
        <div className="space-y-2 border p-2 rounded-md h-[300px] overflow-auto">
          {selected.length > 0 ? (
            selected.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between border-b pb-1 last:border-b-0"
              >
                <div className="flex items-center gap-2">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-10 h-10 rounded object-cover"
                  />
                  <span className="font-medium">{item.name}</span>
                </div>

                <div className="flex items-center gap-2">
                  {/* Quantity Control */}
                  <div className="flex items-center border rounded">
                    <button
                      onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                      className="px-2 py-1 text-lg font-bold text-gray-600 hover:text-gray-800"
                    >
                      −
                    </button>
                    <span className="px-3 w-8 text-center select-none">{item.quantity}</span>
                    <button
                      onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                      className="px-2 py-1 text-lg font-bold text-gray-600 hover:text-gray-800"
                    >
                      +
                    </button>
                  </div>

                  {/* Remove Button */}
                  <button
                    onClick={() => handleRemove(item.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    ✕
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-400 py-10">لم يتم اختيار أي منتج بعد</p>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default AddItemModal;
