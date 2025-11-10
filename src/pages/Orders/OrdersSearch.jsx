import { useMediaQuery } from "@uidotdev/usehooks";

const OrdersSearch = ({ filters, setFilters, search, cancel }) => {
  const isDesktopDevice = useMediaQuery("(min-width: 480px)");
  return (
    <div className="flex justify-center items-center max-xs:flex-col gap-x-3 gap-y-6">
      {/* <div className="max-xs:w-full w-28">
        <p className="xs:hidden text-[#555E67] text-[10px] font-semibold mb-3">اسم العميل</p>
        <input
          type="text"
          placeholder="ابحث بالاسم"
          value={filters.name}
          onChange={(e) => setFilters({ ...filters, name: e.target.value })}
          className="w-full max-xs:py-3 py-1.5 px-2 max-xs:text-[12px] text-[10px] rounded-md bg-white border-b border-[#5EB756] text-gray-800 font-medium focus:outline-none"
        />
      </div> */}
      <div className="max-xs:w-full w-28">
        <p className="xs:hidden text-[#555E67] text-[10px] font-semibold mb-3">رقم التليفون</p>
        <select
          name=""
          id=""
          className="w-full max-xs:py-2 py-0.5 px-2 max-xs:text-[12px] text-[10px] rounded-md bg-white border-b border-[#5EB756] text-gray-800 font-medium focus:outline-none"
          value={filters.status}
          onChange={(e) => setFilters({ ...filters, status: e.target.value })}
          {...(!isDesktopDevice ? { size: 6 } : {})}
        >
          <option value="">الكل</option>
          <option value="PENDING">قيد الانتظار</option>
          <option value="CONFIRMED">تم التأكيد</option>
          <option value="SHIPPED">تم الشحن</option>
          <option value="COMPLETED">مكتمل</option>
          <option value="CANCELLED">تم الإلغاء</option>
        </select>
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

export default OrdersSearch;
