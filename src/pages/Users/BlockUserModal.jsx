// BlockUserModal.jsx
import { Modal } from "@/components/Modal";
import BlockModalIcon from "@/assets/icons/block-modal-icon.svg";

const BlockUserModal = ({ user, onConfirm, onClose, loading }) => {
  const isBanned = user?.suspend;

  return (
    <Modal
      theme={isBanned ? "outline_danger" : "danger"}
      loading={loading}
      confirmText={isBanned ? "فك الحظر" : "حظر"}
      onClose={onClose}
      onConfirm={onConfirm}
    >
      <div className="flex flex-col items-center gap-y-4">
        <div className="inline-block bg-[#f11b1b14] p-4 rounded-2xl">
          <img src={BlockModalIcon} alt="block" className="w-6 h-6" />
        </div>
        <h5 className="font-bold text-sm">{isBanned ? "فك حظر المستخدم" : "حظر المستخدم"}</h5>
        <p className="font-normal text-xs">
          هل انت متأكد من {isBanned ? "فك الحظر عن" : "حظر"} المستخدم {user?.name}؟
        </p>
      </div>
    </Modal>
  );
};

export default BlockUserModal;
