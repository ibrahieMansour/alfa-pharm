import { useState } from "react";
import { Link } from "react-router-dom";

import InputField from "@/components/InputField";
import { Modal } from "@/components/Modal";
import { cn } from "@/utils/cn";

import PlusIcon from "@/assets/icons/plus.svg";
import LeftAngle from "@/assets/icons/left-angle.svg";
import BlockModalIcon from "@/assets/icons/block-modal-icon.svg";
import UsersModalIcon from "@/assets/icons/users-modal.svg";

const CustomersPage = () => {
  const [isBanOpen, setIsBanOpen] = useState(false);
  const [isAddOpen, setIsAddOpen] = useState(false);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  return (
    <>
      <div className="flex w-full h-full flex-col gap-y-2 p-4">
        <div className="card">
          <div className="card-header">
            <p className="card-title">قائمة المستخدمين</p>
            <button className="card-button" onClick={() => setIsAddOpen(true)}>
              <span className="text-white text-[10px]">إضافة مستخدم</span>
              <img src={PlusIcon} alt="plus-icon" className="w-3 h-3" />
            </button>
          </div>
          <div className="card-body">
            <table className="table customers-table">
              <thead className="table-header">
                <tr className="table-row">
                  <th className="table-head">الترتيب</th>
                  <th className="table-head">اسم المستخدم</th>
                  <th className="table-head">رقم الهاتف</th>
                  <th className="table-head">النشاط</th>
                  <th className="table-head">تفاصيل</th>
                </tr>
              </thead>
              <tbody className="table-body">
                {[...Array(50)].map((_, i) => {
                  return (
                    <tr key={i} className="table-row">
                      <td className="table-cell">{i + 1}</td>
                      <td className="table-cell">name-{i + 1}</td>
                      <td className="table-cell">01020515897</td>
                      <td className="table-cell">
                        <button
                          type="button"
                          className={cn("ban-btn", i % 2 === 0 ? "un-ban" : "ban")}
                          onClick={() => setIsBanOpen(true)}
                        >
                          {i % 2 === 0 ? "تفعيل" : "حظر"}
                        </button>
                      </td>
                      <td className="table-cell">
                        <Link
                          to={`/customers/${i}`}
                          className="inline-block bg-[#5EB756] p-1 rounded-full"
                        >
                          <img src={LeftAngle} alt="left-angle" className="w-2 h-2" />
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
        <div className="bg-white h-[35px]"></div>
      </div>

      {/* block modal */}
      {isBanOpen && (
        <Modal
          theme={"danger"}
          confirmText={"حظر"}
          onClose={() => setIsBanOpen(false)}
          onConfirm={() => alert("alert example")}
        >
          <div className="flex flex-col items-center gap-y-1 sm:gap-y-4">
            <div className="inline-block bg-[#f11b1b14] p-3 sm:p-4 rounded-2xl">
              <img src={BlockModalIcon} alt="logout-modal-icon" className="w-6 h-6" />
            </div>
            <h5 className="font-bold text-sm">حظر المستخدم</h5>
            <p className="font-normal text-xs">هل انت متأكد من حظر هذا المستخدم؟</p>
          </div>
        </Modal>
      )}

      {/* add user */}
      {isAddOpen && (
        <Modal
          title="إضافة مستخدم جديد"
          icon={UsersModalIcon}
          confirmText={"تأكيد"}
          width={550}
          onClose={() => setIsAddOpen(false)}
          onConfirm={() => alert("alert example")}
        >
          <form onSubmit={() => {}} className="flex flex-col gap-y-4">
            {/* name field */}
            <InputField
              id="name"
              label="اسم المستخدم"
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

            {/* address field */}
            <InputField
              id="address"
              label="العنوان"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
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
    </>
  );
};

export default CustomersPage;
