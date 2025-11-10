import { useState } from "react";
import { Modal } from "@/components/Modal";
import OrdersModalIcon from "../../assets/icons/orders-modal.svg";
import { statusStyles } from "@/constants/index";

import { cn } from "@/utils/cn";

const EditOrderStatusModal = ({ order, onConfirm, onClose, loading }) => {
  const [selectedStatus, setSelectedStatus] = useState(order?.status || "");

  const statusKeys = Object.keys(statusStyles); // get statuses from your constant
  const currentIndex = statusKeys.indexOf(order.status); // index of current order status

  const handleSubmit = () => {
    if (selectedStatus !== order.status) {
      onConfirm({ status: selectedStatus });
    } else {
      onClose();
    }
  };

  return (
    <Modal
      title="تعديل حاله الطلب"
      icon={OrdersModalIcon}
      confirmText="تأكيد"
      width={550}
      onClose={onClose}
      onConfirm={handleSubmit}
      loading={loading}
    >
      <div className="flex flex-col gap-y-2 w-full max-w-[400px] mx-auto p-3 bg-white border-2 border-gray-800 rounded-lg">
        {statusKeys.map((key) => {
          const style = statusStyles[key];
          const isActive = selectedStatus === key;
          const isDisabled = statusKeys.indexOf(key) < currentIndex; // disable previous statuses

          return (
            <button
              key={key}
              onClick={() => !isDisabled && setSelectedStatus(key)}
              disabled={isDisabled}
              className={cn(
                "block w-full px-4 py-2 rounded-md text-sm border transition-all duration-200 text-right",
                isDisabled
                  ? "opacity-50 cursor-not-allowed"
                  : isActive
                  ? `${style.class} ${style.border} font-semibold`
                  : `${style.hover} text-gray-700`
              )}
            >
              {order.status === key && <span className="inline-block ml-3">&#10004;</span>}
              {style.text}
            </button>
          );
        })}
      </div>
    </Modal>
  );
};

export default EditOrderStatusModal;
