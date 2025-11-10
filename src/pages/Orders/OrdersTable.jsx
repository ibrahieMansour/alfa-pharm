import { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import LoadingRows from "@/components/LoadingRows";
import FillTableRow from "@/components/FillTableRow";

import { cn } from "@/utils/cn";
import { formatDate } from "@/utils/formatDate";

import { statusStyles } from "@/constants/index";
import LeftAngle from "@/assets/icons/left-angle.svg";

const OrdersTable = ({ orders, onEdit }) => {
  const { loading } = useSelector((state) => state.orders);

  return (
    <table className="table users-table">
      <thead className="table-header">
        <tr className="table-row">
          <th className="table-head">رقم الطلب</th>
          <th className="table-head">اسم العميل</th>
          <th className="table-head">تاريخ الطلب</th>
          <th className="table-head">السعر</th>
          <th className="table-head">الحاله</th>
          <th className="table-head">التفاصيل</th>
        </tr>
      </thead>
      {loading ? (
        <LoadingRows cols={6} />
      ) : (
        <tbody className="table-body">
          {orders?.map((e, i) => (
            <tr key={e.id} className="table-row">
              <td className="table-cell">{e.orderNumber}</td>
              <td className="table-cell">{e.user?.name}</td>
              <td className="table-cell">{formatDate(e.createdAt)}</td>
              <td className="table-cell">{(e.totalAmount ?? 0).toFixed(2)}</td>
              <td className="table-cell relative" style={{ overflow: "visible" }}>
                <button
                  className={cn(
                    "w-full py-0.5 text-[10px] font-medium rounded-md",
                    statusStyles[e.status].class,
                    statusStyles[e.status].border,
                    (e.status === "CANCELLED" || e.status === "COMPLETED") &&
                      "opacity-50 cursor-not-allowed"
                  )}
                  onClick={() => {
                    if (e.status === "CANCELLED" || e.status === "COMPLETED") return;
                    onEdit(e);
                  }}
                  disabled={e.status === "CANCELLED" || e.status === "COMPLETED"}
                >
                  {statusStyles[e.status].text}
                </button>
              </td>
              <td className="table-cell">
                <Link to={`/orders/${e.id}`} className="inline-block bg-[#5EB756] p-1 rounded-full">
                  <img src={LeftAngle} alt="left-angle" className="w-2 h-2" />
                </Link>
              </td>
            </tr>
          ))}
          <FillTableRow RowCount={orders?.length} colSpan={6} />
        </tbody>
      )}
    </table>
  );
};

export default OrdersTable;
