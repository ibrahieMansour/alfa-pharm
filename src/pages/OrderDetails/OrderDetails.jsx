import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import { updateOrderStatusThunk } from "../../features/orders/ordersThunks";

import { statusStyles } from "@/constants/index";
import { formatDate } from "@/utils/formatDate";

import Avatar from "@/assets/images/avatar.png";
import BottomAngle from "@/assets/icons/bottom-angle.svg";

const OrderDetails = ({ order, showDetails, setShowDetails }) => {
  const { currentOrder } = useSelector((state) => state.orders);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [loadingStatus, setLoadingStatus] = useState(false);
  const menuRef = useRef();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleUpdateOrderStatus = (data) => {
    setLoadingStatus(true);
    setTimeout(() => {
      dispatch(updateOrderStatusThunk({ id: currentOrder.id, data }))
        .unwrap()
        .then(() => {})
        .finally(() => {
          setLoadingStatus(false);
        });
    }, 2000);
  };

  const handleSelect = (val) => {
    handleUpdateOrderStatus({ status: val });
    setOpen(false);
  };

  return (
    <div className={`${showDetails ? "flex" : "hidden sm:flex"} h-full flex-1 flex-col gap-y-3`}>
      <div className="sm:hidden flex justify-center">
        <button
          onClick={() => setShowDetails(!showDetails)}
          className="bg-green-500 text-[10px] text-white px-2 py-1 rounded-md"
        >
          {showDetails ? "عرض المنتجات" : "عرض التفاصيل"}
        </button>
      </div>

      <div className="p-[1px] bg-gradient-to-r from-[#E97E39] to-[#5EB756] rounded-xl overflow-hidden">
        <div className="bg-[#dde2dc] rounded-xl py-1 flex flex-col items-center gap-y-3">
          <h4 className="text-xs font-medium">المستخدم</h4>
          <div className="w-20 h-20 border-2 border-[#F4EBD0] rounded-full overflow-hidden">
            <img src={Avatar} alt="" className="w-full h-full object-cover" />
          </div>
          <h5 className="text-[10px] font-medium">{currentOrder?.user?.name}</h5>
        </div>
      </div>

      <div className="flex-1 p-[1px] bg-gradient-to-r from-[#E97E39] to-[#5EB756] rounded-xl overflow-hidden">
        <div className="h-full bg-[#dde2dc] rounded-xl py-1 px-4 flex flex-col items-stretch gap-y-3">
          <h4 className="text-xs font-medium self-center">التفاصيل</h4>

          <div ref={menuRef} className="relative w-full my-6">
            <div className="pr-[1px] pb-[1px] bg-gradient-to-r from-[#E97E39] to-[#5EB756] rounded-lg overflow-hidden">
              <button
                onClick={() => !loadingStatus && setOpen((prev) => !prev)}
                className={`flex w-full items-center justify-between rounded-lg bg-white text-sm p-2 text-[#737373]`}
              >
                <span>{statusStyles[currentOrder.status]?.text}</span>
                <img src={BottomAngle} alt="" className="w-3 h-3" />
              </button>
            </div>

            {open && (
              <ul className="absolute z-10 mt-1 w-full rounded bg-gray-50">
                {["PENDING", "CONFIRMED", "SHIPPED", "COMPLETED", "CANCELLED"].map((status) => (
                  <li
                    key={status}
                    onClick={() => handleSelect(status)}
                    className={`cursor-pointer select-none text-xs border p-2 ${
                      statusStyles[status].hover
                    } ${
                      currentOrder.status === status &&
                      `${statusStyles[status].class} ${statusStyles[status].border} font-semibold`
                    }`}
                  >
                    {order.status === status && <span className="inline-block ml-3">&#10004;</span>}
                    {statusStyles[status].text}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="flex-1 flex flex-col justify-center gap-y-3">
            <div className="w-full flex justify-between items-center">
              <p className="text-[11px] font-bold">رمز الطلب</p>
              <p className="text-[11px] font-bold text-[#93A0B9]">{currentOrder.orderNumber}</p>
            </div>
            <div className="w-full flex justify-between items-center">
              <p className="text-[11px] font-bold">تاريخ الطلب</p>
              <p className="text-[11px] font-bold text-[#93A0B9]">{formatDate(currentOrder.createdAt)}</p>
            </div>
            <div className="w-full flex justify-between items-center">
              <p className="text-[11px] font-bold">عدد المنتجات</p>
              <p className="text-[11px] font-bold text-[#93A0B9]">
                {currentOrder.items?.reduce((total, item) => {
                  return total + item.quantity;
                }, 0)}
              </p>
            </div>
            <div className="w-full flex justify-between items-center">
              <p className="text-[11px] font-bold">المبلغ الكلي</p>
              <p className="text-[11px] font-bold text-[#93A0B9]">
                {parseFloat(currentOrder.totalAmount).toFixed(2)} ج.م
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
