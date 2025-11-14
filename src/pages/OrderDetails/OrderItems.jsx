import EditIcon from "@/assets/icons/edit.svg";
import DeleteIcon from "@/assets/icons/delete.svg";
import { useEffect, useRef, useState } from "react";
import DefaultImage from "@/assets/images/default-image.png";

const OrderItems = ({ items, showDetails, setShowDetails, onUpdate, onDelete }) => {
  // calc height
  const parentRef = useRef(null);
  const firstRef = useRef(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (parentRef.current && firstRef.current) {
      const parentHeight = parentRef.current.offsetHeight;
      const firstHeight = firstRef.current.offsetHeight;
      setHeight(parentHeight - firstHeight - 12);
    }
  }, []);

  return (
    <div
      ref={parentRef}
      className={`${showDetails ? "hidden sm:flex" : "flex"} h-full flex-1 flex-col gap-y-3`}
    >
      <div ref={firstRef} className="sm:hidden flex justify-center">
        <button
          onClick={() => setShowDetails(!showDetails)}
          className="bg-green-500 text-[10px] text-white px-2 py-1 rounded-md"
        >
          {showDetails ? "عرض المنتجات" : "عرض التفاصيل"}
        </button>
      </div>
      <div className="space-y-3 overflow-auto" style={{ height }}>
        {items?.map((item) => (
          <div key={item.id} className="flex items-center justify-between">
            <div className="flex gap-x-4">
              <img
                src={item?.product.image || DefaultImage}
                alt="avatar-image"
                className="w-16 h-16 rounded-2xl"
                onError={(e) => {
                  e.currentTarget.src = DefaultImage;
                }}
              />
              <div className="flex flex-col gap-y-1">
                <p className="font-semibold text-[11px] text-[#121111]">{item?.product.name}</p>
                <p className="font-semibold text-[11px] text-[#121111]">الكمية: {item.quantity}</p>
                <p className="font-semibold text-[11px] text-[#121111]">
                  {item.price} ج.م
                </p>
              </div>
            </div>
            <div className="flex gap-2 pl-1">
              <button className="text-blue-600 hover:text-blue-800" onClick={() => onUpdate(item)}>
                <img src={EditIcon} alt="" className="min-w-4 min-h-4" />
              </button>
              <button className="text-red-600 hover:text-red-800" onClick={() => onDelete(item)}>
                <img src={DeleteIcon} alt="" className="min-w-4 min-h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderItems;
