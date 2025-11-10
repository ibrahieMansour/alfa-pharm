import { Modal } from "@/components/Modal";

import AdminsModalIcon from "@/assets/icons/admins-modal.svg";
import Avatar from "@/assets/images/avatar.png";

const ViewAdminModal = ({ admin, onClose }) => {
  return (
    <Modal
      title="بيانات المسؤول"
      icon={AdminsModalIcon}
      footer={false}
      width={550}
      onClose={onClose}
    >
      <div className="flex flex-col gap-y-4">
        {/* photo section */}
        <div className="flex flex-col items-center justify-center gap-y-2">
          <div className="w-14 h-14 rounded-full overflow-hidden border border-[#5D5D5D]">
            <img
              src={admin.image || Avatar}
              alt="avatar-image"
              className="w-full h-full object-cover"
            />
          </div>
          <p className="text-[#414651] font-medium text-xs">صورة الملف الشخصي</p>
        </div>

        {/* name section */}
        <div className="field">
          <p className="label">اسم المسؤول</p>
          <p className="flex-1 py-2 px-3 rounded-lg text-xs text-[#414651] bg-white">
            {admin.name || "name"}
          </p>
        </div>

        {/* phone section */}
        <div className="field">
          <p className="label">رقم الهاتف</p>
          <p className="flex-1 py-2 px-3 rounded-lg text-xs text-[#414651] bg-white">
            {admin.phone.slice(1) || "01234567890"}
          </p>
        </div>

        {/* phone section */}
        <div className="field">
          <p className="label">البريد الإلكترونى</p>
          <p className="flex-1 py-2 px-3 rounded-lg text-xs text-[#414651] bg-white">
            {admin.email || "email@gmail.com"}
          </p>
        </div>
      </div>
    </Modal>
  );
};

export default ViewAdminModal;
