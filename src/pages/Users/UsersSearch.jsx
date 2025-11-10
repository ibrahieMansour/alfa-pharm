const UsersSearch = ({ filters, setFilters, search, cancel }) => {
  return (
    <div className="flex justify-center items-center max-xs:flex-col gap-x-3 gap-y-6">
      <div className="max-xs:w-full w-28">
        <p className="xs:hidden text-[#555E67] text-[10px] font-semibold mb-3">اسم العميل</p>
        <input
          type="text"
          placeholder="ابحث بالاسم"
          value={filters.name}
          onChange={(e) => setFilters({ ...filters, name: e.target.value })}
          className="w-full max-xs:py-3 py-1.5 px-2 max-xs:text-[12px] text-[10px] rounded-md bg-white border-b border-[#5EB756] text-gray-800 font-medium focus:outline-none"
        />
      </div>
      <div className="max-xs:w-full w-28">
        <p className="xs:hidden text-[#555E67] text-[10px] font-semibold mb-3">رقم التليفون</p>
        <input
          type="text"
          placeholder="ابحث برقم الهاتف"
          value={filters.phone}
          onChange={(e) => setFilters({ ...filters, phone: e.target.value })}
          className="w-full max-xs:py-3 py-1.5 px-2 max-xs:text-[12px] text-[10px] rounded-md bg-white border-b border-[#5EB756] text-gray-800 font-medium focus:outline-none"
        />
      </div>

      <div className="max-xs:w-full flex justify-center items-center gap-3">
        <button
          onClick={search}
          className="bg-[#5EB756] border border-[#5EB756] text-white text-[10px] px-3 max-xs:py-2 py-0.5 rounded-md font-medium max-xs:flex-1"
        >
          تصنيف
        </button>
        <button
          onClick={cancel}
          className="bg-[#5eb7560d] border border-[#5EB756] text-black text-[10px] px-3 max-xs:py-2 py-0.5 rounded-md font-medium max-xs:flex-1"
        >
          إعادة الضبط
        </button>
      </div>
    </div>
  );
};

export default UsersSearch;
