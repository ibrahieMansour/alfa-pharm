import React, { useState } from "react";
import { Link } from "react-router-dom";

import { orders } from "@/constant";
import { statusStyles } from "@/constants/index";

import { cn } from "@/utils/cn";

import LeftAngle from "../../assets/icons/left-angle-colored.svg";
import RightArrow from "../../assets/icons/right-arrow-black.svg";
import OrderError from "../../assets/icons/no-order.svg";

const UserOrdersInfo = () => {
  const [selectedOrder, setSelectedOrder] = useState(null);

  const handleSelect = (order) => {
    if (selectedOrder && selectedOrder.id === order.id) {
      setSelectedOrder(null);
    } else {
      setSelectedOrder(order);
    }
  };
  const handleBack = () => setSelectedOrder(null);

  // if (true) {
  if (!orders || orders.length === 0) {
    return (
      <>
        <div className="w-full h-full flex flex-col justify-center items-center">
          <img src={OrderError} alt="order-error" className="" />
          <p className="text-gray-500">لا توجد طلبات</p>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        {/* Orders List */}
        <div
          className={`lg:w-7/12 px-4 pb-3 overflow-y-auto transition-all duration-300 ${
            selectedOrder ? "hidden lg:block" : "block"
          }`}
        >
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-md font-medium">الطلبات</h2>
            <Link
              to="/orders"
              className="border border-[#5EB756] rounded-xl py-1 px-2 text-black font-bold text-[10px] hover:text-[white] hover:bg-[#5eb756]"
            >
              المزيد
            </Link>
          </div>
          <div className="flex flex-col gap-y-2">
            {orders.map((order) => (
              <div
                key={order.id}
                onClick={() => handleSelect(order)}
                className={cn(
                  "cursor-pointer rounded-lg border border-white bg-white",
                  "hover:border-0 hover:p-[1px] hover:bg-gradient-to-r hover:from-[#E97E39] hover:to-[#5EB756]",
                  order.id === selectedOrder?.id &&
                    "border-0 p-[1px] bg-gradient-to-r from-[#E97E39] to-[#5EB756]"
                )}
              >
                <div className="bg-[#DDE2DC] rounded-lg p-3 flex flex-col gap-y-1">
                  <div className="flex justify-between items-center">
                    <p
                      className={cn(
                        "rounded-full text-[11px] py-[2px] px-2",
                        statusStyles[order.status]?.class
                      )}
                    >
                      {statusStyles[order.status]?.text}
                    </p>
                    <div className="w-6 h-6 p-1 bg-[#e97f391a] rounded-full">
                      <img
                        src={LeftAngle}
                        alt="left-angle"
                        className={cn(
                          "w-full h-full transition-transform",
                          order.id === selectedOrder?.id && "rotate-180"
                        )}
                      />
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <p className="text-[11px] font-bold">رقم الطلب</p>
                    <p className="text-[11px] font-bold text-[#93A0B9]">{order.code}</p>
                  </div>
                  <div className="flex justify-between items-center">
                    <p className="text-[11px] font-bold">تاريخ الطلب </p>
                    <p className="text-[11px] font-bold text-[#93A0B9]">{order.date}</p>
                  </div>
                  <div className="flex justify-between items-center">
                    <p className="text-[11px] font-bold">المبلغ الكلي</p>
                    <p className="text-[14px] font-bold">{order.total} ج.م</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Order Details */}
        <div
          className={`lg:w-5/12 px-4 pb-3 transition-all duration-300 overflow-y-auto ${
            selectedOrder ? "block" : "hidden lg:block"
          }`}
        >
          {selectedOrder ? (
            <>
              <div className="flex items-center lg:justify-center gap-x-1 mb-2">
                <button
                  onClick={handleBack}
                  className="lg:hidden text-sm p-1 hover:bg-white rounded-full"
                >
                  <img src={RightArrow} alt="right-arrow" className="w-4" />
                </button>
                <h2 className="text-md font-medium">تفاصيل الطلب</h2>
              </div>
              <div className="flex lg:justify-center">
                <div className="inline-flex flex-col gap-y-2">
                  {selectedOrder.items.map((e) => (
                    <div key={e.id} className="flex gap-x-4">
                      <img src={e.image} alt="" className="w-16 h-16 rounded-2xl" />
                      <div className="flex flex-col gap-y-1">
                        <p className="font-semibold text-[11px] text-[#121111]">{e.name}</p>
                        <p className="font-semibold text-[11px] text-[#121111]">
                          الكمية: {e.count}
                        </p>
                        <p className="font-semibold text-[11px] text-[#121111]">{e.price} ج.م</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          ) : (
            <div className="w-full h-full flex flex-col justify-center items-center">
              <img src={OrderError} alt="" className="" />
              <p className="text-gray-500">اختار طلب</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default UserOrdersInfo;
