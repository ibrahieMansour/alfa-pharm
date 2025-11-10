import { useState } from "react";
import { Modal } from "./components/Modal";
import { Offcanvas } from "./components/Offcanvas";
import BlockModalIcon from "./assets/icons/block-modal-icon.svg";
import ProductsModalIcon from "./assets/icons/products-modal.svg";
import OrdersModalIcon from "./assets/icons/orders-modal.svg";
import UsersModalIcon from "./assets/icons/users-modal.svg";
import AdminsModalIcon from "./assets/icons/admins-modal.svg";
// import GenerateButton from "./components/Gnerate";

import api from "@/api/api";

export default function App() {
  const [open, setOpen] = useState(true);

  return (
    <>
      {/* <button onClick={() => setOpen(true)}>Open Modal</button> */}
      {/* <GenerateButton/> */}
      {/* {open && <Offcanvas onClose={() => setOpen(false)}>vb</Offcanvas>} */}
      {/* delete product modal */}
      {/* {open && (
        <Modal
          theme={"danger"}
          confirmText={"حذف"}
          onClose={() => setOpen(false)}
          onConfirm={() => alert("alert example")}
        >
          <div className="flex flex-col items-center gap-y-1 sm:gap-y-4">
            <div className="inline-block bg-[#f11b1b14] p-3 sm:p-4 rounded-2xl">
              <img src={BlockModalIcon} alt="logout-modal-icon" className="w-6 h-6" />
            </div>
            <h5 className="font-bold text-sm">حذف المنتج</h5>
            <p className="font-normal text-xs">هل انت متأكد من حذف هذا المنتج؟</p>
          </div>
        </Modal>
      )} */}

      {/* add product */}
      {/* {open && (
        <Modal
          title="إضافة منتج جديد"
          icon={ProductsModalIcon}
          confirmText={"تأكيد"}
          width={550}
          onClose={() => setOpen(false)}
          onConfirm={() => alert("alert example")}
        ></Modal>
      )} */}

      {/* edit product */}
      {/* {open && (
        <Modal
          title="تحديث بيانات المنتج"
          icon={ProductsModalIcon}
          cancelText={"إلغاء"}
          confirmText={"تأكيد"}
          width={550}
          onClose={() => setOpen(false)}
          onConfirm={() => alert("alert example")}
        ></Modal>
      )} */}

      {/* add item to order */}
      {/* {open && (
        <Modal
          title="إضافة منتج للطلب"
          icon={OrdersModalIcon}
          confirmText={"إضافة"}
          width={550}
          onClose={() => setOpen(false)}
          onConfirm={() => alert("alert example")}
        ></Modal>
      )} */}

      {/* edit quatity of item*/}
      {/* {open && (
        <Modal
          title="تحديث المنتج"
          icon={OrdersModalIcon}
          confirmText={"تأكيد"}
          width={550}
          onClose={() => setOpen(false)}
          onConfirm={() => alert("alert example")}
        ></Modal>
      )} */}
    </>
  );
}
