import { useState } from "react";

import { Modal } from "@/components/Modal";
import InputField from "@/components/InputField";

import ProductsModalIcon from "@/assets/icons/products-modal.svg";
import DefaultImage from "../../assets/images/default-image.png"

const UpdateItemsModal = ({ item, onConfirm, onClose, loading }) => {
  const [form, setForm] = useState({
    price: item?.price || "",
    quantity: item?.quantity || "",
  });

  const [error, setError] = useState("");

  const handleChange = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setError("");
  };

  const validateForm = () => {
    const { price, quantity } = form;

    if (!quantity || !price) {
      setError("من فضلك املأ الحقول المطلوبة");
      return false;
    }

    if (parseFloat(price) <= 0) {
      setError("السعر يجب أن يكون رقمًا موجبًا");
      return false;
    }

    if (quantity <= 0) {
      setError("الكمية لا يمكن أن تكون رقمًا سالبًا");
      return false;
    }

    setError("");
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const changedData = {};

    for (const key in form) {
      if (form[key] !== item[key]) changedData[key] = form[key];
    }

    if (changedData.price) changedData.price = parseFloat(parseFloat(form.price).toFixed(2));
    if (changedData.quantity) changedData.quantity = parseInt(form.quantity) || 0;

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
        <div className="flex flex-col items-center justify-center gap-y-2">
          <div className="w-20 h-20 rounded-full overflow-hidden border border-[#5D5D5D]">
            <img
              src={item?.product.image}
              alt="avatar-image"
              className="w-full h-full object-cover"
              onError={(e) => {
                e.currentTarget.src = DefaultImage;
              }}
            />
          </div>
          <p className="text-[#414651] font-medium text-xs">صورة المنتج</p>
        </div>

        {/* name section */}
        <div className="field">
          <p className="label">اسم المنتج</p>
          <p className="flex-1 py-2 px-3 rounded-lg text-xs text-[#414651] bg-white">
            {item?.product.name}
          </p>
        </div>

        <InputField
          id="price"
          label="السعر"
          type="number"
          min="0"
          value={form.price}
          onChange={(e) => handleChange("price", e.target.value)}
        />

        <InputField
          id="quantity"
          label="الكمبة"
          type="number"
          min="0"
          value={form.quantity}
          onChange={(e) => handleChange("quantity", e.target.value)}
        />

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

export default UpdateItemsModal;
