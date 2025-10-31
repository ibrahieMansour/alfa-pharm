import { useState } from "react";
import { Link } from "react-router-dom";

import { Modal } from "@/components/Modal";

import RightArrow from "@/assets/icons/right-arrow-black.svg";
import BlockModalIcon from "@/assets/icons/block-modal-icon.svg";

const UserHeader = () => {
  const [isBanOpen, setIsBanOpen] = useState(false);

  return (
    <>
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-x-1">
          <Link to="/customers" className="hover:bg-white p-1.5 rounded-full transition-all">
            <img src={RightArrow} alt="right-arrow" className="w-3 h-3" />
          </Link>
          <p className="font-medium text-xs text-black">بيانات المستخدم</p>
        </div>
        <button
          type="button"
          className="w-[100px] bg-[#fa04041a] border border-[#FA0404] rounded-lg py-2 text-black font-bold text-[10px]"
          onClick={() => setIsBanOpen(true)}
        >
          حظر
        </button>
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
    </>
  );
};

export default UserHeader;
