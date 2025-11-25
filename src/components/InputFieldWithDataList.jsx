import { useState } from "react";
import InputField from "@/components/InputField";

export const InputFieldWithDataList = ({ categories, value, onSelect }) => {
  const [search, setSearch] = useState(value || "");
  const [open, setOpen] = useState(false);

  const filtered = categories.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleSelect = (cat) => {
    setSearch(cat.name); // show name
    onSelect(cat.id, cat.name); // send data
    setOpen(false);
  };

  // 🔍 When typing manually → auto-detect category
  const handleManualTyping = (text) => {
    setSearch(text);
    setOpen(true);

    const match = categories.find(
      (cat) => cat.name.toLowerCase() === text.toLowerCase()
    );

    if (match) {
      // If name matches exactly → auto-select
      onSelect(match.id, match.name);
    } else {
      // No match → reset ID
      onSelect("", "");
    }
  };

  return (
    <div className="relative">
      {/* Input */}
      <InputField
        // id="category"
        label="اسم القسم"
        value={search}
        placeholder="Choose category"
        onFocus={() => setOpen(true)}
        onBlur={() => setTimeout(() => setOpen(false), 150)} // 👈 close on click outside
        onChange={(e) => handleManualTyping(e.target.value)}
      />

      {/* Dropdown */}
      {open && (
        <div
          className="border rounded bg-white shadow absolute left-0 w-full sm:w-3/4  mt-1"
          style={{ maxHeight: "200px", overflowY: "auto", zIndex: 9999 }}
        >
          {filtered.length > 0 ? (
            filtered.map((cat) => (
              <div
                key={cat.id}
                onMouseDown={() => handleSelect(cat)} // 👈 important to prevent blur issue
                className="p-2 hover:bg-gray-100"
                style={{ cursor: "pointer" }}
              >
                {cat.name}
              </div>
            ))
          ) : (
            <div className="p-2 text-gray-500">No results</div>
          )}
        </div>
      )}
    </div>
  );
};
