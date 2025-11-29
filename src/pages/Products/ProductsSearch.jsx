import { useMediaQuery } from "@uidotdev/usehooks";
import { useSelector } from "react-redux";

const ProductsSearch = ({ filters, setFilters, search, cancel }) => {
  const isDesktopDevice = useMediaQuery("(min-width: 640px)");

  const { categories } = useSelector(state => state.products)

  return (
    <div className="flex justify-center items-center max-sm:flex-col gap-x-3 gap-y-6">
      <div className="max-sm:w-full w-28">
        <p className="sm:hidden text-[#555E67] text-[10px] font-semibold mb-3">اسم المنتج</p>
        <input
          type="text"
          placeholder="ابحث بالاسم"
          value={filters.name}
          onChange={(e) => setFilters({ ...filters, name: e.target.value })}
          className="w-full max-sm:py-3 py-1.5 px-2 max-sm:text-[12px] text-[10px] rounded-md bg-white border-b border-[#5EB756] text-gray-800 font-medium focus:outline-none"
        />
      </div>
      
      <div className="max-sm:w-full w-56">
        <p className="sm:hidden text-[#555E67] text-[10px] font-semibold mb-3">حالة الطلب</p>
        <select
          className="w-full max-sm:py-2 py-0.5 px-2 max-sm:text-[12px] text-[10px] rounded-md bg-white border-b border-[#5EB756] text-gray-800 font-medium focus:outline-none"
          value={filters.categoryId}
          onChange={(e) => setFilters({ ...filters, categoryId: e.target.value })}
          {...(!isDesktopDevice ? { size: 5 } : {})}
        >
          <option value="">الكل</option>
          {categories?.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
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

export default ProductsSearch;
