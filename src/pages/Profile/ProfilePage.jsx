import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import PhoneIcon from "@/assets/icons/phone.svg";

const ProfilePage = () => {
  // Get admin data from Redux auth slice
  const adminDataFromRedux = useSelector((state) => state.auth.admin);

  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState(adminDataFromRedux || {});
  const [hasChanges, setHasChanges] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    // When Redux data changes, update formData
    setFormData(adminDataFromRedux);
  }, [adminDataFromRedux]);

  useEffect(() => {
    if (!adminDataFromRedux) return;

    // Check if any field changed
    const changed =
      formData.name !== adminDataFromRedux.name ||
      formData.email !== adminDataFromRedux.email ||
      formData.phone !== adminDataFromRedux.phone ||
      formData.password !== "" ||
      formData.image !== adminDataFromRedux.image;
    setHasChanges(changed);
  }, [formData, adminDataFromRedux]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setFormData((prev) => ({ ...prev, image: url }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name?.trim()) newErrors.name = "Name is required";
    if (!formData.email?.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Invalid email";
    if (!formData.phone?.trim()) newErrors.phone = "Phone is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleConfirm = () => {
    if (!validate()) return;
    // Here you would dispatch an action to update Redux/auth API
    console.log("Updated data to send:", formData);
    setEditMode(false);
  };

  const handleCancel = () => {
    setFormData(adminDataFromRedux);
    setEditMode(false);
    setErrors({});
  };

  if (!adminDataFromRedux) return <p>Loading...</p>;

  return (
    <div className="flex w-full h-full flex-col gap-y-4 py-4 px-4 lg:px-12">
      {/* Header */}
      <div className="flex justify-between items-center">
        <p className="font-medium text-lg text-black">بيانات المستخدم</p>
        {!editMode ? (
          <button
            className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600"
            onClick={() => setEditMode(true)}
          >
            Edit
          </button>
        ) : (
          <div className="flex gap-2">
            <button
              className="bg-gray-300 text-black px-4 py-1 rounded hover:bg-gray-400"
              onClick={handleCancel}
            >
              Cancel
            </button>
            <button
              className={`px-4 py-1 rounded text-white ${
                hasChanges ? "bg-green-500 hover:bg-green-600" : "bg-green-200 cursor-not-allowed"
              }`}
              disabled={!hasChanges}
              onClick={handleConfirm}
            >
              Confirm
            </button>
          </div>
        )}
      </div>

      {/* Profile Section */}
      <div className="flex max-sm:flex-col gap-x-9 m-auto w-full">
        {/* Avatar */}
        <div className="flex flex-col items-center gap-y-2">
          <div className="w-24 h-24 sm:w-32 sm:h-32 border border-[#F4EBD0] rounded-full overflow-hidden relative">
            <img
              src={formData.image || "/default-avatar.png"}
              alt="avatar"
              className="w-full h-full object-cover"
            />
            {editMode && (
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="absolute inset-0 opacity-0 cursor-pointer"
              />
            )}
          </div>
        </div>

        {/* Info Fields */}
        <div className="flex-1 flex flex-col gap-y-3">
          {/* Name */}
          <div>
            <p className="text-[10px] text-[#1E1E1E] font-medium pb-1">Name</p>
            {editMode ? (
              <>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full border rounded px-2 py-1"
                />
                {errors.name && <p className="text-red-500 text-xs">{errors.name}</p>}
              </>
            ) : (
              <p className="text-[11px] text-[#2A2A2A]">{adminDataFromRedux.name}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <p className="text-[10px] text-[#1E1E1E] font-medium pb-1">Email</p>
            {editMode ? (
              <>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full border rounded px-2 py-1"
                />
                {errors.email && <p className="text-red-500 text-xs">{errors.email}</p>}
              </>
            ) : (
              <p className="text-[11px] text-[#2A2A2A]">{adminDataFromRedux.email}</p>
            )}
          </div>

          {/* Phone */}
          <div>
            <p className="text-[10px] text-[#1E1E1E] font-medium pb-1">Phone</p>
            {editMode ? (
              <>
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full border rounded px-2 py-1"
                />
                {errors.phone && <p className="text-red-500 text-xs">{errors.phone}</p>}
              </>
            ) : (
              <div className="flex items-center gap-x-3 bg-white py-1 px-2 rounded-lg">
                <div className="w-5">
                  <img src={PhoneIcon} alt="phone-icon" className="w-5 h-5" />
                </div>
                <p className="flex-1 text-[11px] text-[#2A2A2A]">{adminDataFromRedux.phone}</p>
              </div>
            )}
          </div>

          {/* Password */}
          {editMode && (
            <div>
              <p className="text-[10px] text-[#1E1E1E] font-medium pb-1">Password</p>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className="w-full border rounded px-2 py-1"
                placeholder="Enter new password"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
