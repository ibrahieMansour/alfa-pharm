import { useState } from "react";
import { Modal } from "@/components/Modal";
import InputField from "@/components/InputField";
import UsersModalIcon from "@/assets/icons/users-modal.svg";

const AddUserModal = ({ onConfirm, onClose, loading }) => {
  const [] = useState(false);

  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");

  const handleChange = (key, value) => {
    setForm({ ...form, [key]: value });
    setError(""); // clear error when typing
  };

  const validateForm = () => {
    const { name, phone, address, password, confirmPassword } = form;

    // 1️⃣ All inputs required
    if (!name || !phone || !address || !password || !confirmPassword) {
      setError("من فضلك املأ جميع الحقول");
      return false;
    }

    // 2️⃣ Phone validation (Egyptian format)
    if (!/^01[0125][0-9]{8}$/.test(phone)) {
      setError("رقم الهاتف غير صالح");
      return false;
    }

    // 3️⃣ Password validation (min 8 chars, upper, lower, number, symbol)
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
    if (!passwordRegex.test(password)) {
      setError(
        "كلمة المرور يجب أن تحتوي على 8 أحرف على الأقل وتشمل حرفًا كبيرًا وصغيرًا ورقمًا ورمزًا خاصًا"
      );
      return false;
    }

    // 4️⃣ Confirm password matches
    if (password !== confirmPassword) {
      setError("كلمتا المرور غير متطابقتين");
      return false;
    }

    setError("");
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, phone, address, password } = form;
    if (!validateForm()) return;

    onConfirm({
      phone: "2" + phone,
      name,
      password,
      address,
    });

    // setForm({
    //   name: "",
    //   phone: "",
    //   address: "",
    //   password: "",
    //   confirmPassword: "",
    // });
  };

  return (
    <Modal
      title="إضافة مستخدم جديد"
      icon={UsersModalIcon}
      confirmText="تأكيد"
      width={550}
      onClose={onClose}
      onConfirm={handleSubmit}
      loading={loading}
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-y-4">
        <InputField
          label="اسم المستخدم"
          value={form.name}
          onChange={(e) => handleChange("name", e.target.value)}
        />

        <InputField
          label="رقم الهاتف"
          value={form.phone}
          onChange={(e) => handleChange("phone", e.target.value)}
        />

        <InputField
          label="العنوان"
          value={form.address}
          onChange={(e) => handleChange("address", e.target.value)}
        />

        <InputField
          label="كلمة المرور"
          type="password"
          value={form.password}
          onChange={(e) => handleChange("password", e.target.value)}
        />

        <InputField
          label="تأكيد كلمة المرور"
          type="password"
          value={form.confirmPassword}
          onChange={(e) => handleChange("confirmPassword", e.target.value)}
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

export default AddUserModal;
