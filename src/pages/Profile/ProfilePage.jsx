import { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { updateMyProfileThunk } from "@/features/auth/authThunks"; // optional if you have this thunk

import Input from "./Input";

import PhoneIcon from "@/assets/icons/phone.svg";
import Eye from "@/assets/icons/eye.svg";
import EyeSlash from "@/assets/icons/eye-slash.svg";
import ProfileUser from "@/assets/icons/profile-user.svg";
import ProfileEmail from "@/assets/icons/profile-email.svg";
import ProfilePassword from "@/assets/icons/profile-password.svg";
import Avatar from "@/assets/images/avatar.png";

function ProfilePage() {
  const dispatch = useDispatch();
  const admin = useSelector((state) => state.auth.admin);

  const fileRef = useRef(null);

  const [form, setForm] = useState({
    name: admin?.name || "",
    phone: admin?.phone?.slice(1) || "",
    email: admin?.email || "",
    image: null,
    password: "",
  });

  const [editMode, setEditMode] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [imagePreview, setImagePreview] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // ✅ Add this useEffect right here
  useEffect(() => {
    if (admin) {
      setForm({
        name: admin.name || "",
        phone: admin.phone?.slice(1) || "",
        email: admin.email || "",
        image: null,
        password: "",
      });
    }
  }, [admin]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setForm({ ...form, image: file });
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleImageClick = () => {
    if (editMode) fileRef.current.click();
  };

  const handleCancelImage = () => {
    setForm({ ...form, image: null });
    setImagePreview("");
  };

  const handleCancel = () => {
    setForm({
      name: admin?.name || "",
      phone: admin?.phone?.slice(1) || "",
      email: admin?.email || "",
      image: null,
      password: "",
    });
    setImagePreview("");
    setEditMode(false);
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

  const handleSave = () => {
    if (!validateForm()) return;
    setLoading(true);

    const changedData = {};
    const { name, email, phone, password, image } = form;

    if (name !== admin.name) changedData.name = name;
    if (email !== admin.email) changedData.email = email;
    if (phone !== admin.phone.slice(1)) changedData.phone = "2" + phone;
    if (password) changedData.password = password; // only send if user entered new password
    if (image) changedData.image = image; // only send if user entered new image

    if (Object.keys(changedData).length === 0) {
      setError("لم يتم تغيير أي بيانات");
      return;
    }

    dispatch(updateMyProfileThunk(changedData))
      .unwrap()
      .then(() => {
        setEditMode(false);
        setLoading(false);
        setError("");
      })
      .catch((err) => {
        setLoading(false);
        if (err.statusCode === 409) {
          setError("هذا الهاتف مسجل بالفعل");
        }else{
          setError("حدث خطأ");
        }
      })
  };

  return (
    <div className="flex w-full h-full flex-col gap-y-2 py-4 px-4 lg:px-12">
      {/* === Header & Buttons === */}
      <div className="flex justify-between items-center">
        <p className="font-medium text-xs text-black">الملف الشخصي</p>
        <div className="flex items-center gap-3">
          {!editMode ? (
            <button
              className="bg-[#5EB756] text-white text-[10px] px-7 py-1.5 rounded-lg font-medium"
              onClick={() => setEditMode(true)}
            >
              تحديث
            </button>
          ) : (
            <>
              <button
                className="bg-[#5EB756] text-white text-[10px] px-7 py-1.5 rounded-lg font-medium"
                onClick={handleSave}
                disabled={loading}
              >
                {loading ? "جاري الحفظ..." : "حفظ"}
              </button>
              <button
                className="bg-[#5eb7561a] border border-[#5EB756] text-black text-[10px] px-7 py-1.5 rounded-lg font-medium"
                onClick={handleCancel}
                disabled={loading}
              >
                إلغاء
              </button>
            </>
          )}
        </div>
      </div>

      {/* === Content === */}
      <div className="flex max-sm:flex-col gap-x-9 m-auto w-full max-w-[640px]">
        {/* === Image === */}
        <div className="flex flex-col items-center gap-y-4">
          <div className="relative">
            <div
              className={`w-24 h-24 sm:w-40 sm:h-40 border-2 border-[#5EB756] rounded-full overflow-hidden ${editMode ? "cursor-pointer hover:opacity-80" : "cursor-default"
                }`}
              onClick={handleImageClick}
            >
              <img
                src={imagePreview || admin?.image}
                onError={(e) => (e.target.src = Avatar)}
                alt="avatar-img"
                className="w-full h-full object-cover"
              />
            </div>
            {editMode && imagePreview && (
              <button
                className="absolute -top-1 -right-1 bg-red-500 text-white w-6 h-6 flex justify-center items-center rounded-full text-xs"
                onClick={handleCancelImage}
              >
                ✕
              </button>
            )}
            <input
              type="file"
              ref={fileRef}
              className="hidden"
              accept="image/*"
              onChange={handleImageChange}
            />
          </div>

          <h5 className="text-bold text-[15px] sm:text-[19px]">{admin?.name || "المستخدم"}</h5>
        </div>

        {/* === Inputs === */}
        <div className="flex-1">
          {/* Name */}
          <Input
            label="الاسم"
            icon={ProfileUser}
            type="text"
            name="name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            disabled={!editMode}
          />

          {/* Phone */}
          <Input
            label="رقم الهاتف"
            icon={PhoneIcon}
            type="text"
            name="phone"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            disabled={!editMode}
          />

          {/* Email */}
          <Input
            label="البريد الإلكتروني"
            icon={ProfileEmail}
            type="email"
            name="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            disabled={!editMode}
          />

          {/* Password */}
          {editMode && (
            <div className="mt-3">
              <label className="text-[#18191C]/40 block mb-2 text-xs font-medium">
                كلمة المرور
              </label>
              <div className="relative">
                <div
                  className="absolute inset-y-0 end-0 flex items-center pe-3 cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  <img
                    src={showPassword ? Eye : EyeSlash}
                    alt="show password"
                    className="w-5 h-5"
                  />
                </div>
                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                  <img src={ProfilePassword} alt="password-icon" className="w-5 h-5" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  placeholder="أدخل كلمة المرور الجديدة"
                  className="bg-white border text-[#2A2A2A] text-xs rounded-lg outline-none block w-full h-full p-1 ps-8 pe-8"
                />
              </div>
            </div>
          )}

          <p className="text-red-600 text-[10px] font-normal text-center leading-4">
            {error && editMode && (
              <>&nbsp;{error}&nbsp;</>
            )}
          </p>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
