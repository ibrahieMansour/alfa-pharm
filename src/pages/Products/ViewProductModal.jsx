import { Modal } from "@/components/Modal";

import DefaultImage from "@/assets/images/default-image.png";
import ProductsModalIcon from "@/assets/icons/products-modal.svg";

const ViewProductsModal = ({ product, onClose }) => {
  return (
    <Modal
      title="بيانات المنتج"
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
              src={product?.image || DefaultImage}
              alt="avatar-image"
              className="w-full h-full object-cover"
              onError={(e) => {
                e.currentTarget.src = DefaultImage;
              }}
            />
          </div>
          <p className="text-[#414651] font-medium text-xs">صورة المنتج</p>
        </div>

        {/* name section */}
        <div className="field">
          <p className="label">اسم المنتج</p>
          <p className="flex-1 py-2 px-3 rounded-lg text-xs text-[#414651] bg-white">
            {product?.name}
          </p>
        </div>

        {/* description section */}
        <div className="field">
          <p className="label">الوصف</p>
          <p className="flex-1 py-2 px-3 rounded-lg text-xs text-[#414651] bg-white">
            {product?.description || <>&nbsp;</>}
          </p>
        </div>

        {/* price section */}
        <div className="field">
          <p className="label">السعر</p>
          <p className="flex-1 py-2 px-3 rounded-lg text-xs text-[#414651] bg-white">
            {product?.price}
          </p>
        </div>

        {/* stock section */}
        <div className="field">
          <p className="label">الكمية</p>
          <p className="flex-1 py-2 px-3 rounded-lg text-xs text-[#414651] bg-white">
            {product?.stock || <>&nbsp;</>}
          </p>
        </div>

        {/* isView section */}
        <div className="field">
          <p className="label">الحالة</p>
          <p className="flex-1 py-2 px-3 rounded-lg text-xs text-[#414651] bg-white">
            {product?.isView ? "مرئي" : "غير مرئي"}
          </p>
        </div>
      </div>
    </Modal>
  );
};

export default ViewProductsModal;
