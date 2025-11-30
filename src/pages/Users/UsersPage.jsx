import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useMediaQuery } from "@uidotdev/usehooks";

import {
  fetchUsers,
  createUserThunk,
  updateUserThunk,
  deleteUserThunk,
  searchUsersThunk,
} from "@/features/users/usersThunks";

import UsersTable from "./UsersTable";
import AddUserModal from "./AddUserModal";
// import BlockUserModal from "./BlockUserModal";
import UpdateUserModal from "./UpdateUserModal";
import DeleteUserModal from "./DeleteUserModal";
import UsersSearch from "./UsersSearch";

import CardHeader from "@/components/CardHeader";
import Pagination from "@/components/Pagination";
import { Offcanvas } from "@/components/Offcanvas";

import FilterIcon from "@/assets/icons/filter-icon.svg";

const UsersPage = () => {
  const isDesktopDevice = useMediaQuery("(min-width: 480px)");
  const dispatch = useDispatch();
  const { users, meta } = useSelector((state) => state.users);

  const [isBanOpen, setIsBanOpen] = useState(false);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [loading, setLoading] = useState(false);

  const [page, setPage] = useState(() => {
    const savedPage = localStorage.getItem("users_page");
    return savedPage ? Number(savedPage) : 1;
  });

  const [filters, setFilters] = useState({ name: "", phone: "" });
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    localStorage.setItem("users_page", page);
  }, [page]);

  useEffect(() => {
    const payload = {};
    if (filters.name?.trim()) payload.search = filters.name.trim();
    if (filters.phone?.trim()) payload.searchPhone = filters.phone.trim();

    if (isSearching) {
      if (Object.keys(payload).length === 0) return; // Skip if no values
      dispatch(searchUsersThunk({ ...payload, page }));
    } else {
      dispatch(fetchUsers({ page }));
    }
  }, [page, dispatch, isSearching]);

  const closeModal = () => {
    setSelectedUser(null);
    setIsBanOpen(false);
    setIsAddOpen(false);
    setIsEditOpen(false);
    setIsDeleteOpen(false);
  };

  const handleAddUser = async (data) => {
    setLoading(true);
    try {
      await dispatch(createUserThunk(data)).unwrap();
      setIsAddOpen(false);
      dispatch(fetchUsers({ page }));
    } catch (err) {
      if (err.statusCode === 409) throw "رقم الهاتف موجود بالفعل";
      else throw "حدث خطأ";
    } finally {
      setLoading(false);
    }
  };

  const handleEditUser = async (data) => {
    setLoading(true);
    try {
      await dispatch(updateUserThunk({ id: selectedUser.id, data })).unwrap();
      setIsEditOpen(false);
      dispatch(fetchUsers({ page }));
    } catch (err) {
      if (err.statusCode === 409) throw "رقم الهاتف موجود بالفعل";
      else throw "حدث خطأ";
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteUser = () => {
    setLoading(true);
    dispatch(deleteUserThunk(selectedUser.id))
      .unwrap()
      .then(() => {
        setIsDeleteOpen(false);
        dispatch(fetchUsers({ page }));
      })
      .finally(() => setLoading(false));
  };

  const handleSearch = () => {
    if (open) setOpen(false);

    const payload = {};
    if (filters.name?.trim()) payload.search = filters.name.trim();
    if (filters.phone?.trim()) payload.searchPhone = filters.phone.trim();

    if (Object.keys(payload).length === 0) return;

    setIsSearching(true);
    setPage(1);

    dispatch(searchUsersThunk({ ...payload, page: 1 }));
  };

  const handleCancelSearch = () => {
    setFilters({ name: "", phone: "" });

    if (open) setOpen(false);
    if (!isSearching) return;
    setIsSearching(false);
    setPage(1);
    dispatch(fetchUsers({ page: 1 }));
  };

  return (
    <div className="flex w-full h-full flex-col gap-y-2 p-4">
      {/* Search Section */}
      {isDesktopDevice ? (
        <UsersSearch
          filters={filters}
          setFilters={setFilters}
          search={handleSearch}
          cancel={handleCancelSearch}
        />
      ) : (
        <button
          onClick={() => setOpen(true)}
          className="flex items-center gap-x-2 text-[#5EB756] text-xs py-1 sm:hidden"
        >
          <img src={FilterIcon} alt="filter-icon" className="w-4 h-4" />تصفية
        </button>
      )}

      {/* Main Card */}
      <div className="card">
        <CardHeader
          title={"المستخدمين"}
          buttonTitle={"مستخدم"}
          handleClick={() => setIsAddOpen(true)}
        />
        <div className="card-body">
          <UsersTable
            users={users}
            onEdit={(user) => {
              setSelectedUser(user);
              setIsEditOpen(true);
            }}
            onDelete={(user) => {
              setSelectedUser(user);
              setIsDeleteOpen(true);
            }}
          />
        </div>
      </div>

      {/* Pagination */}
      <Pagination
        page={meta?.page}
        totalPages={meta?.totalPage}
        totalUsers={meta?.total}
        limit={meta?.limit}
        onPageChange={setPage}
      />

      {/* Modals */}
      {isAddOpen && (
        <AddUserModal onConfirm={handleAddUser} onClose={closeModal} loading={loading} />
      )}

      {isEditOpen && (
        <UpdateUserModal
          user={selectedUser}
          onConfirm={handleEditUser}
          onClose={closeModal}
          loading={loading}
        />
      )}

      {isDeleteOpen && (
        <DeleteUserModal
          user={selectedUser}
          onConfirm={handleDeleteUser}
          onClose={closeModal}
          loading={loading}
        />
      )}

      {open && (
        <Offcanvas title="معلومات المستخدم" onClose={() => setOpen(false)}>
          <UsersSearch
            filters={filters}
            setFilters={setFilters}
            search={handleSearch}
            cancel={handleCancelSearch}
          />
        </Offcanvas>
      )}
    </div>
  );
};

export default UsersPage;
