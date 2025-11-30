import { useState } from "react";

import { Modal } from "@/components/Modal";
import InputField from "@/components/InputField";

import UsersModalIcon from "@/assets/icons/users-modal.svg";

const UpdateUserModal = ({ user, onConfirm, onClose, loading }) => {
  const [form, setForm] = useState({
    name: user?.name || "",
    phone: user?.phone.slice(1) || "",
    address: user?.address || "",
    password: user?.password || "",
    suspend: user?.suspend || false,
  });

  const [error, setError] = useState("");

  const handleChange = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setError("");
  };

  const validateForm = () => {
    const { name, phone, password } = form;

    if (!name || !phone) {
      setError("من فضلك املأ الحقول المطلوبة");
      return false;
    }

    if (!/^01[0125][0-9]{8}$/.test(phone)) {
      setError("رقم الهاتف غير صالح");
      return false;
    }

    if (password && !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/.test(password)) {
      setError(
        "كلمة المرور يجب أن تحتوي على 8 أحرف على الأقل وتشمل حرفًا كبيرًا وصغيرًا ورقمًا ورمزًا خاصًا"
      );
      return false;
    }

    setError("");
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const changedData = {};

    const { name, phone, address, password, suspend } = form;

    if (name !== user.name) changedData.name = name;
    if (phone !== user.phone.slice(1)) changedData.phone = "2" + phone;
    if (address !== user.address) changedData.address = address;
    if (password) changedData.password = password; // only send if user entered new password
    if (suspend !== user.suspend) changedData.suspend = suspend;

    if (Object.keys(changedData).length === 0) {
      setError("لم يتم إجراء أي تغييرات");
      return;
    }

    try {
      await onConfirm(changedData);
      setError("");
    } catch (errMsg) {
      setError(errMsg);
    }
  };

  return (
    <Modal
      title="تحديث بيانات المستخدم"
      icon={UsersModalIcon}
      confirmText="تأكيد"
      width={550}
      onClose={onClose}
      onConfirm={handleSubmit}
      loading={loading}
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-y-4">

        <InputField
          id="name"
          label="اسم المستخدم"
          value={form.name}
          onChange={(e) => handleChange("name", e.target.value)}
          required
        />

        <InputField
          id="phone"
          label="الرقم"
          value={form.phone}
          maxLength={11}
          onChange={(e) => handleChange("phone", e.target.value)}
        />

        <InputField
          id="address"
          label="العنوان (اختياري)"
          value={form.address}
          onChange={(e) => handleChange("address", e.target.value)}
          required
        />

        <InputField
          id="password"
          label="كلمة المرور (اختياري)"
          type="password"
          value={form.password}
          onChange={(e) => handleChange("password", e.target.value)}
        />

        {/* isSuspended two-button toggle */}
        <div className="flex items-center mt-2">
          <span className="text-xs text-[#414651] font-medium w-1/4">الحظر</span>
          <div className="flex-1 flex border border-gray-300 rounded-lg overflow-hidden font-bold text-xs">
            {/* False button */}
            <button
              type="button"
              className={`flex-1 py-2 transition-all duration-200 rounded-l-lg ${!form.suspend
                ? "bg-blue-500 text-white shadow-sm"
                : "bg-white text-gray-500 hover:bg-gray-100"
                }`}
              onClick={() => handleChange("suspend", false)}
            >
              غير مفعل
            </button>
            {/* True button */}
            <button
              type="button"
              className={`flex-1 py-2 transition-all duration-200 rounded-r-lg ${form.suspend
                ? "bg-blue-500 text-white shadow-sm"
                : "bg-white text-gray-500 hover:bg-gray-100"
                }`}
              onClick={() => handleChange("suspend", true)}
            >
              مفعل
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

export default UpdateUserModal;
