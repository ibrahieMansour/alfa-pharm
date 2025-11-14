import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import api from "@/api/api";

import { createInvoiceHTML } from "./createInvoiceHTML";

import RightArrow from "@/assets/icons/right-arrow-black.svg";
import DeleteIcon from "@/assets/icons/delete.svg";
import PDFFileIcon from "@/assets/icons/pdf-file.svg";
import PlusIcon from "@/assets/icons/plus.svg";

const OrderHeader = ({ order, setDelete, setAdd }) => {
  const { loading } = useSelector((state) => state.orders);

  const handleDownload = () => {
    //  createInvoiceHTML(order);
    const html = createInvoiceHTML(order);

    api.post(
      "pdf/generate-invoice",
      { invoiceHTML: html },
      { responseType: "blob" }
    )
      .then((res) => {
        const url = URL.createObjectURL(new Blob([res.data]));
        const link = document.createElement("a");
        link.href = url;
        link.download = `invoice-${order.orderNumber}.pdf`;
        link.click();
      });
  };

  return (
    <div className="flex justify-between items-center">
      <div className="flex items-center gap-x-1">
        <Link to="/orders" className="hover:bg-white p-1.5 rounded-full transition-all">
          <img src={RightArrow} alt="right-arrow" className="w-3 h-3" />
        </Link>
        <p className="font-medium text-xs text-black">تفاصيل الطلب</p>
      </div>
      {loading ? (
        <div className="flex items-center justify-center gap-3">
          <div className="w-5 h-5 bg-gray-300 rounded animate-pulse"></div>
          <div className="w-5 h-5 bg-gray-300 rounded animate-pulse"></div>
          <div className="w-5 h-5 bg-gray-300 rounded animate-pulse"></div>
        </div>
      ) : (
        <div className="flex items-center justify-center gap-3">
          <button
            className="bg-blue-500 flex justify-center items-center gap-x-1 rounded-lg p-2"
            onClick={handleDownload}
            // onClick={() => generateInvoice(order)}
            title="طباعة فاتورة"
          >
            <span className="text-white text-[10px] max-sm:hidden">طباعة فاتورة</span>
            <img src={PDFFileIcon} alt="plus-icon" className="w-3 h-3" />
          </button>
          <button
            className="bg-[#5EB756] flex justify-center items-center gap-x-1 rounded-lg p-2"
            onClick={() => setAdd(true)}
            title="إضافة منتج"
          >
            <span className="text-white text-[10px] max-sm:hidden">إضافة منتج</span>
            <img src={PlusIcon} alt="plus-icon" className="w-3 h-3" />
          </button>
          <button className="opacity-50 hover:opacity-100" onClick={() => setDelete(true)}>
            <img src={DeleteIcon} alt="Delete" className="w-5 h-5" />
          </button>
        </div>
      )}
    </div>
  );
};

export default OrderHeader;
