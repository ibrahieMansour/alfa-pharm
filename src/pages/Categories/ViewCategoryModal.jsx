import { Modal } from "@/components/Modal";

import DefaultImage from "@/assets/images/default-image.png";
import ProductsModalIcon from "@/assets/icons/products-modal.svg";

const ViewCategoryModal = ({ category, onClose }) => {
  return (
    <Modal
      title="بيانات التصنيف"
      icon={ProductsModalIcon}
      footer={false}
      width={550}
      onClose={onClose}
    >
      <div className="flex flex-col gap-y-4">
        {/* photo section */}
        <div className="flex flex-col items-center justify-center gap-y-2">
          <div className="w-20 h-20 rounded-full overflow-hidden border border-[#5D5D5D]">
            <img
              src={category?.image || DefaultImage}
              alt="avatar-image"
              className="w-full h-full object-cover"
              onError={(e) => {
                e.currentTarget.src = DefaultImage;
              }}
            />
          </div>
          <p className="text-[#414651] font-medium text-xs">صورة التصنيف</p>
        </div>

        {/* name section */}
        <div className="field">
          <p className="label">اسم التصنيف</p>
          <p className="flex-1 py-2 px-3 rounded-lg text-xs text-[#414651] bg-white">
            {category?.name}
          </p>
        </div>

        {/* description section */}
        <div className="field">
          <p className="label">الاولوية</p>
          <p className="flex-1 py-2 px-3 rounded-lg text-xs text-[#414651] bg-white">
            {category?.priority || <>&nbsp;</>}
          </p>
        </div>

        {/* isView section */}
        <div className="field">
          <p className="label">الحالة</p>
          <p className="flex-1 py-2 px-3 rounded-lg text-xs text-[#414651] bg-white">
            {category?.isView ? "مرئي" : "غير مرئي"}
          </p>
        </div>
      </div>
    </Modal>
  );
};

export default ViewCategoryModal;
