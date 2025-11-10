import { useState } from "react";

import { Modal } from "@/components/Modal";
import InputField from "@/components/InputField";

import AdminsModalIcon from "@/assets/icons/admins-modal.svg";

const UpdateAdminModal = ({ admin, onConfirm, onClose, loading }) => {
  const [form, setForm] = useState({
    name: admin.name || "",
    email: admin.email || "",
    phone: admin.phone.slice(1) || "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleChange = (key, value) => {
    setForm({ ...form, [key]: value });
    setError("");
  };

  const validateForm = () => {
    const { name, email, phone, password } = form;

    // 1️⃣ Required fields (except password)
    if (!name || !email || !phone) {
      setError("من فضلك املأ جميع الحقول المطلوبة");
      return false;
    }

    // 2️⃣ Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("البريد الإلكتروني غير صالح");
      return false;
    }

    // 3️⃣ Phone validation (Egyptian format)
    if (!/^01[0125][0-9]{8}$/.test(phone)) {
      setError("رقم الهاتف غير صالح");
      return false;
    }

    // 4️⃣ Password validation (only if changed)
    if (password && !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/.test(password)) {
      setError(
        "كلمة المرور يجب أن تحتوي على 8 أحرف على الأقل وتشمل حرفًا كبيرًا وصغيرًا ورقمًا ورمزًا خاصًا"
      );
      return false;
    }

    setError("");
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const changedData = {};
    const { name, email, phone, password } = form;

    if (name !== admin.name) changedData.name = name;
    if (email !== admin.email) changedData.email = email;
    if (phone !== admin.phone.slice(1)) changedData.phone = "2" + phone;
    if (password) changedData.password = password; // only send if user entered new password

    if (Object.keys(changedData).length === 0) {
      setError("لم يتم تغيير أي بيانات");
      return;
    }

    onConfirm(changedData);
  };

  return (
    <Modal
      title="تحديث بيانات المسؤول"
      icon={AdminsModalIcon}
      confirmText="تأكيد"
      width={550}
      onClose={onClose}
      onConfirm={handleSubmit}
      loading={loading}
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-y-4">
        <InputField
          id="name"
          label="اسم المسؤول"
          value={form.name}
          onChange={(e) => handleChange("name", e.target.value)}
        />

        <InputField
          id="email"
          label="البريد الإلكتروني"
          type="email"
          value={form.email}
          onChange={(e) => handleChange("email", e.target.value)}
        />

        <InputField
          id="phone"
          label="رقم الهاتف"
          value={form.phone}
          onChange={(e) => handleChange("phone", e.target.value)}
        />

        <InputField
          id="password"
          label="كلمة المرور"
          type="password"
          value={form.password}
          onChange={(e) => handleChange("password", e.target.value)}
        />

        {/* 🧩 Fixed-height error message area */}
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

export default UpdateAdminModal;
