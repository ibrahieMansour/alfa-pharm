import { useState } from "react";

import { Modal } from "@/components/Modal";
import InputField from "@/components/InputField";
import { InputFieldWithDataList } from "@/components/InputFieldWithDataList";

import ImageUpload from "./ImageUpload";

import ProductsModalIcon from "@/assets/icons/products-modal.svg";
import { useSelector } from "react-redux";

const AddProductModal = ({ onConfirm, onClose, loading }) => {
  const { categories } = useSelector((state) => state.products);

  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    categoryId: "",
    image: null,
    isView: true, // ✅ added isView default
  });
  const [categoryName, setCategoryName] = useState("")
  const [error, setError] = useState("");

  const handleChange = (key, value) => {
    setForm({ ...form, [key]: value });
    setError("");
  };

  const handleImageChange = (file) => {
    setForm({ ...form, image: file });
  };

  const validateForm = () => {
    const { name, price, stock, image } = form;

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

    // ✅ Image validation
    if (image) {
      const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/gif"];
      const maxSize = 2 * 1024 * 1024; // 2MB

      if (!allowedTypes.includes(image.type)) {
        setError("يُسمح فقط بملفات الصور من نوع JPG أو JPEG أو PNG أو GIF");
        return false;
      }

      if (image.size > maxSize) {
        setError("حجم الصورة يجب ألا يتجاوز 2 ميغابايت");
        return false;
      }
    }

    setError("");
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const productData = {
      ...form,
      price: form.price ? parseFloat(parseFloat(form.price).toFixed(2)) : 0,
      stock: form.stock ? parseInt(form.stock) : 0,
    };

    onConfirm(productData);
  };

  return (
    <Modal
      title="إضافة منتج جديد"
      icon={ProductsModalIcon}
      confirmText={"تأكيد"}
      width={550}
      onClose={onClose}
      onConfirm={handleSubmit}
      loading={loading}
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-y-2">
        <ImageUpload label="صورة المنتج" onChange={handleImageChange} />

        <InputFieldWithDataList
          categories={categories}
          value={categoryName}
          onSelect={(id, name) => {
            setForm({ ...form, categoryId: id })
            setCategoryName(name)
          }
          }
        />

        <InputField
          id="name"
          label="اسم المنتج"
          value={form.name}
          onChange={(e) => handleChange("name", e.target.value)}
          required
        />

        <InputField
          id="description"
          label="الوصف (اختياري)"
          value={form.description}
          maxLength={150}
          onChange={(e) => handleChange("description", e.target.value)}
        />

        <InputField
          id="price"
          label="السعر"
          type="number"
          step="0.01"
          min="0"
          value={form.price}
          onChange={(e) => handleChange("price", e.target.value)}
          required
        />

        <InputField
          id="stock"
          label="المخزون (اختياري)"
          type="number"
          min="0"
          value={form.stock}
          onChange={(e) => handleChange("stock", e.target.value)}
        />

        {/* ✅ isView two-button toggle */}
        <div className="flex items-center mt-1">
          <span className="text-xs text-[#414651] font-medium w-1/4">مرئي</span>
          <div className="flex-1 flex border border-gray-300 rounded-lg overflow-hidden font-bold text-xs">
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

export default AddProductModal;
