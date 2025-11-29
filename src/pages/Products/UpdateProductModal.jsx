import { useState } from "react";
import { useSelector } from "react-redux";

import { Modal } from "@/components/Modal";
import InputField from "@/components/InputField";
import { InputFieldWithDataList } from "@/components/InputFieldWithDataList";
import ImageUpload from "./ImageUpload";

import ProductsModalIcon from "@/assets/icons/products-modal.svg";

const UpdateProductsModal = ({ product, onConfirm, onClose, loading }) => {
  const { categories } = useSelector((state) => state.products);

  const [form, setForm] = useState({
    name: product?.name,
    description: product?.description,
    price: product?.price,
    stock: product?.stock,
    categoryId: product?.categoryId,
    image: null, // no default URL image
    isView: product?.isView, // added isView
  });

  const [categoryName, setCategoryName] = useState(product?.category?.name || "");
  const [error, setError] = useState("");

  const handleChange = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setError("");
  };

  const handleImageChange = (file) => {
    setForm((prev) => ({ ...prev, image: file }));
    setError("");
  };

  const validateForm = () => {
    const { name, price, stock } = form;

    if (!name || !price) {
      setError("من فضلك املأ الحقول المطلوبة");
      return false;
    }

    if (parseFloat(price) <= 0) {
      setError("السعر يجب أن يكون رقمًا موجبًا");
      return false;
    }

    if (stock && stock < 0) {
      setError("الكمية لا يمكن أن تكون رقمًا سالبًا");
      return false;
    }

    const matched = categories.find((cat) => cat.id === form.categoryId);

    if (!matched) {
      setError("القسم غير صحيح");
      return false;
    }

    setError("");
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    const changedData = {};

    // Compare fields to detect changes
    for (const key in form) {
      if (key === "image") {
        if (form.image) changedData.image = form.image; // send only new image
      } else if (form[key] !== product[key]) {
        changedData[key] = form[key];
      }
    }

    if (changedData.price) changedData.price = parseFloat(parseFloat(form.price).toFixed(2));
    if (changedData.stock) changedData.stock = parseInt(form.stock) || 0;

    if (Object.keys(changedData).length === 0) {
      setError("لم يتم إجراء أي تغييرات");
      return;
    }

    onConfirm(changedData);
  };

  return (
    <Modal
      title="تحديث بيانات المنتج"
      icon={ProductsModalIcon}
      confirmText="تأكيد"
      width={550}
      onClose={onClose}
      onConfirm={handleSubmit}
      loading={loading}
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-y-4">
        <ImageUpload label="صورة جديدة (اختياري)" onChange={handleImageChange} />

        <InputFieldWithDataList
          categories={categories}
          value={categoryName}
          onSelect={(id, name) => {
            setForm({ ...form, categoryId: id })
            setCategoryName(name)
          }}
        />

        <InputField
          id="name"
          label="اسم المنتج"
          value={form.name || ""}
          onChange={(e) => handleChange("name", e.target.value)}
          required
        />

        <InputField
          id="description"
          label="الوصف (اختياري)"
          value={form.description || ""}
          maxLength={150}
          onChange={(e) => handleChange("description", e.target.value)}
        />

        <InputField
          id="price"
          label="السعر"
          type="number"
          step="0.01"
          min="0"
          value={form.price || "0"}
          onChange={(e) => handleChange("price", e.target.value)}
          required
        />

        <InputField
          id="stock"
          label="المخزون (اختياري)"
          type="number"
          min="0"
          value={form.stock || "0"}
          onChange={(e) => handleChange("stock", e.target.value)}
        />

        {/* isView two-button toggle */}
        <div className="flex items-center mt-1">
          <span className="text-xs text-[#414651] font-medium w-1/4">مرئي</span>
          <div className="flex-1 flex border border-gray-300 rounded-lg overflow-hidden font-bold text-xs">
            {/* False button */}
            <button
              type="button"
              className={`flex-1 py-2 transition-all duration-200 rounded-l-lg ${!form.isView
                ? "bg-blue-500 text-white shadow-sm"
                : "bg-white text-gray-500 hover:bg-gray-100"
                }`}
              onClick={() => handleChange("isView", false)}
            >
              غير مرئي
            </button>
            {/* True button */}
            <button
              type="button"
              className={`flex-1 py-2 transition-all duration-200 rounded-r-lg ${form.isView
                ? "bg-blue-500 text-white shadow-sm"
                : "bg-white text-gray-500 hover:bg-gray-100"
                }`}
              onClick={() => handleChange("isView", true)}
            >
              مرئي
            </button>
          </div>
        </div>

        <p
          className={`h-3 text-[10px] text-center font-medium transition-all ${error ? "text-red-500 opacity-100" : "opacity-0"
            }`}
        >
          {error || ""}
        </p>
      </form>
    </Modal>
  );
};

export default UpdateProductsModal;
