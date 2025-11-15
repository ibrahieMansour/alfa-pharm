import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  fetchAdmins,
  createAdminThunk,
  updateAdminThunk,
  deleteAdminThunk,
} from "@/features/admins/adminsThunks";

import AdminsTable from "./AdminsTable";
import AddAdminModal from "./AddAdminModal";
import ViewAdminModal from "./ViewAdminModal";
import UpdateAdminModal from "./UpdateAdminModal";
import DeleteAdminModal from "./DeleteAdminModal";

import CardHeader from "../../components/CardHeader";

const AdminsPage = () => {
  const dispatch = useDispatch();
  const { admins } = useSelector((state) => state.admins);

  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [isUpdateOpen, setIsUpdateOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedAdmin, setSelectedAdmin] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    dispatch(fetchAdmins());
  }, [dispatch]);

  const closeModal = () => {
    setSelectedAdmin(null);
    setIsAddOpen(false);
    setIsViewOpen(false);
    setIsUpdateOpen(false);
    setIsDeleteOpen(false);
  };

  const handleAddAdmin = async (data) => {
    setLoading(true);
    try {
      await dispatch(createAdminThunk(data)).unwrap();
      setIsAddOpen(false);
    } catch (err) {
      if (err.statusCode === 409) throw "رقم الهاتف موجود بالفعل";
      else throw "حدث خطأ";
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateAdmin = async (data) => {
    setLoading(true);
    try {
      await dispatch(updateAdminThunk({ id: selectedAdmin.id, data })).unwrap();
      setIsUpdateOpen(false);
    } catch (err) {
      if (err.statusCode === 409) throw "رقم الهاتف موجود بالفعل";
      else throw "حدث خطأ";
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAdmin = () => {
    setLoading(true);
    dispatch(deleteAdminThunk(selectedAdmin.id))
      .unwrap()
      .then(() => {
        setIsDeleteOpen(false);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="flex w-full h-full flex-col gap-y-2 p-4">
      <div className="card">
        <CardHeader
          title={"المسؤلين"}
          buttonTitle={"مسؤل"}
          handleClick={() => setIsAddOpen(true)}
        />
        <div className="card-body">
          <AdminsTable
            admins={admins}
            onView={(admin) => {
              setSelectedAdmin(admin);
              setIsViewOpen(true);
            }}
            onEdit={(admin) => {
              if (!admin) return;
              setSelectedAdmin(admin);
              setIsUpdateOpen(true);
            }}
            onDelete={(admin) => {
              setSelectedAdmin(admin);
              setIsDeleteOpen(true);
            }}
          />
        </div>
      </div>

      {isAddOpen && (
        <AddAdminModal onConfirm={handleAddAdmin} onClose={closeModal} loading={loading} />
      )}

      {isViewOpen && <ViewAdminModal admin={selectedAdmin} onClose={closeModal} />}

      {isUpdateOpen && (
        <UpdateAdminModal
          admin={selectedAdmin}
          onConfirm={handleUpdateAdmin}
          onClose={closeModal}
          loading={loading}
        />
      )}

      {isDeleteOpen && (
        <DeleteAdminModal
          admin={selectedAdmin}
          onConfirm={handleDeleteAdmin}
          onClose={closeModal}
          loading={loading}
        />
      )}
    </div>
  );
};

export default AdminsPage;
