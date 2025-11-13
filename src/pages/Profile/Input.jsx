const Input = ({ label, icon, type, name, value, onChange, disabled }) => {
  return (
    <div className="mt-3">
      <label className="text-[#18191C]/40 block mb-2 text-xs font-medium">
        {label}
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
          <img src={icon} alt="icon" className="w-5 h-5" />
        </div>
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          disabled={disabled}
          className={`bg-white border text-[#2A2A2A] text-xs rounded-lg outline-none block w-full h-full p-1 ps-8 ${!disabled && "bg-gray-100"
            }`}
        />
      </div>
    </div>
  );
};

export default Input;
