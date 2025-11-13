import { useMediaQuery } from "@uidotdev/usehooks";

const OrdersSearch = ({ filters, setFilters, search, cancel }) => {
  const isDesktopDevice = useMediaQuery("(min-width: 640px)");
  return (
    <div className="flex justify-center items-center max-sm:flex-col gap-x-1 gap-y-3">
      <div className="max-sm:w-full w-28">
        <p className="sm:hidden text-[#555E67] text-[10px] font-semibold mb-3">اسم العميل</p>
        <input
          type="text"
          placeholder="ابحث بالاسم"
          value={filters.userName}
          onChange={(e) => setFilters({ ...filters, userName: e.target.value })}
          className="w-full max-sm:py-3 py-1.5 px-2 max-sm:text-[12px] text-[10px] rounded-md bg-white border-b border-[#5EB756] text-gray-800 font-medium focus:outline-none"
        />
      </div>
      <div className="max-sm:w-full w-28">
        <p className="sm:hidden text-[#555E67] text-[10px] font-semibold mb-3">رقم التليفون</p>
        <input
          type="text"
          placeholder="ابحث بالهاتف"
          value={filters.userPhone}
          onChange={(e) => setFilters({ ...filters, userPhone: e.target.value })}
          className="w-full max-sm:py-3 py-1.5 px-2 max-sm:text-[12px] text-[10px] rounded-md bg-white border-b border-[#5EB756] text-gray-800 font-medium focus:outline-none"
        />
      </div>
      <div className="max-sm:w-full w-28">
        <p className="sm:hidden text-[#555E67] text-[10px] font-semibold mb-3">رمز الطلب</p>
        <input
          type="text"
          placeholder="ابحث بالرمز"
          value={filters.orderNumber}
          onChange={(e) => setFilters({ ...filters, orderNumber: e.target.value })}
          className="w-full max-sm:py-3 py-1.5 px-2 max-sm:text-[12px] text-[10px] rounded-md bg-white border-b border-[#5EB756] text-gray-800 font-medium focus:outline-none"
        />
      </div>

      <div className="max-sm:w-full w-28">
        <p className="sm:hidden text-[#555E67] text-[10px] font-semibold mb-3">حالة الطلب</p>
        <select
          className="w-full max-sm:py-2 py-0.5 px-2 max-sm:text-[12px] text-[10px] rounded-md bg-white border-b border-[#5EB756] text-gray-800 font-medium focus:outline-none"
          value={filters.status}
          onChange={(e) => setFilters({ ...filters, status: e.target.value })}
          {...(!isDesktopDevice ? { size: 3 } : {})}
        >
          <option value="">الكل</option>
          <option value="PENDING">قيد الانتظار</option>
          <option value="CONFIRMED">تم التأكيد</option>
          <option value="SHIPPED">تم الشحن</option>
          <option value="COMPLETED">مكتمل</option>
          <option value="CANCELLED">تم الإلغاء</option>
        </select>
      </div>

      <div className="max-sm:w-full flex justify-center items-center gap-x-1 max-sm:gap-3">
        <button
          onClick={search}
          className="bg-[#5EB756] border border-[#5EB756] text-white text-[10px] px-1 py-0.5 rounded-md font-medium max-sm:py-2 max-sm:flex-1"
        >
          <span className="">تصنيف</span>
        </button>
        <button
          onClick={cancel}
          className="bg-[#5eb7560d] border border-[#5EB756] text-black text-[10px] px-1 py-0.5 rounded-md font-medium max-sm:py-2 max-sm:flex-1"
        >
          <span className="whitespace-nowrap">إعادة الضبط</span>
        </button>
      </div>
    </div>
  );
};

export default OrdersSearch;
