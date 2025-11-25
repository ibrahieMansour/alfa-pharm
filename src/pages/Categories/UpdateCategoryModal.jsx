import { useState } from "react";

import { Modal } from "@/components/Modal";
import InputField from "@/components/InputField";
import ImageUpload from "./ImageUpload";

import ProductsModalIcon from "@/assets/icons/products-modal.svg";

const UpdateCategoryModal = ({ category, onConfirm, onClose, loading }) => {
  const [form, setForm] = useState({
    name: category?.name,
    priority: category?.priority,
    image: null, // no default URL image
    isView: category?.isView, // added isView
  });

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
    const { name, priority } = form;

    if (!name || !priority) {
      setError("من فضلك املأ الحقول المطلوبة");
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
      } else if (form[key] !== category[key]) {
        changedData[key] = form[key];
      }
    }

    if (Object.keys(changedData).length === 0) {
      setError("لم يتم إجراء أي تغييرات");
      return;
    }

    onConfirm(changedData);
  };

  return (
    <Modal
      title="تحديث بيانات التصنيف"
      icon={ProductsModalIcon}
      confirmText="تأكيد"
      width={550}
      onClose={onClose}
      onConfirm={handleSubmit}
      loading={loading}
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-y-4">
        <ImageUpload label="صورة جديدة (اختياري)" onChange={handleImageChange} />

        <InputField
          id="name"
          label="اسم التصنيف"
          value={form.name || ""}
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

        {/* isView two-button toggle */}
        <div className="flex items-center mt-2">
          <span className="text-xs text-[#414651] font-medium w-1/4">مرئي</span>
          <div className="flex-1 flex border border-gray-300 rounded-lg overflow-hidden font-bold text-xs">
            {/* False button */}
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
            {/* True button */}
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

export default UpdateCategoryModal;
