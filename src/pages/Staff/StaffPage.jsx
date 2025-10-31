import { useState } from "react";
import { Link } from "react-router-dom";

import InputField from "@/components/InputField";
import { Modal } from "@/components/Modal";
import { cn } from "@/utils/cn";

import PlusIcon from "@/assets/icons/plus.svg";
import LeftAngle from "@/assets/icons/left-angle.svg";
import EditIcon from "@/assets/icons/edit.svg";
import DeleteIcon from "@/assets/icons/delete.svg";
import BlockModalIcon from "@/assets/icons/block-modal-icon.svg";
import StaffModalIcon from "@/assets/icons/staff-modal.svg";

import Avatar from "@/assets/images/avatar.png";

const StaffPage = () => {
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isViewOpen, setIsViewOpen] = useState(false);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  return (
    <>
      <div className="flex w-full h-full flex-col gap-y-2 p-4">
        <div className="card">
          <div className="card-header">
            <p className="card-title">قائمة المسؤولين</p>
            <button className="card-button" onClick={() => setIsAddOpen(true)}>
              <span className="text-white text-[10px]">إضافة مسؤول</span>
              <img src={PlusIcon} alt="plus-icon" className="w-3 h-3" />
            </button>
          </div>
          <div className="card-body">
            <table className="table customers-table">
              <thead className="table-header">
                <tr className="table-row">
                  <th className="table-head">الترتيب</th>
                  <th className="table-head">اسم المسؤول</th>
                  <th className="table-head">رقم الهاتف</th>
                  <th className="table-head">التحكم</th>
                  <th className="table-head">تفاصيل</th>
                </tr>
              </thead>
              <tbody className="table-body">
                {[...Array(10)].map((_, i) => (
                  <tr key={i} className="table-row">
                    <td className="table-cell">{i + 1}</td>
                    <td className="table-cell">name-{i + 1}</td>
                    <td className="table-cell">01020515897</td>
                    <td className="table-cell">
                      <div className="flex items-center justify-center gap-3">
                        <button
                          className="opacity-50 hover:opacity-100"
                          onClick={() => setIsEditOpen(true)}
                        >
                          <img src={EditIcon} alt="Edit" className="w-5 h-5" />
                        </button>
                        <button
                          className="opacity-50 hover:opacity-100"
                          onClick={() => setIsDeleteOpen(true)}
                        >
                          <img src={DeleteIcon} alt="Delete" className="w-5 h-5" />
                        </button>
                      </div>
                    </td>
                    <td className="table-cell">
                      <button
                        className="inline-block bg-[#5EB756] p-1 rounded-full"
                        onClick={() => setIsViewOpen(true)}
                      >
                        <img src={LeftAngle} alt="left-angle" className="w-2 h-2" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="bg-white h-[35px]"></div>
      </div>

      {/* delete staff modal */}
      {isDeleteOpen && (
        <Modal
          theme={"danger"}
          confirmText={"حذف"}
          onClose={() => setIsDeleteOpen(false)}
          onConfirm={() => alert("alert example")}
        >
          <div className="flex flex-col items-center gap-y-1 sm:gap-y-4">
            <div className="inline-block bg-[#f11b1b14] p-3 sm:p-4 rounded-2xl">
              <img src={BlockModalIcon} alt="logout-modal-icon" className="w-6 h-6" />
            </div>
            <h5 className="font-bold text-sm">حذف المسؤول</h5>
            <p className="font-normal text-xs">هل انت متأكد من حذف هذا المسؤول؟</p>
          </div>
        </Modal>
      )}

      {/* add staff */}
      {isAddOpen && (
        <Modal
          title="إضافة مسؤول جديد"
          icon={StaffModalIcon}
          confirmText={"تأكيد"}
          width={550}
          onClose={() => setIsAddOpen(false)}
          onConfirm={() => alert("alert example")}
        >
          <form onSubmit={() => {}} className="flex flex-col gap-y-4">
            {/* name field */}
            <InputField
              id="name"
              label="اسم المسؤول"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            {/* phone field */}
            <InputField
              id="phone"
              label="رقم الهاتف"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />

            {/* password field */}
            <InputField
              id="password"
              label="كلمة المرور"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            {/* confirm-password field */}
            <InputField
              id="confirmPassword"
              label="تأكيد كلمة المرور"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </form>
        </Modal>
      )}

      {/* edit staff */}
      {isEditOpen && (
        <Modal
          title="تحديث بيانات المسؤول"
          icon={StaffModalIcon}
          confirmText={"تأكيد"}
          width={550}
          onClose={() => setIsEditOpen(false)}
          onConfirm={() => alert("alert example")}
        >
          <form onSubmit={() => {}} className="flex flex-col gap-y-4">
            {/* name field */}
            <InputField
              id="name"
              label="اسم المسؤول"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            {/* phone field */}
            <InputField
              id="phone"
              label="رقم الهاتف"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />

            {/* password field */}
            <InputField
              id="password"
              label="كلمة المرور"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </form>
        </Modal>
      )}

      {/* view staff */}
      {isViewOpen && (
        <Modal
          title="بيانات المسؤول"
          icon={StaffModalIcon}
          footer={false}
          width={550}
          onClose={() => setIsViewOpen(false)}
        >
          <div className="flex flex-col gap-y-4">
            {/* photo section */}
            <div className="flex flex-col items-center justify-center gap-y-2">
              <div className="w-14 h-14 rounded-full overflow-hidden border border-[#5D5D5D]">
                <img src={Avatar} alt="avatar-image" className="w-full h-full object-cover" />
              </div>
              <p className="text-[#414651] font-medium text-xs">صورة الملف الشخصي</p>
            </div>

            {/* name section */}
            <div className="field">
              <p className="label">اسم المسؤول</p>
              <p className="flex-1 py-2 px-3 rounded-lg text-xs text-[#414651] bg-white">
                {name || "name"}
              </p>
            </div>

            {/* phone section */}
            <div className="field">
              <p className="label">رقم الهاتف</p>
              <p className="flex-1 py-2 px-3 rounded-lg text-xs text-[#414651] bg-white">
                {phone || "01234567890"}
              </p>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
};

export default StaffPage;
