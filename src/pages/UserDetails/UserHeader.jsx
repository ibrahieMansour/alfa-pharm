import { useState } from "react";
import { Link } from "react-router-dom";

import { Modal } from "@/components/Modal";
import { cn } from "@/utils/cn";
import RightArrow from "@/assets/icons/right-arrow-black.svg";
import BlockModalIcon from "@/assets/icons/block-modal-icon.svg";
import { useDispatch, useSelector } from "react-redux";
import { updateUserThunk } from "../../features/users/usersThunks";

const UserHeader = () => {
  const dispatch = useDispatch();
  const { currentUser, loading } = useSelector((state) => state.users);

  const [isBanOpen, setIsBanOpen] = useState(false);
  const [loadingBan, setLoadingBan] = useState(false);

  const handleBlockUser = () => {
    setLoadingBan(true);
    setTimeout(() => {
      dispatch(updateUserThunk({ id: currentUser.id, data: { suspend: !currentUser.suspend } }))
        .unwrap()
        .then(() => setIsBanOpen(false))
        .finally(() => setLoadingBan(false));
    }, 2000);
  };

  return (
    <>
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-x-1">
          <Link to="/users" className="hover:bg-white p-1.5 rounded-full transition-all">
            <img src={RightArrow} alt="right-arrow" className="w-3 h-3" />
          </Link>
          <p className="font-medium text-xs text-black">بيانات المستخدم</p>
        </div>
        {loading ? (
          <div
            className={cn(
              "w-[100px] border border-[#FA0404] rounded-lg py-2 text-[10px] font-bold animate-pulse bg-[#fa04041a]"
            )}
          >
            &nbsp;
          </div>
        ) : (
          <button
            type="button"
            className={cn(
              "w-[100px] border border-[#FA0404] rounded-lg py-2 text-black font-bold text-[10px]",
              currentUser?.suspend ? "bg-transparent" : "bg-[#fa04041a]"
            )}
            onClick={() => setIsBanOpen(true)}
          >
            {currentUser?.suspend ? "تفعيل" : "حظر"}
          </button>
        )}
      </div>

      {/* block modal */}
      {isBanOpen && (
        <Modal
          theme={currentUser?.suspend ? "outline_danger" : "danger"}
          confirmText={currentUser?.suspend ? "فك الحظر" : "حظر"}
          loading={loadingBan}
          onClose={() => setIsBanOpen(false)}
          onConfirm={handleBlockUser}
        >
          <div className="flex flex-col items-center gap-y-1 sm:gap-y-4">
            <div className="inline-block bg-[#f11b1b14] p-3 sm:p-4 rounded-2xl">
              <img src={BlockModalIcon} alt="logout-modal-icon" className="w-6 h-6" />
            </div>
            <h5 className="font-bold text-sm">
              {currentUser?.suspend ? "فك حظر المستخدم" : "حظر المستخدم"}
            </h5>
            <p className="font-normal text-xs">
              هل انت متأكد من {currentUser?.suspend ? "فك الحظر عن" : "حظر"} المستخدم{" "}
              {currentUser?.name}؟
            </p>
          </div>
        </Modal>
      )}
    </>
  );
};

export default UserHeader;
