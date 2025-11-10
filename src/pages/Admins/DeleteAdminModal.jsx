import { Modal } from "@/components/Modal";

import BlockModalIcon from "@/assets/icons/block-modal-icon.svg";

const DeleteAdminModal = ({ admin, onConfirm, onClose, loading }) => {
  return (
    <Modal
      theme={"danger"}
      confirmText={"حذف"}
      onClose={onClose}
      onConfirm={onConfirm}
      loading={loading}
    >
      <div className="flex flex-col items-center gap-y-1 sm:gap-y-4">
        <div className="inline-block bg-[#f11b1b14] p-3 sm:p-4 rounded-2xl">
          <img src={BlockModalIcon} alt="logout-modal-icon" className="w-6 h-6" />
        </div>
        <h5 className="font-bold text-sm">حذف المسؤول</h5>
        <p className="font-normal text-xs">هل انت متأكد من حذف هذا المسؤول {admin.name || ""}؟</p>
      </div>
    </Modal>
  );
};

export default DeleteAdminModal;
