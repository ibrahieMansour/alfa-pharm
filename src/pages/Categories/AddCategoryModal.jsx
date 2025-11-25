import { useState } from "react";

import { Modal } from "@/components/Modal";
import InputField from "@/components/InputField";

import ImageUpload from "./ImageUpload";

import ProductsModalIcon from "@/assets/icons/products-modal.svg";

const AddCategoryModal = ({ onConfirm, onClose, loading }) => {
  const [form, setForm] = useState({
    name: "",
    priority: "",
    image: null,
    isView: true,
  });
  const [error, setError] = useState("");

  const handleChange = (key, value) => {
    setForm({ ...form, [key]: value });
    setError("");
  };

  const handleImageChange = (file) => {
    setForm({ ...form, image: file });
  };

  const validateForm = () => {
    const { name, priority, image } = form;

    if (!name || !priority) {
      setError("من فضلك املأ الحقول المطلوبة");
      return false;
    }

    if (priority < 0) {
      setError("الاولوية يجب أن تكون رقمًا موجبًا");
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

    const categoryData = {
      ...form,
    };

    onConfirm(categoryData);
  };

  return (
    <Modal
      title="إضافة تصنيف جديد"
      icon={ProductsModalIcon}
      confirmText={"تأكيد"}
      width={550}
      onClose={onClose}
      onConfirm={handleSubmit}
      loading={loading}
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-y-4">
        <ImageUpload label="صورة التصنيف" onChange={handleImageChange} />

        <InputField
          id="name"
          label="اسم التصنيف"
          value={form.name}
          onChange={(e) => handleChange("name", e.target.value)}
          required
        />

        <InputField
          id="priority"
          label="الاولوية"
          type="number"
          min="0"
          value={form.priority}
          onChange={(e) => handleChange("priority", e.target.value)}
        />

        {/* ✅ isView two-button toggle */}
        <div className="flex items-center mt-2">
          <span className="text-xs text-[#414651] font-medium w-1/4">مرئي</span>
          <div className="flex-1 flex border border-gray-300 rounded-lg overflow-hidden font-bold text-xs">
            <button
              type="button"
              className={`flex-1 py-2 transition-all duration-200 rounded-l-lg ${
                !form.isView
                  ? "bg-blue-500 text-white shadow-sm"
                  : "bg-white text-gray-500 hover:bg-gray-100"
              }`}
              onClick={() => handleChange("isView", false)}
            >
              غير مرئي
            </button>
            <button
              type="button"
              className={`flex-1 py-2 transition-all duration-200 rounded-r-lg ${
                form.isView
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
          className={`h-3 text-[10px] text-center font-medium transition-all ${
            error ? "text-red-500 opacity-100" : "opacity-0"
          }`}
        >
          {error || ""}
        </p>
      </form>
    </Modal>
  );
};

export default AddCategoryModal;
