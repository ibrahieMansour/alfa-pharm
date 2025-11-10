import { useState, useRef } from "react";
import DefaultImage from "@/assets/images/default-image.png";

const ImageUpload = ({ label = "صورة المنتج", onChange, size = 60 }) => {
  const [preview, setPreview] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileSelect = (file) => {
    if (!file) return;
    setPreview(URL.createObjectURL(file));
    onChange(file);
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    handleFileSelect(file);
    e.target.value = ""; // ✅ allow reselecting same image
  };

  const handleRemove = (e) => {
    e.stopPropagation();
    setPreview(null);
    onChange(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    handleFileSelect(file);
  };

  return (
    <div className="flex max-sm:flex-col-reverse items-center gap-3">
      {/* 🏷️ Label */}
      <label className="block text-[#414651] font-medium text-xs max-sm:mb-2 sm:w-1/4">
        {label}
      </label>

      {/* 🖼️ Circle preview */}
      <div className="relative">
        <img
          src={preview || DefaultImage}
          alt="Preview"
          style={{ width: size, height: size }}
          className="rounded-full object-cover border border-gray-300 cursor-pointer hover:opacity-80 transition"
          onClick={handleImageClick}
        />
        {preview && (
          <button
            type="button"
            onClick={handleRemove}
            className="absolute -top-1 -right-1 bg-white text-red-600 rounded-full text-xs px-[4px] py-[1px]"
          >
            ×
          </button>
        )}
      </div>

      {/* 📦 Upload box (hidden when image selected or small screen) */}

      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={handleImageClick}
        className={`hidden sm:flex items-center justify-center gap-4 flex-1 rounded-xl py-4 cursor-pointer transition ${
          isDragging ? "border-blue-400 bg-blue-50" : "bg-white"
        }`}
      >
        <div className="text-center text-sm text-[#535862] select-none">
          <p className="text-[11px] font-bold">
            <span className="text-[#E97E39]">انقر للتحميل</span> أو السحب والإفلات
          </p>
          <p className="text-[10px] text-gray-400">
            يُسمح فقط بصور PNG أو JPG أو JPEG أو GIF (بحد أقصى 2 ميغابايت)
          </p>
        </div>
      </div>

      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
      />
    </div>
  );
};

export default ImageUpload;
