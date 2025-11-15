import { useState } from "react";
import { Link, replace, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { getUserByIdThunk, updateUserThunk, deleteUserThunk } from "@/features/users/usersThunks";

import { Modal } from "@/components/Modal";
import { cn } from "@/utils/cn";

import UpdateUserModal from "./UpdateUserModal";

import RightArrow from "@/assets/icons/right-arrow-black.svg";
import BlockModalIcon from "@/assets/icons/block-modal-icon.svg";
import EditIcon from "@/assets/icons/edit.svg";
import DeleteIcon from "@/assets/icons/delete.svg";

const UserHeader = () => {
  const dispatch = useDispatch();
  const { currentUser, loading } = useSelector((state) => state.users);

  const navigate = useNavigate();

  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const [loadingModal, setLoadingModal] = useState(false);



  const handleEditUser = async (data) => {
    setLoadingModal(true);
    try {
      await dispatch(updateUserThunk({ id: currentUser.id, data })).unwrap();
      setIsEditOpen(false);
      dispatch(getUserByIdThunk(currentUser.id));
    } catch (err) {
      if (err.statusCode === 409) throw "رقم الهاتف موجود بالفعل";
      else throw "حدث خطأ";
    } finally {
      setLoadingModal(false);
    }
  };

  const handleDeleteUser = () => {
    setLoadingModal(true);
    dispatch(deleteUserThunk(currentUser.id))
      .unwrap()
      .then(() => {
        setIsDeleteOpen(false);
        navigate("/users", { replace: true });
      })
      .finally(() => setLoadingModal(false));
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
          <div className="flex items-center justify-center gap-3">
            <div className="w-5 h-5 bg-gray-300 rounded animate-pulse"></div>
            <div className="w-5 h-5 bg-gray-300 rounded animate-pulse"></div>
          </div>
        ) : (
          <div className="flex items-center justify-center gap-3">
            <button className="opacity-50 hover:opacity-100" onClick={() => setIsEditOpen(true)}>
              <img
                src={EditIcon}
                alt="Edit"
                className="w-5 h-5"
              />
            </button>
            <button className="opacity-50 hover:opacity-100" onClick={() => setIsDeleteOpen(true)}>
              <img src={DeleteIcon} alt="Delete" className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>

      {/* block modal */}
      {isEditOpen && (
        <UpdateUserModal
          user={currentUser}
          onConfirm={handleEditUser}
          onClose={() => setIsEditOpen(false)}
          loading={loadingModal}
        />
      )}

      {/* delete modal */}
      {isDeleteOpen && (
        <Modal
          theme={"danger"}
          confirmText={"حذف"}
          loading={loadingModal}
          onClose={() => setIsDeleteOpen(false)}
          onConfirm={handleDeleteUser}
        >
          <div className="flex flex-col items-center gap-y-1 sm:gap-y-4">
            <div className="inline-block bg-[#f11b1b14] p-3 sm:p-4 rounded-2xl">
              <img src={BlockModalIcon} alt="logout-modal-icon" className="w-6 h-6" />
            </div>
            <h5 className="font-bold text-sm">حذف المستخدم</h5>
            <p className="font-normal text-xs">
              هل انت متأكد من حذف هذا المستخدم {currentUser?.name || ""}؟
            </p>
          </div>
        </Modal>
      )}
    </>
  );
};

export default UserHeader;
